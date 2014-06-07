// ==UserScript==
// @name           myspace bulletins
// @description    Bulletins are for dumbasses - Robert Powers
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("home_bulletins");
if (b) {b.parentNode.removeChild(b);}


