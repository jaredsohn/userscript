// MeHere example user script
//
// ==UserScript==
// @name        MeHere Example 2 - Google Local
// @namespace   http://mehere.glenmurphy.com/
// @description Connecting MeHere to Google Local and Maps
// @include     http://local.google.com/
// @include     http://maps.google.com/
// ==/UserScript==


var coords;

window.getcoords = function() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://localhost:7305/csv',
		onload: function(responseDetails) {
			coords = responseDetails.responseText.split(',');
			if(!coordInterval && coords && coords[2]) {
				mh_setup();
				coordInterval = setInterval('getCoords()',1000);
			}
		}
	});
}

window.mh_recenter = function() {
	if(typeof(coords[2]) != undefined) {
		if(_m.map.getZoomLevel() > 7) {
			_m.map.centerAndZoom({x:coords[0], y:coords[1]}, 7)
		}
		else {
			_m.map.recenterOrPanToLatLng({x:coords[0], y:coords[1]})
		}
	}
}

window.mh_setup = function() {
	document.getElementById('links').innerHTML = '<a href="javascript:mh_recenter();"><img src="http://mehere.glenmurphy.com/i/mh_ico.gif" width="16" height="16" alt="Center Map On Me" />&nbsp;<span>Center Map On Me</span>&nbsp;' + document.getElementById('links').innerHTML;
}

var coordInterval;
getcoords();