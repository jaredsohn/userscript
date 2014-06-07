// ==UserScript==
// @name           Geocaching.com direct photo links
// @namespace      http://userscripts.org
// @description    This script changes the behaviour of the photo links in the cache page (both in the descrition and logs) to open like regular links, instead of in that annoying window with the white border.
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

var links = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
for (i=0; i<links.snapshotLength; i++)
	links.snapshotItem(i).removeAttribute('rel');
