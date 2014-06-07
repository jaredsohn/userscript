// ==UserScript==
// @name    	No Comment
// @namespace	http://daveandbritney.com/greasemonkey
// @description	hides ALL comments on AL.com
// @include		http://*.al.com/*
// ==/UserScript==

var allComments, thisComment, allReplies;
allComments = document.evaluate("//div[@class='comment']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allComments.snapshotLength; i++) {
	thisComment = document.getElementById(allComments.snapshotItem(i).id)
	if (thisComment) {
		thisComment.parentNode.removeChild(thisComment);
	}
}
allReplies = document.evaluate("//div[@class='comment reply']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allReplies.snapshotLength; i++) {
	thisComment = document.getElementById(allReplies.snapshotItem(i).id)
	if (thisComment) {
		thisComment.parentNode.removeChild(thisComment);
	}
}