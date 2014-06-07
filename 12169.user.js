// ==UserScript==
// @name           Zooomr Enhanced Thread Paging
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Adds paging links at the start of the group thread
// @include        http://*.zooomr.com/groups/*/discuss/*
// ==/UserScript==
/* 

History
--------
2007.09.11 - v1.0 First Release
2007.09.14 - v1.1 Moved the second row of pagelinks higher up, just before the Reply textarea.

*/

(function() {

	var divPage, allPosts, firstPost, lastPost;
	
	divPages = document.evaluate(
			'//div[@class="Pages"]'
			, document
			, null
			, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
			, null);
			
	allPosts = document.evaluate(
			'//div[@class="post_message"]'
			, document
			, null
			, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
			, null);
	
	if (allPosts.snapshotLength > 0) {
		firstPost = allPosts.snapshotItem(0);
		lastPost = allPosts.snapshotItem(allPosts.snapshotLength-1);
	}
	
	if (divPages && firstPost) {
		firstPost.appendChild(divPages.snapshotItem(0).cloneNode(true));
	}
	
	if (divPages && lastPost) {
		lastPost.parentNode.appendChild(divPages.snapshotItem(0).cloneNode(true));
		divPages.snapshotItem(0).getElementsByTagName('div')[0].innerHTML = '';
		divPages.snapshotItem(0).getElementsByTagName('div')[1].innerHTML = '';
	}

})()