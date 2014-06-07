// ==UserScript==
// @name           Better Patent Search
// @namespace      http://narendra.sisodiya.googlepages.com/
// @description    Script to make Indian Patent Search Better in Firefox
// @include        https://124.124.220.66/*
// @version		0.11
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
        $("body").css("background","#003366");
    }
