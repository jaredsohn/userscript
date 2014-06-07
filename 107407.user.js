var fileMETA = <><![CDATA[
// ==UserScript==
// @name           Infoze
// @namespace      http://userscripts.org/scripts/show/74435
// @author         sageo[http://berlin.pennergame.de/profil/id:1146285/]; PG reloaded design von lefty1981
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
// @include        http://*.bumrise.com/overview/
// @include        http://*.bumrise.com/skills/*
// @include        http://*.bumrise.com/stock/
// @include        http://*.bumrise.com/news/
// @include        http://*.bumrise.com/friendlist/
// @include        http://*.bumrise.com/change_please/statistics/*
// @include        http://*.bumrise.com/stock/*
// @include        http://*.bumrise.com/profil/*
// @include        http://*.bumrise.com/fight/*
// @include        http://*.bumrise.com/gang/*
// @include        http://*.bumrise.com/messages/*
// @include        http://*.bumrise.com/city/*
// @include        http://*.bumrise.com/activities/*
// @include        http://*.bumrise.com/daily/*
// @include        http://*.menelgame.pl/overview/
// @include        http://*.menelgame.pl/skills/*
// @include        http://*.menelgame.pl/stock/
// @include        http://*.menelgame.pl/news/
// @include        http://*.menelgame.pl/friendlist/
// @include        http://*.menelgame.pl/change_please/statistics/*
// @include        http://*.menelgame.pl/stock/*
// @include        http://*.menelgame.pl/profil/*
// @include        http://*.menelgame.pl/fight/*
// @include        http://*.menelgame.pl/gang/*
// @include        http://*.menelgame.pl/messages/*
// @include        http://*.menelgame.pl/city/*
// @include        http://*.menelgame.pl/activities/*
// @include        http://*.menelgame.pl/daily/*
// @include        http://*.clodogame.fr/overview/
// @include        http://*.clodogame.fr/skills/*
// @include        http://*.clodogame.fr/stock/
// @include        http://*.clodogame.fr/news/
// @include        http://*.clodogame.fr/friendlist/
// @include        http://*.clodogame.fr/change_please/statistics/*
// @include        http://*.clodogame.fr/stock/*
// @include        http://*.clodogame.fr/profil/*
// @include        http://*.clodogame.fr/fight/*
// @include        http://*.clodogame.fr/gang/*
// @include        http://*.clodogame.fr/messages/*
// @include        http://*.clodogame.fr/city/*
// @include        http://*.clodogame.fr/activities/*
// @include        http://*.clodogame.fr/daily/*
// @include        http://*.mendigogame.es/overview/
// @include        http://*.mendigogame.es/skills/*
// @include        http://*.mendigogame.es/stock/
// @include        http://*.mendigogame.es/news/
// @include        http://*.mendigogame.es/friendlist/
// @include        http://*.mendigogame.es/change_please/statistics/*
// @include        http://*.mendigogame.es/stock/*
// @include        http://*.mendigogame.es/profil/*
// @include        http://*.mendigogame.es/fight/*
// @include        http://*.mendigogame.es/gang/*
// @include        http://*.mendigogame.es/messages/*
// @include        http://*.mendigogame.es/city/*
// @include        http://*.mendigogame.es/activities/*
// @include        http://*.mendigogame.es/daily/*
// @include        http://*.mendigogame.com/overview/
// @include        http://*.mendigogame.com/skills/*
// @include        http://*.mendigogame.com/stock/
// @include        http://*.mendigogame.com/news/
// @include        http://*.mendigogame.com/friendlist/
// @include        http://*.mendigogame.com/change_please/statistics/*
// @include        http://*.mendigogame.com/stock/*
// @include        http://*.mendigogame.com/profil/*
// @include        http://*.mendigogame.com/fight/*
// @include        http://*.mendigogame.com/gang/*
// @include        http://*.mendigogame.com/messages/*
// @include        http://*.mendigogame.com/city/*
// @include        http://*.mendigogame.com/activities/*
// @include        http://*.mendigogame.com/daily/*
// @include        http://*.faveladogame.com.br/overview/
// @include        http://*.faveladogame.com.br/skills/*
// @include        http://*.faveladogame.com.br/stock/
// @include        http://*.faveladogame.com.br/news/
// @include        http://*.faveladogame.com.br/friendlist/
// @include        http://*.faveladogame.com.br/change_please/statistics/*
// @include        http://*.faveladogame.com.br/stock/*
// @include        http://*.faveladogame.com.br/profil/*
// @include        http://*.faveladogame.com.br/fight/*
// @include        http://*.faveladogame.com.br/gang/*
// @include        http://*.faveladogame.com.br/messages/*
// @include        http://*.faveladogame.com.br/city/*
// @include        http://*.faveladogame.com.br/activities/*
// @include        http://*.faveladogame.com.br/daily/*
// @include        http://*.bomzhuj.ru/overview/
// @include        http://*.bomzhuj.ru/skills/*
// @include        http://*.bomzhuj.ru/stock/
// @include        http://*.bomzhuj.ru/news/
// @include        http://*.bomzhuj.ru/friendlist/
// @include        http://*.bomzhuj.ru/change_please/statistics/*
// @include        http://*.bomzhuj.ru/stock/*
// @include        http://*.bomzhuj.ru/profil/*
// @include        http://*.bomzhuj.ru/fight/*
// @include        http://*.bomzhuj.ru/gang/*
// @include        http://*.bomzhuj.ru/messages/*
// @include        http://*.bomzhuj.ru/city/*
// @include        http://*.bomzhuj.ru/activities/*
// @include        http://*.bomzhuj.ru/daily/*
// @include        http://*.dossergame.co.uk/overview/
// @include        http://*.dossergame.co.uk/skills/*
// @include        http://*.dossergame.co.uk/stock/
// @include        http://*.dossergame.co.uk/news/
// @include        http://*.dossergame.co.uk/friendlist/
// @include        http://*.dossergame.co.uk/change_please/statistics/*
// @include        http://*.dossergame.co.uk/stock/*
// @include        http://*.dossergame.co.uk/profil/*
// @include        http://*.dossergame.co.uk/fight/*
// @include        http://*.dossergame.co.uk/gang/*
// @include        http://*.dossergame.co.uk/messages/*
// @include        http://*.dossergame.co.uk/city/*
// @include        http://*.dossergame.co.uk/activities/*
// @include        http://*.dossergame.co.uk/daily/*
// @version        1.8.29 Probleme mit Glühwürmchen in SB behoben
// ==/UserScript==
]]></>.toString();

// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTINSTALL_URL = trimString(fileMETA.split("@namespace")[1].split("\n")[0]); // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = THISSCRIPTINSTALL_URL.replace('show', 'source'); // URL für Sourceseite bei userscripts.org
var THISSCRIPTID = THISSCRIPTINSTALL_URL.split("/").pop();
var THISSCRIPTVERSION = trimString(fileMETA.split("@version")[1]).split(' ')[0];
//
// @version        1.8.28 Essen korrigiert für Hamburg reloaded
// @version        1.8.27 Anpassungen für Hamburg reloaded
// @version        1.8.26 neues Panel-Design für PG reloaded (Vielen Dank an lefty1981)
// @version        1.8.25 Plundershop lief nicht in FF 3.x
// @version        1.8.24 Aktualisierung der Plundershop-Wartezeit
// @version        1.8.23 Fehler mit Bündnis-SB behoben
// @version        1.8.22 Neue Leiste in PG reloaded für Plundershop
// @version        1.8.21 Verwendung von Goldenem Bier in PG reloaded korrigiert
// @version        1.8.20 SB-Pin und Benutzung von Boosts in PG reloaded korrigiert
// @version        1.8.19 Normales Trinken in PG reloaded funktionierte nicht mehr
// @version        1.8.18 nochmal Korrektur von AlkoPlunder in altem PG
// @version        1.8.17 AlkoPlunder in altem PG funktionierte nicht mehr
// @version        1.8.16 kleiner Fehler bei Promille rauf in PG reloaded behoben
// @version        1.8.15 bei PG reloaded wird Goldenes Bier zum Betrinken berücksichtigt
// @version        1.8.14 Fehler bei Plunderanzeige PG reloaded behoben
// @version        1.8.13 Abfrage bei Benutzung des Goldenen Biers bei PG reloaded entfernt
// @version        1.8.12 Anzeige aller 4 Plunder bei PG reloaded
// @version        1.8.11 noch ein Problem mit DEF-Booster behoben
// @version        1.8.10 Probleme mit DEF-Booster behoben
// @version        1.8.9 Probleme mit Plunderwechsel und WiWu/Wutanzeige behoben
// @version        1.8.8 Benutzen von Plunder in PG reloaded korrigiert
// @version        1.8.7 Probleme mit Plunderwechsel behoben (falscher Plunder wird angelegt)
// @version        1.8.6 Erweiterungen für PG reloaded komplett; läuft jetzt auch unter Firefox 4
// @version        1.8.5 Fehler behoben: Skript funktionierte nur noch, wenn Penner in einer Bande war
// @version        1.8.4 Erweiterungen für PG reloaded
// @version        1.8.3 läuft jetzt auch in Köln (1. Version)
// @version        1.8.2 Update-Verfahren verbessert; Überspringen der Logout-Seite
// @version        1.8.1 Anpassungen für Russland, Sao Paolo und London; Sprachumschaltung; neuer Update-Mechanismus
// @version        1.7.19 2. Version Buenos Aires: Essen und Trinken korrigiert
// @version        1.7.18 kleinere Korrekturen; 1. Version Buenos Aires
// @version        1.7.17 Anzeige des vorhandenen Schnees für Schneemann war falsch
// @version        1.7.16 Logout funktionierte nicht richtig
// @version        1.7.15 Nochmal Korrekturversuch für Probleme mit dem Skript; Abbruchmöglichkeit bei Logout
// @version        1.7.14 Quickfix; hoffe, es geht wieder alles
// @version        1.7.13 falsche Stückzahl bei benutzbarem Plunder; Warnung bei Logout; Rückkehr in die richtige Stadt nach Logout
// @version        1.7.12 Pinnen eines Eintrags in der SB; i-Symbole beim Essen/Trinken und Flaschensammeln verschoben
// @version        1.7.11 Anzeige des Gegners bei Angriff; Entfernen von nicht mehr vorhandenem Plunder aus der Plunderleiste
// @version        1.7.10 Anzeige/Umschaltbutton für Meldungen; Anzeige des vorhandenen Plunders bei Event-Plunder
// @version        1.7.9 kleinere Korrekturen; Erweiterung der Flaschensammelschaltfläche
// @version        1.7.8 Probleme mit anderen Skripts behoben, Anpassungen für Halloween
// @version        1.7.7 kleinere Korrekturen, Anpassungen für Halloween
// @version        1.7.6 Anpassungen für Halloween
// @version        1.7.5 Erweiterungen für Halloween hinzugefügt
// @version        1.7.4 Sammelmarkenanzeige führt jetzt auch zur Tagesaufgabe, solange noch nicht erledigt
// @version        1.7.3 Art und Stufe der Weiterbildung werden angezeigt
// @version        1.7.2 Leiste mit Tagesaufgabe war nicht mehr abschaltbar
// @version        1.7.1 neue Leiste: Weiterbildung, Sammelmarken und Einkaufswagen
// @version        1.6.9 Verriegelung der Leisten; Sauberkeitsanzeige unter Waschbutton
// @version        1.6.8 kleiner Fehler bei bumrise behoben; 2. Version der Anzeige der täglichen Aufgabe
// @version        1.6.7 kleiner Fehler bei bumrise behoben; 1. Version der Anzeige der täglichen Aufgabe
// @version        1.6.6 kleinen Fehler beim Def-Waffe-Icon behoben
// @version        1.6.5 Kampf-, Bandenkampf und Def-Waffe sind auch anklickbar, wenn sie leer sind
// @version        1.6.4 Leisten können beliebig platziert werden
// @version        1.6.3 Problem mit dem Geld in Marseille behoben
// @version        1.6.2 erste (noch nicht vollständige Version) für Warschau und Krakau; zusätzliche Infos über ATT/DEF-Verstärkung und V-Waffe
// @version        1.6.1 erste (noch nicht vollständige Version) für NY und Madrid; kleinere Fehler behoben
// @version        1.5.9 zum Betrinken wird der Plunder genommen, der als erstes in der Plunderliste steht, ansonsten wie bisher
// @version        1.5.8 es wurden 6 und nicht 5 Trikots angezeigt; Hinweis, wenn man wegen Bandeneintritt nicht von Bandenfähigkeit profitiert
// @version        1.5.7 Anzeige für Neue Nachrichten verschoben; Mehrfachinstallation von Skript verhindert; ACHTUNG: Es sind einmalig alle Einstellungen für dieses Skript neu zu setzen !!!
// @version        1.5.6 Anzeige der gefundenen Trikots verbessert und abschaltbar gemacht
// @version        1.5.5 Anzeige der gefundenen Trikots
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

// Version ermitteln
var oldVersion = 1;
if (document.getElementsByClassName('zleft profile-data').length > 0)
	oldVersion = 0;
var myLang = GM_getValue(TOWNEXTENSION + "myLang", 0);   // Sprache laden
var logoutWarn = -1;
var promille = GetPromille(document);
var myprof = document.getElementById("my-profile");
if (myprof.getElementsByTagName("form").length > 0) {
	var input = myprof.getElementsByTagName("input");
	if (input.length > 0) {
		myprof.getElementsByTagName("form")[0].action = '';
		input[0].type = "button";
		input[0].addEventListener('click', function(event) {
			if (promille >= 0.8)
				logoutWarn = 1;
			var warn = "";
			if (logoutWarn == 1)
				warn = TxtLogoutWarn1[myLang];
			else if (logoutWarn == 2)
				warn = TxtLogoutWarn2[myLang];
			
			if (warn == "")
				var logout = true;
			else
				var logout = confirm(warn + " " + TxtLogout[myLang]);

			if (logout)
			    GM_xmlhttpRequest({
				method:"GET",
				url:"http://"+document.location.hostname+"/logout/",
				onload: function(responseDetails) {
					location.href = TOWNBASE_URL;
				}
			    });
		}, false);
	}
}

// Name PG Warnicon zum Zählen der Angriffe
var ICON_WARNING = 'warning.gif';                                         // PG-Warnicon

// Größe des Kampf- und Bandenkampficons in Pixeln
var ICON_WIDTH = '35';

// Eigene Icons
var ICON_FIGHT_OK = 'http://www.abload.de/img/icon_fight_okmql8.gif';             // Icon Kampfstärke OK
var ICON_FIGHT_WEAK = 'http://www.abload.de/img/icon_fight_weakpsvh.gif';         // Icon Kampfstärke NICHT OK
var ICON_FIGHT_DANG = 'http://www.abload.de/img/rottotenkopfpz4k.png';            // Icon Kampfstärke Gefahr
var ICON_NEW = 'http://www.abload.de/img/newvzxe.png';                            // Icon für Ergebnisänderungen ("NEU")
var ICON_WUTAKTIV = 'http://www.abload.de/img/icon_wutaktivmsdw.gif';             // Icon für Wut AKTIV
var ICON_WUTINAKTIV = 'http://www.abload.de/img/icon_wutinaktiv2l5o.gif';         // Icon für Wut INAKTIV
var ICON_ERROR = 'http://www.abload.de/img/503xyiz.png';                          // Icon für Fehler beim Abrufen einer Seite 
var ICON_ATTDEFWPNBACK = new Array();                                             // Icon ATT/DEF/WPN-Hintergrund
    ICON_ATTDEFWPNBACK[0] = 'http://www.abload.de/img/attdefwpnhuil.png';
    ICON_ATTDEFWPNBACK[1] = 'http://www.abload.de/img/attdefwpn28rd.gif';
var ICON_PLNDWUTPOWERBACK = new Array();                                          // Icon Hintergrund für Plunder, Wut und Power
    ICON_PLNDWUTPOWERBACK[0] = 'http://www.abload.de/img/plndwutpowerhntr.png';
    ICON_PLNDWUTPOWERBACK[1] = 'http://www.abload.de/img/jij5dxxpmn.gif';
var ICON_PLNDWIWUPOWERBACK = new Array();                                         // Icon Hintergrund für Plunder, WiWu und Power
    ICON_PLNDWIWUPOWERBACK[0] = 'http://www.abload.de/img/plndwiwupower4u7p.png';
    ICON_PLNDWIWUPOWERBACK[1] = 'http://www.abload.de/img/wiwukzls.gif';
var ICON_GANGFIGHTBACK = new Array();                                             // Icon Bandenkampfhintergrund
    ICON_GANGFIGHTBACK[0] = 'http://www.abload.de/img/bkampfmuxn.png';
    ICON_GANGFIGHTBACK[1] = 'http://www.abload.de/img/33oqosk9rgd.gif';
