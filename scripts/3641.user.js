/*

Ma.gnolia link fixer

Copyright (c) 2006 Niklas Malmgren

*/

// ==UserScript==
// @name        Ma.gnolia link fixer
// @description Makes links point directly to the bookmarked page, i.e. not through the Ma.gnolia dispatcher
// @version     1.0
// @include     http://ma.gnolia.com/*
// ==/UserScript==

function fix_magnolia_links()
{
	var dispatch_links = document.evaluate("//a[contains(@href,'/dispatch')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for(var i = 0; i < dispatch_links.snapshotLength; i++)
	{
		var this_link = dispatch_links.snapshotItem(i);

		if(found = this_link.getAttribute("title").match("Visit (.*)"))
		{
			this_link.setAttribute("href", found[1]);
			this_link.setAttribute("title", "Fixed by UserScript");
		}
	}
}

fix_magnolia_links();