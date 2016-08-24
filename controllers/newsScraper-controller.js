var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('home route loaded');
});

console.log('Controller loaded --> Centralized controller (newsScraper-controller.js');

module.exports = router;