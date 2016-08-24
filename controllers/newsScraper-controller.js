var cheerio = require('cheerio');
var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var router = express.Router();

var Note = require('../models/Note.js');
var Article = require('../models/Article.js');

router.get('/', function(req, res) {
    request('http://www.recode.net/', function(error, response, html) {
        var $ = cheerio.load(html);
       	var resArray = [];
        $('.c-entry-box__title').each(function(i, element) {
        	var data = {};
            data.title = $(this).children('a').text();
            data.link = $(this).children('a').attr('href');
            // console.log(data);

            resArray.push(data);

            var entry = new Article (data);

            entry.save(function(err, doc) {
            	if (err) {
            		console.log(err);
            	} else {
            		// console.log(doc);
            	}
            })
        });
        // console.log(resArray);
        var hbsObj = { articles: resArray };
        console.log(hbsObj);
        // console.log(hbsObj);
        // var hbsObj = { articles: data };
        // console.log(hbsObj);
        res.render('index', hbsObj);
    });
});

console.log('Controller loaded --> Centralized controller (newsScraper-controller.js');

module.exports = router;
