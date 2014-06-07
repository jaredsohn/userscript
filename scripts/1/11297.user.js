// ==UserScript==
// @name           LiveJournal Syndication Redirect
// @namespace      http://www.oakcourt.dyndns.org/~andrew/
// @description    Redirects syndicated.livejournal.com posts to their source
// @include        http://syndicated.livejournal.com/*
// ==/UserScript==

var xpathResult = document.evaluate("id('content-wrapper')/div[2]/p/a",document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
var origLocation = xpathResult.iterateNext();

document.location = origLocation.href;
