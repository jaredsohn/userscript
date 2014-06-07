// ==UserScript==
// @name           HiKe
// @namespace      http://www.mahrens.biz/Kernzeit/
// @description    Hebt die Zeiten bei Kernzeiteingriffen in der Zeiterfassung (qissva.his.de) farbig hervor (HiKe = Highlighter für Kernzeiteingriffe)
// @include        http://qissva.his.de/*moduleParameter=timesheet*next=timesheet/timeSheet.vm*
// @include        http://qissva/*moduleParameter=timesheet*next=timesheet/timeSheet.vm*
// @author         Marc Ahrens (ahrens@his.de)
// @updateURL      http://userscripts.org/scripts/source/134009.user.js
// @installURL     http://userscripts.org/scripts/source/134009.user.js
// @downloadURL    http://userscripts.org/scripts/source/134009.user.js
// @run-at         document-end
// @version	   2.1
// ==/UserScript==

var timeRegEx = /^\d{1,2}\:{1}\d{2}$/; 									// RegEx fuer Zeitangabe
var timeStart = toDate("9:31"); 										// Kernzeitstart (Alles > der angegebenen Zeit wird markiert). Hinweis 9:31 da die Zeit "9:30" sonst als Kernzeiteingriff markiert werden wuerde. Fuer mich unverstaendlich wird der Vergleichsoperator ">" als ">=" gedeutet.
var timeEnd = toDate("12:00"); 											// Kernzeitende (Alles < der angegebenen Zeit wird markiert)
var storno = 'storno';													// Textschluessel fuer stornierten Datensatz 
var style = 'border:3px solid #FF0000;background-color:#FF8C69;';		// CSS fuer farbige Hervorhebung
var styleLight = 'border:2px solid #ff9999;background-color:#ffbbbb;';	// CSS fuer farbige Hervorhebung bei mehrfachen Kernzeiteingriffen an einem Tag
var styleTop = 'border-top:3px solid #FF0000;';							// CSS fuer farbige Hervorhebung eines ganzen Tages (Rahmen oben)
var styleMiddle = 'border-left:3px solid #FF0000;border-right:3px solid #FF0000;'; // CSS fuer farbige Hervorhebung eines ganzen Tages (Rahmen mitte)
var styleBottom = 'border-bottom:3px solid #FF0000;';					// CSS fuer farbige Hervorhebung eines ganzen Tages (Rahmen unten)
var styleBackground = 'background-color:#FF8C69;';						// CSS fuer farbige Hervorhebung eines ganzen Tages (Hintergrund)
var counter = 0;														// Zaehler fuer Kernzeiteingriffe
var alertWarning = 4;													// Mindestanzahl der Kernzeiteingriffe damit alert-Popup erscheint (-1 = aus)
var hikeInfoText = "Anzahl der Kernzeiteingriffe: %counter% <br/>";		// Infotext unterhalb der Tabelle
var hikeInfoText2 = "<br/>Wichtig: HiKe zeigt/z&auml;hlt <b>NICHT</b> das Fehlen einer kompletten Kernzeit!"; // Erweiterung des Infotextes unterhalb der Tabelle
var hikeInfoTextStyle = 'margin-top:10px; padding:5px; border:3px solid #FFD700; background-color:#FFFF00; text-align:center;';	// Style fuer den Infotext

