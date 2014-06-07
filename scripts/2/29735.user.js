// ==UserScript==

// @name           Deezer Version 2 Unlocker (corrected)

// @namespace      Enables disabled songs on Deezer

// @description    Enables disabled (grayed-out) songs on Deezer. This script replaces the GeoIP location with French, but leaves other settings as it. 

// @include        http://www.deezer.com/

// @include        http://www.deezer.com/*
// @include        http://deezer.com/
// @include        http://deezer.com/*
// @include        http://*.deezer.com/*

// ==/UserScript==

function replaceGeoIPInElement(elementid) {
  var oldHtml = document.getElementById(elementid).innerHTML; 
  var reg = new RegExp("geoip=[A-Z]{2}");
  var newHtml = oldHtml.replace(reg,"geoip=FR");
  document.getElementById(elementid).innerHTML = newHtml;
}

replaceGeoIPInElement("flash");
replaceGeoIPInElement("player");


