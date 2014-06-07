// ==UserScript==
// @name			Feuerwache.net AAO Script by Amtsleiter - Hogsmeade
// @namespace		http://userscripts.org/users/182292
// @description		Vorschlag fuer Fahrzeuge bei Einsaetzen auf Feuerwache.net und andere Hilfen
// @include			http://www.feuerwache.net/*
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_xmlhttpRequest
// @grant			GM_deleteValue
// @grant			GM_listValues
// @author			Amtsleiter / Haruspex
// @info			Hinweis: das original Script stammt von Sawos und ist hier auch erhaeltlich
// @info2			http://syslord.org/feuerwache.net/
// @info3			Danke für die Unterstützung durch Haruspex
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version			2013-07-02 05:40
// ==/UserScript==
var Versionsnummer=GM_getValue("Version","version");
/*
	Die Hogsmeade Edition von Feuerwache.net basiert auf dem (veralteten) Skript von Sawos. -> http://userscripts.org/scripts/show/50002
	Das Skript von Sawos wurde dann von MasterJM erweitert. Diese erweiterte Version bildete die Grundlage für das Skript von Amtsleiter.
	Amtsleiter hat sich inzwischen mit Haruspex zusammengetan. 
	Beide erweitern dieses Skript fast täglich, halten es auf dem neusten Stand (aus Sicht des Spieles aber auch der Technik an sich) und arbeiten an dessen Perfektion.
	Nicht zu vergessen ist, dass dieses Skript vorallem für die Mitglieder des Verbandes Hogsmeade vorgesehen ist. 
	Daher wurde es auf den Bedarf und auf die Wünsche der Mitglieder ausgerichtet. Die Zugehörigkeit des Skriptes zum Verband lässt sich in einigen Funktionen (wie z.B. den Einsatzadressen) erkennen. 
	Aber auch viele andere Wünsche von Nicht-Mitgliedern wurden umgesetzt und sind jederzeit gerne gesehen. Wir freuen uns über jeden Benutzer!

	Die Hogsmeade Edition beherrscht natürlich alle wichtigen Funktionen, die in allen Feuerwache.net-AAO-Skripts inzwischen Standard sind. Das beinhaltet natürlich vorallem die Alarmierung von Fahrzeugen anhand einer AAO. 
	Bei der AAO haben sich Amtsleiter und Haruspex größte Mühe gegeben eine Lösung zu finden, die alle Benutzer zufrieden stellt. 
	Es wurde nach langen Beobachtungen ermittelt, welche Fahrzeuge wann Sinn machen, und so ist eine aus Sicht vieler zufriedener Benutzer eine optimale AAO entstanden.
	Neben diesen Standardfunktionen gibt es aber auch diverse Funktionen, von denen euch viele nur exklusiv in der Hogsmeade Edition von Amtsleiter und Haruspex geboten werden. Einige dieser Funktionen sind unten aufgelistet.

    Zuteilen von Einsatzstichworten zum jeweiligen Einsatz
    Anzeige der Einsatznummer
    Anzeige des Einsatzortes (Straße, Hausnummer, PLZ)
    Anzeige der benötigten Fahrzeuge zum jeweiligen Stichwort
    Selektion der Benötigten Fahrzeuge an Hand der Wachanzahl
    Farbliche Markierung von benötigten Fahrzeugen zum Stichwort
    Anzeige der Einsatzbereiten Fahrzeuge auf Einsatzseite
    Manuelles außer Dienst Stellen von Fahrzeugen
    Anzeige der Fahrzeuge nach Zustand
    Anzeige der Fahrzeuge nach Laufleistung
    Anzeige der Fahrzeuge nach Status
    Anzeige der durchschnittlichen Fahrleistung je Fahrzeuggruppe
    Farbliche Markierung der Feuerwehrleute beim Ausbilden
    Ausblendung der Feuerwehrleute (in der Schule) die den entsprechenden Lehrgang bereits haben
    Ausblendung der vollen Wachen beim Fahrzeugkauf
    Ausblendung der vollen Wachen beim Fahrzeuge verschieben
    Farbliche Markierung der Rückmeldungen von der Leitstelle in den Einsätzen
    Farbliche Markierung wenn eine neue PN im Postfach liegt
    Verkleinerung der Feuerwache / Schulen / Werkstätten / Krankenhäuser Icons
    Ausblendung alle Gebäude außer Schulen auf der Gebäudeseite
    Sound bei Großeinsätzen (Krankenhaus, Flugzeug)
    Sound bei Verbandgroßschadenslagen
    Einblendung eines Saisonalen Kopfbildes
    Fahrzeugbilder zu den Fahrzeugen auf dem Fahrzeugmarkt

	
	Support?
	Amtsleiter -> http://www.feuerwache.net/profil/Amtsleiter
	Haruspex -> http://www.feuerwache.net/profil/Haruspex

	Die beste Möglichkeit einen Fehler zu melden oder einen Vorschlag zu machen ist jedoch unser Bugtracker! 
	Dieses Programm erreichst du hier: http://hogsmeade-verband.de/mantis/view_all_bug_page.php
	Dort kannst du - ohne eine Anmeldung - deinen Fehler melden, womit du uns Arbeit abnimmst, da wir ihn dort sonst selber der Übersicht halber posten müssten. 
	Dort bekommst du auch direkt Rückmeldungen oder Rückfragen.

	Viel Spaß!
	Amtsleiter & Haruspex
*/
// Anzahl der Spalten in der Verfügbar-Anzeige.
var MAXSPALTENVERFUEGBAR=99;
// soll täglich nach einem Update des AAO-Scriptes gesucht werden?
var CHECKFORUPDATES=true;
// unter welchem URL finde ich Infos über das Script?
var UPDATEURL="http://www.hogsmeade-verband.net/updatelog.html";
// unter welchem URL finde ich die Metadaten zum Script?
var UPDATEURLmetaStable="http://www.hogsmeade-verband.net/feuerwache/stable/version.js";
var UPDATEURLmetaBeta="http://www.hogsmeade-verband.net/feuerwache/beta/version.js";
// unter welchem URL finde ich das Script als Installation?
var INSTALLURLStable="http://www.hogsmeade-verband.net/feuerwache/stable/feuerwachenet_aao_script.user.js";
var INSTALLURLBeta="http://www.hogsmeade-verband.net/feuerwache/beta/feuerwachenet_aao_script.user.js";

var Einsatzklassen = {

  // hier die Einsatzstichworte einer Einsatzklasse und zusätzlichen Fahrzeugen zuordnen
  // Es werden später alle Fahrzeuge vorgeschlagen, die der Einsatzklasse angehören
  // (z.B. 3xLF bei "Feuer3") sowie alle hier zusätzlich genannten Fahrzeuge
  //
  // Syntax in der Alarmierungsliste:
  //   Einsatzklasse zuerst, dann ggf. ein Plus (+) und weiter Fahrzeugklassen, diese 
  //   durch Komma (,) voneinander getrennt. Alternativen durch Schrägstrich (/) getrennt
  //   Optionale Fahrzeuge (werden nur in der Liste hervorgehoben) mit Pipe (|) anfügen
  //   zum Beispiel 'F1+RW/TS,ELW|GW-M,DL' ->
  //       alarmiere alles nach F1, zusätzlich einen RW oder LF16-TS, sowie einen ELW.
  //       markiere zusätzlich den nächsten GW-M sowie die nächste DL
  //
  // AAO Optimierung im Forum: http://www.feuerwache.net/forum/hauptforum/nachforderungen-sammelthread-fuer-wiki/5
  // daher wurde AAO angepasst und entschärft, ergo mehr Fhz frei

  'Ammoniakaustritt in Eishalle':  'TH-GAS',	
  'Auffahrunfall'               :  'H1',	
  'Ausgedehnter Waldbrand'      :  'F Wald 2',	
  'Auslaufende Betriebsstoffe'  :  'H Öl',	
  'Baukran auf Auto'            :  'H2',	
  'Baum auf Auto'               :  'H P Kl',	
  'Baum auf Dach'               :  'H1+DLK',	
  'Baum auf Straße'             :  'H1',	
  'Brand im Baumarkt'           :  'F-GG4',	
  'Brand im Casino'             :  'Großbrand',	
  'Brand im Sägewerk'           :  'F4-GWA',	
  'Brand im Supermarkt'         :  'F3-FwK',	
  'Brand in Autohaus'           :  'F4-GW-M',	
  'Brand in Brauerei'           :  'F3-GW-A',	
  'Brand in Briefkasten'        :  'F1',	
  'Brand in Druckerei'          :  'F4 BMA+GW-L2',	
  'Brand in Eishalle'           :  'F2 BMA',	
  'Brand in Gärtnerei'          :  'F-GG3+DLK',	
  'Brand in Gemeindehaus'       :  'F2',	
  'Brand in Großwäscherei'      :  'F3-GW-M', 	
  'Brand in Hotel'              :  'F3 BMA',
  'Brand in KFZ-Werkstatt'      :  'F3+FwK',	
  'Brand in Kletterhalle'       :  'F4',	
  'Brand in Kühlhaus'           :  'F-GG5',	
  'Brand in Lackfabrik'         :  'F-GG6',	
  'Brand in Metzgerei'          :  'F3-DLK',	
  'Brand in Reifenlager'        :  'F-GG3+GW-L2',	
  'Brand in Schloss'            :  'F3-ELW',	
  'Brand in Schule'             :  'F BMA Schule',	
  'Brand in Spedition'          :  'F-GG4-DLK',	
  'Brand in Sporthalle'         :  'F4-GWA',	
  'Brand in Zugdepot'           :  'F4-GW-S',	
  'Brennende Bäume'             :  'F1',	
  'Brennende S-Bahn'            :  'F2+GW-S',	
  'Brennende Telefonzelle'      :  'F1',	
  'Brennende Windmühle'         :  'F2 Dach+ELW 1',	
  'Brennender LKW'              :  'F1|GW-G,GW-M,ELW 1,GT',	
  'Brennender Müllwagen'        :  'F1',	
  'Brennender PKW'              :  'F1',	
  'Brennender Sicherungskasten'	:  'F1',
  'Brennendes Bus-Häuschen'     :  'F1',	
  'Brennendes Gebüsch'          :  'F1',	
  'Brennendes Gras'             :  'F1',	
  'Brennt Anhänger'             :  'F1',	
  'Chemieunfall (an Schule)'    :  'H Chemie',	
  'Chlorgas Alarm (Schwimmbad)' :  'H Gas',	
  'Container Brand'             :  'F1',	
  'Dachstuhlbrand'              :  'F2 Dach',	
  'Fahrstuhl - Türöffnung'      :  'H P Aufz',	
  'Feldbrand'                   :  'F1',	
  'Fettbrand in Pommesbude'     :  'F2+TLF',	
  'Feuer im Altenheim'          :  'F4-GW-A',	
  'Feuer im Krankenhaus'        :  'BMA KH Y',	
  'Feuer im Laubhaufen'         :  'F1',	
  'Garagenbrand'                :  'F2',	
  'Gartenlaubenbrand'           :  'F1',	
  'Gasaustritt in Fabrik'       :  'Gasalarm2',	
  'Gastronomiebrand'            :  'F3',	
  'Gefahrstoff-Austritt in Firma'  :  'TH-GG2',	
  'Gewerbebrand'                :  'F4 BMA',	
  'Kaminbrand'                  :  'F1+DLK',	
  'Keller unter Wasser'         :  'H1',	
  'Kellerbrand'                 :  'F2',	
  'Kinobrand'                   :  'F4-TLF',	
  'Kioskbrand'                  :  'F1',	
  'Kleiner Waldbrand'           :  'F1',	
  'Kleintier in Not'            :  'H1',	
  'Küchenbrand'                 :  'F1',	
  'LKW in Brückengeländer'      :  'H VU LKW',	
  'Mähdrescherbrand'            :  'F1',	
  'Maschinenbrand'              :  'F3-GW-L',
  'Möbelhausbrand'              :  'F3+ELW 1',  
  'Motorrad-Brand'              :  'F1',	
  'Mülleimer Brand'             :  'F1',	
  'Mülleimer Brand'             :  'F1',	
  'Ölspur'                      :  'H Öl',	
  'Person im Fluss'             :  'H Wasser Y',	
  'Person in Schacht'           :  'H1',	
  'PKW in Fluss'                :  'TH-Wasser1',	
  'Scheunenbrand'               :  'F3+GW-L2',	
  'Schornsteinbrand'            :  'F2 Dach',	
  'Schuppenbrand'               :  'F2',	
  'Silobrand'                   :  'F3',	
  'Sperrmüllbrand'              :  'F1',	
  'Strohballen Brand'           :  'F1',	
  'Traktorbrand'                :  'F1',	
  'Trocknerbrand'               :  'F1',	
  'Türöffnung'                  :  'H1',	
  'Unfall mit Gefahrgut-Transport' :  'TH-GG|GT',	
  'Verkehrsunfall'              :  'H P Kl',	
  'VU mit Straßenbahn'          :  'TH-Schiene', 	
  'Waldbrand'                   :  'F Wald 1',	
  'Wohnblockbrand'              :  'F5-GW-A',	
  'Wohnungsbrand'               :  'F2',	
  'Wohnwagenbrand'              :  'F1',	

// Großbaustelle
  'Baggerbrand'                  :  'F1',
  'Brand nach Schweißarbeiten'   :  'F2',
  'Brennender Wohncontainer'     :  'F1',
  'Gas-Explosion'                :  'F2',
  'Gerüsteinsturz'               :  'H Einsturz',
  'Wassereinbruch'               :  'H1',
  
// Weihnachtseinsätze
  'Brand-Weihnachtsbaum in Kirche'  : 'F3+DLK',
  'Brand auf Weihnachtsmarkt'       : 'F1',
  
// Flughafen-Einsätze
  'Auffahrunfall_n'             :  'H1 N',
  'Beschädigtes Frachtstück'    :  'H1 N',
  'Brand bei Flugzeugbetankung' :  'Test Flug 4',
  'Brand im Terminal'           :  'F4 BMA Y',
  'Brand im Tower'              :  'Test Flug 1',
  'Brennendes Flugzeug'         :  'Crash',
  'Dachstuhlbrand_n'            :  'F2 Dach N',
  'Feldbrand_n'                 :  'F1 F',
  'Gewerbebrand_n'              :  'F4 BMA N',
  'Grasnarbenbrand'             :  'F1 F',  
  'Mülleimer Brand_n'           :  'F1 F',
  
// Großschadenslagen
  'Brand in Industriepark'      :  'KFB LZR',
  'Brand in Steinbruch'         :  'KFB FZ WT',
  'Großbrand im Hafen'          :  'KFB FZ WF',  
  
// Hafeneinsätze
  'Brand Kreuzfahrtschiff'      :  'X2',
  'Feuer auf Boot (Klein)'      :  'X1',
  'Feuer auf Boot (Mittel)'     :  'X2',
  'Feuer in Bootswerft'         :  'F3 Schiff',
  'Gabelstapler im Hafenbecken' :  'H See',
  'Rauchentwicklung in Kantine' :  'F1 Küche',
  'Verletztentransport'         :  'RD',
  
// Raffinerieeinsätze
  'Brand in Betankungsanlage'   :  'F7 RAFF2|GT',
  'Brand in Raffinerie'         :  'F8 RAFF|GT',
  'Brennt Tanklager '           :  'F7 RAFF|GT',
  'Brennt Tanklager'            :  'F7 RAFF|GT',
  'Tankbrand'                   :  'F6 RAFF|GT',

// Bahneinsätze
  'Baum auf Schiene'               :  'H1 N',
  'Brand am Bahndamm'              :  'F1 N',
  'Brand in Fahrkartenautomat'     :  'F1 N',
  'Brennende Lokomotive'           :  'F2 N',
  'Brennender Güterzug'            :  'F Gzug',
  'Brennender Güterzug (Bahnhof)'  :  'F Gzug B',  
  'Brennender Güterzug (Tunnel)'   :  'F Gzug T',
  'Feuer im Personenzug'           :  'F Pzug',  
  'Feuer im Personenzug (Bahnhof)' :  'F Pzug B',
  'Feuer im Personenzug (Tunnel)'  :  'F Pzug T',
  'Feuer in Bahnhofshalle'         :  'F5-ELW',
  'Güterzug entgleist'             :  'H Gzug',
  'Güterzug entgleist (Bahnhof)'   :  'H Gzug B',
  'Güterzug entgleist (Tunnel)'    :  'H Gzug T',  
  'Rangierunfall'                  :  'H4 N',
  'RTZ-Einsatz'                    :  'RTZ-besetzen',
  'Unfall an Bahnübergang'         :  'TH3',


// Tagebaueinsätze
  'Brennender Muldenkipper'         :  'F2 N',
  'Brennender Personenbus'          :  'F1 N',
  'Brennendes Förderband'           :  'F2 N',
  'Muldenkipper abgerutscht'        :  'H VU HT',
  'Radlader umgekippt'              :  'H VU BauMa',
  'Tagebauarbeiter abgestürzt'      :  'H Höhe',
  
// Müllverbrennungsanlage
  'Brand in Altpapier-Lager'        :  'F4 MVA 2',
  'Brand in Müll-Bunker'            :  'F8 MVA',
  'Brand in Müll-Sortieranlage'     :  'F4 MVA',
  'Kehrmaschine in Müllbunker'      :  'F2 MVA',

// Altstadteinsätze in der Neustadt
  'Ammoniakaustritt in Eishalle_n'  :  'TH-GAS N',
  'Ausgedehnter Waldbrand_n'        :  'F Wald 2 N',
  'Auslaufende Betriebsstoffe_n'    :  'H Öl N',
  'Baukran auf Auto_n'              :  'H2 N',
  'Baum auf Auto_n'                 :  'H P Kl N',
  'Baum auf Dach_n'                 :  'H1 N+DLK',
  'Baum auf Straße_n'               :  'H1 N',
  'Brand im Baumarkt_n'             :  'F-GG4 N',
  'Brand im Casino_n'               :  'Großbrand N',
  'Brand im Sägewerk_n'             :  'F4-GWA N',
  'Brand im Supermarkt_n'           :  'F3-FwK N',
  'Brand in Autohaus_n'             :  'F4-GW-M N',
  'Brand in Brauerei_n'             :  'F3-GW-A N',
  'Brand in Briefkasten_n'          :  'F1 N',
  'Brand in Druckerei_n'            :  'F4 BMA N+GW-L2',
  'Brand in Eishalle_n'             :  'F2 BMA N',
  'Brand in Gärtnerei_n'            :  'F-GG3 N+DLK',
  'Brand in Gemeindehaus_n'         :  'F2 N',
  'Brand in Großwäscherei_n'        :  'F3-GW-M N', 
  'Brand in Hotel_n'                :  'F3 BMA N',
  'Brand in KFZ-Werkstatt_n'        :  'F3 N+FwK',
  'Brand in Kletterhalle_n'         :  'F4 N',
  'Brand in Kühlhaus_n'             :  'F-GG5 N',
  'Brand in Lackfabrik_n'           :  'F-GG6 N',
  'Brand in Metzgerei_n'            :  'F3-DLK N',
  'Brand in Reifenlager_n'          :  'F-GG3 N+GW-L2',
  'Brand in Schloss_n'              :  'F3-ELW N',
  'Brand in Schule_n'               :  'F BMA Schule N',
  'Brand in Spedition_n'            :  'F-GG4-DLK N',
  'Brand in Sporthalle_n'           :  'F4-GWA N',
  'Brand in Zugdepot_n'             :  'F4-GW-S N',
  'Brennende Bäume_n'               :  'F1 N',
  'Brennende S-Bahn_n'              :  'F2 N+GW-S',
  'Brennende Telefonzelle_n'        :  'F1 N',
  'Brennende Windmühle_n'           :  'F2 Dach N+ELW 1',
  'Brennender LKW_n'                :  'F1 N|GW-G,GW-M,ELW 1,GT',
  'Brennender Müllwagen_n'          :  'F1 N',
  'Brennender PKW_n'                :  'F1 N',
  'Brennender Sicherungskasten_n'   :  'F1 N',
  'Brennendes Bus-Häuschen_n'       :  'F1 N',
  'Brennendes Gebüsch_n'            :  'F1 N',
  'Brennendes Gras_n'               :  'F1 N',
  'Brennt Anhänger_n'               :  'F1 N',
  'Chemieunfall (an Schule)_n'      :  'H Chemie N',
  'Chlorgas Alarm (Schwimmbad)_n'   :  'H Gas N',
  'Container Brand_n'               :  'F1 N',
  'Fahrstuhl - Türöffnung_n'        :  'H P Aufz N',
  'Fettbrand in Pommesbude_n'       :  'F2 N+TLF',
  'Feuer im Altenheim_n'            :  'F4-GW-A N',
  'Feuer im Krankenhaus_n'          :  'BMA KH Y N',
  'Feuer im Laubhaufen_n'           :  'F1 N',
  'Garagenbrand_n'                  :  'F2 N',
  'Gartenlaubenbrand_n'             :  'F1 N',
  'Gasaustritt in Fabrik_n'         :  'Gasalarm2 N',
  'Gastronomiebrand_n'              :  'F3 N',
  'Gefahrstoff-Austritt in Firma_n' :  'TH-GG2 N',
  'Kaminbrand_n'                    :  'F1 N+DLK',
  'Keller unter Wasser_n'           :  'H1 N',
  'Kellerbrand_n'                   :  'F2 N',
  'Kinobrand_n'                     :  'F4-TLF N',
  'Kioskbrand_n'                    :  'F1 N',
  'Kleiner Waldbrand_n'             :  'F1 N',
  'Kleintier in Not_n'              :  'H1 N',
  'Küchenbrand_n'                   :  'F1 N',
  'LKW in Brückengeländer_n'        :  'H VU LKW N',
  'Mähdrescherbrand_n'              :  'F1 N',
  'Maschinenbrand_n'                :  'F3-GW-L N',
  'Möbelhausbrand_n'                :  'F3 N+ELW 1',
  'Motorrad-Brand_n'                :  'F1 N',
  'Mülleimer Brand'                 :  'F1 N',
  'Ölspur_n'                        :  'H Öl N',
  'Person im Fluss_n'               :  'H Wasser Y N',
  'Person in Schacht_n'             :  'H1 N',
  'PKW in Fluss_n'                  :  'TH-Wasser1 N',
  'Scheunenbrand_n'                 :  'F3 N+GW-L2',
  'Schornsteinbrand_n'              :  'F2 Dach N',
  'Schuppenbrand_n'                 :  'F2 N',
  'Silobrand_n'                     :  'F3 N',
  'Sperrmüllbrand_n'                :  'F1 N',
  'Strohballen Brand_n'             :  'F1 N',
  'Traktorbrand_n'                  :  'F1 N',
  'Trocknerbrand_n'                 :  'F1 N',
  'Türöffnung_n'                    :  'H1 N',
  'Unfall mit Gefahrgut-Transport_n':  'TH-GG N|GT',
  'Verkehrsunfall_n'                :  'H P Kl N',
  'VU mit Straßenbahn_n'            :  'TH-Schiene N', 
  'Waldbrand_n'                     :  'F Wald 1 N',
  'Wohnblockbrand_n'                :  'F5-GW-A N',
  'Wohnungsbrand_n'                 :  'F2 N',
  'Wohnwagenbrand_n'                :  'F1 N',

// Großbaustelle
  'Baggerbrand_n'                    :  'F1 N',
  'Brand nach Schweißarbeiten_n'     :  'F2 N',
  'Brennender Wohncontainer_n'       :  'F1 N',
  'Gas-Explosion_n'                  :  'F2 N',
  'Gerüsteinsturz_n'                 :  'H Einsturz N',
  'Wassereinbruch_n'                 :  'H1 N',

  
// Weihnachtseinsätze
  'Brand-Weihnachtsbaum in Kirche_n' : 'F3+DLK',
  'Brand auf Weihnachtsmarkt_n'      : 'F1 N'
  
};

