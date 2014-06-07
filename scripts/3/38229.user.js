// ==UserScript==
// @name				DSstartTimestapInReport
// @author				Heinzel
// @version				1.1.0
// @description			Dieses Script schreibt schlichtweg die Uhrzeit und das Datum des Abschickens der Truppen in einen Bericht. 
// @namespace			die-staemme.de
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

function getCoords(kind) {
	kind += ":";
	
	var villageName = _evaluate('//th[.="' + kind + '"]/parent::tr/following::tr/td/a')[0].textContent;
	var coords = villageName.match(/.+? \((\d+\|\d+)\) K\d+/)[1];
	
	return coords;
}

function getArrivalDate() {
	return _evaluate('//td[.="Gesendet"]/following::td')[0].textContent;
}

function getRunningUnits() {
	var cells = _evaluate('//th[.="Angreifer:"]/parent::tr/parent::tbody/descendant::td[contains(.,"Anzahl:")]/parent::tr/td');
	cells.shift();
	cells.shift();
	var unitlen = cells.length;
	
	switch(unitlen) {
		case 9: // ohne Bogen ohne Pala
			var units = ['spear','sword','axe','spy','light','heavy','ram','catapult','snob'];
			break;
		case 10: // ohne Bogen mit Pala
			var units = ['spear','sword','axe','spy','light','heavy','ram','catapult','knight','snob'];
			break;
		case 11: // mit Bogen ohne Pala
			var units = ['spear','sword','axe','archer','spy','light','marcher','heavy','ram','catapult','snob'];
			break;
		case 12: // mit Bogen mit Pala
			var units = ['spear','sword','axe','archer','spy','light','marcher','heavy','ram','catapult','knight','snob'];
			break;
		default:
			return false;
	}
	
	for(var x in cells) {
		if(!isNaN(cells[x].textContent)) {
			units[x] += ":" + cells[x].textContent;
		}
	}
	
	return units;
}

function getSlowestUnit(units) {
	// Einheitentypen aus der Liste loeschen, wo nichts laeuft
	for(var x = 0; x < units.length; x++) {
		var name = units[x].split(":")[0];
		var len = units[x].split(":")[1];
		
		if(len == "0") {
			units.splice(x--, 1);
		}
	}
	
	// Langsamste Einheit ermitteln
	var str = units.join(",");
	var slowestUnit = false;
	if(str.match(/snob/)) {
		slowestUnit = "snob";
	} else if(str.match(/ram|catapult/)) {
		slowestUnit = "ram";
	} else if(str.match(/sword/)) {
		slowestUnit = "sword";
	} else if(str.match(/axe|spear|archer/)) {
		slowestUnit = "axe";
	} else if(str.match(/heavy/)) {
		slowestUnit = "heavy";
	} else if(str.match(/marcher|light/)) {
		slowestUnit = "light";
	} else  {
		slowestUnit = "spy";
	}
	
	return slowestUnit;
}

function getRuntime(kind, StartCoords, TargetCoords) {
	var StartCoords = StartCoords.split('|');
	var TargetCoords = TargetCoords.split('|');
	var len_x = Math.abs(StartCoords[0]-TargetCoords[0]);
	var len_y = Math.abs(StartCoords[1]-TargetCoords[1]);
	var len = Math.sqrt((len_x*len_x)+(len_y*len_y)); // Pythagoras, Felderzahl berechnen
	
	var runtimes = [];
	runtimes['snob'] = 35;
	runtimes['ram'] = 30;
	runtimes['sword'] = 22;
	runtimes['axe'] = 18;
	runtimes['heavy'] = 11;
	runtimes['light'] = 10;
	runtimes['spy'] = 9;
	
	var runtime = Math.floor(len*runtimes[kind].toFixed(2)); // Felderzahl mal Laufzeit der Einheit pro Feld ergibt die komplette Laufzeit
	
	return runtime;
}

