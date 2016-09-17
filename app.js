const express = require('express')
const expressHandlebars  = require('express-handlebars')
const initalState = require('./initalState')

const port = 444
const app = express()

app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')

app.get('/product/:productId/images', function(req, res, next) {

})

app.post('/product/:productId/image', function(req, res, next) {

})

app.get('/ad', function(req, res, next) {
  const url = 'http://www.vancitybuzz.com/wp-content/uploads/2014/01/Screen-Shot-2014-01-21-at-12.36.41-PM.png'
  const referralId = 'asdf'

  res.render('ad', {
    url: url,
    referralId: referralId
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
