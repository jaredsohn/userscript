// ==UserScript==
// @name           Gowalla Spot Coordinates
// @namespace      com.10ninetysix.gowalla
// @description    Posts Gowalla Coordinates on a spot detail screen.
// @include        http://gowalla.com/spots/*
// ==/UserScript==

//showSpotCoordinates();
$ = unsafeWindow.jQuery;

$(document).ready(function(){
		// Check if jQuery's loaded
		function GM_wait() {
			if($('#spot-sidebar-wrapper a:first').length<1) { window.setTimeout(GM_wait,100); }
			else { showSpotCoordinates(); }
		}
		GM_wait();
});

function showSpotCoordinates() {
	// Get Coordinates
	var coordRaw = $('#spot-sidebar-wrapper a:first').attr('href');
	var coordLat = coordRaw.substring( coordRaw.indexOf('=') + 1, coordRaw.indexOf('&'));
	var coordLng = coordRaw.substring( coordRaw.lastIndexOf('=')+1, coordRaw.length-1);

	// Display Coordinates
	$('#header').append('<br/><span><input id="coordTxtLat" type="text" style="width:100px;" />&nbsp;&nbsp;<input id="coordTxtLng" type="text" style="width:100px;" /></span>');
	$('#coordTxtLat').val(coordLat);
	$('#coordTxtLng').val(coordLng);
}