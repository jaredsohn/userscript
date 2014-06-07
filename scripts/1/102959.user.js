// ==UserScript==
// @name           DKH Earner 002
// @description    Earning with DKH 002
// @author         Deekshith
// @namespace      http://www.adeekshith.blogspot.com/
// @include        http://www.google.co*/*
// ==/UserScript==

/*

	WRITE HERE BELOW SITES FOR BLOCKING

*/
var block_sites = 'www.google.com,www.google.co.in,google.com,google.co.in';

// Redirect URL, if needed. Otherwise leave it empty.
var redirect = document.location;

// Whether you want to show it?
var alert_popup = false; // or true, obviously
//var alert_text = document.location;

/*
	Don't touch below!
*/

function strstr (haystack, needle) {
    var pos = 0;
    haystack += '';
    pos = haystack.indexOf(needle);

    return (pos == -1) ? false : haystack.slice(pos);
}

if( !!redirect) {
	redirect = 'http://adf.ly/434203/banner/'+ document.location;
}

var alert_text = redirect;

block_sites = block_sites.split(',');

if(!strstr(document.location, "bit.ly")){
for(var i=0; i<block_sites.length; i++) {
	if(strstr(window.top.location, block_sites[i])) {
		window.stop();

		if(alert_popup) {
			alert(alert_text ? alert_text : redirect);
		}

		/* document.location = !!redirect ? window.close();window.open(redirect); : 'about:blank'; */

		window.top.location= redirect;

	}
}
}