function calcStartDate(arrival, runtime) {
	/* Ankunftszeitpunkt aufsplitten */
	var A_day = arrival.split(".")[0].replace(/0+?([1-9]+)/, "$1");
	var A_month = parseInt(arrival.split(".")[1], 10)-1;
	var A_year = "20" + arrival.split(".")[2].split(" ")[0];
	var A_hours = arrival.split(" ")[1].split(":")[0];
	var A_minutes = arrival.split(":")[1];
	
	/* Laufzeit in Tage/Stunden umrechnen */
	var S_minutes = runtime%60;
	var S_hours = Math.floor(runtime/60);
	var S_day = Math.floor(S_hours/24);
	S_hours = S_hours%24;
	
	/* Nachschauen wieviele Tage der vorherige Monat hatte */
	switch(A_month) {
		case 0:
		case 2:
		case 4:
		case 6:
		case 7: 
		case 9:
		case 11:
			var MonthFull = 31;
			break;
		case 1:
			var MonthFull = 28;
			break;
		case 3:
		case 5:
		case 8:
		case 10:
			var MonthFull = 30;
			break;
		default:
			return false;
	}
	
	/* Ein Objekt fuer den Startzeitpunkt erzeugen */
	var Start = new Date();
	Start.setFullYear(A_year);
	Start.setMilliseconds(0);
	Start.setSeconds(0);
	Start.setMonth(A_month);
	
	/* die Laufzeit in das Objekt einrechnen */
	var MinDiff = parseInt(A_minutes,10)-parseInt(S_minutes,10);
	if(MinDiff < 0) {
		S_hours++;
		Start.setMinutes(MinDiff+60);
	} else {
		Start.setMinutes(MinDiff);
	}
	
	var HouDiff = parseInt(A_hours,10)-parseInt(S_hours,10);
	if(HouDiff < 0) {
		S_day++;
		Start.setHours(HouDiff+24);
	} else {
		Start.setHours(HouDiff);
	}
	
	var DayDiff = parseInt(A_day,10)-parseInt(S_day,10);
	if(DayDiff < 0) {
		Start.setMonth(A_month-1);
		Start.setDate(DayDiff+MonthFull);
	} else {
		Start.setDate(DayDiff);
	}
	
	/* Die Ausgabe erstellen */
	var outputMonth = parseInt(Start.getMonth(), 10)+1
	var Day = (Start.getDate() < 10) ? "0" + Start.getDate().toString() : Start.getDate();
	var Month = (outputMonth < 10) ? "0" + outputMonth.toString() : outputMonth;
	var Year = ((Start.getYear()-100) < 10) ? "0" + (Start.getYear()-100).toString() : (Start.getYear()-100).toString();
	var Hours = (Start.getHours() < 10) ? "0" + Start.getHours().toString() : Start.getHours();
	var Minutes = (Start.getMinutes() < 10) ? "0" + Start.getMinutes().toString() : Start.getMinutes();
	
	var output = Day + "." + Month + "." + Year + " " + Hours + ":" + Minutes;
	
	return output;
}