var ICON_FIGHTBACK = new Array();                                                 // Icon Kampfhintergrund
    ICON_FIGHTBACK[0] = 'http://www.abload.de/img/kampf8ut7.png';
    ICON_FIGHTBACK[1] = 'http://www.abload.de/img/muv9q89pyl.gif';
var ICON_PLUNDERDIRECTBACK = new Array();                                         // Icon Direktplunderhintergrund
    ICON_PLUNDERDIRECTBACK[0] = 'http://www.abload.de/img/plunderdirektbn3z.png';
    ICON_PLUNDERDIRECTBACK[1] = 'http://www.abload.de/img/2ag9e9i7qbn.gif';
var ICON_PLUNDERSHOPBACK = new Array();                                           // Icon Plundershophintergrund
    ICON_PLUNDERSHOPBACK[0] = 'http://www.abload.de/img/plundershopuulc.png';
    ICON_PLUNDERSHOPBACK[1] = 'http://www.abload.de/img/pshoparyo.gif';
var ICON_SKLCRDCRTBACK = new Array();                                             // Icon Skill/Cards/Cart-Hintergrund
    ICON_SKLCRDCRTBACK[0] = 'http://www.abload.de/img/sklcardsbttluu7b.png';
    ICON_SKLCRDCRTBACK[1] = 'http://www.abload.de/img/skilcrdscm1u.gif';
var ICON_PLUNDERAUSWAEHLEN = 'http://www.abload.de/img/6qznnpapge.gif';           // Icon Plunder auswählen
var ICON_PLUNDERFREE = 'http://www.abload.de/img/6qznnpapge.gif';                 // Icon Freier Plunderplatz
var ICON_PLUNDERRESET = 'http://www.abload.de/img/ier15ioq7s.png';                // Icon Direktplunder zurücksetzen
var ICON_PLUNDERA = 'http://www.abload.de/img/xnhid4wqm7.gif';                    // Icon anlegbarer Plunder
var ICON_PLUNDERB = 'http://www.abload.de/img/wcoarnwr8k.gif';                    // Icon benutzbarer Plunder
var ICON_NOPLUNDEREQUIP = 'http://www.abload.de/img/icon_wutinaktiv2l5o.gif';     // Icon für Wut INAKTIV
var ICON_NODEFWEAPON = 'http://www.abload.de/img/nodefwpnvtwj.png';       // Icon für keine V-Waffe

var ICON_PROMILLEUP = 'http://www.abload.de/img/promilleupvqni.gif';      // Icon Promille hoch
var ICON_PROMILLEDOWN = 'http://www.abload.de/img/242g6mrrows.gif';       // Icon Promille runter
var ICON_PROMILLEBACK = new Array();                                      // Icon Promillehintergrund
    ICON_PROMILLEBACK[0] = 'http://www.abload.de/img/promillewash3uml.png';
    ICON_PROMILLEBACK[1] = 'http://www.abload.de/img/qnmbthvo9v.gif';
var ICON_WASH = 'http://www.abload.de/img/wash3s5g.gif';                  // Icon Waschen
var ICON_CLEAN = 'http://www.abload.de/img/balkgrnensb.gif';              // Icon sauber
var ICON_DIRTY = 'http://www.abload.de/img/wcoarnwr8k.gif';               // Icon schmutzig
var ICON_LOCK = 'http://www.abload.de/img/lockdpzf.png';                  // Icon Schloss
var ICON_PIN = 'http://www.abload.de/img/pushpins5cm.png';                // Icon Pin
var ICON_PIN2 = 'http://www.abload.de/img/pushpin2veik.png';              // Icon Pin2

var ICON_REDBG = 'http://www.abload.de/img/redbg48ns.gif';                // roter Hintergrund
var ICON_GRNBG = 'http://www.abload.de/img/grnbgbgli.gif';                // grüner Hintergrund
var ICON_CART  = 'http://www.abload.de/img/cartrcz6.png';                 // Icon Einkaufswagen
var ICON_CUFF  = 'http://www.abload.de/img/handcuffgy6c.png';             // Icon Handschellen
var ICON_ATTACK = 'http://www.abload.de/img/box8gkn.png';                 // Icon für Kampf
var ICON_INFO = 'http://www.abload.de/img/info45zl.png';                  // Icon für Info
var ICON_NOINFO = 'http://www.abload.de/img/noinfo7u8i.png';              // Icon für keine Info

var ICON_BOO1 = 'http://www.abload.de/img/att1mhzr.gif';                  // Icon Boost +1
var ICON_BOO2 = 'http://www.abload.de/img/att2kfho.gif';                  // Icon Boost +2
var ICON_BOO3 = 'http://www.abload.de/img/att3rd2w.gif';                  // Icon Boost +3
var ICON_BOO4 = 'http://www.abload.de/img/att4g78s.gif';                  // Icon Boost +4
var ICON_BOO10 = 'http://www.abload.de/img/att10hcul.gif';                // Icon Boost +10
var ICON_BOOU = 'http://www.abload.de/img/attuscng.gif';                  // Icon Boost + unbekannt

// Landesflaggen
var ICON_FLAGS = new Array();
    ICON_FLAGS[0] = 'http://www.abload.de/img/germanyi7ik.png';
    ICON_FLAGS[1] = 'http://www.abload.de/img/united_stateskp76.png';
    ICON_FLAGS[2] = 'http://www.abload.de/img/polandi7jd.png';
    ICON_FLAGS[3] = 'http://www.abload.de/img/franceg7la.png';
    ICON_FLAGS[4] = 'http://www.abload.de/img/spains7cx.png';
    ICON_FLAGS[5] = 'http://www.abload.de/img/brazile7ev.png';
    ICON_FLAGS[6] = 'http://www.abload.de/img/russiak7l3.png';
    ICON_FLAGS[7] = 'http://www.abload.de/img/united_kingdom67b7.png';

// Array für Kampf-Warnicons (unterschiedliche Anzahl eingehender Kämpfe)
var ICON_FIGHT = new Array();
    ICON_FIGHT[0] = 'http://www.abload.de/img/nofighthuyj.png';
    ICON_FIGHT[1] = 'http://www.abload.de/img/rot1jynv.png';
    ICON_FIGHT[2] = 'http://www.abload.de/img/rot2fyvn.png';
    ICON_FIGHT[3] = 'http://www.abload.de/img/rot3zzss.png';
    ICON_FIGHT[4] = 'http://www.abload.de/img/rot4rbju.png';
    ICON_FIGHT[5] = 'http://www.abload.de/img/rot5eykh.png';
    ICON_FIGHT[6] = 'http://www.abload.de/img/rottotenkopfpz4k.png';

// Array für Bandenkampf Warnicons (unterschiedliche Anzahl eingehender Bandenkämpfe)
var ICON_GANGFIGHT = new Array();
    ICON_GANGFIGHT[0] = 'http://www.abload.de/img/nofighthuyj.png';
    ICON_GANGFIGHT[1] = 'http://www.abload.de/img/blau1dxuu.png';
    ICON_GANGFIGHT[2] = 'http://www.abload.de/img/blau2zblf.png';
    ICON_GANGFIGHT[3] = 'http://www.abload.de/img/blau35xks.png';
    ICON_GANGFIGHT[4] = 'http://www.abload.de/img/blau4p9rp.png';
    ICON_GANGFIGHT[5] = 'http://www.abload.de/img/blau5jb7e.png';
    ICON_GANGFIGHT[6] = 'http://www.abload.de/img/blautotenkopfgbh9.png';

// Konstanten für Wut-Zustand
var WUTSTATE_ACTIVE = 0;
var WUTSTATE_INACTIVE = 1;
var WUTSTATE_ERROR = 2;

// Konstanten für Fightstate-Zustand
var FIGHTSTATE_OK = 0;
var FIGHTSTATE_WEAK = 1;
var FIGHTSTATE_DANG = 3;
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
var PLUNDERIMAGE_URL = new Array();
    PLUNDERIMAGE_URL[0] = "http://static.pennergame.de/img/pv4/plunder_new/";
    PLUNDERIMAGE_URL[1] = "http://static.pennergame.de/img/pv4/plunder/";

// Diverse Texte - Ausgabe
var THISSCRIPTNAME = new Array;
    THISSCRIPTNAME[0] = "Infozentrale";
    THISSCRIPTNAME[1] = "info central";
    THISSCRIPTNAME[2] = "info central";
    THISSCRIPTNAME[3] = "info central";
    THISSCRIPTNAME[4] = "info central";
    THISSCRIPTNAME[5] = "info central";
    THISSCRIPTNAME[6] = "Информационный центр";
    THISSCRIPTNAME[7] = "info central";
var TOOLTIP_PLUNDERAUSWAHL = new Array();
    TOOLTIP_PLUNDERAUSWAHL[0] = 'Hier klicken, um weitere Plunderstücke für den Direktzugriff auszuwählen. Die Anzeige im Plunder-Direktzugriff erfolgt in der Reihenfolge des Hinzufügens.';
    TOOLTIP_PLUNDERAUSWAHL[1] = 'Click here to choose further junk for the direct access list. The order in the display is given by the order of adding to the list.';
    TOOLTIP_PLUNDERAUSWAHL[2] = 'Click here to choose further junk for the direct access list. The order in the display is given by the order of adding to the list.';
    TOOLTIP_PLUNDERAUSWAHL[3] = 'Click here to choose further junk for the direct access list. The order in the display is given by the order of adding to the list.';
    TOOLTIP_PLUNDERAUSWAHL[4] = 'Click here to choose further junk for the direct access list. The order in the display is given by the order of adding to the list.';
    TOOLTIP_PLUNDERAUSWAHL[5] = 'Click here to choose further junk for the direct access list. The order in the display is given by the order of adding to the list.';
    TOOLTIP_PLUNDERAUSWAHL[6] = 'Кликни здесь, чтобы добавить барахло. Последовательность выставления барахла зависит от последовательности кликов.';
    TOOLTIP_PLUNDERAUSWAHL[7] = 'Click here to choose further junk for the direct access list. The order in the display is given by the order of adding to the list.';
var TOOLTIP_PLUNDERRESET = new Array();
    TOOLTIP_PLUNDERRESET[0] = 'Hier klicken, um die Plunder-Direktzugriffsliste zu leeren.';
    TOOLTIP_PLUNDERRESET[1] = 'Click here to clear the direct access list of the junk.';
    TOOLTIP_PLUNDERRESET[2] = 'Click here to clear the direct access list of the junk.';
    TOOLTIP_PLUNDERRESET[3] = 'Click here to clear the direct access list of the junk.';
    TOOLTIP_PLUNDERRESET[4] = 'Click here to clear the direct access list of the junk.';
    TOOLTIP_PLUNDERRESET[5] = 'Click here to clear the direct access list of the junk.';
    TOOLTIP_PLUNDERRESET[6] = 'Кликни здесь, чтобы удалить все барахло.';
    TOOLTIP_PLUNDERRESET[7] = 'Click here to clear the direct access list of the junk.';
var TOOLTIP_FIGHTOK = new Array();
    TOOLTIP_FIGHTOK[0] = 'Deine aktuelle Kampfstärke ist optimal (%d)! Anklicken --> RESET des Power-Wertes.';
    TOOLTIP_FIGHTOK[1] = 'Your fighting power is optimal (%d)! Click --> RESET the power-value.';
    TOOLTIP_FIGHTOK[2] = 'Your fighting power is optimal (%d)! Click --> RESET the power-value.';
    TOOLTIP_FIGHTOK[3] = 'Your fighting power is optimal (%d)! Click --> RESET the power-value.';
    TOOLTIP_FIGHTOK[4] = 'Your fighting power is optimal (%d)! Click --> RESET the power-value.';
    TOOLTIP_FIGHTOK[5] = 'Your fighting power is optimal (%d)! Click --> RESET the power-value.';
    TOOLTIP_FIGHTOK[6] = 'Твоя сила оптимальна (%d)! Кликни, чтобы актуализировать твою силу.';
    TOOLTIP_FIGHTOK[7] = 'Your fighting power is optimal (%d)! Click --> RESET the power-value.';
var TOOLTIP_FIGHTWEAK = new Array();
    TOOLTIP_FIGHTWEAK[0] = 'Achtung, Du hast derzeit nicht Deine maximale Kampfstärke (%d/%d)! Anklicken --> RESET des Power-Wertes.';
    TOOLTIP_FIGHTWEAK[1] = "Attention, you don't have your maximal fighting power (%d/%d)! Click --> RESET the power-value.";
    TOOLTIP_FIGHTWEAK[2] = "Attention, you don't have your maximal fighting power (%d/%d)! Click --> RESET the power-value.";
    TOOLTIP_FIGHTWEAK[3] = "Attention, you don't have your maximal fighting power (%d/%d)! Click --> RESET the power-value.";
    TOOLTIP_FIGHTWEAK[4] = "Attention, you don't have your maximal fighting power (%d/%d)! Click --> RESET the power-value.";
    TOOLTIP_FIGHTWEAK[5] = "Attention, you don't have your maximal fighting power (%d/%d)! Click --> RESET the power-value.";
    TOOLTIP_FIGHTWEAK[6] = "Внимание, у тебя сейчас не максимальная сила (%d/%d)! Кликни, чтобы актуализировать твою силу.";
    TOOLTIP_FIGHTWEAK[7] = "Attention, you don't have your maximal fighting power (%d/%d)! Click --> RESET the power-value.";
var TOOLTIP_FIGHTDANG = new Array();
    TOOLTIP_FIGHTDANG[0] = "Achtung, Du schwebst in Lebensgefahr !";
    TOOLTIP_FIGHTDANG[1] = "Your life hangs from a thread !";
    TOOLTIP_FIGHTDANG[2] = "Znajdujesz się w niebezpieczeństwie !";
    TOOLTIP_FIGHTDANG[3] = "Tu es en danger de mort !";
    TOOLTIP_FIGHTDANG[4] = "¡Tu vida está en peligro!";
    TOOLTIP_FIGHTDANG[5] = "Você está correndo risco de vida !";
    TOOLTIP_FIGHTDANG[6] = "Ты в смертельной опасности !";
    TOOLTIP_FIGHTDANG[7] = "Your life is in Danger !";
var TOOLTIP_LOADERROR = new Array();
    TOOLTIP_LOADERROR[0] = 'Seitenladefehler!';
    TOOLTIP_LOADERROR[1] = 'page loading error!';
    TOOLTIP_LOADERROR[2] = 'page loading error!';
    TOOLTIP_LOADERROR[3] = 'page loading error!';
    TOOLTIP_LOADERROR[4] = 'page loading error!';
    TOOLTIP_LOADERROR[5] = 'page loading error!';
    TOOLTIP_LOADERROR[6] = 'Ошибка при запуске страницы!';
    TOOLTIP_LOADERROR[7] = 'page loading error!';
var TOOLTIP_WIWUTAKTIV = new Array();
    TOOLTIP_WIWUTAKTIV[0] = ' ist aktiv! Ende: ';
    TOOLTIP_WIWUTAKTIV[1] = ' is active! End: ';
    TOOLTIP_WIWUTAKTIV[2] = ' jest aktywny! Zakończ: ';
    TOOLTIP_WIWUTAKTIV[3] = ' is active! End: ';
    TOOLTIP_WIWUTAKTIV[4] = ' is active! End: ';
    TOOLTIP_WIWUTAKTIV[5] = ' is active! End: ';
    TOOLTIP_WIWUTAKTIV[6] = ' активно! Окончание: ';
    TOOLTIP_WIWUTAKTIV[7] = ' is active! End: ';
var TOOLTIP_WIWUTINAKTIV = new Array();
    TOOLTIP_WIWUTINAKTIV[0] = ' derzeit NICHT aktiv!';
    TOOLTIP_WIWUTINAKTIV[1] = ' NOT active at the moment!';
    TOOLTIP_WIWUTINAKTIV[2] = ' NOT active at the moment!';
    TOOLTIP_WIWUTINAKTIV[3] = ' NOT active at the moment!';
    TOOLTIP_WIWUTINAKTIV[4] = ' NOT active at the moment!';
    TOOLTIP_WIWUTINAKTIV[5] = ' NOT active at the moment!';
    TOOLTIP_WIWUTINAKTIV[6] = ' сейчас неактивно!';
    TOOLTIP_WIWUTINAKTIV[7] = ' NOT active at the moment!';
