// ==UserScript==
// @name           Waze on Instagram
// @namespace      emaze.co.il
// @description    Replaces Google maps with Waze on Instagram
// @include        http://instagr.am/p/*
// ==/UserScript==

var text = document.getElementById('map').src;
var regex = /center=(\-?\d+\.\d+),(\-?\d+\.\d+)/ig;
var match = regex.exec(text);
var lat = match[1];
var lon = match[2];

var initMap = 'var lat = ' + lat + '; var lon = ' + lon + '; ' +'\
    g_config = {\
    div_id:"map",\
    locale : "israel",\
    center_lat:lat,\
    center_lon:lon,\
    zoom:9,\
    token:"a382bf6b-ee71-4ae3-83f6-46e30669bbf5",\
  };window.g_waze_config = g_config;\
\
  function onWazeMapInit(){\
    var map = g_waze_map.map;\
    var markers = new OpenLayers.Layer.Markers( "Markers" );\
    map.addLayer(markers);\
    var size = new OpenLayers.Size(37,34);\
    var offset = new OpenLayers.Pixel(-9, -size.h);\
    var icon = new OpenLayers.Icon("data:image/png;base64,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%3D",size,offset);\
    markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lon, lat),icon));\
  };'


var newDiv = document.createElement('div');
newDiv.id = "map";
newDiv.style.width = "395px";
newDiv.style.height = "210px";
newDiv.style.marginBottom = "24px";
document.getElementById('map-container').parentNode.replaceChild(newDiv, document.getElementById('map-container'));

var GM_WazeInit1 = document.createElement('script');
GM_WazeInit1.type = 'text/javascript';
GM_WazeInit1.text = initMap;
document.getElementsByTagName('head')[0].appendChild(GM_WazeInit1);


// Add Waze  
var GM_Waze = document.createElement('script');
GM_Waze.src = 'http://www.waze.co.il/js/WazeEmbeddedMap.js';
GM_Waze.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_Waze);
