// ==UserScript==
// @name           Consumer Search Expander
// @namespace      http://userscripts.org/users/674;scripts
// @description    Expands the Consumer Search pages.
// @include        http://www.consumersearch.com/*
// @author         Steven Chai
// ==/UserScript==

document.getElementsByTagName('body')[0].style.width="95%";

var container = document.getElementById('container');
container.style.width = "100%";

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

$x("//td[@class='content']", container).forEach(function(content){ content.style.width="100%";});

var content = document.getElementById('content');
if (content != null) {
	content.style.width="100%";
}