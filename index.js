var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Diacritics = require('diacritic');
var request = require('request');
var cheerio = require('cheerio');


var app = express();
app.use(bodyParser.json());

//Connet moogodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://hlong96:Hoanglong96@ds251588.mlab.com:51588/lm360news'
  , { useMongoClient: true });
//

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