if ( document.getElementById('aao') != undefined) {
	var Einsatzklasse_Fahrzeugzuordnung=new Object();
	var container=document.getElementById('aao').innerHTML;
	var stichwort=container.split('%%');
	for (var i=0;i<stichwort.length;i++) {
		var fahrzeuge=stichwort[i].split(':');
		var index=fahrzeuge[0];
		Einsatzklasse_Fahrzeugzuordnung[index]=fahrzeuge[1];
	}
}
else {
var Einsatzklasse_Fahrzeugzuordnung = {

  // hier wird definiert, welche Fahrzeuge standardmäßig zu den verschiedenen
  // Einsatzklassen geschickt werden. Einzelne Fahrzeuge werden durch Komma (,)
  // getrennt, Alternativen durch (/).
  // !!!ACHTUNG: HIER KEINE OPTIONALEN FAHRZEUGE (|) EINTRAGEN!!!
  'undef'          :  'LF',
  'WATCH'          :  'LF/LF-S/ULF',
  'Test'           :  'GW-M,ELW 1,GW-G,RW 2/AB-Rü',

  'RD'             :  'RTW',

// zu undef = unbekannten Einsatzen wird per Default jetzt ein LF geschickt

// Brandeinsätze




  'Test Flug 1'    :  'LF/LF-S,LF/LF-S,ELW 1,DLK,GW-A',
  'Test Flug 4'    :  'LF/LF-S,FLF,GW-Ö,ELW 1,GW-G',

  'F1'             :  'LF',
  'F1 N'           :  'LF/LF-S',
  
  'F1 F'           :  'LF/LF-S/FLF',
  'F1 Küche'       :  'LF/LF-S,TLF,DLK,ELW 1,GW-L2,GW-A',


  'F2'             :  'LF,LF',  
  'F2 N'           :  'LF/LF-S,LF/LF-S',
  
  'F2 BMA'         :  'LF,LF,DLK,GW-L2,TLF,RW 2/AB-Rü,ELW 1',
  'F2 BMA N'       :  'LF,LF,DLK,GW-L2,TLF,RW 2/AB-Rü,ELW 1',
  
  'F2 Dach'        :  'LF,LF,DLK',
  'F2 Dach N'      :  'LF/LF-S,LF/LF-S,DLK',
  
  'F2 MVA'         :  'LF/LF-S,LF/LF-S,DLK,RW 2/AB-Rü,GW-H',

  'F3'             :  'LF,LF,LF',
  'F3 N'           :  'LF/LF-S,LF/LF-S,LF/LF-S',
  
  'F3 Schiff'      :  'LF/LF-S,LF/LF-S,LF/LF-S,GW-A/AB-AS,TLF,GW-L2,GW-M,DLK,ELW 1',
  'F3 BMA'         :  'LF,LF,LF,ELW 1,DLK,RW 2/AB-Rü,TLF,GW-A/AB-AS',
  'F3 BMA N'       :  'LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,DLK,RW 2/AB-Rü,TLF,GW-A/AB-AS',
  'F3-DLK'         :  'LF,LF,LF,ELW 1,DLK,GW-L2',
  'F3-DLK N'       :  'LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,DLK,GW-L2',
  'F3-ELW'         :  'LF,LF,LF,ELW 1,DLK',
  'F3-ELW N'       :  'LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,DLK',
  'F3-FwK'         :  'LF,LF,LF,DLK,FwK',
  'F3-FwK N'       :  'LF/LF-S,LF/LF-S,LF/LF-S,DLK,FwK',
  'F3-GW-A'        :  'LF,LF,LF,ELW 1,GW-A/AB-AS,GW-L2,DLK',
  'F3-GW-A N'      :  'LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-A/AB-AS,GW-L2,DLK',
  'F3-GW-L'        :  'LF,LF,LF,ELW 1,GW-L2',
  'F3-GW-L N'      :  'LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-L2',
  'F3-GW-M'        :  'LF,LF,LF,GW-M,GW-A/AB-AS,DLK,ELW 1',
  'F3-GW-M N'      :  'LF/LF-S,LF/LF-S,LF/LF-S,GW-M,GW-A/AB-AS,DLK,ELW 1',

  'F4'             :  'LF,LF,LF,LF',
  'F4 N'           :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S',
  'F4 BMA'         :  'LF,LF,LF,LF,DLK,ELW 1,GW-A/AB-AS,RW 2/AB-Rü',
  'F4 BMA N'       :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,DLK,ELW 1,GW-A/AB-AS,RW 2/AB-Rü',   
  'F4 BMA Y'       :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-M,DLK,GW-A',
  'F4 MVA'         :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,GW-G,GW-L2,ELW 1,GW-A/AB-AS',
  'F4 MVA 2'       :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,DLK,GW-M,TLF,ELW 1,GW-L2,AB-EL',
  'F4-DLK'         :  'LF,LF,LF,LF,DLK,ELW 1,RW 2/AB-Rü',
  'F4-ELW'         :  'LF,LF,LF,LF,GW-L2,ELW 1,DLK',
  'F4-GWA'         :  'LF,LF,LF,LF,ELW 1,GW-A/AB-AS,GW-L2',
  'F4-GWA N'       :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-A/AB-AS,GW-L2',
  'F4-GW-A'        :  'LF,LF,LF,LF,DLK,ELW 1,GW-A/AB-AS',
  'F4-GW-A N'      :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,DLK,ELW 1,GW-A/AB-AS',
  'F4-GW-M'        :  'LF,LF,LF,LF,DLK,ELW 1,GW-A/AB-AS,GW-M',
  'F4-GW-M N'      :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-A/AB-AS,GW-M',
  'F4-GW-S'        :  'LF,LF,LF,LF,DLK,ELW 1,GW-L2,RW 2/AB-Rü,GW-S',
  'F4-GW-S N'      :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,DLK,ELW 1,GW-L2,RW 2/AB-Rü,GW-S',
  'F4-TLF'         :  'LF,LF,LF,LF,DLK,ELW 1,GW-A/AB-AS,TLF',
  'F4-TLF N'       :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,DLK,ELW 1,GW-A/AB-AS,TLF',

  'F5'             :  'LF,LF,LF,LF,LF,DLK,ELW 1,TLF,GW-A/AB-AS,GW-L2',
  'F5-ELW'         :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,GW-A/AB-AS,DLK,GW-L2,ELW 1',
  'F5-GW-A'        :  'LF,LF,LF,LF,LF,ELW 1,GW-A/AB-AS',
  'F5-GW-A N'      :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-A/AB-AS',

  'F6 RAFF'        :  'LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,RW 2/AB-Rü,GW-Ö/AB-Öl,ELW 1,ULF',

  'F7 RAFF'        :  'LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,RW 2/AB-Rü,GW-M,GW-Ö/AB-Öl,ELW 1,GW-L2,ULF',
  'F7 RAFF2'       :  'LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,GW-G,GW-M,GW-A/AB-AS,RW 2/AB-Rü,ULF',

  'F8 MVA'         :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-L2,GW-A/AB-AS,DLK,GW-G,GW-M,AB-EL',
  'F8 RAFF'        :  'LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,LF/ULF/LF-S,ELW 1,RW 2/AB-Rü,GW-G,GW-M,DLK,GW-L2,TLF,FwK,ULF',

  'F-GG2'          :  'LF,LF,GW-M,GW-G',
  'F-GG3'          :  'LF,LF,LF,ELW 1,GW-M,GW-G',
  'F-GG3 N'        :  'LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-M,GW-G',
  'F-GG4'          :  'LF,LF,LF,LF,ELW 1,RW 2/AB-Rü,GW-M,GW-G,GW-A/AB-AS',
  'F-GG4 N'        :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,RW 2/AB-Rü,GW-M,GW-G,GW-A/AB-AS',
  'F-GG4-DLK'      :  'LF,LF,LF,LF,ELW 1,DLK,RW 2/AB-Rü,GW-M,GW-G,GW-L2',
  'F-GG4-DLK N'    :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,DLK,RW 2/AB-Rü,GW-M,GW-G,GW-L2',
  'F-GG5'          :  'LF,LF,LF,LF,LF,DLK,ELW 1,GW-L2,GW-G,GW-M',
  'F-GG5 N'        :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,DLK,ELW 1,GW-L2,GW-G,GW-M',
  'F-GG6'          :  'LF,LF,LF,LF,LF,LF,ELW 1,DLK,GW-A/AB-AS,GW-M,GW-G', 
  'F-GG6 N'        :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,DLK,GW-A/AB-AS,GW-M,GW-G', 
    
  'F Gzug'         :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-M,GW-L2,GW-G,GT',
  'F Gzug B'       :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-M,GW-G,TLF',
  'F Gzug T'       :  'LF-S,LF-S,LF-S,LF-S,ELW 1,GW-L2,GW-M,GW-G,GT,RTZ',
  
  'F Pzug'         :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-L2,TLF',
  'F Pzug B'       :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-L2',
  'F Pzug T'       :  'LF-S,LF-S,LF-S,LF-S,ELW 1,GW-L2,RTZ',

  'BMA KH Y'       :  'LF,LF,LF,LF,LF,LF,LF,LF,ELW 1,GW-L2,RW 2/AB-Rü,GW-M,GW-G,GW-A/AB-AS',
  'BMA KH Y N'     :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-L2,RW 2/AB-Rü,GW-M,GW-G,GW-A/AB-AS',
  
  'Crash'          :  'FLF,FLF,FLF,FLF,FLF,FLF,FLF,RTF,GW-G,GW-M,GW-Ö/AB-Öl,ELW 1,RW 2/AB-Rü',
  
  'F BMA Schule'   :  'LF,LF,LF,LF,DLK,ELW 1,GW-A/AB-AS',
  'F BMA Schule N' :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,DLK,ELW 1,GW-A/AB-AS',
  
  'F Wald 1'       :  'LF,LF,LF,LF,LF,ELW 1,GW-L2,DLK',
  'F Wald 1 N'     :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-L2,DLK',	
  'F Wald 2'       :  'LF,LF,LF,LF,LF,LF,ELW 1,GW-L2',
  'F Wald 2 N'     :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,GW-L2',


  'Großbrand'      :  'LF,LF,LF,LF,LF,LF,LF,LF,DLK,ELW 1,TLF,GW-A/AB-AS,GW-L2',
  'Großbrand N'    :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,DLK,ELW 1,TLF,GW-A/AB-AS,GW-L2',

  'KFB FZ WF'      :  'LF,LF,LF,LF,LF,LF,LF,LF,LF,LF',
  'KFB FZ WT'      :  'LF,LF,LF,LF,LF,LF,LF,LF,LF,LF',
  'KFB LZR'        :  'LF,LF,LF,LF,LF,LF,LF,LF,LF,LF',


// Technische Hilfeleistungseinsätze  

  'H P Aufz'       :  'LF,RW 2/AB-Rü',
  'H P Aufz N'     :  'LF/LF-S,RW 2/AB-Rü',
  'H Chemie'       :  'GW-M,ELW 1,GW-G',
  'H Chemie N'     :  'GW-M,ELW 1,GW-G',
  'H Wasser Y'     :  'LF,GW-T',
  'H P Kl'         :  'LF,RW 2/AB-Rü,GW-Ö/AB-Öl',
  'H P Kl N'       :  'LF/LF-S,RW 2/AB-Rü,GW-Ö/AB-Öl',
  'H VU BauMa'     :  'LF/LF-S,LF/LF-S,ELW 1,FwK,GW-Ö/AB-Öl,RW 2/AB-Rü',
  'H Höhe'         :  'LF/LF-S,LF/LF-S,GW-H,DLK,RW 2/AB-Rü',
  'H VU HT'        :  'LF/LF-S,LF/LF-S,LF/LF-S,ELW 1,FwK,GW-H',
  'H Wasser Y'     :  'LF,GW-T',
  'H Wasser Y N'   :  'LF/LF-S,GW-T',

  'H Öl'           :  'LF,GW-Ö/AB-Öl',
  'H Öl N'         :  'LF/LF-S,GW-Ö/AB-Öl',
  'TH-Wasser1'     :  'LF,RW 2/AB-Rü,GW-T,FwK',
  'TH-Wasser1 N'   :  'LF/LF-S,RW 2/AB-Rü,GW-T,FwK',
  'H See'          :  'LF/LF-S,LF/LF-S,RW 2/AB-Rü,GW-T,FwK',

  'H1'             :  'LF',
  'H1 N'           :  'LF/LF-S',
  'H2'             :  'RW 2/AB-Rü,FwK,LF,LF',
  'H2 N'           :  'RW 2/AB-Rü,FwK,LF/LF-S,LF/LF-S',
  'H Gas'          :  'GW-M,ELW 1,GW-G,RW 2/AB-Rü',
  'H Gas N'        :  'GW-M,ELW 1,GW-G,RW 2/AB-Rü',
  'TH3'            :  'LF/LF-S,LF/LF-S,LF/LF-S',
  'TH-Chemie'      :  'LF,LF,LF,ELW 1,GW-M,GW-G',
  'Gasalarm'       :  'LF,LF,LF,ELW 1,RW 2/AB-Rü,GW-M,GW-G',
  'Gasalarm2'      :  'LF,LF,LF,GW-G,GW-M,DLK,ELW 1,RW 2/AB-Rü,GW-L2',
  'Gasalarm2 N'    :  'LF/LF-S,LF/LF-S,LF/LF-S,GW-G,GW-M,DLK,ELW 1,RW 2/AB-Rü,GW-L2',

  'H4 N'           :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S',

  'TH-GG'          :  'LF,LF,RW 2/AB-Rü,FwK,GW-A/AB-AS,GW-G,GW-M,ELW 1',
  'TH-GG N'        :  'LF/LF-S,LF/LF-S,RW 2/AB-Rü,FwK,GW-A/AB-AS,GW-G,GW-M,ELW 1',
  'TH-GG2'         :  'LF,LF,LF,LF,GW-M,GW-G,GW-A/AB-AS,GW-L2,ELW 1,GT',
  'TH-GG2 N'       :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,GW-M,GW-G,GW-A/AB-AS,GW-L2,ELW 1,GT',
  'TH-Schiene'     :  'LF/LF-S,LF/LF-S,RW 2/AB-Rü,GW-S,FwK,ELW 1',
  'TH-Schiene N'   :  'LF/LF-S,LF/LF-S,RW 2/AB-Rü,GW-S,FwK,ELW 1',
  'H VU LKW'       :  'LF,LF,RW 2/AB-Rü,FwK,ELW 1,DLK',
  'H VU LKW N'     :  'LF/LF-S,LF/LF-S,RW 2/AB-Rü,FwK,ELW 1,DLK',
  'H Gzug T'       :  'LF-S,LF-S,LF-S,GW-S,ELW 1,RW 2/AB-Rü,GW-A/AB-AS,GW-G,GW-M,GT',
  'H Gzug B'       :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,GW-G,GW-M,RW 2/AB-Rü,FwK,GW-S,ELW 1,GT',  
  'H Gzug'         :  'LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,LF/LF-S,GW-M,GW-G,ELW 1,GW-S,RW 2/AB-Rü,DLK,GT',
  'TH-GAS'         :  'LF,LF,LF,RW 2/AB-Rü,GW-G,GW-M,GW-A/AB-AS,ELW 1',
  'TH-GAS N'       :  'LF/LF-S,LF/LF-S,LF/LF-S,RW 2/AB-Rü,GW-G,GW-M,GW-A/AB-AS,ELW 1',
  'H Einsturz'     :  'LF,LF,DLK,RW 2/AB-Rü',
  
// Bootseinsätze
  'X1'             :  'Feuerlöschboot',
  'X2'             :  'Feuerlöschboot,Feuerlöschboot',

// Rettungszugeinsatz
  'RTZ-besetzen'   :  'LF/LF-S,LF/LF-S,LF/LF-S,DLK/FwK/RW 2/AB-Rü/ELW 1/GW-S/GW-A/AB-AS/TLF',
};
}

//
// usually no need to change anything below this line
//


//Einsatzgebiete
var locationArr = {
	// Sonderbebauung zuerst
	'<font color="#FF1100">Flughafen</font>'                   : {from: {x:  83, y: 179}, to: {x:  84, y: 180}},
	'<font color="#1865C9">Hafen</font>'                       : {from: {x:  98, y: 198}, to: {x: 100, y: 200}},
	'<font color="#1865C9">Rettungsbootanleger</font>'  : {from: {x:  97, y: 200}, to: {x: 97, y: 200}},
	'<font color="#FF00FF">Raffinerie</font>'                  : {from: {x:   6, y: 176}, to: {x:   7, y: 176}},
	'<font color="#8C4600">Hauptbahnhof</font>'                : {from: {x:  50, y: 152}, to: {x:  51, y: 152}},
	'<font color="#208000">Bahn Trasse West</font>'            : {from: {x:   1, y: 152}, to: {x: 49, y: 152}},
	'<font color="#208000">Bahn Trasse Ost</font>'             : {from: {x:   52, y: 152}, to: {x: 100, y: 152}},
	'<font color="#805F26">Tagebau</font>'                     : {from: {x:   17, y: 129}, to: {x: 20, y: 132}},
	'<font color="#805F26">Kohleförderband</font>'             : {from: {x:   21, y: 131}, to: {x: 24, y: 131}},
	'<font color="#805F26">Kohlekraftwerk</font>'              : {from: {x:   25, y: 130}, to: {x: 25, y: 131}},
	'<font color="#EDF516">Müllverbrennungsanlage</font>'      : {from: {x:   88, y: 124}, to: {x: 88, y: 125}},
	
	//Normaler Bereich
	'Altstadt'             : {from: {x:   1, y: 1},   to: {x: 100, y: 100}},
	'Neustadt'             : {from: {x:   1, y: 101}, to: {x: 100, y: 200}},

}


var Fahrzeugklassen = {
  // hier die verfügbaren Fahrzeugen mit ihrer Beschreibung und der Zuordnung 
  // zu einer Fahrzeugklasse auflisten. Fahrzeuge, die ihr eigener Typ sind 
  // (z.B. "RTW") brauchen hier nicht aufgeführt werden. (sie schaden aber auch nicht)

  'LF 20/16'           :   'LF'        ,
  'LF 20'              :   'LF'        ,
  'HLF 20/16'          :   'LF'        ,
  'LF 16-TS'           :   'LF'        ,
  'LF 10/6'            :   'LF'        ,
  'LF 10'              :   'LF'        ,
  'HLF 10/6'           :   'LF'        ,
  'LF 8'               :   'LF'        ,
  'Kleinlöschfahrzeug' :   'LF'        ,
  'TLF 16/25'          :   'LF'        ,
  'ELW 1'              :   'ELW 1'       ,  
  'TLF 20/40 - SL'     :   'TLF'       ,
  'DLA (K) 23/12'      :   'DLK'       ,
  'RW'                 :   'RW 2'        ,
  'Kran'               :   'FwK'       ,
  'GW-A'               :   'GW-A'      ,
  'GW-Öl'              :   'GW-Ö'      ,  
  'GW-L2 - Wasser'     :   'GW-L2'      ,
  'GW-Schiene'         :   'GW-S'      ,
  'GW-Taucher'         :   'GW-T'      ,
  'GW-Messtechnik'     :   'GW-M'      ,
  'GW-Gefahrgut'       :   'GW-G'      ,
  'Wechsellader'       :   'WLF'       ,
  'HLF 24/14-S'        :   'LF-S'       ,
  'RTW'                :   'RTW'       ,
  'Notarzteinsatzfahrzeug':   'NEF'   ,
  'Flugfeldlöschfahrzeug' :   'FLF'     ,
  'Rettungstreppe'     :   'RTF'       ,
  'GW-TUIS'            :   'GT'        ,
  'ULF mit Löscharm'   :   'ULF'       ,

  'GW-Höhenrettung'    :   'GW-H'       ,
  'Feuerlöschboot'     :   'Feuerlöschboot'        ,
  'Rettungsboot'       :   'Rettungsboot'        ,
  
  'AB-Einsatzleitung'  :   'AB-EL'        ,
};

// IDs der Fahrzeuge, wie Sebastian sie festgelegt hat
var fahrzeuge_ids = {
	1 :'undef',
	2 :'undef',
	3 :'ELW 1',
	4 :'DLK',
	5 :'GW-Ö',
	6 :'undef',
	7 :'TLF',
	8 :'GW-L2',
	9 :'undef',
	10:'GW-A',
	11:'RW 2',
	12:'GW-M',
	13:'GW-G',
	14:'undef',
	15:'RTW',
	16:'GW-S',
	17:'GW-T',
	18:'FwK',
	19:'FLF',
	20:'RTF',
	21:'undef',
	22:'undef',
	23:'undef',
	24:'undef',
	25:'GT',
	26:'ULF',
	27:'undef',
	28:'LF-S',
	29:'NEF',
	30:'GW-H',
	31:'undef',
	32:'undef',
	33:'WLF',
	34:'undef',
	35:'undef',
	36:'undef',
	37:'undef',
	38:'undef',
	39:'undef'
};

// IDs der Container
var ContainerIDs={
	1:'GW-Ö',
	2:'RW 2',
	3:'GW-A',
	4:'AB-EL',
	5:'GW-L2'
}

//Alle Fahrzeugtypen aufgelistet, nur mit Zahlenindex
var fahrzeugabkuerzungen = new Array('AB-WF','AB-Öl','AB-Rü','AB-AS','AB-EL','LF','RTW','NEF','ELW 1','TLF','DLK','RW 2','FwK','GW-A','GW-L2','GW-Ö','GW-S','GW-T','GW-M','GW-G','FLF','RTF','GT','GW-H','Feuerlöschboot','Rettungsboot','ULF','LF-S','RTZ','WLF','AB EL');

var Fahrzeuggeschwindigkeiten = {
  'Rettungstreppe'     :   65     ,
  'RTW'                :   75     ,
  'LF 10/6'            :   58     ,
  'LF 10'              :   58     ,
  'HLF 10/6'           :   58     ,
  'LF 20/16'           :   60     ,
  'LF 20'              :   60     ,
  'HLF 20/16'          :   60     ,
  'LF 8'               :   48     ,
  'Flugfeldlöschfahrzeug':  110     ,
  'Kleinlöschfahrzeug' :   60     ,
  'TLF 20/40 - SL'     :   49     ,
  'DLA (K) 23/12'      :   63     ,
  'ELW 1'              :   77     ,
  'LF 16-TS'           :   52     ,
  'RW'                 :   49     ,
  'GW-A'               :   56     ,
  'GW-L2 - Wasser'     :   53     ,
  'GW-Öl'              :   51     ,
  'GW-Schiene'         :   57     ,
  'GW-Gefahrgut'       :   46     ,
  'GW-Messtechnik'     :   40     ,
  'GW-Taucher'	       :   62     ,
  'Kran'               :   55     ,
  'Feuerlöschboot'     :   60     ,
  'GW-TUIS'            :   73     ,
  'ULF mit Löscharm'   :   40     ,
  'TLF 16/25'          :   55     ,
  'HLF 24/14-S'        :   60     ,
  'RTZ'                :   80     ,
  'NEF'                :   80     ,
  'GW-Höhenrettung'    :   55     ,
  'Wechsellader'       :   54     ,
  
  'AB-Einsatzleitung'  :   'AB-EL'        ,
};

// IDs der Fahrzeuge, wie Sebastian sie festgelegt hat
var fahrzeuge_ids = {
	1 :'undef',
	2 :'undef',
	3 :'ELW 1',
	4 :'DLK',
	5 :'GW-Ö',
	6 :'undef',
	7 :'TLF',
	8 :'GW-L2',
	9 :'undef',
	10:'GW-A',
	11:'RW 2',
	12:'GW-M',
	13:'GW-G',
	14:'undef',
	15:'RTW',
	16:'GW-S',
	17:'GW-T',
	18:'FwK',
	19:'FLF',
	20:'RTF',
	21:'undef',
	22:'undef',
	23:'undef',
	24:'undef',
	25:'GT',
	26:'ULF',
	27:'undef',
	28:'LF-S',
	29:'NEF',
	30:'GW-H',
	31:'undef',
	32:'undef',
	33:'WLF',
	34:'undef',
	35:'undef',
	36:'undef',
	37:'undef',
	38:'undef',
	39:'undef'
};

// IDs der Container
var ContainerIDs={
	1:'GW-Ö',
	2:'RW 2',
	3:'GW-A',
	4:'AB-EL',
	5:'GW-L2'
}

//Alle Fahrzeugtypen aufgelistet, nur mit Zahlenindex
var fahrzeugabkuerzungen = new Array('AB-WF','AB-Öl','AB-Rü','AB-AS','AB-EL','LF','RTW','NEF','ELW 1','TLF','DLK','RW 2','FwK','GW-A','GW-L2','GW-Ö','GW-S','GW-T','GW-M','GW-G','FLF','RTF','GT','GW-H','Feuerlöschboot','Rettungsboot','ULF','LF-S','RTZ','WLF','AB EL');

var Fahrzeuggeschwindigkeiten = {
  'Rettungstreppe'     :   65     ,
  'RTW'                :   75     ,
  'LF 10/6'            :   58     ,
  'LF 10'              :   58     ,
  'HLF 10/6'           :   58     ,
  'LF 20/16'           :   60     ,
  'LF 20'              :   60     ,
  'HLF 20/16'          :   60     ,
  'LF 8'               :   48     ,
  'Flugfeldlöschfahrzeug':  110     ,
  'Kleinlöschfahrzeug' :   60     ,
  'TLF 20/40 - SL'     :   49     ,
  'DLA (K) 23/12'      :   63     ,
  'ELW 1'              :   77     ,
  'LF 16-TS'           :   52     ,
  'RW'                 :   49     ,
  'GW-A'               :   56     ,
  'GW-L2 - Wasser'     :   53     ,
  'GW-Öl'              :   51     ,
  'GW-Schiene'         :   57     ,
  'GW-Gefahrgut'       :   46     ,
  'GW-Messtechnik'     :   40     ,
  'GW-Taucher'	       :   62     ,
  'Kran'               :   55     ,
  'Feuerlöschboot'     :   60     ,
  'GW-TUIS'            :   73     ,
  'ULF mit Löscharm'   :   40     ,
  'TLF 16/25'          :   55     ,
  'HLF 24/14-S'        :   60     ,
  'RTZ'                :   80     ,
  'NEF'                :   80     ,
  'GW-Höhenrettung'    :   55     ,
  'Wechsellader'       :   54     ,
  
  'AB-Öl'              :   54     ,
  'AB-Rüst'            :   54     ,
  'AB-Atemschutz'      :   54     ,
  'AB-Einsatzleitung'  :   54     ,

};

var Nachforderungen = {
/*
  an alle Script-Anpasser:
  die Erkennung von Nachforderungen wurde überarbeitet, so dass nun die große Liste nicht mehr nötig ist.
  Die Erkennung läuft nun so, dass automatisch eine Nachforderung erkannt wird, wenn die exakte Beschreibung
  des Fahrzeuges (also z.B. "DLA (K) 23/12" und nicht nur "DL") in einer Rückmeldung von der Einsatzstelle
  erscheint. Der RW wird da auch richtig erkannt, weil auf Groß/Kleinschreibung geachtet wird, also eine Meldung
  "...für erweiterte Hilfeleistung..." wird da nicht als RW-Anforderung bewertet.
  
  Da die Rückmeldungstexte beim GW-L2-Wasser uneinheitlich sind, müssen diese weiterhin hier in der Liste
  aufgeführt werden.
*/
  "Hier muss Wasser über weite Wegstrecken transportiert werden. Wir benötigen einen GW-L2 Wasser." : "GW-L2",

  "Das Feuer ist weiter ausserhalb und alle Wasserreserven sind aufgebraucht. Wir brauchen einen GW-L2 -Wasser um weitere Schläuche verlegen zu können." : "GW-L2",

  "Um Leitungen über weite Strecken legen zu können, benötigen wir einen GW - L2 - Wasser." : "GW-L2",

  "Wir benötigen Material vom Rüstwagen (RW)!" : "RW",
};


var Strassennamen = new Array(
  //
  // Hier die Strassennamen festlegen, 
  // WICHTIG:
  // MINDESTENS 99 Straßen eintragen
  // MAXMIMAL 999 Strassen eintragen !!!!!
  //
'Rolug´s Bochumer Straße','Rolug´s Landwehr Weg','Platz der Einheit','Rolug´s Am Neumarkt',
'Traindriver´s Liebfrauenweg','Traindriver´s Klosterstraße','Hogsmeader Tor','An der Grossbaustelle','Am schiefen Turm von Alderkerk',
'Am Lockschuppen','Strasse zum keinen Mann','HelpMe´s Strasse zum Kummerkasten','Strasse des Nachwuchs','HelpMe´s Strasse der Weltherschaft',
'Jahnstraße','Zur Landwehr Arena','Dorfstraße','Hochstraße','Kempener Landstraße','Kempener AlleeRingstraße','Rahmer Kirchweg',
'Umgehungsstraße','Gastendonkerweg','Ackermannsfeld','Bruyersweg','Rosenweg','Straße am Papierwerk',
'Am Güterbahnhof','Am Flughafen','Hafenstraße','An der Raffinerie','Sperrgebiet','Drei-Besen-Straße','Gründer-Axel-Straße','Verbandsautobahn', 
'Straße der Freundschaft','Straße zum Therapiezentrum','Winkelgasse','Hexenallee','Zauberweg','Co-Amtsleiter Platz','Co-Haifi Garten', 
'Co-Tatelot Berg','Co-michioauso Weg','Co-Feuerwehrfrau1987 Tal','Co-Doomtrain64 Hügel','Co-Claymore See','Muggelweg','Snape-Gasse', 
'Joanne-K.-Rowling-Ehrenallee','Dumbledore-Gedächtnis-Allee','Professor-Flitwick-Weg','Hausmeister-Filch-Gasse','Straße zum Hagrid-Hügel', 
'Professor-Lockhart-Straße','Lupin-Gasse','Werwolf-Weg','Professor-Moody-Weg','Horace-Slughorn-Weg','Madame-Pomfrey-Feld', 
'Professor-Sprout-Gasse','Sybill-Trelawney-Denkerweg','Dolores-Umbridge-Schmerzstraße','Dobby’s Weg','Ligusterweg','Ministeriumweg', 
'Little-Whinging-Straße','Harry-Potter-Allee','Meikes Eispalast','Lord-Voldemort-Hass-Straße','Horcrux-Straße','Lucius-Malfoy-Gasse', 
'Straße-Des-Brotes','Landwirtschaftsweg','Hogsmeadeallee','Hermine-Granger-Weg','Am Hagrid-Hügel','Ronald-Weasley-Straße', 
'Professor-McGonnagall-Allee','Professor-Quirrel-Weg','Professor-Raue-Pritsche-Gasse','Professor-Binns-Weg','Professor-Hooch-Straße', 
'Professor-Dippet-Weg','Bibliothekarin-Pince-Gasse','Godric-Gryffindor-Allee','Helga-Hufflepuff-Allee','Rowena-Ravenclaw-Allee', 
'Salazar-Slytherin-Allee','Draco-Malfoy-Gasse','Vincent-Crabbe-Weg','Gregory-Goyle-Straße','Pansy-Parkinson-Weg','Katie-Bell-Gasse', 
'Lavender-Brown-Straße','Collin-Creevey-Weg','Dennis-Creevey-Gasse','Seamus-Finnigan-Straße','Angelina-Johnson-Weg', 
'Neville-Longbottom-Tanzgasse','Cormac-McLaggen-Straße','Parvati-Patil-Weg','Dean-Thomas-Gasse','Ginny-Weasley-Straße','Fred-Weasley-Weg', 
'George-Weasley-Gasse','Lee-Jordan-Straße','Percy-Weasley-Weg','Oliver-Wood-Gasse','Cho-Chang-Straße','Luna-Lovegoods-Traumweg', 
'Padma-Patil-Platz','Hannah-Abbot-Weg','Cedric-Diggory-Gedenkstraße','Justin-Finch-Fletchley-Platz','Ernie-McMillan-Weg', 
'Viktor-Krum-Flugplatz','An Fleur-Delacours-Schönheitsfarm','Sirius-Black-Straße','Regulus-Black-Weg','Bellatrix-Lestrange-Gasse', 
'Narzissa-Malfoy-Platz','Nymphadora-Tonks-Straße','Aberforth-Dumbledore-Weg','Percival-Dumbledore-Platz','Kendra-Dumbledore-Gasse', 
'Ariana-Dumbledore-Straße','Gindelwald-Weg','Frank-Longbottom-Platz','Alice-Longbottom-Straße','Algie-Longbottom-Weg','Enid-Longbottom-Gasse', 
'James-Potter-Allee','Lily-Potter-Ehrenplatz','Arthur-Weasley-Straße','Molly-Weasley-Weg','Bill-Weasley-Gasse','Charlie-Weasley-Straße', 
'Muriel-Weasley-Weg','Straße am Fuchsbau','Nokturngasse','Straße zum Tropfenden Kessel','Ollivander’s Zauberstaballee','Flohpulverallee',
 'Grimmauldplatz','Straße am verbotenen Wald','Zum Honigtopf','An der Heulenden Hütte','Beim Postamt','Weg am See','Straße der Weisen', 
 'Zum Eberkopf','Zonkos Scherzartikelstraße','Koboldallee','Gringotts Verliesstraße','King’s Cross','Arabella-Figg-Weg', 
 'Mundungus-Fletcher-Gasse','Kingsley-Shacklebolt-Platz','Todesser-Allee','Cornelius-Fudge-Weg','Rufus-Scrimgeaour-Straße', 
 'Bartemius-Crouch-Senior-Platz','Ludo-Bagman-Gasse','Vorlost-Gaunt-Allee','Morfin-Gaunt-Weg','Merope-Gaunt-Straße','Madame-Rosmerta-Platz', 
 'Olympe-Maxime-Gasse','Rita-Kimmkorn-Quasselraum','Xenophilius-Lovegood-Wald','Bthilda-Bagshot-Weg','Dudley-Dursley-Futterplatz', 
 'Vernon-Dursley-Schreigasse','Petunia-Dursley-Feld','Magnolienring','Spinners End','Vauxhall Road','Magda-Dursley-Flugplatz', 
 'Geisterallee','Blutige-Baronstraße','Die Graue-Damen-Straße','Peeves’-Polterecke','Myrtes-Maulweg','Dementorgasse','Goldregenweg', 
 'Sprechender-Hut-Allee','Zentaur-Straße','Koboldplatz','Melderweg','Leitstellengasse','Feuerplatz','Gryffindor-Allee','Hufflepuff-Allee', 
 'Ravenclaw-Allee','Slytherin-Allee','Weg zum Schulleiterbüro','Wasserspeierstraße','Brandstraße','Godric’s-Hollow-Straße', 
 'Schlacht-um-HoGW-Arts-Straße','Gemeinschaftsraumstraße-Gryffindor','Gemeinschaftsraumstraße-Hufflepuff','Gemeinschaftsraumstraße-Ravenclaw', 
 'Gemeinschaftsraumstraße-Slytherin','Große-Halle-Weg','U-Bahn-Station-Straße','Einsatzallee','Hilfeleistungsweg','Rettungsgasse',
 'Rätselstraße','An der heulenden Hütte','Küchenweg von HoGW-Arts','Anleitungsgasse','Scriptweg','An der bösen Wunschfee', 
 'I’m-With-Stupid-Straße','Bierweg','Rauchergasse','Weg zur Kammer des Schreckens','Straße zu Madame Puddifoot’s', 
 'Gasse zu Flourish und Blotts','Madam-Malkin-Platz','Platz der Zauberscherze','Eeylopweg','Weg zur magischen Tierhandlung', 
 'Borgin-und-Burkesweg','Zur Ministeriumszentrale','Zur Magischen Strafverfolgung','Zum Büro gegen Missbrauch von Magie', 
 'Zur Aurorenzentrale','Zum Zaubergamot-Verwaltungsdienst','Zum Büro gegen den Missbrauch von Muggelartefakten', 
 'Weg der Magischen Unfälle und Katastrophen','Zum Kommando für die Umkehr verunglückter Magie','Zur Vergissmich-Zentrale', 
 'Zum Komitee für Muggelgerechte Entschuldigungen','Zur Führung und Aufsicht Magischer Geschöpfe', 
 'Zur Tierwesen-, Zauberwesen- und Geisterbehörde','Zum Koboldverbindungsbüro','Zum Seuchenberatungsbüro', 
 'Platz der Internationalen Magischen Zusammenarbeit','Zum Internationalen Magischen Handelsstandardausschuss', 
 'Zum Internationalen Büro für Magisches Recht','Zur Britischen Sektion der Internationalen Zauberervereinigung', 
 'Zum Magischen Transportwesen','Zur Flohnetzwerkaufsicht','Zum Besenregulationskontrollamt','Zum Portschlüsselbüro', 
 'Zum Appariertestzentrum','Zu den Magischen Spielen und Sportarten','Zur Zentrale der Britischen und Irischen Quidditch-Liga', 
 'Zum Offiziellen Koboldstein-Klub','Zum Büro für Lächerliche Patente','Zur Empfangshalle','Zur Mysteriumsabteilung', 
 'Zur Halle der Prophezeiungen','Zum Raum des Todes','Zum Raum der Zeit','Zum Raum der Gedanken','Zum Raum der Liebe', 
 'Zu den Gerichtssälen','Zum Zaubergamot','Weg nach Askaban','Weg zum Fuchsbau','Little-Hangeton-Straße','Nurmengard-Straße', 
 'Zum Raum der Wünsche','Igor-Karkaroff-Straße','Albus-Dumbledore-Weg','Harry-Potter-Und-Der-Stein-Der-Weisen-Straße', 
 'Harry-Potter-Und-Die-Kammer-Des-Schreckens-Weg','Harry-Potter-Und-Der-Gefangene-Von-Askaban-Gasse','Harry-Potter-Und-Der-Feuerkelch-Platz',
 'Harry-Potter-Und-Der-Orden-Des-Phönix-Straße','Harry-Potter-Und-Der-Halbblutprinz-Weg','Harry-Potter-Und-Die-Heiligtümer-Des-Todes-Gasse',
 'Ölspur-Straße','Hedwig-Allee','Fluffy-Weg','Geraldine-Agnew-Sommerville-Straße','Chase-Armitage-Weg','Robert-Ayres-Gasse', 
 'Allee zum heiligen Axel','Afshad-Ayres-Allee','Daisy-Bates-Weg','Meister Haruspex Platz','Rettungsweg','TeamSpeak Arena',
 'Zum Bahnhof des HoGW-Arts-Express','Du-weißt-schon-wer-Hass-Weg','Milchstraße','Du-weißt-schon-wer-Hass-Weg','Rucky´s Zingster Strasse',
 'Rucky´s Frankfurter Allee','Rucky´s Luisenstrasse','Snake´s Feuerbachstraße','Eumels Wiese','Eumelhausener Straße','Gnuweg'
 ,'Straße am Adlerschutzgebiet','Tutorengasse','An der Polizeiwache','Garbsener Landstraße','Straße des 16.März 2012','Strasse zum 16ten März',
 'Danzinger Platz','Wache am Park','Dianastrasse'
 
);

