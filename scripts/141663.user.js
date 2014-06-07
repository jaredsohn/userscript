// ==UserScript==
// @name        Geocache.fi peruskartta
// @namespace   http://juhaz.yi.org/gcfitopo
// @description Lisää maanmittauslaitoksen peruskartan geocache.fi:n karttaan.
// @include     http://www.geocache.fi/kartta/*
// @grant       none
// @version     1.1
// ==/UserScript==

var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = (<><![CDATA[
var pkMapType = new google.maps.ImageMapType({
  getTileUrl: function(coord, zoom) { 
      return "http://tiles.kartat.kapsi.fi/peruskartta/" +   zoom + "/" + coord.x + "/" + coord.y + ".png";
  },
  tileSize: new google.maps.Size(256, 256), 
  isPng: true,       
  alt: "Peruskartta layer",       
  name: "Peruskartta",       
  maxZoom: 19       
});

initMap = function(mapHolder) {
  directionsDisplay = new google.maps.DirectionsRenderer();

  markers = [];
  vmarkers = [];
  var mapOptions = {
  zoom: 5,
  center: geodan,
  scaleControl: true,
  mapTypeId: 'OSM',
  draggableCursor: 'auto',
  draggingCursor: 'move',
  disableDoubleClickZoom: true,
  mapTypeControlOptions: {
    mapTypeIds: ['OSM', 'PK', google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.TERRAIN]
    }
  };

  map = new google.maps.Map(document.getElementById(mapHolder), mapOptions);
  map.mapTypes.set('OSM',osmMapType);
  map.mapTypes.set('PK',pkMapType);

  map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
	  
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));

  infoWindow = new google.maps.InfoWindow();
  
  google.maps.event.addListener(map, "click", mapLeftClick);
  mapHolder = null;
  mapOptions = null;
};

window.initMap = initMap;

]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(script);
