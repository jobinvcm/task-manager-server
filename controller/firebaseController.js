require('dotenv').config()

var keyName = process.env.F_SECRETKEY;
var admin = require("firebase-admin");
var serviceAccount = require(`../${keyName}`);

function firebaseInit() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nucleustechnology-b578d.firebaseio.com"
  });
}

function addContent(refName, data) {
  admin.database().ref(refName).set(data)
}

exports.firebaseInit = function () {firebaseInit()}
exports.addContent = function (refName, data) {addContent(refName, data)}
