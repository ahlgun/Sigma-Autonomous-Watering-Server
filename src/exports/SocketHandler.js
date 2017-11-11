'use strict';
var mongoose = require('mongoose');
var User = require('./../models/user.js');
var Plant = require('./../models/plant.js');



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

exports.systemGetAllPlants = function(payload, socket) {
    Plant.getAllPlants(payload, (err, success) => {
        success ? socket.emit('system-get-plants-confirmation', success) : (err) => {throw err};
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

//---------------PLANT EVENTS------------------//

// Add a plant queried with username.
// Send a plant object as "plant to add" to the user document.
exports.userAddPlant = function(payload, socket) {
    if(payload.plant!== undefined) { // Needed for not auto-running.
        Plant.addPlant(payload.username, payload.plant, {}, function (err, success) {
            success ? socket.emit('user-add-plant-confirmation', success) : (err) => {
            };
        })
    }
}

// Get all plants from user queried with username
exports.userGetPlants = function(payload, socket) {
    Plant.getPlants(payload.username, function (err, success) {
        let plants = success.plants;
        success ? socket.emit('user-get-plants-confirmation', plants) : (err) => {console.log(err)};
    })
}

// Get one plant from user queried with username
// returns all plants belonging to user which is then sorted on client side.
exports.userGetOnePlant = function(payload, socket) {
    let username = payload.user.username;
    Plant.getPlants(username, function (err, success) {
        success ? socket.emit('user-get-one-plant-confirmation', success.plants) : (err) => {console.log(err)};
    })
}

// Remove specific plant inside user object, queried with plant-id.
// Removes plant in Plant.RemoveOnePlant and then returns users updated plant list.
exports.userRemoveOnePlant = function(payload, socket) {
    let username = payload.user.username;
    //turns plantId into same type as objects id ( which is a mongoose.Types.ObjectId)
    let plantId = mongoose.Types.ObjectId(payload.plant.id);
    Plant.removeOnePlant(username, plantId, function (err, success) {
        success ? socket.emit('user-remove-one-plant-confirmation', success.plants) : (err) => {console.log(err)};
    })
}

