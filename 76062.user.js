// ==UserScript==
// @name           Buzzinga!
// @namespace      http://userscripts.org/scripts/show/76062
// @description    Hide twitter streams from Google Buzz in Gmail.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @version        0.1 2010-05-05
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
    
    		$("a[class*='ot-anchor'][href*='twitter']").parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().css('display','none');
    	
    }
