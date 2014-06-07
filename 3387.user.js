// ==UserScript==
// @name          Del it!
// @include       http://*.digg.com/*
// @include		  http://digg.com/*
// @author		  Honks
// @description   Adds a "Del It!" link to post digg stories to del.icio.us.
// ==/UserScript==

GM_log("running.");

var allNewsSummaries = document.evaluate("//div[@class='news-summary']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < allNewsSummaries.snapshotLength; i++)
{
	
	thisLink = document.evaluate("//h3[@id=\'title" + i + "\']/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (thisLink.snapshotLength)
	{
		thisLinkTitle = thisLink.snapshotItem(0).innerHTML;
		thisLink = thisLink.snapshotItem(0).href;
		delIt = document.createElement('li');
		delIt.setAttribute('class', 'digg-it');
		postTarget = 'http://del.icio.us/post?v=4;url='+encodeURIComponent(thisLink)+';title='+encodeURIComponent(thisLinkTitle);
		delIt.innerHTML = "<a href=\'" + postTarget + "\'>del it</a>";
		thisDiggLink = document.evaluate("//li[@id=\'diglink" + i + "\']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (thisDiggLink.snapshotLength == 1)
		{
			thisDiggLink = thisDiggLink.snapshotItem(0);
			thisDiggLink.parentNode.insertBefore(delIt, thisDiggLink.nextSibling);
		}
	}
}


	