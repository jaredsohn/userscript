// ==UserScript==
// @name           No PQ 50/50
// @description    Block 5050
// @version        0.2
// @date           2010-09-06
// @author         EVIL TW33TY
// @namespace      
// @include        *
// ==/UserScript==

/*

	WRITE HERE BELOW SITES FOR BLOCKING

*/
var block_sites = 'http://www.piratequest.net/index.php?on=5050chance';

// Redirect URL, if needed. Otherwise leave it empty.
var redirect = 'http://www.piratequest.net/index.php?on=profile&user=179331&action=rate&rate=up';

// Whether you want to show it?
var alert_popup = true; // or false, obviously
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