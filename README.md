# Seattle Event calendar
WDI05 Project 2

###About

The Seattle Event Calendar attempts to replicate the way that my friends share information, since Facebook's calendar is increasingly problematic. The app displays one calendar which anyone can add events to. When you click a date to add an event, the calendar scrapes thestranger.com for events on that date which can then click to auto-populate the form. App also features integration with Google Calendar API.

###Tech

Front end: Javascript, jQuery, AJAX, Bootstrap

Back end: Node, Express, Sequelize

Node modules: Cheerio, Express-Session, Moment, Fullcalendar, Flash

###Other

WIREFRAMES are in /images

User stories:

USERSTORY 1) my own - I hate facebook's events so I created a new way to share events amongst friends based on the way I currently share events with friends. Private calendar that only people with the link can see, scrapes data from the stranger for local events. Clicking attending will ultimately add your email address, submitting adds the calendar to database.

USERSTORY 2) someone is stalking me and wants to know what I'm up to. If they go to /calendar they can see all of the events. Users that don't sign up with their own email will be unable to create events.

