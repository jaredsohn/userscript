// ==UserScript==
// @name			[DS] AttackCounter
// @namespace		agrafix.net
// @description		Zählt wie oft schon ein Angriff auf ein Dorf gestartet wurde.
// @include			http://de*.die-staemme.de/game.php?village=*&screen=place&try=confirm*
// ==/UserScript==

// @version 2

function main() {	
	document.getElementsByName("submit")[0].addEventListener('click', function() { 
		var linknode = $xpath("/html/body/table/tbody/tr[2]/td[2]/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]/a");
		var vilidpattern = /village=(\d+)&.*&id=(\d+)$/;
		var m = vilidpattern.exec(linknode.href);
		var vilid = m[2];
		
		if (isAttack()) {
			var running = GM_getValue("attacks_" + vilid, 0);
			running++;
			GM_setValue("attacks_" + vilid, running);
		}
		else {
			var running = GM_getValue("defs_" + vilid, 0);
			running++;
			GM_setValue("defs_" + vilid, running);
		}
	}, false);
	
	var linknode = $xpath("/html/body/table/tbody/tr[2]/td[2]/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]/a");
	var vilidpattern = /village=(\d+)&.*&id=(\d+)$/;
	var m = vilidpattern.exec(linknode.href);
	var vilid = m[2];
	
	$xpath("/html/body/table/tbody/tr[2]/td[2]/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]").innerHTML += "<hr /><b><img src=\"/graphic/unit/unit_axe.png\" alt=\"Attacks\"> <span id='arrived_atts'>" + GM_getValue("attacks_" + vilid, 0) + "</span> <img src=\"/graphic/unit/unit_sword.png\" alt=\"Defenses\"> <span id='arrived_defs'>" + GM_getValue("defs_" + vilid, 0) + "</span></b> <a href='#' id='reset_link'>&raquo; Zur&uuml;cksetzen</a>";
	
	$gid("reset_link").addEventListener('click', function() { 
		var linknode = $xpath("/html/body/table/tbody/tr[2]/td[2]/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]/a");
		var vilidpattern = /village=(\d+)&.*&id=(\d+)$/;
		var m = vilidpattern.exec(linknode.href);
		var vilid = m[2];
	
		GM_setValue("attacks_" + vilid, 0);
		GM_setValue("defs_" + vilid, 0);
		$gid("arrived_atts").innerHTML = "0";
		$gid("arrived_defs").innerHTML = "0";
	}, false);
}

main();


/*
 * The function library
 * 
 */
function isAttack() {
	var el = document.getElementsByTagName("h2")[0];
	
	if (el.innerHTML == "Angriff") {
		return true;
	}
	
	return false;
}
 
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
