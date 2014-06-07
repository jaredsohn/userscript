// ==UserScript==
// @name           No Related Searches
// @namespace      x
// @description    Remove Related Searches in Bloglines
// @include        http://www.bloglines.com/myblogs_display*
// ==/UserScript==

var xpath = "//div[@class='item']/div/table//tr/td[2]";
var tds = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i=0, td=null; td=tds.snapshotItem(i); i++) {
	td.parentNode.removeChild(td);
}
