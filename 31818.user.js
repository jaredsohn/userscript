// ==UserScript==
// @name			Kongregate Auto-rate
// @description		Auto-rates a Kongregate game with a random number of stars. Will overwrite existing ratings, so buyer beware. Auto-magically loads the jQuery library, so it may not play well with other Kongregate userscripts.
// @namespace		http://userscripts.org/users/60317
// @include			http://www.kongregate.com/games/*
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
	var randomnumber = 1 + Math.floor(Math.random()*5);
	$("ul.star-rating li a.star-" + randomnumber).click();
}