'use strict';
var mongoose = require('mongoose');

// User object schema
var userSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
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



