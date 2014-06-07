// ==UserScript==
// @name          DeBrendanator
// @namespace     http://mykej.homeip.net/userscripts
// @description	  Removes posts by Brendan Nyhan from prospect.org
// @include       http://prospect.org/horsesmouth/
// @include       http://www.prospect.org/horsesmouth/
// ==/UserScript==


var allPosts, thisPost, killPost;
allPosts = document.evaluate(

	"//a[@href='mailto:bnyhan@yahoo.com']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allPosts.snapshotLength; i++) {
    thisPost = allPosts.snapshotItem(i);
    killPost=thisPost.parentNode.parentNode;
    killPost.parentNode.removeChild(killPost);        
}