var TOOLTIP_LOCK = new Array();
    TOOLTIP_LOCK[0] = 'Leistenbewegung wird nicht gespeichert!';
    TOOLTIP_LOCK[1] = 'Movement of panels will not be stored!';
    TOOLTIP_LOCK[2] = 'Movement of panels will not be stored!';
    TOOLTIP_LOCK[3] = 'Movement of panels will not be stored!';
    TOOLTIP_LOCK[4] = 'Movement of panels will not be stored!';
    TOOLTIP_LOCK[5] = 'Movement of panels will not be stored!';
    TOOLTIP_LOCK[6] = 'перемещение панели не сохраняется!';
    TOOLTIP_LOCK[7] = 'Movement of panels will not be stored!';

var ALERT_PLUNDERRESET = new Array();
    ALERT_PLUNDERRESET[0] = 'Die Plunder-Direktzugriffsliste wurde geleert!';
    ALERT_PLUNDERRESET[1] = 'The direct access list for junk has been cleared!';
    ALERT_PLUNDERRESET[2] = 'The direct access list for junk has been cleared!';
    ALERT_PLUNDERRESET[3] = 'The direct access list for junk has been cleared!';
    ALERT_PLUNDERRESET[4] = 'The direct access list for junk has been cleared!';
    ALERT_PLUNDERRESET[5] = 'The direct access list for junk has been cleared!';
    ALERT_PLUNDERRESET[6] = 'панель с барахлом очищена!';
    ALERT_PLUNDERRESET[7] = 'The direct access list for junk has been cleared!';
var ALERT_RESETPOWER = new Array();
    ALERT_RESETPOWER[0] = 'Der maximale Power-Wert wurde zurückgesetzt und wird jetzt neu ermittelt!';
    ALERT_RESETPOWER[1] = 'The maximal power value has been reset and will be set new now!';
    ALERT_RESETPOWER[2] = 'The maximal power value has been reset and will be set new now!';
    ALERT_RESETPOWER[3] = 'The maximal power value has been reset and will be set new now!';
    ALERT_RESETPOWER[4] = 'The maximal power value has been reset and will be set new now!';
    ALERT_RESETPOWER[5] = 'The maximal power value has been reset and will be set new now!';
    ALERT_RESETPOWER[6] = 'Максимальная сила сброшена и будет установлена заново!';
    ALERT_RESETPOWER[7] = 'The maximal power value has been reset and will be set new now!';

var TxtNewVersion = new Array();
    TxtNewVersion[0] = "Es gibt eine neue Version des Skriptes '%s':\n\n%s\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n%s\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschließend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt."
    TxtNewVersion[1] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."
    TxtNewVersion[2] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."
    TxtNewVersion[3] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."
    TxtNewVersion[4] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."
    TxtNewVersion[5] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."
    TxtNewVersion[6] = "Есть новая версия скрипта ‘%s’:\n\n%s\n\nВ новой версии могут быть улучшения или новые функции.\nЗдесь есть информации о скрипте:\n\n%s\n\nСоветуем инсталлировать.\n\nОпрос о новой версии только раз в день."
var TxtPlunderCheck = new Array();
    TxtPlunderCheck[0] = 'Durch Anlegen des Plunders "%s" wäre Deine Kampfkraft am größten';
    TxtPlunderCheck[1] = 'If you equip with the junk "%s" your fighting power will be highest';
    TxtPlunderCheck[2] = 'If you equip with the junk "%s" your fighting power will be highest';
    TxtPlunderCheck[3] = 'If you equip with the junk "%s" your fighting power will be highest';
    TxtPlunderCheck[4] = 'If you equip with the junk "%s" your fighting power will be highest';
    TxtPlunderCheck[5] = 'If you equip with the junk "%s" your fighting power will be highest';
    TxtPlunderCheck[6] = 'Если сохранишь “%s” барахло, сила будет максимальной.';
    TxtPlunderCheck[7] = 'If you equip with the junk "%s" your fighting power will be highest';
var TxtWCheck1 = new Array();
    TxtWCheck1[0] = 'Wenn Du die Waffe "%s" kaufst und anlegst, verbessert sich Dein ATT-Wert um %d';
    TxtWCheck1[1] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck1[2] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck1[3] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck1[4] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck1[5] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck1[6] = 'Если купишь и применишь “%s” оружие, твой АТТ увеличится на %d.';
    TxtWCheck1[7] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
var TxtWCheck2 = new Array();
    TxtWCheck2[0] = 'Wenn Du die Waffe "%s" anlegst, verbessert sich Dein ATT-Wert um %d';
    TxtWCheck2[1] = 'If you use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck2[2] = 'If you use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck2[3] = 'If you use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck2[4] = 'If you use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck2[5] = 'If you use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck2[6] = 'Если применишь “%s” оружие, твой АТТ увеличится на %d';
    TxtWCheck2[7] = 'If you use the weapon "%s" your ATT-value will increase by %d';
var TxtHomeCheck = new Array();
    TxtHomeCheck[0] = 'Wenn Du %sdas Eigenheim "%s" %s, verbessert sich Dein DEF-Wert um %d';
    TxtHomeCheck[1] = 'If you %s the home "%s" %syour DEF-Value will increase by %d';
    TxtHomeCheck[2] = 'If you %s the home "%s" %syour DEF-Value will increase by %d';
    TxtHomeCheck[3] = 'If you %s the home "%s" %syour DEF-Value will increase by %d';
    TxtHomeCheck[4] = 'If you %s the home "%s" %syour DEF-Value will increase by %d';
    TxtHomeCheck[5] = 'If you %s the home "%s" %syour DEF-Value will increase by %d';
    TxtHomeCheck[6] = 'Если ты %s частный дом “%s”%s, твой DEF увеличится на %d';
    TxtHomeCheck[7] = 'If you %s the home "%s" %syour DEF-Value will increase by %d';
var TxtHomeMovein1 = new Array();
    TxtHomeMovein1[0] = "";
    TxtHomeMovein1[1] = "go to";
    TxtHomeMovein1[2] = "go to";
    TxtHomeMovein1[3] = "go to";
    TxtHomeMovein1[4] = "go to";
    TxtHomeMovein1[5] = "go to";
    TxtHomeMovein1[6] = "вселишься в";
    TxtHomeMovein1[7] = "go to";
var TxtHomeMovein2 = new Array();
    TxtHomeMovein2[0] = "beziehst";
    TxtHomeMovein2[1] = "";
    TxtHomeMovein2[2] = "";
    TxtHomeMovein2[3] = "";
    TxtHomeMovein2[4] = "";
    TxtHomeMovein2[5] = "";
    TxtHomeMovein2[6] = "";
    TxtHomeMovein2[7] = "";
var TxtHomeBuy1 = new Array();
    TxtHomeBuy1[0] = "";
    TxtHomeBuy1[1] = "buy";
    TxtHomeBuy1[2] = "buy";
    TxtHomeBuy1[3] = "buy";
    TxtHomeBuy1[4] = "buy";
    TxtHomeBuy1[5] = "buy";
    TxtHomeBuy1[6] = "купишь";
    TxtHomeBuy1[7] = "buy";
var TxtHomeBuy2 = new Array();
    TxtHomeBuy2[0] = "kaufst";
    TxtHomeBuy2[1] = "";
    TxtHomeBuy2[2] = "";
    TxtHomeBuy2[3] = "";
    TxtHomeBuy2[4] = "";
    TxtHomeBuy2[5] = "";
    TxtHomeBuy2[6] = "";
    TxtHomeBuy2[7] = "";
var TxtBuy = new Array();
    TxtBuy[0] = 'Kaufen';
    TxtBuy[1] = 'Buy';
    TxtBuy[2] = 'Kup';
    TxtBuy[3] = 'Acheter';
    TxtBuy[4] = 'Comprar';
    TxtBuy[5] = 'Comprar';
    TxtBuy[6] = 'Купить';
    TxtBuy[7] = 'Buy';
var TxtBuyAll = new Array();
    TxtBuyAll[0] = 'Alles kaufen';
    TxtBuyAll[1] = 'Buy all';
    TxtBuyAll[2] = 'Kup wszystko';
    TxtBuyAll[3] = 'Acheter tous';
    TxtBuyAll[4] = 'Comprar todo';
    TxtBuyAll[5] = 'Comprar tudo';
    TxtBuyAll[6] = 'Купить';
    TxtBuyAll[7] = 'Buy all';
var TxtWaitSort = new Array();
    TxtWaitSort[0] = 'warte %s - neue Ramschlieferung ist bereits unterwegs (%s)';
    TxtWaitSort[1] = 'wait %s - new sortiment is on its way (%s)';
    TxtWaitSort[2] = 'wait %s - new sortiment is on its way (%s)';
    TxtWaitSort[3] = 'attend %s - la nouvelle livraison arrive bientôt';
    TxtWaitSort[4] = 'espera %s - el nuevo pedido de cachivaches está en camino';
    TxtWaitSort[5] = 'wait %s - new sortiment is on its way (%s)';
    TxtWaitSort[6] = 'wait %s - new sortiment is on its way (%s)';
    TxtWaitSort[7] = 'wait %s - new sortiment is on its way (%s)';
var TxtWash = new Array();
    TxtWash[0] = 'Vollständig waschen';
    TxtWash[1] = 'Wash completely';
    TxtWash[2] = 'Wash completely';
    TxtWash[3] = 'Wash completely';
    TxtWash[4] = 'Lavarse completo';
    TxtWash[5] = 'Wash completely';
    TxtWash[6] = 'полностью помыться';
    TxtWash[7] = 'Wash completely';
var TxtPromUp = new Array();
    TxtPromUp[0] = 'Promille rauf';
    TxtPromUp[1] = 'Alcohol level up';
    TxtPromUp[2] = 'Alcohol level up';
    TxtPromUp[3] = 'Alcohol level up';
    TxtPromUp[4] = 'Alcohol level up';
    TxtPromUp[5] = 'Alcohol level up';
    TxtPromUp[6] = 'увеличить промилле';
    TxtPromUp[7] = 'Alcohol level up';
var TxtPromDown = new Array();
    TxtPromDown[0] = 'Promille runter';
    TxtPromDown[1] = 'Alcohol level down';
    TxtPromDown[2] = 'Alcohol level down';
    TxtPromDown[3] = 'Alcohol level down';
    TxtPromDown[4] = 'Alcohol level down';
    TxtPromDown[5] = 'Alcohol level down';
    TxtPromDown[6] = 'уменьшить промилле';
    TxtPromDown[7] = 'Alcohol level down';
var TxtIncomingFights1 = new Array();
    TxtIncomingFights1[0] = ' 1 eingehender Angriff!';
    TxtIncomingFights1[1] = ' 1 incoming fight!';
    TxtIncomingFights1[2] = ' 1 rozpoczęte walk';
    TxtIncomingFights1[3] = ' 1 baston inattendue!';
    TxtIncomingFights1[4] = ' 1 lucha entrante!';
    TxtIncomingFights1[5] = ' 1 incoming fight!';
    TxtIncomingFights1[6] = ' 1 входящий бой';
    TxtIncomingFights1[7] = ' 1 incoming fight!';
var TxtIncomingFights2 = new Array();
    TxtIncomingFights2[0] = ' %d eingehende Angriffe!';
    TxtIncomingFights2[1] = ' %d incoming fights!';
    TxtIncomingFights2[2] = ' %d rozpoczęte walki';
    TxtIncomingFights2[3] = ' %d bastons inattendues!';
    TxtIncomingFights2[4] = ' %d luchas entrantes!';
    TxtIncomingFights2[5] = ' %d incoming fights!';
    TxtIncomingFights2[6] = ' %d Поступающие разборки';
    TxtIncomingFights2[7] = ' %d incoming fights!';
var TxtGangFight1 = new Array();
    TxtGangFight1[0] = 'Aktuell läuft ein Bandenkampf!%s';
    TxtGangFight1[1] = 'At the moment one gang fight is running!%s';
    TxtGangFight1[2] = 'At the moment one gang fight is running!%s';			// Aendern
    TxtGangFight1[3] = 'At the moment one gang fight is running!%s';
    TxtGangFight1[4] = 'At the moment one gang fight is running!%s';
    TxtGangFight1[5] = 'At the moment one gang fight is running!%s';
    TxtGangFight1[6] = 'Сейчас идет бой между бандами!%s';
    TxtGangFight1[7] = 'At the moment one gang fight is running!%s';
var TxtGangFight2 = new Array();
    TxtGangFight2[0] = 'Aktuell laufen %d Bandenkämpfe!%s';
    TxtGangFight2[1] = 'At the moment %d gang fights are running!%s';
    TxtGangFight2[2] = 'At the moment %d gang fights are running!%s';			// Aendern
    TxtGangFight2[3] = 'At the moment %d gang fights are running!%s';
    TxtGangFight2[4] = 'At the moment %d gang fights are running!%s';
    TxtGangFight2[5] = 'At the moment %d gang fights are running!%s';
    TxtGangFight2[6] = 'Число актуальных боев между бандами: %d! %s';
    TxtGangFight2[7] = 'At the moment %d gang fights are running!%s';
var TxtAusweichen = new Array();
    TxtAusweichen[0] = 'Ausweichen%s möglich';
    TxtAusweichen[1] = 'Evading%s possible';
    TxtAusweichen[2] = 'Unikaj%s możliwy';
    TxtAusweichen[3] = 'Esquiver%s possible';
    TxtAusweichen[4] = 'Evitar%s posible';
    TxtAusweichen[5] = 'Evading%s possible';
    TxtAusweichen[6] = 'избежать боя %s возможно';
    TxtAusweichen[7] = 'Evading%s possible';
var TxtAusweichN = new Array();
    TxtAusweichN[0] = ' nicht';
    TxtAusweichN[1] = ' not';
    TxtAusweichN[2] = ' nie';
    TxtAusweichN[3] = ' non';
    TxtAusweichN[4] = ' no es';
    TxtAusweichN[5] = ' not';
    TxtAusweichN[6] = ' не';
    TxtAusweichN[7] = ' not';
var TxtAusweichV = new Array();
    TxtAusweichV[0] = ' evtl.';
    TxtAusweichV[1] = ' maybe';
    TxtAusweichV[2] = ' może';
    TxtAusweichV[3] = ' peut-être';
    TxtAusweichV[4] = ' probablemente';
    TxtAusweichV[5] = ' maybe';
    TxtAusweichV[6] = ' может быть';
    TxtAusweichV[7] = ' maybe';
var TxtNotMoreThan9 = new Array();
    TxtNotMoreThan9[0] = 'Es können nicht mehr als 9 Plunderstücke für die Direktzugriffsliste ausgewählt werden!';
    TxtNotMoreThan9[1] = 'You cannot select more than 9 pieces of junk for the direct access list!';
    TxtNotMoreThan9[2] = 'You cannot select more than 9 pieces of junk for the direct access list!';
    TxtNotMoreThan9[3] = 'You cannot select more than 9 pieces of junk for the direct access list!';
    TxtNotMoreThan9[4] = 'You cannot select more than 9 pieces of junk for the direct access list!';
    TxtNotMoreThan9[5] = 'You cannot select more than 9 pieces of junk for the direct access list!';
    TxtNotMoreThan9[6] = 'К панели можно прикрепить не больше 9 штук барахла!';
    TxtNotMoreThan9[7] = 'You cannot select more than 9 pieces of junk for the direct access list!';
var TxtMoneyNeeded = new Array();
    TxtMoneyNeeded[0] = 'Zum Waschen werden %m benötigt, Du hast im Moment nur %m.';
    TxtMoneyNeeded[1] = 'You need %m to wash completely, but you only have %m at the moment.';
    TxtMoneyNeeded[2] = 'You need %m to wash completely, but you only have %m at the moment.';
    TxtMoneyNeeded[3] = 'You need %m to wash completely, but you only have %m at the moment.';
    TxtMoneyNeeded[4] = 'You need %m to wash completely, but you only have %m at the moment.';
    TxtMoneyNeeded[5] = 'You need %m to wash completely, but you only have %m at the moment.';
    TxtMoneyNeeded[6] = 'Для мытья нужно %m, а у тебя только %m.';
    TxtMoneyNeeded[7] = 'You need %m to wash completely, but you only have %m at the moment.';
var TxtCleansed1 = new Array();
    TxtCleansed1[0] = 'Du bist nun porentief rein!';
    TxtCleansed1[1] = 'You are cleansed down to the pores now!';
    TxtCleansed1[2] = 'You are cleansed down to the pores now!';
    TxtCleansed1[3] = 'You are cleansed down to the pores now!';
    TxtCleansed1[4] = 'You are cleansed down to the pores now!';
    TxtCleansed1[5] = 'You are cleansed down to the pores now!';
    TxtCleansed1[6] = 'Ты чист!';
    TxtCleansed1[7] = 'You are cleansed down to the pores now!';
