// ==UserScript==
// @name          Google Maps Annotations
// @namespace     http://brainoff.com/geocoder/
// @description	Load Points into Google Maps from a Remote file
// @include       http://maps.google.com/*
// ==/UserScript==

(function () {

function loadPoints() {
	loc = location.href.substring(location.href.indexOf('loc=')+4);
	GM_xmlhttpRequest({ 
	 method:"GET", 
       url:loc, 
	 onload:function(details) { 
		_m.loadXML(details.responseText, window.document); 
	 }
	});
}

if (location.href.indexOf('loc=') != -1) {
	loadPoints();
}

})();
