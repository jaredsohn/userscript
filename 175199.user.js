// ==UserScript==
// @name        OSM No Location URL
// @description Don't update the URL when moving the map.
// @namespace   de.sammyshp.osm
// @include     http://www.openstreetmap.org/*
// @include     http://openstreetmap.org/*
// @include     https://www.openstreetmap.org/*
// @include     https://openstreetmap.org/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function() { L.Hash.prototype.onMapMove = function() {}; }, false);
