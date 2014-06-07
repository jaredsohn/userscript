// ==UserScript==
// @id             airbnb-latlng
// @name           Show actual coordinates + link to Google Maps on airbnb.com
// @version        1.0
// @namespace      
// @author         a sad dude
// @description    
// @include        https://*.airbnb.com/rooms/*
// @run-at         document-end
// ==/UserScript==

var map = document.getElementById('map');
var span = document.getElementById('display_address');
var a = document.createElement('a');

if (map && span) {
	var latlng = map.dataset.lat.substr(0, 9) + ', ' + map.dataset.lng.substr(0, 9);
	a.innerHTML = ' <nobr>' + latlng + '</nobr>';
	a.href = 'https://maps.google.com/maps?q=' + latlng;
	span.appendChild(a);
}