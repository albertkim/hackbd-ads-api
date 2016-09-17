const express = require('express')
const expressHandlebars  = require('express-handlebars')

const initalState = require('./initalState')
const port = 444
const app = express()

console.log(initalState)

let imageUrlArray = []
Object.keys(initalState).forEach(function(skuId) {
  imageUrlArray.push(initalState[skuId].imageUrl)
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

app.get('/product/:productId/images', function(req, res, next) {

})

app.post('/product/:productId/image', function(req, res, next) {

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
