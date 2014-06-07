// ==UserScript==
// @name        Werbebannerblocker DS
// @description blockt Werbebannerung
// @include     http://de*.die-staemme.de/*
// @version     1.3
// ==/UserScript==
document.getElementById("SkyScraperAd").innerHTML=null;
add1 = document.getElementById("ad_leaderboard");
add1.parentNode.removeChild(add1);
add2 = document.getElementById("ContentAd");
add2.parentNode.removeChild(add2);
