// ==UserScript==
// @name           FUCK ALERTS
// @namespace      JOHNALD THE ROBOT IS AWESOME JUST FYI
// @description    I DON'T WANT TO CLICK THROUGH 20 "YOU HAVE BEEN SCREWED" MESSAGES THANK YOU VERY MUCH
// @include        http://www.forumwarz.com/characters/me
// ==/UserScript==
// JQuery Integration taked from: http://internetducttape.com/2008/05/08/greasemonkey-ninja-jquery/
// Example from http://www.joanpiedra.com/jquery/greasemonkey/

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	    else { lolquery = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
	lolquery.noConflict();

    	lolquery('.alert').remove();
	lolquery('#profile').show();
    }


