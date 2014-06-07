// ==UserScript==
// @name           Infozentrale
// @author         sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description    Infozentrale mit Anzeige von Kampf- und Bandenkampfwarnungen, aktuellem Plunder, Wutstatus sowie Kampfstärkebewertung (HH, B und M, PG-Version 4.0)
// @include        http://*.pennergame.de/overview/
// @include        http://*.pennergame.de/skills/*
// @include        http://*.pennergame.de/stock/
// @include        http://*.pennergame.de/news/
// @include        http://*.pennergame.de/friendlist/
// @include        http://*.pennergame.de/change_please/statistics/*
// @include        http://*.pennergame.de/stock/*
// @include        http://*.pennergame.de/profil/*
// @include        http://*.pennergame.de/fight/*
// @include        http://*.pennergame.de/gang/*
// @include        http://*.pennergame.de/messages/*
// @include        http://*.pennergame.de/city/*
// @include        http://*.pennergame.de/activities/*
// @include        http://*.pennergame.de/daily/*
// @version        1.5.4 Falsche Anzahl von eingehenden Angriffen wurde angezeigt
// @version        1.5.3 Ende von WiWu bzw. Wut wurde nicht mehr angezeigt
// @version        1.5.2 Fehler bei Sortierung der eingehenden Angriffe behoben
// @version        1.5.1 kleinere Fehler behoben; Beta für Anzeige der eingehenden Angriffe; Hinweis im Power-Tooltip auf bessere Waffe/Eigenheim/Plunder
// @version        1.4.8 kleiner Fehler behoben: Anzeige von Wutentfachung im Text auch bei WiWu
// @version        1.4.7 Fehler bei Kampfstärkeermittlung bei Wut behoben;
//						 Auch WiWu wird jetzt erkannt und angezeigt;
//						 Ende von WiWu bzw. Wut wird angezeigt;
//						 Hochsetzen des Promillewertes unter Verwendung von Plunder
// @version        1.4.6 Problem mit Umlauten behoben (hoffentlich alle)
// @version        1.4.5 Fehler in Kommentaren behoben
// @version        1.4.4 Essen für Promilleabbau korrigiert; Alphaversion für Anzeige der eingehenden Angriffe
// @version        1.4.3 Beim Waschen wird der Schwamm benutzt, wenn es günstiger ist
// @version        1.4.2 Bugfix für Essen in München; Änderung der Formel für Kampfstärke
// @version        1.4.1 Weitere Anpassungen für München und Verbesserung bei der Essensauswahl
// @version        1.3.8 Einige Anpassungen für München
// @version        1.3.7 Aktueller Plunder wird jetzt immer frisch ermittelt; Bereich auf tägliche Aufgaben erweitert
// @version        1.3.6 tinypic.com scheint ein Problem zu haben, Grafikhoster gewechselt
// @version        1.3.5 Fehler beim Benutzen von Stärkeplunder (Wut- und Poweranzeige funktionierten unter Umständen nicht mehr) behoben
// @version        1.3.4 Erneute Anpassung Wut-Berechnung nach erneuter Änderung durch Farbflut *koppschüttel*; Aktualisierungsabfrage alle 2 Stunden
// @version        1.3.3 Anpassung Wut-Berechnung nach Änderung durch Farbflut; weitere Probleme bei Max-Berechnung korrigiert; Schnellwaschen, -trinken und essen (BETA)
// @version        1.3.2 Benutzbarer Plunder wählbar (mit Sicherheitsabfrage); allg. Verbesserungen, kleinere Dateigrößen; Fehler bei Wuterkennung korrigiert
// @version        1.3.1 Plunderstücke für Direktzugriff auswählbar
// @version        1.3.0 Plunder-Direktzugriff
// @version        1.2.3 Manuelles Zurücksetzen des maximalen Power-Wertes durch Anklicken der Grafik
// @version        1.2.2 Berücksichtigung nicht abrufbarbarer Seiten (Bug Power-Anzeige)
// @version        1.2.1 Bugfixes (Wut/Kampfstärkeberechnung, mehrere Penner)
// @version        1.2.0 Plunderanzeige; Kampfstärkebewertung; Wutanzeige; Ergebnisänderung bei Bandenkämpfen
// @version        1.1.3 Fehlerbehandlung nicht verfügbarer HS + Bandenkampfergebnis im Tooltip
// @version        1.1.2 Erweiterung Links auf Bandenkampfgegner + Zählung Bandenkämpfe
// @version        1.1.1 Erweiterung um Bandenkämpfe
// ==/UserScript==

var THISSCRIPTVERSION = "1.5.4";
var THISSCRIPTNAME = "Infozentrale";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/74435';          // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/74435.user.js'; // Skript-URL bei userscripts.org

// Name PG Warnicon zum Zählen der Angriffe
var ICON_WARNING = 'warning.gif';                                         // PG-Warnicon

// Größe des Kampf- und Bandenkampficons in Pixeln
var ICON_WIDTH = '35';

// Eigene Icons
var ICON_FIGHT_OK = 'http://www.abload.de/img/icon_fight_okmql8.gif';             // Icon Kampfstärke OK
var ICON_FIGHT_WEAK = 'http://www.abload.de/img/icon_fight_weakpsvh.gif';         // Icon Kampfstärke NICHT OK
var ICON_NEW = 'http://www.abload.de/img/newvzxe.png';                            // Icon für Ergebnisänderungen ("NEU")
var ICON_WUTAKTIV = 'http://www.abload.de/img/icon_wutaktivmsdw.gif';             // Icon für Wut AKTIV
var ICON_WUTINAKTIV = 'http://www.abload.de/img/icon_wutinaktivvpns.gif';         // Icon für Wut INAKTIV
var ICON_ERROR = 'http://www.abload.de/img/503xyiz.png';                          // Icon für Fehler beim Abrufen einer Seite 
var ICON_PLNDWUTPOWERBACK = 'http://www.abload.de/img/jij5dxxpmn.gif';            // Icon Hintergrund für Plunder, Wut und Power
var ICON_PLNDWIWUPOWERBACK = 'http://www.abload.de/img/wiwuqcpn.gif';           // Icon Hintergrund für Plunder, WiWu und Power
var ICON_GANGFIGHTBACK = 'http://www.abload.de/img/33oqosk9rgd.gif';              // Icon Bandenkampfhintergrund
var ICON_FIGHTBACK = 'http://www.abload.de/img/muv9q89pyl.gif';                   // Icon Kampfhintergrund
var ICON_PLUNDERDIRECTBACK = 'http://www.abload.de/img/2ag9e9i7qbn.gif';          // Icon Direktplunderhintergrund
var ICON_PLUNDERAUSWAEHLEN = 'http://www.abload.de/img/6qznnpapge.gif';           // Icon Plunder auswählen
var ICON_PLUNDERFREE = 'http://www.abload.de/img/6qznnpapge.gif';                 // Icon Freier Plunderplatz
var ICON_PLUNDERRESET = 'http://www.abload.de/img/ier15ioq7s.png';                // Icon Direktplunder zurücksetzen
var ICON_PLUNDERA = 'http://www.abload.de/img/xnhid4wqm7.gif';                    // Icon anlegbarer Plunder
var ICON_PLUNDERB = 'http://www.abload.de/img/wcoarnwr8k.gif';                    // Icon benutzbarer Plunder
var ICON_NOPLUNDEREQUIP = 'http://www.abload.de/img/icon_wutinaktivvpns8g68.gif'; // Icon für Wut INAKTIV

var ICON_PROMILLEUP = 'http://www.abload.de/img/promilleupvqni.gif';      // Icon Promille hoch
var ICON_PROMILLEDOWN = 'http://www.abload.de/img/242g6mrrows.gif';       // Icon Promille runter
var ICON_PROMILLEBACK = 'http://www.abload.de/img/qnmbthvo9v.gif'         // Icon Promillehintergrund
var ICON_WASH = 'http://www.abload.de/img/wash3s5g.gif';                  // Icon Waschen

// Array für Kampf-Warnicons (unterschiedliche Anzahl eingehender Kämpfe)
var ICON_FIGHT = new Array();
	ICON_FIGHT[0] = 'http://www.abload.de/img/rot1jynv.png';
	ICON_FIGHT[1] = 'http://www.abload.de/img/rot2fyvn.png';
	ICON_FIGHT[2] = 'http://www.abload.de/img/rot3zzss.png';
	ICON_FIGHT[3] = 'http://www.abload.de/img/rot4rbju.png';
	ICON_FIGHT[4] = 'http://www.abload.de/img/rot5eykh.png';
	ICON_FIGHT[5] = 'http://www.abload.de/img/rottotenkopfpz4k.png';

// Array für Bandenkampf Warnicons (unterschiedliche Anzahl eingehender Bandenkämpfe)
var ICON_GANGFIGHT = new Array();
	ICON_GANGFIGHT[0] = 'http://www.abload.de/img/blau1dxuu.png';
	ICON_GANGFIGHT[1] = 'http://www.abload.de/img/blau2zblf.png';
	ICON_GANGFIGHT[2] = 'http://www.abload.de/img/blau35xks.png';
	ICON_GANGFIGHT[3] = 'http://www.abload.de/img/blau4p9rp.png';
	ICON_GANGFIGHT[4] = 'http://www.abload.de/img/blau5jb7e.png';
	ICON_GANGFIGHT[5] = 'http://www.abload.de/img/blautotenkopfgbh9.png';

// Konstanten für Wut-Zustand
var WUTSTATE_ACTIVE = 0;
var WUTSTATE_INACTIVE = 1;
var WUTSTATE_ERROR = 2;

// Konstanten für Fightstate-Zustand
var FIGHTSTATE_OK = 0;
var FIGHTSTATE_WEAK = 1;
var FIGHTSTATE_ERROR = 2;

// IDs zum Zugriff auf Nahrungsmittel
var ID_BEER = 1;
var ID_BREAD = 2;
var ID_CURRY = 3;
var ID_DOENER = 4;
var ID_WODKA  = 7;
var ID_GRUSEL = 8;
var ID_SWEETS = 9;
var ID_GLUEHW = 10;
var ID_STOLLN = 11;

// URL für Anwenden des Plunders
var PLUNDERIMAGE_URL = "http://static.pennergame.de/img/pv4/plunder/";

// Diverse Texte
var TOOLTIP_PLUNDERAUSWAHL = 'Hier klicken, um weitere Plunderstücke für den Direktzugriff auszuwählen. Die Anzeige im Plunder-Direktzugriff erfolgt in der Reihenfolge des Hinzufügens.';
var TOOLTIP_PLUNDERRESET = 'Hier klicken, um die Plunder-Direktzugriffsliste zu leeren.';
var TOOLTIP_FIGHTOK1 = 'Deine aktuelle Kampfstärke ist optimal ';
var TOOLTIP_FIGHTOK2 = '! Anklicken --> RESET des Power-Wertes.';
var TOOLTIP_FIGHTWEAK1 = 'Achtung, Du hast derzeit nicht Deine maximale Kampfstärke ';
var TOOLTIP_FIGHTWEAK2 = '! Anklicken --> RESET des Power-Wertes.';
var TOOLTIP_LOADERROR = 'Seitenladefehler!';
var TOOLTIP_WIWUTAKTIV = ' ist aktiv! Ende: ';
var TOOLTIP_WIWUTINAKTIV = ' derzeit NICHT aktiv!';

var ALERT_PLUNDERRESET = 'Die Plunder-Direktzugriffsliste wurde geleert!';
var ALERT_RESETPOWER = 'Der maximale Power-Wert wurde zurückgesetzt und wird jetzt neu ermittelt!';

// Koordinaten
var PD_X = 748;   // X-Koordinate Plunderdirektleiste
var PD_Y = 235;   // Y-Koordinate Plunderdirektleiste
var PW_X = 625;   // X-Koordinate Promilleleiste
var PW_Y = PD_Y;  // Y-Koordinate Promilleleiste

// ***********************************************************************************************
// Stadt ermitteln und Variablen entsprechend setzen
// ***********************************************************************************************
var idoffood = new Array();
    idoffood[0] = ID_SWEETS;
    idoffood[1] = ID_BREAD;
    idoffood[2] = ID_CURRY;
    idoffood[3] = ID_STOLLN;
    idoffood[4] = ID_DOENER;

var promillevals = new Array();
    promillevals[0]=0.15;
    promillevals[1]=0.35;
    promillevals[2]=1;
    promillevals[3]=1.5;
    promillevals[4]=2;

var alcoplunder = new Array();
alcoplunder[0] = "Nikolaus-Plunder";
alcoplunder[1] = "Goldenes Bier";

var exalcoplunder = new Array();
var alcoActionNr = new Array();
var alcoPlunderInfo = new Array();

var restPlunder = "";
var restPlunderimg;
var restActionNr = "";
var restIndex = -1;

