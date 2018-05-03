var express = require('express');
var router = express.Router();

var Article = require('../models/article');

router.get('/', (req, res, next) => {
	Article.findAll().then((articles) => {res.send(articles)});
});