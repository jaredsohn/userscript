// ==UserScript==
// @name          DP Forums - Show all unread instead!
// @description   Change 'Show unread posts since last visit.' to 'Show all unread posts.'
// @include       http://dplogin.com/forums/*
// ==/UserScript==
var allLinks, thisLink;
allLinks = document.evaluate(
    "//a[@href='http://dplogin.com/forums/index.php?action=unread']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink
    thisLink.href += ';all;start=0';
    thisLink.innerHTML = 'Show all unread posts.';
} 
