// ==UserScript==
// @name          Blogspot Link Title
// @namespace     http://loucypher.wordpress.com/
// @include       http://*.blogspot.com/*
// @include       http://blog.godote.com/*
// @description	  Adds post link to title
// ==/UserScript==

(function() {
  var postTitles = document.evaluate('//h3[@class="post-title"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if(!postTitles.snapshotLength) return;

  var postLinks = document.evaluate('//p[@class="post-footer"]/em/a[@title="permanent link"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if(!postLinks.snapshotLength) return;

  for(var i = 0; i < postLinks.snapshotLength; i++) {
    var postTitle = postTitles.snapshotItem(i);
    var postLink = postLinks.snapshotItem(i);
    if(postTitle.firstChild.nodeName != 'A') {
      var linkTitle = document.createElement('a');
      linkTitle.href = postLink;
      linkTitle.appendChild(postTitle.firstChild);
      postTitle.appendChild(linkTitle);
    }
  }
})();

