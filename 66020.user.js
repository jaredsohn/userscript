// ==UserScript==
// @name           Remove Linkbucks
// @namespace      Remove Linkbucks
// @description    Removes Linkbucks from all links. Simple right?
// @include        http://*
// ==/UserScript==

// Clear linkbucks
function clearLinkbucks(){
	var a = document.getElementsByTagName("A");
	for(var i in a) {
		if (a[i].href.indexOf("linkbucks.com/url/") >= 0) {
			a[i].href = a[i].href.split("linkbucks.com/url/")[1];
		}
	}
}
clearLinkbucks();