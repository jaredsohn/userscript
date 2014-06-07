// ==UserScript==
// @name        Element14 Cookie Notice Deleter
// @namespace   CookieFoetsie
// @include     http://*.element14.com/*
// @version     1.1
// @description Removes grey cookie notice bar from top of screen
// ==/UserScript==

// remove cookie notice header
CookieFoetsie = document.getElementsByClassName('pf-cookie-directive')[0];
if (CookieFoetsie.parentNode)
CookieFoetsie.parentNode.removeChild(CookieFoetsie);

//TODO: fix 127 pixel top margin