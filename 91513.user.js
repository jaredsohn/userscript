// ==UserScript==
// @name	gsl_round64_antispoiler
// @namespace	GOMTV
// @include	http:\\www.gomtv.net\*
// ==/UserScript==

function simulateClick(elm)
{
var evt = document.createEvent("MouseEvents");
evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
elm.dispatchEvent(evt);
}

var r64 = document.getElementById('round_64');
simulateClick(r64);