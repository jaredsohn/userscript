// ==UserScript==
// @name           mojBlink Download Fix
// @namespace      mojblink
// @include        http://mojblink.com/*
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
	$.noConflict();
	
	$("div.stholder.lcursor").hover(
	  function () {
	    $(this).find(".stalt").show();
	  },
	  function () {
	    $(this).find(".stalt").hide();
	  }
	);
}