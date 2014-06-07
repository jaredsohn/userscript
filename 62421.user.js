// ==UserScript==
// @name           HackerNews Twitter
// @namespace      http://www.sandaru1.com/
// @description    Add a tweet this link to hacker news topics
// @include        http://news.ycombinator.com/*
// ==/UserScript==

//
// (C) Sandaruwan Gunathilake 2009 http://www.sandaru1.com/
//

var topics;
topics = document.evaluate(
    "//td[@class='title']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var i=0;i<topics.snapshotLength;i++) {
  var topic = topics.snapshotItem(i);
  if (topic.align=="right") continue;
  var link = document.evaluate("./a",topic,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  var tweet_link = document.createElement('a');
  tweet_link.href = "http://twitter.com/?status="+escape(link.innerHTML+" "+link.href);
  tweet_link.innerHTML = '<img border="0" width="12" height="12" src="http://twitter-badges.s3.amazonaws.com/t_mini-a.png" alt="Tweet This!"/>';
  topic.appendChild(tweet_link);
}
