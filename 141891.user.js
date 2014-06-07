// ==UserScript==
// @name        Prod-Queue
// @namespace   de.mobile.greasemonkey.prodqueue
// @include     http://dashboard.corp.mobile.de/jirametrics/PROD/prodQueue.html
// @version     2
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function() {
    addFavicon("https://lh4.googleusercontent.com/-R4t29hl8TIs/T9h0SeIJgUI/AAAAAAAAA4I/tUPztQH3Dk8/s16/favicon.ico")
});


function addCss(css) {
    console.log("Greasemonkey script for Patrick's Jenkins is adding CSS: " + css);
    var newCss = document.createElement("style");
    newCss.type = "text/css";
    newCss.innerHTML = css;
    $("head")[0].appendChild(newCss);
}

function addFavicon(url) {
    console.log("Greasemonkey script for Patrick's Jenkins is adding Favicon: " + url);
    
    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = url;
    $("head")[0].appendChild(link);
}