var TxtCleansed2 = new Array();
    TxtCleansed2[0] = 'Du bist bereits porentief rein, sauberer geht nicht... :D';
    TxtCleansed2[1] = 'You are already cleansed down to the pores, more is not possible... :D';
    TxtCleansed2[2] = 'You are already cleansed down to the pores, more is not possible... :D';
    TxtCleansed2[3] = 'You are already cleansed down to the pores, more is not possible... :D';
    TxtCleansed2[4] = 'You are already cleansed down to the pores, more is not possible... :D';
    TxtCleansed2[5] = 'You are already cleansed down to the pores, more is not possible... :D';
    TxtCleansed2[6] = 'Ты чист, чище не бывает… :D';
    TxtCleansed2[7] = 'You are already cleansed down to the pores, more is not possible... :D';
var TxtHiccup = new Array();
    TxtHiccup[0] = '*Hicks* Jetzt hab ich endlich wieder meinen Standard-Pegel! :D';
    TxtHiccup[1] = '*Hiccup* Finally I have my standard blood alcohol level again! :D';
    TxtHiccup[2] = '*Hiccup* Finally I have my standard blood alcohol level again! :D';
    TxtHiccup[3] = '*Hiccup* Finally I have my standard blood alcohol level again! :D';
    TxtHiccup[4] = '*Hiccup* Finally I have my standard blood alcohol level again! :D';
    TxtHiccup[5] = '*Hiccup* Finally I have my standard blood alcohol level again! :D';
    TxtHiccup[6] = 'Фу-у, наконец-то я трезвый!';
    TxtHiccup[7] = '*Hiccup* Finally I have my standard blood alcohol level again! :D';
var TxtDrinkError = new Array();
    TxtDrinkError[0] = 'Beim Trinken gab es einen Fehler, Du hast immer noch nur %s Promille!';
    TxtDrinkError[1] = 'There was an error with the drinking, you still have only %s per mills';
    TxtDrinkError[2] = 'There was an error with the drinking, you still have only %s per mills';
    TxtDrinkError[3] = 'There was an error with the drinking, you still have only %s per mills';
    TxtDrinkError[4] = 'There was an error with the drinking, you still have only %s per mills';
    TxtDrinkError[5] = 'There was an error with the drinking, you still have only %s per mills';
    TxtDrinkError[6] = 'При питье допущена ошибка, у тебя все еще %s промилле!';
    TxtDrinkError[7] = 'There was an error with the drinking, you still have only %s per mills';
var TxtNotMuchToDrink = new Array();
    TxtNotMuchToDrink[0] = 'Die Vorräte an %s gehen zur Neige.\nBitte zuerst nachkaufen!';
    TxtNotMuchToDrink[1] = 'Your supply of %s is running low.\nPlease buy some first!';
    TxtNotMuchToDrink[2] = 'Your supply of %s is running low.\nPlease buy some first!';
    TxtNotMuchToDrink[3] = 'Your supply of %s is running low.\nPlease buy some first!';
    TxtNotMuchToDrink[4] = 'Your supply of %s is running low.\nPlease buy some first!';
    TxtNotMuchToDrink[5] = 'Your supply of %s is running low.\nPlease buy some first!';
    TxtNotMuchToDrink[6] = 'Запасы %s заканчиваются. \nпожалуйста, докупите!';
    TxtNotMuchToDrink[7] = 'Your supply of %s is running low.\nPlease buy some first!';
var TxtNoNeedToDrink = new Array();
    TxtNoNeedToDrink[0] = 'Du hast bereits mindestens 2,5 Promille,\nDu musst nicht noch mehr trinken!';
    TxtNoNeedToDrink[1] = "You already have a blood alcohol level of 2.5 per mills or more\nyou don't need to drink more!";
    TxtNoNeedToDrink[2] = "You already have a blood alcohol level of 2.5 per mills or more\nyou don't need to drink more!";
    TxtNoNeedToDrink[3] = "You already have a blood alcohol level of 2.5 per mills or more\nyou don't need to drink more!";
    TxtNoNeedToDrink[4] = "You already have a blood alcohol level of 2.5 per mills or more\nyou don't need to drink more!";
    TxtNoNeedToDrink[5] = "You already have a blood alcohol level of 2.5 per mills or more\nyou don't need to drink more!";
    TxtNoNeedToDrink[6] = "У тебя уже минимум 2,5 промилле, \nты не должен больше пить!";
    TxtNoNeedToDrink[7] = "You already have a blood alcohol level of 2.5 per mills or more\nyou don't need to drink more!";
var TxtYummy = new Array();
    TxtYummy[0] = 'Mjamm, das war lecker!';
    TxtYummy[1] = 'Yummy, that was delicious!';
    TxtYummy[2] = 'Yummy, that was delicious!';
    TxtYummy[3] = 'Yummy, that was delicious!';
    TxtYummy[4] = 'Yummy, that was delicious!';
    TxtYummy[5] = 'Yummy, that was delicious!';
    TxtYummy[6] = 'М-м, это было вкусно!';
    TxtYummy[7] = 'Yummy, that was delicious!';
var TxtEatError = new Array();
    TxtEatError[0] = 'Beim Essen gab es einen Fehler, Du hast immer noch %s Promille!';
    TxtEatError[1] = 'There was an error with the eating, you still have %s per mills';
    TxtEatError[2] = 'There was an error with the eating, you still have %s per mills';
    TxtEatError[3] = 'There was an error with the eating, you still have %s per mills';
    TxtEatError[4] = 'There was an error with the eating, you still have %s per mills';
    TxtEatError[5] = 'There was an error with the eating, you still have %s per mills';
    TxtEatError[6] = 'С едой вышла ошибка, у тебя все еще %s промилле!';
    TxtEatError[7] = 'There was an error with the eating, you still have %s per mills';
var TxtNotMuchToEat = new Array();
    TxtNotMuchToEat[0] = 'Die Vorräte an %s und/oder %s\ngehen zur Neige. Bitte zuerst nachkaufen!';
    TxtNotMuchToEat[1] = 'Your supply of %s and/or %s is running low.\nPlease buy some of them first!';
    TxtNotMuchToEat[2] = 'Your supply of %s and/or %s is running low.\nPlease buy some of them first!';
    TxtNotMuchToEat[3] = 'Your supply of %s and/or %s is running low.\nPlease buy some of them first!';
    TxtNotMuchToEat[4] = 'Your supply of %s and/or %s is running low.\nPlease buy some of them first!';
    TxtNotMuchToEat[5] = 'Your supply of %s and/or %s is running low.\nPlease buy some of them first!';
    TxtNotMuchToEat[6] = 'Запасы %s и/или %s\nзаканчиваются. Сначала докупите!';
    TxtNotMuchToEat[7] = 'Your supply of %s and/or %s is running low.\nPlease buy some of them first!';
var TxtNoNeedToEat = new Array();
    TxtNoNeedToEat[0] = '0,75 Promille oder weniger beeinträchtigen die Kampfwerte nicht,\nDu musst nichts mehr essen!';
    TxtNoNeedToEat[1] = "0.75 per mills or less do not reduce the figthing values,\nyou don't need to eat more!";
    TxtNoNeedToEat[2] = "0.75 per mills or less do not reduce the figthing values,\nyou don't need to eat more!";
    TxtNoNeedToEat[3] = "0.75 per mills or less do not reduce the figthing values,\nyou don't need to eat more!";
    TxtNoNeedToEat[4] = "0.75 per mills or less do not reduce the figthing values,\nyou don't need to eat more!";
    TxtNoNeedToEat[5] = "0.75 per mills or less do not reduce the figthing values,\nyou don't need to eat more!";
    TxtNoNeedToEat[6] = "0,75 или меньше промилле на силу не влияют, \nтебе не нужно больше есть!";
    TxtNoNeedToEat[7] = "0.75 per mills or less do not reduce the figthing values,\nyou don't need to eat more!";
var TxtNotEnoughToEat = new Array();
    TxtNotEnoughToEat[0] = 'Es ist nicht genügend zu essen da !!';
    TxtNotEnoughToEat[1] = "You don't have enough to eat !!";
    TxtNotEnoughToEat[2] = "You don't have enough to eat !!";
    TxtNotEnoughToEat[3] = "You don't have enough to eat !!";
    TxtNotEnoughToEat[4] = "No tienes suficiente para comer !!";
    TxtNotEnoughToEat[5] = "You don't have enough to eat !!";
    TxtNotEnoughToEat[6] = "Недостаточно еды!";
    TxtNotEnoughToEat[7] = "You don't have enough to eat !!";
var TxtNoJunkLeft = new Array();
    TxtNoJunkLeft[0] = "Vom benutzbaren Plunder '%s' ist leider nichts mehr übrig,\nDu musst ihn wieder sammeln. Er wird er aus der Direktleiste entfernt.";
    TxtNoJunkLeft[1] = "There's nothing left from the useable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
    TxtNoJunkLeft[2] = "There's nothing left from the useable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
    TxtNoJunkLeft[3] = "There's nothing left from the useable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
    TxtNoJunkLeft[4] = "There's nothing left from the useable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
    TxtNoJunkLeft[5] = "There's nothing left from the useable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
    TxtNoJunkLeft[6] = "‘%s’, который можно использовать, закончился, \nты должен собирать бутылки. Барахло будет удалено из панели.";
    TxtNoJunkLeft[7] = "There's nothing left from the useable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
var TxtNoJunkLeft2 = new Array();
    TxtNoJunkLeft2[0] = "Vom anlegbaren Plunder '%s' ist leider nichts mehr übrig,\nDu musst ihn wieder sammeln. Er wird er aus der Direktleiste entfernt.";
    TxtNoJunkLeft2[1] = "There's nothing left from the wearable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
    TxtNoJunkLeft2[2] = "There's nothing left from the wearable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
    TxtNoJunkLeft2[3] = "There's nothing left from the wearable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
    TxtNoJunkLeft2[4] = "There's nothing left from the wearable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
    TxtNoJunkLeft2[5] = "There's nothing left from the wearable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
    TxtNoJunkLeft2[6] = "‘%s’ закончилось, \nты должен собирать бутылки. Барахло будет удалено из панели.";
    TxtNoJunkLeft2[7] = "There's nothing left from the wearable junk '%s'.\nYou have to collect it again. It will be removed from the direct access list";
var TxtEquip = new Array();
    TxtEquip[0] = 'Anlegen';
    TxtEquip[1] = 'Equip';
    TxtEquip[2] = 'Załóż';
    TxtEquip[3] = 'Équiper';
    TxtEquip[4] = 'Encarar';
    TxtEquip[5] = 'Ativar';
    TxtEquip[6] = 'приложить';
    TxtEquip[7] = 'Equip';
var TxtUse = new Array();
    TxtUse[0] = 'Benutzen';
    TxtUse[1] = 'Use';
    TxtUse[2] = 'Użyj';
    TxtUse[3] = 'Utiliser';
    TxtUse[4] = 'Utilizar';
    TxtUse[5] = 'Usar';
    TxtUse[6] = 'использовать';
    TxtUse[7] = 'Use';
var TxtNoSkill = new Array();
    TxtNoSkill[0] = "Keine Weiterbildung";
    TxtNoSkill[1] = "No development";
    TxtNoSkill[2] = "Nie szkolenie";
    TxtNoSkill[3] = "Aucune formation";
    TxtNoSkill[4] = "Ningún cursillo";
    TxtNoSkill[5] = "No development";   // !!!!
    TxtNoSkill[6] = "обучения нет";
    TxtNoSkill[7] = "No development";
var TxtNoJunk = new Array();
    TxtNoJunk[0] = "Kein Plunder angelegt";
    TxtNoJunk[1] = "No junk equipped";
    TxtNoJunk[2] = "Nie masz rupieci";
    TxtNoJunk[3] = "Aucune babiole sélectionné";
    TxtNoJunk[4] = "Ningún cachivache encara";
    TxtNoJunk[5] = "No junk equipped";   // !!!!
    TxtNoJunk[6] = "барахло не приложено";
    TxtNoJunk[7] = "No junk equipped";
var TxtUseJunk = new Array();
    TxtUseJunk[0] = '%s: %s (noch %d Stück übrig)';
    TxtUseJunk[1] = '%s: %s (still %d pieces remaining)';
    TxtUseJunk[2] = '%s: %s (still %d pieces remaining)';
    TxtUseJunk[3] = '%s: %s (still %d pieces remaining)';
    TxtUseJunk[4] = '%s: %s (still %d pieces remaining)';
    TxtUseJunk[5] = '%s: %s (still %d pieces remaining)';
    TxtUseJunk[6] = '%s: %s (осталось еще %d штук)';
    TxtUseJunk[7] = '%s: %s (still %d pieces remaining)';
var TxtEquipThisJunk = new Array();
    TxtEquipThisJunk[0] = 'Dieser Plunder wird angelegt';
    TxtEquipThisJunk[1] = 'This junk can be equipped';
    TxtEquipThisJunk[2] = 'This junk can be equipped';
    TxtEquipThisJunk[3] = 'This junk can be equipped';
    TxtEquipThisJunk[4] = 'This junk can be equipped';
    TxtEquipThisJunk[5] = 'This junk can be equipped';
    TxtEquipThisJunk[6] = 'это барахло будет приложено';
    TxtEquipThisJunk[7] = 'This junk can be equipped';
var TxtUseThisJunk = new Array();
    TxtUseThisJunk[0] = 'Dieser Plunder wird benutzt';
    TxtUseThisJunk[1] = 'This junk can be used';
    TxtUseThisJunk[2] = 'This junk can be used';
    TxtUseThisJunk[3] = 'This junk can be used';
    TxtUseThisJunk[4] = 'This junk can be used';
    TxtUseThisJunk[5] = 'This junk can be used';
    TxtUseThisJunk[6] = 'это барахло будет использовано';
    TxtUseThisJunk[7] = 'This junk can be used';
var TxtReallyUseJunk = new Array();
    TxtReallyUseJunk[0] = "Soll der Plunder '%s' wirklich benutzt werden?\n\nHinweis: Durch die Benutzung wird er sofort verbraucht. Du hast\nderzeit noch %d Stück.";
    TxtReallyUseJunk[1] = "Do you really want to use the junk '%s'?\n\nNote: Using it will consume it. At the moment\nyou still have %d pieces.";
    TxtReallyUseJunk[2] = "Do you really want to use the junk '%s'?\n\nNote: Using it will consume it. At the moment\nyou still have %d pieces.";
    TxtReallyUseJunk[3] = "Do you really want to use the junk '%s'?\n\nNote: Using it will consume it. At the moment\nyou still have %d pieces.";
    TxtReallyUseJunk[4] = "Do you really want to use the junk '%s'?\n\nNote: Using it will consume it. At the moment\nyou still have %d pieces.";
    TxtReallyUseJunk[5] = "Do you really want to use the junk '%s'?\n\nNote: Using it will consume it. At the moment\nyou still have %d pieces.";
    TxtReallyUseJunk[6] = "Хочешь использовать ‘%s’ барахло? \n\nвнимание: после использования барахло исчезает. У тебя\nсейчас еще %d штук.";
    TxtReallyUseJunk[7] = "Do you really want to use the junk '%s'?\n\nNote: Using it will consume it. At the moment\nyou still have %d pieces.";
var TxtJunkUsed = new Array();
    TxtJunkUsed[0] = '%s wurde erfolgreich benutzt.';
    TxtJunkUsed[1] = '%s was successfully used.';
    TxtJunkUsed[2] = '%s was successfully used.';
    TxtJunkUsed[3] = '%s was successfully used.';
    TxtJunkUsed[4] = '%s was successfully used.';
    TxtJunkUsed[5] = '%s was successfully used.';
    TxtJunkUsed[6] = '%s было успешно использовано.';
    TxtJunkUsed[7] = '%s was successfully used.';
var TxtNoProfAbility = new Array();
    TxtNoProfAbility[0] = "Du profitierst nicht von der Bandenfähigkeit";
    TxtNoProfAbility[1] = "You don't profit from the gang ability";
    TxtNoProfAbility[2] = "Nie zyskujesz na talentach bandy";
    TxtNoProfAbility[3] = "You don't profit from the gang ability";
    TxtNoProfAbility[4] = "You don't profit from the gang ability";
    TxtNoProfAbility[5] = "You don't profit from the gang ability";
    TxtNoProfAbility[6] = "Способности банды тебе не приносят пользу";
    TxtNoProfAbility[7] = "You don't benefit from the gang ability";
var TxtAlertNoGang = new Array();
    TxtAlertNoGang[0] = "ACHTUNG!! Du bist nicht mehr in einer Bande !!";
    TxtAlertNoGang[1] = "ATTENTION !! You are no longer member of a gang !!";
    TxtAlertNoGang[2] = "ATTENTION !! You are no longer member of a gang !!";
    TxtAlertNoGang[3] = "ATTENTION !! You are no longer member of a gang !!";
    TxtAlertNoGang[4] = "ATTENTION !! You are no longer member of a gang !!";
    TxtAlertNoGang[5] = "ATTENTION !! You are no longer member of a gang !!";
    TxtAlertNoGang[6] = "ВНИМАНИЕ!! Ты больше не в банде !!";
    TxtAlertNoGang[7] = "ATTENTION !! You are no longer member of a gang !!";
