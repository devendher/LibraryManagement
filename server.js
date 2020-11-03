var express = require('express');
var app = express();
var fs=require('fs');
var bodyparser=require('body-parser');
app.use(bodyparser.json());
var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var path = require('path');
var jsonwebtoken=require('jsonwebtoken');

//app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap-material-design/dist/'));


var connection_string = '127.0.0.1:27017/library';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect('mongodb://'+connection_string);
var db1= mongoose.connection;
db1.on('error', console.error.bind(console, 'connection error:'));
db1.once('open', function() {
  console.log("Data base connected..");
}); 
app.use(express.static(__dirname + '/public'));


require('./Serverside/user.js')(app);
require('./Serverside/books.js')(app);
require('./Serverside/transactions.js')(app);

var ipaddress= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port=process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port,ipaddress);
console.log("server running on"+port);
exports = module.exports = app;
