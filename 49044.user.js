// ==UserScript==
// @name			DSwriteMSinOrderOverview
// @namespace			http://userscripts.org
// @author			Heinzel
// @version			2.0.0
// @description			Schreibt bei der Ankunftszeit auch noch die Millisekunden dazu. Man muss dazu allerdings die Angriffsuebersicht des jeweiligen Angriffs einmal geoeffnet haben.
// @include			http://de*.die-staemme.de/game.php?*screen=info_command*
// @include			http://de*.die-staemme.de/game.php?*screen=overview*
// @include			http://de*.die-staemme.de/game.php?*screen=info_village*
// ==/UserScript==


// Changelog:
// 1.0.0: Veroeffentlichung
// 2.0.0:	- Umstieg von Cookies auf localStorage
//		- 'abgelaufene' Zeiten werden geloescht
//		- es wird nun auch in den Dorfinformationen, der Dorfansicht und der Eintreffenduebersicht die exakte Ankunftszeit angezeigt

Array.prototype.contains = function(search) {
	for(var x = 0; x < this.length; x++) {
		if(this[x].split(":")[0] == search) {
			return x;
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

function $_GET(name) {
	return (location.href.match(new RegExp(name + "=(.+?)(\&|$)"))) ? RegExp.$1 : false;
}

function load(name) {
	var value = localStorage.getItem(name);
	if(value == null) {
		return new Array();
	} else if(value.match(/,/)) {
		return value.split(",");
	} else {
		return new Array(value);
	}
}

function save(name, value) {
	localStorage.setItem(name, value.join(","));
}

function getTimestamp(string) {
	var date = string.split(" ")[0].split(".");
	var time = string.split(" ")[1].split(":");
	
	var obj = new Date();
	obj.setYear("20" + date[2]);
	obj.setMonth(date[1]-1);
	obj.setDate(date[0]);
	obj.setHours(time[0]);
	obj.setMinutes(time[1]);
	obj.setSeconds(time[2]);
	obj.setMilliseconds(time[3]);
	
	return obj.getTime();
}

function deleteArrived(arrivals) {
	var now = new Date().getTime();
	for(var x = 0 ; x < arrivals.length; x++) {
		if(parseInt(arrivals[x].split(":")[1], 10) <= now) {
			arrivals.splice(x--, 1);
		}
	}
	
	save("DSwriteMSinOrderOverview_arrivals", arrivals);
	
	return arrivals;
}

(function main() {
	// laufende Angriffe laden
	var arrivals = load("DSwriteMSinOrderOverview_arrivals");
	
	// angekommene Angriffe loeschen
	arrivals = deleteArrived(arrivals);
	
	switch($_GET("screen")) {
		case 'info_command':
			// command-id (kurz: cid)  ermitteln
			var cid = location.href.match(/[&?]id=(\d+)($|\&)/)[1];
			
			// falls die cid bereits gespeichert ist -> beenden
			if(arrivals.contains(cid) !== false) {
				break;
			}
			
			// Ankunft ermitteln (als timestamp)
			var arrival = _evaluate('//td[.="Ankunft:"]/following::td')[0].textContent;
			var timestamp = getTimestamp(arrival);
			
			// neuen Wert speichern
			arrivals.push(cid + ":" + timestamp.toString());
			save("DSwriteMSinOrderOverview_arrivals", arrivals);
			break;
		case 'overview_villages': 
			// ueberpruefen ob man in der richtigen Uebersicht ist
			var mode = document.getElementById("overview").value;
			if(mode != "commands" && mode != "incomings") {
				break;
			}
			
			// saemtliche Spalten ermitteln und der Reihe nach durchgehen
			var rows = _evaluate('//tr[contains(@class, "row_")]');
			for(var x = 0; x < rows.length; x++) {
				var row = rows[x];
				
				// command-id ermitteln
				var cid = (row.getElementsByTagName("a")[0].href.match(/[?&]id=(\d+)($|\&)/)) ? RegExp.$1 : false;
				
				// falls fuer die cid kein Wert gespeichert ist, diese Spalte ueberspringen
				if(arrivals.contains(cid) === false) {
					continue;
				}
				
				// exakte Ankunft + millisecs ermitteln
				var timestamp = parseInt(arrivals[arrivals.contains(cid)].split(":")[1], 10);
				var millisecs = timestamp.toString().substr(-3,3);
				
				// exakte Ankunft in die Seite schreiben
				if(mode == "commands") {
					var cell = row.getElementsByTagName("td")[2];
					var text = cell.textContent.split(" Uhr")[0];
					text += ":" + millisecs + " Uhr";
					cell.textContent = text;
				} else {
					var seconds = new Date(timestamp).getSeconds();
					
					var cell = row.getElementsByTagName("td")[3];
					var text = cell.textContent.split(" Uhr")[0];
					text += ":" + seconds + ":" + millisecs + " Uhr";
					cell.textContent = text;
				}
			}
			break;
		case 'info_village':
		case 'overview':
			// saemtliche Spalten ermitteln und der Reihe nach durchgehen
			var rows = _evaluate('//span[contains(@id, "label[")]/parent::td/parent::tr');
			for(var x = 0; x < rows.length; x++) {
				var row = rows[x];
				
				// command-id ermitteln
				var cid = (row.getElementsByTagName("a")[0].href.match(/[?&]id=(\d+)($|\&)/)) ? RegExp.$1 : false;
				
				// falls fuer die cid kein Wert gespeichert ist, diese Spalte ueberspringen
				if(arrivals.contains(cid) === false) {
					continue;
				}
				
				// exakte Ankunft + millisecs ermitteln
				var timestamp = parseInt(arrivals[arrivals.contains(cid)].split(":")[1], 10);
				var seconds = new Date(timestamp).getSeconds();
				var millisecs = timestamp.toString().substr(-3,3);
				
				// exakte Ankunft in die Seite schreiben
				var cell = row.getElementsByTagName("td")[1];
				var text = cell.textContent.split(" Uhr")[0];
				text += ":" + seconds + ":" + millisecs + " Uhr";
				cell.textContent = text;
			}
			break;
	}
})();