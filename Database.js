const firebase = require('firebase')

firebase.initializeApp({
  databaseURL: "https://bdhacks-ads.firebaseio.com/",
  serviceAccount: "./firebaseServiceUser.json"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
module.exports = firebase.database();
