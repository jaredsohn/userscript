// ==UserScript==
// @name           kw_da_created_fix
// @namespace      nonzerosalmon.net/greasemonkey
// @description    Fixes datepicker problem with Greensheets marked DA Created
// @include        http://greensheet.kw.com/gso/GetGreensheet.do?greensheetId=*
// script adapted from the script found at http://joanpiedra.com/jquery/greasemonkey/
// ==/UserScript==
var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
	$('input.datepicker').datepicker({
		inline: true
	}); 
}