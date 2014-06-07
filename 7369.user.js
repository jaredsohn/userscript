// ==UserScript==
// @namespace     http://xkcd.org/
// @name          xkcd titles - hidden so you need to mark it to see it
// @author				riddle, improved by sesse
// @include       http://xkcd.*/*
// @include       http://www.xkcd.*/*
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
		desc.setAttribute("style", "color: white");
		desc.appendChild(document.createTextNode(img.title));
		img.title = null;
		insertAfter(desc, img);
	}
}
