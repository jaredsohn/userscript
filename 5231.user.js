// ==UserScript==
// @name           hide myspace schools
// @description    hides schools on home page
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("home_schools");
if (b) {b.parentNode.removeChild(b);}







