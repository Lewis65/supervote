var express = require('express');
var router = express.Router();

module.exports = function(app, passport){

// home

router.get('/', function(req, res, next) {
	var isLoggedIn = false;
	var headerBtn = [{text: "login", href: "../login"}, 
		{text: "signup", href: "../signup"}];

	if (isLoggedIn){
		headerBtn = [{text: "logout", href: "../logout"}, 
		{text: "profile", href: "../profile"}];
	}

	let data = {
	  	metaTitle: "SuperVote",
  		metaDesc: "Welcome to SuperVote, the platform where you can ask strangers anything.",
	  	headerBtn1: headerBtn[0].text,
  		headerBtn1Href: headerBtn[0].href,
	  	headerBtn2: headerBtn[1].text,
  		headerBtn2Href: headerBtn[1].href,
	  	mainHeading: "Ask us anything.",
  		mainBody: "<p>SuperVote allows you to view, answer, and ask any question you like. You can see what everyone else is thinking, too.</p>" +
	  	"<div class='button button-cta'><a href='/q'>Start answering</a></div>"
  	}

	res.render('default', data);
});

//user profile

router.get('/u', isLoggedIn, function(req, res, next){
	var isLoggedIn = false;
	var headerBtn = [{text: "login", href: "../login"}, 
		{text: "signup", href: "../signup"}];

	if (isLoggedIn){
		headerBtn = [{text: "logout", href: "../logout"}, 
		{text: "profile", href: "../profile"}];
	}

	//Placeholder to mimic db model of users
	let user = {
		_id: "0001",
		name: "Lewis",
		email: "lewis@lewis.com",
		pass: "password",
		joined: "01 Jan 1987",
		questions: [
			{
				id: "000001",
				question: "Do you like turtles?",
				author: "Lewis",
				description: "Well, do you?",
				submitted: "01 Jan 1987",
				score: 1,
				answers: [
				{
					str: "Yes",
					votes: ["0001"]
				},
				{
					str: "No",
					votes: []
				}
				]
			},
			{
				id: "000002",
				question: "Do you like tulips?",
				author: "Lewis",
				description: "Well, do you?",
				submitted: "01 Jan 1987",
				score: 1,
				answers: [
				{
					str: "Yes",
					votes: ["0001"]
				},
				{
					str: "No",
					votes: []
				}
				]
			}
		]
	}

	let data = {
		metaTitle: "SuperVote",
		metaDesc: "This is " + user.name + "'s profile on SuperVote.",
		headerBtn1: headerBtn[0].text,
  		headerBtn1Href: headerBtn[0].href,
	  	headerBtn2: headerBtn[1].text,
  		headerBtn2Href: headerBtn[1].href,
  		userName: user.name,
  		userJoinDate: user.joined,
  		userQuestions: user.questions,
  		userQuestionCount: user.questions.length,
  		userQuestionResponses: null
	}

	let totalResponses = 0;
	for (let i = 0; i < user.questions.length; i++){
		totalResponses += user.questions[i].score;
	}
	data.userQuestionsResponses = totalResponses;

	res.render('profile', data);

})

// answer questions

router.get('/q', function(req, res, next) {
	res.render('question');
});

//login

app.get('/login', function (req, res, next){
	res.render('login', { message: req.flash('loginMessage') });
});
//app.post('/login', handle login submit with passport);

//signup

app.get('/signup', function(req, res, next){
	res.render('signup', { message: req.flash('signupMessage') });
})
//app.post('/signup', )

};