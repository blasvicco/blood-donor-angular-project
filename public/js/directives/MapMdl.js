define([
    'esri/map', 'esri/dijit/Search', 'esri/graphic', 'esri/geometry/webMercatorUtils', 'esri/tasks/locator', 'dojo/dom', 'app'
], function(Map, Search, Graphic, webMercatorUtils, Locator, dom, app) {
  var map = angular.module('MapMdl', [ ]);
  map.directive('map', [
      '$rootScope',
      'PersonFtr',
      'MapFtr',
      function($rootScope, PersonFtr, MapFtr) {
        return {
          restrict : 'E',
          scope : {},
          link : function link(scope, element, attrs, controller) {
            scope.MapContainer = MapFtr;

            // Map Obj instantiation
            scope.MapContainer.map = new Map('map', {
              basemap : 'topo',
              center : [
                  -122.4194200, 37.7749300
              ],
              zoom : 13
            });

            // Search Obj instantiation
            scope.MapContainer.search = new Search({
              map : scope.MapContainer.map,
            }, dom.byId('search'));
            scope.MapContainer.search.startup();
            scope.MapContainer.map.addLayer(scope.MapContainer.donorsGraphic);

            // Remove spot
            removeSpot = function() {
              scope.MapContainer.map.infoWindow.hide();
              scope.MapContainer.map.graphics.clear();
            }

            // Function to show my location triggered after a search or click on
            // map event
            scope.showLocation = function() {
              // Definition of the Button 'Become a Donor' inside the tooltip
              // 'My Location'
              var butttonText = 'Become a Donor!';
              if (PersonFtr.getId()) {
                butttonText = 'Update your data';
              }
              var openPopUp = angular.element('<button>' + butttonText + '</button>');
              openPopUp.on('click', function() {
                $rootScope.$broadcast('openPopUp');
              });

              scope.MapContainer.map.graphics.clear();

              graphic = new Graphic(scope.MapContainer.me.point, scope.MapContainer.symbolMe);
              scope.MapContainer.map.graphics.add(graphic);

              scope.MapContainer.map.infoWindow.setTitle('Location');

              scope.MapContainer.map.infoWindow.setContent(scope.MapContainer.me.description
                  + '<br /><br /><div id="placeButtonHere"></div>');
              scope.MapContainer.map.infoWindow.show(scope.MapContainer.me.point);
              var placeButtonHere = document.querySelector('#placeButtonHere');
              angular.element(placeButtonHere).append(openPopUp);

              PersonFtr.setWhereIAm(scope.MapContainer.me.coord);
            };

            // show donor data
            showDonor = function(e) {
              // Definition of the clickeable text Contact inside the tooltip
              // 'My Location'
              var contactText = angular.element('<span>Contact</span>');
              contactText.on('click', function() {
                var contactId = document.querySelector('#contactId');
                var contactIdElm = angular.element(contactId);
                var email = scope.MapContainer.donors[contactIdElm.val()].emailAddress;
                var number = scope.MapContainer.donors[contactIdElm.val()].contactNumber;
                angular.element(this).html('Email: ' + email + '<br />Phone: ' + number);
              });

              scope.MapContainer.map.infoWindow.setTitle('Donor');
              var content = '<b>' + e.graphic.attributes.firstName + ' ' + e.graphic.attributes.lastName + '</b>';
              content += '<br />Blood Type: ' + e.graphic.attributes.bloodType;
              content += '<input id="contactId" type="hidden" value="' + e.graphic.attributes.index + '" />';
              content += '<div id="placeContactText"></div>';
              scope.MapContainer.map.infoWindow.setContent(content);
              var placeContactText = document.querySelector('#placeContactText');
              angular.element(placeContactText).append(contactText);
              scope.MapContainer.map.infoWindow.show(e.graphic.geometry);
            };

            // attach on click event to trigger localization based on mapPoint
            scope.MapContainer.map.on('click', function(e) {
              removeSpot();
              if (e.graphic && (e.graphic.attributes._id && (PersonFtr.getId() != e.graphic.attributes._id))) {
                showDonor(e);
              } else {
                scope.MapContainer.locator.locationToAddress(webMercatorUtils.webMercatorToGeographic(e.mapPoint), 100);
              }
            });

            // attach on extent-change event to call donors re population
            scope.MapContainer.map.on('extent-change', function(extentChange) {
              refreshDonors();
            });

            // attach on clear-search event to remove my location
            scope.MapContainer.search.on('clear-search', removeSpot);

            // attach on select-result event to localize me
            scope.MapContainer.search.on('select-result', function(e) {
              scope.MapContainer.me = {
                'point' : e.result.feature.geometry,
                'coord' : {
                  'x' : e.result.feature.geometry.getLongitude(),
                  'y' : e.result.feature.geometry.getLatitude()
                },
                'description' : e.result.name,
                'extent' : e.result.extent
              }
              scope.showLocation();
            });

            // attach on locator location-to-address-complete event to localize
            // me
            scope.MapContainer.locator.on('location-to-address-complete', function(e) {
              scope.MapContainer.me = {
                'point' : e.address.location,
                'coord' : e.address.location,
                'description' : e.address.address.Match_addr,
                'extent' : scope.MapContainer.map.extent
              }
              scope.showLocation();
            });

            // on hide info window remove spot
            scope.MapContainer.map.infoWindow.on('hide', function() {
              removeSpot();
            });

            // Hook Listener for donorAccepted event
            scope.$on('donorAccepted', function(event, data) {
              removeSpot();
              refreshDonors();
            });
          }
        };
      }
  ]);
});
