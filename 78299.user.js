// ==UserScript==
// @name         Fightinfo Polen
// @namespace    http://www.menelgame.pl
// @author       sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description  Stellt zahlreiche kleine und große Hilfen rund um das Thema Kämpfen zur Verfügung (HH und B, PG-Version 4.0)
// @include      http://*www.menelgame.pl/fight/
// @include      http://*www.menelgame.pl/fight/#*
// @include      http://*www.menelgame.pl/fight/?to=*
// @include      http://*www.menelgame.pl/fight/fightlog/*
// @include      http://*www.menelgame.pl/fight/overview/*
// @include      http://*www.menelgame.pl/fight/?status*
// @include      http://*www.menelgame.pl/profil/id:*
// @version      1.2.0 Fix falscher Tausenderpunkt; farbliche Markierung Angreifbarkeit (36 Stunden + Punktzahl); Layout SB-Einträge netter; mehrere Kämpfe können gleichzeitig gepostet werden; Fightinfo auf Profilen und auf pennerzone.de; Warnmarkierung
// @version      1.1.2 Posten von einkommenden Kämpfen in die SB; Layout straffer
// @version      1.1.1 Posten des aktuell ausgehenden Kampfs in die SB; Dateigrößen Icons kleiner --> schnelleres Laden; Posten Kampf: Bande wird zusätzlich angegeben
// @version      1.1.0 Möglichkeit, zu jedem Kampf einen Kommentar zu speichern; Kampf-Posten in die SB; Abruf mehrerer Seiten im Fightlog
// @version      1.0.1 Anpassung Suchstring pennerzone + besserer Updatemechanismus
// @version      1.0.0
// ==/UserScript==

// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTVERSION = "1.2.0";
var THISSCRIPTNAME = "Fightinfo";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/63528';           // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/63528.user.js';  // Skript-URL bei userscripts.org

var SubmitButtonHTML = '<form name="Formular" action=""><input type="button" value="Alle Kämpfe anzeigen" id="kaempfeanzeigen"></form>';
// Basis-URL für Kampfincons
var FIGHTICONS_URL = "http://static.pennergame.de/img/pv4/dots/"

// URLs Warn-Icon
var ICON_WARNING = 'warning.gif';

// URLs für Icons
var INFO_ICON = 'http://i47.tinypic.com/1072mv5.jpg';
var ICON_LASTFIGHT_NOCOMMENT = 'http://i49.tinypic.com/6jhymv.jpg';
var ICON_LASTFIGHT_COMMENT = 'http://i47.tinypic.com/n2igc4.jpg';
var ICON_FIGHTCOMMENT = 'http://i46.tinypic.com/imnpsj.jpg';
var ICON_NOFIGHTCOMMENT = 'http://i50.tinypic.com/4uuflx.jpg';
var ICON_FIGHTWARNING = 'http://i49.tinypic.com/1057itl.jpg';
var ICON_SENDTOSB = 'http://i47.tinypic.com/sqk2ee.jpg';

// Konstanten für die verschiedenen Modi des Postens in die SB
var SBPOSTMODE_ACTIVE = 0;
var SBPOSTMODE_DONE = 1;
var SBPOSTMODE_INCOMING = 2;

// Ersatz-Icons für die PG Kampfergebnis-Icons
var ICON_0_0 = 'http://www.abload.de/img/0_0kopie7p3i.gif';
var ICON_0_1 = 'http://www.abload.de/img/0_1kopieco8m.gif';
var ICON_1_0 = 'http://www.abload.de/img/1_0kopieeqq0.gif';
var ICON_1_1 = 'http://www.abload.de/img/1_1kopie4sob.gif';
var ICON_2_0 = 'http://www.abload.de/img/2_0kopie6qrb.gif';
var ICON_2_1 = 'http://www.abload.de/img/2_1kopieioyf.gif';
var ICON_EVADE = 'http://www.abload.de/img/evadekopie6q24.gif';

