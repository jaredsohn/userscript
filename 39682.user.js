// ==UserScript==
// @name           Slashdot - Tags Remover
// @namespace      http://userscripts.org/users/76771
// @description    Remove the horribly obtrusive "tags" feature shown below story summaries.
// @include        http://slashdot.org/*
// @include        http://*.slashdot.org/*
// @version        1.0
// @copyright      2009 by Marchingwest
// @author         Marchingwest <marchingwest@yahoo.com>
// @license        GPL v3
// ==/UserScript==

var divtags;

divtags = document.evaluate( "//div[@class]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < divtags.snapshotLength; i++) {
	thisdiv = divtags.snapshotItem(i);
	if (thisdiv.className.indexOf('tag-widget') >= 0)
		thisdiv.parentNode.removeChild(thisdiv);
}