// ==UserScript==
// @name          Remove Fairfax autoplay video links
// @namespace     electronsoup.net
// @description   Fairfax makes news videos autoplay after five seconds. This script does two things: alters all in-page links to remove "autostart=1", and detects if you visit a page with "autostart=1", reloading it without the video enabled.
// @include       *smh.com.au/*
// @include       *theage.com.au/*
// @include       *brisbanetimes.com.au/*
// ==/UserScript==


// Go through each link on the page and strip out "autostart=1" from any URLs containing it.

links = document.evaluate('//a[contains(@href,"autostart")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < links.snapshotLength; i++)
  links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/autostart=1/i, "");

// Check whether the page URL contains "autostart". If so, strip out the term and reload the page without it.

var regExp = /autostart=1/i;
if (regExp.test(window.location.href))
	{
		window.location.href = window.location.href.replace(/autostart=1/i, "");
	}
