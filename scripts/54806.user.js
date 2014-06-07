// ==UserScript==
// @name           Reddit Beer Spacing Fix
// @namespace      btg
// @description    Fix the line spacing in the beer subreddit
// @include        http://www.reddit.com/r/beer/*
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
		$('head').append('<style type="text/css">body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, p, blockquote, th, td, iframe { padding: 0px; margin 0px; }</style>');
    }
   