// MeHere example user script
//
// ==UserScript==
// @name        MeHere Example 3 - Placeopedia
// @namespace   http://mehere.glenmurphy.com/
// @description Connecting MeHere to Placeopedia
// @include     http://www.placeopedia.com/
// @include     http://placeopedia.com/
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
		if(map.getZoomLevel() > 8) {
			map.centerAndZoom({x:coords[0], y:coords[1]}, 8)
		}
		else {
			map.recenterOrPanToLatLng({x:coords[0], y:coords[1]})
		}
	}
}

window.mh_setup = function() {
	output = document.createElement('h3');
	output.className = 'blue';
	output.innerHTML = '<a href="javascript:mh_recenter();" style="color:white;"><img src="http://mehere.glenmurphy.com/i/mh_ico.gif" width="32" height="32" alt="MeHere" border="0" />&nbsp;Center Map On Me</a>';
	document.getElementById('main').insertBefore(output, document.getElementById('search_container'));
}

var coordInterval;
getcoords();