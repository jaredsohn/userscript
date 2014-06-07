// ==UserScript==
// @name           Kaskus.us forum open all spoilers
// @namespace      open_all_spoilers
// @description    Opens all spoilers in kaskus forum
// @include        http://*.kaskus.co.id*
// @author         Yohanes Nugroho
// ==/UserScript==

(function()
{
	function $x(path, root) {
		if (!root) root = document;
		var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
		return arr;
	}

	var a=$x("/descendant::div[child::b[contains(child::text(), \"Spoiler\")]]");

		a.forEach(function(xpitem) {
		var i = $x("input", xpitem)[0];
		i.click();
	});

}
)();