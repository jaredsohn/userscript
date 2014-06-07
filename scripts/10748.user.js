// ==UserScript==
// @name           Just Leave WOTC
// @namespace      alir.com
// @description    Kill the Now Leaving Screen for WOTC websites.
// @include        http://www.wizards.com/*
// ==/UserScript==

var re = new RegExp('url=([^&]*)','i');

var allLinks = document.evaluate('.//a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allLinks.snapshotLength; i++)
{
	var thisLink = allLinks.snapshotItem(i);
	if(thisLink.href.match(re))
	{
		var temp = re.exec(thisLink.href);
		thisLink.href = temp[1];
	}
}