// Wenn das Skript in Berlin läuft
if (location.toString().match(/berlin/) != null) {
	var BASE_URL = 'http://berlin.pennergame.de';
	var API_URL = 'http://berlin.pennergame.de/dev/api/user.';
	var FIGHTSEARCH_URL = 'http://berlin.pennergame.de/fight/fightlog/?q=';
	var FIGHLOG_URL = "http://berlin.pennergame.de/fight/fightlog/";
	var PENNERZONEUSER_URL = 'http://berlin.pennerzone.de/highscore/u';
	var PENNERZONESEARCH_URL1 = 'http://berlin.pennerzone.de/highscore/?page=1&points_min=';
	var PENNERZONESEARCH_URL2 = '&points_max=&gang=egal&action=Suchen.&city=0&name_type=contains&name_text=&sDay=&sMonth=&sYear=&eDay=&eMonth=&eYear=';
	var SBADD_URL = 'http://berlin.pennergame.de/gang/chat/add/';
	var PROFILE_URL = 'http://berlin.pennergame.de/profil/id:';
	var GANG_URL = 'http://berlin.pennergame.de/profil/bande:'
	var TOWNEXTENSION = "B";
// sonst: Skript läuft in Hamburg
} else {
	var BASE_URL = 'http://www.menelgame.pl';
	var API_URL = 'http://www.menelgame.pl/dev/api/user.';
	var FIGHTSEARCH_URL = 'http://www.menelgame.pl/fight/fightlog/?q=';
	var FIGHLOG_URL = "http://www.menelgame.pl/fight/fightlog/";
	var PENNERZONEUSER_URL = 'http://hamburg.pennerzone.de/highscore/u';
	var PENNERZONESEARCH_URL1 = 'http://hamburg.pennerzone.de/highscore/?page=1&points_min=';
	var PENNERZONESEARCH_URL2 = '&points_max=&gang=egal&action=Suchen.&city=0&name_type=contains&name_text=&sDay=&sMonth=&sYear=&eDay=&eMonth=&eYear=';
	var SBADD_URL = 'http://www.menelgame.pl/gang/chat/add/';
	var PROFILE_URL = 'http://www.menelgame.pl/profil/id:';
	var GANG_URL = 'http://www.menelgame.pl/profil/bande:'
	var TOWNEXTENSION = "HH";
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
// Funktion extrahiert die eigene UserID
// **********************************************************************************
// **********************************************************************************
function getOwnUserID() {
	// getOwnUserID() + TOWNEXTENSION
	try {
		// Eigene UserID ermitteln
		var ownuserid = document.getElementsByTagName('html')[0].innerHTML.split('<a href="/profil/id:')[1];
		ownuserid = ownuserid.split('/"')[0];

		// Letzte gültige UserID speichern (z.B. beim Zugriff auf Pennerzone)
		GM_setValue("LastOwnUserID", ownuserid);

		return ownuserid;
	} catch(err) {
		GM_log("Fehler beim Ermitteln der eigenen UserID: " + err);

		// Letzte gültige UserID zurückgeben
		return GM_getValue("LastOwnUserID");
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
// Array nach Zeit sortieren
// ***********************************************************************************************
// ***********************************************************************************************
function sortByTime(a, b) {

	// ***********************************************************************************************
	// Funktion addiert auf Stunden des Folgetags 24 Stunden, damit die Sortierreihenfolge passt
	// ***********************************************************************************************
	function ReformatHours(nowtime, a) {
		// Wenn die Jetztzeit kleiner (früher) ist als die übergebene Zeit ist
		if (nowtime <= a) {
			return a.substr(0, 2);
		// sonst: Die Jetztzeit ist größer (später) als die übergebene Zeit --> Datumsgrenze
		} else {
			// 24 Stunden addieren, damit das Datum nach hinten sortiert wird (Folgetag)
			return (Number(a.substr(0, 2)) + 24).toString();
		}
	}

	var jetzt = new Date();
	var nowtime = Right$("0" + jetzt.getHours().toString(), 2) + ":" + Right$("0" + jetzt.getMinutes().toString(), 2) + ":" + Right$("0" + jetzt.getSeconds().toString(), 2);
	
	var x = ReformatHours(nowtime, a[0]) + a[0].substr(3, 2) + a[0].substr(6, 2);
	var y = ReformatHours(nowtime, b[0]) + b[0].substr(3, 2) + b[0].substr(6, 2);

	return ((x < y) ? (-1) : ((x > y) ? 1 : 0));
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ersetzt das Kampf-Icon
// ***********************************************************************************************
// ***********************************************************************************************
function ChangeFightIcon(currenttr) {
	var fightimage = currenttr.getElementsByTagName("td")[0].getElementsByTagName("img")[0];
	var imagename = fightimage.src.split(FIGHTICONS_URL)[1];
	
	// **********************************************************************************
	// In Abhängigkeit der Spalte
	// **********************************************************************************
	switch (imagename) {
		case '0_0.gif': {
			fightimage.src = ICON_0_0;
			fightimage.alt = "AUS";
			break;
		}
		case '0_1.gif': {
			fightimage.src = ICON_0_1;
			fightimage.alt = "EIN";
			break;
		}
		case '1_0.gif': {
			fightimage.src = ICON_1_0;
			fightimage.alt = "AUS";
			break;
		}
		case '1_1.gif': {
			fightimage.src = ICON_1_1;
			fightimage.alt = "EIN";
			break;
		}
		case '2_0.gif': {
			fightimage.src = ICON_2_0;
			fightimage.alt = "AUS";
			break;
		}
		case '2_1.gif': {
			fightimage.src = ICON_2_1;
			fightimage.alt = "EIN";
			break;
		}
		case 'evade.gif': {
			fightimage.src = ICON_EVADE;
			fightimage.alt = "";
			break;
		}
	}

	fightimage.width = "12";
	fightimage.height = "12";
	fightimage.style.paddingLeft = "1px";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Erste Tabelle (abgeschlossene Kämpfe) neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFirstTable(table) {
	// Tabellenbreite neu festlegen
	table.width = "600";

	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	GM_addStyle('#content td { vertical-align: middle; height: 18px; }');

	// Für alle Zeilen
	for (var x = 0; x <= trs.length - 1; x++) {	
		// Zellen neu formatieren
		trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width: 15px;');

		// Wenn die aktuelle Zeile eine Zeile mit Kampfdaten ist
		if (x > 0 && x <= trs.length - 2) {
			// Kampf-Icon austauschen
			ChangeFightIcon(trs[x]);
		}

		trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width: 17px;');
		trs[x].getElementsByTagName("td")[1].setAttribute('style', 'width: 70px; padding-top: 1px;');
		trs[x].getElementsByTagName("td")[2].setAttribute('style', 'width:260px;');
		trs[x].getElementsByTagName("td")[3].setAttribute('style', 'width: 85px; text-align:right');
		trs[x].getElementsByTagName("td")[4].setAttribute('style', 'width: 75px; text-align:right');

		// Neue Zellen erzeugen und einfügen
		var newtd = document.createElement("td");
		newtd.setAttribute('style', 'width: 55px;');
		trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
		newtd = document.createElement("td");
		newtd.setAttribute('style', 'width: 30px;');
		trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[trs[x].getElementsByTagName("td").length - 1].nextSibling);
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
	table.width = "600";
	table.setAttribute('style', table.getAttribute('style') + '; table-layout:fixed');

	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	GM_addStyle('#content td { vertical-align: middle; }');
	GM_addStyle('#content tr { vertical-align: middle; height: 22px; }');

	// Wenn es mindestens einen eintreffenden Kampf gibt
	if (trs.length > 1) {
		// Für alle Zeilen
		for (var x = 0; x <= trs.length - 1; x++) {	
			// Zellen neu formatieren
			trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width:14px;');
			trs[x].getElementsByTagName("td")[1].setAttribute('style', 'width:50px;');
			trs[x].getElementsByTagName("td")[2].setAttribute('style', 'width:176px;'); 
			trs[x].getElementsByTagName("td")[3].setAttribute('style', 'width:170px;'); 
			trs[x].getElementsByTagName("td")[4].setAttribute('style', 'width:120px;');

			// neue Zelle erzeugen und einfügen
			newtd = document.createElement("td");
			newtd.setAttribute('style', 'width:40px;');
			trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
			newtd = document.createElement("td");
			newtd.setAttribute('style', 'width: 30px;');
			trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[trs[x].getElementsByTagName("td").length - 1].nextSibling);
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
			IncomingFights[x - 1][0] = tds[1].innerHTML;  // Zeit
			IncomingFights[x - 1][1] = tds[3].innerHTML;  // Name
			IncomingFights[x - 1][2] = tds[4].innerHTML;  // Bande
			IncomingFights[x - 1][3] = tds[5].innerHTML;  // Ausweichen
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

	// Image als Ausgangspunkt fürs Posten einfügen
	var sbcol = trs[0].getElementsByTagName("td").length - 1;
	var sbtd = trs[0].getElementsByTagName("td")[sbcol];
	// Grafik für Posten in SB einfügen
	sbtd.innerHTML = '<img border="0" src="' + ICON_SENDTOSB + '" title="Daten der markierten Kämpfe in die Shoutbox posten." height="14" width="14" style="padding-left: 11px; cursor: pointer">';
	// Handler für das Posten in SB mit Grafik assoziieren
	PostToSBHandler2(sbtd.getElementsByTagName("img")[0], SBPOSTMODE_INCOMING);

	// Für alle Zeilen mit eingehenden Kämpfen
	for (var x = 0; x < IncomingFights.length; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x + 1].getElementsByTagName("td");

		tds[0].setAttribute('style', 'padding-bottom: 1px;');
		tds[0].getElementsByTagName("img")[0].setAttribute('style', 'width: 12px; height: 12px');

		// Kampfdaten aus dem Array den Zellen zuweisen
		tds[1].innerHTML = IncomingFights[x][0]; // Zeit
		tds[3].innerHTML = IncomingFights[x][1]; // Name

		// Name und UserID des Kämpfers aus dem Link auslesen
		var username = tds[3].getElementsByTagName("a")[0].innerHTML;
		var userid = tds[3].innerHTML.split('/id:')[1].split('/"')[0];

		tds[2].innerHTML = GetIconInsertHTML(userid, username, ""); // Info
		tds[4].innerHTML = IncomingFights[x][2];                    // Bande
		tds[5].innerHTML = IncomingFights[x][3];                    // Ausweichen

		// ***********************************************************************************************
		// Posten in die SB
		// ***********************************************************************************************
		var sbcol = tds.length - 1;
		var sbtd = trs[x + 1].getElementsByTagName("td")[sbcol];
		var checkid = x + 1;
		sbtd.innerHTML = '<form style="padding-bottom: 4px; padding-left: 12px;"><input name="PostToSBein' + checkid + '" id="PostToSBein' + checkid + '" type="checkbox"></form>';
	}
}

// **********************************************************************************
// Funktion extrahiert den Usernamen aus der fightinfo
// **********************************************************************************
function GetUsernameFromFightComment(fightinfo) {
	return fightinfo.split("*")[0];
}

// **********************************************************************************
// Funktion extrahiert das Datum aus der fightinfo
// **********************************************************************************
function GetTimeFromFightComment(fightinfo) {
	return fightinfo.split("*")[1];
}

// **********************************************************************************
// Funktion extrahiert den Kommentar aus der fightinfo
// **********************************************************************************
function GetCommentFromFightComment(fightinfo) {
	return fightinfo.split("*")[2];
}

// **********************************************************************************
// Funktion ermittelt die Anzahl der Kampfkommentare
// **********************************************************************************
function GetNrOfFightCommentsInList(username) {
	return GM_getValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, "").split("|").length - 1;
}

// **********************************************************************************
// Funktion überprüft, ob bereits ein Eintrag für einen Kampf existiert
// **********************************************************************************
function IsFightCommentInList(username, fighttime) {
	if (GM_getValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, "").indexOf(fighttime) != -1) {
		return true;
	} else {
		return false;
	}
}

// **********************************************************************************
// Funktion überprüft, ob bereits ein Eintrag für einen Kampf existiert
// **********************************************************************************
function GetFightCommentFromList(username, fighttime) {
	var fightcomments = GM_getValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, "").split("|");

	for (var i = 0; i < GetNrOfFightCommentsInList(username); i++) {
		// Wenn die übergebene Kampfzeit im aktuellen Eintrag gefunden wurde
		if (fightcomments[i].indexOf(fighttime) != -1) {
			return fightcomments[i].split("*")[1];
		}
	}

	return "";
}

// **********************************************************************************
// Funktion aktualisiert einen bestehenden Kampfkommentar
// **********************************************************************************
function UpdateFightCommentToList(fightinfo) {
	var username = GetUsernameFromFightComment(fightinfo);
	var fighttime = GetTimeFromFightComment(fightinfo);
	var fightcomments = GM_getValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, "").split("|");
	var NrOfFightComments = GetNrOfFightCommentsInList(username);
	var updatedfightcomments = "";

	for (var i = 0; i < NrOfFightComments; i++) {
		// Wenn die übergebene Kampfzeit im aktuellen Eintrag gefunden wurde
		if (fightcomments[i].indexOf(fighttime) != -1) {
			// Wenn der Kommentar nicht leer ist
			if (GetCommentFromFightComment(fightinfo) != "") {
				updatedfightcomments = updatedfightcomments + GetTimeFromFightComment(fightinfo) + "*" + GetCommentFromFightComment(fightinfo) + "|";
			}
		// sonst: Die übergebene Kampfzeit wurde im aktuellen Eintrag nicht gefunden
		} else {
			updatedfightcomments = updatedfightcomments + fightcomments[i] + "|";
		}
	}

	GM_setValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, updatedfightcomments);
}

