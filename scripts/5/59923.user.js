// ==UserScript==
// @name          Local weather
// @namespace     http://jeffpalm.com/weather
// @description   Goes to local weather on weather.com
// @include       http://www.weather.com/
// @include       http://weather.com/
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */

var TESTING = true;

function showLocation(pos) {
    var c = pos.coords;
    var lat = c.latitude;
    var lng = c.longitude;
    document.location = 'http://jeffpalm.com/weather/translate.php?lat=' + lat + "&lng=" + lng;
}

function errorLocation(error) {
    alert('errorLocation: ' + error.code + ":" + error.message);
}

function main() {
    var geo = navigator.geolocation;
    if (geo) {
	geo.getCurrentPosition(showLocation,
			       errorLocation,
			       {enableHighAccuracy:true, maximumAge:600000});
    } else {
	alert("Couldn't create geolocation");
    }
}

try {main();} catch (e) {if (TESTING) alert('Error: ' + e);}
