// ==UserScript==
// @name		ds_vxycopy.user.js
// @namespace      agrafix
// @description    dorfdetails ~> xxx|yyy ~> [village]xxx|yyy[/village]
// @include       http://de*.die-staemme.de/game.php?village=*&screen=info_village&id=*
// ==/UserScript==

function coords_to_copy() {
	var node = $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]");
	node.innerHTML += "<br /><i>[village]" + node.innerHTML + "[/village]</i>";
}

coords_to_copy();

function $xpath(xpath) {
	var xf = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var node = xf.singleNodeValue;//.textContent
	
	return node;
}