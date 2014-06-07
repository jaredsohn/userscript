// ==UserScript==
// @name           da-scrollenable
// @namespace      da
// @description    restore the scrollbar on da for FF 3.5 linux users (temporary)
// @include        http://www.deviantart.com/*
// ==/UserScript==

// boilerplate from http://joanpiedra.com/jquery/greasemonkey/ under MIT license

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
        $("body").removeClass("modal-theater"); // check if the dollar (jquery) function works
    }
