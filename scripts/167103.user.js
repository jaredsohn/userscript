// ==UserScript==
// @name        去除ed2kers.com的链接上的www.xxx标志
// @namespace   slayercat.com
// @include     http://www.ed2kers.com/*
// @grant       none
// @version     1
// ==/UserScript==

$(".itemtitle").each(function() {
    var m = $(this).attr("href")
        .replace(
            "ed2k://|file|[www.ed2kers.com]",
            "ed2k://|file|")
        .replace("%5B","[")
        .replace("%5D","]");
        
    $(this).attr("href", m);
});

