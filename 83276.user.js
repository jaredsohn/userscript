// ==UserScript==
// @name           Kicker Allow Rightclick
// @description    Erlaubt den Rechtsklick bei kicker.de
// @include        http://*.kicker.de/*
// ==/UserScript==

(function() {
    var e, i, all;

    document.onmouseup = null;
    document.onmousedown = null;
    document.oncontextmenu = null;

    all = document.getElementsByTagName("*");
    for (i = 0; i < all.length; i += 1) {
        e = all[i];
        e.onmouseup = null;
        e.onmousedown = null;
        e.oncontextmenu = null;
    }
})();