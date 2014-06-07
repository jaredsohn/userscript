// ==UserScript==
// @name           FW.net - Toolset
// @copyright      2011+, rescue; (c) für einzelne Teile des Scripts bei Ereglam, Thomas112, MasterJM, DarkPrince, Schlumpf (siehe jeweils http://userscripts.org/users/***)
// @description    Aufbauend u.a. auf der jeweils aktuellsten Version des "Thomas112 AAO und Tools"-Scripts stellt dieses Script u.a. Funktionen wie "automatische Alarmierung", "automatische Werbeaktionen auch für nicht Premium-Mitglieder", usw. zur Verfügung.

// @summary		     Erweiterte Versione des "Thomas112 AAO und Tools"-Scriptes; ACHTUNG! Dieses Script kann Funktionen enthalten, welche laut den Spielregeln von Feuerwache.net nicht erlaubt sind und deren Einsatz den Spielausschluss nach sich ziehen kann!

// @include        http://www.feuerwache.net/*
// @exclude        http://www.feuerwache.net/forum/*
// @require
// @author         rescue (aufbauend auf den Scripts von Ereglam, Thomas112, MasterJM, DarkPrince, Schlumpf)
// @info           integrierte Version von "Thomas112 AAO und Tools": 2012-02-05 12:05
// @info2          {e64a1545-298d-4d9c-bd52-d8753e831e4c}
// @version        0.7.2
// @change		   neue AO für Einsätze an der Bahnstrecke



// ==/UserScript==



/* ******************************************************************************************
// ToDo's          - die Links der einzelnen Einsätze in ein Array lesen und dieses dann abarbeiten (derzeit bleibt das Script bei einem einzelnen Einsatz hängen, wenn er nicht alarmiert werden kann) 
//                 - bei Nachforderungen soll versucht werden automatisch nachzualarmieren (Detailansicht "zu alarmieren" und "nicht verfügbar" sowie "keine weiteren ..."
//                 - bereits alarmierte Einsätze kontrollieren, ob Umdisposition möglich (zurückalarmieren und anderes Fzg alarmieren)
//                    -> + Anzeige in der Einsatzübersicht!
//                 - bereits alarmierte Einsätze kontrollieren, ob noch benötigte Fahrzeuge nachalarmiert werden sollen (nur wenn Anfahrtszeit kleiner Restdauer!)
//                 - die "großen" Einsätze zuerst alarmieren?
//                 - nur alarmieren, wenn laut Vorschlag gewisse "Pflichtfahrzeuge" frei sind, sonst warten
//                 - Pausen in der Abarbeitung einbauen
//                 - automatische Werbeaktionen für Wachen mit Unterbesetzung
   ******************************************************************************************/

/* ******************************************************************************************
ACHTUNG
Wenn das Script angepasst und erneut auf userscripts.org veröffentlicht wird,
MUSS die USERSCRIPTID angepasst werden.
   ******************************************************************************************/

const USERSCRIPTID="101853"; // diese Konstante anpassen
const version="0.7.2"; 		//versioning scheme: major.minor[.bugfix]



/* ******************************************************************************************
//BEGINN des "Thomas112 AAO und Tools"-Scripts; die Erweiterungen sind ab Zeile 5800 zu finden
   ******************************************************************************************/


/*
  dieses Script stellt den Versuch dar, aus diversen Scripten die interessantesten und besten Ideen in Diesem zu vereinen.
  Ideen aus folgenden Scripten wurden verwendet:
  Sawos                : grundlegende Struktur inklusiver letzter Neuerungen vom 10.März.2010
  MasterJM             : AAO, Fahrzeugübersicht mit zweizeiliger Überschrift, Farbgebung der Einsatzklasse
  DarkPrince           : Langtexte zu Einsatzklassen, erweiterte Farbgebung der Motivation der Mannschaft
  Schlumpf's Bannermod : Einstelldialog, Grafiken in Feuerwachenliste

  Anders als in den Vorlagen sind diverse Arrays zusammengefasst worden, um u.a. die Zusammengehörigkeiten zu verdeutlichen. Dadurch
  sollte es bei weiteren Aktualisierung einfacher möglich sein, die abhängigen Daten gleich mit zu berücksichtigen: z.B. sieht man, dass
  bei neuen Fahrzeugen auch gleich die Geschwindigkeit benötigt wird.
  Neuer Dialog mit z.T. neuen Einstelloptionen. Der Link dazu befindet sich am unteren Ende auf jeder Seite.
  Möglichkeit, die Zuordnung von Einsatzstichwort zu Einsatzklasse in den Einstellungen zu pflegen

*/

/* ******************************************************************************************
ACHTUNG
Wenn das Script angepasst und erneut auf userscripts.org veröffentlicht wird,
MUSS die USERSCRIPTID angepasst werden.

WENN DU DIESEN ABSCHNITT NICHT 100% VERSTANDEN UND BEFOLGT HAST, STELLE DAS GEÄNDERTE SCRIPT NICHT ONLINE!
   ******************************************************************************************/

//const USERSCRIPTID="91305"; // diese Konstante ist anzupassen
/* ******************************************************************************************
  H I N W E I S !!
  ein Kopieren ist nicht mehr notwendig, da die Zuordnung von Stichwort zu Einsatzklasse nun in den Einstellungen
  gepflegt  werden kann
*/

var EinsatzstichwortArr = {
/*
  Diese Liste stellt die Grundeinstellungen dieses Scriptes zur Verfügung
  Zur Laufzeit werden die Vorgaben aus 'stwDef' bei der Initialisierung in den Schlüssel 'stwCls' übertragen,
  wobei primär nach gespeicherten Werten der Greasemonkey-Umgebung gesucht wird.

  Syntax in der Alarmierungsliste:
    Einsatzklasse zuerst, dann ggf. ein Plus (+) und weiter Fahrzeugklassen, diese
    durch Komma (,) voneinander getrennt. Alternativen durch Schrägstrich (/) getrennt
    Optionale Fahrzeuge (werden nur in der Liste hervorgehoben) mit Pipe (|) anfügen
    zum Beispiel 'F1+RW/TS,ELW|GW-M,DLK' ->
        alarmiere alles nach F1, zusätzlich einen RW oder LF16-TS, sowie einen ELW.
        markiere zusätzlich den nächsten GWM sowie die nächste DLK
*/

  'Auffahrunfall'                  : {stwDef: 'TH1'                          	, storm: false, wiki: 'Auffahrunfall'                 , ab:  '4 FW'},
  'Baum auf Auto'                  : {stwDef: 'VU Straße'                    	, storm: true,  wiki: 'Baum_auf_Auto'                 , ab:  '9 FW'},
  'Baum auf Dach'                  : {stwDef: 'TH1-DL'                     	, storm: true,  wiki: 'Baum_auf_Dach'                 , ab:  '8 FW'},
  'Baum auf Straße'                : {stwDef: 'TH1'                          	, storm: true,  wiki: 'Baum_auf_Stra%C3%9Fe'          , ab:  '1 FW'},
  'Brand in KFZ-Werkstatt'         : {stwDef: 'F3-Kran'                  	, storm: false, wiki: 'Brand_in_KFZ-Werkstatt'        , ab: '15 FW'},
  'Brand in Schule'                : {stwDef: 'F4-Atem'                     	, storm: false, wiki: 'Brand_in_Schule'               , ab:  '5 FW'},
  'Brand in Spedition'             : {stwDef: 'F4-GSG'                     	, storm: false, wiki: 'Brand_in_Spedition'            , ab:  '5 FW'},
  'Brand in Sporthalle'            : {stwDef: 'F3-Atem'                  	, storm: false, wiki: 'Brand_in_Sporthalle'           , ab: '40 FW'},
  'Brand im Sägewerk'              : {stwDef: 'F3-Atem'                  	, storm: false, wiki: 'Brand_im_S%C3%A4gewerk'        , ab: '40 FW'},
  'Brand im Supermarkt'            : {stwDef: 'F3-Kran'                     	, storm: false, wiki: 'Brand_im_Supermarkt'           , ab:  '4 FW'},
  'Brennende Bäume'                : {stwDef: 'F1'                          	, storm: false, wiki: 'Brennende_B%C3%A4ume'          , ab:  '2 FW'},
  'Brennende Telefonzelle'         : {stwDef: 'F1'                          	, storm: false, wiki: 'Brennende_Telefonzelle'        , ab:  '1 FW'},
  'Brennender LKW'                 : {stwDef: 'F1'                          	, storm: false, wiki: 'Brennender_LKW'                , ab:  '1 FW'},
  'Brennender PKW'                 : {stwDef: 'F1'                          	, storm: false, wiki: 'Brennender_PKW'                , ab:  '1 FW'},
  'Brennendes Gras'                : {stwDef: 'F1'                          	, storm: false, wiki: 'Brennendes_Gras'               , ab:  '1 FW'},
  'Chemieunfall (an Schule)'       : {stwDef: 'GSG'                         	, storm: false, wiki: 'Chemieunfall_(an_Schule)'      , ab:  '2 BF'},
  'Chlorgas Alarm (Schwimmbad)'    : {stwDef: 'GSG2'                      	, storm: false, wiki: 'Chlorgas_Alarm_(Schwimmbad)'   , ab:  '3 BF'},
  'Container Brand'                : {stwDef: 'F1'                          	, storm: false, wiki: 'Containerbrand'                , ab:  '1 FW'},
  'Dachstuhlbrand'                 : {stwDef: 'F3-DL2'                         	, storm: false, wiki: 'Dachstuhlbrand'                , ab:  '3 FW'},
  'Fahrstuhl - Türöffnung'         : {stwDef: 'Türöffnung'                      , storm: false, wiki: 'Fahrstuhl-T%C3%BCr%C3%B6ffnung', ab: '15 FW'},
  'Fettbrand in Pommesbude'        : {stwDef: 'F2-Wasser'                      	, storm: false, wiki: 'Fettbrand_in_Pommesbude'       , ab:  '3 FW'},
  'Feuer im Altenheim'             : {stwDef: 'F4-Atem'                     	, storm: false, wiki: 'Feuer_im_Altenheim'            , ab:  '6 FW'},
  'Feuer im Laubhaufen'            : {stwDef: 'F1'                          	, storm: false, wiki: 'Feuer_im_Laubhaufen'           , ab:  '1 FW'},
  'Gartenlaubenbrand'              : {stwDef: 'F1'                          	, storm: false, wiki: 'Gartenlaubenbrand'             , ab:  '1 FW'},
  'Gastronomiebrand'               : {stwDef: 'F2-Personal'                     , storm: false, wiki: 'Gastronomiebrand'              , ab:  '8 FW'},
  'Kellerbrand'                    : {stwDef: 'F2'                          	, storm: false, wiki: 'Kellerbrand'                   , ab:  '3 FW'},
  'Keller unter Wasser'            : {stwDef: 'TH1'                             , storm: true,  wiki: 'Keller_unter_Wasser'           , ab:  '2 FW'},
  'Kinobrand'                      : {stwDef: 'F4-Wasser'              		, storm: false, wiki: 'Kinobrand'                     , ab: '10 FW'},
  'Motorrad-Brand'                 : {stwDef: 'F1'                          	, storm: false, wiki: 'Motorradbrand'                 , ab:  '1 FW'},
  'Mülleimer Brand'                : {stwDef: 'F1'                          	, storm: false, wiki: 'M%C3%BClleimerbrand'           , ab:  '1 FW'},
  'Scheunenbrand'                  : {stwDef: 'F3-Schlauch'                     , storm: false, wiki: 'Scheunenbrand'                 , ab: '30 FW'},
  'Schornsteinbrand'               : {stwDef: 'F2-DL'                         	, storm: false, wiki: 'Schornsteinbrand'              , ab:  '3 FW'},
  'Silobrand'                      : {stwDef: 'F2-Personal'                     , storm: false, wiki: 'Silobrand'                     , ab: '20 FW'},
  'Sperrmüllbrand'                 : {stwDef: 'F1'                          	, storm: false, wiki: 'Sperrm%C3%BCllbrand'           , ab:  '1 FW'},
  'Strohballen Brand'              : {stwDef: 'F1-Schlauch'                     , storm: false, wiki: 'Strohballen_Brand'             , ab:  '1 FW'},
  'Traktorbrand'                   : {stwDef: 'F1'                          	, storm: false, wiki: 'Traktorbrand'                  , ab:  '1 FW'},
  'Verkehrsunfall'                 : {stwDef: 'VU Straße'                    	, storm: false, wiki: 'Verkehrsunfall'                , ab:  '4 FW'},
  'Wohnblockbrand'                 : {stwDef: 'F5-Atem'             		, storm: false, wiki: 'Wohnblockbrand'                , ab: '45 FW'},
  'Wohnungsbrand'                  : {stwDef: 'F2'                          	, storm: false, wiki: 'Wohnungsbrand'                 , ab:  '2 FW'},
// neue Einsatztypen (chronologisch, neuste unten (ab 28.12.2009)
  'Gewerbebrand'                   : {stwDef: 'F4-Rüst'                  	, storm: false, wiki: 'Gewerbebrand'                  , ab: '35 FW'},
  'Feldbrand'                      : {stwDef: 'F1-Schlauch'                     , storm: false, wiki: 'Feldbrand'                     , ab:  '1 FW'},
  'Brand im Baumarkt'              : {stwDef: 'F3-GSG'                         	, storm: false, wiki: 'Brand_im_Baumarkt'             , ab: '20 BF'},
// Einsätze neu ab 22.01.2010
  'Brennender Sicherungskasten'    : {stwDef: 'F1'                          	, storm: false, wiki: 'Brennender_Sicherungskasten'   , ab:  '1 FW'},
  'Schuppenbrand'                  : {stwDef: 'F2|GWG,GWM'                  	, storm: false, wiki: 'Schuppenbrand'                 , ab:  '4 FW'},
  'Brennende S-Bahn'               : {stwDef: 'F2-Zug'                      	, storm: false, wiki: 'Brennende_S-Bahn'              , ab: '20 FW'},
//neu ab 08.03.2010
  'Wohnwagenbrand'                 : {stwDef: 'F1'                          	, storm: false, wiki: 'Wohnwagenbrand'                , ab:  '1 FW'},
  'Brand in Briefkasten'           : {stwDef: 'F1'                          	, storm: false, wiki: 'Brand_in_Briefkasten'          , ab:  '1 FW'},
  'Kleiner Waldbrand'              : {stwDef: 'F1'                      	, storm: false, wiki: 'Kleiner_Waldbrand'             , ab:  '1 FW'},
  'Brennender Müllwagen'           : {stwDef: 'F1'                          	, storm: false, wiki: 'Brennender_M%C3%BCllwagen'     , ab:  '1 FW'},
  'Ölspur'                         : {stwDef: 'TH1-Öl'                     	, storm: false, wiki: '%C3%96lspur'                   , ab:  '5 FW'},
  'Brand in Zugdepot'              : {stwDef: 'F4-Zug'       			, storm: false, wiki: 'Brand_in_Zugdepot'             , ab: '10 FW'},
  'Brand in Autohaus'              : {stwDef: 'F4-Mess'                 	, storm: false, wiki: 'Brand_in_Autohaus'             , ab: '10 FW'},
  'Brand in Druckerei'             : {stwDef: 'F4-Schlauch'              	, storm: false, wiki: 'Brand_in_Druckerei'            , ab: '20 BF'},
  'Brand in Lackfabrik'            : {stwDef: 'GSG3'                        	, storm: false, wiki: 'Brand_in_Lackfabrik'           , ab: '25 FW'},
  'Person im Fluss'                : {stwDef: 'Wasserrettung'                         	, storm: false, wiki: 'Person_im_Fluss'       , ab: '25 BF'},
// neu ab 29.03.2010; rescue: die optionalen fix dazu
  'Brand im Casino'                : {stwDef: 'Großbrand+LF,LF' 		, storm: false, wiki: 'Brand_in_Casino'               , ab: '50 FW'},
  'Brand in Reifenlager'           : {stwDef: 'GSG-Schlauch'               	, storm: false, wiki: 'Brand_in_Reifenlager'          , ab: '20 FW'},
  'Trocknerbrand'                  : {stwDef: 'F1'                       	, storm: false, wiki: 'Trocknerbrand'                 , ab:  '1 FW'},
// neu ab 23.04.2010
  'Brennendes Gebüsch'             : {stwDef: 'F1'                          	, storm: false, wiki: 'Brennendes_Geb%C3%BCsch'       , ab:  '1 FW'},
  'Kioskbrand'                     : {stwDef: 'F1'                          	, storm: false, wiki: 'Kioskbrand'                    , ab:  '2 FW'},
  'Garagenbrand'                   : {stwDef: 'F2'                      	, storm: false, wiki: 'Garagenbrand'                  , ab:  '4 FW'},
  'Mähdrescherbrand'               : {stwDef: 'F1-Wasser'                      	, storm: false, wiki: 'M%C3%A4hdrescherbrand'         , ab:  '5 FW'},
  'Kaminbrand'                     : {stwDef: 'F1-DL'                         	, storm: false, wiki: 'Kaminbrand'                    , ab:  '5 FW'},
  'PKW in Fluss'                   : {stwDef: 'VU Wasser'                  	, storm: false, wiki: 'PKW_in_Fluss'                  , ab: '15 FW'},
  'Brand in Schloss'               : {stwDef: 'F3-DL'                         	, storm: false, wiki: 'Brand_in_Schloss'              , ab: '20 FW'},
  'Brand in Kühlhaus'              : {stwDef: 'F5-GSG'           		, storm: false, wiki: 'Brand_im_K%C3%BChlhaus'        , ab: '20 FW'},
  'Feuer im Krankenhaus'           : {stwDef: 'F8-MANV'            		, storm: false, wiki: 'Feuer_im_Krankenhaus'          , ab: '40 BF'},
  'Brand in Kletterhalle'          : {stwDef: 'F4'                          	, storm: false, wiki: 'Brand_in_Kletterhalle'         , ab: '45 BF'},
// neu ab 23.08.2010
  'Grasnarbenbrand'                : {stwDef: 'F1'                      	, storm: false, wiki: 'Grasnarbenbrand'               , ab: '59 FW'},
// neu ab 01.09.2010
  'Brennendes Flugzeug'            : {stwDef: 'Flgz'				, storm: false, wiki: 'Brennendes_Flugzeug'           , ab: '59 FW'},

// besondere Einsätze, nur zu bestimmten Jahreszeiten
  'Brand-Weihnachtsbaum in Kirche' : {stwDef: 'F3'                         	, storm: false, wiki: 'Brand-Weihnachtsbaum_in_Kirche', ab:  '6 FW'},
  'Brand auf Weihnachtsmarkt'      : {stwDef: 'F1'                          	, storm: false, wiki: 'Brand_auf_Weihnachtsmarkt'     , ab:  '3 FW'},
// Großschadensereigniss im Verband
// neu ab 13.10.2010
  'Brand in Industriepark'	   : {stwDef: 'GSL Verband'                     , storm: false, wiki: 'Brand_in_Industriepark'        , ab:  'ab 5 Verbandsmitglieder Online'},
// neu ab 27.10.2010
  'Brand in Gärtnerei'		   : {stwDef: 'F3-DL/GG'  			, storm: false, wiki: 'Brand_in_Gärtnerei'	      , ab:  ' 2 BF'}, 
  'Brand in Metzgerei'		   : {stwDef: 'F3-DL/Schlauch'  			, storm: false, wiki: 'Brand_in_Metzgerei'    , ab:  ' 8 FW'},
  'Brand in Eishalle'		   : {stwDef: 'F2-Eishalle'  		        , storm: false, wiki: 'Brand_in_Eishalle'	      , ab:  ' 5 FW'},
// neu ab 19.11.2010
  'Feuer auf Boot (Klein)'         : {stwDef: 'Boot klein'                      , storm: false, wiki: 'Feuer_auf_Boot_(Klein)'        , ab: '30 BF', onWater: true},
// neu ab 28.11.2010
  'Feuer auf Boot (Mittel)'        : {stwDef: 'Boot mittel'                     , storm: false, wiki: 'Feuer_auf_Boot_(Mittel)'       , ab: '30 BF', onWater: true},
// neu ab 13.12.2010
  'Gabelstapler im Hafenbecken'    : {stwDef: 'THW'                             , storm: false, wiki: 'Gabelstapler_im_Hafenbecken'   , ab: '40 FW'},
  'Verletztentransport'            : {stwDef: 'Verletztentransport'             , storm: false, wiki: '/'   			      , ab: '/'},
// neu ab 05.01.2011
  'Brand in Gemeindehaus'          : {stwDef: 'F1'             			, storm: false, wiki: 'Brand_in_Gemeindehaus'         , ab: '3 FW'},
  'Maschinenbrand'                 : {stwDef: 'F3+GWL'                          , storm: false, wiki: 'Maschinenbrand'                , ab: '5 FW'},
  'Brand in Steinbruch'            : {stwDef: 'GSL Verband'                     , storm: false, wiki: 'Brand_in_Steinbruch'   	      , ab: 'ab 3 Verbandsmitglieder Online'},
// neu ab 15.04.2011
  'Brennt Tanklager'               : {stwDef: 'F5-Raff2'                  , storm: false, wiki: 'Brennt_Tanklager'              , ab: '64 FW'},
  'Tankbrand'                      : {stwDef: 'F5-Raff1'                  , storm: false, wiki: 'Tankbrand'   	              , ab: '64 FW + Kartenerweiterung'},
  'Brand in Raffinerie'            : {stwDef: 'Feuer-Raff'                , storm: false, wiki: 'Brand_in_Raffinerie'   	      , ab: '64 FW + Kartenerweiterung'},
// neu ab 12.05.2011
  'Unfall mit Gefahrgut-Transport' : {stwDef: 'TH-GF'				, storm: false, wiki: 'Unfall_mit_Gefahrgut-Transport' , ab: '40 FW + 2 BF'},
  'Gefahrstoff-Austritt in Firma'  : {stwDef: 'GSG+GWA,GWL,TUIS|LF'			, storm: false, wiki: 'Gefahrstoff-Austritt_in_Firma'  , ab: '40 FW + 2 BF'},
// neu ab 26.06.2011
  'Brand in Betankungsanlage'      : {stwDef: 'F5-Raff2'       			, storm: false, wiki: 'Brand_in_Betankungsanlage'     , ab: '64 FW'},
  'Küchenbrand'                    : {stwDef: 'F1'       			, storm: false, wiki: 'Küchenbrand'                   , ab: '2 FW'},
  'Türöffnung'                     : {stwDef: 'TH1'       	                , storm: false, wiki: 'Türöffnung'                    , ab: '2 FW'},
//rescue: optionales fix dazu
  'Waldbrand'                      : {stwDef: 'F4+GWL,DLK'       			, storm: false, wiki: 'Waldbrand'                     , ab: '20 FW'},
  'VU mit Straßenbahn'             : {stwDef: 'TH3'       			, storm: false, wiki: 'VU_mit_Straßenbahn'            , ab: '20 FW'},
// neu ab 22.07.2011
'Kleintier in Not'                 : {stwDef: 'F1'       			, storm: false, wiki: 'Kleintier_in_Not'              , ab: '2 FW'},
'Brennendes Bus-Häuschen'          : {stwDef: 'F2'       			, storm: false, wiki: 'Brennendes_Bus-Häuschen'       , ab: '3 FW'},
'Person in Schacht'                : {stwDef: 'TH1-DL'       			, storm: false, wiki: 'Person_in_Schacht'             , ab: '3 FW'},
'Auslaufende Betriebsstoffe'       : {stwDef: 'TH1-Öl'       			, storm: false, wiki: 'Auslaufende_Betriebsstoffe'    , ab: '4 FW'},
// neu ab 24.12.2011
  'Brennender Güterzug'            : {stwDef: 'F2-Schiene'       		, storm: false, wiki: 'Brennender_Güterzug'           , ab: '65 FW'},
  'Feuer im Personenzug'           : {stwDef: 'F5-Schiene'       	        , storm: false, wiki: 'Feuer_im_Personenzug'          , ab: '65 FW'},
  'Güterzug entgleist'             : {stwDef: 'TH5-Schiene'       		, storm: false, wiki: 'Güterzug_entgleist'            , ab: '65 FW'},
  'Brand am Bahndamm'              : {stwDef: 'F2S'       			, storm: false, wiki: 'Brand_am_Bahndamm'             , ab: '65 FW'},
  'Baum auf Schiene'               : {stwDef: 'TH1S'       			, storm: false, wiki: 'Baum_auf_Schiene'              , ab: '65 FW'},
  'RTZ-Einsatz'                    : {stwDef: 'RTZ'       	                , storm: false, wiki: 'Rettungszug'                   , ab: '65 FW'},
// neu ab 17.01.2012
  'Brennender Güterzug (Bahnhof)'  : {stwDef: 'F4+GWL,GWM,GWG,TUIS'       	, storm: false, wiki: 'Brennender_Güterzug_(Bahnhof)' , ab: '65 FW'},
  'Feuer im Personenzug (Bahnhof)' : {stwDef: 'F4+GWL'       	                , storm: false, wiki: 'Feuer_im_Personenzug_(Bahnhof)', ab: '65 FW'},
  'Güterzug entgleist (Bahnhof)'   : {stwDef: 'TH5-Schiene+FwK'       	        , storm: false, wiki: 'Güterzug_entgleist_(Bahnhof)'  , ab: '65 FW'},
  'Unfall an Bahnübergang'         : {stwDef: 'TH1S'       	                , storm: false, wiki: 'Unfall_an_Bahnübergang'        , ab: '65 FW'},
  'Brand in Fahrkartenautomat'     : {stwDef: 'F1'       	                , storm: false, wiki: 'Brand_in_Fahrkartenautomat'    , ab: '65 FW'},
  'Brennende Lokomotive'           : {stwDef: 'F2S'       	                , storm: false, wiki: 'Brennende_Lokomotive'          , ab: '65 FW'},
  'Rangierunfall'                  : {stwDef: 'TH3S'       	                , storm: false, wiki: 'Rangierunfall'                 , ab: '65 FW'},
  'Feuer in Bahnhofshalle'         : {stwDef: 'F3+GWL,DLK'       	        , storm: false, wiki: 'Feuer_in_Bahnhofshalle'        , ab: '65 FW'},
// neu ab 03.02.2012
  'Feuer im Personenzug (Tunnel)'  : {stwDef: 'F4S'       	        , storm: false, wiki: 'Feuer im Personenzug (Tunnel)'          , ab: '65 FW'},
  };

