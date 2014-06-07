// ==UserScript==
// @name           hide myspace info bar
// @description    hides info bar on home page (EX: profile views, last login)
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("home_infoBar");
if (b) {b.parentNode.removeChild(b);}







