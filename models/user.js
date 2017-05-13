var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	username: String,
	usernameLower: String,
	password: String,
	questions: Array,
	joinDate: Date
});

//Methods

//Generate a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//Check password
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);