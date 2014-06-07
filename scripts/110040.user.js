// ==UserScript==
// @name add Games
// @version 0
// @include https://plus.google.com/*
// @include http://plus.google.com/*
// @match https://plus.google.com/*
// @match http://plus.google.com/*
// ==/UserScript==

(function (d, func) {
    var h = d.getElementsByTagName('head')[0];
    var s1 = d.createElement("script");
    s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
    s1.addEventListener('load', function() {
        var s2 = d.createElement("script");
        s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
        h.appendChild(s2);
    }, false);
    h.appendChild(s1);
})(document, function($) {
$('<a href="/games" target="_top" class="d-k a-c-k-eb Mc d-q-p n1 dH" aria-label="ゲーム"><span class="p1 cH pm" data-tooltip="ゲーム"></span></a>').appendTo("div[class='l1 aH d-q-p'][role='navigation']");
});