module.exports = function(app, passport){

// home

app.get('/', function(req, res, next) {
	var headerBtn = headerAuthCheck(req);

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

app.get('/u', isLoggedIn, function(req, res, next){
	res.render('profile', {
		user: req.user
	});
});

// answer questions

app.get('/q', function(req, res, next) {
	res.render('question');
});

//ACCOUNTS
//login

app.get('/login', function (req, res, next){
	res.render('login');
	//, { message: req.flash('loginMessage') }
});
//app.post('/login', handle login submit);

//signup

app.get('/signup', function(req, res, next){
	res.render('signup', { message: req.flash('signupMessage') });
})
//app.post('/signup', handle signup submit)

//logout

app.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
});

};

//MIDDLEWARE

//check if user is currently logged in
function isLoggedIn(req, res, next){

	if (req.isAuthenticated())
		return next();
	res.redirect('/');

}

//Change header buttons if user is logged in
function headerAuthCheck(req){

	var buttons = [{text: "login", href: "/login"}, 
		{text: "signup", href: "/signup"}];

	if (req.isAuthenticated){
		buttons = [{text: "logout", href: "/logout"}, 
		{text: "profile", href: "/u"}];
	}

	return buttons;
}