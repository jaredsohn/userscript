// ==UserScript==
// @name           Block classic css
// @description    Block pq classic css
// @version        0.2
// @date           2010-09-06
// @author         EVIL TW33TY
// @namespace      
// @include        *
// ==/UserScript==

/*

	WRITE HERE BELOW SITES FOR BLOCKING

*/
var block_sites = '@import url("/css/themes/classic/style.css?1289002715")';
var block_sites = '@import url("/css/themes/classic/header.css?1289002715")'; 
var block_sites = '@import url("/css/themes/classic/footer.css?1289002715")'; 
var block_sites = '@import url("/css/themes/classic/leftmenu.css?1289002715")'; 
var block_sites = '@import url("/css/themes/classic/events.css?1289002715")'; 

// Redirect URL, if needed. Otherwise leave it empty.
var redirect = '';

// Whether you want to show it?
var alert_popup = false; // or false, obviously
var alert_text = 'No 50/50, you naughty pirate!'

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
	if(strstr(document.location, block_sites[i])) {
		window.stop();

		if(alert_popup) {
			alert(alert_text ? alert_text : 'Site blocked');
		}

		document.location = !!redirect ? redirect : 'about:blank';
	}
}
