// ==UserScript==
// @name	LeMonde Links
// @namespace	http://www.freewebs.com/cymbaloum
// @description	Rewrites LeMonde links to ask for the print article version
// ==/UserScript==

(function() {
  var scriptBefore = 'article/0,1-0'
  var scriptAfter = 'imprimer_element/0,40-0'
  var article = ',36'
  var printed = ',50'
  var xpath = "//a[contains(@href, scriptBefore)]";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;

//  also tried to convert "depeches" into printed version but no luck so far...
//  var scriptBefore2 = 'depeches/'
//  var scriptAfter2 = 'depeches/texte/'
//  var xpath2 = "//a[contains(@href, scriptBefore2)]";
//  var res2 = document.evaluate(xpath2, document, null,
//                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//  var i2, link;
  for (i = 0; link = res.snapshotItem(i); i++) {
    link.href = link.href.replace(scriptBefore, scriptAfter);
    link.href = link.href.replace(article, printed);
  }

//  for (i2 = 0; link = res2.snapshotItem(i); i++) {
//    link.href = link.href.replace(scriptBefore2, scriptAfter2);
//  }
})();

// vim: set ts=2 sw=2 et :

