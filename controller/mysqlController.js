var mysql = require('mysql')
require('dotenv').config()

var connection = mysql.createConnection({
  host: process.env.MysqlServer,
  user: process.env.MysqlUserName,
  password: process.env.MysqlPassword,
  database: process.env.MysqlDatabaseName
})

function mysqlConnect () {
  connection.connect();
}

function mysqlQuery (query) {
  console.log(query)
  connection.query(query, function (err, rows, fields) {  
    console.log(rows)
    console.log(rows)
    console.log(fields)
  });
}

exports.doQuery = function(query) {
  mysqlQuery(query)
}

exports.closeQuery = function() {
  connection.end();
}

exports.connect = function() {
  connection.mysqlConnect();
}