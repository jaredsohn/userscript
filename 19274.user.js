// ==UserScript==
// @name           Re-enable Text Selection
// @namespace      http://anythinggaming.com/
// @description    Allows you to select text on Snopes.com articles.
// @include        http://www.snopes.com/*
// ==/UserScript==
var resettimer1 = window.setTimeout("document.onmousedown=''", 1000);
var resettimer2 = window.setTimeout("document.onmousedown=''", 2000);
var cleartimers = window.setTimeout(clearresettimers, 2500);
function clearresettimers() {
	window.clearTimeout(resettimer1);
	window.clearTimeout(resettimer2);
	window.clearTimeout(cleartimers);
}
