'use strict';

// Load mongo module
var mongoose = require('mongoose');

// Plant object schema
var plantSchema = mongoose.Schema({
    name:String,
    type:String,
});

// Construct export
var Plant = module.exports = mongoose.model('Plants', plantSchema);

// Get all plants
module.exports.getPlants = (callback, limit) => {
    Plants.find(callback).limit(limit);
}

// Add plant
module.exports.addPlant = (data, callback) => {
    Plant.create(data, callback);
}
