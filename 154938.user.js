// ==UserScript==
// @name        tny.cz without banner
// @namespace   Free4all
// @author      Zeus
// @description tny.cz without banner!
// @version     1.0
// @grant       none
// @updateURL   https://userscripts.org/scripts/source/154938.meta.js
// @include     http://*tny.cz/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {    
	$('#overlay_div').remove();
	$('#overlay_main_div').remove();
}