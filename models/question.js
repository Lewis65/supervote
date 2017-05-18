var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var questionSchema = mongoose.Schema({
	title: String,
	description: String,
	answers: Array,
	voted: Array,
	posted: Date
});

module.exports = mongoose.model('Question', questionSchema);