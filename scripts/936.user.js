// ==UserScript==
// @name	LibÃÂ©ration Links
// @namespace	http://www.freewebs.com/cymbaloum
// @description	Rewrites Liberation.fr links to ask for the print article version
// ==/UserScript==

(function() {
  var scriptBefore = 'page.php?Article'
  var scriptAfter = 'imprimer.php?Article'
  var xpath = "//a[contains(@href, scriptBefore)]";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;
  for (i = 0; link = res.snapshotItem(i); i++) {
    link.href = link.href.replace(scriptBefore, scriptAfter);
  }
})();

// vim: set ts=2 sw=2 et :

