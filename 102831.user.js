// ==UserScript==
// @name           TC home
// @namespace      TC
// @author	   Alumoi
// @description    replace the 'new' home page with the old one
// @include        http://ww*.torncity.com/*
// @include        http://torncity.com/*
// @include        http://www.torn.com/*
// @include        http://ww*.torn.com/*
// @include        http://torn.com/*

// ==/UserScript==

var links,thisLink;
links = document.evaluate("//a[contains(@href, '/index.php')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i);
    thisLink.href = '/home.php';
}
