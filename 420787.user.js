// ==UserScript==
// @name           Detik Age Confirmation Bypass
// @namespace      http://*.detik.com
// @description    Bypass Detik.com age verification question
// @include        http://*.detik.com/*
// ==/UserScript==

var links,thisLink;
links = document.evaluate("//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i);

    //thisLink.href = thisLink.href.replace('news','health');
    thisLink.href += '&u18=1';
}