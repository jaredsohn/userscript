// ==UserScript==
// @name Bitcoinwisdom fix
// @match http://107.170.89.74:8080/*
// @match http://bitcoinwisdom.com/*
// @match https://bitcoinwisdom.com/*
// @grant none
// ==/UserScript==

// If you make money from this site, support the developer!!
$("#trades").appendTo( $("#leftbar"));
$("#trades").css("font-size", "11px");
$(".gg160x600").hide();
$(".navbar-static-top").remove();
$(".difficulty").remove();
$("#footer").remove();