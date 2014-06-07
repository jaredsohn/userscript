// ==UserScript==
// @name           Fark Link Same Window
// @namespace      http://hackmiester.com/
// @description    Makes article links open in same window. Based on Fark Link Redirect Remover (http://Xenolith0.net/)
// @include        http://*.fark.com/
// @include        http://fark.com/*
// @include        http://*.fark.com/*
// @include        http://*.fark.com/
// ==/UserScript==

(function ()
{
	var a, link;
	a = document.evaluate('//a[contains(@href, \'go.pl\')]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var j=0; j<a.snapshotLength; j++)
	{
		link = a.snapshotItem(j);
		link.target = '_self';
	}
})();