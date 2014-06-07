// ==UserScript==
// @name           NOSAD
// @namespace      ruckus113
// @include        *ucf.rivals.com*
// ==/UserScript==


// Add jQuery
var GM_JQ 	= document.createElement('script');
GM_JQ.src 	= 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type 	= 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); } else { $ = unsafeWindow.jQuery; letsJQuery(); }
}

GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	$(document).ready(function(){
		$("tr .nickname a").each(function(i){if($(this).html() == "SADUCFKNIGHT"){$(this).parent().parent().parent().remove();}})
		$(".fnavborderright a").each(function(i){if($(this).html() == "SADUCFKNIGHT"){$(this).parent().parent().remove();}})
	})
}