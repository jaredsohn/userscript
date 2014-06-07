// ==UserScript==
// @name		   guardianTweaks
// @namespace      http://www.tjhcreates.com
// @description    Guardian CSS style changes & comment blah filter
// @include        http://www.guardian.co.uk/*
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

function letsJQuery() {

	//Make the guardian look nicer
	$('body').css("background", "#c0c0c0");
	$('div#wrapper').css({"padding" : "10px", "background" : "#fff", "border" : "solid 1px #CCCCCC"});
	$('div#top').hide();
	$('div.comment-body p').replaceWith('blah blahblah blah blah blah blah');
	
	
}