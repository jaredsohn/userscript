// ==UserScript==
// @name           Infozentrale
// @author         sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description    Infozentrale mit Anzeige von Kampf- und Bandenkampfwarnungen, aktuellem Plunder, Wutstatus sowie Kampfstärkebewertung (HH und B, PG-Version 4.0)
// @include        http://*.pennergame.de/overview/
// @include        http://*.pennergame.de/skills/*
// @include        http://*.pennergame.de/stock/
// @include        http://*.pennergame.de/news/
// @include        http://*.pennergame.de/friendlist/
// @include        http://*.pennergame.de/change_please/statistics/
// @include        http://*.pennergame.de/stock/*
// @include        http://*.pennergame.de/profil/*
// @include        http://*.pennergame.de/fight/*
// @include        http://*.pennergame.de/gang/*
// @include        http://*.pennergame.de/messages/*
// @include        http://*.pennergame.de/city/*
// @include        http://*.pennergame.de/activities/*
// @version        1.2.2 Berücksichtigung nicht abrufbarbarer Seiten (Bug Power-Anzeige)
// @version        1.2.1 Bugfixes (Wut/Kampfstärkeberechnung, mehrere Penner)
// @version        1.2.0 Plunderanzeige; Kampfstärkebewertung; Wutanzeige; Ergebnisänderung bei Bandenkämpfen
// @version        1.1.3 Fehlerbehandlung nicht verfügbarer HS + Bandenkampfergebnis im Tooltip
// @version        1.1.2 Erweiterung Links auf Bandenkampfgegner + Zählung Bandenkämpfe
// @version        1.1.1 Erweiterung um Bandenkämpfe
// ==/UserScript==

var THISSCRIPTVERSION = "1.2.2";
var THISSCRIPTNAME = "Infozentrale";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/62923';          // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/62923.user.js'; // Skript-URL bei userscripts.org

// Name PG Warnicon zum Zählen der Angriffe
var ICON_WARNING = 'warning.gif';                                // PG-Warnicon

// Größe des Kampf- und Bandenkampficons in Pixeln
var ICON_WIDTH = '35';

// Eigene Icons
var ICON_FIGHT_OK = 'http://i45.tinypic.com/2rc1jsi.jpg';        // Icon Kampfstärke OK
var ICON_FIGHT_WEAK = 'http://i45.tinypic.com/2gt702p.jpg';      // Icon Kampfstärke NICHT OK
var ICON_NEW = 'http://i45.tinypic.com/2cofvad.jpg';             // Icon für Ergebnisänderungen ("NEU")
var ICON_WUTAKTIV = 'http://i45.tinypic.com/eg7q50.jpg';         // Icon für Wut AKTIV
var ICON_WUTINAKTIV = 'http://i46.tinypic.com/15fitlu.jpg';      // Icon für Wut INAKTIV
var ICON_ERROR = 'http://i47.tinypic.com/2lt4ryp.jpg';           // Icon für Fehler beim Abrufen einer Seite 
var ICON_PLUNDERBACK = 'http://i46.tinypic.com/2jawxm8.jpg';     // Icon Plunderhintergrund
var ICON_FIGHTSTATUSBACK = 'http://i45.tinypic.com/ibasts.jpg';  // Icon Fightstatushintergrund
var ICON_WUTBACK = 'http://i50.tinypic.com/3013601.jpg';         // Icon Wuthintergrund
var ICON_GANGFIGHTBACK = 'http://i46.tinypic.com/315egt1.jpg';   // Icon Bandenkampfhintergrund
var ICON_FIGHTBACK = 'http://i46.tinypic.com/2wn7dwz.jpg';       // Icon Kampfhintergrund

// Array für Kampf-Warnicons (unterschiedliche Anzahl eingehender Kämpfe)
var ICON_FIGHT = new Array();
	ICON_FIGHT[0] = 'http://i49.tinypic.com/29v14ir.jpg';
	ICON_FIGHT[1] = 'http://i46.tinypic.com/30xhqv6.jpg';
	ICON_FIGHT[2] = 'http://i47.tinypic.com/wl5f8j.jpg';
	ICON_FIGHT[3] = 'http://i48.tinypic.com/faatea.jpg';
	ICON_FIGHT[4] = 'http://i47.tinypic.com/125rj2o.jpg';
	ICON_FIGHT[5] = 'http://i47.tinypic.com/rckfbp.jpg';

