// ==UserScript==
// @name           Remove Image Links
// @namespace      Remove Image Links
// @description    Hides links that point to .jpg images
// @include        http://*

// ==/UserScript==

// Remove Image Links
function clrImageLinks(){
	var a = document.getElementsByTagName("a");
	for(var i in a) {
		if (a[i].href.indexOf(".jpg") >= 0) {
			a[i].href = a[i].parentNode.style.display="none";
		}
	}
}
clrImageLinks();