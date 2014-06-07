// ==UserScript==
// @name				DSdyeBHvalues
// @namespace			none
// @author				Heinzel
// @description			Dieses Script ferrbt die Bauernhoefe nach Prozentzahl gruen oder rot ein
// @include			http://de*.die-staemme.de/game.php?*
// ==/UserScript==



// Config
var Cconfig = function() {
	// wenn man fuer oldStyle den Wert "true" setzt, erreicht man, dass nur 100% volle BHs rot und ueber 90% volle BHs orange eingefaerbt werden
	this.oldStyle = false;
}


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

function isPA() {
	if(document.body.innerHTML.match(/village\.php|group|Rekrutieren/) || document.getElementsByClassName("menu nowrap quickbar").length > 0) {
		var isPA = true;
	} else {
		var isPA = false;
	}
}

function getColor(percentage) {
	if(percentage > 100) {
		var color = 255;
	} else {
		var color = Math.floor(parseInt(percentage, 10)*2.55)
	}
	
	return color;
}

function dye(element) {
	var set = element.innerHTML.split("/")[0];
	var all = element.innerHTML.split("/")[1];
	var percentage = parseInt(parseInt(set, 10)/parseInt(all, 10)*100, 10);
	
	if(config.oldStyle === false) {
		var red = getColor(percentage);
		var green = 255-red;
		
		element.style.color = "rgb(" + red + ", " + green + ", 0)";
	} else {
		if(percentage >= 100) {
			element.style.color = "red";
		} else if(percentage >= 90) {
			element.style.color = "orange";
		}
	}
}

(function main() {
	// ermitteln ob PA vorhanden ist
	var pa = isPA();
	
	// config laden
	config = new Cconfig();
	
	if(location.href.match(/[?&]screen=overview_villages($|\&)/)) {
		// Falls man nicht in der Produktionsuebersicht ist, das Script beenden
		if(pa && document.getElementById("overview").value != "prod")  {
			return;
		}
		
		// Herausfinden, in der wievielten Zelle die Daten zum Bauernhof stehen
		var headCells = _evaluate('//th[.="Bauernhof"]/parent::tr/th');
		var index = 4;
		for(var x = 0; x < headCells.length; x++) {
			if(headCells[x].textContent == "Bauernhof") {
				index = x;
				break;
			}
		}
		
		// Die Bauernhoefe einfaerben
		var rows = _evaluate('//tr[contains(@class, "row_")]');
		for(var x = 0; x < rows.length; x++) {
			var cells = rows[x].getElementsByTagName("td");
			dye(cells[index]);
		}
	}
	
	// Ueberall die Bauernhofanzeige einfaerben
	var cell = _evaluate('//img[@title="Arbeiter"]/parent::a/parent::td/following::td')[0];
	dye(cell);
})();