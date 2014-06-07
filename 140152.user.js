// ==UserScript==
// @name           FB Test User Tool
// @namespace      http://www.bzc.co.jp/greasemonkey/facebook
// @include        https://*.facebook.com/*
// @author        ChemiAtlow
// @version       0.5.3
// ==/UserScript==
window.onscroll = function(){
    if(getScrollTop()>140) {
        document.getElementById("blueBar").style.position="fixed";
    } else {
        document.getElementById("blueBar").style.position="";
    }
}

function getScrollTop() {
    if (window.onscroll) {
        // Most browsers
        return window.pageYOffset;
    }

    var d = document.documentElement;
    if (d.clientHeight) {
        // IE in standards mode
        return d.scrollTop;
    }

    // IE in quirks mode
    return document.body.scrollTop;
}