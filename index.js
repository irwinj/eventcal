var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var $ = require('Cheerio');
// var db = require('./models');
//set database later
// var session = require('express-session');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/assets'));
//assets can be any folder of my choosing
// app.use(session({}))

app.get('/', function(req, res){ 
	res.render('selectable');
	});

app.get('/form', function(req, res){
	res.render('form')
})

app.get('/url', function(req, res){
  request('http://www.thestranger.com/events//2015-12-16', function (err, resp, html){
    if(!err && resp.statusCode == 200) {
      var parsedHTML = $.load(html);
      var linkArray = []
      parsedHTML('.calendar-post-title a').map(function(i, headline){
        var text = $(headline).attr('href');
        if(!(text)) return;
        linkArray.push('http://thestranger.com' + text);
      });
      var textArray = []
        parsedHTML('.calendar-post-title').map(function(i, headline){
        var text = $(headline).text();
        if(!(text)) return;
        textArray.push(text);
      });
      var linksAndHeadLines = {links: linkArray, headlines: textArray}
      res.send(linksAndHeadLines);
    }
  });
});

app.listen(process.env.PORT || 3000);