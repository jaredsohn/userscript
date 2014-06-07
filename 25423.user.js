// ==UserScript==

// @name           bunny titles

// @namespace      Adapted from "xkcd titles" userscript
// @description    Inserts images titles after the bunny comic

// @include        http://*bunny.frozenreality.co.uk/*

// @include        http://*bunny-comic.com/*

// ==/UserScript==


function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

var mc = document.getElementById("strip");
if (mc) {
	var img = mc.getElementsByTagName("img")[0];
	if (img && img.title) {
		var desc = document.createElement("div");
		desc.appendChild(document.createTextNode(img.title));
//		img.title = null;
		insertAfter(desc, img);
	}
}
