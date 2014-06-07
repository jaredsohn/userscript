// ==UserScript==
// @name           Shelfari Ads
// @namespace      http://www.shelfari.com
// @description    Hide ads on Shelfari
// @include        http://www.shelfari.com/*
// ==/UserScript==

document.getElementById("ad").style.visibility = "hidden";
document.getElementsByClassName("ad ad_300x250")[0].style.visibility = "hidden";