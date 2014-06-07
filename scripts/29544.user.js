// ==UserScript==
// @name                       	DSaddColors
// @description            	Hebt spezielle Speicherstandbereiche durch Farbe hervor
// @namespace            	http://userscripts.org
// @author                    	Heinzel
// @include                	http://de*.die-staemme.de/game.php?*mode=prod*
// @include                	http://de*.die-staemme.de/game.php?*screen=overview_villages
// @exclude		http://de*.die-staemme.de/game.php?*screen=train&mode=mass*
// @exclude		http://de*.die-staemme.de/game.php?*screen=snob*
// ==/UserScript==


/* 
Einige Infos:
1. Wer die Farben aendern will, der kann das gleich nach diesem Kommentar machen, aber Achtung: entweder auf Englisch oder ungebraeuchliche Farben im hexa-dezimal-Code angeben!
2. Das Einfuegen neuer Variablen bringt nix! Wer neue Abgrenzungen machen will, der muss das Script in den Zeilen 54 - 73 verÃ¤ndern (Achtung! Nur fuer Leute, die scripten koennen!)
*/

var color = {
	'12.5': "#00F500", 
	'25': "#23D200", 
	'37.5': "#46AF00", 
	'50': 	"#698C00", 
	'62.5': "#8C6900", 
	'75': 	"#AF4600", 
	'87.5': "#D22300", 
	'100': 	"#F50000"
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

(function main() {
	var rows = _evaluate('//span[contains(@id, "label_text_")]/parent::a/parent::span/parent::td/parent::tr');
	var res_names = ['holz','lehm','eisen'];
	
	for(var x = 0; x < rows.length; x++) {
		// Res ermitteln
		var cell = rows[x].getElementsByTagName("td")[2];
		var res = cell.textContent.split(" ");
		res.pop();
		
		// Speichergroesse ermitteln
		var cell = rows[x].getElementsByTagName("td")[3];
		var storage = cell.textContent;
		
		var string = "";
		var percentages = ["12.5","25","37.5","50","62.5","75","87.5","100"];
		for(var y = 0; y < res.length; y++) {
			var percent = (parseInt(res[y].replace(/\./g, ""), 10)/storage)*100;
			
			for(var z = 0; z < percentages.length; z++) {
				if(percent <= percentages[z]) {
					string += "<img src = 'graphic/" + res_names[y] + ".png' /><span style = 'color: " + color[percentages[z]] + ";'>" + res[y] + "</span> ";
					break;
				}
			}
		}
		
		// speichern
		var cell = rows[x].getElementsByTagName("td")[2];
		cell.innerHTML = string;
	}
})();