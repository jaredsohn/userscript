// ==UserScript==
// @name	Liberation Links
// @namespace	
// @description	Rewrites Liberation.fr links to ask for the print article version
// Updated on July 2006, 2nd
// ==/UserScript==

(function() {
  var scriptBefore = 'FR.php'
  var scriptAfter = 'FR.php?mode=PRINTERFRIENDLY'
  var xpath = "//a[contains(@href, scriptBefore)]";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;
  for (i = 0; link = res.snapshotItem(i); i++) {
    link.href = link.href.replace(scriptBefore, scriptAfter);
  }
})();

// vim: set ts=2 sw=2 et :


