// MeHere example user script
//
// ==UserScript==
// @name        MeHere Example 1 - GeoURL
// @namespace   http://mehere.glenmurphy.com/
// @description Example usage of MeHere, adds a 'Show Pages Near Me' link to the front page of geourl.org
// @include     http://geourl.org/
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://localhost:7305/csv',
	onload: function(responseDetails) {
		var coords = responseDetails.responseText.split(',');
		if(coords[0] && coords[1]) {
			output = document.createElement('div');
			output.innerHTML = '<p><a href="/near?lat='+coords[1]+'&long='+coords[0]+'">'
			                 + '<img src="http://mehere.glenmurphy.com/i/mh_ico.gif" width="32" height="32" alt="MeHere" border="0" />&nbsp;'
			                 + 'View Pages Near Me</a></p>'
			document.body.insertBefore(output, document.getElementById('geocontainer'));
		}
	}
});