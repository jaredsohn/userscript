// ==UserScript==
// @name           YouTube Australia redirect
// @namespace      electronsoup.net
// @description    Automatically redirect Youtube.com to Youtube.com.au
// @include        *
// ==/UserScript==

/* SCRIPT DOES NOT WORK

// Go through each link on the page and rewrite links to http://www.youtube.com/* and http://youtube.com/* as proxify.com links

links = document.evaluate('//a[contains(@href,"http://www.youtube.com/")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < links.snapshotLength; i++)
  links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/http:\/\/www.youtube.com/i, "http://www.youtube.com.au");

links = document.evaluate('//a[contains(@href,"http://youtube.com/")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < links.snapshotLength; i++)
  links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/http:\/\/youtube.com/i, "http://www.youtube.com.au");
  
  
// Check whether the page URL contains "youtube.com/". If so, reload the page as a youtube.com.au page.

var regExp = /youtube.com\//i;
if (regExp.test(window.location.href))
	{
		window.location.href = window.location.href.replace(/http:\/\/www.youtube.com/i, "http://www.youtube.com.au");
	}

*/