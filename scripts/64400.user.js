// ==UserScript==
// @name         Fightinfo 1.0.0
// @namespace    http://www.pennergame.de
// @author       sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description  Sortiert die eintreffenden Kämpfe chronologisch und fügt Links zur Gegnerrecherche hinzu (HH und B, PG-Version 4.0)
// @include      http://*.pennergame.de/fight/
// @include      http://*.pennergame.de/fight/?to=*
// @include      http://*.pennergame.de/fight/fightlog/*
// @include      http://*.pennergame.de/fight/overview/*
// @include      http://*.pennergame.de/fight/?status*
// @version      1.0.0
// ==/UserScript==

var THISSCRIPTVERSION = "1.0.0";
var THISSCRIPTNAME = "Fightinfo";
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/show/63528';

var INFO_ICON = 'http://i50.tinypic.com/214v4tj.jpg';
var LASTFIGHT_ICON = 'http://i49.tinypic.com/1264boj.jpg';

// Wenn das Skript in Berlin läuft
if (location.toString().match(/berlin/) != null) {
	var FIGHTSEARCH_URL = 'http://berlin.pennergame.de/fight/fightlog/?q=';
	var PENNERZONEUSER_URL = 'http://berlin.pennerzone.de/highscore/u';
	var PENNERZONESEARCH_URL1 = 'http://berlin.pennerzone.de/highscore/?page=1&points_min=';
	var PENNERZONESEARCH_URL2 = '&points_max=&gang=egal&action=Suchen&city=0&name_type=contains&name_text=&sDay=&sMonth=&sYear=&eDay=&eMonth=&eYear=';
// sonst: Skript läuft in Hamburg
} else {
	var FIGHTSEARCH_URL = 'http://www.pennergame.de/fight/fightlog/?q=';
	var PENNERZONEUSER_URL = 'http://hamburg.pennerzone.de/highscore/u';
	var PENNERZONESEARCH_URL1 = 'http://hamburg.pennerzone.de/highscore/?page=1&points_min=';
	var PENNERZONESEARCH_URL2 = '&points_max=&gang=egal&action=Suchen&city=0&name_type=contains&name_text=&sDay=&sMonth=&sYear=&eDay=&eMonth=&eYear=';
}

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
			url: THISSCRIPTSOURCE_URL, 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
				
				// Ermitteln der Skriptversion
				var scriptversion = content.split("<b>Version:</b>")[1];
				scriptversion = trimString(scriptversion .split("<br")[0]);
				
				// Wenn dort eine neue Skriptversion vorliegt
				if (scriptversion != THISSCRIPTVERSION) {
					// Hinweistext zusammenbauen
					var alerttext = "Es gibt eine neue Version des Skriptes " + THISSCRIPTNAME + ":\n\n" + scriptversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten und\nhier heruntergeladen werden:\n\n" + THISSCRIPTSOURCE_URL + "\n\nEine Aktualisierung ist empfehlenswert. Bitte vorher die alte Version deaktivieren\noder deinstallieren.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt."
					// Hinweistext ausgeben
					alert(alerttext);
				}				
			}
		});

		// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgeführt)
		GM_setValue("LastScriptUpdateCheck", tagesdatum)
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Array nach Zeit sortieren
// ***********************************************************************************************
// ***********************************************************************************************
function sortByTime(a, b) {
	var x = a[0].substr(0, 2) + a[0].substr(3, 2) + a[0].substr(6, 2);
	var y = b[0].substr(0, 2) + b[0].substr(3, 2) + b[0].substr(6, 2);

	return ((x < y) ? SortDirection * (-1) : ((x > y) ? SortDirection : 0));
}

