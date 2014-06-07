// ==UserScript==
// @name          TeamLiquid.net wider message contents
// @namespace     exoplasm
// @description	  Makes image blocks, spoiler blocks, and other blocks wider. For use with Teamliquid.net - Full width May 2011 userstyle.
// @author        exoplasm
// @homepage      http://exosquad.net/tl
// @include       http://www.teamliquid.net/forum/*
// @include       http://teamliquid.net/forum/*
// ==/UserScript==

// The ability to use jquery for this was taken from http://joanpiedra.com/jquery/greasemonkey/

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
	//alert($); // check if the dollar (jquery) function works
	//alert($().jquery); // check jQuery version
	
	$("div.imgdiv").attr("style","display:inline-block;max-width:100%;overflow:hidden");
	$("pre").attr("style","width: 100%; overflow-x:auto; font: 9pt monospace; margin: 0 5px; padding: 4px 6px; border: 1px solid black; background-color: #EBEFF2;");
        $("div.forummsg > img").attr("style","max-width: 100%; border:1px solid yellow");

}