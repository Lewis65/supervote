var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var questionSchema = mongoose.Schema({
	title: String,
	description: String,
	//Array of objects as in:
	//[{text: 'answer1', score: 2}, {text: 'answer2', score: 4}]
	answers: Array,
	voted: Array,
	posted: String,
	author: String
});

module.exports = mongoose.model('Question', questionSchema);