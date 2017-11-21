'use strict';
//Require user model. Needed for chip requests.
var User = require('./src/models/user.js');

/* Express + Express-session */
var app = require('express')();
var session = require('express-session');

/* Socket.io */
var http = require('http').Server( app );
var io = require('socket.io')( http, { wsEngine: 'ws' } );
var sharedsession = require("express-socket.io-session");

/* MongoDB + Mongoose */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://sigma-itc-admin:sigma2013!@ds133465.mlab.com:33465/sigma-itc-autonomous-watering', {useMongoClient:true});

mongoose.connect('mongodb://localhost/sigma-watering', {useMongoClient:true});

/* Uuid Generator */
const uuidv4 = require('uuid/v4');

/*----- Make app use body query parser ----- */
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ type: 'application/json' });
app.use(jsonParser);

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
}));

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
    app.post('/api/system-add-user', (req, res) => {
  	SocketHandler.systemAddUser(req, res);
  });
  app.post('/api/system-get-users', (req, res) => {
  	SocketHandler.systemGetUsers(req, res);
  });
  app.post('/api/system-remove-user', (req, res) => {
    SocketHandler.systemRemoveUser(req, res);
  });
  app.post('/api/system-login-user', (req, res) => {
    SocketHandler.systemLoginUser(req, res);
  });

    app.post('/api/user-add-station', (req, res) => {
        SocketHandler.userAddStation(req, res);
    });

  app.post('/api/user-delete-one-station', (req, res) => {
        SocketHandler.userDeleteOneStation(req, res);
});

    app.post('/api/user-get-stations', (req, res) => {
  	SocketHandler.userGetStations(req, res);
  });

    app.post('/api/user-get-one-station', (req, res) => {
        SocketHandler.userGetOneStation(req, res);
    });

  app.post('/api/user-add-plant', (req, res) => {
  	SocketHandler.userAddPlant(req, res);
  });

    app.post('/api/user-remove-one-plant', (req, res) => {
        SocketHandler.userRemoveOnePlant(req, res);
    });

  app.post('/api/user-get-one-plant', (req, res) => {
      SocketHandler.userGetOnePlant(req, res);
  });


  app.post('/api/admin-water-plant', (req, res) => {
  	socket.emit('chip-water-plant', payload);
  })
  
});

/* CHIP REQUESTS*/
app.get('/',                  (req, res) => { res.sendFile("./src/routes/client/index.html", {root:__dirname}); });
app.get('/dev',               (req, res) => { /*console.log(req.session);*/ res.sendFile("./src/routes/dev/index.html", {root:__dirname});});
app.get('/api/plants/postmeasurements',    (req, res) => { res.sendFile("./src/routes/api/add.html",    {root:__dirname}); });

app.post('/api/getStation', (req, res) => {
  //req.body = {key: "key"}
  var payload = req.body;
  User.chipGetStation(payload, (station) => {
        station ?
                res.send(station)
            :
            console.log('Station not found.')
  })
});


//------START APP ON PORT (port)--------//
http.listen(app.get('port'),  () => { console.log('Node app is running on port', app.get('port')); });
