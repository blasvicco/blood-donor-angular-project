define([
    'esri/graphic', 'esri/layers/GraphicsLayer', 'esri/symbols/SimpleMarkerSymbol', 'esri/tasks/locator', 'dojo/dom', 'dojo/_base/Color',
    'app'
], function(Graphic, GraphicsLayer, SimpleMarkerSymbol, Locator, dom, Color, app) {
  angular.module('MapSrvMdl', [ ]).factory('MapFtr', function() {
    var mapObjectWrapper = {};
    mapObjectWrapper.map = {};
    mapObjectWrapper.search = {};

    // Locator Obj instantiation
    mapObjectWrapper.locator = new Locator(window.location.protocol + '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer');

    // SimpleMarkerSymbol's Obj instantiation
    mapObjectWrapper.symbolMe = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_SQUARE).setColor(new Color([
        0, 0, 255, 0.5
    ]));
    mapObjectWrapper.symbolDonor = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_CIRCLE).setColor(new Color([
        255, 0, 0, 0.5
    ]));

    // GraphicsLayer instantiation
    mapObjectWrapper.donorsGraphic = new GraphicsLayer();
    return mapObjectWrapper;
  });

});
