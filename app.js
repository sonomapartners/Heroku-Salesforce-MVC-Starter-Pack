// import our needed libraries
var express = require('express'),
    expressLayouts = require('express-ejs-layouts'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

// import our controllers
var routes = require('./routes/index'),
    users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// enable logging
app.use(logger('dev'));

// enable form parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable reading cookies
app.use(cookieParser());

// set the static path to serve static content from (images, js, css, etc)
app.use(express.static(path.join(__dirname, 'public')));

// set up a session so we can log people in/out
app.use(session({
    secret: process.env.SESSION_SECRET || 'test',
    saveUninitialized: false,
    resave: true
}));

// set up layouts
app.use(expressLayouts);

// helper middleware to make user info visible to templates
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

// set up routes
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;