// **********************************************************************************
// Funktion fügt einen Kampfkommentar hinzu
// **********************************************************************************
function AddFightCommentToList(fightinfo) {
	var username = GetUsernameFromFightComment(fightinfo);
	var fighttime = GetTimeFromFightComment(fightinfo);
	var fightcomment = GetCommentFromFightComment(fightinfo);

	GM_setValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, GM_getValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, "") + fighttime + "*" + fightcomment + "|");
}

// **********************************************************************************
// Handler für Hinzufügen oder Ändern eines Kampfkommentars mit Link assoziieren
// **********************************************************************************
function FightCommentHandler(currentimg) {
	// Click-Handler hinzufügen
	currentimg.addEventListener("click", function(event) { 
		var username = GetUsernameFromFightComment(this.id);
		var fighttime = GetTimeFromFightComment(this.id);

		var fightcomment = GetFightCommentFromList(username, fighttime);
		var fightcomment = prompt("Bitte Kommentar zu diesem Kampf eingeben oder ändern:", fightcomment);
		var newfightcomment = this.id + "*" + fightcomment;
		
		if (fightcomment != null) {				
			// Wenn es zum aktuellen Kampf bereits einen Kommentar in der Liste gibt
			if (IsFightCommentInList(username, fighttime)) {
				UpdateFightCommentToList(newfightcomment);
			// sonst: Es gibt zum aktuellen Kampf noch keinen Kommentar in der Liste
			} else {
				AddFightCommentToList(newfightcomment);
			}

			// Wenn es zum aktuellen Kampf bereits einen Kommentar in der Liste gibt
			if (IsFightCommentInList(username, fighttime)) {
				this.src = ICON_FIGHTCOMMENT;
			} else {
				this.src = ICON_NOFIGHTCOMMENT;
			}

			// Wenn es zum aktuellen Gegner einen Eintrag gibt
			if (GetNrOfFightCommentsInList(username)) {
				this.parentNode.getElementsByTagName("img")[1].src = ICON_LASTFIGHT_COMMENT;
			} else {
				this.parentNode.getElementsByTagName("img")[1].src = ICON_LASTFIGHT_NOCOMMENT;
			}
		}
	}, false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion formatiert eine Zahl mit Tausendertrennzeichen
// **********************************************************************************
// **********************************************************************************
function number_format(zahl) {
	var TZ = '.';
	var new_string = [];
	var tmp = parseInt(zahl) + '';

	if (tmp.substr(0,1) == "-") {
		tmp = tmp.substr(1);
		var minusflag = true;
	}

	if (isNaN(tmp)) {
		return zahl;
	} else {
		while( tmp.length > 3)
		{
			new_string[new_string.length] = tmp.substr(tmp.length - 3 ) ;
			tmp = tmp.substr(0, tmp.length -3 )
		}
		if(tmp) {
			new_string[new_string.length] = tmp;
		}
		
		if (minusflag) {
			return "-" + new_string.reverse().join(TZ);
		} else {
			return new_string.reverse().join(TZ);
		}
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion gibt die Differenz zwischen dem übergebenen Datum und der aktuellen
// Uhrzeit (in Minuten) zurück
// **********************************************************************************
// **********************************************************************************
function GetTimeDiffFromNowInMinutes(fighttime) {
	// Aktuelles Datum speichern
	var now = new Date();
	// Aus der Kampfzeit ein Datum erstellen	
	var comptime = new Date(2010, fighttime.substr(3,2) - 1, fighttime.substr(0,2), fighttime.substr(7,2), fighttime.substr(10,2), 0);
	timediff = (now - comptime) / 1000 / 60;
	
	// Wenn die Zeit in der Zukunft liegt (Jahr 2009 muss verwendet werden, statt 2010)
	if (timediff < 0) {
		var comptime = new Date(2009, fighttime.substr(3,2) - 1, fighttime.substr(0,2), fighttime.substr(7,2), fighttime.substr(10,2), 0);
		timediff = (now - comptime) / 1000 / 60;
	}
	
	// Zeitdifferenz zwischen aktuellem Datum und übergebenem Datum (in Minuten) zurückgeben
	return timediff;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt anhand farblicher Kennzeichnung Informationen über Angreifbarkeit ein
// ***********************************************************************************************
// ***********************************************************************************************
function InsertAttackableInFirstTable(table, linkifygangsflag, secondtableflag) {

	// ***********************************************************************************************
	// Funktion prüft, ob es sich um einen ausgehenden Kampf handelt
	// ***********************************************************************************************
	function IsOutgoingFight(FightIcon) {
		// Wenn in der ersten Spalte eines der "ausgehenden" Icons vorhanden ist (ausweichen wird als ausgehend gezählt, obwohl die Richtung nicht definiert ist)
		if (FightIcon.indexOf(ICON_0_0) != -1 || FightIcon.indexOf(ICON_1_0) != -1 || FightIcon.indexOf(ICON_2_0) != -1 || FightIcon.indexOf(ICON_EVADE) != -1) {
			return true;
		// sonst: Es wurde ein "eingehendes" Icon gefunden
		} else {
			return false;
		}
	}
	
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	// Eigene Punktezahl auslesen
	var ownpoints = Number(document.getElementsByClassName("icon award")[0].getElementsByTagName("a")[0].innerHTML);

	// Wenn die eintreffenden Kämpfe bearbeitet werden
	if (secondtableflag) {
		var endoftable = trs.length - 1;
	} else {
		var endoftable = trs.length - 2;
	}

	// Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
	for (var x = 1; x <= endoftable; x++) {
		// Wenn die Zeile noch nicht bearbeitet wurde
		if (trs[x].getAttribute('done') != 'done') {
			// Wenn es mindestens 7 Spalten gibt (das schließt die Kommentarspalten in der Übersicht der Kämpfe gegen einen bestimmten Spieler aus)
			if (trs[x].getElementsByTagName("td").length >= 7) {
				// UserID des Kämpfers aus dem Link auslesen
				var userid = trs[x].getElementsByTagName("td")[3].innerHTML.split('/id:')[1].split('/"')[0];
				// UserID im Name-Tag speichern
				trs[x].getElementsByTagName("td")[3].setAttribute('name', userid);

				// ***********************************************************************************************
				// Abrufen des XML-Datensatzes für den aktuellen User
				// ***********************************************************************************************
				GM_xmlhttpRequest({method: 'GET', url: API_URL + userid + ".xml", onload: function(responseDetails) {
					var parser = new DOMParser();
					var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

					// Punktezahl und UserID auslesen
					var userpoints = Number(dom.getElementsByTagName('points')[0].textContent);
					var userid = dom.getElementsByTagName('id')[0].textContent;
					var gangid = dom.getElementsByTagName('id')[1].textContent;

					// Aus eigener Punktzahl Ober- und Untergrenze für Punktezahl der User errechnen, die man angreifen kann
					var ownattmax = Math.floor(ownpoints * 1.5);
					var ownattmin = Math.floor(ownpoints * 0.8);

					// Für alle Tabellenzeilen mit Kämpfen
					for (var x = 1; x <= endoftable; x++) {
						var tds = trs[x].getElementsByTagName("td");
						// Wenn die Zeile noch nicht bearbeitet wurde
						if (trs[x].getAttribute('done') != 'done') {
							// Wenn es mindestens 7 Spalten gibt (das schließt die Kommentarspalten in der Übersicht der Kämpfe gegen einen bestimmten Spieler aus)
							if (tds.length >= 7) {
								var currenttd = tds[3];

								// Wenn in der aktuellen Zeile der aktuelle User steht
								if (currenttd.getAttribute('name') == userid) {
									var fighttime = currenttd.parentNode.getElementsByTagName("td")[1].innerHTML;
									var timediff = GetTimeDiffFromNowInMinutes(fighttime);
									var attackwaittimeover = timediff >= (36 * 60);

									// Wenn es sich um einen ausgehenden Kampf handelt
									if (IsOutgoingFight(tds[0].innerHTML)) {
										// Wenn die Zeitdifferenz zum Kampf größer oder gleich als 36 Stunden ist
										if (attackwaittimeover) {
											currenttd.getElementsByTagName("a")[0].setAttribute('title', 'User hat aktuell ' + number_format(userpoints) + ' Punkte, der Angriff erfolgte vor MEHR als 36 Stunden.');
										// sonst: Es sind noch keine 36 Stunden vergangen
										} else {
											currenttd.getElementsByTagName("a")[0].setAttribute('title', 'User hat aktuell ' + number_format(userpoints) + ' Punkte, der Angriff erfolgte vor WENIGER als 36 Stunden.');
										}
									// sonst: Es handelt sich um einen eingehenden Kampf
									} else {
										currenttd.getElementsByTagName("a")[0].setAttribute('title', 'User hat aktuell ' + number_format(userpoints) + ' Punkte.');
										attackwaittimeover = true;
									}

									// Wenn der Gegner angreifbar ist (er befindet sich im Punktespektrum und der Kampf ist länger als 36 Stunden her)
									if (userpoints <= ownattmax  && userpoints >= ownattmin && attackwaittimeover) {
										currenttd.getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');
									// sonst: Der Gegner ist nicht angreifbar
									} else {
										currenttd.getElementsByTagName("a")[0].setAttribute('style', 'color: #ff6666');
									}

									// Wenn Bandennamen verlinkt werden sollen
									if (linkifygangsflag) {
										// Neuen Link erzeugen und einfügen
										var newlink = document.createElement('a');
										newlink.setAttribute('href', GANG_URL + gangid + '/');
										newlink.setAttribute('target', '_blank');
										newlink.setAttribute('style', 'color: #FFFFFF');
										newlink.innerHTML = tds[4].innerHTML;
										tds[4].innerHTML = '';
										tds[4].appendChild(newlink);
									}
									// Zeile als fertig bearbeitet kennzeichnen
									trs[x].setAttribute('done', 'done');
								}
							}
						}
					}
				}
				});
			}
		}
	}
}

// **********************************************************************************
// Handler für Posten eines Kampfes in die SB mit einer Grafik assoziieren
// **********************************************************************************
function PostToSBHandler2(currentimg, sbpostmode) {
	// Click-Handler hinzufügen
	currentimg.addEventListener("click", function(event) { 
		// ***********************************************************************************************
		// Hilfsfunktionen
		// ***********************************************************************************************
		// ***********************************************************************************************
		// Funktion konvertiert HTML-Userstring zu BBCode-Userstring
		// ***********************************************************************************************
		function ConvertUserToBB(htmlstring) {
			var userlink = htmlstring.split('href="')[1].split('"')[0];
			var username = htmlstring.split('">')[1].split('</a>')[0];
			return '[url=' + BASE_URL + userlink + '][b][color=#FFFFFF]' + username + '[/color][/b][/url]';
		}
		
		// ***********************************************************************************************
		// Funktion konvertiert HTML-Kampficonstring zu BBCode-Kampficonstring
		// ***********************************************************************************************
		function ConvertIconToBB(htmlstring) {
			var iconlink = htmlstring.split('src="')[1].split('" ')[0];
			return '[img]' + iconlink + '[/img]';
		}

		// ***********************************************************************************************
		// Funktion ermittelt die UserID
		// ***********************************************************************************************
		function GetUserID(htmlstring) {
			return htmlstring.split('href="/profil/id:')[1].split('/">')[0];
		}

		// ***********************************************************************************************
		// addEventListener-Code
		// ***********************************************************************************************
		// ***********************************************************************************************
		// AKTIVER KAMPF
		// ***********************************************************************************************
		if (sbpostmode == SBPOSTMODE_ACTIVE) {
			// Inhalt der Box auslesen, in der die Infos über den ausgehenden Kampf stehen
			var boxcontent = currentimg.parentNode.parentNode.innerHTML;
			// In die SB zu postende Nachricht zusammenstellen
			var posttext = '[b]Angriff läuft bereits auf  [/b]' + ConvertUserToBB(boxcontent.split('Angriff läuft bereits auf ')[1].split('&nbsp;')[0]);
			posttext = posttext + ', ' + trimString(boxcontent.split('<br>')[1].split('<br>')[0]) + '.';

			// Kampf in die SB posten
			PostToSB(posttext, "Der Kampf wurde in die Shoutbox gepostet!");
		// ***********************************************************************************************
		// ABGESCHLOSSENER KAMPF oder EINKOMMENDER KAMPF
		// ***********************************************************************************************
		} else {
			var table = this.parentNode.parentNode.parentNode;
			var trs = table.getElementsByTagName("tr");

			// Wenn es sich um einen bereits abgeschlossenen Kampf handelt
			if (sbpostmode == SBPOSTMODE_DONE) {
				var idprefix = "PostToSB";
				var trslen = trs.length - 1;
			// sonst: Es handelt sich um einen eingehenden Kampf
			} else {
				var idprefix = "PostToSBein";
				var trslen = trs.length;
			}
			
			var poststring = "";
			var counter = 0;
			
			// Für alle Zeilen
			for (var x = 1; x < trslen; x++) {
				// Wenn die Checkbox angehakt ist
				if (document.getElementById(idprefix + x).checked) {
					// Zähler erhöhen
					counter = counter + 1;

					// Daten aus den Zellen ermitteln
					var tds = trs[x].getElementsByTagName("td");
					var fighttime = tds[1].innerHTML;
					var fightuser = ConvertUserToBB(trimString(tds[3].innerHTML));
					var fightuserid = GetUserID(trimString(tds[3].innerHTML));
					
					// Wenn es sich um einen bereits abgeschlossenen Kampf handelt
					if (sbpostmode == SBPOSTMODE_DONE) {
						var pointscol = tds.length - 2;
						var fighticon = ConvertIconToBB(tds[0].innerHTML.split('/">')[1].split('</a>')[0]);
						var fightmoney = trimString(tds[pointscol - 1].innerHTML);
						var fightpoints = trimString(tds[pointscol].innerHTML);
						// Wenn bei Unentschieden oder Ausweichen "+-0" Punkte gesetzt sind
						if (fightpoints == "+-0") {
							fightpoints = "0";
						}
					// sonst: Es handelt sich um einen eingehenden Kampf
					} else {
						var fighticon = '[img]' + tds[0].getElementsByTagName("img")[0].src + '[/img]';
					}

					// ***********************************************************************************************
					// Wenn die Tabelle 8 Spalten hat (Kampflog) oder es sich um einen eingehenden Kampf handelt
					// ***********************************************************************************************
					if (tds.length == 8 || sbpostmode == SBPOSTMODE_INCOMING) {
						// Auslesen von Bandenname
						var gangname = trimString(tds[4].getElementsByTagName("a")[0].innerHTML);
						// HTML-Sonderzeichen ersetzen durch das korrekte Zeichen
						gangname = gangname.replace(/&amp;/g, "&");
						gangname = gangname.replace(/&gt;/g, ">");
						gangname = gangname.replace(/&lt;/g, "<");
						// Auslesen von BandenID
						var gangid = tds[4].innerHTML.split('menelgame.pl/profil/bande:')[1].split('/">')[0]
						
						// Wenn der Penner in einer Bande ist
						if (gangname != "") {
							var fightgang = '[color=#2a2a2a]_[/color][url=' + BASE_URL + '/profil/bande:' + gangid + '/]' + gangname + '[/url]';
						// sonst: Der Penner ist in keiner Bande
						} else {
							var fightgang = " -keine Bande-";
						}
					} else {
						var fightgang = "";
					}

					// Wenn es sich um einen bereits abgeschlossenen Kampf handelt
					if (sbpostmode == SBPOSTMODE_DONE) {
						// Wenn der Kampf verloren wurde
						if (fighticon.indexOf(ICON_0_0) != -1 || fighticon.indexOf(ICON_0_1) != -1) {
							var colorstring = '#FF0000';  // Rot
						// Wenn der Kampf gewonnen wurde
						} else if (fighticon.indexOf(ICON_1_0) != -1 || fighticon.indexOf(ICON_1_1) != -1) {
							var colorstring = '#33CC00';  // Grün
						// Wenn der Kampf unentschieden ausging
						} else if (fighticon.indexOf(ICON_2_0) != -1 || fighticon.indexOf(ICON_2_1) != -1) {
							var colorstring = '#FFFF33';  // Geld
						// sonst: Es wurde ausgewichen
						} else {
							var colorstring = '#3366FF';  // Blau
						}

						// SB-String für diesen Kampf zusammenbauen und anhängen
						poststring = poststring + fighticon + " " + fighttime + " " + fightuser + fightgang + " [color=#2a2a2a]_[/color][color=" + colorstring + "]" + fightmoney + "[/color][color=#2a2a2a]_[/color][color=" + colorstring + "]"  + fightpoints + ' Punkte[/color]\n';
					// sonst: Es handelt sich um einen noch offenen Kampf (einkommend oder ausgehend)
					} else {
						// SB-String für diesen Kampf zusammenbauen und anhängen
						poststring = poststring + fighticon + " " + fighttime + " " + fightuser + fightgang + "\n";
					}
				}
			}

			// Wenn mindestens ein Kampf angehakt wurde
			if (poststring != "") {
				// Es soll mehr als ein Kampf gepostet werden
				if (counter > 1) {
					var messagetext = "Die Kämpfe wurden ";
					var premessagetext = "Eingehende Kämpfe:\n\n"
				// sonst: Es soll nur ein Kampf gepostet werden
				} else {
					var messagetext = "Der Kampf wurde ";
					var premessagetext = "Eingehender Kampf:\n\n"
				}

				// Wenn bereits beendete Kämpfe gepostet werden sollen
				if (sbpostmode == SBPOSTMODE_DONE) {
					// Kampf/Kämpfe in die SB posten 
					PostToSB(poststring, messagetext + "in die Shoutbox gepostet!");
				// sonst: Eingehende Kämpfe sollen gepostet werden
				} else {
					// Kampf/Kämpfe in die SB posten 
					PostToSB(premessagetext + poststring, messagetext + "in die Shoutbox gepostet!");
				}
			// sonst: Es wurde kein Kampf angehakt
			} else {
				alert("Bitte die Kämpfe, die gepostet werden sollen, durch Ankreuzen auswählen!");
			}
		}
	}, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fügt die Info-Links in die erste Tabelle hinzu
// ***********************************************************************************************
// ***********************************************************************************************
function InsertInfoInFirstTable(table) {
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	// ***********************************************************************************************
	// Posten in die SB
	// ***********************************************************************************************
	// Letzte Spalte ist SB-Spalte
	var sbcol = trs[0].getElementsByTagName("td").length - 1;
	var sbtd = trs[0].getElementsByTagName("td")[sbcol];
	// Grafik für Posten in SB einfügen
	sbtd.innerHTML = '<img border="0" src="' + ICON_SENDTOSB + '" title="Daten der markierten Kämpfe in die Shoutbox posten." height="14" width="14" style="padding-left: 11px; cursor: pointer">';
	// Handler für das Posten in SB mit Grafik assoziieren
	PostToSBHandler2(sbtd.getElementsByTagName("img")[0], SBPOSTMODE_DONE);

	// Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
	for (var x = 1; x <= trs.length - 2; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x].getElementsByTagName("td");

		// Name und UserID des Kämpfers aus dem Link auslesen
		var username = tds[3].getElementsByTagName("a")[0].innerHTML;
		var userid = tds[3].innerHTML.split('/id:')[1].split('/"')[0];
		var fighttime = tds[1].innerHTML;
		
		// Ankreuzkästchen in die Zelle setzen
		var sbcol = tds.length - 1;
		var sbtd = trs[x].getElementsByTagName("td")[sbcol];
		sbtd.innerHTML = '<form style="padding-bottom: 4px; padding-left: 12px;"><input name="PostToSB' + x + '" id="PostToSB' + x + '" type="checkbox"></form>';

		// ***********************************************************************************************
		// Punkte formatieren
		// ***********************************************************************************************
		var pointstd = trs[x].getElementsByTagName("td")[sbcol - 1];
		pointstd.innerHTML = number_format(trimString(pointstd.innerHTML));
				
		// ***********************************************************************************************
		// Info-Icons
		// ***********************************************************************************************
		// Info-Icons in die neue Zelle einfügen
		var iconstd = trs[x].getElementsByTagName("td")[2];
		iconstd.innerHTML = GetIconInsertHTML(userid, username, fighttime);
		// Handler für Fightkommentare mit Link assoziieren
		FightCommentHandler(iconstd.getElementsByTagName("img")[2]);	 
	}
	// Gesamtpunktzahl formatieren
	trs[trs.length - 1].getElementsByTagName("td")[sbcol - 1].innerHTML = "<strong>" + number_format(trs[trs.length - 1].getElementsByTagName("td")[sbcol - 1].getElementsByTagName("strong")[0].innerHTML) + "</strong>";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fightlog-Tabelle neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFightlogTable(table) {
	// Tabellenbreite neu festlegen
	table.width = "800";
	
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	// Wenn es mindestens einen Kampf gibt
	if (trs.length > 1) {
		GM_addStyle('#content td { vertical-align: middle; height: 18px; }');
		GM_addStyle('#content .tieritemA { width: 730px; }');
	
		// Für alle Zeilen
		for (var x = 0; x <= trs.length - 1; x++) {	
			// Zellen neu formatieren
			trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width:15px;');

			// Wenn die aktuelle Zeile eine Zeile mit Kampfdaten ist
			if (x > 0 && x <= trs.length - 2) {
				// Kampf-Icon austauschen
				ChangeFightIcon(trs[x]);
			}

			trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width:17px;');
			trs[x].getElementsByTagName("td")[1].setAttribute('style', 'width:75px;');
			trs[x].getElementsByTagName("td")[2].setAttribute('style', 'width:230px;'); 
			trs[x].getElementsByTagName("td")[3].setAttribute('style', 'width:228px;'); 
			trs[x].getElementsByTagName("td")[4].setAttribute('style', 'width:85px; text-align:right;');
			trs[x].getElementsByTagName("td")[5].setAttribute('style', 'width:75px; text-align:right;');
	
			// neue Zelle erzeugen und einfügen
			var newtd = document.createElement("td");
			newtd.setAttribute('style', 'width:60px;');
			trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
			newtd = document.createElement("td");
			newtd.setAttribute('style', 'width: 30px;');
			trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[trs[x].getElementsByTagName("td").length - 1].nextSibling);
		}
		// erste Zeile dunkel färben
		trs[0].bgColor = "#232323";
	}	
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Anzahl eintreffender Kämpfe
// **********************************************************************************
// **********************************************************************************
function GetNumberOfFights(content) {
	try {
		// Seiteninhalt aufsplitten mit dem Namen des Icons, das für eintreffende Kämpfe verwendet wird;
		// Anzahl der Teile des Splittings - 1 ist die Anzahl eintreffender Kämpfe
		return content.split(ICON_WARNING).length - 1;
	} catch(err) {
		GM_log("Fehler beim Ermitteln der Zahl eintreffender Kämpfe: " + err);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion formatiert einen HTML-String mit den Info-Icons für den übergebenen Penner
// ***********************************************************************************************
// ***********************************************************************************************
function GetIconInsertHTML(userid, username, fighttime) {
	// Icon für Zugriff auf Pennerzone-Statistik einfügen
	var IconInsertHTML = '<a href="' + PENNERZONEUSER_URL + userid + '-' + username + '.html" target="_blank"><img border="0" src="' + INFO_ICON + '" title="Pennerzone-Infos über ' + username + '" height="14" width="14" alt="O" style="padding-left: 1px;"></a>';

	// Anzahl an Kommentaren zum aktuellen User ermitteln
	var NrOfFightComments = GetNrOfFightCommentsInList(username);
	
	// Wenn es bereits Kampfkommentare gibt
	if (NrOfFightComments > 0) {
		var lastfighticon = ICON_LASTFIGHT_COMMENT;
		if (NrOfFightComments > 1) {
			var lastfightadditionalinfo = ': Es gibt bereits ' + NrOfFightComments + ' Kommentare zu diesem Gegner';
		} else {
			var lastfightadditionalinfo = ': Es gibt bereits einen Kommentar zu diesem Gegner';
	}
	// sonst: Es gibt noch keine Kampfkommentare
	} else {
		var lastfighticon = ICON_LASTFIGHT_NOCOMMENT;
		var lastfightadditionalinfo = "";
	}

	// Wenn zu diesem User eine Warnung existiert
	if (ExistsWarning(username)) {
		// Einstellung überschreiben
		var lastfighticon = ICON_FIGHTWARNING;
		var lastfightadditionalinfo = lastfightadditionalinfo + ". ACHTUNG, Warnung wurde aktiviert!";
	}

	// Icon für letzte Kämpfe einfügen
	IconInsertHTML = IconInsertHTML + '<a href="' + FIGHTSEARCH_URL + username + '" target="_blank"><img border="0" src="' + lastfighticon + '" title="Infos über bisherige Kämpfe gegen ' + username + lastfightadditionalinfo + '" height="14" width="14" alt="O" style="padding-left: 3px; padding-right: 4px;"></a>'

	// Wenn eine Kampfzeit angegeben wurde
	if (fighttime != "") {
		// Wenn zu diesem Kampf bereits ein Kommentar existiert
		if (IsFightCommentInList(username, fighttime)) {
			var fightcommenticon = ICON_FIGHTCOMMENT;
		// sonst: Zu diesem Kampf existiert noch kein Kommentar
		} else {
			var fightcommenticon = ICON_NOFIGHTCOMMENT;
		}
		
		// Icon für Kampfkommentare einfügen
		IconInsertHTML = IconInsertHTML + '<img id="' + username + "*" + fighttime + '" border="0" src="' + fightcommenticon + '" title="Kommentar zu diesem Kampf eingeben oder ändern" height="14" width="14" alt="O" style="cursor: pointer">'
	}
	
	// Icon-HTML zurückgeben
	return IconInsertHTML;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion entfernt White Space aus dem übergebenen String
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion schreibt die aktuelle Anzahl eintreffender Kämpfe in die Zeilenüberschrift
// ***********************************************************************************************
// ***********************************************************************************************
function WriteNrOfIncomingFights(content, table) {
	// Anzahl einkommender Kämpfe ermitteln
	var NrOfIncomingFights = GetNumberOfFights(content);

	// Wenn es mindestens einen einkommenden Kampf gibt
	if (NrOfIncomingFights > 0) {
		// Referenz auf Tabellenzeilen in trs speichern
		var trs = table.getElementsByTagName("tr");
		
		// Für alle Tabellenzeilen
		for (var i = 0; i < trs.length; i++) {
			// Wenn in der aktuellen Tabellenzeile "Eintreffende Kämpfe" steht
			if (trs[i].innerHTML.indexOf("Eintreffende Kämpfe") != -1) {
				// Referenz auf erstes Span speichern
				var span = trs[i].getElementsByTagName("span")[0];
				// Wenn nur ein Kampf eintrifft
				if (NrOfIncomingFights == 1) {
					span.innerHTML = "1 eintreffender Kampf";
				// sonst: Es treffen mehrere Kämpfe ein
				} else {
					span.innerHTML = NrOfIncomingFights + " eintreffende Kämpfe";
				}
			}
		}
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ruft alle Kämpfe einer Logseite aus und iteriert ggf. auf die nächste bis zum Ende
// ***********************************************************************************************
// ***********************************************************************************************
function ProcessLogPage(table, ProgressTable, LogPageNr) {

	// Wenn die letzte abzurufende Seite noch nicht erreicht ist
	if (LogPageNr <= Number(document.getElementById("seitebis").value)) {
		
		// Referenz auf Tabellenzeilen in trs speichern
		var trs = table.getElementsByTagName("tr");

		// **********************************************************************************
		// Beziehen der Fightlogseite
		// **********************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: FIGHLOG_URL + LogPageNr + "/",onload: function(logresponseDetails) {
			FillProgressTable(ProgressTable, LogPageNr);
		
			// Content der Seite speichern
			var logcontent = logresponseDetails.responseText;
			
			var fighttable = logcontent.split('<table width="550" border="0" cellpadding="1" cellspacing="0" bgcolor="#363636" style="-moz-border-radius: 2px;">')[1];
			fighttable = fighttable.split('</table>')[0];
			
			var fighttrs = fighttable.split('<tr');
			
			var Fights = new Array();
			
			for (var i = 2; i <= fighttrs.length - 2; i++) {
				var currenttr = fighttrs[i].split("</tr>")[0];
				var fighttds = currenttr.split("<td>");

				Fights[i - 2] = new Array(6);
	
				Fights[i - 2][0] = trimString(fighttds[1].split("</td>")[0]);  // Kampficon
				Fights[i - 2][1] = trimString(fighttds[2].split("</td>")[0]);  // Datum/Uhrzeit
				Fights[i - 2][2] = trimString(fighttds[3].split("</td>")[0]);  // Name
				Fights[i - 2][3] = trimString(fighttds[4].split("</td>")[0]);  // Bande
				Fights[i - 2][4] = trimString(fighttds[5].split("</td>")[0]);  // Geld
				Fights[i - 2][5] = trimString(fighttds[6].split("</td>")[0]);  // Punkte
			}

			GM_addStyle('#content td { vertical-align: middle; height: 18px; }');

			var nroffights = trs.length - 8;

			// Für alle Kämpfe
			for (var i = 0; i < Fights.length; i++) {
				// Neue Zeile erzeugen
				var newtr = document.createElement("tr");

				// Neue Zellen einfügen
				for (var j = 0; j < 8; j++) {
					var newtd = document.createElement("td");
					newtr.appendChild(newtd);
				}				
				
				newtr.getElementsByTagName("td")[0].setAttribute('style', 'width:17px;');
				newtr.getElementsByTagName("td")[0].innerHTML = Fights[i][0];
	
				// Kampf-Icon austauschen
				ChangeFightIcon(newtr);

				newtr.getElementsByTagName("td")[1].setAttribute('style', 'width:75px;');
				newtr.getElementsByTagName("td")[1].innerHTML = Fights[i][1];

				newtr.getElementsByTagName("td")[2].setAttribute('style', 'width:35px;');

				newtr.getElementsByTagName("td")[3].setAttribute('style', 'width:170px;'); 
				newtr.getElementsByTagName("td")[3].innerHTML = Fights[i][2];
	
				newtr.getElementsByTagName("td")[4].setAttribute('style', 'width:175px;'); 
				newtr.getElementsByTagName("td")[4].innerHTML = Fights[i][3];
	
				newtr.getElementsByTagName("td")[5].setAttribute('style', 'width:85px; text-align:right;');
				newtr.getElementsByTagName("td")[5].innerHTML = Fights[i][4];
	
				newtr.getElementsByTagName("td")[6].setAttribute('style', 'width:65px; text-align:right;');
				newtr.getElementsByTagName("td")[6].innerHTML = number_format(Fights[i][5]);

				newtr.getElementsByTagName("td")[7].setAttribute('style', 'width:30px;');

				// Name und UserID des Kämpfers aus dem Link auslesen
				var username = newtr.getElementsByTagName("td")[3].getElementsByTagName("a")[0].innerHTML;
				var userid = newtr.getElementsByTagName("td")[3].innerHTML.split('/id:')[1].split('/"')[0];
				var fighttime = Fights[i][1];
				
				// Info-Icons in die neue Zelle einfügen
				newtr.getElementsByTagName("td")[2].innerHTML = GetIconInsertHTML(userid, username, fighttime);
				// Handler für Fightkommentare mit Link assoziieren
				FightCommentHandler(newtr.getElementsByTagName("td")[2].getElementsByTagName("img")[2]);	 

				// ***********************************************************************************************
				// Posten in die SB
				// ***********************************************************************************************
//				// Letzte Spalte ist Punktespalte
//				var sbcol = 7;
//				var sbtd = newtr.getElementsByTagName("td")[sbcol];
//				// Grafik für Posten in SB einfügen
//				sbtd.innerHTML = '<img border="0" src="' + ICON_SENDTOSB + '" title="Daten des Kampfes gegen ' + username + ' in die Shoutbox posten." height="14" width="14" style="padding-top: 2px; padding-left: 8px; cursor: pointer">';
//				// Handler für das Posten in SB mit Grafik assoziieren
//				PostToSBHandler(sbtd.getElementsByTagName("img")[0], SBPOSTMODE_DONE);

				// Ankreuzkästchen in die Zelle setzen
				var sbcol = 7;
				var sbtd = newtr.getElementsByTagName("td")[sbcol];
				var idnumber = nroffights + i;
				sbtd.innerHTML = '<form style="padding-bottom: 4px; padding-left: 12px;"><input name="PostToSB' + idnumber + '" id="PostToSB' + idnumber + '" type="checkbox"></form>';

				// Neue Zeile einfügen
				trs[trs.length - 1].parentNode.insertBefore(newtr, trs[trs.length - 1]);
			}
			
			// Nächste Fightlogseite abrufen
			ProcessLogPage(table, ProgressTable, LogPageNr + 1)
		}
		});
	// sonst: Die letzte abzurufende Seite wurde erreicht
	} else {
		// Button disablen
		document.getElementById("kaempfeanzeigen").disabled = true;
		// Letzte Seite speichern, damit sie bei der nächsten Anzeige wiederhergestellt werden kann
		GM_setValue("SeiteBis", Number(document.getElementById("seitebis").value));
		
		document.getElementById("preprogress").parentNode.removeChild(document.getElementById("preprogress"));
		document.getElementById("progress").parentNode.removeChild(document.getElementById("progress"));

		// Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
		InsertAttackableInFirstTable(document.getElementsByTagName("table")[2], true);
	}	
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt einen Fortschrittsbalken und liefert ihn als Tabelle zurück
// ***********************************************************************************************
// ***********************************************************************************************
function CreateProgressTable(columnr) {
	var newtable = document.createElement("table");
	newtable.style.width = "300px";
	newtable.style.border = "#000000 1px solid";
	var newtr = document.createElement("tr");
	
	newtable.appendChild(newtr);

	for (var i = 1; i <= columnr; i++) {
		var newtd = document.createElement("td");
		newtd.innerHTML = '&nbsp;';
		newtr.appendChild(newtd);
	}

	return newtable;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion füllt den Fortschrittsbalken bis zur Spalte columnnr
// ***********************************************************************************************
// ***********************************************************************************************
function FillProgressTable(currenttable, columnnr) {
	for (var i = 0; i < columnnr; i++) {
		var currenttd = currenttable.getElementsByTagName("td")[i];
		currenttd.style.backgroundColor = "#33cc00	";
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt die Controls zur vollständigen Kampfanzeige ein
// ***********************************************************************************************
// ***********************************************************************************************
function InsertSubmitButton(content, table) {
	
	// Referenz auf Tabellenzeilen in trs speichern
	var trs = table.getElementsByTagName("tr");
	
	var	rownr = 1;
	
	// ***********************************************************************************************
	// Neue Zeile mit Button einfügen
	// ***********************************************************************************************
	var newtr = document.createElement("tr");
	var newtd = document.createElement("td");
	newtd.setAttribute("colspan", "2");
	newtd.innerHTML = '<table><tr><td style="vertical-align:text-top">' + SubmitButtonHTML + '</td><td style="vertical-align:middle">&nbsp;bis Seite&nbsp;</td><td style="vertical-align:middle"><input name="seite" type="1" size="2" maxlength="3" id="seitebis"></td></tr></table><br />';
	newtr.appendChild(newtd);
	trs[rownr].parentNode.insertBefore(newtr, trs[rownr]);
	document.getElementById("seitebis").value = GM_getValue("SeiteBis", 2);

	var NrOfPages = table.innerHTML.split('href="/fight/fightlog/').length - 1;

	// ***********************************************************************************************
	// Click-Event für Schaltfläche
	// ***********************************************************************************************
	table.parentNode.getElementsByTagName("input")[2].addEventListener("click", function(event) 
	{ 
		// ***********************************************************************************************
		// Leerzeile einfügen
		// ***********************************************************************************************
		newtr = document.createElement("tr");
		newtr.setAttribute("id", "preprogress");
		newtd = document.createElement("td");
		newtd.setAttribute("colspan", "2");
		newtd.innerHTML = '&nbsp;';
		newtr.appendChild(newtd);
		trs[rownr].parentNode.insertBefore(newtr, trs[rownr + 2]);

		// ***********************************************************************************************
		// Fortschrittsbalken einfügen
		// ***********************************************************************************************
		newtr = document.createElement("tr");
		newtr.setAttribute("id", "progress");
		newtd = document.createElement("td");
		newtd.setAttribute("colspan", "2");
		newtd.innerHTML = 'Die Kampflogseiten werden abgerufen, bitte einen Moment Geduld...';
		newtr.appendChild(newtd);
	
		var ProgressTable = CreateProgressTable(Number(document.getElementById("seitebis").value));
		newtd.appendChild(ProgressTable);
		trs[rownr].parentNode.insertBefore(newtr, trs[rownr + 2]);

//		// Aktuelle Tabelle löschen
//		var fighttable = document.getElementsByTagName("table")[0];
//		
//		GM_log("fighttable.childNodes = " + fighttable.childNodes.length + ", trs = " + fighttable.getElementsByTagName("tr").length);
//		
//		for (var i = 8; i <= fighttable.getElementsByTagName("tr").length - 2; i++) {
//			GM_log(fighttable.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML);
//			var knoten = fighttable.getElementsByTagName("tr")[i].firstChild;
//			// fighttable.removeChild(knoten);
//		}

		// Folgeseite(n) abrufen
		ProcessLogPage(table, ProgressTable, 2);
	}, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion postet den übergebenen Text in die SB
// ***********************************************************************************************
// ***********************************************************************************************
function PostToSB(sbtext, successmessage) {
	// ***********************************************************************************************
	// Posten des Textes in die SB
	// ***********************************************************************************************
	GM_xmlhttpRequest({
		method: 'POST',
		url: SBADD_URL,
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: 'f_text=' + encodeURIComponent(sbtext) + '&Submit=Abschicken',
		onload: function(responseDetails)
			{
				alert(successmessage);
			}
	});
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt für jeden Kampfkommentar eine neue Zeile und fügt ihn ein
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFightSearchTable(trs) {
	var NrOfCols = trs.length - 2;

	// Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
	for (var x = 1; x <= NrOfCols; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x].getElementsByTagName("td");

		// Wenn es in der aktuellen Zeile einen Kommentar gibt
		if (tds[2].innerHTML.indexOf(ICON_FIGHTCOMMENT) != -1) {
			// Fightkommenar aus der id auslesen
			var fightcomment = tds[2].getElementsByTagName("img")[2].id;
			// Neue Zeile erzeugen
			var newtr = document.createElement("tr");
			// Neue Zeile nach der aktuellen einhängen
			trs[x].parentNode.insertBefore(newtr, trs[x].nextSibling);

			// Zahl der Spalten und Zeiger um 1 erhöhen
			NrOfCols = NrOfCols + 1;
			x = x + 1;
			
			// Neue Zelle erzeugen
			var newtd = newtr.appendChild(document.createElement("td"));
			newtd.innerHTML = "&nbsp;";
			newtd.setAttribute("colspan", "3");
			// Neue Zelle erzeugen
			newtd = newtr.appendChild(document.createElement("td"));
			// Kampfkommentar eintragen
			newtd.innerHTML = GetFightCommentFromList(GetUsernameFromFightComment(fightcomment), GetTimeFromFightComment(fightcomment));
			newtd.style.color = "orange";
			newtd.style.paddingTop = "2px";
			newtd.style.paddingBottom = "2px";
			newtd.setAttribute("colspan", "4");
		}
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

// **********************************************************************************
// Funktion ermittelt, ob es für den aktuellen User eine Warnung gibt
// **********************************************************************************
function ExistsWarning(username) {
	return GM_getValue("Warning" + getOwnUserID() + TOWNEXTENSION + username, false);
}

// **********************************************************************************
// Funktion ermittelt, ob es für den aktuellen User eine Warnung gibt
// **********************************************************************************
function SaveWarning(username, warnflag) {
	if (warnflag) {
		GM_setValue("Warning" + getOwnUserID() + TOWNEXTENSION + username, true);
	} else {
		GM_deleteValue("Warning" + getOwnUserID() + TOWNEXTENSION + username);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt auf einem Profil die Info-Icons ein
// ***********************************************************************************************
// ***********************************************************************************************
function HandleProfile() {
	// ***********************************************************************************************
	// Funktion ermittelt die UserID auf einem Profil
	// ***********************************************************************************************
	function GetUserIDFromProfile(content) {
		return content.split('menlgame.pl/messages/write/?to=')[1].split('" style="text-decoration: none;"')[0];
	}

	// ***********************************************************************************************
	// Funktion ermittelt den Usernamen auf einem Profil
	// ***********************************************************************************************
	function GetUserNameFromProfile(content) {
		return content.split('menelgame.pl/fight/?to=')[1].split('" style="text-decoration: none;"')[0];
	}

	// Alle Tabellen auf der Seite ermitteln
	var tables = document.getElementsByTagName("table");
	
	// Die "Aktionen"-Tabelle suchen (ist auf jedem Profil vorhanden, auch bei Premium)
	for (var i = 1; i < tables.length; i++) {
		if (tables[i].innerHTML.indexOf("Aktionen</strong>") != -1) {
			// Aktionen-Tabelle speichern
			var actiontable = tables[i];
			break;
		}
	}

	// UserID und Username ermitteln
	var userid = GetUserIDFromProfile(actiontable.innerHTML);
	var username = GetUserNameFromProfile(actiontable.innerHTML);

	// Neue Zeile und Info-Icons einfügen
	var newtr = document.createElement("tr");
	newtr.setAttribute('style', 'background-image: url(http://static.pennergame.de/img/pv4/icons/award_back.png)');
	newtr.setAttribute('height', '23');
	newtr.appendChild(document.createElement("td"));
	newtr.appendChild(document.createElement("td"));
	newtr.appendChild(document.createElement("td"));

	newtr.getElementsByTagName("td")[0].innerHTML = "&nbsp;";

	newtr.getElementsByTagName("td")[1].innerHTML = GetIconInsertHTML(userid, username, "");
	newtr.getElementsByTagName("td")[1].setAttribute('style', 'vertical-align: middle;');
	newtr.getElementsByTagName("td")[1].setAttribute('width', '15%');
	newtr.getElementsByTagName("td")[1].getElementsByTagName("img")[0].setAttribute('style', 'padding-left: 0px');

	newtr.getElementsByTagName("td")[2].innerHTML = "<strong>Infos zu " + username + "</strong>";
	newtr.getElementsByTagName("td")[2].setAttribute('style', 'vertical-align: middle;');

	actiontable.appendChild(newtr);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt auf der Pennerzone-Highscoreseite die Info-Icons ein
// ***********************************************************************************************
// ***********************************************************************************************
function HandlePennerzone() {
	// ***********************************************************************************************
	// Funktion ermittelt die UserID aus dem Link
	// ***********************************************************************************************
	function GetUserIDFromProfile(content) {
		return content.split('<a href="/highscore/u')[1].split('-')[0];
	}

	// ***********************************************************************************************
	// Funktion ermittelt den Usernamen  aus dem Link
	// ***********************************************************************************************
	function GetUserNameFromProfile(content) {
		return content.split('menelgame.pl/fight/?to=')[1].split('" target="_blank">')[0];
	}
	
	var table = document.getElementsByTagName("table")[0];
	var trs = table.getElementsByTagName("tr");
	
	// Neue Spaltenüberschrift erzeugen und einfügen
	var newth = document.createElement("th");
	newth.innerHTML = "Info:";
	newth.width = "40px";
	trs[0].insertBefore(newth, trs[0].getElementsByTagName("th")[1]);

	// Eigene UserID ermitteln (die zuletzt gespeicherte, da von Pennerzone aus kein Zugriff besteht)
	var ownuserid = GM_getValue("LastOwnUserID", "");

	// Für alle Zeilen mit Usern
	for (var x = 1; x < trs.length; x++) {
		// UserID und Username ermitteln
		var userid = GetUserIDFromProfile(trs[x].getElementsByTagName("td")[0].innerHTML);
		var username = GetUserNameFromProfile(trs[x].getElementsByTagName("td")[1].innerHTML);

		// Neue Zelle erzeugen und mit Fightinfos einfügen
		var newtd = document.createElement("td");
		newtd.innerHTML = "<center>" + GetIconInsertHTML(userid, username, "") + "</center>";
		trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[1]);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion handelt die Aktionen auf der Suchseite nach bereits geführten Kämpfen
// ***********************************************************************************************
// ***********************************************************************************************
function HandleSearchpage() {
	// ***********************************************************************************************
	// Funktion ermittelt den Usernamen  aus dem Link
	// ***********************************************************************************************
	function GetUserNameFromProfile(content) {
		return content.split('href="/profil/id:')[1].split('/">')[1].split('</a>')[0];
	}

	// Referenz auf die Zeilen der Tabelle speichern
	var trs = firsttable.getElementsByTagName("tr");

	// Kampfkommentare eintragen
	ReformatFightSearchTable(trs);

	// Erzeugen und Einfügen der Checkbox für die Warnmarkierung	
	var currentspan = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("span")[0];
	var newdiv = document.createElement("div");
	newdiv.innerHTML = '<form style="padding-top: 8px; padding-left: 8px;"><input name="WarningCheckbox" id="WarningCheckbox" type="checkbox" value="Achtung">&nbsp;Warnung für diesen Spieler aktivieren</form>';
	newdiv.setAttribute('style', 'padding: 0px; background-color: rgb(42, 42, 42); width: 265px; height: 38px; vertical-align: middle; float: left; -moz-border-radius-topleft: 4px; -moz-border-radius-topright: 4px; -moz-border-radius-bottomright: 4px; -moz-border-radius-bottomleft: 4px;');
	currentspan.insertBefore(newdiv, newdiv.getElementsByTagName("div")[0]);

	// Username ermitteln
	var username = GetUserNameFromProfile(trs[1].innerHTML);

	// Klickstatus wiederherstellen
	document.getElementById("WarningCheckbox").checked = ExistsWarning(username);

	// ***********************************************************************************************
	// Click-Handler hinzufügen
	// ***********************************************************************************************
	document.getElementById("WarningCheckbox").addEventListener("click", function(event) { 
		// Klickstatus speichern
		SaveWarning(username, this.checked);
	}, false);
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************

	var content = document.getElementsByTagName("body")[0].innerHTML;

	// ***********************************************************************************************
	// Auf eine neue Version des Skriptes prüfen
	// ***********************************************************************************************
	CheckForUpdate();

	// ***********************************************************************************************
	// Wenn die aktuelle Seite eine Profilseite ist
	// ***********************************************************************************************
	if (location.toString().indexOf(".menelgame.pl/profil/id:") != -1) {
		// Info-Icons auf dem Profil einfügen
		HandleProfile();
	// ***********************************************************************************************
	// Wenn die aktuelle Seite eine pennerzone-Seite ist
	// ***********************************************************************************************
	} else if (location.toString().indexOf(".pennerzone.de/highscore/") != -1) {
		HandlePennerzone();
	// ***********************************************************************************************
	// sonst: Die aktuelle Seite ist keine Profilseite
	// ***********************************************************************************************
	} else {
		// Wenn eine Kampfkraftsteigerung vorliegt
		if (content.indexOf("Deine Kampfkraft ist") != -1 ) {
			var divnumber = 1;
		// sonst: Keine Kampfkraftsteigerung
		} else {
			var divnumber = 0;
		}
	
		// ***********************************************************************************************
		// Wenn die aktive Kampfseite angezeigt wird
		// ***********************************************************************************************
		if (content.indexOf("Dein Ziel muss") != -1 ) {
			var attacktable = document.getElementsByTagName("table")[0];
			var attackdiv = attacktable.getElementsByTagName("div")[divnumber];
			var attacklink = attackdiv.getElementsByTagName("a")[0];
			var attackspan = attackdiv.getElementsByTagName("span")[0];
		
			var NrOfTRs = attacktable.getElementsByTagName("tr").length;
			var OldHTML = attacktable.getElementsByTagName("tr")[NrOfTRs - 1].innerHTML;
			var MinPoints = OldHTML.split("Dein Ziel muss ")[1];
			MinPoints = MinPoints.split(" bis ")[0];
			
			// Link zu Pennerzone abgestimmt auf die Punkte zusammenbauen
			var PennerzoneLink = '<a href="' + PENNERZONESEARCH_URL1 + MinPoints + PENNERZONESEARCH_URL2 + '" target="_blank" title="Gegnersuche bei pennerzone.de"><b><font color="#FFFFFF">' + MinPoints +  '</font></b></a>';
			// Link in bisheriges HTML einbetten
			NewHTML = OldHTML.split(MinPoints)[0] + PennerzoneLink + OldHTML.split(MinPoints)[1];
			// HTML einfügen
			attacktable.getElementsByTagName("tr")[NrOfTRs - 1].innerHTML = NewHTML;
		
			// Wenn aktuell ein Angriff läuft
			if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Angriff läuft bereits auf") != -1) {
				// Name und UserID des Penners auslesen		
				var username = attacklink.innerHTML;
				var userid = attackspan.innerHTML.split('/id:')[1].split('/"')[0];
		
				// Info-Icons einfügen
				attackspan.innerHTML = attackspan.innerHTML + '&nbsp' + GetIconInsertHTML(userid, username, "");
	
				// Grafik für Posten in SB einfügen
				attackspan.innerHTML = attackspan.innerHTML + '&nbsp;<img border="0" src="' + ICON_SENDTOSB + '" title="Daten des Kampfes gegen ' + username + ' in die Shoutbox posten." height="14" width="14" style="cursor: pointer">';
				// Handler für das Posten in SB mit Grafik assoziieren
//				PostToSBHandler(attackspan.getElementsByTagName("img")[2], SBPOSTMODE_ACTIVE);
				PostToSBHandler2(attackspan.getElementsByTagName("img")[2], SBPOSTMODE_ACTIVE);
			}
		}
		
		// ***********************************************************************************************
		// Wenn die aktuelle Seite die Fightlog-Seite oder die Kampf-Sucheseite ist
		// ***********************************************************************************************
		if (location.toString().indexOf("/fightlog/") != -1) {
			// Referenz auf die Tabelle mit den abgeschlossenen Kämpfen speichern
			var firsttable = document.getElementsByTagName("table")[1];
			// Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
			ReformatFightlogTable(firsttable);
	
			// "Info"-Icon und -Link in die Tabelle schreiben
			InsertInfoInFirstTable(firsttable);
	
		// ***********************************************************************************************
			// Wenn die aktuelle Seite die Kampf-Suchseite ist
			// ***********************************************************************************************
			if (location.toString().indexOf("?q=") != -1) {
				HandleSearchpage();
			// ***********************************************************************************************
			// Wenn die aktuelle Seite die Fightlog-Seite ist
			// ***********************************************************************************************
			} else {
				// Wenn die aktuelle Seite die erste Fightlog-Seite ist
				if (Right$(location.toString(), 10) == '/fightlog/' || Right$(location.toString(), 12) == '/fightlog/1/') {
					// Submit-Button für Daten einfügen
					InsertSubmitButton(content, document.getElementsByTagName("table")[0]);
				}
			}

			// Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
			InsertAttackableInFirstTable(firsttable, true);

		// ***********************************************************************************************
		// sonst: die aktuelle Seite ist NICHT die Fightlog-Seite
		// ***********************************************************************************************
		} else {
			// Referenz auf die Tabelle mit den abgeschlossenen Kämpfen speichern
			var firsttable = document.getElementsByTagName("table")[1];
			// Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
			ReformatFirstTable(firsttable);
			// "Info"-Icon und -Link in die Tabelle schreiben
			InsertInfoInFirstTable(firsttable);
			
			// Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
			InsertAttackableInFirstTable(firsttable);
			
			// Referenz auf die Tabelle mit den eintreffenden Kämpfen speichern
			var secondtable = document.getElementsByTagName("table")[2];
			// Tabelle mit den eintreffenden Kämpfen neu formatieren und eine neue Spalte einfügen
			ReformatSecondTable(secondtable);
		
			// Array für Kampf-Infos initialisieren
			var IncomingFights = new Array();
		
			// Auslesen der Daten der einkommenden Kämpfe
			ReadFightData(secondtable, IncomingFights);
		
			// Eintreffende Kämpfe chronologisch sortieren (aufsteigend)
			IncomingFights.sort(sortByTime);
			
			// Zurückschreiben der sortierten eintreffenden Kämpfe in die Tabelle
			WriteFightData(secondtable, IncomingFights);
	
			// Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
			InsertAttackableInFirstTable(secondtable, true, true);

			// Schreiben der Anzahl eintreffender Kämpfe in die Zeilenüberschrift
			WriteNrOfIncomingFights(content, document.getElementsByTagName("table")[0]);
		}
	}