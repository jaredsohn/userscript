// ==UserScript==
// @name		Something Awful Page Stripper
// @namespace	Zorilla (with credit to Alexander Redington for original "AdBot Blocker" script)
// @description	Removes ads, purchase links, and "Post" buttons (only in thread views) from the Something Awful Forums
// @include	http://forums.somethingawful.com/*
// ==/UserScript==

function xpathQuery(inputElements) {
	
	return document.evaluate(
		inputElements,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	
}

// Remove ads
var elementsToRemove = xpathQuery('//div[@id="globalmenu"] | //ul[@id="nav_purchase"] | //form[@name="bookmarks"]/div[1] | //span[@id="bookmark_edit_attach"] | //div[@class="oma_pal"] | //center[descendant::div[@id="ad_banner_user"]]');
for (var i = 0; i < elementsToRemove.snapshotLength; i++) {
	var currentElement = elementsToRemove.snapshotItem(i);
	currentElement.parentNode.removeChild(currentElement);
}

// The following will only run when reading threads
if (location.pathname == '/showthread.php') {

	// Hide "Post" buttons from thread displays - they will be kept in code because SA Last Read needs at least one to add Quick Quote/Reply buttons
	var postButtons = xpathQuery('//ul[@class="postbuttons"]/li[descendant::img[@alt="Post"]]');
	for (var i = 0; i < postButtons.snapshotLength; i++) {
		var postButtonCurrent = postButtons.snapshotItem(i);
		postButtonCurrent.style.display = 'none';
	}
	
	// Fix bottom bar padding
	var threadBarBottom = xpathQuery('//div[@class="threadbar bottom"]').snapshotItem(0);
	threadBarBottom.style.paddingBottom = '3px';
	
	// Add click event to "Reply" and "Quote" buttons when viewing a thread and not on the final page
	var nextLink = xpathQuery('//a[@class="pagenumber" and @title="next page »"]').snapshotItem(0);
	var replyLinks = xpathQuery('//ul[@class="postbuttons"]/li[descendant::img[@alt="Reply" or @alt="Quote"]]');
	if (nextLink) {
		for (var i = 0; i < replyLinks.snapshotLength; i++) {
			var replyLinkCurrent = replyLinks.snapshotItem(i);
			replyLinkCurrent.addEventListener('click', function() {
				alert('Note: there are additional pages in this thread');
			}, false);
		}
	}
	
}