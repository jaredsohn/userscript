// ==UserScript==
// @name           Remove TechTicker Video
// @namespace      http://www.wjgilmore.com/code/
// @description    Removes the annoying auto-play video from Yahoo! Finance TechTicker
// @include        http://finance.yahoo.com/*
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
        $('#yfi_iframe_vid').remove();
    }