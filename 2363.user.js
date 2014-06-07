// ==UserScript==
// @name          Blogspot Link Rel
// @namespace     http://loucypher.wordpress.com/
// @include       http://*.blogspot.com/
// @description	  Adds link relationships. Only useful if you have Link Toolbar extension
// ==/UserScript==

(function() {
  function addLink(rel, url, title) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('href', url);
    link.setAttribute('title', title);
    head.appendChild(link);
  }

  try {
    var recentPosts = document.evaluate('//ul[@id="recently"]/li/a',
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for(var i = 0; i < recentPosts.snapshotLength; i++) {
      var recentPost = recentPosts.snapshotItem(i);
      addLink('Bookmarks', recentPost, recentPost.firstChild.nodeValue);
    }

    var archives = document.evaluate('//ul[@class="archive-list"]/li/a',
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for(var j = 0; j < archives.snapshotLength; j++) {
      var archive = archives.snapshotItem(j);
      addLink('Archives', archive, archive.firstChild.nodeValue);
    }

  } catch(e) {
    //dump('Blogspot Link Rel: add ' + location + ' to @exclude list\n');
  }

})();

