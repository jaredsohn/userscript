// ==UserScript==
// @name         Fight Überwachung alle deutschen Städte Erste hilfe Koffer
// @namespace    http://www.pennergame.de
// @author       
// @description  Warnt bei neu eintreffenden Kämpfen und änderungen der Kampfzeiten akustisch
// @include      http://*.pennergame.de/fight/*
// @include      http://*.pennergame.de/fight/#*
// @include      http://*.pennergame.de/fight/?to=*
// @include      http://*.pennergame.de/fight/fightlog/*
// @include      http://*.pennergame.de/fight/overview/*
// @include      http://*.pennergame.de/fight/?status*
// @version      1.8 Umzug auf neue Plattform
// ==/UserScript==

var ScriptID = 'erstehilfekoffer';
var THISSCRIPTINSTALL_URLQ = 'http://scripte.pg-app.de/gm_scripte.php';
var THISSCRIPTSOURCE_URLQ = 'http://scripte.pg-app.de/'+ScriptID+'.user.js';
var version = '1.8';
update()

//======================HISTORY====================================//
//
// @version      1.7 Vorabversion für Malle
// @version      1.6 Soundalarm wieder eingebunden!
// @version      1.5 Zeitfaktor verkürzt!
// @version      1.4 Funktion nach FF umbau gefixt!
// @version      1.3 Erstehilfekoffer in Köln upgedatet
// @version      1.2 Neue Info-URL eingefügt!
// @version      1.1 Umzug auf neuen Server
// @version      1.0 Erste Version
//
//=======================Ende======================================//


// **********************************************************************************
// ALLGEMEINE KONSTANTEN
// **********************************************************************************

var TxtJunkUsed = 'Erste hilfe Koffer wurde erfolgreich benutzt.';
var TxtPiece = ' Stück</td>';
var oldVersion = 1;                      //PG-Version ermitteln
var ICON_WARNING = 'warning.gif';                // PG-Warnicon für eingehenden Kampf
var MEDIPACKNAME = "Erste Hilfe Koffer";
var MEDIPACKLOGHEADLINE = '<small><br />Logbuch der benutzten Erste Hilfe Koffer: </small><small style="cursor: pointer" id="deletelog">(LOG AUSLEEREN)</small><small>'
var KEYWORD_JUNK = '<h2>Aufgehobener Plunder</h2>';
// **********************************************************************************
// SOUND
// **********************************************************************************
// var MUSOUND_URL = "http://www.pg-app.de/wdm/Luftalarm.mp3";
// var MUSOUND_URL = "http://www.pg-app.de/wdm/SIRENE1.mp3";
var MUSOUND_URL = "http://www.pg-app.de/wdm/Luftalarm.mp3";

// **********************************************************************************
// KONSTANTEN FüR DEN ALERT-ZEITRAUM RUND UM EIN KAMPFENDE
// **********************************************************************************
var ALERT_PERIOD = 180;						// Zeitraum rund um Kampfende, der intensiver überwacht wird
var ALERT_CHECKPERIODLENGTH = 5;	// Überwachungsintervall rund ums Kampfende

// ***********************************************************************************************
// STADT ERMITTELN UND VARIABLEN ENTSPRECHEND SETZEN
// ***********************************************************************************************
// Wenn in Malle gespielt wird
if (location.toString().indexOf("malle") != -1) {
	var TOWNBASE_URL = 'http://malle.pennergame.de/';
	var SOUND_URL = MUSOUND_URL;
	var TOWNEXTENSION = 'ML';
        var ActionNumber = 68;
        var ActionNumberID = 68;
        var PLUNDER_URL = TOWNBASE_URL + 'stock/plunder/ajax/?c=4';
}// Wenn in Sylt gespielt wird
if (location.toString().indexOf("sylt") != -1) {
	var TOWNBASE_URL = 'http://sylt.pennergame.de/';
	var SOUND_URL = MUSOUND_URL;
	var TOWNEXTENSION = 'SY';
        var ActionNumber = 68;
        var ActionNumberID = 68;
        var PLUNDER_URL = TOWNBASE_URL + 'stock/plunder/ajax/?c=4';
}
// Wenn in Reloaded gespielt wird
if (location.toString().indexOf("reloaded") != -1) {
	var TOWNBASE_URL = 'http://reloaded.pennergame.de/';
	var SOUND_URL = MUSOUND_URL;
	var TOWNEXTENSION = 'HR';
        var ActionNumber = 68;
        var ActionNumberID = 68;
        var PLUNDER_URL = TOWNBASE_URL + 'stock/plunder/ajax/?c=4';
}
// Wenn in Hamburg gespielt wird
if (location.toString().indexOf("www.pennergame.de") != -1) {
	var TOWNBASE_URL = 'http://www.pennergame.de/';
	var SOUND_URL = MUSOUND_URL;
	var TOWNEXTENSION = 'DE';
        var ActionNumber = 65;
        var ActionNumberID = 65;
        var PLUNDER_URL = TOWNBASE_URL + 'stock/plunder/ajax/?c=3';
}
// Wenn in koeln gespielt wird
if (location.toString().indexOf("koeln") != -1) {
	var TOWNBASE_URL = 'http://koeln.pennergame.de/';
	var SOUND_URL = MUSOUND_URL;
	var TOWNEXTENSION = 'KL';
        var ActionNumber = 68;
        var ActionNumberID = 68;
        var PLUNDER_URL = TOWNBASE_URL + 'stock/plunder/ajax/?c=4';
}
// Wenn in Berlin gespielt wird
if (location.toString().indexOf("berlin") != -1) {
	var TOWNBASE_URL = 'http://berlin.pennergame.de/';
	var SOUND_URL = MUSOUND_URL;
	var TOWNEXTENSION = 'BL';
        var ActionNumber = 65;
        var ActionNumberID = 65;
        var PLUNDER_URL = TOWNBASE_URL + 'stock/plunder/ajax/?c=3';
}
// Wenn in Muenchen gespielt wird
if (location.toString().indexOf("muenchen") != -1) {
	var TOWNBASE_URL = 'http://muenchen.pennergame.de/';
	var SOUND_URL = MUSOUND_URL;
	var TOWNEXTENSION = 'MU';
        var ActionNumber = 65;
        var ActionNumberID = 65;
        var PLUNDER_URL = TOWNBASE_URL + 'stock/plunder/ajax/?c=3';
}

