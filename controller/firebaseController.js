require('dotenv').config()

var keyName = process.env.F_SECRETKEY;
var admin = require("firebase-admin");
var serviceAccount = require(`../${keyName}`);

  var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nucleustechnology-b578d.firebaseio.com",
    storageBucket: process.env.F_STORAGEBUCKET
  });

function addContent(refName, data) {
  app.database().ref(refName).set(data)
}

function addUser(params) {
  app.auth().createUser({
    email: params.username,
    password: params.password
  })
}

function addFile(params) {
  var bucket = app.storage().bucket();
}

exports.firebaseInit = function () {firebaseInit()}
exports.addContent = function (refName, data) {addContent(refName, data)}
exports.addUser = function(params) {addUser(params)}

