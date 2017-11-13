'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var Plant = require('./../models/plant.js');

/*   User(username, password) > [station](name, id) > [Plants](name, id, slot) > [Measurements](time, value)   */

var userSchema = mongoose.Schema({
 
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  stations: [{
    
    name: { type: String, required: true },

    plants: []

  }]

});

var User = module.exports = mongoose.model('User', userSchema);


module.exports.getStations = (payload, callback) => {
  var username = payload.user.username;
  User.findOne({username:username}, (err, user) => {
    if(user) {
      if(user.stations !== null || user.stations.length === 0) {
        callback(null, user.stations)
      } else {
        callback(null, 'User has no stations, or the stations directory is prohibited.')
      }
    } else {
      callback(null, 'User could not be found.');
    }
  })
}

module.exports.getStation = (payload, callback) => {
  var username = payload.user.username;
}

module.exports.addStation = (payload, callback) =>{

      console.log('Adding station')

      var stationName = payload.station.name;
      var username = payload.user.username;
      var password = payload.user.password;

      User.findOne({username: username}, (err, user) => {
          if(user) {

              User.update(
                  {_id: user._id},
                  {
                      $push:
                          {
                              stations:
                                  {name: stationName}
                          }
                  },
                  callback
              );
              console.log('Added station')


          };
  })
}


module.exports.addPlant = (payload, callback) =>
{
    // Get user
    // Push data to specific station
    // Return
    User.findOne({username: payload.user.username}, (err, user) => {
        let stations = user.stations;
        let plantToAdd = new Plant(payload.plant);
        for(var station in user.stations){
          if(user.stations[station].name === payload.station.name){
              user.stations[station].plants.push(plantToAdd);
          }
        }
    User.findOneAndUpdate({username: payload.user.username}, {$set: user}, callback);
})
      /*
  var plant = payload.plant;
  var stationId = payload.station.id;
  var username = payload.user.username;
  var password = payload.user.password;

  User.findOne({username:username}, (err, user) => {
    if(user) {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          User.update(
            //{ _id: user._id },
            //{ $push: { user.stations } },
            //{ $push:
            //  { "stations": {station._id: stationId  { name: plant.name, id: plant.id, slot: plant.slot } } }
            //},
            callback
          );
        } else {
          console.log('Wrong password. \n Try again.')
        }
      });
    } else {
      console.log('User ' + username + ' could not be found.');
    }
  });

  */
}









module.exports.getUsers = (payload, callback) =>   { 
  User.find(callback).limit(payload.limit); 
}

module.exports.removeUser = (payload, callback) => { 
  User.findByIdAndRemove(
    {_id:payload.id}, 
    callback
  ); 
}

module.exports.addUser = function(payload, callback) {
  var username = payload.username;
  var password = payload.password;
  /* User.findOne({username:username}, (err, user) => {
    if(user) {callback('User already exists')}
  }) */
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if(!err) {
      password = hash;
      User.create({username:username, password:password}, callback);
    } else {console.log(err)};
  });
}

module.exports.loginUser = (payload, callback) =>  { 
  User.findOne({username:payload.username}, (err, user) => {
    if(user) {
      bcrypt.compare(payload.password, user.password, (err, res) => {
        if(res) {
          console.log('Password matched stored hash. \nLogging in.')
          // Create sessions
          
        } else {
          console.log('Password did not match stored hash. \nTry again.')  
        }
      });
    } else {
      console.log('User ' + payload.username + ' could not be found.');
    }
  });
}




module.exports.addstationMeasurement = (payload, callback) => {

}

