// ==UserScript==
// @name           Bookmark HN Links
// @namespace      http://vijaydev.wordpress.com
// @description    To add bookmark links near each HN item
// @include        http://news.ycombinator.com/
// @include        http://news.ycombinator.com/item*
// @include        http://news.ycombinator.com/saved*
// @include        http://news.ycombinator.com/newest
// @include        http://news.ycombinator.com/best
// @include        http://news.ycombinator.com/active
// @include        http://news.ycombinator.com/noobs
// ==/UserScript==

// get all title links
var hnlinks = document.evaluate("//td[@class='title']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < hnlinks.snapshotLength; i++) 
{
	var T = hnlinks.snapshotItem(i);
	var A = T.getElementsByTagName("a"); // get the td with the link in it
	if(A == undefined || A.length == 0)
		continue;
	var title = A[0].innerHTML.replace(/'/g,'');
	var bmlink = "javascript:window.sidebar.addPanel(\"" + title + "\", \"" + A[0].href + "\", \"\")";
	// create the bookmark link and add it as part of the meta information about the link	
	var metaRecord = T.parentNode.nextSibling.getElementsByTagName("td")[1];
	metaRecord.innerHTML += " | <a href = '" + bmlink + "'>Bookmark</a> ";	
}