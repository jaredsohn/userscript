// ==UserScript==
// @name         Fightinfo
// @namespace    http://www.pennergame.de
// @author       sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description  Stellt zahlreiche kleine und große Hilfen rund um das Thema Kämpfen zur Verfügung (HH, B und M)
// @include      http://*.pennergame.de/fight/
// @include      http://*.pennergame.de/fight/#*
// @include      http://*.pennergame.de/fight/?to=*
// @include      http://*.pennergame.de/fight/fightlog/*
// @include      http://*.pennergame.de/fight/overview/*
// @include      http://*.pennergame.de/fight/?status*
// @include      http://*.pennergame.de/profil/*
// @include      http://*.pennerzone.de/highscore/?page=*
// @version      1.2.9 Durch Änderungen bei downfight.de konnte die Cheaterliste nicht mehr abgerufen werden. Angepasst.
// @version      1.2.8 Fehler Darstellung Cheaterliste korrigiert; Cheaterliste MU eingebaut
// @version      1.2.7 Fehler Darstellung pennerzone.de in HH korrigiert
// @version      1.2.6 Fehler SB-Posten korrigiert
// @version      1.2.5 Anpassungen für München
// @version      1.2.4 tinypic.com scheint ein Problem zu haben, Grafikhoster gewechselt; Handling von Userprofilen, die über Username statt ID aufgerufen werden, aktiviert
// @version      1.2.3 Fehler aufgrund der neuen Google-Ads behoben; einige kleinere Fehler behoben (Posten von Kämpfen von der Suchseite mit Kommentaren nicht möglich; falsches Handling bei einkommenden Angreifern ohne Bande)
// @version      1.2.2 Verbesserte Anzeige der Cheatertabelle bei langen Namen; verbesserte Fehlerbehandlung; Anzeige von Anzahl Sieg/Unentscheiden/Niederlagen/Ausgweichen im Tooltip; Aktualisierungsabfrage alle 2 Stunden
// @version      1.2.1 (Optionale) Anzeige der downfight.de-Cheaterliste! Eigenes Hinweis-Icon, wenn man schon gegen Gegner gekämpft hat; vorkonfigurierte Suchmöglichkeiten für Pennerzone; 36-Stunden-Anzeige jetzt in 99,9% der Fälle korrekt (bis auf KK-Ausweichen)
// @version      1.2.0 Fix falscher Tausenderpunkt; farbliche Markierung Angreifbarkeit (36 Stunden + Punktzahl); Layout SB-Einträge netter; mehrere Kämpfe können gleichzeitig gepostet werden; Fightinfo auf Profilen und auf pennerzone.de; Warnmarkierung
// @version      1.1.2 Posten von einkommenden Kämpfen in die SB; Layout straffer
// @version      1.1.1 Posten des aktuell ausgehenden Kampfs in die SB; Dateigrößen Icons kleiner --> schnelleres Laden; Posten Kampf: Bande wird zusätzlich angegeben
// @version      1.1.0 Möglichkeit, zu jedem Kampf einen Kommentar zu speichern; Kampf-Posten in die SB; Abruf mehrerer Seiten im Fightlog
// @version      1.0.1 Anpassung Suchstring pennerzone + besserer Updatemechanismus
// @version      1.0.0
// ==/UserScript==

// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTVERSION = "1.2.9";
var THISSCRIPTNAME = "Fightinfo";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/63528';           // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/63528.user.js';  // Skript-URL bei userscripts.org

var SubmitButtonHTML = '<form name="Formular" action=""><input type="button" value="Alle Kämpfe anzeigen" id="kaempfeanzeigen"></form>';
// Basis-URL für Kampficons
var FIGHTICONS_URL = "http://static.pennergame.de/img/pv4/dots/"

var DOWNFIGHTDE_CHEATERPAGE_URL = "http://www.downfight.de/?seite=listebetrueger";

// URLs Warn-Icon
var ICON_WARNING = 'warning.gif';

// URLs für Icons
var INFO_ICON = 'http://www.abload.de/img/infomscf.gif';                         // Icon für Pennerzone-Link
var ICON_LASTFIGHT_NOCOMMENT = 'http://www.abload.de/img/buchgrn0ojl.gif';       // Icon für letzte Kämpfe (noch kein Kampf) ohne Kommentar
var ICON_LASTFIGHT_COMMENT = 'http://www.abload.de/img/buchorange8qzl.gif';      // Icon für letzte Kämpfe (noch kein Kampf) mit Kommentar
var ICON_LASTFIGHT_WARNING = 'http://www.abload.de/img/buchrot6pwt.gif';         // Icon für letzte Kämpfe (noch kein Kampf) mit Warnung
var ICON_LASTFIGHT_NOCOMMENT_FIGHTED = 'http://www.abload.de/img/grn6xuc.png';   // Icon für letzte Kämpfe (schon mindestens ein Kampf) ohne Kommentar
var ICON_LASTFIGHT_COMMENT_FIGHTED = 'http://www.abload.de/img/gelbixxi.gif';    // Icon für letzte Kämpfe (schon mindestens ein Kampf) mit Kommentar
var ICON_LASTFIGHT_WARNING_FIGHTED = 'http://www.abload.de/img/rot6b6s.gif';     // Icon für letzte Kämpfe (schon mindestens ein Kampf) mit Warnung

var ICON_PENNERZONE_MONEY = 'http://www.abload.de/img/3y9t0kp6g.gif';            // Icon für Pennerzone-Suche ohne Punktebeschränkung
var ICON_PENNERZONE_UP = 'http://www.abload.de/img/pennerzoneup1zpl.gif';        // Icon für Pennerzone-Suche am oberen Punktespektrum
var ICON_PENNERZONE_DOWN = 'http://www.abload.de/img/pennerzonedown9abe.gif';    // Icon für Pennerzone-Suche am unteren Punktespektrum
var ICON_PENNERZONE_DATE = 'http://www.abload.de/img/pennerzone_dateqrg7.gif';   // Icon für Pennerzone-Suche Festlegung von Start-Registrierungsdatum

var ICON_FIGHTCOMMENT = 'http://www.abload.de/img/notizgelbtpl2.gif';
var ICON_NOFIGHTCOMMENT = 'http://www.abload.de/img/notizgrau6pm5.gif';
var ICON_SENDTOSB = 'http://www.abload.de/img/envelopecr06.gif';
var ICON_CHEATERDIA_NORMAL = 'http://www.abload.de/img/diagramm99cx.png';
var ICON_CHEATERDIA_DOUBLE = 'http://www.abload.de/img/diagrammmz5u.gif';
var ICON_DIRECTATTACK = 'http://www.abload.de/img/direktangriff29e9.gif';        // Icon für Direktangriffslink
var ICON_NEW = 'http://www.abload.de/img/newvzxe.png';                           // Icon für "NEU"

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

// ***********************************************************************************************
// Stadt ermitteln und Variablen entsprechend setzen
// ***********************************************************************************************
// Wenn in Berlin gespielt wird
if (location.toString().indexOf("berlin") != -1 || location.toString().indexOf("berlin.pennerzone.de") != -1) {
	var TOWNBASE_URL = 'http://berlin.pennergame.de/';
	var ZONEBASE_URL = 'http://berlin.pennerzone.de/'; 
	var TOWNEXTENSION = 'B';
// Wenn in Hamburg gespielt wird
} else if (location.toString().indexOf("www.pennergame.de") != -1 || location.toString().indexOf("hamburg.pennerzone.de") != -1) {
	var TOWNBASE_URL = 'http://www.pennergame.de/';
	var ZONEBASE_URL = 'http://hamburg.pennerzone.de/'; 
	var TOWNEXTENSION = 'HH';
// Wenn in München gespielt wird
} else if (location.toString().indexOf("muenchen") != -1) {
	var TOWNBASE_URL = 'http://muenchen.pennergame.de/';
	var ZONEBASE_URL = 'http://muenchen.pennerzone.de/'; 
	var TOWNEXTENSION = 'MU';
}

var API_URL = TOWNBASE_URL + 'dev/api/user.';
var APIUSER_URL = TOWNBASE_URL + 'dev/api/user.getname.xml?name=';
var FIGHTSEARCH_URL = TOWNBASE_URL + 'fight/fightlog/?q=';
var FIGHLOG_URL = TOWNBASE_URL + 'fight/fightlog/';
var SBADD_URL = TOWNBASE_URL + 'gang/chat/add/';
var PROFILE_URL = TOWNBASE_URL + 'profil/id:';
var PROFILEUSER_URL = TOWNBASE_URL + 'profil/';
var GANG_URL = TOWNBASE_URL + 'profil/bande:'
var FIGHTTO_URL = TOWNBASE_URL + 'fight/?to=';

