'use strict';
var mongoose = require('mongoose');
var User = require('./../models/user.js');


/*----------------------AUTHENTICATION----------------------------*/
exports.systemAddUser = function(req, res) {
	var payload = req.body;
	User.addUser(payload, (err, success) => {
		console.log('success created user:', success)
  	success ? res.send(success) : (err) => {throw err};
	});
}

exports.systemGetUsers = function(req, res) {
	User.getUsers(payload, (err, success) => {
  	success ? socket.emit('system-get-users-confirmation', success) : (err) => {throw err}; 
	});
}

exports.systemRemoveUser = function(req, res) {
  User.removeUser(payload, (err, success) => {
  	success ? socket.emit('system-remove-user-confirmation', success) : (err) => {throw err}; 
  });
}

exports.systemLoginUser = function(req, res) {
	User.loginUser(payload, (err, success) => {
  	success ? socket.emit('system-login-user-confirmation', success) : (err) => {throw err};
	});
}


/*----------------------CLIENT SIDE REQUESTS---------------------------*/

exports.userAddStation = function(req, res) {
    var payload = req.body;
    User.addStation(payload, (err, success) => {
        success ? res.send(success) : (err) => {throw err}
    })
}


exports.userGetStations = function(req, res) {
	console.log('getting stations')
    var payload = req.body;
    User.getStations(payload, (err, success) => {
        success ? res.send(success) : (err) => {throw err}
    })
}

exports.userGetOneStation = function(req, res) {
    var payload = req.body;
    User.getOneStation(payload, (err, success) => {
        success ? res.send(success) : (err) => {throw err}
    })
}


exports.userDeleteOneStation = function(req, res) {
    var payload = req.body;
    User.deleteOneStation(payload, (err, success) => {
        success ? res.send(success) : (err) => {throw err}
    })
}

exports.userAddPlant = function(req, res) {
    var payload = req.body;
    User.addPlant(payload, (err, success) => {
        success ? res.send(success) : (err) => {throw err}
    })
}

exports.userRemoveOnePlant = function(req, res) {
    var payload = req.body;
    User.removeOnePlant(payload, (err, success) => {
        success ? res.send(success) : (err) => {throw err}
    })
}

exports.userGetOnePlant = function(req, res) {
    var payload = req.body;
    User.getOnePlant(payload, (err, success) => {
        success ? res.send(success) : (err) => {throw err}
    })
}