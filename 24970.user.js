// ==UserScript==
// @name           Login/Logout
// @namespace      userscripts.org
// @include        http://*.amazon.tld/*
// @include        https://*.amazon.tld/*
// ==/UserScript==

var l = $x("//td[@id='navidWelcomeMsg']//a");
var t = l[0].parentNode.parentNode;
GM_addStyle("#gm-am-link {text-decoration: none !important; font-weight:bold;} #gm-am-link:hover {text-decoration: underline !important;}");

t.innerHTML = '<a id="gm-am-link" href="'+ ((t.textContent.indexOf('Not') != -1)?l[1].href + '">Logout':l[0].href + '">Login') + '</a>';

function $x(p) {
  var i, arr = [], xpr = document.evaluate(p, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}