// ==UserScript==
// @name           geizhals.at default sort by price
// @namespace      http://userscripts.org/
// @description    Add default sort by price for all navigation links on the left side
// @include        http://geizhals.at/*
// ==/UserScript==

// jQuery loading from http://joanpiedra.com/jquery/greasemonkey/

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
        if (typeof $ == 'function') {
            // Your Script Code Here
            $('ul.ghnavsub li a').each( function() {
                    $(this).attr('href', $(this).attr('href') + '&sort=p' );
            });
        }
    }


/* does not work, second iterateNext() call throws exception
var result = document.evaluate("//ul[@class='ghnavsub']/li/a", document, null, XPathResult.ANY_TYPE, null);
var link = result.iterateNext();
while (link) {
    link.href = link.href + '&sort=p';
    link = result.iterateNext();
}
*/

