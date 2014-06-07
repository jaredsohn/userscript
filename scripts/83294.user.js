// ==UserScript==
// @name           TwitterRecolor
// @description    Modifies twitter link colors to be more readable
// @include        http://twitter.com/*
// @match        http://twitter.com/*
// ==/UserScript==

{
	var anchors = document.getElementsByTagName("a");
	if (anchors) {
		for (var i in anchors) {
			anchors[i].style.color = "#4444ff";
		}
	}
}