var Fahrzeugbedingungen = {
	// Syntax: AlleFeuerwachen|Berufsfeuerwehren
  'LF'    : '1|0',
  'WLF'   : '1|0',
  'DLK'   : '3|0',
  'RW 2'  : '4|0',  
  'GW-Ö'  : '4|0',
  'ELW 1' : '5|0',
  'GW-L2' : '5|0',
  'FwK'   : '5|0',
  'TLF'   : '7|0',  
  'GW-A'  : '10|0',
  'GW-S'  : '20|0',
  'GT'  : '64|0',
  'GW-G'  : '0|2',
  'GW-M'  : '0|2',
  'RTW'   : '0|10',
  'GW-T'  : '0|25',
  'FLF'   : '0|55',
  'RTF'   : '0|55',
  'ULF'   : '64|0',
  'LF-S'  : '50|0',
  'RTZ'   : '50|0',
  'GW-H'  : '50|0',
  'Feuerlöschboot'  : '0|30',
  'Rettungsboot'    : '0|50',
  'AB-Öl'           : '1|0',
  'AB-Rü'           : '1|0',
  'AB-AS'           : '1|0',
  'AB-EL'           : '1|0',

};

//
// really no need to change anything below
//
//
// really no need to change anything below
//
//
// ...unless you know what you do...
//

var ToAlarm       = new Array;
var Einsatzklasse;
var Optional      = new Array;
var Unterwegs     = new Array;
var AmOrt         = new Array;
var AufAnfahrt    = new Array;
var Wartend       = new Array;
var NichtVerf     = new Array;
var ichBins;
var FirstRun      =true;
var CBClicked     =false;
var debugging;
var machVorschlag=true;
var zweiterAbmarsch=GM_getValue("zweiterAbmarsch",0);
var alarmtyp=GM_getValue("alarmtyp",0);
var AlleGleich;
var showInfoRTWplus;
var showInfoKlasseInListe;
var showInfoEinsatzNr,InfotextEinsatzNr;
var showInfoEinsatzort,InfotextEinsatzort;
var showInfoEinsatzgebiet,InfotextEinsatzgebiet;
var showInfoStichwort,InfotextStichwort;
var showInfoKlasse,InfotextKlasse;
var showInfoKlassenalarm,InfotextKlassenalarm;
var showInfoKlassenalarmOpt,InfotextKlassenalarmOpt;
var showInfoRTW,InfotextRTW;
var showInfoUnterwegs,InfotextUnterwegs;
var showInfoNachforderungen,InfotextNachforderungen;
var showInfoToAlarm,InfotextToAlarm;
var showInfoFahrzeit,InfotextFahrzeit;
var showInfoFahrzeitOpt,InfotextFahrzeitOpt;
var showInfoNichtVerfuegbar,InfotextNichtVerfuegbar;
var showInfoVerfuegbar,InfotextVerfuegbar;
var ScriptUpdateAvailable="";
var adr = document.location.href;
var showInfoKdoW;
var manv_sound;
var showInfoVerbandSound;
var showInfoProbeSound;
var alarm_sound;
var vgsl_sound;
var showInfoOptionalAnkreuzen;
var showInfoAnchorEinsatz;
var showInfoSaison;
var updateSetting;
var soundplayed='';

var showAnzahlFW,AnzahlFW;
var showAnzahlBF,AnzahlBF;

//var jQuery = unsafeWindow.jQuery;

init();
main();

function main()
{ 
	mylog("main\nadr=" + adr);
	
	ichBins = true;

	if (adr == "http://www.feuerwache.net/feuerwehr-einsaetze")
	{ bearbeiteÜbersichtsseite(); }
	else if (adr == "http://www.feuerwache.net/feuerwehrleitstelle")
	{ bearbeiteLeitstelle(); }
	else if (adr == "http://www.feuerwache.net/feuerwehrfahrzeuge")
	{ bearbeiteFahrzeugliste(); }
	else if (adr == "http://www.feuerwache.net/feuerwachen/werbeaktion")
	{ bearbeiteWerbeaktion(); }
	else if (adr == "http://www.feuerwache.net/feuerwachen")
	{ bearbeiteFeuerwachenliste(); }
	else if (adr.match("funk"))
	{ bearbeiteFunk(); }
	else if (adr == "http://www.feuerwache.net/personal/list")
	{ bearbeitePersonaltabellen(); }
	else if (adr.match("http://www.feuerwache.net/feuerwachen/.*/feuerwehrleute"))
	{ bearbeitePersonaltabellen(); }
	else if (adr.match("http://www.feuerwache.net/feuerwachen/.*/feuerwehrautos"))
	{ bearbeiteWacheFahrzeugliste(); }
	else if (adr.match("http://www.feuerwache.net/vehicle/show/caption_url/kdow"))
	{ bearbeiteKdow(); }
	else if (adr.match("http://www.feuerwache.net/vehicle/show/caption_url/*"))
	{ bearbeiteFahrzeugkauf(); }
    else if (adr.match("http://www.feuerwache.net/container/show/caption_url/*"))
	{ bearbeiteFahrzeugkauf(); }
	else if (adr.match("http://www.feuerwache.net/feuerwehrfahrzeuge/[0-9]*/verschieben"))
	{ bearbeiteVerschieben(); }
	else if (adr.match("http://www.feuerwache.net/building_to_user/show/id/*"))
	{ bearbeiteSingleGebaeude(); }
	else if (adr.match("http://www.feuerwache.net/feuerwehr-einsaetze/[0-9]*"))
	{ bearbeiteEinsatzseite(); }
	else if (adr.match("http://www.feuerwache.net/feuerwehrfahrzeuge/[0-9]*/bearbeiten"))
	{ bearbeiteFahrzeugseite(); }
	else if (adr.match("http://www.feuerwache.net/event_logfile/*"))
	{ bearbeiteLogFile(); }
	else if (adr.match("http://www.feuerwache.net/startseite/*"))
	{ bearbeiteStartseite(); }
	else if (adr.match("http://www.feuerwache.net/feuerwehrfahrzeuge_markt"))
	{ bearbeiteFahrzeugMarkt(); }
	else if (adr == "http://www.feuerwache.net/Script-Konfig")
	{ bearbeiteKonfig(); }
	else if (adr.match("http://www.feuerwache.net/gebaeude"))
	{ bearbeiteGebaeude(); }
	else if (adr == "http://www.feuerwache.net/about")
	{ bearbeiteAbout(); }
	else if (adr == "http://www.feuerwache.net/auftraege")
	{ bearbeiteAuftragsliste(); }
	else if (adr.match("http://www.feuerwache.net/verband/*"))
	{ bearbeiteVerband(); }
	else if (adr == "http://www.feuerwache.net/feuerwache/campaign")
	{ bearbeiteCampaign(); }

	ichBins = false;
}

function clickCheckbox(box) {
	if ( box.getAttribute("disabled") != true ) {
		box.click();
		jQuery('#'+box.id).trigger("change" );
	}
}

function createText(text)
{
	return document.createTextNode(text);
}

// Beschreibung des Einsatzgebietes ermitteln
function getAreaDescription(x, y) { 
	var locArr = [];
	for (loc in locationArr) { 
		if (locationArr[loc].from.x <= x &&
			locationArr[loc].from.y <= y &&
			locationArr[loc].to.x >= x &&
			locationArr[loc].to.y >= y)
		{ locArr.push(loc); }
	}
	return locArr.join(', ');
}

function bearbeiteFahrzeugseite()
{ // Fahrzeug bearbeiten

	var nodeCaption = document.getElementById("caption");
	var nodeTD = createElement("td");
	nodeCaption.parentNode.parentNode.insertBefore(nodeTD,nodeCaption.parentNode.nextSibling);
  
  
	var nodeScript = createElement('script',
									{'type': 'text/javascript'});
	nodeScript.innerHTML = "function ToggleStatus6()\n\
							{\n\
							var I=document.getElementById('caption');\n\
							var FN=I.value;\n\
							if (FN.substr(0,4).toUpperCase()=='XXX ')\n\
							{ I.value = FN.substr(4,FN.length-4); }\n\
							else { I.value = 'XXX ' + FN; }\n\}";
	nodeTD.appendChild(nodeScript);
	var nodeA = createElement('a',{'href': 'javascript:ToggleStatus6();'});
							
	nodeTD.appendChild(nodeA);
	nodeA.appendChild(createText('Fahrzeug in/außer Dienst stellen'));
}

// fasst mehrere Fahrzeuge mit Anzahl zusammen: LF, LF -> 2LF
function condenseFahrzeugliste(fListeArr){
	var fCumArr = new Array;
	var fListeTxt = '';

  // Einträge je Fahrzeug zählen (Fahrzeuge mit Alternativen werden separat gezählt)
    // für Alternativen bestimmen, wo sie einsortiert werden sollen
	var fhz=fListeArr;

	for (var i=0;i < fhz.length;i++){
		var f = '';
		var altFhz = fhz[i].split('/');

		if (altFhz.length > 1) f = altFhz[0];
		else f = fhz[i];

		if (fCumArr[f] == undefined) {
			fCumArr[f] = new Array;
			fCumArr[f].value = 1;
			fCumArr[f].vehicles = fhz[i];
		}
		else {
        fCumArr[f].value++;
      }
    }
	
	for (var i=0;i < fahrzeugabkuerzungen.length;i++) {
	fSeq=fahrzeugabkuerzungen[i];
	if (fCumArr[fSeq] == undefined)
      {
        continue;
      }

      if (fListeTxt != '')
      {
        fListeTxt += ',';
      }

      if (fCumArr[fSeq].value == 1)
      {
        fListeTxt += fCumArr[fSeq].vehicles;
      }
      else
      {
        var anzTxt = fCumArr[fSeq].value.toString();
        fListeTxt += anzTxt + fCumArr[fSeq].vehicles;
      }
    }
  return fListeTxt;
}

function bearbeiteLogFile() { 
	var TRs = document.getElementById("content").getElementsByTagName("tbody")[0].getElementsByTagName("tr"); {
	var AnzNotruf  = 0, AnzFehl     = 0, AnzErledigt = 0;
	for (i=0;i<TRs.length;i++) {
		var TR = TRs[i];
		var TD = TR.getElementsByTagName("td")[0];
		var H = TD.innerHTML;
		var Hstr = new String;
		Hstr = H;
		if (Hstr.match("Fehleinsatz:") != null ) { 
			AnzFehl++;
			H = "<font color='orange'>"+H+"</font>";
		} 
		else if (Hstr.match("Notruf:") != null ) { 
			AnzNotruf++;
			H = "<font color='red'>"+H+"</font>"; 
					}
					else if (Hstr.match("Einsatz abgearbeitet:") != null ) { 
						AnzErledigt++;
						H = "<font color='green'>"+H+"</font>";
					}
					TD.innerHTML = H;
				}
		}
		var ret;
		var Fehlquote;
		Fehlquote = (100/(AnzErledigt+AnzFehl))*AnzFehl
		if (AnzFehl == 0) { Fehlquote = 0 }
		ret =  "<table class='defaultTable'><tr>";
		ret += "<th colspan='2'>Auswertung der aktuellen Logfile Seite:</th></tr>\n";
		ret += "<tr><th>neue Notrufe</th><td style='width:365px;'><font color='red'><b>" + AnzNotruf + "</b></font></td></tr>\n";
		ret += "<tr><th>Einsätze erledigt</th><td> <font color='green'><b>" + AnzErledigt + "</b></font></td></tr>\n";
	  ret += "<tr><th>Fehleinsätze</th><td><font color='orange'><b>" + AnzFehl + "</b></font></td></tr>\n";
	  ret += "<tr><th>Quote Fehleinsätze</th><td><b>" + Fehlquote.toFixed(2) + "%</b></td></tr>\n";
	  ret += "</table><br>\n";
	  var main, newElement;
	  main = document.getElementsByTagName("h1")[0];
	  newElement = document.createElement('p');
	  main.parentNode.insertBefore(newElement, main.nextSibling);
	  newElement.innerHTML = ret;
}

function bearbeiteFahrzeugkauf() {
	var div=document.getElementById("content")
	var h1=div.getElementsByTagName("h1")[0];
	var h1c=h1.firstChild.nodeValue

	h1c=h1c.replace('/','_');
	h1c=h1c.replace(' ','');
	var img=createElement('img',
							{'src'  : 'http://www.hogsmeade-verband.net/Fahrzeugmarkt/'+h1c+'.jpg',
							'alt'  : 'Fahrzeugbild '+h1c });
							 
	var owndiv = createElement('div',
                              {'id'   : 'picture',
                              'style': 'text-align:center'});
	var divpos=div.insertBefore(owndiv,h1);
	divpos.appendChild(createElement('br'));
	divpos.appendChild(createElement('br'));
	divpos.appendChild(img);
	divpos.appendChild(createElement('br'));

	var FRM = document.getElementsByTagName("form")[0];
	if (!FRM) return;
	var TB = FRM.getElementsByTagName("table")[1];
	if (!TB) return;
	var TR = TB.getElementsByTagName("tr")[2];
	if (!TR) return;
	var TD = TR.getElementsByTagName("td")[1];
	if (!TD) return;
	
	var Par=TD.getElementsByTagName("p");
	for (var i=0;i < Par.length;i++) { 
		if (Par[i].innerHTML.match("Diese Feuerwache kann keine Fahrzeuge mehr aufnehmen")) Par[i].style.display = "none";
		if (Par[i].innerHTML.match("Zuwenig bzw. keine Stellplätze für Rettungswagen")) Par[i].style.display = "none";
		if (Par[i].innerHTML.match("Zuwenig bzw. keine Stellplätze für ein Notarztfahrzeug")) Par[i].style.display = "none";
		if (Par[i].innerHTML.match("Diese Feuerwache kann keine Abrollbehälter mehr aufnehmen")) Par[i].style.display = "none";
	}
}

function bearbeiteVerschieben() {
	var FRM = document.getElementsByTagName("form")[0];
	if (!FRM) return;
	var TB = FRM.getElementsByTagName("table")[0];
	if (!TB) return;
	var TR = TB.getElementsByTagName("tr")[2];
	if (!TR) return;
	var TD = TR.getElementsByTagName("td")[0];
	if (!TD) return;

	var Par=TD.getElementsByTagName("p");
	for (var i=0;i < Par.length;i++) { 
		if (Par[i].innerHTML.match("Diese Feuerwache kann keine Fahrzeuge mehr aufnehmen")) Par[i].style.display = "none";
		if (Par[i].innerHTML.match("Zuwenig bzw. keine Stellplätze für Rettungswagen")) Par[i].style.display = "none";
	}
}

function bearbeiteWacheFahrzeugliste() { 
	var DC = document.getElementById("content");
	var TBs = DC.getElementsByClassName("defaultTable");
	var H2s = DC.getElementsByTagName("h2");

	H2=H2s;
	for (var i=0;i<H2.length;i++) { 
		var A = H2[i].getElementsByTagName("a")[0];
		if (A){
			var FWLink = A.href;
			H2[i].innerHTML += "&nbsp;&nbsp;<a href='" + FWLink + "/feuerwehrleute'><font size='-1'>(Personal)</font></a>";
		}
	}
}

function bearbeiteFeuerwachenliste(){
	document.getElementsByTagName('table')[1].getElementsByTagName("th")[0].setAttribute('style','width:35px; !important;');
	
	var TRs = document.getElementById("content").getElementsByTagName("tbody")[1].getElementsByTagName("tr");
	for (i=0;i<TRs.length;i++){ 
		var TR=TRs[i];
		var TD = TR.getElementsByTagName("td")[1];
		var L = TD.getElementsByTagName("a")[0];
    
		var img = TRs[i].getElementsByTagName("td")[0].getElementsByTagName("img")[0];
		img.setAttribute('src', img.getAttribute('src').replace(/\/map\//, '/map_25/'));
	
		// Spalte Fahrzeuge
		var TD = TR.getElementsByTagName("td")[3];
		var H1 = TD.getElementsByTagName("a")[0].innerHTML;
		var H2 = TD.innerHTML.split(" / ")[1];
		var H = "&nbsp;" + H1 + " / " + H2 + "&nbsp;" ;
		if (parseInt(H1) != parseInt(H2)) H = "<font color='orange'>"+H+"</font>";
		H = "<a href='" + L + "/feuerwehrautos'>" + H + "</a>";
		TD.innerHTML = H;

		// Spalte Rettungswagen
		TD = TR.getElementsByTagName("td")[4];
		H = TD.innerHTML;
		H2 = H.split("/");
		if (parseInt(H2[0]) != parseInt(H2[1])) H = "<font color='orange'>"+H+"</font>";
		TD.innerHTML = H;

		// Spalte Feuerwehrleute
		TD = TR.getElementsByTagName("td")[7];
		var A = TD.getElementsByTagName("a")[0];
		A.innerHTML = "&nbsp;" + A.innerHTML + "&nbsp;";

		// Spalte Stufe
		TD = TR.getElementsByTagName("td")[8];
		TD.style.textAlign = "left";
		H = TD.innerHTML;
		if (parseInt(H) < 5) H += "&nbsp;<a href='" + L + "/ausbauen'>&nbsp;+&nbsp;</a>";
		TD.innerHTML = H;
	}
}

function bearbeiteLeitstelle(){
	var DC = document.getElementById("content");
	var TBs = DC.getElementsByClassName("defaultTable");
	var H2s = DC.getElementsByTagName("h2");

	var H2=H2s;
	for (var i=0;i<H2.length;i++){ 
		var A = H2.getElementsByTagName("a")[0];
		if (A){
			var FWLink = A.href;
			H2.innerHTML += "<br><a href='" + FWLink + "/feuerwehrleute'><font size='-1'>Personal</font></a>";
			H2.innerHTML += "&nbsp/&nbsp<a href='" + FWLink + "/feuerwehrautos'><font size='-1'>Fahrzeuge</font></a>";
		}
	}
}

function bearbeitePersonaltabellen(){
	var DC = document.getElementById("content");
	var TBs = DC.getElementsByClassName("defaultTable");
	var H2s = DC.getElementsByTagName("h2");

	for (var i=0; i<TBs.length; i++){ 
		var TB=TBs[i];
  
		var T = BearbeitePersonaltabelle(TB);

		if (T != ""){ 
			var FWStat = document.createElement("div")
			TB.parentNode.insertBefore(FWStat,TB);
			FWStat.innerHTML = T;
		}
    
		var H2 = H2s[i];
		var A = H2.getElementsByTagName("a")[0];
		var FWLink = A.href;
		H2.innerHTML += "&nbsp&nbsp<a href='" + FWLink + "/feuerwehrautos'><font size='-1'>(Fahrzeuge)</font></a>";
	}
  
	// vor der ersten Überschrift Default-Sortierung anbieten:
	if (!document.getElementById("DefaultSort")){
		var div = document.createElement("div");
		div.style.paddingBottom = "10px";
		div.innerHTML = "Standard-Sortierung: ";
		var H1 = document.getElementsByTagName("h1")[0];
		if (!H1) H1 = document.getElementsByTagName("h2")[0];
		H1.parentNode.insertBefore(div,H1);
		
		var SEL = document.createElement("select");
		SEL.id = "DefaultSort";
		  
		var newoption = document.createElement('option');
		newoption.value = "-1";
		newoption.innerHTML = '(unsortiert)';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);

		var newoption = document.createElement('option');
		newoption.innerHTML = 'Name';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Motivation';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Fähigkeiten';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Alter';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Ausbildung';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Status';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Schicht';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);

		
		/*SEL.options[SEL.length] = new Option("(unsortiert)","-1");
		SEL.options[SEL.length] = new Option("Name","Name");
		SEL.options[SEL.length] = new Option("Motivation","Motivation");
		SEL.options[SEL.length] = new Option("Fähigkeiten");
		SEL.options[SEL.length] = new Option("Alter");
		SEL.options[SEL.length] = new Option("Ausbildung");
		SEL.options[SEL.length] = new Option("Status");
		SEL.options[SEL.length] = new Option("Schicht");*/
		div.appendChild(SEL);

		document.getElementById("DefaultSort").addEventListener( "change" , DefaultSortChanged , true );
	}
	var SEL = document.getElementById("DefaultSort");
	SEL.value = GM_getValue("DefaultTabSort","-1");
}

function DefaultSortChanged() { 
	var S = document.getElementById('DefaultSort').value
	GM_setValue("DefaultTabSort",S);
}

function sortPersonalLehrgang() {
	var TBs = document.getElementsByClassName("defaultTable");
	for (var i=1; i<TBs.length; i++){ 
		var TB=TBs[i];
 
	//	MachSortierbar(TB);
		var DefSort = document.getElementById("DefaultSort").value;
		if (DefSort != "-1") SortiereNachSpalte(TB,DefSort)
	}
}

var timeout_buildings;
function open_all_buildings() {
	document.getElementById('abort_link').style.display="block";
	var links=document.getElementsByName("building")[0].getElementsByTagName("a");
	for (var i=0; i<links.length; i++){
		if ( links[i].innerHTML == 'Feuerwehrleute anzeigen') {
			links[i].click();
			timeout_buildings=window.setTimeout(open_all_buildings, 1500);
			break;
		}
	}
}

function clear_timeout_buildings(){
	window.clearTimeout(timeout_buildings);
	document.getElementById('abort_link').style.display="none";
}

function bearbeiteLehrgangszuteilung(){
	// vor der ersten Überschrift Default-Sortierung anbieten:
	if (!document.getElementById("DefaultSort")){
		var div = document.createElement("div");
		div.style.paddingBottom = "10px";
		div.innerHTML = "Standard-Sortierung: ";
		var H1 = document.getElementsByTagName("h1")[0];
		if (!H1) H1 = document.getElementsByTagName("h2")[0];
		H1.parentNode.insertBefore(div,H1);
		
		var SEL = document.createElement("select");
		SEL.id = "DefaultSort";
		
		var newoption = document.createElement('option');
		newoption.value = "-1";
		newoption.innerHTML = '(unsortiert)';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);

		var newoption = document.createElement('option');
		newoption.innerHTML = 'Name';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Motivation';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Fähigkeiten';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Alter';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Ausbildung';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Status';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Schicht';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		/*SEL.options[SEL.length] = new Option("(unsortiert)","-1");
		SEL.options[SEL.length] = new Option("Name");
		SEL.options[SEL.length] = new Option("Motivation");
		SEL.options[SEL.length] = new Option("Fähigkeiten");
		SEL.options[SEL.length] = new Option("Alter");
		SEL.options[SEL.length] = new Option("Ausbildung");
		SEL.options[SEL.length] = new Option("Status");
		SEL.options[SEL.length] = new Option("Schicht");*/
		div.appendChild(SEL);
    
		document.getElementById("DefaultSort").addEventListener( "change" , DefaultSortChanged , true );
	}
	var SEL = document.getElementById("DefaultSort");
	SEL.value = GM_getValue("DefaultTabSort","-1");
  
	var R=document.getElementsByName("education_type");
	for (var i=0;i < R.length;i++) R[i].addEventListener ( "click" , Markiere_Schueler , true );
	
	// Link für Öffnung aller Wachen
	var link=document.createElement("a");
	var text=document.createTextNode("Alle Wachen öffnen (VORSICHT! Kann sehr langsam sein!)");
	link.appendChild(text);
	link.style.marginLeft="100px";
	link.href="#";
	link.addEventListener ( "click" , open_all_buildings , true );
	div.appendChild(link);
	
	// Link zum abbrechen
	var link=document.createElement("a");
	link.style.position='fixed';
	link.style.top='50px';
	link.style.left='20px';
	link.style.display='none';
	link.id='abort_link';
	var text=document.createTextNode("Vorgang abbrechen!");
	link.appendChild(text);
	link.style.marginLeft="100px";
	link.href="#";
	link.addEventListener ( "click" , clear_timeout_buildings , true );
	div.appendChild(link);
}

function Markiere_Schueler(){
	sortPersonalLehrgang();
	var GG = document.getElementById("education_type_1").checked;
	var RA = document.getElementById("education_type_2").checked;
	var TA = document.getElementById("education_type_3").checked;
	var FH = document.getElementById("education_type_4").checked;
	var LB = document.getElementById("education_type_5").checked;
	var RB = document.getElementById("education_type_6").checked;
	var TU = document.getElementById("education_type_7").checked;
	var WF = document.getElementById("education_type_8").checked;
	var RZ = document.getElementById("education_type_9").checked;
	var HR = document.getElementById("education_type_10").checked;
	var DT=document.getElementsByClassName("defaultTable");
	if (DT.length<2) return;
	var max_schueler = document.getElementsByTagName("table")[0].getElementsByTagName("td")[5].innerHTML;
	var checked_count=document.getElementById("count_schueler").innerHTML;
	
	for (var i=1; i<DT.length; i++) { 
		var TB = DT[i];
		var TR=TB.getElementsByTagName("tr");
		for ( var j=0;j<TR.length;j++) {
			var TDs = TR[j].getElementsByTagName("td");
			if (TDs.length==7) { 
				//Haken bleibt, trotz neu sortieren bei wache öffnen
				TDs[0].getElementsByTagName('input')[0].removeEventListener( "click" , function () { pupil_onclick("false",this); }, true );
				TDs[0].getElementsByTagName('input')[0].addEventListener( "click" , function () { pupil_onclick("false",this); }, true );
				
				//eigentliches colorieren und ausblenden
				TDs[0].style.backgroundColor="transparent";
				var Ausb = TDs[5].innerHTML;
				var verf = (TDs[1].innerHTML.match("Nicht verfügbar") == null);
				var Fah  = parseInt(TDs[3].innerHTML);
				if (Fah >= 65) TDs[3].style.color="green";
				if (Fah <= 25) TDs[3].style.color="#FF6666";
				if (verf){
					if (checked_count == parseInt(max_schueler) &&  !TDs[0].getElementsByTagName('input')[0].checked) TDs[0].getElementsByTagName('input')[0].setAttribute("disabled","disabled");
					else TDs[0].getElementsByTagName('input')[0].removeAttribute("disabled"); 
					var bgc="";
					if (GG && Ausb.match("Gefahrgut")             ==null) bgc="#FF0000";
					else if (RA && Ausb.match("Rettungsassistent")     ==null) bgc="#FFFFFF";
					else if (TA && Ausb.match("Taucher")               ==null) bgc="#000066";
					else if (FH && Ausb.match("Flughafen")             ==null) bgc="#FF1100";
					else if (LB && Ausb.match("Löschboot")             ==null) bgc="#0000FF";
					else if (RB && Ausb.match("Rettungsboot")==null && Ausb.match("Rettungsassistent")) bgc="#1865C9";
					else if (TU && Ausb.match("TUIS")==null && Ausb.match("Gefahrgut")) bgc="#FF00FF";
					else if (WF && Ausb.match("2-Wege-Führerschein")   ==null) bgc="#FF00FF";
					else if (RZ && Ausb.match("Rettungszug")==null && Ausb.match("Rettungsassistent")) bgc="#FF00FF";
					else if (HR && Ausb.match("Höhenrettung")          ==null) bgc="#805F26";					
					if (bgc){ 
						TDs[0].style.backgroundColor = bgc; 
						TR[j].style.display = "";
					}
					else TR[j].style.display = "none";
				}
				else TR[j].style.display = "none";
			}
		}
	}
}

