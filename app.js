const express = require('express')
const expressHandlebars  = require('express-handlebars')

const state = require('./initialState')
const port = 444
const app = express()

console.log('Initial state: ', state)

let imageUrlArray = []
Object.keys(state).forEach(function(skuId) {
  imageUrlArray.push(state[skuId].imageUrl)
})
console.log(imageUrlArray)

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

app.get('/product/:skuId/images', function(req, res, next) {
  const skuId = req.params.skuId
})

app.post('/product/:skuId/image', function(req, res, next) {
  const imageUrl = req.query.url
  const skuId = req.params.skuId
  console.log(skuId, imageUrl)
  if (!state[skuId]) {
    state.skyId = {
      url: imageUrl,
      referralIds: []
    }
  }
})

app.get('/ad', function(req, res, next) {
  var randomImageUrl = imageUrlArray[Math.floor(Math.random() * imageUrlArray.length)];
  const referralId = 'asdf'

  res.render('ad', {
    url: randomImageUrl,
    referralId: referralId
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
