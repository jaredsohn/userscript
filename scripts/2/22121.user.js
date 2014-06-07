// ==UserScript==
// @name          4chanarchive Ad Remover
// @description   Script to remove ad posts on 4chanarchive
// @include       http://4chanarchive.org/brchive/*
// ==/UserScript==

var adPosts = document.evaluate(
	"//td[@class='reply']/span[@id='norep12345678']", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < adPosts.snapshotLength; i++) {
	thisLink = adPosts.snapshotItem(i);
	postTable = thisLink.parentNode.parentNode.parentNode.parentNode;
	if (postTable) {
		postTable.parentNode.removeChild(postTable);
	}
}
