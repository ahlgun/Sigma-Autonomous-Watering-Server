
/* Express */
var app = require('express')();
/* Socket.io */
var http = require('http').Server( app );
var io = require('socket.io')( http, { wsEngine: 'ws' } );
/* Db & middleware */
var mongoose = require('mongoose'); mongoose.connect('mongodb://sigma-itc-admin:sigma2013!@ds133465.mlab.com:33465/sigma-itc-autonomous-watering', {useMongoClient:true});
var bodyParser = require('body-parser').json({type: 'application/json'}); 
app.set('port', (process.env.PORT || 3000));
app.use( bodyParser );
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next();
});

Chip = require('./src/models/chip.js')
Plants = require('./src/models/plant.js')
//Routes = require('./routes/server/routes.js')

var SocketHandler = require('./src/exports/SocketHandler.js');

io.on('connection', (socket) => {

  /* Generic */
  console.log('A user connected');
  socket.on('disconnect', (socket) => {
  	console.log('A user disconnected');
  })

  /* System actions */
  socket.on('system-add-user', (data) => {
  	SocketHandler.systemAddUser(data, socket);
  });
  socket.on('system-remove-user', (data) => {
  	SocketHandler.systemRemoveUser(data, socket);
  });
  socket.on('system-get-users', (data) => {
  	SocketHandler.systemGetUsers(data, socket);
  });

  /* User actions */
  socket.on('user-add-plant', (data) => {
  	SocketHandler.userAddPlant(data, socket);
  });
  socket.on('user-remove-plant', (data) => {
  	SocketHandler.userRemovePlant(data, socket);
  });
  socket.on('user-edit-plant', (data) => {
  	SocketHandler.userEditPlant(data, socket);
  });
  socket.on('user-get-plants', (data) => {
  	SocketHandler.userGetPlants(data, socket);
  });
  socket.on('user-find-plant', (data) => {
  	SocketHandler.userFindPlant(data, socket);
  });
  socket.on('user-water-plant', (data) => {
  	SocketHandler.userWaterPlant(data, socket);
  });
  socket.on('user-get-one-plant', (data) => {
  	SocketHandler.userGetOnePlant(data, socket);
  });

  /* Chip */
  socket.on('chip-water-plant-confirmation', () => {
  	console.log('Chip watered!');
  	socket.emit('user-water-plant-confirmation');
  })


});




/* Client endpoints */

/* HOMEPAGE */
app.get('/', (req, res) => { 
	res.sendFile("./src/routes/client/index.html", {root:__dirname}); 
});


/* API endpoints */
/* 'POST' */
/* app.post('/api/plants/add', (req, res) => {
  Plants.addPlant(req.body, (err, data) =>                         { data ? res.json(data) : (err) => {throw err}; });
});
app.post('/api/plants/edit', (req, res) => {
  Plants.editPlant(req.body.id, req.body.plant, {}, (err, data) => { data ? res.json(data) : (err) => {throw err}; });
});
app.post('/api/plants/remove', (req, res) => {
  Plants.removePlant(req.body.id, (err, data) =>                   { data ? res.json(data) : (err) => {throw err}; });
}); */

/* 'GET' */
app.get('/api/plants', (req, res) => {
  Plants.getPlants((err, data) =>                                  { data ? res.json(data) : (err) => {throw err}; });
});
app.get('/api', (req, res) =>               { res.sendFile("./src/routes/api/index.html",  {root:__dirname}); });
app.get('/api/plants/add', (req, res) =>    { res.sendFile("./src/routes/api/add.html",    {root:__dirname}); });
app.get('/api/plants/edit', (req, res) =>   { res.sendFile("./src/routes/api/edit.html",   {root:__dirname}); });
app.get('/api/plants/remove', (req, res) => { res.sendFile("./src/routes/api/remove.html", {root:__dirname}); });

/* Development */
app.get('/dev', (req, res) =>               { res.sendFile("./src/routes/dev/index.html",  {root:__dirname}); });


/* Server start */
http.listen(app.get('port'), () => {
	console.log('Node app is running on port', app.get('port'));
});
