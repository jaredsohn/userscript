// ==UserScript==
// @name				DSDropDownGroupList
// @namespace			http://userscripts.org
// @author				Heinzel
// @description			Dieses Script aendert lediglich in den Uebersichten die Links zur Gruppenauswahl in ein einziges DropDown-Auswahlfeld, in dem man jetzt die Gruppe waehlen kann.
// @include			http://*.die-staemme.de/game.php*screen=overview_villages*
// ==/UserScript==



// Version: 1.1.0
// Changelog
// 1.0.0	- 1. Veroeffentlichung
// 1.1.0	- Anpassung an DS-6.0
//		- aktuelle Gruppe wird nun standardmaessig ausgewaehlt


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

function getGroups(cell) {
	var groups = new Array();
	
	// aktuelle Gruppe einfuegen
	var name = cell.getElementsByTagName("strong")[0].textContent.replace(/\>|\<|^\s+|\s+$/g, "");
	var id = false;
	groups.push(name + ":" + id);
	
	// alle weiteren Gruppen einfuegen
	var links = cell.getElementsByTagName("a");
	for(var x = 0; x < links.length; x++) {
		var name = links[x].textContent.replace(/\[|\]|^\s+|\s+$/g, "");
		var id = links[x].href.match(/[&?]group=(\d+)($|\&)/)[1];
		groups.push(name + ":" + id);
	}
	
	return groups;
}

function createDropDown(cell, groups) {
	// Die Gruppenlinks loeschen 
	cell.innerHTML = "";
	
	// Das Auswahlmenue erstellen
	var dropdown = document.createElement("select");
	dropdown.id = "dropdown";
	dropdown.addEventListener('change', selectGroup, false);
	cell.appendChild(dropdown);
	
	// Die einzelnen Auswahlfelder erstellen
	for(var x = 0; x < groups.length; x++) {
		var field = document.createElement("option");
		field.innerHTML = groups[x].split(":")[0];
		field.value = groups[x].split(":")[1];
		dropdown.appendChild(field);
		
		// die aktuelle Gruppe als Auswahl eintragen
		if(groups[x].split(":")[1] === false) {
			field.selected = true;
		}
	}
}

function selectGroup() {
	var id = this.value;
	location.href = location.href + "&group=" + id;
}

(function main() {
	var cell = _evaluate('//strong[contains(., "<")]/parent::td')[0];
	var groups = getGroups(cell);
	createDropDown(cell, groups);
})();