var FoodNames = new Array();
// Wenn in Berlin gespielt wird
if (location.toString().indexOf("berlin") != -1) {
	var BerlinFlag = true;
	var TOWNBASE_URL = 'http://berlin.pennergame.de/';
	var TOWNEXTENSION = 'B';
        FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
        FoodNames[1] = 'Stullen';
        FoodNames[2] = 'Curryw&uuml;rste';
        FoodNames[3] = 'Stollen';
        FoodNames[4] = 'D&ouml;ner';
// Wenn in Hamburg gespielt wird
} else if (location.toString().indexOf("www.pennergame.de") != -1) {
	var BerlinFlag = false;
	var TOWNBASE_URL = 'http://www.pennergame.de/';
	var TOWNEXTENSION = 'HH';
        FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
        FoodNames[1] = 'Brote';
        FoodNames[2] = 'Curryw&uuml;rste';
        FoodNames[3] = 'Stollen';
        FoodNames[4] = 'Hamburger';
// Wenn in New York gespielt wird
} else if (location.toString().indexOf("bumrise") != -1) {
	var TOWNBASE_URL = 'http://www.bumrise.com/';
	var TOWNEXTENSION = 'NY';
        FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
        FoodNames[1] = 'Loaf of Bread';
        FoodNames[2] = 'Hot Dog';
        FoodNames[3] = 'Stollen';
        FoodNames[4] = 'Beef Eater Burger';
// Wenn in München gespielt wird
} else if (location.toString().indexOf("muenchen") != -1) {
	var TOWNBASE_URL = 'http://muenchen.pennergame.de/';
	var TOWNEXTENSION = 'MU';
        FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
        FoodNames[1] = 'Leberkas';
        FoodNames[2] = 'Obatzter';
        FoodNames[3] = 'Stollen';
        FoodNames[4] = 'Weißwurst und a Brezn';
}

var Wutfaehig = false;
var WutDatum;

