'use strict';
var mongoose = require('mongoose');
var User = require('./../models/user.js');

// Plant object schema
var Plantchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
    slot: {type: String},
    date: {type: Date, default: Date.now},
});

// Construct export
var Plant = module.exports = mongoose.model('Plant', Plantchema);

// Returns all Plants in the plant collection (used for development)
module.exports.getAllPlants = (username, callback) => {
    Plant.find({}, callback);
}

// Returns all plants belonging to user queried with username
module.exports.getPlants = (username, callback) => {
    User.findOne({username: username}, callback);
}

// Add plant
module.exports.addPlant = (username, plant, options, callback) => {
    let newPlant = new Plant(plant);
    newPlant._id = mongoose.Types.ObjectId();
    newPlant.save();
    User.findOneAndUpdate({username: username},{ $push: { plants: newPlant }}, options, callback);
}

// Remove plant
module.exports.removeOnePlant = (username, plantId, callback) => {
    console.log(plantId, 'plantidddddd')
    User.findOneAndUpdate({username: username}, {$pull: {"plants": {_id: plantId}}}, function(){
        User.findOne({username: username}, callback);
    })
};

// Edit plant
module.exports.editPlant = (_id, plant, options, callback) => {
    Plant.findOneAndUpdate({_id:_id}, plant, options, callback);
};