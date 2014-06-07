// ==UserScript==
// @name Nofollow script
// @namespace http://poradnik-webmastera.com/projekty/nofollow_script/
// @description This script highlighsts in red all nofollow links. It checks both meta robots tag and rel attribute.
// @include *
// @author Daniel Fruzynski
// @version 0.0.1
// ==/UserScript==

var allElements, thisElement;
// Check for <meta name="robots" contents="nofollow"> tag
var globalNofollow = false;
allElements = document.evaluate(
	'//meta[@name]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allElements.snapshotLength; i++)
{
	thisElement = allElements.snapshotItem(i);
	if ((thisElement.name.toLowerCase() == 'robots') && thisElement.content)
	{
		if (thisElement.content.toLowerCase().match('nofollow'))
		{
			globalNofollow = true;
			break;
		}
	}
}

// Check for rel="nofollow" attribute
allElements = document.evaluate(
	'//a',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allElements.snapshotLength; i++)
{
	thisElement = allElements.snapshotItem(i);
	var localNofollow = false;
	var msg = '';
	if (thisElement.rel)
	{
		var rel =  thisElement.rel.toLowerCase();
		if (rel.match('nofollow'))
		{
			localNofollow = true;
			msg = rel;
		}
	}
	if (globalNofollow || localNofollow)
	{
		if (globalNofollow)
		{
			if (localNofollow)
				msg = 'meta nofollow + ' + msg;
			else
				msg = 'meta nofollow';
		}
		
		
		if (thisElement['title'] != '')
			thisElement.title = '[' + msg + '] ' + thisElement.title;
		else
			thisElement.title = '[' + msg + ']';
		thisElement.style.backgroundColor = "#FFBBBB";
	}
}
