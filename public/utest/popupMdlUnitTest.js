define([
    'app', 'angularAMD', 'directives/PopUpMdl'
], function(app, angularAMD) {
  describe('PopUpMdl.js', function() {
    console.log('### Running directives/PopUpMdl.js');
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
