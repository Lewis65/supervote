var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){
	//Sessions

	//serialize
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	//deserialize
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	//Local signup
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done){

		//async
		process.nextTick(function(){
			//find user with username
			User.findOne({'usernameLower': username.toLowerCase()}, function(err, user){
				if (err) {
					return done(err);
				}

				if (user) {
					//if username in use
					return done(null, false, req.flash('signupMessage', 'Sorry, that username is already in use.'))
				} else {
					//if username not in use
					var newUser = new User();

					newUser.password = newUser.generateHash(password);
					newUser.username = username;
					newUser.usernameLower = username.toLowerCase();
					newUser.questions = [];
					newUser.joinDate = Date.now();

					console.log(newUser);

					newUser.save(function(err){
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));
};