function pupil_onclick(uebung,element) {
	var max_schueler = document.getElementsByTagName("table")[0].getElementsByTagName("td")[5].innerHTML;

	var checked_count=document.getElementById("count_schueler").innerHTML;
	if(element.checked) {
		checked_count++;
		element.setAttribute("checked",true);
	}
	else {
		element.removeAttribute("checked"); 
		checked_count--;
		if ( checked_count == parseInt(max_schueler) - 1 ) {
			document.getElementById("count_schueler").innerHTML=checked_count;
			if ( uebung == "true" ) Markiere_FWLeute();
			else Markiere_Schueler();
		}
	}
	document.getElementById("count_schueler").innerHTML=checked_count;
	if ( checked_count == 10 && uebung == "true") Markiere_FWLeute();
	else if ( checked_count==parseInt(max_schueler) ) Markiere_Schueler(); 
}

function createElement(type, attributes){
	var node = document.createElement(type);

	for (var attr in attributes) if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	return node;
}

function bearbeiteFahrzeugliste(){ 
	var DC=document.getElementById("content");
	var ArrTR=new Array;
  
	var H2 = DC.getElementsByTagName("h2");
	for (var i=0; i<H2.length; i++){ 
		var A = H2[i].getElementsByTagName("a")[0];
		if (A){ 
			var FWLink = A.href;
			H2[i].innerHTML += "&nbsp&nbsp<a href='" + FWLink + "/feuerwehrleute'><font size='-1'>(Personal)</font></a>";
		}
	}

	var H1 = document.getElementsByTagName("h1")[0];
	var H2=document.createElement("h2");
	H2.innerHTML = "Übersicht";
	DC.insertBefore(H2,H1.nextSibling);
  
	var TB=document.createElement("table");
	TB.className="defaultTable";
	TB.id="Übersichtstabelle";

	var T = "<thead><tr>\n";
	T += "<th rowspan='2'>Fahrzeugtyp</th>" + 
		"<th rowspan='2'>Anzahl</th>" +
		"<th colspan='6'>Status</th>" +
		"<th rowspan='2'>&Sigma; km</th><th rowspan='2'>&Oslash;-km</th><th rowspan='2'>&Oslash; Zust.</th>" +
		"</tr>\n<tr>\n";
	T +="<th style='background-color:#0000F8;' width='55'><b>1</b></th>" +
		"<th style='background-color:#00FF2d;color:#000000;' width='55'><b>2</b></th>" +
		"<th style='background-color:#FFCC27;color:#000000;' width='55'><b>3</b></th>" +
		"<th style='background-color:#FF5A19;color:#000000;' width='55'><b>4</b></th>" +
		"<th style='background-color:#BABABA;color:#000000;' width='55'><b>6</b></th>" +
		"<th style='background-color:#DAD815;color:#000000;' width='55'><b>7</b></th>";
	T += "</tr></thead><tbody>\n";
  
	var FZNamen = new Array;
	var gefFZ = new Array;
	var gefS1 = new Array;
	var gefS2 = new Array;
	var gefS3 = new Array;
	var gefS4 = new Array;
	var gefS6 = new Array;
	var gefS6a = new Array;
	var gefS7 = new Array;
	var kmSumme = new Array;
	var ZustandSumme = new Array;
	var gesamtZustand=0;
	var AnzS1=0;
	var AnzS2=0;
	var AnzS3=0;
	var AnzS4=0;
	var AnzS6=0;
	var AnzS6a=0;
	var AnzS7=0;
	var gesamtkm=0;
	var ArrTopKM = new Array;

	TBs = document.getElementsByTagName("table");
	for (var i=1;i<TBs.length-2;i++){ 
		var TB2=TBs[i];
		var TR=TB2.getElementsByTagName("tr")[0];
		var index=TR.getElementsByTagName("th").length-1;
		var LastTH = TR.getElementsByTagName("th")[index].firstChild.nodeValue;
		if (LastTH=="Zustand"){ 
			var TRs = TBs[i].getElementsByTagName("tr");
			var AnzTR = TRs.length;
			for (var j=1;j<AnzTR;j++){ 
				var FZName = TRs[j].getElementsByTagName("td")[2].innerHTML;
				if (gefFZ[FZName] == undefined) { 
					FZNamen.push(FZName);
					gefFZ[FZName]=1;
					gefS1[FZName]=0;
					gefS2[FZName]=0;
					gefS3[FZName]=0;
					gefS4[FZName]=0;
					gefS6[FZName]=0;
					gefS6a[FZName]=0;
					gefS7[FZName]=0;
					kmSumme[FZName]=0;
					ZustandSumme[FZName]=0;
				}
				else gefFZ[FZName]++;
        var Funkname = TRs[j].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
        
        var FZStat = trim(TRs[j].getElementsByTagName("td")[3].innerHTML);
        if (FZStat=="Einsatzbereit auf Wache" && Funkname.substr(0,3).toUpperCase()=="XXX") FZStat = "Außer Dienst";
        switch (FZStat){ 
			case "Frei (Dienstfahrt)":      gefS1[FZName]++; break;
			case "Einsatzbereit auf Wache": gefS2[FZName]++; break;
			case "Auf dem Weg zum Einsatz": gefS3[FZName]++; break;
			case "Ankunft am Einsatzort":   gefS4[FZName]++; break;
			case "Nicht einsatzbereit":     gefS6[FZName]++; break;
			case "Außer Dienst":            gefS6a[FZName]++; break;
			case "Patient aufgenommen":     gefS7[FZName]++; break;
		}
        
        var FZLink = TRs[j].getElementsByTagName("td")[1].innerHTML;
        var kmStand = TRs[j].getElementsByTagName("td")[5].innerHTML;
        var IntkmStand = parseInt(kmStand.substr(0,kmStand.length-2).replace(".",""))
        ArrTopKM.push(new Array(IntkmStand,FZLink));
        kmSumme[FZName] += IntkmStand;
        
        //Zustand prüfen und ggf. Link zur Werkstatt einbauen
        var TD = TRs[j].getElementsByTagName("td")[6];
        var FZID = TRs[j].getElementsByTagName("td")[1].getElementsByTagName("a")[0].href;
        FZID = FZID.replace("http://www.feuerwache.net/feuerwehrfahrzeuge/","");
        var Zustand = parseInt(removeTags(TD.innerHTML));
        if (Zustand != 100) ArrTR.push(TRs[j].cloneNode(true));
        ZustandSumme[FZName] += Zustand;
			}
		}
	}

	var FZName=FZNamen.sort();
	for (var i=0;i < FZName.length;i++) {
		var FZNamei=FZName[i];
		AnzS1 += gefS1[FZNamei];
		AnzS2 += gefS2[FZNamei];
		AnzS3 += gefS3[FZNamei];
		AnzS4 += gefS4[FZNamei];
		AnzS6 += gefS6[FZNamei];
		AnzS6a += gefS6a[FZNamei];
		AnzS7 += gefS7[FZNamei];
		gesamtkm += kmSumme[FZNamei];
		gesamtZustand += ZustandSumme[FZNamei];
    
		if (gefS1[FZNamei]==0) gefS1[FZNamei] = "<font color='#666666'>0</font>";
		if (gefS2[FZNamei]==0) gefS2[FZNamei] = "<font color='#666666'>0</font>";
		if (gefS3[FZNamei]==0) gefS3[FZNamei] = "<font color='#666666'>0</font>";
		if (gefS4[FZNamei]==0) gefS4[FZNamei] = "<font color='#666666'>0</font>";
		if (gefS6[FZNamei]==0) gefS6[FZNamei] = "<font color='#666666'>0</font>";
		if (gefS6a[FZNamei]==0) gefS6a[FZNamei] = "";
		if (gefS7[FZNamei]==0) gefS7[FZNamei] = "<font color='#666666'>0</font>";

		T += "<tr><td><b>" + FZNamei + "</b></td>";
		T += "<td style='text-align:center'>" + gefFZ[FZNamei] + "</td>";
		T += "<td style='text-align:center'>" + gefS1[FZNamei] + "</td>";
		T += "<td style='text-align:center'>" + gefS2[FZNamei] + "</td>";
		T += "<td style='text-align:center'>" + gefS3[FZNamei] + "</td>";
		T += "<td style='text-align:center'>" + gefS4[FZNamei] + "</td>";
		T += "<td style='text-align:center'>" + gefS6[FZNamei];
		if (gefS6a[FZNamei]) T +="  + " + gefS6a[FZNamei];
		T += "</td>";
		T += "<td style='text-align:center'>" + gefS7[FZNamei] + "</td>";
		T += "<td style='text-align:right'>" + makeDots(kmSumme[FZNamei]) + "</td>";
		var Schnitt = parseInt(kmSumme[FZNamei] / gefFZ[FZNamei]);
		T += "<td style='text-align:right'>" + makeDots(Schnitt) + "</td>";
		Schnitt = parseInt(10 * ZustandSumme[FZNamei] / gefFZ[FZNamei]) / 10;
		var txtSchnitt = Schnitt.toString();
		if (txtSchnitt.substr(txtSchnitt.length-2,1) != ".") txtSchnitt += ".0";
		T += "<td style='text-align:right'>" + txtSchnitt + " %</td>";
		T += "</tr>\n";
	}
	var Anz = AnzS1+AnzS2+AnzS3+AnzS4+AnzS6+AnzS6a+AnzS7;
	T += "<tr><th style='text-align:left'>SUMME</th>";
	T += "<th>" + Anz + "</th>";
	T += "<th>" + AnzS1 + "</th>";
	T += "<th>" + AnzS2 + "</th>";
	T += "<th>" + AnzS3 + "</th>";
	T += "<th>" + AnzS4 + "</th>";
	T += "<th>" + AnzS6;
	if (AnzS6a) T += " + " + AnzS6a;
	T += "</th>";
	T += "<th>" + AnzS7 + "</th>";
	T += "<th style='text-align:right;padding:1px 5px;'>" + makeDots(gesamtkm) + "</th>";
	var Schnitt = parseInt(gesamtkm / Anz);
	T += "<th style='text-align:right;padding:1px 5px;'>" + makeDots(Schnitt) + "</th>";
	Schnitt = parseInt(10 * gesamtZustand / Anz) / 10;
	var txtSchnitt = Schnitt.toString();
	if (txtSchnitt.substr(txtSchnitt.length-2,1) != ".") txtSchnitt += ".0";
	T += "<th style='text-align:right;padding:1px 5px;'>" + txtSchnitt + " %</th>";
	T += "</tr>\n";
	T += "</tbody></table>\n";
	TB.innerHTML=T;
	DC.insertBefore(TB,H2.nextSibling);
  
	TB = TBs[TBs.length-1];
	var lastTR = TB.getElementsByTagName("tr")[TB.getElementsByTagName("tr").length-1];
	var TR=document.createElement("tr");
	lastTR.parentNode.insertBefore(TR,lastTR.nextSibling);
	TR.innerHTML = "<th>Fahrzeuge mit der höchsten Laufleistung:</th>\n<td></td>";
	var TD=TR.getElementsByTagName("td")[0];

	ArrTopKM.sort(function s(a,b){return b[0]-a[0];});
	for (var i=0;i<5;i++) TD.innerHTML += ArrTopKM[i][1] + " (" + makeDots(ArrTopKM[i][0]) + " km)<br>\n";
  
	TB = TBs[TBs.length-1];
	var lastTR = TB.getElementsByTagName("tr")[TB.getElementsByTagName("tr").length-1];
	var TR=document.createElement("tr");
	lastTR.parentNode.insertBefore(TR,lastTR.nextSibling);
	TR.innerHTML = "<th>Fahrzeuge mit der niedrigsten Laufleistung:</th>\n<td></td>";
	var TD=TR.getElementsByTagName("td")[0];

	ArrTopKM.sort(function s(b,a){return b[0]-a[0];});
	for (var i=0;i<5;i++) TD.innerHTML += " " + makeDots(ArrTopKM[i][0]) + " km - " + ArrTopKM[i][1] + "<br>\n";

	// Tabelle mit beschädigten Fahrzeugen in Dokument schreiben, 
	// aber erstmal verstecken, Anzeigen erst durch Klick auf Toggle-Link
	var NewDiv = document.createElement("div");
  
	var nodeScript = createElement('script',
                                   {'type': 'text/javascript'});
    nodeScript.innerHTML = "function toggledisplay()\n\
							{ var e = document.getElementById('DivZustandstabelle');\n\
							e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n\
							}\n";
	NewDiv.appendChild(nodeScript);
	
	var nodeA = createElement('a',
                              {'href': 'javascript:toggledisplay();'});
    nodeA.appendChild(document.createTextNode('Defekte Fahrzeuge nach Zustand auflisten'));
    NewDiv.appendChild(nodeA);
    NewDiv.appendChild(createElement('br'));
  
	var hiddenDiv=document.createElement("div");
	hiddenDiv.id = "DivZustandstabelle";
	hiddenDiv.style.display = "none";
	var H2 = document.createElement("h2");
	H2.appendChild(document.createTextNode("beschädigte Fahrzeuge:"));
	hiddenDiv.appendChild(H2);
	var hiddTB = document.createElement("table");
	hiddTB.className="defaultTable";
	hiddTB.id="Zustandstabelle";
	hiddenDiv.appendChild(hiddTB);
	var THead=document.createElement("thead");
	hiddTB.appendChild(THead);
	H = "<tr>";
	H += "<th style='width: 10px;'></th>\n";
	H += "<th style='width: auto;'>Funkrufname</th>\n";
	H += "<th style='width: 120px;'>Fahrzeugtyp</th>\n";
	H += "<th style='width: 190px;'>FMS</th>\n";
	H += "<th style='width: 55px;' title='Aktuelle Position'>Akt. Pos</th>\n";
	H += "<th style='width: 100px;'>Laufleistung</th>\n";
	H += "<th style='width: 60px;'>Zustand</th>\n";
	H += "</tr>\n";
	THead.innerHTML = H;
	var TBody=document.createElement("tbody");
	hiddTB.appendChild(TBody);
  
	TB=document.getElementById("Übersichtstabelle");
	TB.parentNode.insertBefore(hiddenDiv,TB.nextSibling);
	TB.parentNode.insertBefore(NewDiv,TB.nextSibling);
	TB=document.getElementById("Zustandstabelle").getElementsByTagName("tbody")[0];
	var TR=ArrTR;
	for (var i=0;i < TR.length;i++) TB.appendChild(TR[i]);

	  
	// Tabelle sortieren
	SortTabelle(hiddTB,6,true,true,true);
  
  
  /////////////////////////// Tabelle nach Laufleistung sortieren /////////
  
	var NewDiv = document.createElement("div");
  
	var nodeScript = createElement('script',
                                   {'type': 'text/javascript'});
	nodeScript.innerHTML = "function toggledisplay_lauf()\n\
							{ var e = document.getElementById('DivLaufleistung');\n\
							e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n\
							}\n";
	NewDiv.appendChild(nodeScript);

	var nodeA = createElement('a',
                              {'href': 'javascript:toggledisplay_lauf();'});
    nodeA.appendChild(document.createTextNode('Fahrzeuge nach Laufleistung auflisten'));
    NewDiv.appendChild(nodeA);
    NewDiv.appendChild(createElement('br'));
  
	var hiddenDiv=document.createElement("div");
	hiddenDiv.id = "DivLaufleistung";
	hiddenDiv.style.display = "none";
	var H2 = document.createElement("h2");
	H2.appendChild(document.createTextNode("nach Laufleistung sortiert:"));
	hiddenDiv.appendChild(H2);
	var hiddTB = document.createElement("table");
	hiddTB.className="defaultTable";
	hiddTB.id="Laufleistung";
	hiddenDiv.appendChild(hiddTB);
	var THead=document.createElement("thead");
	hiddTB.appendChild(THead);
	H = "<tr>";
	H += "<th style='width: 10px;'></th>\n";
	H += "<th style='width: auto;'>Funkrufname</th>\n";
	H += "<th style='width: 120px;'>Fahrzeugtyp</th>\n";
	H += "<th style='width: 190px;'>FMS</th>\n";
	H += "<th style='width: 55px;' title='Aktuelle Position'>Akt. Pos</th>\n";
	H += "<th style='width: 100px;'>Laufleistung</th>\n";
	H += "<th style='width: 60px;'>Zustand</th>\n";
	H += "</tr>\n";
	THead.innerHTML = H;
	var TBody=document.createElement("tbody");
	hiddTB.appendChild(TBody);
	
	TB=document.getElementById("Übersichtstabelle");
	TB.parentNode.insertBefore(hiddenDiv,TB.nextSibling);
	TB.parentNode.insertBefore(NewDiv,TB.nextSibling);
	TB=document.getElementById("Laufleistung").getElementsByTagName("tbody")[0];
	var TR=ArrTR;
	for (var i=0;i < TR.length;i++) TB.appendChild(TR[i]);

	  
	// Tabelle sortieren
	SortTabelle(hiddTB,5,false,true,true);
}

function bearbeiteEinsatzseite(){ 
	// Alle Infobox-Variablen leer machen

	InfotextEinsatzNr="";
	InfotextEinsatzort=""; 
	InfotextEinsatzgebiet="";
	InfotextKlasse="";
	InfotextKlassenalarm="";
	InfotextKlassenalarmOpt="";
	InfotextRTW="";
	InfotextUnterwegs="";
	InfotextNachforderungen="";
	InfotextToAlarm="";
	InfotextFahrzeit="";
	InfotextFahrzeitOpt="";
	InfotextNichtVerfuegbar="";
	InfotextVerfuegbar="";
  
	// Einsatz Nr. ermitteln
	var EinsatzNr = adr.replace(/[^0-9]/g, ""); 
	if (showInfoEinsatzNr) InfotextEinsatzNr = EinsatzNr;


	// Einsatzort ausgeben
	if (showInfoEinsatzort) {
		var tmp     = EinsatzNr.substring(EinsatzNr.length-3, EinsatzNr.length) * 1;
		var strasse = ( (tmp > Strassennamen.length) ? EinsatzNr.substring(EinsatzNr.length-1, EinsatzNr.length) * 1 : tmp);
		var hausnr  = (EinsatzNr.substring(EinsatzNr.length-2, EinsatzNr.length) * 1) + 1;  
		InfotextEinsatzort = Strassennamen[strasse] + " " + hausnr;
	}
  
////////////////////////////////////////// EINSATZGEBIET //////////////////////////////////////////    

	var checkVerband=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("td");
	var result=false;
	for (var i=0;i<checkVerband.length;i++) {
		if ( checkVerband[i].firstChild.nodeValue=="Einsatz von") var result=true;
	}

	if( result ){
		var InfotextEinsatzgebiet = "Der Einsatz befindet sich in deinem Verband";
	}
	else {
		var check = document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("td")[3].innerHTML;
		if(check.match(/href/i)){
			var posArr=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("td")[3].getElementsByTagName("a")[0].innerHTML.replace('Andere Stadt -', '').split(' - ');
			var InfotextEinsatzgebiet = getAreaDescription(parseInt(posArr[0]), parseInt(posArr[1]));
		}
		else {
			var posArr=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("td")[3].innerHTML.replace('Andere Stadt -', '').split(' - ');
			var InfotextEinsatzgebiet = getAreaDescription(parseInt(posArr[0]), parseInt(posArr[1]));
		}
	}

  
/////////////////////// EINSATZGEBIET ENDE /////////////////////////////////////////////
	
	// Wachanzahl ermitteln
	showAnzahlFW=document.getElementById("scripter_feuerwache_all").innerHTML;
	showAnzahlBF=document.getElementById("scripter_feuerwache_bf").innerHTML;
	
	// Einsatzstichwort ermitteln
	var EinsatzDiv = document.getElementById("mission_content");
	var Einsatz = document.getElementsByTagName("h1")[0];
	var Einsatzstichwort = getStichwort(Einsatz.innerHTML);
	if (showInfoStichwort) { 
		InfotextStichwort = Einsatzstichwort;
		var L = getWikiLink(Einsatzstichwort);
		if (L != "") InfotextStichwort = "<a target='_new' href='" + L + "'>" + Einsatzstichwort + "</a>";
	}
  
	// Anzeige, ob Auftragseinsatz
	var welt=ermittleWelt();
	auftraege=GM_getValue("auftragsliste"+welt,"--");
	if ( unsafeWindow.feuerwache_layout == 'light') colour='cyan';
	else colour='cyan';
	if ( auftraege.match(Einsatzstichwort) ) document.getElementById("content").getElementsByTagName("h1")[0].style.color=colour;
	
	// Einsatzklasse
	Einsatzklasse = getEinsatzKlasse(Einsatzstichwort,InfotextEinsatzgebiet);

	// verfügbare FZ zählen
	if (showInfoVerfuegbar) {
		InfotextVerfuegbar = zaehleVerfuegbar();
		var InfotextVerfuegbar=InfotextVerfuegbar.replace("WLF&nbsp;</td>", "WLF&nbsp;</td></tr><tr>");
	}

	if (showInfoKlasse) InfotextKlasse = Einsatzklasse;
	// Fahrzeuge zusammenstellen
	FillAlarmListe(Einsatzklasse,InfotextEinsatzgebiet);

	if (showInfoKlassenalarm) InfotextKlassenalarm = condenseFahrzeugliste(ToAlarm);
	if (showInfoKlassenalarmOpt && Optional.length>0) InfotextKlassenalarmOpt = condenseFahrzeugliste(Optional);

	// Anzahl der nötigen RTW ermitteln
	var V = Verletzte();
	if (V>0) { 
		if (showInfoRTW) { 
			InfotextRTW = "";
			for (var i=0;i<V;i++) InfotextRTW += "<img class='famfamfamicon' src='/images/pill.png' alt='Pill'>";
			InfotextRTW += " " + V + " verletzte Person";
			if (V>1) InfotextRTW +="en";
		}
		// Option mehr RTWs als Verletzte bei der Alarmierung
		if (Einsatzklasse == 'RD') V = 0;
		if (showInfoRTWplus) { 
			V++; 
			if (Einsatzklasse == 'RD') { V = 0; }
		}
		// -> (einen RTW mehr schicken)
		// Wassereinsatz ?
		var Buchstabe = Einsatzklasse.charAt(0);
		if (Buchstabe == 'X') { 
		if (showInfoRTWplus) { V--; }
		}
		
		while (V>0) { 
			if (Buchstabe == 'X') { ToAlarm.push("Rettungsboot"); }
			if (Buchstabe != 'X') { ToAlarm.push("RTW"); }
			V--; 
		}
	}
	
	
	// NEF hinzufügen
	
	if ( document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[4] ) {
		var cell=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[4].getElementsByTagName("td")[1];
		if ( cell.innerHTML.match("Notarzt") ) {
			ToAlarm.push("NEF");
		}
	}

	if ( document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[5] ) {
		var cell=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[5].getElementsByTagName("td")[1];
		if ( cell.innerHTML.match("Notarzt") ) {
			ToAlarm.push("NEF");
		}
	}
	
	
	if ( document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[6] ) {
		var cell=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[6].getElementsByTagName("td")[1];
		if ( cell.innerHTML.match("Notarzt") ) {
			ToAlarm.push("NEF");
		}
	}
	
	if ( document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[7] ) {
		var cell=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[7].getElementsByTagName("td")[1];
		if ( cell.innerHTML.match("Notarzt") ) {
			ToAlarm.push("NEF");
		}
	}

		if ( document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[8] ) {
		var cell=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[8].getElementsByTagName("td")[1];
		if ( cell.innerHTML.match("Notarzt") ) {
			ToAlarm.push("NEF");
		}
	}

	
	// bereits eingebundene Fahrzeuge ermitteln
	FillUnterwegsListe();

	// Diese Unterwegs-Fahrzeuge auflisten...
	if (Unterwegs.length>0) { 
		if (showInfoUnterwegs) {
		var colour;
		if ( unsafeWindow.feuerwache_layout == 'light') colour='green';
		else colour='lime';
 
		if (AmOrt.length) InfotextUnterwegs += "am Ort: <font color='"+colour+"'>" + condenseFahrzeugliste(AmOrt) + "</font>, ";
		if (AufAnfahrt.length) InfotextUnterwegs += "auf Anfahrt: <font color='orange'>" + condenseFahrzeugliste(AufAnfahrt) + "</font>, ";
		if (Wartend.length) InfotextUnterwegs += "wartend: <font color='red'>" + condenseFahrzeugliste(Wartend) + "</font>, ";
		InfotextUnterwegs = InfotextUnterwegs.substr(0,InfotextUnterwegs.length-2);
		}
	}

	// ToAlarm um die FZ kürzen, die bereits unterwegs sind
	// sowie die Reihenfolge anpassen, dass Alternativen am Ende stehen
	bereinigeToAlarm();

  
	// Nachforderungen auslesen
	var NF = AddNachforderungen();
	if (NF != "" && showInfoNachforderungen) InfotextNachforderungen = NF;

	if (showInfoOptionalAnkreuzen) while (Optional.length>0) ToAlarm.push(Optional.pop());
 
	if (! machVorschlag){ 
		// es sollen keine Vorschläge angehakt werden, also alles aus ToAlarm
		// nach Optional verschieben, so dass alles nur gelb markiert wird.
		while (ToAlarm.length>0) Optional.push(ToAlarm.pop());
	}
 
  
	if (ToAlarm.length>0) { 
		if (showInfoToAlarm) InfotextToAlarm = "<font color='#1865C9'>" + condenseFahrzeugliste(ToAlarm) + "</font>"; }
		else { 
			if (showInfoToAlarm) {
				var colour;
				if ( unsafeWindow.feuerwache_layout == 'light') colour='green';
				else colour='lime';
 
				InfotextToAlarm = "<font color='"+colour+"'><b><font size=2>keine Fahrzeuge vorgeschlagen!</b></font></font>"; 
				if (Optional.length>0) InfotextToAlarm += "<br><font size=1>Optional: " + condenseFahrzeugliste(ToAlarm) + " </font>";
			}
		}


// ************************************************************************************
// an dieser Stelle sind die Listen ToAlarm und Optional gefüllt. Jetzt kann alles
// aus ToAlarm abgehakt werden und alles aus Optional gelb markiert
// ************************************************************************************
    
	// ToAlarm-Fahrzeuge tatsächlich abhaken
	var Dauer1 = AlarmiereFahrzeuge();
	if (Dauer1 != "" && showInfoFahrzeit) InfotextFahrzeit = Dauer1;
  
	// Optionale Fahrzeuge markieren
	var Dauer2 = MarkiereFahrzeuge();
	if (Dauer2 != "" && showInfoFahrzeitOpt) InfotextFahrzeitOpt = Dauer2;
  
	// falls Fahrzeuge nicht alarmiert werden konnten, diese auflisten
	if (ToAlarm.length > 0 && showInfoNichtVerfuegbar) InfotextNichtVerfuegbar = condenseFahrzeugliste(ToAlarm);
  
	// Text für die Infobox zusammenstellen
	var Info = "<h2>Einsatzinfos</h2>\n";

	// Vorschläge ein- und ausschalten
	Info += "<table width='100%'><tr><td><input type='checkbox' id='machVorschlag' ";
	if (machVorschlag) Info +="checked";
	Info += "><font color='red'><b> Fahrzeuge auswählen<b></font></td>";
  
	Info += "<td align='right'>Alarmierungsreihenfolge auf gleicher Wache:</td></tr>";
  
	Info += "<tr><td><input type='checkbox' id='RTWZeit' ";
	if (alarmtyp==1) Info +="checked";
	Info += "><font color='red'><b> Nur RTW´s unter 20 Min. auswählen <b></font></td>";
  
	Info += "<td align='right'> Trupp VOR Gruppe <input type='checkbox' id='zweiterAbmarschTr' ";
	if (zweiterAbmarsch==1) Info +="checked";
	Info +="></td></tr>";

	Info += "<tr><td><input type='checkbox' id='Erkundungsmodus' ";
	if (alarmtyp==2) Info +="checked";
	Info += "><font color='red'><b> Nur Erkundungsfahrzeug auswählen<b></font></td>";
  
	Info += "<td align='right'> Ausbildung zuerst <input type='checkbox' id='zweiterAbmarschAusb' ";
	if (zweiterAbmarsch==2) Info +="checked";
	Info +="></td></tr></table>\n";
  
  
	// Infos in Tabelle strukturieren
	Info += "<table class='defaultTable'>\n";
	var InfoVorspann = "<tr><th style='width: 150px;'>";
	var InfoVorspann2 = "<tr><th colspan='2'>";
	if (InfotextEinsatzNr)  Info += InfoVorspann + "Einsatz Nr:</th><td>" + InfotextEinsatzNr + "</td></tr>\n";
	
	var time=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML;
	if (time.match("Tag")) {
		var split=time.split("Tag ");
		var hour=split[1].split(" Std.");
		if ( parseInt(hour[0]) > 18 ) colour="red";
		else colour="orange";
	}
	else var colour="green";
	Info+= InfoVorspann+'Zeit des Notrufs:</th><td style="color:'+colour+';">' + time +'</td></tr>\n';
	
	if (InfotextEinsatzort) Info += InfoVorspann + "Einsatzstelle:</th><td>" +document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML+"  "+ InfotextEinsatzort + ", 23109 Hogsmeade </td></tr>\n";
	if (showInfoEinsatzgebiet) Info += InfoVorspann + "Zusatzinfo:</th><td>" + InfotextEinsatzgebiet + " </td></tr>\n";

  
	if (InfotextKlasse) { 
		Info += InfoVorspann + "Einsatzstichwort:</th><td>" + InfotextKlasse + "</font>";
		if (InfotextKlassenalarmOpt) InfotextKlassenalarm += " Optional: " + InfotextKlassenalarmOpt + "&nbsp;";
		if (InfotextKlassenalarm) Info += "&nbsp;&nbsp;(&nbsp;" + InfotextKlassenalarm + "&nbsp;)";
		Info += "</td></tr>\n";
	}
	//if (InfotextRTW) Info += InfoVorspann + "Verletzte:</th><td>" + InfotextRTW + "</td></tr>\n";
	if (InfotextNachforderungen) Info += InfoVorspann + "Nachforderungen</th><td>" + InfotextNachforderungen + "</td></tr>\n";
	if (InfotextUnterwegs) Info += InfoVorspann + "Einsatzfahrzeuge</th><td>" + InfotextUnterwegs + "</td></tr>\n";
	if (InfotextToAlarm) Info += InfoVorspann + "zu alarmieren:</th><td id='TA'><font size='2'>" + InfotextToAlarm + "</font></td></tr>\n";
	if (InfotextNichtVerfuegbar) Info += InfoVorspann + "<font color='red'><blink>nicht verfügbar:</blink></font></th><td><font color='#EE0000'><blink>" + InfotextNichtVerfuegbar + "</blink></font></td></tr>\n";
	if (InfotextFahrzeit || InfotextFahrzeitOpt) { 
		Info += InfoVorspann + "Anfahrzeit</th><td>"
		if (InfotextFahrzeit) Info += " beträgt: " + InfotextFahrzeit;
		if (InfotextFahrzeit && InfotextFahrzeitOpt) Info += "<br>";
		if (InfotextFahrzeitOpt) Info += "der optionalen Fahrzeuge: " + InfotextFahrzeitOpt;
		Info += "</td></tr>\n";
	}
	
	seb_zeilen=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr");
	for (i=2;i<seb_zeilen.length;i++) {
		var zeile=seb_zeilen[i];
		Info+=InfoVorspann+zeile.getElementsByTagName("td")[0].innerHTML+":</th><td>";
		Info+=zeile.getElementsByTagName("td")[1].innerHTML+"</td></tr>\n";
		
	}
	
	// Liste der aktuell einsatzbereiten Fahrzeuge an die Tabelle hängen
	if (InfotextVerfuegbar) Info += InfoVorspann2 + "<font size=2>aktuell einsatzbereite Fahrzeuge: (<a target='_new' href='http://www.feuerwache.net/feuerwehrfahrzeuge'>Übersicht</a>)</font></th></tr><tr><td colspan='2'><font size='1'>" + InfotextVerfuegbar + "</font></td></tr>\n";
	Info += "</table>\n";

	// Sebastians Tabelle ausblenden  
	document.getElementById("mission_content").getElementsByClassName("defaultTable")[0].hidden="true";
	document.getElementById("mission_content").getElementsByTagName("h2")[0].hidden="true";
	document.getElementById("content").getElementsByTagName("div")[1].style.marginBottom='10px';
  
	// Infobereich in die Seite einbauen
	var InfoBereich = document.getElementById("InfoBereich");
	if (!InfoBereich) { 
		InfoBereich = document.createElement("div");
		InfoBereich.id = "InfoBereich";
		EinsatzDiv.parentNode.insertBefore(InfoBereich,Einsatz.nextSibling);
	}
	InfoBereich.innerHTML = Info;

	document.getElementById("machVorschlag").addEventListener ( "click" , machVorschlag_clicked , false ) ;
	document.getElementById("Erkundungsmodus").addEventListener ( "click" , alarmTyp_clicked , false ) ;
	document.getElementById("RTWZeit").addEventListener ( "click" , alarmTyp_clicked , false ) ;
	document.getElementById("zweiterAbmarschAusb").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;
	document.getElementById("zweiterAbmarschTr").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;

	var BTN = document.getElementsByName("commit")[0];
	if (BTN) BTN.addEventListener ( "click" , function(){ FirstRun=true; } , false ) ;

  As=document.getElementsByTagName("a");
  l=As.length;
  for ( var i=0;i<l;i++) {
  A=As[i];
   if (A.innerHTML == "zurück alarmieren") A.addEventListener ( "click" , function(){ FirstRun=true;CBClicked=false; } , false ) ; }
  
  var D=document.getElementsByName("vehicle_to_user_id[]");
  for ( var i=0;i < D.length;i++) {
	D[i].addEventListener ( "click" , function(){ CBClicked=true; } , false ) ; 
	}

  
  findeFahrzeugeZumZurückalarmieren();
  
  FirstRun=false;

 if ( alarm_sound == 1 ) document.getElementsByClassName('no_padding')[0].getElementsByTagName('input')[0].addEventListener("click",function(){playsound('horn');},false);
 if ( alarm_sound == 2 ) document.getElementsByClassName('no_padding')[0].getElementsByTagName('input')[0].addEventListener("click",function(){playsound('alarm-5ton');},false);
 
  if ( showInfoAnchorEinsatz ) window.scrollTo(0,get_top(document.getElementById("content")));
}

