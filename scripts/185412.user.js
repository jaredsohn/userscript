// ==UserScript==
// @name           Craigslist Map Replacer
// @author         Carlton Kenney
// @namespace      none
// @description    Adds Google Maps as a replacement/augment
// @copyright      2013 by Carlton Kenney
// @version        0.1b
// @lastupdated    12/4/2013
// @include        *.craigslist.org/*/*
// ==/UserScript==

var removeOldMaps = 1;

var map = document.getElementById('map');
if(map) {
	var string = '<iframe id="google_maps" width="300" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?daddr='+map.getAttribute('data-latitude')+','+map.getAttribute('data-longitude')+'&amp;output=embed" ></iframe><br /><small><a href="https://maps.google.com/maps?daddr='+map.getAttribute('data-latitude')+','+map.getAttribute('data-longitude')+'&amp;output=embed" style="color:#0000FF;text-align:left">View Larger Map</a></small>';
	
	if(removeOldMaps) {
		map.parentNode.innerHTML =(string);
	}
	else {
		map.parentNode.innerHTML +=(string);
		document.getElementById('google_maps').style.paddingTop = '20px';
	}
}