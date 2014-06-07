// ==UserScript==
// @name          Next Post
// @namespace     http://facepunch.com/
// @description   Adds a link to the post header that immediately takes you to the next post.
// @include       http://www.facepunch.com/showthread.php*
// ==/UserScript==

var scrollPastCompletely = "true"; // Change to "false" if you still want to see the last part of the post.

var allLinks, thisLink;
allLinks = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

var lastLink = 42;
var lastLinkHTML = 42
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	
	if (thisLink.innerHTML.indexOf('Post #') != -1)
	{
		var postNumber = parseInt(thisLink.innerHTML.substring(thisLink.innerHTML.search("Post #") + 6));
		
		lastLink = "ScrollPast" + postNumber;
		lastLinkHTML = thisLink.parentNode.innerHTML;
		
		var linkCode = "<a id=\"ScrollPast" + postNumber + "\" href=\"#\"onClick=\"fetch_object('ScrollPast" + (parseInt(postNumber) + 1) + "').scrollIntoView(" + scrollPastCompletely + "); return false;\">Next Post</a>";
		thisLink.parentNode.innerHTML += linkCode;
	}
}

document.getElementById(lastLink).parentNode.innerHTML = lastLinkHTML + "<a id=\"ScrollPast" + postNumber + "\" href=\"#\"onClick=\"fetch_object('qrform').scrollIntoView(" + scrollPastCompletely + "); return false;\">Next Post</a>";
