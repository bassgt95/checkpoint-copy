'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

var Article = db.define('article', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	snippet: {
		type: Sequelize.VIRTUAL,
		get: function() {
			if(this.content) {
				console.log(this.content);
				return this.content.slice(0, 23) + '...';
			}
			else return '';
		},
	},
});

Article.prototype.truncate = function(length) {
		this.content = this.content.slice(0, length);
	}
Article.findByTitle = function(title) {
		Article.findAll({where: {title: title}})
			.then((articles) => articles);
},

Article.belongsTo(User, {as: 'author'});

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
