// ==UserScript==
// @name           Hide Myspace Search Form
// @description    Hides the new myspace search form
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("srch");
if (b) {b.parentNode.removeChild(b);}









