// ==UserScript==
// @name          UTD Event No Popup
// @namespace     http://dunck.us/code/greasemonkey
// @description	  Stops UTD Event page from popping up new window for event description.
// @include       http://utdallas.edu/calendar/*
// @include       http://*.utdallas.edu/calendar/*
// @include       https://utdallas.edu/calendar/*
// @include       https://*.utdallas.edu/calendar/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[starts-with(@href, "javascript:")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    //change this: "javascript:newWindow('event.php?id=1123612903');"
    //into this: "event.php?id=1123612903"
    thisLink.href = thisLink.href.replace(/^.*?'([^']+)'.*$/, '$1');
}