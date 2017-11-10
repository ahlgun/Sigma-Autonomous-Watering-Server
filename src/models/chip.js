'use strict';
var mongoose = require('mongoose');

var chipSchema = mongoose.Schema({
    name: {
    	type: String, required: true
    },
    id: {
    	type: String, required: true
    }
});

var Chip = module.exports = mongoose.model('Chip', chipSchema);