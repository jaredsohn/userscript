// ==UserScript==
// @name        Grooveshark Ad Killer
// @namespace   grooveshark.com
// @description Removes Grooveshark ads.
// @include     http://grooveshark.com/*
// @version     1
// ==/UserScript==

window.onload = function () {
	remover();
	var oldLoc = location.href;
	setInterval(function () {
		if (location.href != oldLoc) {
			remover();
		}
	},1000);
}
var remover = function() {
	var contentDiv = document.getElementById("content");
	var divs = contentDiv.getElementsByTagName("div");
	var i=0;
	while (i<divs.length) {
		var divId = divs[i].id;
		if (divId != null && divId.match(/CapitalWrapper|FoldHelper|capitalSidebar/)) {
			divs[i].parentNode.removeChild(divs[i]);
		}
		else {
			i++;
		}
	}
}