
var mongoose = require('mongoose');
Plants = require('./../models/plant.js')


exports.systemAddUser = function(data, socket) {}
exports.systemRemoveUser = function(data, socket) {}
exports.systemGetUsers = function(data, socket) {}


exports.userAddPlant = function(data, socket) {
  Plants.addPlant(data.plant, (err, success) => { 
  	success ? socket.emit('user-add-plant-confirmation', success) : (err) => {throw err}; 
  });
}

exports.userEditPlant = function(data, socket) {
	var plant = data.plant;
	Plants.editPlant(plant.id, plant, {}, (err, success) => { 
		success ? socket.emit('user-edit-plant-confirmation', success) : (err) => {throw err}; 
	});
}

exports.userRemovePlant = function(data, socket) {
	var plant = data.plant;
  Plants.removePlant(plant.id, (err, success) => {
  	success ? socket.emit('user-remove-plant-confirmation', success) : (err) => {throw err};
  });
}

exports.userGetPlants = function(data, socket) {
	Plants.getPlants((err, success) => {
		success ? socket.emit('user-get-plants-confirmation', success) : (err) => {throw err};
	});
}

exports.userGetOnePlant = function(data, socket) {
	Plants.getOnePlant(data.plant.id, (err, success) => {
		success ? socket.emit('user-get-one-plant-confirmation', success) : (err) => {throw err};
	});
}

exports.userFindPlant = function(data, socket) {}

exports.userWaterPlant = function(data, socket) {
  socket.emit('chip-water-plant');
}