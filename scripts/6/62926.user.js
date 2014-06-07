// ==UserScript==
// @name         Protector
// @namespace    http://www.pennergame.de
// @author       sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description  Entfernt die Schaltfläche "Abbrechen" bei der ersten WB (Penner + Tier), um unabsichtliches Abbrechen zu verhindern. Greasemonkey muss zum Abbrechen deaktiviert werden. Schützt auch Waffen vor unabsichtlichen Verkäufen. (HH und B, PG-Version 4.0)
// @include      http://*.pennergame.de/skills/*
// @include      http://*.pennergame.de/stock/armoury/
// @include      http://*.pennergame.de/stock/armoury/sell/
// @include      http://*.pennergame.de/stock/armoury/use/
// @version      1.0.3 tinypic.com scheint ein Problem zu haben, Grafikhoster gewechselt
// @version      1.0.2 Fehler aufgrund der neuen Google-Ads behoben
// @version      1.0.1 Anzeige des WB-Endes für 1. WB (Penner + Haustier); Fix Entfernen des ersten Buttons, wenn keine WB eingesetzt ist; Sicherung der Waffen gegen unbeabsichtigtes verkaufen
// @version      1.0.0
// ==/UserScript==

var THISSCRIPTVERSION = "1.0.3";
var THISSCRIPTNAME = "Protector";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/62926';          // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/62926.user.js'; // Skript-URL bei userscripts.org

// Eigene Icons
var ICON_UNLOCK = 'http://www.abload.de/img/lock3h8h.gif';           // Icon Entsperrung

// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
	var year = "";
	var month = "";
	var day = "";

	year = DateToFormat.getFullYear();
	month = DateToFormat.getMonth() + 1;
	month = "0" + month;
	if (month.length == 3) { 
		month = month.substr(1,2);
	}
	day = "0" + DateToFormat.getDate();
	if (day.length == 3) {
		day = day.substr(1,2);
	}

	return year + "-" + month + "-" + day;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Entfernt Leerraum aus einen String (Anfang und Ende)
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob es neue Skript-Versionen gibt (einmal pro Tag) und zeigt im positiven
// Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate() {
	// Aktuelles Tagesdatum erzeugen und formatieren
	var today = new Date();
	var tagesdatum = FormatDate(today);

	FirstRunAfterUpdate();

	// Wenn heute noch nicht nach einem Skript-Update gesucht wurde	
	if (GM_getValue("LastScriptUpdateCheck","") != tagesdatum) {
		// Abrufen der Skriptseite von userscripts.org
		GM_xmlhttpRequest({
			method: 'GET', 
			url: THISSCRIPTINSTALL_URL, 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
								
				// Ermitteln der Skriptversion
				var scriptversion = content.split("<b>Version:</b>")[1];
				var scriptfullversion = trimString(scriptversion .split("<br")[0]);
				scriptversion = trimString(scriptversion .split("<br")[0]).substr(0, 5);
				
				// Wenn dort eine neue Skriptversion vorliegt
				if (scriptversion != THISSCRIPTVERSION) {
					// Hinweistext zusammenbauen
					var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschließend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt."

					// Hinweistext ausgeben
					alert(alerttext);
					// Seite mit dem neuen Skript laden, um eine Installation zu ermöglichen
					window.location.href = THISSCRIPTSOURCE_URL;
				}
			}
		});

		// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgeführt)
		GM_setValue("LastScriptUpdateCheck", tagesdatum)
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion liefert vom String str die rechtesten n Zeichen zurück
// ***********************************************************************************************
// ***********************************************************************************************
function Right$(str, n){
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion formatiert einen JS-Timestamp in ein besser lesbares Format um
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatTimestamp(timestamp) {
	var wochentag = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag");
	var newdate = new Date(timestamp);
	var zeit = Right$("0" + newdate.getHours(), 2) + ":" + Right$("0" + newdate.getMinutes(), 2);
	var datum = Right$("0" + newdate.getDate(), 2) + "." + Right$("0" + (newdate.getMonth() + 1), 2) + "." + newdate.getFullYear();
	
	return wochentag[newdate.getDay()] + ", " + datum + ", " + zeit + " Uhr";	
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt den Endzeitpunkt einer Weiterbildung ein
// ***********************************************************************************************
// ***********************************************************************************************
function WriteEndTime(wbtable) {
	var time = wbtable.innerHTML.split('counter(')[1].split(')')[0];
	
	// Wenn eine Zeit angegeben wurde
	if (time >= 0) {
		var EndTime = new Date( (new Date).getTime() + 1000 * time);
		
		var cancelform = wbtable.getElementsByTagName("form")[0];
		// Neuen Absatzknoten erzeugen und Text festlegen
		var newTextNode = document.createElement("b");
		newTextNode.innerHTML = 'bis ' + ReformatTimestamp(EndTime);
		
		// Endzeitpunkt einfügen
		cancelform.parentNode.insertBefore(newTextNode, cancelform);
	} 
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ersetzt den Abbrechen-Button durch einen Hinweis
// ***********************************************************************************************
// ***********************************************************************************************
function DeactivateCancel(wbtable) {
	// Referenz auf Abbrechen-Form speichern
	var cancelform = wbtable.getElementsByTagName("form")[0];

	// Neuen Absatzknoten erzeugen und Text festlegen
	var newTextNode = document.createElement("p");
	newTextNode.innerHTML = "<font style=\"font-size:xx-small\">Greasemonkey deaktivieren zum Abbrechen</font>"

	// Abbrechen-Form gegen Text austauschen	
	cancelform.parentNode.replaceChild(newTextNode, cancelform);
}

// **********************************************************************************
// **********************************************************************************
// Funktion gibt true zurück, wenn die Sicherheitsabfrage durch Klick des OK-Buttons
// beantwortet wurde
// **********************************************************************************
// **********************************************************************************
function DoYouReallyWantTo(confirmtext)
{
   // Gibt bei OK true und bei Abbrechen false zurück
   return confirm(confirmtext);
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************

	// Div mit Google-Ads entfernen
	var googleads = document.getElementById("google_js_1");
	if (googleads != null) {
		googleads.parentNode.removeChild(googleads);
	}

	if (window.location.href.indexOf("pennergame.de/skills/") != -1) {
		// Referenz auf erste WB-Tabelle speichern
		var wbtable = document.getElementsByTagName("table")[0];

		// Wenn es einen dritten Button gibt
		if (wbtable.getElementsByTagName("input").length >= 2) {
			// Wenn es sich um die Tabelle mit dem Abbrechen-Button handelt
			if (wbtable.getElementsByTagName("input")[2].value == "Abbrechen") {
				// Endzeitpunkt der Weiterbildung einfügen
				WriteEndTime(wbtable);

				// Abbrechen-Button durch Hinweis ersetzen
				DeactivateCancel(wbtable);
			}
		}

	} else if (window.location.href.indexOf("pennergame.de/stock/armoury/") != -1) {
		
		var tables = document.getElementsByTagName("table");

		for (var i = 0; i <= tables.length - 1; i++) {
			
			var inputs = tables[i].getElementsByTagName("input");
			
			for (var j = 0; j < inputs.length; j++) {
				if (inputs[j].getAttribute('value').indexOf("verkaufen") != -1) {
					inputs[j].disabled = true;
				}
			}
			var currenttd1 = tables[i].getElementsByTagName("td")[3];
			var currenttd = tables[i].getElementsByTagName("td")[4];
			var newinput = document.createElement("img");
			newinput.setAttribute("id", "enable" + i);
			newinput.setAttribute("src", ICON_UNLOCK);
			newinput.setAttribute("title", "Waffenverkauf entsperren");
			newinput.setAttribute("style", "vertical-align: bottom; cursor: pointer; height: 20px; width: 20px; padding-bottom: 1px; padding-left: 5px;");
			
			currenttd.appendChild(newinput);

			// Handler hinzufügen
			document.getElementById("enable" + i).addEventListener("click", function(event) { 
				if (DoYouReallyWantTo("Soll der Verkauf der Waffe wirklich ermöglicht werden?")) {
					this.parentNode.getElementsByTagName("input")[3].disabled = false;
				}
			}, false);
		}
	}

