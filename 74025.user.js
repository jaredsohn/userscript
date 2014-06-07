// ==UserScript==
// @name           Remove Twitter Hovercards
// @namespace      thc
// @description    Removes Twitter Hovercards
// @include        http://twitter.com/*
// @match        http://twitter.com/*
// ==/UserScript==

var names = document.evaluate("//a[contains(@class, 'tweet-url')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var n = null;
for(i = 0; i < names.snapshotLength; i++ ){	
	n = names.snapshotItem(i);
	n.setAttribute("class", n.getAttribute("class").replace("tweet-url",""));
}
