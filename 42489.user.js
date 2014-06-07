// This is a Greasemonkey script which Super ignores some annoying people on forums for good
// Author: Oneman
//
// ==UserScript==
// @name           Super ignore fb
// @namespace      A
// @include        https://www.flashback.org/*
// ==/UserScript==

var ignoreUsernames = ["BoISaren", "Carl Hamilton", "hobbesstuga110", "Hamlon", "miapetter", "mirran_h", "Beccasin", "Wolfis", "DarthWader", "watson6669", "LieDetector", "wildone69", "catami", "blomvattnare", "Frubeate", "Zurfarn08", "Rock N Roll", "Cask Strength", "Stormlykta", "LieDetector", "uffe24", "davidoff", "JackassTRE", "xallo", "BallaLina", "PappasPralin", "Kallix", "JaneC", "dansund", "YONI", "nickex35", "MaeWest", "Doktor bajs" ];

//             "Troian", "Tantalora", "Hamilkar"    

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