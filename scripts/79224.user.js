// ==UserScript==
// @name           maps.lt - Remove top banner
// @namespace      maps.lt
// @include        http://maps.lt/map/*
// ==/UserScript==

// Remove top banner

var topNode = document.getElementById("top");
while (topNode.childNodes[0]) {
	topNode.removeChild(topNode.childNodes[0]);
}