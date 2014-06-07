// ==UserScript==
// @name           hide myspace bottom links
// @description    hides bottom links on home page
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("footer");
if (b) {b.parentNode.removeChild(b);}






