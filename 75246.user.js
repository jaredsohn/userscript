// ==UserScript==
// @name           Remove floating banner
// @namespace      sam
// @description    Removed the highly annoying large floating static banner on top of svd.se
// @include        http://www.svd.se/*
// ==/UserScript==

function remove_ads() { 
	$(".adposition")
		.css("display", "none")
		.css("position", "static")
		.css("height", "1px")
		.css("width", "1px")
		.remove();
		
	$("#wrapper").css("padding-top", "0");
}

if (typeof unsafeWindow.jQuery == 'undefined') {		
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
};

(function GM_wait(callback) {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; callback(); }
})(remove_ads);
