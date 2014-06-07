// ==UserScript==
// @name         self-links-for-headers-with-ids
// @version      0.0.1
// @description  provide self links for headers (h1, h2, etc.) with id=""'s. 
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      *
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

function add_self_links() {
    var myclass = "self_link";
    if (! $("body").hasClass(myclass)) {
        $("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]").each(function(i){ $(this).append( ' <span class="selfl">[<a href="#' + this.id + '">link</a>]</span>' ) })
        $("body").addClass(myclass);
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    add_self_links();
}
