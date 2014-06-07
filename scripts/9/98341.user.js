// ==UserScript==
// @namespace     http://gunshowcomic.com/
// @name          Gunshow Titles
// @description   Adds image title text beneath the comic.
// @author			  riddle, Vague Rant
// @include       http://*gunshowcomic.com/*
// ==/UserScript==

var mc = document.getElementById("comic");
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
//	if (parent.lastChild == targetElement) {
//		parent.appendChild(newElement);
//	} else {
		parent.insertBefore(newElement, mc.getElementsByClassName("stripnav")[1]);
//	}
}

if (mc) {
	var img = mc.getElementsByClassName("strip")[0];
	if (img && img.title) {
		var desc = document.createElement("div");
		desc.style.color = '#000000';
		desc.style.paddingBottom = '1em';
		desc.appendChild(document.createTextNode(img.title));
		insertAfter(desc, img);
	}
}