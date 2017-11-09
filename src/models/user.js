'use strict';
var mongoose = require('mongoose');

// User object schema
var userSchema = mongoose.Schema({
    username: {
    	type: String, 
    	required:true
    },
    hash: {
    	type: String
    }
});

// Construct export
var Users = module.exports = mongoose.model('Users', userSchema);


module.exports.createUser = function(payload, callback) {
	var username = payload.username;
	var password = payload.password;
	//var hash = bcrypt(password);
	var user = {username:username, hash:password}
    Users.create(user, callback);
}

/*
// Get all users
module.exports.getUsers = (callback, limit) => {
    Users.find(callback).limit(limit);
}

// Add user
module.exports.createUser = (data, callback) => {
    Users.create(data, callback);
}

// Remove user
module.exports.removeUser = (_id, callback) => {
    Users.findByIdAndRemove(_id, callback);
}

// Remove user
module.exports.addPlant = (_id, callback) => {
    Users.findByIdAndRemove(_id, callback);
}

*/


