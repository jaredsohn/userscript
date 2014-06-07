// ==UserScript==
// @name          X-Bit Labs Link Rewriter
// @namespace     
// @description   Rewrites article links to point to print versions.
// @include       http://www.xbitlabs.com*
// @include       http://xbitlabs.com*
// ==/UserScript==
//
//     license: GPL: http://www.gnu.org/copyleft/gpl.html
//     copyright (c) 2005, Chris Feldmann
//
//     Modified from Anandtech to X-Bit Labs version
//
//     Rewrites article links on xbitlabs.com to point directly
//     at the print version.

(function ()
{
	var a, link, href;
	a = document.evaluate(
		'//a[contains(@href, \'/display/\')]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var j = 0; j < a.snapshotLength; j++) {
		link = a.snapshotItem(j);
		href = link.href;
		if (href = href.replace(/\/display\//gi, '/print/')){
			link.href = href;
		}
	
	}
	
})();

