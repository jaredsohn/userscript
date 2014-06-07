// ==UserScript==
// @name           StayFocused
// @description    Block time-wasting sites
// @version        0.2
// @date           2010-06-20
// @author         Eugene Smarty
// @namespace      http://i-smarty.com
// @include        *
// ==/UserScript==

/*

	WRITE HERE BELOW SITES FOR BLOCKING

*/
var block_sites = 'vk.com,vkontakte.ru,durov.ru';

// Redirect URL, if needed. Otherwise leave it empty.
var redirect = '';

// Whether you want to show it?
var alert_popup = true; // or false, obviously
var alert_text = 'Stop procrastinating!'

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