// ==UserScript==
// @name         qa.mandriva.com-fix-reply-to-anchor
// @version      0.0.1
// @description  fix the reply-to-anchors on qa.mandriva.com.
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      http://qa.mandriva.com/*
// @include      https://qa.mandriva.com/*
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

function fix_anchor() {
    var myid = "add_comment";

    $("a[name=\"" + myid + "\"]").remove();

    $("td > textarea#comment").parent().attr("id", myid)
}

// All your GM code must be inside this function
function letsJQuery() {
    fix_anchor()
}
