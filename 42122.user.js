// This is a Greasemonkey script which Super ignores some annoying people on forums for good
// Author: Oneman
//
// ==UserScript==
// @name           Super ignore aotv
// @namespace      A
// @include        http://www.alltomtv.se/*
// ==/UserScript==

var ignoreUsernames = ["knegarn", "Chris Finch", "DrStein79", "Ghandi", "Messalina", "Plumse", "Lewisons_mr_mrs", "Guggen", "Glenny", "Teka",  "Anders-Gusten", "Madicken", "nyBBe", "Miss Bhave", "ladywolf", "sienna", "Lila", "odd molly", "Gaffla", "Aspe", "Taxen", "Beckan", "Jug", "Pingvin", "Skye", "WAR"  ];

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