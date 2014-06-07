// ==UserScript==
// @name		Google Search New Tab
// @description		Open Google search result in new window.
// @include              https://encrypted.google.com/search?*
// @include		http://www.google.tld/search?*
// ==/UserScript==

newWin();

function newWin(){
	var anchors = document.getElementById("ires").getElementsByTagName("a");
	for (var i=0; i<anchors.length; i++) {
		var anchor = anchors[i];
		anchor.target = "_blank";
	}
}