function get_top(obj) {
 var curtop = 0;
 if (obj.offsetParent) {
  do {
   curtop += obj.offsetTop
  } while(obj = obj.offsetParent);
 }
 else if (obj.y)
  curtop = obj.y;
 return curtop;
}

function findeFahrzeugeZumZurückalarmieren()
{ var D = document.getElementById("driving_vehicle");
  var TB1=D.getElementsByTagName("table")[0];
  if (!TB1) return;
  var Rows1 = TB1.getElementsByTagName("tr");
  
  D = document.getElementsByClassName("free_vehicle")[0];
  var TB2=D.getElementsByTagName("table")[0];
  if (!TB2) return;
  var Rows2 = TB2.getElementsByTagName("tr");
  
  for (var i=1; i<Rows1.length; i++)
  { var Row1 = Rows1[i];
	if ( Row1.getElementsByTagName("td")[0].innerHTML.match("[\(]")) continue;
	var FZID1 = Row1.getElementsByTagName("td")[0].getElementsByTagName("a")[0].href;
    FZID1 = FZID1.replace("http://www.feuerwache.net/feuerwehrfahrzeuge/","");
    var FZBez1 = Row1.getElementsByTagName("td")[1].innerHTML;
    var FZKlasse1 = getFahrzeugKlasse(FZBez1);
    if (!FZKlasse1) FZKlasse1 = "1";
    var RestSek1 = document.getElementById("hidden_driving_countdown_" + FZID1).value;
    if (!RestSek1) RestSek1=0;
    
    var sucheWeiter=true;
    var j=1;
    while (sucheWeiter)
    { var Row2 = Rows2[j];
      var FZBez2 = Row2.getElementsByTagName("td")[2].innerHTML;
      var FZKlasse2 = getFahrzeugKlasse(FZBez2);
      var Fahrzeit2 = Row2.getElementsByTagName("td")[4].innerHTML;
      var FahrtSek2 = ZeitToSek(Fahrzeit2);
      var FZName2 = Row2.getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
      if (FZName2.substr(0,3).toUpperCase()=="XXX") FZKlasse2 = "2";
      FZName2 = Row2.getElementsByTagName("td")[1].innerHTML;
      if (!FZName2.match(".*(unterwegs)")) FahrtSek2 += 90;
      if (FZKlasse1 == FZKlasse2 && RestSek1 > FahrtSek2)
      { Row1.getElementsByTagName("td")[5].style.backgroundColor="red";
        Row2.getElementsByTagName("td")[4].style.backgroundColor="#158F07";
        sucheWeiter = false;
      }
      if (FahrtSek2 > RestSek1) sucheWeiter = false;
      j++;
      if (j >= Rows2.length) sucheWeiter = false;
    }
  }
 
}

function einsatz_clicked(element,nummer) {
	var done=GM_getValue("done_einsatz",'');
	if ( done.match(nummer) ) {
		element.innerHTML='<span style="display:none;">'+nummer+'</span>';
		done=done.replace('||'+nummer);
	}
	else {
		done=done+'||'+nummer;
		element.innerHTML='<span style="display:none;">'+nummer+'</span><img src="http://www.hogsmeade-verband.net/Saisonbild/tick.png" title="erledigt" alt="erledigt" class="famfamfamicon">';
	}
	GM_setValue("done_einsatz",done);
}

function bearbeiteÜbersichtsseite(){
	var welt=ermittleWelt();
	document.getElementById("content").getElementsByTagName("h1")[0].innerHTML="Aktuelle Einsätze in Welt "+welt;
	
	var auftrag=document.getElementById("navigation_mission_quest_full").getAttribute('value');
	var count_auftraege=0;

	if ( ! document.getElementById("count_auftraege")) document.getElementById("footer").innerHTML+='<div id="count_auftraege" style="position:fixed;top:50px;left:20px;color:#AB59FF;">Anzahl Auftragseinsätze: '+count_auftraege+'</div>';
	if (showInfoKlasseInListe){
		var TD=document.getElementsByTagName("td");
		var done_einsatz=GM_getValue("done_einsatz",'');
		for (var i=0;TD.length > i; i++){
			var A=TD[i].getElementsByTagName("a");
			for (var j=0;A.length > j; j++){
			if ( A[j].href.indexOf("http://www.feuerwache.net/feuerwehr-einsaetze/") == 0) { 
				// Ermitteln ob Neustadt oder nicht!
				var k=parseInt(i);
				var checkVerband=TD[k+1].firstChild.nodeValue.match("Andere Stadt");
			
				if(checkVerband == 'Andere Stadt'){
					var area = "Der Einsatz befindet sich in deinem Verband";
				}
				else {
					var posArr = TD[k+1].getElementsByTagName('a')[0].firstChild.nodeValue.split(" - ");;
					var area = getAreaDescription(parseInt(posArr[0]), parseInt(posArr[1]));
					if ( area.match("Flughafen")) TD[k+1].getElementsByTagName('a')[0].style.color="#FF1100";
					else if ( area.match("Hafen")) TD[k+1].getElementsByTagName('a')[0].style.color="#1865C9";
					else if ( area.match("Rettungsbootanleger")) TD[k+1].getElementsByTagName('a')[0].style.color="#1865C9";
					else if ( area.match("Hauptbahnhof")) TD[k+1].getElementsByTagName('a')[0].style.color="#208000";
					else if ( area.match("Bahn Trasse")) TD[k+1].getElementsByTagName('a')[0].style.color="#208000";
					else if ( area.match("Raffinerie")) TD[k+1].getElementsByTagName('a')[0].style.color="#FF00FF";
					else if ( area.match("Tagebau")) TD[k+1].getElementsByTagName('a')[0].style.color="#805F26";
					else if ( area.match("Kohleförderband")) TD[k+1].getElementsByTagName('a')[0].style.color="#805F26";	
					else if ( area.match("Kohlekraftwerk")) TD[k+1].getElementsByTagName('a')[0].style.color="#805F26";
					else if ( area.match("Müllverbrennungsanlage")) TD[k+1].getElementsByTagName('a')[0].style.color="#EDF516";

					auftraege=GM_getValue("auftragsliste"+welt,"--");
					if ( unsafeWindow.feuerwache_layout == 'light') colour='#0001A6';
					else colour='#2DBBFF';
					if ( auftraege.match(A[j].innerHTML) ) TD[k].getElementsByTagName('a')[0].style.color=colour;
				}
				
				var Einsatzklasse=getEinsatzKlasse(A[j].innerHTML,area);

				var einsatznummer=A[j].href.replace('http://www.feuerwache.net/feuerwehr-einsaetze/','');
				
				// Icon ob erledigt
				var x=i-1;
				if ( done_einsatz.match(einsatznummer) ) {
					TD[x].innerHTML='<img src="http://www.hogsmeade-verband.net/Saisonbild/tick.png" title="erledigt" alt="erledigt" class="famfamfamicon">';
				}
				
				
				TD[x].innerHTML+='<span style="display:none;">'+einsatznummer+'</span>';
				TD[x].addEventListener("dblclick",function(){ einsatz_clicked(this,this.getElementsByTagName("span")[0].innerHTML);},false);
				
				
				//// Sound bei GSL abspielen, nur einmal pro Einsatz
				if ( Einsatzklasse=='KFB FZ WT' && ! soundplayed.match(einsatznummer) && vgsl_sound != 0 ) {
					if (vgsl_sound==1) playsound('steinbruch');
					else if (vgsl_sound==2) playsound('steinbruch-5ton');
					soundplayed=soundplayed+'||'+einsatznummer;
					GM_setValue("soundplayed",soundplayed);
				}
				else if ( Einsatzklasse=='KFB LZR' && ! soundplayed.match(einsatznummer) && vgsl_sound != 0 ) {
					if (vgsl_sound==1) playsound('industriepark');
					else if (vgsl_sound==2) playsound('industriepark-5ton');
					soundplayed=soundplayed+'||'+einsatznummer;
					GM_setValue("soundplayed",soundplayed);
				}
				if ( Einsatzklasse=='KFB FZ WF' && ! soundplayed.match(einsatznummer) && vgsl_sound != 0 ) {
					if (vgsl_sound==1) playsound('hafen');
					else if (vgsl_sound==2) playsound('hafen-5ton');
					soundplayed=soundplayed+'||'+einsatznummer;
					GM_setValue("soundplayed",soundplayed);
				}
				else if ( Einsatzklasse=='Crash' && ! soundplayed.match(einsatznummer) && manv_sound != 0 ) {
					if (manv_sound==1) playsound('flugzeug');
					else if (manv_sound==2) playsound('flugzeug-5ton');
					soundplayed=soundplayed+'||'+einsatznummer;
					GM_setValue("soundplayed",soundplayed);
				}
				else if ( Einsatzklasse=='BMA KH Y' && ! soundplayed.match(einsatznummer) && manv_sound != 0 ) {
					if (manv_sound==1) playsound('krankenhaus');
					else if (manv_sound==2) playsound('krankenhaus-5ton');
					soundplayed=soundplayed+'||'+einsatznummer;
					GM_setValue("soundplayed",soundplayed);
				}
				TD[i].innerHTML += "<span style='padding-right:1px; float:right;'><font color='#1865C9' size='-1'>"+ Einsatzklasse +"</font></span>";
				
				// Auftragseinsatz einfärben
				if ( A[j].innerHTML == auftrag ) {
					A[j].innerHTML='<span style="color:#AB59FF;"><blink>'+A[j].innerHTML+'</blink></span>';
					count_auftraege++;
				}

			
			}
			}
		}
		document.getElementById("count_auftraege").innerHTML='Anzahl Auftragseinsätze: '+count_auftraege;
	}
  
}

function AddKonfigEventlisteners() { 
	var Boxes = document.getElementsByName("KonfigBox");
	for ( var i=0;i < Boxes.length;i++) {
		Boxes[i].addEventListener("click",KonfigBox_clicked,false);
	}
}

function SortiereNachSpalte(Tab,SortBy) {
  var Spalte = -1;
  var c=0;

  THs=Tab.getElementsByTagName("th");
  for ( var i=0;i<THs.length;i++) {
  TH=THs[i];
  if (TH.innerHTML == SortBy) Spalte=c;
    c++;
  }
  if (Spalte == -1) return;
  
  switch(SortBy) { 
    case "Name":        SortTabelle(Tab,Spalte,true,false,true); break;
    case "Motivation":  SortTabelle(Tab,Spalte,false,true,false); break;
    case "Fähigkeiten": SortTabelle(Tab,Spalte,false,true,false); break;
    case "Alter":       SortTabelle(Tab,Spalte,true,true,false); break;
    case "Ausbildung":  SortTabelle(Tab,Spalte,true,false,false); break;
    case "Status":      SortTabelle(Tab,Spalte,true,false,false); break;
    case "Schicht":     SortTabelle(Tab,Spalte,true,true,false); break;
  }
}

function SortiereNachSpalteClick(event)
{ var t = event.target;
  var SortBy = t.innerHTML;
  var Tab = t.parentNode.parentNode.parentNode;
  if (!Tab) return;

  SortiereNachSpalte(Tab,SortBy);
}

function MachSortierbar(myTB)
{ var THead = myTB.getElementsByTagName("thead")[0];
  if (!THead) return;
  var THs = THead.getElementsByTagName("th");
  var TH=THs;
  for (var i=0;i<TH.length;i++) {

  var H = TH[i].innerHTML;
    TH[i].addEventListener ( "click" , function(e){SortiereNachSpalteClick(e)} , true ) ;
  }
}

function BearbeitePersonaltabelle(myTB)
{ MachSortierbar(myTB);
  var DefSort = GM_getValue("DefaultTabSort","-1")
  if (DefSort != "-1") SortiereNachSpalte(myTB,DefSort)
  
   var AnzFM=0, AnzEinsatz =0, AnzSchule  =0, AnzBereit=0, AnzDienst=0;
  var AnzGG=0, AnzGGDienst=0, AnzGGBereit=0, AnzGGSchule=0, AnzGGEinsatz=0, AnzGGFrei=0;
  var AnzRA=0, AnzRADienst=0, AnzRABereit=0, AnzRASchule=0, AnzRAEinsatz=0, AnzRAFrei=0;
  var AnzTA=0, AnzTADienst=0, AnzTABereit=0, AnzTASchule=0, AnzTAEinsatz=0, AnzTAFrei=0;
  var AnzAP=0, AnzAPDienst=0, AnzAPBereit=0, AnzAPSchule=0, AnzAPEinsatz=0, AnzAPFrei=0;
  var AnzLB=0, AnzLBDienst=0, AnzLBBereit=0, AnzLBSchule=0, AnzLBEinsatz=0, AnzLBFrei=0;
  var AnzRB=0, AnzRBDienst=0, AnzRBBereit=0, AnzRBSchule=0, AnzRBEinsatz=0, AnzRBFrei=0;
  var AnzTU=0, AnzTUDienst=0, AnzTUBereit=0, AnzTUSchule=0, AnzTUEinsatz=0, AnzTUFrei=0;
  var AnzWF=0, AnzWFDienst=0, AnzWFBereit=0, AnzWFSchule=0, AnzWFEinsatz=0, AnzWFFrei=0;
  var AnzRZ=0, AnzRZDienst=0, AnzRZBereit=0, AnzRZSchule=0, AnzRZEinsatz=0, AnzRZFrei=0;
  var AnzHR=0, AnzHRDienst=0, AnzHRBereit=0, AnzHRSchule=0, AnzHREinsatz=0, AnzHRFrei=0;

  var TR=myTB.getElementsByTagName("tr");
  for (var i=0;i<TR.length;i++) {

  if (TR[i].getElementsByTagName("td").length>5)
    { var TDs = TR[i].getElementsByTagName("td");
      var Stat = TDs[5].innerHTML;
      var Ausb = trim(TDs[4].innerHTML);

      // Motivation kennzeichnen:
      var Fah = parseInt(TDs[2].innerHTML);

var colour;
if ( unsafeWindow.feuerwache_layout == 'light') colour='green';
else colour='lime';

      if (Fah >= 75) TDs[2].style.color = ""+colour+"";
      if (Fah <= 25) TDs[2].style.color = "red";
      
      // Personalstatistik:
      AnzFM++;
      
      // Status kennzeichnen und zählen

      if (Stat.match("Beim Einsatz"))          { AnzDienst++; AnzEinsatz++; TDs[5].style.color="#FF0000"; }
      if (Stat.match("Frei - nicht im Dienst")) TDs[5].style.color="#555555";
      if (Stat.match("Einsatzbereit"))          { AnzDienst++; AnzBereit++; TDs[5].style.color="green"; }
      if (Stat.match("In der Feuerwehrschule")) { AnzSchule++; TDs[5].getElementsByTagName("a")[0].style.color="#5555FF"; }
      
      // Ausbildungsstand
      if (Ausb.match("Gefahrgut"))
      { AnzGG++;
        if (Stat.match("Beim Einsatz") || Stat.match("Einsatzbereit")) AnzGGDienst++;
        if (Stat.match("Einsatzbereit")) AnzGGBereit++;
      }
      if (Ausb.match("Rettungsassistent"))
      { AnzRA++;
        if (Stat.match("Beim Einsatz") || Stat.match("Einsatzbereit")) AnzRADienst++;
        if (Stat.match("Einsatzbereit")) AnzRABereit++;
      }
      if (Ausb.match("Taucher"))
      { AnzTA++;
        if (Stat.match("Beim Einsatz") || Stat.match("Einsatzbereit")) AnzTADienst++;
        if (Stat.match("Einsatzbereit")) AnzTABereit++;
      }
      if (Ausb.match("Flughafen"))
      { AnzAP++;
        if (Stat.match("Beim Einsatz") || Stat.match("Einsatzbereit")) AnzAPDienst++;
        if (Stat.match("Einsatzbereit")) AnzAPBereit++;
      }
      if (Ausb.match("Löschboot"))
      { AnzLB++;
        if (Stat.match("Beim Einsatz") || Stat.match("Einsatzbereit")) AnzLBDienst++;
        if (Stat.match("Einsatzbereit")) AnzLBBereit++;
      }
      if (Ausb.match("Rettungsboot"))
      { AnzRB++;
        if (Stat.match("Beim Einsatz") || Stat.match("Einsatzbereit")) AnzRBDienst++;
        if (Stat.match("Einsatzbereit")) AnzRBBereit++;
      }
	if (Ausb.match("TUIS"))
      { AnzTU++;
        if (Stat.match("Beim Einsatz") || Stat.match("Einsatzbereit")) AnzTUDienst++;
        if (Stat.match("Einsatzbereit")) AnzTUBereit++;
      }
	 if (Ausb.match("2-Wege-Führerschein"))
      { AnzWF++;
        if (Stat.match("Beim Einsatz") || Stat.match("Einsatzbereit")) AnzWFDienst++;
        if (Stat.match("Einsatzbereit")) AnzWFBereit++;
     }
	 if (Ausb.match("Rettungszug"))
      { AnzRZ++;
        if (Stat.match("Beim Einsatz") || Stat.match("Einsatzbereit")) AnzRZDienst++;
        if (Stat.match("Einsatzbereit")) AnzRZBereit++;
      }
	 if (Ausb.match("Höhenrettung"))
      { AnzHR++;
        if (Stat.match("Beim Einsatz") || Stat.match("Einsatzbereit")) AnzHRDienst++;
        if (Stat.match("Einsatzbereit")) AnzHRBereit++;
      }
    }
  }

  var ret;
  ret = "<b>" + AnzFM + " Feuerwehrleute</b>";
  if (AnzDienst != AnzFM) 
  { ret += ", davon " + AnzDienst + " im Dienst und ";
    if (AnzSchule) 
    {	ret += AnzSchule + " in der Schule."; }
    else
    { ret = ret.substr(0,ret.length-5) + "."; }
  }
  if (AnzBereit > 0) { 
  	ret += "<br><b><font color='green'>" + AnzBereit + " einsatzbereit</b> (=" + parseInt(1000*AnzBereit/AnzDienst)/10 + "%)</font>, "; 
  	} else { 
  		ret += "<br><b>Niemand ist derzeit einsatzbereit auf der Wache  "; 
  	}
  if (AnzEinsatz) ret += "<font color='red'>" + AnzEinsatz + " im Einsatz (=" + parseInt(1000*AnzEinsatz/AnzDienst)/10 + "%)</font>, ";
  ret = ret.substr(0,ret.length-2) + ".<br>";
  if (AnzGG)
  { ret += "<font color='#FF0000'>Gefahrgut: </font>" + AnzGG + " insgesamt, " + AnzGGDienst + " im Dienst";
    if (AnzGGDienst != AnzGGBereit)
    { ret += ", davon <font color='green'>" + AnzGGBereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += "<font color='green'> (alle einsatzbereit).</font><br>\n"; }
  }
  if (AnzRA)
  { ret += "<font color='#FFFFFF'>Rettungsdienst: </font>" + AnzRA + " insgesamt, " + AnzRADienst + " im Dienst";
    if (AnzRADienst != AnzRABereit)
    { ret += ", davon <font color='green'>" + AnzRABereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += "<font color='green'> (alle einsatzbereit).</font><br>\n"; }
  }
  if (AnzTA)
  { ret += "<font color='#000066'>Taucher: </font>" + AnzTA + " insgesamt, " + AnzTADienst + " im Dienst";
    if (AnzTADienst != AnzTABereit)
    { ret += ", davon <font color='green'>" + AnzTABereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += "<font color='green'> (alle einsatzbereit).</font><br>\n"; }
  }
  if (AnzAP)
  { ret += "<font color='#FF1100'>Flughafen: </font>" + AnzAP + " insgesamt, " + AnzAPDienst + " im Dienst";
    if (AnzAPDienst != AnzAPBereit)
    { ret += ", davon <font color='green'>" + AnzAPBereit + " einsatzbereit.</font><br>\n"; }
    else
    { if ((AnzAPDienst == 0) && (AnzAPBereit == 0)) { ret += " <b>(keiner einsatzbereit)</b>.<br>\n"; }
    	else 
    	ret += "<font color='green'> (alle einsatzbereit).</font><br>\n"; }
  }
  if (AnzLB)
  { ret += "<font color='#0000FF'>Löschboot: </font>" + AnzLB + " insgesamt, " + AnzLBDienst + " im Dienst";
    if (AnzLBDienst != AnzLBBereit)
    { ret += ", davon <font color='green'>" + AnzLBBereit + " einsatzbereit.</font><br>\n"; }
    else
    { if ((AnzLBDienst == 0) && (AnzLBBereit == 0)) { ret += " <b>(keiner einsatzbereit)</b>.<br>\n"; }
    	else 
    	ret += "<font color='green'> (alle einsatzbereit).</font><br>\n"; }
  }
  if (AnzRB)
  { ret += "<font color='#1865C9'>Rettungsboot: </font>" + AnzRB + " insgesamt, " + AnzRBDienst + " im Dienst";
    if (AnzRBDienst != AnzRBBereit)
    { ret += ", davon <font color='green'>" + AnzRBBereit + " einsatzbereit.</font><br>\n"; }
    else
    { if ((AnzRBDienst == 0) && (AnzRBBereit == 0)) { ret += " <b>(keiner einsatzbereit)</b>.<br>\n"; }
    	else 
    	ret += "<font color='green'> (alle einsatzbereit).</font><br>\n"; }
  }
  if (AnzTU)
  { ret += "<font color='#FF00FF'>TUIS Personal: </font>" + AnzTU + " insgesamt, " + AnzTUDienst + " im Dienst";
    if (AnzTUDienst != AnzTUBereit)
    { ret += ", davon <font color='green'>" + AnzTUBereit + " einsatzbereit.</font><br>\n"; }
    else
    { if ((AnzTUDienst == 0) && (AnzTUBereit == 0)) { ret += " <b>(keiner einsatzbereit)</b>.<br>\n"; }
    	else 
    	ret += "<font color='green'> (alle einsatzbereit).</font><br>\n"; }
   }
   if (AnzWF)
  { ret += "<font color='#804000'>2-Wege-Führerschein: </font>" + AnzWF + " insgesamt, " + AnzWFDienst + " im Dienst";
    if (AnzWFDienst != AnzWFBereit)
    { ret += ", davon <font color='green'>" + AnzWFBereit + " einsatzbereit.</font><br>\n"; }
    else
    { if ((AnzWFDienst == 0) && (AnzWFBereit == 0)) { ret += " <b>(keiner einsatzbereit)</b>.<br>\n"; }
    	else 
    	ret += "<font color='green'> (alle einsatzbereit).</font><br>\n"; }
  }
  if (AnzRZ)
  { ret += "<font color='#FF8000'>Rettungszug: </font>" + AnzRZ + " insgesamt, " + AnzRZDienst + " im Dienst";
    if (AnzRZDienst != AnzRZBereit)
    { ret += ", davon <font color='green'>" + AnzRZBereit + " einsatzbereit.</font><br>\n"; }
    else
    { if ((AnzRZDienst == 0) && (AnzRZBereit == 0)) { ret += " <b>(keiner einsatzbereit)</b>.<br>\n"; }
    	else 
    	ret += "<font color='green'> (alle einsatzbereit).</font><br>\n"; }
   }
  if (AnzHR)
  { ret += "<font color='#805F26'>Höhenretter: </font>" + AnzHR + " insgesamt, " + AnzHRDienst + " im Dienst";
    if (AnzRZDienst != AnzRZBereit)
    { ret += ", davon <font color='green'>" + AnzHRBereit + " einsatzbereit.</font><br>\n"; }
    else
    { if ((AnzHRDienst == 0) && (AnzHRBereit == 0)) { ret += " <b>(keiner einsatzbereit)</b>.<br>\n"; }
    	else 
    	ret += "<font color='green'> (alle einsatzbereit).</font><br>\n"; }
   }
  return ret;
}

function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link) { 
	var TBody = myTB.getElementsByTagName("tbody")[0];
	if (!TBody) return;
	var ArrTR = new Array();
	var TR=TBody.getElementsByTagName("tr");
	for (var i=0;i<TR.length;i++) {
		ArrTR.push(TR[i]);
	}
	if (ArrTR.length==0) return;

	ArrTR.sort(function(x,y){return TableSort(x,y,Spalte,Richtung,Numerisch,Link);});

	var H = "";
	for (var i=0;i<ArrTR.length;i++) H += "<tr>" + ArrTR[i].innerHTML + "</tr>\n";
  
	TBody.innerHTML = H;
}

