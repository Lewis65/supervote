var Question = require('../models/Question.js');

module.exports = {

	save: function (req){

		var newQuestion = new Question();

		//Set the author to the current user in session
		var author = req.user.username;

		console.log("=====SAVING QUESTION=====");

		//Push each answer to an array of objects with scores
		for (var key in req.body){
			if(/^answer/.test(key) && req.body[key]!==""){
				newQuestion.answers.push({text: req.body[key], score: 0});
			}
		};

		newQuestion.voted = [];
		newQuestion.posted = Date.now();
		newQuestion.author = author;

		console.log("-----newQuestion");
		console.log(newQuestion);

		console.log("-----Making mongoDB call");
		newQuestion.save(function(err){
			if (err) return err;
		})

	}
}