// ==UserScript==
// @name           outBBB
// @description    Remove notícias e imagens relativas ao BBB da Globo.com
// @include        http://www.globo.com/*
// ==/UserScript==

(function() {
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
		$('a[href*="BBB"],a[href*="bbb"]').css("visibility","hidden");
		$('.opec-frame').hide();		
	}	
})();