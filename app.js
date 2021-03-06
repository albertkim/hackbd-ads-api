const express = require('express')
const expressHandlebars  = require('express-handlebars')
const database = require('./Database')
const ref = database.ref('ads')

const port = 444
const app = express()

app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use('/public', express.static('public'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access_token, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  next()
})

app.get('/product/:skuNumber', function(req, res, next) {
  const skuNumber = req.params.skuNumber

  ref.once('value', function(snapshot) {
    const value = snapshot.val()[skuNumber]
    res.send(value)
  }, function (error) {
    res.status(500).send(error)
  })
})

app.post('/product/:skuNumber/image', function(req, res, next) {
  console.log('Product update endpoint hit')
  const imageUrl = req.query.imageUrl
  const bdUrl = req.query.bdUrl
  const skuNumber = req.params.skuNumber

  ref.child(skuNumber).set({
    imageUrl: imageUrl,
    bdUrl: bdUrl,
    referralIds: [],
    hitCount: 0,
    clickCount: 0
  })

  res.send()
})

function pickRandomProperty(obj) {
  var result
  var count = 0
  for (var prop in obj)
    if (Math.random() < 1/++count)
      result = prop
  return result
}

function generateReferralId() {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for(var i=0; i<10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

app.get('/ad', function(req, res, next) {
  ref.once('value', function(snapshot) {
    const adObjectObjects = snapshot.val()

    const randomSku = pickRandomProperty(adObjectObjects)
    const randomAdObject = adObjectObjects[randomSku]

    const randomAdImageUrl = randomAdObject.imageUrl
    const randomAdBDUrl = randomAdObject.bdUrl
    const referralId = generateReferralId()

    const updatedAdObject = randomAdObject
    updatedAdObject.hitCount ++
    if (!updatedAdObject.referralIds) {
      updatedAdObject.referralIds = [referralId]
    } else {
      updatedAdObject.referralIds.push(referralId)
    }
    ref.child(randomSku).update(updatedAdObject)

    res.render('ad', {
      imageUrl: randomAdImageUrl,
      bdUrl: randomAdBDUrl,
      referralId: referralId,
      skuNumber: randomSku
    })
  }, function (error) {
    res.status(500).send(error)
  })
})

app.put('/ad/:skuNumber', function(req, res, next) {
  const skuNumber = req.params.skuNumber

  ref.once('value', function(snapshot) {
    const adObjectObjects = snapshot.val()
    const clickCount = adObjectObjects[skuNumber].clickCount
    ref.child(skuNumber).update({'clickCount': clickCount+1})

    res.send()
  }, function (error) {
    res.status(500).send(error)
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
