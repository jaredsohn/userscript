/*
 Bloglines Expand When One Title
 version 1.0
 2005-12-14
 Copyright (c) 2005, Steven Chai (email: gm AT yankovic DOT org )
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 This is a Greasemonkey user script.
 http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name          Bloglines Expand When One Title
// @namespace     http://www.yankovic.org/happy/gmonkey/
// @description   Expands article when there's only one new title
// @include       http://bloglines.com/myblogs_display*
// @include       http://www.bloglines.com/myblogs_display*
// ==/UserScript==

(function() {
	var x = document.evaluate(
		"//div[starts-with(@id,'siteItem.')]", 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
	if (x.snapshotLength == 1)
	{
		var l = document.evaluate(	
			"//descendant::h3/a[starts-with(@href, 'javascript:expandItem')]",
			x.snapshotItem(0), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		);
		if (l.snapshotLength)
			document.location=l.snapshotItem(0).href;
	}
}
)();