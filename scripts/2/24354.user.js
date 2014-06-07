// ==UserScript==
// @name           Twitter Quotably
// @namespace      twitter-quotably
// @description    Adds Quotably links to Twitter
// @include        http://twitter.com/*
// ==/UserScript==

var allLinks, thisLink, matches, user, statusId, href;
allLinks = document.evaluate(
  "//*[contains(@class,'entry-meta')]/a[@href]",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null
);
for (var i = 0; i < allLinks.snapshotLength; i++) {
  thisLink = allLinks.snapshotItem(i);
  if (matches = thisLink.innerHTML.match('in reply to (.*)')) {
    user = matches[1];
    if (matches = thisLink.href.match('/([0-9]+)')) {
      statusId = matches[1];
      href = 'http://quotably.com/' + user + '/statuses/' + statusId;
      thisLink.href = href;
    }
  }
}
