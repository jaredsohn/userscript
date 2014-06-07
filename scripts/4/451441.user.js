// ==UserScript==
// @name CCL4Illinois-X
// @description Adds some additional features to the ccl4illinois website
// @namespace ilcarry
// @author s0beit
// @include https://www.ccl4illinois.com/ccw/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version 1.0
// ==/UserScript==

function additionalStatus(id) {
	var originalStatus = $(id).text();
	var extraStatusData = $(id).attr('class');
	$(id).text(originalStatus + " (" + extraStatusData + ")");
}

$(document).ready(function() {
	var pathArray = window.location.pathname.split( '/' );
	
	if(pathArray.length) {
		var asp = pathArray[pathArray.length - 1];
		
		if(asp == 'Dash.aspx') {
			additionalStatus('#lblAppStatus');
			$('#divCancelLicense').remove();
		} else if(asp == 'myapp.aspx') {
			additionalStatus('#lblStatus');
		}
	}
});