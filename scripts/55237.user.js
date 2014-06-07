// ==UserScript==
// @name           RYM filter wishlist entries
// @namespace      qs
// @description    RYM filter wishlist entries
// @include        http://rateyourmusic.com/*
// @include        http://*.rateyourmusic.com/*
// ==/UserScript==

var link;
link = document.body.getElementsByTagName("a")

for (var i = 0; i < link.length; i++) {
    link[i].href = link[i].href.replace("/recent/","/recent,r0.5-5.0")};

unsafeWindow.switchRatingView('ratings');



