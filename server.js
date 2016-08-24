// require all dependencies
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var request = require('request');

// set up Express app functionality
var app = express();

// set up Express to use static files (css, img, etc.) from the '/public' directory
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse incoming responses into body
app.use(bodyParser.urlencoded({
	extended: false
}));

// set up the view engine to be Handlebars
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// route to the central controller
var routes = require('./controllers/newsScraper-controller.js');
app.use('/', routes);

app.listen(process.env.PORT || 3000, function() {
	if (process.env.PORT == undefined) {
		console.log('server listening on port 3000');
	} else {
    	console.log('server listening on port: ' + process.env.PORT);
    }
});