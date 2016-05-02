define([
    'angularAMD', 'services/MapSrv', 'services/PersonSrv', 'directives/PopUpMdl', 'directives/MapMdl', 'directives/MsgMdl',
    'controllers/MapCtrl', 'controllers/PersonCtrl'
], function(angularAMD) {
  var app = angular.module('app', [
      'MapSrvMdl', 'PersonSrvMdl', 'PopUpMdl', 'MapMdl', 'MsgMdl', 'MapCtrlMdl', 'PersonCtrlMdl'
  ]);
  return angularAMD.bootstrap(app);
});
