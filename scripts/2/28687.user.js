// ==UserScript==
// @name           no habracast
// @namespace      http://userscripts.org/users/41062
// @description    cut out all this shithead habracasts
// @include        http://*habrahabr.ru/*
// ==/UserScript==

function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

$x("//h1[contains(@class,'blog_headline')]/img[contains(@src, 'podcast_icon.gif')]").forEach(function(img) {
	var entry = img.parentNode.parentNode.parentNode;
	entry.parentNode.removeChild(entry);		
});