// ==UserScript==
// @name	Economist Links
// @namespace	http://matt.mohebbi.com/software/greasemonkey
// @description	Rewrites Economist links to ask for the printer (ad-free) page
// @include	http://www.economist.com/*
// ==/UserScript==

(function() {
  var scriptBefore = 'displaystory.cfm'
  var scriptAfter = 'PrinterFriendly.cfm'
  var xpath = "//a[contains(@href, scriptBefore)]";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;
  for (i = 0; link = res.snapshotItem(i); i++) {
    link.href = link.href.replace(scriptBefore, scriptAfter);
  }
})();

// vim: set ts=2 sw=2 et :

