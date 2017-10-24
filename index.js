var app = require('express')();
app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
  res.send('Welcome ' + req.ip);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
