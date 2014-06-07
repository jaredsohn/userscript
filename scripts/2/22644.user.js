// ==UserScript==
// @name           Reddit Hide Articles
// @namespace      reddit
// @description    Hide specific articles
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://*.reddit.com/user/*
// @exclude        http://reddit.com/info/*
// @exclude        http://*.reddit.com/info/*
// ==/UserScript==

var allElements, thisElement, anchorElements, hideElement;
var evt;
var regex = /(upvote|vote\sup|voteup|vote\sthis\sup|vote\sthis\sdown|downvote|down\svote)/i;
divElements = xpath("//div[@class='titlerow']");
for (var i = 0; i < divElements.snapshotLength; i++) 
{
	anchorElements = divElements.snapshotItem(i).getElementsByTagName('a');
	for (var k=0; k < anchorElements.length; k++)
	{
		var id = anchorElements[k].id.match(/title_.*/);
		if (id)
		{
			id = id[0].replace(/title_/,'');
			if (anchorElements[k].innerHTML.match(regex))
			{
				hideElement = document.getElementById('hide_'+id+'_a');
				// create/recreate event
				if (hideElement)
				{
					evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, 

false, false, 0, null);
					hideElement.dispatchEvent(evt);
					document.getElementById('pre_'+id).style.display = "none";
					document.getElementById('thingrow_'+id).style.display = "none";
				}
			}
		}
	}
}



function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}