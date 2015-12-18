var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var $ = require('Cheerio');
var session = require('express-session');
var flash = require('connect-flash');
var Sequelize = require('sequelize');
var db = require('./models');
var moment = require('moment');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/assets'));
app.use(session({
  secret:'hdsvhioadfgnioadfgnoidfagoibna',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(function(req,res,next){
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
  db.calendaritem.findAll().then(function(item){
  res.render('calendar', {item:item})
  });
});

app.get('/api', function(req, res){
  db.calendaritem.findAll().then(function(item){
  res.send(item);
  });
});

app.get('/events/:date', function(req, res){
	res.render('events', {date: req.params.date});
})

app.post('/events', function(req, res) {

  var startTime = req.body.startDate;
  if(req.body.startTime) {
    startTime += "T" + req.body.startTime + ":00";
  }
  var endTime = req.body.endDate;
  if(req.body.endTime){
    endTime += "T" + req.body.endTime + ":00";
  }

  db.calendaritem.findOrCreate({
    where: {
      id: req.body.id
      //serial id
    },
    defaults: {
      title: req.body.title,
      start: startTime,
      end: endTime,
      location: req.body.eventaddy,
      description: req.body.description
      // url: localhost:3000/calendar/:id,
    }
  }).spread(function(calendaritem, created) {
    res.redirect('/calendar');
  })
})

app.get('/url/:date', function(req, res){
  request('http://www.thestranger.com/events//' + req.params.date, function (err, resp, html){
    if(!err && resp.statusCode == 200) {
      var parsedHTML = $.load(html);
      var linkArray = []
      parsedHTML('.calendar-post-title a').map(function(i, headline){
        var text = $(headline).attr('href');
        if(!(text)) return;
        linkArray.push('http://thestranger.com' + text);
      });
      var textArray = []
        parsedHTML('.calendar-post-title a').map(function(i, headline){
          var text = $(headline).text();
          if(!(text)) return;
          textArray.push(text);
        });
        var placeArray = []
        parsedHTML('.calendar-post-venue a').map(function(i, locations) {
          var locations = $(locations).text();
          placeArray.push(locations);
        });
      var linksAndHeadLines = {links: linkArray, headlines: textArray, locations: placeArray}
      res.send(linksAndHeadLines);
    }
  });
});

app.listen(process.env.PORT || 3000);