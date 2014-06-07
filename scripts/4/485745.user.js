// ==UserScript==
// @name        Remove google footer
// @namespace   https://greasyfork.org/
// @description Remove the footer from google home page + google chrome ad.
// @include     http://*.google*
// @include     https://*.google*
// @version     1.1
// @grant       none
// ==/UserScript==

var foot = document.getElementById("footer");
foot.parentElement.removeChild(foot);
var als = document.getElementById("als");
als.parentElement.removeChild(als);
var chr = document.getElementById("pmocntr2");
chr.parentElement.removeChild(chr);