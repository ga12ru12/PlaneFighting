var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var https = require('https');
var _ = require('underscore');
var engine = require('ejs-locals');
var config = require('./config/configAccount');

var routes = require('./routes/index');
var game = require('./routes/game');

var app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'This is my secret',
    resave: true,
    saveUninitialized: true
}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://ga12ru12:quang123@ds059509.mongolab.com:59509/plant_fighting');

app.all("*", function(req, res, next) {
    res.locals.urlRequest = req.url;
    res.locals.title = "Plane Fighting";
    if(req.session.user) {
        res.locals.user = req.session.user;
        res.locals.authed = true;
    } else {
        res.locals.authed = false;
    }
    if(req.session.err) {
        res.locals.err = req.session.err;
        delete req.session.err;
    }
    if(req.session.success) {
        res.locals.success = req.session.success;
        delete req.session.success;
    }
    next();
});

app.all('/game*', function(req, res, next){
    res.locals.urlRequest = req.url;
    if(!req.session.user){
        res.redirect('/login');
    }else{
        next();
    }
});

app.use('/', routes);
app.use('/game', game);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
