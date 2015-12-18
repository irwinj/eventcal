# eventcal
Technology used:
javascript
html
jquery
node
sequelize


node modules:
fullcalendar
auth stuff
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

WIREFRAMES are in /images

USERSTORY 1) my own - I hate facebook's events so I created a new way to share events amongst friends based on the way I currently share events with friends. Private calendar that only people with the link can see, scrapes data from the stranger for local events. Clicking attending will ultimately add your email address, submitting adds the calendar to db.

USERSTORY 2) someone is stalking me and wants to know what I'm up to. If they go to /calendar they can see all of the events. Users that don't sign up with their own email will be unable to share in planning discussions.

