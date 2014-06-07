// ==UserScript==
// @name		Osnews Link Rewriter
// @namespace	http://www.stormchasers.dk/~gorth
// @description	Rewrites article links to include all comments
// @include	http://www.osnews.com*
// ==/UserScript==

(function ()
{
	var a, link, href;
	var all_link = '&limit=no&threshold=-1'; 
	var threshold = /offset|rows/gi;
	a = document.evaluate(
		'//a[contains(@href, \'comment.php\')]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var j = 0; j < a.snapshotLength; j++) {
		link = a.snapshotItem(j);
		//alert('link before: ' + link.href);
		if (!link.href.match(threshold)) {
			link.href = link.href + all_link;
		}
		//alert('link after: ' + link.href);
	}
}
)();