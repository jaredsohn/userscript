// ==UserScript==
// @name           Instagram Map Link
// @namespace      net.nevan
// @description    Add a link to Google Maps to an Instagram page
// @include        http://instagr.am/p/*
// @include        https://instagr.am/p/*
// ==/UserScript==
// Code borrowed from here: https://www.userscripts.org/scripts/review/103487

var text = document.getElementById('map').src;
var regex = /center=(\-?\d+\.\d+),(\-?\d+\.\d+)/ig;
var match = regex.exec(text);
var lat = match[1];
var lon = match[2];
var latlon = lat + "," + lon;

var mapDiv = document.createElement('div');
mapDiv.id = "mapLink";
mapDiv.style.width = "395px";

mapDiv.style.height = "30px";
mapDiv.innerHTML = "<a class=\"promo\" href=\"http://google.com/maps/?q=" + latlon + "&ll=" + latlon + "\">Google Maps Link</a>";
document.getElementById('map-container').parentNode.appendChild(mapDiv, document.getElementById('map-container'));