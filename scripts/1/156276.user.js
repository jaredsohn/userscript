// ==UserScript==
// @id             youtube.com-b9859685-d4ee-40ed-8f41-bbfb3a347ac8@n/a
// @name           YouTube: Subs/Uploads DIRECT link
// @version        1.0
// @namespace      n/a
// @author         nanquan
// @description    Direct link to subs/uploads
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @run-at         document-end
// ==/UserScript==

var links,thisLink;
links = document.evaluate("//a[contains(@href, '/feed/subscriptions')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i);
    thisLink.href = '/feed/subscriptions/u';
}
