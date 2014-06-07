// ==UserScript==
// @name           Fark Link Redirect Remover
// @namespace      http://Xenolith0.net/
// @description    Links directly to fark article
// @include        http://*.fark.com/
// @include        http://fark.com/*
// ==/UserScript==
(function ()
{
	a = document.evaluate('//a[contains(@href, \'goto\')]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var j=0; j<a.snapshotLength; j++)
	{
		link = a.snapshotItem(j);
		link.href = unescape(link.href.replace(/http:\/\/(www\.)?fark\.com\/goto\/([0-9]+)\//gi, ''));
	}
})();