function TableSort(Z1,Z2,S,richtung,num,link)
{ // sortiert Tabellenspalten nach Spalte S
  // übergeben werden zwei <tr> Objekte und die Spaltennummer,
  // nach der sortiert werden soll
  // die weiteren Parameter bedeuten:
  // richtung (t/f)    = Richtung (true = A->Z, false = Z->A)
  // num (true/false)  = numerisch sortieren? sonst alphanumerisch
  // link (true/false) = Zelleninhalt ist ein Link
  var S1,S2;
  
  var TDs = Z1.getElementsByTagName("td");
  if (TDs.length <= S) return 0;
  S1 = removeTags(TDs[S].innerHTML);

  TDs = Z2.getElementsByTagName("td");
  if (TDs.length <= S) return 0;
  S2 = removeTags(TDs[S].innerHTML);

  if (num)
  { S1 = parseInt(S1.replace(".",""));
    S2 = parseInt(S2.replace(".",""));
  }

  if (richtung)
  { if (S1<S2) return -1;
    if (S1>S2) return 1;
  }
  else
  { if (S1<S2) return 1;
    if (S1>S2) return -1;
  }
  return 0;
}

function ClearFreeVehiclesTable(auchHaken)
{ 
  // löschen aller Hervorhebungen und ggf. Haken in der Liste freier Fahrzeuge:
  var D = document.getElementsByClassName("free_vehicle")[0];
  var TB = D.getElementsByTagName("table")[0];
  if (TB==undefined) return;
  var TRs=TB.getElementsByTagName("tr");
  for ( var i=0;i < TRs.length;i++)
  { var TR=TRs[i]; 
  // Farbe entfernen
    TR.style.backgroundColor = '';
    
    var CB=TR.getElementsByTagName("input")[0];
    if (CB) 
    { CB.alt=undefined;
      if (CB.checked && auchHaken) CB.click(); 
    }
    
  }
}

function KonfigHTML()
{ 
  if (document.getElementById("DivKonfigurieren")) return "";
  
  var NewDiv = document.createElement("div");
  NewDiv.id = "DivKonfigurieren";
  var H="<br>";

  H += "<br><h2>global</h2>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfSaison'";
  if (showInfoSaison) H += " checked";
  H += "> Alternativen (saisonalen) Header anzeigen<br>\n";
  
  
  H += "<br><br><h2>Updateeinstellungen</h2>\n";
  
  H += '<table class="defaultTable">';
  H += '<tr><th></th><th>Update anbieten</th><th>Automatisch aktualisieren</th></tr>';  
  H += '<tr><td>Offizielle Version</td><td><input type="radio" name="updateSetting" value="CheckStable"';
  if ( updateSetting == "CheckStable" ) H += " checked";
  H += '></td><td><input type="radio" name="updateSetting" value="LoadStable"';
  if ( updateSetting == "LoadStable" ) H += " checked";
  H += '></td></tr><tr class="row1"><td>Testversion</td><td><input type="radio" name="updateSetting" value="CheckBeta"';
  if ( updateSetting == "CheckBeta" ) H += " checked";
  H += '></td><td><input type="radio" name="updateSetting" value="LoadBeta"';
  if ( updateSetting == "LoadBeta" ) H += " checked";
  H += '></td></tr></table>';
  
  
  
  H += "<br><br><h2>Einsatzübersichtstabelle</h2>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKlasseInListe'";
  if (showInfoKlasseInListe) H += " checked";
  H += "> Einsatzart anzeigen<br>\n";
  
  H += '<table class="defaultTable">';
  H += '<tr><th></th><th>Kein Sound</th><th>Durchsage</th><th>5Ton</th></tr>';  
  H += '<tr><td>Verbandsgroßschadenslage</td><td><input type="radio" name="vgsl" value="0"';
  if ( vgsl_sound == 0 ) H += " checked";
  H += '></td><td><input type="radio" name="vgsl" value="1"';
  if ( vgsl_sound == 1 ) H += " checked";
  H += '></td><td><input type="radio" name="vgsl" value="2"';
  if ( vgsl_sound == 2 ) H += " checked";
  H += '></td></tr><tr class="row1"><td>Großeinsatz</td><td><input type="radio" name="manv" value="0"';
  if ( manv_sound == 0 ) H += " checked";
  H += '></td><td><input type="radio" name="manv" value="1"';
  if ( manv_sound == 1 ) H += " checked";
  H += '></td><td><input type="radio" name="manv" value="2"';
  if ( manv_sound == 2 ) H += " checked";
  H += '></td></tr><tr><td>Alarmierung</td><td><input type="radio" name="alarm" value="0"';
  if ( alarm_sound == 0 ) H += " checked";
  H += '></td><td><input type="radio" name="alarm" value="1"';
  if ( alarm_sound == 1 ) H += " checked";
  H += '></td><td><input type="radio" name="alarm" value="2"';
  if ( alarm_sound == 2 ) H += " checked";
  H += '></td></tr></table>';
  

  H += "<br><h2>Infobox auf Einsatzseite</h2>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfEinsatzort'";
  if (showInfoEinsatzort) H += " checked";
  H += "> Einsatzort anzeigen<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfEinsatzNr'";
  if (showInfoEinsatzNr) H += " checked";
  H += "> Einsatz-Nr anzeigen<br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfEinsatzgebiet'";
  if (showInfoEinsatzgebiet) H += " checked";
  H += "> Zusatzinfo anzeigen<br>\n";
  

  H += "<input type='checkbox' name='KonfigBox' id='KonfKlasse'";
  if (showInfoKlasse) H += " checked";
  H += "> Stichwort anzeigen<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKlassenalarm'";
  if (showInfoKlassenalarm) H += " checked";
  H += "> gemäß Einsatzklasse zu alarmierende Fahrzeuge anzeigen<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKlassenalarmOpt'";
  if (showInfoKlassenalarmOpt) H += " checked";
  H += "> Anzeige der optionalen Fahrzeuge<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfRTW'";
  if (showInfoRTW) H += " checked";
  H += "> Anzeige der benötigten RTW<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfUnterwegs'";
  if (showInfoUnterwegs) H += " checked";
  H += "> Anzeige der Fahrzeuge, die bereits im Einsatz eingebunden sind<br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfNachforderungen'";
  if (showInfoNachforderungen) H += " checked";
  H += "> Anzeige der Fahrzeuge, die von der Einsatzstelle nachgefordert wurden<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfToAlarm'";
  if (showInfoToAlarm) H += " checked";
  H += "> Anzeige der zu alarmierenden Fahrzeuge<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfFahrzeit'";
  if (showInfoFahrzeit) H += " checked";
  H += "> Anzeige der Fahrzeiten zur Einsatzstelle (von-bis)<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfFahrzeitOpt'";
  if (showInfoFahrzeitOpt) H += " checked";
  H += "> Anzeige der Fahrzeiten für die optionalen Fahrzeuge<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfNichtVerfuegbar'";
  if (showInfoNichtVerfuegbar) H += " checked";
  H += "> Anzeige der benötigten, aber nicht verfügbaren Fahrzeuge<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfVerfuegbar'";
  if (showInfoVerfuegbar) H += " checked";
  H += "> Anzeige aller verfügbarer Fahrzeugklassen<br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfRTWplus'";
  if (showInfoRTWplus) H += " checked";
  H += "> einen RTW mehr schicken als ursprünglich bei der Alarmierung nötig<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfOptionalAnkreuzen'";
  if (showInfoOptionalAnkreuzen) H += " checked";
  H += "> Optionale Fahrzeuge automatisch auswählen<br>\n";
  
  
  H += "<br><h2>Fahrzeugmarkt</h2>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKdoW'";
  if (showInfoKdoW) H += " checked";
  H += "> KdoW im Fahrzeugmarkt anzeigen<br>\n";
  
  H += "<br><h2>Sonstige Einstellungen</h2>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfAnchorEinsatz'";
  if (showInfoAnchorEinsatz) H += " checked";
  H += "> Sprung unter Navigation auf Einsatzseite<br>\n";
  /*
  H += "<br><h2>Verbandseinstellungen</h2>\n";
  H += "Betrifft dich nur, wenn du im Verband Hogsmeade bist<br>";

  H += "<input type='checkbox' name='KonfigBox' id='KonfVerbandSound'";
  if (showInfoVerbandSound) H += " checked";
  H += "> Hogsmeade kann Töne abspielen lassen (z.B. bei Verbandsalarm)<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfProbeSound'";
  if (showInfoProbeSound) H += " checked";
  H += "> Spielt jeden ersten Samstag im Monat den Probealarm ab\n";
  */
  H += "<br><br>\n";
  H += "<br><a href='" + adr + "'>Seite aktualisieren</a><br>\n";
  
  H += "<br><br><a href='http://www.feuerwache.net/auftraege'>Auftragsliste des Verbandes bearbeiten</a><br>\n";
  
  
  NewDiv.innerHTML = H;
  return NewDiv;
}

function KonfigBox_clicked(){ 
mylog("KonfigBox_clicked");
  var Boxes = document.getElementsByName("KonfigBox");
  mylog("#Boxes = " + Boxes.length);

  for (var i=0;i<Boxes.length;i++) { 
	var Box=Boxes[i];
    var VarNam = Box.id.replace ("Konf","showInfo");
    var OldVal = eval(VarNam);
    var NewVal = Box.checked;
	
    mylog(VarNam + " von " + OldVal + " nach " + NewVal);
    eval(VarNam + " = " + NewVal);
    mylog("Test, " + VarNam + " ist jetzt " + eval(VarNam));
  }
  
  SetVariables();
}

function zweiterAbmarsch_clicked(e) { 
	var zATr = document.getElementById("zweiterAbmarschTr").checked;
  var zAGG = document.getElementById("zweiterAbmarschAusb").checked;
  
  if (e.target.id == "zweiterAbmarschTr" && zATr) zAGG=false;
  if (e.target.id == "zweiterAbmarschAusb" && zAGG) zATr=false;
  zweiterAbmarsch = 0;
  if (zATr) zweiterAbmarsch = 1;
  if (zAGG) zweiterAbmarsch = 2;

  GM_setValue("zweiterAbmarsch",zweiterAbmarsch);
 // ClearFreeVehiclesTable(true);
  FirstRun=true;
  main();
}

function alarmTyp_clicked(e) {
  var rtw = document.getElementById("RTWZeit").checked;
  var erkund = document.getElementById("Erkundungsmodus").checked;
  
  if (e.target.id == "RTWZeit" && rtw) erkund=false;
  if (e.target.id == "Erkundungsmodus" && erkund) rtw=false;
  
  alarmtyp=0;
  if (rtw) alarmtyp = 1;
  if (erkund) alarmtyp = 2;

  GM_setValue("alarmtyp",alarmtyp);
  
  ClearFreeVehiclesTable(true);
  FirstRun=true;
  main();
}


function machVorschlag_clicked(e){ 
	machVorschlag = document.getElementById("machVorschlag").checked;
  
  ClearFreeVehiclesTable(true);
  FirstRun=true;
  main();
}

/*
function Erkundungsmodus_clicked(e) {
	Erkundungsmodus=document.getElementById("Erkundungsmodus").checked;
	GM_setValue("Erkundungsmodus",Erkundungsmodus);
	
	if (Erkundungsmodus) Erkundungsmodus=false;
	document.getElementById("machVorschlag").checked=false;
	GM_setValue("machVorschlag",false);
	document.getElementById("RTWZeit").checked=false;
	GM_setValue("RTWZeit",false);
	location.reload();
}

function RTWZeit_clicked(e) {
	RTWZeit=document.getElementById("RTWZeit").checked;
	GM_setValue("RTWZeit",RTWZeit);
	
	if (RTWZeit) RTWZeit=false;
	document.getElementById("Erkundungsmodus").checked=false;
	GM_setValue("Erkundungsmodus",false);
	document.getElementById("machVorschlag").checked=false;
	GM_setValue("machVorschlag",false);
	location.reload();
}
*/

function FillAlarmListe(Einsatzklasse,area)
{ mylog("FillAlarmListe(" + Einsatzklasse + ")");
  var FZ = getFahrzeugListe(Einsatzklasse);
  ToAlarm = new Array;
  Optional = new Array;
var postalternativ;
  var Teile = FZ.split("|");
  
  //Bei jedem Fahrzeug checken, obs schon benötigt wird!
  var preAlarm=Teile[0].split(",");
  for (var i=0;i<preAlarm.length;i++) {
  
	if ( preAlarm[i].match("/")) {
		postalternativ="";
		var prealternativ=preAlarm[i].split("/");
		for (var j=0;j<prealternativ.length;j++) {
			var bedingungen=Fahrzeugbedingungen[prealternativ[j]].split("|");
			if ( area != 'Der Einsatz befindet sich in deinem Verband') {
				if ( parseInt(bedingungen[0]) > showAnzahlFW ) continue;
				if ( parseInt(bedingungen[1]) > showAnzahlBF ) continue;
			}
			if ( postalternativ ) postalternativ+="/";
			postalternativ+=prealternativ[j];
		}
		ToAlarm.push(postalternativ);
	}
	else {
		var bedingungen=Fahrzeugbedingungen[preAlarm[i]].split("|");

		if ( area != 'Der Einsatz befindet sich in deinem Verband') {
			if ( parseInt(bedingungen[0]) > showAnzahlFW ) continue;
			if ( parseInt(bedingungen[1]) > showAnzahlBF ) continue;
		}
		ToAlarm.push(preAlarm[i]);
	}
  }

  
  if (Teile.length > 1) {
	var preOptional=Teile[1].split(",");
	for (var i=0;i<preOptional.length;i++) {
		var bedingungen=Fahrzeugbedingungen[preOptional[i]].split("|");
		
		if ( area != 'Der Einsatz befindet sich in deinem Verband') {
			if ( parseInt(bedingungen[0]) > showAnzahlFW ) continue;
			if ( parseInt(bedingungen[1]) > showAnzahlBF ) continue;
		}
		Optional.push(preOptional[i]);
	}
  }
  
  return;
}

function AddNachforderungen()
{ var D = document.getElementById("mission_reply");
  if (D==undefined) return "";
  var TB = D.getElementsByTagName("table");
  if (TB.length == 0) return "";
  var TRs = TB[0].getElementsByTagName("tr");
  var alleNF="";
  for (var z=1;z<TRs.length;z++)
  { var TR=TRs[z];
    if (TR.getElementsByTagName("td").length>=2)
    { var Q = TR.getElementsByTagName("td")[1].innerHTML;
      if (Q.indexOf("Leitstelle:") == -1)
      { /*var RM = TR.getElementsByTagName("td")[2].innerHTML;
        if (RM != undefined)
        { NFFZ = getNachforderungFahrzeug(RM);
          if (NFFZ != "") 
          { if (FZinEinsatz(NFFZ)) NFFZ="";
            if (NFFZ != "")
            {
              ToAlarm.push(NFFZ);
              alleNF += "," + NFFZ;
            }
          }
        }*/
      }
	  else {
		if ( unsafeWindow.feuerwache_layout=='black') var color='green';
		else var color='red';
		TR.style.backgroundColor=color;
	  }
    }
  }
  
	var divs=document.getElementsByClassName("mission_reply_vehicle_required");
	l=divs.length;
	for ( var i=0;i<l;i++) {
	required=divs[i];
	if ( required) {
		var required_number=required.innerHTML;
			var fzg=fahrzeuge_ids[required_number];
			if ( fzg != 'undef' ) {
				if ( ! FZinEinsatz(fzg)) {
					ToAlarm.push(fzg);
					alleNF += "," + fzg;
				}
			}
	}
	}

  
  if (alleNF != "") alleNF = alleNF.substr(1,100);
  mylog("Nachforderung: " + alleNF);
  return alleNF;
}

function FZinEinsatz(FZ)
{ mylog ("FZinEinsatz(" + FZ + ")");
  mylog ("ToAlarm="+ToAlarm+"\nUnterwegs="+Unterwegs);

  var FZistDrin = false;

  l=ToAlarm.length;
  for ( var i=0;i<l;i++) {
  FZA=ToAlarm[i];
   var A = FZA.split("/");

	ll=A.length;
	for ( var j=0;j<ll;j++) if (A[j] == FZ) FZistDrin = true; 
  }

  l=Unterwegs.length;
  for ( var i=0;i<l;i++) if (Unterwegs[i] == FZ) FZistDrin = true;
  return FZistDrin;
}

function FillUnterwegsListe() { 
	Unterwegs = new Array;
  AmOrt = new Array;
  AufAnfahrt = new Array;
  Wartend = new Array;
  
  // Fahrzeuge am Ort
  var d = document.getElementById("mission_vehicle");
  if (d.getElementsByTagName("table").length == 1) { var TB=d.getElementsByTagName("table")[0];
    TRs=TB.getElementsByTagName("tr");
	var l=TRs.length;
	for ( var i=0;i<l;i++) {
		var FZ;
		try { 
			var FZ=TRs[i].getElementsByTagName("td")[1].innerHTML;
			if ( ! TRs[i].getElementsByTagName("td")[0].innerHTML.match('[\(]') && Verbandseinsatz()) TRs[i].style.backgroundColor='green';
			if ( Einsatzklasse=='KFB LZR' || Einsatzklasse=='KFB FZ WT' || Einsatzklasse=='KFB FZ WF') if ( TRs[i].getElementsByTagName("td")[0].innerHTML.match('[\(]')) continue;
			  
			FZ = getFahrzeugKlasse(FZ);
			Unterwegs.push(FZ);
			AmOrt.push(FZ);
		} catch(e) {};
    }
  }
  
  // Container am Ort
  var d = document.getElementById("mission_container");
  if (d.getElementsByTagName("table").length == 1) { 
	var TB=d.getElementsByTagName("table")[0];
    TRs=TB.getElementsByTagName("tr");
	var l=TRs.length;
	for ( var i=0;i<l;i++) {
		var FZ;
		try {
			ab_id=TRs[i].getAttribute("container_id");
			if ( ab_id != null && ! TRs[i].innerHTML.match("profil") ) {
				FZ=getContainerName(ab_id);
				Unterwegs.push(FZ);
				AmOrt.push(FZ);
			}
      } catch(e) {};
    }
  }
  
  // Fahrzeuge auf Anfahrt
  var d = document.getElementById("driving_vehicle");
  if (d.getElementsByTagName("table").length == 1)
  { var TB=d.getElementsByTagName("table")[0];
	TRs=TB.getElementsByTagName("tr");
	var l=TRs.length;
	for ( var i=0;i<l;i++) {
		var FZ;
		try { 
			var FZ=TRs[i].getElementsByTagName("td")[1].innerHTML; 
			if ( ! TRs[i].getElementsByTagName("td")[0].innerHTML.match('[\(]') && Verbandseinsatz()) TRs[i].style.backgroundColor='green';
			if ( Einsatzklasse=='KFB LZR' || Einsatzklasse=='KFB FZ WT' || Einsatzklasse=='KFB FZ WF') if ( TRs[i].getElementsByTagName("td")[0].innerHTML.match('[\(]')) continue;
			if ( FZ == "Wechsellader" ) {
				ab_id=TRs[i].getAttribute("container_id");
				var FZ=getContainerName(ab_id);
			}
			else {
				FZ = getFahrzeugKlasse(FZ);
			}
			Unterwegs.push(FZ);
			AufAnfahrt.push(FZ);
        } catch(e) {};
    }
  }
  
  // Fahrzeuge wartend
  var d = document.getElementById("waiting_vehicle");
  if (d.getElementsByTagName("table").length == 1)
  { var TB=d.getElementsByTagName("table")[0];
    TRs=TB.getElementsByTagName("tr");
	var l=TRs.length;
	for ( var i=0;i<l;i++) {
		var FZ;
		try { 
			var FZ=TRs[i].getElementsByTagName("td")[1].innerHTML; 
			if ( ! TRs[i].getElementsByTagName("td")[0].innerHTML.match('[\(]') && Verbandseinsatz()) TRs[i].style.backgroundColor='green';
			if ( TRs[i].getElementsByTagName("td")[0].innerHTML.match('kein Personal')) continue;
			if ( Einsatzklasse=='KFB LZR' || Einsatzklasse=='KFB FZ WT' || Einsatzklasse=='KFB FZ WF') if ( TRs[i].getElementsByTagName("td")[0].innerHTML.match('[\(]')) continue;
			if ( FZ == "Wechsellader" ) {
				ab_id=TRs[i].getAttribute("container_id");
				var FZ=getContainerName(ab_id);
			}
			else {
				FZ = getFahrzeugKlasse(FZ);
			}
			Unterwegs.push(FZ);
			Wartend.push(FZ);
      } catch(e) {};
    }
  }

 if ( document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML.match("Eingetroffen") ) {
 	Unterwegs.push("RTZ");
	AmOrt.push("RTZ");
 }
 else if ( document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML.match("Auf Anfahrt") ) {
	Unterwegs.push("RTZ");
	AufAnfahrt.push("RTZ");
 }
 else if ( document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML.match("Einsatz für den RTZ anzeigen") ) {
	Unterwegs.push("RTZ");
	Wartend.push("RTZ");
 }
}

function bereinigeToAlarm() { 
// Alternativ-FZ in ToAlarm ans Ende stellen:

  for (var ta=0; ta<ToAlarm.length; ta++) if (ToAlarm[ta].indexOf("/") != -1) ToAlarm[ta] = "ZZZ/" + ToAlarm[ta];
  ToAlarm = ToAlarm.sort();
  for (var ta=0; ta<ToAlarm.length; ta++) if (ToAlarm[ta].indexOf("ZZZ/") != -1) ToAlarm[ta] = ToAlarm[ta].substring(4,100);

  // ebenso in Optional:
  mylog("vorher:"+Optional);
  for (var ta=0; ta<Optional.length; ta++)
  { if (Optional[ta].indexOf("/") != -1) Optional[ta] = "ZZZ/" + Optional[ta]; }
  Optional = Optional.sort();
  for (var ta=0; ta<Optional.length; ta++)
  { if (Optional[ta].indexOf("ZZZ/") != -1) Optional[ta] = Optional[ta].substring(4,100); }
  mylog("nachher:"+Optional);
  
  var gefunden=false;

  l=Unterwegs.length;
  for ( var z=0;z<l;z++) {
	gefunden=false;

    for (var j=0; j<ToAlarm.length; j++) {
		var ALT = ToAlarm[j].split("/");

		for (a=0; a<ALT.length; a++) {

			if (Unterwegs[z] == ALT[a]) {
				ToAlarm.splice(j,1); 
				//j=ToAlarm.length;
				gefunden=true;
			}
		}
    }
	
    if (!gefunden)
    { for (var b=0; b<Optional.length; b++)
      { var ALT = Optional[b].split("/");
        for (k=0; k<ALT.length; k++)
        { if (Unterwegs[z] == ALT[k]) 
          { Optional.splice(b,1); 
			//i=Optional.length;
            gefunden=true;
          }
        }
      }
    }
  }

}

function Verletzte() { 
	var TRs = document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr");
	for (var i=0; i<TRs.length; i++) { 
		var TR = TRs[i];
		if (TR.getElementsByTagName("td")[0].innerHTML == "Verletzte") { 
			var T = TR.getElementsByTagName("td")[1].innerHTML;
			T=T.split('alt="Pill"> ');
			T=T[1].split(' Personen');
			//var pos = T.indexOf("Personen - für jede Person") - 5;
			//T = T.substr(pos,5);
			var Anz = parseInt(T[0]);
			return Anz;
		}
	}
	return 0;
}


function getFahrzeugKlasse(Fahrzeugname)
{ mylog("getFahrzeugKlasse(" + Fahrzeugname + ")");
  var FZ = Fahrzeugklassen[Fahrzeugname];
  if (FZ == undefined) FZ=Fahrzeugname; 
  mylog("returns " + FZ);
  return FZ;
}

function getFahrzeuggeschwindigkeit(Fahrzeugname)
{ var G = Fahrzeuggeschwindigkeiten[Fahrzeugname];
  if (G == undefined) G = 1000;
  G = parseInt(G);
  return G;
}

function getEinsatzKlasse(Stichwort,area)
{ if (AlleGleich) return "-gleich-";
  mylog("getEinsatzKlasse(" + Stichwort + ")");
  
  if ( area.match('Neustadt') ) {
	var Stichwort_n=Stichwort+'_n';
  }
  EK=Einsatzklassen[Stichwort_n];
  if (EK == undefined) EK=Einsatzklassen[Stichwort];;
  
  if (EK == undefined) EK = "undef";
  mylog("returns " + EK);
  return EK;
}

function getNachforderungFahrzeug(Rueckmeldung)
{ mylog("getNachforderungFahrzeug(" + Rueckmeldung + ")");

  var FZ = Nachforderungen[Rueckmeldung];
  if (FZ == undefined) FZ = errateNachforderungFahrzeug(Rueckmeldung);
  mylog("returns " + FZ);
  return FZ;
}

function errateNachforderungFahrzeug(Rueckmeldung)
{ for (F in Fahrzeugklassen)
  { if (Rueckmeldung.indexOf(F) != -1) 
    { return Fahrzeugklassen[F]; }
  }
  return "";
}

function getFahrzeugListe(EKListe)
{ mylog("getFahrzeugListe(" + EKListe + ")");
  if (AlleGleich) return AlleGleich;
  var Klasse="", dazu="", opt="";
  var Teile;
  
  if (EKListe.indexOf("|") != -1)
  { Teile = EKListe.split("|");
    EKListe = Teile[0];
    opt = Teile[1];
  }

  if (EKListe.indexOf("+") != -1)
  { Teile = EKListe.split("+");
    Klasse = Teile[0];
    dazu = Teile[1];
  }
  else
  { var X=getEinsatzklasseFahrzeugliste(EKListe);
    if (X != "")
    { Klasse = EKListe; }
    else
    { dazu = EKListe; }
  }

  mylog("Klasse=" + Klasse + "\ndazu=" + dazu + "\nopt=" + opt);

  Klasse = getEinsatzklasseFahrzeugliste(Klasse);
  if (Klasse != "" && dazu != "") Klasse +=",";
  Klasse += dazu;
  if (opt != "") Klasse += "|" + opt;
  
  mylog("ToAlarm = " + Klasse);
	
  var verletzte=document.getElementsByClassName('defaultTable')[0].getElementsByTagName('td');
  //if ( verletzte.length >= 10 && alarmtyp == 2 && verletzte[6].firstChild.nodeValue == 'Ausbreitung') Klasse='LF/RTW';
  if ( verletzte.length == 6 && alarmtyp == 2 ) Klasse='LF/RTW';
  else if ( verletzte.length == 8 && alarmtyp == 2 && verletzte[4].firstChild.nodeValue != 'Verletzte' ) Klasse='LF/RTW';
  
  return Klasse;
}

function getEinsatzklasseFahrzeugliste(Einsatzklasse)
{ mylog("getEinsatzklasseFahrzeugliste(" + Einsatzklasse +")");

  var FZL = Einsatzklasse_Fahrzeugzuordnung[Einsatzklasse];
  if (FZL == undefined)
  { mylog ("Einsatzklasse '" + Einsatzklasse + "' nicht definiert!")
    FZL = "";
  }
  mylog("returns " + FZL);
  return FZL;
}

function getStichwort(Text){
  var Stichwort=Text;
  var Teile = Text.split(">");
  if (Teile.length > 1) 
  { Stichwort = Teile[1]; }
  Stichwort = trim(Stichwort);
  return Stichwort;
}


function trim (S) 
{ return S.replace (/^\s+/, '').replace (/\s+$/, '');
}
function removeTags (S) 
{ return trim(S.replace(/<.*?>/g, ''));
}
function makeDots(Zahl)
{ var Str = Zahl.toString();
  var ret = "";
  while (Str.length>3)
  { ret = "." + Str.substr(Str.length-3,3) + ret;
    Str = Str.substr(0,Str.length-3);
  }
  if (Str.length>0) 
  { ret = Str + ret; }
  else
  { ret = ret.substr(1,ret.length-1); }
  
  return ret;
}

function MarkiereFahrzeuge()
{ var D = document.getElementsByClassName("free_vehicle")[0];
  var TB = D.getElementsByTagName("table")[0];
  if (TB==undefined) return;
  var Zeilen = TB.getElementsByTagName("tr");
  var Anfahrt="";
  
  var imax=0;
  var imin=9999;

  for (var opt=0; opt<Optional.length; opt++)
  { var FZ = Optional[opt];
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;
    mylog("(opt) suche nach " + AlternativFZ);
    for (var i=1; i<Zeilen.length-1; i++)
    { var ThisZeile = Zeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      var ThisFZ = getFahrzeugKlasse(ThisSpalten[2].firstChild.nodeValue);
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var C = ThisSpalten[0].getElementsByTagName("input")[0];
        var RN = ThisSpalten[1].getElementsByTagName("a")[0];
        if (RN) RN = RN.innerHTML;
        if (C.alt != "x" && RN.substr(0,3).toUpperCase() != "XXX")
        { mylog("(opt) gefunden:" + ThisFZ);
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#C95614";
          C.alt = "x";
          if (i>imax) imax=i;
          if (i<imin) imin=i;
          i=Zeilen.length;
        } // not checked
      } // FZ passt
    } // for Zeilen
  } // alle Optionalen
  
  if (imax>0)
  { var Zeile = Zeilen[imax];
    Anfahrt = "<font color=#C95614>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=#C95614>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
    }
  }
  
  return Anfahrt;
}  

