// ==UserScript==
// @name           no target attribute
// @namespace      http://userscripts.org/users/33073/scripts
// @description    removes target attributes and doesn't allow pages to mess up your tabbed browsing
// @include        http://*
// @include        https://*
// ==/UserScript==

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

var links = $x("//a[@target='_blank']");
links.forEach(function(link) {
	link.removeAttribute("target");
});