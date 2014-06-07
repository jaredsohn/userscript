// ==UserScript==
// @name           Gamasutra printer-friendly
// @namespace      http://www.gamasutra.com/view
// @description    Always go to the printer-friendly version of an article so you don't have to click through pages.
// ==/UserScript==

// http://wiki.greasespot.net/Code_snippets#XPath_helper
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

var print = $x('//a[contains(@href,"print=1")]');
if (print.length) {
  window.location = print[0].href;
}