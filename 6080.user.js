// ==UserScript==
// @namespace     http://xkcd.org/
// @name          xkcd titles
// @author				riddle
// @include       http://*xkcd.tld/*
// ==/UserScript==

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

var mc = document.getElementById("middleContent");
if (mc) {
	var img = mc.getElementsByTagName("img")[0];
	if (img && img.title) {
		var desc = document.createElement("div");
		desc.appendChild(document.createTextNode(img.title));
		img.title = null;
		insertAfter(desc, img);
	}
}