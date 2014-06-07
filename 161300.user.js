// Author: epost72
//
// ==UserScript==
// @name           Flashback Ultimate Ignore
// @namespace      A
// @include        https://www.flashback.org/*
// ==/UserScript==

var ignoreUsernames = ["Schlesien"];

//             "Schlesien", "Schlesien", "Schlesien"    

$x("//a[contains(@class, 'bigusername') and (contains(child::text(), '" + ignoreUsernames.join("') or contains(child::text(), '") + "'))]").forEach(function(e)
{
    e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
});

function $x(expression, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(expression, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}