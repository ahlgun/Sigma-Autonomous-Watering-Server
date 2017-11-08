
/* Express */
var app = require('express')();

/* Socket.io */
var http = require('http').Server(app);
var io = require('socket.io')(http, { wsEngine: 'ws' });

/* Db & middleware */
var mongoose = require('mongoose'); mongoose.connect('mongodb://sigma-itc-admin:sigma2013!@ds133465.mlab.com:33465/sigma-itc-autonomous-watering', {useMongoClient:true});
var bodyParser = require('body-parser').json({type: 'application/json'}); 

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser);
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
next();});

Plants = require('./models/plant.js')
//Routes = require('./routes/server/routes.js')





/* Socket.io Events */
io.on('connection', (socket) => {
  socket.on('water', function(data) {
    let requestConfirmation = 'Server recieved your request. ';
    if(!data.user)    requestConfirmation += '\n No user was present in request. ';
    if(!data.payload) requestConfirmation += '\n No payload was present in request';
    if(data.user && data.payload) {
      requestConfirmation += '\n User: ' + data.user.email + '\n Token: ' + data.user.token;
      requestConfirmation += '\n Payload: ' + data.payload;
    }
    socket.emit('water-confirmation', requestConfirmation);
  });
});




/* Client endpoints */

/* HOMEPAGE */
app.get('/', (req, res) => { 
	res.sendFile("./routes/client/index.html", {root:__dirname}); 
});


/* API endpoints */
/* 'POST' */
app.post('/api/plants/add', (req, res) => {
  Plants.addPlant(req.body, (err, data) =>                         { data ? res.json(data) : (err) => {throw err}; });
});
app.post('/api/plants/edit', (req, res) => {
  Plants.editPlant(req.body.id, req.body.plant, {}, (err, data) => { data ? res.json(data) : (err) => {throw err}; });
});
app.post('/api/plants/remove', (req, res) => {
  Plants.removePlant(req.body.id, (err, data) =>                   { data ? res.json(data) : (err) => {throw err}; });
});

/* 'GET' */
app.get('/api/plants', (req, res) => {
  Plants.getPlants((err, data) =>                                  { data ? res.json(data) : (err) => {throw err}; });
});
app.get('/api', (req, res) =>               { res.sendFile("./routes/api/index.html",  {root:__dirname}); });
app.get('/api/plants/add', (req, res) =>    { res.sendFile("./routes/api/add.html",    {root:__dirname}); });
app.get('/api/plants/edit', (req, res) =>   { res.sendFile("./routes/api/edit.html",   {root:__dirname}); });
app.get('/api/plants/remove', (req, res) => { res.sendFile("./routes/api/remove.html", {root:__dirname}); });

/* Development */
app.get('/dev', (req, res) =>               { res.sendFile("./routes/dev/index.html",  {root:__dirname}); });


/* Server start */
http.listen(app.get('port'), () => {
	console.log('Node app is running on port', app.get('port'));
});
