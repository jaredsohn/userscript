// ==UserScript==
// @name          Remove Grooveshark Ads
// @description   Modification for Grooveshark.com, because nobody likes ads!
// @include       *grooveshark.com/*
// ==/UserScript==

var gs=function() {
    if (document.getElementById('lightbox_overlay')!=null) {
        var head = document.head;
        if ("item" in head) {
            if (!head[0]) {
                setTimeout(gs, 25);
                return;
            }
            head = head[0];
        }
        var scriptElem = document.createElement("script");
        scriptElem.src = 'https://raw.github.com/cannjeff/grooveAds/master/removeAds.js';
        head.insertBefore(scriptElem, head.firstChild);
    } else {
        setTimeout(gs, 1000);
    }
};gs();