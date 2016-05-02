define([
    "esri/graphic", "esri/geometry/Point", 'app'
], function(Graphic, Point, app) {
  var esriMap = angular.module('MapCtrlMdl', [ ]);
  esriMap.controller('MapCtrl', [
      '$scope',
      'MapFtr',
      'PersonFtr',
      function($scope, MapFtr, PersonFtr) {
        $scope.MapContainer = MapFtr;
        $scope.MapContainer.me = {};

        shouldRefreshDonors = function(donor) {
          var lndMin = $scope.MapContainer.map.geographicExtent.getCenter().x - 1 / $scope.MapContainer.map.getLevel();
          var lndMax = $scope.MapContainer.map.geographicExtent.getCenter().x + 1 / $scope.MapContainer.map.getLevel();
          var ltdMin = $scope.MapContainer.map.geographicExtent.getCenter().y - 1 / $scope.MapContainer.map.getLevel();
          var ltdMax = $scope.MapContainer.map.geographicExtent.getCenter().y + 1 / $scope.MapContainer.map.getLevel();
          var should = ((donor.longitude > lndMin) && (donor.longitude < lndMax));
          should = should || ((donor.longitude < lndMin) && (donor.longitude > lndMax));
          should = should && ((donor.latitude > ltdMin) && (donor.latitude < ltdMax));
          should = should || ((donor.latitude < ltdMin) && (donor.latitude > ltdMax));
          return should;
        }

        // Function to request donors on area after a map relocalization
        refreshDonors = function() {
          PersonFtr.findDonors($scope.MapContainer.map.geographicExtent.getCenter().x,
              $scope.MapContainer.map.geographicExtent.getCenter().y, 1 / $scope.MapContainer.map.getLevel());
        };

        // Hook Listener for donorsFound event
        $scope.$on('donorsFound', function(event, data) {
          $scope.MapContainer.donorsGraphic.clear();
          $scope.MapContainer.donors = data;
          for (var i = data.length - 1; i > -1; i--) {
            var point = new Point(data[i]);
            graphic = new Graphic(point, $scope.MapContainer.symbolDonor);
            if (PersonFtr.getId() == data[i]._id) {
              graphic = new Graphic(point, $scope.MapContainer.symbolMe);
            }
            graphic.attributes = data[i];
            graphic.attributes.index = i;
            $scope.MapContainer.donorsGraphic.add(graphic);
          }
        });

        // Hook Listener for new donor event
        $scope.$on('newDonor', function(event, donor) {
          if (shouldRefreshDonors(donor)) {
            refreshDonors();
          }
        });

        // Hook Listener for delete donor event
        $scope.$on('deletedDonor', function(event, donor) {
          if (shouldRefreshDonors(donor)) {
            refreshDonors();
          }
        });

        // Hook Listener for center me event
        $scope.$on('centerMe', function(event) {
          var point = new Point(PersonFtr.getWhereIAm());
          $scope.MapContainer.map.centerAndZoom(point, 14);
        });
      }
  ]);
});
