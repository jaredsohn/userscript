// ==UserScript==
// @name		Something Awful - goons.jpeg Shitty Post Remover
// @namespace	Zorilla
// @description	Makes the goons.jpeg thread in HD2K readable. This script looks like McLovin.
// @include	http://forums.somethingawful.com/*
// ==/UserScript==

// get threadid value from querystring
var queryString = document.location.search.substring(1).split("&");
for (var i in queryString) {
	var queryStringPair = queryString[i].split("=");
	if (queryStringPair[0] == "threadid") {
		var threadID = queryStringPair[1];
	}
}

// run only for current goons.jpeg or original goons.jpg thread
if (threadID == "2764921" || threadID == "2458658") {
	var nonImagePosts = document.evaluate('//table[count(descendant::td[@class="postbody"]/img[@class="img"])=0]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i = 0; i < nonImagePosts.snapshotLength; i++) {
		var currentElement = nonImagePosts.snapshotItem(i);
		currentElement.parentNode.removeChild(currentElement);
	}
}