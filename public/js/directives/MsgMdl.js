define([
    'app', 'text!../../views/msg.html'
], function(app, msg_html) {
  var msg = angular.module('MsgMdl', [ ]);
  msg.run([
      "$templateCache", function($templateCache) {
        $templateCache.put('views/msg.html', msg_html);
      }
  ]);
  msg.directive('msg', [
      '$timeout', function($timeout) {
        return {
          restrict : 'E',
          scope : {},
          templateUrl : 'views/msg.html',
          link : function link(scope, element, attrs, controller) {
            scope.show = false;
            scope.showMsg = function(msg, callback) {
              var msgType = msg.type ? msg.type : 'info';
              if (msg.errors) msgType = 'error';
              var msgContainer = document.querySelector('#msgContainer');
              angular.element(msgContainer).removeClass('error').removeClass('warning').addClass(msgType);

              var msgTitle = document.querySelector('#msgTitle');
              angular.element(msgTitle).html(msg.message);
              var msgContent = document.querySelector('#msgContent');
              angular.element(msgContent).html('');
              for ( var key in msg.errors) {
                angular.element(msgContent).append(msg.errors[key].message + '<br />');
              }
              var msg = document.querySelector('#msg');
              angular.element(msg).removeClass('hide').addClass(scope.msgType);
              $timeout(function() {
                scope.hideMsg();
              }, 4000);
              return callback;
            };

            scope.hideMsg = function() {
              var msg = document.querySelector('#msg');
              angular.element(msg).removeClass(scope.msgType).addClass('hide');
              scope.msgType = '';
              scope.msgTitle = '';
              scope.msgContent = '';
            }

            // Hook Listener for show msg
            scope.$on('showMsg', function(event, msg, callback) {
              scope.showMsg(msg, callback);
            });
          }
        };
      }
  ]);
});
