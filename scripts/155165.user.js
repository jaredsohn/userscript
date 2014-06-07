// ==UserScript==
// @name       Google+ community post remover
// @namespace  http://www.slintes.net
// @version    0.4.0
// @description  removes Google+ community posts from home stream
// @include    https://plus.google.com*
// @exclude    https://plus.google.com/_/*
// @exclude    https://plus.google.com/hangouts*
// @exclude    https://plus.google.com/u/0/_/*
// @exclude    https://plus.google.com/b/*
// @exclude    https://plus.google.com/u/*/b/*
// @exclude    https://plus.google.com/u/0/*/posts/*
// @exclude    https://plus.google.com/*/posts/*
// @copyright  2012+, slintes
// ==/UserScript==
function removeCommunityPosts(){
	
    var elements, thisElement, i;
    
    elements = document.evaluate(
		"//div[starts-with(@id, 'update-') and .//a[starts-with(@href, 'communities/') and .//span]]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (i = 0; i < elements.snapshotLength; i++) {
		thisElement = elements.snapshotItem(i);
		//GM_log("removing community post with id='" + thisElement.id + "'.");
		thisElement.parentNode.removeChild(thisElement);
	}
}
document.addEventListener("DOMNodeInserted", removeCommunityPosts, true);