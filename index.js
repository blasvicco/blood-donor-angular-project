// server.js

// modules =================================================
var express			= require('express');
var http			= require('http');
var app				= express();
var bodyParser		= require('body-parser');
var methodOverride	= require('method-override');
var db				= require('./config/db');
var smtp        = require('./config/smtp');
var mongoose		= require('mongoose');
// configuration ===========================================

//connect to our mongoDB database
console.log(`Connecting to DB: ${db.url)}`);
mongoose.connect(db.url);

// set our port
var port = process.env.PORT || 8080;

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(port);

var io = require('socket.io');
var socket = io.listen(server);

//routes ==================================================
require('./app/routes')(app, socket, smtp); // configure our routes

// shoutout to the user
console.log('In your face!!! Listening port ' + port);

// expose app
exports = module.exports = app;
