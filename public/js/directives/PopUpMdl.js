define([
    'app', 'text!../../views/popup.html', 'angular-messages'
], function(app, popup_html) {
  var popup = angular.module('PopUpMdl', [
    'ngMessages'
  ]);
  popup.run([
      "$templateCache", function($templateCache) {
        $templateCache.put('views/popup.html', popup_html);
      }
  ]);
  popup.directive('popup', [
      'PersonFtr', function(PersonFtr) {
        return {
          restrict : 'E',
          scope : {},
          templateUrl : 'views/popup.html',
          link : function link(scope, element, attrs, controller) {
            scope.show = false;
            scope.openPopUp = function() {
              scope.show = true;
              var popUp = document.querySelector('#popup');
              var backOverlay = document.querySelector('#back-overlay');
              var deleteButton = document.querySelector('#deleteButton');
              if (PersonFtr.getId()) {
                angular.element(deleteButton).removeClass('hide');
              } else {
                angular.element(deleteButton).addClass('hide');
              }

              angular.element(popUp).removeClass('hide');
              angular.element(backOverlay).removeClass('hide');
            };

            scope.closePopUp = function() {
              scope.show = false;
              var popUp = document.querySelector('#popup');
              var backOverlay = document.querySelector('#back-overlay');
              angular.element(popUp).addClass('hide');
              angular.element(backOverlay).addClass('hide');
            };

            // Hook Listener for openPopUp from map event
            scope.$on('openPopUp', function(event, show) {
              scope.openPopUp();
            });

            // Hook Listener for closePopUp from map event
            scope.$on('closePopUp', function(event, show) {
              scope.closePopUp();
            });
          }
        };
      }
  ]);
  popup.directive('backOverlay', [
      '$rootScope', function($rootScope) {
        return {
          restrict : 'E',
          link : function link(scope, element, attrs, controller) {
            element.on('click', function() {
              $rootScope.$broadcast('closePopUp');
            });
          }
        };
      }
  ]);
});
