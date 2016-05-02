define([
    'app', 'angularAMD', 'directives/MsgMdl'
], function(app, angularAMD) {
  describe('MsgMdl.js', function() {
    console.log('### Running directives/MsgMdl.js');
    var compile, scope, personFtr, mapFtr;
    beforeEach(function() {
      angularAMD.inject(function($compile, $rootScope, PersonFtr, MapFtr) {
        compile = $compile;
        scope = $rootScope.$new();
        personFtr = PersonFtr;
        mapFtr = MapFtr;
      });
    });

  });
});