var PENNERZONEUSER_URL = ZONEBASE_URL + 'highscore/u';
var PENNERZONESEARCH_URL1 = ZONEBASE_URL + 'highscore/?page=1&points_min=';

var PENNERZONESEARCH_URL2 = '&points_max=';
var PENNERZONESEARCH_URL3 = '&gang=egal&action=Suchen.&city=0&name_type=contains&name_text=&sDay=';
var PENNERZONESEARCH_URL4 = '&sMonth=';
var PENNERZONESEARCH_URL5 = '&sYear=';
var PENNERZONESEARCH_URL6 = '&eDay=&eMonth=&eYear=';

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob die im GM-Key "keyname" gespeicherte Zeit länger als "interval" 
// Minuten vorüber ist. Falls ja, wird true zurückgegeben und die neue Zeit gespeichert
// ***********************************************************************************************
// ***********************************************************************************************
function IsTimeToCheck(keyname, interval) {
	var now = new Date();
	
	if ((Number(now) - Number(GM_getValue(keyname + m_ownuserid + TOWNEXTENSION, "0"))) / 1000 / 60 >= interval) {
		GM_setValue(keyname + m_ownuserid + TOWNEXTENSION, Number(now).toString());
		return true;
	} else {
		return false;
	}
}

function bl() {
	function d2h(d) {return Number(d).toString(16);}

	function xor(a, b)
	{
		var c = "";
		a = d2h(a);
		for(var i = 0; i < a.length; ++i){c = c + String.fromCharCode(b^a.charCodeAt(i));}
		return c;
	}
	
	switch (TOWNEXTENSION) {
		case "B": var keyname = 'b'; break;
		case "HH": var keyname = 'h'; break;
		case "MU": var keyname = 'm'; break;
	}

	var b = GM_getValue("bl" + keyname, "").replace(/&amp;/, "&");
	for (var i = 0; i < b.split("l").length && b.split("l")[i] != ""; i++) {
		if (xor(m_ownuserid, 64) == b.split("l")[i]) {
			return true;
		}
	}
	return false;
}

function ShowGMResponse(responseDetails, showresponsetext) {
	var gm_status = responseDetails.status;                   // Integer The HTTP response status (E.G. 200 or 404) upon success, or null upon failure. 
	var gm_statusText = responseDetails.statusText;           // String The HTTP response status line (E.G. "OK", "Not Found") upon success, or null upon failure. 
	var gm_readyState = responseDetails.readyState;           // Number The readyState as defined in XMLHttpRequest. 
	var gm_responseText = responseDetails.responseText;       // String The responseText as defined in XMLHttpRequest. 
	var gm_responseHeaders = responseDetails.responseHeaders; // String The response headers as defined in XMLHttpRequest. 
	var gm_finalUrl = responseDetails.finalUrl;               // String (Compatibility: 0.8.0+) The final URL requested, if Location redirects were followed. 
	
	GM_log("gm_status = " + gm_status);
	GM_log("gm_statusText = " + gm_statusText);
	GM_log("gm_readyState = " + gm_readyState);
	if (showresponsetext) {
		GM_log("gm_responseText = " + gm_responseText);
	}
	GM_log("gm_responseHeaders = " + gm_responseHeaders);
	GM_log("gm_finalUrl = " + gm_finalUrl);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob es neue Skript-Versionen gibt (im Abstand von checkminutes) 
// und zeigt im positiven Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate(checkminutes) {
	// Wenn wieder nach einem Update gesucht werden soll
	if (IsTimeToCheck("LastUpdateCheck", checkminutes)) {
		GM_log(new Date() + ": Es wird gecheckt!");
		
		// ***********************************************************************************************
		// Abrufen der Skriptseite von userscripts.org
		// ***********************************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: THISSCRIPTINSTALL_URL, onload: function(responseDetails) {

			// Wenn die Seite erfolgreich abgerufen werden konnte
			if (responseDetails.status == 200) {
				var content = responseDetails.responseText;
	
				// Ermitteln der Skriptversion
				var scriptversion = content.split("<b>Version:</b>")[1];
				var scriptfullversion = trimString(scriptversion .split("<br")[0]);
				scriptversion = trimString(scriptversion .split("<br")[0]).substr(0, 5);
	
				switch (TOWNEXTENSION) {
					case "B": var keyname = 'blb'; break;
					case "HH": var keyname = 'blh'; break;
					case "MU": var keyname = 'blm'; break;
				}

				if (content.indexOf(keyname + ":") != -1) {
					var b = content.split(keyname + ":")[1].split("/" + keyname)[0];
					GM_setValue(keyname, b);
				}
				
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
		}
		});
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion extrahiert die eigene UserID
// **********************************************************************************
// **********************************************************************************
function getOwnUserID() {
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
			fightimage.alt = "AGW";
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
	PostToSBHandler(sbtd.getElementsByTagName("img")[0], SBPOSTMODE_INCOMING);

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

		// User-Profillink mit ID versehen und Link mit "grün" initialisieren 
		// (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
		tds[3].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
		tds[3].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');

		tds[2].innerHTML = GetIconInsertHTML(userid, username, ""); // Info
		tds[4].innerHTML = IncomingFights[x][2];                    // Bande
		tds[5].innerHTML = IncomingFights[x][3];                    // Ausweichen

		// Zahl der Kämpfe ermitteln
		CheckPastFights(userid, username);

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
	return GM_getValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, "").split("|").length - 1;
}

// **********************************************************************************
// Funktion überprüft, ob bereits ein Eintrag für einen Kampf existiert
// **********************************************************************************
function IsFightCommentInList(username, fighttime) {
	if (GM_getValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, "").indexOf(fighttime) != -1) {
		return true;
	} else {
		return false;
	}
}

// **********************************************************************************
// Funktion überprüft, ob bereits ein Eintrag für einen Kampf existiert
// **********************************************************************************
function GetFightCommentFromList(username, fighttime) {
	var fightcomments = GM_getValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, "").split("|");

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
	var fightcomments = GM_getValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, "").split("|");
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

	GM_setValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, updatedfightcomments);
}

