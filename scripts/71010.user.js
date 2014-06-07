// ==UserScript==
// @name           Reddit comment links open in new window
// @namespace      gravity's scripts
// @description    For reddit comments, all links open in new window.  
// @include        http://www.reddit.com/r/*/comments*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//div[@class="entry unvoted"]//a | //div[@class="entry likes"]//a | //div[@class="entry dislikes"]//a',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if (thisLink.text != "edit" && thisLink.text != "reply" && thisLink.text != "parent") {
		thisLink.target = "blank";
    }
}
