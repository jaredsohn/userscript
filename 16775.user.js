// Amazon Forums
// Sean LeBlanc

// This script adds improvements to Amazon's forums

// 1.0.0 - Adds navigation bar to top of list.

// 1.0.1 - Highlight own posts and replies.

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// ==UserScript==
// @name          Amazon Forums 1.0.1
// @namespace     http://sean-leblanc.blogspot.com
// @description	  Add improvements to Amazon Forums.

// @include       http://*.amazon.*/forum/*
// @include       http://amazon.*/forum/*
// ==/UserScript==

// @Version       1.0.1
// @Firefox       1.5+
// @GmVersion     0.6.4
// @Author        Sean LeBlanc
// @Email         comcast.net | sean leblanc
// TODO

var dbg = false;

function slog(logthis) {
	if (dbg) GM_log(logthis);
}



// Simplify making a FIRST_ORDERED_NODE_TYPE XPath call

function xpathFirst(query, node) {
    if (!node) {
	node = document;
    }

    var result = document.evaluate(query, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

    if (!result) {
	return;
    }

    return result.singleNodeValue;
}

// Simplify making an UNORDERED_NODE_SNAPSHOT_TYPE XPath call
// Return a snapshot list

function xpathAll(query, node) {
    if (!node) {
	node = document;
    }

    return document.evaluate(query, node, null, XPathResult.ANY_TYPE, null);
}

function findIndexDiv() {
	var id = null;
	// <div class="cdPageSelectorPagination" style="padding: 6px;">
	id = xpathFirst('//div[@class="cdPageSelectorPagination"]');
	return id;
}

function findTopDiv() {
    var td = null;
    td = xpathFirst('//div[@class="cdPageSelectorHeader"]');
	return td;
}


// Find your posts and replies to yours, color yellow:
function findMine() {
	var td = null;
	slog("Find <em>...");
	var ems = document.getElementsByTagName("em");
	for (var i=0;i<ems.length;i++) {
		elt = ems[i];
		slog("Content: " + elt.textContent);
		if (elt.parentNode&&elt.parentNode.parentNode) {
			clr = elt.parentNode.parentNode;
			if (clr.getAttribute("class")=="postContent") {
				slog("element " + elt.textContent + " has parent!");
				clr.style.background="yellow";
			}
			else {
				slog("moving to next sibling...");
				clr = elt.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
				slog("sibling: " + clr);
				if (clr && clr.getAttribute("class")=="postContent") {
					slog("element " + elt.textContent + " has parent!");
					clr.style.background="yellow";
				}
				else {
					slog("Found element, but unable to color!");
				}
			}

		}
	}
	slog("After for loop.");
}



var indexDiv = findIndexDiv();

if (indexDiv) {
    slog("Found index div; about to find top div.");
    var topDiv = findTopDiv();
    if (topDiv) {
        slog("Found top div.");
        //var parentDiv = topDiv.parentNode;
        var newDiv = indexDiv.cloneNode(true);

        topDiv.parentNode.insertBefore(newDiv, topDiv.nextSibling);//(newDiv, topDiv);

    }
}




slog("About to find your posts.");
var myposts = findMine();


