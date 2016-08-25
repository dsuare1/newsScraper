var cheerio = require('cheerio');
var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var router = express.Router();

var Note = require('../models/Note.js');
var Article = require('../models/Article.js');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/articles', function(req, res) {
	request('http://www.recode.net/', function(error, response, html) {
		if (error) {
			console.log('Error with request: ' + error);
		}
		console.log('Response status code: ' + response.statusCode);
		if (response.statusCode === 200) {
	        var $ = cheerio.load(html);
	       	var resArray = [];
	        $('.c-entry-box__title').each(function(i, element) {
	        	var data = {};
	            data.title = $(this).children('a').text();
	            data.link = $(this).children('a').attr('href');

	            resArray.push(data);

	            var entry = new Article (data);

	            entry.save(function(err, doc) {
	            	if (err) {
	            		console.log(err);
	            	} else {
	            		return;
	            	}
	            })
	        });
	        var hbsObj = { articles: resArray };
	        res.json(hbsObj);
	    }
    });
})

console.log('Controller loaded --> Centralized controller (newsScraper-controller.js');

module.exports = router;


