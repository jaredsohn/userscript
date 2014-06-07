// ==UserScript==
// @name	IGN Boards: Post History Fix
// @namespace	http://yabd.org/
// @description	Fixes display of posts in a user's post history
// @version	1.0
// @include	http://boards.ign.com/UserPages/PostHistory.aspx?usr=*
// @include	http://vnboards.ign.com/UserPages/PostHistory.aspx?usr=*
// ==/UserScript==

var posts = document.evaluate('//table[@id="UserPostHistoryTable"]//a[contains(@id, "lnkSubjectLabelSubject")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<posts.snapshotLength; i++) {
	var post = posts.snapshotItem(i);
	if (post.href.match(/\/p1\/\?\d+$/))
		post.parentNode.insertBefore(document.createTextNode('(Topic) '), post);
	else if (post.href.match(/\/r(\d+)\/$/))
		post.parentNode.insertBefore(document.createTextNode('RE: '), post);
}

var alink = document.evaluate('//td[@class="BoardRowB"]/a[@class="AuthorLink"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if (alink.singleNodeValue != null) {
	var loc = document.title.indexOf(' - ');
	var title;
	if (loc >= 0)
		title = document.title.substr(0, loc+3);
	else
		title = "";

	document.title = title + alink.singleNodeValue.textContent + "'s Messages";
}