try {
	var tableRows = document.evaluate(".//table[@class='sva_zeitform']/tbody/tr[*]", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var previousRowWithClass = false;
	var containerDays = new Array(new Array());
	var posCount = 0;
	// Ueber alle Zeilen der Tabelle iterieren
	for(var i = 0; i < tableRows.snapshotLength; i++) {
		var row = tableRows.snapshotItem(i);
		var containsClass = row.getAttribute('class') != null && row.getAttribute('class') == 'sva_gerade';
		// Zuordnung der Tage: Fuer jeden Tag wird ein Array mit den dazugehoerenden Zeilen angelegt
		if(containsClass == previousRowWithClass) {
			containerDays[posCount].push(row);
		} else {
			containerDays.push(new Array(row));
			posCount++;
		}
		previousRowWithClass = containsClass;
	}
	// Jeden gefundenen Tag einzeln abarbeiten
	for(var i = 0; i < containerDays.length; i++) {
		var rowArray = containerDays[i];
		// Container fuer alle Zeitobjekte des Tages
		var timeObjArray = new Array();
		// Jede 'Zeile' eines Tages untersuchen
		for(var j = 0; j < rowArray.length; j++) {
			var singleRow = rowArray[j];
			// Auf 'Storno' pruefen
			var tdHtmlColl = singleRow.getElementsByTagName('td')
			if(tdHtmlColl.length > 0) {
				var textContent = tdHtmlColl.item(tdHtmlColl.length-1).textContent.toLowerCase();
				if(textContent == storno) {
					// Stornierte Zeilen ueberspringen
					continue;
				}
			}
			// Eventuell vorhandene font-Elemente aus der Zeile holen
			var allFontRow = document.evaluate(".//font", singleRow, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			// Ueber alle Font-Elemente der Zeile iterieren
			for(var k = 0; k < allFontRow.snapshotLength; k++) {
				var cell = allFontRow.snapshotItem(k).parentNode;
				// Ist in der Zelle Text enthalten..
				if(cell.textContent.length > 0) {
					// ..wird ein Zeitobjekt erstellt..
					var timeObj = new TimeObj(cell);
					// ..die Zeit als String in ein Date ueberfuehrt..
					timeObj.setTime();
					// ..und das TimeObj im Container abgelegt
					timeObjArray.push(timeObj);
				}
			}
		}
		// Bool zum Markieren, ob an diesem Tag bereits ein Kernzeiteingriff stattgefunden hat
		var violationBool = false;
		// Sind Elemente im Container enthalten..
		if(timeObjArray.length > 0) {
			// ..wird üeberprueft, ob doppelte Werte enthalten sind und ggf. entfernt (bspw. wenn man sich waehrend der Kernzeit fuer einen Dienstgang ausstempelt)
			timeObjArray = hasDupes(timeObjArray) ? removeDupes(timeObjArray) : timeObjArray;
			for(var j = 0; j < timeObjArray.length; j++) {
				var timeObj = timeObjArray[j];
				// Wenn es sich um eine Uhrzeit handelt wird ueberprueft, ob die Zeit im Kernzeitintervall liegt
				if(timeObj.timeAsDate != null && timeObj.timeAsDate.getTime() > timeStart.getTime() && timeObj.timeAsDate.getTime() < timeEnd.getTime()) {
					// Kernzeiteingriff
					if(violationBool) {
						// Es hat bereits ein Kernzeiteingriff stattgefunden: Zaehler nicht erhoehen
						timeObj.timeCell.setAttribute('style', styleLight, 0);
					} else {
						// Erster Kernzeiteingriff des Tages
						timeObj.timeCell.setAttribute('style', style, 0);
						violationBool = true;
						counter++;
					}
				}
			}
			// Wurde kein Kernzeiteingriff gefunden..
			if(!violationBool) {
				// ..wird ueberprueft, ob eine komplette Kernzeit fehlt
				for(var j = 0; j < timeObjArray.length; j++) {
					var timeObj = timeObjArray[j];
					violationBool = true;
					if(timeObj.timeAsDate != null && timeObj.timeAsDate.getTime() < timeStart.getTime()) {
						violationBool = false;
						break;
					}
				}
				// Fehlt eine ganze Kernzeit, wird der ganze Tag markiert
				if(violationBool) {
					for(var j = 0; j < rowArray.length; j++) {
						var row = rowArray[j];
						if(j == 0) {
							rowArray[j].setAttribute('style', styleTop + styleMiddle + styleBackground, 0);
						} else if(j == (rowArray.length - 1)) {
							rowArray[j].setAttribute('style', styleBottom + styleMiddle + styleBackground, 0);
						} else {
							rowArray[j].setAttribute('style', styleMiddle + styleBackground, 0);
						}
					}
					counter++;
				}
			}
		}
	}
	// Erlaeuterung und Anzahl der Kernzeiteingriffe anzeigen (innerhalb des div-Containers mit dem class-Attribut = content)
	var contentElement = document.evaluate(".//div[@class='content']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	// Wenn ein Element gefunden wurde..
	if(contentElement.snapshotLength == 1) {
		// ..erzeuge ein neues div-Element..
		var hikeElement = document.createElement("DIV");
		// ..setze das style-Attribut..
		hikeElement.setAttribute('style', hikeInfoTextStyle, 0);
		// ..fuege den mit HTML-Elementen 
		hikeElement.innerHTML = hikeInfoText.replace("%counter%", counter); // + hikeInfoText2;
		// .. und haenge es an die richtige Stelle
		contentElement.snapshotItem(0).appendChild(hikeElement);
	}
	// Warnung per alert-Popup, sofern alertWarning groesser gleich 0 konfiguriert wurde und die Anzahl der Kernzeiteingriffe groesser gleich alertWarning ist
	if(alertWarning >= 0 && counter >= alertWarning) {
		alert('Achtung, Sie haben bereits ' + counter + ' Kernzeiteingriffe!');
	}
} catch(e) {
	alert('Sorry, das Script wurde von einem JavaScript-Nappel geschrieben... \n\n' + e);
}

function toDate(timeStr) {
	var time = new Date();
	time.setHours(timeStr.substr(0,timeStr.indexOf(":")));
 	time.setMinutes(timeStr.substr(timeStr.indexOf(":")+1));
	return time;
}

function hasDupes(inputTimeObjArray) {
	var length = inputTimeObjArray.length;
	for (var i = 0; i < length; i++) {
		for(var j = i + 1; j < length; j++) {
			if(inputTimeObjArray[i].timeAsString == inputTimeObjArray[j].timeAsString) {
				return true;
			}
		}
	}
	return false;
}

function removeDupes(inputTimeObjArray) {
	var retArray = new Array();
	var length = inputTimeObjArray.length;
	var containsBool;
	for (var i = 0; i < length; i++) {
		containsBool = false;
		for(var j = 0; j < length; j++) {
			if(i != j) {
				if(inputTimeObjArray[i].timeAsString == inputTimeObjArray[j].timeAsString) {
					containsBool = true;
					break;
				}
			}
		}
		if(!containsBool) {
			retArray.push(inputTimeObjArray[i]);
		}
	}
	return retArray;
}

function TimeObj(cell) {
	this.timeCell = cell;
	this.timeAsString = null;
	this.timeAsDate = null;
	this.setTime = function() {
		this.timeAsString = this.timeCell.textContent;
		// Zelleninhalt mit der Time-RegEx ueberpruefen, ob es sich um eine Uhrzeit handelt
		if(this.timeAsString.match(timeRegEx) != null && this.timeAsString.match(timeRegEx).length > 0) {
			this.timeAsDate = toDate(this.timeAsString);
		}
	};
}