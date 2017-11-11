'use strict';
var app = require('express')();
var http = require('http').Server( app );
var io = require('socket.io')( http, { wsEngine: 'ws' } );
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://sigma-itc-admin:sigma2013!@ds133465.mlab.com:33465/sigma-itc-autonomous-watering', {useMongoClient:true});
var session = require('express-session');

app.set('port', (process.env.PORT || 8080));
app.use(require('body-parser').json({type: 'application/json'})); 
app.use((req, res, next) => {res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next();});

var SocketHandler = require('./src/exports/SocketHandler.js');

io.on('connection', socket => {
  io.emit('user-connection-confirmation')

  // Login user through socket.session;
  
  socket.on('system-add-user', payload => {
  	SocketHandler.systemAddUser(payload, socket);
  });
  socket.on('system-get-users', payload => {
  	SocketHandler.systemGetUsers(payload, socket);
  });
    socket.on('system-get-all-plants', payload => {
        SocketHandler.systemGetAllPlants(payload, socket);
    });
  socket.on('system-remove-user', payload => {
    SocketHandler.systemRemoveUser(payload, socket);
  });
  socket.on('system-login-user', payload => {
    SocketHandler.userAddPlant(payload, socket);
  });


  //---------PLANT EVENTS---------//

    socket.on('user-get-plants', payload => {
        SocketHandler.userGetPlants(payload, socket);
    });
    socket.on('user-get-one-plant', payload => {
        SocketHandler.userGetOnePlant(payload, socket);
    });
    socket.on('user-add-plant', payload => {
        SocketHandler.userAddPlant(payload, socket);
    });
    socket.on('user-remove-one-plant', payload => {
        SocketHandler.userRemoveOnePlant(payload, socket);
    });
    socket.on('user-edit-plant', data => {});
    socket.on('user-water-plant', data => {});
    socket.on('disconnect', socket => {
      // Logout user through socket.session;
    });
});

app.get('/',                  (req, res) => { res.sendFile("./src/routes/client/index.html", {root:__dirname}); });
app.get('/dev',               (req, res) => { res.sendFile("./src/routes/dev/index.html",  {root:__dirname}); });
app.get('/api/plants',        (req, res) => { Plants.getPlants((err, data) => {data ? res.json(data) : (err) => {throw err}; });});
app.get('/api',               (req, res) => { res.sendFile("./src/routes/api/index.html",  {root:__dirname}); });
app.get('/api/plants/add',    (req, res) => { res.sendFile("./src/routes/api/add.html",    {root:__dirname}); });
app.get('/api/plants/edit',   (req, res) => { res.sendFile("./src/routes/api/edit.html",   {root:__dirname}); });
app.get('/api/plants/remove', (req, res) => { res.sendFile("./src/routes/api/remove.html", {root:__dirname}); });
http.listen(app.get('port'),  () => { console.log('Node app is running on port', app.get('port')); });