function calcBackDate(arrival, runtime) {
	/* Ankunftszeitpunkt aufsplitten */
	var A_day = arrival.split(".")[0].replace(/0+?([1-9]+)/, "$1");
	var A_month = parseInt(arrival.split(".")[1], 10)-1;
	var A_year = "20" + arrival.split(".")[2].split(" ")[0];
	var A_hours = arrival.split(" ")[1].split(":")[0];
	var A_minutes = arrival.split(":")[1];
	
	/* Laufzeit in Tage/Stunden umrechnen */
	var S_minutes = runtime%60;
	var S_hours = Math.floor(runtime/60);
	var S_day = Math.floor(S_hours/24);
	S_hours = S_hours%24;
	
	/* Nachschauen wieviele Tage der vorherige Monat hatte */
	switch(A_month) {
		case 0:
		case 2:
		case 4:
		case 6:
		case 7: 
		case 9:
		case 11:
			var MonthFull = 31;
			break;
		case 1:
			var MonthFull = 28;
			break;
		case 3:
		case 5:
		case 8:
		case 10:
			var MonthFull = 30;
			break;
		default:
			return false;
	}
	
	/* Ein Objekt fuer den Startzeitpunkt erzeugen */
	var Start = new Date();
	Start.setFullYear(A_year);
	Start.setMilliseconds(0);
	Start.setSeconds(0);
	Start.setMonth(A_month);
	
	/* die Laufzeit in das Objekt einrechnen */
	var MinSum = parseInt(A_minutes,10)+parseInt(S_minutes,10);
	if(MinSum >= 60) {
		S_hours++;
		Start.setMinutes(MinSum-60);
	} else {
		Start.setMinutes(MinSum);
	}
	
	var HouSum = parseInt(A_hours,10)+parseInt(S_hours,10);
	if(HouSum >= 24) {
		S_day++;
		Start.setHours(HouSum-24);
	} else {
		Start.setHours(HouSum);
	}
	
	var DaySum = parseInt(A_day,10)+parseInt(S_day,10);
	if(DaySum >= MonthFull) {
		Start.setMonth(A_month+1);
		Start.setDate(DaySum-MonthFull);
	} else {
		Start.setDate(DaySum);
	}
	
	/* Die Ausgabe erstellen */
	var outputMonth = parseInt(Start.getMonth(), 10)+1
	var Day = (Start.getDate() < 10) ? "0" + Start.getDate().toString() : Start.getDate();
	var Month = (outputMonth < 10) ? "0" + outputMonth.toString() : outputMonth;
	var Year = ((Start.getYear()-100) < 10) ? "0" + (Start.getYear()-100).toString() : (Start.getYear()-100).toString();
	var Hours = (Start.getHours() < 10) ? "0" + Start.getHours().toString() : Start.getHours();
	var Minutes = (Start.getMinutes() < 10) ? "0" + Start.getMinutes().toString() : Start.getMinutes();
	
	var output = Day + "." + Month + "." + Year + " " + Hours + ":" + Minutes;
	
	return output;
}

function setDates(startDate, backDate) {
	var row = _evaluate('//td[.="Gesendet"]/parent::tr')[0];
	
	for(var x = 0; x < 2; x++) {
		var newCell = document.createElement("tr");
		var newRow = document.createElement("td");
		
		newRow.innerHTML = (x == 1) ? "Losgeschickt" : "Zur&uuml;ck";
		newCell.appendChild(newRow.cloneNode(true));
		
		newRow.innerHTML = (x == 1) ? startDate : backDate;
		newCell.appendChild(newRow);
		
		row.parentNode.insertBefore(newCell, row.nextSibling);
	}
}


(function main() {
	/* Script regestrieren */
	win = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
	win.ScriptAPI.register('DSstartTimestapInReport', 7.4, 'Heinzelmänchen', 'Heinzelmänchen@scripter.die-staemme.de');
	
	/* Ankunftszeitpunkt auslesen */
	var arrivalDate = getArrivalDate();
	
	/* Die Einheiten die gelaufen sind auslesen */
	var runningUnits = getRunningUnits();
	
	/* Aus den gelaufenen Einheiten die langsamste raussuchen */
	var slowestUnit = getSlowestUnit(runningUnits);
	
	/* Die Koordinaten ermitteln */
	var startCoords = getCoords("Angreifer");
	var targetCoords = getCoords("Verteidiger");
	
	/* Die Laufzeit ermitteln */
	var runtime = getRuntime(slowestUnit, startCoords, targetCoords);
	
	/* Den Startzeitpunkt ermitteln */
	var startDate = calcStartDate(arrivalDate, runtime);
	
	// Den Zeitpunkt berechnen, wenn die Truppen wieder zurueck sind
	var backDate = calcBackDate(arrivalDate, runtime);
	
	/* Den Startzeitpunkt einfuegen */
	setDates(startDate, backDate);
})();