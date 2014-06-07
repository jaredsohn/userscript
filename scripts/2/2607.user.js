// ==UserScript==
// @author	  Filipe Almeida <filipe.almeida@gmail.com>
// @name          View in Google Earth
// @description	  Adds "View in Google Earth" to maps.google.com
// @namespace     http://mega.ist.utl.pt/~filipe/
// @include       http://local.google.com/*
// @include       http://maps.google.com/*
// @include       http://local.google.tld/*
// @include       http://maps.google.tld/*
// @version 0.01  ( 12/01/06 )
// ==/UserScript==

(function() {


var map = unsafeWindow.gApplication;

	updatekml = function() {
		var zoom = parseInt(map.getMap().getZoom());
		var lng = map.getMap().getCenter().lng();
		var lat = map.getMap().getCenter().lat();
		var alt = Math.pow(2, 17 - zoom) * 1000;  // Aproximation. This may be wrong.

		var kml = 'data: application/vnd.google-earth.kml+xml,';
		kml += '<?xml version="1.0" encoding="UTF-8"?>';
		kml += '<kml xmlns="http://earth.google.com/kml/2.0">';
		kml += '<Placemark>';
   		kml += '<name>Google Maps Reference</name>';
		kml += '<LookAt>';
   		kml += '<longitude>' + lng + '</longitude>';
   		kml += '<latitude>' + lat + '</latitude>';
   		kml += '<range>' + alt + '</range>';
		kml += '</LookAt>';
		kml += '</Placemark>';
		kml += '</kml>';
	
		link.setAttribute('href', kml);
		return 1;
	}


	var link = document.createElement('a');
	link.setAttribute('href', '#');
	link.innerHTML = '&nbsp;<span>View in Google Earth</span>&nbsp</a>';
	link.addEventListener('click', updatekml, true);
	

	var node = document.getElementById('print');
	node.parentNode.insertBefore(link, node);


})();