var TxtLogout = new Array();
    TxtLogout[0] = "Ausloggen ?";
    TxtLogout[1] = "Logout ?";
    TxtLogout[2] = "Wyloguj ?";
    TxtLogout[3] = "Déconnexion ?";
    TxtLogout[4] = "Salir ?";
    TxtLogout[5] = "Logout ?";
    TxtLogout[6] = "Выйти ?";
    TxtLogout[7] = "Logout ?";
var TxtLogoutWarn1 = new Array();
    TxtLogoutWarn1[0] = "Achtung !! Du bist noch betrunken !!";
    TxtLogoutWarn1[1] = "Warning !! You are still drunk !!";
    TxtLogoutWarn1[2] = "Warning !! You are still drunk !!";
    TxtLogoutWarn1[3] = "Warning !! You are still drunk !!";
    TxtLogoutWarn1[4] = "Warning !! You are still drunk !!";
    TxtLogoutWarn1[5] = "Warning !! You are still drunk !!";
    TxtLogoutWarn1[6] = "Внимание!! Ты еще пьяный !!";
    TxtLogoutWarn1[7] = "Warning !! You are still drunk !!";
var TxtLogoutWarn2 = new Array();
    TxtLogoutWarn2[0] = "Achtung !! Du hast nicht Deine volle Kampfstärke !!";
    TxtLogoutWarn2[1] = "Warning !! You do not have your full possible fighting power !!";
    TxtLogoutWarn2[2] = "Warning !! You do not have your full possible fighting power !!";
    TxtLogoutWarn2[3] = "Warning !! You do not have your full possible fighting power !!";
    TxtLogoutWarn2[4] = "Warning !! You do not have your full possible fighting power !!";
    TxtLogoutWarn2[5] = "Warning !! You do not have your full possible fighting power !!";
    TxtLogoutWarn2[6] = "Внимание !! У тебя еще не полная сила !!";
    TxtLogoutWarn2[7] = "Warning !! You do not have your full possible fighting power !!";
var TxtCart = new Array();
    TxtCart[0] = "Einkaufswagen ausleeren";
    TxtCart[1] = "Empty cart";
    TxtCart[2] = "Opróżnij wózek na zakupy";
    TxtCart[3] = "Vider ton caddie";
    TxtCart[4] = "Vaciar el carro de la compra";
    TxtCart[5] = "Esvaziar carrinho de compras";
    TxtCart[6] = "Разгрузить тележку";
    TxtCart[7] = "Empty cart";
var TxtCart2 = new Array();
    TxtCart2[0] = "Flaschensammeln starten";
    TxtCart2[1] = "start collecting bottles";
    TxtCart2[2] = "start collecting bottles";
    TxtCart2[3] = "start collecting bottles";
    TxtCart2[4] = "start collecting bottles";
    TxtCart2[5] = "start collecting bottles";
    TxtCart2[6] = "начать собирать бутылки";
    TxtCart2[7] = "start collecting bottles";
var TxtCart3 = new Array();
    TxtCart3[0] = "Flaschen werden gesammelt";
    TxtCart3[1] = "collecting bottles";
    TxtCart3[2] = "collecting bottles";
    TxtCart3[3] = "collecting bottles";
    TxtCart3[4] = "collecting bottles";
    TxtCart3[5] = "collecting bottles";
    TxtCart3[6] = "бутылки собираются";
    TxtCart3[7] = "collecting bottles";
var TxtCollFinish = new Array();
    TxtCollFinish[0] = "Das Flaschensammeln wurde beendet";
    TxtCollFinish[1] = "The collecting of bottles was finished";
    TxtCollFinish[2] = "The collecting of bottles was finished";
    TxtCollFinish[3] = "The collecting of bottles was finished";
    TxtCollFinish[4] = "The collecting of bottles was finished";
    TxtCollFinish[5] = "The collecting of bottles was finished";
    TxtCollFinish[6] = "бутылки собраны";
    TxtCollFinish[7] = "The collecting of bottles was finished";
var TxtCrime = new Array();
    TxtCrime[0] = "Du planst ein Verbrechen!";
    TxtCrime[1] = "You're planning a crime!";
    TxtCrime[2] = "You're planning a crime!";
    TxtCrime[3] = "You're planning a crime!";
    TxtCrime[4] = "You're planning a crime!";
    TxtCrime[5] = "You're planning a crime!";
    TxtCrime[6] = "Ты задумал преступление!";
    TxtCrime[7] = "You're planning a crime!";
var TxtCrimePro = new Array();
    TxtCrimePro[0] = " ACHTUNG !! Betrunken wird das Verbrechen nicht gelingen!!";
    TxtCrimePro[1] = " Attention !! You are drunk and you will have no success with the crime!!";
    TxtCrimePro[2] = " Attention !! You are drunk and you will have no success with the crime!!";
    TxtCrimePro[3] = " Attention !! You are drunk and you will have no success with the crime!!";
    TxtCrimePro[4] = " Attention !! You are drunk and you will have no success with the crime!!";
    TxtCrimePro[5] = " Attention !! You are drunk and you will have no success with the crime!!";
    TxtCrimePro[6] = " ВНИМАНИЕ !! Если ты пьян, преступление не удастся!!";
    TxtCrimePro[7] = " Attention !! You are drunk and you will have no success with the crime!!";
var TxtFight = new Array();
    TxtFight[0] = "Du hast einen Kampf gestartet gegen %s!";
    TxtFight[1] = "You started a fight against %s!";
    TxtFight[2] = "You started a fight against %s!";
    TxtFight[3] = "You started a fight against %s!";
    TxtFight[4] = "You started a fight against %s!";
    TxtFight[5] = "You started a fight against %s!";
    TxtFight[6] = "Ты начал бой против %s!";
    TxtFight[7] = "You started a fight against %s!";
var TxtEmptied = new Array();
    TxtEmptied[0] = "Einkaufswagen ausgeleert. Du hast %d Flaschen gesammelt.";
    TxtEmptied[1] = "Cart emptied! You found %d bottles.";
    TxtEmptied[2] = "Cart emptied! You found %d bottles.";
    TxtEmptied[3] = "Cart emptied! You found %d bottles.";
    TxtEmptied[4] = "Cart emptied! You found %d bottles.";
    TxtEmptied[5] = "Cart emptied! You found %d bottles.";
    TxtEmptied[6] = "Корзина разгружена. Ты собрал %d бутылок.";
    TxtEmptied[7] = "Cart emptied! You found %d bottles.";
var TxtDaily = new Array();
    TxtDaily[0] = "Tägliche Aufgabe";
    TxtDaily[1] = "Daily tasks";
    TxtDaily[2] = "Zadanie dnia";
    TxtDaily[3] = "Tâche journalière";
    TxtDaily[4] = "Tarea diaria";
    TxtDaily[5] = "Tarefa diária";
    TxtDaily[6] = "Сегодняшнее задание";
    TxtDaily[7] = "Daily tasks";
var TxtCards = new Array();
    TxtCards[0] = "Deine Sammelkarten: ";
    TxtCards[1] = "Your Credits: ";
    TxtCards[2] = "Twoje znaczki: ";
    TxtCards[3] = "Tes jetons: ";
    TxtCards[4] = "Tus fichas: ";
    TxtCards[5] = "Seu álbum de comprovantes: ";
    TxtCards[6] = "Твои карточки: ";
    TxtCards[7] = "Your Credits: ";
var TxtEnd = new Array();
    TxtEnd[0] = ', Ende: ';
    TxtEnd[1] = ', End: ';
    TxtEnd[2] = ', Zakończ: ';
    TxtEnd[3] = ', Fin: ';
    TxtEnd[4] = ', End: ';
    TxtEnd[5] = ', End: ';
    TxtEnd[6] = ', Конец: ';
    TxtEnd[7] = ', End: ';
var TxtInfo = new Array();
    TxtInfo[0] = 'Info ist an --> Ausschalten';
    TxtInfo[1] = 'Info is on --> Switch off';
    TxtInfo[2] = 'Info is on --> Switch off';
    TxtInfo[3] = 'Info is on --> Switch off';
    TxtInfo[4] = 'Info is on --> Switch off';
    TxtInfo[5] = 'Info is on --> Switch off';
    TxtInfo[6] = 'Информация включена —> Выключить';
    TxtInfo[7] = 'Info is on --> Switch off';
var TxtNoInfo = new Array();
    TxtNoInfo[0] = 'Info ist aus --> Einschalten';
    TxtNoInfo[1] = 'Info is off --> Switch on';
    TxtNoInfo[2] = 'Info is off --> Switch on';
    TxtNoInfo[3] = 'Info is off --> Switch on';
    TxtNoInfo[4] = 'Info is off --> Switch on';
    TxtNoInfo[5] = 'Info is off --> Switch on';
    TxtNoInfo[6] = 'Информация выключена —> Включить';
    TxtNoInfo[7] = 'Info is off --> Switch on';
var TxtNoteOnPage = new Array();
    TxtNoteOnPage[0] = 'Zum gemerkten SB-Eintrag auf Seite %d gehen';
    TxtNoteOnPage[1] = 'Go to the pinned shoutbox entry on page %d';
    TxtNoteOnPage[2] = 'Go to the pinned shoutbox entry on page %d';
    TxtNoteOnPage[3] = 'Go to the pinned shoutbox entry on page %d';
    TxtNoteOnPage[4] = 'Go to the pinned shoutbox entry on page %d';
    TxtNoteOnPage[5] = 'Go to the pinned shoutbox entry on page %d';
    TxtNoteOnPage[6] = 'Для сохраненной шаутбокс-записи перейти на %d страницу.';
    TxtNoteOnPage[7] = 'Go to the pinned shoutbox entry on page %d';
var TxtOwnGang = new Array();
    TxtOwnGang[0] = 'Du greifst ein Mitglied Deiner eigenen Bande an !!';
    TxtOwnGang[1] = 'You attack a member of your own gang !!';
    TxtOwnGang[2] = 'You attack a member of your own gang !!';
    TxtOwnGang[3] = 'You attack a member of your own gang !!';
    TxtOwnGang[4] = 'You attack a member of your own gang !!';
    TxtOwnGang[5] = 'You attack a member of your own gang !!';
    TxtOwnGang[6] = 'Ты атакуешь игрока из твоей банды!!';
    TxtOwnGang[7] = 'You attack a member of your own gang !!';

var TxtAlliedGang = new Array();
    TxtAlliedGang[0] = 'Du greifst ein Mitglied einer befreundeten Bande an !!';
    TxtAlliedGang[1] = 'You attack a member of an allied gang !!';
    TxtAlliedGang[2] = 'You attack a member of an allied gang !!';
    TxtAlliedGang[3] = 'You attack a member of an allied gang !!';
    TxtAlliedGang[4] = 'You attack a member of an allied gang !!';
    TxtAlliedGang[5] = 'You attack a member of an allied gang !!';
    TxtAlliedGang[6] = 'Ты атакуешь игрока который дружит с твоей бандой!!';
    TxtAlliedGang[7] = 'You attack a member of an allied gang !!';

// Ingame Texte
var TxtEstimated = new Array();
    TxtEstimated[0] = "Voraussichtlich";
    TxtEstimated[1] = "estimated";
    TxtEstimated[2] = "Przewidzianych";
    TxtEstimated[3] = "sont prévus";
    TxtEstimated[4] = "Probablemente";
    TxtEstimated[5] = "Provavelmente";
    TxtEstimated[6] = "Приблизительно";
    TxtEstimated[7] = "Estimated";

var TxtTrikot = new Array();
    TxtTrikot[0] = "Trikot";
    TxtTrikot[1] = "Jersey";
    TxtTrikot[2] = "Koszulka";
    TxtTrikot[3] = "Jersey";
    TxtTrikot[4] = "Jersey";
    TxtTrikot[5] = "Camisa";
    TxtTrikot[6] = "Jersey";   // !!!!
    TxtTrikot[7] = "Jersey";   // !!!!

var TxtRunAttack = new Array();
    TxtRunAttack[0] = "uft bereits auf";
    TxtRunAttack[1] = "Already accumulated attacks";
    TxtRunAttack[2] = "Atak ju";
    TxtRunAttack[3] = "Attaque en cours";
    TxtRunAttack[4] = "El ataque ya ha";
    TxtRunAttack[5] = "O ataque j";
    TxtRunAttack[6] = "Атака уже пошла";
    TxtRunAttack[7] = "Attack is underway";

var TxtNoGangFights = new Array();
    TxtNoGangFights[0] = "Keine laufenden";
    TxtNoGangFights[1] = "No current";
    TxtNoGangFights[2] = "Nie ma toczących sie walk";
    TxtNoGangFights[3] = "Aucun combat en cours";
    TxtNoGangFights[4] = "No hay luchas de bandas en curso";
    TxtNoGangFights[5] = "nenhuma luta acontecendo";
    TxtNoGangFights[6] = "Действующих разборок нет";
    TxtNoGangFights[7] = "No current";

var TxtBoost = new Array();
    TxtBoost[0] = 'Stärkung:';
    TxtBoost[1] = 'Strenth';
    TxtBoost[2] = 'Wzmocnienie:';
    TxtBoost[3] = 'Renforcement :';
    TxtBoost[4] = 'Fortalecimiento:';
    TxtBoost[5] = 'Força:';
    TxtBoost[6] = 'Подкрепление:';
    TxtBoost[7] = 'Strength';
var TxtRage = new Array();
    TxtRage[0] = 'Wutentfachung';
    TxtRage[1] = 'Rage';
    TxtRage[2] = 'Wzbudzanie złości';
    TxtRage[3] = 'Rage';
    TxtRage[4] = 'Enfurecimiento';
    TxtRage[5] = 'Enraivecer';
    TxtRage[6] = 'Разжигание ярости';
    TxtRage[7] = 'Rage';
var TxtEcoWonder = new Array();
    TxtEcoWonder[0] = 'Wirtschaftswunder';
    TxtEcoWonder[1] = 'Economic wonder';
    TxtEcoWonder[2] = 'Cud gospodarczy';
    TxtEcoWonder[3] = 'Miracle économique';
    TxtEcoWonder[4] = 'Milagro económico';
    TxtEcoWonder[5] = 'Milagre económico';
    TxtEcoWonder[6] = 'Экономическое чудо';
    TxtEcoWonder[7] = 'Economic miracle';
var TxtLevel = new Array();
    TxtLevel[0] = 'Stufe: ';
    TxtLevel[1] = 'Level ';
    TxtLevel[2] = 'stopień: ';
    TxtLevel[3] = 'Niveau : ';
    TxtLevel[4] = 'Nivel: ';
    TxtLevel[5] = 'Grau: ';
    TxtLevel[6] = 'Уровень: ';
    TxtLevel[7] = 'Level: ';
var TxtBuyPet = new Array();
    TxtBuyPet[0] = 'Neues Haustier kaufen';
    TxtBuyPet[1] = 'Buy New Pet';
    TxtBuyPet[2] = 'Kup nowego zwierzaka';
    TxtBuyPet[3] = 'Acheter un nouvel animal';
    TxtBuyPet[4] = 'Comprar una mascota nueva';
    TxtBuyPet[5] = 'Comprar novo animal de estimação';
    TxtBuyPet[6] = 'Купить нового питомца';
    TxtBuyPet[7] = 'Buy new pet';
var TxtBuyWeapon = new Array();
    TxtBuyWeapon[0] = 'Zum Waffenladen';
    TxtBuyWeapon[1] = 'To Weapon store';
    TxtBuyWeapon[2] = 'do sklepu z bronią';
    TxtBuyWeapon[3] = "Au magasin d'armes";
    TxtBuyWeapon[4] = 'Ir a la tienda de armas';
    TxtBuyWeapon[5] = 'Para o depósito de armas';
    TxtBuyWeapon[6] = 'К оружейному магазину';
    TxtBuyWeapon[7] = 'Go to weapon shop';
var TxtBought = new Array();
    TxtBought[0] = 'Gekauft';
    TxtBought[1] = 'Bought';
    TxtBought[2] = 'Kupiony';
    TxtBought[3] = 'Utiliser';
    TxtBought[4] = 'Comprado';
    TxtBought[5] = 'Comprado';
    TxtBought[6] = 'Куплено';
    TxtBought[7] = 'Bought';
var TxtDefBought = new Array();
    TxtDefBought[0] = 'Abbrechen';
    TxtDefBought[1] = 'Cancelled';
    TxtDefBought[2] = 'Anuluj';
    TxtDefBought[3] = 'Annuler';
    TxtDefBought[4] = 'Interrumpir';
    TxtDefBought[5] = 'Cancelar';
    TxtDefBought[6] = 'Отменить';
    TxtDefBought[7] = 'Cancel';
