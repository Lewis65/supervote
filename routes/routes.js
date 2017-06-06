var question = require('../config/question.js');

module.exports = function(app, passport){

app.all('*', function(req, res, next){
	console.log("NAVIGATING TO: " + req.path);
	next();
});


//HOME

app.get('/', headerAuthCheck, function(req, res, next) {

	let data = {
	  	metaTitle: "SuperVote",
  		metaDesc: "Welcome to SuperVote, the platform where you can ask strangers anything.",
	  	headerBtn1: req.headerBtns[0].text,
		headerBtn1Href: req.headerBtns[0].href,
		headerBtn2: req.headerBtns[1].text,
		headerBtn2Href: req.headerBtns[1].href,
	  	mainHeading: "Ask us anything.",
  		mainBody: "<p>SuperVote allows you to view, answer, and ask any question you like. You can see what everyone else is thinking, too.</p>" +
	  	"<div class='button button-cta'><a href='/q'>Start answering</a></div>"
  	}

	res.render('default', data);
});


//=====PROFILES=====

//MY PROFILE

app.get('/profile', isLoggedIn, headerAuthCheck, function(req, res, next){

	let data = {
		metaTitle: 'Supervote - ' + req.user.username + "'s profile",
		metaDesc: '',
		headerBtn1: req.headerBtns[0].text,
		headerBtn1Href: req.headerBtns[0].href,
		headerBtn2: req.headerBtns[1].text,
		headerBtn2Href: req.headerBtns[1].href,
		userJoinDate: req.user.joinDate,
		userName: req.user.username,
		userQuestions: req.user.questions,
		userQuestionCount: req.user.questions.length,
		userQuestionResponses: 0
	}

	for (var i = 0; i < req.user.questions.length; i++) {
		data.userQuestionResponses += req.user.questions[i].score;
	}

	res.render('profile', data);

});

//OTHER USER'S PROFILE

app.get('/u/:username', headerAuthCheck, function(req, res, next){

	let data = {
		metaTitle: 'Supervote - ' + req.params.username + "'s profile",
		metaDesc: '',
		headerBtn1: req.headerBtns[0].text,
		headerBtn1Href: req.headerBtns[0].href,
		headerBtn2: req.headerBtns[1].text,
		headerBtn2Href: req.headerBtns[1].href,
		userJoinDate: '',
		userQuestions: [],
		userQuestionCount: '',
		userQuestionResponses: 0
	}

	console.log(req.params);

	res.render('user', data);
});


//=====QUESTIONS=====

//NEW QUESTION

app.get('/q/new', //isLoggedIn, 
	headerAuthCheck, function(req, res, next) {

	let data = {
		metaTitle: 'Supervote - New question',
		metaDesc: 'Write a new question on Supervote',
		headerBtn1: req.headerBtns[0].text,
		headerBtn1Href: req.headerBtns[0].href,
		headerBtn2: req.headerBtns[1].text,
		headerBtn2Href: req.headerBtns[1].href,
		message: req.flash('newQuestionMessage')
	}

	res.render('newquestion', data);
});

app.post('/q/new', isLoggedIn, headerAuthCheck, function(req, res, next){

	question.save(req, res);

});

//ANSWER QUESTIONS

app.get('/q', headerAuthCheck, function(req, res, next) {

	let data = {
		metaTitle: 'Supervote',
		metaDesc: '',
		headerBtn1: req.headerBtns[0].text,
		headerBtn1Href: req.headerBtns[0].href,
		headerBtn2: req.headerBtns[1].text,
		headerBtn2Href: req.headerBtns[1].href
	}

	res.render('question', data);
});


//=====ACCOUNTS=====

//LOGIN
//Render the login form if not already logged in, else redirect to home
app.get('/login', isNotLoggedIn, headerAuthCheck, function (req, res, next){

	let data = {
		metaTitle: 'Supervote - Login',
		metaDesc: '',
		headerBtn1: req.headerBtns[0].text,
		headerBtn1Href: req.headerBtns[0].href,
		headerBtn2: req.headerBtns[1].text,
		headerBtn2Href: req.headerBtns[1].href,
		message: req.flash('loginMessage')
	}

	res.render('login', data);
});

app.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

//SIGNUP

//Render the signup form
app.get('/signup', headerAuthCheck, function(req, res, next){

	let data = {
		metaTitle: 'Supervote - Login',
		metaDesc: '',
		headerBtn1: req.headerBtns[0].text,
		headerBtn1Href: req.headerBtns[0].href,
		headerBtn2: req.headerBtns[1].text,
		headerBtn2Href: req.headerBtns[1].href,
		message: req.flash('signupMessage')
	}

	res.render('signup', data);
})

//Upon submission of the signup form
app.post('/signup', passwordCheck, passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));


//LOGOUT

app.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
});

};

//=====MIDDLEWARE=====

//check if user is currently logged in
function isLoggedIn(req, res, next){

	if (req.isAuthenticated())
		return next();
	res.redirect('/login');

}

function isNotLoggedIn(req, res, next){

	if (req.isAuthenticated()){
		res.redirect('/profile');
	} else {
		return next();
	}

}

//Change header buttons if user is logged in
function headerAuthCheck(req, res, next){

	console.log("=====CHECKING USER AUTH=====");
	console.log("REQ.USER");
	console.log(req.user);

	if (req.user){
		req.headerBtns = [{text: "logout", href: "/logout"}, 
		{text: "profile", href: "/profile"}];
	} else {
		req.headerBtns = [{text: "login", href: "/login"}, 
		{text: "signup", href: "/signup"}];
	}

	console.log("=====HEADER BUTTONS=====");
	console.log(req.headerBtns);
	console.log("End of headerAuthCheck.");

	return next();
}

function passwordCheck(req, res, next){
	console.log(req.body)

	if(req.body.password!==req.body.confirmpassword){
		req.flash('signupMessage', 'Sorry, those passwords don\'t match.');
		res.redirect('/signup');
	} else {
		return next();
	}
}