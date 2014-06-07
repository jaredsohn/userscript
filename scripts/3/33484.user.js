//
// ==UserScript==
// @name          URLCash / UserCash filter (v2)
// @description   Removes wrapper frame on image pages. Simpler version (thanks to Grey!). Now compatible with middle click.
// @include       http://*.usercash.com/*
// @include	  http://*.urlcash.net/*
// @include	  http://*.urlgalleries.com/*
// ==/UserScript==

var re = new RegExp('(http://.*)');

m = re.exec(document.title);
if (m != null) location.replace(m[1]);
