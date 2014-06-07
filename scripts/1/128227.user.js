// ==UserScript==
// @name           Fix coursera.org subtitles downloads
// @desciption	   Script replaces all links to subtitles on coursera.org site with srt format instead of plain text
// @namespace      http://userscripts.org/users/440524
// @include        https://www.coursera.org/*/lecture/index
// ==/UserScript==

var xpr;
xpr = document.evaluate("//a[contains(@href, 'format=txt')]", document, 
	null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var thisNode;
var ref;
for (var i = 0; i < xpr.snapshotLength; i++)
{
	thisNode = xpr.snapshotItem(i);
	ref = thisNode.href.replace("&format=txt", "");
	thisNode.href = ref;
}

