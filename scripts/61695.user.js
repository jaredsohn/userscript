// ==UserScript==
// @name           Reddit Move Collapse Icon To The Left of Username
// @namespace      gcalpo
// @description    Relocates the collapse icon to the left of the username, where it's easier to get to.
// @include        http://www.reddit.com/*/comments/*
// ==/UserScript==

/*********************************************************************************/


var Anchors = document.getElementsByTagName('a');
var nrAnchors = Anchors.length;
for (var i = 0; i < nrAnchors; i++) {
	var Anchor = Anchors[i];
	if (Anchor.className.match('expand')) {
		RelocateAnchor(Anchor);
	}
}
/*********************************************************************************/
function RelocateAnchor(Anchor) {
	
	// move it to the left of the sibling anchor of class "author"
	
	var parent = Anchor.parentNode; // points to a P tag
	
	var removedNode = parent.removeChild(Anchor)
	var insertedAnchor = parent.insertBefore(removedNode, parent.firstChild);
	
	
}
/*********************************************************************************/
