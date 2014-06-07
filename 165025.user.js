// ==UserScript==
// @name       OSM Mapnik tiles for Garmin Connect
// @version    0.2
// @description  Gives you nice looking OpenStreetMap-tiles in Garmin Connect, replacing the MapQuest-tiles.
// @include      http://connect*.garmin.com/*
// ==/UserScript==

var code = '(function() { MAPSERVER_OSM.length = 0;MAPSERVER_OSM[0] = "tile.osm.org";MAPSERVER_OSM_TILEPATH = "";})();';

var script = document.createElement("script");
script.textContent = code;
document.body.appendChild(script);