// ==UserScript==
// @name          Amazon ExcerptGone
// @namespace     http://www.litzke.com
// @description   Removes excerpts from book search results
// @include       http://*.amazon.*
// ==/UserScript==

//There are two excerpt elements - a random excerpt "excerptStart" and "View a random page," "excerptEnd"
var excerpt = document.evaluate(
    '//td[@class="excerptStart"]', document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var excerpt2 = document.evaluate(
    '//td[@class="excerptEnd"]', document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0;i<excerpt.snapshotLength;i++)
{
	var excerptHold = excerpt.snapshotItem(i);
	excerptHold=excerptHold.parentNode.removeChild(excerptHold);
	var excerptHold2 = excerpt2.snapshotItem(i);
	excerptHold2=excerptHold2.parentNode.removeChild(excerptHold2);
}

