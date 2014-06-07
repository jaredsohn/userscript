// ==UserScript==
// @name           AskMetafilter Best Answer Removal
// @description		Removes any indication of 'best' answers from AskMefi.
// @namespace      http://userscripts.org/users/71401
// @include        http://ask.metafilter.com/*
// @include       http://ask.metafilter.com
// ==/UserScript==

if (document.URL == 'http://ask.metafilter.com/' || document.URL.match('http://ask.metafilter.com/index')) {
	//Find all the best answer ticks, and get rid of them.
	
	var imgElements, urlElements, thisElement;
	imgElements = document.evaluate(
		'//img[attribute::title=\'this question contains answers marked as best\']',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    	null);
     
	for (var i = 0; i < imgElements.snapshotLength; i++) {
		imgElement = imgElements.snapshotItem(i);
		// remove element
		imgElement.parentNode.removeChild(imgElement);
	}
	
} else {
	// We're on an askme question page, so we want to change the class of all 'comments best' comments.
	bestElems = document.evaluate(
		'//div[attribute::class=\'comments best\']',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < bestElems.snapshotLength; i++) {
		bestElement = bestElems.snapshotItem(i);
		// change class
		bestElement.className='comments';
	};
}