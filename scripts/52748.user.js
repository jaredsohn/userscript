// ==UserScript==
// @name		[DS] AttackCounter
// @namespace		agrafix.net
// @description		Zählt wie oft schon ein Angriff auf ein Dorf gestartet wurde.
// @include		http://de*.die-staemme.de/game.php?village=*&screen=place&try=confirm*
// ==/UserScript==

// @version 1.0

function main() {	
	document.getElementsByName("submit")[0].addEventListener('click', function() { 
		var linknode = $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]/a");
		var vilidpattern = /village=(\d+)&.*&id=(\d+)$/;
		var m = vilidpattern.exec(linknode.href);
		var vilid = m[2];
	
		var running = GM_getValue("attacks_" + vilid, 0);
		running++;
		GM_setValue("attacks_" + vilid, running);
	}, false);
	
	var linknode = $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]/a");
	var vilidpattern = /village=(\d+)&.*&id=(\d+)$/;
	var m = vilidpattern.exec(linknode.href);
	var vilid = m[2];
	
	$xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]").innerHTML += "<hr /><b><img src=\"/graphic/buildings/barracks.png\" alt=\"Kaserne\"> <span id='arrived_atts'>" + GM_getValue("attacks_" + vilid, 0) + "</span></b> <a href='#' id='reset_link'>&raquo; Zur&uuml;cksetzten</a>";
	
	$gid("reset_link").addEventListener('click', function() { 
		var linknode = $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]/a");
		var vilidpattern = /village=(\d+)&.*&id=(\d+)$/;
		var m = vilidpattern.exec(linknode.href);
		var vilid = m[2];
	
		GM_setValue("attacks_" + vilid, 0);
		$gid("arrived_atts").innerHTML = "0";
	}, false);
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