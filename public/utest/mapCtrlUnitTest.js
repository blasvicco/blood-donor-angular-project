define([
    'app', 'angularAMD', 'controllers/MapCtrl'
], function(app, angularAMD) {
  describe('MapCtrl.js', function() {
    console.log('### Running controllers/MapCtrl.js');
    var scope, ctrl, personFtr;

    // Compile home HTML containing the directive
    document.body.insertAdjacentHTML('afterbegin', controller);
    
    beforeEach(function() {
      angularAMD.inject(function($rootScope, $controller, PersonFtr) {
        scope = $rootScope.$new();
        ctrl = $controller('MapCtrl', {
          $scope : scope
        });
        personFtr = PersonFtr;
      });
    });

    it('controllers/MapCtrl.js -> app should be defined.', function() {
      console.log('|----> MapCtrl app should be defined');
      expect(app).toBeDefined();
    });

    it('controllers/MapCtrl.js -> hook donors founds.', function() {
      console.log('|----> MapCtrl Testing Hook donors founds');
      expect(scope.MapContainer).toBeDefined();
      donors = [
        donor
      ];
      scope.$broadcast('donorsFound', donors);
      expect(scope.MapContainer.donors[0].firstName).toEqual('John');
    });

    it('controllers/MapCtrl.js -> hook new donor.', function() {
      console.log('|----> MapCtrl Testing Hook new donor');
      expect(scope.MapContainer.map).toBeDefined();
      scope.MapContainer.map.geographicExtent = {
        'getCenter' : function() {
          return {
            'y' : centerY,
            'x' : centerX
          };
        }
      };
      scope.$broadcast('newDonor', donor);
      expect(ioLog.emitted['findDonors']).toBeDefined();
      expect(ioLog.listeners['donorsFound']).toBeDefined();
    });

    it('controllers/MapCtrl.js -> hook delete donor.', function() {
      console.log('|----> MapCtrl Testing Hook delete donor');
      expect(scope.MapContainer.map).toBeDefined();
      scope.MapContainer.map.geographicExtent = {
        'getCenter' : function() {
          return {
            'y' : centerY,
            'x' : centerX
          };
        }
      };
      scope.$broadcast('newDonor', donor);
      expect(ioLog.emitted['findDonors']).toBeDefined();
      expect(ioLog.listeners['donorsFound']).toBeDefined();
    });

    it('controllers/MapCtrl.js -> hook center me.', function() {
      console.log('|----> MapCtrl Testing Hook center me');
      expect(scope.MapContainer.map).toBeDefined();
      personFtr.setWhereIAm({
        'x' : centerX,
        'y' : centerY
      });
      scope.$broadcast('centerMe');
      expect(personFtr.getWhereIAm().longitude).toEqual(centerX);
      expect(personFtr.getWhereIAm().latitude).toEqual(centerY);
    });
  });
});