// Array für Bandenkampf Warnicons (unterschiedliche Anzahl eingehender Bandenkämpfe)
var ICON_GANGFIGHT = new Array();
	ICON_GANGFIGHT[0] = 'http://i48.tinypic.com/scxbbm.jpg';
	ICON_GANGFIGHT[1] = 'http://i49.tinypic.com/mbhb4i.jpg';
	ICON_GANGFIGHT[2] = 'http://i48.tinypic.com/157c6iv.jpg';
	ICON_GANGFIGHT[3] = 'http://i45.tinypic.com/25r12f4.jpg';
	ICON_GANGFIGHT[4] = 'http://i46.tinypic.com/2w35jba.jpg';
	ICON_GANGFIGHT[5] = 'http://i47.tinypic.com/289hphx.jpg';

// Konstanten für Wut-Zustand
var WUTSTATE_ACTIVE = 0;
var WUTSTATE_INACTIVE = 1;
var WUTSTATE_ERROR = 2;

// Konstanten für Fightstate-Zustand
var FIGHTSTATE_OK = 0;
var FIGHTSTATE_WEAK = 1;
var FIGHTSTATE_ERROR = 2;

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
		GM_log("Fehler beim Ermitteln der Zahl von Bandenkämpfen: "+ err); 
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
	
		// **********************************************************************************
		// Abrufen der Bandensuchseite
		// **********************************************************************************
		GM_xmlhttpRequest({
			method: 'GET', 
			url: GANGSEARCH_URL + gangnamesearch + "&min=&max=", 
			onload: function(responseDetails) {
				try {
					// Content der Bandensuchseite speichern
					var content = responseDetails.responseText;
		
					// Extrahieren der Banden-ID
					var gangid = content.split('hs_bande')[1];
					gangid = gangid.split('</table>')[0];

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
	var currentGangFightInfo = 	GM_getValue("GangFightInfo" + getOwnUserID() + TOWNEXTENSION,"");
	
	// Wenn sich die Info geändert hat
	if (currentGangFightInfo != GangFightInfo) {
		// Setze das Änderungsflag
		GM_setValue("GangFightInfoFlag" + getOwnUserID() + TOWNEXTENSION, true);
	}	
}

// **********************************************************************************
// **********************************************************************************
// Funktion setzt die Neuigkeiten vom Bandenkampf zurück
// **********************************************************************************
// **********************************************************************************
function ResetNewsFromGangFight(GangFightInfo) {
	// Setze GangFightInfo auf den aktuellen Stand
	GM_setValue("GangFightInfo" + getOwnUserID() + TOWNEXTENSION, GangFightInfo);
	// Setze das Flag zurück
	GM_setValue("GangFightInfoFlag" + getOwnUserID() + TOWNEXTENSION, false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion überprüft, ob ein Check-Intervall abgelaufen ist
// **********************************************************************************
// **********************************************************************************
function IsTimeToCheck(minutes) {
	// Aktuelles Datum speichern
	var now = new Date();
	// In Sekunden umrechnen
	now = now.getTime() / 1000;
	
	// Wenn das Intervall vorbei ist
	if (now - Number(GM_getValue("CheckTime" + getOwnUserID() + TOWNEXTENSION, 0)) >= (minutes * 60)) {
		GM_setValue("CheckTime" + getOwnUserID() + TOWNEXTENSION, now.toString());
		return true;
	// sonst: Das Intervall ist noch nicht vorbei
	} else {
		return false;
	}
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
	
	// Wenn eine ATT-Stärkung vorliegt
	if (content.indexOf("<span><b>Stärkung:</b>") != -1) {
		return true;
	// sonst: Es liegt keine ATT-Stärkung vor
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
// Berechnet aus ATT und DEF die Kampfkraft
// ***********************************************************************************************
// ***********************************************************************************************
function GetPower(attvalue, defvalue) {
	return Number(attvalue) + 0.91 * Number(defvalue);
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
	var powermaxvalue = Number(GM_getValue("PowerMaxValue" + getOwnUserID() + TOWNEXTENSION, 0));
	
	// Wenn die aktuelle Kampfkraft größer als der bisherige Maximalwert ist
	if (fightpower > powermaxvalue) {
		// Größte Kampfkraft hochsetzen
		GM_setValue("PowerMaxValue" + getOwnUserID() + TOWNEXTENSION, fightpower.toString());
	}
	
	// Wenn die aktuelle Kampfkraft größer oder gleich der bislang größten ist
	if (fightpower >= powermaxvalue) {
		ShowFightStateIcon(FIGHTSTATE_OK);
	// sonst: Die aktuelle Kampfkraft ist kleiner als die bislang größte
	} else {
		ShowFightStateIcon(FIGHTSTATE_WEAK);
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die aktuellen Kamfpwerte
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
	// Beziehen der Bandenseite
	// **********************************************************************************
	GM_xmlhttpRequest({method: 'GET', url: GANG_URL,onload: function(gangresponseDetails) {
		// Content der Bandenseite speichern
		var gangcontent = gangresponseDetails.responseText;

		// Wenn die Bandenseite geladen wurde (keine Fehlerseite)
		if (gangcontent.indexOf('<strong>Mein Penner</strong>') != -1) {
			// Wenn Wut gestartet ist
			if (gangcontent.indexOf('Wutentfachung ist aktiv!') != -1) {
				// Wutstatus speichern
				GM_setValue("WutActive" + getOwnUserID() + TOWNEXTENSION, WUTSTATE_ACTIVE);
	
				// **********************************************************************************
				// Beziehen der WB-Seite
				// **********************************************************************************
				GM_xmlhttpRequest({method: 'GET', url: WB_URL,	onload: function(wbresponseDetails) {
					// Content der WB-Seite speichern
					var wbcontent = wbresponseDetails.responseText;
			
					// Wenn die WB-Seite geladen wurde (keine Fehlerseite)
					if (wbcontent.indexOf('<strong>Mein Penner</strong>') != -1) {
						// Ermitteln der ATT-Stufe
						var attcorrectstr = wbcontent.split("<td width=\"108\">")[1];
						attcorrectstr = attcorrectstr.split('<span class=')[0];
				
						// Berechnen des 3%-Aufschlags, der sich durch Wut ergibt
						var attcorrect = Math.round(Number(attcorrectstr) * 0.03);
						// Korrigieren der ATT-Summe um den 3%-Aufschlag
						attvalue = attvalue - attcorrect;
			
						// ATT-Wert um eine eventuell vorhandene ATT-Stärkung (z.B. schwarzes Loch +1, +2, +3) korrigieren
						attvalue = attvalue - GetATTBoost(table.innerHTML);
			
						// Vergleich der aktuellen Stärke mit der Max-Stärke
						ComparePower(attvalue, defvalue);
					// sonst: WB-Seite konnte nicht geladen werden
					} else {
						// Powerwerte können nicht richtig berechnet werden
						ShowFightStateIcon(FIGHTSTATE_ERROR);
					}
				} 
				});
			// sonst: Wut ist nicht gestartet
			} else {
				// Wutstatus speichern
				GM_setValue("WutActive" + getOwnUserID() + TOWNEXTENSION, WUTSTATE_INACTIVE);
	
				// ATT-Wert um eine eventuell vorhandene ATT-Stärkung (z.B. schwarzes Loch +1, +2, +3) korrigieren
				attvalue = attvalue - GetATTBoost(table.innerHTML);
		
					// Vergleich der aktuellen Stärke mit der Max-Stärke
				ComparePower(attvalue, defvalue);			
			}
		// sonst: Bandenseite konnte nicht geladen werden
		} else {
			// Wutstatus speichern
			GM_setValue("WutActive" + getOwnUserID() + TOWNEXTENSION, WUTSTATE_ERROR);
			// Powerwerte können nicht richtig berechnet werden
			ShowFightStateIcon(FIGHTSTATE_ERROR);
		}
		
		// Anzeige des Wut-Status
		ShowWutIcon(GM_getValue("WutActive" + getOwnUserID() + TOWNEXTENSION, false));
	}});
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt eine Grafik an, ggf. mit Link
// **********************************************************************************
// **********************************************************************************
function ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex) {
	// Wenn ein Link übergeben wurde
	if (imglink != '') {
		// Link zusammenbauen
		var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
		newlink.setAttribute('href', imglink);
	
		// Grafik zusammenbauen
		var newimg = newlink.appendChild(document.createElement('img'));
	// sonst: Es wurde kein Link übergeben
	} else {
		// Grafik zusammenbauen
		var newimg = document.getElementById("wrap").appendChild(document.createElement('img'));
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
function ShowFightStateIcon(FightState) {
	switch (FightState) {
		case FIGHTSTATE_OK: 
			ShowImg('', ICON_FIGHT_OK, 'Deine aktuelle Kampfstärke ist optimal!', '', '', '956', '192', '103');
			break;
		case FIGHTSTATE_WEAK: 
			ShowImg('', ICON_FIGHT_WEAK, 'Achtung, Du hast derzeit nicht Deine maximale Kampfstärke!', '', '', '956', '192', '103');
			break;
		case FIGHTSTATE_ERROR: 
			ShowImg('', ICON_ERROR, 'Seitenladefehler!', '', '', '956', '192', '103');
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
	
	ShowImg('/stock/plunder/', ICON_PLUNDERBACK, '', '', '', '866', '170', '51');
	ShowImg('/gang/upgrades/', ICON_WUTBACK, '', '', '', '908', '170', '52');
	ShowImg('', ICON_FIGHTSTATUSBACK, '', '', '', '950', '170', '53');
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt Plunder an
// **********************************************************************************
// **********************************************************************************
function ShowPlunder(plunderimg, plundername) {
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
		switch (WutState) {
			case WUTSTATE_ACTIVE: 
				ShowImg('/gang/upgrades/', ICON_WUTAKTIV, 'Wutentfachung ist aktiv!', '', '', '915', '193', '102');
				break;
			case WUTSTATE_INACTIVE: 
				ShowImg('/gang/upgrades/', ICON_WUTINAKTIV, 'Wutentfachung derzeit NICHT aktiv!', '', '', '915', '193', '102');
				break;
			case WUTSTATE_ERROR: 
				ShowImg('/gang/upgrades/', ICON_ERROR, 'Seitenladefehler!', '', '', '915', '193', '102');
				break;
			default: 
				ShowImg('/gang/upgrades/', ICON_ERROR, 'Unbekannter Zustand!', '', '', '915', '193', '102');
				break;
		}
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt aktuellen Plunder und speichert Image und Name
// **********************************************************************************
// **********************************************************************************
function GetCurrentPlunder(doc) {
	// URL des aktuellen Plunderstücks extrahieren
	var plunderbox = doc.getElementsByClassName("box special")[0];
	var plunderimg = plunderbox.getElementsByTagName("img")[0].getAttribute('src');
	// Namen des aktuellen Plunderstücks extrahieren
	var plundername = plunderbox.innerHTML.split('</h4>')[0];
	plundername = plundername.split('alt=" "> ')[1];
	// Image-URL und Namen speichern
	GM_setValue("LastPlunderImg" + getOwnUserID() + TOWNEXTENSION, plunderimg.toString());
	GM_setValue("LastPlunderName" + getOwnUserID() + TOWNEXTENSION, plundername);
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
		return ownuserid;
	} catch(err) {
		GM_log("Fehler beim Ermitteln der eigenen UserID: " + err);
	}
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************

// ***********************************************************************************************
// Auf eine neue Version des Skriptes prüfen
// ***********************************************************************************************
CheckForUpdate();

// ***********************************************************************************************
// Stadt ermitteln und Variablen entsprechend setzen
// ***********************************************************************************************
// Wenn in Berlin gespielt wird
if (location.toString().indexOf("berlin") != -1) {
	var BerlinFlag = true;
	var FIGHT_URL = 'http://berlin.pennergame.de/fight/overview/';
	var GANGFIGHT_URL = 'http://berlin.pennergame.de/gang/fight/';
	var GANGSEARCH_URL = 'http://berlin.pennergame.de/highscore/gang/?gang=';
	var GANG_URL = 'http://berlin.pennergame.de/gang/';
	var WB_URL = 'http://berlin.pennergame.de/skills/';
	var PLUNDER_URL = 'http://berlin.pennergame.de/stock/plunder/';
	var TOWNEXTENSION = "B";
// sonst: Es wird in Hamburg gespielt
} else {
	var BerlinFlag = false;
	var FIGHT_URL = 'http://www.pennergame.de/fight/overview/';
	var GANGFIGHT_URL = 'http://www.pennergame.de/gang/fight/';
	var GANGSEARCH_URL = 'http://www.pennergame.de/highscore/gang/?gang=';
	var GANG_URL = 'http://www.pennergame.de/gang/';
	var WB_URL = 'http://www.pennergame.de/skills/';
	var PLUNDER_URL = 'http://www.pennergame.de/stock/plunder/';
	var TOWNEXTENSION = "HH";
}

// Referenz auf Tabelle speichern
var table = document.getElementById('topmenu');

// Platzhalter für Bandenkampf-Warner einfügen
var gangli = document.createElement('li');
table.getElementsByTagName('ul')[0].appendChild(gangli);

// Platzhalter für Kampf-Warner einfügen
var fightli = document.createElement('li');
table.getElementsByTagName('ul')[0].appendChild(fightli);

// Hintergrundgrafiken anzeigen
ShowBackgrounds();

// ***********************************************************************************************
// PLUNDER
// ***********************************************************************************************
// Wenn die aktuelle Seite die Plunderseite ist
if (document.location.toString().indexOf("pennergame.de/stock/plunder/") != -1) {
	// Aktuellen Plunder emitteln und Image und Name speichern
	GetCurrentPlunder(document);
} 

// Wenn bislang für den aktuellen User noch kein Plunder abgerufen wurde
if (GM_getValue("LastPlunderImg" + getOwnUserID() + TOWNEXTENSION, "") == "") {
	// **********************************************************************************
	// Beziehen der Plunder-Seite
	// **********************************************************************************
	GM_xmlhttpRequest({method: 'GET', url: PLUNDER_URL,	onload: function(responseDetails) {
		// Aus dem Responsetext ein Document machenE
		var doc = HTML2DOM(responseDetails.responseText);

		// Aktuellen Plunder emitteln und Image und Name speichern
		GetCurrentPlunder(doc);

		// Angelegten Plunder anzeigen
		ShowPlunder(GM_getValue("LastPlunderImg" + getOwnUserID() + TOWNEXTENSION, ""), GM_getValue("LastPlunderName" + getOwnUserID() + TOWNEXTENSION, ""));
	} 
	});

}

// Angelegten Plunder anzeigen
ShowPlunder(GM_getValue("LastPlunderImg" + getOwnUserID() + TOWNEXTENSION, ""), GM_getValue("LastPlunderName" + getOwnUserID() + TOWNEXTENSION, ""));

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
// Abfragen, ob es einen eingehenden KAMPF gibt
// **********************************************************************************
GM_xmlhttpRequest({
	method: 'GET',
	url: FIGHT_URL,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		GM_log(content);
		// Wenn die Kampfseite abgerufen werden konnte (kein Seitenladefehler)
		if (content.indexOf('<strong>Mein Penner</strong>') != -1) {
			// Überprüfe aktuelle Kampfwerte auf maximale Kampfstärke
			CheckFightValues(content);
			
			// Anzahl eingehender Kämpfe ermitteln
			var NrOfFights = GetNumberOfFights(content);
			
			// DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG 
			// NrOfFights = 1;
			// DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG 
			
			// Wenn es eingehende Kämpfe gibt
			if(NrOfFights > 0){
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
	
				// Kampf-Icon anzeigen
				ShowFightIcon(FightIcon, FightTitle);
			}
		// sonst: Die Kampfseite konnte nicht abgerufen werden
		} else {
			// Fehler in Wut-Anzeige darstellen
			ShowWutIcon(WUTSTATE_ERROR);
			// Fehler in Power-Anzeige darstellen
			ShowFightStateIcon(FIGHTSTATE_ERROR);
		}
	}
});

// **********************************************************************************
// Abfragen, ob es einen BANDENKAMPF gibt
// **********************************************************************************
GM_xmlhttpRequest({
	method:"GET",
	url: GANGFIGHT_URL,
	onload:function(responseDetails) {
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
			if (GM_getValue("GangFightInfoFlag" + getOwnUserID() + TOWNEXTENSION, true)) {
				ShowNewIcon();
			}
		}
	}
});