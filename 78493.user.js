// ==UserScript==
// @name          Alla_User_Blocker
// @namespace     Special Thanks to http://www.joanpiedra.com/
// @description	  Ignore Annoying People on the Zam Forums
// @author        Fujilives
// @homepage      not my homepage, but where most of the jquery integration comes from - http://www.joanpiedra.com/jquery/greasemonkey
// @include       *.allakhazam.com/*
// @include       *.zam.com/*
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

// ignore 1            put username below
$(".msgWhoFrame:contains(ThePsychoticOne)").parent().remove();

// ignore 2            put username below
$(".msgWhoFrame:contains(               )").parent().remove();

}


