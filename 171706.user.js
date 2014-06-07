// ==UserScript==
// @name        Conrad Cookie Notice Deleter
// @namespace   CookieFoetsie
// @include     http://www.conrad.*/*
// @version     1.1
// @description Removes Cookie Notice Bar from top of screen on Conrad sites
// ==/UserScript==

// remove cookie notice header
var CookieFoetsie = document.getElementById('cookie_box_header');
CookieFoetsie.parentElement.removeChild(CookieFoetsie);

// remove annoying slider ads
var SlideFoetsie =  document.getElementById('slideshow');
SlideFoetsie.parentElement.removeChild(SlideFoetsie);