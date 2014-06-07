// ==UserScript==
// @name				DSeditSupportNames
// @author				Heinzel
// @version				1.1.0
// @description 			Merkt sich bei Unterstueztungen die Truppenzahlen und benennt spaeter danach die Befehler um
// @namespace			die-staemme.de
// @include			http://*staemme*/game.php*screen=place*try=confirm*
// ==/UserScript==




function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
}

function getUnits() {
	var unitnames = ['spear','sword','axe','archer','spy','light','marcher','heavy','ram','catapult','knight','snob'];
	var units = [];
	
	for(var x = 0; x < unitnames.length; x++) {
		try {
			var len = document.getElementsByName(unitnames[x])[0].value;
			units.push(len);
		} catch(e){}
	}
	
	return units;
}

function getCurrentCoords() {
	return _evaluate('//b[contains(@class, "nowrap")]')[0].textContent.match(/^\((\d{1,3}\|\d{1,3})\)\s+K\d+$/)[1];
}

(function main() {
	// Script regestrieren
	win = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
	win.ScriptAPI.register('DSeditSupportNames', 7.4, 'Heinzelmänchen', 'Heinzelmänchen@scripter.die-staemme.de');
	
	// Ueberpruefen ob es sich um eine Unterstuetzung handelt
	var kind = escape(document.getElementsByTagName("h2")[0].innerHTML);
	if(kind != "Unterst%FCtzung") {
		return;
	}
	// Die Einheiten die mitgeschickt werden auslesen
	var units = getUnits();
	
	// Die Koords des aktuellen Dorfes ermitteln
	var coords = getCurrentCoords();
		
	// Daten zusammenfassen
	var data = coords + ": " + units.join(" ");
	
	// Daten setzen
	document.getElementById('new_attack_name').value = data;
	document.getElementById('edit_name').style.display = "inline";
	document.getElementById('default_name_span').style.display = "none";
	
	// Daten beim absenden speichern
	_evaluate('//input[@name="submit"]')[0].addEventListener('click', function() {
		document.getElementById('new_attack_name').nextSibling.click();
	}, false);
})();