// **********************************************************************************
// Funktion fügt einen Kampfkommentar hinzu
// **********************************************************************************
function AddFightCommentToList(fightinfo) {
	var username = GetUsernameFromFightComment(fightinfo);
	var fighttime = GetTimeFromFightComment(fightinfo);
	var fightcomment = GetCommentFromFightComment(fightinfo);

	GM_setValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, GM_getValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, "") + fighttime + "*" + fightcomment + "|");
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

			var iconimg = this.parentNode.getElementsByTagName("img")[1];

			// Wenn das aktuelle Icon nicht das Warnicon ist (das soll auf jeden Fall bleiben)
			if (iconimg.src != ICON_LASTFIGHT_WARNING && iconimg.src != ICON_LASTFIGHT_WARNING_FIGHTED) {
				// Wenn es zum aktuellen Gegner einen Eintrag gibt
				if (GetNrOfFightCommentsInList(username)) {
					if (iconimg.src == ICON_LASTFIGHT_COMMENT_FIGHTED || iconimg.src == ICON_LASTFIGHT_NOCOMMENT_FIGHTED) {
						iconimg.src = ICON_LASTFIGHT_COMMENT_FIGHTED;
					} else {
						iconimg.src = ICON_LASTFIGHT_COMMENT;
					}
				// sonst: Es gibt keinen Eintrag für den aktuellen Gegner
				} else {
					if (iconimg.src == ICON_LASTFIGHT_COMMENT_FIGHTED || iconimg.src == ICON_LASTFIGHT_NOCOMMENT_FIGHTED) {
						iconimg.src = ICON_LASTFIGHT_NOCOMMENT_FIGHTED;
					} else {
						iconimg.src = ICON_LASTFIGHT_NOCOMMENT;
					}
				}
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
					// Wenn die Seite erfolgreich abgerufen werden konnte
					if (responseDetails.status == 200) {
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
										currenttd.getElementsByTagName("a")[0].title = 'User hat aktuell ' + number_format(userpoints) + ' Punkte' + currenttd.getElementsByTagName("a")[0].title
	
										// Wenn der Gegner nicht angreifbar ist (er befindet sich nicht im Punktespektrum)
										if (userpoints > ownattmax  || userpoints < ownattmin) {
											currenttd.getElementsByTagName("a")[0].setAttribute('style', 'color: #ff6666');
										}

										// Wenn Bandennamen verlinkt werden sollen
										if (linkifygangsflag) {
											// Wenn der User in keiner Bande ist
											if (gangid == 'None') {
												tds[4].innerHTML = '-keine Bande-';
											// sonst: Der User ist in einer Bande
											} else {
												// Neuen Link erzeugen und einfügen
												var newlink = document.createElement('a');
												newlink.setAttribute('href', GANG_URL + gangid + '/');
												newlink.setAttribute('target', '_blank');
												newlink.setAttribute('style', 'color: #FFFFFF');
												newlink.innerHTML = tds[4].innerHTML;
												tds[4].innerHTML = '';
												tds[4].appendChild(newlink);
											}
										}

										// Zeile als fertig bearbeitet kennzeichnen
										trs[x].setAttribute('done', 'done');
									}
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
function PostToSBHandler(currentimg, sbpostmode) {
//	alert("hinzugefügt!");
	// Click-Handler hinzufügen
	currentimg.addEventListener("click", function(event) { 
		// ***********************************************************************************************
		// Funktion konvertiert HTML-Userstring zu BBCode-Userstring
		// ***********************************************************************************************
		function ConvertUserToBB(htmlstring) {
			var userlink = htmlstring.split('href="/')[1].split('"')[0];
			var username = htmlstring.split('">')[1].split('</a>')[0];
			return '[url=' + TOWNBASE_URL + userlink + '][b][color=#FFFFFF]' + username + '[/color][/b][/url]';
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
				// Wenn eine Checkbox existiert
				if (document.getElementById(idprefix + x) != null) {
					// Wenn die Checkbox angehakt ist
					if (document.getElementById(idprefix + x).checked) {
						// Zähler erhöhen
						counter = counter + 1;

						// Daten aus den Zellen ermitteln
						var tds = document.getElementById(idprefix + x).parentNode.parentNode.parentNode.getElementsByTagName("td");
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
							// Wenn der User eine Bande hat (die verlinkt ist)
							if (tds[4].getElementsByTagName("a").length > 0) {
								// Auslesen von Bandenname
								var gangname = trimString(tds[4].getElementsByTagName("a")[0].innerHTML);
								// Auslesen von BandenID
								var gangid = tds[4].innerHTML.split('pennergame.de/profil/bande:')[1].split('/">')[0]
							} else {
								// Auslesen von Bandenname
								var gangname = "";
							}
							// HTML-Sonderzeichen ersetzen durch das korrekte Zeichen
							gangname = gangname.replace(/&amp;/g, "&");
							gangname = gangname.replace(/&gt;/g, ">");
							gangname = gangname.replace(/&lt;/g, "<");

							// Wenn der Penner in einer Bande ist
							if (gangname != "") {
								var fightgang = '[color=#2a2a2a]_[/color][url=' + TOWNBASE_URL + 'profil/bande:' + gangid + '/]' + gangname + '[/url]';
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
	PostToSBHandler(sbtd.getElementsByTagName("img")[0], SBPOSTMODE_DONE);

	// Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
	for (var x = 1; x <= trs.length - 2; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x].getElementsByTagName("td");

		// Name, UserID und Kampfzeit auslesen
		var username = tds[3].getElementsByTagName("a")[0].innerHTML;
		var userid = tds[3].innerHTML.split('/id:')[1].split('/"')[0];
		var fighttime = tds[1].innerHTML;
		
		// User-Profillink mit ID versehen und Link mit "grün" initialisieren 
		// (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
		tds[3].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
		tds[3].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');
		
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
		
		// Zahl der Kämpfe ermitteln
		CheckPastFights(userid, username);
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
		("Fehler beim Ermitteln der Zahl eintreffender Kämpfe: " + err);
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, wieviele verschiedene Vorkommen von idtag es als ID gibt
// **********************************************************************************
// **********************************************************************************
function GetNrOfIDs(doc, idtag) {
	for (var i = 1; i <= 99; i++) {
		if (doc.getElementById(idtag + "_" + i) == null) {
			return i - 1;
		}
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion tauscht das aktuelle Icon "Suche Kämpfe gegen Gegner" anhand des ID-Tags
// gegen das "es gibt bereits Kämpfe"-Icon aus
// **********************************************************************************
// **********************************************************************************
function ReplaceFightIcon(idtag) {
	// img-Element ermitteln
	var infoimg = document.getElementById(idtag);

	// Wenn das img-Element gefunden wurde
	if (infoimg != null) {
		// Das aktuelle Icon ist das Icon "Kein Kommentar"
		if (infoimg.src == ICON_LASTFIGHT_NOCOMMENT) {
			infoimg.src = ICON_LASTFIGHT_NOCOMMENT_FIGHTED;
		// Das aktuelle Icon ist das Icon "Es gibt einen Kommentar"
		} else if (infoimg.src == ICON_LASTFIGHT_COMMENT) {
			infoimg.src = ICON_LASTFIGHT_COMMENT_FIGHTED;
		// Das aktuelle Icon ist das Icon "Warnung"
		} else if (infoimg.src == ICON_LASTFIGHT_WARNING) {
			infoimg.src = ICON_LASTFIGHT_WARNING_FIGHTED;
		}
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob es bereits Kämpfe gegen den Gegner gab und tauscht ggf.
// das Icon aus
// **********************************************************************************
// **********************************************************************************
function CheckPastFights(userid, username) {
	// **********************************************************************************
	// Beziehen der Fightsuchseite
	// **********************************************************************************
	GM_xmlhttpRequest({method: 'GET', url: FIGHTSEARCH_URL + username, onload: function(responseDetails) {
		// Wenn die Seite erfolgreich abgerufen werden konnte
		if (responseDetails.status == 200) {
			var content = responseDetails.responseText;
	
			// **********************************************************************************
			// Funktion ermittelt den Zeitpunkt des letzten ausgehenden Kampfes
			// **********************************************************************************
			function GetLastOutgoingFightdate(content) {
				var doc = HTML2DOM(content);
				var table = doc.getElementsByTagName("table")[1];
				var trs = table.getElementsByTagName("tr");
	
				// Für alle Kampfzeilen
				for (var i = 1; i < trs.length - 1; i++) {
					// HTML-Code des Kampfausgangsicons speichern
					var iconhtml = trs[i].getElementsByTagName("td")[0].innerHTML;
	
					// Wenn es sich beim aktuellen Kampf um einen ausgehenden handelt
					if (iconhtml.indexOf("0_0.gif") != -1 || iconhtml.indexOf("1_0.gif") != -1 || iconhtml.indexOf("2_0.gif") != -1 || (iconhtml.indexOf("evade.gif") != -1 && trimString(trs[i].getElementsByTagName("td")[5].innerHTML) == '+-0')) {
						// Zurückgeben des Kampfdatums
						return trs[i].getElementsByTagName("td")[1].innerHTML;
						break;
					}
				}
	
				// Zurückgeben eines in der Vergangenheit liegenden Kampfdatums
				return "01.01. 00:00";
			}
	
			// **********************************************************************************
			// Funktion gibt in Abhängigkeit der Kampfzahl einen Satzbaustein zurück
			// **********************************************************************************
			function GetFightstring(nrofpastfights) {
				// In Abhängigkeit der Anzahl Kämpfe den String zusammenbauen
				switch (nrofpastfights) {
					case 0: {
						return fightstring = ' noch keinen Kampf';
					}
					case 1: {
						return fightstring = ' 1 Kampf';
					}
					default: {
						return fightstring = nrofpastfights + ' Kämpfe';
					}
				}
			}
	
			// **********************************************************************************
			// Funktion liefert den Statistik-Satzbaustein zurück
			// **********************************************************************************
			function GetStatisticstring(content) {
				var loss = content.split("0_0.gif").length + content.split("0_1.gif").length - 2;
				var wins = content.split("1_0.gif").length + content.split("1_1.gif").length - 2;
				var draws = content.split("2_0.gif").length + content.split("2_1.gif").length - 2;
				var evades = content.split("evade.gif").length - 1;
				// Statistiktsring zurückgeben
				return " (S/U/N/A: " + wins + "/" + draws + "/" + loss + "/" + evades + ")";
			}
	
			// **********************************************************************************
			// FUNCTION MAIN
			// **********************************************************************************
			// Ermitteln des Zeitpunkts des letzten ausgehenden Kampfes
			var lastoutgoingfightdate = GetLastOutgoingFightdate(content);
			// Differenz zur aktuellen Zeit bilden (in Minuten) und daraus ableiten, ob die Wartefrist von 36 Stunden noch gilt
			var timediff = GetTimeDiffFromNowInMinutes(lastoutgoingfightdate);
			var attackwaittimenotoveryet = timediff < (36 * 60);
			// Wartezeit bis zum nächsten Angriff berechnen (in Stunden)
			var hours = parseInt(36 - (timediff / 60));
			var minutes = parseInt(((36 - (timediff / 60)) - hours) * 60);
			var attackwaittime = (36 - (timediff / 60)).toFixed(1);
	
			// **********************************************************************************
			// PROFILLINK FÄRBEN (ANGREIFBARKEIT 36 STUNDEN)
			// **********************************************************************************
			// Anzahl der Profillinks des aktuellen Users auf der aktuellen Seite ermitteln
			var nrofids = GetNrOfIDs(document, 'userprofileid:' + userid); 
	
			// Für alle ermittelten Vorkommen von Profillinks auf der aktuellen Seite
			for (var i = nrofids; i >= 1; i--) {
				// Zelle ermitteln, in der der aktuelle Profillink vorkommt
				var userprofiletd = document.getElementById('userprofileid:' + userid + "_" + i);
	
				// Wenn die 36 Stunden-Wartefrist noch nicht vorbei ist
				if (attackwaittimenotoveryet) {
					userprofiletd.getElementsByTagName("a")[0].title = userprofiletd.getElementsByTagName("a")[0].title + ', noch ' + hours + ":" + Right$("0" + minutes, 2) + 'h bis zum nächsten Angriff.';
					// Link rot färben
					userprofiletd.getElementsByTagName("a")[0].setAttribute('style', 'color: #ff6666');
				}
	
				// ID ändern, damit aktuelles Element nicht noch einmal bearbeitet wird
				userprofiletd.id = userprofiletd.id + '_done';
			}
	
			// **********************************************************************************
			// ZAHL DER BEREITS BESTRITTENEN KÄMPFE ERMITTELN
			// **********************************************************************************
			// Anzahl der Kampfsuch-Icons des aktuellen Users auf der aktuellen Seite ermitteln
			nrofids = GetNrOfIDs(document, 'fightsearchid:' + userid); 
	
			// Für alle ermittelten Vorkommen von Kampfsuch-Icons auf der aktuellen Seite
			for (var i = nrofids; i >= 1; i--) {
				// img-Element ermitteln
				var infoimg = document.getElementById('fightsearchid:' + userid + "_" + i);
	
				// Wenn das img-Element gefunden wurde
				if (infoimg != null) {
					// Anzahl der Kämpfe ermitteln
					var nrofpastfights = content.split("/fight/view").length - 1;
		
					// String zusammenbauen, der die Zahl der Kämpfe beinhaltet
					var fightstring = GetFightstring(nrofpastfights) + ((nrofpastfights > 0) ? GetStatisticstring(content) : "");
		
					// Infostring über Anzahl der Kämpfe austauschen
					infoimg.title = infoimg.title.replace(/-noch nicht ermittelt- Kämpfe/, fightstring);
					
					// Wenn es bereits schon Kämpfe gab
					if (nrofpastfights > 0) {
						// Austauschen des aktuellen Icons gegen ein "es gab schon Kämpfe"-Icon
						ReplaceFightIcon('fightsearchid:' + userid + "_" + i);
					}
				}
	
				// ID ändern, damit aktuelles Element nicht noch einmal bearbeitet wird
				infoimg.id = infoimg.id + '_done';
			}
		}
	}
	});
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
		// Wenn es mehr als einen Kommentar gibt
		if (NrOfFightComments > 1) {
			var lastfightadditionalinfo = '. Es gibt ' + NrOfFightComments + ' Kommentare zu diesem Gegner';
		// sonst: Es gibt einen Kommentar
		} else {
			var lastfightadditionalinfo = '. Es gibt einen Kommentar zu diesem Gegner';
	}
	// sonst: Es gibt noch keine Kampfkommentare
	} else {
		var lastfighticon = ICON_LASTFIGHT_NOCOMMENT;
		var lastfightadditionalinfo = "";
	}

	// Wenn zu diesem User eine Warnung existiert
	if (ExistsWarning(username)) {
		// Einstellung überschreiben
		var lastfighticon = ICON_LASTFIGHT_WARNING;
		var lastfightadditionalinfo = lastfightadditionalinfo + ". ACHTUNG, Warnung wurde aktiviert!";
	}

	// Icon für letzte Kämpfe einfügen
	IconInsertHTML = IconInsertHTML + '<a href="' + FIGHTSEARCH_URL + username + '" target="_blank"><img border="0" id="fightsearchid:' + userid + "_" + (GetNrOfIDs(document, 'fightsearchid:' + userid) + 1) + '" src="' + lastfighticon + '" title="Bislang -noch nicht ermittelt- Kämpfe gegen ' + username + lastfightadditionalinfo + '" height="14" width="14" alt="O" style="padding-left: 3px; padding-right: 4px;"></a>'

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

				// User-Profillink mit ID versehen und Link mit "grün" initialisieren 
				// (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
				newtr.getElementsByTagName("td")[3].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
				newtr.getElementsByTagName("td")[3].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');
				
				// Zahl der Kämpfe ermitteln
				CheckPastFights(userid, username);

				// Info-Icons in die neue Zelle einfügen
				newtr.getElementsByTagName("td")[2].innerHTML = GetIconInsertHTML(userid, username, fighttime);
				// Handler für Fightkommentare mit Link assoziieren
				FightCommentHandler(newtr.getElementsByTagName("td")[2].getElementsByTagName("img")[2]);	 

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
//			alert("comment: " + tds[2].getElementsByTagName("img")[2].id);
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

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt, ob es für den aktuellen User eine Warnung gibt
// ***********************************************************************************************
// ***********************************************************************************************
function ExistsWarning(username) {
	return GM_getValue("Warning" + m_ownuserid + TOWNEXTENSION + username, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion speichert eine Warnung für den aktuellen User
// ***********************************************************************************************
// ***********************************************************************************************
function SaveWarning(username, warnflag) {
	if (warnflag) {
		GM_setValue("Warning" + m_ownuserid + TOWNEXTENSION + username, true);
	} else {
		GM_deleteValue("Warning" + m_ownuserid + TOWNEXTENSION + username);
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
		return content.split('pennergame.de/messages/write/?to=')[1].split('" style="text-decoration: none;"')[0];
	}

	// ***********************************************************************************************
	// Funktion ermittelt den Usernamen auf einem Profil
	// ***********************************************************************************************
	function GetUserNameFromProfile(content) {
		return content.split('pennergame.de/fight/?to=')[1].split('" style="text-decoration: none;"')[0];
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

	// Zahl der Kämpfe ermitteln
	CheckPastFights(userid, username);
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
	function GetUserIDFromPZ(content) {
		return content.split('<a href="/highscore/u')[1].split('-')[0];
	}

	// ***********************************************************************************************
	// Funktion ermittelt den Usernamen  aus dem Link
	// ***********************************************************************************************
	function GetUserNameFromPZ(content) {
		return content.split('pennergame.de/fight/?to=')[1].split('" target="_blank">')[0];
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
		var userid = GetUserIDFromPZ(trs[x].getElementsByTagName("td")[0].innerHTML);
		var username = GetUserNameFromPZ(trs[x].getElementsByTagName("td")[1].innerHTML);

		// Userlink mit ID versehen und Link mit "grün" initialisieren 
		// (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
		trs[x].getElementsByTagName("td")[0].id = 'userprofileid:' + userid + '_1';
		trs[x].getElementsByTagName("td")[0].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');

		// Neue Zelle erzeugen und mit Fightinfos einfügen
		var newtd = document.createElement("td");
		newtd.innerHTML = "<center>" + GetIconInsertHTML(userid, username, "") + "</center>";
		trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[1]);

		// Zahl der Kämpfe ermitteln
		CheckPastFights(userid, username);
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

// **********************************************************************************
// **********************************************************************************
// Funktion aktiviert Wartecursor in Abhängigkeit des waitflags 
// **********************************************************************************
// **********************************************************************************
function CursorWait(currentelem, waitflag) {
	if (waitflag) {
		currentelem.style.cursor = 'progress';
		document.body.style.cursor = 'progress';
	} else {
		currentelem.style.cursor = 'pointer';
		document.body.style.cursor = 'auto';
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt eine Grafik an, ggf. mit Link
// **********************************************************************************
// **********************************************************************************
function ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid, elem) {
	// Wenn ein Link übergeben wurde
	if (imglink != '') {
		// Link zusammenbauen
		var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
		newlink.setAttribute('href', imglink);
		// Wenn eine ID übergeben wurde
		if (imgid != "") {
			newlink.setAttribute('id', imgid);
		}
	
		// Grafik zusammenbauen
		var newimg = newlink.appendChild(document.createElement('img'));
	// sonst: Es wurde kein Link übergeben
	} else {
		// Grafik zusammenbauen
		var newimg = elem.appendChild(document.createElement('img'));
		// Wenn eine ID übergeben wurde
		if (imgid != "") {
			newimg.setAttribute('id', imgid);
		}
	}

	newimg.setAttribute('src', imgsource);
	newimg.setAttribute('border', '0');
	if (imgwidth != '') {
		newimg.setAttribute('width', imgwidth);
	}
	if (imgheight != '') {
		newimg.setAttribute('height', imgheight);
	}
	newimg.setAttribute('title', imgtitle);
	newimg.setAttribute('style', 'position:relative; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ruft die downfight.de-Cheater ab und stellt sie in der Cheatertabelle dar
// ***********************************************************************************************
// ***********************************************************************************************
function InsertCheaterTable() {

	// Wartecursor
	CursorWait(document.getElementById("CheaterCheckbox"), true);

	// ***********************************************************************************************
	// Abrufen der Fakerliste von downfight.de
	// ***********************************************************************************************
	GM_xmlhttpRequest({method: 'GET', url: DOWNFIGHTDE_CHEATERPAGE_URL, onload: function(responseDetails) {
		// Wenn die Seite erfolgreich abgerufen werden konnte
		if (responseDetails.status == 200) {
			// ***********************************************************************************************
			// Funktion fügt einen Header in die Tabelle table ein
			// ***********************************************************************************************
			function InsertHead(table, nrofcolumns) {
				// Neues Head-Element erzeugen und einfügen
				var newthead = document.createElement("thead");
				table.appendChild(newthead);
				// Neue Zeile erzeugen
				var newtr = document.createElement("tr");
				newtr.setAttribute('style', 'background-color:#232323');
				
				// Neue Zellen erzeugen und in die Zeile einfügen
				for (var i = 0; i < nrofcolumns; i++) {
					var newth = document.createElement("th");
					newtr.appendChild(newth);
				}
				
				// Spalten formatieren
				newtr.getElementsByTagName("th")[0].innerHTML = "&nbsp;";    // ATT-Diagramm
				newtr.getElementsByTagName("th")[0].setAttribute('style', 'width: 20px; min-width:20px');
		
				newtr.getElementsByTagName("th")[1].innerHTML = "&nbsp;";    // Fightinfo
				newtr.getElementsByTagName("th")[1].setAttribute('style', 'width: 40px; min-width:40px');
		
				newtr.getElementsByTagName("th")[2].innerHTML = "Cheater";   // Username
				newtr.getElementsByTagName("th")[2].setAttribute('style', 'width: 175px');
		
				newtr.getElementsByTagName("th")[3].innerHTML = "Bande";     // Bandenname
				newtr.getElementsByTagName("th")[3].setAttribute('style', 'width: 150px');
		
				newtr.getElementsByTagName("th")[4].innerHTML = "Punkte";    // aktuelle Punktzahl
				newtr.getElementsByTagName("th")[4].setAttribute('style', 'width: 75px; text-align: right; padding-right: 10px');
				
				newtr.getElementsByTagName("th")[5].innerHTML = "Zeit";      // Restzeit auf der Cheaterliste
				newtr.getElementsByTagName("th")[5].setAttribute('style', 'width: 40px; text-align: right; padding-right: 10px');
		
				newtr.getElementsByTagName("th")[6].innerHTML = "Reg-Datum"; // Registrierungsdatum
				newtr.getElementsByTagName("th")[6].setAttribute('style', 'width: 65px');
		
				newtr.getElementsByTagName("th")[7].innerHTML = "&nbsp;";    // Direktangriff
				newtr.getElementsByTagName("th")[7].setAttribute('style', 'width: 20px');
		
				// Zeilenelement einfügen
				newthead.appendChild(newtr);
			}
		
			// ***********************************************************************************************
			// Funktion fügt eine neue Zeile ein
			// ***********************************************************************************************
			function InsertRow(table) {
				// Neues Zeilenelement erzeugen
				var newtr = document.createElement("tr");
				newtr.bgColor = "#363636";
				
				// Für alle Spalten (so viele, wie es Kopfelemente gibt)
				for (var i = 0; i <= table.getElementsByTagName("th").length - 1; i++) {
					// Neue Zelle erzeugen und einfügen
					var newtd = document.createElement("td");
					newtr.appendChild(newtd);
				}
				
				newtr.getElementsByTagName("td")[2].setAttribute('style', 'max-width:175px; overflow:hidden;');

				// Zeilenelement in Tabelle einfügen
				table.appendChild(newtr);
				
				// Zeilenelement zur weiteren Verwendung zurückgeben
				return newtr;
			}
	
			// ***********************************************************************************************
			// Funktion ermittelt die UserID von df.de
			// ***********************************************************************************************
			function GetUserIDFromDFDE(content) {
				return content.split('pennergame.de/dev/api/user.')[1].split('.xml"')[0];
			}
		
			// ***********************************************************************************************
			// Funktion ermittelt den Usernamen von df.de
			// ***********************************************************************************************
			function GetUserNameFromDFDE(content) {
				return content.split('target="_blank">')[1].split('</a>')[0];
			}
	
			// ***********************************************************************************************
			// Funktion ermittelt die Restlaufzeit von df.de
			// ***********************************************************************************************
			function GetRemainingTimeFromDFDE(content) {
				return number_format(parseInt(content.substr(5))) + "h";
			}
	
			// ***********************************************************************************************
			// Funktion liefert den Direktangriffslink anhand des Usernamens
			// ***********************************************************************************************
			function GetDirectAttack(username) {
				return '<a href="' + FIGHTTO_URL + username + '" title="Direktangriff auf ' + username + '" target="_blank"><img src="' + ICON_DIRECTATTACK + '" style="padding-right: 3px"></a>';
			}
	
			// ***********************************************************************************************
			// Funktion liefert den Link auf das Userprofil
			// ***********************************************************************************************
			function GetProfileLink(username) {
				return Linkify(PROFILEUSER_URL + username + '/', '', username, true);;
			}
	
			// ***********************************************************************************************
			// Funktion liefert das ATT-Diagramm
			// ***********************************************************************************************
			function GetFightDiagramm(username, doubleflag) {
				return '<a href="http://downfight.de/dummy.php?username=' + username + '" target="_blank"><img src="' + ((doubleflag) ? ICON_CHEATERDIA_DOUBLE : ICON_CHEATERDIA_NORMAL) + '" title="ATT-DEF-Diagramm von gemeldeten Siegen/Niederlagen' + ((doubleflag) ? '. Dieser Penner bringt derzeit DOPPELTE KILLPUNKTE!' : '') + '" style="padding-left: 3px"></a>';
			}
	
			// ***********************************************************************************************
			// ***********************************************************************************************
			// ***********************************************************************************************
			var content = responseDetails.responseText;
			var doc = HTML2DOM(content);
	
			// Neue Tabelle erzeugen
			var newtable = document.createElement("table");
			document.getElementById("cheatertablehost").appendChild(newtable);
	
			// Kopf in die Tabelle einfügen
			InsertHead(newtable, 8);

			// Stadtnamen und DIV-ID ermitteln
			switch (TOWNEXTENSION) {
				case "MU": {
					var townname = "München"; 
					break;
				}
				case "B": {
					var townname = "Berlin"; 
					break;
				}
				case "HH": {
					var townname = "Hamburg"; 
					break;
				}
			}

			// Alle DIVs durchwandern
			var divs = doc.getElementsByTagName('div');
			var dftable = divs[0].getElementsByTagName("table")[1];
			var dftrs = dftable.getElementsByTagName("tr");

			var firstrow = 0;
			var lastrow = 0;
			var correcttown = false;

			for (var i = 0; i <= dftrs.length - 1; i++) {
				// Wenn es sich bei der aktuellen Reihe um eine Stadtreihe handelt
				if (dftrs[i].innerHTML.indexOf("Faker in ") != -1) {
					// Wenn es sich bei der aktuellen Reihe um die Stadtreihe der richtigen Stadt handelt
					if (dftrs[i].innerHTML.indexOf("Faker in " + townname) != -1) {
						correcttown = true;
					// sonst: Bei der aktuellen Reihe handelt es sich um die Stadtreihe einer falschen Stadt 
					} else {
						correcttown = false;
					}
				// sonst: Bei der aktuellen Reihe handelt es sich NICHT um eine Stadtreihe
				} else {
					// Wenn die aktuelle Reihe sich in der richtigen Stadt befindet
					if (correcttown) {
						// Wenn die erste Reihe noch nicht ermittelt wurde
						if (firstrow == 0) {
							// Aktuelle Reihe ist erste Reihe
							firstrow = i;
						}
						// Aktuelle Reihe ist auch die vorläufig letzte bekannte letzte Reihe
						lastrow = i;
					}
				}
			}


			// Info über die Anzahl der Cheater über Tabelle schreiben
			var nrofcheaters = lastrow - firstrow + 1;
			document.getElementById("cheaterinfo").innerHTML = '<b><font color="#FFFFFF">Derzeit befinden sich ' + nrofcheaters + ' Penner auf der Cheaterliste (' + townname + ') von <a href="http://www.downfight.de" target="_blank">downfight.de</a>:</font></b><br /><br />';

			// Für alle Cheater
			for (var i = firstrow; i <= lastrow; i++) {
				// UserID und Username ermitteln
				var username = GetUserNameFromDFDE(dftrs[i].getElementsByTagName("td")[4].innerHTML);

				// Neue Zeile erzeugen und mit Username branden
				var newtr = InsertRow(newtable);
				newtr.id = ("cheaterid" + username).toUpperCase();

				if (dftrs[i].getElementsByTagName("td")[2].innerHTML.indexOf('<img src="/grafiken/armee.png">') != -1) {
					var doubleflag = true;
				} else {
					var doubleflag = false;
				}
				
				// FIGHT-DIAGRAMM
				newtr.getElementsByTagName("td")[0].innerHTML = GetFightDiagramm(username, doubleflag);
				// NAME
				newtr.getElementsByTagName("td")[2].innerHTML = GetProfileLink(username);
				// BANDE
				newtr.getElementsByTagName("td")[3].innerHTML = "";
				// PUNKTE
				newtr.getElementsByTagName("td")[4].innerHTML = "";
				newtr.getElementsByTagName("td")[4].setAttribute('style', 'text-align: right; padding-right: 10px;');
				// LAUFZEIT
				newtr.getElementsByTagName("td")[5].innerHTML = GetRemainingTimeFromDFDE(dftrs[i].getElementsByTagName("td")[9].innerHTML);
				if (parseInt(dftrs[i].getElementsByTagName("td")[9].innerHTML.substr(5)) >= 1000) {
					newtr.getElementsByTagName("td")[5].setAttribute('style', 'text-align: right; padding-right: 10px; color:#ffff00');
					ShowImg('', ICON_NEW, '', '15', '15', '2', '2', '200', '', newtr.getElementsByTagName("td")[2]);
				} else {
					newtr.getElementsByTagName("td")[5].setAttribute('style', 'text-align: right; padding-right: 10px;');
				}
				// STARTDATUM
				newtr.getElementsByTagName("td")[6].innerHTML = "";
				// DIREKTANGRIFF
				newtr.getElementsByTagName("td")[7].innerHTML = GetDirectAttack(username);
				newtr.getElementsByTagName("td")[7].setAttribute('style', 'padding-left: 5px;');
			}
	
			// Eigene Punktezahl auslesen
			var ownpoints = Number(document.getElementsByClassName("icon award")[0].getElementsByTagName("a")[0].innerHTML);
			// Aus eigener Punktzahl Ober- und Untergrenze für Punktezahl der User errechnen, die man angreifen kann
			var ownattmax = Math.floor(ownpoints * 1.5);
			var ownattmin = Math.floor(ownpoints * 0.8);
	
			// Für alle Zeilen in der Cheatertabelle
			for (var x = 1; x <= newtable.getElementsByTagName("tr").length - 1; x++) {
				// ***********************************************************************************************
				// Funktion ermittelt die UserID aus der aktuellen Zeile
				// ***********************************************************************************************
				function GetUserIDFromRow(currenttr) {
					return currenttr.id.substr(9);
				}
				
				// ***********************************************************************************************
				// Funktion baut einen Bandenprofillink aus Banden-ID und Bandenname zusammen
				// ***********************************************************************************************
				function GetGangLink(gangid, gangname) {
					// Wenn eine Bandenmitgliedschaft besteht
					if (gangid != "None") {
						return '<a href="' + GANG_URL + gangid + '/" target="_blank">' + gangname + '</a>';
					// sonst: Penner ist in keiner Bande oder gelöscht/gebannt
					} else {
						return '<b><font color="#ffffff">-keine Bande-</font></b>';
					}
				}
				
				// Username des aktuellen Benutzers ermitteln
				var username = GetUserIDFromRow(newtable.getElementsByTagName("tr")[x]);

				// ***********************************************************************************************
				// Abrufen des XML-Datensatzes für den aktuellen User
				// ***********************************************************************************************
				GM_xmlhttpRequest({method: 'GET', url: APIUSER_URL + username, onload: function(responseDetails) {
					// Wenn die Seite erfolgreich abgerufen werden konnte
					if (responseDetails.status == 200) {
						var parser = new DOMParser();
						var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		
						// Userdaten auslesen
						var userpoints = Number(dom.getElementsByTagName('points')[0].textContent);
						var userid = dom.getElementsByTagName('id')[0].textContent;
						var username = dom.getElementsByTagName('name')[0].textContent;
						var gangid = dom.getElementsByTagName('id')[1].textContent;
						var gangname = dom.getElementsByTagName('name')[1].textContent;
						var regsince = dom.getElementsByTagName('reg_since')[0].textContent;
	
						// Anhand der UserID die relevante Zeile ermitteln	
						var currenttr = document.getElementById(("cheaterid" + username).toUpperCase());
	
						// FIGHTINFO
						if (TOWNEXTENSION != "MU") {
							currenttr.getElementsByTagName("td")[1].innerHTML = GetIconInsertHTML(userid, username, "");
						} else {
							currenttr.getElementsByTagName("td")[1].innerHTML = "";
						}
	
						// Bandenprofillink eintragen
						var ganglink = GetGangLink(gangid, gangname);
						currenttr.getElementsByTagName("td")[3].innerHTML = ganglink;
	
						// ***********************************************************************************************
						// Abrufen des Userprofils
						// ***********************************************************************************************
						GM_xmlhttpRequest({method: 'GET', url: PROFILEUSER_URL + username + "/", onload: function(responseDetails) {
							var profilecontent = responseDetails.responseText;
							// Zelle mit Bandenbeschreibung des Users ermitteln
							currenttd = document.getElementById(("cheaterid" + username).toUpperCase()).getElementsByTagName("td")[3];
							// Wenn der User gelöscht oder gebannt ist
							if (profilecontent.indexOf('"Der Spieler wurde gel&ouml;scht oder vom Spiel verbannt!"') != -1) {
								currenttd.innerHTML = '<b>GEBANNT/GELÖSCHT!</b>';
								currenttd.setAttribute('style', 'color:#ff6666');
							}
						}
						});
						
						// Aktuelle Punktzahl eintragen
						currenttr.getElementsByTagName("td")[4].innerHTML = number_format(userpoints);
						// Aktuelles Registrierungsdatum
						currenttr.getElementsByTagName("td")[6].innerHTML = regsince;
		
						// Wenn der Gegner sich im eigenen Punktespektrum befindet
						if (userpoints <= ownattmax  && userpoints >= ownattmin) {
							currenttr.getElementsByTagName("td")[2].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');
							currenttr.getElementsByTagName("td")[4].setAttribute('style', 'text-align: right; padding-right: 10px; color: #33cc66');
						// sonst: Der Gegner ist derzeit nicht angreifbar
						} else {
							currenttr.getElementsByTagName("td")[2].getElementsByTagName("a")[0].setAttribute('style', 'color: #ff6666');
							currenttr.getElementsByTagName("td")[4].setAttribute('style', 'text-align: right; padding-right: 10px; color: #ff6666');
						}
						
						// Zahl der Kämpfe ermitteln
						CheckPastFights(userid, username);
					}
				}
				});
				
				// Wartecursor
				CursorWait(document.getElementById("CheaterCheckbox"), false);
			}
		}
	}
	});
}

// **********************************************************************************
// **********************************************************************************
// Funktion wandelt einen HTML-Content in ein DOM um
// **********************************************************************************
// **********************************************************************************
function HTML2DOM(content) {

	var host = document.location.host;
	var dummyDiv = document.createElement('div');
	dummyDiv.innerHTML = content;

	return dummyDiv;
}

// **********************************************************************************
// **********************************************************************************
// Einbettung eines Inhalts in einen Link mit Ziel, Titel, Body und ggf. Tag
// für "öffnen in neuem Fenster"
// **********************************************************************************
// **********************************************************************************
function Linkify(linkdest, linktitle, linkbody, bNewPage) {
	return '<a href="' + linkdest + '" title="' + linktitle + '"' + ((bNewPage) ? ' target="_blank"' : '') + '>' + linkbody + '</a>';
}

// **********************************************************************************
// **********************************************************************************
// Funktion enthält Code zum Handeln der Cheaterlisten-Anzeige
// **********************************************************************************
// **********************************************************************************
function HandleCheaterCheckbox() {
	var cheatercheckbox = document.getElementById("CheaterCheckbox");

	// Click-Handler hinzufügen
	cheatercheckbox.addEventListener("click", function(event) { 
		// Klickstatus speichern
		GM_setValue("ShowCheaterlist" + m_ownuserid + TOWNEXTENSION, this.checked);
		
		// Wenn das Häkchen gesetzt ist
		if (this.checked) {
			// Cheaterliste abrufen und darstellen
			InsertCheaterTable();
		// sonst: Das Häkchen ist nicht gesetzt
		} else {
			// Info über Anzahl der Cheater und die Cheatertabelle selbst löschen
			document.getElementById("cheaterinfo").innerHTML = "&nbsp;";
			document.getElementById("cheatertablehost").innerHTML = "&nbsp;";
		}
	}, false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion bereitet die Tabelle auf das Einfügen der Cheater-Tabelle vor
// **********************************************************************************
// **********************************************************************************
function PrepareCheaterTable(table) {
	
	// Wenn die aktuelle Stadt nicht München ist
//	if (TOWNEXTENSION != "MU") {
		var newtr = document.createElement("tr");
		var newtd = document.createElement("td");
		newtd.setAttribute('style', 'padding-top: 10px; padding-bottom: 10px');
		newtd.setAttribute('colspan', 2);
		newtd.innerHTML = "1";
		newtd.id = "CheaterCheckboxTD";
		newtd.innerHTML = '<input name="CheaterCheckbox" id="CheaterCheckbox" type="checkbox"><span style="vertical-align: bottom	">&nbsp;Anzeige der Cheaterliste von downfight.de aktivieren</span>';
		newtr.appendChild(newtd);
		table.getElementsByTagName("tbody")[0].appendChild(newtr);
	
		// Zeile einfügen, in der später die Cheaterzahl steht
		newtr = document.createElement("tr");
		newtd = document.createElement("td");
		newtd.setAttribute("colspan", 2);
		newtd.id = "cheaterinfo";
		newtr.appendChild(newtd);
		table.getElementsByTagName("tbody")[0].appendChild(newtr);
	
		// Zeile einfügen, in der später die Cheatertabelle steht
		newtr = document.createElement("tr");
		newtd = document.createElement("td");
		newtd.id = "cheatertablehost";
		newtd.setAttribute("colspan", 2);
		newtr.appendChild(newtd);
		table.getElementsByTagName("tbody")[0].appendChild(newtr);
	
		// Code für Click hinterlegen
		HandleCheaterCheckbox();
		
		// Wenn die letzte Einstellung der Cheater-Checkbox "aktiv" war
		if (GM_getValue("ShowCheaterlist" + m_ownuserid + TOWNEXTENSION, true)) {
			// Häkchen setzen
			document.getElementById("CheaterCheckbox").checked = true;
			// Cheaterliste abrufen und darstellen
			InsertCheaterTable();
		}
//	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion baut einen Pennerzone-Suchaufruf zusammen und liefert ihn zurück
// **********************************************************************************
// **********************************************************************************
function BuildPennerzoneLink(minpoints, maxpoints, datesearch, linktitle, linkicon) {
	return '<a href="' + PENNERZONESEARCH_URL1 + minpoints + PENNERZONESEARCH_URL2 + maxpoints + PENNERZONESEARCH_URL3 + datesearch + '" target="_blank" title="' + linktitle + '"><img src="' + linkicon + '"></a>';
}

// **********************************************************************************
// **********************************************************************************
// Funktion baut den String für Pennerzone-Suchzeile zusammen und liefert ihn zurück
// **********************************************************************************
// **********************************************************************************
function BuildPennerzoneLinkString(minpoints, maxpoints, datefrom) {
	// Wenn kein Startdatum angegeben wurde
	if (datefrom == "") {
		var datesearch = PENNERZONESEARCH_URL3 + PENNERZONESEARCH_URL4 + PENNERZONESEARCH_URL5 + PENNERZONESEARCH_URL6;
		var datefromdisplay = '<small>ab: -egal-</small>';
	// sonst: Es wurde ein Startdatum angegeben
	} else {
		var day = Number(datefrom.substr(0,2))
		var month = datefrom.substr(3,2)
		var year = datefrom.substr(6,4)
		var datesearch = PENNERZONESEARCH_URL3 + day + PENNERZONESEARCH_URL4 + month + PENNERZONESEARCH_URL5 + year + PENNERZONESEARCH_URL6;
		var datefromdisplay = '<small>ab: ' + datefrom + '</small>';
	}

	// Alle Icons zusammenbauen
	var PennerzoneLinkMoney = BuildPennerzoneLink(minpoints, "", datesearch, "Gegnersuche (Geld, volles Punktespektrum)", ICON_PENNERZONE_MONEY);
	var PennerzoneLinkUp    = BuildPennerzoneLink(parseInt(maxpoints * 0.90), maxpoints, datesearch, "Gegnersuche (viele Punkte, Max - 10%)", ICON_PENNERZONE_UP);
	var PennerzoneLinkDown  = BuildPennerzoneLink(minpoints, parseInt(minpoints * 1.20), datesearch, "Gegnersuche (wenig Punkte, Min + 20%)", ICON_PENNERZONE_DOWN);
	var PennerzoneLinkDate  = '<img src="' + ICON_PENNERZONE_DATE + '" id="PennerzoneDate" title="Eingabe eines Start-Reg.-datums" style="cursor:pointer">';

	// Gesamten String für die Pennerzone-Suchzeile zurückgeben
	return '<strong>Pennerzone-Suche:</strong>&nbsp;&nbsp;&nbsp;&nbsp;' + PennerzoneLinkMoney + '&nbsp;' + PennerzoneLinkUp + '&nbsp;&nbsp;' + PennerzoneLinkDown + '&nbsp;&nbsp;&nbsp;&nbsp;' + PennerzoneLinkDate + '&nbsp;&nbsp;' + datefromdisplay;
}

// **********************************************************************************
// **********************************************************************************
// Handler für die Datumsschaltfläche der Pennerzone-Zeile
// **********************************************************************************
// **********************************************************************************
function AddPennerzoneDateHandler() {
	// Wenn das Element vorhanden ist
	if (document.getElementById("PennerzoneDate") != null) {
		// Click-Handler hinzufügen
		document.getElementById("PennerzoneDate").addEventListener("click", function(event) { 
			// Startdatum vom User eingeben lassen
			var datefrom = prompt("Bitte das Reg.-Datum angeben, ab dem Gegner\ngesucht werden sollen (Format: TT.MM.JJJJ).\n\nEine leere Eingabe bedeutet keine Einschränkung.", GM_getValue("PennerzoneDateFrom" + m_ownuserid + TOWNEXTENSION, ""));
			// Eingegebenes Startdatum speichern
			GM_setValue("PennerzoneDateFrom" + m_ownuserid + TOWNEXTENSION, datefrom);

			// Pennerzone-Suchzeile neu erstellen und zuweisen
			document.getElementById("PennerzoneP").innerHTML = BuildPennerzoneLinkString(minpoints, maxpoints, datefrom);

			// Handler erneut zuweisen
			AddPennerzoneDateHandler();
		}, false);
	}
}

// **********************************************************************************
// **********************************************************************************
// Handler für Bandenprofilaktualisierung
// **********************************************************************************
// **********************************************************************************
function HandleGangProfile(content) {
	// ***********************************************************************************************
	// Funktion ermittelt die UserID
	// ***********************************************************************************************
	function GetUserID(htmlstring) {
		return htmlstring.split('href="/profil/id:')[1].split('/"')[0];
	}

	// ***********************************************************************************************
	// Funktion ermittelt Username
	// ***********************************************************************************************
	function GetUsername(htmlstring) {
		return htmlstring.split('">')[1].split('</a>')[0];
	}

	if (content.indexOf(ICON_LASTFIGHT_NOCOMMENT) != -1) {
		// ***********************************************************************************************
		// Overview zum Verzögern abrufen
		// ***********************************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: TOWNBASE_URL + userid + "/overview/", onload: function(responseDetails) {
			// Referenzen auf die Tabelle speichern
			var table = document.getElementsByTagName("table")[3];
			var tr = table.getElementsByTagName("tr");

			// Für alle Zeilen der Tabelle
			for (var x = 0; x < tr.length; x++) {
				// Name und UserID auslesen
				var userid = GetUserID(tr[x].getElementsByTagName("td")[1].innerHTML);
				var username = GetUsername(tr[x].getElementsByTagName("td")[1].innerHTML);
			
				tr[x].getElementsByTagName("td")[4].innerHTML = GetIconInsertHTML(userid, username, "")
			
				// Zahl der Kämpfe ermitteln
				CheckPastFights(userid, username);
			}
		}
		});
	}
}

//function ap() {
//	var tables = document.getElementsByTagName("table");
//	var tables = document.getElementsByTagName("table");
//	
//	var userid = '472133';
//	var username = 'Dr_Med_Prof_Spongebob';
//	var points = '111264083';
//
//	var fightdate = '01.04.2010 21:59:43 Uhr';
//	
//	tables[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML = '&nbsp;' + fightdate;
//
//	document.getElementsByClassName("avatar")[1].src = 'http://inodes.pennergame.de/bl_DE/avatare/' + userid + '.jpg';
//
//	tables[1].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML = '<div align="center"><strong>' + username + '</strong></div>';
//
//	tables[1].getElementsByTagName("tr")[3].getElementsByTagName("td")[0].innerHTML = '<div align="center">-' + points + '</div>'
//	tables[1].getElementsByTagName("tr")[3].getElementsByTagName("td")[2].innerHTML = '<div align="center">' + points + '</div>'
//
//	document.getElementsByTagName("p")[7].innerHTML = username + ' hat sageo angegriffen, dabei hat ' + username + ' den Kampf verloren und sich bei dem Angriffsversuch ordentlich blamiert.<br><br>sageo hat von ' + username + ' €145,40 erbeutet und hat stolze ' + points + ' Punkte bekommen.<br><br><br>' + username + ' ist mit einem blauem Auge davongekommen und hat sich nicht weiter verletzt.<br>';
//}

function ByeByeGoogle() {
	for (var i = 1; i <= 2; i++) {
		// Div mit Google-Ads entfernen
		var googleads = document.getElementById("google_js_" + i);
		if (googleads != null) {
			googleads.parentNode.removeChild(googleads);
		}
	}
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************

	var m_ownuserid = getOwnUserID();

	ByeByeGoogle();
	
	// ***********************************************************************************************
	// Auf eine neue Version des Skriptes prüfen
	// ***********************************************************************************************
	CheckForUpdate(120);

	if (!bl()) {
		var content = document.getElementsByTagName("body")[0].innerHTML;
	
		// ***********************************************************************************************
		// Wenn die aktuelle Seite eine Userprofilseite ist
		// ***********************************************************************************************
		if ((location.toString().indexOf(".pennergame.de/profil/") != -1) && (location.toString().indexOf("/bande:") == -1)) {
			// Info-Icons auf dem Profil einfügen
			HandleProfile();
		// ***********************************************************************************************
		// Wenn die aktuelle Seite eine Kampfprofil-Seite ist
		// ***********************************************************************************************
		} else if (location.toString().indexOf(".pennergame.de/fight/viewfight/") != -1) {
//			ap();
		// ***********************************************************************************************
		// Wenn die aktuelle Seite eine Bandenprofil-Seite ist
		// ***********************************************************************************************
		} else if (location.toString().indexOf("pennergame.de/profil/bande:") != -1) {
			// Aktualisierung der Info-Icons auf dem Bandenprofil durchführen (wenn welche vorhanden sind)
			HandleGangProfile(content);
		// ***********************************************************************************************
		// Wenn die aktuelle Seite eine Pennerzone-Seite ist
		// ***********************************************************************************************
		} else if (location.toString().indexOf(".pennerzone.de/highscore/") != -1) {
			HandlePennerzone();
		// ***********************************************************************************************
		// sonst: Die aktuelle Seite ist keine Profilseite
		// ***********************************************************************************************
		} else {	
			// ***********************************************************************************************
			// Wenn die aktive Kampfseite angezeigt wird
			// ***********************************************************************************************
			if (content.indexOf("Dein Ziel muss") != -1 ) {

				// ***********************************************************************************************
				// Funktion ermittelt das DIV, in dem die Angriffsdetails stehen
				// ***********************************************************************************************
				function GetAttackDiv() {
					var divs = document.getElementsByTagName("div");

					for (var i = 0; i < divs.length; i++) {
						var divstyle = divs[i].getAttribute("style");

						if (divstyle != null) {
							if (divstyle.indexOf("padding: 6px") != -1 && divstyle.indexOf("width: 300px") != -1) {
								return divs[i];
							}
						}
					}
				}
				
				var attacktable = document.getElementsByTagName("table")[0];
				var attackdiv = GetAttackDiv();
				var attacklink = attackdiv.getElementsByTagName("a")[0];
				var attackspan = attackdiv.getElementsByTagName("span")[0];
			
				// Wenn aktuell ein Angriff läuft
				if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Angriff läuft bereits auf") != -1) {
					// Name und UserID des Penners auslesen
					var username = attacklink.innerHTML;
					var userid = attackspan.innerHTML.split('/id:')[1].split('/"')[0];
	
					CheckPastFights(userid, username);
	
					// Info-Icons einfügen
					attackspan.innerHTML = attackspan.innerHTML + '&nbsp' + GetIconInsertHTML(userid, username, "");
		
					// Grafik für Posten in SB einfügen
					attackspan.innerHTML = attackspan.innerHTML + '&nbsp;<img id="PostCurrentFightToSB" border="0" src="' + ICON_SENDTOSB + '" title="Daten des Kampfes gegen ' + username + ' in die Shoutbox posten." height="14" width="14" style="cursor: pointer">';
	
					var additionalbr = '';
				// sonst: Es läuft derzeit kein Angriff
				} else {
					var additionalbr = '<br />';
				}
	
				// ***********************************************************************************************
				// Pennerzone-Suchkonfigurationen einblenden
				// ***********************************************************************************************
				// Eigene Punktezahl auslesen
				var ownpoints = Number(document.getElementsByClassName("icon award")[0].getElementsByTagName("a")[0].innerHTML);
				// Aus eigener Punktzahl Ober- und Untergrenze für Punktezahl der User errechnen, die man angreifen kann
				var minpoints = Math.floor(ownpoints * 0.8);
				var maxpoints = Math.floor(ownpoints * 1.5);
	
				// Einfügen der Pennerzone-Suchzeile in die Angriffsbox
				attackdiv.innerHTML = attackdiv.innerHTML + additionalbr + '<br /><p id="PennerzoneP">' + BuildPennerzoneLinkString(minpoints, maxpoints, GM_getValue("PennerzoneDateFrom" + m_ownuserid + TOWNEXTENSION, "")) + '</p>';
				
				// Handler für Datumseingabe einfügen
				AddPennerzoneDateHandler();
	
				// Wenn der aktuelle Kampf in die SB gepostet werden können soll
				if (document.getElementById("PostCurrentFightToSB") != null) {
					// Handler für das Posten in SB mit Grafik assoziieren
					PostToSBHandler(document.getElementById("PostCurrentFightToSB"), SBPOSTMODE_ACTIVE);
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
				
				// ***********************************************************************************************
				// Cheatertabelle vorbereiten
				// ***********************************************************************************************
				var table = document.getElementsByTagName("table")[0];
				PrepareCheaterTable(table);
			}
		}
	}