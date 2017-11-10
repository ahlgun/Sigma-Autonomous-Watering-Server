'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;

/*   User(username, password) > [Chip](name, id) > [Plants](name, id, slot) > [Measurements](time, value)   */

var userSchema = mongoose.Schema({
 
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  chip: [{
    name: { type: String, required: true },
    id: { type: String, required: true},
    
    plants: [{
      name: { type: String, required: true },
      id: { type: String, required: true  },
      slot: { type: Number, required: true },
      
      measurements:[{
        time: { type: String },
        value: { type: String }
      }]
    
    }]

  }]

});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(payload, callback) {
  var username = payload.username;
  var password = payload.password;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if(!err) {
      password = hash;
      User.create({username:username, password:password}, callback);
    } else {console.log(err)};
  });
}

module.exports.getUsers = (payload, callback) => {
  User.find(callback).limit(payload.limit);
}

module.exports.removeUser = (payload, callback) => {
  User.findByIdAndRemove({_id:payload.id}, callback);
}

module.exports.loginUser = (payload, callback) => {
  User.findOne({username:payload.username}, callback);
}


/*  Payload = payload.chip(name, id) + payload.user(id); */
module.exports.addChip = (payload, callback) => {
  User.findOneAndUpdate( payload.user.id, { $push: { chip: { name: payload.chip.name, id: payload.chip.id } } }, callback);
}

module.exports.addChipMeasurement = (payload, callback) => {

}

