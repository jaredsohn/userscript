// ==UserScript==
// @name               Drudge Report Links in Tabs
// @namespace
// @description        Changes links on www.drudgereport.com to open in new tabs
// @include            http://*.drudgereport.com/*
// @include            http://drudgereport.com/*
// ==/UserScript==

(function()
{
    var allLinks, thisLink;
    allLinks = document.evaluate(
        '//a[@href]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
        thisLink = allLinks.snapshotItem(i);
        thisLink.target='_blank';
    }
    
})();