// ==UserScript==
// @name          Reddit link /r/* 
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  creates links to subreddits in user-text
// @author        rdaunce
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// @run-at document-start
// ==/UserScript==
var count = 0;
var timer = '';


var createLink = function(subreddit)
{
	var link = "<a href=\"http://www.reddit.com" + subreddit + "\">" + subreddit + "</a>";
    return link;
};

var main = function(event)
{	
	if (event != null)
	{
		//don't run code if we don't need to.
		if (event.target.id == null || event.target.id == "search_hidemore")
		{
			return;
		}
	}
	
	var children = document.evaluate(".//text()[not(ancestor::a) and not(ancestor::button) and not(ancestor::label) and not(ancestor::legend) and not(ancestor::option) and not(ancestor::script) and not(ancestor::select) and not(ancestor::style) and not(ancestor::textarea) and not(ancestor::title)]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var child = null;
	var newChild = null;

	//disable listener during changes
	document.removeEventListener ("DOMNodeInserted", domChange, false);

	var regExp = new  RegExp("\\/r\\/[a-zA-Z]*");
	var changed = false;
	var text = null;
	var link = null;
	var preLink = null;

	
   	var index = null;
	var beginSearch = null;

	for (var i = 0; i < children.snapshotLength; i++)
	{

		beginSearch = 0;
		
		child = children.snapshotItem(i);
		nodeValue = child.nodeValue;

		while ((matches = nodeValue.substring(beginSearch).match(regExp)) !== null)
		{
			text = matches[0]
			index = nodeValue.indexOf(text, beginSearch);
			preLink = nodeValue.substring(0, index);
			beginSearch = index + text.length;
			link = createLink(text);
			nodeValue = preLink + link + nodeValue.substring(beginSearch);
			beginSearch = index + link.length;
			changed = true;
		}
		
		//only replace node if something changed
		if (changed == true)
		{
			newChild = document.createElement("span");
			newChild.innerHTML = nodeValue;
			child.parentNode.replaceChild(newChild, child);
		}
	}

	//changes complete, reactivate listener
	document.addEventListener ("DOMNodeInserted", domChange, false);
}

function domChange (event)
{
    if (typeof timer == "number")
    {
        clearTimeout (timer);
        timer = '';
    }
    timer = setTimeout (function() { main (event); }, 100); 
}

main();