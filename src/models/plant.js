'use strict';
var mongoose = require('mongoose');

// Plant object schema
var plantSchema = mongoose.Schema({
    name: String,
    watering: String,
    description: String,
    imgUrl: String,
    category: String
});

// Construct export
var Plant = module.exports = mongoose.model('Plants', plantSchema);

// Get all plants
module.exports.getPlants = (callback, limit) => {
    Plants.find(callback).limit(limit);
}

module.exports.getOnePlant = (id, callback) => {
	Plants.findById({_id:id}, callback);
}

// Add plant
module.exports.addPlant = (data, callback) => {
    Plant.create(data, callback);
}

// Remove plant
module.exports.removePlant = (_id, callback) => {
    Plant.findByIdAndRemove(_id, callback);
}

// Edit plant
module.exports.editPlant = (_id, plant, options, callback) => {
    Plant.findOneAndUpdate({_id:_id}, plant, options, callback);
}



