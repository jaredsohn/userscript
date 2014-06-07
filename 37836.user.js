// ==UserScript==
// @name           theinquirer.net
// @description    Remove ads and other non-content, greatly simplified
// @include        http://www.theinquirer.net/*
// ==/UserScript==

var item_to_replace  = $x("//div[@class='section']")[0];
var replace_with     = $x("//div[@id='story']")[0];

var stuff_to_remove = [
	"//div[@class='pagetools']",
	"//div[@id='comments']",
	"//p[@class='byline']",
];


function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

item_to_replace.parentNode.replaceChild(replace_with, item_to_replace);

stuff_to_remove.forEach(
	function(xpath) {
		$x(xpath).forEach(
			function(item) {
				item.parentNode.removeChild(item);
			}
		);
	}
);

