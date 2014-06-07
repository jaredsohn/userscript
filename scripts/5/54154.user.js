// ==UserScript==
// @name           BvS Thousand Separator
// @namespace      BvS
// @description    Adds thousand separators to numbers
// @include        http://*animecubed.com/billy/bvs/*
// ==/UserScript==

// "\u00a0" = non-breaking space
const separator = ",";

function separate(txt)
{
	return txt.replace(/((\b\d{1,3})|(\d{3}))(?=(\d{3})+\b)/g, "$&" + separator);
}

function replace()
{
	var parents = ['b', 'i', 'center', 'div', 'font', 'form', 'label', 'li', 'span', 'td'];
	var eval = "//text()[(parent::" + parents.join(" or parent::") + ")]";
	var textnodes = document.evaluate(eval, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var i = 0;
	for (var node = textnodes.snapshotItem(i); node; node = textnodes.snapshotItem(++i))
		node.textContent = separate(node.textContent);
}

window.addEventListener("load", replace, false);
