require.config({
  baseUrl : 'js',
  paths : {
    'angular' : '../libs/angular/angular.min',
    'angular-messages' : '../libs/angular-messages/angular-messages.min',
    'angularAMD' : '../libs/angularAMD/angularAMD',
    'ngload' : '../libs/requirejs/ngload',
    'esri' : window.location.protocol + '//js.arcgis.com/3.15/esri',
    'dojo' : window.location.protocol + '//js.arcgis.com/3.15/dojo',
    'dojox' : window.location.protocol + '//js.arcgis.com/3.15/dojox',
    'dijit' : window.location.protocol + '//js.arcgis.com/3.15/dijit',
    'text' : '../libs/text/text'
  },
  shim : {
    'angularAMD' : [
      'angular'
    ],
    'ngload' : [
      'angularAMD'
    ],
    'angular-messages' : [
      'angular'
    ]
  },
  deps : [
    'app'
  ]
});