var TxtSelected = new Array();
    TxtSelected[0] = 'Ausgewählt';
    TxtSelected[1] = 'Selected';
    TxtSelected[2] = 'Wybrany';
    TxtSelected[3] = 'Sélectionné';
    TxtSelected[4] = 'Escogido';
    TxtSelected[5] = 'Selecionado';
    TxtSelected[6] = 'Выбрано';
    TxtSelected[7] = 'Selected';
var TxtPiece = new Array();
    TxtPiece[0] = ' Stück</td>';
    TxtPiece[1] = ' Piece</td>';
    TxtPiece[2] = ' Sztuk</td>';
    TxtPiece[3] = ' Unités</td>';
    TxtPiece[4] = ' pieza</td>';
    TxtPiece[5] = ' Unidade(s)</td>';
    TxtPiece[6] = ' Штука</td>';
    TxtPiece[7] = ' Piece</td>';
var TxtArmoury = new Array();
    TxtArmoury[0] = 'Waffenkammer';
    TxtArmoury[1] = '<td>Armoury';
    TxtArmoury[2] = 'Magazyn broni';
    TxtArmoury[3] = "Salle d'armes";
    TxtArmoury[4] = 'Armería';
    TxtArmoury[5] = '<td>Depósito de armas';
    TxtArmoury[6] = '<td>Арсенал';
    TxtArmoury[7] = '<td>Armoury';
var TxtHouse = new Array();
    TxtHouse[0] = 'Bandenhaus';
    TxtHouse[1] = 'Safe House';
    TxtHouse[2] = 'Siedziba bandy';
    TxtHouse[3] = 'Quartier général de la bande';
    TxtHouse[4] = 'Casa de la banda';
    TxtHouse[5] = 'Sede da gangue';
    TxtHouse[6] = 'Дом банды';
    TxtHouse[7] = 'Gang lair';
var TxtOccupied = new Array();
    TxtOccupied[0] = 'Bewohnt';
    TxtOccupied[1] = 'Occupied';
    TxtOccupied[2] = 'Zamieszkany';
    TxtOccupied[3] = 'Habité';
    TxtOccupied[4] = 'Habitado';
    TxtOccupied[5] = 'Habitado';
    TxtOccupied[6] = 'Ты живешь здесь';
    TxtOccupied[7] = 'Occupied';
var TxtMoveIn = new Array();
    TxtMoveIn[0] = 'Einziehen';
    TxtMoveIn[1] = 'Go to';
    TxtMoveIn[2] = 'Idż';
    TxtMoveIn[3] = 'Emménager';
    TxtMoveIn[4] = 'Mudarme';
    TxtMoveIn[5] = 'Mudar';
    TxtMoveIn[6] = 'вселиться';
    TxtMoveIn[7] = 'Move in';
var TxtBeer1 = new Array();
    TxtBeer1[0] = 'Flaschen Bier';
    TxtBeer1[1] = 'Bottle Beer';
    TxtBeer1[2] = 'Puszka Piwa';
    TxtBeer1[3] = 'Tickets Brique de vin';
    TxtBeer1[4] = 'chatarra Calimocho';
    TxtBeer1[5] = 'Garrafas Cerveja';
    TxtBeer1[6] = 'Бутылки Пиво';
    TxtBeer1[7] = 'Jumble Lager';
var TxtBeer2 = new Array();
    TxtBeer2[0] = 'Flaschen Limo';
    TxtBeer2[1] = 'Bottle Beer';
    TxtBeer2[2] = 'Puszek Piwa';
    TxtBeer2[3] = 'Tickets Brique de vin';
    TxtBeer2[4] = 'chatarra Calimocho';
    TxtBeer2[5] = 'Garrafas Cerveja';
    TxtBeer2[6] = 'Бутылки Пиво';
    TxtBeer2[7] = 'Jumble Lager';
var TxtAbility1 = new Array();
    TxtAbility1[0] = 'Eine F&auml;higkeit wurde bereits aktiviert';
    TxtAbility1[1] = 'An ability has already been activated';
    TxtAbility1[2] = ' zdolności jest już rozpoczęte';
    TxtAbility1[3] = 'An ability has already been activated';	// <--- dieser Text muss noch korrigiert werden
    TxtAbility1[4] = 'Te hemos activado una habilidad';
    TxtAbility1[5] = 'An ability has already been activated';   // !!!!
    TxtAbility1[6] = 'Одна способность уже активирована';
    TxtAbility1[7] = 'One ability is already active';
var TxtAbility2 = new Array();
    TxtAbility2[0] = ' und l&auml;uft noch bis ';
    TxtAbility2[1] = ' and runs to  ';
    TxtAbility2[2] = ' jeszcze do ';
    TxtAbility2[3] = ' and runs to  ';	// <--- dieser Text muss noch korrigiert werden
    TxtAbility2[4] = ' y esta dura hasta ';
    TxtAbility2[5] = ' and runs to  ';   // !!!!
    TxtAbility2[6] = ' и действует до ';
    TxtAbility2[7] = ' until  ';
var TxtNoGangAbility = new Array();
    TxtNoGangAbility[0] = "Du profitierst nicht";
    TxtNoGangAbility[1] = "You don't profit";
    TxtNoGangAbility[2] = "Nie zyskujesz na talentach";
    TxtNoGangAbility[3] = "Vous n'en profitez pas";
    TxtNoGangAbility[4] = "You don't profit";	// <--- dieser Text muss noch korrigiert werden
    TxtNoGangAbility[5] = "You don't profit";   // !!!!
    TxtNoGangAbility[6] = "способности банды тебе не приносят пользу";
    TxtNoGangAbility[7] = "You don't benefit";
var TxtIncrease = new Array();
    TxtIncrease[0] = 'Erhöht';
    TxtIncrease[1] = 'Increases';
    TxtIncrease[2] = 'Wzrost';
    TxtIncrease[3] = 'Increases';
    TxtIncrease[4] = 'Aumenta';
    TxtIncrease[5] = 'Increases';   // !!!!
    TxtIncrease[6] = 'шает';
    TxtIncrease[7] = 'Increases';   // !!!!
var TxtIncrATT = new Array();
    TxtIncrATT[0] = 'Angriff';
    TxtIncrATT[1] = 'attack';
    TxtIncrATT[2] = 'atak';
    TxtIncrATT[3] = 'ataque';
    TxtIncrATT[4] = 'ataque';
    TxtIncrATT[5] = 'attack';   // !!!!
    TxtIncrATT[6] = 'Атаку';
    TxtIncrATT[7] = 'attack';   // !!!!
var TxtIncrDEF = new Array();
    TxtIncrDEF[0] = 'Verteidigung';
    TxtIncrDEF[1] = 'defense';
    TxtIncrDEF[2] = 'obrona';
    TxtIncrDEF[3] = 'défense';
    TxtIncrDEF[4] = 'defensa';
    TxtIncrDEF[5] = 'defense';   // !!!!
    TxtIncrDEF[6] = 'Дефенз';
    TxtIncrDEF[7] = 'defense';   // !!!!
var TxtSicher = new Array();
    TxtSicher[0] = 'Sicher';
    TxtSicher[1] = 'Avoid';				
    TxtSicher[2] = 'Uniknąć';
    TxtSicher[3] = 'certaine';				
    TxtSicher[4] = ', seguro';
    TxtSicher[5] = 'Avoid';	  // !!!!
    TxtSicher[6] = 'Надежно';
    TxtSicher[7] = 'Avoid';	  // !!!!
var TxtAusweich = new Array();
    TxtAusweich[0] = 'Ausweichen';
    TxtAusweich[1] = 'Defense';
    TxtAusweich[2] = 'Unikaj';
    TxtAusweich[3] = 'Esquiver';
    TxtAusweich[4] = 'Evitar';
    TxtAusweich[5] = 'Defense';   // !!!!
    TxtAusweich[6] = 'уклониться';
    TxtAusweich[7] = 'Defense';   // !!!!
var TxtSkillATT = new Array();
    TxtSkillATT[0] = 'Angriff';
    TxtSkillATT[1] = 'Attack';
    TxtSkillATT[2] = 'Atak';
    TxtSkillATT[3] = 'Attaque';
    TxtSkillATT[4] = 'Ataque';
    TxtSkillATT[5] = 'Ataque';
    TxtSkillATT[6] = 'Нападение';
    TxtSkillATT[7] = 'Attack';
var TxtSkillDEF = new Array();
    TxtSkillDEF[0] = 'Verteidigung';
    TxtSkillDEF[1] = 'Defense';
    TxtSkillDEF[2] = 'Obrona';
    TxtSkillDEF[3] = 'Défense';
    TxtSkillDEF[4] = 'Defensa';
    TxtSkillDEF[5] = 'Defesa';
    TxtSkillDEF[6] = 'Оборона';
    TxtSkillDEF[7] = 'Defense';
var TxtSkillDEX = new Array();
    TxtSkillDEX[0] = 'Geschicklichkeit';
    TxtSkillDEX[1] = 'Dexterity';
    TxtSkillDEX[2] = 'Zręczność';
    TxtSkillDEX[3] = 'Habileté';
    TxtSkillDEX[4] = 'Destreza';
    TxtSkillDEX[5] = 'Agilidade';
    TxtSkillDEX[6] = 'Мастерство';
    TxtSkillDEX[7] = 'Dexterity';
var TxtLang = new Array();
    TxtLang[0] = "Sprache: deutsch";
    TxtLang[1] = "Language: american";
    TxtLang[2] = "Language: polish";
    TxtLang[3] = "Langue: français";
    TxtLang[4] = "Lengua: español";
    TxtLang[5] = "Lingua: português";
    TxtLang[6] = "язык: русский";
    TxtLang[7] = "Language: english";


var KEYWORD_INGANG = new Array();
    KEYWORD_INGANG[0] = 'Du bist in keiner Pennerbande';
    KEYWORD_INGANG[1] = 'You are not in a Gang';
    KEYWORD_INGANG[2] = 'Nie ma Cię w żadnej bandzie';
    KEYWORD_INGANG[3] = "Tu n'es dans aucune bande";
    KEYWORD_INGANG[4] = 'No perteneces a ninguna banda de mendigos';
    KEYWORD_INGANG[5] = 'Você não está em nenhuma gangue';
    KEYWORD_INGANG[6] = 'Ты не являешься участником никакой банды.';
    KEYWORD_INGANG[7] = "You're not in a gang";
var KEYWORD_MYBUM = new Array();
    KEYWORD_MYBUM[0] = '<strong>Mein Penner</strong>';
    KEYWORD_MYBUM[1] = '<strong>My bum</strong>';
    KEYWORD_MYBUM[2] = '<strong>Mój menel</strong>';
    KEYWORD_MYBUM[3] = '<strong>Mon clodo</strong>';
    KEYWORD_MYBUM[4] = '<strong>Mi mendigo</strong>';
    KEYWORD_MYBUM[5] = '<strong>Meu favelado</strong>';
    KEYWORD_MYBUM[6] = '<strong>Мой бомж</strong>';
    KEYWORD_MYBUM[7] = '<strong>My Bum</strong>';
var KEYWORD_JUNK = new Array();
    KEYWORD_JUNK[0] = '<h2>Aufgehobener Plunder</h2>';
    KEYWORD_JUNK[1] = '<h2>Collected Junk</h2>';
    KEYWORD_JUNK[2] = '<h2>Zatrzymane rupiecie</h2>';
    KEYWORD_JUNK[3] = '<h2>Babioles récoltées</h2>';
    KEYWORD_JUNK[4] = '<h2>Cachivache guardado</h2>';
    KEYWORD_JUNK[5] = '<h2>Treco de luxo</h2>';
    KEYWORD_JUNK[6] = '<h2>Подобранное барахло</h2>';
    KEYWORD_JUNK[7] = '<h2>Collected stuff</h2>';
var KEYWORD_GANGUPGR = new Array();
    KEYWORD_GANGUPGR[0] = 'class="tiername">Bandenbesitz';
    KEYWORD_GANGUPGR[1] = 'class="tiername">Gang possessions';
    KEYWORD_GANGUPGR[2] = 'class="tiername">Własność bandy';
    KEYWORD_GANGUPGR[3] = 'class="tiername">Biens de la bande';
    KEYWORD_GANGUPGR[4] = 'class="tiername">Propiedad de banda';
    KEYWORD_GANGUPGR[5] = 'class="tiername">Propriedade da gangue';
    KEYWORD_GANGUPGR[6] = 'class="tiername">Имущество банды';
    KEYWORD_GANGUPGR[7] = 'class="tiername">Gang property';

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
var exalcoplunder = new Array();
var alcoActionNr = new Array();
var alcoPlunderInfo = new Array();

var FoodNames = new Array();

var restPlunder = "";
var restPlunderimg;
var restActionNr = "";
var restIndex = -1;
var currency = "€";		// Euro-Zeichen
var currency1 = "";
var TZ = new Array();		// Tausender-Trennzeichen
    TZ[0] = '.';
    TZ[1] = ',';
    TZ[2] = '.';
    TZ[3] = '.';
    TZ[4] = '.';
    TZ[5] = '.';
    TZ[6] = ',';
    TZ[7] = ',';
var DZ = new Array();		// Dezimal-Trennzeichen
    DZ[0] = ',';
    DZ[1] = '.';
    DZ[2] = ',';
    DZ[3] = ',';
    DZ[4] = ',';
    DZ[5] = ',';
    DZ[6] = '.';
    DZ[7] = '.';
var DS = new Array();		// Datums-Trennzeichen
    DS[0] = '.';
    DS[1] = '/';
    DS[2] = '.';
    DS[3] = '.';
    DS[4] = '.';
    DS[5] = '.';
    DS[6] = '.';
    DS[7] = '.';
var lang = 0;
var Wutfaehig = false;
var WutDatum = "";
var PSWaitTime = 72000;		// Plundershop Warftezeit (20 Stunden)
var PSwidth = 0;		// Breite der Plundershop-Leiste

// Koordinaten
var PD_X;   // X-Koordinate Plunderdirektleiste
var PD_Y;   // Y-Koordinate Plunderdirektleiste
var PW_X;   // X-Koordinate Promilleleiste
var PW_Y;   // Y-Koordinate Promilleleiste
var AD_X;   // X-Koordinate ATT/DEF-Leiste
var AD_Y;   // Y-Koordinate ATT/DEF-Leiste
var GF_X;   // X-Koordinate Bandenkampf-Icon
var GF_Y;   // Y-Koordinate Bandenkampf-Icon
var FB_X;   // X-Koordinate Fight-Icon
var FB_Y;   // Y-Koordinate Fight-Icon
var PB_X;   // X-Koordinate Plunder/Wut/Power-Leiste
var PB_Y;   // Y-Koordinate Plunder/Wut/Power-Leiste
var PA_X;   // X-Koordinate Provokation/tägliche Aufgabe
var PA_Y;   // Y-Koordinate Provokation/tägliche Aufgabe
var SC_X;   // X-Koordinate Bildung/Karten/Einkaufswagen
var SC_Y;   // Y-Koordinate Bildung/Karten/Einkaufswage
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************

var m_ownuserid = getOwnUserID();
var m_owngangid = 0;
var attwarn = 0;

// Aktuellen Geldstand ermitteln
GetMoney(document);

// ***********************************************************************************************
// Auf eine neue Version des Skriptes prüfen
// ***********************************************************************************************
CheckForUpdate(120);

