// ==UserScript==
// @name				DSwriteMSinOrderOverview
// @namespace			http://userscripts.org
// @author				Heinzel
// @description			Schreibt bei der Ankunftszeit auch noch die Millisekunden dazu. Man muss dazu allerdings die Angriffsuebersicht des jeweiligen Angriffs einmal geoeffnet haben.
// @include			http://de*.die-staemme.de/game.php?*screen=info_command*type=own*
// @include			http://de*.die-staemme.de/game.php?*screen=overview_villages*
// ==/UserScript==



Array.prototype.contains = function(cont) {
	for(var x = 0; x < this.length; x++) {
		if(this[x].split("-")[0] == cont) {
			return "\"" + x + "\"";
		}
	}
	
	return false;
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

function _getCookie(name) {
	if(document.cookie.match(new RegExp(name + "=(.*?)(;|$)"))) {
		return RegExp.$1;
	} else {
		return false;
	}
}

function _setCookie(name, value, survive) {
	if(survive) {
		var now = new Date();
		var later = now.setYears(now.getYears()+5);
		
		var expires = "expires=" + later.toGMTString() + ";"
	} else {
		var expires = "";
	}
	
	document.cookie = name + "=" + value + ";" + expires;
}


(function main() {
	// Cookie mit den Werten auslesen
	if(_getCookie("DSwriteMSinOrderOverview_milliseks")) {
		var cookie = _getCookie("DSwriteMSinOrderOverview_milliseks");
		cookie = (cookie.match(/:/)) ? cookie.split(":") : [cookie];
	} else {
		var cookie = [];
	}
	
	if(location.href.match(/screen=info_command&id=(\d+)/)) {
		// command-id ermitteln
		var cid = RegExp.$1;
		
		// einheiten ermitteln
		var cell = _evaluate('//span[contains(@class, "small hidden")]')[0];
		var millisecs = cell.textContent.replace(/\s|:/g, "");
		
		// Daten speichern
		cookie.push(cid + "-" + millisecs);
		_setCookie("DSwriteMSinOrderOverview_milliseks", cookie.join(":"));
	} else { // Uebersicht
		// ueberpruefen ob man in der richtigen Uebersicht ist
		var mode = document.getElementById("overview").value;
		if(mode != "commands") {
			return;
		}
		
		// saemtliche Spalten ermitteln und der Reihe nach durchgehen
		var rows = _evaluate('//tr[contains(@class, "nowrap row_")]');
		for(var x = 0; x < rows.length; x++) {
			var row = rows[x];
			
			// command-id ermitteln
			var link = row.getElementsByTagName("a")[0];
			var cid = (link.href.match(/screen=info_command&id=(\d+)/)) ? RegExp.$1 : false;
			
			// falls fuer den Befehl keine MS gespeichert sind, zur naechsten Spalte springen
			if(!cookie.contains(cid)) {
				continue;
			}
			
			// millisecs ermitteln
			var index = cookie.contains(cid).replace(/"/g, "");
			var millisecs = cookie[index].split("-")[1];
			
			// millisecs setzen
			var cell = row.getElementsByTagName("td")[2];
			var text = cell.textContent.split(" Uh")[0];
			text += ":" + millisecs + " Uhr";
			cell.textContent = text;
		}
	}
})();