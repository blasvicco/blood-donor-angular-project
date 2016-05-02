define([
    'app', 'angularAMD', 'services/MapSrv'
], function(app, angularAMD) {
  describe('MapSrv.js', function() {
    console.log('### Running services/MapSrv.js');
    var scope;

    beforeEach(function() {

      angularAMD.inject(function($rootScope, MapFtr) {
        scope = $rootScope.$new();
        scope.MapContainer = MapFtr;
      });
    });

    it('services/MapSrv.js -> app should be defined.', function() {
      console.log('|----> MapSrv app should be defined');
      expect(app).toBeDefined();
    });

    it('services/MapSrv.js -> map should be defined.', function() {
      console.log('|----> MapSrv Map should be defined');
      expect(scope.MapContainer.map).toBeDefined();
    });

    it('services/MapSrv.js -> search should be defined.', function() {
      console.log('|----> MapSrv Search should be defined');
      expect(scope.MapContainer.search).toBeDefined();
    });

    it('services/MapSrv.js -> locator should be defined.', function() {
      console.log('|----> MapSrv Locator should be defined');
      expect(scope.MapContainer.locator).toBeDefined();
    });

    it('services/MapSrv.js -> symbol me should be defined.', function() {
      console.log('|----> MapSrv Symbol me should be defined');
      expect(scope.MapContainer.symbolMe).toBeDefined();
    });

    it('services/MapSrv.js -> symbol donor should be defined.', function() {
      console.log('|----> MapSrv Symbol donor should be defined');
      expect(scope.MapContainer.symbolDonor).toBeDefined();
    });

    it('services/MapSrv.js -> donors graphic should be defined.', function() {
      console.log('|----> MapSrv Donors graphic should be defined');
      expect(scope.MapContainer.donorsGraphic).toBeDefined();
    });
  });
});
