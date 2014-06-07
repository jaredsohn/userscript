// ==UserScript==
// @name           TSD -  Hide Size
// @namespace      http://bobbyrward.info/userscripts
// @description    Hides the size column in the browse page
// @include        http://www.tang-soo-do.us/browse.php
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
        $($('td[@class="ttable_head"]')[0]).parent().parent().parent().find('tr').each(function(i){$(this).find('td:eq(5)').hide();});
    }
