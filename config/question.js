var Question = require('../models/question.js');
var User = require('../models/user.js');
var moment = require('moment');

module.exports = {

	save: function (req, res){

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

		newQuestion.title = req.body.title;
		newQuestion.description = req.body.description;
		newQuestion.voted = [];
		newQuestion.posted = moment().format("MMM Do [']YY");
		newQuestion.author = author;

		console.log("-----newQuestion");
		console.log(newQuestion);

		if(newQuestion.title == "" || newQuestion.description == ""){
			req.flash("newQuestionMessage", "Title and description must not be blank.")
			res.redirect("/q/new");
		};

		console.log("-----Saving to questions collection");
		newQuestion.save(function(err){
			if (err) {
				return err;
			} else {
				console.log("-----Saving question to user: " + author);
				User.findByIdAndUpdate(req.user._id, 
					{$push: {questions: newQuestion}},
					{safe: true},
					function(err){
						if(err){
							console.log(err);
						} else {
							res.redirect("/profile")
						}
					}
				);
			}
		});
		console.log("---" + author + ".questions:");
		console.log(req.user.questions);

		console.log("/q/new POST req.body");
		console.log(req.body)

	},

	delete: function (req){

	}
}