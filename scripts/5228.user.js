// ==UserScript==
// @name           hide myspace top links
// @description    hides all top links on home page, keeps navbar
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("headerlinks");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("row0");
if (b) {b.parentNode.removeChild(b);}


var b = document.getElementById("header_search");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("header");
if (b) {b.parentNode.removeChild(b);}




