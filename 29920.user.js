// ==UserScript==
// @name           Slashdot No Float
// @namespace      http://userscripts.org/
// @description         Removes floating "comment totals" box from the left side of Slashdot.
// @include        http://slashdot.org/*
// @include        http://*.slashdot.org/*
// ==/UserScript==

var div = document.evaluate(
	"//div[contains(@id,'gods')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
if(div.snapshotLength > 0)
	div.snapshotItem(0).parentNode.removeChild(div.snapshotItem(0));
