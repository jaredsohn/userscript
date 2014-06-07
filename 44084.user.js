// ==UserScript==
// @name           Wurzelimperium - Automatisch Anmelden
// @namespace      Woems
// @include        http://wurzelimperium.de/logout.php
// ==/UserScript==

function $(id) {
  return document.getElementById(id);
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

window.setTimeout(function (){
  $('submitlogin').click();
}, 2000);