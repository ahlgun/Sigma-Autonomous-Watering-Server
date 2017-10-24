// Define & run express app
var app = require('express')();
// Set pev
app.set('port', (process.env.PORT || 5000));


// Landingpage
app.get('/', (req, res) => {
  res.sendFile("index.html", {root: __dirname })
});

app.get('/ip', (req, res) => {
  res.json(req.ip);
});

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
