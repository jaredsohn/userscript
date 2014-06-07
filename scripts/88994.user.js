// ==UserScript==
// @name         Info Bandas Dominantes en Barrios
// @namespace    http://www.mendigogame.es
// @author       sageo[http://berlin.pennergame.de/profil/id:1146285/]-Cutuko (Modificado).
// @description  Muestra las Bandas Dominantes en los Barrios.
// @include      http://*.mendigogame.es/city/district/*
// @version      1.0.6 Anpassungen für Pennergame München
// @version      1.0.5 Anpassung nach Layout-Änderung von Farbflut
// @version      1.0.4 tinypic.com scheint ein Problem zu haben, Grafikhoster gewechselt
// @version      1.0.3 Auto-Update, Hall of Shame
// @version      1.0.2 Bugfix falsch erkannte Mehrfachbesitzer
// ==/UserScript==

var ICON_ANGREIFBAR = "http://i40.photobucket.com/albums/e222/cutuko/grntotenkopfsatdtecko.png";
var ICON_NICHTANGREIFBAR = "http://i40.photobucket.com/albums/e222/cutuko/rotxstadt4hfr.png";

// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTVERSION = "1.0.6";
var THISSCRIPTNAME = "Stadtteilinfos";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/62999';           // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/62999.user.js';  // Skript-URL bei userscripts.org

// ***********************************************************************************************
// Stadt ermitteln und Variablen entsprechend setzen
// ***********************************************************************************************
// Wenn in Berlin gespielt wird
if (location.toString().indexOf("berlin") != -1) {
	var BerlinFlag = true;
	var TOWNBASE_URL = 'http://www.mendigogame.es/';
	var TOWNEXTENSION = 'B';
// Wenn in Hamburg gespielt wird
} else if (location.toString().indexOf("www.mendigogame.es") != -1) {
	var BerlinFlag = false;
	var TOWNBASE_URL = 'http://www.mendigogame.es/';
	var TOWNEXTENSION = 'HH';
// Wenn in München gespielt wird
} else if (location.toString().indexOf("muenchen") != -1) {
	var TOWNBASE_URL = 'http://muenchen.mendigogame.es/';
	var TOWNEXTENSION = 'MU';
}

var API_URL = TOWNBASE_URL + 'city_list/';
var GANG_URL = TOWNBASE_URL + 'profil/bande:';
var GANGFIGHT_URL = TOWNBASE_URL + 'gang/fight/';

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
// Funktion entfernt white Space aus dem übergebenen String
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

// **********************************************************************************
// **********************************************************************************
// Ermitteln des Stadtteilnamens aus dem HTML-Inhalt einer Zelle
// **********************************************************************************
// **********************************************************************************
function GetDistrictnameFromTable(tdcontent) {
	try{
		var Districtname = tdcontent.split(">")[1];
		Districtname = Districtname.split("<")[0];

		return Districtname;
	} catch(err) {
		GM_log("Fehler beim Ermitteln des Stadtteilnamens aus der Tabelle: " + err);
	}
}

// **********************************************************************************
// **********************************************************************************
// Ermitteln des Namens der vorherrschenden Bande anhand der Stadtteil-ID
// **********************************************************************************
// **********************************************************************************
function GetGangnameByDistrictID(content, DistrictID) {
	try{
		var Gangname = content.split("&city_bandenname" + DistrictID)[1];
		Gangname = Gangname.split("=")[1];
		Gangname = Gangname.split("&")[0];

		return Gangname;
	} catch(err) {
		GM_log("Fehler beim Ermitteln des Bandennamens: " + err);
	}
}

// **********************************************************************************
// **********************************************************************************
// Ermitteln der ID der vorherrschenden Bande anhand der Stadtteil-ID
// **********************************************************************************
// **********************************************************************************
function GetGangIDByDistrictID(content, DistrictID) {
	try{
		var GangID = content.split("&city_bande" + DistrictID)[1];
		GangID = GangID.split("=")[1];
		GangID = GangID.split("&")[0];

		return GangID;
	} catch(err) {
		GM_log("Fehler beim Ermitteln der Banden-ID: " + err);
	}
}

