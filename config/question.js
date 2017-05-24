var Question = require('../models/question.js');
var User = require('../models/user.js')

module.exports = {

	save: function (req){

		var newQuestion = new Question();

		console.log("=====SAVING QUESTION=====");

		//Set the author to the current user in session
		var author = req.user.username;

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

		console.log("-----Saving to mongoDB call");
		newQuestion.save(function(err){
			if (err) {
				return err;
			} else {
				console.log("-----Saving question to user: " + author);
				//How can i push the new question to an existing array (user.questions)?
				//User.findOneAndUpdate({username: author}, )
			}
		});

	},

	delete: function (req){

	}
}