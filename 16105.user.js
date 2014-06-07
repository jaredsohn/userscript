// Thread Comments example user script
// It presents the threads under Vox posts in an hierarchical manner, 
// similar to how it works in  Livejournal.
// version 0.2 BETA!
// New in 0.2: a slightly more efficient algorithm.
// 2007-12-09
// Copyright (c) 2007, Dmitry Rubinstein
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Thread Comments", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Thread Comments
// @namespace     http://dimrub.vox.com/
// @description   Presents the comments under Vox posts in an hierarchical manner, similar to how it works in  Livejournal. 
// version 0.2 BETA!
// New in 0.2: a slightly more efficient algorithm.
// @include       http://*.vox.com/library/post/*
// ==/UserScript==

var allDivs, thisDiv;
// Find all the coment nodes
allDivs = document.evaluate(
    '//div[@id = "comments"]/div/div/div',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// Rename the at:reply-to-xid into in-reply-to in order to work around
// the lack of support for namespaces in attributes in JavaScript's XPath
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);

    // While at it, rename the class, so that all (not just even) comments
    // have a border around them
    thisDiv.className = thisDiv.className.replace(/odd/, "even");

    thisParent = thisDiv.getAttribute('at:reply-to-xid')
    if (thisParent != null)
        thisDiv.setAttribute('in-reply-to', thisParent)
}

// Array that is indexed by the comment ID and contains the offset from left
// for that comment. 
var lefts = new Array()

// Iterate over the comments, for each - find all of its children, and place it
// directly beneath it
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    div_id = thisDiv.id.substring(thisDiv.id.indexOf('-') + 1);

    // If left for this node is not defined - this node has no parent 
    // (that would have defined it for it)
    if (lefts[div_id] == null) {
        thisDiv.style.left = "0px";
        lefts[div_id] = 0;
    }

    // Now we can define the left offset for all the children of this node
    thisLeft = lefts[div_id];
    childLeft = thisLeft + 20;

    // lookup all the children of this node
    var child_comments = document.evaluate(
	// look up relative to the parent node - thus '//' in the 
	// beginning of the pattern is not needed, and the pattern
	// is more efficient than otherwise.
    	'div[@in-reply-to="' + div_id + '"]',
        thisDiv.parentNode,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
        null);

    // The current node to place a child after
    last = thisDiv;
    // Iterate over the children, fixing their left offset and position
    for (var j = 0; j < child_comments.snapshotLength; j++) {
        child = child_comments.snapshotItem(j);
    	child_id = child.id.substring(thisDiv.id.indexOf('-') + 1);

	// Define the child's offset
        lefts[child_id] = childLeft;
        child.style.left = childLeft + "px";

	// Move the child to the correct position
        par = child.parentNode;
        par.removeChild(child);
        par.insertBefore(child, last.nextSibling);

	// The next child will be placed after this one
        last = child;
    }
}
