// app/routes.js
// grab the nerd model we just created

var Person = require('./models/person');
// var email = require('./helpers/emailHlpr');
var ObjectId = require('mongoose').Types.ObjectId;
var path = require('path');
module.exports = function(app, socket, smtp) {
  // frontend routes =========================================================
  // verify
  app.get('/login', function(req, res) {
    res.sendfile(path.resolve('public/index.html'));
  });

  // Socket message handler
  // Add a connect listener
  socket.on('connection', function(client) {
    // Find donors using a center point plus a delta
    // input: req = {longitude: #.###, latitude: #.###}
    client.on('findDonors', function(req) {
      console.log('Searching for Donors');
      req = JSON.parse(req);
      var delta = req.delta ? req.delta : 0.08;
      delta = delta > 0.1 ? 0.1 : delta;
      Person.find({
        'longitude' : {
          $gt : req.longitude - delta,
          $lt : req.longitude + delta
        },
        'latitude' : {
          $gt : req.latitude - delta,
          $lt : req.latitude + delta
        },
        'status' : {
          $ne : 'deleted'
        }
      }, function(err, donors) {
        // Callback of model Find function
        // emit to client the response
        console.log('Donors found');
        client.emit('donorsFound', donors);
      });
    });

    // Creating a donor
    // input: req = Person Model Obj
    client.on('becomeDonor', function(req) {
      console.log('Adding/Updating Donor');
      req = JSON.parse(req);
      req.remoteAddress = client.request.connection.remoteAddress;
      console.log(req);
      // use mongoose to upsert
      if (!req._id) {
        req.status = 'unverified';
        new Person(req).save(function(err, person) {
          // Callback of model Save function
          // emit to client the response
          console.log('Adding Donor Processed');
          data = {
            'errors' : err,
            'Person' : person
          };
          client.emit('becomeDonorResponse', data);
          if (!err) {
            // send email
            // var host = client.handshake.headers.referer.match(/^(http[s]?):\/\/([a-zA-Z0-9-_\.]+)(:[0-9]+)?/);
            // email.sendAccountActivation(person, host[0], smtp);
            console.log('Broadcast new Donor');
            client.broadcast.emit('newDonor', data);
          }
        });
      } else {
        Person.update({
          '_id' : new ObjectId(req._id)
        }, req, {}, function(err) {
          Person.findOne(req, function(err, person) {
            // Callback of model Update function
            // emit to client the response
            console.log('Updating Donor Processed');
            data = {
              'errors' : err,
              'Person' : person
            };
            client.emit('becomeDonorResponse', data);
          });
        });
      }
    });

    // Delete a donor
    // input: req = Person Model Obj
    client.on('delete', function(req) {
      req = JSON.parse(req);
      req.status = 'deleted';
      // Use Model to update the status to delete
      Person.update({
        '_id' : new ObjectId(req._id)
      }, req, {}, function(err) {
        data = {
          'errors' : [ ],
          'Person' : req
        };
        client.broadcast.emit('deletedDonor', data);
        client.emit('deletedDonor', data);
        // send email
        // var host = client.handshake.headers.referer.match(/^(http[s]?):\/\/([a-zA-Z0-9-_\.]+)(:[0-9]+)?/);
        // email.sendAccountRecoveryNotification(req, host[0], smtp);
      });
    });

    // SignIn
    // input: req = { code: Model._id }
    client.on('signIn', function(req) {
      req = JSON.parse(req);
      console.log('Signing in for: ' + req.code);
      Person.findOne({
        '_id' : new ObjectId(req.code)
      }, function(err, person) {
        data = {
          'errors' : err,
          'Person' : person
        };
        if (person) {
          if (person.status != 'verified') {
            person.status = 'verified';
            delete person._id;

            Person.update({
              '_id' : new ObjectId(req.code)
            }, person, {}, function(err) {
              data.errors = err;
            });
            data.Person = person;
          }
        }
        client.emit('signedIn', data);
      });
    });

    client.on('disconnect', function() {
      console.log('Server has disconnected');
    });
  });
};
