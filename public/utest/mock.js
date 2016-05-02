// io socket
var ioLog = {
  'listeners' : [ ],
  'emitted' : [ ]
}
io = function() {
  return {
    'listeners' : [ ],
    'emitted' : [ ],
    'on' : function(action, callback) {
      this.listeners[action] = callback;
      ioLog.listeners[action] = callback;
    },
    'emit' : function(action, obj) {
      this.emitted[action] = obj;
      ioLog.emitted[action] = obj;
    },
    'removeListener' : function(action) {
      this.listeners[action] = null;
      ioLog.listeners[action] = null;
    }
  };
};

var msg = '<msg id="msg" class="msg hide"></msg>';
var popup = '<popup id="popup" class="front_content hide"></popup>';
popup += '<back-overlay id="back-overlay" class="back_overlay hide"></back-overlay>';
var map = '<map>';
map += '<div id="search"></div>';
map += '<div id="map"></div>';
map += '</map>';

var controller = '<div ng-controller="MapCtrl">'+msg+map+'</div>';

var centerX = -122.4194200;
var centerY = 37.7749300;

var donor = {
  '_id' : 'zarazasaza',
  'firstName' : 'John',
  'lastName' : 'Doe',
  'contactNumber' : '+5491121902449',
  'emailAddress' : 'test@gmail.com',
  'bloodType' : 'A+',
  'latitude' : centerY,
  'longitude' : centerX
};
var person = donor;

var errorMsg = {
  'type' : 'error',
  'message' : 'This is a error message'
};
var warningMsg = {
  'type' : 'warning',
  'message' : 'This is a warning message'
};
var infoMsg = {
  'type' : 'info',
  'message' : 'This is a info message'
};
var successMsg = {
  'type' : 'success',
  'message' : 'This is a success message'
};

var becameDonorResponse = {
  'Person' : person,
  'errors' : null
};
var signedInResponse = becameDonorResponse;

var searchMe = {
  'point' : {
    'spatialReference' : {
      'latestWkid' : 3857,
      'wkid' : 102100
    },
    'type' : 'point',
    'x' : -13630271.590876374,
    'y' : 4547731.721851124,
  },
  'coord' : {
    'x' : -122.44281296784352,
    'y' : 37.77530023611809
  },
  'description' : 'Grove St, San Francisco, California, 94117',
  'extent' : {
    'spatialReference' : {
      'latestWkid' : 3857,
      'wkid' : 102100
    },
    'type' : 'extent',
    'xmax' : -13628824.552395195,
    'xmin' : -13631718.85915582,
    'ymax' : 4549562.717894752,
    'ymin' : 4545900.981238586
  }
};
