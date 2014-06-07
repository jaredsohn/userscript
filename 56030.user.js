// ==UserScript==
// @name           Inviteshare.com Profile Links
// @namespace      http://userscripts.org/users/104626
// @description    Turns email images in invite lists into links to associated profiles!
// @include        http://*inviteshare.com/*
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
	$('.dimmed').each(function() {
		var id = $(this).find('img')[0].src.split('&id=')[1].split('&row')[0];
		$(this).html('<a href="http://www.inviteshare.com/viewprofile.php?id=' + id + '" target="new">' + $(this).html() + '</a>');
	});
}