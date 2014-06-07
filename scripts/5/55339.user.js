// ==UserScript==
// @name		[DS] Katapultziel / Wall
// @namespace		agrafix.net
// @description		W�hlt automatisch Platz als Katapultziel
// @include		http://de*.die-staemme.de/game.php?village=*&screen=place&try=confirm*
// ==/UserScript==

// @version 1.0

function main() {
	document.getElementsByName("building")[0].value = "wall";
}

main();


/*
 * The function library
 * 
 */
function $xpath(xpath) {
	var xf = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var node = xf.singleNodeValue;

	return node;
}

function $gid(el) {
	var el = document.getElementById(id);

	return el;
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}

