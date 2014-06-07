// ==UserScript==
// @name          View userscript source links
// @namespace     http://henrik.nyh.se
// @description   Recent Greasemonkey releases do not display the script source in the main Firefox window prior to installation. This script adds a "#" link, for viewing the source, next to userscript links (other than on Userscripts.org).
// @include       *
// @exclude       http://userscripts.org/*
// @exclude       http://*:3000/*
//                ^ Exclude development userscripts.org
// ==/UserScript==

var links = document.links;

for (i = 0; i < links.length; i++) {
	if (links[i].href.match(/.user.js$/))
		sourcify(links[i]);
}

function sourcify(link) {
	var source_link = document.createElement("a");
	var space = document.createTextNode(" ");
	source_link.href = link.href + "?source";
	source_link.innerHTML = "#";

	var parent = link.parentNode;
	parent.insertBefore(source_link, link.nextSibling);
	parent.insertBefore(space, link.nextSibling);
}