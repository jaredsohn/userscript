// ==UserScript==
// @name          Hide YouTube on Facebook
// @description   Hides all posts with youtube videos on you profile
// @require       http://gmconfig.googlecode.com/svn/trunk/fb_gm_frame.js
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
function fuck_bref(pwn) {
    var node = (pwn ? pwn.parentNode: null) || document.body || document,
    array = document.evaluate(".//li[contains(.,'http://www.canalplus.fr/c-divertissement/pid3848-bref.html')]", node, null, 6, null);
    for (var i = 0, item; (item = array.snapshotItem(i)); i++) item.parentNode.removeChild(item);
}

fuck_bref();
window.addEventListener(
"load",
function() {
    fuck_bref();
    window.addEventListener(
    "DOMNodeInserted",
    function(pwn) {
        fuck_bref(pwn.currentTarget);
    },
    false
    );
},
false);