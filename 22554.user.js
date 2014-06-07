// ==UserScript==
// @name           reddit down vote
// @namespace      reddit
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://*.reddit.com/user/*
// @exclude        http://reddit.com/info/*
// @exclude        http://*.reddit.com/info/*
// ==/UserScript==

window.setTimeout(function() {
	var allElements, thisElement, anchorElements, downElement, upElement;
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
				id = id[0];
				if (anchorElements[k].innerHTML.match(regex))
				{
					downElement = document.getElementById(id.replace(/title_/,'down_'));
					upElement = document.getElementById(id.replace(/title_/,'up_'));
					if (!downElement.className.match(/downmod/) && !upElement.className.match(/upmod/))
					{
						// create/recreate event
						evt = document.createEvent("MouseEvents");
						evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						downElement.dispatchEvent(evt);
					}
				}
			}
		}
	}
}, 10);


function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}