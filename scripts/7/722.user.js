// GAM Google Redirector, 1.0, 2005-03-19, Jeremy Wiebe

// ==UserScript==
// @name	GAM Google Redirector
// @namespace	http://home.cc.umanitoba.ca/~umwieb43/greasemonkey/
// @description	Rewrites Globe and Mail links to go through Google's redirect for certain benefits. 
// @include	http://www.theglobeandmail.com/*
// @include	http://www.bloglines.com/*
// ==/UserScript==

(function() {
	var xpath, elem, i, res;
	if (document.location.href.match(/^http:\/\/www\.theglobeandmail\.com/i))
		xpath = "//a[starts-with(@href, '/servlet')]|//a[starts-with(@href, 'http://www.theglobeandmail.com/servlet/')]";
	else
		xpath = "//a[starts-with(@href, 'http://www.theglobeandmail.com/servlet/')]";
	res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 						
	for (elem = null, i = 0; (elem = res.snapshotItem(i)); i++) {
		elem.href = 'http://www.google.com/url?sa=D&q=' + elem.href;
	}			
})();