// **********************************************************************************
// **********************************************************************************
// Formatiert die Stadtteiltabelle sauber (debug = true zeichnet Rahmen um die 
// Zellen, um das Dimensionieren zu erleichtern)
// **********************************************************************************
// **********************************************************************************
function PrepareTable(table, debug) {	
	// Referenz auf alle Zeilen speichern
	var trs = table.getElementsByTagName("tr");

	// Für alle Zeilen
	for(var i = 0; i < trs.length; i++) {
		// Aktuelle Zeile speichern
		var currenttr = trs[i];

		// Zeile verbreitern
		currenttr.style.width = "600px";

		// Zelle STADTNAME
		if (debug) {
			currenttr.getElementsByTagName("td")[0].style.border = "#40FF40 1px solid";
		}
		currenttr.getElementsByTagName("td")[0].style.width = "300px";
		currenttr.getElementsByTagName("td")[0].style.verticalAlign = "middle";

		// Zelle KOSTEN
		if (debug) {
			currenttr.getElementsByTagName("td")[1].style.border = "#40FF40 1px solid";
		}
		currenttr.getElementsByTagName("td")[1].style.width = "90px";
		currenttr.getElementsByTagName("td")[1].style.verticalAlign = "middle";

		// Zelle EINWOHNERZAHL
		if (debug) {
			currenttr.getElementsByTagName("td")[2].style.border = "#40FF40 1px solid";
		}
		currenttr.getElementsByTagName("td")[2].style.width = "60px";
		currenttr.getElementsByTagName("td")[2].style.verticalAlign = "middle";

		// Zelle PFANDFLASCHENFAKTOR
		if (debug) {
			currenttr.getElementsByTagName("td")[3].style.border = "#40FF40 1px solid";
		}
		currenttr.getElementsByTagName("td")[3].style.width = "60px";
		currenttr.getElementsByTagName("td")[3].style.verticalAlign = "middle";

		// Zelle KAUFEN/EINZIEHEN
		if (debug) {
			currenttr.getElementsByTagName("td")[4].style.border = "#40FF40 1px solid";
		}
		currenttr.getElementsByTagName("td")[4].style.width = "80px";
		currenttr.getElementsByTagName("td")[4].style.verticalAlign = "middle";
		currenttr.getElementsByTagName("td")[4].style.textAlign = "right";
	}
	
	 trs[0].getElementsByTagName("td")[0].style.width = '300px'; 
	 trs[0].getElementsByTagName("td")[1].style.width = '90px'; 
	 trs[0].getElementsByTagName("td")[2].style.width = '60px'; 
	 trs[0].getElementsByTagName("td")[3].style.width = '60px'; 
 	 trs[0].getElementsByTagName("td")[3].innerHTML = '<span class="city_name">Faktor</span>'; 
	 trs[0].getElementsByTagName("td")[4].style.width = '80px'; 	
}

// **********************************************************************************
// **********************************************************************************
// Gibt anhand der übergebenen Banden-ID die Anzahl Stadtteile zurück, die diese
// Bande besitzt
// **********************************************************************************
// **********************************************************************************
function GetNrOfDistrictsByGangID(content, RulingGangID) {
	try{
		return content.split("=" + RulingGangID + "&city_bandenname").length - 1;
		
	} catch(err) {
		GM_log("Fehler beim Ermitteln von der Anzahl von einer Bande besetzter Stadtteile: " + err);
	}
}

// **********************************************************************************
// **********************************************************************************
// Gibt die Anzahl von Stadtteilen der aktuellen Stadt zurück
// **********************************************************************************
// **********************************************************************************
function GetNrOfDistricts(content) {
	try{
		return content.split('input name="id"').length - 1;
	} catch(err) {
		GM_log("Fehler beim Ermitteln der Stadtteilzahl: " + err);
	}
}

