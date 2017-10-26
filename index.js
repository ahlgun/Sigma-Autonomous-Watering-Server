
// --- | Dependencies | --- //
var app = require('express')();
var mongoose = require('mongoose'); mongoose.connect('mongodb://sigma-itc-admin:sigma2013!@ds133465.mlab.com:33465/sigma-itc-autonomous-watering', {useMongoClient:true});
var bodyParser = require('body-parser'); var jsonParser = bodyParser.json({ type: 'application/json' });

app.set('port', (process.env.PORT || 3000));
app.use(jsonParser);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next();
});

Plants = require('./models/plant.js')



// Index
app.get('/', (req, res) => {
  res.sendFile("/routes/index.html", {root: __dirname})
});
// Get plants
app.get('/plants', (req, res) => {
    Plants.getPlants((err, data) => {
        data ? res.json(data) : (err) => {throw err};
    });
});



// Add
app.post('/plants/add', (req, res) => {
    Plants.addPlant(req.body, (err, data) => {
        data ? res.json(data) : (err) => {throw err};
    });
});
app.get('/plants/add', (req, res) => {
  res.sendFile("/routes/add.html", {root:__dirname});
});



// Edit
app.post('/plants/edit', (req, res) => {
    Plants.editPlant(req.body.id, req.body.plant, {}, (err, data) => {
        data ? res.json(data) : (err) => {throw err};
    });
});
app.get('/plants/edit', (req, res) => {
  res.sendFile("/routes/edit.html", {root:__dirname});
});



// Remove
app.post('/plants/remove', (req, res) => {
    Plants.removePlant(req.body.id, (err, data) => {
        data ? res.json(data) : (err) => {throw err};
    });
});
app.get('/plants/remove', (req, res) => {
  res.sendFile("/routes/remove.html", {root:__dirname});
});



// --- | Run server | --- //
app.listen(app.get('port'), () => {console.log('Node app is running on port', app.get('port'));});
