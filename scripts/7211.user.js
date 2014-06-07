// version 1.0
// Copyright (c) 2007, Curtis Gibby. http://www.curtisgibby.com
// ==UserScript==
// @name           Furl Forward
// @namespace      http://www.curtisgibby.com/index/greasemonkey/
// @description    Forwards you to target page from furl.net RSS feed
// @include        http://www.furl.net/item.jsp?id=*

// ==/UserScript==
var allSpans, targetSpan;
allSpans = document.evaluate(
    "//span[@class='itemLink']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    targetSpan = allSpans.snapshotItem(0);
	window.location = targetSpan.getElementsByTagName('a')[0].href;