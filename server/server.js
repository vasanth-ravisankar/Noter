//server.js

var express 		 = require("express");
var path 			 = require("path");
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const port 			 = 7777
const app_root 		 = "/"
var axios 			 = require("axios")


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,"./public")));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('../app/routes')(app, database);

  app.listen(port, () => {
    console.log('We are live here on ' + port);
  });
})
