define([
    'app', 'angularAMD', 'directives/MapMdl'
], function(app, angularAMD) {
  describe('MapMdl.js', function() {
    console.log('### Running directives/MapMdl.js');
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
