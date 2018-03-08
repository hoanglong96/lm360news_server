var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Diacritics = require('diacritic');
var request = require('request');
var cheerio = require('cheerio');

//Model
var Home = require('./model/home')
var VCS = require('./model/vcs')

var app = express();

//Connet moogodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://hlong96:Hoanglong96@ds251588.mlab.com:51588/lm360news'
  , { useMongoClient: true });
//


app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


