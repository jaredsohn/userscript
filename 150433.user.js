/*

Removes Trademe`s header & footer from their webpages
Oct 2013

Greasemonkey Script to remove the Header and footer that does nothing but hog your screen real estate.
To Enable or Disable this script, simply tick or untick the entry from the greasemonkey dropwon menu.


*/

// ==UserScript==
// @name Hide Trademe footer
// @include http://www.trademe.co.nz/*
// @version 1
// ==/UserScript==


var elmDeleted = document.getElementsByClassName("site-footer").item(0);elmDeleted.parentNode.removeChild(elmDeleted);
var topDeleted = document.getElementsByClassName("sat-nav").item(0);topDeleted.parentNode.removeChild(topDeleted);
