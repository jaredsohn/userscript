// Google Cache Highlights Browser
// version 1.1
// 2008-08-23
// Copyright (c) 2007, Danilo Roascio
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Cache Highlights Browser", and click Uninstall.
//
// --------------------------------------------------------------------
//
// This script creates two hotkeys ("n" for "next" and "b" for
// "previous") that will automatically scroll thru highlighted search 
// words on a Google's Cache page. 
//
// While browsing, current highlight will turn red and search will wrap 
// around.
//
// To give due credits, idea for the script came from Google Code
// Search (www.google.com/codesearch) and keydown event handler was
// "inspired" by Gmail Macros (userscripts.org/scripts/show/2432).
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Google Cache Highlights Browser
// @namespace      tag:danilo@roascio.fakemail.it,2007-05-17:GoogleCacheHB
// @description    This script creates two hotkeys ("n" for "next" and "b" for "previous") that will automatically scroll thru highlighted words on a Google's Cache page.
// @include        http://*/search?q=cache*
// ==/UserScript==

var mstring = "gchbmatch";

// Let's build an array with colors to search for, taking them from
// Google's frame on top of the page
allObj = document.evaluate(
    "/html/body/div[position()=1]/div[position()=1]/div[position()=last()]//span[@style]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var colors = [];
var k = 0;
for (i = 0; i < allObj.snapshotLength; i++) {
	thisObj = allObj.snapshotItem(i);
	matchStyle = thisObj.getAttribute("style");

	re = new RegExp(".*rgb\\((\\d+)\\D+(\\d+)\\D+(\\d+)\\).*", "i")

	matches = matchStyle.match(re);
	if (matches) {
		colors[k++] = matches[1] + "-" + matches[2] + "-" + matches[3];
	}
}

// And now we search for bold text with one of those colors[] and we
// add an anchor right before that text
var totalMatches = 0;
var thisMatch;
var getColors = /\D*(\d+)\D*(\d+)\D*(\d+)\D*/i;
allMatches = document.evaluate(
	"//b[@style]",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (j = 0; j < allMatches.snapshotLength; j++) {
	thisMatch = allMatches.snapshotItem(j);
	matchStyle = thisMatch.getAttribute("style");
	for (i = 0; i < colors.length; i++) {

		var col = (+(getColors.exec(colors[i])[1]) + ", " +
			(+(getColors.exec(colors[i])[2])) + ", " +
			(+(getColors.exec(colors[i])[3])));
		re = new RegExp(".*rgb\\(" + col + "\\);$", "i")

		if (matchStyle.match(re)) {
			totalMatches++;
			var anchor = document.createElement("a");
			anchor.setAttribute("name", mstring + totalMatches);
			thisMatch.insertBefore(anchor, thisMatch.firstChild);
		}

	}
}

//
// KEYDOWN Handler
//
var currMatch = totalMatches;
var previousMatch;
if (thisMatch) {
	var previousStyle = thisMatch.getAttribute("style");
}

function keyHandler(event) {

	if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
		return false;
	}

	if (event.target && event.target.nodeName) {
		var targetNodeName = event.target.nodeName.toLowerCase();
		if (targetNodeName == "textarea" ||
			(targetNodeName == "input" && event.target.type &&
			 event.target.type.toLowerCase() == "text")) {
			return false;
		}
	}

	// Calculating next target anchor and jumping there
	switch (event.keyCode) {
		case ("N".charCodeAt(0)):
			previousMatch = currMatch;
			if (++currMatch > totalMatches)
				currMatch = 1;
			gotoMatch(currMatch);
			break;
		case ("B".charCodeAt(0)):
			previousMatch = currMatch;
			if (--currMatch < 1)
				currMatch = totalMatches;
			gotoMatch(currMatch);
			break;
	}

	// Resetting previousMatch's background color
	tmp = document.evaluate(
		"//a[@name='"+ mstring + previousMatch + "']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	if (tmp.snapshotItem(0))
		tmp.snapshotItem(0).parentNode.setAttribute("style", previousStyle);

	// Setting currMatch's background color
	tmp = document.evaluate(
		"//a[@name='" + mstring + currMatch + "']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	previousMatch = currMatch;
	if (tmp.snapshotItem(0)) {
		previousStyle = tmp.snapshotItem(0).parentNode.getAttribute("style");
		tmp.snapshotItem(0).parentNode.setAttribute("style", "color: black; background-color: rgb(255, 0, 0);");
	}

	return false;
}

function gotoMatch(target) {
	// Just look at the bright side: the following could've been harder to read ;)
	var nl = (window.location.href.match("(.+)#" + mstring + "[0-9]+$", "i") ? RegExp.$1 : window.location.href) + "#" + mstring + target;
	window.location.replace(nl); // no history entry in browser
}

window.addEventListener('keydown', keyHandler, false);
