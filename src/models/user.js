'use strict';
var mongoose = require('mongoose');

// User object schema
var userSchema = mongoose.Schema({
    email: String,
    token: String
});

// Construct export
var Users = module.exports = mongoose.model('Users', plantSchema);

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