var FIGHT_URL = TOWNBASE_URL + 'fight/overview/';
var GANGFIGHT_URL = TOWNBASE_URL + 'gang/fight/';
var GANGUPGRADE_URL = TOWNBASE_URL + 'gang/upgrades/';
var GANGSEARCH_URL = TOWNBASE_URL + 'highscore/gang/?gang=';
var GANG_URL = TOWNBASE_URL + 'gang/';
var WB_URL = TOWNBASE_URL + 'skills/';
var WEAPON_URL = TOWNBASE_URL + 'stock/armoury/';
var PLUNDER_URL = TOWNBASE_URL + 'stock/plunder/';
var PLUNDERCHANGE_URL = TOWNBASE_URL + 'stock/plunder/change/';
var EAT_URL = TOWNBASE_URL + 'stock/foodstuffs/use/';
var EAT_STACK = TOWNBASE_URL + 'stock/foodstuffs/food/';
var DRINK_STACK = TOWNBASE_URL + 'stock/';
var HOME_URL = TOWNBASE_URL + 'city/home/';
var WASH_URL = TOWNBASE_URL + 'city/washhouse/buy/';
var WEAPONSTORE_URL = TOWNBASE_URL + 'city/weapon_store/';
var OVERVIEW_URL = TOWNBASE_URL + 'overview/';

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
	
	var b = GM_getValue("bl" + ((BerlinFlag) ? "b" : "h"), "").replace(/&amp;/, "&");
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
		
		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abrufen der Skriptseite von userscripts.org
		// **********************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: THISSCRIPTINSTALL_URL, onload: function(responseDetails) {
			// Wenn die Seite erfolgreich abgerufen werden konnte
			if (responseDetails.status == 200) {
				var content = responseDetails.responseText;
	
				// Ermitteln der Skriptversion
				var scriptversion = content.split("<b>Version:</b>")[1];
				var scriptfullversion = trimString(scriptversion .split("<br")[0]);
				scriptversion = trimString(scriptversion .split("<br")[0]).substr(0, 5);
	
				var keyname = "bl" + ((BerlinFlag) ? "b" : "h");
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
// Funktion ermittelt die Anzahl eintreffender Kämpfe
// **********************************************************************************
// **********************************************************************************
function GetNumberOfFights(content) {
	var fighttext = "";
	try {
		// Seiteninhalt aufsplitten mit dem Namen des Icons, das für eintreffende Kämpfe verwendet wird;
		// Anzahl der Teile des Splittings - 1 ist die Anzahl eintreffender Kämpfe
		var splitted = content.split(ICON_WARNING);
		for (i = 0; i < splitted.length - 1; i++) {
			var tds = splitted[i + 1].split('<td>');
			var time = tds[1].split('<')[0];
			var attacker = tds[2].split('>')[1].split('<')[0];
			var ausweich = tds[4].indexOf('Sicher') != -1?"V":tds[4].indexOf('Ausweichen') != -1?"A":"N";
			fighttext += time + ' ' + attacker + '#' + ausweich + '/';
		}
		return fighttext;
	} catch(err) {
		GM_log("Fehler beim Ermitteln der Zahl eintreffender Kämpfe: " + err);
	}
	return fighttext;
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die aktuellen Bandenkampfresultate
// **********************************************************************************
// ********************************************************************************** 
function GetGangFightInfo(content) {
	try {
		// Anzahl der Bandenkämpfe ermitteln
		var NrOfGangFights = content.split('<a href="/gang/fight/view/').length - 1;
		// HTML nach Gegnerbanden splitten
		GangFightGangs = content.split('<td height="29" style="vertical-align:middle;">&nbsp;');
		// HTML nach Resultaten splitten
		GangFightResults = content.split('<td style="vertical-align:middle;"><div align="center" class="drop_font"><strong>');
		
		// Textvariable für Bandenkampfinfo initialisieren
		var GangFightInfo = "";
		
		// Für alle Bandenkämpfe
		for (i = 1; i <= NrOfGangFights; i++) {
			// Aktuelles Resultat in die Textvariable hinzufügen
			GangFightInfo = GangFightInfo + " *** " + GangFightGangs[i].split('</td>')[0] + " " + GangFightResults[i].split('</strong></div></td>')[0];
		}
		
		// Bandenkampf-Infotext zurückgeben
		return GangFightInfo;
	} catch(err) {
		GM_log("Fehler beim Ermitteln der aktuellen Bandenkampfresultate: " + err);
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Anzahl Bandenkämpfe
// **********************************************************************************
// ********************************************************************************** 
function GetNumberOfGangFights(content) {
	try { 
		// Seiteninhalt aufsplitten mit dem Namen des Icons, das für eintreffende Kämpfe verwendet wird; 
		// Anzahl der Teile des Splittings - 1 ist die Anzahl eintreffender Kämpfe 
		return content.split('<a href="/gang/fight/view/').length - 1;
		
	} catch(err) {
		GM_log("Fehler beim Ermitteln der Zahl von Bandenkämpfen: " + err); 
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt den Bandennamen aus einer übergebenen Tabellenzeile
// **********************************************************************************
// **********************************************************************************
function GetGangnameFromTable(gangtr) {
	try {
		// Inhalt der ersten Zelle auslesen
		var gangname = gangtr.getElementsByTagName("td")[0].innerHTML;
		// "&nbsp;" am Anfang entfernen und Wert zurückgeben
		gangname = gangname.substring(6);
		
		return gangname;
	} catch(err) {
		GM_log("Fehler beim Ermitteln des Bandennamens: " + err);
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Banden-IDs und überführt die Bandennamen in Links auf die
// Bandenprofile
// **********************************************************************************
// **********************************************************************************
function LinkifyGangnames(gangtr) {

	// Ermitteln des Bandennamens aus der aktuellen Tabellenzeile
	var gangname = GetGangnameFromTable(gangtr);
	
	// Wenn der Bandenname nicht die Benachrichtigung über "keine laufenden Kämpfe" ist
	if (gangname.indexOf("Keine laufenden") == -1) {
		// Für die Suche werden Spaces durch "+" ersetzt
		var gangnamesearch = gangname.replace(/ /g, "+");
		gangnamesearch = gangnamesearch.replace(/&amp;/g, "%26");
// Weitere Zeichenersetzungen, die noch getestet werden müssen
//		gangnamesearch = gangnamesearch.replace(/$/g, "%24");
//		gangnamesearch = gangnamesearch.replace(/@/g, "%40");
//		gangnamesearch = gangnamesearch.replace(/+/g, "%2B");

		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abrufen der Bandensuchseite
		// **********************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: GANGSEARCH_URL + gangnamesearch + "&min=&max=", onload: function(responseDetails) {
				try {
					// Content der Bandensuchseite speichern
					var content = responseDetails.responseText;
		
		
					// Extrahieren der Banden-ID
					var gangid = content.split('hs_bande')[1];
					gangid = gangid.split('</table>')[0];

					gangname = gangname.replace(/&amp;/g, "&");

					if (gangid.indexOf(gangname) != -1) {
						gangid = gangid.split('/">' + gangname + '</a>')[0];
						gangid = gangid.split(":");
						gangid = gangid[gangid.length - 1];
						
						// Zusammenbauen eines Links auf das Bandenprofil und in die aktuelle Tabellenzeile einfügen (Ersetzen des Textes)
						gangtr.getElementsByTagName("td")[0].innerHTML = '&nbsp;<a href="/profil/bande:' + gangid + '/" target="_blank">' + gangname + '</a>'; 
					} else {
						GM_log("Bandenname '" + gangname + "' konnte im HS nicht gefunden werden.");
					}
				} catch (err) {
					GM_log("Fehler beim Verlinken des gegnerischen Bandenprofils: " + err);
				}
			}
		});
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
// **********************************************************************************
// Funktion prüft, ob die aktuelle Seite die Plunderseite ist
// **********************************************************************************
// **********************************************************************************
function IsPlunderPage() {
	// Aktuelle Seiten-URL ermitteln
	var currentURL = location.toString();

	// Wenn es sich bei der aktuellen Seite um die Plunderseite handelt
	if (Right$(currentURL, 23) == "/stock/plunder/?success" || Right$(currentURL, 15) == "/stock/plunder/") {
		// True zurückgeben
		return true;
	} else {
		// False zurückgeben
		return false;
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob die aktuelle Seite die Seite "*.pennergame.de/gang/fight/"
// ist (nur dort soll LinkifyGangnames wirken)
// **********************************************************************************
// **********************************************************************************
function IsFightOverviewPage() {
	// Aktuelle Seiten-URL ermitteln
	var currentURL = location.toString();
	// Länge der aktuellen Seiten-URL ermitteln
	var currentURLLen = currentURL.length;

	// Wenn die aktuelle Seiten-URL länger als 25 Zeichen ist
	if (currentURLLen > 25) {
		// Wenn die aktuelle Seiten-URL mit "pennergame.de/gang/fight/" endet
		if (currentURL.substr(currentURLLen - 25, 25)== "pennergame.de/gang/fight/") {
			// True zurückgeben
			return true;
		// sonst: Die aktuelle Seiten-URL endet nicht mit "pennergame.de/gang/fight/"
		} else {
			// False zurückgeben
			return false;
		}
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob es Neuigkeiten beim Bandenkampf gibt
// **********************************************************************************
// **********************************************************************************
function CheckNewsFromGangFight(GangFightInfo) {
	var currentGangFightInfo = 	GM_getValue("GangFightInfo" + m_ownuserid + TOWNEXTENSION,"");
	
	// Wenn sich die Info geändert hat
	if (currentGangFightInfo != GangFightInfo) {
		// Setze das Änderungsflag
		GM_setValue("GangFightInfoFlag" + m_ownuserid + TOWNEXTENSION, true);
	}	
}

// **********************************************************************************
// **********************************************************************************
// Funktion setzt die Neuigkeiten vom Bandenkampf zurück
// **********************************************************************************
// **********************************************************************************
function ResetNewsFromGangFight(GangFightInfo) {
	// Setze GangFightInfo auf den aktuellen Stand
	GM_setValue("GangFightInfo" + m_ownuserid + TOWNEXTENSION, GangFightInfo);
	// Setze das Flag zurück
	GM_setValue("GangFightInfoFlag" + m_ownuserid + TOWNEXTENSION, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt den ATT- oder DEF-Wert aus der übergebenen Zeile
// ***********************************************************************************************
// ***********************************************************************************************
function GetValueFromRow(currenttr) {
	return currenttr.getElementsByTagName("td")[1].innerHTML.split("<a class")[0];
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

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob eine ATT-Steigerung vorliegt
// ***********************************************************************************************
// ***********************************************************************************************
function HasATTBoost(content) {
	var doc = HTML2DOM(content);
	var buffs = doc.getElementsByClassName("style_buff");

	// Wenn die Klasse vorhanden ist, die Steigerungen beinhaltet	
	if (buffs.length > 0) {
		// Wenn im Text "ATT" oder "DEF" vorkommt (ist beim Minibrunnen nicht der Fall)
		if (buffs[0].parentNode.innerHTML.indexOf("ATT:") != -1 || buffs[0].parentNode.innerHTML.indexOf("DEF:") != -1) {
			return true;
		// sonst: Im Text kommt nicht "ATT" vor (ist beim Minibrunnen der Fall)
		} else {
			return false;
		}
	// sonst: Die Klasse, die Steigerungen beinhaltet, ist nicht vorhanden
	} else {
		return false;
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt die Höhe der ATT-Steigerung
// ***********************************************************************************************
// ***********************************************************************************************
function GetATTBoost(content) {
	
	// Wenn eine ATT-Stärkung vorliegt
	if (HasATTBoost(content)) {
		var attboost = content.split("<span><b>Stärkung:</b>")[1];
		attboost = attboost.split("ATT: ")[1];
		attboost = attboost.split("<br>")[0];
		
		return attboost;
	// sonst: Es liegt keine ATT-Stärkung vor
	} else {
		return 0;
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt die Höhe der DEF-Steigerung
// ***********************************************************************************************
// ***********************************************************************************************
function GetDEFBoost(content) {
	// Wenn eine DEF-Stärkung vorliegt
	if (HasATTBoost(content)) {
		var defboost = content.split("<span><b>Stärkung:</b>")[1];
		if (defboost.indexOf("DEF: ") != -1) {
			defboost = defboost.split("DEF: ")[1];
			defboost = defboost.split("<br>")[0];
			return defboost;
		} else {
			return 0;
		}
	// sonst: Es liegt keine DEF-Stärkung vor
	} else {
		return 0;
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Baut Zusatzinfo zusammen
// ***********************************************************************************************
// ***********************************************************************************************
function makeAddInfo() {
	var addInfo = "";
	if (weaponcheck1 != "" && weaponcheck1 != undefined)
		addInfo += ' ' + weaponcheck1 + '.';
	if (weaponcheck2 != "" && weaponcheck2 != undefined)
		addInfo += ' ' + weaponcheck2 + '.';
	if (homecheck != "" && homecheck != undefined)
		addInfo += ' ' + homecheck + '.';
	if (plundercheck != "" && plundercheck != undefined)
		addInfo += ' ' + plundercheck + '.';
	return addInfo;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Berechnet aus ATT und DEF die Kampfkraft
// ***********************************************************************************************
// ***********************************************************************************************
function GetPower(attvalue, defvalue) {
	return (Number(attvalue) * 1.1 + Number(defvalue)).toFixed(2);
}

// **********************************************************************************
// **********************************************************************************
// Vergleicht die aktuelle Stärke mit der Max-Stärke und setzt das richtige Icon
// **********************************************************************************
// **********************************************************************************
function ComparePower(attvalue, defvalue) {

	// Kampfkraft errechnen
	var fightpower = GetPower(attvalue, defvalue)

	// Auslesen des bisherigen Maximalwertes
	var powermaxvalue = Number(GM_getValue("PowerMaxValue" + m_ownuserid + TOWNEXTENSION, 0));
	
	// Wenn die aktuelle Kampfkraft größer als der bisherige Maximalwert ist
	if (fightpower > powermaxvalue) {
		// Größte Kampfkraft hochsetzen
		GM_setValue("PowerMaxValue" + m_ownuserid + TOWNEXTENSION, fightpower.toString());
	}
	
	// Wenn die aktuelle Kampfkraft größer oder gleich der bislang größten ist
	if (fightpower >= powermaxvalue) {
		ShowFightStateIcon(FIGHTSTATE_OK, fightpower, powermaxvalue);
	// sonst: Die aktuelle Kampfkraft ist kleiner als die bislang größte
	} else {
		ShowFightStateIcon(FIGHTSTATE_WEAK, fightpower, powermaxvalue);
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die aktuellen Skillwerte etc.
// **********************************************************************************
// **********************************************************************************
function GetAllValues(attvalue, defvalue) {
		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abfragen der aktuellen Skill-Level
		// **********************************************************************************
		GM_xmlhttpRequest({method:"GET", url: WB_URL, onload:function(responseDetails) {
				var content = responseDetails.responseText;

				// Aus HTML ein DOM-Objekt erzeugen
				var doc = HTML2DOM(content);

				var tables = doc.getElementsByTagName("table");
				for (var i = 0; i < tables.length; i++) {
					var table = tables[i];
				
					// Referenz auf Tabellenzeilen in trs speichern
					var trs = table.getElementsByTagName("tr");
					if (trs[0].innerHTML.indexOf('Voraussichtlich') != -1 || trs[0].innerHTML.indexOf('processbar_bg') == -1)
						continue;
					var skill = trs[0].innerHTML.split('<strong>')[1].split('</strong>')[0];
					var skillLvl = trs[0].innerHTML.split('="108">')[1].split('<span')[0];
					switch (skill) {
						case 'Angriff':	ATTSkill = Number(skillLvl);
										break;
						case 'Verteidigung':	DEFSkill = Number(skillLvl);
										break;
						case 'Geschicklichkeit':	DEXSkill = Number(skillLvl);
										break;
						default: break;
					}
				}
				GM_xmlhttpRequest({method: 'GET', url: OVERVIEW_URL,	onload: function(responseDetails) {
					var doc = HTML2DOM(responseDetails.responseText);
					var datadiv = doc.getElementsByClassName("tieritemA");
					for (var i = 0; i < datadiv.length; i++)
						if (datadiv[i].innerHTML.indexOf('Neues Haustier kaufen') != -1) {
							petATT = datadiv[i].innerHTML.split('class="att">')[1].split(' ')[0];
							petDEF = datadiv[i].innerHTML.split('class="def">')[1].split(' ')[0];
						} else if (datadiv[i].innerHTML.indexOf('Zum Waffenladen') != -1) {
							weaponATT = datadiv[i].innerHTML.split('class="att">')[1].split(/<| /)[0];
							if (isNaN(weaponATT))
								weaponATT = 0;
							homeDEF = datadiv[i].innerHTML.split('class="def">')[1].split('</span')[0];
							if (isNaN(homeDEF))
								homeDEF = 0;
						}
					// **********************************************************************************
					// *** GM_XMLHTTPREQUEST *** Abrufen der Plunder-Seite, Prüfen, ob besserer Plunder da
					// **********************************************************************************
					GM_xmlhttpRequest({method:"GET", url: PLUNDER_URL, onload:function(responseDetails) {
							// Aktuellen Plunder ermitteln und anzeigen
							var content = responseDetails.responseText;
							var aktPlunder = "";
							var pATTval = Math.floor((ATTSkill + Number(petATT) + Number(weaponATT)) * ATTperc);
							var pDEFval = Math.floor((DEFSkill + Number(petDEF) + Number(homeDEF)) * DEFperc);
							var bestFightVal = Number(GetPower(pATTval, pDEFval));
							var bestPlunder = "";

							// Aus dem Responsetext ein Document machen
							var doc = HTML2DOM(content);
							
							if (content.indexOf("Du hast keinen Plunder angelegt") == -1) {
								// URL des aktuellen Plunderstücks extrahieren
								var plunderbox = doc.getElementsByClassName("box special")[0];
							
								// Namen des aktuellen Plunderstücks extrahieren
								aktPlunder = plunderbox.innerHTML.split('</h4>')[0].split('alt=" "> ')[1];
								}

							// Referenz auf Plundertabelle speichern
							var plundertable = doc.getElementsByTagName("table")[0];
							// Referenz auf Zeilen der Plundertabelle speichern
							var plundertrs = plundertable.getElementsByTagName("tr");

							for (var i = 0; i < plundertrs.length; i++) {
								if (i == 0)
									if (aktPlunder == "")
										continue;
									else
										var plunderHTML = plunderbox.innerHTML;
								else
									var plunderHTML = plundertrs[i].innerHTML;
								var plunder = (i == 0)?aktPlunder:plunderHTML.split('change_stuff')[1].split(')">')[1].split('</a>')[0];
								if (plunderHTML.indexOf('ATT:') != -1)
									var pATT = plunderHTML.split('ATT:')[1].split('</li>')[0];
								else
									var pATT = 0;
								if (plunderHTML.indexOf('DEF:') != -1)
									var pDEF = plunderHTML.split('DEF:')[1].split('</li>')[0];
								else
									var pDEF = 0;
								var addDEF = 1;
								var addATT = 1;
								if (plunderHTML.indexOf('Erhöht') != -1)
									if (plunderHTML.indexOf('%') != -1) {
										var addText = plunderHTML.split('Erhöht')[1].split('%')[0];
										var addTextSplit = addText.split(' ');
										var addPerc = addTextSplit[addTextSplit.length-1];
										if (addText.indexOf('ATT') != -1)
											addATT = 1 + Number(addPerc) / 100;
										if (addText.indexOf('DEF') != -1)
											addDEF = 1 + Number(addPerc) / 100;
									}
								pATTval = Math.floor((ATTSkill + Number(petATT) + Number(weaponATT) + Number(pATT)) * ATTperc * addATT);
								pDEFval = Math.floor((DEFSkill + Number(petDEF) + Number(homeDEF) + Number(pDEF)) * DEFperc * addDEF);
								var pPower = Number(GetPower(pATTval, pDEFval));
								if (bestFightVal < pPower) {
									bestFightVal = pPower;
									bestPlunder = plunder;
									}
								}
							if (bestPlunder != aktPlunder)
								plundercheck = 'Durch Anlegen des Plunders "' + bestPlunder + '" wäre Deine Kampfkraft am größten';
							else
								plundercheck = "";

							// Vergleich der aktuellen Stärke mit der Max-Stärke
							ComparePower(attvalue, defvalue);
							}
						});
					}
				});
			}
		}); 
}
		
// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die aktuellen Kampfwerte
// **********************************************************************************
// **********************************************************************************
function CheckFightValues(content) {
	// Aus HTML ein DOM-Objekt erzeugen
	var doc = HTML2DOM(content)

	var table = doc.getElementsByTagName("table")[0];
	
	// Referenz auf Tabellenzeilen in trs speichern
	var trs = table.getElementsByTagName("tr");

	// Eigenen ATT-Wert ermitteln
	var attvalue = GetValueFromRow(trs[2]); 
	// Eigenen DEF-Wert ermitteln
	var defvalue = GetValueFromRow(trs[3]); 

	// **********************************************************************************
	// *** GM_XMLHTTPREQUEST *** Abrufen der Bandenseite
	// **********************************************************************************
	GM_xmlhttpRequest({method: 'GET', url: GANG_URL,onload: function(gangresponseDetails) {
		// Wenn die Bandenseite abgerufen werden konnte
		if (gangresponseDetails.status == 200 &&
			gangresponseDetails.responseText.indexOf('500 - Internal Server Error') == -1) {
			// Content der Bandenseite speichern
			var gangcontent = gangresponseDetails.responseText;
//			// Wenn man in einer Bande ist
			var KEYWORD_MYBUM = (TOWNEXTENSION == 'NY') ? '<strong>My bum</strong>' : 'Du bist in keiner Pennerbande';
			GM_log("gangcontent.indexOf(KEYWORD_MYBUM) == -1: " + gangcontent.indexOf(KEYWORD_MYBUM) == -1);
			if (gangcontent.indexOf(KEYWORD_MYBUM) == -1) {
				GM_log("IN BANDE");

				GM_xmlhttpRequest({method: 'GET', url: GANGUPGRADE_URL,onload: function(gangresponseDetails) {
					// Wenn die Bandenseite abgerufen werden konnte
					if (gangresponseDetails.status == 200 &&
						gangresponseDetails.responseText.indexOf('500 - Internal Server Error') == -1) {
						// Content der Bandenseite speichern
						var gangcontent = gangresponseDetails.responseText;

						// Waffenkammer und Bandenhaus ermitteln
						ATTperc = 1 + Number(gangcontent.split('Waffenkammer')[1].split('(')[1].split('%')[0]) / 100;
						DEFperc = 1 + Number(gangcontent.split('Bandenhaus')[1].split('(')[1].split('%')[0]) / 100;
						
						// Wenn Wut oder WIWu gestartet ist
						var wuttest = gangcontent.split('Wutentfachung')[1];
						wuttest = wuttest.split('Stufe: ')[1];
						Wutfaehig = (wuttest.substr(0,1) == "1");
						if (gangcontent.indexOf('Eine F&auml;higkeit wurde bereits aktiviert') != -1) {
							// WiWu- bzw. Wutstatus speichern
							GM_setValue("WutActive" + m_ownuserid + TOWNEXTENSION, WUTSTATE_ACTIVE);
			
							// Korrigieren der ATT-Summe um 4 ATT-Punkte
							if (Wutfaehig)
								attvalue = attvalue - 4;

							wuttext = gangcontent.split(' und l&auml;uft noch bis ')[1];
							WutDatum = wuttext.substr(8,2) + '.' + wuttext.substr(5,2) + '.' + wuttext.substr(0,4) + wuttext.substr(10,9);
						// sonst: WiWu bzw. Wut ist nicht gestartet
						} else {
							// WiWu- bzw. Wutstatus speichern
							GM_setValue("WutActive" + m_ownuserid + TOWNEXTENSION, WUTSTATE_INACTIVE);
						}
			
						// ATT-Wert um eine eventuell vorhandene ATT-Stärkung (z.B. schwarzes Loch +1, +2, +3) korrigieren
						attvalue = attvalue - GetATTBoost(table.innerHTML);
						// DEF-Wert um eine eventuell vorhandene DEF-Stärkung (z.B. Kürbis) korrigieren
						defvalue = defvalue - GetDEFBoost(table.innerHTML);
			
						// Vergleich der aktuellen Stärke mit der Max-Stärke
						ComparePower(attvalue, defvalue);
						GetAllValues(attvalue, defvalue);
						}
						
						// Anzeige des WiWu- bzw. Wut-Status
						ShowWutIcon(GM_getValue("WutActive" + m_ownuserid + TOWNEXTENSION, false));
				}});
			// sonst: Bandenseite konnte nicht geladen werden
			} else {
				GM_log("NICHT IN BANDE");

				// WiWu- bzw. Wutstatus speichern (keine Wut)
				GM_setValue("WutActive" + m_ownuserid + TOWNEXTENSION, WUTSTATE_INACTIVE);
				
				// Anzeige des WiWu- bzw. Wut-Status
				ShowWutIcon(GM_getValue("WutActive" + m_ownuserid + TOWNEXTENSION, false));

				ATTperc = 1.0;
				DEFperc = 1.0;

				// Vergleich der aktuellen Stärke mit der Max-Stärke
				ComparePower(attvalue, defvalue);
				GetAllValues(attvalue, defvalue);
			}
		} else {
			// WiWu- bzw. Wutstatus speichern (Fehler)
			GM_setValue("WutActive" + m_ownuserid + TOWNEXTENSION, WUTSTATE_ERROR);
			
			// Anzeige des WiWu- bzw. Wut-Status
			ShowWutIcon(GM_getValue("WutActive" + m_ownuserid + TOWNEXTENSION, false));
			// Powerwerte können nicht richtig berechnet werden
			ShowFightStateIcon(FIGHTSTATE_ERROR, 0);
			ATTperc = 1.0;
			DEFperc = 1.0;
		}
	}});
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt eine Grafik an, ggf. mit Link
// **********************************************************************************
// **********************************************************************************
function ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid) {
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
		var newimg = document.getElementById("wrap").appendChild(document.createElement('img'));
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
	newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt das Bandenkampf-Icon an
// **********************************************************************************
// **********************************************************************************
function ShowGangFightIcon(GangFightIcon, GangfightTitle) {
	ShowImg('/gang/fight/', ICON_GANGFIGHT[GangFightIcon], GangfightTitle, ICON_WIDTH, ICON_WIDTH, '790', '17', '105');
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt das Neu-Icon an
// **********************************************************************************
// **********************************************************************************
function ShowNewIcon() {
	ShowImg('/gang/fight/', ICON_NEW, '', '', '', '810', '14', '200');
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt das Kampf-Icon an
// **********************************************************************************
// **********************************************************************************
function ShowFightIcon(FightIcon, FightTitle) {
	ShowImg('/fight/overview/#form1', ICON_FIGHT[FightIcon], FightTitle, ICON_WIDTH, ICON_WIDTH, '850', '17', '104');
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt das Kampfstatus-Icon an
// **********************************************************************************
// **********************************************************************************
function ShowFightStateIcon(FightState, currentpower, maxpower) {
	switch (FightState) {
		case FIGHTSTATE_OK: 
			ShowFightImg(ICON_FIGHT_OK, TOOLTIP_FIGHTOK1 + '(' + currentpower + ')' + TOOLTIP_FIGHTOK2 + makeAddInfo(), '', '', '956', '192', '103');
			break;
		case FIGHTSTATE_WEAK: 
			ShowFightImg(ICON_FIGHT_WEAK, TOOLTIP_FIGHTWEAK1 + '(' + currentpower + '/' + maxpower + ')' + TOOLTIP_FIGHTWEAK2 + makeAddInfo(), '', '', '956', '192', '103');
			break;
		case FIGHTSTATE_ERROR: 
			ShowImg('', ICON_ERROR, TOOLTIP_LOADERROR, '', '', '956', '192', '103');
			break;
		default: 
			ShowImg('/gang/upgrades/', ICON_ERROR, 'Unbekannter Zustand!', '', '', '915', '193', '102');
			break;
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt Hintergrundgrafiken an
// **********************************************************************************
// **********************************************************************************
function ShowBackgrounds() {
	ShowImg('/gang/fight/', ICON_GANGFIGHTBACK, '', '', '', '780', '2', '49');
	ShowImg('/fight/', ICON_FIGHTBACK, '', '', '', '840', '2', '50');
	
	if (Wutfaehig)
		ShowImg('', ICON_PLNDWUTPOWERBACK, '', '', '', '866', '170', '51');
	else
		ShowImg('', ICON_PLNDWIWUPOWERBACK, '', '', '', '866', '170', '51');

//	ShowImg('/stock/plunder/', ICON_PLUNDERBACK, '', '', '', '866', '170', '51');
//	ShowImg('/gang/upgrades/', ICON_WUTBACK, '', '', '', '908', '170', '52');
	
//	ShowImg('', ICON_FIGHTSTATUSBACK, '', '', '', '950', '170', '53');
	ShowImg('', ICON_PLUNDERDIRECTBACK, '', '', '', PD_X, PD_Y, '54');
	ShowImg('', ICON_PROMILLEBACK, '', '', '', PW_X, PW_Y, '51');
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt Power-Grafik mit Rücksetzmöglichkeit an
// **********************************************************************************
// **********************************************************************************
function ShowFightImg(imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex) {
	// Link zusammenbauen
	var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
	newlink.setAttribute('href', '#');

	newlink.addEventListener("click", function(event) 
	{ 
		// Kampfstärke auf 0 zurücksetzen
		GM_setValue("PowerMaxValue" + m_ownuserid + TOWNEXTENSION, "0");
		alert(ALERT_RESETPOWER)
	}, false);

	// Grafik zusammenbauen
	var newimg = newlink.appendChild(document.createElement('img'));

	newimg.setAttribute('src', imgsource);
	newimg.setAttribute('border', '0');
	if (imgwidth != '') {
		newimg.setAttribute('width', imgwidth);
	}
	if (imgheight != '') {
		newimg.setAttribute('height', imgheight);
	}
	newimg.setAttribute('title', imgtitle);
	newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt Plunder an
// **********************************************************************************
// **********************************************************************************
function ShowCurrentPlunder(plunderimg, plundername) {
	// Wenn derzeit kein Plunder angelegt ist
	if (plunderimg == "none") {
		plunderimg = ICON_NOPLUNDEREQUIP;
		plundername = "Kein Plunder angelegt";
	}

	ShowImg('/stock/plunder/', plunderimg, plundername, '', '', '873', '193', '101');
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt das Wut-Icon an
// **********************************************************************************
// **********************************************************************************
function ShowWutIcon(WutState) {
	// Wenn das Icon noch nicht angezeigt wird
	if ((document.getElementsByTagName("body")[0].innerHTML.indexOf(ICON_WUTAKTIV) == -1) && (document.getElementsByTagName("body")[0].innerHTML.indexOf(ICON_WUTINAKTIV) == -1)) {
		var WiWut = Wutfaehig?"Wutentfachung":"Wirtschaftswunder";
		switch (WutState) {
			case WUTSTATE_ACTIVE: 
				ShowImg('/gang/upgrades/', ICON_WUTAKTIV, WiWut + TOOLTIP_WIWUTAKTIV + WutDatum, '', '', '915', '193', '102');
				break;
			case WUTSTATE_INACTIVE: 
				ShowImg('/gang/upgrades/', ICON_WUTINAKTIV, WiWut + TOOLTIP_WIWUTINAKTIV, '', '', '915', '193', '102');
				break;
			case WUTSTATE_ERROR: 
				ShowImg('/gang/upgrades/', ICON_ERROR, TOOLTIP_LOADERROR, '', '', '915', '193', '102');
				break;
		}
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt aktuellen Plunder, speichert Image und Name und stellt den
// aktuellen Plunder dar
// **********************************************************************************
// **********************************************************************************
function GetCurrentPlunder(content) {
	// Wenn derzeit kein Plunder angelegt ist
	if (content.indexOf("Du hast keinen Plunder angelegt") != -1) {
		// Image-URL und Namen speichern
		GM_setValue("LastPlunderImg" + m_ownuserid + TOWNEXTENSION, "none");
		GM_setValue("LastPlunderName" + m_ownuserid + TOWNEXTENSION, "none");
	
		// Angelegten Plunder anzeigen
		ShowCurrentPlunder(GM_getValue("LastPlunderImg" + m_ownuserid + TOWNEXTENSION, ""), GM_getValue("LastPlunderName" + m_ownuserid + TOWNEXTENSION, ""));
	// sonst: Es ist derzeit ein Plunder angelegt
	} else {
		// Aus dem Responsetext ein Document machen
		var doc = HTML2DOM(content);
	
		// URL des aktuellen Plunderstücks extrahieren
		var plunderbox = doc.getElementsByClassName("box special")[0];
		var plunderimg = plunderbox.getElementsByTagName("img")[0].getAttribute('src');
	
		// Namen des aktuellen Plunderstücks extrahieren
		var plundername = plunderbox.innerHTML.split('</h4>')[0];
		plundername = plundername.split('alt=" "> ')[1];
	
		// Image-URL und Namen speichern
		GM_setValue("LastPlunderImg" + m_ownuserid + TOWNEXTENSION, plunderimg.toString());
		GM_setValue("LastPlunderName" + m_ownuserid + TOWNEXTENSION, plundername);
	
		// Angelegten Plunder anzeigen
		ShowCurrentPlunder(GM_getValue("LastPlunderImg" + m_ownuserid + TOWNEXTENSION, ""), GM_getValue("LastPlunderName" + m_ownuserid + TOWNEXTENSION, ""));
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

// ********************************************************************************************************************
// ********************************************************************************************************************
// Funktion ermittelt anhand des Plundernamens die zugehörige "Action-Nummer", die der JS-Funktion zum Anlegen
// übergeben werden muss. Diese wird vom Spiel vorgegeben, kann sich jederzeit ändern und muss deswegen frisch
// ausgelesen werden
// ********************************************************************************************************************
// ********************************************************************************************************************
function GetActionNumber(content, plundername) {
	try {
		var KEYWORD_JUNK = (TOWNEXTENSION == 'NY') ? '<h2>Collected Junk</h2>' : '<h2>Aufgehobener Plunder</h2>';
		var ActionNumber = content.split(KEYWORD_JUNK)[1];
		ActionNumber = ActionNumber.split(plundername)[1];
		ActionNumber = ActionNumber.split("change_stuff('")[1];
		ActionNumber = ActionNumber.split("'")[0];

		return ActionNumber;
	} catch(err) {
		GM_log("Fehler beim Abrufen der Action-Nummer für " + plundername);
		return "";
	}
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// Funktion ermittelt anhand des Plundernamens die zugehörige "Action-Nummer", die der JS-Funktion zum Anlegen
// übergeben werden muss. Diese wird vom Spiel vorgegeben, kann sich jederzeit ändern und muss deswegen frisch
// ausgelesen werden
// ********************************************************************************************************************
// ********************************************************************************************************************
function GetNumberOfPlunder(content, plundername) {
	try {
		var NumberOfPunder = content.split(plundername)[1];
		NumberOfPunder = NumberOfPunder.split('<td class="col3">')[1];
		NumberOfPunder = NumberOfPunder.split(' Stück</td>')[0];

		return NumberOfPunder;
	} catch(err) {
		GM_log("Fehler beim Abrufen der Plunderanzahl für " + plundername);
		return "";
	}
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

// **********************************************************************************
// **********************************************************************************
// Funktion fügt Plundericon in den Slot <slotnr> hinzu
// **********************************************************************************
// **********************************************************************************
function AddPlunderIcon(content, plunder, imgtitle, usemode, slotnr) {
	// Maximale Anzahl von Slots
	var MAXNROFSLOTS = 9;
	
	// Wenn noch nicht mehr Icons dargestellt werden, als maximal vorgehesen
	if (slotnr <= MAXNROFSLOTS) {
		var ActionNumber = GetActionNumber(content, plunder);
		
		// **********************************************************************************
		// Wenn der aktuelle Plunder ein benutzbarer Plunder ist mit Stückzahl 0
		// **********************************************************************************
		if (usemode == "B" && ActionNumber == "") {
			// Aktuellen Plunder aus der Liste entfernen
			RemovePlunderFromList(plunder + "*" + imgtitle + "*B");			
			alert("Vom benutzbaren Plunder '" + imgtitle + "' ist leider nichts mehr übrig,\nDu musst ihn wieder sammeln. Er wird er aus der Direktleiste entfernt.");
			return -1;
		// **********************************************************************************
		// sonst: Der aktuelle Plunder wird angelegt, oder es ist ein benutzbarer Plunder, der noch vorhanden ist
		// **********************************************************************************
		} else {
			var imgtop = PD_Y + 18;
			var imgzindex = 105;
			var imgleft = PD_X + 1 + (slotnr - 1) * 28;
			
			// Wenn der Plunder angelegt werden soll
			if (usemode == "A") {
				var titletext = "Anlegen: " + imgtitle;
				var usemodeimg = ICON_PLUNDERA;
				var usemodetitletext = "Dieser Plunder wird angelegt";
			// sonst: Der Plunder soll benutzte werden
			} else {
				var titletext = "Benutzen: " + imgtitle + " (noch " + GetNumberOfPlunder(content, plunder) + " Stück übrig)";
				var usemodeimg = ICON_PLUNDERB;
				var usemodetitletext = "Dieser Plunder wird benutzt";
			}
			
			// Plundergrafik zusammenbauen
			var newimg = document.getElementById("wrap").appendChild(document.createElement('img'));
			newimg.setAttribute('id', 'directplunderpic' + slotnr);
			newimg.setAttribute('src', PLUNDERIMAGE_URL + plunder);
			newimg.setAttribute('border', '0');
			newimg.setAttribute('name', usemode);
			newimg.setAttribute('title', titletext);
			newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex + '; cursor: pointer');
	
			// Usemode-Grafik zusammenbauen
			var modeimg = document.getElementById("wrap").appendChild(document.createElement('img'));
			modeimg.setAttribute('id', 'directplundermodepic' + slotnr);
			modeimg.setAttribute('src', usemodeimg);
			modeimg.setAttribute('border', '0');
			var modeimgtop = Number(imgtop) + 28;
			modeimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + modeimgtop + 'px; z-index:' + imgzindex);
			modeimg.setAttribute('title', usemodetitletext);
			
			// **********************************************************************************
			// Click-Event hinzufügen
			// **********************************************************************************
			newimg.addEventListener("click", function(event) 
			{ 
				var ownuserid = m_ownuserid;
				
				// **********************************************************************************
				// Wenn es sich um einen anlegbaren Plunder handelt
				// **********************************************************************************
				if (this.name == "A") {
					GM_setValue("LastPlunderImg" + ownuserid + TOWNEXTENSION, PLUNDERIMAGE_URL + plunder);
					GM_setValue("LastPlunderName" + ownuserid + TOWNEXTENSION, imgtitle);
		
					// Cursor soll Wartesymbol zeigen
					document.body.style.cursor = "wait";
					this.style.cursor = "wait";
					
					// Angelegten Plunder anzeigen
					ShowCurrentPlunder(PLUNDERIMAGE_URL + plunder, imgtitle);
		
					// **********************************************************************************
					// *** GM_XMLHTTPREQUEST *** POSTEN des Plunderwechsels
					// **********************************************************************************
					GM_xmlhttpRequest({method: 'POST', url: PLUNDERCHANGE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
						data: encodeURI('f_plunder=' + ActionNumber),
						onload: function(responseDetails) {
							// Seite refreshen
							document.location.reload();
						}
					});
					
				// **********************************************************************************
				// sonst: Es handelt sich um einen benutzbaren Plunder
				// **********************************************************************************
				} else {
					// Wenn die Sicherheitsabfrage durch Drücken des "OK"-Buttons positiv beantwortet wurde
					if (DoYouReallyWantTo("Soll der Plunder '" + imgtitle + "' wirklich benutzt werden?\n\nHinweis: Durch die Benutzung wird er sofort verbraucht. Du hast\nderzeit noch " + GetNumberOfPlunder(content, imgtitle) + " Stück.")) {
						// URL für den Benutzungsrequest zusammenbauen
						var PLUNDERUSE_URL = PLUNDER_URL + 'use/' + ActionNumber + '/';
	
						// **********************************************************************************
						// *** GM_XMLHTTPREQUEST *** Abrufen der Plunderbenutzung (--> Plunder wir benutzt)
						// **********************************************************************************
						GM_xmlhttpRequest({method: 'GET', url: PLUNDERUSE_URL,	onload: function(responseDetails) {
							alert(imgtitle + ' wurde erfolgreich benutzt.');
	
							// Seite refreshen
							document.location.reload();
						} 
						});
					}
				}
			}, false);
			return 0;
		}
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt Icon zum Zurücksetzen der Direktplunderliste hinzu
// **********************************************************************************
// **********************************************************************************
function AddResetIcon(plundertable) {
	
	// Link zusammenbauen
	var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
	newlink.setAttribute('href', '');

	// Grafik zusammenbauen
	var newimg = newlink.appendChild(document.createElement('img'));
	newimg.setAttribute('src', ICON_PLUNDERRESET);
	newimg.setAttribute('border', '0');
	newimg.setAttribute('title', TOOLTIP_PLUNDERRESET);
	newimg.setAttribute('style', 'position:absolute; left:602px; top:375px; z-index:100');

	// Click-Event hinzufügen
	newimg.addEventListener("click", function(event) 
	{ 
		// Plunderliste zurücksetzen
		ResetPlunderList();
	}, false);
}

// **********************************************************************************
// Funktion ermittelt aus einer Tabellenzeile den Dateinamen des Plunders
// **********************************************************************************
function GetPlunderPic(currenttr) {
	try {
		var plunderpic = currenttr.getElementsByTagName("img")[0].getAttribute("src").split("/");
		
		return plunderpic[plunderpic.length - 1];
	} catch(err) {
		GM_log("Fehler beim Ermitteln des Plunder-Images: " + err);
	}
}

// **********************************************************************************
// Funktion ermittelt aus einer Tabellenzeile den Namen des Plunders
// **********************************************************************************
function GetPlunderName(currenttr) {
	try {
		return currenttr.getElementsByTagName("a")[0].innerHTML;
	} catch(err) {
		GM_log("Fehler beim Ermitteln des Plundernamens: " + err);
	}
}

// **********************************************************************************
// Funktion überprüft, ob sich ein Plunder in der Direktzugriffsliste befindet
// **********************************************************************************
function IsPlunderInList(plunderinfo) {
	try {
		// Wenn sich die gesuchte Plunderinfo in der Direktzugriffsliste befindet
		if (GM_getValue("PlunderDirectAccess" + m_ownuserid + TOWNEXTENSION, "").indexOf(plunderinfo) != -1) {
			return true;
		// sonst: Die gesuchte Plunderinfo befindet sich nicht in der Direktzugriffsliste
		} else {
			return false;
		}
	} catch(err) {
		GM_log("Fehler in IsPlunderInList: " + err);
	}
}

// **********************************************************************************
// Funktion setzt die Direktzugriffsliste zurück auf leer
// **********************************************************************************
function ResetPlunderList() {
	GM_setValue("PlunderDirectAccess" + m_ownuserid + TOWNEXTENSION, "");
}

// **********************************************************************************
// Funktion ermittelt die Anzahl der Plunderstücke in der Direktzugriffsliste
// **********************************************************************************
function GetNrOfPlunderInList() {
	return GM_getValue("PlunderDirectAccess" + m_ownuserid + TOWNEXTENSION, "").split("|").length - 1;
}

// **********************************************************************************
// Funktion fügt ein Plunderstück in die Direktzugriffsliste hinzu
// **********************************************************************************
function AddPlunderToList(plunderinfo) {
	GM_setValue("PlunderDirectAccess" + m_ownuserid + TOWNEXTENSION, GM_getValue("PlunderDirectAccess" + m_ownuserid + TOWNEXTENSION, "") + plunderinfo + "|");
}

// **********************************************************************************
// Funktion entfernt ein Plunderstück aus der Direktzugriffsliste
// **********************************************************************************
function RemovePlunderFromList(plunderinfo) {
	var plunderlist = GM_getValue("PlunderDirectAccess" + m_ownuserid + TOWNEXTENSION, "").split("|");
	var newplunderlist = "";
	
	// Direktzugriffsliste leeren
	ResetPlunderList();

	// Für alle bisherigen Plunderstücke
	for (var i = 0; i < plunderlist.length - 1; i++) {
		// Wenn das aktuelle Plunderstück nicht das zu Entfernende ist
		if (plunderlist[i] != plunderinfo) {
			// Füge es wieder in die neue Direktzugriffsliste hinzu
			newplunderlist = newplunderlist + plunderlist[i] + "|";
		}
	}
	
	// Speichern der neuen Direktzugriffsliste
	GM_setValue("PlunderDirectAccess" + m_ownuserid + TOWNEXTENSION, newplunderlist);
}

// **********************************************************************************
// Funktion ermittelt das n-te Plunderstück der Direktzugriffsliste
// **********************************************************************************
function GetNthPlunderinfoFromList(n) {
	return GM_getValue("PlunderDirectAccess" + m_ownuserid + TOWNEXTENSION, "").split("|")[n - 1];
}

// **********************************************************************************
// Funktion extrahiert den Dateinamen des Bildes aus der Plunderinfo
// **********************************************************************************
function GetPicFromPlunderInfo(plunderinfo) {
	return plunderinfo.split("*")[0];
}

// **********************************************************************************
// Funktion extrahiert den Plundernamen aus der Plunderinfo
// **********************************************************************************
function GetNameFromPlunderInfo(plunderinfo) {
	return plunderinfo.split("*")[1];
}

// **********************************************************************************
// Funktion extrahiert die Benutzungsart aus der Plunderinfo
// **********************************************************************************
function GetUsemodeFromPlunderInfo(plunderinfo) {
	var usermode = plunderinfo.split("*")[2];
	
	if (typeof usermode != 'undefined') {
		return usermode;
	} else {
		return "A";
	}
}

// **********************************************************************************
// Funktion ermittelt, ob dies der erste Lauf nach einem Update ist
// **********************************************************************************
function FirstRunAfterUpdate() {
	// Wenn dies der erste Lauf nach einem Update ist
	if (GM_getValue("FirstRunAfterUpdate" + THISSCRIPTVERSION, true)) {

	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion entfernt alle Plunderstücke aus der Anzeige
// **********************************************************************************
// **********************************************************************************
function HideAllPlunder() {
	for (var i = 1; i <= 9; i++) {
		var currentplunderpic = document.getElementById('directplunderpic' + i);
		if (currentplunderpic != null) {
			currentplunderpic.parentNode.removeChild(currentplunderpic);
		}

		var currentplundermodepic = document.getElementById('directplundermodepic' + i);
		if (currentplundermodepic != null) {
			currentplundermodepic.parentNode.removeChild(currentplundermodepic);
		}
	}

	var addicon = document.getElementById('AddPlunderIcon');
	if (addicon != null) {
		addicon.parentNode.removeChild(addicon);
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt alle Plunderstücke an
// **********************************************************************************
// **********************************************************************************
function ShowAllPlunder(content, NrOfPlunder) {
	// Wenn die Seite abgerufen werden konnte (kein Seitenladefehler)
	var KEYWORD_MYBUM = (TOWNEXTENSION == 'NY') ? '<strong>My bum</strong>' : '<strong>Mein Penner</strong>';
	if (content.indexOf(KEYWORD_MYBUM) != -1) {
		var slotcorrect = 0;

		// Für alle Plunderstücke
		for (var i = 1; i <= NrOfPlunder; i++) {
			var plunderinfo = GetNthPlunderinfoFromList(i);
			slotcorrect = slotcorrect + AddPlunderIcon(content, GetPicFromPlunderInfo(plunderinfo), GetNameFromPlunderInfo(plunderinfo), GetUsemodeFromPlunderInfo(plunderinfo), i + slotcorrect);
		}

		// Zahl der Plunderstücke ggf. korrigieren, falls benutzbare Plunderstücke nicht mehr vorhanden sind
		NrOfPlunder = NrOfPlunder + slotcorrect;

		// Wenn weniger als 9 Plunder eingetragen sind
		if (NrOfPlunder < 9) {
			// +-Icon anzeigen
			ShowImg(PLUNDER_URL, ICON_PLUNDERFREE, TOOLTIP_PLUNDERAUSWAHL, '', '', PD_X + 1 + (NrOfPlunder) * 28, PD_Y + 18, '55', 'AddPlunderIcon');
		}
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion liefert die aktuellen Promille zurück
// **********************************************************************************
// **********************************************************************************
function GetPromille(doc) {
	var promille = doc.getElementsByClassName("icon beer")[0].getElementsByTagName("a")[0];
	promille = Number(trimString(trimString(promille.innerHTML).substr(0, 6)));
	
	return promille;
}

// **********************************************************************************
// **********************************************************************************
// Funktion formatiert eine Zahl mit Tausendertrennzeichen
// **********************************************************************************
// **********************************************************************************
function money_format(zahl) {
	var TZ = '.';
	var new_string = [];
	var nachkomma = Math.round((zahl - parseInt(zahl)) * 100);
	var tmp = parseInt(zahl) + '';

	while( tmp.length > 3)
	{
		new_string[new_string.length] = tmp.substr(tmp.length - 3 ) ;
		tmp = tmp.substr(0, tmp.length -3 )
	}
	if(tmp)  new_string[new_string.length] = tmp;
	return new_string.reverse().join(TZ) + "," + nachkomma;
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
// Funktion ermittelt zur Verfügung stehende Anzahl des Nahrungsmittels "food"
// **********************************************************************************
// **********************************************************************************
function GetNrOfFood(content, food) {
	var nr = content.split(' ' + food)[0];
	nr = nr.split('<span>')[nr.split('<span>').length - 1];
	
	return nr;
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt den Handler zum Auto-Trinken ein
// **********************************************************************************
// **********************************************************************************
function PromilleUpHandler(currentelem) {
	currentelem.style.cursor = 'pointer';

	// **********************************************************************************
	// EVENTHANDLER
	// **********************************************************************************
	currentelem.addEventListener('click', function(event) {

		// **********************************************************************************
		// Funktion prüft, ob die Promillezahl wirklich auf über 2,5 gestiegen ist
		// **********************************************************************************
		function CheckPromilleUpSuccess(content) {
			// Seite refreshen
			document.location.reload();
			var promille = GetPromille(HTML2DOM(content));
			// Wenn der Alkoholpegel auf ein unkritisches Niveau gestiegen ist
			if (promille >= 2.5) {
				// User benachrichtigen
				alert("*Hicks* Jetzt hab ich endlich wieder meinen Standard-Pegel! :D");
			// sonst: Der Alkoholpegel ist NICHT auf ein unkritisches Niveau gestiegen
			} else {
				// User benachrichtigen
				alert("Beim Trinken gab es einen Fehler, Du hast immer noch nur " + promille + " Promille!");
			}
		}

		// **********************************************************************************
		// Funktion sendet das POST zum Trinken
		// **********************************************************************************
		function DrinkIt(nrofbeer) {
			// **********************************************************************************
			// *** GM_XMLHTTPREQUEST *** POSTEN der Getränkenutzung
			// **********************************************************************************
			GM_xmlhttpRequest({method: 'POST', url: EAT_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: encodeURI('item=&promille=&id=' + ID_BEER + '&menge=' + nrofbeer),
				onload: function(responseDetails)	{
					// Erfolg prüfen
					CheckPromilleUpSuccess(responseDetails.responseText);
				}
			});
		}

		// **********************************************************************************
		// Funktion sucht einen Plunder im doc
		// **********************************************************************************
		function suchePlunder(doc, plundername, type) {
			// Referenz auf Plundertabelle speichern
			var plundertable = doc.getElementsByTagName("table")[0];
			// Referenz auf Zeilen der Plundertabelle speichern
			var plundertrs = plundertable.getElementsByTagName("tr");

			for (var i = 1; i < plundertrs.length; i++) {
				if (restPlunder != "")
					if (restPlunder == GetPlunderName(plundertrs[i]))
						restIndex = i;
				if (type == "")
					if (plundername == GetPlunderName(plundertrs[i]))
						return i;
				if (type != "") {
					var td = plundertrs[i].getElementsByTagName("td")[5];
					if (type == "B")
						td = plundertrs[i].getElementsByTagName("td")[4];
					// **********************************************************************************
					// Wenn das Plunderstück anlegbar oder benutzbar und nicht plundername ist
					// **********************************************************************************
					if (td.getElementsByTagName("a").length > 0 && plundername != GetPlunderName(plundertrs[i]))
						return i;
				}
			}

			if (type == "")
				if (plundername == GM_getValue("LastPlunderName" + m_ownuserid + TOWNEXTENSION, ""))
					return 0;

			return -1;	// nichts gefunden
		}

		// **********************************************************************************
		// Funktion legt Alkoholplunder an
		// **********************************************************************************
		function alcoPlunderAnlegen(content, promille, restore) {
			// **********************************************************************************
			// *** GM_XMLHTTPREQUEST *** Abrufen der Plunder-Seite
			// **********************************************************************************
			GM_xmlhttpRequest({method:"GET", url: PLUNDER_URL, onload:function(responseDetails) {
					if (restore && restPlunder == "") {
						// Aktuellen Plunder ermitteln und anzeigen
						GetCurrentPlunder(responseDetails.responseText);

						restPlunderimg = GM_getValue("LastPlunderImg" + m_ownuserid + TOWNEXTENSION, "");
						restPlunder = GM_getValue("LastPlunderName" + m_ownuserid + TOWNEXTENSION, "");
						}
					var doc = HTML2DOM(responseDetails.responseText);

					// Referenz auf Plundertabelle speichern
					var plundertable = doc.getElementsByTagName("table")[0];
					// Referenz auf Zeilen der Plundertabelle speichern
					var plundertrs = plundertable.getElementsByTagName("tr");

					var alcocnt = 0;
					for (var j = 0; j < alcoplunder.length; j++) {
						var plundername = alcoplunder[j];
						var pInd = suchePlunder(doc, plundername, "");
						exalcoplunder[j] = pInd;
						if (pInd >= 0) {
							if (pInd == 0) {
								alcoActionNr[j] = "";
								alcoPlunderInfo[j] = GM_getValue("LastPlunderImg" + m_ownuserid + TOWNEXTENSION, "") + "*" + plundername + "*A";
							} else {
								alcoActionNr[j] = GetActionNumber(responseDetails.responseText, GetPlunderPic(plundertrs[pInd]));
								alcoPlunderInfo[j] = GetPlunderPic(plundertrs[pInd]) + "*" + plundername + "*A";
							}
							alcocnt++;
						}
					}

					if (restIndex < 0)
						restIndex = suchePlunder(doc, restPlunder, "");

					if (restIndex > 0) {
						restPlunderimg = GetPlunderPic(plundertrs[restIndex]);
						restActionNr = GetActionNumber(responseDetails.responseText, restPlunderimg);
					}

					var alcpl = -1;
					var plInd = -1;
					if (alcocnt > 0) {	// es ist AlkoPlunder da
						for (alcpl = 0; alcpl < alcoplunder.length; alcpl++) {
							if (exalcoplunder[alcpl] >= 0)
								break;
						}
					}
					var anlegplunder = "";
					var anlegActionNr = "";
					plInd = exalcoplunder[alcpl];
					if (plInd == 0) {	// AlkoPlunder ist angelegt
						var pInd = suchePlunder(doc, alcoplunder[alcpl], "A"); // suche anderen Plunder zum Anlegen
						if (pInd > 0) {			// gefunden
							anlegplunder = GetPlunderName(plundertrs[pInd]);
							anlegActionNr = GetActionNumber(responseDetails.responseText, anlegplunder);
							GM_setValue("LastPlunderImg" + m_ownuserid + TOWNEXTENSION, PLUNDERIMAGE_URL + GetPlunderPic(plundertrs[pInd]));
							GM_setValue("LastPlunderName" + m_ownuserid + TOWNEXTENSION, anlegplunder);
							// **********************************************************************************
							// *** GM_XMLHTTPREQUEST *** POSTEN des Plunderwechsels
							// **********************************************************************************
							GM_xmlhttpRequest({method: 'POST', url: PLUNDERCHANGE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
								data: encodeURI('f_plunder=' + anlegActionNr),
								onload: function(responseDetails) {
									// jetzt aber Alkoholplunder anlegen
									alcoPlunderAnlegen(content, promille, restore);
								}
							});
						}
					} else if (plInd > 0) {
						var plunderinfo = alcoPlunderInfo[alcpl];
						GM_setValue("LastPlunderImg" + m_ownuserid + TOWNEXTENSION, PLUNDERIMAGE_URL + GetPicFromPlunderInfo(plunderinfo));
						GM_setValue("LastPlunderName" + m_ownuserid + TOWNEXTENSION, GetNameFromPlunderInfo(plunderinfo));

						// Angelegten Plunder anzeigen
						ShowCurrentPlunder(PLUNDERIMAGE_URL + GetPicFromPlunderInfo(plunderinfo), GetNameFromPlunderInfo(plunderinfo));
			
						var ActionNr = alcoActionNr[alcpl];
						// **********************************************************************************
						// *** GM_XMLHTTPREQUEST *** POSTEN des Plunderwechsels
						// **********************************************************************************
						GM_xmlhttpRequest({method: 'POST', url: PLUNDERCHANGE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
							data: encodeURI('f_plunder=' + ActionNr),
							onload: function(responseDetails) {
								if (restPlunder != "none" && restPlunder != "" && restPlunder != GetNameFromPlunderInfo(plunderinfo))
								{
									if (restActionNr == "") {
										var doc = HTML2DOM(responseDetails.responseText);

										// Referenz auf Plundertabelle speichern
										var plundertable = doc.getElementsByTagName("table")[0];
										// Referenz auf Zeilen der Plundertabelle speichern
										var plundertrs = plundertable.getElementsByTagName("tr");
										restIndex = suchePlunder(doc, restPlunder, "");
										if (restIndex > 0) {
											restActionNr = GetActionNumber(responseDetails.responseText, restPlunderimg);
											restPlunderimg = GetPlunderPic(plundertrs[i]);
										}
									}

									GM_setValue("LastPlunderImg" + m_ownuserid + TOWNEXTENSION, PLUNDERIMAGE_URL + restPlunderimg);
									GM_setValue("LastPlunderName" + m_ownuserid + TOWNEXTENSION, restPlunder);

									// Angelegten Plunder anzeigen
									ShowCurrentPlunder(PLUNDERIMAGE_URL + restPlunderimg, restPlunder);
									// **********************************************************************************
									// *** GM_XMLHTTPREQUEST *** POSTEN des Plunderwechsels f�r den urspr�nglichen Plunder
									// **********************************************************************************
									GM_xmlhttpRequest({method: 'POST', url: PLUNDERCHANGE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
										data: encodeURI('f_plunder=' + restActionNr),
										onload: function(responseDetails) {
											// Seite refreshen
											document.location.reload();
											}
										});
								} else {
									// Seite refreshen
									document.location.reload();
								}
							}
						});
					} else {
						// Verfügbare Anzahl Bier abrufen	
						var stacknrofbeer = GetNrOfFood(content, "Flaschen Bier")

						// Wenn Bier nicht gefunden wurde
						if (isNaN(stacknrofbeer)) {
							stacknrofbeer = GetNrOfFood(content, "Flaschen Limo")
						}

						// ***********************************************************************************************
						// Wenn genügend Trinken vorhanden ist
						// ***********************************************************************************************
						if (stacknrofbeer > 7) {
							// Zahl der benötigten Bierflaschen berechnen
							var bottlesneeded = Math.ceil((2.5 - promille) / 0.35);

							// Trinken gehen
							DrinkIt(bottlesneeded);

							// Keinen Wartecursor anzeigen
							CursorWait(currentelem, false);
						// ***********************************************************************************************
						// sonst: Es ist nicht genügend Trinken vorhanden
						// ***********************************************************************************************
						} else {
							// Keinen Wartecursor anzeigen
							CursorWait(currentelem, false);
							// Benutzer benachrichtigen
							alert("Die Vorräte an Limo bzw. Bier gehen zur Neige.\nBitte zuerst nachkaufen!");
						}
					}
				}
			});
		return;
		}

		// Wartecursor anzeigen
		CursorWait(currentelem, true);

		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abrufen der Trinken-Seite
		// **********************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: DRINK_STACK, onload: function(responseDetails) {
			var nrofbeer = 0;

			var content = responseDetails.responseText;

			// Aktuelle Promille ermitteln
			var promille = GetPromille(HTML2DOM(content));

			// ***********************************************************************************************
			// Es liegen mehr als 2,5 Promille an
			// ***********************************************************************************************
			if (promille >= 2.5) {
				// Keinen Wartecursor anzeigen
				CursorWait(currentelem, false);
				// Benutzer benachrichtigen
				alert("Du hast bereits mindestens 2,5 Promille,\nDu musst nicht noch mehr trinken!");
			// ***********************************************************************************************
			// Sonst: Wenn weniger als 2,5 Promille anliegen: Promille rauf durch Plunder oder Trinken
			// ***********************************************************************************************
			} else {
				restPlunder = "";
				restActionNr = "";
				alcoPlunderAnlegen(content, promille, true);
			}
		}
		});
	},false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt den Handler zum Auto-Essen ein
// **********************************************************************************
// **********************************************************************************
function PromilleDownHandler(currentelem) {
	currentelem.style.cursor = 'pointer';

	// **********************************************************************************
	// EVENTHANDLER
	// **********************************************************************************
	currentelem.addEventListener('click', function(event) {

		// **********************************************************************************
		// Funktion prüft, ob die Promillezahl wirklich auf unter 0,75 gesunken ist
		// **********************************************************************************
		function CheckPromilleDownSuccess(content) {
			// Seite refreshen
			document.location.reload();
			var promille = GetPromille(HTML2DOM(content));
			// Wenn der Alkoholpegel auf ein unkritisches Niveau gesunken ist
			if (promille <= 0.75) {
				// User benachrichtigen
				alert("Mjamm, das war lecker!");
			// sonst: Der Alkoholpegel ist NICHT auf ein unkritisches Niveau gesunken
			} else {
				// User benachrichtigen
				alert("Beim Essen gab es einen Fehler, Du hast immer noch " + promille + " Promille!");
			}
		}

		// **********************************************************************************
		// Funktion sendet die POSTS zum Essen
		// **********************************************************************************
		function EatIt(nroffood) {
			var id = 0;
			var menge = 0;
			for (var i = 0; i < nroffood.length; i++) {
				if (nroffood[i] > 0) {
					var id = idoffood[i];
					var menge = nroffood[i];
					nroffood[i] = 0;
					break;
				}
			}
			// **********************************************************************************
			// *** GM_XMLHTTPREQUEST *** POSTEN des Essensbefehls
			// **********************************************************************************
			GM_xmlhttpRequest({method: 'POST', url: EAT_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: encodeURI('item=&promille=&id=' + id + '&menge=' + menge),
				onload: function(responseDetails)	{
					var moretoEat = false;
					for (var i = 0; i < nroffood.length; i++)
						if (nroffood[i] > 0) {
							moretoEat = true;
							break;
						}
					if (moretoEat)
						EatIt(nroffood);
					else // Erfolg prüfen
						CheckPromilleDownSuccess(responseDetails.responseText);
				}
			});
		}
		
		// Wartecursor anzeigen
		CursorWait(currentelem, true);
		
		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abrufen der Essen-Seite
		// **********************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: EAT_STACK, onload: function(responseDetails) {
			var nroffood = new Array();
			var stacknroffood = new Array();

			var content = responseDetails.responseText;

			// Aktuelle Promille ermitteln
			promille = GetPromille(HTML2DOM(content));
			var sumprom = 0;

			for (i = 0; i < FoodNames.length; i++) {
				stacknroffood[i] = GetNrOfFood(content, FoodNames[i]);
				if (isNaN(stacknroffood[i]))
					stacknroffood[i] = 0;
				nroffood[i] = 0;
				sumprom += stacknroffood[i] * promillevals[i];
			}

			// ***********************************************************************************************
			// Wenn genügend Essen vorhanden ist
			// ***********************************************************************************************
			if (sumprom > promille) {
				// ***********************************************************************************************
				// Wenn mehr als 0,75 Promille anliegen
				// ***********************************************************************************************
				if (promille > 0.75) {
					promille -= 0.75;
					while (promille > 0) {
						var maxexfood = -1;
						var bestfood = -1;
						for (i = 0; i < FoodNames.length; i++)
							if (stacknroffood[i] >= 1) {
								maxexfood = i;
								if (promille <= promillevals[i] && bestfood < 0)
									bestfood = i;
							}
						if (bestfood < 0)
							bestfood = maxexfood;
						if (bestfood < 0)
							break;

						nroffood[bestfood]++;
						stacknroffood[bestfood]--;
						promille -= promillevals[bestfood];
					}

					// Essen gehen, wenn es gereicht hat
					if (promille <= 0) {
						EatIt(nroffood);

						// Keinen Wartecursor anzeigen
						CursorWait(currentelem, false);
					} else {
						// Keinen Wartecursor anzeigen
						CursorWait(currentelem, false);
						// Benutzer benachrichtigen
						alert("Es ist nicht genügend zu essen da !!");
					}
				// ***********************************************************************************************
				// sonst: Es liegen 0,75 Promille oder weniger an
				// ***********************************************************************************************
				} else {
					// Keinen Wartecursor anzeigen
					CursorWait(currentelem, false);
					// Benutzer benachrichtigen
					alert("0,75 Promille oder weniger beeinträchtigen die Kampfwerte nicht,\nDu musst nichts mehr essen!");
				}
			// ***********************************************************************************************
			// sonst: Es ist nicht genügend Essen vorhanden
			// ***********************************************************************************************
			} else {
				// Keinen Wartecursor anzeigen
				CursorWait(currentelem, false);
				// Benutzer benachrichtigen
				alert("Die Vorräte an Currywurst und/oder Döner bzw.\nHamburger gehen zur Neige. Bitte zuerst nachkaufen!");
			}
			}
		});
	},false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion liefert den aktuellen Geldstand zurück
// **********************************************************************************
// **********************************************************************************
function GetMoney() {
	var money = document.getElementsByClassName("icon money")[0].getElementsByTagName("a")[0];
	money = Number(trimString(money.innerHTML).slice(1).replace(/\./, '').replace(/,/, '.'));
	
	return money;
}

// ***********************************************************************************************
// Funktion ermittelt die aktuelle Sauberkeit
// ***********************************************************************************************
function getCleanliness(doc) {
	var cleanlinessdiv = doc.getElementsByClassName("processbar_clean")[0];
	
	return cleanlinessdiv.style.width;
}

// **********************************************************************************
// **********************************************************************************
// rekursive Funktion zum Waschen
// **********************************************************************************
// **********************************************************************************
function WashMe(currentelem, id, cnt) {

	// **********************************************************************************
	// *** GM_XMLHTTPREQUEST *** POSTEN des Kommandos zum Waschen
	// **********************************************************************************
	GM_xmlhttpRequest({method: 'POST', url: WASH_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=' + id),
		onload: function(responseDetails)	{
            if (cnt > 1)
				WashMe(currentelem, id, cnt-1);
			else {
				// Keinen Wartecursor anzeigen
				CursorWait(currentelem, false);

				// Seite refreshen
				document.location.reload();

				// User benachrichtigen
				alert("Du bist nun porentief rein!");
			}
		}
	 });
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt den Handler zum Waschen ein
// **********************************************************************************
// **********************************************************************************
function WashHandler(currentelem) {
	currentelem.style.cursor = 'pointer';

	// ***********************************************************************************************
	// EVENTLISTENER ANHÄNGEN
	// ***********************************************************************************************
	currentelem.addEventListener('click', function(event) {
		// Wartecursor anzeigen
		CursorWait(currentelem, true);

		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abrufen der Overview-Seite, Sauberkeit ermitteln
		// **********************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: OVERVIEW_URL,	onload: function(responseDetails) {
			var doc = HTML2DOM(responseDetails.responseText);

			var clean = getCleanliness(doc);
			clean = Number(clean.substr(0, clean.length-1));
			if (clean == 100) {
				// ***********************************************************************************************
				// Die Sauberkeit lieg bereits bei 100%
				// ***********************************************************************************************
					// Keinen Wartecursor anzeigen
					CursorWait(currentelem, false);
					// User benachrichtigen
					alert('Du bist bereits porentief rein, sauberer geht nicht... :D');
			// ***********************************************************************************************
			// Wenn die Sauberkeit noch nicht bei 100% liegt
			// ***********************************************************************************************
			} else {
				var id = 2;
				var cnt = 1;
				var cost = 25;
				if (clean >= 20) {
					var id = 1;
					var cnt = Math.ceil((100 - clean) / 20);
					var cost = cnt * 6;
				}

				// Aktuellen Geldstand ermitteln
				var currentmoney = GetMoney();

				// ***********************************************************************************************
				// Wenn genug Geld vorhanden ist
				// ***********************************************************************************************
				if (currentmoney >= cost) {
					WashMe(currentelem, id, cnt);
				// ***********************************************************************************************
				// sonst: Es ist nicht genug Geld vorhanden
				// ***********************************************************************************************
				} else {
					// User benachrichtigen
					alert('Zum Waschen werden EUR ' + cost + ',- benötigt, Du hast im Moment nur EUR ' + money_format(currentmoney) + ".");
				}
			}
		}
		});
	},false);
}


// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob WiWu oder Wut gekauft wurde
// **********************************************************************************
// **********************************************************************************
function WiWuOderWut() {
		Wutfaehig = false;
		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Bandeneigentum abfragen
		// **********************************************************************************
		GM_xmlhttpRequest({method:"GET", url: GANGUPGRADE_URL, onload:function(responseDetails) {
				var content = responseDetails.responseText;
		
				// Wenn die Bandeneigentumseite abgerufen werden konnte (kein Seitenladefehler)
				var KEYWORD_GANGUPGR = (TOWNEXTENSION == 'NY') ? 'class="tiername">???' : 'class="tiername">Bandenbesitz';
				if (content.indexOf(KEYWORD_GANGUPGR) != -1) {
					var wuttest = content.split('Wutentfachung')[1];
					wuttest = wuttest.split('Stufe: ')[1];
					Wutfaehig = (wuttest.substr(0,1) == "1");
				}
			// Hintergrundgrafiken anzeigen
			ShowBackgrounds();
			}
		});
}

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
	var ATTSkill;
	var DEFSkill;
	var DEXSkill;
	var petATT;
	var petDEF;
	var weaponATT;
	var homeDEF;
	var ATTperc = 1.0;
	var DEFperc = 1.0;

	ByeByeGoogle();
	
	// ***********************************************************************************************
	// Auf eine neue Version des Skriptes prüfen
	// ***********************************************************************************************
	CheckForUpdate(120);

	if (!bl()) {
		
		var allChecked = 0;
		var weaponcheck1;
		var weaponcheck2;
		var homecheck;
		var plundercheck;
		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abfragen, ob es eine bessere Waffe gibt
		// **********************************************************************************
		GM_xmlhttpRequest({method:"GET", url: WEAPONSTORE_URL, onload:function(responseDetails) {
				var content = responseDetails.responseText;

				// Aus HTML ein DOM-Objekt erzeugen
				var doc = HTML2DOM(content);

				var tables = doc.getElementsByTagName("table");
				var maxatt = 0;
				var betteratt = 0;
				var betterweapon;
				for (var i = 0; i < tables.length; i++) {
					var table = tables[i];
				
					// Referenz auf Tabellenzeilen in trs speichern
					var trs = table.getElementsByTagName("tr");
					var weapon = trs[0].innerHTML.split('<span class="tiername">')[1].split('</span')[0];
					var attwert = Number(trs[1].innerHTML.split('<span class="att">')[1].split('</span')[0]);
					var gekauft = (trs[2].innerHTML.indexOf('Gekauft') != -1);
					if (gekauft && attwert > maxatt)
						maxatt = attwert;
					else if (attwert > maxatt) {
						betterweapon = weapon;
						betteratt = attwert;
					}
				}
				if (betteratt > maxatt)
					weaponcheck1 = 'Wenn Du die Waffe "' + betterweapon + '" kaufst und anlegst, verbessert sich Dein ATT-Wert um ' + (betteratt - maxatt);
				else
					weaponcheck1 = '';
				allChecked++;
			}
		}); 
		
		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abfragen, ob eine bessere Waffe angelegt werden kann
		// **********************************************************************************
		GM_xmlhttpRequest({method:"GET", url: WEAPON_URL, onload:function(responseDetails) {
				var content = responseDetails.responseText;

				// Aus HTML ein DOM-Objekt erzeugen
				var doc = HTML2DOM(content);

				var tables = doc.getElementsByTagName("table");
				var maxatt = 0;
				var betteratt = 0;
				var betterweapon;
				for (var i = 0; i < tables.length; i++) {
					var table = tables[i];
				
					// Referenz auf Tabellenzeilen in trs speichern
					var trs = table.getElementsByTagName("tr");
					var weapon = trs[0].innerHTML.split('<span class="tiername">')[1].split('</span')[0];
					var attwert = Number(trs[1].innerHTML.split('<span class="att">')[1].split('</span')[0]);
					var benutzt = (trs[3].innerHTML.indexOf('Ausgewählt') != -1);
					if (benutzt)
						maxatt = attwert;
					else if (attwert > maxatt) {
						betterweapon = weapon;
						betteratt = attwert;
					}
				}
				if (betteratt > maxatt)
					weaponcheck2 = 'Wenn Du die Waffe "' + betterweapon + '" anlegst, verbessert sich Dein ATT-Wert um ' + (betteratt - maxatt);
				else
					weaponcheck2 = '';
				allChecked++;
			}
		}); 

		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abfragen, ob es ein besseres Eigenheim gibt
		// **********************************************************************************
		GM_xmlhttpRequest({method:"GET", url: HOME_URL, onload:function(responseDetails) {
				var content = responseDetails.responseText;

				// Aus HTML ein DOM-Objekt erzeugen
				var doc = HTML2DOM(content);

				var tables = doc.getElementsByTagName("table");
				var maxdef = 0;
				var betterdef = 0;
				var betterhome;
				var betterowned;
				for (var i = 0; i < tables.length; i++) {
					var table = tables[i];
				
					// Referenz auf Tabellenzeilen in trs speichern
					var trs = table.getElementsByTagName("tr");
					var home = trs[0].innerHTML.split('<span class="tiername">')[1].split('</span')[0];
					var defwert = Number(trs[1].innerHTML.split('<span class="def">')[1].split('</span')[0]);
					var bewohnt = (trs[3].innerHTML.indexOf('Bewohnt') != -1);
					var gekauft = (trs[3].innerHTML.indexOf('Einziehen') != -1);
					if (bewohnt)
						maxdef = defwert;
					else if (defwert > maxdef) {
						betterhome = home;
						betterdef = defwert;
						betterowned = gekauft;
					}
				}
				if (betterdef > maxdef)
					homecheck = 'Wenn Du das Eigenheim "' + betterhome + '" ' + (betterowned?"beziehst":"kaufst") + ', verbessert sich Dein DEF-Wert um ' + (betterdef - maxdef);
				else
					homecheck = '';
				allChecked++;
			}
		}); 

		// Referenz auf Tabelle speichern
		var table = document.getElementById('topmenu');
		
		// Platzhalter für Bandenkampf-Warner einfügen
		var gangli = document.createElement('li');
		table.getElementsByTagName('ul')[0].appendChild(gangli);
		
		// Platzhalter für Kampf-Warner einfügen
		var fightli = document.createElement('li');
		table.getElementsByTagName('ul')[0].appendChild(fightli);
		
		// Ermitteln, ob WiWu oder Wut gekauft wurde
		WiWuOderWut();

		// ***********************************************************************************************
		// Promille- und Waschleiste
		// ***********************************************************************************************
		// Wasch-Icon einfügen
		ShowImg('', ICON_WASH, 'Vollständig waschen', '', '', PW_X + 78, PW_Y + 23, '54', 'infozentrale_wash');
		WashHandler(document.getElementById('infozentrale_wash'));
		
		ShowImg('', ICON_PROMILLEUP, 'Promille rauf', '', '', PW_X + 9, PW_Y + 23, '54', 'infozentrale_promilleup');
		PromilleUpHandler(document.getElementById('infozentrale_promilleup'));
		ShowImg('', ICON_PROMILLEDOWN, 'Promille runter', '', '', PW_X + 38, PW_Y + 23, '54', 'infozentrale_promilledown');
		PromilleDownHandler(document.getElementById('infozentrale_promilledown'));
		
		// **********************************************************************************
		// Bandenprofillinks beim Bandenkampf in Links umwandeln
		// **********************************************************************************
		// Wenn die aktuelle Seite die Bandenkampf-Übersichtsseite ist
		if (IsFightOverviewPage()) {
			// Ermitteln der Tabelle Bandenkampfübersicht
			var gangtable = document.getElementsByTagName("table")[1];
			// Ermitteln der Zeilen der Tabelle Bandenkampfübersicht
			var gangtrs = gangtable.getElementsByTagName("tr");
		
			// Für jede Zeile (ohne erste Zeile = Überschrift)
			for (i = 1; i < gangtrs.length; i++) {
				// Ermitteln der Banden-ID und Eesetzen des textuellen Bandennamens durch den Link auf das Bandenprofil
				LinkifyGangnames(gangtrs[i]);
			}
		}
		
		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Plunderseite abfragen
		// **********************************************************************************
		GM_xmlhttpRequest({method:"GET", url: PLUNDER_URL, onload:function(responseDetails) {
				// Aktuellen Plunder ermitteln und anzeigen
				GetCurrentPlunder(responseDetails.responseText);

				// Anzahl ausgewählter Plunderstücke ermitteln
				var NrOfPlunder = GetNrOfPlunderInList();

				// Wenn mindestens ein Plunderstück ausgewählt wurde
				if (NrOfPlunder > 0) {
					// Gesamten Inhalt des Bodies zum Parsen des vorhandenen Plunders und der Zugriffs-IDs und Darstellen der Icons
					ShowAllPlunder(responseDetails.responseText, NrOfPlunder);
				// sonst: Es wurde noch kein Plunderstück ausgewählt
				} else {
					ShowImg(PLUNDER_URL, ICON_PLUNDERFREE, TOOLTIP_PLUNDERAUSWAHL, '', '', 750, '255', '55', 'AddPlunderIcon');
				}
			}
		});
		
		// **********************************************************************************
		// Wenn die aktuelle Seite die Plunderseite ist
		// **********************************************************************************
		if (IsPlunderPage()) {
			// Referenz auf Plundertabelle speichern
			var plundertable = document.getElementsByTagName("table")[0];
			// Referenz auf Zeilen der Plundertabelle speichern
			var plundertrs = plundertable.getElementsByTagName("tr");
		
			// "Verkaufen"-Spalte schmaler machen
			GM_addStyle('#content .grunge #plunder table th.col4 div { width: 70px; }');
			GM_addStyle('#content .grunge #plunder table th.col4     { width: 70px; }');
		
			// Icon zum Leeren des Plunder-Direktzugriffs hinzufügen
			AddResetIcon(plundertable);
		
			// Für alle Zeilen mit Plunderstücken
			for (var i = 1	; i < plundertrs.length; i++) {
				// **********************************************************************************
				// Funktion fügt Ausführungscode zur aktuellen Checkbox hinzu
				// **********************************************************************************
				function PrepareCheckbox(i, usemode) {
					// Checkbox checken/unchecken in Abhängigkeit davon, ob das Plunderstück in der Direktzugriffsliste ist
					document.getElementById("Checkbox" + usemode + "_" + i).checked = IsPlunderInList(plunderinfo + "*" + usemode);
		
					// Eventhandler hinzufügen für Click-Ereignis
					document.getElementById("Checkbox" + usemode + "_" + i).addEventListener("click", function(event) 
					{ 
						// Wenn die Checkbox gecheckt ist
						if (this.checked) {
							// Wenn noch nicht mehr als 9 Plunder in der Direktzugriffsliste stehen
							if (GetNrOfPlunderInList() < 9) {
								// Plunderstück in die Direktzugriffsliste hinzufügen
								AddPlunderToList(this.getAttribute("name").split("*")[0] + "*" + this.getAttribute("name").split("*")[1] + "*" + usemode);
							} else {
								this.checked = false;
								alert("Es können nicht mehr als 9 Plunderstücke für die Direktzugriffsliste ausgewählt werden!");
							}			
						// sonst: Die Checkbox ist nicht gecheckt
						} else {
							// Plunderstück aus der Direktzugriffsliste entfernen
							RemovePlunderFromList(this.getAttribute("name").split("*")[0] + "*" + this.getAttribute("name").split("*")[1] + "*" + usemode);
						}
						// Eventuell bereits schon angezeigten Direktplunder entfernen
						HideAllPlunder();
						// Aktuellen Direktplunder anzeigen
						ShowAllPlunder(document.getElementsByTagName("html")[0].innerHTML, GetNrOfPlunderInList());
					}, false);
				}
		
				// Spalte mit benutzbarem Plunder speichern
				var benutztd = plundertrs[i].getElementsByTagName("td")[4];
				benutztd.setAttribute('style', 'padding-left: 3px; padding-right: 7px; padding-top: 11px');
				// Spalte mit anlegbarem Plunder speichern
				var anlegtd = plundertrs[i].getElementsByTagName("td")[5];
				anlegtd.setAttribute('style', 'padding-left: 5px; padding-right: 4px; padding-top: 11px');
		
				// Zwei neue Spalten anlegen und formatieren
				var newtd1 = document.createElement("td");
				newtd1.setAttribute('style', 'padding-left: 0px; padding-right: 4px; padding-top: 13px; width: 10px;');
				var newtd2 = document.createElement("td");
				newtd2.setAttribute('style', 'padding-left: 0px; padding-right: 11px; padding-top: 13px; width: 10px;');
		
				// Plunderinfo zusammenstellen aus Dateiname des Icons und Plundername, separiert durch "*"
				var plunderinfo = GetPlunderPic(plundertrs[i]) + "*" + GetPlunderName(plundertrs[i]);
		
				// **********************************************************************************
				// Wenn das Plunderstück benutzbar ist
				// **********************************************************************************
				if (benutztd.getElementsByTagName("a").length > 0) {
					// Checkbox zusammenstellen
					newtd1.innerHTML = "<form name='PlunderCheckbox' action=''><input name='" + plunderinfo + "*B' id='CheckboxB_" + i + "' type='checkbox'></form>";
					// Zelle anhängen
					plundertrs[i].insertBefore(newtd1, anlegtd);
					PrepareCheckbox(i, "B");
				// sonst: Das Plunderstück kann nicht angelegt werden
				} else {
					// Leere Zelle
					newtd1.innerHTML = "&nbsp;";
					// Zelle anhängen
					plundertrs[i].insertBefore(newtd1, anlegtd);
				}
		
				// **********************************************************************************
				// Wenn das Plunderstück anlegbar ist
				// **********************************************************************************
				if (anlegtd.getElementsByTagName("a").length > 0) {
					// Checkbox zusammenstellen
					newtd2.innerHTML = "<form name='PlunderCheckbox' action=''><input name='" + plunderinfo + "*A' id='CheckboxA_" + i + "' type='checkbox'></form>";
					// Zelle anhängen
					plundertrs[i].insertBefore(newtd2, anlegtd.nextSibling);
					PrepareCheckbox(i, "A");
				// sonst: Das Plunderstück kann nicht angelegt werden
				} else {
					// Leere Zelle
					newtd2.innerHTML = "&nbsp;";
					// Zelle anhängen
					plundertrs[i].insertBefore(newtd2, anlegtd.nextSibling);
				}
			}
		}
		
		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abfragen, ob es einen eingehenden KAMPF gibt
		// **********************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: FIGHT_URL, onload: function(responseDetails) {
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
							return a;
						// sonst: Die Jetztzeit ist größer (später) als die übergebene Zeit --> Datumsgrenze
						} else {
							// 24 Stunden addieren, damit das Datum nach hinten sortiert wird (Folgetag)
							return (Number(a.substr(0, 2)) + 24).toString() + a.substr(2, 6);
						}
					}

					var jetzt = new Date();
					var nowtime = Right$("0" + jetzt.getHours().toString(), 2) + ":" + Right$("0" + jetzt.getMinutes().toString(), 2) + ":" + Right$("0" + jetzt.getSeconds().toString(), 2);
					
					var x = ReformatHours(nowtime, a.substr(0,8));
					var y = ReformatHours(nowtime, b.substr(0,8));

					return ((x < y) ? (-1) : ((x > y) ? 1 : 0));
				}

				var content = responseDetails.responseText;
		
				// Wenn die Kampfseite abgerufen werden konnte (kein Seitenladefehler)
				var KEYWORD_MYBUM = (TOWNEXTENSION == 'NY') ? '<strong>My bum</strong>' : '<strong>Mein Penner</strong>';
				if (content.indexOf(KEYWORD_MYBUM) != -1) {
					// Überprüfe aktuelle Kampfwerte auf maximale Kampfstärke
					CheckFightValues(content);
					
					// Daten eingehender Kämpfe ermitteln
					var ftext = GetNumberOfFights(content);
					
					// Wenn es eingehende Kämpfe gibt
					if (ftext != "") {
						var IncomingFights = ftext.split('/');
						var NrOfFights = IncomingFights.length - 1;
						// Wenn mehr als ein Kampf eingeht
						if (NrOfFights > 1) {
							var FightTitle = NrOfFights + ' eingehende Angriffe!';
						// sonst: Es gibt nur einen eingehenden Kampf
						} else {
							var FightTitle = ' 1 eingehender Angriff!';
						}
			
						// Wenn weniger als 6 Angriffe eingehen
						if (NrOfFights < 6) {	
							var FightIcon = NrOfFights - 1;
						// sonst: Es gehen 6 oder mehr Angriffe ein
						} else {
							var FightIcon = 5;
						}
			
						var leer = '                                                                                                                   ';
						FightTitle += leer.substr(0, leer.length - FightTitle.length);
						IncomingFights.sort(sortByTime);
						for (var i = 0; i < NrOfFights; i++) {
							var splitted = IncomingFights[i].split('#');
							var ausweich = 'Ausweichen ' + (splitted[1] == 'N'?'nicht ':splitted[1] == 'V'?'evtl. ':'') + 'möglich';
							FightTitle += splitted[0] + leer.substr(0, leer.length - splitted[0].length - ausweich.length - 11) + ausweich + '       ';
							}

						// Kampf-Icon anzeigen
						ShowFightIcon(FightIcon, FightTitle);
					}
				// sonst: Die Kampfseite konnte nicht abgerufen werden
				} else {
					// Fehler in Wut-Anzeige darstellen
					ShowWutIcon(WUTSTATE_ERROR);
					// Fehler in Power-Anzeige darstellen
					ShowFightStateIcon(FIGHTSTATE_ERROR, 0, 0);
				}
			}
		});
		
		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abfragen, ob es einen BANDENKAMPF gibt
		// **********************************************************************************
		GM_xmlhttpRequest({method:"GET", url: GANGFIGHT_URL, onload:function(responseDetails) {
				var content = responseDetails.responseText;
			
				// Anzahl Bandenkämpfe ermitteln
				var NrOfGangFights = GetNumberOfGangFights(content);
		
				// Wenn es laufende Bandenkämpfe gibt
				if(NrOfGangFights > 0) {
					// Bandenkampfinfo abfragen
					var GangFightInfo = GetGangFightInfo(content);
					
					// Wenn es mehr als einen Bandenkampf gibt
					if (NrOfGangFights > 1) {
						var GangFightTitle = 'Aktuell laufen ' + NrOfGangFights + ' Bandenkämpfe!' + GangFightInfo;
					// sonst: Es gibt nur einen eingehenden Kampf
					} else {
						var GangFightTitle = 'Aktuell läuft ein Bandenkampf!' + GangFightInfo;
					}
					// Wenn es weniger als 6 Bandenkämpfe gibt
					if (NrOfGangFights < 6) {
						var GangFightIcon = NrOfGangFights - 1;
					// sonst: Es gibt 6 oder mehr Bandenkämpfe
					} else {
						var GangFightIcon = 5;
					}
		
					// Bandenkampf-Icon anzeigen
					ShowGangFightIcon(GangFightIcon, GangFightTitle);
		
					// Wenn die aktuelle Seite die Bandenkampfseite ist
					if (IsFightOverviewPage()) {
						// Setze den Neuigkeitenanzeiger zurück
						ResetNewsFromGangFight(GangFightInfo);
					// sonst: Die aktuelle ist nicht die Bandenkampfseite
					} else {
						// Überprüfe, ob sich bei den Bandenkämpfen Neuigkeiten ergeben haben
						CheckNewsFromGangFight(GangFightInfo);
					}
		
					// Wenn es Neuigkeiten beim Bandenkampf gibt
					if (GM_getValue("GangFightInfoFlag" + m_ownuserid + TOWNEXTENSION, true)) {
						ShowNewIcon();
					}
				}
			}
		}); 
		
	}
