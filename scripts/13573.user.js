// ==UserScript==
// @name	Fluff Friends Better
// @namespace	http://www.smert.net/
// @description	Auto place bets on doubles for Fluff Friends
// @include	http://apps.facebook.com/fluff/fluffrace*
// ==/UserScript==
var inputs = document.getElementsByTagName("input");
var x;
for (x in inputs) {
       if (inputs[x].name) if (inputs[x].name.substr(0,4) == "top2") inputs[x].value = "10";
}
