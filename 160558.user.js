// ==UserScript==
// @name        IBood Hunt Tweaker
// @namespace   http://userscripts.org/users/478178
// @description IBood Hunt Tweaker
// @include     http://www.ibood.com/*
// @version     1
// ==/UserScript==

// siren l
var sirenl = document.evaluate("//*[@class='siren l']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
sirenl.parentNode.removeChild(sirenl);

var sirenr = document.evaluate("//*[@class='siren r']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
sirenr.parentNode.removeChild(sirenr);

setInterval(updateTitle, 500);

function updateTitle()
{
	var items = document.evaluate("//*[@class='box_order_btn sold_out']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var title = "";
	
	if (items.snapshotItem(0) != null)
	{
		title = "sold out!";
	}
	else
	{
		title = document.getElementById("link_product").innerHTML;
	}
	document.title = title;
}