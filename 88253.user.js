// ==UserScript==
// @name         freshmeat-expand-descriptions
// @version      0.0.1
// @description  Expand the Freshmeat.net descriptions (properly this time).
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      http://freshmeat.net/*
// ==/UserScript==
// ===============================================================

//
// License is X11 License:
// http://www.opensource.org/licenses/mit-license.php

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100); 
    }
    else { 
        $ = unsafeWindow.jQuery;
        letsJQuery(); 
    }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    var myclass = 'truncate';
    $('.' + myclass).removeClass(myclass);
}

