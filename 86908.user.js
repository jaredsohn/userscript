// ==UserScript==
// @name           UF Arrow Key Bindings
// @namespace      http://justjohn.us
// @description    Adds next/back arrow key bindings to UserFriendly.org
// @include        http://ars.userfriendly.org/cartoons/*
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

var next;
var prev;

function letsJQuery() {
	$(document).ready(function() {
		var links = document.getElementsByTagName("area");

		for (i=0;i<links.length;i++) {
			var link = links[i];
			if (link != '' && link.getAttribute("alt") == "Next Day's Cartoon") {
				next = link;
			} else if (link != '' && link.getAttribute("alt") == "Previous Cartoon") {
				prev = link;
			}
		}
	});

	$(document).keydown(function(e) {
		if (e.keyCode == 37) { // left arrow
			document.location = prev.href;
		}
		if (e.keyCode == 39) { // right arrow
			document.location = next.href;
		}
	});
}
