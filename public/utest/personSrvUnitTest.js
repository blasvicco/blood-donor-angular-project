define([
    'app', 'angularAMD', 'services/PersonSrv'
], function(app, angularAMD) {
  describe('PersonSrv.js', function() {
    console.log('### Running services/PersonSrv.js');
    var scope, personFtr;
    
    beforeEach(function() {

      angularAMD.inject(function($rootScope, PersonFtr) {
        scope = $rootScope.$new();
        personFtr = PersonFtr;
      });
    });

    it('services/PersonSrv.js -> app should be defined.', function() {
      console.log('|----> PersonSrv app should be defined');
      expect(app).toBeDefined();
    });

    it('services/PersonSrv.js -> get id.', function() {
      console.log('|----> PersonSrv Testing Get id');
      expect(personFtr).toBeDefined();
      personFtr.setPerson(person);
      expect(personFtr.getId()).toEqual(person._id);
    });

    it('services/PersonSrv.js -> set and get where I am.', function() {
      console.log('|----> PersonSrv Testing Set and get where I am');
      expect(personFtr).toBeDefined();
      personFtr.setWhereIAm({
        'x' : centerX,
        'y' : centerY
      });
      expect(personFtr.getWhereIAm().longitude).toEqual(centerX);
      expect(personFtr.getWhereIAm().latitude).toEqual(centerY);
    });

    it('services/PersonSrv.js -> set and get donors.', function() {
      console.log('|----> PersonSrv Testing Set and get donors');
      expect(personFtr).toBeDefined();
      personFtr.setDonors([donor]);
      expect(personFtr.getDonors()[0]._id).toEqual(donor._id);
    });

    it('services/PersonSrv.js -> set and get person.', function() {
      console.log('|----> PersonSrv Testing Set and get person');
      expect(personFtr).toBeDefined();
      personFtr.setPerson(person);
      expect(personFtr.getPerson()._id).toEqual(person._id);
    });

    it('services/PersonSrv.js -> clear person.', function() {
      console.log('|----> PersonSrv Testing Clear person');
      expect(personFtr).toBeDefined();
      personFtr.setPerson(person);
      expect(personFtr.getPerson()._id).toEqual(person._id);
      personFtr.clearPerson();
      expect(personFtr.getPerson()._id).toEqual(null);
    });

    it('services/PersonSrv.js -> io trigger to find donors.', function() {
      console.log('|----> PersonSrv IO trigger to find donors');
      expect(personFtr).toBeDefined();
      personFtr.findDonors(centerX, centerY, 0.1);
      expect(ioLog.emitted['findDonors']).toBeDefined();
      expect(ioLog.listeners['donorsFound']).toBeDefined();
      ioLog.listeners['donorsFound']([donor]);
      expect(ioLog.listeners['donorsFound']).toEqual(null);
    });

    it('services/PersonSrv.js -> io trigger to become donor.', function() {
      console.log('|----> PersonSrv IO Trigger to become donor');
      expect(personFtr).toBeDefined();
      personFtr.becomeDonor(person);
      expect(ioLog.emitted['becomeDonor']).toBeDefined();
      expect(ioLog.listeners['becomeDonorResponse']).toBeDefined();
      ioLog.listeners['becomeDonorResponse'](becameDonorResponse);
      expect(ioLog.listeners['becomeDonorResponse']).toEqual(null);
    });

    it('services/PersonSrv.js -> io trigger to set deleted.', function() {
      console.log('|----> PersonSrv IO Trigger to set deleted');
      expect(personFtr).toBeDefined();
      personFtr.setDeleted(person);
      expect(ioLog.emitted['delete']).toBeDefined();
      expect(personFtr.getPerson()._id).toEqual(null);
    });

    it('services/PersonSrv.js -> io trigger to login.', function() {
      console.log('|----> PersonSrv IO Trigger to login');
      expect(personFtr).toBeDefined();
      personFtr.login(person._id);
      expect(ioLog.emitted['signIn']).toBeDefined();
      expect(ioLog.listeners['signedIn']).toBeDefined();
      ioLog.listeners['signedIn'](signedInResponse);
      expect(personFtr.getPerson()._id).toEqual(person._id);
      expect(ioLog.listeners['signedIn']).toEqual(null);
    });

    it('services/PersonSrv.js -> hook new donor and deleted donor.', function() {
      console.log('|----> PersonSrv Testing Hook new donor and deleted donor');
      expect(personFtr).toBeDefined();
      expect(ioLog.listeners['newDonor']).toBeDefined();
      expect(ioLog.listeners['deletedDonor']).toBeDefined();
    });
    
  });
});
