var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var $ = require('Cheerio');
var session = require('express-session');
var flash = require('connect-flash');

var db = require('./models');
//set database later

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/assets'));
//assets can be any folder of my choosing
app.use(session({
  secret:'hdsvhioadfgnioadfgnoidfagoibna',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(function(req,res,next){
  // req.session.user = 8;
  if(req.session.user){
    db.user.findById(req.session.user).then(function(user){
      req.currentUser = user;
      next();
    });

  }else{
    req.currentUser = false;
    next();
  }
});

app.use(function(req,res,next){
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
});

app.use('/',require('./controllers/main.js'));
app.use('/auth',require('./controllers/auth.js'));

app.get('/calendar', function(req, res){
  res.render('selectable')
});

// app.get('/calendar', function(req, res){
//   db.event.findAll().then(function(events) {
//     res.render('selectable', {events: events});
//   });
//   //add database call, findAll events
//   });

app.get('/form', function(req, res){
	res.render('form')
})

app.post('/form', function(req, res) {
  db.calendaritems.findOrCreate({
    where: {
      id: req.body.id
      //serial id
    },
    defaults: {
      title: req.body.title
    }
  }).spread(function(calendaritems, created) {
    console.log(calendaritems.get());
    res.redirect('/calendar');
  })
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