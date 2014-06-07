// ==UserScript==
// @name        Rllmuk Topic Links View New Post
// @namespace   http://www.jonathanbuchanan.plus.com/repos/greasemonkey/
// @description Alters topic links on topic listing pages to always view the latest post
// @include     http://www.rllmukforum.com/*
// @include     http://rllmukforum.com/*
// ==/UserScript==

/* Changelog
 * ---------
 * 2013-03-25 URL for unread posts changed.
 * 2012-02-02 Updated for IPB 3.2.
 * 2011-05-18 Changed forum URL check so session IDs won't throw it off.
 * 2010-08-02 Updated for IPB3.
 * 2009-10-01 Initial version.
 * -------------------------------------------------------------------------- */

// Don't do anything if we're not on a topic listing page
if (window.location.href.indexOf("module=search") == -1 &&
    window.location.href.indexOf("index.php?/forum") == -1) {
  return
}

var topicLinkXPathQuery = (window.location.href.indexOf("module=search") != -1
                           ? "//a[@title='View result']"
                           : "//a[@class='topic_title']")

var topicLinkNodes =
    document.evaluate(
        topicLinkXPathQuery,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null)
for (var i = 0; i < topicLinkNodes.snapshotLength; i++) {
  var topicLinkNode = topicLinkNodes.snapshotItem(i)
    , href = topicLinkNode.href
    , lastSlash = href.lastIndexOf('/')

  // Strip the trailing page__fromsearch__1 from search result links
  if (lastSlash != href.length - 1) {
    href = href.substring(0, lastSlash + 1)
  }

  topicLinkNode.href = href + '?view=getnewpost'
}
