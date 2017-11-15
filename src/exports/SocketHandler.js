'use strict';
var mongoose = require('mongoose');
var User = require('./../models/user.js');


/*----------------------AUTHENTICATION----------------------------*/
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


/*----------------------CLIENT SIDE REQUESTS---------------------------*/

exports.userGetStations = function(payload, socket) {
	User.getStations(payload, (err, success) => {
		success ? socket.emit('user-get-stations-confirmation', success) : (err) => {throw err};
	})
}

exports.userGetOneStation = function(payload, socket) {
    User.getOneStation(payload, (err, success) => {
        success ? socket.emit('user-get-one-station-confirmation', success) : (err) => {throw err};
    })
}

exports.userAddStation = function(payload, socket) {
	User.addStation(payload, (err, success) => {
		success ? socket.emit('user-add-station-confirmation', success) : (err) => {throw err};
	})
}

exports.userAddPlant = function(payload, socket) {
	User.addPlant(payload, (err, success) => {
		console.log('plant added:', success)
		//success ? socket.emit('user-add-plant-confirmation', success) : (err) => {throw err};
	})
}