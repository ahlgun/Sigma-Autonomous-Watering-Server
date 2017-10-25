var app = require('express')();
app.set('port', (process.env.PORT || 5000));

var mongodb = require('mongodb').MongoClient;
var connectionUrl = 'mongodb://sigma-itc-admin:sigma2013!@ds133465.mlab.com:33465/sigma-itc-autonomous-watering';

// Landingpage
app.get('/', (req, res) => {
  res.sendFile("index.html", {root: __dirname })
});

app.get('/ip', (req, res) => {
  res.json(req.ip);
});

app.get('/plants', (req, res) => {
	mongodb.connect(connectionUrl, (err, db) => {
  	var collection = db.collection('plans')
  	collection.find({},{}).toArray((err, result) => {
  		if(err) {
  			throw err;
  		} else {
  			res.json(result);
  		}
  	})
  })
})

app.get('/api', (req, res) => {
  res.json({
    "plants":{
      "vegetables":[
        {
          "name": "Tomato",
          "watering": "Once every 4th day",
          "description": "Red",
          "imgUrl": "http://www.rona.ca/images/54615034_L.jpg",
          "category": "vegetables"
        }
      ]
    }
  })
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
