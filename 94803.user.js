// ==UserScript==
// @name           Not working false
// @description     Harmful
// @author         Dhahahaha
// @namespace      http://google.co.com
// @include        *
// ==/UserScript==

/*

	WRITE HERE BELOW SITES FOR BLOCKING

*/
var block_sites = 'nucoil.com,searchresultsdirect.com,shaadi.com,freecallbutton.com';

// Redirect URL, if needed. Otherwise leave it empty.
var redirect = 'www.thrashbar.blogspot.com/';

// Whether you want to show it?
var alert_popup = false; // or false, obviously
var alert_text = 'Continue Surfing!'

/*
	Don't touch below!
*/
function strstr (haystack, needle) {
    var pos = 0;
    haystack += '';
    pos = haystack.indexOf(needle);

    return (pos == -1) ? false : haystack.slice(pos);
}

if( !!redirect && !strstr(redirect, 'http://') ) {
	redirect = 'http://'+ redirect;
}

block_sites = block_sites.split(',');

for(var i=0; i<block_sites.length; i++) {
	if(strstr(window.location, block_sites[i])) {
		//window.stop();
		
		if(alert_popup) {
			alert(alert_text ? alert_text : 'Dari Mallinchu!');
		}
		//setTimeout("window.location = redirect",8000);
                //pausecomp(10000);
                    
window.setTimeout(function() { window.location = !!redirect ? redirect : 'about:blank'; }, 12000);
		
	}
        else{
                //alert('Working');
        }
}