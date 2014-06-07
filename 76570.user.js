// ==UserScript==
// @name           ACU Banner Fixes
// @namespace      http://www.johnellmore.com/acubanner
// @description    Fixes the tables widths and a number of other issues with ACU's Banner system.
// @include        https://www4.acu.edu:4445/banner/*
// ==/UserScript==

// I'm too lazy to write my the functions I want from scratch, so I'll use jQuery!
// RIPPED THE FOLLOWING FROM: http://joanpiedra.com/jquery/greasemonkey/
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
	// table width fix
	$('table').css('width', '100%');
}