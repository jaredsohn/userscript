// ==UserScript==
// @name test
// @include http://*.friendster.com/*
// @include http://www.friendster.com/*
// ==/UserScript==
var GM_jQuery = document.createElement('script');
GM_jQuery.src = 'http://code.jquery.com/jquery-latest.min.js';
GM_jQuery.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_jQuery);

// Wait until jQuery has loaded
function GM_wait() {
    if( typeof unsafeWindow.jQuery == 'undefined' ) {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        GM_ready();
    }
}
GM_wait();

// Once document and jQuery are loaded
function GM_ready() {
	$(document).ready(function(){
		alert($(".photoThumb").css("background-image"));
	});
}

