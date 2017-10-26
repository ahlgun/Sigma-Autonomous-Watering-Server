
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


// --- | Routes | --- //

// Index
app.get('/', (req, res) => {res.sendFile("/routes/index.html", {root: __dirname})});
// Get plants
app.get('/plants', function(req, res) {
    Plants.getPlants(function(err, data) {
        // If successfull, return json data, else throw error;
        data ? res.json(data) : (err) => {throw err};
    });
});
// Add plant
app.post('/plants', function(req, res) {
    var plant = req.body;
    Plants.addPlant(car, function(err, data) {
        console.log("Added plant: " + data)
        // If successfull, return json data, else throw error;
        data ? res.json(data) : (err) => {throw err};
    });
});





// --- | Run server | --- //
app.listen(app.get('port'), () => {console.log('Node app is running on port', app.get('port'));});
