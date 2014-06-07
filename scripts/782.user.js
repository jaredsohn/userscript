// ==UserScript==
// @name	NYT Links
// @namespace	http://neugierig.org/software/greasemonkey
// @description	Rewrites New York Times links to ask for the printer (ad-free) page
// @include	*
// ==/UserScript==

(function() {
  var xpath = "//a[starts-with(@href,'http://www.nytimes.com/')]";
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

// vim: set ts=2 sw=2 et :
