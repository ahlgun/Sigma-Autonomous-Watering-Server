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
      key: {type: String, required: true},
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

module.exports.getOneStation = (payload, callback) => {
    var username = payload.user.username;
    var stationName = payload.station.name;
    console.log(payload)
    User.findOne({username:username}, (err, user) => {
        if(user) {
            console.log(user.stations)
            if(user.stations !== null || user.stations.length === 0) {
                for(var station in user.stations){
                    if(user.stations[station].name === stationName){
                        console.log(user.stations[station], '=the station')
                        callback(null, user.stations[station])
                    }
                }
            } else {
                callback(null, 'User has no stations, or the stations directory is prohibited.')
            }
        } else {
            callback(null, 'User could not be found.');
        }
    })
}


module.exports.addStation = (payload, callback) =>{
      console.log('Adding station')
      var station = payload.station;
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
                                  station
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





//-------------CHIP REQUESTS----------------//

module.exports.chipInitializeStation = (payload, callback) =>  {
    User.find({"stations":{"$elemMatch":{"key": payload.station.key}}},
        (err, success) => {
            if(success){
                for(var station in success.stations) {
                    if (station.key === payload) {
                        callback(success.stations[station]);
                    }
                }
            }
        }
    )
}

module.exports.chipGetStation = (payload, callback) =>  {
    User.find({"stations":{"$elemMatch":{"key": payload.key}}},
        (err, success) => {

            if(success){
                for(var station in success[0].stations) {
                    if (success[0].stations[station].key === payload.key) {

                        callback(success[0].stations[station])
                    }
                }
            }
        }
    )
}


module.exports.chipAddStationMeasurement = (payload, callback) => {

}


