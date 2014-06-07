// ==UserScript==
// @name		Google Search New Window
// @namespace		http://shuai.be
// @description		Open Google search result in new window.
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