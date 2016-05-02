define([
  'app'
], function(app) {
  angular.module('PersonCtrlMdl', [ ]).controller('PersonCtrl', [
      '$scope', '$location', 'PersonFtr', function($scope, $location, PersonFtr) {

        if ($location.search().code) {
          PersonFtr.login($location.search().code);
        }

        // Hook Listener for new donor event
        $scope.$on('signedIn', function(event) {
          $scope.Person = PersonFtr.Person;
        });

        //Definition of the delete function to trigger on popup form delete submission
        $scope.setDeleted = function() {
          PersonFtr.setDeleted($scope.Person);
        }

        //Definition of the update function to trigger on popup form submission
        $scope.update = function() {
          $scope.Person.longitude = PersonFtr.getWhereIAm().longitude;
          $scope.Person.latitude = PersonFtr.getWhereIAm().latitude;
          PersonFtr.becomeDonor($scope.Person);
        }
      }
  ]);
});
