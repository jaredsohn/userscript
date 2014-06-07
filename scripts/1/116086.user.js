// ==UserScript==
// @name           wta-weather
// @description    Adds NOAA weather link to wta.org pages 
// @namespace      smalltalk80.uiuc
// @include        http://*.wta.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$(document).ready(function() {
	$("div.trailhead-map div.latlong").each(function() {
		var lat = $("span:eq(0)", this).text();
		var lon = $("span:eq(1)", this).text();
		var noaa = "http://forecast.weather.gov/MapClick.php?lat=" + lat + "&lon=" + lon + "&site=sew&unit=0&lg=en&FcstType=text";
		$(this).append('<a href="' + noaa + '">Weather</a>');
	});
});
