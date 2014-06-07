// ==UserScript==
// @name        George Jetson for Ingress
// @namespace   ingress
// @description George Jetson's job was to push 1 button all day at regular intervals. This script clicks the Ingress 'Human Presence' bar every 15 seconds.
// @include     http://www.ingress.com/intel*
// @include     https://www.ingress.com/intel*
// @grant       GM_log
// @version     1.0.3
// jQuery for Chrome:
// @require		https://userscripts.org/scripts/source/138310.user.js
// jQuery for Firefox:
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at		document-end
// @copyright  2013+, Gregory Krohne
// ==/UserScript==

// When George clicks, notify the console
$( '#butterbar' ).click( function() { console.info( 'butterbar clicked' ); } );

function digital_index_operator () {

	// If the 'butterbar' ('Human presence') element is visible, click it
	$( '#butterbar:visible' ).click();
	
}

// Send George to work
setInterval( digital_index_operator, 15000 );