// ***********************************************************************************************
// ***********************************************************************************************
// Erste Tabelle (abgeschlossene Kämpfe) neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFirstTable(table) {
	// Tabellenbreite neu festlegen
	table.width = "550";
	
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	var ROW_HEIGHT = "17px";	

	// Für alle Zeilen
	for (var x = 0; x <= trs.length - 1; x++) {	
		// Zellen neu formatieren
		trs[x].getElementsByTagName("td")[0].setAttribute('style', 'vertical-align:middle; width: 15px; height:' + ROW_HEIGHT + ';');
		trs[x].getElementsByTagName("td")[1].setAttribute('style', 'vertical-align:middle; width: 70px; height:' + ROW_HEIGHT + ';');
		trs[x].getElementsByTagName("td")[2].setAttribute('style', 'vertical-align:middle; width:260px; height:' + ROW_HEIGHT + ';');
		trs[x].getElementsByTagName("td")[3].setAttribute('style', 'vertical-align:middle; width: 85px; text-align:right; height:' + ROW_HEIGHT + ';');
		trs[x].getElementsByTagName("td")[4].setAttribute('style', 'vertical-align:middle; width: 75px; text-align:right; height:' + ROW_HEIGHT + ';');

		// neue Zelle erzeugen und einfügen
		newtd = document.createElement("td");
		newtd.setAttribute('style', 'vertical-align:middle; width: 35px; height:' + ROW_HEIGHT + ';');
		trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
	}
	// erste Zeile dunkel färben
	trs[0].bgColor = "#232323";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Zweite Tabelle (eintreffende Kämpfe) neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatSecondTable(table) {
	// Tabellenbreite neu festlegen
	table.width = "550";
	
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	var ROW_HEIGHT = "25px";	
	
	// Wenn es mindestens einen eintreffenden Kampf gibt
	if (trs.length > 1) {
		// Für alle Zeilen
		for (var x = 0; x <= trs.length - 1; x++) {	
			// Zellen neu formatieren
			trs[x].getElementsByTagName("td")[0].setAttribute('style', 'vertical-align:middle; width:15px; height:' + ROW_HEIGHT + ';');
			trs[x].getElementsByTagName("td")[1].setAttribute('style', 'vertical-align:middle; width:50px; height:' + ROW_HEIGHT + ';');
			trs[x].getElementsByTagName("td")[2].setAttribute('style', 'vertical-align:middle; width:175px; height:' + ROW_HEIGHT + ';'); 
			trs[x].getElementsByTagName("td")[3].setAttribute('style', 'vertical-align:middle; width:175px; height:' + ROW_HEIGHT + ';'); 
			trs[x].getElementsByTagName("td")[4].setAttribute('style', 'vertical-align:middle; width:100px; height:' + ROW_HEIGHT + ';');
	
			// neue Zelle erzeugen und einfügen
			newtd = document.createElement("td");
			newtd.setAttribute('style', 'vertical-align:middle; width:35px; height:' + ROW_HEIGHT + ';');
			trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
		}
		// erste Zeile dunkel färben
		trs[0].bgColor = "#232323";
	}	
}

