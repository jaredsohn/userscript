// ==UserScript==
// @name          Gamespot Link Rewriter
// @namespace     
// @description   Rewrites article links to point to print versions.
// @include       http://www.gamespot.com*
// @include       http://gamespot.com*
// ==/UserScript==
//
//     license: GPL: http://www.gnu.org/copyleft/gpl.html
//     copyright (c) 2005, Chris Feldmann
//
//
//     Rewrites article links on gamespot.com to point directly
//     at the print version.
//
//     Modified from Anandtech to Gamespot version.

(function ()
{
	var a, link, href;
	a = document.evaluate(
		'//a[contains(@href, \'\/review.html\')]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var j = 0; j < a.snapshotLength; j++) {
		link = a.snapshotItem(j);
		link.href += "&print=1";
	
	}
})();

