// ==UserScript==
// @name				DSaddStandingUnits
// @namespace			http://userscripts.org
// @author				Heinzel
// @description			Fuegt in Berichten eine zusaetzliche Zeile ein, in der steht wieviele Truppen noch im Dorf stehen
// @include			http://ch*.staemme.ch/game.php*screen=report*mode=all*view=*
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

(function __DSaddStandigUnits() {
	var cells_coming = _evaluate('//td[.="Azau:"]/parent::tr/td');
	var cells_dieing = _evaluate('//td[.="Verlust:"]/parent::tr/td');
	
	var row = document.createElement("tr");
	cells_coming[0].parentNode.parentNode.appendChild(row);
	
	for(var x = 0; x < cells_coming.length; x++) {
		var diff = parseInt(cells_coming[x].textContent, 10)-parseInt(cells_dieing[x].textContent, 10);
		
		if(x == cells_coming.length/2) {
			var row = document.createElement("tr");
			cells_coming[x].parentNode.parentNode.appendChild(row);
		}
		
		var cell = document.createElement("td");
		cell.style.textAlign = "center";
		cell.innerHTML = (isNaN(diff)) ? "<b>Lebende<b>:" : diff;
		cell.className = (diff === 0) ? "hidden" : "";
		row.appendChild(cell);
	}
})();