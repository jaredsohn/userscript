// ==UserScript==
// @name CryptoMiyagi / aabtc - Bitcoinwisdom fix v0.2
// @match http://107.170.89.74:8080/*
// @match http://bitcoinwisdom.com/*
// @match https://bitcoinwisdom.com/*
// @grant none
// ==/UserScript==

// If you make money from this site, support the developer!!
// This code snippet was created to enhance aabtc's 3x2 trading graph at: http://107.170.89.74:8080/aabtc.html 
// v0.2 - top navigation menu removed - aabtc

$("#trades").appendTo( $("#leftbar"));
$("#trades").css("font-size", "11px");
$(".gg160x600").hide();
$(".navbar-static-top").remove();