var EinsatzklasseFahrzeugeArr = {
/*
  Diese Liste definiert, welche Fahrzeuge in der Grundeinstellung zu den verschiedenen
  Einsatzklassen geschickt werden.
  Zur Laufzeit werden die Vorgaben aus 'vhcDef' bei der Initialisierung in den Schlüssel 'vehicles' übertragen,
  wobei primär nach gespeicherten Werten der Greasemonkey-Umgebung gesucht wird, wenn implementiert.

  Einzelne Fahrzeuge werden durch Komma (,) getrennt, Alternativen durch (/).
  !!!ACHTUNG: HIER KEINE OPTIONALEN FAHRZEUGE (|) EINTRAGEN!!!
  Syntax: Text, Fahrzeuge
*/

  'undef'    :  {txtDef: 'unbekanntes Einsatzstichwort',    vhcDef: 'LF'},
// zu undef = unbekannten Einsatzen wird per Default ein LF/TS geschickt
  'F-Tunnel'		: {txtDef: 'Feuer Tunnel',                    	vhcDef: 'HLFS,ELW,GWL'},
  'F1'      	 	: {txtDef: 'Feuer, klein',                    	vhcDef: 'LF/HLFS'},
  'F1-DL'    		: {txtDef: 'F1-DLK',                          	vhcDef: 'LF,DLK'},
  'F1-Wasser'		: {txtDef: 'F1-Wasser',                       	vhcDef: 'LF,TLF'},
  'F1-Schlauch'		: {txtDef: 'F1-Wasser',                       	vhcDef: 'LF,GWL'},
  'F2'       		: {txtDef: 'F2',              	     			vhcDef: 'LF,LF'},
  'F2S'       	    : {txtDef: 'F2-Schiene',                 		vhcDef: 'LF/HLFS,LF/HLFS'},
  'F2-Wasser'		: {txtDef: 'F2-Wasser',                       	vhcDef: 'LF,LF,TLF'},
  'F2-DL'    		: {txtDef: 'F2-DLK',                          	vhcDef: 'LF,LF,DLK'},
  'F2-Zug'   		: {txtDef: 'F2-Zug',                          	vhcDef: 'LF,LF,GWS'},
  'F2-Schlauch'		: {txtDef: 'F2-Schlauch',                    	vhcDef: 'LF,LF,GWL'},
  'F2-Schiene'		: {txtDef: 'F2-Schiene',                    	vhcDef: 'LF/HLFS,LF/HLFS,GWL,GWM,GWG,ELW,TUIS'},
  'F2-Eishalle'		: {txtDef: 'F2-Eishalle',                    	vhcDef: 'LF,LF,GWL,DLK,RW,ELW,TLF'},
  'F2-Personal'		: {txtDef: 'F2-Personal',                   	vhcDef: 'LF,LF,LF'},
  'F3'      		: {txtDef: 'F3',               		   	vhcDef: 'LF/HLFS,LF/HLFS,LF/HLFS,ELW'},
  'F3-DL'     		: {txtDef: 'F3-DLK',                        	vhcDef: 'LF,LF,LF,ELW,DLK'},
  'F3-DL/GG'     	: {txtDef: 'F3-DLK',                        	vhcDef: 'LF,LF,LF,ELW,DLK,GWG,GWM'},
  'F3-DL/Schlauch'    	: {txtDef: 'F3-DL2',			   	vhcDef: 'LF,LF,LF,DLK,GWL,ELW'},
  'F3-DL2'    		: {txtDef: 'F3-DL2',			   	vhcDef: 'LF,LF,LF,DLK'},
  'F3-Schlauch'		: {txtDef: 'F3-Schlauch',		    	vhcDef: 'LF,LF,LF,GWL'},
  'F5-Schiene'		: {txtDef: 'F3-Schiene',		    	vhcDef: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,GWL,TLF,ELW'},
  'F3-ÖL'		: {txtDef: 'F3-ÖL',		    	        vhcDef: 'LF,LF,LF,GWÖl'},
  'F3-Kran'		: {txtDef: 'F3-Kran',			    	vhcDef: 'LF,LF,LF,DLK,FwK'},
  'F3-Kran2'		: {txtDef: 'F3-Kran2',			   	vhcDef: 'LF,LF,LF,FwK'},
  'F3-Atem' 		: {txtDef: 'F3-Atem',			    	vhcDef: 'LF,LF,LF,LF,ELW,GWA,GWL'},
  'F3-GSG'		: {txtDef: 'F3-GSG',			    	vhcDef: 'LF,LF,LF,LF,ELW,RW,GWM,GWG,GWA'}, 	
  'F4'       		: {txtDef: 'Feuer, groß',                     	vhcDef: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,ELW'},
  'F4-DL'		: {txtDef: 'F4-DLK',				vhcDef: 'LF,LF,LF,LF,DLK,ELW'},
  'F4-Zug'		: {txtDef: 'F4-Zug',				vhcDef: 'LF,LF,LF,LF,DLK,ELW,GWL,RW,GWS'},
  'F4-Mess'		: {txtDef: 'F4-Mess',				vhcDef: 'LF,LF,LF,LF,DLK,ELW,GWA,GWM'},
  'F4-Atem'		: {txtDef: 'F4-Atem',				vhcDef: 'LF,LF,LF,LF,DLK,ELW,GWA'},
  'F4-Wasser'		: {txtDef: 'F4-Wasser',				vhcDef: 'LF,LF,LF,LF,DLK,ELW,GWA,TLF'},
  'F4-Schlauch'		: {txtDef: 'F4-Schlauch',			vhcDef: 'LF,LF,LF,LF,DLK,ELW,GWA,GWL,RW'},
  'F4-Rüst'		: {txtDef: 'F4-Rüst',				vhcDef: 'LF,LF,LF,LF,DLK,ELW,GWA,RW'},
  'F4-GSG' 		: {txtDef: 'F4-GSG',				vhcDef: 'LF,LF,LF,LF,ELW,DLK,RW,TLF,GWM,GWG,GWL'},
  'F4S'       		: {txtDef: 'Feuer, groß',                     	vhcDef: 'HLFS,HLFS,HLFS,HLFS,ELW,GWL'},
  'F5'          	: {txtDef: 'F5',                                vhcDef: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,DLK,ELW,TLF,GWA,GWL'},
  'F5-Atem'     	: {txtDef: 'F5-Atem',  				vhcDef: 'LF,LF,LF,LF,LF,ELW,GWA'},
  'F5-GSG'      	: {txtDef: 'F5-GSG',  				vhcDef: 'LF,LF,LF,LF,LF,DLK,ELW,GWL,GWG,GWM'},
  'F5-Raff1'      	: {txtDef: 'F5-TUIS',  				vhcDef: 'LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,ELW,GWÖl,RW,GWL,TUIS'},
//rescue: ULF fix dazu
  'F5-Raff2' 		: {txtDef: 'F5-TUIS2',				vhcDef: 'LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,TUIS,ELW,GWM,GWL,GWÖl,RW,ULF'},
  'Feuer-Raff'          : {txtDef: 'F6-TUIS',                           vhcDef: 'LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,TUIS,TLF,GWL,GWG,GWM,ELW,DLK,FwK,RW'},
  'TH1-Öl'   	: {txtDef: 'Ölschaden',  			vhcDef: 'LF,GWÖl'},
  'Wasserrettung' 	: {txtDef: 'Wasserrettung',			vhcDef: 'LF,GWT'},
  'VU Wasser'     	: {txtDef: 'VU Wasser', 			vhcDef: 'LF,RW,GWT,FwK'},
  'VU Straße'     	: {txtDef: 'VU Straße', 			vhcDef: 'LF,RW,GWÖl'},
  'Wasserschaden' 	: {txtDef: 'Wasserschaden', 			vhcDef: 'LF'},
  'THW'                 : {txtDef: 'techn. Hilfel. Wasser', 	        vhcDef: 'LF,LF,RW,GWT,FwK'}, 
  'TH-GF'               : {txtDef: 'techn. Hilfel. Gefahrgut', 	        vhcDef: 'LF,LF,RW,FwK,GWA,GWG,GWM,ELW,TUIS'},  //                   LF,LF,RW,ELW,GWG
//  'TH1-GF'              : {txtDef: 'techn. Hilfel. Gefahrgut1', 	vhcDef: 'LF,LF,LF,LF,LF,GWL,GWA,GWG,GWM'},
  'TH1'           	: {txtDef: 'TH1', 				vhcDef: 'LF'},
  'TH1S'                : {txtDef: 'TH1-Schiene', 			vhcDef: 'LF/HLFS'},
  //rescue: bei der Türöffnung LF dazu, da Einsatz wegen Personalmangel manchmal nicht abgearbeitet wird
  'Türöffnung'    	: {txtDef: 'Türöffnung',			vhcDef: 'RW,LF'},
  'TH1-DL'        	: {txtDef: 'TH1-DL', 				vhcDef: 'RW,LF,DLK'},
  'TH2'           	: {txtDef: 'TH2', 				vhcDef: 'RW,LF,FwK,ELW'},
  'TH3'           	: {txtDef: 'TH3', 				vhcDef: 'RW,LF,LF,LF,FwK,ELW,GWS'},
  'TH3S'           	: {txtDef: 'TH3', 				vhcDef: 'LF/HLFS,LF/HLFS,LF/HLFS,GWS,RW'},
  'TH5-Schiene'         : {txtDef: 'TH5-Schiene', 			vhcDef: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,GWG,GWM,TUIS,GWS,RW,DLK,ELW'},
  'GSG'           	: {txtDef: 'GSG', 				vhcDef: 'LF,LF,ELW,GWM,GWG'},
  'GSG-Schlauch'  	: {txtDef: 'GSG-Schlauch', 			vhcDef: 'LF,LF,LF,ELW,GWM,GWG,GWL'},
  'GSG2'          	: {txtDef: 'GSG2', 				vhcDef: 'LF,LF,ELW,GWM,GWG,RW'},
  'GSG3'          	: {txtDef: 'GSG3', 				vhcDef: 'LF,LF,LF,LF,LF,LF,ELW,DLK,GWA,GWM,GWG'}, 
  'F8-MANV'       	: {txtDef: 'F8-MANV', 				vhcDef: 'LF,LF,LF,LF,LF,LF,LF,LF,ELW,GWL,RW,GWM,GWG,GWA'},
  'Großbrand'     	: {txtDef: 'Großbrand',				vhcDef: 'LF,LF,LF,LF,LF,LF,LF,LF,DLK,ELW,TLF,GWA,GWL'},
  'Flgz'          	: {txtDef: 'Brennt Flugzeug',                	vhcDef: 'FLF,FLF,FLF,FLF,LF,LF,LF,LF,LF,RTr,ELW,GWG,GWM,RW,GWÖl'},
//massive ausgebaut; es sollen nach Möglichkeit immer alle freien Fahrzeuge vorgeschlagen werden
  'GSL Verband'         : {txtDef: 'Großschadenslage',     		vhcDef: 'LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,ULF,ULF,ULF,ULF,ULF,ULF,ULF,ULF,ULF,ULF,TLF,GWL,GWG,GWM,ELW,ELW,ELW,ELW,ELW,DLK,DLK,DLK,DLK,DLK,DLK,DLK,FwK,FwK,FwK,FwK,FwK,FwK,RW,RW,RW,RW,RW,RW,TUIS,TUIS,ELW,GWM,GWL,GWÖl,RW,ULF,FLF,FLF,FLF,FLF,LF,LF,LF,LF,LF,RTr,ELW,GWG,GWM,RW,GWÖl,GWÖl,GWÖl,GWÖl,LF,LF,LF,LF,LF,LF,LF,LF,ELW,GWL,RW,GWM,GWG,GWA,GWA,GWA,GWA,GWA,GWA,GWA,TLF,TLF,TLF,TLF,TLF,TLF,TLF,TLF,TLF,TLF,GWS,GWS,GWS,GWS,GWS'},
  'Boot klein'          : {txtDef: 'Boot (Klein)',                      vhcDef: 'FLB'},
  'Boot mittel'         : {txtDef: 'Boot (Mittel)',                     vhcDef: 'FLB,FLB'},
  'Verletzentransport'  : {txtDef: 'Verletztentransport',               vhcDef: ''},
//rescue: 5 MTW damit sicher genug Personal vorhanden
  'RTZ'                 : {txtDef: 'Rettungszug',                       vhcDef: 'MTW,MTW,MTW,MTW,MTW'},
};

var FahrzeugeArr = {
/*
  Hier werden die verfügbaren Fahrzeuge mit ihrer Beschreibung, Zusatzwerten wie Geschwindigkeit und der Zuordnung zu einer Fahrzeugklasse aufgelistet.
  in der gleichen Reihenfolge, wie hier die Fahrzeugklassen aufgeführt sind,
  werden sie auch in der Verfügbarkeits-Anzeige der Einsatzinfobox angezeigt.
  Zu einem späteren Zeitpunkt soll es auch möglich sein, neue Fahrzeuge anzulegen und somit das Script nicht ändern zu müssen.

  Syntax: Fahrzeugklasse, Geschwindigkeit, Löschgruppenfahrzeug (und KLF), benötigt Ausbildung, RegExp-Ausdruck für Nachforderungssuche, Wiki-Seite
  Löschgruppenfahrzeug: für die Steuerung, ob zuerst Truppfahrzeuge besetzt werden sollen
  benötigt Ausbildung : für die Steuerung, ob zuerst Sonderfahrzeuge mit ausgebildeter Besatzung ausrücken sollen
  RegExp-Ausdruck     : wird benötigt, wenn man später mal die Fahrzeugklasse anpassen kann, da dies Auswirkung auf das nachfolgende NachforderungenArr hat
*/
  'RTW'                : {vehGrp: 'RTW',  speed: 75, groupVeh: false, trainable: true , regex: /RTW/,                           wiki: 'RTW'},
  'Kleinlöschfahrzeug' : {vehGrp: 'LF',   speed: 60, groupVeh: true,  trainable: false, regex: /Kleinlöschfahrzeug/,            wiki: 'Kleinl%C3%B6schfahrzeug'},
  'LF 8'               : {vehGrp: 'MTW',   speed: 48, groupVeh: true,  trainable: false, regex: /LF 8/,                          wiki: 'LF_8'},
  'LF 10/6'            : {vehGrp: 'LF',   speed: 58, groupVeh: true,  trainable: false, regex: /LF 10\/6/,                      wiki: 'LF_10/6'},
  'LF 20/16'           : {vehGrp: 'LF',   speed: 60, groupVeh: true,  trainable: false, regex: /LF 20\/16/,                     wiki: 'LF_20/16'},
  'HLF 10/6'           : {vehGrp: 'LF',   speed: 58, groupVeh: true,  trainable: false, regex: /HLF 10\/6/,                     wiki: 'HLF_10/6'},
  'HLF 20/16'          : {vehGrp: 'LF',   speed: 60, groupVeh: true,  trainable: false, regex: /HLF 20\/16/,                    wiki: 'HLF_20/16'},
  'HLF 24/14-S'        : {vehGrp: 'HLFS',   speed: 60, groupVeh: true,  trainable: true, regex: /HLF 24\/14 - S/,                    wiki: 'HLF_24/14-S'},
  'LF 16-TS'           : {vehGrp: 'LF',   speed: 52, groupVeh: true,  trainable: false, regex: /LF 16-TS/,                      wiki: 'LF_16-TS'},
  'TLF 20/40 - SL'     : {vehGrp: 'TLF',  speed: 49, groupVeh: false, trainable: false, regex: /TLF 20\/40 - SL/,               wiki: 'TLF_20/40_SL'},
  'TLF 16/25'          : {vehGrp: 'LF',  speed: 55, groupVeh: false, trainable: false, regex: /TLF 16\/25/,                    wiki: 'TLF_16/25'},
  'ULF mit Löscharm'   : {vehGrp: 'ULF',  speed: 40, groupVeh: false, trainable: false, regex: /ULF mit Löscharm/,              wiki: 'ULF_mit_%C3%B6scharm'},
  'ELW 1'              : {vehGrp: 'ELW',  speed: 77, groupVeh: false, trainable: false, regex: /ELW 1/,                         wiki: 'ELW_1'},
  'DLA (K) 23/12'      : {vehGrp: 'DLK',  speed: 63, groupVeh: false, trainable: false, regex: /Drehleiter|DLA [(]K[)] 23\/12/, wiki: 'DLA_(K)_23/12'},
  'RW'                 : {vehGrp: 'RW',   speed: 49, groupVeh: false, trainable: false, regex: /Rüstwagen|RW/,                  wiki: 'RW'},
  'GW-L2 - Wasser'     : {vehGrp: 'GWL',  speed: 53, groupVeh: false, trainable: false, regex: /GW\s?-\s?L2\s?[-]?\s?Wasser/,   wiki: 'GW-L2_Wasser'},
  'GW-Öl'              : {vehGrp: 'GWÖl', speed: 51, groupVeh: false, trainable: false, regex: /GW-Öl/,                         wiki: 'GW-%C3%96l'},
  'GW-A'               : {vehGrp: 'GWA',  speed: 56, groupVeh: false, trainable: false, regex: /GW-A/,                          wiki: 'GW-A'},
  'Kran'               : {vehGrp: 'FwK',  speed: 55, groupVeh: false, trainable: false, regex: /Kran/,                          wiki: 'Kran'},
  'GW-Schiene'         : {vehGrp: 'GWS',  speed: 57, groupVeh: false, trainable: false, regex: /GW-Schiene/,                    wiki: 'GW-Schiene'},
  'GW-Messtechnik'     : {vehGrp: 'GWM',  speed: 40, groupVeh: false, trainable: true , regex: /GW-Messtechnik/,                wiki: 'GW-M'},
  'GW-Gefahrgut'       : {vehGrp: 'GWG',  speed: 46, groupVeh: false, trainable: true , regex: /GW-Gefahrgut/,                  wiki: 'GW-G'},
  'GW-Taucher'         : {vehGrp: 'GWT',  speed: 62, groupVeh: false, trainable: true , regex: /GW-Taucher/,                    wiki: 'GW-T'},
  'GW-TUIS'            : {vehGrp: 'TUIS',  speed: 73, groupVeh: false, trainable: true , regex: /GW-TUIS/,                      wiki: 'GW-TUIS'},
  'Flugfeldlöschfahrzeug' : {vehGrp: 'FLF',  speed: 110, groupVeh: false, trainable: true , regex: /Flugfeldlöschfahrzeug/,     wiki: 'Flugfeldlöschfahrzeug'},
  'Rettungstreppe'     : {vehGrp: 'RTr',  speed: 65, groupVeh: false, trainable: true , regex: /Rettungstreppe/,                wiki: 'Rettungstreppe'},
  'Feuerlöschboot'     : {vehGrp: 'FLB', speed: 60, groupVeh: false, trainable: true , regex: /Feuerlöschboot/,                 wiki: 'Feuerl%C3%B6schboot'},
  'Rettungsboot'       : {vehGrp: 'RTB', speed: 60, groupVeh: false, trainable: true , regex: /Rettungsboot/,                   wiki: 'Rettungsboot'},
};

// RegExp zur Suche nach nachzufordernden Fahrzeugen, Anforderung ab x Feuerwachen/Berufsfeuerwehren
var NachforderungenArr = {
  'RTW' : {text: 'Rettungswagen',           regex: /RTW/                                        , ab: '10 BF'},
  'ELW' : {text: 'Einsatzleitwagen',        regex: /ELW 1/                                      , ab:  '5 FW'},
  'TLF' : {text: 'Tanklöschfahrzeug',       regex: /TLF 20\/40 - SL/                            , ab:  '7 FW'},
//  'T16' : {text: 'Tanklöschfahrzeug',       regex: /TLF 16\/25/                                 , ab:  '7 FW'},
  'GWA' : {text: 'Gerätewagen Atemschutz',  regex: /GW-A/                                       , ab:  '6 FW'},
  'RW'  : {text: 'Rüstwagen',               regex: /Rüstwagen|RW/                               , ab:  '4 FW'},
  'DLK' : {text: 'Drehleiter (Korb)',       regex: /Drehleiter|DLA [(]K[)] 23\/12/              , ab:  '3 FW'}, //maskieren der Klammern mit [], mit \ scheint es nicht zu gehen
  'GWG' : {text: 'Gerätewagen Gefahrgut',   regex: /GW-Gefahrgut/                               , ab:  '2 BF'},
  'GWM' : {text: 'Gerätewagen Messtechnik', regex: /GW-Messtechnik/                             , ab:  '2 BF'},
  'GWÖl': {text: 'Gerätewagen Öl',          regex: /GW-Öl/                                      , ab:  '4 FW'},
  'GWL' : {text: 'Schlauchwagen',           regex: /GW\s?-\s?L2\s?[-]?\s?Wasser/                , ab:  '5 FW'},
  'GWS' : {text: 'Gerätewagen Schiene',     regex: /GW-Schiene/                                 , ab: '10 FW'},
  'FwK' : {text: 'Feuerwehrkran',           regex: /Kran/                                       , ab: '25 FW'},
  'GWT' : {text: 'Gerätewagen Taucher',     regex: /GW-Taucher/                                 , ab: '25 BF'},
  'TUIS' : {text: 'GW-TUIS',                regex: /GW-TUIS/                                    , ab: '64 FF'}, //ab 2 Sdadtteil
  'FLF' : {text: 'Flugfeldlöschfahrzeug',   regex: /Flugfeldlöschfahrzeug/                      , ab:  '2 ST'}, //ab 2 Stadtteil
  'RTr' : {text: 'Rettungstreppe',          regex: /Rettungstreppe/                             , ab:  '2 ST'}, //ab 2 Stadtteil
  'FLB' : {text: 'Feuerlöschboot',          regex: /Feuerlöschboot/                             , ab: '30 BF', onWater: true}, //ab 30 BF und 2 Stadtteil
  'LF'  : {text: 'Löschgruppenfahrzeug',    regex: /Kleinlöschfahrzeug|LF 8|LF 10\/6|LF 20\/16|LF 16-TS|HLF 10\/6|HLF 20\/16|TLF 16\/25/ , ab:  '1 FW'},
  'HLFS' : {text: 'Hilfeleistungslöschfahrzeug Schiene',       regex: /HLF 24\/14 - S/                            , ab:  '65 BF'},
  'RTB' : {text: 'Rettungsboot',            regex: /Rettungsboot/                               , ab: '50 BF', onWater: true}, //ab 50 BF und 2 Stadtteil
  'ULF' : {text: 'Umweltlöschfahrzeug',     regex: /ULF mit Löscharm/                           , ab: {FW: 64}},
  'MTW' : {text: 'Mannschaftstransportwagen',  regex: /LF 8/                                       , ab: '65 FW'},
};

// besondere Örtlichkeiten auf der Karte
var locationArr = {
  // Sonderbebauung zuerst
  'Flughafen'     : {from: {x:  83, y: 179}, to: {x:  84, y: 180}},
  'Hafen'         : {from: {x:  98, y: 198}, to: {x: 100, y: 200}},
  'Raffinerie'    : {from: {x:   6, y: 176}, to: {x:   7, y: 176}},
  'Güterbahnhof'  : {from: {x:  50, y: 152}, to: {x:  51, y: 152}},
  'Bahnlinie/West' : {from: {x: 1, y: 152}, to: {x: 49, y: 152}},
  'Bahnlinie/Ost' : {from: {x: 52, y: 152}, to: {x: 100, y: 152}}, 
  // 'normale' Bereiche
  'Altstadt'      : {from: {x:   1, y:   1}, to: {x: 100, y: 100}},
  'Neustadt'      : {from: {x:   1, y: 101}, to: {x: 100, y: 200}},
}

// Einstellungsoptionsgruppen
// gruppieren die Optionen in mehreren Gruppen mit Zwischenüberschriften
var settingsGroupArr = {
  'global' : 'globale Einstellungen',
  'eList'  : 'Einsatzliste',
  'eInfo'  : 'Einsatzanzeige',
  'fList'  : 'Fahrzeugliste',
  'fInfo'  : 'Fahrzeuganzeige',
  'pList'  : 'Personalliste',
  'school' : 'Schule',
  'wList'  : 'Wachenliste',
  'gList'  : 'Gebäudeliste',
  'tList'  : 'Topliste',
  'lList'  : 'Log',
}

// Farbliste für Optionen
var colorArr = {
  red    : 'rot',
  blue   : 'blau',
  cyan   : 'blaugrün',
  maroon : 'braun',
  yellow : 'gelb',
  beige  : 'beige',
  peru   : 'dunkelbeige', //#cd853f
  gray   : 'grau',
  green  : 'grün',
  darkgreen  : 'dunkelgrün',
  lime   : 'hellgrün',
  purple : 'lila',
  navy   : 'marineblau',
  olive  : 'olivgrün',
  teal   : 'petrol',
  fuchsia: 'pink',
  black  : 'schwarz',
  silver : 'silber',
  white  : 'weiß',
}

// Zeilenzahl für FMS-Anzeige
var FMSlineArr = {
  '1': 'einzeilig',
  '2': 'zweizeilig',
  '3': 'dreizeilig',
  '4': 'vierzeilig',
}

/* Einstellungsoptionen
   Syntax: Defaultwert, Gruppe, Typ, Länge (bei BOOL uninteressant), Prüfroutine [BOOL func(value)], Text zur Option
   folgende Typen werden unterstützt:
   BOOL: bool'scherWert mit true oder false, wird als Checkbox dargestellt
   RAD : Radiobuttonliste
   LIST: DropDownliste
   INT : Integerwert
   STR : Zeichenkette
*/





var adr = document.location.href;



var Strassennamen = new Array(
  //
  // Hier die Strassennamen festlegen, 
  // WICHTIG:
  // MINDESTENS 99 Straßen eintragen
  // MAXMIMAL 999 Strassen eintragen !!!!!
  //
'Adlersteig', 'Albert-Mücke-Ring', 'Alte Spaargasse', 'Alte Str.', 'Alter Mühlenweg', 'Altzaschendorf', 'Am Bogen', 'Am Breitenberg', 'Am Buschbad', 'Am Hohen Gericht',
'Am Knorrberg', 'Am Langen Graben', 'Am Lommatzscher Tor', 'Am Mühlgraben', 'Am Röhrbrunnen', 'Am Schottenberg', 'Am Steinberg', 'Am Triebischwehr', 'Am Wall', 'an Den Katzenstufen',
'an Der Alten Ziegelei', 'an Der Frauenkirche', 'an Der Grubenbahn', 'an Der Hohen Eifer', 'an Der Schreberstr.', 'an Der Spaargasse', 'an Der Telle', 'an Der Trinitatiskirche', 'Angerweg', 'Auenstr.',
'Auf Der Höhe', 'August-Bebel-Str.', 'Baderberg', 'Badgasse', 'Bahnhofstr.', 'Beethovenstr.', 'Bennoweg', 'Berghausstr.', 'Berglehne', 'Bergstr.',
'Birkenweg', 'Bockwener Weg', 'Bohnitzscher Str.', 'Boselweg', 'Böttgerstr.', 'Brauhausstr.', 'Brennerstr.', 'Burgstr.', 'Cöllner Str.', 'Crassostr.',
'Dammweg', 'Dieraer Weg', 'Dobritzer Berg', 'Domblick', 'Domplatz', 'Dr.-Donner-Str.', 'Dr.-Eberle-Platz', 'Dreilindenstr.', 'Drescherweg', 'Dresdner Str.',
'Dr.-Felicitas-Kolde-Weg', 'Dr.-M.-Bahrmann-Weg', 'Drosselgrund', 'Dr.-Wilhelm-Krohn-Weg', 'Elbgasse', 'Elbstr.', 'Elbtalstr.', 'Emil-Zöllner-Weg', 'Erlichtstr.', 'Ernst-Thälmann-Str.',
'Etzlerstr.', 'Fabrikstr.', 'Fährmannstr.', 'Feldgasse', 'Fellbacher Str.', 'Ferdinandstr.', 'Fischergasse', 'Fleischergasse', 'Freiheit', 'Friedrich-Geyer-Str.',
'Gabelsberger Str.', 'Gabelstr.', 'Gartenstr.', 'Gasernberg', 'Gelegegasse', 'Gellertstr.', 'Gerbergasse', 'Gerichtsweg', 'Geschwister-Große-Weg', 'Goethestr.',
'Goldgrund', 'Görnische Gasse', 'Großenhainer Str.', 'Grundmannstr.', 'Grundstr.', 'Grüner Weg', 'Gustav-Graf-Str.', 'Haasestr.', 'Hafenstr.', 'Hahnemannsplatz',
'Hainstr.', 'Heiliger Grund', 'Heinrich-Freitäger-Str.', 'Heinrich-Heine-Str.', 'Heinrichsplatz', 'Herbert-Böhme-Str.', 'Hermann-Grafe-Str.', 'Hintermauer', 'Hirschbergstr.', 'Hochuferstr.',
'Hohe Sicht', 'Hohe Str.', 'Hohe Wiese', 'Hohlweg', 'Höroldtstr.', 'Hospitalstr.', 'Huttenburgweg', 'Ilschnerstr.', 'Jagdsteig', 'Jägerstr.', 
'Jahnastr.', 'Jaspisstr.', 'Joachimstal', 'Johannesstr.', 'Jüdenbergstr.', 'Kalkberg', 'Kändlerstr.', 'Kapellenweg', 'Kapitelholzsteig', 'Karl-Marx-Str.', 
'Karl-Niesner-Str.', 'Karlstr.', 'Käuzchenring', 'Kerstingstr.', 'Kiebitzweg', 'Klausenweg', 'Kleinmarkt', 'Kobitzsch', 'Köhlerstr.', 'Kohrockstr.',
'Korbitzer Str.', 'Kreyerner Str.', 'Kruspestr.', 'Kühnestr.', 'Kurt-Hein-Str.', 'Kynastweg', 'Lehmberg', 'Leinewebergasse', 'Leinpfad', 'Leipziger Str.',
'Leitmeritzer Bogen', 'Lerchahöhe', 'Lerchaweg', 'Leschnerstr.', 'Lessingstr.', 'Lindenplatz', 'Loosestr.', 'Lorenstr.', 'Lorenzgasse', 'Louise-Otto-Str.',
'Lückenhübelstr.', 'Ludwig-Richter-Str.', 'Luisenstr.', 'Lutherplatz', 'Lutherstr.', 'Mannfeldstr.', 'Many-Jost-Weg', 'Marienhofstr.', 'Markt', 'Marktgasse',
'Martinstr.', 'Max-Dietel-Str.', 'Max-Haarig-Str.', 'Max-Kamprath-Str.', 'Meisastr.', 'Melzerstr.', 'Mendestr.', 'Mittelberg', 'Mönchslehne', 'Moritzburger Platz',
'Moritzstr.', 'Mühlweg', 'Muldenweg', 'Nassauweg', 'Neue Hoffnung', 'Neugasse', 'Neumarkt', 'Neuschletta', 'Neuzaschendorf', 'Nicolaisteg', 'Niederauer Str.',
'Niederfährer Str.', 'Niederspaarer Str.', 'Nossener Str.', 'Obergasse', 'Oberspaarer Str.', 'Oeffingener Str.', 'Ossietzkystr.', 'Pestalozzistr.', 'Pfarrgasse', 'Plangasse',
'Plossenhöhe', 'Plossenweg', 'Poetenweg', 'Polenzer Weg', 'Poststr.', 'Proschwitzer Str.', 'Proschwitzer Weg', 'Quellgasse', 'Querallee', 'Querstr.',
'Questenberger Weg', 'Radeburger Str.', 'Ratsweinberg', 'Rauhentalstr.', 'Rautenbergweg', 'Riesensteinstr.', 'Ringstr.', 'Robert-Blum-Str.', 'Robert-Koch-Platz', 'Rodelandweg',
'Röhrenweg', 'Rosa-Luxemburg-Str.', 'Rosengasse', 'Roßmarkt', 'Rote Gasse', 'Rote Stufen', 'Roter Weg', 'Rottewitzer Str.', 'Rühlingstr.', 'Schanzenstr.',
'Schillerstr.', 'Schletta', 'Schlettaer Str.', 'Schloßberg', 'Schloßgäßchen', 'Schlossergasse', 'Schloßstufen', 'Schmidener Str.', 'Schreberstr.', 'Schulplatz',
'Schützestr.', 'Seelensteig', 'Siebeneichen', 'Siebeneichener Kirschberg', 'Siebeneichener Schloßberg', 'Siebeneichener Str.', 'Siedlerstr.', 'Smetanastr.', 'Sonnenleite', 'Stadtblick',
'Stadtparkhöhe', 'Steinweg', 'Stiftsweg', 'Straße Der Befreiung', 'Talstr.', 'Teichertring', 'Teichstr.', 'Theaterplatz', 'Thomas-Müntzer-Str.', 'Tonberg',
'Triftweg', 'Trinitatiskirchweg', 'Tzschuckestr.', 'Uferstr.', 'Unverhofft Glück', 'Vorbrücker Str.', 'Webergasse', 'Weinberggasse', 'Werdermannstr.', 'Wettinstr.',
'Wiesandstr.', 'Wiesengasse', 'Wilhelm-Walkhoff-Platz', 'Wilsdruffer Str.', 'Winkwitzer Str.', 'Winzerstr.', 'Wittigstr.', 'Wolyniezstr.', 'Zaschendorfer Str.', 'Ziegelstr.',
'Zieglerweg', 'Zscheilaer Str.', 'Zum Roten Gut'

);



var settingsArr = {
  checkForUpdates            : {valDef: true,  group: 'global', type: 'BOOL', length:  1, text: 'auf Updates prüfen'},
  dispStichwortColour        : {valDef: 'red', group: 'global', type: 'LIST', length:  1, list: colorArr, text: 'Schriftfarbe des Alarmierungsstichworts'},
  condenseVehicles           : {valDef: true,  group: 'global', type: 'BOOL', length:  1, text: 'Fahrzeuge zusammenfassen (LF, LF => 2LF)'},
  disableSelectionDueToStorm : {valDef: false, group: 'global', type: 'BOOL', length:  1, text: 'Unwettermodus'},
  reducedSelectionVehicle    : {valDef: 'LF', group: 'global', type: 'STR', length: 10, valChkFunc: checkRedSelVhc, text: 'Fahrzeug(e) für Unwettermodus'},
  colorRemainingTimeBar      : {valDef: true,  group: 'global', type: 'BOOL', length:  1, text: 'farbige Anzeige der Restlaufzeit'},
  showInfoKlasseInListe      : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'Einsatzart anzeigen'},
  showInfoLangtextListe      : {valDef: false, group: 'eList',  type: 'BOOL', length:  1, text: 'Langtext zur Einsatzklasse anzeigen'},
  showInfoVehiclesInListe    : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'gemäß Einsatzklasse zu alarmierende Fahrzeuge anzeigen'},
  alignInfoKlasseToRight     : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'Einsatzart/Fahrzeuge rechtsbündig ausrichten'},
  aktuall		     : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'Seite automatisch Aktuallisieren (F5)'},
  zaehlerinfo		     : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'Einsatzzähler ausschalten/resetten'},
  highlightOrder             : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'Eigenen Einsatzauftrag hervorheben'},
  highlightVBOrder           : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'Verbandseinsatzaufträge hervorheben'},

 showInfoStichwort          : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Stichwort mit Wiki-Link versehen'},
  moveSequenceInStation      : {valDef: 'normal',  group: 'eInfo',  type: 'RAD',  length:  1, text: 'Abmarsch von gleicher Wache|normal=wie verfügbar;trupp=Truppfahrzeuge zuerst;special=Sonderfahrzeuge zuerst'},
  showInfoKlasse             : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Einsatzklasse anzeigen'},
  showInfoLangtext           : {valDef: false, group: 'eInfo',  type: 'BOOL', length:  1, text: 'Langtext zur Einsatzklasse anzeigen'},
  showInfoKlassenalarm       : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'gemäß Einsatzklasse zu alarmierende Fahrzeuge anzeigen'},
  showInfoKlassenalarmOpt    : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Anzeige der optionalen Fahrzeuge'},
  showInfoRTW                : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Anzeige der benötigten RTW'},
  showInfoUnterwegs          : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Anzeige der Fahrzeuge, die bereits im Einsatz eingebunden sind'},
  showInfoUnterwegsTrennen   : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'eingebundene Fahrzeuge nach Status trennen'},
  showInfoUnterwegsTrennLang : {valDef: false, group: 'eInfo',  type: 'BOOL', length:  1, text: 'eingebundene Fahrzeuge nach Status mit Text anzeigen'},
  showInfoNachforderungen    : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Anzeige der Fahrzeuge, die von der Einsatzstelle nachgefordert wurden'},
  showInfoToAlarm            : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Anzeige der zu alarmierenden Fahrzeuge'},
  showInfoFahrzeit           : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Anzeige der Fahrzeiten zur Einsatzstelle (von-bis)',},
  showInfoFahrzeitOpt        : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Anzeige der Fahrzeiten für die optionalen Fahrzeuge',},
  showInfoNichtVerfuegbar    : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Anzeige der benötigten, aber nicht verfügbaren Fahrzeuge',},
  showInfoVerfuegbar         : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Anzeige aller verfügbarer Fahrzeugklassen'},
  callSurplusRTW             : {valDef: false, group: 'eInfo',  type: 'BOOL', length:  1, text: 'einen RTW mehr alarmieren, als von Verletztenzahl notwendig (mögliche Nachalarmierung)'},
  addLocationDescription     : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'textliche Lageangabe hinter Positionsangabe anhängen'},
  highlightCityExtension     : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Einsatzposition in Stadterweiterung als Positionsangabe farblich hervorheben'},
  highlightCityExtColour     : {valDef: 'green', group: 'eInfo', type: 'LIST', length:  1, list: colorArr, text: 'Schriftfarbe für Positionsangabe'},
  highlightVehicleRequest    : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Fahrzeugnachforderung in Rückmeldungen farblich hervorheben'},
  highlightVehReqColour      : {valDef: 'green', group: 'eInfo', type: 'LIST', length:  1, list: colorArr, text: 'Schriftfarbe für Positionsangabe'},
  dispStatusAsFMSDisplayEL   : {valDef: true,  group: 'eInfo',  type: 'BOOL', length:  1, text: 'Status als FMS-Gerät anzeigen'},
  dispFMSDisplayLinesEL      : {valDef: '2',   group: 'eInfo',  type: 'LIST', length:  1, list: FMSlineArr, text: 'Zeilenanzahl der Statusgeberknöpfe'},
  defaultTabSort             : {valDef: 'none', group: 'pList',  type: 'LIST', length:  1, text: 'Standard-Sortierung',
                                list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  useMotivationColourCode    : {valDef: true,  group: 'pList',  type: 'BOOL', length:  1, text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCode       : {valDef: true,  group: 'pList',  type: 'BOOL', length:  1, text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCode      : {valDef: true,  group: 'pList',  type: 'BOOL', length:  1, text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCode         : {valDef: true,  group: 'pList',  type: 'BOOL', length:  1, text: 'Schicht farblich hervorheben'},
  useStatusColourCode        : {valDef: true,  group: 'pList',  type: 'BOOL', length:  1, text: 'Status farblich hervorheben'},
  defaultTabSortSchool       : {valDef: 'none', group: 'school', type: 'LIST', length:  1, text: 'Standard-Sortierung',
                                list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  useMotivColourCodeSchool   : {valDef: true,  group: 'school', type: 'BOOL', length:  1, text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCodeSchool : {valDef: true,  group: 'school', type: 'BOOL', length:  1, text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCodeSchool: {valDef: true,  group: 'school', type: 'BOOL', length:  1, text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCodeSchool   : {valDef: true,  group: 'school', type: 'BOOL', length:  1, text: 'Schicht farblich hervorheben'},
  showSummaryVehicleList     : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Fahrzeugeliste am Kopf der Seite zeigen (zusätzlich)'},
  sortVehiclesByClass        : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Fahrzeugliste nach Klassenreihenfolge sortieren'},
  showStatus7OnlyIfExists    : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Status 7 nur anzeigen, wenn nötig'},
  showStatusLangtext         : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Text zum Status anzeigen'},
  showTotalkm                : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Anzeige der gesamten km-Leistung je Fahrzeugtyp'},
  showAvgkm                  : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Anzeige der durchschnittlichen km-Leistung je Fahrzeugtyp'},
  showAvgDamage              : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Anzeige des durchschnittlichen Schadens je Fahrzeugtyp'},
  showDamageList             : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Zusammenfassung der beschädigten Fahrzeuge anzeigen'},
  limitDamage                : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Anzeige beschädigter Fahrzeuge einschränken'},
  limitDamageTo              : {valDef: 100,   group: 'fList',  type: 'INT',  length:  3, valChkFunc: checkLimDmg, text: 'Nur beschädigte Fahrzeuge mit weniger als x% (100 >= x > 0) anzeigen:'},
  showDamagedAtFirstCall     : {valDef: false, group: 'fList',  type: 'BOOL', length:  1, text: 'zu reparierende Fahrzeuge direkt aufklappen'},
  listHighLowKm              : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Anzeige der höchste/niedrigste km-Leistungen'},
  dispStatusAsFMSDisplayFL   : {valDef: true,  group: 'fList',  type: 'BOOL', length:  1, text: 'Status als FMS-Gerät anzeigen'},
  dispFMSDisplayLinesFL      : {valDef: '3',   group: 'fList',  type: 'LIST', length:  1, list: FMSlineArr, text: 'Zeilenanzahl der Statusgeberknöpfe'},
  dispStatusAsFMSDisplayFI   : {valDef: true,  group: 'fInfo',  type: 'BOOL', length:  1, text: 'Status als FMS-Gerät anzeigen'},
  dispFMSDisplayLinesFI      : {valDef: '3',   group: 'fInfo',  type: 'LIST', length:  1, list: FMSlineArr, text: 'Zeilenanzahl der Statusgeberknöpfe'},
  useOriginalVhcColorScheme  : {valDef: false, group: 'wList',  type: 'BOOL', length:  1, text: 'Farbgestaltung für Fahrzeugbedarf im Original benutzen'},
  imgStationList             : {valDef: 'normal', group: 'wList',  type: 'RAD',  length:  1, text: 'Graphiken in Liste|normal=normale Graphik;small=kleine Graphik;none=Graphik nicht anzeigen'},
  highlightManning           : {valDef: true,  group: 'wList',  type: 'BOOL', length:  1, text: 'Mannschaftstärke bei Berufsfeuerwehren hervorheben'},
  imgBuildingList            : {valDef: 'normal', group: 'gList',  type: 'RAD',  length:  1, text: 'Graphiken in Liste|normal=normale Graphik;small=kleine Graphik;none=Graphik nicht anzeigen'},
  highlightUser              : {valDef: true,  group: 'tList',  type: 'BOOL', length:  1, text: 'Eigenen Namen in Toplisten hervorheben'},
  summarizeLog               : {valDef: true,  group: 'lList',  type: 'BOOL', length:  1, text: 'Zusammenfassung des Logs erstellen'},
  showinfoeinsatzzahl        : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'Zähle deine Einsätze'},

}

// FMS-Status: wird von der Fahrzeugübersicht benutzt
// Syntax: Text (max 12), Textfarbe in Fahrzeugübersicht, Hintergrundfarbe in Fahrzeugübersicht, Status immer anzeigen
var FMSStatusArr = {
  'I' : {tcol: 'white',   bcol: 'black',   text: 'Relais I',     dispInList: false},
  'II': {tcol: 'white',   bcol: 'black',   text: 'Relais II',    dispInList: false},
  '0' : {tcol: 'white',   bcol: 'red',     text: 'Notruf',       dispInList: false},
  '1' : {tcol: '#D6D6D6', bcol: '#0000F8', text: 'frei',         dispInList: true,  dispAlways: true},
  '2' : {tcol: 'black',   bcol: '#00FF2D', text: 'auf Wache',    dispInList: true,  dispAlways: true},
  '3' : {tcol: 'black',   bcol: '#FFCC27', text: 'Anfahrt',      dispInList: true,  dispAlways: true},
  '4' : {tcol: 'white',   bcol: '#FF5A19', text: 'E-Stelle an',  dispInList: true,  dispAlways: true},
  '5' : {tcol: 'black',   bcol: 'cyan',    text: 'Sprechwunsch', dispInList: false},
  '6' : {tcol: 'black',   bcol: '#BABABA', text: 'nicht bereit', dispInList: true,  dispAlways: true},
  '7' : {tcol: 'black',   bcol: '#DAD815', text: 'mit Patient',  dispInList: true,  dispAlways: false},
  '8' : {tcol: 'black',   bcol: 'lightgreen', text: 'am Transportziel', dispInList: false},
  '9' : {tcol: 'black',   bcol: 'teal',    text: 'Handquittung', dispInList: false},
}

// Syntax: Hintergrundfarbe Personalstatus
var personalStatusArr = {
  'Beim Einsatz'           : {tcol : '#FF0000', onDuty: true , ready: true , inSchool: false, text : 'im Einsatz'},
  'Einsatzbereit'          : {tcol : '#00FF00', onDuty: true , ready: true , inSchool: false, text : 'bereit'},
  'Frei - nicht im Dienst' : {tcol : '#777777', onDuty: false, ready: false, inSchool: false, text : 'frei'},
  'In der Feuerwehrschule' : {tcol : '#5555FF', onDuty: false, ready: false, inSchool: true , text : 'Schule'},
}

// Ausbildungen: soll für die Lehrgangsseite benutzt werden
// Syntax: RegExp-Ausdruck, ID des checkbox-Elementes, Hintergrundfarbe in Mannschaftsübersicht
var trainingArr = {
  'Gefahrgut'         : {regex: /Gefahrgut/,         cboxid: 'education_type_1', tcol: {light:'brown', black:'yellow'}, bcol: {light:'brown', black:'yellow'}},
  'Rettungsassistent' : {regex: /Rettungsassistent/, cboxid: 'education_type_2', tcol: {light:'red', black:'white'},  bcol: {light:'red', black:'white'}},
  'Taucher'           : {regex: /Taucher/,           cboxid: 'education_type_3', tcol: {light:'blue', black:'blue'},   bcol: {light:'blue', black:'blue'}},
  'TUIS'              : {regex: /TUIS/,              cboxid: 'education_type_7', tcol: {light:'orangered', black:'orangered'},  bcol: {light:'orangered', black:'orangered'}},
  'Flughafen'         : {regex: /Flughafen/,         cboxid: 'education_type_4', tcol: {light:'teal', black:'teal'},   bcol: {light:'teal', black:'teal'}},
  'Löschboot'         : {regex: /Löschboot/,         cboxid: 'education_type_5', tcol: {light:'darkblue', black:'lightblue'}, bcol: {light:'darkblue', black:'lightblue'}},
  'Rettungsboot'      : {regex: /Rettungsboot/,      cboxid: 'education_type_6', tcol: {light:'orange', black:'orange'}, bcol: {light:'orange', black:'orange'}},
  '2-Wege-Führerschein': {regex: /2-Wege-Führerschein/,  cboxid: 'education_type_8', tcol: {light:'lightgreen', black:'lightgreen'}, bcol: {light:'lightgreen', black:'lightgreen'}},
  'Rettungszug'      : {regex: /Rettungszug/,        cboxid: 'education_type_9', tcol: {light:'fuchsia', black:'fuchsia'}, bcol: {light:'fuchsia', black:'fuchsia'}},
}

// Syntax: Textfarbe in Mannschaftsübersicht
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner der Motivation des Kameraden ist.
var motivationArr = {
  90 : {tcol: '#32CD32'},
  76 : {tcol: '#32CD32'},
  51 : {tcol: '#32CD32'},
  26 : {tcol: '#dc143c'},
  11 : {tcol: '#dc143c'},
   0 : {tcol: '#dc143c'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
}

// Syntax: Textfarbe in Mannschaftsübersicht
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner der Fähigkeit des Kameraden ist.
var abilityArr = {
  90 : {tcol: '#32CD32'},
  76 : {tcol: '#32CD32'},
  51 : {tcol: '#32CD32'},
  26 : {tcol: '#dc143c'},
  11 : {tcol: '#dc143c'},
   0 : {tcol: '#dc143c'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
}

// Syntax: Textfarbe für Wachenstärke von Berufsfeuerwehren
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner der Fähigkeit des Kameraden ist.
var manningArr = {
 111 : {tcol: '#00FF00'},
  96 : {tcol: '#00ff00'},
  81 : {tcol: '#ff6347'},
  66 : {tcol: '#dc143c'},
  31 : {tcol: '#dc143c'},
   0 : {tcol: '#dc143c'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
}

var shiftArr = {
  1 : {tcol: '#602A4C'},//'#FFA500'
  2 : {tcol: '#1E90FF'},
  3 : {tcol: '#FF1493'},
}

// unter welchem URL finde ich Infos über das Script?
const UPDATEURL="http://userscripts.org/scripts/show/"+USERSCRIPTID;
// unter welchem URL finde ich das Script als Installation?
const INSTALLURL="http://userscripts.org/scripts/source/"+USERSCRIPTID+".user.js";
// unter welchem URL finde ich die Metadaten zum Script?
const METAURL="http://userscripts.org/scripts/source/"+USERSCRIPTID+".meta.js";

// Anzahl der Spalten in der Verfügbar-Anzeige.
const MAXSPALTENVERFUEGBAR=18;

// Präfixe für Werte in GM-Ablage
const GMVAL_PREF_OPT = 'opt_'; //Optionen
const GMVAL_PREF_STW = 'eme_'; //Einsatzzuordnung
const GMVAL_PREF_EKL = 'ecl_'; //Einsatzklassen

const WikiURL = 'http://wiki.feuerwache.net/wiki/';
const RegExpPath = /https?:\/\/[^\/]*(.*)/;

// Typen mit kürzere Bezeichnern deklarieren
const XPType = {
  ANY:               XPathResult.ANY_TYPE,
  NUMBER:            XPathResult.NUMBER_TYPE,
  STRING:            XPathResult.STRING_TYPE,
  BOOL:              XPathResult.BOOLEAN_TYPE,
  ITERATOR:          XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
  ITERATOR_ORDERED:  XPathResult.ORDERED_NODE_ITERATOR_TYPE,
  SNAPSHOT:          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  SNAPSHOT_ORDERED:  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  ANY_NODE:          XPathResult.ANY_UNORDERED_NODE_TYPE,
  FIRST_ORDERED:     XPathResult.FIRST_ORDERED_NODE_TYPE,
}

/*********************************************************************************
hier gehts mit dem Programm los
*********************************************************************************/
// entfernt führende und folgende Leerzeichen
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
String.prototype.removeTags = function() { return this.replace(/<.*?>/g, '').trim(); };

var ToAlarm = new Array;
var Optional = new Array;
var Unterwegs = new Array;
var AmOrt = new Array;
var AufAnfahrt = new Array;
var Wartend = new Array;
var NichtVerf = new Array;
var ichBins=false;
var FirstRun=true;
var CBClicked=false;
var debugging=false;
var machVorschlag=true;
var ScriptUpdateAvailable="";
var user = '';
var order = '';
var msgArea = getByID('msgArea');
// Layoutdesign  holen
var layout = unsafeWindow.feuerwache_layout;
var layoutNew = layout == 'light';

init();
main();

// Einstieg
function main()
{
  ichBins = true;

  var nodeUpdInfo = addAboutUpdateInfo();
  if (nodeUpdInfo && nodeUpdInfo != '')
  { msgArea.appendChild(nodeUpdInfo);
    AddKonfigEventlisteners();
  }

  // Zeichenkette für Suche reduzieren
  docPath = location.pathname;

  if (docPath == '/feuerwehr-einsaetze')
  { bearbeiteUebersichtsseite(); }
  else if (docPath == '/feuerwehrleitstelle')
  { bearbeiteLeitstelle(); }
  else if (docPath == '/feuerwehrfahrzeuge')
  { bearbeiteFahrzeugliste(); }
  else if (docPath == '/feuerwachen')
  { bearbeiteFeuerwachenliste(); }
  else if (docPath == '/gebaeude')
  { bearbeiteGebaeudeliste(); }
  else if (docPath == '/personal/list')
  { bearbeitePersonaltabellen(); }
  else if (docPath.search(/\/feuerwachen\/\d+\/feuerwehrleute$/) != -1 )
  { bearbeitePersonaltabellen(); }
  else if (docPath.search(/\/feuerwachen\/\d+\/feuerwehrautos$/) != -1 )
  { bearbeiteWacheFahrzeugliste(); }
  else if (docPath.search(/\/vehicle\/show\/caption_url\/.*$/) != -1 )
  { bearbeiteFahrzeugkauf(); }
  else if (docPath.search(/\/feuerwehrfahrzeuge\/\d+\/verschieben$/) != -1 )
  { bearbeiteFahrzeugkauf(); }
  else if (docPath.search(/\/building_to_user\/show\/id\/\d+$/) != -1 )
  { doBuildings(); }
  else if (docPath.search(/\/feuerwehr-einsaetze\/\d+$/) != -1 )
  { bearbeiteEinsatzseite(); }
  else if (docPath.search(/\/feuerwehrfahrzeuge\/\d+\/bearbeiten$/) != -1 )
  { bearbeiteFahrzeugseite(); }
  else if (docPath.search(/\/feuerwehrfahrzeuge\/\d+$/) != -1 )
  { doVehicle(); }
  else if (docPath.search(/\/feuerwehrfahrzeuge\/\d+\/reparieren$/) != -1 )
  { doVehicleRepair(); }
  else if (docPath.search(/\/vehicle_to_user\/show\/id\/\d+\/repair\/true$/) != -1 )
  { doVehicleRepairSent(); }
  else if (docPath.search(/\/feuerwehr-einsaetze\/\d+\/funk(\/\d+)?$/) != -1 )
  { doRadioTransscript(); }
  else if (docPath.search(/\/toplist(\/\d+)?$/) != -1 ||
           docPath.search(/\/toplist\/monatlich$/) != -1 )
  { doToplist(); }
  else if (docPath.search(/\/verband\/.*(\/mitglieder\/\d+)?$/) != -1 )
  { doToplist(); }
  else if (docPath.search(/\/event_logfile\/list(\/page\/\d+)?$/) != -1 )
  { doLoglist(); }
  else if (docPath == '/ereglamsAAOConfig')
  { bearbeiteConfigSeite(); }
  else if (docPath == '/ereglamsAAO\/Einsaetze')
  { bearbeiteAAOEinsaetze(); }
  else if (docPath == '/ereglamsAAO\/Einsatzklassen')
  { bearbeiteAAOEinsatzklassen(); }
  else if (docPath == '/ereglamsAAO\/Fahrzeuge')
  { bearbeiteAAOFahrzeuge(); }

  ichBins = false;
}

// Gebäude anzeigen
function doBuildings()
{ switch(getXPath("//div[@id='content']/table[@class='defaultTable']/tbody/tr[descendant::td/text()='Art:']/td[2]", document, XPType.FIRST_ORDERED).singleNodeValue.innerHTML.trim())
  { case 'Feuerwehrschule' : doSchool(true);
                             break;
    case 'Krankenhaus'     :
                             break;
    case 'Werkstatt'       : doGarage();
                             break;
  }
}

// Feuerwehrschule anzeigen
function doSchool(iFirst)
{ ichBins = true;
  if (iFirst)
  { nodeRads = document.getElementsByName("education_type");
    for (i = 0; i < nodeRads.length; i++)
    { nodeRads[i].addEventListener("click", markTrainees, true);
    }
  }

  var nodeText = getXPath("./div[@class='form_info']/text()[contains(../text(), 'In diesem Gebäude')]", getByID('content'), XPType.FIRST_ORDERED).singleNodeValue;
  if(nodeText)
  { // Teilnehmer zählen
    var evalTRs = getXPath("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']/tbody/tr", getByID('content'), XPType.SNAPSHOT_ORDERED);
    // Textknoten zum Eintragen der Anzahl finden
    var evalText = getXPath("./text()", getByID('content'), XPType.SNAPSHOT_ORDERED);
    for (iTxt = 0; iTxt < evalText.snapshotLength; iTxt++)
    { nodeText = evalText.snapshotItem(iTxt);
      if(/Diese Personen/.test(nodeText.nodeValue))
      { nodeText.nodeValue = nodeText.nodeValue.replace(/Diese Personen/, 'Diese '+evalTRs.snapshotLength+' Personen')
        break;
      }
    }
  }

  var evalTables = getXPath(".//table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']", getByID('content'), XPType.SNAPSHOT_ORDERED);
  for (iTbl = 0; iTbl < evalTables.snapshotLength; iTbl++)
  { var nodeTable = evalTables.snapshotItem(iTbl);
    MachSortierbar(nodeTable);
    if (settingsArr.defaultTabSortSchool.value != "none")
    { SortiereNachSpalte(nodeTable, settingsArr.defaultTabSortSchool.value)
    }

    var columns = {};
    var evalTHs = getXPath("./thead/tr/th", nodeTable, XPType.SNAPSHOT_ORDERED);
    for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
    { nodeTH = evalTHs.snapshotItem(iTH);
      if (nodeTH.innerHTML !== '')
      { columns[nodeTH.innerHTML.trim()] = iTH;
      }
    }

    var evalTRs = getXPath("./tbody/tr", nodeTable, XPType.SNAPSHOT_ORDERED);
    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
    { var evalTDs = getXPath("./td", evalTRs.snapshotItem(iTR), XPType.SNAPSHOT_ORDERED);
      try
      { var nodeTD = evalTDs.snapshotItem(columns['Name']);
        if (/Nicht verfügbar/.test(nodeTD.innerHTML))
        { nodeTD.parentNode.style.display = 'none';
          continue;
        }

        nodeTD = evalTDs.snapshotItem(columns['Motivation']);
        if (settingsArr.useMotivColourCodeSchool.value && nodeTD !== undefined)
        { var val = parseInt(nodeTD.innerHTML)
          for (var motivation in motivationArr)
          { if (val >= motivation)
            { nodeTD.style.color = motivationArr[motivation].tcol;
              break;
            }
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Fähigkeiten']);
        if (settingsArr.useAbilityColourCodeSchool.value && nodeTD !== undefined)
        { var val = parseInt(nodeTD.innerHTML)
          for (var ability in abilityArr)
          { if (val >= ability)
            { nodeTD.style.color = abilityArr[ability].tcol;
              break;
            }
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Ausbildung']);
        if (settingsArr.useTrainingColourCodeSchool.value && nodeTD !== undefined)
        { for each(training in trainingArr)
          { if (training.regex.test(nodeTD.innerHTML))
            { nodeTD.innerHTML = nodeTD.innerHTML.replace(training.regex, '<span style="color: ' + training.tcol[layout] + ';">' + training.regex.source + '</span>');
            }
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Schicht']);
        if (settingsArr.useShiftColourCodeSchool.value && nodeTD !== undefined)
        { nodeTD.style.color = shiftArr[parseInt(nodeTD.innerHTML)].tcol;
        }
      }
      catch(e)
      { mylog('doSchool= ' + e);
      }
    }
  }

  if (!iFirst)
  { markTrainees(); }
  ichBins = false;
}

// Feuerwehrleute für Lehrgänge markieren
function markTrainees()
{ var isChecked = '';
  for (training in trainingArr)
  { if (getByID(trainingArr[training].cboxid).checked)
    { isChecked = training;
    }
  }

  var evalTRs = getXPath(".//table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']/tbody/tr", getByID('content'), XPType.SNAPSHOT_ORDERED);
  for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
  { var nodeTR = evalTRs.snapshotItem(iTR);
    var evalTDs = getXPath("./td", nodeTR, XPType.SNAPSHOT_ORDERED);
    var bgcol = '';
    nodeTR.style.display = '';

    var nodeTD = evalTRs.snapshotItem(iTR);
    if (/Nicht verfügbar/.test(nodeTD.innerHTML))
    { nodeTR.style.display = 'none';
      continue;
    }

    for (training in trainingArr)
    { if (isChecked == training && !trainingArr[training].regex.test(evalTDs.snapshotItem(5).innerHTML))
      { bgcol = trainingArr[training].bcol[layout];
      }
    }

    if (bgcol || !isChecked)
    { if (bgcol) { evalTDs.snapshotItem(0).style.backgroundColor = bgcol; }
      nodeTR.style.display = '';
    }
    else
    { nodeTR.style.display = 'none';
    }
  }
}

// Werkstatt anzeigen
function doGarage()
{ if (settingsArr.limitDamage.value)
  { var nodeTable = document.getElementsByClassName('defaultTable')[1];
    if (nodeTable !== undefined)
    { var hasDisplay = false;
      evalTDs = getXPath('tbody/tr/td[6]', nodeTable, XPType.SNAPSHOT_ORDERED);
      for (i = 0; i < evalTDs.snapshotLength; i++)
      { nodeTD = evalTDs.snapshotItem(i);
        var Zustand = parseInt(nodeTD.innerHTML.removeTags());
        // Prüfung abhängig davon, ob Ausgabe Schaden auf Wert aus Optionen beschränkt werden soll
        if (Zustand >= settingsArr.limitDamageTo.value)
        { nodeTD.parentNode.style.display = 'none';
        }
        else
        { hasDisplay = true;
        }
      }
      if (!hasDisplay)
      { nodeTable.style.display = 'none';
        var nodeDiv = createElement('div',
                                    { 'class' : 'form_info',
                                    });
        nodeDiv.appendChild(createText('aktuell keine Fahrzeuge mit einem Zustand weniger als ' + settingsArr.limitDamageTo.value + '%.'));
        nodeTable.parentNode.appendChild(nodeDiv);
      }
    }
  }
}

// Fahrzeug anzeigen
function doVehicle()
{ if (settingsArr.dispStatusAsFMSDisplayFI.value)
  { var nodeTD = getXPath("//div[@id='content']/table[@class='defaultTable']/tbody/tr[descendant::th/text()='FMS:']/td[1]", document, XPType.FIRST_ORDERED).singleNodeValue;
    if (nodeTD)
    { var nodeFMS = buildFMS(nodeTD, settingsArr.dispFMSDisplayLinesFI.value);
      removeChildren(nodeTD);
      nodeTD.appendChild(nodeFMS);
    }
  }

  var nodeTable = getXPath("//div[@id='content']/table[@class='defaultTable' and  descendant::thead/tr/th/text()='Ausbildung']", document, XPType.FIRST_ORDERED).singleNodeValue;
  if (nodeTable)
  { MachSortierbar(nodeTable);
    if (settingsArr.defaultTabSort.value != "none")
    {
      SortiereNachSpalte(nodeTable, settingsArr.defaultTabSort.value)
    }

    var columns = {};
    var evalTHs = getXPath("./thead/tr/th", nodeTable, XPType.SNAPSHOT_ORDERED);
    for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
    { nodeTH = evalTHs.snapshotItem(iTH);
      if (nodeTH.innerHTML !== '')
      { columns[nodeTH.innerHTML.trim()] = iTH;
      }
    }

    nodeTRs = nodeTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (iTR = 0; iTR < nodeTRs.length; iTR++)
    { nodeTR = nodeTRs[iTR];
      try
      { var nodeTD = undefined;
        nodeTD = nodeTR.getElementsByTagName('td')[columns['Motivation']];
        if (settingsArr.useMotivationColourCode.value && nodeTD !== undefined)
        {
          var val = parseInt(nodeTD.innerHTML)
          for (var motivation in motivationArr)
          { if (val >= motivation)
            { nodeTD.style.color = motivationArr[motivation].tcol;
              break;
            }
          }
        }

        nodeTD = nodeTR.getElementsByTagName('td')[columns['Fähigkeiten']];
        if (settingsArr.useAbilityColourCode.value && nodeTD !== undefined)
        {
          val = parseInt(nodeTD.innerHTML)
          for (var ability in abilityArr)
          { if (val >= ability)
            { nodeTD.style.color = abilityArr[ability].tcol;
              break;
            }
          }
        }

        nodeTD = nodeTR.getElementsByTagName('td')[columns['Ausbildung']];
        if (settingsArr.useTrainingColourCode.value && nodeTD !== undefined)
        {
          for each(training in trainingArr)
          { if (training.regex.test(nodeTD.innerHTML))
            { nodeTD.innerHTML = nodeTD.innerHTML.replace(training.regex, '<span style="color: ' + training.tcol[layout] + ';">' + training.regex.source + '</span>');
            }
          }
        }
      }
      catch(e)
      { mylog(e);
      }
    }
  }
}

// Fahrzeug reparieren
function doVehicleRepair()
{
  // Spalte für Icons verkleinern oder ausblenden
  switch (settingsArr.imgBuildingList.value)
  {
    case 'normal' : // nichts machen
                    break;
    case 'small'  : document.getElementsByTagName("form")[0].getElementsByClassName('defaultTable')[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[1].setAttribute('style','width:35px; !important;');
                    break;
    case 'none'   : document.getElementsByTagName("form")[0].getElementsByClassName('defaultTable')[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[1].setAttribute('style','width:0; !important;');
                    break;
  }

  TRs = document.getElementsByTagName("form")[0].getElementsByClassName('defaultTable')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (i=0;i<TRs.length;i++)
  { var TR=TRs[i];
    // Icons verkleinern oder ausblenden
    switch (settingsArr.imgBuildingList.value)
    {
      case 'normal' : // nichts machen
                      break;
      case 'small'  : var nodeImg = TR.getElementsByTagName("td")[1].getElementsByTagName("img")[0];
                      nodeImg.setAttribute('src', nodeImg.getAttribute('src').replace(/\/map\//, '/map_25/'));
                      break;
      case 'none'   : var nodeTD = TR.getElementsByTagName("td")[1]
                      removeChildren(nodeTD);
                      break;
    }
  }
}

// Fahrzeug wurde zur Reparatur gesendet
function doVehicleRepairSent()
{ if (settingsArr.dispStatusAsFMSDisplayFI.value)
  { var nodeTD = getXPath("//div[@id='content']/table[@class='defaultTable']/tbody/tr[descendant::th/text()='FMS:']/td[1]", document, XPType.FIRST_ORDERED).singleNodeValue;
    if (nodeTD)
    { var nodeFMS = buildFMS(nodeTD, settingsArr.dispFMSDisplayLinesFI.value);
      removeChildren(nodeTD);
      nodeTD.appendChild(nodeFMS);
    }
  }
}

// Toplisten
function doToplist()
{ if (settingsArr.highlightUser.value && user)
  { var evalTDs = getXPath("./table[@class='defaultTable']/tbody/tr/td[2]", getByID('content'), XPType.SNAPSHOT_ORDERED);
    for (var i = 0; i < evalTDs.snapshotLength; i++)
    { var nodeTD = evalTDs.snapshotItem(i);
      if (nodeTD.innerHTML.match(user))
      {
        nodeTD.parentNode.style.backgroundColor = 'gray';
      }
    }
  }
}
// Log
function doLoglist()
{ if (settingsArr.summarizeLog.value)
  var TRs = document.getElementById("content").getElementsByTagName("tbody")[0].getElementsByTagName("tr"); {
		var AnzNotruf  = 0, AnzFehl     = 0, AnzErledigt = 0, Anzfaengtan = 0, Anzhoertauf = 0; 
		for (i=0;i<TRs.length;i++) { 
					var TR = TRs[i];
					var TD = TR.getElementsByTagName("td")[0];
					var H = TD.innerHTML;
					var Hstr = new String;
					Hstr = H;
					if (Hstr.match("Fehleinsatz:") != null ) { 
						AnzFehl++;
						H = "<font color='yellow'>"+H+"</font>";
					} 
					else if (Hstr.match("Notruf:") != null ) { 
						AnzNotruf++;
						H = "<font color='red'>"+H+"</font>";
					}
					else if (Hstr.match("Einsatz abgearbeitet:") != null ) { 
						AnzErledigt++;
						H = "<font color='green'>"+H+"</font>";
					}
                                        else if (Hstr.match("fängt bei der Wache") != null ) { 
						Anzfaengtan++;
						H = "<font color='lime'>"+H+"</font>";
					}
                                        else if (Hstr.match("ist bei der Wache") != null ) { 
						Anzhoertauf++;
						H = "<font color='teal'>"+H+"</font>";
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
                ret += "<tr><th>Personal fängt neu an</th><td> <font color='lime'><b>" + Anzfaengtan + "</b></font></td></tr>\n";
                ret += "<tr><th>Personal hört auf</th><td> <font color='teal'><b>" + Anzhoertauf + "</b></font></td></tr>\n";
	  ret += "<tr><th>Fehleinsätze</th><td><font color='yellow'><b>" + AnzFehl + "</b></font></td></tr>\n";
	  ret += "<tr><th>Quote Fehleinsätze</th><td><b>" + Fehlquote.toFixed(2) + "%</b></td></tr>\n";
	  ret += "</table><br>\n";
	  var main, newElement;
	  main = document.getElementsByTagName("h1")[0];
	  newElement = document.createElement('p');
	  main.parentNode.insertBefore(newElement, main.nextSibling);
	  newElement.innerHTML = ret;
}

// Funkprotokoll
function doRadioTransscript()
{ var nodeTable = getXPath("./table[@class='defaultTable']", getByID('content'), XPType.FIRST_ORDERED).singleNodeValue;
  if (nodeTable)
  { markDemand(nodeTable); }
}

// markiere Nachforderungen im Funkprotokoll
function markDemand(nodeTable)
{ const irrelevRueckm = /Alarmiert|Auf dem Weg zum Einsatz|Ankunft am Einsatzort|Zurück alarmiert|Frei [(]Dienstfahrt[)]|Nicht einsatzbereit/;
  var markedVeh = new Array;

  var evalTRs = getXPath("./tbody/tr", nodeTable, XPType.SNAPSHOT_ORDERED);
  for (var i = 1; i < evalTRs.snapshotLength; i++)// erste Zeile überspringen
  { var nodeTR = evalTRs.snapshotItem(i);

    var evalTDs = getXPath("./td", nodeTR, XPType.SNAPSHOT_ORDERED);
    if (evalTDs.snapshotLength > 1)
    { //rescue: auch Nachforderungen der Leitstelle gelten, somit kann eine Nachforderung die "nach hinten" verschoben wurde und nicht mehr greift wieder aktuell gemacht werden
	  // Rückmeldungen von Leitstellen ignorieren
      //if (evalTDs.snapshotItem(1).innerHTML.indexOf('Leitstelle: ') != -1)
      //{ continue;
      //}
      var RM = evalTDs.snapshotItem(2).innerHTML;
      if (RM != undefined)
      {
        // irrelevante Rückmeldungen ignorieren
        if (irrelevRueckm.test(RM))
        { continue;
        }
        NfFhz = getNachforderungFahrzeug(RM);
        if (NfFhz != "")
        { if (settingsArr.highlightVehicleRequest.value)
          { evalTDs.snapshotItem(2).innerHTML = evalTDs.snapshotItem(2).innerHTML.replace(NachforderungenArr[NfFhz].regex, '<span style="color: ' + settingsArr.highlightVehReqColour.value + ';">$&</span>');
          }
          markedVeh.push(NfFhz);
        }
      }
    }
  }
  return markedVeh;
}

// Fahrzeug bearbeiten
function bearbeiteFahrzeugseite()
{
  var nodeCaption = getByID("caption");
  var nodeTD = createElement("td");
  nodeCaption.parentNode.parentNode.insertBefore(nodeTD,nodeCaption.parentNode.nextSibling);
  var nodeScript = createElement('script',
                                 {'type': 'text/javascript'});
  // multline-Anweisung (schießendes '\')
  nodeScript.innerHTML = "function ToggleStatus6()\n\
{\n\
  var I=document.getElementById('caption');\n\
  var FN=I.value;\n\
  if (FN.substr(0,4).toUpperCase()=='XXX ')\n\
  { I.value = FN.substr(4,FN.length-4); }\n\
  else { I.value = 'XXX ' + FN; }\n\
}";
  nodeTD.appendChild(nodeScript);
  var nodeA = createElement('a',
                            {'href': 'javascript:ToggleStatus6();'});
  nodeTD.appendChild(nodeA);
  nodeA.appendChild(createText('Fahrzeug in/außer Dienst stellen'));
}

//
function bearbeiteFahrzeugkauf()
{ var FRM = document.getElementsByTagName("form")[0];
  if (!FRM) return;
  var TB = FRM.getElementsByTagName("table")[0];
  if (!TB) return;
  var TR = TB.getElementsByTagName("tr")[2];
  if (!TR) return;
  //rescue: die Tabelle beim Fahrzeugverschieben ist leicht unterschiedlich zu der beim Fahrzeugkauf
  if (docPath.search(/\/feuerwehrfahrzeuge\/\d+\/verschieben$/) != -1 ) {
  var TD = TR.getElementsByTagName("td")[0];
  } else {
  var TD = TR.getElementsByTagName("td")[1]; 
  }
  if (!TD) return;

  pars = TD.getElementsByTagName("p");
  for (i = 0; i < pars.length; i++)
  { Par = pars[i];
    span = Par.getElementsByTagName("span")[0];
    if (!span) continue;
    if (span.innerHTML.match(/.*Diese Feuerwache kann keine Fahrzeuge mehr aufnehmen.*|.*Zuwenig bzw. keine Stellplätze für Rettungswagen.*/))
    { Par.style.display = "none"; }
  }

  var nodeH1 = getByID('content').getElementsByTagName('h1')[0];
  var nodeA = createElement('a',
                            {'href': getWikiLinkFhz(nodeH1.innerHTML),
                             'target': '_blank'});
  nodeA.appendChild(createText('Wiki'));
  var nodeSup = createElement('sup',
                              {'class' : 'WikiLink',
                               'title' : getWikiLinkFhz(nodeH1.innerHTML)});
  nodeSup.appendChild(nodeA);
  addEntityText(nodeH1, '&nbsp;');
  nodeH1.insertBefore(nodeSup, nodeH1.firstChild);
}

function bearbeiteWacheFahrzeugliste()
{
  var nodeContent = getByID("content");
  var nodeH2s = nodeContent.getElementsByTagName("h2");

  for (i = 0; i < nodeH2s.length; i++)
  { nodeH2 = nodeH2s[i];
    var nodeA = nodeH2.getElementsByTagName("a")[0];
    if (nodeA)
    { // URL zur Feuerwache bekommen
      var FWLink = nodeA.href;
      addEntityText(nodeH2, '&nbsp;');
      nodeA = createElement('a',
                            {'href' : FWLink + '/feuerwehrleute',
                             'class': 'fontSmall',
                             'title': 'Personal'});
      nodeH2.appendChild(nodeA);
      nodeA.appendChild(createText('(Personal)'));
    }
  }

  // Status als FMS Display anzeigen
  if (settingsArr.dispStatusAsFMSDisplayFL.value)
  { nodeTables = document.getElementsByClassName('defaultTable');
    for (i = 0; i < nodeTables.length; i++)
    { nodeTable = nodeTables[i];
      var column = -1;
      var col = -1;

      evalTHs = getXPath('./thead/tr/th', nodeTable, XPType.SNAPSHOT_ORDERED);
      for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
      { col++;
        if (evalTHs.snapshotItem(iTH).innerHTML == 'FMS')
        { column = col;
          break;
        }
      }
      if (column != -1)
      { evalTRs = getXPath('./tbody/tr', nodeTable, XPType.SNAPSHOT_ORDERED);
        for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
        { var nodeTD = evalTRs.snapshotItem(iTR).getElementsByTagName('td')[column];
          nodeFMS = buildFMS(nodeTD, settingsArr.dispFMSDisplayLinesFL.value);
          removeChildren(nodeTD);
          nodeTD.appendChild(nodeFMS);
        }
      }
    }
  }
}

function bearbeiteGebaeudeliste()
{
  var divCont = getXPath("//div[@id='content']", document, XPType.FIRST_ORDERED).singleNodeValue;
  var evalTable = getXPath("./table[@class='defaultTable']", divCont, XPType.SNAPSHOT_ORDERED);
  if (evalTable.snapshotLength == 0) { return; }
  var nodeTable = evalTable.snapshotItem(0);
  // Spalte für Icons verkleinern oder ausblenden
  switch (settingsArr.imgBuildingList.value)
  {
    case 'normal' : // nichts machen
                    break;
    case 'small'  : getXPath("./thead/tr/th[1]", nodeTable, XPType.FIRST_ORDERED).singleNodeValue.setAttribute('style','width:35px; !important;');
                    break;
    case 'none'   : getXPath("./thead/tr/th[1]", nodeTable, XPType.FIRST_ORDERED).singleNodeValue.setAttribute('style','width:0; !important;');
                    break;
  }

  var evalTRs = getXPath("./tbody/tr", nodeTable, XPType.SNAPSHOT_ORDERED);
  for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
  { var nodeTR = evalTRs.snapshotItem(iTR);
    // Icons verkleinern oder ausblenden
    switch (settingsArr.imgBuildingList.value)
    {
      case 'normal' : // nichts machen
                      break;
      case 'small'  : var nodeImg = getXPath("./td[1]/img[1]", nodeTR, XPType.FIRST_ORDERED).singleNodeValue;
                      nodeImg.setAttribute('src', nodeImg.getAttribute('src').replace(/\/map\//, '/map_25/'));
                      break;
      case 'none'   : removeChildren(getXPath("./td[1]", nodeTR, XPType.FIRST_ORDERED).singleNodeValue);
                      break;
    }
  }

  //Gebäude zählen
  var buildingsArr = {};
  evalTDs = getXPath("./tbody/tr/td[4]", nodeTable, XPType.SNAPSHOT_ORDERED);
  for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
  { var innerHTML = evalTDs.snapshotItem(iTD).innerHTML.trim();
    if (!buildingsArr[innerHTML]) { buildingsArr[innerHTML] = 0; }
    buildingsArr[innerHTML]++;
  }

  var textArr = [];
  var text = '';
  for (building in buildingsArr)
  { textArr.push(buildingsArr[building] + ' mal ' + building);
  }
  if (textArr.length > 1)
  { text = textArr.pop();
    text = textArr.join(', ') + ' und ' + text;
  }
  else
  { text = textArr.toString()
  }
  var nodeDiv = createElement('div');
  nodeDiv.appendChild(createText('Du hast ' + text));
  divCont.insertBefore(nodeDiv, nodeTable);
}

function bearbeiteFeuerwachenliste()
{ var nodeContent = getByID("content");
  var TRs = nodeContent.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  // Anzahl Wachen und Stufen ermittlen
  var levelsArr = new Array;
  var anzFW = 0;
  var anzBF = 0;
  var anzPers = 0;
  var anzFhz = 0;
  var anzMaxFhz = 0;
  var anzRTW = 0;
  var maxLvl = 0;
  for (i=0;i<TRs.length;i++)
  { var TDs = TRs[i].getElementsByTagName("td");
    anzFW++;
    // Fahrzeuge
    anzFhz += parseInt(TDs[3].getElementsByTagName("a")[0].innerHTML);
    anzMaxFhz += parseInt(TDs[3].innerHTML.split(' / ')[1]);
    // RTW
    anzRTW += parseInt(TDs[4].innerHTML);
    anzMaxFhz += parseInt(TDs[4].innerHTML.split(' / ')[1]);
    // Feuerwehrleute
    anzPers += parseInt(TDs[5].getElementsByTagName("a")[0].innerHTML);
    // Stufe der Feuerwache
    level = parseInt(TDs[6].innerHTML);
    if (maxLvl < level)
    { maxLvl = level;
    }
    if (levelsArr[level] == undefined)
    { levelsArr[level] = 1;
    }
    else
    { levelsArr[level]++;
    }
  }
  anzFhz += anzRTW; //RTW auch zur Summe zählen

  // Anzahl Berufsfeuerwehren bestimmen
  for (lvl = 4; lvl <= maxLvl; lvl++)
  { anzBF += ((isNaN(levelsArr[lvl]))?0:levelsArr[lvl]);
  }
  nodeDiv = createElement('div');
  nodeDiv.appendChild(createText(anzFW + ' Feuerwache' + ((anzFW > 1)?'n':'') + ((anzBF > 0)?', davon ' + anzBF + ' Berufsfeuerwehr' + ((anzBF > 1)?'en':'') + ',':'')));
  nodeDiv.appendChild(createText(' mit ' + anzFhz + ((anzFhz!=anzMaxFhz)?'/' + anzMaxFhz :'') + ' Fahrzeug' + ((anzFhz > 1)?'en':'') + ((anzRTW > 0)?', davon ' + anzRTW + ' Rettungswagen,':'')));
  nodeDiv.appendChild(createText(' und ' + anzPers + ' Feuerwehrleuten'));
  nodeContent.insertBefore(nodeDiv, nodeContent.getElementsByTagName('table')[0]);

  // Spalte für Icons verkleinern oder ausblenden
  switch (settingsArr.imgStationList.value)
  {
    case 'normal' : // nichts machen
                    break;
    case 'small'  : document.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].setAttribute('style','width:35px; !important;');
                    break;
    case 'none'   : document.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].setAttribute('style','width:0; !important;');
                    break;
  }

  for (i=0;i<TRs.length;i++)
  { var TR=TRs[i];
    // Icons verkleinern oder ausblenden
    switch (settingsArr.imgStationList.value)
    {
      case 'normal' : // nichts machen
                      break;
      case 'small'  : var nodeImg = TR.getElementsByTagName("td")[0].getElementsByTagName("img")[0];
                      nodeImg.setAttribute('src', nodeImg.getAttribute('src').replace(/\/map\//, '/map_25/'));
                      break;
      case 'none'   : var nodeTD = TR.getElementsByTagName("td")[0]
                      removeChildren(nodeTD);
                      break;
    }

    // A-Element zur Feuerwache besorgen
    var TD = TR.getElementsByTagName("td")[1];
    var L = TD.getElementsByTagName("a")[0];

    if (!settingsArr.useOriginalVhcColorScheme.value)
    { // Spalte Fahrzeuge
      TD = TR.getElementsByTagName("td")[3];
      var H1 = TD.getElementsByTagName("a")[0].innerHTML;
      var H2 = TD.innerHTML.split(" / ")[1];
      var nodeA = TD.getElementsByTagName("a")[0];
      if (parseInt(H1) != parseInt(H2))
      { nodeA.setAttribute('style', 'color: yellow;');
      }
      removeChildren(nodeA);
      nodeA.appendChild(createText(H1 + " / " + H2));
      removeChildren(TD);
      TD.appendChild(nodeA);

      // Spalte Rettungswagen
      TD = TR.getElementsByTagName("td")[4];
      var H = TD.innerHTML;
      H2 = H.split("/");
      if (parseInt(H2[0]) != parseInt(H2[1]))
      {
        var nodeSpan = createElement('span',
                                     {'style': 'color: yellow;'});
        nodeSpan.appendChild(createText(H));
        removeChildren(TD);
        TD.appendChild(nodeSpan);
      }
    }

    // Spalte Feuerwehrleute (um an Anzahl zu kommen)
    TD = TR.getElementsByTagName("td")[5];
    var A = TD.getElementsByTagName("a")[0];
    var anz = parseInt(A.innerHTML);

    // Spalte Stufe
    TD = TR.getElementsByTagName("td")[6];
    TD.setAttribute('style', 'text-align: left;');
    // Ausbau BF erst ab 10 Feuerwachen
    if ((anzFW < 10)?(parseInt(TD.innerHTML) < 3):(parseInt(TD.innerHTML) < 5))
    {
      addEntityText(TD, '&nbsp;');
      var nodeA = createElement('a',
                                {'href': L + '/ausbauen'});
      addEntityText(nodeA, '&nbsp;+&nbsp;');
      TD.appendChild(nodeA);
 
 }
    if (settingsArr.highlightManning.value)
    { if (parseInt(TD.innerHTML) > 3) //nur Berufsfeuerwehren
      { for (var man in manningArr)
        { if (anz >= man)
          { A.style.color = manningArr[man].tcol;
            break;
          }
        }
      }
    }
  }
}

function bearbeiteLeitstelle()
{
  var nodeContent = getByID("content");
  var nodeH2s = nodeContent.getElementsByTagName("h2");

  for (i = 0; i < nodeH2s.length; i++)
  { var nodeH2 = nodeH2s[i];
    var nodeA = nodeH2.getElementsByTagName("a")[0];
    if (nodeA)
    {
      var FWLink = nodeA.href;
      addEntityText(nodeH2, '&nbsp;');
      nodeSpan = createElement('span',
                               {'class': 'fontSmall'});
      nodeH2.appendChild(nodeSpan);

      nodeSpan.appendChild(createElement('br'));
      nodeSpan.appendChild(createText('('));

      nodeA = createElement('a',
                            {'href' : FWLink + "/feuerwehrleute",
                             'title': 'Personal'});
      nodeSpan.appendChild(nodeA);
      nodeA.appendChild(createText('Pers'));

      nodeSpan.appendChild(createText(' / '));

      nodeA = createElement('a',
                            {'href' : FWLink + "/feuerwehrautos",
                             'title': 'Fahrzeuge'});
      nodeSpan.appendChild(nodeA);
      nodeA.appendChild(createText('Fhz'));

      nodeSpan.appendChild(createText(')'));
    }
  }
}

function bearbeitePersonaltabellen()
{
  var nodeContent = getByID("content");
  var TBs = nodeContent.getElementsByClassName("defaultTable");
  var H2s = nodeContent.getElementsByTagName("h2");

  for (var i=0; i<TBs.length; i++)
  { var TB=TBs[i];
    var nodeDiv = BearbeitePersonaltabelle(TB);

    if (nodeDiv)
    { TB.parentNode.insertBefore(nodeDiv,TB);
    }

    var nodeH2 = H2s[i];
    var nodeA = nodeH2.getElementsByTagName("a")[0];
    var FWLink = nodeA.href;
    addEntityText(nodeH2, '&nbsp;');
    nodeA = createElement('a',
                          {'href' : FWLink + "/feuerwehrautos",
                           'class': 'fontSmall'});
    nodeH2.appendChild(nodeA);
    nodeA.appendChild(createText('(Fahrzeuge)'));
 }
}

function bearbeiteFahrzeugliste()
{
  function setFMS(nodeTB)
  {
  // Status als FMS Display anzeigen
    var column = -1;
    var evalTHs  = getXPath("./thead/tr/th", nodeTB, XPType.SNAPSHOT_ORDERED);
    for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
    {
      if (evalTHs.snapshotItem(iTH).innerHTML == 'FMS')
      { column = iTH;
        break;
      }
    }

    if (column != -1) //
    {
      var evalTDs  = getXPath("./tbody/tr/td["+ ++column +"]", nodeTB, XPType.SNAPSHOT_ORDERED);
      for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
      {
        var nodeTD = evalTDs.snapshotItem(iTD);
        nodeFMS = buildFMS(nodeTD, settingsArr.dispFMSDisplayLinesFL.value);
        removeChildren(nodeTD);
        nodeTD.appendChild(nodeFMS);
      }
    }
  }

  var nodeContent = getByID("content");
  var ArrTR=new Array;

  var evalH2s = getXPath("./h2[contains(text(), 'Feuerwache:')]", nodeContent, XPType.SNAPSHOT_ORDERED);
  var cntStations = evalH2s.snapshotLength;
  for (iH2 = 0; iH2 < evalH2s.snapshotLength; iH2++)
  {
    var nodeH2 = evalH2s.snapshotItem(iH2);
    addEntityText(nodeH2, '&nbsp;');
    var nodeA = createElement('a',
    //Link ohne Domain holen;
                              {'href' : RegExpPath.exec(getXPath("./a", nodeH2, XPType.FIRST_ORDERED).singleNodeValue.href)[1] + '/feuerwehrleute',
                               'class': 'fontSmall',
                               'title': 'Personal'});
    nodeH2.appendChild(nodeA);
    nodeA.appendChild(createText('(Personal)'));
  }

  var H1 = document.getElementsByTagName("h1")[0];
  if (settingsArr.showSummaryVehicleList.value)
  { var H2 = createElement("h2");
    H2.appendChild(createText("Übersicht"));
    nodeContent.insertBefore(H2, H1.nextSibling);
  }

  var gefArr = new Array; //zweistufiges Array je Fahrzeug und Status
  var FZNamen = new Array;
  var gefFZ = new Array;
  var kmSumme = new Array;
  var AnzArr = new Array; //Array mit Summen je Status
  var ZusSumArr = new Array; //Array mit Zustandswerten je Fahrzeugart
  var gesamtZustand = 0;
  var gesamtkm = 0;
  var ArrTopKM = new Array;
  var Anz = 0;
  var AnzDispStatus = 0;
  var dispStat7 = false;

  if (settingsArr.showSummaryVehicleList.value)
  { // Summenarray initialisieren
    for (var FMSstatus in FMSStatusArr)
    { if (!FMSStatusArr[FMSstatus].dispInList) { continue; }
      AnzArr[FMSstatus] = 0;
      // Anzeige Status 7 nur, wenn auch RTW vorhanden
      if (settingsArr.showStatus7OnlyIfExists.value)
      { if (FMSStatusArr[FMSstatus].dispAlways)
        { AnzDispStatus++;
        }
      }
      else
      { AnzDispStatus++;
      }
    }
  }

  var evalTBs  = getXPath("//table[@class='defaultTable' and descendant::th/text()='Zustand']", document, XPType.SNAPSHOT_ORDERED);
  for (var iTB = 0; iTB < evalTBs.snapshotLength; iTB++)
  {
    var evalTRs = getXPath("./tbody/tr", evalTBs.snapshotItem(iTB), XPType.SNAPSHOT_ORDERED);

    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
    {
      var nodeTR = evalTRs.snapshotItem(iTR);
      var evalTDs = getXPath("./td", nodeTR, XPType.SNAPSHOT_ORDERED);
      var FZName = evalTDs.snapshotItem(2).innerHTML;

      if (settingsArr.showSummaryVehicleList.value)
      { if (gefFZ[FZName] == undefined)
        { FZNamen.push(FZName);
          gefFZ[FZName] = 1;

          gefArr[FZName]= new Array;
          for (var FMSstatus in FMSStatusArr)
          { gefArr[FZName][FMSstatus] = 0;
          }
          kmSumme[FZName] = 0;
          ZusSumArr[FZName] = 0;
        }
        else
        { gefFZ[FZName]++;
        }

        var Funkname = evalTDs.snapshotItem(1).getElementsByTagName("a")[0].innerHTML;

        var FZStat = evalTDs.snapshotItem(3).innerHTML.trim();
        if (FZStat=="Einsatzbereit auf Wache" && Funkname.substr(0,3).toUpperCase()=="XXX")
        { FZStat = "Außer Dienst";
        }
        var FMSstatus = '';
        switch (FZStat)
        { case "Frei (Dienstfahrt)":      FMSstatus = '1';
                                          break;
          case "Einsatzbereit auf Wache": FMSstatus = '2';
                                          break;
          case "Auf dem Weg zum Einsatz": FMSstatus = '3';
                                          break;
          case "Ankunft am Einsatzort":   FMSstatus = '4';
                                          break;
          case "Nicht einsatzbereit":
          case "Außer Dienst":            FMSstatus = '6';  // zählt Beides als nicht einsatzbereit
                                          break;
          case "Patient aufgenommen":     FMSstatus = '7';
                                          break;
        }
        gefArr[FZName][FMSstatus]++;
        AnzArr[FMSstatus]++;
        Anz++;
      }

      var FZLink = evalTDs.snapshotItem(1).innerHTML;
      var kmStand = evalTDs.snapshotItem(5).innerHTML;
      var IntkmStand = parseInt(kmStand.substr(0,kmStand.length-2).replace(".",""))
      ArrTopKM.push(new Array(IntkmStand,FZLink));
      kmSumme[FZName] += IntkmStand;
      gesamtkm += IntkmStand;

      //Zustand prüfen und ggf. Link zur Werkstatt einbauen
      var TD = evalTDs.snapshotItem(6);
      var FZID = evalTDs.snapshotItem(1).getElementsByTagName("a")[0].href;
      FZID = FZID.replace("http://www.feuerwache.net/feuerwehrfahrzeuge/","");
      var Zustand = parseInt(TD.innerHTML.removeTags());
      // Prüfung abhängig davon, ob Ausgabe Schaden auf Wert aus Optionen beschränkt werden soll
      if ((settingsArr.limitDamage.value) ? (Zustand < settingsArr.limitDamageTo.value) : (Zustand < 100) )
      { ArrTR.push(nodeTR.cloneNode(true));
      }
      ZusSumArr[FZName] += Zustand;
      gesamtZustand += Zustand;
    }
  }

  if (settingsArr.showSummaryVehicleList.value)
  { // RTW's vorhanden, dann auch Status 7 anzeigen
    if (gefFZ['RTW'] > 0 || !settingsArr.showStatus7OnlyIfExists.value)
    { if (gefFZ['RTW'] > 0 && settingsArr.showStatus7OnlyIfExists.value)
      { AnzDispStatus++;
      }
      dispStat7 = true;
    }

    // style sheet Informationen setzen (als Multiline-Zeichenkette)
    GM_addStyle('\
    table.ereglamTable .txtLeft\
    {text-align:left; }\
    table.ereglamTable .txtCenter\
    { text-align:center; }\
    table.ereglamTable .txtRight\
    {text-align:right; }\
    .null\
    {color:#666666;}\
    !important');
    // Tabelle mit der Fahrzeugübersicht
    var nodeTable = createElement("table",
                                  {'id': "Übersichtstabelle"});
    nodeTable.className="ereglamTable";

    // Tabellenkopf
    var nodeTBody = createElement('thead');
    nodeTable.appendChild(nodeTBody);

    // erste Zeile der Überschriften
    var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);

    var nodeTD = createElement('th',
                               {'class': 'txtLeft',
                                'rowspan': '2'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('Fahrzeugtyp'));

    nodeTD = createElement('th',
                           {'rowspan': '2'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('Anz.'));

    nodeTD = createElement('th',
  // Spaltenspanne setzen, ob Status 7 angezeigt werden
                           {'colspan': AnzDispStatus});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('FMS-Status'));

    if (settingsArr.showTotalkm.value)
    {
      nodeTD = createElement('th',
                             {'rowspan': '2'});
      addEntityText(nodeTD, '&Sigma; km');
      nodeTR.appendChild(nodeTD);
    }

    if (settingsArr.showAvgkm.value)
    {
      nodeTD = createElement('th',
                             {'rowspan': '2'});
      addEntityText(nodeTD, '&Oslash;-km');
      nodeTR.appendChild(nodeTD);
    }

    if (settingsArr.showAvgDamage.value)
    {
      nodeTD = createElement('th',
                             {'rowspan': '2'});
      addEntityText(nodeTD, '&Oslash;-Zust.');
      nodeTR.appendChild(nodeTD);
    }

    nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);

    // zweite Zeile der Überschriften mit den Status
    var TDstyle='';
    for (var FMSstatus in FMSStatusArr)
    { if (!FMSStatusArr[FMSstatus].dispInList) { continue; }
      // Status 7 nur anzeigen, wenn Fahrzeuge vorhanden
      if (!FMSStatusArr[FMSstatus].dispAlways && !dispStat7)
      {
        continue;
      }

      TDstyle = 'background-color: ' + FMSStatusArr[FMSstatus].bcol;
      if (FMSStatusArr[FMSstatus].tcol != "")
      {
        TDstyle += '; color: ' + FMSStatusArr[FMSstatus].tcol;
      }
      nodeTD = createElement('th',
                             {'style': TDstyle + '; width:60px;'});
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText(FMSstatus));
      if (settingsArr.showStatusLangtext.value)
      {
        nodeTD.appendChild(createElement('br'));
        var nodeDiv = createElement('div',
                                    {'class': 'fontSmall'});
        nodeDiv.appendChild(createText(FMSStatusArr[FMSstatus].text));
        nodeTD.appendChild(nodeDiv);
      }
    }

    // Tabellenkörper
    nodeTBody = createElement('tbody');
    nodeTable.appendChild(nodeTBody);

    // Sortierung der Fahrzeuge vorbereiten
    if (settingsArr.sortVehiclesByClass.value)
    {
      var fSeqArr = new Array;
      // Liste analog Liste freier Fahrzeuge aufbauen
      for (var fhz in FahrzeugeArr)
      {
        if (fSeqArr[FahrzeugeArr[fhz].vehGrp] == undefined)
        {
          fSeqArr[[FahrzeugeArr[fhz].vehGrp]] = FahrzeugeArr[fhz].vehGrp;
        }
      }

      var FZNamenSort = new Array;
      for (var fSeq in fSeqArr)
      {
        for (var fhz in FahrzeugeArr)
        {
          if (FahrzeugeArr[fhz].vehGrp == fSeq)
          {
            for each (FZName in FZNamen)
            {
              if (FZName == fhz)
              {
                FZNamenSort.push(fhz);
              }
            }
          }
        }
      }
      FZNamen = FZNamenSort;
    }
    else
    {
      FZNamen = FZNamen.sort();
    }

    for each (FZName in FZNamen)
    {
      nodeTR = createElement('tr');
      nodeTBody.appendChild(nodeTR);

      nodeTD = createElement('th',
                             {'class': 'txtLeft'});
      nodeTR.appendChild(nodeTD);
      var nodeA = createElement('a',
                                {'href'  : getWikiLinkFhz(FZName),
                                 'target': '_blank'});
      nodeA.appendChild(createText(FZName));
      nodeTD.appendChild(nodeA);

      nodeTD = createElement('td');
      nodeTR.appendChild(nodeTD);
      if (gefFZ[FZName] == 0) // Anzahl = 0, dann auch Textfarbe ändern
      { nodeTD.setAttribute('class', 'txtCenter null');
      }
      else
      { nodeTD.setAttribute('class', 'txtCenter');
      }
      nodeTD.appendChild(createText(gefFZ[FZName]));

      // Spalte pro Status
      for (var FMSstatus in FMSStatusArr)
      { if (!FMSStatusArr[FMSstatus].dispInList) { continue; }
      // Status 7 nur anzeigen, wenn Fahrzeuge vorhanden
        if (!FMSStatusArr[FMSstatus].dispAlways && !dispStat7)
        {
          continue;
        }

        nodeTD = createElement('td');
        nodeTR.appendChild(nodeTD);
        if (gefArr[FZName][FMSstatus] == 0)
        { nodeTD.setAttribute('class', 'txtCenter null');
        }
        else
        { nodeTD.setAttribute('class', 'txtCenter');
        }
        nodeTD.appendChild(createText(gefArr[FZName][FMSstatus]));
      }

      if (settingsArr.showTotalkm.value)
      {
        nodeTD = createElement('td',
                               {'class': 'txtRight'});
        nodeTR.appendChild(nodeTD);
        nodeTD.appendChild(createText(makeDots(kmSumme[FZName])));
      }

      if (settingsArr.showAvgkm.value)
      {
        nodeTD = createElement('td',
                               {'class': 'txtRight'});
        nodeTR.appendChild(nodeTD);
        nodeTD.appendChild(createText(makeDots(parseInt(kmSumme[FZName] / gefFZ[FZName]))));
      }

      if (settingsArr.showAvgDamage.value)
      {
        nodeTD = createElement('td',
                               {'class': 'txtRight'});
        nodeTR.appendChild(nodeTD);
        var txtZusSum = (parseInt(10 * ZusSumArr[FZName] / gefFZ[FZName]) / 10).toString().replace('.', ',');
        if (txtZusSum.indexOf(',') == -1)
        { txtZusSum += ',0';}
        nodeTD.appendChild(createText(txtZusSum + ' %'));
      }
    }

    // Summenzeile
    nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);

    nodeTD = createElement('th',
                           {'class': 'txtLeft'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('SUMME'));

    nodeTD = createElement('th',
                           {'class': 'txtCenter'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(Anz));
    // Spalte pro Status
    for (var FMSstatus in FMSStatusArr)
    { if (!FMSStatusArr[FMSstatus].dispInList) { continue; }
      // Status 7 nur anzeigen, wenn Fahrzeuge vorhanden
      if (!FMSStatusArr[FMSstatus].dispAlways && !dispStat7)
      {
        continue;
      }

      nodeTD = createElement('th',
                             {'class': 'txtCenter'});
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText(AnzArr[FMSstatus]));
    }

    if (settingsArr.showTotalkm.value)
    {
      nodeTD = createElement('th',
                             {'class': 'txtRight'});
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText(makeDots(gesamtkm)));
    }

    if (settingsArr.showAvgkm.value)
    {
      nodeTD = createElement('th',
                             {'class': 'txtRight'});
      nodeTD = createElement('th');
      nodeTR.appendChild(nodeTD);
      nodeTD.setAttribute('class', 'txtRight');
      nodeTD.appendChild(createText(makeDots(parseInt(gesamtkm / Anz))));
    }

    if (settingsArr.showAvgDamage.value)
    {
      nodeTD = createElement('th',
                             {'class': 'txtRight'});
      nodeTR.appendChild(nodeTD);
      var txtZusSum = (parseInt(10 * gesamtZustand / Anz) / 10).toString().replace('.', ',');
      if (txtZusSum.indexOf(',') == -1)
      { txtZusSum += ',0';}
      nodeTD.appendChild(createText(txtZusSum + ' %'));
    }

    nodeContent.insertBefore(nodeTable,H2.nextSibling);
  }

  if (settingsArr.listHighLowKm.value)
  {
    // Auflistung Fahrzeuge mit höchster Laufleistung
    nodeTable = getXPath("./table[contains(./tbody/tr/td, 'Anzahl Fahrzeuge:')]", getByID('content'), XPType.FIRST_ORDERED).singleNodeValue;
    nodeTBody = nodeTable.getElementsByTagName('tbody')[0];
    nodeTR = createElement("tr", {'class': 'row0'});
    nodeTBody.appendChild(nodeTR);
    nodeTD = createElement('td');
    nodeTD.appendChild(createText('Fahrzeuge mit der höchsten Laufleistung:'));
    nodeTR.appendChild(nodeTD);
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);

    ArrTopKM.sort(function s(a,b){return b[0]-a[0];});
    for (var i=0;i<((ArrTopKM.length < 5)?ArrTopKM.length:5);i++) //Anzahl Elemente in Liste beachten
    { nodeTD.innerHTML += ArrTopKM[i][1] + " (" + makeDots(ArrTopKM[i][0]) + " km)";
      nodeTD.appendChild(createElement('br'));
    }

    // Auflistung Fahrzeuge mit niedrigster Laufleistung
    nodeTR = createElement("tr", {'class': 'row1'});
    nodeTBody.appendChild(nodeTR);
    nodeTD = createElement('td');
    nodeTD.appendChild(createText('Fahrzeuge mit der niedrigsten Laufleistung:'));
    nodeTR.appendChild(nodeTD);
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);

    // diesmal absteigend sortieren
    ArrTopKM.sort(function s(a,b){return a[0]-b[0];});
    for (var i=0;i<((ArrTopKM.length < 5)?ArrTopKM.length:5);i++)//Anzahl Elemente in Liste beachten
    { nodeTD.innerHTML += ArrTopKM[i][1] + " (" + makeDots(ArrTopKM[i][0]) + " km)";
      nodeTD.appendChild(createElement('br'));
    }
  }

  if (settingsArr.showDamageList.value && cntStations >= 10) //vorher gibt es keine Beschädigungen
  {
    // Zustandstabelle in Dokument schreiben, aber erstmal verstecken,
    // Anzeigen erst durch Klick auf Toggle-Link
    var NewDiv = createElement("div");
    var nodeScript = createElement('script',
                                   {'type': 'text/javascript'});
    nodeScript.innerHTML = "function toggledisplay()\n\
  { var e = document.getElementById('DivZustandstabelle');\n\
    e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n\
  }\n";
    NewDiv.appendChild(nodeScript);
    var nodeA = createElement('a',
                              {'href': 'javascript:toggledisplay();'});
    nodeA.appendChild(createText('beschädigte Fahrzeuge auflisten'));
    NewDiv.appendChild(nodeA);
    NewDiv.appendChild(createElement('br'));

    var hiddenDiv = createElement("div");
    hiddenDiv.id = "DivZustandstabelle";
    if (settingsArr.showDamagedAtFirstCall.value)
    { hiddenDiv.style.display = "block";
    }
    else
    { hiddenDiv.style.display = "none";
    }

    var H2 = createElement("h2");
    H2.appendChild(createText("beschädigte Fahrzeuge"));
    hiddenDiv.appendChild(H2);
    if (ArrTR.length > 0)
    {
      var hiddTB = createElement("table",
                                 {'class': "ereglamTable"});
      hiddTB.id="Zustandstabelle";
      hiddenDiv.appendChild(hiddTB);
      nodeTBody = createElement("thead");
      hiddTB.appendChild(nodeTBody);
      // Überschrift aus Tabelle zur ersten Feuerwache holen
      nodeTBody.appendChild(getXPath("./thead/tr[1]", evalTBs.snapshotItem(0), XPType.FIRST_ORDERED).singleNodeValue.cloneNode(true));

      nodeTBody = createElement("tbody");
      hiddTB.appendChild(nodeTBody);

      for each (nodeTR in ArrTR)
      { nodeTBody.appendChild(nodeTR);
      }

      // Tabelle sortieren
      // function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link)
      SortTabelle(hiddTB, 6, true, true, true);
      if (settingsArr.dispStatusAsFMSDisplayFL.value)
      { setFMS(hiddTB);
      }
    }
    else
    {
      if (settingsArr.limitDamage.value)
      {
        var nodeInfo = createText('aktuell keine Fahrzeuge mit einem Zustand weniger als ' + settingsArr.limitDamageTo.value + '%.');
      }
      else
      {
        var nodeInfo = createText('aktuell keine Fahrzeuge beschädigt.');
      }
      var nodeDiv = createElement('div',
                                  { 'class' : 'form_info',
                                  });
      nodeDiv.appendChild(nodeInfo);
      hiddenDiv.appendChild(nodeDiv);
    }
    NewDiv.appendChild(hiddenDiv);

    if (settingsArr.showSummaryVehicleList.value)
    { nodeTable = getByID("Übersichtstabelle");
      nodeTable.parentNode.insertBefore(NewDiv, nodeTable.nextSibling);
    }
    else
    { nodeContent.insertBefore(NewDiv, H1.nextSibling);
    }
  }

  if (settingsArr.dispStatusAsFMSDisplayFL.value)
  { var evalTBs  = getXPath("//table[@class='defaultTable' and descendant::th/text()='Fahrzeit']", document, XPType.SNAPSHOT_ORDERED);
    if (evalTBs.snapshotLength == 1)
    { setFMS(evalTBs.snapshotItem(0));
    }

    var evalTBs  = getXPath("//table[@class='defaultTable' and descendant::th/text()='Zustand']", document, XPType.SNAPSHOT_ORDERED);
    for (iTB = 0; iTB < evalTBs.snapshotLength; iTB++)
    { setFMS(evalTBs.snapshotItem(iTB));
    }
  }
}

function bearbeiteEinsatzseite()
{
  // Alle Infobox-Variablen leer machen
  var InfotextToAlarm="";
  var InfotextNichtVerfuegbar="";

  // wenn ein Element mit Klasse 'form_success' gefunden wird, ist der Einsatz abgeschlossen
  if (getByID('mission_content').getElementsByClassName('form_success').length > 0) {return;}

  // im Verbandseinsatz die Checkbox per default NICHT anhaken, sonst schon
  if (getByID("machVorschlag") == undefined) machVorschlag = !Verbandseinsatz();

  // Einsatzstichwort ermitteln
  var EinsatzDiv = getByID("mission_content");
  var Einsatz = document.getElementsByTagName("h1")[0];
  var Einsatzstichwort = getStichwort(Einsatz.innerHTML.trim());
  if (settingsArr.showInfoStichwort.value)
  {
  // wenn wir den Link schon einmal gesetzt haben, dies nicht wiederholen
    if (Einsatz.getElementsByTagName('a').length > 0)
    { var evalText = getXPath("./child::text()", Einsatz, XPType.SNAPSHOT_ORDERED);
      for (iTx = 0; iTx < evalText.snapshotLength; iTx++)
      { Einsatzstichwort = getStichwort(evalText.snapshotItem(iTx).nodeValue);
        if (Einsatzstichwort) { break; }
      }
    }
    else if (getWikiLinkStw(Einsatzstichwort))
    { Einsatzstichwort = getStichwort(Einsatz.innerHTML);
      var nodeA = createElement('a',
                                {'href'  : getWikiLinkStw(Einsatzstichwort),
                                 'target': '_blank'});
      nodeA.appendChild(createText('Wiki'));
      var nodeSup = createElement('sup',
                                  {'class' : 'WikiLink',
                                   'title' : getWikiLinkStw(Einsatzstichwort)});
      nodeSup.appendChild(nodeA);
      Einsatz.insertBefore(nodeSup, Einsatz.firstChild);
    }
  }


if (settingsArr.highlightVBOrder.value && EinsatzstichwortArr[Einsatzstichwort].vbOrder)
  { Einsatz.style.color = 'yellow';
    Einsatz.style.fontWeight = 'bold';
  }
  if (settingsArr.highlightOrder.value && order == Einsatz.innerHTML.trim())
  { Einsatz.style.color = 'green';
    Einsatz.style.fontWeight = 'bold';
    Einsatz.style.fontStyle = 'italic';
  }




  // Einsatzklasse
  var Einsatzklasse = getEinsatzKlasse(Einsatzstichwort);

  // Fahrzeuge zusammenstellen
  FillAlarmListe(Einsatzklasse, Einsatzstichwort);

  // Anzahl der nötigen RTW ermitteln
  var verletzte = getVerletzte();
  if (verletzte > 0)
  {
    for (var v = 0; v < verletzte; v++)
    { if (EinsatzstichwortArr[Einsatzstichwort].onWater)
      { ToAlarm.push("RTB"); }
      else
      { ToAlarm.push("RTW"); }
    }
    if (settingsArr.callSurplusRTW.value && !EinsatzstichwortArr[Einsatzstichwort].onWater)
    { ToAlarm.push("RTW");
    }
  }

  // bereits eingebundene Fahrzeuge ermitteln
  // BEI VERBANDSEINSÄTZEN (GSL) WIRD DIE LISTE NICHT AUSGEFÜHLT, DAMIT JEDER DIE FAHRZEUGE VORGESCHLAGEN BEKOMMT!!!!!!!!!!!!!!

if (Einsatzklasse!= ("GSL Verband")){
   FillUnterwegsListe();
}

  // ToAlarm um die FZ kürzen, die bereits unterwegs sind
  // sowie die Reihenfolge anpassen, dass Alternativen am Ende stehen
  bereinigeToAlarm();

  // Nachforderungen auslesen
  var nachforderungArr = AddNachforderungen();

  if (!machVorschlag)
  { // es sollen keine Vorschläge angehakt werden, also alles aus ToAlarm
    // nach Optional verschieben, so dass alles nur gelb markiert wird.
    while (ToAlarm.length > 0) Optional.push(ToAlarm.pop());
  }

  if (settingsArr.showInfoToAlarm.value)
  { InfotextToAlarm = condenseFahrzeugliste(ToAlarm);
  }
// ************************************************************************************
// an dieser Stelle sind die Listen ToAlarm und Optional gefüllt. Jetzt kann alles
// aus ToAlarm abgehakt werden und alles aus Optional gelb markiert
// ************************************************************************************

  // ToAlarm-Fahrzeuge tatsächlich abhaken
  var toAlarmDauerArr = AlarmiereFahrzeuge();

  // Optionale Fahrzeuge markieren
  var optAlarmDauerArr = MarkiereFahrzeuge();

  // falls Fahrzeuge nicht alarmiert werden konnten, diese auflisten
  if (ToAlarm.length > 0 && settingsArr.showInfoNichtVerfuegbar.value) InfotextNichtVerfuegbar = condenseFahrzeugliste(ToAlarm);

  // Infobereich in die Seite einbauen
  var InfoBereich = getByID("InfoBereich");
  if (!InfoBereich)
  { InfoBereich = createElement("div");
    InfoBereich.id = "InfoBereich";
    EinsatzDiv.parentNode.insertBefore(InfoBereich,Einsatz.nextSibling);
  }
  else
  {
    removeChildren(InfoBereich); // alte Daten löschen
  }

  var nodeH2 = createElement('h2');
  nodeH2.appendChild(createText('Einsatzinfomationen'));
  InfoBereich.appendChild(nodeH2);

  // Tabelle mit Optionen
  var nodeTable = createElement('table',
                                {'style': 'width: 100%;'});
  InfoBereich.appendChild(nodeTable);
  var nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);
  var nodeTR = createElement('tr');
  nodeTBody.appendChild(nodeTR);

  var nodeTD = createElement('td',
                             {'style': 'width: 40%;'});
  nodeTR.appendChild(nodeTD);

  // Option: benötigte Fahrzeuge direkt auswählen
  var nodeInput = createElement('input',
                                {'type': 'checkbox',
                                 'id'  : 'machVorschlag'});
  nodeTD.appendChild(nodeInput);
  if (machVorschlag) { nodeInput.setAttribute('checked', 'checked');}
  var nodeLabel = createElement('label',
                                {'for': 'machVorschlag'});
  nodeTD.appendChild(nodeLabel);
  nodeLabel.appendChild(createText(' Fahrzeuge sofort auswählen'));
  
  nodeTD = createElement('td',
                         {'style': 'width: 60%;text-align: right;font-weight:bold;'});
  nodeTR.appendChild(nodeTD);
  // Zwischentext
  if (machVorschlag)
  {
    var str = '';
    switch(settingsArr.moveSequenceInStation.value)
    {
      case 'trupp':
        str = 'Truppfahrzeuge';
        break;
      case 'special' :
        str = 'Sonderausbildungsfahrzeuge';
        break;
    }
    if (str.length > 0)
    { nodeTD.appendChild(createText(str + ' werden zuerst alarmiert'));
    }
  }

  // Tabellen mit Informationen zum Einsatz
  nodeTable = createElement('table',
                            {'class': 'ereglamTable'});
  InfoBereich.appendChild(nodeTable);
  nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);

//*************************************************************************************************************** 
// EinsatzNr.
  //if (settingsArr.showInfoKlasse.value)
  { var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('Einsatz Nr.'));
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
   
nodeSpan = createElement('span',
                          {'style': 'color: ' + settingsArr.dispStichwortColour.value + ';'});
  nodeTD.appendChild(nodeSpan);
    






           var EinsatzNr = adr.replace(/[^0-9]/g, "");
           nodeSpan.appendChild(createText(EinsatzNr));
}




// EinsatzOrt.
  // if (settingsArr.showInfoKlasse.value)
 {  var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('Einsatz Ort.'));
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
   
    nodeSpan = createElement('span',
                          {'style': 'color: ' + settingsArr.dispStichwortColour.value + ';'});
  nodeTD.appendChild(nodeSpan);

    var tmp     = EinsatzNr.substring(EinsatzNr.length-3, EinsatzNr.length) * 1;
    var strasse = ( (tmp > Strassennamen.length) ? EinsatzNr.substring(EinsatzNr.length-1, EinsatzNr.length) * 1 : tmp);
    var hausnr  = (EinsatzNr.substring(EinsatzNr.length-2, EinsatzNr.length) * 1) + 1; 
    var Stadt = ",01662 Meissen"
    var Einsatzort = Strassennamen[strasse] + " " + hausnr + " "+ Stadt;



    nodeSpan.appendChild(createText(Einsatzort));
}




//***********************************************************************************************************************
 


  // Einsatzklasse
  if (settingsArr.showInfoKlasse.value)
  { var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('Einsatzklasse'));
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    if (settingsArr.disableSelectionDueToStorm.value &&
        EinsatzstichwortArr[Einsatzstichwort].storm)
    { var nodeSpan = createElement('span',
                                 {'style': 'color: darkred;'});
      nodeSpan.appendChild(createText('Unwetter: '));
      nodeTD.appendChild(nodeSpan);
    }
    nodeSpan = createElement('span',
                             {'style': 'color: ' + settingsArr.dispStichwortColour.value + ';'});
    nodeTD.appendChild(nodeSpan);
    var text = '';
    var EKlasse = getEinsatzKlasse(Einsatzstichwort);
    if (settingsArr.showInfoLangtext.value)
    {
      text = makeEKListText(EKlasse, true); //nur Einsatzklasse ohne zusätzliche Fahrzeuge
    }
    else
    {
      text = EKlasse;
    }
    nodeSpan.appendChild(createText(text));

    var teilObj = getEKListTeilobjekte(EKlasse);
    var fhzArr = teilObj.req.concat(teilObj.add);
    if (fhzArr.length > 0 || teilObj.opt.length > 0)
    { nodeTD.appendChild(createText(' (' + condenseFahrzeugliste(fhzArr) +
                                           ((teilObj.opt.length > 0)? '|' + condenseFahrzeugliste(teilObj.opt): '') + ')'));
    }
  }

  // RTW
  if (settingsArr.showInfoRTW.value && (verletzte > 0))
  { var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('RTW benötigt'));
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    // ein Image auf jeden Fall anlegen
    var nodeImg = createElement('img',
                                {'class': 'famfamfamicon',
                                 'src'  : '/images/pill.png',
                                 'alt'  : 'Pille'});
    // und nun der Rest, sofern verhanden
    for (var i = 1; i <= verletzte; i++)
    { nodeTD.appendChild(nodeImg.cloneNode(true));
    }
    nodeTD.appendChild(createText(' ' + verletzte + ' verletzte Person' + ((verletzte>1)?'en':'')));
  }

  // Nachforderungen
  if (settingsArr.showInfoNachforderungen.value && (nachforderungArr.length > 0))
  { var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('Nachforderung'));
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(condenseFahrzeugliste(nachforderungArr)));
  }

  // Unterwegs
  if (settingsArr.showInfoUnterwegs.value && (Unterwegs.length > 0))
  { var hatMehr = false;
    var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('im Einsatz'));
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    var nodeSpan;
    if (settingsArr.showInfoUnterwegsTrennen.value)
    {
      if (AmOrt.length > 0)
      {
        var nodeSpan = createElement('span',
                                     {'style': 'color: green;'});
        nodeTD.appendChild(nodeSpan);
nodeSpan.appendChild(createText(' am Ort: '));
        nodeSpan.appendChild(createText(((settingsArr.showInfoUnterwegsTrennLang.value)?' vor Ort: ':'') + condenseFahrzeugliste(AmOrt)));
        hatMehr = true;
      }
      if (AufAnfahrt.length > 0)
      {
        if (hatMehr)
        {
          nodeTD.appendChild(createText(','));
        }
        nodeSpan = createElement('span',
                                 {'style': 'color: orange;'});
        nodeTD.appendChild(nodeSpan);
nodeSpan.appendChild(createText(' auf Anfahrt: '));
        nodeSpan.appendChild(createText(((settingsArr.showInfoUnterwegsTrennLang.value)?' auf Anfahrt: ':'') + condenseFahrzeugliste(AufAnfahrt)));
        hatMehr = true;
      }
      if (Wartend.length > 0)
      {
        if (hatMehr)
        {
          nodeTD.appendChild(createText(','));
        }
        nodeSpan = createElement('span',
                                 {'style': 'color: brown;'});
        nodeTD.appendChild(nodeSpan);
nodeSpan.appendChild(createText(' wartend: '));
        nodeSpan.appendChild(createText(((settingsArr.showInfoUnterwegsTrennLang.value)?' wartend: ':'') + condenseFahrzeugliste(Wartend)));
      }
    }
    else
    {
      nodeSpan = createElement('span');
      nodeTD.appendChild(nodeSpan);
      nodeSpan.appendChild(createText(condenseFahrzeugliste(Unterwegs)));
    }
  }

  // zu alarmierende Fahrzeuge
  if (settingsArr.showInfoToAlarm.value)
  { var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('zu alarmieren'));
    nodeTD = createElement('td',
                           {'id': 'TA'});
    nodeTR.appendChild(nodeTD);

    if ((InfotextToAlarm != '') || (Optional.length > 0))
    {
      if (InfotextToAlarm != '')
      {
        var nodeSpan = createElement('span',
                                     {'style': 'color: red;'});
        nodeTD.appendChild(nodeSpan);
        nodeSpan.appendChild(createText(InfotextToAlarm));
      }

      if (Optional.length > 0)
      {
        if (InfotextToAlarm != '')
        {
          nodeTD.appendChild(createText('; '));
        }
        nodeTD.appendChild(createText('('));
        if (settingsArr.showInfoUnterwegsTrennLang.value)
        {
          nodeTD.appendChild(createText('optional: '));
        }
        var nodeSpan = createElement('span',
                                     {'style': 'color: #CCCC66;'});
        nodeTD.appendChild(nodeSpan);
        nodeSpan.appendChild(createText(condenseFahrzeugliste(Optional)));
        nodeTD.appendChild(createText(')'));
      }
    }
    else
    {
      var nodeSpan = createElement('span',
                                   {'style': ' font-weight:bold; font-size:100%; color: #18C318;'});
      nodeTD.appendChild(nodeSpan);
      nodeSpan.appendChild(createText('keine weiteren Kräfte benötigt'));
    }
  }

  // nicht verfügbare Fahrzeuge
  if (settingsArr.showInfoNichtVerfuegbar.value && InfotextNichtVerfuegbar != '')
  { var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('nicht verfügbar'));
    nodeTD = createElement('td',
                           {'style': 'color: yellow;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(InfotextNichtVerfuegbar));
  }

  // Fahrzeiten
  if (((settingsArr.showInfoFahrzeit.value)    && toAlarmDauerArr.max) ||
      ((settingsArr.showInfoFahrzeitOpt.value) && optAlarmDauerArr.max))
  { var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('Anfahrzeiten'));
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    if (toAlarmDauerArr.max)
    {
      var nodeSpan = createElement('span',
                                   {'style': 'color: red;'});
      if (toAlarmDauerArr.min)
      {
        nodeTD.appendChild(createText('notwendige Fahrzeuge: zwischen '));
        nodeTD.appendChild(nodeSpan);
        var zeitNode = createText(toAlarmDauerArr.min);
        nodeSpan.appendChild(zeitNode);
        nodeTD.appendChild(createText(' und '));
        nodeSpan = nodeSpan.cloneNode(false);
        nodeTD.appendChild(nodeSpan);
        zeitNode = createText(toAlarmDauerArr.max);
        nodeSpan.appendChild(zeitNode);
      }
      else
      {
        nodeTD.appendChild(createText('notwendiges Fahrzeug: '));
        nodeTD.appendChild(nodeSpan);
        var zeitNode = createText(toAlarmDauerArr.max);
        nodeSpan.appendChild(zeitNode);
      }
    }

    if (optAlarmDauerArr.max)
    {
      if (toAlarmDauerArr.max)
      { nodeTD.appendChild(createElement('br'));
      }
      var nodeSpan = createElement('span',
                                   {'style': 'color: #CCCC66;;'});
      if (optAlarmDauerArr.min)
      {
        nodeTD.appendChild(createText('optionale Fahrzeuge: zwischen '));
        nodeTD.appendChild(nodeSpan);
        var zeitNode = createText(optAlarmDauerArr.min);
        nodeSpan.appendChild(zeitNode);
        nodeTD.appendChild(createText(' und '));
        nodeSpan = nodeSpan.cloneNode(false);
        nodeTD.appendChild(nodeSpan);
        zeitNode = createText(optAlarmDauerArr.max);
        nodeSpan.appendChild(zeitNode);
      }
      else
      {
        nodeTD.appendChild(createText('optionales Fahrzeug: '));
        nodeTD.appendChild(nodeSpan);
        var zeitNode = createText(optAlarmDauerArr.max);
        nodeSpan.appendChild(zeitNode);
      }
    }
  }

  // Tabelle verfügbare Fahrzeuge
  if (settingsArr.showInfoVerfuegbar.value)
  { var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('verfügbar'));
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(zaehleVerfuegbar());
  }

  getByID("machVorschlag").addEventListener("click" , machVorschlag_clicked , false ) ;

  var BTN = document.getElementsByName("commit")[0];
  if (BTN) BTN.addEventListener("click" , function(){ FirstRun=true; } , false ) ;

  // in erster Tabelle zu 'Rückmeldungen und Fakten' ein Zeilenkopfelement mit 'Einsatz von' suchen. Wenn nicht gefunden, ist es kein Verbandseinsatz
  if (getXPath("./table/tbody/tr/td[text() ='Einsatz von']", getByID('mission_content'), XPType.SNAPSHOT_ORDERED).snapshotLength == 0)
  { var nodeTD = getXPath("./table/tbody/tr[./td[1]/text() ='Position']/td[2]", getByID('mission_content'), XPType.FIRST_ORDERED).singleNodeValue;
    var node = getXPath('./a', nodeTD, XPType.FIRST_ORDERED).singleNodeValue;
    if (!node)
    { node = createElement('span');
      node.innerHTML = nodeTD.innerHTML;
      removeChildren(nodeTD);
      nodeTD.appendChild(node);
    }
    if (node)
    { var posArr = node.innerHTML.replace('Andere Stadt -', '').split(' - ');
      if (parseInt(posArr[1]) > 100 && settingsArr.highlightCityExtension.value)
      { node.style.color = settingsArr.highlightCityExtColour.value;
      }

      if (settingsArr.addLocationDescription.value)
      { node.appendChild(createText(': ' + getAreaDescription(parseInt(posArr[0]), parseInt(posArr[1]))));
      }
    }
  }

  if (settingsArr.dispStatusAsFMSDisplayEL.value)
  { var evalH2s = getXPath('./div/h2', getByID('mission_content'), XPType.SNAPSHOT_ORDERED);
    for (iH2 = 0; iH2 < evalH2s.snapshotLength; iH2++)
    { var nodeH2 = evalH2s.snapshotItem(iH2);
      var FMSstatus = '';
      switch(nodeH2.innerHTML.trim())
      {
        case 'Fahrzeuge am Einsatzort':
          FMSstatus = '4';
          break;
        case 'Ausgerückte Fahrzeuge':
          FMSstatus = '3';
          break;
        case 'Wartende Fahrzeuge':
          FMSstatus = '2';
          break;
        default:
          continue;
      }

      var nodeTable = getXPath('../table[1]', nodeH2, XPType.FIRST_ORDERED).singleNodeValue;
      if (!nodeTable) { continue; }
      var column = -1;
      evalTHs = getXPath('./tbody/tr[1]/th', nodeTable, XPType.SNAPSHOT_ORDERED);
      for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
      { if (evalTHs.snapshotItem(iTH).innerHTML =='Optionen')
        { column = iTH;
          evalTHs.snapshotItem(iTH).innerHTML = 'FMS';
          break;
        }
      }
      if (column != -1)
      { var evalTDs = getXPath('./tbody/tr/td['+(column+1)+']', nodeTable, XPType.SNAPSHOT_ORDERED);
        for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
        { var linksArr = {};
          var nodeTD = evalTDs.snapshotItem(iTD);
          var evalA = getXPath('./a', nodeTD, XPType.SNAPSHOT_ORDERED);
          for (iA = 0; iA < evalA.snapshotLength; iA++)
          { var nodeA = evalA.snapshotItem(iA);
            switch(nodeA.innerHTML.trim())
            { case 'Zurück alarmieren':
                switch(nodeH2.innerHTML.trim())
                { case 'Wartende Fahrzeuge':
                    linksArr['2'] = nodeA;
                    FMSstatus = '';
                    break;
                  default:
                    linksArr['1'] = nodeA;
                    break;
                }
                break;
              case 'Ausrücken':
                linksArr['3'] = nodeA;
                break;
              case 'Vom Einsatz abziehen':
                linksArr['1'] = nodeA;
                break;
            }
          }
          var nodeFMS = FMSkeyPad(FMSstatus, linksArr, settingsArr.dispFMSDisplayLinesEL.value);
          removeChildren(nodeTD);
          nodeTD.appendChild(nodeFMS);
        }
      }
    }
  }

  // Click-Event abfangen: nach hierher verschoben, um auch FMS-Links zu erwischen
  // Fahrzeuge auf Anfahrt
  var evalAs = getXPath("./table[@class='defaultTable']/tbody/tr/td[6]//a", getByID('driving_vehicle'), XPType.SNAPSHOT_ORDERED);
  for (i = 0; i < evalAs.snapshotLength; i++)
  { evalAs.snapshotItem(i).addEventListener("click", function(){ FirstRun=true; CBClicked=false;}, false );
  }
  // Fahrzeuge, die auf Besatzung warten
  evalAs = getXPath("./table[@class='defaultTable']/tbody/tr/td[4]//a", getByID('waiting_vehicle'), XPType.SNAPSHOT_ORDERED);
  for (i = 0; i < evalAs.snapshotLength; i++)
  { evalAs.snapshotItem(i).addEventListener("click", function(){ FirstRun=true; CBClicked=false;}, false );
  }

  chks = document.getElementsByName("vehicle_to_user_id[]");
  for (i = 0; i < chks.length; i++)
  { chks[i].addEventListener("click" , function(){ CBClicked=true; } , false ) ;
  }

  findRecallableVehicles()

  FirstRun=false;
}

// suche nach freien Fahrzeugen, die eine kürzere Anfahrtszeit haben als die entsprechenden Fahrzeugn bereits auf Anfahrt
function findRecallableVehicles()
{ var dFhzLst = {};
  var fFhzLst  = {};

  // Zeit in Sekunden umwandeln
  function convTime2Seconds(time)
  { if (time == 'Keine Anfahrtszeit')
    { return 0;
    }
    else
    { // hh Std. mm Min. ss Sek.
      //  1: 'hh Std.'; 2: 'hh'; 3: 'mm Min.'; 4: 'mm'; 5: 'ss'
      var [, , hh, , mm, ss] = /^((\d{1,2})\sStd.\s?)?((\d{1,2})\s?Min.\s?)?(\d{1,2})\s?Sek.\s*$/.exec(time);
      // führende Nullen entsorgen, da parseInt sonst versucht, sie oktal zu interpretieren, was bei '09' nicht klappt
      if (hh) hh = hh.replace(/^\s*0?/,'');
      if (mm) mm = mm.replace(/^\s*0?/,'');
      if (ss) ss = ss.replace(/^\s*0?/,'');

      return (((isNaN(hh))?0:parseInt(hh)) * 3600) +
             (((isNaN(mm))?0:parseInt(mm)) * 60) +
             ((isNaN(ss))?0:parseInt(ss));
    }
  }

  function convSeconds2Time(seconds)
  {  var sec = seconds%60;
    var min = Math.floor(seconds/60)%60;
    var std = Math.floor(Math.floor(seconds/60)/60);
    return std+':'+((min<=9)?'0':'')+min+':'+((sec<=9)?'0':'')+sec;
  }

  // alle Fahrzeuge finden, die gerade auf Anfahrt sind
  var evalTRs = getXPath("./table[@class='defaultTable']/tbody/tr", getByID('driving_vehicle'), XPType.SNAPSHOT_ORDERED);
  for (i = 1; i < evalTRs.snapshotLength; i++) //erste Element überspringen, weil Zeilenüberschrift
  { var evalTDs = getXPath("./td", evalTRs.snapshotItem(i), XPType.SNAPSHOT_ORDERED);
    var dFhzGrp = getFahrzeugKlasse(evalTDs.snapshotItem(1).innerHTML);
    if (!dFhzLst[dFhzGrp])
    { dFhzLst[dFhzGrp] = new Array();
    }
    dFhzLst[dFhzGrp].push({TR:   evalTRs.snapshotItem(i),
                           time: getByID("hidden_driving_countdown_" + /\/feuerwehrfahrzeuge\/(\d+)$/.exec(getXPath("./td", evalTRs.snapshotItem(i), XPType.SNAPSHOT_ORDERED).snapshotItem(0).getElementsByTagName("a")[0].href)[1]).value}); //Tabellenzeile ablegen
  }

  // alle Fahrzeuge finden, die frei sind und zu einer der Fahrzeuggruppen passen, die noch auf Anfahrt sind
  var evalTRs = getXPath("./div[@class='free_vehicle']/form/table[@class='defaultTable']/tbody/tr", getByID('mission_content'), XPType.SNAPSHOT_ORDERED);
  for (i = 1; i < evalTRs.snapshotLength-1; i++) //erste und letztes Element überspringen, weil Zeilenüberschrift
  {
    var fEvalTDs = getXPath("./td", evalTRs.snapshotItem(i), XPType.SNAPSHOT_ORDERED);
    // Zeile aussortieren, die durch AAO markiert wurde
    if (evalTRs.snapshotItem(i).style.backgroundColor && /^\s*\#442222/.test(evalTRs.snapshotItem(i).style.backgroundColor))
    { continue; }
    var fFhzName = getXPath("./a", fEvalTDs.snapshotItem(1), XPType.FIRST_ORDERED).singleNodeValue.innerHTML;
    // Zeile überspringen, wenn Fahrzeug 'außer Dienst'
    if (fFhzName.substr(0,3).toUpperCase()=="XXX")
    { continue; }
    var fFhzGrp = getFahrzeugKlasse(fEvalTDs.snapshotItem(2).innerHTML);
    for (dFhzGrp in dFhzLst) // Liste der Fahrzeuggruppen auf Anfahrt durchgehen. Wenn nicht gefunden, dann ist es irrelevant
    {
      if (dFhzLst[dFhzGrp].length == 0) // alle Fahrzeuge der Gruppe schon gefunden
      { continue;
      }
      if (dFhzGrp == fFhzGrp)
      {
        var fFhzTime = convTime2Seconds(fEvalTDs.snapshotItem(4).innerHTML);
        for each(dFhz in dFhzLst[dFhzGrp])
        {
          dFhzTR = dFhz.TR;
          var dEvalTDs = getXPath("./td", dFhzTR, XPType.SNAPSHOT_ORDERED);
          dFhzName = getXPath("./a", dEvalTDs.snapshotItem(0), XPType.FIRST_ORDERED).singleNodeValue.innerHTML;
          // direkter Zugriff auf dEvalTDs.snapshotItem(4) ergibt 'Berechne..', ist so nicht zu gebrauchen
          var dFhzTime = dFhz.time;
          var addTime = 0;
          if (! /.*[(]unterwegs[)].*/.test(fFhzName))
          { addTime = 90; }
          if (dFhzTime > (fFhzTime + addTime))
          {
            dEvalTDs.snapshotItem(4).style.backgroundColor = "#662222";
            fEvalTDs.snapshotItem(4).style.backgroundColor = "#226622";
            // gefundenes Fahrzeug von der weiteren Überprüfung ausschließen
            dFhzLst[dFhzGrp].shift();
            break; //for-Schleife
          }
          else if (dFhzTime <= fFhzTime)
          {
            break; //for-Schleife
          }
        }
      }
    }
  }
}

function bearbeiteUebersichtsseite()
{
  if (settingsArr.showInfoKlasseInListe.value || settingsArr.showInfoVehiclesInListe.value)
  { nodeTDs = document.getElementsByTagName("td");
    for (iTD = 0; iTD < nodeTDs.length; iTD++)
    { var TD = nodeTDs[iTD];
      nodeAs = TD.getElementsByTagName("a");
      for (iA = 0; iA < nodeAs.length; iA++)
      { var A = nodeAs[iA];
        if (A.href && A.href.search(/\/feuerwehr-einsaetze\/\d+/) != -1)
        {


if (settingsArr.highlightVBOrder.value && EinsatzstichwortArr[A.innerHTML.trim()].vbOrder)
          { A.style.color = '#00FFF0';
            A.style.fontWeight = 'bold';
          }
          if (settingsArr.highlightOrder.value && order == A.innerHTML.trim())
          { A.style.color = 'green';
            A.style.fontWeight = 'bold';
            A.style.fontStyle = 'italic';
          }


          // prüfen, ob schon ein Info-Block vorhanden ist
          if (TD.getElementsByTagName('span').length == 0)
          {
            var nodeSpan = createElement('span',
                                         {'style': 'padding-right: 2px;'
                                                   + ((settingsArr.alignInfoKlasseToRight.value) ? ' float: right;' : '')
                                                   + " color: " + settingsArr.dispStichwortColour.value + ';'
                                                   + " text-align: right;",
                                          'class': 'fontSmall',
                                          'name' : 'aaoInfo'});
            var text = '';
            var EKlasse = getEinsatzKlasse(A.innerHTML.trim());
            if (settingsArr.showInfoKlasseInListe.value)
            {
              if (settingsArr.showInfoLangtextListe.value)
              {
                text = makeEKListText(EKlasse, true); // ohne Zusatzfahrzeuge
              }
              else
              {
                text = EKlasse;
              }
              nodeSpan.appendChild(createText(text));
            }

            if (settingsArr.showInfoVehiclesInListe.value)
            {
              if (settingsArr.showInfoKlasseInListe.value)
              {
                nodeSpan.appendChild(createElement('br'));
              }
              var teilObj = getEKListTeilobjekte(EKlasse);
              var fhzArr = teilObj.req.concat(teilObj.add);
              nodeSpan.appendChild(createText(condenseFahrzeugliste(fhzArr) +
                                                  ((teilObj.opt.length > 0)? '|' + condenseFahrzeugliste(teilObj.opt): '')));
            }
            TD.appendChild(nodeSpan);
          }
        }
      }
    }
  }
{ if (settingsArr. showinfoeinsatzzahl.value)

	//wenn Grosschadenslage läuft, dann muss er die 2. Tabelle nehmen!!!
		var quelltext = document.body.innerHTML;
		var Ergebnis = quelltext.search("Großschadenslagen des Verbands");
		var neuerquell;
		if (Ergebnis != -1) {
			var tabelle = 1; 
			} else {
			var tabelle = 0; 
			}
if (settingsArr. zaehlerinfo.value){
GM_setValue("Gesamt", 0);}

  var c = GM_getValue("Gesamt");
  var a = GM_getValue("Anzahl");
  
  var TRs = document.getElementById("content").getElementsByTagName("tbody")[tabelle].getElementsByTagName("tr"); {
		AnzFehl    = 0, AnzErledigt = 0, Anzfaengtan = 0, Anzhoertauf = 0, Anzabarbeitung = 0;

		for (i=0;i<TRs.length;i++) {
                                        GM_setValue("Anzahl", Anzfaengtan); 
					var TR = TRs[i];
					var TD = TR.getElementsByTagName("td")[0];
					var H = TD.innerHTML;
					var Hstr = new String;
					Hstr = H;




                                             if (Hstr.match("Neuer Einsatz") != null ) { 
						AnzErledigt++;
						//Verstärkung benötigt
					}
                                        else if (Hstr.match("Verstärkung benötigt") != null ) { 
						Anzfaengtan++;
						//Neuer Einsatz - breitet sich bereits aus

					GM_setValue("Anzahl", Anzfaengtan);
						
						if (Anzfaengtan > a)
						{ c = c + 1 ;
						}
						else
						{ c = c + 0;
						}

					GM_setValue("Gesamt", c);
					}
                                        else if (Hstr.match("Wichtige Rückmeldung") != null ) { 
						Anzhoertauf++;
						//Wichtige Rückmeldung
					}
                                        else if (Hstr.match(/^\s+$/) != null ) { 
						Anzabarbeitung++;
						//Wichtige Rückmeldung
					}
					TD.innerHTML = H;
				}
		}
		var c = GM_getValue("Gesamt");
		var ret;
		//var Fehlquote;
		//Fehlquote = (100/(AnzErledigt+AnzFehl))*AnzFehl
		//if (AnzFehl == 0) { Fehlquote = 0 }
		//rescue: Reihenfolge geändert und 4-spaltig angelegt um Platz zu sparen
			ret =  "<table class='defaultTable'><tr>";
			ret += "<th colspan='4'>Auswertung der aktuellen Einsatztabelle:</th></tr>\n";
			ret += "<tr><th>Gesamt gefahrene Einsätze</th><td> <font color='#8A2BE2'><b>" + c + "</b></font></td>";
			ret += "<th style='width:40%;'>Einsätze mit Fahrzeugen auf Anfahrt</th><td style='width:5%;'><font color='yellow'><b>" + Anzfaengtan + "</b></font></td></tr>\n";
			ret += "<tr><th>Einsätze die alarmiert werden können</th><td> <font color='18DF18'><b>" + AnzErledigt + "</b></font></td>";
			ret += "<th style='width:40%;'>Einsätze welche abgearbeitet werden</th><td style='width:5%;'> <font color='red'><b>" + Anzabarbeitung + "</b></font></td></tr>\n";
			ret += "<tr><th>Einsätze mit Nachforderung</th><td> <font color='darkred'><b>" + Anzhoertauf + "</b></font></td>";
			ret += "<th style='width:40%;'> </th><td style='width:10%;'> <font color='18DF18'><b>" + "</b></font></td></tr>\n";
                  	ret += "<th></th><td></td></tr>\n";
	  ret += "</table><br>\n";
	  var main, newElement;
	  main = document.getElementsByTagName("h1")[0];
	  newElement = document.createElement('p');
          newElement.setAttribute('id','EinsatzAuswertung');
	  main.parentNode.insertBefore(newElement, main.nextSibling);
	  newElement.innerHTML = ret;
    }


if (settingsArr. aktuall.value){
window.setTimeout("location.reload()",10000);}
}

function AddKonfigEventlisteners()
{
  if (ScriptUpdateAvailable != "")
  { getByID("installURL").addEventListener (
      "click" ,
      function(){ GM_setValue("Version",ScriptUpdateAvailable); ScriptUpdateAvailable=""; GM_setValue("pleaseUpdate",""); } ,
      true )
  }
}

function SortiereNachSpalte(Tab,SortBy)
{
  var Spalte = -1;
  var c=0;
  nodeTHs = Tab.getElementsByTagName("th");
  for (i = 0; i < nodeTHs.length; i++)
  { if (nodeTHs[i].innerHTML == SortBy) Spalte=c;
    c++;
  }
  if (Spalte == -1) return;

  switch(SortBy)
  { case "Name":        SortTabelle(Tab,Spalte,true,false,true); break;
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
{
  var THead = myTB.getElementsByTagName("thead")[0];
  if (!THead) return;
  nodeTHs = THead.getElementsByTagName("th");
  for (i = 0; i < nodeTHs.length; i++)
  { TH = nodeTHs[i];
    var H = TH.innerHTML;
    if (!TH.addEventListener)
    { continue;
    }
    TH.addEventListener ( "click" , function(e)
                                    { SortiereNachSpalteClick(e)
                                    }
                                  , true ) ;
  }
}

  // ******************************************************************************************
  // Personalseite
  // ******************************************************************************************
function BearbeitePersonaltabelle(myTB)
{
  MachSortierbar(myTB);
  if (settingsArr.defaultTabSort.value != "none")
  {
    SortiereNachSpalte(myTB, settingsArr.defaultTabSort.value)
  }

  //zweidimensionale Sammlung
  var AnzArr = {};
  var AnzFM=0, AnzEinsatz=0, AnzSchule=0, AnzBereit=0, AnzDienst=0;
  var AnzGG=0, AnzGGDienst=0, AnzGGBereit=0;
  var AnzRA=0, AnzRADienst=0, AnzRABereit=0;
  var AnzTA=0, AnzTADienst=0, AnzTABereit=0;
  var AnzAP=0, AnzAPDienst=0, AnzAPBereit=0;
  // Initialisierung
  AnzArr['total'] = {};
  AnzArr['total']['total'] = 0;
  for (pers in personalStatusArr)
  { AnzArr['total'][pers] = 0;
  }
  for (train in trainingArr)
  { AnzArr[train] = {};
    AnzArr[train]['total'] = 0;
    for (pers in personalStatusArr)
    { AnzArr[train][pers] = 0;
    }
  }
  var nodeTRs = myTB.getElementsByTagName("tr");
  for (i = 0; i < nodeTRs.length; i++)
  { if (nodeTRs[i].getElementsByTagName("td").length>5)
    { var TDs = nodeTRs[i].getElementsByTagName("td");
      var Stat = TDs[5].innerHTML.trim();
      var nodeA = getXPath('./a', TDs[5], XPType.FIRST_ORDERED).singleNodeValue;
      if (nodeA)
      { Stat = nodeA.innerHTML.trim();
      }
      var Ausb = TDs[4].innerHTML.trim();

      var nodeTD;
      // Motivation kennzeichnen:
      if (settingsArr.useMotivationColourCode.value)
      {
        nodeTD = TDs[1];
        var mot = parseInt(nodeTD.innerHTML);
        for (var motivation in motivationArr)
        { if (mot >= motivation)
          { nodeTD.style.color = motivationArr[motivation].tcol;
            break;
          }
        }
      }

      // Fähigkeit kennzeichnen:
      if (settingsArr.useAbilityColourCode.value)
      {
        nodeTD = TDs[2];
        var abl = parseInt(nodeTD.innerHTML);
        for (var ability in abilityArr)
        { if (abl >= ability)
          { nodeTD.style.color = abilityArr[ability].tcol;
            break;
          }
        }
      }

      if (settingsArr.useTrainingColourCode.value)
      {
        nodeTD = TDs[4];
        for each(training in trainingArr)
        { if (training.regex.test(nodeTD.innerHTML))
          { nodeTD.innerHTML = nodeTD.innerHTML.replace(training.regex, '<span style="color: ' + training.tcol[layout] + ';">' + training.regex.source + '</span>');
          }
        }
      }

// ************************************************************************************
// Schicht kennzeichnen:
// ************************************************************************************
      if (settingsArr.useShiftColourCode.value &&
          TDs[6])
      { TDs[6].style.color = shiftArr[parseInt(TDs[6].innerHTML)].tcol;
      }

 // Personalstatistik:
      AnzFM++;

      var tcol = '';
      // Status kennzeichnen und zählen
      switch(Stat)
      {
        case  "Beim Einsatz" : AnzDienst++;
                               AnzEinsatz++;
                               tcol = personalStatusArr[Stat].tcol;
                               break;
        case  "Frei - nicht im Dienst":
                               tcol = personalStatusArr[Stat].tcol;
                               break;
        case  "Einsatzbereit": AnzDienst++;
                               AnzBereit++;
                               tcol = personalStatusArr[Stat].tcol;
                               break;
        case  "In der Feuerwehrschule":
                               AnzSchule++;
                               tcol = personalStatusArr[Stat].tcol;
                               break;
      }

      if (settingsArr.useStatusColourCode.value && (tcol != ''))
      { TDs[5].style.color = personalStatusArr[Stat].tcol;
      }

      // Ausbildungsstand
      if (Ausb.match("Gefahrgut"))
      { AnzGG++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzGGDienst++;
        if (Stat == "Einsatzbereit") AnzGGBereit++;
      }
      if (Ausb.match("Rettungsassistent"))
      { AnzRA++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzRADienst++;
        if (Stat == "Einsatzbereit") AnzRABereit++;
      }
      if (Ausb.match("Taucher"))
      { AnzTA++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzTADienst++;
        if (Stat == "Einsatzbereit") AnzTABereit++;
      }
      if (Ausb.match("Flughafen"))
      { AnzAP++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzAPDienst++;
        if (Stat == "Einsatzbereit") AnzAPBereit++;
      }

      if (Ausb.match("2-Wege-Führerschein"))
      { AnzAP++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzAPDienst++;
        if (Stat == "Einsatzbereit") AnzAPBereit++;
      }

      if (Ausb.match("Rettungszug"))
      { AnzAP++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzAPDienst++;
        if (Stat == "Einsatzbereit") AnzAPBereit++;
      }

      AnzArr['total']['total']++;
      for (pers in personalStatusArr)
      { if (Stat == pers)
        { AnzArr['total'][pers]++;
        }
      }
      for (train in trainingArr)
      { if (Ausb.match(trainingArr[train].regex))
        { AnzArr[train]['total']++;
          for (pers in personalStatusArr)
          { if (Stat == pers)
            { AnzArr[train][pers]++;
            }
          }
        }
      }
    }
  }

  var nodeDiv = createElement('div');
  nodeTable = createElement('table',
                            {'class': 'ereglamTable',
                             'name' : 'summary',
                             'style': 'width: 100%'});
  nodeDiv.appendChild(nodeTable);
  // Tabellenkopf
  nodeTBody = createElement('thead');
  nodeTable.appendChild(nodeTBody);
  nodeTable.appendChild(nodeTBody);
  nodeTR = createElement('tr');
  nodeTBody.appendChild(nodeTR);
  nodeTD = createElement('th',
                         {'style': 'width: 25%'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Ausbildung'));
  nodeTD = createElement('th',
                         {'style': 'width: 15%'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Summe'));
  for (pers in personalStatusArr)
  { nodeTD = createElement('th',
                           {'style': 'width: 15%'});
    nodeTD.style.color = (settingsArr.useStatusColourCode.value)?personalStatusArr[pers].tcol:'';
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(personalStatusArr[pers].text));
  }
  // Tabellenkörper
  nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);
  nodeTable.appendChild(nodeTBody);
  nodeTR = createElement('tr');
  nodeTBody.appendChild(nodeTR);
  nodeTD = createElement('th');
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('gesamt'));
  nodeTD = createElement('td',
                         {'style': 'text-align: right;'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText(AnzArr['total']['total']));
  for (pers in personalStatusArr)
  { nodeTD = createElement('td',
                           {'style': 'text-align: right;'});
    nodeTD.style.color = (settingsArr.useStatusColourCode.value)?personalStatusArr[pers].tcol:'';
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(AnzArr['total'][pers]));
  }
  for (train in trainingArr)
  { if (AnzArr[train]['total'] > 0)
    { nodeTR = createElement('tr');
      nodeTBody.appendChild(nodeTR);
      nodeTD = createElement('th')
      nodeTD.style.color = (settingsArr.useTrainingColourCode.value)?trainingArr[train].tcol['black']:'';
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText(train));
      nodeTD = createElement('td',
                             {'style': 'text-align: right;'});
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText(AnzArr[train]['total']));
      for (pers in personalStatusArr)
      { nodeTD = createElement('td',
                               {'style': 'text-align: right;'});
        nodeTD.style.color = (settingsArr.useStatusColourCode.value)?personalStatusArr[pers].tcol:'';
        nodeTR.appendChild(nodeTD);
        nodeTD.appendChild(createText(AnzArr[train][pers]));
      }
    }
  }

  nodeSpan = createElement('span',
                           {'class': 'fontSmall'});
  nodeSpan.appendChild(createText('Zum Sortieren Spaltenüberschrift anklicken'));
  nodeDiv.appendChild(nodeSpan);
  return nodeDiv;
}

function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link)
{
  var nodeTBody = myTB.getElementsByTagName("tbody")[0];
  if (!nodeTBody) return;
  var ArrTR = new Array();
  var nodeTRs = nodeTBody.getElementsByTagName("tr");
  for (i = 0; i < nodeTRs.length; i++)
  { ArrTR.push(nodeTRs[i]);
  }
  if (ArrTR.length==0) return;

  ArrTR.sort(function(x,y){return TableSort(x,y,Spalte,Richtung,Numerisch,Link);});

  for (var i=0;i<ArrTR.length;i++)
  { try
    { nodeTBody.appendChild(ArrTR[i]);
    }
    catch(Exception)
    { continue;
    }
  }
}

// sortiert Tabellenspalten nach Spalte S
function TableSort(Z1,Z2,S,richtung,num,link)
{
  // übergeben werden zwei <tr> Objekte und die Spaltennummer,
  // nach der sortiert werden soll
  // die weiteren Parameter bedeuten:
  // richtung (t/f)    = Richtung (true = A->Z, false = Z->A)
  // num (true/false)  = numerisch sortieren? sonst alphanumerisch
  // link (true/false) = Zelleninhalt ist ein Link
  var S1,S2;

  if (!Z1.getElementsByTagName)
  { return 0;
  }
  var TDs = Z1.getElementsByTagName("td");
  if (TDs.length <= S) return 0;
  S1 = TDs[S].innerHTML.removeTags();

  if (!Z2.getElementsByTagName)
  { return 0;
  }
  TDs = Z2.getElementsByTagName("td");
  if (TDs.length <= S) return 0;
  S2 = TDs[S].innerHTML.removeTags();

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
  var nodeTRs = TB.getElementsByTagName("tr");
  for (i = 0; i < nodeTRs.length; i++)
  { var TR = nodeTRs[i];
    // Farbe entfernen
    TR.style.backgroundColor = '';

    var CB=TR.getElementsByTagName("input")[0];
    if (CB)
    { CB.alt=undefined;
      if (CB.checked && auchHaken) CB.click();
    }

  }
}

function addAboutUpdateInfo()
{
  if (ScriptUpdateAvailable && (getByID('divUpdateInfo') == undefined))
  {
    var nodeDiv = createElement('div',
                               {'id'   : 'divUpdateInfo',
                                'class': 'form_info'});

    nodeDiv.appendChild(createElement('b').appendChild(createText('Script-Update verfügbar (' + ScriptUpdateAvailable + '): ')));
    var nodeA = createElement('a',
                              {'href'  : UPDATEURL,
                               'style': 'color: yellow;',
                               'target': '_blank'});
    nodeA.appendChild(createText('Informationen'));
    nodeDiv.appendChild(nodeA);

    nodeDiv.appendChild(createText(' dazu oder direkt '));
    nodeA = createElement('a',
                          {'href'  : INSTALLURL,
                           'style': 'color: yellow;',
                           'id'    : 'installURL',
                           'target': '_blank'});
    nodeA.appendChild(createText('installieren'));
    nodeDiv.appendChild(nodeA);
    return nodeDiv;
  }
}

function machVorschlag_clicked(e)
{
  machVorschlag = getByID("machVorschlag").checked;
  ClearFreeVehiclesTable(true);
  FirstRun=true;
  main();
}

// befüllen der globalen Listen mit geforderten Fahrzeugen
function FillAlarmListe(Einsatzklasse, Stichwort)
{ var FZ = getFahrzeugListe(Einsatzklasse);
  // im Unwettermodus das/die vordefinierte(n) Fahrzeug(e) statt dessen alarmieren
  if (settingsArr.disableSelectionDueToStorm.value &&
      EinsatzstichwortArr[Stichwort].storm)
  { // eventuell vorhande optionale Fahrzeuge zum Rest zusammenfassen
    FZ.replace('|', ',');
    // jetzt die Unwetterfahrzeuge voranstellen und den Rest zu optional ändern
    FZ = settingsArr.reducedSelectionVehicle.value + '|' + FZ;
  }
  ToAlarm = new Array;
  Optional = new Array;

  var Teile = FZ.split("|");
  ToAlarm = Teile[0].split(",");
  if (Teile.length > 1) Optional = Teile[1].split(",");
  return;
}

// ermittelt nachzufordernde Fahrzeuge
function AddNachforderungen()
{ var alleNFArr = new Array;

  var nodeTable = getXPath("./table[@class='defaultTable']", getByID('mission_reply'), XPType.FIRST_ORDERED).singleNodeValue;
  if (nodeTable)
  { var markedVeh = markDemand(nodeTable);
    for each (veh in markedVeh)
    { if (!FZinEinsatz(veh))
      { ToAlarm.push(veh);
        alleNFArr.push(veh);
      }
    }
  }

  return alleNFArr;
}

// prüfen, ob ein Fahrzeug bereits in der Alarmierungsliste steht
function FZinEinsatz(FZ)
{
  for each (FZA in ToAlarm)
  { var A = FZA.split("/");
    for each (F in A)
    { if (F == FZ) return true;
    }
  }
  for each (U in Unterwegs)
  { if (U == FZ) return true;
  }
  return false;
}

// befüllen der globalen Listen mit Fahrzeugen, die unterwegs
function FillUnterwegsListe()
{
  Unterwegs = new Array;
  AmOrt = new Array;
  AufAnfahrt = new Array;
  Wartend = new Array;

  var divnames = new Array;
  divnames.push("mission_vehicle","driving_vehicle","waiting_vehicle");

  for each (dn in divnames)
  { var d = getByID(dn);
    if (d.getElementsByTagName("table").length == 1)
    { var TB=d.getElementsByTagName("table")[0];
      var nodeTRs = TB.getElementsByTagName("tr");
      for (i = 0; i < nodeTRs.length; i++)
      { var FZ;
        try
        { var FZ=nodeTRs[i].getElementsByTagName("td")[1].innerHTML;
          FZ = getFahrzeugKlasse(FZ);
          Unterwegs.push(FZ);
          // noch verteilen nach 'vor Ort', 'auf Anfahrt' und 'wartend'
          switch(dn)
          {
            case "mission_vehicle": AmOrt.push(FZ); break;
            case "driving_vehicle": AufAnfahrt.push(FZ); break;
            case "waiting_vehicle": Wartend.push(FZ); break;
          }
        } catch(e) {};
      }
    }
  }
}

// Alternativ-FZ in ToAlarm ans Ende stellen:
function bereinigeToAlarm()
{
  for (var ta=0; ta<ToAlarm.length; ta++)
  { if (ToAlarm[ta].indexOf("/") != -1) ToAlarm[ta] = "ZZZ/" + ToAlarm[ta]; }
  ToAlarm = ToAlarm.sort();
  for (var ta=0; ta<ToAlarm.length; ta++)
  { if (ToAlarm[ta].indexOf("ZZZ/") != -1) ToAlarm[ta] = ToAlarm[ta].substring(4,100); }

  // ebenso in Optional:
  for (var ta=0; ta<Optional.length; ta++)
  { if (Optional[ta].indexOf("/") != -1) Optional[ta] = "ZZZ/" + Optional[ta]; }
  Optional = Optional.sort();
  for (var ta=0; ta<Optional.length; ta++)
  { if (Optional[ta].indexOf("ZZZ/") != -1) Optional[ta] = Optional[ta].substring(4,100); }

  var gefunden=false;

  for each (FZ in Unterwegs)
  { gefunden=false;
    for (var i=0; i<ToAlarm.length; i++)
    { var ALT = ToAlarm[i].split("/");
      for (a=0; a<ALT.length; a++)
      { if (FZ == ALT[a])
        { ToAlarm.splice(i,1); i=ToAlarm.length;
          gefunden=true;
        }
      }
    }
    if (!gefunden)
    { for (var i=0; i<Optional.length; i++)
      { var ALT = Optional[i].split("/");
        for (a=0; a<ALT.length; a++)
        { if (FZ == ALT[a])
          { Optional.splice(i,1); i=Optional.length;
            gefunden=true;
          }
        }
      }
    }
  }
}

// Anzahl Verletzte ermittlen
function getVerletzte()
{
  var evalText = getXPath("./table/tbody/tr[contains(./td[1]/text(), 'Verletzte')]/td[2]/text()", getByID('mission_content'), XPType.SNAPSHOT_ORDERED);

  if (!evalText.snapshotLength) { return 0; }
  for (iTx = 0; iTx < evalText.snapshotLength; iTx++)
  { if (/(\d*)\s*Personen/.test(evalText.snapshotItem(iTx).nodeValue.trim()))
    { [all,injured] = evalText.snapshotItem(iTx).nodeValue.trim().match(/(\d*)\s*Personen/);
      if (injured) { break; }
    }
  }
  if (injured) { return parseInt(injured); }
  return 0;
}

// Fahrzeugklasse zum Fahrzeug holen
function getFahrzeugKlasse(Fahrzeugname)
{
  var fhz = FahrzeugeArr[Fahrzeugname];
  if (fhz)
  {
    return fhz.vehGrp;
  }
  else
  {
    return Fahrzeugname;
  }
}

// Geschwindigkeit eines Fahrzeugs ermitteln
function getFahrzeuggeschwindigkeit(Fahrzeugname)
{
  var fhz = FahrzeugeArr[Fahrzeugname];
  if (fhz)
  {
    return parseInt(fhz.speed);
  }
  else
  {
    return 1000;
  }
}

// Einsatzklasse zum Stichwort ermitteln
function getEinsatzKlasse(Stichwort)
{
  var stw = EinsatzstichwortArr[Stichwort];
  if (stw)
  {
    return stw.stwCls;
  }
  else
  {
    return "undef";
  }
}

// Suche in einem Rückmeldetext durch die Liste potentiell nachzufordernder Fahrzeuge
function getNachforderungFahrzeug(Rueckmeldung)
{
  var FZ;
  for (var nachforderung in NachforderungenArr)
  {
    // die Suchwerte stehen im Value-Teil der Liste
    if (NachforderungenArr[nachforderung].regex.test(Rueckmeldung))
    { // nachzuforderndes Fahrzeug gefunden
      return nachforderung;
    }
  }

  return '';
}

//zerlege die Einsatzliste in ihre Bestandteile
//das Array besteht aus den Elementen:
// vehGrp: die Einsatzklasse
// req   : die Fahrzeuge zur Einsatzklasse
// add   : zusätzliche Fahrzeuge
// opt   : optionale Fahrzeuge
function getEKListTeilobjekte(EListe)
{
  var teilObj = new Array;
  teilObj.opt = new Array;
  teilObj.add = new Array;
  teilObj.req = new Array;

  // zunächst eventuell optionale Fahrzeuge ermitteln
  var teile = EListe.split('|');
  if (teile.length > 0 && teile[1] != undefined)
  {
    teilObj.opt = teile[1].split(',');
  }

  // dann eventuell zusätzliche Fahrzeuge ermitteln
  teile = teile[0].split('+');
  if (teile.length > 0 && teile[1] != undefined)
  {
    teilObj.add = teile[1].split(',');
  }

  // zum Schluss haben wir die Einsatzklasse
  teilObj.vehGrp = teile[0];
  teilObj.req = getEinsatzklasseFahrzeugliste(teilObj.vehGrp).split(',');
  return teilObj;
}

// hole den Text zur Einsatzliste und hänge eventuell noch zusätzliche und optionale Fahrzeuge an
function makeEKListText(EListe, nurKlasse)
{
  var teilObj = getEKListTeilobjekte(EListe);
  var text = teilObj.vehGrp + ': ' + EinsatzklasseFahrzeugeArr[teilObj.vehGrp].text;
  if (!nurKlasse)
  {
    // eventuell zusätzliche Fahrzeuge
    if (teilObj.add)
    { text += ' + ' + teilObj.add;}
    // eventuell optionale Fahrzeuge
    if (teilObj.opt)
    { text += ', opt: ' + teilObj.opt;}
  }

  return text;
}

// erzeuge einen Text aus der Fahrzeugliste
function getFahrzeugListe(EListe)
{
  var teilObj = getEKListTeilobjekte(EListe);

  var fhzListe = getEinsatzklasseFahrzeugliste(teilObj.vehGrp);
  if (fhzListe != '' && teilObj.add.length > 0) {fhzListe +=','};
  fhzListe += teilObj.add;
  if (teilObj.opt.length > 0) {fhzListe += '|' + teilObj.opt};

  return fhzListe;
}

// fasst mehrere Fahrzeuge mit Anzahl zusammen: LF, LF => 2LF
function condenseFahrzeugliste(fListeArr)
{
  var fCumArr = new Array;
  var fSeqArr = new Array;
  var fListeTxt = '';

  if (settingsArr.condenseVehicles.value)
  { // Einträge je Fahrzeug zählen (Fahrzeuge mit Alternativen werden separat gezählt)
    // für Alternativen bestimmen, wo sie einsortiert werden sollen
    for each (var fhz in fListeArr)
    {
      var f = '';
      var altFhz = fhz.split('/');
      if (altFhz.length > 1)
      { f = altFhz[0] + '*'; }
      else
      { f = fhz }
      if (fCumArr[f] == undefined)
      {
        fCumArr[f] = new Array;
        fCumArr[f].value = 1;
        fCumArr[f].vehicles = fhz;
      }
      else
      {
        fCumArr[f].value++;
      }
    }

    // Liste analog Liste freier Fahrzeuge aufbauen
    for (var fhz in FahrzeugeArr)
    {
      if (fSeqArr[FahrzeugeArr[fhz].vehGrp] == undefined)
      {
        fSeqArr[[FahrzeugeArr[fhz].vehGrp]] = FahrzeugeArr[fhz].vehGrp;
        // noch einen zweiten Eintrag für alternative Fahrzeuge
        fSeqArr[[FahrzeugeArr[fhz].vehGrp] + '*'] = FahrzeugeArr[fhz].vehGrp;
      }
    }

    for (var fSeq in fSeqArr)
    {
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
  }
  else
  {
    fListeTxt = fListeArr.toString();
  }

  return fListeTxt;
}

// hole die Liste der Fahrzeuge zu einer Einsatzklasse
function getEinsatzklasseFahrzeugliste(Einsatzklasse)
{ var eKl = EinsatzklasseFahrzeugeArr[Einsatzklasse]
  if (eKl == undefined)
  {
    return "";
  }
  else
  {
    return eKl.vehicles;
  }
}

// liefere das Stichwort zu einem Einsatz
function getStichwort(Text)
{
  var Stichwort=Text;
  var Teile = Text.split(">");
  if (Teile.length > 1)
  { Stichwort = Teile[1]; }
  Stichwort = Stichwort.trim();
  return Stichwort;
}

function getWikiLinkStw(stw)
{
  var eStw = EinsatzstichwortArr[stw];
  if (eStw == undefined)
  { return "";
  }
  else
  {
    return WikiURL + eStw.wiki;
  }
}

function getWikiLinkFhz(fhz)
{
  var eFhz = FahrzeugeArr[fhz];
  if (eFhz == undefined)
  { return "";
  }
  else
  {
    return WikiURL + eFhz.wiki;
  }
}

function makeDots(Zahl)
{
  var Str = Zahl.toString();
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
{
  // Minimal- und Maximalzeit
  var AnfahrtArr = new Array;
  AnfahrtArr.min = '';
  AnfahrtArr.max = '';

  var TB = document.getElementsByClassName("free_vehicle")[0].getElementsByTagName("table")[0];
  if (!TB) return  AnfahrtArr;
  var Zeilen = TB.getElementsByTagName("tr");

  var imax=0;
  var imin=9999;

  for (var opt=0; opt<Optional.length; opt++)
  { var FZ = Optional[opt];
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;

    for (var i=1; i<Zeilen.length; i++)
    { var ThisZeile = Zeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      if (ThisSpalten.length < 2) continue;
      var ThisFZ = getFahrzeugKlasse(ThisSpalten[2].innerHTML);
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var C = ThisSpalten[0].getElementsByTagName("input")[0];
        var RN = ThisSpalten[1].getElementsByTagName("a")[0];
        if (RN) RN = RN.innerHTML;
        if (C.alt != "x" && RN.substr(0,3).toUpperCase() != "XXX")
        {
          ThisZeile.style.backgroundColor = "#DE18DF";//#444422
//14.04.2011 OrginalsettingsArr.optionalLineColour.value;

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
    AnfahrtArr.max = Zeile.getElementsByTagName("td")[4].innerHTML;
    if (imin != imax)
    { Zeile = Zeilen[imin];
      AnfahrtArr.min = Zeile.getElementsByTagName("td")[4].innerHTML;
    }
  }

  return AnfahrtArr;
}

function AlarmiereFahrzeuge()
{
  ClearFreeVehiclesTable(!CBClicked);
  // Minimal- und Maximalzeit
  var AnfahrtArr = new Array;
  AnfahrtArr.min = '';
  AnfahrtArr.max = '';

  var TB = document.getElementsByClassName("free_vehicle")[0].getElementsByTagName("table")[0];
  if (!TB) return AnfahrtArr;
  var Zeilen = TB.getElementsByTagName("tr");
  var AlarmZeilen = new Array();
  var imax=0;
  var imin=9999;

  for (var ta=0; ta<ToAlarm.length; ta++)
  { var FZ = ToAlarm[ta];
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;

    for (var i=1; i<Zeilen.length; i++)
    { var ThisZeile = Zeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      if (ThisSpalten.length < 2) continue;
      var ThisFZ = getFahrzeugKlasse(ThisSpalten[2].innerHTML);
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var C = ThisSpalten[0].getElementsByTagName("input")[0];
        var RN = ThisSpalten[1].getElementsByTagName("a")[0];
        if (RN) RN = RN.innerHTML;
        if (C.alt != "x" && RN.substr(0,3).toUpperCase() != "XXX")
        {
          if (FirstRun || !CBClicked)
          { C.click();
            AlarmZeilen.push (ThisZeile);
          }
          C.alt="x";
          ThisZeile.style.backgroundColor = "#3f9fff";//#442222 //14.04.2011OrginalsettingsArr.calledLineColour.value;

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
    AnfahrtArr.max = Zeile.getElementsByTagName("td")[4].innerHTML;
    if (imin != imax)
    { Zeile = Zeilen[imin];
      AnfahrtArr.min = Zeile.getElementsByTagName("td")[4].innerHTML;
    }
  }

  if (settingsArr.moveSequenceInStation.value != 'normal')
  { var AlarmWachen = new Array();
    var WachAlarm = new Array();

    for (var i=0; i<AlarmZeilen.length; i++)
    { var ThisZeile = AlarmZeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      var ThisCheckbox = ThisSpalten[0].getElementsByTagName("input")[0];
      var ThisWache = ThisSpalten[3].getElementsByTagName("a")[0].innerHTML;
      var ThisFunkName = ThisSpalten[1].innerHTML;
      var FNEndLink = ThisFunkName.indexOf("</a>");
      var ThisFZUnterwegs = /.*[(]unterwegs[)].*/.test(ThisFunkName);

      if (!ThisFZUnterwegs)
      { if (!WachAlarm[ThisWache])
        { AlarmWachen.push (ThisWache);
          WachAlarm[ThisWache] = Array();
          WachAlarm[ThisWache].erst = "";
          WachAlarm[ThisWache].zweit = "";
        }
        switch(settingsArr.moveSequenceInStation.value)
        {
          case 'trupp':
            if (FahrzeugeArr[ThisSpalten[2].innerHTML].groupVeh)
            { WachAlarm[ThisWache].zweit += "," + i;
            }
            else
            { WachAlarm[ThisWache].erst += "," + i;
            }
            break;
          case 'special' :
            if (FahrzeugeArr[ThisSpalten[2].innerHTML].trainable)
            { WachAlarm[ThisWache].erst += "," + i;
            }
            else
            { WachAlarm[ThisWache].zweit += "," + i;
            }
            break;
        }
      }
    }
    for each (W in AlarmWachen)
    { if (WachAlarm[W].zweit && WachAlarm[W].erst)
      { var StornoZeilen = WachAlarm[W].zweit.split(",");
        for each (SZ in StornoZeilen)
        { if (SZ) AlarmZeilen[SZ].getElementsByTagName("input")[0].click();
        }
      }
    }
  }

  for (ta=ToAlarm.length; ta>=0; ta--)
  { if (ToAlarm[ta]=="gefunden") ToAlarm.splice(ta,1); }

  return AnfahrtArr;
}

// zählt die verfügbaren Fahrzeuge und gibt dies als DOM-Knoten zurück
function zaehleVerfuegbar()
{
  // Array aufbauen, Reihenfolge wie in Fahrzeugklassen
  var ArrFZK = new Array();

  for (F in FahrzeugeArr)
  { var FZK = FahrzeugeArr[F].vehGrp;
    if (ArrFZK.toString().search(FZK) == -1)
    { ArrFZK.push(FZK);
    }
  }

  var AnzFZK=new Array();
  var AnzFZKXXX=new Array();
  for each (FZK in ArrFZK)
  { AnzFZK[FZK]=0;
    AnzFZKXXX[FZK]=0;
  }

  // Freie-Fahrzeuge-Tabelle durchscannen
  var evalTDs = getXPath("./div[@class='free_vehicle']/form/table[@class='defaultTable']/tbody/tr/td[3]", getByID('mission_content'), XPType.SNAPSHOT_ORDERED);
  for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
  { var nodeTD = evalTDs.snapshotItem(iTD);
    FZ = nodeTD.innerHTML.trim();
    var FN=getXPath("../td[1]", nodeTD, XPType.FIRST_ORDERED).singleNodeValue.innerHTML;
    var FZK=getFahrzeugKlasse(FZ);
    if (FN.substr(0,3).toUpperCase()=="XXX")
    { AnzFZKXXX[FZK]++; }
    else
    { AnzFZK[FZK]++; }
  }

  var c = 0;
  var nodeTable = createElement('table',
                                {'border': '0px',
                                 'style': ' color: red;'});
  var nodeTR = createElement('tr');
  nodeTable.appendChild(nodeTR);
  for each (FZ in ArrFZK)
  { if (c == MAXSPALTENVERFUEGBAR)
    { c = 0;
      nodeTR = createElement('tr');
      nodeTable.appendChild(nodeTR);
    }
    c++;
    var nodeTD = createElement('td',
                               {'style': 'border: 0px; text-align: center;',
                                'title'  : NachforderungenArr[FZ].text});
    nodeTR.appendChild(nodeTD);

    var nodeSpan = createElement('span',
                                 {'style': ((AnzFZK[FZ])?'font-weight:bold; font-size:100%;color: #00FF00;':';')});
    nodeTD.appendChild(nodeSpan);
    nodeSpan.appendChild(createText(AnzFZK[FZ]));

    if (AnzFZKXXX[FZ] > 0)
    { nodeSpan = createElement('span',
                               {'class': 'fontSmall'});
      nodeTD.appendChild(nodeSpan);
      nodeSpan.appendChild(createText('+' + AnzFZKXXX[FZ]));
    }
    nodeTD.appendChild(createElement('br'));
    nodeSpan = createElement('span',
                             {'class': 'fontSmall'});
    nodeSpan.appendChild(createText(FZ));
    nodeTD.appendChild(nodeSpan);
  }
  return nodeTable;
}

// Laden der Variablen aus dem Greasemonkey-Speicher
function GetVariables()
{
  // für jedes Element im Array den Wert via Greasemonkey speichern
  for (var setting in settingsArr)
  {
    var gmSetting = GMVAL_PREF_OPT + setting;
    // Optionen noch in alter Form gespeichert
    if (GM_getValue(setting, '##found##') != '##found##')
    {
      settingsArr[setting].value = GM_getValue(setting, settingsArr[setting].valDef);
      if (settingsArr[setting].value != settingsArr[setting].valDef)
      {
        GM_setValue(gmSetting, settingsArr[setting].value);
      }
      GM_deleteValue(setting);
    }
    settingsArr[setting].value = GM_getValue(gmSetting, settingsArr[setting].valDef);
  }

  for (stichwort in EinsatzstichwortArr)
  {
    EinsatzstichwortArr[stichwort].stwCls = EinsatzstichwortArr[stichwort].stwDef;
    EinsatzstichwortArr[stichwort].vbOrdDef =
    EinsatzstichwortArr[stichwort].vbOrder = false;
    var gmValue = GM_getValue(GMVAL_PREF_STW + stichwort);
    if (gmValue != undefined)
    {
      if (gmValue.search(/[=;]/) != -1)
      { var attributes = gmValue.split(';');
        for each (attr in attributes)
        { var keyValue = attr.split('=');
          switch(keyValue[0])
          {
            case 'class'    : EinsatzstichwortArr[stichwort].stwCls = keyValue[1];
                              break;
            case 'vbOrder'  : EinsatzstichwortArr[stichwort].vbOrdDef =
                              EinsatzstichwortArr[stichwort].vbOrder = (keyValue[1]=='true')?true:false;
                              break;
            default         : //Fehler in den Daten
                              break;
          }
        }
      }
      else
      {
        EinsatzstichwortArr[stichwort].stwCls = gmValue;
      }
    }
  }

  for (fahrzeug in EinsatzklasseFahrzeugeArr)
  {
    EinsatzklasseFahrzeugeArr[fahrzeug].vehicles = EinsatzklasseFahrzeugeArr[fahrzeug].vhcDef;
    EinsatzklasseFahrzeugeArr[fahrzeug].text     = EinsatzklasseFahrzeugeArr[fahrzeug].txtDef;
    var gmValue = GM_getValue(GMVAL_PREF_EKL + fahrzeug);
    if (gmValue != undefined)
    {
      if (gmValue.search(/[=;]/) != -1)
      { var attributes = gmValue.split(';');
        for each (attr in attributes)
        { var keyValue = attr.split('=');
          switch(keyValue[0])
          {
            case 'vehicles' : EinsatzklasseFahrzeugeArr[fahrzeug].vehicles = keyValue[1];
                              break;
            case 'text'     : EinsatzklasseFahrzeugeArr[fahrzeug].text = keyValue[1];
                              break;
            default         : //Fehler in den Daten
                              break;
          }
        }
      }
      else
      {
        EinsatzklasseFahrzeugeArr[fahrzeug].vehicles = gmValue;
      }
    }
  }

  ScriptUpdateAvailable = GM_getValue("pleaseUpdate","");
}

// ermittelt, ob es sich um einen Verbandseinsatz handelt
function Verbandseinsatz()
{
  var User="X";
  var ret=false;

  var Obj = getByID("navigation_top");
  if (Obj) Obj = Obj.getElementsByTagName("ul")[0];
  if (Obj) Obj = Obj.getElementsByTagName("ul")[0];
  if (Obj) Obj = Obj.getElementsByTagName("li")[0];
  if (Obj) Obj = Obj.getElementsByTagName("a")[0];
  if (Obj) Obj = Obj.innerHTML;
  if (Obj) User = Obj.replace(/Benutzer: /,"");

  Obj = getByID("mission_content");
  if (Obj) Obj = Obj.getElementsByTagName("table")[0];
  if (Obj)
  { var TRs=Obj.getElementsByTagName("tr");
    for (var t=0;t<TRs.length;t++)
    { var TR=TRs[t];
      if (TR.getElementsByTagName("td").length == 0) {continue;}
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

  return ret;
}

function NowDateString()
{
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

  return R;
}

// prüfen, ob heute bereits ein Update-Check stattgefunden hat:
function updateTest()
{
  var LastUpdate = GM_getValue("LastUpdate","0");
  var heute = NowDateString();

  // wenn ja, nicht noch einmal prüfen
//  if (LastUpdate == heute) return;

  // userscript-Seite öffnen, um Version auszulesen
  GM_xmlhttpRequest
  ( { method: 'GET',
      url: METAURL,
      onload: function(r)
      { if (r.status==200)
        { XML = r.responseText;
          DoUpdateCheck(XML);
        }
      }
    }
  )

  // heute nicht nochmal prüfen
  GM_setValue("LastUpdate",heute);
}

function DoUpdateCheck(XML)
{
  var ThisVersion = GM_getValue("Version","version");
  var OnlineVersion = ParseXMLforVersion(XML);
//mylog("This  = " + ThisVersion + " zu Online = " + OnlineVersion);

  if (ThisVersion != OnlineVersion)
  { GM_setValue("pleaseUpdate",OnlineVersion);
    ScriptUpdateAvailable = OnlineVersion;
  }
  else
  { GM_setValue("pleaseUpdate","");
    ScriptUpdateAvailable = "";
  }
}

// aus XML den Versionsstand herausziehen:
function ParseXMLforVersion(XML)
{
  var versionArr = XML.match(/\/\/\s\@version\s*(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})/);
  if (RegExp.$1 != "")
  {
    return RegExp.$1;
  }
  return '';
}

function init()
{ ichBins = true;
  if (!msgArea)
  { msgArea = createElement('div',
                            {'style': 'color: white;',
                             'id'   : 'msgArea'});
    getByID('container').insertBefore(msgArea, getByID('navigation_top').nextSibling);
  }
  else
  {
    removeChildren(msgArea); // alte Daten löschen
  }

  var userNode = getXPath("//li/ul/li/a[contains(text(), 'Benutzer:')]", getByID('root'), XPType.FIRST_ORDERED).singleNodeValue;
  if (userNode) { user = userNode.innerHTML.trim().replace('Benutzer: ', '').trim(); }




var orderNode = getXPath("//li[contains(./a/text(), 'Einsätze')]/ul/li[1]", getByID('root'), XPType.FIRST_ORDERED).singleNodeValue;
  if (orderNode) { [, order] = /Einsatzart: \"(.*)\"/.exec(orderNode.innerHTML.trim()); }


  ToAlarm="";
  NichtVerf="";

  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  GetVariables();
  //rescue: Update ausgehängt
  /*if (settingsArr.checkForUpdates.value)
  { updateTest();
  }*/

  if (getByID('ereglamsAAOConfig') == undefined )
  { // eigene StyleSheets anlegen
    GM_addStyle('.aaoMenu\n\
{\n\
  color:#FFF8D7;\
  float:left;\
  font-size:12px;\
  list-style:none outside none;\
  margin:0 1px 0 0;\
  text-align:center;\
  width:121px;\
}\n\
table.ereglamTable\n\
{\n\
  border:1px solid #56616C;\
  border-collapse:collapse;\
  margin:5px 0;\
  width:100%;\
}\n\
table.ereglamTable tr\n\
{\n\
  border:1px solid #56616C;\
}\n\
table.ereglamTable th\n\
{\n\
  background-color:#424D58;\
  border:1px solid #56616C;\
  text-align:center;\
}\n\
table.ereglamTable td\n\
{\n\
  border:1px solid #56616C;\
  padding:1px 5px;\
  text-align:left;\
}\n\
table.FMS\n\
{\n\
  border:1px solid black;\
  border-color: black lightgray lightgray black;\
  -moz-border-radius: 3px;\
}\n\
table.raised\n\
{\n\
  border:1px solid;\
  border-color: lightgray black black lightgray;\
  -moz-border-radius: 7px;\
}\n\
table.FMS tr\n\
{\n\
  border: none;\
}\n\
table.FMS td\n\
{\n\
  border: none;\
  padding:1px 4px;\
  font-family: arial;\
  font-size: smaller;\
  text-align: center;\
}\n\
table td.pressed\n\
{\n\
  border:1px solid;\
  border-color: black lightgray lightgray black;\
  -moz-border-radius: 1px;\
  line-height: 13px;\
}\n\
table td.raised\n\
{\n\
  border:1px solid;\
  border-color: lightgray black black lightgray;\
  -moz-border-radius: 1px;\
  line-height: 13px;\
}\n'+
((!layoutNew)?
'div.statusbar\n\
{\n\
  background-color: red;\
}\n\
div.statusbar_inner\n\
{\n\
  background-color: green;\
}\n':'')+
'.WikiLink\n\
{\n\
  font-size: 10px;\
  padding: 5px;\
  border: 1px solid;\
  border-color: lightgray black black lightgray;\
  -moz-border-radius: 5px;\
  background-color: #424D58;\
}\n\
.WikiLinkDark\n\
{\n\
  font-size: 10px;\
  padding: 3px;\
  border: 1px solid;\
  border-color: lightgray black black lightgray;\
  -moz-border-radius: 3px;\
  background-color: #1A1B1F;\
}');
    // Link zu den Optionen setzen
    var nodeP = createElement('p',
                              {'id'  : 'ereglamsAAOConfig'});
    var nodeA = createElement('a',
                              {'href': '/ereglamsAAOConfig'});
    nodeP.appendChild(nodeA);
    nodeA.appendChild(createText(' Thomas AAO Einstellungen'));
    var footer = getByID((layoutNew)?'footerLeft':'footer');
    footer.appendChild(createElement('br'));
    footer.appendChild(nodeP);
  }
  ichBins = false;
}

function buildFMS(node, lines)
{
  var FMSStatus = '';
   var linksArr = {};

  // möglichen Link merken
  var nodeA = node.getElementsByTagName('a')[0];
  if (nodeA)
  { nodeA = nodeA.cloneNode(true);
    if (/.*\/vehicle_to_user\/driveBack\/vehicle_to_user_id\/\d+$/.test(nodeA.href))
    { linksArr['1'] = nodeA;
    }
    else if (/.*\/vehicle_to_user\/changeState\/fms\/(\d+)\/vehicle_to_user_id\/\d+$/.test(nodeA.href))
    { linksArr[RegExp.$1] = nodeA;
    }
  }

  // Knotentext zerlegen
  var texts = node.innerHTML.split('<');
  var text = texts[0].trim();
  switch (text)
  { case "Frei (Dienstfahrt)":      FMSstatus = '1';
                                    break;
    case "Einsatzbereit auf Wache": FMSstatus = '2';
                                    break;
    case "Auf dem Weg zum Einsatz": FMSstatus = '3';
                                    break;
    case "Ankunft am Einsatzort":   FMSstatus = '4';
                                    break;
    case "Nicht einsatzbereit":
    case "Außer Dienst":            FMSstatus = '6';  // zählt Beides als nicht einsatzbereit
                                    break;
    case "Patient aufgenommen":     FMSstatus = '7';
                                    break;
  }
  var nodeTable = createElement('table',
                                {'class':'raised',
                                 'style': 'width: 100%;'});
  var nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);
  var nodeTR = createElement('tr');
  nodeTBody.appendChild(nodeTR);
  switch(lines)
  {
    case '1':
      var nodeTD = createElement('td',
                                 {'style': 'border-color: none;'});
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(FMSkeyPad(FMSstatus, linksArr, lines)); //FMSTastatur
      nodeTD = createElement('td',
                             {'rowspan' : 2,
                              'style' : 'width: 100%;'});
      nodeTD.className = 'pressed';
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText(text));
      nodeTR = createElement('tr');
      nodeTBody.appendChild(nodeTR);
      nodeTD = createElement('td',
                             {'style' : 'font-family: courier; font-size: smaller;'});
      nodeTD.className = 'pressed';
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText('STATUS_' + FMSstatus));
      break;
    case '2':
    case '3':
    case '4':
      var nodeTD = createElement('td',
                                  {'rowspan': 2,
                                   'style': 'border-style: none;'});
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(FMSkeyPad(FMSstatus, linksArr, lines)); //FMSTastatur
      nodeTD = createElement('td',
                             {'style' : 'font-family: courier; width: 100%;'});
      nodeTD.className = 'pressed';
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText('STATUS_' + FMSstatus));
      nodeTR = createElement('tr');
      nodeTBody.appendChild(nodeTR);
      nodeTD = createElement('td',
                             {'style' : 'font-size: smaller;'});
      nodeTD.className = 'pressed';
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText(text));
  }

  return nodeTable;
}

function FMSkeyPad(status, linksArr, lines)
{
  var orientationArr = { '1': {cells: 12, array: ['I', '0', 'II', '1', '2', '3', '4', '5', '6', '7', '8', '9']},
                         '2': {cells:  6, array: ['I', '0', '1', '2', '3', '4', 'II', '5', '6', '7', '8', '9']},
                         '3': {cells:  4, array: ['I', '1', '2', '3', '0', '4', '5', '6', 'II', '7', '8', '9']},
                         '4': {cells:  3, array: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'I', '0', 'II']}};
  var orientation = orientationArr[lines];
  var cnt = 0;

  var nodeTable = createElement('table',
                                {'class': 'FMS'});
  var nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);
  var nodeTR = createElement('tr');
  nodeTBody.appendChild(nodeTR);
  for each(fms in orientation.array)
  {
    if (cnt == orientation.cells)
    { nodeTR = createElement('tr');
      nodeTBody.appendChild(nodeTR);
      cnt = 0;
    }
    var nodeTD = createElement('td',
                               {'title': FMSStatusArr[fms].text});
    nodeTD.className = 'raised';
    nodeTR.appendChild(nodeTD);
    var nodeA;
    var linkStatus = '';
    if (linksArr[fms])
    { linkStatus = fms;
    }
    switch(fms)
    { case status :
        nodeTD.style.color = FMSStatusArr[fms].tcol;
        nodeTD.style.backgroundColor = FMSStatusArr[fms].bcol;
        nodeTD.appendChild(createText(fms));
        nodeTD.className = 'pressed';
        break;
      case linkStatus:
        nodeTD.style.color = FMSStatusArr[fms].tcol;
        nodeTD.style.backgroundColor = FMSStatusArr[fms].bcol;
        var nodeA = linksArr[fms];
        nodeA.title = nodeA.innerHTML;
        removeChildren(nodeA);
        nodeA.appendChild(createText(fms));
        nodeA.style.color  = FMSStatusArr[fms].tcol;
        nodeTD.appendChild(nodeA);
        break;
      case '0' :
        nodeTD.style.color = FMSStatusArr[fms].tcol;
        nodeTD.style.backgroundColor = FMSStatusArr[fms].bcol;
        var nodeA = createElement('a');
        nodeA.title = FMSStatusArr[fms].text;
        nodeA.href = 'javascript:alert("Du hast den Notruf ausgelöst! Nun wird das Funkgerät für 30 Sekunden durchgeschaltet.")';
        nodeA.appendChild(createText(fms));
        nodeA.style.color  = FMSStatusArr[fms].tcol;
        nodeTD.appendChild(nodeA);
        break;
      case 'I' :
      case 'II':
        nodeTD.style.color = FMSStatusArr[fms].tcol;
        nodeTD.style.backgroundColor = FMSStatusArr[fms].bcol;
        nodeTD.appendChild(createText(fms));
        break;
      default :
        nodeTD.appendChild(createText(fms));
    }
    cnt++;
  }

  return nodeTable;
}

// erstellt die Konfigurationsseite
function bearbeiteConfigSeite()
{
  var contentNode = getByID('content');
  removeChildren(contentNode);

  // Navigationsmenü
  contentNode.appendChild(createAAOConfigMenu());

  // Überschrift
  var nodeH1 = createElement('h1');
  var nodeA = createElement('a',
                            {'href'  : 'http://userscripts.org/users/ereglam',
                             'target': '_blank'});
  nodeH1.appendChild(nodeA);
  nodeA.appendChild(createText("Ereglam"));
  nodeH1.appendChild(createText("\'s AAO Einstellungen"));
  document.title = "Ereglam\'s AAO Einstellungen";
  contentNode.appendChild(nodeH1);
  contentNode.appendChild(createText("\
Hier besteht die Möglichkeit, Optionen zu verschiedenen Seiten zu pflegen. \n\
Es werden nur die Werte gespeichert, die von der Vorgabe im Script abweichen."));

  // weiter Informationen
  var nodeDiv = createElement('div');
  contentNode.appendChild(nodeDiv);
  nodeDiv.appendChild(createText("Weitere Informationen unter "));
  var nodeA = createElement('a',
                            {'href'  : UPDATEURL,
                             'target': '_blank'});
  nodeA.appendChild(createText(UPDATEURL));
  nodeDiv.appendChild(nodeA);

  for (var settingsGroup in settingsGroupArr)
  {
    var nodeDiv = createElement('div');
    contentNode.appendChild(nodeDiv);
    var nodeH2 = createElement('h2');
    nodeDiv.appendChild(nodeH2);
    nodeH2.appendChild(createText(settingsGroupArr[settingsGroup]));

    for (var setting in settingsArr)
    {
      if (settingsArr[setting].group == settingsGroup )
      {
        nodeSetting = createConfigLine(setting, settingsArr[setting].value, settingsArr[setting].type, settingsArr[setting].length, settingsArr[setting].text, settingsArr[setting].list);
        nodeDiv.appendChild(nodeSetting);
        nodeDiv.appendChild(createElement('br'));
      }
    }
  }

  // Button Speichern
  contentNode.appendChild(createElement('br'));
  nodeDiv = createElement('div');
  nodeDiv.id = 'ereglamsInfo';
  contentNode.appendChild(nodeDiv);
  var saveConfigNode = createElement('input',
                                     {'type' : 'button',
                                      'class': 'button',
                                      'name' : 'commit',
                                      'value': ' speichern '});
  saveConfigNode.addEventListener('click', saveConfig, false);
  contentNode.appendChild(saveConfigNode);
}

// Menü für die Konfiguration
function createAAOConfigMenu()
{
  // Zeichenkette für Suche reduzieren
  docPath = location.pathname;

  var nodeDiv = createElement('div');
  var nodeUl = createElement('ul');
  nodeDiv.appendChild(nodeUl);
  // Konfiguration Einsätze
  var nodeLi = createElement('li',
                             {'class': 'aaoMenu'});
  nodeUl.appendChild(nodeLi);
  if (docPath == '/ereglamsAAOConfig')
  { var nodeAB = createElement('b');
  }
  else
  { var nodeAB = createElement('a',
                               {'href': '/ereglamsAAOConfig'});
  }
  nodeAB.appendChild(createText('Konfiguration'));
  nodeLi.appendChild(nodeAB);
  // Konfiguration Einsätze
  var nodeLi = createElement('li',
                             {'class': 'aaoMenu'});
  nodeUl.appendChild(nodeLi);
  if (docPath == '/ereglamsAAO\/Einsaetze')
  { var nodeAB = createElement('b');
  }
  else
  { nodeAB = createElement('a',
                           {'href': '/ereglamsAAO/Einsaetze'});
  }
  nodeAB.appendChild(createText('Einsätze'));
  nodeLi.appendChild(nodeAB);
  // Konfiguration Einsatzklassen
  var nodeLi = createElement('li',
                             {'class': 'aaoMenu'});
  nodeUl.appendChild(nodeLi);
  if (docPath == '/ereglamsAAO\/Einsatzklassen')
  { var nodeAB = createElement('b');
  }
  else
  { nodeAB = createElement('a',
                           {'href': '/ereglamsAAO/Einsatzklassen'});
  }
  nodeAB.appendChild(createText('Einsatzklassen'));
  nodeLi.appendChild(nodeAB);
  // Konfiguration Fahrzeuggruppen
  var nodeLi = createElement('li',
                             {'class': 'aaoMenu'});
  nodeUl.appendChild(nodeLi);
  if (docPath == '/ereglamsAAO\/Fahrzeuggruppen')
  { var nodeAB = createElement('b');
  }
  else
  { nodeAB = createElement('a',
                           {'href': '/ereglamsAAO/Fahrzeuge'});
  }
  nodeAB.appendChild(createText('Fahrzeuge'));
  nodeLi.appendChild(nodeAB);
  nodeDiv.appendChild(createElement('br'));
  nodeDiv.appendChild(createElement('br'));

  return nodeDiv;
}

// Zeile zu einer Einstellung anlegen
function createConfigLine(name, value, type, len, text, list)
{
  var nodeSpan = createElement('span');
  nodeSpan.id = name;

  switch(type)
  {
    case 'BOOL' :
      // Checkbox
      var nodeInput = createElement('input',
                                    { 'name' : name,
                                      'id'   : 'chk_' + name,
                                      'type' : 'checkbox'});
      nodeInput.checked = value;
      nodeSpan.appendChild(nodeInput);

      // Text
      var nodeLabel = createElement('label',
                                    {'for': 'chk_' + name});
      nodeLabel.appendChild(createText(' ' + text));
      nodeSpan.appendChild(nodeLabel);
      break;
    case 'RAD' :
      // Radio-Button
      var radElems = splitRadioButtonText(text);
      // Text
      nodeSpan.appendChild(createText(radElems.text + ': '));
      for (radVal in radElems.buttons)
      {
        var nodeInput = createElement('input',
                                      { 'name'  : name,
                                        'id'    : 'rad_' + name + '.' + radVal,
                                        'type'  : 'radio',
                                        'value' : radVal});
        if(value == radVal)
        {
          nodeInput.defaultChecked = true;
        }
        nodeSpan.appendChild(nodeInput);

        // Text
        var nodeLabel = createElement('label',
                                      {'for': 'rad_' + name + '.' + radVal});
        nodeLabel.appendChild(createText(' ' + radElems.buttons[radVal] + ' '));
        nodeSpan.appendChild(nodeLabel);
        addEntityText(nodeSpan, '&nbsp;&nbsp;');
      }
      break;
    case 'LIST':
      // Text
      nodeSpan.appendChild(createText(text + ': '));
      var nodeSel = createElement('select',
                                  { 'name'  : name,
                                    'id'    : 'sel_' + name});
      for (key in list)
      {
        var nodeOpt = new Option();
        nodeOpt.name  =
        nodeOpt.value = key;
        nodeOpt.appendChild(createText(list[key]));
        if (value == key)
        { nodeOpt.selected = true;
        }
        nodeSel.add(nodeOpt, null);
      }
      nodeSpan.appendChild(nodeSel);
      break;
    case 'INT' :
      // Text
      var nodeLabel = createElement('label',
                                    {'for': 'val_' + name});
      nodeLabel.appendChild(createText(text));
      nodeSpan.appendChild(nodeLabel);
      addEntityText(nodeSpan, '&nbsp;');

      // Integerwert
      var nodeInput = createElement('input',
                                    { 'name'     : name,
                                      'id'       : 'val_' + name,
                                      'type'     : 'text',
                                      'style'    : 'text-align: right;',
                                      'size'     : len,
                                      'length'   : len,
                                      'maxLength': len});
      nodeInput.defaultValue = value;
      nodeSpan.appendChild(nodeInput);
      break;
    case 'STR' :
      // Text
      var nodeLabel = createElement('label',
                                    {'for': 'str_' + name});
      nodeLabel.appendChild(createText(text));
      nodeSpan.appendChild(nodeLabel);
      addEntityText(nodeSpan, '&nbsp;');

      // Zeichenkette
      var nodeInput = createElement('input',
                                    { 'name'     : name,
                                      'id'       : 'str_' + name,
                                      'type'     : 'text',
                                      'style'    : 'text-align: left;',
                                      'size'     : len,
                                      'length'   : len,
                                      'maxLength': len});
      nodeInput.defaultValue = value;
      nodeSpan.appendChild(nodeInput);
      break;
    default:
      nodeSpan.appendChild(createText("Typ \'" + type + "' für Option '" + name + "' nicht unterstützt"));
  }

  return nodeSpan;
}

function bearbeiteAAOEinsaetze()
{
  var stichwortArr = new Array;
  var contentNode = getByID('content');
  removeChildren(contentNode);

  // Navigationsmenü
  contentNode.appendChild(createAAOConfigMenu());

  // Vorbereitungen
  // Sortierung
  for (var stichwort in EinsatzstichwortArr)
  {
    stichwortArr.push(stichwort);
  }
  stichwortArr.sort();
  // Selektionsauswahl
  nodeSelect = createElement('select',
                            {'class': 'fontSmall',
                             'style': 'width: 200px;',
                             'title': 'Tooltipp in Liste zeigt Fahrzeuge'});
  for (var eKlasse in EinsatzklasseFahrzeugeArr)
  { if (eKlasse == 'undef')
    { continue; }
    nodeOption = createElement('option');
    nodeOption.value = eKlasse;
    nodeOption.text  = eKlasse + ': ' + EinsatzklasseFahrzeugeArr[eKlasse].text;
    nodeOption.title = condenseFahrzeugliste(EinsatzklasseFahrzeugeArr[eKlasse].vehicles.split(','));
    nodeSelect.add(nodeOption, null); // hinten anhängen
  }

 // Überschrift
  var nodeH1 = createElement('h1');
  var nodeA = createElement('a',
                            {'href'  : 'http://userscripts.org/users/ereglam',
                             'target': '_blank'});
  nodeA.appendChild(createText("Ereglam"));
  nodeH1.appendChild(nodeA);
  nodeH1.appendChild(createText("\'s AAO Einsatzzuordnung"));
  document.title = "Ereglam\'s AAO Einsatzzuordnung";
  contentNode.appendChild(nodeH1);
  contentNode.appendChild(createText("\
Hier besteht die Möglichkeit, die Zuordnung von Stichworten zu Einsatzklasse und zusätzlichen, sowie optionalen Fahrzeugen zu pflegen. \n\
Zur Eingabe der zusätzlichen/optionalen Fahrzeuge dürfen als Trennzeichen nur ',' und '/' (für Alternativen) verwendet werden: z.B. 'LF,LF'. \
Die gültigen Fahrzeuggruppen seht Ihr unter "));
  nodeA = createElement('a',
                        {'href'  : '/ereglamsAAO/Fahrzeuge'});
  nodeA.appendChild(createText('Fahrzeuge'));
  contentNode.appendChild(nodeA);

  var nodeTable = createElement('table',
                                {'class': 'ereglamTable'});
  contentNode.appendChild(nodeTable);
  var nodeTBody = createElement('thead');
  nodeTable.appendChild(nodeTBody);
  var nodeTR = createElement('tr');
  nodeTBody.appendChild(nodeTR);
  var nodeTD = createElement('th',
                             {'style': 'width: 240px;',
                              'title': 'Einsatzmeldung'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Einsatzstichwort'));
  nodeTD = createElement('th',
                         {'class': 'fontSmall',
                          'title': 'Unwettereinsatz'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Unw'));
  nodeTD = createElement('th',
                         {'style': 'width: 200px;',
                          'title': 'Einsatzklasse'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Einsatzklasse'));
  nodeTD = createElement('th',
                         {'style': 'width: 130px;',
                          'title': 'zusätzliche Fahrzeuge'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('zus. Fahrz.'));
  nodeTD = createElement('th',
                         {'style': 'width: 130px;',
                          'title': 'optionale Fahrzeuge'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('opt. Fahrz.'));
  nodeTD = createElement('th',
                         {'class': 'fontSmall',
                          'title': 'modifiziert'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('mod.'));



nodeTD = createElement('th',
                         {'class': 'fontSmall',
                          'title': 'Verbandsauftrag'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('VbAuf'));







  var nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);
  for each (var stichwort in stichwortArr)
  {
    var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    // Einsatzstichwort
    var nodeTD = createElement('th',
                               {'style': 'text-align: left;'});
    nodeTR.appendChild(nodeTD);
    var nodeA = createElement('a',
                              {'href'  : getWikiLinkStw(stichwort),
                               'target': '_blank'});
    nodeA.appendChild(createText('W'));
    var nodeSpan = createElement('span',
                                 {'class' : 'WikiLinkDark',
                                  'title' : getWikiLinkStw(stichwort)});
    nodeSpan.appendChild(nodeA);
    nodeTD.appendChild(nodeSpan);
    addEntityText(nodeTD, '&nbsp;');
    nodeTD.appendChild(createText(stichwort));
    // Unwetter
    nodeTD = createElement('td',
                           {'class': 'fontSmall'});
    nodeTR.appendChild(nodeTD);
    var nodeChkbox = createElement('input',
                                   {'type' : 'checkbox'});
    nodeChkbox.checked = EinsatzstichwortArr[stichwort].storm;
    nodeChkbox.disabled = false;
    nodeChkbox.id = 'unw.' + stichwort;
    nodeTD.appendChild(nodeChkbox);
    // Einsatzklasse
    var teilObj = getEKListTeilobjekte(EinsatzstichwortArr[stichwort].stwCls);
    nodeTD = createElement('td',
                           {'class': 'fontSmall'});
    nodeTR.appendChild(nodeTD);
    var nodeSelectTmp = nodeSelect.cloneNode(true);
    nodeSelectTmp.id = 'sel.' + stichwort;
    // noch den aktuellen Wert für die Selektionsauswahl einstellen
    for each (opt in nodeSelectTmp.options)
    { if (opt.value == teilObj.vehGrp)
      { opt.selected = true;
        break;
      }
    }
    nodeTD.appendChild(nodeSelectTmp);
    // zusätzliche Fahrzeuge
    nodeTD = createElement('td',
                           {'class': 'fontSmall'});
    nodeTR.appendChild(nodeTD);
    var nodeInput = createElement('input',
                                  {'style': 'width: 120px;',
                                   'class': 'fontSmall',
                                   'id'   : 'add.' + stichwort,
                                   'type' : 'text'});
    nodeInput.defaultValue =
    nodeInput.value        = teilObj.add.toString();
    nodeTD.appendChild(nodeInput);
    // optionale Fahrzeuge
    nodeTD = createElement('td',
                           {'class': 'fontSmall'});
    nodeTR.appendChild(nodeTD);
    nodeInput = createElement('input',
                              {'style': 'width: 120px;',
                               'class': 'fontSmall',
                               'id'   : 'opt.' + stichwort,
                               'type' : 'text'});
    nodeInput.defaultValue =
    nodeInput.value = teilObj.opt.toString();
    nodeTD.appendChild(nodeInput);
    // Reset-Funktion
    nodeTD = createElement('td',
                           {'id': 'rst.' + stichwort});
    nodeTR.appendChild(nodeTD);
    if (EinsatzstichwortArr[stichwort].stwCls != EinsatzstichwortArr[stichwort].stwDef)
    {
      nodeTD.appendChild(getNodeResetStw(stichwort));
    }

 // Verbandsauftrag
    nodeTD = createElement('td',
                           {'class': 'fontSmall'});
    nodeTR.appendChild(nodeTD);
    var nodeChkbox = createElement('input',
                                   {'type' : 'checkbox'});
    nodeChkbox.checked = EinsatzstichwortArr[stichwort].vbOrder;
    nodeChkbox.id = 'vb.' + stichwort;
    nodeTD.appendChild(nodeChkbox);


  }

  // Button Speichern
  contentNode.appendChild(createElement('br'));
  nodeDiv = createElement('div',
                          {'id': 'ereglamsEStichworte'});
  contentNode.appendChild(nodeDiv);
  var saveConfigNode = createElement('input',
                                     {'type' : 'button',
                                      'class': 'button',
                                      'name' : 'commit',
                                      'value': ' speichern '});
  saveConfigNode.addEventListener('click', saveEStichworte, false);
  contentNode.appendChild(saveConfigNode);
}

function bearbeiteAAOEinsatzklassen()
{
  var contentNode = getByID('content');
  removeChildren(contentNode);

  // Navigationsmenü
  contentNode.appendChild(createAAOConfigMenu());

 // Überschrift
  var nodeH1 = createElement('h1');
  var nodeA = createElement('a',
                            {'href'  : 'http://userscripts.org/users/ereglam',
                             'target': '_blank'});
  nodeA.appendChild(createText("Ereglam"));
  nodeH1.appendChild(nodeA);
  nodeH1.appendChild(createText("\'s AAO Einsatzklassen"));
  document.title = "Ereglam\'s AAO Einsatzklassen";
  contentNode.appendChild(nodeH1);
  contentNode.appendChild(createText("\
Hier kann man die Fahrzeuge, die einer Einsatzklassen zugeordnet sind, ändern. \
Zur Eingabe der Fahrzeuge dürfen als Trennzeichen nur ',' und '/' (für Alternativen) verwendet werden: z.B. 'LF,LF'. \
Die gültigen Fahrzeuggruppen seht Ihr unter 'Fahrzeuggruppen'"));
  contentNode.appendChild(createElement('br'));
  contentNode.appendChild(createText("\
Im Text sind folgende Zeichen nicht erlaubt: < > ; ="));
  contentNode.appendChild(createElement('br'));
  contentNode.appendChild(createText("\
Das eigene Anlegen von Einsatzklassen ist (noch) nicht möglich."));

  var nodeTable = createElement('table',
                                {'class': 'ereglamTable'});
  contentNode.appendChild(nodeTable);
  var nodeTBody = createElement('thead');
  nodeTable.appendChild(nodeTBody);
  var nodeTR = createElement('tr');
  nodeTBody.appendChild(nodeTR);
  var nodeTD = createElement('th',
                             {'style': 'width: 120px;',
                              'title': 'Einsatzstichwort'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Einsatzstichwort'));
  nodeTD = createElement('th',
                         {'style': 'width: 250px;',
                          'colspan' : '2',
                          'title': 'Text zum Stichwort'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Text'));
  nodeTD = createElement('th',
                         {'style': 'width: 250px;',
                          'colspan' : '2',
                          'title': 'zu alarmierende Fahrzeuge zum Stichwort'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Fahrzeuge'));

  var nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);
  for (eKlasse in EinsatzklasseFahrzeugeArr)
  {
    var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    // Einsatzklasse
    var nodeTD = createElement('th',
                               {'style': 'text-align: left;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(eKlasse));
    // Reset-Funktion
    nodeTD = createElement('td',
                           {'id': 'rtx.' + eKlasse});
    nodeTR.appendChild(nodeTD);
    if (EinsatzklasseFahrzeugeArr[eKlasse].text != EinsatzklasseFahrzeugeArr[eKlasse].txtDef)
    {
      nodeTD.appendChild(getNodeResetEkl(eKlasse, true));
    }
    // Text zur Einsatzklasse
    nodeTD = createElement('td');
    nodeTD.setAttribute('class', 'fontSmall');
    nodeTR.appendChild(nodeTD);
    nodeInput = createElement('input',
                              {'class': 'fontSmall',
                               'style': 'width: 250px;',
                               'id'   : 'etx.' + eKlasse,
                               'type' : 'text'});
    nodeInput.defaultValue =
    nodeInput.value        = EinsatzklasseFahrzeugeArr[eKlasse].text;
    nodeTD.appendChild(nodeInput);
    // Reset-Funktion
    nodeTD = createElement('td',
                           {'id': 'rcl.' + eKlasse});
    nodeTR.appendChild(nodeTD);
    if (EinsatzklasseFahrzeugeArr[eKlasse].vehicles != EinsatzklasseFahrzeugeArr[eKlasse].vhcDef)
    {
      nodeTD.appendChild(getNodeResetEkl(eKlasse, false));
    }
    // Fahrzeugliste
    nodeTD = createElement('td',
                              {'class': 'fontSmall'});
    nodeTR.appendChild(nodeTD);
    nodeInput = createElement('input',
                              {'class': 'fontSmall',
                               'style': 'width: 250px;',
                               'id'   : 'ecl.' + eKlasse,
                               'type' : 'text'});
    nodeInput.defaultValue =
    nodeInput.value        = EinsatzklasseFahrzeugeArr[eKlasse].vehicles;
    nodeTD.appendChild(nodeInput);
  }

  // Button Speichern
  contentNode.appendChild(createElement('br'));
  nodeDiv = createElement('div',
                          {'id': 'ereglamsEKlasse'});
  contentNode.appendChild(nodeDiv);
  var saveConfigNode = createElement('input',
                                     {'type' : 'button',
                                      'class': 'button',
                                      'name' : 'commit',
                                      'value': ' speichern '});
  saveConfigNode.addEventListener('click', saveEKlasse, false);
  contentNode.appendChild(saveConfigNode);
}

function bearbeiteAAOFahrzeuge()
{
  var contentNode = getByID('content');
  removeChildren(contentNode);

  // Navigationsmenü
  contentNode.appendChild(createAAOConfigMenu());

  // Vorbereitungen
  // Selektionsauswahl Fahrzeuggruppe
  nodeSelGrp = createElement('select',
                             {'class': 'fontSmall',
                              'style': 'width: 200px;'});
  for (var fhzGrp in NachforderungenArr)
  { if (fhzGrp == 'undef')
    { continue; }
    nodeOptionGrp = new Option();
    nodeOptionGrp.value = fhzGrp;
    nodeOptionGrp.text  = fhzGrp + ': ' + NachforderungenArr[fhzGrp].text;
    nodeSelGrp.add(nodeOptionGrp, null); // hinten anhängen
  }
  // Selektionsauswahl Reihenfolge
  nodeSelSeq = createElement('select',
                             {'class': 'fontSmall',
                              'style': 'width: 200px;'});
  i = 0;
  for (var fhzGrp in NachforderungenArr)
  { i++;
    nodeOptionSeq = new Option();
    nodeOptionSeq.value = i;
    nodeOptionSeq.text  = i + '.';
    nodeSelSeq.add(nodeOptionSeq, null); // hinten anhängen
  }

// Überschrift
  var nodeH1 = createElement('h1');
  var nodeA = createElement('a',
                            {'href'  : 'http://userscripts.org/users/ereglam',
                             'target': '_blank'});
  nodeA.appendChild(createText("Ereglam"));
  nodeH1.appendChild(nodeA);
  nodeH1.appendChild(createText("\'s AAO Fahrzeuge"));
  document.title = "Ereglam\'s AAO Fahrzeuge und Fahrzeuggruppen";
  contentNode.appendChild(nodeH1);
  nodeH2 = createElement('h2');
  nodeH2.appendChild(createText("Fahrzeuge"));
  contentNode.appendChild(nodeH2);
  contentNode.appendChild(createText("\
Jedem Fahrzeug ist eine Fahrzeuggruppe zugeordnet, so dass mehrere Fahrzeuge (z.B. LF's) gemeinsam behandelt werden können."));

  var nodeTable = createElement('table',
                                {'class': 'ereglamTable'});
  contentNode.appendChild(nodeTable);
  var nodeTBody = createElement('thead');
  nodeTable.appendChild(nodeTBody);
  var nodeTR = createElement('tr');
  nodeTBody.appendChild(nodeTR);
  var nodeTD = createElement('th',
                             {'style': 'width: 200px;',
                              'title' : 'Fahrzeug'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Fahrzeug'));
  nodeTD = createElement('th',
                         {'title' : 'Geschwindigkeit des Fahrzeugs'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Geschw.'));
  nodeTD = createElement('th',
                         {'title' : 'Fahrzeug hat Löschgruppenbesatzung'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('GrpFhz'));
  nodeTD = createElement('th',
                         {'title' : 'Fahrzeug benötigt ausgebildetes Personal'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Ausbild.'));
  nodeTD = createElement('th',
                         {'title' : 'Fahrzeuggruppe'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Gruppe'));

  var nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);
  for (fhz in FahrzeugeArr)
  {
    var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    // Bezeichnung
    var nodeTD = createElement('th',
                               {'style': 'text-align: left;'});
    nodeTR.appendChild(nodeTD);
    nodeA = createElement('a',
                          {'href'  : getWikiLinkFhz(fhz),
                           'target': '_blank'});
    nodeA.appendChild(createText('W'));
    var nodeSpan = createElement('span',
                                 {'class' : 'WikiLinkDark',
                                  'title' : getWikiLinkFhz(fhz)});
    nodeSpan.appendChild(nodeA);
    nodeTD.appendChild(nodeSpan);
    addEntityText(nodeTD, '&nbsp;');
    nodeTD.appendChild(createText(fhz));
    //Geschwindigkeit
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(FahrzeugeArr[fhz].speed + ' km/h'));
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    var nodeChkbox = createElement('input',
                                   {'type' : 'checkbox'});
    nodeChkbox.checked = FahrzeugeArr[fhz].groupVeh;
    nodeChkbox.disabled = true;
    nodeTD.appendChild(nodeChkbox);
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    var nodeChkbox = createElement('input',
                                   {'type' : 'checkbox'});
    nodeChkbox.checked = FahrzeugeArr[fhz].trainable;
    nodeChkbox.disabled = true;
    nodeTD.appendChild(nodeChkbox);
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    var nodeSelTmp = nodeSelGrp.cloneNode(true);
    nodeSelTmp.id = 'sel.' + fhz;
    nodeSelTmp.disabled = true; // für's Erste deaktivieren
    // noch den aktuellen Wert für die Selektionsauswahl einstellen
    for each (opt in nodeSelTmp.options)
    { if (opt.value == FahrzeugeArr[fhz].vehGrp)
      { opt.selected = true;
        break;
      }
    }
    nodeTD.appendChild(nodeSelTmp);
  }

 // Überschrift
  nodeH2 = createElement('h2');
  nodeH2.appendChild(createText("Fahrzeuggruppen"));
  contentNode.appendChild(nodeH2);
  contentNode.appendChild(createText("\
Die Fahrzeuggruppen definieren, welche Fahrzeuge bei der Alarmierung gemeinsam behandelt werden. \
Weiterhin wird über die Fahrzeuggruppen die Reihenfolge bestimmt, in der sie dargestellt werden."));
  contentNode.appendChild(createElement('br'));
  contentNode.appendChild(createText("\
Zur Suche nach nachzufordernden Fahrzeugen wird das Suchmuster der Fahrzeuggruppe ausgewertet."));

  var nodeTable = createElement('table',
                                {'class': 'ereglamTable'});
  contentNode.appendChild(nodeTable);
  var nodeTBody = createElement('thead');
  nodeTable.appendChild(nodeTBody);
  var nodeTR = createElement('tr');
  nodeTBody.appendChild(nodeTR);
  var nodeTD = createElement('th',
                             {'style': 'width: 200px;',
                              'title' : 'Fahrzeuggruppe'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Fahrzeuggruppe'));
  nodeTD = createElement('th',
                         {'title' : 'im Script verwendete Abkürzung'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Abk.'));
  nodeTD = createElement('th',
                         {'title' : 'regulärer Ausdruck, der zur Suche nach Nachforderungen dieser Gruppe benutzt wird'});
  nodeTR.appendChild(nodeTD);
  nodeTD.appendChild(createText('Suchmuster für Nachforderungen'));

  var nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);
  for (fhzGrp in NachforderungenArr)
  {
    var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'text-align: left;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(NachforderungenArr[fhzGrp].text));
    nodeTD = createElement('td');
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(fhzGrp));
    nodeTD = createElement('td',
                           {'class': 'fontSmall'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(new RegExp(NachforderungenArr[fhzGrp].regex).source));
  }
}

// Einstellungen speichern
function saveConfig()
{
  var isAllValid = true;
  var nodeInfo = getByID('ereglamsInfo');
  removeChildren(nodeInfo);

  for (var setting in settingsArr)
  {
    var nodeInput;
    var isValid = true;
    var nodeSpan = getByID(setting);
    nodeSpan.style.backgroundColor = '';
    switch(settingsArr[setting].type)
    {
      case 'BOOL':
        nodeInput = getByID('chk_' + setting);
        settingsArr[setting].value = nodeInput.checked;
        break;
      case 'RAD' :
        var radElems = splitRadioButtonText(settingsArr[setting].text);
        for (radVal in radElems.buttons)
        {
          nodeInput = getByID('rad_' + setting + '.' + radVal);
          if (nodeInput.checked)
          {
            settingsArr[setting].value = nodeInput.value;
          }
        }
        break;
      case 'LIST':
        var nodeSel = getByID('sel_' + setting);
        settingsArr[setting].value = nodeSel.options[nodeSel.selectedIndex].value;
        break;
      case 'INT' :
        nodeInput = getByID('val_' + setting);
        if (settingsArr[setting].valChkFunc != undefined)
        {
          try
          { isValid = settingsArr[setting].valChkFunc(nodeInput.value);
          }
          catch(e)
          { isValid = false;
          }
        }
        else
        { isValid = true;
        }

        if (isValid)
        { settingsArr[setting].value = nodeInput.value;
        }
        else
        {
          nodeInput.parentNode.style.backgroundColor = 'red';
          isAllValid = false;
        }
        break;
      case 'STR' :
        nodeInput = getByID('str_' + setting);
        if (settingsArr[setting].valChkFunc != undefined)
        {
          try
          { isValid = settingsArr[setting].valChkFunc(nodeInput.value);
          }
          catch(e)
          { isValid = false;
          }
        }
        else
        { isValid = true;
        }

        if (isValid)
        { settingsArr[setting].value = nodeInput.value;
        }
        else
        {
          nodeSpan.style.backgroundColor = 'red';
          isAllValid = false;
        }
        break;
      default:
    }
  }

  if (isAllValid)
  {
    for (var setting in settingsArr)
    {
      var gmSetting = GMVAL_PREF_OPT + setting;
      if (settingsArr[setting].value != settingsArr[setting].valDef)
      { mylog('speichere ' + setting + ', Wert = ' + settingsArr[setting].value);
        GM_setValue(gmSetting, settingsArr[setting].value);
      }
      else
      {
        if (GM_getValue(gmSetting, '##found##') != '##found##')
        { mylog('lösche ' + setting);
          GM_deleteValue(gmSetting);
        }
      }
    }
    nodeInfo.appendChild(createText('Einstellungen gespeichert.'));
    nodeInfo.setAttribute('class','form_success');
  }
  else
  {
    nodeInfo.appendChild(createText('Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.'));
    nodeInfo.setAttribute('class','form_error');
  }
}

// Prüfroutinen für Einstelloptionen
// Signatur: BOOL func(value)
function checkLimDmg(value)
{
  try
  {
    var intVal = parseInt(value);
    return (intVal > 0 && intVal <= 100);
  }
  catch(e)
  {
    return false;
  }
}

function checkRedSelVhc(value)
{
  var isValid = true;

  // Eingabe in seine Bestandteile zerlegen, dazu Dummy-Einsatzklasse beisteuern, damit Zerlegung richtig funktioniert
  var teilObjArr = getEKListTeilobjekte('F1+' + value);
  // zusätzlche Fahrzeuge prüfen
  var fhzArr = new Array;
  for each (fhz in teilObjArr.add)
  { var splitArr = fhz.split('/'); // eventuelle Alternativen zerlegen
    for each (split in splitArr)
    { fhzArr.push(split);
    }
  }

  for each (fhz in fhzArr)
  {
    if (NachforderungenArr[fhz] == undefined)
    { isValid = false;
    }
  }
  return isValid;
}

// Einsatzklassen zu Stichworten speichern
function saveEStichworte()
{
  var isValid = true;
  var nodeInfo = getByID('ereglamsEStichworte');
  removeChildren(nodeInfo);

  // zunächst die Eingaben prüfen
  for (stichwort in EinsatzstichwortArr)
  {
    var gmStichwort = GMVAL_PREF_STW + stichwort;
    // Einsatzklasse auswerten
    var nodeSelect = getByID('sel.' + stichwort);
    nodeSelect.parentNode.style.backgroundColor = '';
    var eReq = nodeSelect.options[nodeSelect.selectedIndex].value;
    var nodeInputAdd = getByID('add.' + stichwort);
    // zusätzliche Fahrzeuge
    nodeInputAdd.parentNode.style.backgroundColor = '';
    var eAdd = nodeInputAdd.value;
    if (eAdd.indexOf('|') != -1)
    { isValid = false;
      nodeInputAdd.parentNode.style.backgroundColor = 'red';
    }
    // optionale Fahrzeuge
    nodeInputOpt = getByID('opt.' + stichwort);
    nodeInputOpt.parentNode.style.backgroundColor = '';
    var eOpt = nodeInputOpt.value;
    if (eOpt.indexOf('|') != -1)
    { isValid = false;
      nodeInputOpt.parentNode.style.backgroundColor = 'red';
    }



// Verbandsauftrag
    var nodeInput = getByID('vb.' + stichwort);
    EinsatzstichwortArr[stichwort].vbOrder = nodeInput.checked;



    var eCls = eReq + ((eAdd != '')?'+'+eAdd:'') + ((eOpt != '')?'|'+eOpt:'');
    // Eingabe in seine Bestandteile zerlegen
    var teilObjArr = getEKListTeilobjekte(eCls);
    // Bestandteile auf gültige Fahrzeugklassen prüfen
    for (teil in teilObjArr)
    {
      switch(teil)
      { case 'vehGrp': if (EinsatzklasseFahrzeugeArr[teilObjArr[teil]] == undefined)
                       { isValid = false;
                         nodeSelect.parentNode.style.backgroundColor = 'red';
                       }
                       break;

        case 'req'   : continue;

        case 'add'   :
        case 'opt'   : var fhzArr = new Array;
                       for each (fhz in teilObjArr[teil])
                       { var splitArr = fhz.split('/');// eventuelle Alternativen zerlegen
                         for each (split in splitArr)
                         { fhzArr.push(split);
                         }
                       }

                       for each (fhz in fhzArr)
                       {
                         if (NachforderungenArr[fhz] == undefined)
                         { isValid = false;
                           if (teil == 'add')
                           { nodeInputAdd.parentNode.style.backgroundColor = 'red';
                           }
                           else
                           { nodeInputOpt.parentNode.style.backgroundColor = 'red';
                           }
                         }
                       }
                       break;
      }
    }
    if (isValid)
    {
      EinsatzstichwortArr[stichwort].stwCls = eCls;
    }
  }

  if (isValid)
  {
    for (stichwort in EinsatzstichwortArr)
    {
      var gmStichwort = GMVAL_PREF_STW + stichwort;
      var nodeTD = getByID('rst.' + stichwort);
      removeChildren(nodeTD);
      // nur speichern, wenn vom Vorschlagswert abweicht
      if (EinsatzstichwortArr[stichwort].stwCls != EinsatzstichwortArr[stichwort].stwDef ||
          EinsatzstichwortArr[stichwort].vbOrder != EinsatzstichwortArr[stichwort].vbOrdDef)
      {
        var gmValue = '';
        if (EinsatzstichwortArr[stichwort].stwCls != EinsatzstichwortArr[stichwort].stwDef)
        { gmValue = 'class=' + EinsatzstichwortArr[stichwort].stwCls;
        }
        if (EinsatzstichwortArr[stichwort].vbOrder != EinsatzstichwortArr[stichwort].vbOrdDef)
        { if (gmValue)
          { gmValue += ';';}
          gmValue += 'vbOrder=' + EinsatzstichwortArr[stichwort].vbOrder;
          EinsatzstichwortArr[stichwort].vbOrdDef = EinsatzstichwortArr[stichwort].vbOrder;
        }
        GM_setValue(gmStichwort, gmValue);
        nodeTD.appendChild(getNodeResetStw(stichwort));
      }
      else if (EinsatzstichwortArr[stichwort].vbOrder) {}
      else
      {
        if (GM_getValue(gmStichwort, '##found##') != '##found##')
        {
          GM_deleteValue(gmStichwort);
        }
      }
    }
  }

  if (isValid)
  {
    nodeInfo.appendChild(createText('Einsatzklassenzuordnungen gespeichert.'));
    nodeInfo.setAttribute('class','form_success');
  }
  else
  {
    nodeInfo.appendChild(createText('Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.'));
    nodeInfo.setAttribute('class','form_error');
  }
}

function getNodeResetStw(stw)
{
  var teilObj = getEKListTeilobjekte(EinsatzstichwortArr[stw].stwDef);
  var rstNode = createElement('input',
                                     {'type' : 'reset',
                                      'class': 'button',
                                      'name' : stw,
                                      'title': 'Scriptvorgabe wieder herstellen',
                                      'value': '*',
                                      'onclick': 'javascript:\
document.getElementById("sel.'+stw+'").value="'+teilObj.vehGrp+'";\
document.getElementById("add.'+stw+'").value="'+teilObj.add+'";\
document.getElementById("opt.'+stw+'").value="'+teilObj.opt+'";'});
  return rstNode;
}

// Fahrzeugzuordnungen zu Einsatzklassen speichern
function saveEKlasse()
{
  var isValid = true;
  var nodeInfo = getByID('ereglamsEKlasse');
  removeChildren(nodeInfo);

  for (eKlasse in EinsatzklasseFahrzeugeArr)
  {
    var gmStichwort = GMVAL_PREF_STW + eKlasse;
    // Text zur Einsatzklasse
    var nodeInput = getByID('etx.' + eKlasse);
    nodeInput.parentNode.style.backgroundColor = '';
    var eTxt = nodeInput.value;
    // nach verbotenen Zeichen suchen
    if (eTxt.search(/[<>;=]/) != -1)
    { isValid = false;
      nodeInput.parentNode.style.backgroundColor = 'red';
    }

    if (isValid)
    {
      // Einsatzklasse auswerten
      nodeInput = getByID('ecl.' + eKlasse);
      nodeInput.parentNode.style.backgroundColor = '';
      var eAdd = nodeInput.value;
      if (eAdd.indexOf('|') != -1)
      { isValid = false;
        nodeInput.parentNode.style.backgroundColor = 'red';
      }
    }

    if (isValid)
    {
      // Eingabe in seine Bestandteile zerlegen, dazu Dummy-Einsatzklasse beisteuern, damit Zerlegung richtig funktioniert
      var teilObjArr = getEKListTeilobjekte('F1+' + eAdd);
      // zusätzliche Fahrzeuge prüfen
      var fhzArr = new Array;
      for each (fhz in teilObjArr.add)
      { var splitArr = fhz.split('/'); // eventuelle Alternativen zerlegen
        for each (split in splitArr)
        { fhzArr.push(split);
        }
      }

      for each (fhz in fhzArr)
      {
        if (fhz && NachforderungenArr[fhz] == undefined)
        { isValid = false;
          nodeInput.parentNode.style.backgroundColor = 'red';
        }
      }
    }

    if (isValid)
    {
      EinsatzklasseFahrzeugeArr[eKlasse].text = eTxt;
      EinsatzklasseFahrzeugeArr[eKlasse].vehicles = teilObjArr.add.toString();
    }
  }

  if (isValid)
  {
    for (eKlasse in EinsatzklasseFahrzeugeArr)
    {
      var gmEKlasse = GMVAL_PREF_EKL + eKlasse;
      var nodeTDEKl = getByID('rcl.' + eKlasse);
      removeChildren(nodeTDEKl);
      var nodeTDtxt = getByID('rtx.' + eKlasse);
      removeChildren(nodeTDtxt);
      // nur speichern, wenn vom Vorschlagswert abweicht
      if ((EinsatzklasseFahrzeugeArr[eKlasse].vehicles != EinsatzklasseFahrzeugeArr[eKlasse].vhcDef) ||
          (EinsatzklasseFahrzeugeArr[eKlasse].text     != EinsatzklasseFahrzeugeArr[eKlasse].txtDef))
      {
        var gmValue = '';
        if (EinsatzklasseFahrzeugeArr[eKlasse].vehicles != EinsatzklasseFahrzeugeArr[eKlasse].vhcDef)
        {
          gmValue = 'vehicles=' + EinsatzklasseFahrzeugeArr[eKlasse].vehicles;
          nodeTDEKl.appendChild(getNodeResetEkl(eKlasse, false));
        }
        if (EinsatzklasseFahrzeugeArr[eKlasse].text     != EinsatzklasseFahrzeugeArr[eKlasse].txtDef)
        {
          if (gmValue != '')
          {
            gmValue += ';';
          }
          gmValue += 'text=' + EinsatzklasseFahrzeugeArr[eKlasse].text;
          nodeTDtxt.appendChild(getNodeResetEkl(eKlasse, true));
        }

        GM_setValue(gmEKlasse, gmValue);
      }
      else
      {
        if (GM_getValue(gmEKlasse, '##found##') != '##found##')
        {
          GM_deleteValue(gmEKlasse);
        }
      }
    }
  }

  if (isValid)
  {
    nodeInfo.appendChild(createText('Fahrzeugzuordnungen gespeichert.'));
    nodeInfo.setAttribute('class','form_success');
  }
  else
  {
    nodeInfo.appendChild(createText('Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.'));
    nodeInfo.setAttribute('class','form_error');
  }
}

function getNodeResetEkl(eKl, isText)
{
  var rstNode = createElement('input',
                                     {'type' : 'reset',
                                      'class': 'button',
                                      'name' : eKl,
                                      'title': 'Scriptvorgabe wieder herstellen',
                                      'value': '*',
                                      'onclick': 'javascript:'+(isText?
'document.getElementById("etx.'+eKl+'").value="'+EinsatzklasseFahrzeugeArr[eKl].txtDef+'"':
'document.getElementById("ecl.'+eKl+'").value="'+EinsatzklasseFahrzeugeArr[eKl].vhcDef+'";')});
  return rstNode;
}

function nodeInserted(e)
{
  // wenn ich selbst für die Änderung verantwortlich bin, nichts unternehmen
  if (ichBins || !e.target.innerHTML || /^\s*$/.test(e.target.innerHTML)) return;

  // reload auf Übersichtseite hat stattgefunden:
  if (e.target.innerHTML == "Einsätze in deiner Stadt" ||
      e.target.innerHTML == "Einsätze deines Verbandes")
  { window.setTimeout(main, 10);
    return;
  }
  // reload auf Einsatzseite hat stattgefunden:
  if (e.target.innerHTML.indexOf("<h2>Freie Fahrzeuge</h2>") > 0)
  { window.setTimeout(main, 100);
    return;
  }
  // in Schule wurde eine Wache "aufgeklickt":
  if (e.target.innerHTML.indexOf("<th>Ausbildung</th>") > 0)
  { window.setTimeout(doSchool(false),10);
    return;
  }
  // reload auf Leitstellenansicht hat stattgefunden:
  if (e.target.innerHTML == "Leitstellenansicht")
  { window.setTimeout(main, 10);
    return;
  }
}

// zerlegt den Text einer Radio-Button-Option in seine Bestandteile
function splitRadioButtonText(text)
{ // Elemente:
  // radDef.text = Text zur Optionsauswahl
  // radDef.buttons = Schlüssel/Wert-Paar je Radiobutton-Knopf
  var radDef = {};
  radDef.buttons = {};

  // Radio-Button
  var radElems = text.split('|');
  radDef.text = radElems[0];
  // Text
  var radOpts = radElems[1].split(';');
  for each (radOpt in radOpts)
  {
    var valArr = radOpt.split('=');
    radDef.buttons[valArr[0]] = valArr[1];
  }
  return radDef;
}

// ermittelt die Bereiche in denen eine Koordinate liegt
//  z.B. 'Flughafen'     : {from: {x:  83, y: 179}, to: {x:  84, y: 180}},
function getAreaDescription(x, y)
{ var locArr = [];
  for (loc in locationArr)
  { if (locationArr[loc].from.x <= x &&
        locationArr[loc].from.y <= y &&
        locationArr[loc].to.x >= x &&
        locationArr[loc].to.y >= y)
    { locArr.push(loc);
    }
  }
  return locArr.join(', ');
}

// entfernt alle Kinder des Knoten
function removeChildren(node)
{
  // anfängliche Anzahl Kinder besorgen
  var len = node.childNodes.length;
  for (var i = 1; i <= len; i++)
  {
    node.removeChild(node.childNodes[0]);
  }
}

// legt einen DOM-Knoten zum Typ mit Attributen an
// Aufruf: createElement('td', {'id' : 'IdDesElements', 'style': 'width: 55px;'});
function createElement(type, attributes)
{
  var node = document.createElement(type);

  for (var attr in attributes)
  {
    if (attributes.hasOwnProperty(attr))
    {
      node.setAttribute(attr, attributes[attr]);
    }
  }
  return node;
}

// legt einen Textknoten an
function createText(text)
{
  return document.createTextNode(text);
}

// sucht Knoten mittels XPath
function getXPath(xPathStr, node, resultType)
{ //mylog(xPathStr+' '+node+' '+resultType);
  return document.evaluate(xPathStr, node, null, resultType, null);
}

// sucht nach Element mit ID
function getByID(ID)
{
  return document.getElementById(ID);
}

// hängt eine Entity-Zeichenkette an ein Element an
function addEntityText(node, text)
{
  node.innerHTML += text;
}

function mylog(Text)
{
  var Jetzt = new Date();
  GM_log(Jetzt.toLocaleString() + "\n" + Text);
}




































































/* ****************************************************************************************************
Hier ab Zeile 5800 beginnen die eigenen Modifikationen (das "automatische Alarmierung" Script (USERSCRIPTID=101853) wird als stadalone nicht mehr
weiterentwickelt, da es viel praktischer ist auf die ganzen Variablen und Funktionen aus diesem Script direkt zuzugreifen
   ****************************************************************************************************/

//window.setTimeout(function() { alert('Hello world!') }, 6000);
   
   
   
/* ***** globale Variablen anlegen ***** */
EinsatzDetails = new Array();
var currentTime = Math.round(new Date().getTime()/1000);
var lastLoad   = GM_getValue("lastLoad", 0);
var inArbeit = GM_getValue("inArbeit");
var EinsatzAnzahl = GM_getValue('EinsatzAnzahl');

// +----------------------------------------------------------------------------------------------+
// | allgemeine Funktionen                                                                        |
// +----------------------------------------------------------------------------------------------+

function remove(element) {
//entfernt mit einem Trick einen Node selbst; zuerst auf den parent und dann wieder auf das child;
    element.parentNode.removeChild(element);
}

function addStyle(css){
	GM_addStyle(css.replace(/;/g,' !important;'));
}

function boxGruen(text, parentNode){
	removeChildren(parentNode);
	var boxNode = document.createElement('div');
		boxNode.appendChild(document.createTextNode(text));
		boxNode.setAttribute('class','form_success');
	parentNode.appendChild(boxNode);
}

function boxRot(text, parentNode){
	removeChildren(parentNode);
	var boxNode = document.createElement('div');
		boxNode.appendChild(document.createTextNode(text));
		boxNode.setAttribute('class','form_error');
	parentNode.appendChild(boxNode);
}

function boxBlau(text, parentNode){
	removeChildren(parentNode);
	var boxNode = document.createElement('div');
		boxNode.appendChild(document.createTextNode(text));
		boxNode.setAttribute('class','form_info');
	parentNode.appendChild(boxNode);
}

document.getElementsByClassName = function(cl) {
//Trick um auf ein Element anhand der css-class zuzugreifen; -> liefert Array (vgl. getElementsByName) zurück!
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
return retnode;
}


/* ***** Funktionsaufrufe ***** */ 
init_extended();
main_extended();


/* ***** FUNKTIONEN ***** */
function init_extended() {
	//Funktionen die immer ausgeführt werden sollen

	if(GM_getValue('toolset_bannermod', true) == true) Banner_verkleinern();
	//wenn Premium-Account vorhanden ist die Werbung schon entfernt und das erneute entfernen mit diesem Script läuft auf einen Fehler -> Abfrage ob Premium vorhanden
	if(GM_getValue('toolset_adblocker', true) == true) Werbung_entfernen();
	ConfigLink();
	EinsatzpersonalLink();
	if(GM_getValue('toolset_userscriptUpdater', true) == true) userscriptUpdater();
	//wenn man ohnehin schon auf der Einsatzübersichtsseite ist soll ein Klick auf "Einsätze" im Menü die Reinitialisierung starten
	if (docPath == '/feuerwehr-einsaetze') MenueEinsaetzeLink();
	
	if (docPath == '/credits') test();
}

function main_extended() {
	//und der Rest der abhängig von der Unterseite ausgeführt wird
	if (docPath == '/feuerwehr-einsaetze') {
		Sondergebiete();
		bearbeiteUebersichtsseite_extended();		
		//wenn das letzte Laden der Einsätze länger als x Sekunden her ist wird neu eingelesen, ansonsten autoalarm
		//if (GM_getValue('loaded') == true && (currentTime - lastLoad) < 30) {
		if ((currentTime - lastLoad) < 180) {
			//alert("Vars vorhanden");
			if (inArbeit > EinsatzAnzahl) {inArbeit = 1;} else {inArbeit = inArbeit+1;}
			GM_setValue("inArbeit", inArbeit);
			//alert(inArbeit);
			if (GM_getValue('toolset_autoalarm', true) == true) autoalarm_neu();
		} else {
			//alert("Vars einlesen");
			EinsaetzeEinlesen();
		}
	} else if (document.URL.search(/alarm$/) != -1) {
		window.location.href="http://www.feuerwache.net/feuerwehr-einsaetze";
	} else if (docPath == '/extendedConfig') {
		bearbeiteExtendedConfigSeite();
	} else if (document.URL.search(/\/feuerwehr-einsaetze\/\d{9}$/) != -1) {
		if (GM_getValue('toolset_autoalarm', true) == true) alarmieren();
	} else if (docPath == '/gebaeude') {
		if (GM_getValue('toolset_lehrgaenge', true) == true) LehrgaengeAnzeigen();
		WerkstattAnzeigen();
	} else if (docPath == '/feuerwachen') {
		MassenBewerbungsphasen_starten();
		zeigeBewerbungUndBesetzung();
	/*
	//rescue: geplanter Ausbau, damit auf der "Reperatur-Seite" die Belegtzeit der Werkstätten gezegt wird
	} else if (document.URL.search(/\/reparieren$/)) {
		LehrgaengeAnzeigen();
		alert();
	*/
	} else if (document.URL.match(/\/feuerwehr-einsaetze\/\d{9}\/zurueck\/\d+$/)) {
/*rescue: es gibt ein Problem mit Seiten mit der Einsatz-ID 163494564; seltsamer weise bleibt das Script auf Seiten wie
http://www.feuerwache.net/feuerwehr-einsaetze/163494564/zurueck/3944149 immer wieder hängen; bisher unklar warum; */
		//wenn Fahrzeug zurück alarmiert wurde, wieder in den selben Einsatz in die Details um anderes Fahrzeug zu alarmieren oder weitere Umdispo
		var retourlink = document.URL.match(/\d{9}/);
		window.location.href="http://www.feuerwache.net/feuerwehr-einsaetze/"+retourlink;
	}
}

function ConfigLink() {
    // Link zu den Optionen setzen
    var nodeP = createElement('p',
                              {'id'  : 'extendedConfig'});
    var nodeA = createElement('a',
                              {'href': '/extendedConfig'});
    nodeP.appendChild(nodeA);
    nodeA.appendChild(createText(' Toolset Konfig'));
    var footer = getByID((layoutNew)?'footerLeft':'footer');
    //footer.appendChild(createElement('br'));
    footer.appendChild(nodeP);
}

function EinsatzpersonalLink() {
var ul=createElement('ul',{'class':'level2','style':'position: absolute; top: 67px; left: 549px; visibility: hidden;'});
  var li=createElement('li');
  var img=createElement('img',{'class':'navigation_arrow','alt':'SmallArrow','src':'/images/SmallArrow.png'});
  li.appendChild(img);
  var a=createElement('a',{'href':'/personal/list','target':'_self'});
  a.appendChild(createText('Einsatzpersonal'));
  li.appendChild(a);
  ul.appendChild(li);
  document.getElementById('root').getElementsByTagName('li')[9].appendChild(ul);
}

function MenueEinsaetzeLink() {
//fügt dem Menüpunkt "Einsätze" eine click-Action hinzu, damit beim Aufruf direkt unabhängig vom lastLoad die Einsätze eingelesen werden
document.getElementById("root").getElementsByTagName("li")[9].getElementsByTagName("a")[0].addEventListener('click', EinsaetzeEinlesen, false);
}

function bearbeiteUebersichtsseite_extended() {
	//stellt Button auf der Einsatzseite zur Verfügung über welchen man den Autoalarm starten und stoppen kann
	var aabutton = document.createElement('input');
	aabutton.setAttribute('type','button');
	aabutton.setAttribute('class','button');
	aabutton.setAttribute('name','commit');
	if (GM_getValue('toolset_autoalarm') == true) {
		aabutton.setAttribute('value','Autoalarm ist aktiv -> stoppen');
		aabutton.setAttribute('title','deaktiviert die automatische Alarmierung (kann auch auf der Config-Seite geändert werden)');
		aabutton.setAttribute('style','color:#00aa00;'); }
	if (GM_getValue('toolset_autoalarm') == false) {
		aabutton.setAttribute('value','Autoalarm ist inaktiv -> starten');
		aabutton.setAttribute('title','aktiviert die automatische Alarmierung (kann auch auf der Config-Seite geändert werden)');
		aabutton.setAttribute('style','color:#ff0000;'); }
	aabutton.addEventListener('click', aaspeichern, false);
	document.getElementById('EinsatzAuswertung').appendChild(aabutton);

	//etwas Platz zwischen den beiden Buttons
	var spacer = document.createTextNode(' ');
	document.getElementById('EinsatzAuswertung').appendChild(spacer);
	
	//stellt Button auf der Einsatzseite zur Verfügung über welchen man manuell neu Einlesen und durchalarmieren kann
	var abbutton = document.createElement('input');
	abbutton.setAttribute('type','button');
	abbutton.setAttribute('class','button');
	abbutton.setAttribute('name','commit');
	abbutton.setAttribute('value','reinitialisieren');
	abbutton.setAttribute('title','Liest die Einsätze neu ein und beginnt mit der Alarmierung wenn Autoalarm auf "aktiv" (normalerweise wird spätestens alle 180 Sekunden neu eingelesen)');
	abbutton.setAttribute('style','color:#ff0000;');
	//aabutton.setAttribute('value','speichern');
	abbutton.addEventListener('click', EinsaetzeEinlesen, false);
	document.getElementById('EinsatzAuswertung').appendChild(abbutton);
	
	//speichert den Wert
	function aaspeichern(){
		if (GM_getValue('toolset_autoalarm') == true){
			GM_setValue('toolset_autoalarm', false);
		} else if (GM_getValue('toolset_autoalarm') == false){
				GM_setValue('toolset_autoalarm', true);
		}
		//Seite lädt neu, damit auch die Anzeige am Button stimmt
		window.location.href = document.URL;
	}
	
	//zeigt Information auf Übersichtsseite wann die Einsätze zuletzt eingelesen wurden
	var InfoLastLoad = document.createTextNode(' Einsätze zuletzt vor ' + (currentTime-lastLoad) + ' sek geladen.');
	document.getElementById('EinsatzAuswertung').appendChild(InfoLastLoad);	
	//Funktion welche die Besitzer der Verbandseinsätze anzeigt
	//zeigeBesitzer();
}

function zeigeBesitzer() {
	//bei Verbandseinsätzen den Besitzer anzeigen
	for each (TR in document.getElementsByTagName("tbody")[2].getElementsByTagName("tr")){
		
		if(GM_getValue('toolset_VerbandsBesitzerAnzeigen', true) == true){

			var EinsatzID = TR.getElementsByTagName("td")[1].innerHTML.match(/\d+/);
			//alert(EinsatzID);
			GM_xmlhttpRequest({
				method: "get",
				url: "http://www.feuerwache.net/feuerwehr-einsaetze/"+EinsatzID,
				headers: { "Content-type" : "application/x-www-form-urlencoded" },
				onload: function(r){
					var Besitzer = r.responseText.match(/<a href=\"\/profil\/[a-zA-Z0-9]*/);
					Besitzer = Besitzer.toString().substring(17);
					//Besitzer = r.responseText.match(/\/profil\/[a-zA-Z0-9]*\">/);
					//alert(Besitzer);
					EinsatzID = r.finalUrl.toString().match(/\d+/);
					//alert(EinsatzID);
					var leNode = document.createElement('p');
						leNode.setAttribute('class', 'fontSmall');
						var fNode = document.createElement('span');
							fNode.setAttribute('style', 'color:#666666;');
							fNode.appendChild(document.createTextNode(Besitzer));
					leNode.appendChild(fNode);
					for each (TR2 in document.getElementsByTagName("tbody")[2].getElementsByTagName("tr")){
						if(TR2.getElementsByTagName("td")[1].innerHTML.match(/feuerwehr-einsaetze\/\d+/).toString().match(/\d+/).toString() == EinsatzID){
						//if(TR2.getElementsByTagName("td")[1].getElementsByTagName("a")[0] == EinsatzID){
						//alert(EinsatzID);
							TR2.getElementsByTagName("td")[2].appendChild(leNode);
						}
					}
				}
			});
		}
	}
}

function bearbeiteExtendedConfigSeite() {
	document.getElementById('content').innerHTML = '';
	var eh1 = document.createElement('h1');
		eh1.appendChild(document.createTextNode('Toolset Einstellungen'));
	var elink = document.createElement('div');
		elink.appendChild(document.createTextNode('Weitere Informationen unter '));
		var elinka = document.createElement('a');
			elinka.setAttribute('href','http://userscripts.org/scripts/show/101853');
			elinka.setAttribute('target','_blank');
			elinka.appendChild(document.createTextNode('http://userscripts.org/scripts/show/101853'));
		elink.appendChild(elinka);
	var etabelle = document.createElement('table');
		etabelle.setAttribute('class','defaultTable');
		var ethead = document.createElement('thead');
			var etrh = document.createElement('tr');
				var eth1 = document.createElement('th');
					eth1.setAttribute("width","75%");
					eth1.appendChild(document.createTextNode('Name'));
				var eth2 = document.createElement('th');
					eth2.appendChild(document.createTextNode('Wert'));
			etrh.appendChild(eth1);
			etrh.appendChild(eth2);
		ethead.appendChild(etrh);
		var etbody = document.createElement('tbody');
			var etrb1 = document.createElement('tr');
				var etd11 = document.createElement('td');
					etd11.appendChild(document.createTextNode('Autoalarm aktivieren:'));
				var etd12 = document.createElement('td');
					var echeck = document.createElement('input');
						echeck.setAttribute('name', 'echeck');
						echeck.setAttribute('id', 'echeck');
						echeck.setAttribute('type', 'checkbox');
						if(GM_getValue('toolset_autoalarm', true) == true){
							echeck.setAttribute('checked', true);
						}
					etd12.appendChild(echeck);
			etrb1.appendChild(etd11);
			etrb1.appendChild(etd12);
			var etrb2 = document.createElement('tr');
				var etd21 = document.createElement('td');
					etd21.appendChild(document.createTextNode('Bannermod aktivieren:'));
				var etd22 = document.createElement('td');
					var echeck2 = document.createElement('input');
						echeck2.setAttribute('name', 'echeck2');
						echeck2.setAttribute('id', 'echeck2');
						echeck2.setAttribute('type', 'checkbox');
						if(GM_getValue('toolset_bannermod', true) == true){
							echeck2.setAttribute('checked', true);
						}
					etd22.appendChild(echeck2);
			etrb2.appendChild(etd21);
			etrb2.appendChild(etd22);
			var etrb3 = document.createElement('tr');
				var etd31 = document.createElement('td');
					etd31.appendChild(document.createTextNode('Werbeblocker aktivieren:'));
				var etd32 = document.createElement('td');
					var echeck3 = document.createElement('input');
						echeck3.setAttribute('name', 'echeck3');
						echeck3.setAttribute('id', 'echeck3');
						echeck3.setAttribute('type', 'checkbox');
						if(GM_getValue('toolset_adblocker', true) == true){
							echeck3.setAttribute('checked', true);
						}
					etd32.appendChild(echeck3);
			etrb3.appendChild(etd31);
			etrb3.appendChild(etd32);
			var etrb4 = document.createElement('tr');
				var etd41 = document.createElement('td');
					etd41.appendChild(document.createTextNode('Lehrgänge + Reperaturzeiten auf Gebäudeseite anzeigen:'));
				var etd42 = document.createElement('td');
					var echeck4 = document.createElement('input');
						echeck4.setAttribute('name', 'echeck4');
						echeck4.setAttribute('id', 'echeck4');
						echeck4.setAttribute('type', 'checkbox');
						if(GM_getValue('toolset_lehrgaenge', true) == true){
							echeck4.setAttribute('checked', true);
						}
					etd42.appendChild(echeck4);
			etrb4.appendChild(etd41);
			etrb4.appendChild(etd42);			
			var etrb5 = document.createElement('tr');
				var etd51 = document.createElement('td');
					etd51.appendChild(document.createTextNode('Autoupdate aktivieren:'));
				var etd52 = document.createElement('td');
					var echeck5 = document.createElement('input');
						echeck5.setAttribute('name', 'echeck5');
						echeck5.setAttribute('id', 'echeck5');
						echeck5.setAttribute('type', 'checkbox');
						if(GM_getValue('toolset_userscriptUpdater', true) == true){
							echeck5.setAttribute('checked', true);
						}
					etd52.appendChild(echeck5);
			etrb5.appendChild(etd51);
			etrb5.appendChild(etd52);		
			var etrb6 = document.createElement('tr');
				var etd61 = document.createElement('td');
					etd61.appendChild(document.createTextNode('automatisch umdisponieren:'));
				var etd62 = document.createElement('td');
					var echeck6 = document.createElement('input');
						echeck6.setAttribute('name', 'echeck6');
						echeck6.setAttribute('id', 'echeck6');
						echeck6.setAttribute('type', 'checkbox');
						if(GM_getValue('toolset_umdisponieren', true) == true){
							echeck6.setAttribute('checked', true);
						}
					etd62.appendChild(echeck6);
			etrb6.appendChild(etd61);
			etrb6.appendChild(etd62);
			var etrb7 = document.createElement('tr');
				var etd71 = document.createElement('td');
					etd71.appendChild(document.createTextNode('Icons in Feuerwachenliste anzeigen:'));
				var etd72 = document.createElement('td');
					var eradio71p = document.createElement('p');
						var eradio71 = document.createElement('input');
							eradio71.setAttribute('name', 'eradio7');
							eradio71.setAttribute('id', 'eradio71');
							eradio71.setAttribute('type', 'radio');
							eradio71.setAttribute('value', 'normal');
							if(GM_getValue('opt_imgStationList', 'normal') == 'normal'){
								eradio71.setAttribute('checked', true);
							}
						var eradio71Label = document.createElement('label');
							eradio71Label.setAttribute('for','eradio71');
							eradio71Label.appendChild(document.createTextNode(' normal'));
					eradio71p.appendChild(eradio71);
					eradio71p.appendChild(eradio71Label);
					var eradio72p = document.createElement('p');
						var eradio72 = document.createElement('input');
							eradio72.setAttribute('name', 'eradio7');
							eradio72.setAttribute('id', 'eradio72');
							eradio72.setAttribute('type', 'radio');
							eradio72.setAttribute('value', 'klein');
							if(GM_getValue('opt_imgStationList', 'normal') == 'small'){
								eradio72.setAttribute('checked', true);
							}
						var eradio72Label = document.createElement('label');
							eradio72Label.setAttribute('for','eradio72');
							eradio72Label.appendChild(document.createTextNode(' klein'));
					eradio72p.appendChild(eradio72);
					eradio72p.appendChild(eradio72Label);
					var eradio73p = document.createElement('p');
						var eradio73 = document.createElement('input');
							eradio73.setAttribute('name', 'eradio7');
							eradio73.setAttribute('id', 'eradio73');
							eradio73.setAttribute('type', 'radio');
							eradio73.setAttribute('value', 'klein');
							if(GM_getValue('opt_imgStationList', 'normal') == 'none'){
								eradio73.setAttribute('checked', true);
							}
						var eradio73Label = document.createElement('label');
							eradio73Label.setAttribute('for','eradio73');
							eradio73Label.appendChild(document.createTextNode(' entfernen'));
					eradio73p.appendChild(eradio73);
					eradio73p.appendChild(eradio73Label);
				etd72.appendChild(eradio71p);
				etd72.appendChild(eradio72p);
				etd72.appendChild(eradio73p);
			etrb7.appendChild(etd71);
			etrb7.appendChild(etd72);
			var etrb8 = document.createElement('tr');
				var etd81 = document.createElement('td');
					etd81.appendChild(document.createTextNode('Laufende Werbungs-/Bewerbungsphasen in Feurwachenliste anzeigen:'));
				var etd82 = document.createElement('td');
					var echeck8 = document.createElement('input');
						echeck8.setAttribute('name', 'echeck8');
						echeck8.setAttribute('id', 'echeck8');
						echeck8.setAttribute('type', 'checkbox');
						if(GM_getValue('toolset_bewerbungsphasenAnzeigen', true) == true){
							echeck8.setAttribute('checked', true);
						}
					etd82.appendChild(echeck8);
			etrb8.appendChild(etd81);
			etrb8.appendChild(etd82);
			var etrb9 = document.createElement('tr');
				var etd91 = document.createElement('td');
					etd91.appendChild(document.createTextNode('Feuerwehrleute in Feurwachenliste anzeigen: (ACHTUNG PERFORMANCE!!!)'));
				var etd92 = document.createElement('td');
					var echeck9 = document.createElement('input');
						echeck9.setAttribute('name', 'echeck9');
						echeck9.setAttribute('id', 'echeck9');
						echeck9.setAttribute('type', 'checkbox');
						if(GM_getValue('toolset_feuerwehrleuteAnzeigen', false) == true){
							echeck9.setAttribute('checked', true);
						}
					etd92.appendChild(echeck9);
			etrb9.appendChild(etd91);
			etrb9.appendChild(etd92);
		etbody.appendChild(etrb1);
		etbody.appendChild(etrb2);
		etbody.appendChild(etrb3);
		etbody.appendChild(etrb4);
		etbody.appendChild(etrb5);
		etbody.appendChild(etrb6);
		etbody.appendChild(etrb7);
		etbody.appendChild(etrb8);	
		etbody.appendChild(etrb9);			
	etabelle.appendChild(ethead);
	etabelle.appendChild(etbody);
	var InfoNode = document.createElement('div');
	var ebutton = document.createElement('input');
		ebutton.setAttribute('type','button');
		ebutton.setAttribute('class','button');
		ebutton.setAttribute('name','commit');
		ebutton.setAttribute('value','speichern');
		ebutton.addEventListener('click', espeichern, false);

	document.getElementById('content').appendChild(eh1);
	document.getElementById('content').appendChild(elink);
	document.getElementById('content').appendChild(etabelle);
	document.getElementById('content').appendChild(InfoNode);
	
	document.getElementById('content').appendChild(ebutton);
	document.getElementById('content').appendChild(document.createTextNode(' '));
		
	// Einstellungen speichern
	function espeichern(){
		if(echeck.checked == true){
			GM_setValue('toolset_autoalarm', true);
		}else{
			GM_setValue('toolset_autoalarm', false);
		}
		if(echeck2.checked == true){
			GM_setValue('toolset_bannermod', true);
		}else{
			GM_setValue('toolset_bannermod', false);
		}
		if(echeck3.checked == true){
			GM_setValue('toolset_adblocker', true);
		}else{
			GM_setValue('toolset_adblocker', false);
		}
		if(echeck4.checked == true){
			GM_setValue('toolset_lehrgaenge', true);
		}else{
			GM_setValue('toolset_lehrgaenge', false);
		}
		if(echeck5.checked == true){
			GM_setValue('toolset_userscriptUpdater', true);
		}else{
			GM_setValue('toolset_userscriptUpdater', false);
		}
		if(echeck6.checked == true){
			GM_setValue('toolset_umdisponieren', true);
		}else{
			GM_setValue('toolset_umdisponieren', false);
		}
		if(eradio71.checked == true){
		GM_setValue('opt_imgStationList', 'normal');
		}else if(eradio72.checked == true){
		GM_setValue('opt_imgStationList', 'small');
		}else if(eradio73.checked == true){
		GM_setValue('opt_imgStationList', 'none');
		}
		if(echeck8.checked == true){
		GM_setValue('toolset_bewerbungsphasenAnzeigen', true);
		}else{
		GM_setValue('toolset_bewerbungsphasenAnzeigen', false);
		}
		if(echeck9.checked == true){
		GM_setValue('toolset_feuerwehrleuteAnzeigen', true);
		}else{
		GM_setValue('toolset_feuerwehrleuteAnzeigen', false);
		}
		boxGruen('Einstellungen gespeichert.', InfoNode);
	}
}

function EinsaetzeEinlesen() {
	var EinsatzAnzahl = 0;
	EinsatzStatus = new Array();
	EinsatzId = new Array();
	EinsatzLink = new Array();
	EinsatzMeldung = new Array();
	Einstufung = new Array();
	Ausrueckorder = new Array();
	Fahrzeugvorschlag = new Array();
	Einsatzort = new Array();
	EinsatzortLink = new Array();
	Ausbreitung = new Array();
	Restdauer = new Array();
	Verbandseinsatz = new Array();
	

	//"geladen"-Variable löschen
	GM_deleteValue('loaded')
	//die alten Einsatzvariablen löschen (falls noch vorhanden); löscht alle Variablen von "Einsatz0" bis "Einsatz99"
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
		if(key.match(/Einsatz\d{1,2}$/)!= null) {
		GM_deleteValue(key);
		//alert("gelöscht");
		}
	}
	
	//wenn Grosschadenslage laüft, dann muss er die 2. Tabelle nehmen!!!
	var quelltext = document.body.innerHTML;
	var Ergebnis = quelltext.search("Großschadenslagen des Verbands");
	var neuerquell;
	if (Ergebnis != -1) {
		var tabelle = 1;
		GM_setValue('Grossschadenslage', true);
	} else {
		var tabelle = 0;
		GM_setValue('Grossschadenslage', false);
	}	
	
	Obj = getByID("mission_content");
	if (Obj) Obj = Obj.getElementsByTagName("table")[tabelle];
	if (Obj) {
		var TRs=Obj.getElementsByTagName("tr");
	
		//eine der TR ist die Überschriftenzeile; also -1
		EinsatzAnzahl = TRs.length-1;
		
		for (var t=0;t<TRs.length;t++) {
			var TR=TRs[t];
			//überhaupt Einsätze vorhanden? Überschriftenzeile überspringen
			if (TR.getElementsByTagName("td").length == 0) {continue;}
			
			//1. Spalte
			var Hstr = TR.getElementsByTagName("td")[0].innerHTML;
			if (Hstr.match("breitet sich bereits aus") != null ) {
				EinsatzStatus[t] = "Ausbreitung"; }
			else if (Hstr.match("Neuer Einsatz") != null ) {
				EinsatzStatus[t] = "Neu"; }
			else if (Hstr.match("Verletzte Vorort") != null ) {
				EinsatzStatus[t] = "Neu"; }	
			else if (Hstr.match("Verstärkung benötigt") != null ) { 
				EinsatzStatus[t] = "alarmiert"; }
			else if (Hstr.match("Wichtige Rückmeldung") != null ) { 
				EinsatzStatus[t] = "Nachforderung"; }
			else if (Hstr.match(/^\s+$/)) {
				EinsatzStatus[t] = "Abarbeitung";
			}
	  
			//2. Spalte
			EinsatzLink[t] = TR.getElementsByTagName("td")[1].getElementsByTagName("a")[0];
			//die ID des Einsatzes alleine; match geht nicht auf das Array ... also in string
			ID = new String(EinsatzLink[t]);
			//und wieder zurück in Array
			EinsatzId[t] = ID.match(/\d{9}$/);
			EinsatzMeldung[t] = TR.getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
			
			//2. Spalte - Verbandseinsatz?
			Verbandseinsatz[t] = TR.getElementsByTagName("td")[1].innerHTML;
			if (Verbandseinsatz[t].match("Verstärkung ist angefordert") != null ) {
				Verbandseinsatz[t] = "Verbandseinsatz";
				} else {
				Verbandseinsatz[t] = "kein Verbandseinsatz";
				}
			
			//2. Spalte - Ausrückorder
			Ausrueckorder[t] = TR.getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerHTML;
			Ausrueckorder[t] = Ausrueckorder[t].split("<br>");
			Einstufung[t] = Ausrueckorder[t][0];
			Fahrzeugvorschlag[t] = Ausrueckorder[t][1];
		  
			//3. Spalte
			Einsatzort[t] = TR.getElementsByTagName("td")[2].getElementsByTagName("a")[0].innerHTML;
			EinsatzortLink[t] = TR.getElementsByTagName("td")[2].getElementsByTagName("a")[0];
		  
			//4. Spalte
			Ausbreitung[t] = TR.getElementsByTagName("td")[3].getElementsByTagName("div")[1].style.width;
			//das "%" weg, dann von 100% abziehen und das "%" wieder dazu;
			Ausbreitung[t] = (100 - Ausbreitung[t].replace("%","")) + "%";
		  
			//5. Spalte
			Restdauer[t] = TR.getElementsByTagName("td")[4].innerHTML;
			//entfernt Leerzeichen vorne und hinten; TRIM gibt es ja leider in js nicht; ... dann halt regex
			Restdauer[t] = (Restdauer[t].replace(/\s+$/,"").replace(/^\s+/,""));
			if (Restdauer[t] == "") Restdauer[t] = "unbekannt";
			
			//ein array pro Einsatz in die GM
			GM_setValue('Einsatz'+ t, uneval(EinsatzStatus[t]+";"+EinsatzId[t]+";"+EinsatzLink[t]+";"+EinsatzMeldung[t]+";"+Einstufung[t]+";"+Fahrzeugvorschlag[t]+";"+Einsatzort[t]+";"+EinsatzortLink[t]+";"+Ausbreitung[t]+";"+Restdauer[t]+";"+Verbandseinsatz[t]));
		}
		GM_setValue('EinsatzAnzahl', EinsatzAnzahl);
		//"geladen"-Variable setzen
		GM_setValue('loaded', true);
		GM_setValue('lastLoad', currentTime);
		GM_setValue("inArbeit", 0);
		window.location.href = "http://www.feuerwache.net/feuerwehr-einsaetze";
	} 
}

function autoalarm_neu() {
//solange der Einsatz "inArbeit" kleiner als die Gesamtzahl laut letztem Einelsen wird ausgeführt, sonst gestoppt
	if (inArbeit <= EinsatzAnzahl) {
		EinsatzDetails = eval(GM_getValue('Einsatz'+inArbeit,'[]'));
		Details = EinsatzDetails.split(";");
		
		//Verbandseinsatz als abgeschlossen markieren
		if (Details[10] == "Verbandseinsatz") {
		GM_setValue('Einsatz'+inArbeit, 'done');
		window.location.href = document.URL;
		}
		else if (Details[0] == "Neu") {
		window.location.href = Details[2];
		}
		else if (Details[0] == "Nachforderung") {
		window.location.href = Details[2];
		}
		else if (Details[0] == "Ausbreitung") {
		window.location.href = Details[2];
		}
		else if (Details[0] == "Abarbeitung") {
		window.location.href = Details[2];
		}
		else if (Details[0] == "alarmiert") {
		window.location.href = Details[2];
		}
	}
}

function alarmieren() {
	
	var quelltext = document.body.innerHTML;
	
	//Nach Zelle wird gesucht die einen Roten Hintergrund hat (=Umdispo-Vorschlag)
	var umdisponieren = quelltext.search("102, 34, 34");
	
	//wenn bei einem wartenden Fahrzeug das Icon "time.png" vorhanden ist, dann kann dieses nicht besetzt werden -> nochmals zurückalarmieren
	var nichtBesetzbar = quelltext.search("/images/time.png");
	
	//umdisponieren wenn schnelleres Fzg
	if (umdisponieren != -1 && GM_getValue('toolset_umdisponieren')==true) {
	//alert("umdispo");
		quelltext = quelltext.substr(umdisponieren, 1000);
		//alert(quelltext);
		quelltext = quelltext.match(/\/feuerwehr-einsaetze\/\d{9}\/zurueck\/\d+/);
		if (quelltext != null) var link = "http://www.feuerwache.net" + quelltext;
		window.location.href = link;
	//zurückalarmieren wenn nicht besetzbar
	} else if (nichtBesetzbar != -1) {
		//alert("Fzg nicht besetzbar");
		quelltext = quelltext.substr(nichtBesetzbar, 1000);
		//alert(quelltext);
		quelltext = quelltext.match(/\/feuerwehr-einsaetze\/\d{9}\/zurueck\/\d+/);
		if (quelltext != null) var link = "http://www.feuerwache.net" + quelltext;
		//alert(quelltext);
		window.location.href = link;
	//erst wenn weder Umdispo noch nicht besetzbar wird ein Vorschlag gesucht und gegebenenfalls alarmiert
	} else {
		//wenn Vorschlag vorhanden und Zeile eingefärbt
		var Ergebnis = quelltext.search("63, 159, 255");
		if (Ergebnis != -1) {
			// alert("Vorschlag vorhanden");
			document.forms[0].submit();
		} else {
			//alert("kein Vorschlag vorhanden");
			window.location.href="http://www.feuerwache.net/feuerwehr-einsaetze";
		}
	}
	//Einsatz als abgeschlossen markieren
	GM_setValue('Einsatz'+inArbeit, 'done');
}

function Werbung_entfernen () {

//der Layer mit der ID "google_layer" wird wenn vorhanden entfernt; Zugriff auf die eigene Funktion "remove";
var werbung = (document.getElementById("google_layer"));
//es kann sein, dass die variable nur "object" ist, da die Werbung nicht existiert -> Überprüfung mit "typeof"
if (typeof(werbung) != "undefined") remove(werbung);


//der Layer mit der "class=google_728_90" wird wenn vorhanden entfernt; siehe selbst gebastelte Funktion "getElementsByClassName"
var werbung2 = (document.getElementsByClassName("google_728_90")[0]);
//es kann sein, dass die variable nur "object" ist, da die Werbung nicht existiert -> Überprüfung mit "typeof"
if (typeof(werbung2) != "undefined") remove(werbung2);
//alert(typeof(werbung2));
}

function Banner_verkleinern() {
	document.getElementById('logoVehicle').src = document.getElementById('logoVehicle').src.replace("http://www.feuerwache.net/images/vehicle-logo.jpg", "data:image/jpeg;base64,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");
	addStyle('#logoVehicle {height: 62px;}');
	addStyle('#navigation_top {height: 122px;}');
	addStyle('#navigation_top {background-image: url("data:image/png;base64,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");}');
	addStyle('#container {background-position:0 -180px;}');
}

//rescue: Funktion erweitert, dass auch bei den Werkstätten die Besetzt-Zeiten agzeiegt werden
function LehrgaengeAnzeigen() {
// Lehrgänge in Gebäudeliste anzeigen (Funktion aus bannermod)
	for each (TR in document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")){
		var gebID = TR.getElementsByTagName("td")[1].getElementsByTagName("a")[0].href.match(/building_to_user\/show\/id\/\d+/).toString().match(/\d+/).toString();
		GM_xmlhttpRequest({
			method: "get",
			url: "http://www.feuerwache.net/building_to_user/show/id/"+gebID,
			headers: { "Content-type" : "application/x-www-form-urlencoded" },
			onload: function(r){
				var blauerText = r.responseText.match(/\d+\.\d+\.\d+ \d+:\d+ der Lehrgang .+ unterrichtet./);
				
				//die HTML-Entities werden wieder rückgewandelt; allerdings nur bei Bedarf einzeln
				blauerText = blauerText.toString().replace(/\&quot;/g, "\"");
				blauerText = blauerText.toString().replace(/\&uuml;/g, "ü");
				
				var blauerText2 = r.responseText.match(/\d+\.\d+\.\d+ \d+:\d+ gearbeitet./);
				if(blauerText){
					var zeit = blauerText.toString().match(/\d+\.\d+\.\d+ \d+:\d+/);
					//if (blauerText.match(/[&uuml;]+/) > 0) { alert("test"); }
					//var lehrgang = blauerText.toString().match(/;\w+\&/).toString().match(/\w+/);
					var lehrgang = blauerText.toString().match(/".+"/);
					var gebID = r.responseText.match(/edit\/id\/\d+/).toString().match(/\d+/).toString();
					//alert(gebID+"\n"+lehrgang+"\n"+zeit);
 
					var beNode = document.createElement('p');
					beNode.setAttribute('class', 'fontSmall');
					var beNodeText = document.createTextNode('Lehrgang '+lehrgang+' läuft bis '+zeit);
						for each (TR2 in document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")){
							if(TR2.getElementsByTagName("td")[1].getElementsByTagName("a")[0].href.match(/building_to_user\/show\/id\/\d+/).		toString().match(/\d+/).toString() == gebID){
								TR2.getElementsByTagName("td")[3].appendChild(beNode).appendChild(beNodeText);
							}
						}
				} else if (blauerText2){
					var zeit = blauerText2.toString().match(/\d+\.\d+\.\d+ \d+:\d+/);
					//var lehrgang = blauerText.toString().match(/;\w+\&/).toString().match(/\w+/);
					var gebID = r.responseText.match(/edit\/id\/\d+/).toString().match(/\d+/).toString();
					//alert(gebID+"\n"+lehrgang+"\n"+zeit);
					var beNode = document.createElement('p');
					beNode.setAttribute('class', 'fontSmall');
					var beNodeText = document.createTextNode('Werkstatt besetzt bis '+zeit);
						for each (TR2 in document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")){
							if(TR2.getElementsByTagName("td")[1].getElementsByTagName("a")[0].href.match(/building_to_user\/show\/id\/\d+/).		toString().match(/\d+/).toString() == gebID){
								TR2.getElementsByTagName("td")[3].appendChild(beNode).appendChild(beNodeText);
							}
						}
				}
			}
		});
	}
}

function MassenBewerbungsphasen_starten(){
		// Formular aufbauen
		var h2Node = document.createElement('h2');
			h2Node.appendChild(document.createTextNode('Bewerbungsphasen starten [BETA]'));
		var InfoNode = document.createElement('div');
		var formNode = document.createElement('form');
			var tabelle = document.createElement('table');
				tabelle.setAttribute('class','defaultTable');
				var thead = document.createElement('thead');
					var trh = document.createElement('tr');
						var th1 = document.createElement('th');
							th1.setAttribute('style','width:20px');
						var th2 = document.createElement('th');
							th2.appendChild(document.createTextNode('Name'));
						var th3 = document.createElement('th');
							th3.appendChild(document.createTextNode('Laufzeit'));
						var th4 = document.createElement('th');
							th4.appendChild(document.createTextNode('Kosten'));
					trh.appendChild(th1);
					trh.appendChild(th2);
					trh.appendChild(th3);
					trh.appendChild(th4);
				thead.appendChild(trh);
				var tbody = document.createElement('tbody');
					var trb1 = document.createElement('tr');
						var td11 = document.createElement('td');
							var radio1 = document.createElement('input');
								radio1.setAttribute('name', 'campaign_id');
								radio1.setAttribute('id', 'campaign_id_1');
								radio1.setAttribute('value', '1');
								radio1.setAttribute('type', 'radio');
							td11.appendChild(radio1);
						var td12 = document.createElement('td');
							var td12_label = document.createElement('label');
								td12_label.setAttribute('for','campaign_id_1');
								td12_label.appendChild(document.createTextNode('Ein Tag'));
							td12.appendChild(td12_label);
						var td13 = document.createElement('td');
							td13.appendChild(document.createTextNode('1 Tag'));
						var td14 = document.createElement('td');
							td14.appendChild(document.createTextNode('0 Credits'));
					trb1.appendChild(td11);
					trb1.appendChild(td12);
					trb1.appendChild(td13);
					trb1.appendChild(td14);
					var trb2 = document.createElement('tr');
						var td21 = document.createElement('td');
							var radio2 = document.createElement('input');
								radio2.setAttribute('name', 'campaign_id');
								radio2.setAttribute('id', 'campaign_id_2');
								radio2.setAttribute('value', '2');
								radio2.setAttribute('type', 'radio');
							td21.appendChild(radio2);
						var td22 = document.createElement('td');
							var td22_label = document.createElement('label');
								td22_label.setAttribute('for','campaign_id_2');
								td22_label.appendChild(document.createTextNode('Drei Tage'));
							td22.appendChild(td22_label);
						var td23 = document.createElement('td');
							td23.appendChild(document.createTextNode('3 Tage'));
						var td24 = document.createElement('td');
							td24.appendChild(document.createTextNode('0 Credits'));
					trb2.appendChild(td21);
					trb2.appendChild(td22);
					trb2.appendChild(td23);
					trb2.appendChild(td24);
					var trb3 = document.createElement('tr');
						var td31 = document.createElement('td');
							var radio3 = document.createElement('input');
								radio3.setAttribute('name', 'campaign_id');
								radio3.setAttribute('id', 'campaign_id_3');
								radio3.setAttribute('value', '3');
								radio3.setAttribute('type', 'radio');
							td31.appendChild(radio3);
						var td32 = document.createElement('td');
							var td32_label = document.createElement('label');
								td32_label.setAttribute('for','campaign_id_3');
								td32_label.appendChild(document.createTextNode('Fünf Tage'));
							td32.appendChild(td32_label);
						var td33 = document.createElement('td');
							td33.appendChild(document.createTextNode('5 Tage'));
						var td34 = document.createElement('td');
							td34.appendChild(document.createTextNode('0 Credits'));
					trb3.appendChild(td31);
					trb3.appendChild(td32);
					trb3.appendChild(td33);
					trb3.appendChild(td34);
				tbody.appendChild(trb1);
				tbody.appendChild(trb2);
				tbody.appendChild(trb3);
			tabelle.appendChild(thead);
			tabelle.appendChild(tbody);
			var button = document.createElement('input');
				button.setAttribute('type','button');
				button.setAttribute('class','button');
				button.setAttribute('name','commit');
				button.setAttribute('value','Bewerbungsphase in allen BFs starten');
				button.addEventListener('click', absenden, false);
		formNode.appendChild(tabelle);
		formNode.appendChild(button);

		// Formular anzeigen
		document.getElementById('content').appendChild(h2Node);
		document.getElementById('content').appendChild(InfoNode);
		document.getElementById('content').appendChild(formNode);

// Formular abschicken [BETA]
function absenden(){
	var check=0;
	if(radio1.checked == true){
		check = 1;
	}else if(radio2.checked == true){
		check = 2;
	}else if(radio3.checked == true){
		check = 3;
	}

	if(check>0){
		for each (TR in document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")){
			if(TR.getElementsByTagName("td")[6].innerHTML.match(/\d/) >= 4){
				var wacheID = TR.getElementsByTagName("td")[1].innerHTML.match(/\d+/);
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://www.feuerwache.net/feuerwache/campaign",
					headers: { "Content-type" : "application/x-www-form-urlencoded" },
					data: encodeURI("id="+wacheID+"&campaign_id="+check),
					onload: function(e) {  }
				});
			}
		}
		boxGruen('In allen BFs wurde eine Bewebungsphase gestartet!', InfoNode);
	}else{
		boxRot('Du musst einen Bewerbungszeitraum festlegen!', InfoNode);
	}
}
}

function zeigeBewerbungUndBesetzung(){
	//Auswertungsfunktion für die Anzeige der Feuerwehrleute
	function n(zahl){
		if(zahl == 0){
			return '-';
		}else{
			return zahl;
		}
	}

	for each (TR in document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")){
	
		// Bewerbungsphasen der BFs und FFs anzeigen
 		if(GM_getValue('toolset_bewerbungsphasenAnzeigen', true) == true){
			var wacheID = TR.getElementsByTagName("td")[1].innerHTML.match(/\d+/);
			GM_xmlhttpRequest({
				method: "get",
				url: "http://www.feuerwache.net/feuerwachen/"+wacheID,
				headers: { "Content-type" : "application/x-www-form-urlencoded" },
				onload: function(r){
					var zeit1 = r.responseText.match(/Bewerbungsphase:\s+<\/td>\s+<td>\s+Läuft bis zum \d+\.\d+\.\d+ \d+:\d+/);
					if(!zeit1){
						zeit1 = r.responseText.match(/Feuerwehrleute werben:\s+<\/td>\s+<td>\s+Läuft bis zum \d+\.\d+\.\d+ \d+:\d+/);
					}
					//alert(zeit1);
					if(zeit1){
						var wacheID = r.finalUrl.toString().match(/\d+/);
						var zeit2 = zeit1.toString().match(/\d+\.\d+\.\d+ \d+:\d+/);
						if(zeit2){
							var beNode = document.createElement('p');
								beNode.setAttribute('class', 'fontSmall');
									var beNodeText1 = document.createTextNode('Bewerbungsphase bis: '+zeit2); //BF
									var beNodeText2 = document.createTextNode('Werbungsphase bis: '+zeit2);   //FF
							for each (TR2 in document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")){
								if(TR2.getElementsByTagName("td")[1].innerHTML.match(/feuerwachen\/\d+/).toString().match(/\d+/).toString() == wacheID){
									if(TR2.getElementsByTagName("td")[6].innerHTML.match(/\d/) >= 4){ //BF
										TR2.getElementsByTagName("td")[1].appendChild(beNode).appendChild(beNodeText1);
									}else{ //FF
										TR2.getElementsByTagName("td")[1].appendChild(beNode).appendChild(beNodeText2);
									}
								}
							}
						}
					}
				}
			});
		}
		
		// Feuerwehrleute anzeigen
		if(GM_getValue('toolset_feuerwehrleuteAnzeigen', false) == true){

			var wacheID = TR.getElementsByTagName("td")[1].innerHTML.match(/\d+/);
			GM_xmlhttpRequest({
				method: "get",
				url: "http://www.feuerwache.net/feuerwachen/"+wacheID+"/feuerwehrleute",
				headers: { "Content-type" : "application/x-www-form-urlencoded" },
				onload: function(r){
					var freie = r.responseText.match(/Frei - nicht im Dienst/g);
					var einsatze = r.responseText.match(/Beim Einsatz/g);
					var schule = r.responseText.match(/In der Feuerwehrschule/g);
					var bereite = r.responseText.match(/Einsatzbereit/g);
					var f=0, e=0, l=0, b=0;
					for each(frei in freie) f++;
					for each(einsatz in einsatze) e++;
					for each(schul in schule) l++;
					for each(bereit in bereite) b++;
					var wacheID = r.finalUrl.toString().match(/\d+/);
					//alert('Wache: '+wacheID+'\n---------------------\nFrei - nicht im Dienst: '+f+'\nBeim Einsatz: '+e+'\nIn der Feuerwehrschule: '+l+'\nEinsatzbereit: '+b); //DEBUG
					var leNode = document.createElement('p');
						leNode.setAttribute('class', 'fontSmall');
						var fNode = document.createElement('span');
							fNode.setAttribute('style', 'color:#666666;');
							fNode.appendChild(document.createTextNode(n(f)));
						var s1Node = document.createElement('span');
							s1Node.appendChild(document.createTextNode(' / '));
						var eNode = document.createElement('span');
							eNode.setAttribute('style', 'color:#FF0000;');
							eNode.appendChild(document.createTextNode(n(e)));
						var s2Node = document.createElement('span');
							s2Node.appendChild(document.createTextNode(' / '));
						var lNode = document.createElement('span');
							lNode.setAttribute('style', 'color:#5555FF;');
							lNode.appendChild(document.createTextNode(n(l)));
						var s3Node = document.createElement('span');
							s3Node.appendChild(document.createTextNode(' / '));
						var bNode = document.createElement('span');
							bNode.appendChild(document.createTextNode(n(b)));
					leNode.appendChild(bNode);
					leNode.appendChild(s1Node);
					leNode.appendChild(eNode);
					leNode.appendChild(s2Node);
					leNode.appendChild(lNode);
					leNode.appendChild(s3Node);
					leNode.appendChild(fNode);
					for each (TR2 in document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")){
						if(TR2.getElementsByTagName("td")[1].innerHTML.match(/feuerwachen\/\d+/).toString().match(/\d+/).toString() == wacheID){
							TR2.getElementsByTagName("td")[5].appendChild(leNode);
						}
					}
				}
			});
		}
	}
}

function Sondergebiete(){
	var TD=document.getElementsByTagName("td");
	for (var i=0;TD.length > i; i++){
		var A=TD[i].getElementsByTagName("a");
		for (var j=0;A.length > j; j++){
		if ( A[j].href.indexOf("http://www.feuerwache.net/feuerwehr-einsaetze/") == 0)
		{ 
			// Ermitteln ob Neustadt oder nicht!
			var k=parseInt(i);
			var checkVerband=TD[k+1].firstChild.nodeValue.match("Andere Stadt");
			if(checkVerband == 'Andere Stadt'){
				var area = "Verbandseinsatz!";
			} else {
				var posArr = TD[k+1].getElementsByTagName('a')[0].firstChild.nodeValue.split(" - ");;
				var area = getAreaDescription(parseInt(posArr[0]), parseInt(posArr[1]));
				if (area.match("Flughafen")) {
					TD[k+1].getElementsByTagName('a')[0].style.color="#FF1100";
					TD[k+1].getElementsByTagName('a')[0].title='Flughafen';
				} else if (area.match("Hafen")) {
					TD[k+1].getElementsByTagName('a')[0].style.color="#1865C9";
					TD[k+1].getElementsByTagName('a')[0].title='Hafen';
				} else if (area.match("Güterbahnhof")) {
					TD[k+1].getElementsByTagName('a')[0].style.color="#D4D400";
					TD[k+1].getElementsByTagName('a')[0].title='Güterbahnhof';
				} else if (area.match("Bahnlinie")) {
					TD[k+1].getElementsByTagName('a')[0].style.color="#D4D400";
					TD[k+1].getElementsByTagName('a')[0].title='Bahnlinie';
				} else if (area.match("Raffinerie")) {
					TD[k+1].getElementsByTagName('a')[0].style.color="#FF00FF";
					TD[k+1].getElementsByTagName('a')[0].title='Raffinerie';
				} else if (area.match("Altstadt")) {
					TD[k+1].getElementsByTagName('a')[0].style.color="#FFFFFF";
					TD[k+1].getElementsByTagName('a')[0].title='Altstadt';
				}
			}
        }
      }
    }
}
		
//
// ---------- userscript updater --------------------------------------------------------------------------------------
//
function userscriptUpdater() {
var userscriptUpdater = function(){
    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 150px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 604800,                                    // default check interval: check once a week [in seconds]
                                                                  // Please don't set 'checkInterval' to more than once a day to limit unnecessary server load on userscripts.org
        injectInto:    document.getElementsByTagName("body")[0],  // default dom-node for the updater-message to be inserted
        updaterCss:    css                                        // default styles of updater message
    };
    var lastCheck   = GM_getValue("lastCheck", 0);
    var lastVersion = GM_getValue("lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)[\r\n]/,
        change:     /@change\s+(.*)[\r\n]/,
        depricated: /@depricated\s+(.*)[\r\n]/
    };
    var updater;


    // check remote userscript for version
    var checkRemoteUserscript = function(){
        GM_xmlhttpRequest({
            method:  "GET",
            url:     "http://userscripts.org/scripts/source/" + config.scriptId + ".meta.js",
            headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue("lastCheck", currentTime);
                for(m in meta){meta[m] = (meta[m].exec(resp.responseText) ? meta[m].exec(resp.responseText)[1] : null);}
                if(isNewer(meta.version, config.currentVersion) && isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                }
            }
        });
    };


    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p){
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp){
            if(parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if(parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if(parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    };


    // skip current update until next
    var skipUpdate = function(ev){
        ev.preventDefault();
        GM_setValue("lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    };


    // initialization
    var initialize = function(options){
        // merge options into config
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}

        // already checked for an update today?
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };


    // build updater message and inject it into DOM
    var build = function(){
        var updater = document.createElement("div");
            updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
            hide.className = "greasemonkey_updater_link_to_hide";
        if(meta.depricated == null){
            var a_hide = document.createElement("a");
                a_hide.href = "";
                a_hide.addEventListener("click", skipUpdate, false);
            var a_span = document.createElement("span");
                a_span.appendChild(document.createTextNode("Überspringen und auf nächstes Update warten!"));
            a_hide.appendChild(a_span);
            hide.appendChild(a_hide);
        }
        var h1 = document.createElement("h1");
            h1.appendChild(hide);
            h1.appendChild(document.createTextNode(meta.depricated == null ? "UserScript-Update Ngefunden!" : "UserScript gelöscht!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if(meta.depricated == null){
            var text = "Für das Script <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> ist ein Update verfügbar.<br>";
                text += meta.change ? "<br>Änderungen: " + meta.change + "<br><br>" : "";
                text += "aktuell installierte Version: <b>" + config.currentVersion + "</b>, neueste Version: <b>" + meta.version + "</b>.<br><br><a href=\"http://userscripts.org/scripts/source/" + config.scriptId + ".user.js\">Update auf Version " + meta.version + " starten</a>";
        } else {
            var text = "Das Projekt <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> wurde geschlosseni.<br>";
                text += meta.depricated && meta.depricated != "true" ? "<br>" + meta.depricated + "<br><br>" : "";
                text += "Bitte lösche dein Script!";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) : config.injectInto.appendChild(updater));
        return updater;
    };

    return { init: initialize };
}();

// initialize updater
userscriptUpdater.init({
    scriptId:       USERSCRIPTID, // userscriptid kommt aus Konstante von ganz oben;
    currentVersion: version,        // version kommt aus Variable von ganz oben; versioning scheme: major.minor[.bugfix]
	checkInterval:  3600,                              // 43200 entspricht alle 12h
    injectInto:     document.getElementById("msgArea")   // inject updater-message into this DOM-node
//    updaterCss:     ""                                   // individual css rules (see 'Styling of updater-message' below)
});
}
//
// ---------- / userscript updater ------------------------------------------------------------------------------------
//