// **********************************************************************************
// **********************************************************************************
// Gibt die Anzahl offener Stadtteile zurück, die noch erobert werden können
// **********************************************************************************
// **********************************************************************************
function GetNrOfOpenDistricts(content) {
	try{
		return content.split(ICON_ANGREIFBAR).length - 1;
	} catch(err) {
		GM_log("Fehler beim Ermitteln der Anzahl offener Stadtteile: " + err);
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt eine neue Zeile in die Tabelle ein
// **********************************************************************************
// **********************************************************************************
function AddNewRow(table, debug) {

	// Neues Zeilenelement erzeugen und formatieren
	var newtr = document.createElement("tr");
	newtr.setAttribute("class", "tieritemB");
	newtr.setAttribute("border-spacing", "0px");
	newtr.setAttribute("border-spacing", "0px");
	newtr.setAttribute("colspan", "5px");
	newtr.style.width = "600px";

	// Neue Zellen erzeugen
	for (var i = 0; i <= 2; i++) {
		// In der neuen Zeile eine neue Zelle erzeugen
		newtr.appendChild(document.createElement("td"));
	}

	// Zellen formatieren
	newtr.getElementsByTagName("td")[0].style.width = "26px";
	newtr.getElementsByTagName("td")[0].style.verticalAlign = "middle";
	newtr.getElementsByTagName("td")[0].style.textAlign = "center";
	if (debug) {
		newtr.getElementsByTagName("td")[0].style.border = "#40FF40 1px solid";
	}
	
	newtr.getElementsByTagName("td")[1].style.width = "94px";
	newtr.getElementsByTagName("td")[1].style.verticalAlign = "middle";
	newtr.getElementsByTagName("td")[1].style.textAlign = "left";
	if (debug) {
		newtr.getElementsByTagName("td")[1].style.border = "#40FF40 1px solid";
	}

	newtr.getElementsByTagName("td")[2].style.width = "480px";
	newtr.getElementsByTagName("td")[2].style.verticalAlign = "middle";
	newtr.getElementsByTagName("td")[2].style.textAlign = "left";
	if (debug) {
		newtr.getElementsByTagName("td")[2].style.border = "#40FF40 1px solid";
	}
	
	// Referenz auf drittes Zeilenelement der Tabelle speichern
	var inserttr = table.getElementsByTagName("tr")[2];

	// Neues Zeilenelement in die Tabelle hängen
	inserttr.parentNode.insertBefore(newtr, inserttr);
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt die Info über Banden mit Mehrfachbesitz ein
// **********************************************************************************
// **********************************************************************************
function FillMultiDistrictInfo(table, arraymultigang) {
	// Neue Spalten in die Tabelle einfügen
	for (var i = 0; i < arraymultigang.length; i++) {
		AddNewRow(table, false);
	}

	// Für alle Elemente im Array	
	for (var i = 0; i < arraymultigang.length; i++) {
		var currenttr = table.getElementsByTagName("tr")[i + 2];

		currenttr.getElementsByTagName("td")[0].innerHTML = '<img src="' + ICON_NICHTANGREIFBAR +  '" border="0" width="20" height="20" title="' + arraymultigang[i][0] + ' besitzt ' + arraymultigang[i][2] + ' Stadtteile"/>';
		currenttr.getElementsByTagName("td")[1].innerHTML = '<span class="city_name">' + arraymultigang[i][2] + ' Stadtteile</span>';
		currenttr.getElementsByTagName("td")[2].innerHTML = '<span class="city_name"><a href="' + GANG_URL + arraymultigang[i][1] + '/" target="blank">' + arraymultigang[i][0] + '</a></span>';
	}
}

// **********************************************************************************
// **********************************************************************************
// Fügt Überschriftszeilen in die Tabelle hinzu
// **********************************************************************************
// **********************************************************************************
function AddHeader(table, AddMultiFlag) {
	// Neues Zeilenelement erzeugen und formatieren
	var newtr = document.createElement("tr");
	newtr.setAttribute("class", "tieritemB");
	newtr.setAttribute("border-spacing", "0px");
	newtr.setAttribute("border-spacing", "0px");
	newtr.setAttribute("colspan", "5px");
	newtr.style.width = "600px";

	// In der neuen Zeile eine neue Zelle erzeugen
	newtr.appendChild(document.createElement("td"));

	// Referenz auf erstes Zeilenelement der Tabelle speichern
	var firsttr = table.getElementsByTagName("tr")[0];

	// Neues Zeilenelement in die Tabelle hängen
	firsttr.parentNode.insertBefore(newtr, firsttr);

	// Text einfügen
	newtr.getElementsByTagName("td")[0].innerHTML = '<span class="city_name">' + GetNrOfOpenDistricts(table.innerHTML) + ' von ' + GetNrOfDistricts(table.innerHTML) + ' Stadtteilen können derzeit erobert werden.</span>';

	// Wenn es Banden mit mehreren Stadtteilen gibt
	if (AddMultiFlag) {
		// Neues Zeilenelement erzeugen und formatieren
		newtr = document.createElement("tr");
		newtr.setAttribute("class", "tieritemA");
		newtr.setAttribute("border-spacing", "0px");
		newtr.setAttribute("border-spacing", "0px");
		newtr.setAttribute("colspan", "5px");
		newtr.style.width = "600px";
	
		// In der neuen Zeile eine neue Zelle erzeugen
		newtr.appendChild(document.createElement("td"));
	
		// Referenz auf erstes Zeilenelement der Tabelle speichern
		firsttr = table.getElementsByTagName("tr")[1];
	
		// Neues Zeilenelement in die Tabelle hängen
		firsttr.parentNode.insertBefore(newtr, firsttr);
	
		// Text einfügen
		newtr.getElementsByTagName("td")[0].innerHTML = '<span class="city_name">HALL OF SHAME</span> (Banden mit mehreren Stadtteilen)';
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion überprüft, ob es den Text "searchstring" bereits im Array gibt (Spalte
// "elemnr")
// **********************************************************************************
// **********************************************************************************
function ExistsInArray(currentarray, searchstring, elemnr) {
	// Für alle Elemente im Array
	for (var i = 0; i < currentarray.length; i++) {
		// Wenn das aktuelle Element in der elemr.ten Spalte gleich dem Suchtext ist
		if (currentarray[i][elemnr] == searchstring) {
			// True zurückgeben
			return true;
		}
	}
	
	// Wenn der Code bis hierhin gelaufen ist, wurde das Element nicht gefunden, dann False zurückgeben
	return false;
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt das Array "newarrayelemen" in das Array "currentarray" ein, wenn
// es noch nicht existiert
// **********************************************************************************
// **********************************************************************************
function InsertNewElemToArray(currentarray, newarrayelem) {
	// Anzahl der Elemente im Array in len speichern
	var len = currentarray.length;
	
	// Wenn das Element nicht schon im Array existiert	
	if (!ExistsInArray(currentarray, newarrayelem[0], 0)) {
		// Neues Unterarray erzeugen
		currentarray[len] = new Array(3);
		// Für alle Unterlemente
		for (var i = 0; i < 3; i++) {
			// Wert zuweisen
			currentarray[len][i] = newarrayelem[i];
		}		
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion sortiert nach der 3. Spalte des Arrays (Anzahl Stadtteile)
// **********************************************************************************
// **********************************************************************************
function sortByDistrictNr(a, b) {
	var x = Number(a[2]);
	var y = Number(b[2]);

	return ((x < y) ? 1 : ((x > y) ? -1 : 0));
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************

	// ***********************************************************************************************
	// Auf eine neue Version des Skriptes prüfen
	// ***********************************************************************************************
	CheckForUpdate();

	// Referenz auf Tabelle speichern
	var table = document.getElementsByTagName("table")[0];
		
	// Tabelle sauber formatieren
	PrepareTable(table, false);
	
	// Beziehen der Infos über Stadtteilbesitz	
	GM_xmlhttpRequest({method: 'GET', url: API_URL, onload: function(responseDetails) {
			var content = responseDetails.responseText;
	
			// content kürzen (alles weg ab "Eigenheim", Daten sind nicht relevant)
			content = content.split("eigenheim1=")[0];

			var MultiDistrictGangs = new Array();

			// Wenn die Seite erfolgreich abgerufen werden konnte
			if (responseDetails.status == 200) {
				// Referenz auf alle Zeilen speichern
				var trs = table.getElementsByTagName("tr");
	
				// Für alle Zeilen
				for(i = 1; i < trs.length; i++) {
					// Aktuelle Zeile speichern
					var currenttr = trs[i];
	
					// Stadtteilname ermitteln
					var Districtname = GetDistrictnameFromTable(currenttr.getElementsByTagName("td")[0].innerHTML);
					// Stadtteil-ID ermitteln
					GM_log(Districtname);
					var DistrictID = currenttr.getElementsByTagName("input")[0].value;
					// Name der vorherrschenden Bande ermitteln
					var RulingGangname = GetGangnameByDistrictID(content, DistrictID);
					// Banden-ID der vorherrschen Bande ermitteln
					var RulingGangID = GetGangIDByDistrictID(content, DistrictID);
					// Anzahl von der aktuellen Bande besetzter Stadtteile ermitteln
					var NrOfDistricts = GetNrOfDistrictsByGangID(content, RulingGangID);
	
					// Wenn die Bande des aktuellen Stadtteils mehr als einen Stadtteil besitzt und der Stadtteil von einer Bande gehalten wird
					if (NrOfDistricts > 1 && RulingGangname != "") {
						// Farbe für Stadtteil ROT
						var color = "#FF4040";
						var icon = '<img src="' + ICON_NICHTANGREIFBAR +  '" border="0" title=\'Stadtteil nicht angreifbar (' + RulingGangname + ' besitzt ' + NrOfDistricts + ' Stadtteile)\'/>'

						// Neues Arrayelement erzeugen
						var NewMultiGang = new Array();
						NewMultiGang[0] = RulingGangname;  // Bandenname
						NewMultiGang[1] = RulingGangID;    // BandenID
						NewMultiGang[2] = NrOfDistricts;   // Anzahl Stadtteile
						// Neue Multi-Stadtteilbande in Array speichern
						InsertNewElemToArray(MultiDistrictGangs, NewMultiGang);
					// sonst: Die Bande des aktuellen Stadtteils hat nur einen Stadtteil oder es gibt keine herrschende Bande
					} else {
						// Farbe für Stadtteil WEISS
						var color = "#FFFFFF";

						// Wenn dieser Stadtteil von einer Bande besetzt ist
						if (RulingGangname != "") {
							var icon = '<a href="' + GANGFIGHT_URL + '" target="_blank"><img src="' + ICON_ANGREIFBAR +  '" border="0" title="' + RulingGangname + ' angreifen, um ' + Districtname + ' zu erobern!"/></a>'
						// sonst: Dieser Stadtteil ist derzeit von keiner Bande besetzt
						} else {
							var icon = '<img src="' + ICON_ANGREIFBAR +  '" border="0" title="In ' + Districtname + ' herrscht derzeit keine Bande!"/>'
						}
					}
	
					// Wenn dieser Stadtteil von einer Bande besetzt ist
					if (RulingGangname != "") {
						// Link zur vorherrschenden Bande in die erste Zelle hinzufügen
						currenttr.getElementsByTagName("td")[0].innerHTML = '<span class="city_name"><font color="' + color + '">' + icon + Districtname + '</font></span><br />&nbsp;<a href="' + GANG_URL + RulingGangID + '/" target="blank">' + RulingGangname + '</a>';
					// sonst: Dieser Stadtteil ist derzeit von keiner Bande besetzt
					} else {
						// Link zur vorherrschenden Bande in die erste Zelle hinzufügen
						currenttr.getElementsByTagName("td")[0].innerHTML = '<span class="city_name"><font color="' + color + '">' + icon + Districtname + '</font></span><br />&nbsp;Keine Bande vorherrschend';
					}
				}

				// Wenn es Banden mit Mehrfachbesitz gibt
				if (MultiDistrictGangs.length > 0) {
					// Überschriftszeilen hinzufügen
					AddHeader(table, true);

					// Array mit Banden, die mehrere Stadtteile besitzen, nach Anzahl der Stadtteile sortieren
					MultiDistrictGangs.sort(sortByDistrictNr);
	
					// Banden in die Tabelle eintragen
					FillMultiDistrictInfo(table, MultiDistrictGangs);
				} else {
					// Überschriftszeilen hinzufügen
					AddHeader(table, false);
				}
			// sonst: Beim Seitenabruf ist ein Fehler aufgetreten
			} else {
				alert("Es konnten keine Stadtteil-Infos abgerufen werden. Bitte später noch einmal versuchen!");
			}
		}
	});

