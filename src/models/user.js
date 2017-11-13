'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;

/*   User(username, password) > [station](name, id) > [Plants](name, id, slot) > [Measurements](time, value)   */

var userSchema = mongoose.Schema({
 
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  stations: [{
    
    name: { type: String, required: true },

    plants: [{
      
      name: { type: String, required: true },
      slot: { type: Number, required: true },

      measurements:[{
        
        time:  { type: String },
        value: { type: String }

      }]

    }]

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

module.exports.addStation = (payload, callback) => {

  console.log('Adding station')

  var stationName = payload.station.name;
  var username = payload.user.username;
  var password = payload.user.password;

  User.findOne({username:username}, (err, user) => {
    if(user) {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          User.update(
            {_id: user._id}, 
            { $push: 
              { stations: 
                { name: stationName } 
              } 
            }, 
            callback
          );
          console.log('Added station')
        } else {
          console.log('Wrong password. \n Try again.')  
        }
      });
    } else {
      console.log('User ' + username + ' could not be found.');
    }
  });
}


module.exports.addPlant = (payload, callback) => {

  console.log('Adding plant')

  var plant = payload.plant;
  var stationId = payload.station.id;
  var username = payload.user.username;
  var password = payload.user.password;

  User.findOne({username:username}, (err, user) => {
    if(user) {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          User.findOneAndUpdate(
            { _id: user._id }, 
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

