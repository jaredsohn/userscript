/*
Updated version of
http://userscripts.org/scripts/show/782
*/

// ==UserScript==
// @name	NYTimes.com Link Rewriter
// @description	Rewrites New York Times links to ask for the printer (ad-free) page
// @include	http://*.nytimes.com/*
// @include	http://*nytimes.com/*
// ==/UserScript==

(function() {
  // var xpath = "//a[starts-with(@href,'http://www.nytimes.com/')]";
  var xpath = "//a[(contains(@href,'.html')) and (not(contains(@href,'index.html')))]";
  
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;
  for (i = 0; link = res.snapshotItem(i); i++) {
    var add;
    if (link.href.search(/\?/) >= 0) {
      add = '&';
    } else {
      add = '?';
    }
    link.href = link.href + add + 'pagewanted=print';
  }
})();

