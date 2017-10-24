var app = require('express')();
app.set('port', (process.env.PORT || 5000));

var data = [
	{
		name:'Marigold',
		waterAmountPerDay:'10ml'
	},
	{
		name:'Avocado',
		waterAmountPerDay:'5ml'
	},
]

app.get('/ip', (req, res) => {
  res.send('IP: --- ' + req.ip);
});

app.get('/api', (req, res) => {
  res.JSON(data);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
