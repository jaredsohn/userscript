// ==UserScript==
// @name           vainspace
// @description    pandiv
// @include        http://*.vainspace.com/*
// @include        http://vainspace.com/*
// ==/UserScript==

var b = document.getElementById("pandiv");
if (b) {b.parentNode.removeChild(b);}



var b = document.getElementByName("google_ads_frame");
if (b) {b.parentNode.removeChild(b);}