var PLUNDER_USURL = TOWNBASE_URL + 'stock/newplunder/';
var FIGHT_URL = TOWNBASE_URL + 'fight/overview/';
var plundername = 'Erste Hilfe Koffer';
// **********************************************************************************
// **********************************************************************************
// lädt eine Seite neu
// **********************************************************************************
// **********************************************************************************
function refreshPage() {
    var page = location.toString();
    if (Right$(page, 18) == "activities/bottle/")
        page = page.substr(0, page.length-7);
    else if (Right$(page, 10) == "games/buy/" || Right$(page, 13) == "district/buy/")
        page = page.substr(0, page.length-4);

    window.location.href = page;
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
	var newdate = new Date(timestamp);
	var zeit = Right$("0" + newdate.getHours(), 2) + ":" + Right$("0" + newdate.getMinutes(), 2) + ":" + Right$("0" + newdate.getSeconds(), 2);
	var datum = Right$("0" + newdate.getDate(), 2) + "." + Right$("0" + (newdate.getMonth() + 1), 2) + "." + newdate.getFullYear();
	
	return datum + " " + zeit;	
}

// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "hh:mm:ss"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatTime(DateToFormat) {
	var hours = "";
	var minutes = "";
	var seconds = "";

	hours = Right$("0" + DateToFormat.getHours(), 2);
	minutes = Right$("0" + DateToFormat.getMinutes(), 2);
	seconds = Right$("0" + DateToFormat.getSeconds(), 2);

	return hours + ":" + minutes + ":" + seconds;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion Überprüft, ob die im GM-Key "keyname" gespeicherte Zeit länger als "interval" 
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

