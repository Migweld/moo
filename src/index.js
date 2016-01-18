var express = require('express');
var bodyParser = require('body-parser');
var cowsay = require('cowsay');
var env = require('dotenv');

require('dotenv').load();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3000);

app.post('/', function (req, res) {
	if (req.body.token !== process.env.SLACK_TOKEN) {
		return res.send('');
	}
	if (req.body.text == undefined || req.body.text == ''){
		return res.status(400).send('You must give the cow something to say!');
	}

	var response = '```' + cowsay.say({ text: req.body.text }) + '```';

	return res.send(response);
});

app.get('/', function(req,res){
	return res.status(405).send('Method not allowed');
});

app.put('/', function(req,res){
	return res.status(405).send('Method not allowed');
});

app.patch('/', function(req,res){
	return res.status(405).send('Method not allowed');
});

app.all('*', function (req, res) {
	return res.send("Error: Please check your Slash Command's Integration URL")
});
