// ==UserScript==
// @name		[DS] Gescheite Aktenlinks
// @namespace		agrafix.net
// @description		PROTEST GEGEN INNOGAMES - GEGEN TWSTATS - FÜR TWPLUS
// @include		http://de*.die-staemme.de/game.php*screen=info_player*
// @include		http://de*.die-staemme.de/game.php*screen=info_ally*
// ==/UserScript==


// @version 1.0

function main() {
	if (document.URL.match("screen=info_player")) {
		//var a_element = $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[9]/td/a");
		var mode = "player";
	}
	else {
		//var a_element = $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[10]/td/a");
		var mode = "ally";
	}
	
	var aNodes = document.getElementsByTagName("a");
	
	for (var i = 0; i < aNodes.length; i++) {
		if (aNodes[i].innerHTML.match("Spielerakte") || aNodes[i].innerHTML.match("Stammesakte")) {
			var a_element = aNodes[i];
			break;
		}
	}
	
	var expr = /de([0-9]*)\/index.*id=([0-9]*)/
	expr.exec(a_element.href);
	var world = RegExp.$1;
	var id = RegExp.$2;
	
	var link = "http://dsreal.de/index.php?tool=akte&mode=" + mode + "&world=de" + world + "&id=" + id;
	
	a_element.href = link;
	a_element.innerHTML += " (Protest ~ F&uuml;r TWPlus)";
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
