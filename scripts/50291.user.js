// ==UserScript==
// @name				DStransferSurvingUnitsInSim
// @author				Heinzel
// @namespace			http://userscripts.org
// @description			Im Simulator wird die JS-Anweisung "Ueberlebende Truppen des Verteidigers einfuegen" durch einen direkten Links ersetzt, damit die Werte der Ueberlebenden Truppen auch nach einem Dorfwechsel noch eingetragen bleiben
// @include			http://*.die-staemme.de/game.php?*screen=place&mode=sim*
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

function getSurvingUnits() {
	var units_cells = _evaluate('//td[.="Verteidiger"]/parent::tr/td[not(.="Verteidiger") and not(.="Einheiten:") and not(.="")]');
	var losts_cells = _evaluate('//td[.="Verteidiger"]/parent::tr/following::tr/td[not(.="Verluste:")]');
	
	if(units_cells.length == 0) {
		// es wurde nichts berechnet
		return false;
	}
	
	var units = [];
	for(var x = 0; x < units_cells.length-4; x++) {
		var unit_len = parseInt(units_cells[x].textContent, 10);
		var lost_len = parseInt(losts_cells[x].textContent, 10);
		
		//die beiden Werte voneinander abziehen
		var diff = unit_len-lost_len;
		
		//das Ergebnis im Array units speichern
		units.push(diff);
	}
	
	return units;
}

function getUnitNames(units) {
	var head_cells = _evaluate('//th');
	var unitnames = [];
	
	for(var x = 0; x < units.length; x++) {
		var name = head_cells[x].getElementsByTagName("img")[0].src.split("unit/unit_")[1].split(".png")[0];
		unitnames.push(name);
	}
	
	return unitnames;
}

function createDataString(units, unitnames, wall) {
	var string = "&surviving=true";
	
	for(var x = 0; x < units.length; x++) {
		string += "&" + unitnames[x] + "=" + units[x];
	}
	
	string += "&wall=" + wall;
	
	return string;
}

function getUnitsOutOfURL() {
	var data = location.href.split("&surviving=true&")[1];
	var units = data.split("&");
	
	return units;
}

function getWall() {
	var cell = _evaluate('//td[contains(.,"Wall beschädigt von Level")]/b');
	
	if(cell.length == 0) {
		var wall_step = document.getElementsByName("def_wall")[0].value;
	} else {
		var wall_step = cell[1].textContent;
	}
	
	return wall_step;
}

(function main() {
	// Ueberlebende Einheiten ermitteln
	var units = getSurvingUnits();
	
	if(units) {
		// Einheitsnamen ermitteln
		var unitnames = getUnitNames(units);
		
		// neue Wallstufe ermitteln
		var wall = getWall();
		
		// Alles zu einem Request-String zusammenfassen
		var data = createDataString(units, unitnames, wall);
		
		// Den Link veraendern
		var link = _evaluate('//a[.="Überlebende Truppen des Verteidigers einfügen"]')[0];
		link.href = location.href + data;
	}
	
	if(location.href.match(/surviving=true/)) {
		var units = getUnitsOutOfURL();
		
		for(var x = 0; x < units.length; x++) {
			var name = units[x].split("=")[0];
			var len = units[x].split("=")[1];
			
			document.getElementsByName("def_" + name)[0].value = len;
		}
	}
})();