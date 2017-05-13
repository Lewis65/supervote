module.exports = function(app, passport){

// home

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

//my profile

app.get('/profile', isLoggedIn, headerAuthCheck, function(req, res, next){

	console.log(req);

	let data = {
		metaTitle: 'Supervote - ' + req.user.username + "'s profile",
		metaDesc: '',
		headerBtn1: req.headerBtns[0].text,
		headerBtn1Href: req.headerBtns[0].href,
		headerBtn2: req.headerBtns[1].text,
		headerBtn2Href: req.headerBtns[1].href,
		userJoinDate: req.user.joinDate,
		userQuestions: req.user.questions,
		userQuestionCount: req.user.questions.length,
		userQuestionResponses: 0
	}

	for (var i = 0; i < req.user.questions.length; i++) {
		profile.userQuestionResponses += req.user.questions[i].score;
	}

	res.render('profile', data);

});

//other user's profile

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

// answer questions

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

//ACCOUNTS
//login

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

//signup

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

app.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));

//logout

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
		res.redirect('/');
	} else {
		return next();
	}

}

//Change header buttons if user is logged in
function headerAuthCheck(req, res, next){

	console.log("=====CHECKING USER AUTH=====");
	console.log("REQ.USER");
	console.log(req.user);
	console.log("REQ.ISAUTHENTICATED");
	console.log(req.isAuthenticated);

	if (req.user){
		req.headerBtns = [{text: "logout", href: "/logout"}, 
		{text: "profile", href: "/profile"}];
	} else {
		req.headerBtns = [{text: "login", href: "/login"}, 
		{text: "signup", href: "/signup"}];
	}

	console.log(req.headerBtns);
	console.log("=====Next middleware...=====")

	return next();
}