function AlarmiereFahrzeuge()
{ ClearFreeVehiclesTable(!CBClicked);

  var D = document.getElementsByClassName("free_vehicle")[0];
  var TB = D.getElementsByTagName("table")[0];
  if (TB==undefined) return;
  var Zeilen = TB.getElementsByTagName("tr");
  var AlarmZeilen = new Array();
  var Anfahrt="";
  
  var imax=0;
  var imin=9999;
  
  for (var ta=0; ta<ToAlarm.length; ta++){ 
	var FZ = ToAlarm[ta];
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;
    mylog("suche nach " + AlternativFZ);
    
    for (var i=1; i<Zeilen.length-1; i++) { 
		var ThisZeile = Zeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      var ThisFZ = getFahrzeugKlasse(ThisSpalten[2].innerHTML);
      var passt=false;
	  	  
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      
	  if (passt){ 
		var C = ThisSpalten[0].getElementsByTagName("input")[0];
        var RN = ThisSpalten[1].getElementsByTagName("a")[0];
        if (RN) RN = RN.innerHTML;
        if (C.alt != "x" && RN.substr(0,3).toUpperCase() != "XXX"){ 
		if ( alarmtyp==1) {
			var fahrzeit=ThisSpalten[4].firstChild.nodeValue;
			if (ThisFZ == 'RTW' && ( fahrzeit.split(" Min.")[0] > 20 || fahrzeit.match("Std.") )) continue;
	    } 
	 
		mylog("gefunden:" + ThisFZ);
          if (FirstRun || !CBClicked) { 
			clickCheckbox(C);
            AlarmZeilen.push (ThisZeile);
          }
          C.alt="x";
		
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#1865C9";
          FZ = "gefunden";
          ToAlarm[ta] = "gefunden";
          if (i>imax) imax=i;
          if (i<imin) imin=i;
          i=Zeilen.length;
        } // not checked
      } // FZ passt
    } // for Zeilen
  } // alle ToAlarm

  if (imax>0)
  { var Zeile = Zeilen[imax];
    Anfahrt = "<font color=#1865C9>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=#1865C9>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
    }
  }

  if (zweiterAbmarsch != 0)
  { var AlarmWachen = new Array();
    var WachAlarm = new Array();
    
    for (var i=0; i<AlarmZeilen.length; i++)
    { var ThisZeile = AlarmZeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      var ThisCheckbox = ThisSpalten[0].getElementsByTagName("input")[0];
      var ThisWache = ThisSpalten[3].getElementsByTagName("a")[0].innerHTML;
      var ThisFZTyp = GrTrFahrzeug(ThisSpalten[2].innerHTML);
      var ThisFZAusb = AusbFahrzeug(ThisSpalten[2].innerHTML);
      var ThisFunkName = ThisSpalten[1].innerHTML;
      var FNEndLink = ThisFunkName.indexOf("</a>");
      var ThisFZUnterwegs = ( trim(ThisFunkName.substr(FNEndLink+4)) == "(unterwegs)" );
      
      if (!ThisFZUnterwegs)
      { if (!WachAlarm[ThisWache])
        { AlarmWachen.push (ThisWache);
          WachAlarm[ThisWache] = Array();
          WachAlarm[ThisWache][0] = "";
          WachAlarm[ThisWache][1] = "";
        }
        if (zweiterAbmarsch == 1)
        {
          if (ThisFZTyp == "Gr") WachAlarm[ThisWache][0] += "," + i;
          if (ThisFZTyp == "Tr") WachAlarm[ThisWache][1] += "," + i;
        }
        else if (zweiterAbmarsch == 2)
        {
          if (ThisFZAusb == "") WachAlarm[ThisWache][0] += "," + i;
          if (ThisFZAusb == "Ausb") WachAlarm[ThisWache][1] += "," + i;
        }
      }
    }
	
	for ( var i=0;i<AlarmWachen.length;i++) {
		W=AlarmWachen[i];
		if (WachAlarm[W][0] && WachAlarm[W][1]) { 
			var StornoZeilen = WachAlarm[W][0].split(",");
			for ( var j=0;j<StornoZeilen.length;j++) {
				SZ=StornoZeilen[j];
				if (SZ) clickCheckbox(AlarmZeilen[SZ].getElementsByTagName("input")[0]);
			}
		}
    }
  }
  
  for (ta=ToAlarm.length; ta>=0; ta--)
  { if (ToAlarm[ta]=="gefunden") ToAlarm.splice(ta,1); }
  
  return Anfahrt;
}

function GrTrFahrzeug(FZBez)
{ var ret="";
  ret = "Tr";
  if (FZBez.substr(0,3) == "LF ") ret="Gr";
  if (FZBez.substr(0,4) == "HLF ")   ret="Gr";
  if (FZBez == "Kleinlöschfahrzeug") ret="Gr";
  mylog("FZBez = " + FZBez + ", Typ=" + ret);
  return ret;
}  

function AusbFahrzeug(FZBez)
{ var ret="";
  if (FZBez == "GW-Gefahrgut") ret="Ausb";
  if (FZBez == "GW-Messtechnik") ret="Ausb";
  if (FZBez == "GW-Taucher") ret="Ausb";
  if (FZBez == "RTW") ret="Ausb";
  if (FZBez == "Flugfeldlöschfahrzeug") ret="Ausb";
  if (FZBez == "Rettungstreppe") ret="Ausb";
  if (FZBez == "Feuerlöschboot") ret="Ausb";
  if (FZBez == "Rettungsboot") ret="Ausb";
  if (FZBez == "GW-TUIS") ret="Ausb";
  if (FZBez == "HLF 24/14-S") ret="Ausb";
  mylog("FZBez = " + FZBez + ", Typ=" + ret);
  return ret;
}  
  
function zaehleVerfuegbar()
{ // Array aufbauen, Reihenfolge wie in Fahrzeugklassen  
  var ArrFZK = new Array();
  var strFZK = "";

  for (F in Fahrzeugklassen)
  { var FZK = Fahrzeugklassen[F];
    if (!strFZK.match("#"+FZK+"#"))
    { ArrFZK.push(FZK);
      strFZK += "#" + FZK + "#";
    }
  }
  
  var AnzFZK=new Array();
  var AnzFZKXXX=new Array();
  l=ArrFZK.length;
  for ( var i=0;i<l;i++) {
  FZK=ArrFZK[i];
  AnzFZK[FZK]=0;
    AnzFZKXXX[FZK]=0;
  }
  
  var FV=document.getElementsByClassName("free_vehicle");
  if (!FV) return "";
  var TB=FV[0].getElementsByTagName("table");
  if (TB.length==0) return "";
  
	var TR=TB[0].getElementsByTagName("tr");
	for (var i=0;TR.length > i; i++){
		var FZ;
		var TDs=TR[eval("i")].getElementsByTagName("td");
		if (TDs.length==5) 
		{ FZ=TDs[2].innerHTML;
		var FN=TDs[1].getElementsByTagName("a")[0].innerHTML;
		var FZK=getFahrzeugKlasse(FZ);
		if (FN.substr(0,3).toUpperCase()=="XXX")
		{ AnzFZKXXX[FZK]++; }
		else
		{ AnzFZK[FZK]++; }
		}
	}
  
  // Tabelle Fzg wenn 0 dann rot, sonst grün
  var ret = "<table border='0' style='min-width:100%;'><tr>";
  var c=0;

  l=ArrFZK.length;
  for ( var i=0;i<l;i++) {
  FZ=ArrFZK[i];
  if ( Einsatzklasse.charAt(0) == 'X' && FZ != 'Rettungsboot' && FZ!='Feuerlöschboot') continue;
  else if ( Einsatzklasse.charAt(0) != 'X' && ( FZ == 'Rettungsboot' || FZ=='Feuerlöschboot' ) ) continue;
  
  if (c==MAXSPALTENVERFUEGBAR) c=0, ret+="</tr><tr>";
    if (AnzFZK[FZ] == 0) ret += "<td style='border:0;text-align:center;'><font size=2><b><font color='red'>"+AnzFZK[FZ]+"</b></font></font>";

var colour;
if ( unsafeWindow.feuerwache_layout == 'light') colour='green';
else colour='lime';

    if (AnzFZK[FZ] != 0) ret += "<td style='border:0;text-align:center;'><font size=2><b><font color='"+colour+"'>"+AnzFZK[FZ]+"</b></font></font>";

var colour;
if ( unsafeWindow.feuerwache_layout == 'light') colour='red';
else colour='orange';

    if (AnzFZKXXX[FZ]) ret +="<font color='"+colour+"'>/"+AnzFZKXXX[FZ]+"</font>";
    ret += "<br>"+FZ+"&nbsp;</td>";
    c++;
  }
  ret +="</tr></table>";
  return ret;
}


function mylog(Text)
{ if (!debugging) return;

  var Jetzt = new Date();
  GM_log(Jetzt.toLocaleString() + "\n" + Text); 
}

function GetVariables()
{ mylog("GetVariables");

  showInfoKlasseInListe = GM_getValue("showInfoKlasseInListe",true);
  showInfoEinsatzNr = GM_getValue("showInfoEinsatzNr",true);
  showInfoEinsatzort = GM_getValue("showInfoEinsatzort",true);
  showInfoEinsatzgebiet = GM_getValue("showInfoEinsatzgebiet",true);
  showInfoKlasse = GM_getValue("showInfoKlasse",true);
  showInfoKlassenalarm = GM_getValue("showInfoKlassenalarm",true);
  showInfoKlassenalarmOpt = GM_getValue("showInfoKlassenalarmOpt",true);
  showInfoRTW = GM_getValue("showInfoRTW",true);
  showInfoUnterwegs = GM_getValue("showInfoUnterwegs",true);
  showInfoNachforderungen = GM_getValue("showInfoNachforderungen",true);
  showInfoToAlarm = GM_getValue("showInfoToAlarm",true);
  showInfoFahrzeit = GM_getValue("showInfoFahrzeit",true);
  showInfoFahrzeitOpt = GM_getValue("showInfoFahrzeitOpt",true);
  showInfoNichtVerfuegbar = GM_getValue("showInfoNichtVerfuegbar",true);
  showInfoVerfuegbar = GM_getValue("showInfoVerfuegbar",true);
  showInfoRTWplus    = GM_getValue("showInfoRTWplus",true);
  showInfoKdoW    = GM_getValue("showInfoKdoW",true);
  manv_sound    = GM_getValue("manv_sound",1);
  showInfoVerbandSound    = GM_getValue("showInfoVerbandSound",true);
  showInfoProbeSound    = GM_getValue("showInfoProbeSound",true);
  vgsl_sound    = GM_getValue("vgsl_sound",1);
  alarm_sound    = GM_getValue("alarm_sound",0);
  showInfoSaison    = GM_getValue("showInfoSaison",true);
  updateSetting    = GM_getValue("updateSetting","CheckStable");
  soundplayed = GM_getValue("soundplayed",'');
  showInfoOptionalAnkreuzen    = GM_getValue("showInfoOptionalAnkreuzen",false);
  showInfoAnchorEinsatz    = GM_getValue("showInfoAnchorEinsatz",true);
  
  ScriptUpdateAvailable = GM_getValue("pleaseUpdate","");
}

function SetVariables(){
 mylog("SetVariables");
  
  GM_setValue("showInfoKlasseInListe",showInfoKlasseInListe);
  GM_setValue("showInfoKdoW",showInfoKdoW);
  GM_setValue("showInfoOptionalAnkreuzen",showInfoOptionalAnkreuzen);
  GM_setValue("showInfoAnchorEinsatz",showInfoAnchorEinsatz);
  GM_setValue("showInfoVerbandSound",showInfoVerbandSound);
  GM_setValue("showInfoProbeSound",showInfoProbeSound);
  GM_setValue("showInfoEinsatzNr",showInfoEinsatzNr);
  GM_setValue("showInfoEinsatzort",showInfoEinsatzort);
  GM_setValue("showInfoEinsatzgebiet",showInfoEinsatzgebiet);
  GM_setValue("showInfoKlasse",showInfoKlasse);
  GM_setValue("showInfoKlassenalarm",showInfoKlassenalarm);
  GM_setValue("showInfoKlassenalarmOpt",showInfoKlassenalarmOpt);
  GM_setValue("showInfoRTW",showInfoRTW);
  GM_setValue("showInfoUnterwegs",showInfoUnterwegs);
  GM_setValue("showInfoNachforderungen",showInfoNachforderungen);
  GM_setValue("showInfoToAlarm",showInfoToAlarm);
  GM_setValue("showInfoFahrzeit",showInfoFahrzeit);
  GM_setValue("showInfoFahrzeitOpt",showInfoFahrzeit);
  GM_setValue("showInfoNichtVerfuegbar",showInfoNichtVerfuegbar);
  GM_setValue("showInfoVerfuegbar",showInfoVerfuegbar);
  GM_setValue("showInfoRTWplus",showInfoRTWplus);
  GM_setValue("showInfoSaison",showInfoSaison);
}

function ZeitToSek(txtZeit)
{ // errechnet aus der Klartext-Zeit die Anzahl der Sekunden
  var Teile = txtZeit.split(".");
  var sek=0;

  l=Teile.length;
  for ( var i=0;i<l;i++) {
  Teil=Teile[i];
  Teil = trim(Teil);
    var Wert = Teil.split(" ");
    var Zahl = Wert[0];
    if (Zahl.match("0[1-9]+")) Zahl = Zahl.substr(1,Zahl.length);
    Zahl = parseInt(Zahl);
    var Einheit = Wert[1];
    switch (Einheit)
    { case "Sek": sek += Zahl; break;
      case "Min": sek += Zahl*60; break;
      case "Std": sek += Zahl*3600; break;
    }
  }
  return sek;
}

function Verbandseinsatz()
{ var User="X";
  var ret=false;

  var Obj = document.getElementById("navigation_top");
  if (Obj) Obj = Obj.getElementsByTagName("ul")[0];
  if (Obj) Obj = Obj.getElementsByTagName("ul")[0];
  if (Obj) Obj = Obj.getElementsByTagName("li")[0];
  if (Obj) Obj = Obj.getElementsByTagName("a")[0];
  if (Obj) Obj = Obj.innerHTML;
  if (Obj) User = Obj.replace(/Benutzer: /,"");
  mylog("User = " + User);

  Obj = document.getElementById("mission_content");
  if (Obj) Obj = Obj.getElementsByTagName("table")[0];
  if (Obj)
  { var TRs=Obj.getElementsByTagName("tr");
    for (var t=0;t<TRs.length;t++)
    { var TR=TRs[t];
      var THText = TR.getElementsByTagName("td")[0].innerHTML;
      if (THText == "Einsatz von")
      { var UserEinsatz="Y";
        Obj = TR.getElementsByTagName("td")[1];
        if (Obj) Obj = Obj.getElementsByTagName("a")[0];
        if (Obj) UserEinsatz=Obj.innerHTML;
        if (User != UserEinsatz) ret=true;
      }
    }
  }

  mylog("Verbandseinsatz=" + ret);
  return ret;
}


function NowDateString() { 
	var Now = new Date();
  var X,R="";
  var X = Now.getFullYear();
  R+=X;
  X = "0" + (Now.getMonth()+1);
  X = X.substr(X.length-2,2);
  R+=X;
  X = "0" + Now.getDate();
  X = X.substr(X.length-2,2);
  R+=X;
  X = "0" + Now.getHours();
  X = X.substr(X.length-2,2);
  R+=X;
  
  return R;
}

function updateTest() { 
// prüfen, ob heute bereits ein Update-Check stattgefunden hat:
  var LastUpdate = GM_getValue("LastUpdate","0");
  var heute = NowDateString();
  mylog("heute = " + heute + "\nLastUpdate = " + LastUpdate);

  // wenn ja, nicht noch einmal prüfen
  if (LastUpdate >= heute ) return;

  // heute nicht nochmal prüfen
  GM_setValue("LastUpdate",heute);
  
  // Version öffnen, Welche Version ist abhängig von Update-Channel
  if ( updateSetting == "CheckBeta" || updateSetting == "LoadBeta" ) {
	GM_xmlhttpRequest
	( { method: 'GET', 
		url: UPDATEURLmetaBeta, 
		onload: function(r) { 
			if (r.status==200) { 
				XML = r.responseText;
				DoUpdateCheck(XML);
			}
		}
	  }
	)
  }
  else if ( updateSetting == "CheckStable" || updateSetting == "LoadStable" ) {
	GM_xmlhttpRequest
	( { method: 'GET', 
		url: UPDATEURLmetaStable, 
		onload: function(r) { 
			if (r.status==200) { 
				XML = r.responseText;
				DoUpdateCheck(XML);
			}
		}
	  }
	)
  }
  
}

function DoUpdateCheck(XML) { 
  var ThisVersion = GM_getValue("Version","version");
  var OnlineVersion = ParseXMLforVersion(XML);

  mylog("This  ="+ThisVersion);
  mylog("Online="+OnlineVersion);

  if (ThisVersion != OnlineVersion) {
	if ( updateSetting == "LoadStable" ) {
		GM_openInTab(INSTALLURLStable);
		GM_setValue("Version",OnlineVersion); 
		ScriptUpdateAvailable=""; 
		GM_setValue("pleaseUpdate","");
	}
	else if ( updateSetting == "LoadBeta" ) {
		GM_openInTab(INSTALLURLBeta);
		GM_setValue("Version",OnlineVersion); 
		ScriptUpdateAvailable=""; 
		GM_setValue("pleaseUpdate","");
	}
	else {
		GM_setValue("pleaseUpdate",OnlineVersion);
		ScriptUpdateAvailable = OnlineVersion;
	}
  }
  else { 
	GM_setValue("pleaseUpdate","");
    ScriptUpdateAvailable = "";
  }
}

function ParseXMLforVersion(XML) {
	// aus XML den Versionsstand herausziehen:
  var versionArr = XML.match(/\/\/\s\@version\s*(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})/);
  if (RegExp.$1 != "")
  {
    return RegExp.$1;
  }
  return '';
}

function init() {
	ToAlarm="";
	NichtVerf="";
	mylog ("init startet");
	document.addEventListener("DOMNodeInserted", nodeInserted, false);
	GetVariables();
	if (CHECKFORUPDATES) updateTest();
	
	//// Hogsmeade-Edition
	var cont=document.getElementById('container');
	var logolink=cont.getElementsByTagName('a')[0];
	var logo=logolink.getElementsByTagName('img')[0];
	
	logolink.href="http://www.feuerwache.net/about";
	logo.src="http://www.hogsmeade-verband.net/Saisonbild/logo.gif";
	logo.style.height="100%";
	logo.style.margin="3px";
	logo.style.width="530px";
	/*var link=createElement('a',{'href':'http://www.feuerwache.net/about'});
	cont.insertBefore(link,logo.nextSibling);
	var img=createElement('img',{'src':'http://www.amtsleiter.bplaced.net/Saisonbild/Edition.gif','alt':'Hogsmeade Edition'});
	link.appendChild(img);*/
  
	////// Header austauschen!
	if ( showInfoSaison ) var header=document.getElementById('navigation_top').getElementsByTagName('img')[0].src='http://www.hogsmeade-verband.net/Saisonbild/saisonbild.gif';
 
	////  Bei neuer PN färben
	var div=document.getElementById('footerMessageLink');
	var span=document.getElementById('footerMessageCountUnread');
	if ( span ) div.style.backgroundColor='green';
  
	// Konfiglink einbauen
	var credits=document.getElementById('navigation_logo');
	var li=document.createElement('li');
	var a=createElement('a',{'href':'/Script-Konfig'});
	var text=createText("Konfigurationsseite aufrufen");
	a.appendChild(text);
	li.appendChild(a);
	credits.appendChild(li);

	//Einbau des Updatelinks
	showUpdate();
  /*
	//Verbandsnachricht einbinden, wenn bei Hogsmeade o.ä.
	var verband=GM_getValue("verband",false);
	if ( verband ) var teil=verband.split(" (");

	if ( verband == 'Hogsmeade (HFV)' || verband == 'Verband Paderborn (VPB)' || verband=='Feuerwehrverband Hamm  (FVH)' ) {
		var teilname=teil[0].replace(" ","__");
		teilname=teilname.replace(" ","__");
		var head=document.getElementsByTagName('head')[0];
		var script= document.createElement('script');
		script.type='text/javascript';
		script.src='http://verband-hogsmeade.de/skript/skript/nachrichten/'+teilname+'_nachricht.js';
		head.appendChild(script);
		unsafeWindow.BodyOnload(teilname+"_nachricht();");
	}
	*/
	// Verbandssound einbinden
	/*if ( verband == 'Hogsmeade (HFV)'  && showInfoVerbandSound == true && ! soundplayed.match('verband')) {
		var head=document.getElementsByTagName('head')[0];
		var script= document.createElement('script');
		script.type='text/javascript';
		script.src='http://verband-hogsmeade.de/skript/verband_nachrichten/hogsmeade_sound.js';
		head.appendChild(script);
		unsafeWindow.BodyOnload("hogsmeade_sound();");
		window.setTimeout(verbandalarm_played, 10);
	}
	*/
	
	// Verbandssound einbinden mit Interval!
	/*var datum = new Date();
	var tag=datum.getDay();
	var nummer=datum.getDate();
	if ( ( verband == 'Hogsmeade (HFV)' || verband == 'Verband Paderborn (VPB)' )  && showInfoProbeSound == true && ! soundplayed.match('probealarm') && tag=='6' && nummer < 8) {
		var head=document.getElementsByTagName('head')[0];
		var script= document.createElement('script');
		script.type='text/javascript';
		script.src='http://verband-hogsmeade.de/skript/verband_nachrichten/'+teil[0]+'_probealarm.js';
		head.appendChild(script);
		unsafeWindow.BodyOnload(teil[0]+"_probealarm();");
		window.setTimeout(probealarm_played, 10);
	}*/

	
  // Einbau des Personallinks
  //var ul=createElement('ul',{'class':'level2','style':'position: absolute; top: 67px; left: 549px; visibility: hidden;'});
  var li=createElement('li');
  var img=createElement('img',{'class':'navigation_arrow','alt':'SmallArrow','src':'/images/SmallArrow.png'});
  li.appendChild(img);
  var a=createElement('a',{'href':'/personal/list','target':'_self'});
  a.appendChild(createText(' Einsatzpersonal'));
  li.appendChild(a);
  //ul.appendChild(li);
  document.getElementById('root').getElementsByClassName('level2')[3].appendChild(li);
  
  
  // Sound-Verlauf löschen (nur einmal am Tag!)
  var last=GM_getValue("sound_emptied",'24');
  var now = new Date();
  if ( now.getHours() < last ) {
	GM_setValue("sound_emptied",now.getHours());
	emptySound();
  }
}

function verbandalarm_played() {
	var cookie=document.cookie;
	if ( cookie.match('sound_played') ) {
			soundplayed=soundplayed+'||verband';
			GM_setValue("soundplayed",soundplayed);
	}
}

function probealarm_played() {
	var cookie=document.cookie;
	if ( cookie.match('probe_played') ) {
			soundplayed=soundplayed+'||probealarm';
			GM_setValue("soundplayed",soundplayed);
	}
}

function nodeInserted(e) { 
  // wenn ich selbst für die Änderung verantwortlich bin, nichts unternehmen
  if (ichBins) return;

  // reload auf Übersichtseite hat stattgefunden:
  if (e.target.innerHTML == "Einsätze deines Verbandes") { 
	window.setTimeout(main, 10);
    return;
  }
  else if ( e.target.innerHTML ) {
	if (e.target.innerHTML.indexOf("<h2>Freie Fahrzeuge</h2>") > 0) { 
		// reload auf Einsatzseite hat stattgefunden:
		window.setTimeout(main, 100);
		return;
	}
	else if ((e.target.innerHTML.indexOf("<th>Ausbildung</th>") > 0) || ( e.target.innerHTML.indexOf('<th style="">Ausbildung</th>') > 0 )) {
		// in Schule oder Übungsgelände wurde eine Wache "aufgeklickt":
		if ( document.getElementsByTagName("table")[0].getElementsByTagName("td")[3].innerHTML == 'Feuerwehrschule') window.setTimeout(Markiere_Schueler(),10);
		else if ( document.getElementsByTagName("table")[0].getElementsByTagName("td")[3].innerHTML == 'Übungsgelände') window.setTimeout(Markiere_FWLeute(),10);
		return;
	}
	else if (e.target.innerHTML == "Leitstellenansicht") {
		// reload auf Leitstellenansicht hat stattgefunden:
		window.setTimeout(main, 10);
		return;
	}
  }
}

function bearbeiteStartseite() {
	if (adr.match("http://www.feuerwache.net/startseite/[0-9]*/[0-9]*/ausbau/[0-9]*")) document.location.href='http://www.feuerwache.net/feuerwachen';
	else if (adr.match("http://www.feuerwache.net/startseite/[0-9]*/[0-9]*/bau/[0-9]*")) document.location.href='http://www.feuerwache.net/feuerwachen';
}

function bearbeiteKdow() {
	var content = document.getElementById('content');
	var len = content.childNodes.length;
	for (var i = 1; i <= len; i++) {
		content.removeChild(content.childNodes[0]);
	}
	
	var img=createElement('img',
                            {'src'  : 'http://www.hogsmeade-verband.net/Fahrzeugmarkt/kdow.GIF',
                             'alt'  : 'Traindrivers Porsche' });

	var owndiv = createElement('div',
								{'id'   : 'picture',
                                'style': 'text-align:center'});
owndiv.appendChild(createElement('br'));
owndiv.appendChild(createElement('br'));
owndiv.appendChild(img);
owndiv.appendChild(createElement('br'));
content.appendChild(owndiv);

var headline=createElement('h1');
headline.appendChild(createText('Traindrivers KdoW'));
content.appendChild(headline);

content.appendChild(createText("Traindrivers Kommandowagen ist weltweit einzigartig. Er wurde 2009 nach dem Vorbild des VW Touareg 4.2 V8 TDI in Handarbeit produziert und nach den Wünschen des Käufers beklebt."));
content.appendChild(createElement('br'));
content.appendChild(createText("Dieses besondere Fahrzeug ist universell einsetzbar. Die hohe Geschwindigkeit lässt ihn große Distanzen in kurzer Zeit zurücklegen. Er ist geländegängig und bis zu einer Tiefe von 70cm watfähig, was ihn die entlegensten Gegenden erreichen lässt."));
content.appendChild(createElement('br'));
content.appendChild(createText("Der KdoW kann nicht nur im Einsatzfall einen ELW ersetzen sondern auch einen GW-TUIS! Gleichzeitig kann die Einsatzzeit von Verbandsgroßschadenslagen minimiert werden."));
content.appendChild(createElement('br'));
content.appendChild(createText("Das Haupteinsatzgebiet liegt jedoch in dem Transport des Verbandgründers vom Hogsmeade Verband zu den Einsätzen in Hogsmeade."));
content.appendChild(createElement('br'));
content.appendChild(createText("All diese Funktionen machen den KdoW von Traindriver für jeden guten Verband unabdingbar!"));
content.appendChild(createElement('br'));
content.appendChild(createElement('br'));
content.appendChild(createText("Zur Ausstattung gehören ein Laptop mit Internetzugang sowie sämtliche Führungsunterlagen. Zur Überprüfung der COs und der anderen Verbandmitglieder befinden sich auf dem Fahrzeug auch Nachtsichtgeräte und Ferngläser."));
content.appendChild(createElement('br'));
content.appendChild(createText("Zur Unterstützung des Webmasters, wurden auf dem Fahrzeug auch Videokameras und Digitalkameras verlastet."));
content.appendChild(createElement('br'));
content.appendChild(createText("Der Kommandowagen bietet Platz für Traindriver und optional einen Praktikanten."));


var headline=createElement('h2');
headline.appendChild(createText('Allgemeine Daten'));
content.appendChild(headline);


var table = createElement('table',
                                {'class': 'defaultTable'});
content.appendChild(table);

var tbody=createElement('tbody');
table.appendChild(tbody);

var tr0=createElement('tr',
						{'class': 'row0'});
tbody.appendChild(tr0);

var td0=createElement('td',
						{'style': 'width:200px'});
tr0.appendChild(td0);
td0.appendChild(createText('Geschwindigkeit'));

var td1=createElement('td');
tr0.appendChild(td1);
td1.appendChild(createText('242 km/h'));


var tr1=createElement('tr',
						{'class': 'row1'});
tbody.appendChild(tr1);

var td2=createElement('td');
tr1.appendChild(td2);
td2.appendChild(createText('Maximale Personen:'));

var td3=createElement('td');
tr1.appendChild(td3);
td3.appendChild(createText('2'));


var tr2=createElement('tr',
						{'class': 'row0'});
tbody.appendChild(tr2);

var td4=createElement('td');
tr2.appendChild(td4);
td4.appendChild(createText('Neupreis'));

var td5=createElement('td');
tr2.appendChild(td5);
td5.appendChild(createText('1.000.000.000.000.000 Credits'));


var headline=createElement('h2');
headline.appendChild(createText('Fahrzeug kaufen'));
content.appendChild(headline);

content.appendChild(createText('Zu welcher Feuerwache soll das Fahrzeug geliefert werden?'));
content.appendChild(createElement('br'));
content.appendChild(createElement('br'));



var table = createElement('table',
                                {'class': 'defaultTable'});
content.appendChild(table);

var tbody=createElement('tbody');
table.appendChild(tbody);

var tr0=createElement('tr',
						{'class': 'row0'});
tbody.appendChild(tr0);

var td0=createElement('td',
						{'colspan': '2'});
tr0.appendChild(td0);
td0.appendChild(createText('Fahrzeug ist leider ausverkauft!'));

var tr1=createElement('tr',
						{'class': 'row1'});
tbody.appendChild(tr1);

var td2=createElement('td');
tr1.appendChild(td2);
td2.appendChild(createText('Preis'));

var td3=createElement('td');
tr1.appendChild(td3);
td3.appendChild(createText('1.000.000.000.000.000 Credits'));

var input=createElement('input',
							{'type':'button',
							 'value':'Fahrzeug kaufen',
							 'class':'button'});
content.appendChild(input);

var headline=createElement('h2');
headline.appendChild(createText('Fahrzeugfarbe'));
content.appendChild(headline);

var div=createElement('div',
						{'class':'form_info'});
content.appendChild(div);
div.appendChild(createText('Als '));

var a=createElement('a',{'href':'/premiumaccount'});
div.appendChild(a);
a.appendChild(createText('Premium Spieler'));

div.appendChild(createText(' hast Du die Möglichkeit eine Farbe für die einzelnen Fahrzeugtypen festzulegen, diese wird dann u.a. in der Alarmierungsliste angezeigt.'));

var input=createElement('input',
							{'type':'text',
							'class':'color',
							'style':'width:100px'});
content.appendChild(input);
var input=createElement('input',
							{'type':'button',
							 'value':'Speichern',
							 'class':'button'});
content.appendChild(input);

var headline=createElement('h2');
headline.appendChild(createText('Fahrzeugfarbe löschen'));
content.appendChild(headline);

var a=createElement('a');
a.appendChild(createText('Fahrzeugfarbe löschen'));
content.appendChild(a);
}

