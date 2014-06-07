// ==UserScript==
// @name	SafariKeys
// @namespace	http://www.the2ndproject.com/safariscripts/
// @description	Allows easy navigation around safari. See http://www.the2ndproject.com/safariscripts/ for more details 
// @include	http://safari.oreilly.com/*
// @include	http://safari.informit.com/*
// @include	http://safari.bvdep.com/*
// @include	http://search.safaribooksonline.com/*
// ==/UserScript==

function prevPage() {
	window.location = document.links[document.links.length - 13];
}

function nextPage() {
	window.location = document.links[document.links.length - 12];
}

function linkPage(linkText) {
	for (i=0; i<document.links.length; i++) {
		if (document.links[i].innerHTML == linkText) {
			window.location = document.links[i];
		}
	}
}

function detectKey(e) {
	var keyCode, keyChar
	if (!e) var e = window.event;
	if (e.keyCode) { keyCode = e.keyCode; }
	else if (e.which) { keyCode = e.which; }
	keyChar = String.fromCharCode(keyCode);
	if ((keyChar == ",") || (keyCode == 37)) { prevPage(); }
	if ((keyChar == ".") || (keyCode == 39)) { nextPage(); }
	if ((keyChar == "p")) { linkPage("Print"); }
	if ((keyChar == "d")) { linkPage("Download"); }
	if ((keyChar == "e")) { linkPage("E-Mail"); }
	if ((keyChar == "v")) { linkPage("View Notes"); }
	if ((keyChar == "n")) { linkPage("Add Note"); }
	if ((keyChar == "b")) { linkPage("Add Bookmark"); }
	if ((keyChar == "c")) { linkPage("Table of Contents"); }
	if ((keyChar == "i")) { linkPage("Index"); }
}

document.onkeypress = detectKey;