// ==UserScript==
// @name				DScalcBashPoints
// @author				Heinzel
// @description			Berechnet die Basherpunkte fuer einen Bericht und fuegt sie ein
// @namespace			http://userscripts.org
// @include			http://*.die-staemme.de/game.php?*screen=report*view=*
// ==/UserScript==



if(navigator.appCodeName != "Mozilla") {
	function GM_setValue(name, value) {
		document.cookie = name + "=" + escape(value) + ";expires=" + (new Date(2014, 1, 1)).toGMTString() + ";";
	}
	
	function GM_getValue(name, default_value) {
		if(document.cookie.match("/" + name + "=(.*?)(;|$)/")) {
			return unescape(RegExp.$1);
		}
		
		return default_value;
	}
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

function getSource(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, false);
	request.send(null);
	
	return request.responseText;
}

function getBashFactors(index, newSystem) {
	var factors = [];
	
	if(newSystem) {
		switch(index) {
			case 0:
				factors = [1,2,4,2,2,13,12,15,8,10,20,200];
				break;
			case 1:
				factors = [4,5,1,5,1,5,6,23,4,12,40,200];
				break;
			default:
				window.alert("Fehler: zuviele Zeilen gefunden!");
				return;
		}
	} else {
		factors = [1,1,1,1,2,4,5,6,5,8,10,100];
	}
	
	return factors;
}

function getIfNewBashSystem() {
	var doc = getSource('http://' + location.host + '/interface.php?func=get_config');
	var newSystem = doc.match(/<kill_ranking>(\d)<\/kill_ranking>/)[1];
	
	return newSystem == "2";
}

function loadSystem() {
	var system = GM_getValue('DScalcBashPoints_' + getServer() + '_system', 'undefined');
	
	return system;
}

function getServer() {
	return location.host.split(".")[0];
}

function saveSystem(system) {
	GM_setValue('DScalcBashPoints_' + getServer() + '_system', system);
}

(function main() {
	// Ermitteln ob wir das alte oder das neue Basherpunktesystem hier haben
	var newSystem = loadSystem();
	
	if(newSystem == "undefined") {
		var newSystem = getIfNewBashSystem();
		saveSystem(newSystem);
	}
	
	// Beide Verluste-Zeilen durchgehen
	var rows = _evaluate('//td[.="Verluste:"]/parent::tr');
	for(var x = 0; x < rows.length; x++) {
		var cells = rows[x].getElementsByTagName("td");
		var bash_factors = getBashFactors(x, newSystem);	// Die Basherpunkte-Faktoren der Einheiten ermitteln
		var bashs = 0;
		
		for(var y = 1; y < cells.length; y++) {
			// Die verlorenen Einheiten auslesen
			var lost = parseInt(cells[y].textContent, 10);
			
			// Diese * den Einheiten-Faktor ergibt die Basherpunkte
			bashs += bash_factors[(y-1)]*lost;
		}
		
		// Die errechneten Basherpunkte ausgeben
		var row = document.createElement("tr");
		rows[x].parentNode.appendChild(row);
		
		var cell = document.createElement("td");
		cell.colSpan = cells.length;
		cell.innerHTML = "&raquo;&nbsp;entspricht " + bashs.toString() + " Basherpunkten!";
		row.appendChild(cell);
	}
})();