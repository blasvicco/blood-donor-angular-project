// app/models/person.js

var mongoose = require('mongoose');
var mongooseTypes = require("mongoose-types");
require('mongoose-double')(mongoose);
mongooseTypes.loadTypes(mongoose, "email");

var nameExp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/;
var contactNumberExp = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|\.?|x)[\-\.\ \\\/]?(\d+))?$/;

// define our person model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Person', {
  'firstName' : {
    'type' : 'String',
    'default' : '',
    'match' : nameExp
  },
  'lastName' : {
    'type' : 'String',
    'default' : '',
    'match' : nameExp
  },
  'contactNumber' : {
    'type' : 'String',
    'default' : '',
    'match' : contactNumberExp
  },
  'emailAddress' : {
    'type' : 'email',
    'default' : ''
  },
  'bloodType' : {
    'type' : 'String',
    'default' : '',
    'enum' : ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
  },
  'remoteAddress' : {
    'type' : 'String',
    'default' : ''
  },
  'longitude' : {
    'type' : 'Double',
    'default' : ''
  },
  'latitude' : {
    'type' : 'Double',
    'default' : ''
  },
  'status' : {
    'type' : 'String',
    'default' : '',
    'enum' : ['unverified', 'verified']
  }
});
