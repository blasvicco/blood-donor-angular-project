define([
    'app', 'angularAMD', 'controllers/PersonCtrl'
], function(app, angularAMD) {
  describe('PersonCtrl.js', function() {
    console.log('### Running controllers/PersonCtrl.js');
    var scope, ctrl, location, personFtr;

    beforeEach(function() {
      angularAMD.inject(function($rootScope, $controller, $location, PersonFtr) {
        scope = $rootScope.$new();
        ctrl = $controller('PersonCtrl', {
          $scope : scope
        });
        location = $location;
        personFtr = PersonFtr;
      });
    });

    it('controllers/PersonCtrl.js -> app should be defined.', function() {
      console.log('|----> PersonCtrl app should be defined');
      expect(app).toBeDefined();
    });

    it('controllers/PersonCtrl.js -> location should be defined.', function() {
      console.log('|----> PersonCtrl location should be defined');
      expect(location).toBeDefined();
    });

    it('controllers/PersonCtrl.js -> hook signed in.', function() {
      console.log('|----> PersonCtrl Testing Hook signed in');
      expect(personFtr).toBeDefined();
      personFtr.setPerson(person);
      scope.$broadcast('signedIn');
      expect(scope.Person._id).toEqual(person._id);
    });

    it('controllers/PersonCtrl.js -> scope set deleted.', function() {
      console.log('|----> PersonCtrl Testing Set as deleted donor');
      expect(personFtr).toBeDefined();
      personFtr.setPerson(person);
      scope.$broadcast('signedIn');
      scope.setDeleted();
      expect(ioLog.emitted['delete']).toBeDefined();
      expect(personFtr.Person._id).toEqual(null);
    });

    it('controllers/PersonCtrl.js -> scope update.', function() {
      console.log('|----> PersonCtrl Testing Update donor details');
      expect(personFtr).toBeDefined();
      personFtr.setPerson(person);
      scope.$broadcast('signedIn');
      scope.update();
      expect(ioLog.emitted['becomeDonor']).toBeDefined();
      expect(ioLog.listeners['becomeDonorResponse']).toBeDefined();
    });
  });
});
