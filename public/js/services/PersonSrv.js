define([
  'app'
], function(app) {
  angular.module('PersonSrvMdl', [ ]).factory('PersonFtr', function($rootScope) {

    // SocketIO Obj instantiation
    var socket = new io();

    // Person factory containers
    var me = {
      'donors' : [ ],
      'Person' : {
        '_id' : null,
        'firstName' : null,
        'lastName' : null,
        'contactNumber' : null,
        'emailAddress' : null,
        'bloodType' : null,
        'longitude' : null,
        'latitude' : null
      }
    };

    me.getId = function() {
      return me.getPerson()._id;
    }

    // Setter and Getter of my position
    me.setWhereIAm = function(point) {
      me.getPerson().longitude = point.x;
      me.getPerson().latitude = point.y;
    };

    me.getWhereIAm = function() {
      return {
        'longitude' : me.getPerson().longitude,
        'latitude' : me.getPerson().latitude
      };
    };

    // Getter of donors container
    me.getDonors = function() {
      return me.donors;
    };

    // setter of donors container
    me.setDonors = function(donors) {
      me.donors = donors;
    };

    // Getter of person container
    me.getPerson = function() {
      return me.Person;
    };

    // setter of person container
    me.setPerson = function(Person) {
      me.Person = Person;
    };

    // clean all Person field
    me.clearPerson = function() {
      me.setPerson({
        '_id' : null,
        'firstName' : null,
        'lastName' : null,
        'contactNumber' : null,
        'emailAddress' : null,
        'bloodType' : null,
        'longitude' : null,
        'latitude' : null
      });
    };

    // Trigger emit socket message for findDonors
    me.findDonors = function(lnd, ltd, delta) {
      socket.emit('findDonors', angular.toJson({
        'longitude' : lnd,
        'latitude' : ltd,
        'delta' : delta
      }));

      // Adding on socket message for donorsFounded
      socket.on('donorsFound', function(data) {
        me.setDonors(data);
        $rootScope.$broadcast('donorsFound', me.getDonors());
        socket.removeListener('donorsFound');
      });
    };

    // Trigger emit socket message for becomeDonor
    me.becomeDonor = function(Person) {
      socket.emit('becomeDonor', angular.toJson(Person));

      // Adding on socket message for donorResponse
      socket.on('becomeDonorResponse', function(data) {
        if (data.errors) {
          data.errors.errors = data.errors.errors ? data.errors.errors : data.errors.err;
          $rootScope.$broadcast('showMsg', data.errors);
        } else {
          if (me.getId()) {
            $rootScope.$broadcast('showMsg', {
              'type' : 'success',
              'message' : 'Your details has been updated'
            });
          } else {
            $rootScope.$broadcast('showMsg', {
              'type' : 'success',
              'message' : 'Thank for became a Donor'
            });
          }
          me.setPerson(data.Person);
          $rootScope.$broadcast('donorAccepted', me.getPerson());
          $rootScope.$broadcast('closePopUp', me.getPerson());
          $rootScope.$broadcast('signedIn');
        }
        socket.removeListener('becomeDonorResponse');
      });
    };

    // Trigger emit socket message for delete
    me.setDeleted = function(Person) {
      socket.emit('delete', angular.toJson(Person));
      me.clearPerson();
      $rootScope.$broadcast('signedIn');
      $rootScope.$broadcast('donorAccepted', me.getPerson());
      $rootScope.$broadcast('closePopUp', me.getPerson());
      $rootScope.$broadcast('showMsg', {
        'type' : 'success',
        'message' : 'Your details has been deleted'
      });
    };

    // Login
    me.login = function(code) {
      socket.emit('signIn', angular.toJson({
        'code' : code
      }));

      // Adding on socket message for donorsFounded
      socket.on('signedIn', function(data) {
        if (data.errors) {
          $rootScope.$broadcast('showMsg', data.errors);
        } else if (data.Person) {
          me.setPerson(data.Person);
          $rootScope.$broadcast('showMsg', {
            'type' : 'info',
            'message' : 'Hello ' + me.getPerson().firstName + ', thanks for be a donor.'
          });
          $rootScope.$broadcast('signedIn');
          $rootScope.$broadcast('centerMe');
        }
        socket.removeListener('signedIn');
      });
    };

    // Adding on socket message for newDonor
    socket.on('newDonor', function(data) {
      $rootScope.$broadcast('newDonor', data.Person);
    });

    // Adding on socket message for deleteDonor
    socket.on('deletedDonor', function(data) {
      $rootScope.$broadcast('deletedDonor', data.Person);
    });

    return me;
  });
});