function bearbeiteFahrzeugMarkt () {
if ( showInfoKdoW ) {
	var table=document.getElementsByTagName('table')[10].getElementsByTagName('tbody')[0];
	
	var tr=createElement('tr',{'class':'row0'});
	table.appendChild(tr);
	
	var td0=createElement('td');
	tr.appendChild(td0);
	var a=createElement('a',{'class':'button','style':'width:210px','href':'/vehicle/show/caption_url/kdow'});
	td0.appendChild(a);
	a.appendChild(createText('KdoW'));
	
	var td1=createElement('td');
	tr.appendChild(td1);
	td1.appendChild(createText('242 km/h'));
	
	var td2=createElement('td');
	tr.appendChild(td2);
	td2.appendChild(createText('1.000.000.000.000.000 Credits'));
}
}

function emptySound () {
	// Die Variable, die speichert, für welchen Einsatz schon der Alarmsound gespielt werden soll muss ab und zu mal geleert werden.
	// Deswegen geschieht dies mit der Updateprüfung
	GM_setValue("soundplayed",'');
	GM_setValue("done_einsatz",'');
}

function playsound(src) {
	var footer=document.getElementById("footer");
	var sound=createElement("object",{'id':'myFlashSound','type':'application/x-shockwave-flash','data':'http://www.hogsmeade-verband.net/Script_Sounds/'+src+'.swf','width':'1','height':'1'});
	var param=createElement("param",{'name':'FlashVars','value':'listener=mySoundListener&amp;interval=5000'});
	var param2=createElement("param",{'name':'movie','value':'http://www.hogsmeade-verband.net/Script_Sounds/'+src+'.swf'});
	var param3=createElement("param",{'name':'AllowScriptAccess','value':'always'});
	var param4=createElement("param",{'name':'loop','value':'false'});
	sound.appendChild(param);
	sound.appendChild(param2);
	sound.appendChild(param3);
	sound.appendChild(param4);
	footer.appendChild(sound);
}

function bearbeiteKonfig() {
	var br=createElement("br");
	var content = document.getElementById('content');
	var len = content.childNodes.length;
	
	for (var i = 1; i <= len; i++) {
		content.removeChild(content.childNodes[0]);
	}
	
	var h1=createElement('h1');
	h1.appendChild(createText('Skriptkonfiguration'));
	content.appendChild(h1);
	content.appendChild(KonfigHTML());
	AddKonfigEventlisteners();
	
	var inputs=document.getElementsByTagName('table')[1].getElementsByTagName('input');
    for ( var i=0;i<inputs.length;i++) {
	   inputs[i].addEventListener ( "click" , function(){GM_setValue(this.name+"_sound",this.value);} , false ) ;
    }
	
	var inputs=document.getElementsByTagName('table')[0].getElementsByTagName('input');
    for ( var i=0;i<inputs.length;i++) {
	   inputs[i].addEventListener ( "click" , function(){GM_setValue(this.name,this.value);} , false ) ;
    }
	
	content.appendChild(br.cloneNode(true));
	content.appendChild(br.cloneNode(true));
	var a=createElement('a',{'href':'http://www.feuerwache.net/Script-Konfig'});
	a.appendChild(createText("Skript zurücksetzen! Achtung! ALLE Einstellungen werden zurückgesetzt!"));
	a.addEventListener ( "click" , reset_script , false ) ;
	content.appendChild(a);
}

function reset_script() {
	var list=GM_listValues();
	for ( var i=0;i<list.length;i++) {
		variable=list[i];
		GM_deleteValue(variable);
	}
}

function set_install_step() {
	GM_setValue("install_step","1");
}

function showUpdate() {
  var updatediv=createElement('div',{'align':'center'});
  var br=createElement("br");
  
  if (ScriptUpdateAvailable != ""){ 
	updatediv.appendChild(br.cloneNode(true));
	var headdiv=createElement('div');
	headdiv.style.color='red';
	headdiv.appendChild(createText("Es gibt ein neues Update für die Hogsmeade Edition !"));
	updatediv.appendChild(headdiv);
	updatediv.appendChild(br.cloneNode(true));
	var a=createElement('a',{'href':UPDATEURL,'target':'_new'});
	updatediv.appendChild(a);
	a.appendChild(createText("Informationen"));
	updatediv.appendChild(createText(" dazu oder gleich "));
	if ( updateSetting == "CheckStable" ) var a=createElement('a',{'id':'installURL','href':INSTALLURLStable,'target':'_new'});
	if ( updateSetting == "CheckBeta" ) var a=createElement('a',{'id':'installURL','href':INSTALLURLBeta,'target':'_new'});
	a.appendChild(createText("neue Version installieren"));
	updatediv.appendChild(a);
    updatediv.appendChild(br.cloneNode(true));
	updatediv.appendChild(br.cloneNode(true));
  }
  /*
  var verband=GM_getValue("verband",false);
  if ( ! showAnzahlFW || ! verband) {
	updatediv.appendChild(br.cloneNode(true));
	var headdiv=createElement('div');
	headdiv.style.color='red';
	headdiv.appendChild(createText("Achtung: Das Skript muss konfiguriert werden!"));
	updatediv.appendChild(headdiv);
	updatediv.appendChild(br.cloneNode(true));
	updatediv.appendChild(createText("Damit das Skript ordnungsgemäß funktioniert, müssen zuerst ein paar Parameter ermittelt werden."));
	updatediv.appendChild(br.cloneNode(true));
	updatediv.appendChild(createText("Bitte rufe dazu "));
	var a=createElement('a',{'href':'http://www.feuerwache.net/feuerwachen','target':'_new'});
	a.appendChild(createText("diese"));
	updatediv.appendChild(a);
	updatediv.appendChild(createText(" Seite auf. Die Seite wird sich mehrfach neuladen - bitte verhindere dies nicht! Das Skript konfiguriert sich automatisch."));
	a.addEventListener ( "click" , set_install_step , false ) ;
  }  */
  //var h1=document.getElementsByTagName('h1')[0];
  document.getElementById("content").insertBefore(updatediv,document.getElementById("content").firstChild);
  
  // Upatemeldung entfernen, wenn geklickt
  if (ScriptUpdateAvailable != "") 
  { document.getElementById("installURL").addEventListener ( 
      "click" , 
      function(){ GM_setValue("Version",ScriptUpdateAvailable); ScriptUpdateAvailable=""; GM_setValue("pleaseUpdate",""); } , 
      true )
  }
}

function filtergebaeude(){
	var trs=document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	for (var i=0;i<trs.length;i++){
		var td=trs[i].getElementsByTagName('td')[3].firstChild.nodeValue;
		if ( td != 'Feuerwehrschule' ) trs[i].style.display="none";
	}
}

function bearbeiteGebaeude(){
	// Icons verkleinern
	document.getElementsByTagName('thead')[0].getElementsByTagName('th')[0].setAttribute('style','width:35px; !important;');
	
	var TRs=document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	for (var i=0;i<TRs.length;i++) {
		var img=TRs[i].getElementsByTagName('td')[0].getElementsByTagName('img')[0];
        img.setAttribute('src', img.getAttribute('src').replace(/\/map\//, '/map_25/'));
	}
	
	// Filtern
	var input=createElement("input",{'type':'checkbox','id':'hide'});
	var text=createText(" Nur Schulen anzeigen");
	var h1=document.getElementsByTagName('h1')[0];
	document.getElementById("content").insertBefore(input,h1);
	document.getElementById("content").insertBefore(text,h1);
	
	document.getElementById("hide").addEventListener ( "click" , filtergebaeude , false ) ;
}

function bearbeiteFunk() {
	var trs=document.getElementsByTagName('table')[0].getElementsByTagName('tr');
	for ( var i=1;i<trs.length;i++) {
		if ( trs[i].getElementsByTagName('td')[1].firstChild.data.match('Leitstelle')) {
			if ( unsafeWindow.feuerwache_layout=='black') var color='green';
			else var color='red';
			trs[i].style.backgroundColor=color;
		}
	}
}



function bearbeiteWerbeaktion() {
	// Button einfügen
	var table=document.getElementsByTagName('table')[0];
	var trs=table.getElementsByTagName('tr');
	trs[0].getElementsByTagName('th')[0].colSpan="2";
	var newth=document.createElement('th');
	newth.appendChild(createText("Nur BF"));
	trs[0].appendChild(newth);
	var newth=document.createElement('th');
	newth.appendChild(createText("Nur unter Soll"));
	trs[0].appendChild(newth);
	
	// Zeilen des ersten Tabbelenteils durchgehen, durch zwei Buttons ergänzen
	trs[1].getElementsByTagName('td')[1].colSpan="1";
	var newtd=document.createElement('td');
	var input=createElement("input",{'type':'radio','name':'checkAllRadioBF','id':'checkAllRadioBF1','style':'margin-right:20px'});	
	newtd.appendChild(input);
	newtd.appendChild(createText("Ein Tag"));
	trs[1].appendChild(newtd);
	document.getElementById("checkAllRadioBF1").addEventListener("click",function(){checkAllRadioBF(1);},false);
	
	var newtd=document.createElement('td');
	var input=createElement("input",{'type':'radio','name':'checkAllRadioSoll','id':'checkAllRadioSoll1','style':'margin-right:20px'});	
	newtd.appendChild(input);
	newtd.appendChild(createText("Ein Tag"));
	trs[1].appendChild(newtd);
	document.getElementById("checkAllRadioSoll1").addEventListener("click",function(){checkAllRadioSoll(1);},false);
	
	
	trs[2].getElementsByTagName('td')[1].colSpan="1";
	var newtd=document.createElement('td');
	var input=createElement("input",{'type':'radio','name':'checkAllRadioBF','id':'checkAllRadioBF3','style':'margin-right:20px'});	
	newtd.appendChild(input);
	newtd.appendChild(createText("Drei Tage"));
	trs[2].appendChild(newtd);
	document.getElementById("checkAllRadioBF3").addEventListener("click",function(){checkAllRadioBF(3);},false);
	
	var newtd=document.createElement('td');
	var input=createElement("input",{'type':'radio','name':'checkAllRadioSoll','id':'checkAllRadioSoll3','style':'margin-right:20px'});	
	newtd.appendChild(input);
	newtd.appendChild(createText("Drei Tage"));
	trs[2].appendChild(newtd);
	document.getElementById("checkAllRadioSoll3").addEventListener("click",function(){checkAllRadioSoll(3);},false);
	
	
	trs[3].getElementsByTagName('td')[1].colSpan="1";
	var newtd=document.createElement('td');
	var input=createElement("input",{'type':'radio','name':'checkAllRadioBF','id':'checkAllRadioBF5','style':'margin-right:20px'});	
	newtd.appendChild(input);
	newtd.appendChild(createText("Fünf Tage"));
	trs[3].appendChild(newtd);
	document.getElementById("checkAllRadioBF5").addEventListener("click",function(){checkAllRadioBF(5);},false);

	var newtd=document.createElement('td');
	var input=createElement("input",{'type':'radio','name':'checkAllRadioSoll','id':'checkAllRadioSoll5','style':'margin-right:20px'});	
	newtd.appendChild(input);
	newtd.appendChild(createText("Fünf Tage"));
	trs[3].appendChild(newtd);
	document.getElementById("checkAllRadioSoll5").addEventListener("click",function(){checkAllRadioSoll(5);},false);
	// Ende des Durchgehens des ersten Tabbelenteils
}

function checkAllRadioBF(Tage){
	var namen={'1':'Ein Tag','3':'Drei Tage','5':'Fünf Tage'};
	var trs=document.getElementsByTagName('table')[0].getElementsByTagName('tr');

	for (var i=5;i<trs.length;i++) {
		var td=trs[i].getElementsByTagName('td');
		if (! td[1]) continue;

		if ( td[1].getElementsByTagName('label')[0].firstChild.nodeValue==namen[Tage]) td[0].getElementsByTagName('input')[0].checked=true;
		else td[0].getElementsByTagName('input')[0].checked=false;
	}
}

function checkAllRadioSoll(Tage){
	var namen={'1':'1','3':'2','5':'3'};
	var trs=document.getElementsByTagName('table')[0].getElementsByTagName('tr');
	
	for (var i=4;i<trs.length;i++) {
		var td=trs[i+1].getElementsByTagName('td');
		if ( td[0].innerHTML.match('Werbeaktion')) {
			i++;
			continue;
		}
		var th=trs[i].getElementsByTagName('th')[0].innerHTML;
		if (th.match("div")) {
			var j=parseInt(i)+parseInt(namen[Tage]);
			trs[j].getElementsByTagName('td')[0].getElementsByTagName('input')[0].checked=true;
		}
		i=i+3;
	}
}

function bearbeiteAbout() {
	var content = document.getElementById('content');
	var len = content.childNodes.length;
	for (var i = 1; i <= len; i++) {
		content.removeChild(content.childNodes[0]);
	}
	
	var div=createElement('div');
	content.appendChild(div);
	div.innerHTML='<h1>Über die Feuerwache.net <i>Hogsmeade Edition</i></h1>';
	div.innerHTML+='Die <i>Hogsmeade Edition</i> von Feuerwache.net basiert auf dem (veralteten) <a href="http://userscripts.org/scripts/show/50002" target="_blank">Skript</a> von <a href="http://www.feuerwache.net/profil/sawos" target="_blank">Sawos</a>.<br>';
	div.innerHTML+='Das Skript von Sawos wurde dann von <a href="http://www.feuerwache.net/profil/MasterJM" target="_blank">MasterJM</a> erweitert. Diese erweiterte Version bildete die Grundlage für das Skript von <a href="http://www.feuerwache.net/profil/Amtsleiter" target="_blank">Amtsleiter</a>.<br>';
	div.innerHTML+='Amtsleiter hat sich inzwischen mit <a href="http://www.feuerwache.net/profil/Haruspex" target="_blank">Haruspex</a> zusammengetan. Beide erweitern dieses Skript fast täglich, halten es auf dem neusten Stand (aus Sicht des Spieles aber auch der Technik an sich) und arbeiten an dessen Perfektion.<br>';
	div.innerHTML+='Nicht zu vergessen ist, dass dieses Skript vorallem für die Mitglieder des Verbandes <a href="http://www.feuerwache.net/verband/hogsmeade" target="_blank">Hogsmeade</a> vorgesehen ist. Daher wurde es auf den Bedarf und auf die Wünsche der Mitglieder ausgerichtet. Die Zugehörigkeit des Skriptes zum Verband lässt sich in einigen Funktionen (wie z.B. den Einsatzadressen) erkennen. Aber auch viele andere Wünsche von Nicht-Mitgliedern wurden umgesetzt und sind jederzeit gerne gesehen. Wir freuen uns über jeden Benutzer!<br><br>';
	
	div.innerHTML+='<h1>Was kann das Skript?</h1>Die <i>Hogsmeade Edition</i> beherrscht natürlich alle wichtigen Funktionen, die in allen Feuerwache.net-AAO-Skripts inzwischen Standard sind. Das beinhaltet natürlich vorallem die Alarmierung von Fahrzeugen anhand einer AAO. Bei der AAO haben sich Amtsleiter und Haruspex größte Mühe gegeben eine Lösung zu finden, die alle Benutzer zufrieden stellt. Es wurde nach langen Beobachtungen ermittelt, welche Fahrzeuge wann Sinn machen, und so ist eine aus Sicht vieler zufriedener Benutzer eine optimale AAO entstanden.<br>';
	div.innerHTML+='Neben diesen Standardfunktionen gibt es aber auch diverse Funktionen, von denen euch viele nur exklusiv in der <i>Hogsmeade Edition</i> von Amtsleiter und Haruspex geboten werden. Einige dieser Funktionen sind unten aufgelistet.<br>';
	
	var ul=createElement("ul",{'id':'liste'});

	var li='<li>Zuteilen von Einsatzstichworten zum jeweiligen Einsatz</li>';
	li+='<li>Anzeige der Einsatznummer</li>';
	li+='<li>Anzeige des Einsatzortes (Straße, Hausnummer, PLZ)</li>';
	li+='<li>Anzeige der benötigten Fahrzeuge zum jeweiligen Stichwort</li>';
	li+='<li>Selektion der Benötigten Fahrzeuge an Hand der Wachanzahl</li>';
	li+='<li>Farbliche Markierung von benötigten Fahrzeugen zum Stichwort</li>';
	li+='<li>Anzeige der Einsatzbereiten Fahrzeuge auf Einsatzseite</li>';
	li+='<li>Manuelles außer Dienst Stellen von Fahrzeugen</li>';
	li+='<li>Anzeige der Fahrzeuge nach Zustand</li>';
	li+='<li>Anzeige der Fahrzeuge nach Laufleistung</li>';
	li+='<li>Anzeige der Fahrzeuge nach Status</li>';
	li+='<li>Anzeige der durchschnittlichen Fahrleistung je Fahrzeuggruppe</li>';
	li+='<li>Farbliche Markierung der Feuerwehrleute beim Ausbilden</li>';
	li+='<li>Ausblendung der Feuerwehrleute (in der Schule) die den entsprechenden Lehrgang bereits haben</li>';
	li+='<li>Ausblendung der vollen Wachen beim Fahrzeugkauf</li>';
	li+='<li>Ausblendung der vollen Wachen beim Fahrzeuge verschieben</li>';
	li+='<li>Farbliche Markierung der Rückmeldungen von der Leitstelle in den Einsätzen</li>';
	li+='<li>Farbliche Markierung wenn eine neue PN im Postfach liegt</li>';
	li+='<li>Verkleinerung der Feuerwache / Schulen / Werkstätten / Krankenhäuser Icons</li>';
	li+='<li>Ausblendung alle Gebäude außer Schulen auf der Gebäudeseite</li>';
	li+='<li>Sound bei Großeinsätzen (Krankenhaus, Flugzeug)</li>';
	li+='<li>Sound bei Verbandgroßschadenslagen</li>';
	li+='<li>Einblendung eines Saisonalen Kopfbildes</li>';
	li+='<li>Fahrzeugbilder zu den Fahrzeugen auf dem Fahrzeugmarkt</li>';
	div.appendChild(ul);
	document.getElementById('liste').innerHTML=li;
	
	div.innerHTML+='<h1>Ich habe eine(n) Fehler/Wunsch/Vorschlag/Frage/...</h1>';
	div.innerHTML+='Du kannst die Entwickler dieses Skriptes jederzeit per PN im Spiel kontaktieren. Entweder kannst du <a href="http://www.feuerwache.net/profil/Amtsleiter" target="_blank">Amtsleiter</a> oder aber <a href="http://www.feuerwache.net/profil/Haruspex" target="_blank">Haruspex</a> eine Private Nachricht schreiben.';
	div.innerHTML+='<br><br>Die beste Möglichkeit einen Fehler zu melden oder einen Vorschlag zu machen ist jedoch das Forum! Hier findest du den Thread der <a href="http://www.feuerwache.net/forum/scripte/script-amtsleiter-hogsmeade-edition" target="_blank">Hogsmeade Edition</a>. Dort kannst du deinen Fehler melden. Dort bekommst du auch direkt Rückmeldungen oder Rückfragen.';
	
	div.innerHTML+='<br><br><br>Wir wünschen dir viel Spaß mit der <i>Hogsmeade Edition</i> von Feuerwache.net<br><br>Amtsleiter & Haruspex<br>';
	div.innerHTML+='<br><br>Dank an unsere besonders fleißigen Tester (in alphabetischer Reihenfolge) DerStefan321, flarrelleum, Mansch, Rucky, Sauerlaender, schneckemaus & SirEggi!';
	div.innerHTML+='<br><br>Version '+Versionsnummer;
}

function bearbeiteVerband() {
	/*var step=GM_getValue("install_step",true);
	if ( step == '2' ) {
		var verband=document.getElementsByTagName("h1")[0].innerHTML;
		GM_setValue("verband",verband);
		GM_setValue("install_step","3");
		document.location.href='http://www.feuerwache.net/Script-Konfig';
	}*/
}

function bearbeiteCampaign() {
	document.location.href='http://www.feuerwache.net/feuerwachen';
}

function bearbeiteSingleGebaeude() {
	document.getElementById("footer").innerHTML+='<div id="count_schueler" style="display:hidden;">0</div>';

	if ( document.getElementsByTagName("table")[0].getElementsByTagName("td")[3].innerHTML == 'Feuerwehrschule') bearbeiteLehrgangszuteilung();
	else bearbeiteUebungsgelaende();
}

function bearbeiteUebungsgelaende() {
	// vor der ersten Überschrift Default-Sortierung anbieten:
	if (!document.getElementById("DefaultSort")){
		var div = document.createElement("div");
		div.style.paddingBottom = "10px";
		div.innerHTML = "Standard-Sortierung: ";
		var H1 = document.getElementsByTagName("h1")[0];
		if (!H1) H1 = document.getElementsByTagName("h2")[0];
		H1.parentNode.insertBefore(div,H1);
		
		var SEL = document.createElement("select");
		SEL.id = "DefaultSort";
		
		var newoption = document.createElement('option');
		newoption.value = "-1";
		newoption.innerHTML = '(unsortiert)';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);

		var newoption = document.createElement('option');
		newoption.innerHTML = 'Name';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Motivation';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Fähigkeiten';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Alter';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Ausbildung';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Status';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		var newoption = document.createElement('option');
		newoption.innerHTML = 'Schicht';
		SEL.insertBefore(newoption, SEL.options[SEL.length]);
		
		/*SEL.options[SEL.length] = new Option("(unsortiert)","-1");
		SEL.options[SEL.length] = new Option("Name");
		SEL.options[SEL.length] = new Option("Motivation");
		SEL.options[SEL.length] = new Option("Fähigkeiten");
		SEL.options[SEL.length] = new Option("Alter");
		SEL.options[SEL.length] = new Option("Ausbildung");
		SEL.options[SEL.length] = new Option("Status");
		SEL.options[SEL.length] = new Option("Schicht");*/
		div.appendChild(SEL);
    
		document.getElementById("DefaultSort").addEventListener( "change" , DefaultSortChanged , true );
	}
	var SEL = document.getElementById("DefaultSort");
	SEL.value = GM_getValue("DefaultTabSort","-1");
  
	// Link für Öffnung aller Wachen
	var link=document.createElement("a");
	var text=document.createTextNode("Alle Wachen öffnen (VORSICHT! Kann sehr langsam sein!)");
	link.appendChild(text);
	link.style.marginLeft="100px";
	link.href="#";
	link.addEventListener ( "click" , open_all_buildings , true );
	div.appendChild(link);
	
	// Link zum abbrechen
	var link=document.createElement("a");
	link.style.position='fixed';
	link.style.top='50px';
	link.style.left='20px';
	link.style.display='none';
	link.id='abort_link';
	var text=document.createTextNode("Vorgang abbrechen!");
	link.appendChild(text);
	link.style.marginLeft="100px";
	link.href="#";
	link.addEventListener ( "click" , clear_timeout_buildings , true );
	div.appendChild(link);
}

function Markiere_FWLeute(){
	sortPersonalLehrgang();

	var DT=document.getElementsByClassName("defaultTable");
	if (DT.length<2) return;
	
	var checked_count=document.getElementById("count_schueler").innerHTML;
	for (var i=2; i<DT.length; i++) {
		var TB = DT[i];
		var TR=TB.getElementsByTagName("tr");

		for ( var j=0;j<TR.length;j++) {
			var TDs = TR[j].getElementsByTagName("td");

			if (TDs.length==7) {
				//Haken bleibt, trotz neu sortieren bei wache öffnen
				TDs[0].getElementsByTagName('input')[0].removeEventListener( "click" , function () { pupil_onclick("true",this); }, true );
				TDs[0].getElementsByTagName('input')[0].addEventListener( "click" , function () { pupil_onclick("true",this); }, true );
				
				// Färben der Fähigkeit
				var Fah  = parseInt(TDs[3].innerHTML);
				if (Fah >= 65) TDs[3].style.color="green";
				if (Fah <= 25) TDs[3].style.color="#FF6666";
				
				//eigentliches ausblenden
				if ( TDs[1].innerHTML.match("(Nicht im Dienst)") || TDs[1].innerHTML.match("(Nicht verfügbar)")) {	
				TR[j].style.display="none";
				}
				else {
					if (checked_count == 10 &&  !TDs[0].getElementsByTagName('input')[0].checked) TDs[0].getElementsByTagName('input')[0].setAttribute("disabled","disabled");
					else TDs[0].getElementsByTagName('input')[0].removeAttribute("disabled"); 
				}
			/*
				TDs[0].style.backgroundColor="transparent";
				var Ausb = TDs[5].innerHTML;
				var verf = (TDs[1].innerHTML.match("Nicht verfügbar") == null);
				var Fah  = parseInt(TDs[3].innerHTML);
				if (Fah >= 65) TDs[3].style.color="green";
				if (Fah <= 25) TDs[3].style.color="#FF6666";
				if (verf){ 
					var checked_count=GM_getValue("checked_count",0);
					if (checked_count == 10 &&  !TDs[0].getElementsByTagName('input')[0].checked) TDs[0].getElementsByTagName('input')[0].setAttribute("disabled","disabled");
					else TDs[0].getElementsByTagName('input')[0].removeAttribute("disabled"); 
					var bgc="";
					if (GG && Ausb.match("Gefahrgut")             ==null) bgc="#FF0000";
					if (RA && Ausb.match("Rettungsassistent")     ==null) bgc="#FFFFFF";
					if (TA && Ausb.match("Taucher")               ==null) bgc="#000066";
					if (FH && Ausb.match("Flughafen")             ==null) bgc="#FF1100";
					if (LB && Ausb.match("Löschboot")             ==null) bgc="#0000FF";
					if (RB && Ausb.match("Rettungsboot")          ==null) bgc="#1865C9";
					if (TU && Ausb.match("TUIS")                  ==null) bgc="#FF00FF";
					if (bgc){ 
						TDs[0].style.backgroundColor = bgc; 
						TR[j].style.display = "";
					}
					else TR[j].style.display = "none";
				}
				else TR[j].style.display = "none";*/
			}
		}
	}
}

function getContainerName(id) {
	var FZ=ContainerIDs[id];
	if (FZ==undefined) FZ=id;
	return FZ;
}

function bearbeiteAuftragsliste() {
	var liste1=GM_getValue("auftragsliste1","--");
	var liste2=GM_getValue("auftragsliste2","--");
	var content = document.getElementById('content');
	var len = content.childNodes.length;
	
	for (var i = 1; i <= len; i++) {
		content.removeChild(content.childNodes[0]);
	}
	
	var h1=createElement('h1');
	h1.appendChild(createText('Auftragsliste'));
	content.appendChild(h1);

	var NewDiv = document.createElement("div");
	var Kram="<br><table><tr><th>Einsatz</th><th>Welt 1</th><th>Welt 2</th></tr>";
	
	var tuples = [];

	for (var einsatz in Einsatzklassen) tuples.push([einsatz, Einsatzklassen[einsatz]]);

	tuples.sort();
	for (var i = 0; i < tuples.length; i++) {
		var einsatz = tuples[i][0];
		if (einsatz.match("_n") ) continue;
		Kram+="<tr><td>"+einsatz+"</td>";
		
		var einsatz_suche=einsatz;
		einsatz_suche=einsatz_suche.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "");
	//	einsatz_suche=einsatz_suche.replace(/\\\)/g,"");
		//einsatz_suche=einsatz_suche.replace(/\\\(/g,"");

		Kram+="<td><input type='checkbox' name='AuftragBox1' id='"+einsatz+"'";
		if ( liste1.match(","+einsatz_suche+",") ) Kram+=" checked";
	//	if ( einsatz.match("\\(")) alert(einsatz_suche);

		Kram+="></td><td><input type='checkbox' name='AuftragBox2' id='"+einsatz+"'";
		if ( liste2.match(","+einsatz_suche+",") ) Kram+=" checked";
		Kram+="></td></tr>";
	}

	Kram+="</table>";
	NewDiv.innerHTML=Kram;
	content.appendChild(NewDiv);
	
	AddAuftragEventlisteners();
}

function AuftragBox_clicked(welt){ 
	var Boxes = document.getElementsByName("AuftragBox"+welt);
	var liste=",";
	for (var i=0;i<Boxes.length;i++) { 
		var Box=Boxes[i];
		if (Box.checked) liste+=Box.id+",";
	}
	
	liste=liste.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "");
	//liste=liste.replace(/\\\)/g,"");
	//liste=liste.replace(/\\\(/g,"");

	GM_setValue("auftragsliste"+welt,liste);
}

function AddAuftragEventlisteners() { 
	var Boxes = document.getElementsByName("AuftragBox1");
	for ( var i=0;i < Boxes.length;i++) {
		Boxes[i].addEventListener("click",function () { AuftragBox_clicked("1"); },false);
	}
	
	var Boxes = document.getElementsByName("AuftragBox2");
	for ( var i=0;i < Boxes.length;i++) {
		Boxes[i].addEventListener("click",function () { AuftragBox_clicked("2"); },false);
	}
}

function ermittleWelt() {
	var welt=document.getElementById("root").getElementsByTagName("ul")[0].getElementsByTagName("a")[1].innerHTML;
	if ( welt.match("Welt 1") ) return "1";
	else if ( welt.match("Welt 2") ) return "2";
}

function dt() { debugging=true; }
function df() { debugging=false; }