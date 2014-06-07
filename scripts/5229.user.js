// ==UserScript==
// @name           hide myspace squaread
// @description    hides ad above friends on home page
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("squareAd");
if (b) {b.parentNode.removeChild(b);}





