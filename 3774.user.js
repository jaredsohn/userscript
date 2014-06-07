// ==UserScript==
// @name		Dodger Thoughts Anti-Choi
// @namespace	http://dodgerthoughts.baseballtoaster.com/js/mark
// @description	Script to remove all comments with the word Choi in them.
// @include		http://dodgerthoughts.baseballtoaster.com/*
// ==/UserScript==

var comments = document.evaluate(
	"//div[@class='commenttext']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
for (var i=0;i<comments.snapshotLength;i++) {
	node = comments.snapshotItem(i);
	var prevnode = node["previousSibling"];
	var commentheader, commentdate;
	
	s = node.innerHTML;
	if(s.match(/\bchoi\b/i)) {

		// find comment header
		while(prevnode != null) {
			if(prevnode.nodeType == 1) {
				commentheader = prevnode;
				break;
			}
			else prevnode = prevnode["previousSibling"];
		}
		prevnode = prevnode["previousSibling"];

		// find date
		while(prevnode != null) {
			if(prevnode.nodeType == 1) {
				commentdate = prevnode;
				break;
			}
			else prevnode = prevnode["previousSibling"];
		}
		prevnode = prevnode["previousSibling"];
		
		// remove comment header, date, and the comment itself
		if(commentheader != null) node.parentNode.removeChild(commentheader);
		if(commentdate != null) node.parentNode.removeChild(commentdate);
		if(node != null) node.parentNode.removeChild(node);
	}
}