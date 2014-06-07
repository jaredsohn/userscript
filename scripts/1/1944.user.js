// MeHere example user script
//
// ==UserScript==
// @name        MeHere Example 4 - Geobloggers
// @namespace   http://mehere.glenmurphy.com/
// @description Connecting MeHere to Geobloggers
// @include     http://geobloggers.com/
// @include     http://www.geobloggers.com/
// ==/UserScript==

var coords;

window.mh_getcoords = function() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://localhost:7305/csv',
		onload: function(responseDetails) {
			coords = responseDetails.responseText.split(',');
			if(!coordInterval && coords && coords[2]) {
				mh_setup();
				coordInterval = setInterval('mh_getcoords()',1000);
			}
		}
	});
}

window.mh_recenter = function() {
	if(typeof(coords[2]) != undefined) {
		if(map.getZoomLevel() > 8) {
			map.centerAndZoom({x:coords[0], y:coords[1]}, 8)
		}
		else {
			map.recenterOrPanToLatLng({x:coords[0], y:coords[1]})
		}
	}
}

window.mh_setup = function() {
	output = document.createElement('p');
	output.innerHTML = '<a href="javascript:mh_recenter();"><img src="http://mehere.glenmurphy.com/i/mh_ico.gif" width="32" height="32" alt="MeHere" border="0" /><br />Zoom</a>';
	document.getElementById('divPayPalHolder').appendChild(output);
	window.mh_setup = function() {;}
}

var coordInterval;
mh_getcoords();