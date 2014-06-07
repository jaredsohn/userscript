// ==UserScript==
// @name		[DS] Ankunftszeit Colorieren
// @namespace		agrafix.net
// @description		Bei Nachtbonus wird Ankunftszeit rot, ansonsten gr�n.
// @include		http://de*.die-staemme.de/game.php?village=*&screen=place&try=confirm*
// ==/UserScript==

// @version 1.0

function main() {
	var content = $gid("date_arrival").innerHTML;
	var hour = content.split(" ")[2].split(":")[0];
	hour *= 1;
	
	if (hour < 8 && hour >= 0) {
		$gid("date_arrival").setAttribute("style", "color:red");
	}
	else {
		$gid("date_arrival").setAttribute("style", "color:green");
	}
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

function $gid(id) {
	var el = document.getElementById(id);

	return el;
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}