if (!bl()) {
	
	ByeByeGoogle();
	
	var ATTSkill;
	var DEFSkill;
	var DEXSkill;
	var petATT;
	var petDEF;
	var weaponATT;
	var homeDEF;
	var ATTperc = 1.0;
	var DEFperc = 1.0;

	var weaponcheck1;
	var weaponcheck2;
	var homecheck;
	var plundercheck;

	var dailyTasks = initDaily(lang);
	var myDailyTasks = initDaily(myLang);
	initPanels();
	var saveAllPlunder = '';
	var collAllPlunder = -1;

	if (document.location.pathname == '/daily/')
		GM_setValue("lockDA" + m_ownuserid + TOWNEXTENSION, "0");
	var inGangStatus = GM_getValue("inGang" + m_ownuserid + TOWNEXTENSION, "0");

	// Ermitteln, ob WiWu oder Wut gekauft wurde
	Wutfaehig = false;

	// **********************************************************************************
	// *** GM_XMLHTTPREQUEST *** Bandeneigentum abfragen
	// **********************************************************************************
	GM_xmlhttpRequest({method:"GET", url: GANGUPGRADE_URL, onload:function(responseDetails) {
		var content = responseDetails.responseText;

		// Wenn die Bandeneigentumseite abgerufen werden konnte (kein Seitenladefehler)
		if (content.indexOf(KEYWORD_GANGUPGR[lang]) != -1) {
			var wuttest = content.toLowerCase().split(TxtRage[lang].toLowerCase())[1];
			wuttest = wuttest.toLowerCase().split(TxtLevel[lang].toLowerCase())[1];
			Wutfaehig = (wuttest.substr(0,1) == "1");
			m_owngangid = content.split('/profil/bande:')[1].split('/')[0];
		}

		// Hintergrundgrafiken anzeigen
		ShowBackgrounds();

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
					var gekauft = (trs[2].innerHTML.indexOf(TxtBought[lang]) != -1);
					if (gekauft && attwert > maxatt)
						maxatt = attwert;
					else if (attwert > maxatt) {
						betterweapon = weapon;
						betteratt = attwert;
					}
				}
				if (betteratt > maxatt)
					weaponcheck1 = printf(TxtWCheck1[myLang], betterweapon, betteratt - maxatt, "", "");
				else
					weaponcheck1 = '';
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
					if (trs[1].innerHTML.indexOf('<span class="att">') == -1)
						continue;
					var weapon = trs[0].innerHTML.split('<span class="tiername">')[1].split('</span')[0];
					var attwert = Number(trs[1].innerHTML.split('<span class="att">')[1].split('</span')[0]);
					var benutzt = (trs[3].innerHTML.indexOf(TxtSelected[lang]) != -1);
					if (benutzt)
						maxatt = attwert;
					else if (attwert > maxatt) {
						betterweapon = weapon;
						betteratt = attwert;
					}
				}
				if (betteratt > maxatt)
					weaponcheck2 = printf(TxtWCheck2[myLang], betterweapon, betteratt - maxatt, "", "");
				else
					weaponcheck2 = '';
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
					var bewohnt = (trs[3].innerHTML.indexOf(TxtOccupied[lang]) != -1);
					var gekauft = (trs[3].innerHTML.indexOf(TxtMoveIn[lang]) != -1);
					if (bewohnt)
						maxdef = defwert;
					else if (defwert > maxdef) {
						betterhome = home;
						betterdef = defwert;
						betterowned = gekauft;
					}
				}
				if (betterdef > maxdef)
					homecheck = printf(TxtHomeCheck[myLang],
							   betterowned?TxtHomeMovein1[myLang]:TxtHomeBuy1[myLang],
							   betterhome,
							   betterowned?TxtHomeMovein2[myLang]:TxtHomeBuy2[myLang],
							   betterdef - maxdef);
				else
					homecheck = '';
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
		
		// falls vorhanden, Benachrichtigung über neue Nachrichten verschieben
		if (document.getElementById("my-profile").getElementsByTagName("div")[2].innerHTML.indexOf("new_msg_infoscreen") != -1)
			document.getElementById("my-profile").getElementsByTagName("div")[2].setAttribute('style', 'left: '+(oldVersion?12:40)+'px; bottom: 45px');

		// ***********************************************************************************************
		// Promille- und Waschleiste
		// ***********************************************************************************************
		// Wasch-Icon einfügen
		ShowImg('PWBACK', '', ICON_WASH, TxtWash[myLang], '', '', PW_X + 78, PW_Y + 20, '54', 'infozentrale_wash');
		WashHandler(document.getElementById('infozentrale_wash'));
		
		ShowImg('PWBACK', '', ICON_PROMILLEUP, TxtPromUp[myLang], '', '', PW_X + 9, PW_Y + 20, '54', 'infozentrale_promilleup');
		PromilleUpHandler(document.getElementById('infozentrale_promilleup'));
		ShowImg('PWBACK', '', ICON_PROMILLEDOWN, TxtPromDown[myLang], '', '', PW_X + 38, PW_Y + 20, '54', 'infozentrale_promilledown');
		PromilleDownHandler(document.getElementById('infozentrale_promilledown'));

		if (EatDrinkFeedBack == 0)
			ShowImg('PWBACK', '', ICON_NOINFO, TxtNoInfo[myLang], '10', '10', PW_X + 102, PW_Y + 13, '56', 'PWInfo');
		else
			ShowImg('PWBACK', '', ICON_INFO, TxtInfo[myLang], '10', '10', PW_X + 102, PW_Y + 13, '56', 'PWInfo');
		var curelem = document.getElementById('PWInfo');
		curelem.style.cursor = 'pointer';

		// **********************************************************************************
		// EVENTHANDLER
		// **********************************************************************************
		curelem.addEventListener('click', function(event) {
			EatDrinkFeedBack = 1 - EatDrinkFeedBack;
			GM_setValue(TOWNEXTENSION + "EatDrinkFB", EatDrinkFeedBack);
			if (EatDrinkFeedBack == 0) {
				this.src = ICON_NOINFO;
				this.title = TxtNoInfo[myLang];
			} else {
				this.src = ICON_INFO;
				this.title = TxtInfo[myLang];
			}
		}, false);

		if (CollEndAlert == 0)
			ShowImg('SCBACK', '', ICON_NOINFO, TxtNoInfo[myLang], '10', '10', SC_X + 112, SC_Y + 13, '57', 'SCInfo');
		else
			ShowImg('SCBACK', '', ICON_INFO, TxtInfo[myLang], '10', '10', SC_X + 112, SC_Y + 13, '57', 'SCInfo');
		curelem = document.getElementById('SCInfo');
		curelem.style.cursor = 'pointer';

		// **********************************************************************************
		// EVENTHANDLER
		// **********************************************************************************
		curelem.addEventListener('click', function(event) {
			CollEndAlert = 1 - CollEndAlert;
			GM_setValue(TOWNEXTENSION + "CollEndAlert", CollEndAlert);
			if (CollEndAlert == 0) {
				this.src = ICON_NOINFO;
				this.title = TxtNoInfo[myLang];
			} else {
				this.src = ICON_INFO;
				this.title = TxtInfo[myLang];
			}
		}, false);

		// **********************************************************************************
		// *** GM_XMLHTTPREQUEST *** Abfragen, ob eine DEF-Waffe gekauft wurde
		// **********************************************************************************
		GM_xmlhttpRequest({method:"GET", url: WEAPONSTOREDEF_URL, onload:function(responseDetails) {
				function mod (a, b) { return a - Math.floor(a/b)*b; }
				var content = responseDetails.responseText;

				// Aus HTML ein DOM-Objekt erzeugen
				var doc = HTML2DOM(content);

				var tables = doc.getElementsByTagName("table");
				var gekauft = false;
				for (var i = 0; i < tables.length; i++) {
					var table = tables[i];
				
					// Referenz auf Tabellenzeilen in trs speichern
					var trs = table.getElementsByTagName("tr");
					if (trs.length < 4)
						continue;
					gekauft = (trs[3].innerHTML.indexOf(TxtDefBought[lang]) != -1);
					if (gekauft) {
						var img = trs[0].getElementsByTagName("img")[0].getAttribute("src");
						var dauer = trs[1].innerHTML.split('<span class="')[1].split('</span')[1].split('|')[1].split('</td>')[0];
						if (dauer.indexOf('counter') != -1) {
							var sekunden = Number(dauer.split('counter(')[1].split(')')[0]);
							var minuten = mod(Math.floor(sekunden/60), 60) + 100 + ":";
							var stunden = Math.floor(sekunden/3600) + ":";
							sekunden = mod(sekunden, 60) + 100 + "";
							var zeit = stunden + minuten.slice(1) + sekunden.slice(1);
							dauer = dauer.split('<b>')[0] + zeit + dauer.split('</b>')[1];
						}
						// Link zusammenbauen
						var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
						newlink.setAttribute('href', WEAPONSTOREDEF_URL);
						var titletext = trs[0].innerHTML.split('<span class="tiername">')[1].split('</span')[0] + ":" + dauer;
						// V-Waffe Grafik zusammenbauen
						var newimg = newlink.appendChild(document.createElement('img'));
						newimg.setAttribute('src', img);
						newimg.setAttribute('border', '0');
						newimg.setAttribute('title', titletext);
						newimg.setAttribute('style', 'position:absolute; left:' + (AD_X+85) + 'px; top:' + (AD_Y+14) + 'px; z-index:52; cursor: pointer');
						newimg.setAttribute('width', 37);
						newimg.setAttribute('height', 37);
						newimg.setAttribute('id', 'defweapon');
						cacheBgnds('ADBACK', 'defweapon');
						break;
					}
				}
				if (!gekauft)
					ShowImg('ADBACK', '/city/weapon_store/def/', ICON_NODEFWEAPON, '', '', '', AD_X+84, AD_Y+13, '52', 'defweapon');
			}
		}); 
		// **********************************************************************************
		// Bandenprofillinks beim Bandenkampf in Links umwandeln
		// **********************************************************************************
		// Wenn die aktuelle Seite die Bandenkampf-Übersichtsseite ist
		if (IsFightOverviewPage()) {
			// Ermitteln der Tabelle Bandenkampfübersicht
			var gangtable = document.getElementById("content").getElementsByTagName("table")[1];
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
					ShowAllPlunder(responseDetails.responseText, NrOfPlunder, 0, 0);
				// sonst: Es wurde noch kein Plunderstück ausgewählt
				} else {
					ShowImg('PDBACK', PLUNDER_URL, ICON_PLUNDERFREE, TOOLTIP_PLUNDERAUSWAHL[myLang], '', '', PD_X+2, PD_Y+20, '55', 'AddPlunderIcon');
				}
			}
		});
		
		// **********************************************************************************
		// Shoutbox auf Bandenseite auswerten	
		// **********************************************************************************
		// Wenn die aktuelle Seite die Bandenseite ist
		var gangPage = Number(IsGangPage());
		if (gangPage > 0) {
			var fnShoutBox = function () {
				function processSBPages(page, pinnedSB, lastSB) {
					GM_xmlhttpRequest({method: 'GET', url: GANG_URL + (oldVersion?page+"/":"shoutbox_ajax/?page=" + page),onload: function(responseDetails) {
						// Wenn die Bandenseite abgerufen werden konnte
						if (responseDetails.status != 200 ||
							responseDetails.responseText.indexOf('500 - Internal Server Error') != -1) {
							ProcessSBPages(page, pinnedSB, lastSB);
							return;
						}

						var content = responseDetails.responseText;
						var pos = content.indexOf('<span style="color:#8888');
						pos = content.indexOf(" href='/profil", pos-150);
						var first = true;
						while (pos != -1) {
							var name = content.substr(pos).split(">")[1].split('<')[0];
							var id = content.substr(pos).split(" href='/profil/id:")[1].split('/')[0];
							pos = content.indexOf('<span', pos);
							var post = content.substr(pos).split(">")[1].split('<')[0];
							var ppos = post.indexOf(":");
							var datetime = post.substr(ppos-6,2) + post.substr(ppos-9,2) + post.substr(ppos-2,2) + post.substr(ppos+1,2);
							var sb = id + "_" + datetime;
							var pinThis = (sb == pinnedSB);
							if (!pinThis && datetime < pinnedSB.split("_")[1] && lastSB.split("_")[1] >= pinnedSB.split("_")[1]) {
								if (first) page--;
								if (document.getElementsByName(lastSB).length > 0)
									document.getElementsByName(lastSB)[0].src = ICON_PIN2;
								pinThis = true;
							}
							if (pinThis) {
								document.getElementById("gotoSB").addEventListener("click", function(event)  {
									if (oldVersion)
										window.location.href = "/gang/" + page + "/";
									GM_setValue("pinnedSBGo" + m_ownuserid + TOWNEXTENSION, "1");
								}, false);
								if (document.getElementById("gotoSB3") != null)
									document.getElementById("gotoSB3").href = "javascript:shoutbox_ajax.loadajaxpage('/gang/shoutbox_ajax/?page="+page+"')";
								document.getElementById("gotoSB").width = "10";
								document.getElementById("gotoSB").title = printf(TxtNoteOnPage[myLang], page);
								return;
							}
							lastSB = sb;
							if (oldVersion)
								pos = content.indexOf('</table', pos);
							else {
								pos = content.indexOf('</div', pos);
								pos = content.indexOf('</div', pos+5);
							}
							pos = content.indexOf(" href='/profil", pos);
							first = false;
						}
						processSBPages(page+1, pinnedSB, lastSB);
					}
					});
				}
				function makePins(table) {
					var trs = table.getElementsByTagName("tr");
					for (var i = 0; i < trs.length; i++) {
						if (oldVersion)
							var obj = trs[i];
						else
							var obj = document.getElementById("tabcontainer");
						if (obj.innerHTML.indexOf('<span style="color: rgb(136') != -1 || obj.innerHTML.indexOf('<span style="color:#88') != -1) {
							var text = obj.innerHTML;
							var pos = text.indexOf(' href="/profil');
							var sbnr = 0;
							var pinnedSB = GM_getValue("pinnedSB" + m_ownuserid + TOWNEXTENSION, "");
							var pinnedOnPage = false;
							var lastSB = "";
							var oldPos = -1;
							var searchEnd = '</table';
							if (document.getElementById("tabcontainer") != null)
							   searchEnd = '</div';
							var first = true;
							while (pos != -1) {
								var name = text.substr(pos).split(">")[1].split('<')[0];
								var id = text.substr(pos).split(' href="/profil/id:')[1].split('/')[0];
								pos = text.indexOf('<span style', pos);
								var post = text.substr(pos).split(">")[1].split('<')[0];
								sbnr++;
								var ppos = post.indexOf(":");
								var datetime = post.substr(ppos-6,2) + post.substr(ppos-9,2) + post.substr(ppos-2,2) + post.substr(ppos+1,2);
								var sb = id + "_" + datetime;
								var pinThis = (sb == pinnedSB);
								if (pinThis)
									pinnedOnPage = true;
								else if (!pinnedOnPage && datetime < pinnedSB.split("_")[1] && lastSB.split("_")[1] >= pinnedSB.split("_")[1]) {
									pinnedOnPage = true;
									text = text.substr(0,oldPos) + text.substr(oldPos).replace(ICON_PIN, ICON_PIN2);
								}
								lastSB = sb;
								oldPos = text.indexOf("<", pos+1);
								text = text.substr(0,oldPos) + '<input type="hidden" id="' + sb + '" value=""><img id="pin' + sbnr + '" width="10" height="10" src="' + (pinThis&&first?ICON_PIN2:ICON_PIN) + '" style="cursor:pointer" name="' + sb +'"></img>&nbsp;&nbsp;' + text.substr(oldPos);
								if (pinThis)
									first = false;
								pos = text.indexOf(searchEnd, pos);
								if (!oldVersion)
									pos = text.indexOf(searchEnd, pos+5);
								pos = text.indexOf(' href="/profil', pos);
							}
							obj.innerHTML = text;
							if (pinnedOnPage) {
								if (GM_getValue("pinnedSBGo" + m_ownuserid + TOWNEXTENSION, "0") == "1") {
									GM_setValue("pinnedSBGo" + m_ownuserid + TOWNEXTENSION, "0");
									document.getElementById(pinnedSB).type="button";
									document.getElementById(pinnedSB).focus();
									document.getElementById(pinnedSB).type="hidden";
									window.scrollBy(0,200);
								}
							} else if (pinnedSB != "") {
								var gangPage = Number(IsGangPage());
								if (gangPage == 1)
									var page = 2;
								else if (lastSB.split("_")[1] < pinnedSB.split("_")[1]) {
									lastSB = "";
									var page = 1;
								}
								else
									var page = gangPage + 1;
								if (oldVersion) {
									var pagetr = trs[i];
									pos = pagetr.innerHTML.indexOf('<a href="/gang/1/');
									var insText = "";
									var insText2 = "&nbsp;";
								} else {
									var pagetr = trs[trs.length-2];
									pos = pagetr.innerHTML.indexOf('<a href="javascript:shoutbox_ajax');
									var insText = '<a id="gotoSB3" rel="shoutboxtab" href="javascript:shoutbox_ajax.loadajaxpage(\'/gang/shoutbox_ajax/?page='+page+'\')"><div id="gotoSB2" class="pagebutton">';
									var insText2 = "</div>";
								}
								if (pos > 0)
									pagetr.innerHTML = pagetr.innerHTML.substr(0, pos) + insText + 
									'<img id="gotoSB" width="0" height="15" style="cursor:pointer" src="' + ICON_PIN2 + '"></img>' +
									insText2 + pagetr.innerHTML.substr(pos);
								processSBPages(page, pinnedSB, lastSB);
							}
							for (var j=1; true; j++) {
								var img = document.getElementById("pin" + j);
								if (img == null)
									break;
								img.addEventListener("click", function(event)  {
									if (this.src == ICON_PIN) {
										var pinnedSB = GM_getValue("pinnedSB" + m_ownuserid + TOWNEXTENSION, "");
										GM_setValue("pinnedSB" + m_ownuserid + TOWNEXTENSION, this.name);
										if (pinnedSB != "") {
											if (document.getElementsByName(pinnedSB).length > 0)
												document.getElementsByName(pinnedSB)[0].src = ICON_PIN;
											var gotoSB = document.getElementById("gotoSB");
											if (gotoSB != null)
												gotoSB.parentNode.removeChild(gotoSB);
											if (!oldVersion) {
												var gotoSB2 = document.getElementById("gotoSB2");
												if (gotoSB2 != null)
													gotoSB2.parentNode.removeChild(gotoSB2);
												var gotoSB3 = document.getElementById("gotoSB3");
												if (gotoSB3 != null)
													gotoSB3.parentNode.removeChild(gotoSB3);
											}
										}
										this.src = ICON_PIN2;
									} else {
										this.src = ICON_PIN;
										GM_setValue("pinnedSB" + m_ownuserid + TOWNEXTENSION, "");
									}
								}, false);
							}
							break;
						}
					}
				}
				var table = document.getElementById("content").getElementsByTagName("table")[0];
				var selectd = true;
				if (!oldVersion) {
					var tdtest = document.getElementById("shoutboxtab");
					if (tdtest.getElementsByTagName("li").length > 1)
						selectd = tdtest.getElementsByTagName("a")[0].className == "selected";
				}
				if (selectd)
					makePins(table);
				if (!oldVersion) {
					var makePinsTO = function() {
						if (Number(IsGangPage()) < 1)
							return;
						var table = document.getElementById("content").getElementsByTagName("table")[0];
						var tdtest = document.getElementById("shoutboxtab");
						var selectd = true;
						if (tdtest.getElementsByTagName("li").length > 1)
							selectd = tdtest.getElementsByTagName("a")[0].className == "selected";
						if (selectd)
							if ((table.innerHTML.indexOf('<span style="color:#88') != -1 || table.innerHTML.indexOf('<span style="color: rgb(136') != -1) && table.innerHTML.indexOf(ICON_PIN) == -1 && table.innerHTML.indexOf(ICON_PIN2) == -1) {
								makePins(table);
						}
						window.setTimeout(makePinsTO, 2000);
					}
					window.setTimeout(makePinsTO, 2000);
				}};
				fnShoutBox();
		}

		// **********************************************************************************
		// Wenn die aktuelle Seite die Plunderseite ist
		// **********************************************************************************
		if (IsPlunderPage() && document.getElementsByClassName("grunge zleft").length > 0) {
			var fnPlunderChB = function () {
				function insPlunderChb (plundertrs) {
					var selectedTab = -1;
					if (!oldVersion) {
						var plundertab = document.getElementById("plundertab").getElementsByTagName("li");
						for (var ii = 0; ii < plundertab.length; ii++)
							if (plundertab[ii].getElementsByClassName("selected").length > 0) {
								selectedTab = ii;
								break;
							}
					}
					else {
						// "Verkaufen"-Spalte schmaler machen
						GM_addStyle('#content .grunge #plunder table th.col4 div { width: 70px; }');
						GM_addStyle('#content .grunge #plunder table th.col4     { width: 70px; }');
					}
				
					// Icon zum Leeren des Plunder-Direktzugriffs hinzufügen
					AddResetIcon(plundertable);

					// Für alle Zeilen mit Plunderstücken
					for (var i = oldVersion; i < plundertrs.length; i++) {
						// **********************************************************************************
						// Funktion fügt Ausführungscode zur aktuellen Checkbox hinzu
						// **********************************************************************************
						function PrepareCheckbox(i, usemode, plunderinfo) {
							// Checkbox checken/unchecken in Abhängigkeit davon, ob das Plunderstück in der Direktzugriffsliste ist
							document.getElementById("Checkbox" + usemode + "_" + i).checked = (IsPlunderInList(plunderinfo + "*" + usemode) > 0);
				
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
										alert(TxtNotMoreThan9[myLang]);
									}			
								// sonst: Die Checkbox ist nicht gecheckt
								} else {
									// Plunderstück aus der Direktzugriffsliste entfernen
									RemovePlunderFromList(this.getAttribute("name").split("*")[0] + "*" + this.getAttribute("name").split("*")[1] + "*" + usemode);
								}
								// Eventuell bereits schon angezeigten Direktplunder entfernen
								HideAllPlunder();
								// Aktuellen Direktplunder anzeigen
								ShowAllPlunder(document.getElementsByTagName("html")[0].innerHTML, GetNrOfPlunderInList(), -1, 0);
							}, false);
						}
				
						// Spalte mit benutzbarem Plunder speichern
						var benutztd = plundertrs[i].getElementsByTagName("td")[oldVersion?4:5];
						if (oldVersion)
							benutztd.setAttribute('style', 'padding-left: 3px; padding-right: 7px; padding-top: 11px');
						else
							benutztd.setAttribute('style', 'padding-left: 5px; padding-right: 4px');
						// Spalte mit anlegbarem Plunder speichern
						var anlegtd = plundertrs[i].getElementsByTagName("td")[5];
						if (oldVersion)
							anlegtd.setAttribute('style', 'padding-left: 5px; padding-right: 4px; padding-top: 11px');
						else
							anlegtd.setAttribute('style', 'padding-left: 5px; padding-right: 4px');
				
						// Zwei neue Spalten anlegen und formatieren
						var newtd1 = document.createElement("td");
						if (oldVersion)
							newtd1.setAttribute('style', 'padding-left: 0px; padding-right: 4px; padding-top: 13px; width: 10px;');
						else
							newtd1.setAttribute('style', 'padding-left: 0px; padding-right: 11px; padding-top: 13px; width: 10px;');
						var newtd2 = document.createElement("td");
						newtd2.setAttribute('style', 'padding-left: 0px; padding-right: 11px; padding-top: 13px; width: 10px;');
				
						// Plunderinfo zusammenstellen aus Dateiname des Icons und Plundername, separiert durch "*"
						var plunderinfo = GetPlunderPic(plundertrs[i]) + "*" + GetPlunderName(plundertrs[i]);
				
						// **********************************************************************************
						// Wenn das Plunderstück benutzbar ist
						// **********************************************************************************
						if (selectedTab == 3 || (oldVersion && benutztd.getElementsByTagName("a").length > 0)) {
							// Checkbox zusammenstellen
							newtd1.innerHTML = "<form name='PlunderCheckbox' action=''><input name='" + plunderinfo + "*B' id='CheckboxB_" + i + "' type='checkbox'></form>";
							// Zelle anhängen
							plundertrs[i].insertBefore(newtd1, oldVersion?anlegtd:anlegtd.nextSibling);
							PrepareCheckbox(i, "B", plunderinfo);
						// sonst: Das Plunderstück kann nicht angelegt werden
						} else {
							// Leere Zelle
							newtd1.innerHTML = "&nbsp;";
							// Zelle anhängen
							plundertrs[i].insertBefore(newtd1, oldVersion?anlegtd:anlegtd.nextSibling);
						}
				
						// **********************************************************************************
						// Wenn das Plunderstück anlegbar ist
						// **********************************************************************************
						if (selectedTab >= 0 && selectedTab != 3 || (oldVersion && anlegtd.getElementsByTagName("a").length > 0)) {
							// Checkbox zusammenstellen
							newtd2.innerHTML = "<form name='PlunderCheckbox' action=''><input name='" + plunderinfo + "*A' id='CheckboxA_" + i + "' type='checkbox'></form>";
							// Zelle anhängen
							plundertrs[i].insertBefore(newtd2, anlegtd.nextSibling);
							PrepareCheckbox(i, "A", plunderinfo);
						// sonst: Das Plunderstück kann nicht angelegt werden
						} else {
							// Leere Zelle
							newtd2.innerHTML = "&nbsp;";
							// Zelle anhängen
							plundertrs[i].insertBefore(newtd2, anlegtd.nextSibling);
						}
					}
				}
				// Referenz auf Plundertabelle speichern
				var plundertable = document.getElementById("plunder").getElementsByTagName("table");
				if (plundertable.length > 0) {
					plundertable = plundertable[0];
					// Referenz auf Zeilen der Plundertabelle speichern
					var plundertrs = plundertable.getElementsByTagName("tr");
					if (plundertrs.length > 0)
						insPlunderChb(plundertrs);
				}
				if (!oldVersion) {
					var PlunderChbTO = function() {
						var plundertable = document.getElementById("plunder").getElementsByTagName("table");
						if (plundertable.length > 0) {
							plundertable = plundertable[0];
							// Referenz auf Zeilen der Plundertabelle speichern
							var plundertrs = plundertable.getElementsByTagName("tr");
							if (plundertrs.length > 0 && document.getElementsByName("PlunderCheckbox").length == 0)
								insPlunderChb(plundertrs);
						}
						window.setTimeout(PlunderChbTO, 2000);
					}
					window.setTimeout(PlunderChbTO, 2000);
				}
			}
			fnPlunderChB();
		}
		
		// **********************************************************************************
		// Wenn die aktuelle Seite die Bastelseite ist
		// **********************************************************************************
		if (IsCraftPage()) {
			var tables = document.getElementsByTagName("table");
			// **********************************************************************************
			// *** GM_XMLHTTPREQUEST *** Plunderseite abfragen
			// **********************************************************************************
			GM_xmlhttpRequest({method:"GET", url: PLUNDER_URL, onload:function(responseDetails) {
				var content = responseDetails.responseText;
				var aktPlunder = GM_getValue("LastPlunderName" + m_ownuserid + TOWNEXTENSION, "");
				for (var i = 0; i < tables.length; i++) {
					var tname = tables[i].id;
					if (tname.substr(0,12) != "messageslist")
						continue;
					tabnr = tname.substr(12);
					if (tabnr < 3)
						continue;
					var td = tables[i].getElementsByTagName("tr")[1].getElementsByTagName("td")[2];
					var prefix = td.innerHTML.split(">")[0] + ">";
					var text = td.innerHTML.substr(prefix.length).split("</p>")[0];
					var text2 = text;
					var plunderlist = text.split("<br>");
					for (j = 0; j < plunderlist.length; j++) {
						var plunder = plunderlist[j];
						var p = plunder.indexOf("x ");
						var pname = trimString(plunder.substr(p+2));
						var pInd = content.search('"> *' + pname + ' *<');
						var pAnz = 0;
						if (pInd != -1)
							pAnz = content.substr(pInd).split('"col3">')[1].split(" ")[0];
						if (aktPlunder == pname)
							pAnz++;
						text2 = text2.replace(pname, pname + " (" + pAnz + ")");	
					}
					td.innerHTML = td.innerHTML.replace(text, text2);
				}
			}});
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

					if (a == "" || b == "")
						return (a != "")?-1:(b != "")?1:0;

					var jetzt = new Date();
					var nowtime = Right$(jetzt.toLocaleString(), 8);
					
					var x = ReformatHours(nowtime, a.substr(0,8));
					var y = ReformatHours(nowtime, b.substr(0,8));

					return ((x < y) ? (-1) : ((x > y) ? 1 : 0));
				}

				// ***********************************************************************************************
				// ***********************************************************************************************
				// unterschiedliche Zeichenbreite ber�cksichtigen: small = 1, big = 3, alles andere: 2
				// ***********************************************************************************************
				// ***********************************************************************************************
				function calcSpace (text) {
					var small = " !fijl:";
					var big = "mwABCDEFGHIJKLMNOPQRSTUVWXYZ";
					var cntSmall = 0;
					var cntBig = 0;
					for (var i = 0, j = -1; i < small.length; i++)
						while ((j = text.indexOf(small.charAt(i), j + 1)) != -1)
							cntSmall++;

					for (var i = 0, j = -1; i < big.length; i++)
						while ((j = text.indexOf(big.charAt(i), j + 1)) != -1)
							cntBig++;
					return cntSmall + (text.length - cntSmall - cntBig) * 2 + cntBig * 3;
				}

				var content = responseDetails.responseText;
		
				// Wenn die Kampfseite abgerufen werden konnte (kein Seitenladefehler)
				if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
					if (content.indexOf(TxtRunAttack[lang]) != -1) {
						attname = content.split(TxtRunAttack[lang])[1].split('>')[1].split('<')[0];
						attid = content.split(TxtRunAttack[lang])[1].split('profil/id:')[1].split('/')[0];
						// ***********************************************************************************************
						// Abrufen des XML-Datensatzes für den angegriffenen User
						// ***********************************************************************************************
						GM_xmlhttpRequest({method: 'GET', url: API_URL + attid + ".xml", onload: function(responseDetails) {
							// Wenn die Seite erfolgreich abgerufen werden konnte
							if (responseDetails.status == 200) {
								var parser = new DOMParser();
								var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
								gangname = dom.getElementsByTagName('name')[1].textContent;
								if (gangname.toLowerCase() != 'false') {
									attname += "/" + dom.getElementsByTagName('name')[1].textContent;
									var gangid = dom.getElementsByTagName('id')[1].textContent;
									if (m_owngangid == gangid)
										attwarn = 1;
									else if (m_owngangid != 0)
										// **********************************************************************************
										// *** GM_XMLHTTPREQUEST *** Bandenprofil laden
										// **********************************************************************************
										GM_xmlhttpRequest({method: 'GET', url: GANG_PROFILE+m_owngangid+'/', onload: function(responseDetails) {
											var profcontent = responseDetails.responseText;
									
											// Wenn die Kampfseite abgerufen werden konnte (kein Seitenladefehler)
											if (profcontent.indexOf(KEYWORD_MYBUM[lang]) != -1) {
												var allies = profcontent.split('#1F1F1F')[3];
												if (allies.indexOf('profil/bande:'+gangid) != -1)
													attwarn = 2;
											}
										}});
								}
							}
						}});
					}

					// Überprüfe aktuelle Kampfwerte auf maximale Kampfstärke
					CheckFightValues(content);
					
					// Daten eingehender Kämpfe ermitteln
					var ftext = GetNumberOfFights(content);
					
					// Wenn es eingehende Kämpfe gibt
					if (ftext != "") {
						var IncomingFights = ftext.split('/').slice(0, -1);
						var NrOfFights = IncomingFights.length;
						// Wenn mehr als ein Kampf eingeht
						if (NrOfFights > 1) {
							var FightTitle = printf(TxtIncomingFights2[myLang], NrOfFights, "", "", "");
						// sonst: Es gibt nur einen eingehenden Kampf
						} else {
							var FightTitle = TxtIncomingFights1[myLang];
						}
			
						// Wenn weniger als 6 Angriffe eingehen
						if (NrOfFights < 6) {	
							var FightIcon = NrOfFights;
						// sonst: Es gehen 6 oder mehr Angriffe ein
						} else {
							var FightIcon = 6;
						}
			
						var leer = '                                                                                                                   ';
						FightTitle += leer.substr(0, leer.length - calcSpace(FightTitle) + 20);
						IncomingFights.sort(sortByTime);
						for (var i = 0; i < NrOfFights; i++) {
							var splitted = IncomingFights[i].split('#');
							var ausweich = printf(TxtAusweichen[myLang], (splitted[1] == 'N'?TxtAusweichN[myLang]:splitted[1] == 'V'?TxtAusweichV[myLang]:''), "", "", "");
							if (splitted[1][0] == "A")
								ausweich += " (-" + splitted[1].split(':')[1] + ")";
							var nrOfSpaces = leer.length - calcSpace(splitted[0]) - calcSpace(ausweich) + 22;
							if (nrOfSpaces < 1)
								nrOfSpaces = 1;
							FightTitle += splitted[0] + leer.substr(0, nrOfSpaces) + ausweich + '       ';
							}

						// Kampf-Icon anzeigen
						ShowFightIcon(FightIcon, FightTitle);
					}
					else
						ShowImg('FBBACK', '/fight/', ICON_FIGHT[0], '', '', '', FB_X, FB_Y+14, '51', 'fight');
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
						var GangFightTitle = printf(TxtGangFight2[myLang], NrOfGangFights, GangFightInfo, "", "");
					// sonst: Es gibt nur einen eingehenden Kampf
					} else {
						var GangFightTitle = printf(TxtGangFight1[myLang], GangFightInfo, "", "", "");
					}
					// Wenn es weniger als 6 Bandenkämpfe gibt
					if (NrOfGangFights < 6) {
						var GangFightIcon = NrOfGangFights;
					// sonst: Es gibt 6 oder mehr Bandenkämpfe
					} else {
						var GangFightIcon = 6;
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
				else
					ShowImg('GFBACK', '/gang/fight/', ICON_GANGFIGHT[0], '', '', '', GF_X, GF_Y+14, '50', 'gangfight');
			}
		}); 
	}
	});
}
