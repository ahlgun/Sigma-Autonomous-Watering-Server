'use strict';
var mongoose = require('mongoose');
var User = require('./../models/user.js');



exports.systemAddUser = function(payload, socket) {
	User.addUser(payload, (err, success) => {
  	success ? socket.emit('system-add-user-confirmation', success) : (err) => {throw err}; 
	});
}

exports.systemGetUsers = function(payload, socket) {
	User.getUsers(payload, (err, success) => {
  	success ? socket.emit('system-get-users-confirmation', success) : (err) => {throw err}; 
	});
}

exports.systemRemoveUser = function(payload, socket) {
  User.removeUser(payload, (err, success) => {
  	success ? socket.emit('system-remove-user-confirmation', success) : (err) => {throw err}; 
  });
}

exports.systemLoginUser = function(payload, socket) {
	User.loginUser(payload, (err, success) => {
  	success ? socket.emit('system-login-user-confirmation', success) : (err) => {throw err};
	});
}




exports.userAddChip = function(payload, socket) {
	User.addChip(payload, (err, success) => {
		success ? socket.emit('user-add-chip-confirmation', success) : (err) => {throw err};
	})
}