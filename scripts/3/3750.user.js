// ==UserScript==
// @name          TrollBGone
// @namespace     http://mykej.homeip.net/userscripts
// @description	  Removes posts by Michael Lind from TPMCafe
// @include       http://tpmcafe.com/
// @include       http://www.tpmcafe.com/
// ==/UserScript==


var allPosts, thisPost, killPost;
allPosts = document.evaluate(

	"//img[@src='http://www.tpmcafe.com/files/images/headshots/lind-headshot.jpg']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allPosts.snapshotLength; i++) {
    thisPost = allPosts.snapshotItem(i);
    killPost=thisPost.parentNode.parentNode.parentNode;
    killPost.parentNode.removeChild(killPost);        
}
