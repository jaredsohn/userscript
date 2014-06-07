// ==UserScript==
// @name           msdn-cleanup_vimperator_scroll
// @description    Allow vimperator hjkl scrolling to work, replaces whole page with just the main content
// @include        http://msdn.microsoft.com/en-us/library/*
// ==/UserScript==

var item_to_replace  = $x("//body")[0];
var replace_with     = $x("//div[@class='topic']")[0];

if (item_to_replace && replace_with) {
	item_to_replace.parentNode.replaceChild(replace_with, item_to_replace);
}

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

