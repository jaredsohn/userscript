// ==UserScript==
// @name        finsi
// @namespace   1
// @description Remove cookie consent nags from finance.si
// @include     http://www.finance.si/*
// @include     http://forum.finance.si/*
// @include     http://*.finance.si/*
// @version     1.1
// ==/UserScript==
try {
	var eNag = document.getElementById("cow_overlay");
	eNag.parentNode.removeChild(eNag);
	var eNag = document.getElementById("cow_overlay_inside");
	eNag.parentNode.removeChild(eNag);
	var eNag = document.getElementById("cow2_overlay");
	eNag.parentNode.removeChild(eNag);
}
finally {}
