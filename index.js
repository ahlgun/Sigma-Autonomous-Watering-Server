var app = require('express')();
app.set('port', (process.env.PORT || 5000));



app.get('/', (req, res) => {
  res.sendFile("index.html", {root: __dirname })
});

app.get('/ip', (req, res) => {
  res.json(req.ip);
});

app.get('/api', (req, res) => {
  res.json({name:'hello'})
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
