// ==UserScript==
// @name           SOFU links in new tab
// @namespace      http://userscripts.org/users/4294
// @description    Makes non-internal SOFU links open in a new tab or window
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// ==/UserScript==

var allLinks, thisLink;

var remoteP = new RegExp("^https?://");

allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	if (remoteP.test(thisLink.getAttribute("href"))) {
		thisLink.target="_blank";
	}
}