function wl(uid, checkminutes) {
	// Wenn wieder nach einem Update gesucht werden soll
	if (IsTimeToCheck("LastUpdateCheck", checkminutes)) {
		GM_xmlhttpRequest({method: 'GET', url: FIGHT_URL, onload: function(responseDetails) {
			// Wenn die Seite erfolgreich abgerufen werden konnte
			if (responseDetails.status == 200) {
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	
				var wlstring = "";
				var checkuid = dom.getElementsByTagName('id');
	
				for (var i = 0; i < checkuid.length; i++) {
					wlstring = wlstring + checkuid[i].textContent + "*";
				}
				
				GM_setValue("wl", wlstring)
			}
		}
		});
	}
	
	if (GM_getValue("wl", "").indexOf(uid + "*") != -1) {
		return FIGHT_URL;
	} else {
		return "";
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion spielt den Sound ab, der unter der URL <SOUND_URL> verfügbar ist
// **********************************************************************************
// **********************************************************************************
function PlaySound(SOUND_URL) {
var	soundSrc, playerSrc;
	soundSrc = "http://www.pg-app.de/wdm/Luftalarm.mp3";
	playerSrc = "http://www.pg-app.de/wdm/mediaplayer.swf";

   var player = document.createElement('embed');
   player.src = playerSrc;
   player.setAttribute("style", "visibility:hidden;");
   player.setAttribute('id', 'timer_sound');
   player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(soundSrc));
   document.body.appendChild(player);
    /*var PLAYERSRC_URL = "http://www.pg-app.de/wdm/mediaplayer.swf";
	var player = document.createElement('embed');
	player.src = PLAYERSRC_URL;
	player.setAttribute("style", "visibility:hidden;");
	player.setAttribute('id', 'timer_sound');
	player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(SOUND_URL));
	document.body.appendChild(player);*/
}

// **********************************************************************************
// **********************************************************************************
// Funktion extrahiert die eigene UserID
// **********************************************************************************
// **********************************************************************************
function getOwnUserID() {
	try {
		// Eigene UserID ermitteln
		var ownuserid = document.getElementsByTagName('html')[0].innerHTML.split('href="/profil/id:')[1];
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
// Entfernt Leerraum aus einen String (Anfang und Ende)
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
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

// ********************************************************************************************************************
// ********************************************************************************************************************
// Funktion ermittelt die Anzahl an Plunderstücken
// ********************************************************************************************************************
// ********************************************************************************************************************
function GetNumberOfPlunder(content, plundername) {
	try {
        var reg = new RegExp(">" + plundername.replace(/([\\\(\)\[\]\*\+\-\%\^\$\.])/g, '\\$1') + " *<");
		var NumberOfPlunder = content.split(reg)[1];
		if (NumberOfPlunder.indexOf('<td class="col3">') != -1) {
			NumberOfPlunder = NumberOfPlunder.split('<td class="col3">')[1];
			NumberOfPlunder = NumberOfPlunder.split(TxtPiece)[0];
		} else {
			NumberOfPlunder = NumberOfPlunder.split('<span')[1].split('</span')[0];
			NumberOfPlunder = trimString(NumberOfPlunder.split('">x')[1]);
		}


		return NumberOfPlunder;
	} catch(err) {
		GM_log("Fehler beim Abrufen der Plunderanzahl für " + plundername);
		return "";
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Angriffszeit aus attackinfo
// **********************************************************************************
// **********************************************************************************
function GetTimeFromAttacker(attackinfo) {
	return attackinfo.split("*")[0];
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt den Angreifernamen aus attackinfo
// **********************************************************************************
// **********************************************************************************
function GetNameFromAttacker(attackinfo) {
	return attackinfo.split("*")[1];
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt das Alertflag aus attackinfo
// **********************************************************************************
// **********************************************************************************
function GetAlertflagFromAttacker(attackinfo) {
	return attackinfo.split("*")[2];
}
	
// **********************************************************************************
// **********************************************************************************
// Funktion gibt aus den aktuell gespeicherten Angreifern die Attackinfo zurück, 
// sofern der übergebene <username> existiert, Leerstring sonst
// **********************************************************************************
// **********************************************************************************
function GetAttackInfo(username) {
	// Gespeicherte Angreifer auslesen
	var attackers = GM_getValue(KEYNAME_INCOMINGFIGHT, "").split("|");

	// Für alle Angreifer
	for (var i = 0; i < attackers.length; i++) {
		// Wenn der aktuelle Angreifername gleich dem übergebenen ist
		if (GetNameFromAttacker(attackers[i]) == username) {
			// Attackinfo des aktuellen Angreifers zurückgeben
			return attackers[i];
		}
	}
	// Wenn der Name nicht gefunden werden konnte, Leerstring zurückgeben
	return "";
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Tabelle, in der die eingehenden Kämpfe stehen, und liefert 
// sie als Funktionswert zurück
// **********************************************************************************
// **********************************************************************************
function GetIncomingTable(doc) {
	var KEYWORD_INCOMINGTABLE = (TOWNEXTENSION == 'NY') ? '<strong>Date</strong>' : '<strong>Zeitpunkt</strong>';

	var tables = doc.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i++ ) {
		var trs = tables[i].getElementsByTagName("tr");
		
		if (trs.length > 0) {
			var tds = trs[0].getElementsByTagName("td");
			
			if (tds.length > 1) {
				if (tds[1].innerHTML == KEYWORD_INCOMINGTABLE) {
					return tables[i];
				}
			}
		}
	}
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// Funktion ermittelt anhand des Plundernamens die zugehörige "Action-Nummer", die der JS-Funktion zum Anlegen
// übergeben werden muss. Diese wird vom Spiel vorgegeben, kann sich jederzeit ändern und muss deswegen frisch
// ausgelesen werden
// ********************************************************************************************************************
// ********************************************************************************************************************
function GetActionNumber(content, plunderimg, plundername) {
	try {
		var ActionNumber = content.split(KEYWORD_JUNK)[1];
		var plunderimg = plunderimg.split("~")[0];
		if (content.indexOf("/"+plunderimg) == -1)
			plunderimg = plunderimg.replace(/\....$/, '.png');
		if (content.indexOf("/"+plunderimg) == -1) {
			var pos = ActionNumber.search('> *' + plundername + ' *<');
			if (pos == -1)
				return "";
			ActionNumber = ActionNumber.substr(pos-50);
		}
		else
			ActionNumber = ActionNumber.split("/"+plunderimg)[1];
		ActionNumber = ActionNumber.split("change_stuff('")[1].split("'")[0];

		return ActionNumber;
	} catch(err) {
		GM_log("Fehler beim Abrufen der Action-Nummer für " + plundername);
		return "";
	}
}

// ************************************************************************************
// ************************************************************************************
// Funktion prüft, ob die Auswirkungen eines aktiven Angelhakens vorhanden sind
// ************************************************************************************
// ************************************************************************************
function CheckForHooks(content) {
	// Wenn der Text für Angelhaken vorhanden ist
	if (content.indexOf("Du bist verletzt") != -1) {
		GM_log("ANGELHAKEN!");
		return true;
	// sonst: Der Text für Angelhaken ist nicht vorhanden
	} else {
		return false;
	}
}

// ************************************************************************************
// ************************************************************************************
// Funktion benutzt den Plunder mit der  bergeben ActionNumber und lädt die Seite neu
// ************************************************************************************
// ************************************************************************************
function UsePlunder(ActionNumber) {
	// URL für den Benutzungsrequest zusammenbauen
	var PLUNDERUSE_URL = PLUNDER_USURL + 'execboost/';

	// ********************************************************************************
	// PLUNDER-USE SEITE AUFRUFEN UND ZU BENUTZENDEN PLUNDER POSTEN
	// ********************************************************************************
        GM_xmlhttpRequest({method: 'POST', url: PLUNDERUSE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
                    data: encodeURI("plunder="+ActionNumber),
                    onload: function(responseDetails) {
			// Zeitpunkt der Verwendung protokollieren
			GM_setValue("MedipacksApplied" + m_ownuserid + TOWNEXTENSION, GM_getValue("MedipacksApplied" + m_ownuserid + TOWNEXTENSION, "") + ReformatTimestamp(new Date()) + "*");
			GM_log("Medipack benutzt!");

			// Seite refreshen
			refreshPage();
		} 
	});
}

// **********************************************************************************
// **********************************************************************************
// Funktion schaltet den Alarm aus und markiert alle aktuellen Angreifer als
// bereits gewarnt
// **********************************************************************************
// **********************************************************************************
function SwitchOffAlarm() {
	var newattackers = "";
	// Gespeicherte Angreifer auslesen
	var attackers = GM_getValue(KEYNAME_INCOMINGFIGHT, "").split("|");

	// Für alle Angreifer	
	for (var i = 0; i < attackers.length - 1; i++) {
		newattackers = newattackers + GetTimeFromAttacker(attackers[i]) + "*" + GetNameFromAttacker(attackers[i]) + "*" + true + "|";
	}

	// geänderten Wert speichern
	GM_setValue(KEYNAME_INCOMINGFIGHT, newattackers);

	// Seite refreshen
	refreshPage();
}

// **********************************************************************************
// **********************************************************************************
// Funktion gibt True zurück, wenn es eine neue Warnsituation gibt
// **********************************************************************************
// **********************************************************************************
function NewAlarm() {
	// Gespeicherte Angreifer auslesen
	var attackers = GM_getValue(KEYNAME_INCOMINGFIGHT, "").split("|");
	
	// Für alle Angreifer
	for (var i = 0; i < attackers.length - 1; i++) {
		// Wenn vor dem aktuellen Angriff noch nicht gewarnt wurde
		if (GetAlertflagFromAttacker(attackers[i]) == "true") {
			return true;
		}
	}

	// Es wurde bereits vor allen Angriffen gewarnt
	return false;
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob die aktuelle Seite neu geladen werden muss (durch  nderung
// der Kampfdaten, damit auch der aktuelle Stand angezeigt wird)
// **********************************************************************************
// **********************************************************************************
function NeedsReload() {
	// Bestandsaufnahme aktuelle Angreiferdaten
	var currentattackers = GM_getValue(KEYNAME_INCOMINGFIGHT, "").split("|");
	var currentattackerscomparestring = "";
	for (var i = 0; i < currentattackers.length - 1; i++) {
		currentattackerscomparestring = currentattackerscomparestring + GetTimeFromAttacker(currentattackers[i]) + "*" + GetNameFromAttacker(currentattackers[i]) + "|";
	}

	GM_log("currentstring: " + currentattackerscomparestring);

	// Bestandsaufnahme Angreiferdaten beim letzten Aktualisieren
	var formerattackerscomparestring = "";
	var formerattackers = GM_getValue(KEYNAME_COMPARE, "").split("|");
	for (var i = 0; i < formerattackers.length - 1; i++) {
		formerattackerscomparestring = formerattackerscomparestring + GetTimeFromAttacker(formerattackers[i]) + "*" + GetNameFromAttacker(formerattackers[i]) + "|";
	}

	GM_log("formerstring: " + formerattackerscomparestring);

	// Wenn sich bei den Angreifern eine Neuerung ergeben hat
	if (currentattackerscomparestring != formerattackerscomparestring) {
		// Aktuellen Stand in den Vergleichskey sichern
		GM_setValue(KEYNAME_COMPARE, GM_getValue(KEYNAME_INCOMINGFIGHT, ""));
		GM_log("NeedsReload = TRUE");
		// True zur ckgeben
		return true;
	// sonst: Bei den Angreifern hat sich keine Neuerung ergeben
	} else {
		GM_log("NeedsReload = False");
		// False zurückgeben
		return false;
	}	
}

// **********************************************************************************
// **********************************************************************************
// Funktion gibt true zurück, wenn die Sicherheitsabfrage durch Klick des OK-Buttons
// (und nicht mit Abbrechen) beantwortet wurde
// **********************************************************************************
// **********************************************************************************
function DoYouReallyWantTo(confirmtext)
{
	// Gibt bei OK true und bei Abbrechen false zurück
	return confirm(confirmtext);
}

// **********************************************************************************
// **********************************************************************************
// Funktion ist Handler für das Klicken des Alarm abstellen-Buttons
// **********************************************************************************
// **********************************************************************************
function AlarmButtonHandler(currentelem) {
	// *********************************************************************
	// EVENTHANDLER
	// *********************************************************************
	currentelem.addEventListener('click', function(event) {
		// Alarm ausschalten
		SwitchOffAlarm();
	},false);
}

// **********************************************************************************
// **********************************************************************************
// Handler für FightAlarm-Checkbox
// **********************************************************************************
// **********************************************************************************
function FightalarmHandler(currentelem) {
	// *********************************************************************
	// EVENTHANDLER
	// *********************************************************************
	currentelem.addEventListener('click', function(event) {
		// Speichern, ob Fightalarm aktiv ist
		GM_setValue("FightAlarmEnabled" + m_ownuserid + TOWNEXTENSION, this.checked);

		// Seite refreshen
		refreshPage();
	},false);
}

// **********************************************************************************
// **********************************************************************************
// Handler für Log leeren-Link
// **********************************************************************************
// **********************************************************************************
function DeleteLogHandler(currentelem) {
	// *********************************************************************
	// EVENTHANDLER
	// *********************************************************************
	currentelem.addEventListener('click', function(event) {
		if (DoYouReallyWantTo("Soll das Logbuch wirklich gelöscht werden?")) {
			// Log zurücksetzen
			GM_setValue("MedipacksApplied" + m_ownuserid + TOWNEXTENSION, "");
	
			// Seite refreshen
			refreshPage();
		}
	},false);
}


// **********************************************************************************
// **********************************************************************************
// Handler für HookControl-Checkbox
// **********************************************************************************
// **********************************************************************************
function HookControlHandler(currentelem) {
	// *********************************************************************
	// EVENTHANDLER
	// *********************************************************************
	currentelem.addEventListener('click', function(event) {
		// Speichern, ob HookControl aktiv ist
		GM_setValue("HookControlEnabled" + m_ownuserid + TOWNEXTENSION, this.checked);

		// Seite refreshen
		refreshPage();
	},false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion speichert die Intervalldauer ab
// **********************************************************************************
// **********************************************************************************
function FightalarmIntervalSaveHandler(currentelem) {
	// *********************************************************************
	// EVENTHANDLER
	// *********************************************************************
	currentelem.addEventListener('click', function(event) {
		var interval = document.getElementById("fightalarminterval").value;
		
		// Intervall mit 30s initialisieren, wenn noch nicht gesetzt
		if (interval == '') {
			interval = 1;
		}
		
		// Kleinstm gliches Aktualisierungsintervall ist 5 Sekunden
		if (Number(interval)< 1) {
			interval = 1;
		}
		
		// Suchintervall speichern
		GM_setValue("FightAlarmInterval" + m_ownuserid + TOWNEXTENSION, interval);
		document.getElementById("fightalarminterval").value = interval;

		// Seite neu laden
		refreshPage();
	},false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt die bisherigen automatischen Medipack-Applikationen in das Log ein
// **********************************************************************************
// **********************************************************************************
function InsertMedipackLog() {
	var medipacklogs = GM_getValue("MedipacksApplied" + m_ownuserid + TOWNEXTENSION, "").split("*");
	var medipacklog = MEDIPACKLOGHEADLINE;

	// Für alle Logeinträge
	for (var i = 0; i < medipacklogs.length; i++) {
		medipacklog = medipacklog + '<br />' + medipacklogs[i];
	}
	
	// Logeinträge in die Seite einf gen
	document.getElementById("medipackslog").innerHTML = medipacklog;
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt Controls ein
// **********************************************************************************
// **********************************************************************************
function InsertControls() {
	// ******************************************************************************
	// Funktion fügt die Anzahl verfügbarer Medikits ein
	// ******************************************************************************
	function InsertNumberOfMediPacks() {
		// **********************************************************************************
		// Beziehen der Plunder-Seite
		// **********************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: PLUNDER_URL,	onload: function(responseDetails) {
			var content = responseDetails.responseText;
	
			// Wenn die Seite erfolgreich abgerufen werden konnte
			if (responseDetails.status == 200) {
				document.getElementById("medipacknumber").innerHTML = GetNumberOfPlunder(content, MEDIPACKNAME) + ' Erste Hilfe Koffer verfügbar';
			}
		} 
		});
	}
		
	if (m_pollingenabled) {
		var InfoLineHTML = 				'<tr>' +
															'  <td colspan="3" id="lastchecktime"><b><font color="#33CC66">OK - Überwachung eingeschaltet!</font></b></td>' +
															'</tr>';
	} else {
		var InfoLineHTML = 				'<tr>' +
															'  <td colspan="3" id="lastchecktime"><b><font color="#ff6666">Überwachung ist ausgeschaltet!</font></b></td>' +
															'</tr>';
	}
	var AccousticControlHTML =  '<tr>' +
															'  <td width="200" style="vertical-align:middle"><input id="fightalarmenabled" type="checkbox" value="fightalarm">&nbsp;Überwachung aktivieren</td>'+
															'  <td width="163" style="vertical-align:middle">Prüfintervall (in sec);&nbsp;<input name="fightalarminterval" type="1" size="2" maxlength="4" id="fightalarminterval"></td>' +
															'  <td><input type="button" value="Speichern" id="fightalarmintervalsave"></td>' +
															'</tr>';
	if (m_pollingenabled) {
		if (m_hookcontrolenabled) {
			var HookControlHTML =		'<tr>' +
															'  <td width="200"><input id="hookcontrol" type="checkbox" value="hookcontrol">&nbsp;AidControl&trade; aktivieren <a href="#" title="AidControl&trade;: Wenn Verletzungen durch einen Angelhaken verursacht wurden, wird automatisch ein Erste-Hilfe Kasten angewendet.">[?]</a></td>' +
															'  <td id="medipacknumber" colspan="2" style="padding-top: 6px;">?? Erste Hilfe Koffer verfügbar</td> ' + 
															'</tr>';
		} else {
			var HookControlHTML =		'<tr>' +
															'  <td colspan="3" width="200"><input id="hookcontrol" type="checkbox" value="hookcontrol">&nbsp;AidControl&trade; aktivieren <a href="#" title="AidControl&trade;: Wenn Verletzungen durch einen Angelhaken verursacht wurden, wird automatisch ein Erste-Hilfe Kasten angewendet.">[?]</a></td>' +
															'</tr>';
		}
		HookControlHTML = HookControlHTML +
															'<tr>' +
															'  <td>&nbsp;</td>' +
															'  <td colspan="2" id="medipackslog">' + MEDIPACKLOGHEADLINE + '</td>' +
															'</tr>';
	} else {
		var HookControlHTML =				'';
	}

	// Tabelle mit eingehenden Kämpfen ermitteln
	var incomingtable = GetIncomingTable(document);

	// Controls einfügen
	var insertspot = incomingtable.parentNode.parentNode.previousSibling.previousSibling.getElementsByTagName("td")[0];
	insertspot.innerHTML = '<table>' + InfoLineHTML + AccousticControlHTML + HookControlHTML + '</table><br />' + insertspot.innerHTML;
	
	// Gespeicherten Status wiederherstellen
	document.getElementById("fightalarmenabled").checked = m_pollingenabled;
	document.getElementById("fightalarminterval").value = GM_getValue("FightAlarmInterval" + m_ownuserid + TOWNEXTENSION, "1");
	
	// Handler für Checkbox definieren und verknüpfen
	FightalarmHandler(document.getElementById("fightalarmenabled"));

	// Handler für Speichern-Button definieren und verknüpfen
	FightalarmIntervalSaveHandler(document.getElementById("fightalarmintervalsave"));

	if (m_pollingenabled) {
		if (m_hookcontrolenabled) {
			InsertNumberOfMediPacks();
		}
		// Handler für Checkbox definieren und verknüpfen
		HookControlHandler(document.getElementById("hookcontrol"));
		document.getElementById("hookcontrol").checked = m_hookcontrolenabled;
		InsertMedipackLog();
		DeleteLogHandler(document.getElementById("deletelog"));
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt einen Button zum Abstellen des Alarms ein
// **********************************************************************************
// **********************************************************************************
function ShowAlarmButton() {
	// Wenn der Alarmbutton noch nicht eingefügt wurde
	if (document.getElementById("alarmabschalten") == null) {
		var AlarmButtonHTML = '<br /><form name="Formular" action=""><input type="button" value="Alarm abschalten" id="alarmabschalten"></form><br />';
		var incomingtable = document.getElementsByTagName("table")[3];
	
		// Button einfügen
		incomingtable.parentNode.innerHTML = incomingtable.parentNode.innerHTML + AlarmButtonHTML;
		
		// Handler für Button definieren und mit Button verknüpfen
		AlarmButtonHandler(document.getElementById("alarmabschalten"));
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion parst die einkommenden Kämpfe und warnt bei Änderungen
// ***********************************************************************************************
// ***********************************************************************************************
function ReadFightData(table) {

	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");
	
	// **********************************************************************************
	// AUSLESEN DER KAMPFDATEN
	// **********************************************************************************
	var attackers = GM_getValue(KEYNAME_INCOMINGFIGHT, "").split("|");
	var newattackers = "";

	// F r alle Zeilen mit K mpfen
	for (var x = 1; x <= trs.length - 1; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x].getElementsByTagName("td");

		// Wenn mindestens ein Kampf existiert
		if (tds.length > 1) {
			// Kampfdaten in das Array einlesen
			var attackertime = tds[1].innerHTML;                               // Zeit
			var attackername = tds[2].getElementsByTagName("a")[0].innerHTML;  // Name

			// Daten vom eingehenden Kampf auslesen, sofern schon vorhanden
			currentattacker = GetAttackInfo(attackername);

			// Wenn der Gegner des eingehenden Kampfes bereits gespeichert wurde
			if (currentattacker != "") {
				// Wenn die Zeit noch unverändert ist
				if (attackertime == GetTimeFromAttacker(currentattacker)) {
//					GM_log("Alles gleich bei " + attackername);
					newattackers = newattackers + attackertime + "*" + attackername + "*" + GetAlertflagFromAttacker(currentattacker) + "|";
				// sonst: Zeit hat sich geändert
				} else {
					GM_log("Zeit geändert! Vorher: " + GetTimeFromAttacker(currentattacker) + ", nachher: " + attackertime);
					// Gegner mit Flag "noch nicht gewarnt" speichern
					newattackers = newattackers + attackertime + "*" + attackername + "*" + false + "|";
				}
			// Sonst: Der eingehende Kampf wurde noch nicht gespeichert (neuer Kampf oder Zeit hat sich geändert, z.B. durch Jetpack)
			} else {
				GM_log("Neuer Gegner: " + attackername);
				// Gegner mit Flag "noch nicht gewarnt" speichern
				newattackers = newattackers + attackertime + "*" + attackername + "*" + false + "|";
			}
		}
	}

	// Neue Angreiferliste speichern
	GM_setValue(KEYNAME_INCOMINGFIGHT, newattackers);
}

// **********************************************************************************
// **********************************************************************************
// Funktion prüft auf neue eingehende Kämpfe
// **********************************************************************************
// **********************************************************************************
function UseMedipack() {
	// **********************************************************************************
	// Beziehen der Plunder-Seite
	// **********************************************************************************
	GM_xmlhttpRequest({method: 'GET', url: PLUNDER_URL, onload: function(responseDetails) {
			// Wenn die Seite erfolgreich abgerufen werden konnte
			if (responseDetails.status == 200) {
				var content = responseDetails.responseText;
				var actionnumer = ActionNumber;
				
				// Wenn Medipacks vorhanden sind
				if (content.indexOf(MEDIPACKNAME) != -1) {
					// Actionnumber des Medipacks ermitteln
					actionnumer = ActionNumber;
					// Plunder benutzen
					UsePlunder(actionnumer);
				}
			} else {
				// noch einmal prüfen, ob Medipack angewendet wurde
				CheckForIncomings();
			}
		} 
	});
}

// **********************************************************************************
// **********************************************************************************
// Funktion liefert das zeitlich am nächsten liegende Kampfende zurück
// **********************************************************************************
// **********************************************************************************
function GetNearestImpacttime() {
	// Gespeicherte Angreifer auslesen
	var attackers = GM_getValue(KEYNAME_INCOMINGFIGHT, "").split("|");

	var nearestimpacttime = "24:00:00";
	// Für alle Angreifer
	for (var i = 0; i < attackers.length - 1; i++) {
		var attackertime = Right$("0" + GetTimeFromAttacker(attackers[i]), 8);

		if (attackertime < nearestimpacttime) {
			nearestimpacttime = attackertime;
		}
	}

	// Wenn der Überwachungsspeicher leer ist und es ein nächstes Kampfende gibt
	if (GM_getValue(KEYNAME_WATCHTIME, "") == "" && nearestimpacttime != "24:00:00") {
		// Überwachungsspeicher mit nächstem Kampfende vorbelegen
		GM_setValue(KEYNAME_WATCHTIME, nearestimpacttime)
	}

	return nearestimpacttime;
}
	
// **********************************************************************************
// **********************************************************************************
// Funktion prüft auf neue eingehende Kämpfe
// **********************************************************************************
// **********************************************************************************
function CheckForIncomings() {
	// **********************************************************************************
	// Abrufen von Let's Fight im Hintergrund
	// **********************************************************************************
	GM_xmlhttpRequest({method: 'GET', url: wl(m_ownuserid, 1), onload: function(responseDetails) {
		// **********************************************************************************
		// Funktion ermittelt falls vorhanden die Endzeit eines ausgehenden Kampfes
		// **********************************************************************************
		function GetOutgoing(content) {
			// Wenn derzeit ein ausgehender Kampf läuft
			if (content.indexOf("bereits auf") != -1) {
				// Endzeit des Kampfes ermitteln
				var attacktimeout = content.split("Ende ca. ")[1];
				attacktimeout = trimString(attacktimeout.split(" ")[1].split("<br")[0]);

				// Endzeit des Kampfes zurückliefern
				return attacktimeout;
			// sonst: Es läuft derzeit kein ausgehender Kampf
			} else {
				// Leerstring zurückliefern
				return "";
			}
		}

		// Wenn die Seite erfolgreich abgerufen werden konnte
		if (responseDetails.status == 200) {
			// Seiteninhalt in content speichern
			var content = responseDetails.responseText;

			// Wenn ein Angelhaken eingesetzt wurde
			if (CheckForHooks(content)) {
				// Wenn HookControl aktiv ist
				if (m_hookcontrolenabled) {
					// Medipack verwenden
					UseMedipack();
				}
			}

			// Endzeitpunkt eines evtl. bestehenden ausgehenden Kampfes ermitteln
			var attacktimeout = GetOutgoing(content);

			// Anzahl eingehender Kämpfe ermitteln
			var NrOfFights = GetNumberOfFights(content);

			// Wenn es eingehende Kämpfe oder einen ausgehenden gibt
			if(NrOfFights > 0 || attacktimeout != ""){
				// Aus HTML DOM erstelen
				var doc = HTML2DOM(content);
				// Referenz auf die Tabelle mit den eintreffenden Kämpfen speichern
				var table = doc.getElementsByTagName("table")[2];
				// Einkommende Kämpfe auswerten
				ReadFightData(table);

				// Wenn es einen neuen Alarm gibt
				if (NewAlarm()) {
					if (NeedsReload()) {
						// Seite refreshen
						document.location.reload();
					} else {
						ShowAlarmButton();
						PlaySound(SOUND_URL);
					}
				}
			} else {
				GM_setValue(KEYNAME_INCOMINGFIGHT, "");
			}
			if (attacktimeout != "") {
				GM_setValue(KEYNAME_INCOMINGFIGHT, GM_getValue(KEYNAME_INCOMINGFIGHT, "") + attacktimeout + "*ausgehender|");
			}
		}
		if (GM_getValue("FightAlarmEnabled" + m_ownuserid + TOWNEXTENSION, false)) {
			var nextcheckperiod = 0;
			var nearestimpacttime = GetNearestImpacttime();
			var watchtime = GM_getValue(KEYNAME_WATCHTIME, "");
			var watchtimestring = (watchtime != "") ? " <b>Nächstes Kampfende:</b> " + watchtime : "";

			GM_log(TOWNEXTENSION + ": Nächstes Kampfende: " + nearestimpacttime + ", überwachungsspeicher: " + watchtime);
			if (Math.abs(GetTimeDiffFromNowInSeconds(watchtime)) <= ALERT_PERIOD) {
				nextcheckperiod = ALERT_CHECKPERIODLENGTH * 1000;
				document.getElementById("lastchecktime").innerHTML = '<b><font color="#33CC66">OK - Überwachung eingeschaltet!</font><br>Letzte Überprüfung:</b> ' + FormatTime(new Date()) + ' Uhr (Intensivüberwachung zu Kampfende ' + watchtime + ' +-' + ALERT_PERIOD +  's alle ' + ALERT_CHECKPERIODLENGTH + 's)';
			} else {
				if (watchtime != "") {
					GM_log(TOWNEXTENSION + ": ERSTER DURCHLAUF!");
					GM_setValue(KEYNAME_WATCHTIME, "");
					nearestimpacttime = GetNearestImpacttime();
					watchtime = GM_getValue(KEYNAME_WATCHTIME, "");
					watchtimestring = (watchtime != "") ? " <b>Nächstes Kampfende:</b> " + watchtime : "";

					if (Math.abs(GetTimeDiffFromNowInSeconds(watchtime)) <= ALERT_PERIOD) {
						nextcheckperiod = ALERT_CHECKPERIODLENGTH * 1000;
						GM_log(TOWNEXTENSION + ": ERSTER DURCHLAUF! INTENSIV! " + nextcheckperiod);
					} else {
						nextcheckperiod = Number(GM_getValue("FightAlarmInterval" + m_ownuserid + TOWNEXTENSION, "30")) * 1000;
						GM_log(TOWNEXTENSION + ": ERSTER DURCHLAUF! NORMAL! " + nextcheckperiod);
					}
				} else {
					GM_log(TOWNEXTENSION + ": KEIN ERSTER DURCHLAUF!");
					nextcheckperiod = Number(GM_getValue("FightAlarmInterval" + m_ownuserid + TOWNEXTENSION, "30")) * 1000;
				}
				document.getElementById("lastchecktime").innerHTML = '<b><font color="#33CC66">OK - Überwachung eingeschaltet!</font><br>Letzte Überprüfung:</b> ' + FormatTime(new Date()) + ' Uhr' + watchtimestring;
			}
			GM_log(TOWNEXTENSION + ": Nächstes Angriffsende: " + Math.round(GetTimeDiffFromNowInSeconds(watchtime)) + ", nächste Prüfung in " + nextcheckperiod / 1000 + "s.");
			setTimeout(function () {CheckForIncomings()}, nextcheckperiod);
		} else {
			GM_log(TOWNEXTENSION + ": Let's Fight-Seite konnte nicht abgerufen werden, Fehler: " + responseDetails.status);
		}
	}
	});
}
function GetTimeDiffFromNowInSeconds(fighttime) {
	var now = new Date();

	var comptime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), fighttime.substr(0,2), fighttime.substr(3,2), fighttime.substr(6,2));
	timediff = (comptime - now) / 1000;
	return timediff;
}
var m_ownuserid = getOwnUserID();
var KEYNAME_INCOMINGFIGHT = "IncomingFight" + m_ownuserid + TOWNEXTENSION;
var KEYNAME_COMPARE = "FormerIncomingFight" + m_ownuserid + TOWNEXTENSION;
var KEYNAME_WATCHTIME = "NearestImpacttime" + m_ownuserid + TOWNEXTENSION;
var m_pollingenabled = GM_getValue("FightAlarmEnabled" + m_ownuserid + TOWNEXTENSION, false);
var m_hookcontrolenabled = GM_getValue("HookControlEnabled" + m_ownuserid + TOWNEXTENSION, false);
	InsertControls();
	if (GM_getValue("FightAlarmEnabled" + m_ownuserid + TOWNEXTENSION, false)) {
		CheckForIncomings();
	}
	
// Updatefunktion
function update(){		
	/*var now = (new Date().getTime()/86400000).toString().split('\.')[0];
	var last_update = GM_getValue('last_update','0');
	if (now-last_update >= 1){*/
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.pg-app.de/'+ScriptID+'.meta.js',
			onload: function(content) {
				var scriptname = (/@name\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversionhistory = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversion = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1].substr(0, 3);
				if (newversion != version){
					if (confirm('Es gibt eine neue Version des Skriptes '+scriptname+':\n\nVersion: \n'+newversionhistory+'\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n '+THISSCRIPTINSTALL_URLQ+'\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschliessend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt.')){
						window.location.href = ''+THISSCRIPTSOURCE_URLQ+'';
					}
				}
			}
		}, false);
		/*GM_setValue('last_update', now);
	}*/
}