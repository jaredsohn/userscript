// ==UserScript==
// @name	New York Times single page format
// @namespace	http://www.bodosom.net/greasemonkey/
// @description	Rewrites New York Times links to ask for single page format; derived from neugierig.org version
// @include	*nytimes.com*
// ==/UserScript==

(function() {
  var xpath = "//a[contains(@href,'.html')]";
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
    link.href = link.href + add + 'pagewanted=all';
  }
})();
