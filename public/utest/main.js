!function() {
  'use strict';

  /*
   * Create list of file to run in test. Making sure that app_test.js is always
   * the first to run
   */
  var firstFile = '/base/utest/appTest.js';
  var testFiles = [ ];
  var testFilesREGEXP = /(UnitTest)\.js$/i;

  Object.keys(window.__karma__.files).forEach(function(file) {
    if (testFilesREGEXP.test(file)) {
      testFiles.push(file);
    }
  });

  if (firstFile) {
    testFiles.unshift(firstFile);
  }

  require.config({
    baseUrl : '/base/js',

    paths : {
      'angular' : '../libs/angular/angular.min',
      'angular-messages' : '../libs/angular-messages/angular-messages.min',
      'angularAMD' : '../libs/angularAMD/angularAMD',
      'ngload' : '../libs/requirejs/ngload',
      'esri' : window.location.protocol + '//js.arcgis.com/3.15/esri',
      'dojo' : window.location.protocol + '//js.arcgis.com/3.15/dojo',
      'dojox' : window.location.protocol + '//js.arcgis.com/3.15/dojox',
      'dijit' : window.location.protocol + '//js.arcgis.com/3.15/dijit',
      'text': '../libs/text/text'
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

    deps : testFiles,

    callback : window.__karma__.start,
  });
}();
