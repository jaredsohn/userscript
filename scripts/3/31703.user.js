// ==UserScript==
// @name				DSaddStandingUnits
// @version				1.1.0
// @namespace			die-staemme.de
// @author				Heinzel
// @description			Fuegt in Berichten eine zusaetzliche Zeile ein, in der steht wieviele Truppen noch im Dorf stehen
// @include			http://de*.die-staemme.de/game.php*screen=report*view=*
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
	// Script regestrieren
	win = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
	win.ScriptAPI.register('DSaddStandingUnits', 7.4, 'Heinzelmänchen', 'Heinzelmänchen@scripter.die-staemme.de');
	
	var rows_coming = _evaluate('//td[.="Anzahl:"]/parent::tr');
	var cells_coming = _evaluate('//td[.="Anzahl:"]/parent::tr/td');
	var cells_dieing = _evaluate('//td[.="Verluste:"]/parent::tr/td');
	
	var row = document.createElement("tr");
	cells_coming[0].parentNode.parentNode.appendChild(row);
	
	for(var x = 0; x < cells_coming.length; x++) {
		var diff = parseInt(cells_coming[x].textContent, 10)-parseInt(cells_dieing[x].textContent, 10);
		
		if(x == Math.floor(cells_coming.length/2) && rows_coming.length > 1) {
			var row = document.createElement("tr");
			cells_coming[x].parentNode.parentNode.appendChild(row);
		}
		
		var cell = document.createElement("td");
		cell.style.textAlign = (isNaN(diff)) ? "left:" : "center";
		cell.innerHTML = (isNaN(diff)) ? "Lebende:" : diff;
		cell.className = (diff === 0) ? "hidden" : "";
		row.appendChild(cell);
	}
})();