// ***********************************************************************************************
// ***********************************************************************************************
// Liest die Daten aus der Tabelle table für eintreffende Kämpfe aus und speichert sie im Array
// IncomingFights
// ***********************************************************************************************
// ***********************************************************************************************
function ReadFightData(table, IncomingFights) {
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");
	
	// **********************************************************************************
	// AUSLESEN DER KAMPFDATEN
	// **********************************************************************************
	// Für alle Zeilen mit Kämpfen
	for (var x = 1; x <= trs.length - 1; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x].getElementsByTagName("td");

		// Wenn mindestens ein Kampf existiert
		if (tds.length > 1) {
			// Array um Element für den aktuellen Kampf erweitern
			IncomingFights[x - 1] = new Array(4);

			// Kampfdaten in das Array einlesen
			// Zeit
			IncomingFights[x - 1][0] = tds[1].innerHTML; 
			// Name
			IncomingFights[x - 1][1] = tds[3].innerHTML; 
			// Bande
			IncomingFights[x - 1][2] = tds[4].innerHTML; 
			// Ausweichen
			IncomingFights[x - 1][3] = tds[5].innerHTML; 
		}
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Schreibt die Daten aus dem Array IncomingFights in die Tabelle table
// ***********************************************************************************************
// ***********************************************************************************************
function WriteFightData(table, IncomingFights) {
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	// Für alle Zeilen mit eingehenden Kämpfen
	for (var x = 0; x < IncomingFights.length; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x + 1].getElementsByTagName("td");

		// Kampfdaten aus dem Array den Zellen zuweisen
		// Zeit
		tds[1].innerHTML = IncomingFights[x][0];
		// Name
		tds[3].innerHTML = IncomingFights[x][1];

		// Name und UserID des Kämpfers aus dem Link auslesen
		var username = tds[3].getElementsByTagName("a")[0].innerHTML;
		var userid = tds[3].innerHTML.split('/id:')[1].split('/"')[0];

		// Info
		tds[2].innerHTML = GetIconInsertHTML(userid, username);
		// Bande
		tds[4].innerHTML = IncomingFights[x][2];
		// Ausweichen
		tds[5].innerHTML = IncomingFights[x][3];
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fügt die Info-Links in die erste Tabelle hinzu
// ***********************************************************************************************
// ***********************************************************************************************
function InsertInfoInFirstTable(table) {
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	// Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
	for (var x = 1; x <= trs.length - 2; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x].getElementsByTagName("td");

		// Name und UserID des Kämpfers aus dem Link auslesen
		var username = tds[3].getElementsByTagName("a")[0].innerHTML;
		var userid = tds[3].innerHTML.split('/id:')[1].split('/"')[0];
	
		// Info-Icons in die neue Zelle einfügen
		trs[x].getElementsByTagName("td")[2].innerHTML = GetIconInsertHTML(userid, username);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fightlog-Tabelle neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFightlogTable(table) {
	// Tabellenbreite neu festlegen
	table.width = "600";
	
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	var ROW_HEIGHT = "17px";	
	
	// Wenn es mindestens einen Kampf gibt
	if (trs.length > 1) {
		// Für alle Zeilen
		for (var x = 0; x <= trs.length - 1; x++) {	
			// Zellen neu formatieren
			trs[x].getElementsByTagName("td")[0].setAttribute('style', 'vertical-align:middle; width:15px; height:' + ROW_HEIGHT + ';');
			trs[x].getElementsByTagName("td")[1].setAttribute('style', 'vertical-align:middle; width:75px; height:' + ROW_HEIGHT + ';');
			trs[x].getElementsByTagName("td")[2].setAttribute('style', 'vertical-align:middle; width:160px; height:' + ROW_HEIGHT + ';'); 
			trs[x].getElementsByTagName("td")[3].setAttribute('style', 'vertical-align:middle; width:165px; height:' + ROW_HEIGHT + ';'); 
			trs[x].getElementsByTagName("td")[4].setAttribute('style', 'vertical-align:middle; width:90px; text-align:right; height:' + ROW_HEIGHT + ';');
			trs[x].getElementsByTagName("td")[5].setAttribute('style', 'vertical-align:middle; width:60px; text-align:right; height:' + ROW_HEIGHT + ';');
	
			// neue Zelle erzeugen und einfügen
			newtd = document.createElement("td");
			newtd.setAttribute('style', 'vertical-align:middle; width:35px; height:' + ROW_HEIGHT + ';');
			trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
		}
		// erste Zeile dunkel färben
		trs[0].bgColor = "#232323";
	}	
}

// ***********************************************************************************************
// ***********************************************************************************************
//
// ***********************************************************************************************
// ***********************************************************************************************
function GetIconInsertHTML(userid, username) {
	var IconInsertHTML = '<a href="' + PENNERZONEUSER_URL + userid + '-' + username + '.html" target="_blank"><img border="0" src="' + INFO_ICON + '" title="Pennerzone-Infos über ' + username + '" height="14" width="14" alt="O"></a>&nbsp;';
	IconInsertHTML = IconInsertHTML + '<a href="' + FIGHTSEARCH_URL + username + '" target="_blank"><img border="0" src="' + LASTFIGHT_ICON + '" title="Infos über bisherige Kämpfe gegen ' + username + '" height="14" width="14" alt="O"></a>'
	
	return IconInsertHTML;
}

// ***********************************************************************************************
// ***********************************************************************************************
//
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************
	var content = document.getElementsByTagName("body")[0].innerHTML;

	// ***********************************************************************************************
	// Auf eine neue Version des Skriptes prüfen
	// ***********************************************************************************************
	CheckForUpdate();

	// Wenn eine Kampfkraftsteigerung vorliegt
	if (content.indexOf("Deine Kampfkraft ist") != -1 ) {
		var divnumber = 1;
	// sonst: Keine Kampfkraftsteigerung
	} else {
		var divnumber = 0;
	}

	// Wenn die aktive Kampfseite angezeigt wird
	if (content.indexOf("Dein Ziel muss") != -1 ) {
		var attacktable = document.getElementsByTagName("table")[0];
		var attackdiv = attacktable.getElementsByTagName("div")[divnumber];
		var attacklink = attackdiv.getElementsByTagName("a")[0];
		var attackspan = attackdiv.getElementsByTagName("span")[0];
	
		var NrOfTRs = attacktable.getElementsByTagName("tr").length;
		var OldHTML = attacktable.getElementsByTagName("tr")[NrOfTRs - 1].innerHTML;
		var MinPoints = OldHTML.split("Dein Ziel muss ")[1];
		MinPoints = MinPoints.split(" bis ")[0];
		
		var PennerzoneLink = '<a href="' + PENNERZONESEARCH_URL1 + MinPoints + PENNERZONESEARCH_URL2 + '" target="_blank" title="Gegnersuche bei pennerzone.de"><b><font color="#FFFFFF">' + MinPoints +  '</font></b></a>';
	
		NewHTML = OldHTML.split(MinPoints)[0] + PennerzoneLink + OldHTML.split(MinPoints)[1];
	
		attacktable.getElementsByTagName("tr")[NrOfTRs - 1].innerHTML = NewHTML;
	
		// Wenn aktuell ein Angriff läuft
		if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Angriff läuft bereits auf") != -1) {
			// Name und UserID des Penners auslesen		
			var username = attacklink.innerHTML;
			var userid = attackspan.innerHTML.split('/id:')[1].split('/"')[0];
	
			// Info-Icons einfügen
			attackspan.innerHTML = attackspan.innerHTML + '&nbsp' + GetIconInsertHTML(userid, username);
		} else {
//			GM_log(attackdiv.innerHTML);
//			attackdiv.innerHTML = attackdiv.innerHTML + '<br /><br /><a href="' + PENNERZONESEARCH_URL1 + MinPoints + PENNERZONESEARCH_URL2 + '" target="_blank" title="Gegnersuche bei pennerzone.de"><img border="0" src="' + INFO_ICON + '" title="Gegnersuche bei pennerzone.de" height="35" width="35" alt="O"></a>';
		}
	}
	
	// Wenn die aktuelle Seite die Fightlog-Seite ist
	if (location.toString().indexOf("/fightlog/") != -1) {
		// Referenz auf die Tabelle mit den abgeschlossenen Kämpfen speichern
		var firsttable = document.getElementsByTagName("table")[1];
		// Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
		ReformatFightlogTable(firsttable);

		// "Info"-Icon und -Link in die Tabelle schreiben
		InsertInfoInFirstTable(firsttable);
	// sonst: die aktuelle Seite ist NICHT die Fightlog-Seite
	} else {
		// Referenz auf die Tabelle mit den abgeschlossenen Kämpfen speichern
		var firsttable = document.getElementsByTagName("table")[1];
		// Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
		ReformatFirstTable(firsttable);
		// "Info"-Icon und -Link in die Tabelle schreiben
		InsertInfoInFirstTable(firsttable);
		
		// Referenz auf die Tabelle mit den eintreffenden Kämpfen speichern
		var secondtable = document.getElementsByTagName("table")[2];
		// Tabelle mit den eintreffenden Kämpfen neu formatieren und eine neue Spalte einfügen
		ReformatSecondTable(secondtable);
	
		// Array für HTK-Infos initialisieren
		var IncomingFights = new Array();
	
		// Auslesen der Daten der einkommenden Kämpfe
		ReadFightData(secondtable, IncomingFights);
	
		// Sortierrichtung vorgeben
		var SortDirection = 1;
	
		// Eintreffende Kämpfe chronologisch sortieren
		IncomingFights.sort(sortByTime);
		
		// Schreiben der sortierten eintreffenden Kämpfe in die Tabelle
		WriteFightData(secondtable, IncomingFights);
	}