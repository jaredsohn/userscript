// ==UserScript==
// @name	SafariLite
// @namespace	http://www.the2ndproject.com/safariscripts/
// @description	Hides book info in Safari. See http://www.the2ndproject.com/safariscripts/ for more details. 
// @include	http://safari.oreilly.com/*
// ==/UserScript==

// Hide Book Info

var allDivs, thisDiv;
allDivs = document.evaluate(
	"//table[@width='627']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
if (allDivs.snapshotLength == 2) { // Only on reading pages
	thisDiv = allDivs.snapshotItem(0);
 	thisDiv.style.display = "none";
}

// Hide O'Reilly Bar

var allDivs, thisDiv;
allDivs = document.evaluate(
	"//table[@width='100%']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thisDiv = allDivs.snapshotItem(0);
thisDiv.style.display = "none";