// ==UserScript==
// @name           OSMNodeGPSFormat
// @description    Aendert OSM Node Koordinaten mit Dezimalpunkten an
// @namespace      tag:info@lifesuche.de,2013:userscripts
// @include        http://www.openstreetmap.org/node/*
// @version        1.00
// @grant          none
// ==/UserScript==

var elements = document.getElementsByClassName("latitude");
for(i=0; i < elements.length; i++){
  elements[i].innerHTML = (elements[i].innerHTML).replace( /,/gi, '.' );
}
elements = document.getElementsByClassName("longitude");
for(i=0; i < elements.length; i++){
  elements[i].innerHTML = (elements[i].innerHTML).replace( /,/gi, '.' );
}
