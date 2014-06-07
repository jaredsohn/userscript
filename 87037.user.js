// ==UserScript==
// @name           ProxSci
// @namespace      electronsoup.net
// @description    Automatically view PopSci links through a proxy to prevent redirects to popsci.com.au
// @include        *
// ==/UserScript==

// Go through each link on the page and rewrite links to http://www.popsci.* and http://popsci.* as proxify.com links

links = document.evaluate('//a[contains(@href,"http://www.popsci")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < links.snapshotLength; i++)
  links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/http:\/\/www.popsci/i, "https://proxify.com/u?http://www.popsci");

links = document.evaluate('//a[contains(@href,"http://popsci")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < links.snapshotLength; i++)
  links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/http:\/\/www.popsci/i, "https://proxify.com/u?http://www.popsci");
  
  
// Check whether the page URL contains "popsci.com.au". If so, reload the page as a proxify.com page.

var regExp = /popsci.com.au/i;
if (regExp.test(window.location.href))
	{
		window.location.href = window.location.href.replace(/http:\/\/www.popsci.com.au/i, "https://proxify.com/u?http://www.popsci.com");
	}