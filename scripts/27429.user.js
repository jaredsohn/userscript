// ==UserScript==
// @name           Ravers Only Hacks
// @namespace      http://logankoester.com
// @description    Removes the oversized header from raversonly.com, allowing a lot more information to fit above the fold.
// @include        http://raversonly.com/*
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
          $('html body div table tbody tr td table tbody tr').children().eq(1).remove();
    }