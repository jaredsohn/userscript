// ==UserScript==
// @name        Play Store reviews
// @namespace   -
// @description Reviews in Google's Play Store are better readable now
// @include     https://play.google.com/store/apps/details?id=*
// @version     1
// ==/UserScript==

var css = document.createElement('style');
css.type = "text/css";
css.innerHTML = ".multicol-column {word-break: normal;} .review-title {font-weight: 700; display: block;}";
document.head.appendChild(css);