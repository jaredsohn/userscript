// ==UserScript==
// @name           HighlightEntityInSearchList
// @namespace      mal
// @include        http://myanimelist.net/anime.php*
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
	$("#rightcontent_nopad > div > table :first tr :has(.button_edit)").parent().attr('style', 'background:#CEFFA4');

    }
////
