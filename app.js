'use strict';

/* Express + Express-session */
var app = require('express')();
var session = require('express-session');

/* Socket.io */
var http = require('http').Server( app );
var io = require('socket.io')( http, { wsEngine: 'ws' } );
var sharedsession = require("express-socket.io-session");

/* MongoDB + Mongoose */
var mongoose = require('mongoose'); mongoose.connect('mongodb://sigma-itc-admin:sigma2013!@ds133465.mlab.com:33465/sigma-itc-autonomous-watering', {useMongoClient:true});

/* Uuid Generator */
const uuidv4 = require('uuid/v4');

/* Express settings */
app.set('port', (process.env.PORT || 3000));
app.use(require('body-parser').json({type: 'application/json'})); 
app.use((req, res, next) => {res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next();});

/* Sessions - Express-session depricated? */
app.use(session({
  secret: 'hx79oj23-h874-j894-mv24',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  genid: function(req) {
    return uuidv4() 
  },
}))

/*
io.use(sharedsession(session, {
    autoSave:true
})); 
*/ 


/* Module to handle Socket.io requests */
var SocketHandler = require('./src/exports/SocketHandler.js');


/* Socket server + request handling routing */
io.on('connection', socket => {

  // console.log(socket.handshake.headers.cookie)

  // Login user through socket.session;
  socket.on('system-add-user', payload => {
  	SocketHandler.systemAddUser(payload, socket);
  });
  socket.on('system-get-users', payload => {
  	SocketHandler.systemGetUsers(payload, socket);
  });
  socket.on('system-remove-user', payload => {
    SocketHandler.systemRemoveUser(payload, socket);
  });
  socket.on('system-login-user', payload => {
    SocketHandler.systemLoginUser(payload, socket);
  });

  socket.on('user-add-station', payload => {
  	SocketHandler.userAddStation(payload, socket);
  });

  socket.on('user-get-stations', payload => {
  	SocketHandler.userGetStations(payload, socket);
  });

  socket.on('user-add-plant', payload => {
  	SocketHandler.userAddPlant(payload, socket);
  });


  socket.on('admin-water-plant', payload => {
  	socket.emit('chip-water-plant', payload);
  })
  
});

/* Express server + routes */
app.get('/',                  (req, res) => { res.sendFile("./src/routes/client/index.html", {root:__dirname}); });
app.get('/dev',               (req, res) => { /*console.log(req.session);*/ res.sendFile("./src/routes/dev/index.html", {root:__dirname});});
app.get('/api/plants',        (req, res) => { Plants.getPlants((err, data) => {data ? res.json(data) : (err) => {throw err}; });});
app.get('/api',               (req, res) => { res.sendFile("./src/routes/api/index.html",  {root:__dirname}); });
app.get('/api/plants/add',    (req, res) => { res.sendFile("./src/routes/api/add.html",    {root:__dirname}); });
app.get('/api/plants/edit',   (req, res) => { res.sendFile("./src/routes/api/edit.html",   {root:__dirname}); });
app.get('/api/plants/remove', (req, res) => { res.sendFile("./src/routes/api/remove.html", {root:__dirname}); });
http.listen(app.get('port'),  () => { console.log('Node app is running on port', app.get('port')); });
