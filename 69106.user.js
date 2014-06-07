// ==UserScript==
// @name           Feuerwache.net nextGen Ereglam's thafner AAO
// @namespace      http://www.ereglam.de
// @copyright      2010+, Ereglam (http://userscripts.org/users/Ereglam {135263})
// @license        GPL version 3 oder jede spätere Version; http://www.gnu.org/copyleft/gpl.html
// @description    Alarm- und Ausrückordnung, sowie weitere Tools für das Browserspiel Feuerwache.net
// @require        http://userscripts.org/scripts/source/121220.user.js
// @require        http://userscripts.org/scripts/source/121239.user.js
// @icon           http://www.feuerwache.net/favicon.ico
// @include        http://www.feuerwache.net/*
// @exclude        http://www.feuerwache.net/forum/*
// @author         Ereglam
// @info           komplete Neuentwicklung auf Basis von Ereglam's AAO
// @version        1.0.5
// ==/UserScript==
const VERSION      = '1.0.5'
/* ******************************************************************************************
ACHTUNG
Wenn das Script angepasst und erneut auf userscripts.org veröffentlicht wird,
MUSS die USERSCRIPTID angepasst werden.

WENN DU DIESEN ABSCHNITT NICHT 100% VERSTANDEN UND BEFOLGT HAST, STELLE DAS GEÄNDERTE SCRIPT NICHT ONLINE!
   ******************************************************************************************/
const USERSCRIPTID = '69106'; // diese Konstante ist anzupassen
/*
  Diese Script ist von Grund auf neu entwickelt worden und verwendet für die zentralen Daten (objektorientierte) Klassen.
  Außerdem wurden (sämtliche) Routinen überarbeitet und z.T. erweitert.

  Begrifflichkeiten:
    Einsatzmeldung: die Meldung, die den jeweiligen Einsatz bestimmt
    Alarmierungsstichwort: Stichwort, nach dem ein Einsatz abgearbeitet werden soll
    Fahrzeugklasse: die Gruppierung von Fahrzeugen, die die gleiche Tätigkeit ausführen (betrifft bisher LF-artige Fahrzeuge)
*/


/*-------------------------------------------------------------------------------
allgemeine Initialisieungen
---------------------------------------------------------------------------------*/
var main = null;

var running = false;
var firstExec = true; //Script nach Laden erstmals ausgeführt
var markReq = true; //Fahrzeuge zur Alarmierung markieren
var userSel = false; //Änderung Fahrzeugauswahl durch Anwender
var msgArea;

// Layoutdesign  holen (temporär)
var layoutNew = (unsafeWindow.feuerwache_layout == 'light');

/* ******************************************************************************************
  H I N W E I S !!
  sollte die AAO im Script geändert werden, darf dies erst ab hier geschehen.
*/

var MeldungLst = {
/*
  Diese Liste stellt die Grundeinstellungen dieses Scriptes zur Verfügung
  Zur Laufzeit werden die Vorgaben aus 'mld' bei der Initialisierung in den Schlüssel 'mldCls' übertragen,
  wobei primär nach gespeicherten Werten der Greasemonkey-Umgebung gesucht wird.

  Syntax in der Alarmierungsliste:
    Alarmierungsstichwort zuerst, dann ggf. ein Plus (+) und weiter Fahrzeugklassen, diese
    durch Komma (,) voneinander getrennt. Alternativen durch Schrägstrich (/) getrennt
    Optionale Fahrzeuge (werden nur in der Liste hervorgehoben) mit Pipe (|) anfügen
    zum Beispiel 'F1+RW/TS,ELW|GW-M,DLK' ->
        alarmiere alles nach F1, zusätzlich einen RW oder LF16-TS, sowie einen ELW.
        markiere zusätzlich den nächsten GWM sowie die nächste DLK
*/


//F1
  'Brand in Briefkasten'           : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brand_in_Briefkasten'},
  'Brennende Telefonzelle'         : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennende_Telefonzelle'},
  'Brennender LKW'                 : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennender_LKW'},
  'Brennende Bäume'                : {mld: 'F1'                          , storm: false, ab: {FW:  2}, wiki: 'Brennende_B%C3%A4ume'},
  'Brennender Müllwagen'           : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennender_M%C3%BCllwagen'},
  'Brennender PKW'                 : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennender_PKW'},
  'Brennender Sicherungskasten'    : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennender_Sicherungskasten'},
  'Brennendes Bus-Häuschen'        : {mld: 'F1'                          , storm: false, ab: {FW:  3}, wiki: 'Brennendes Bus-H%C3%A4uschen'},
  'Brennendes Gebüsch'             : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennendes_Geb%C3%BCsch'},
  'Brennendes Gras'                : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennendes_Gras'},
  'Container Brand'                : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Containerbrand'},
  'Feuer im Laubhaufen'            : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Feuer_im_Laubhaufen'},
  'Gartenlaubenbrand'              : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Gartenlaubenbrand'},
  'Grasnarbenbrand'                : {mld: 'F1'                          , storm: false, ab: {FW: 59}, wiki: 'Grasnarbenbrand'},
  'Motorrad-Brand'                 : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Motorradbrand'},
  'Mülleimer Brand'                : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'M%C3%BClleimerbrand'},
  'Sperrmüllbrand'                 : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Sperrm%C3%BCllbrand'},
  'Traktorbrand'                   : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Traktorbrand'},
  'Trocknerbrand'                  : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Trocknerbrand'},
  'Wohnwagenbrand'                 : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Wohnwagenbrand'},
  'Kleiner Waldbrand'              : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Kleiner_Waldbrand'},

//F1 Sonderfahrzeug
  'Feldbrand'                      : {mld: 'F1+GWL'                      , storm: false, ab: {FW:  1}, wiki: 'Feldbrand'},
  'Strohballen Brand'              : {mld: 'F1+GWL'                      , storm: false, ab: {FW:  1}, wiki: 'Strohballen_Brand'},

//F2
  'Brand in Gemeindehaus'          : {mld: 'F2'                          , storm: false, ab: {FW:  3}, wiki: 'Brand_in_Gemeindehaus'},
  'Garagenbrand'                   : {mld: 'F2'                          , storm: false, ab: {FW:  4}, wiki: 'Garagenbrand'},
  'Kellerbrand'                    : {mld: 'F2'                          , storm: false, ab: {FW:  3}, wiki: 'Kellerbrand'},
  'Kioskbrand'                     : {mld: 'F2'                          , storm: false, ab: {FW:  2}, wiki: 'Kioskbrand'},
  'Küchenbrand'                    : {mld: 'F2'                          , storm: false, ab: {FW:  2}, wiki: 'K%C3%BCchenbrand'},
  'Wohnungsbrand'                  : {mld: 'F2'                          , storm: false, ab: {FW:  2}, wiki: 'Wohnungsbrand'},

//F2 Sonderfahrzeug
  'Brennende S-Bahn'               : {mld: 'F2+GWS'                      , storm: false, ab: {FW: 20}, wiki: 'Brennende_S-Bahn'},
  'Dachstuhlbrand'                 : {mld: 'F2+DLK'                      , storm: false, ab: {FW:  3}, wiki: 'Dachstuhlbrand'},
  'Fettbrand in Pommesbude'        : {mld: 'F2+GTLF'                     , storm: false, ab: {FW:  3}, wiki: 'Fettbrand_in_Pommesbude'},
  'Kaminbrand'                     : {mld: 'F2+DLK'                      , storm: false, ab: {FW:  5}, wiki: 'Kaminbrand'},
  'Mähdrescherbrand'               : {mld: 'F2+GTLF'                     , storm: false, ab: {FW:  5}, wiki: 'M%C3%A4hdrescherbrand'},
  'Schornsteinbrand'               : {mld: 'F2+DLK'                      , storm: false, ab: {FW:  3}, wiki: 'Schornsteinbrand'},

//F3
  'Gastronomiebrand'               : {mld: 'F3'                          , storm: false, ab: {FW:  8}, wiki: 'Gastronomiebrand'},
  'Silobrand'                      : {mld: 'F3'                          , storm: false, ab: {FW: 20}, wiki: 'Silobrand'},

//F3 Sonderfahrzeug
  'Brand in KFZ-Werkstatt'         : {mld: 'F3+FwK'                      , storm: false, ab: {FW: 15}, wiki: 'Brand_in_KFZ-Werkstatt'},
  'Maschinenbrand'                 : {mld: 'F3+GWL,ELW'                  , storm: false, ab: {FW:  5}, wiki: 'Maschinenbrand'},
  'Scheunenbrand'                  : {mld: 'F3+GWL'                      , storm: false, ab: {FW: 30}, wiki: 'Scheunenbrand'},
  'Brand im Supermarkt'            : {mld: 'F3+FwK,DLK'                  , storm: false,   
ab: {FW:  4}, wiki: 'Brand_im_Supermarkt'},

//F4
  'Brand in Kletterhalle'          : {mld: 'F4'                          , storm: false, ab: {BF: 45}, wiki: 'Brand_in_Kletterhalle'},
  'Brand in Schloss'               : {mld: 'F4'                          , storm: false, ab: {FW: 20}, wiki: 'Brand_in_Schloss'},

//F4 Sonderfahrzeug
  'Waldbrand'                      : {mld: 'F4+GWL,LF'                   , storm: false, ab: {FW: 20}, wiki: 'Waldbrand'},
  'Brand in Metzgerei'             : {mld: 'F4+GWL'                      , storm: false, ab: {BF:  2}, wiki: 'Brand_in_Metzgerei'},

//F5
  'Brand in Schule'                : {mld: 'F5'                          , storm: false, ab: {FW:  5}, wiki: 'Brand_in_Schule'},
  'Feuer im Altenheim'             : {mld: 'F5'                          , storm: false, ab: {FW:  6}, wiki: 'Feuer_im_Altenheim'},

//F5 Sonderfahrzeug
  'Kinobrand'                      : {mld: 'F5+GTLF'                     , storm: false, ab: {FW: 10}, wiki: 'Kinobrand'},

//F6
  'Wohnblockbrand'                 : {mld: 'F6'                          , storm: false, ab: {FW: 45}, wiki: 'Wohnblockbrand'},

//F7
  'Brand in Sporthalle'            : {mld: 'F7'                          , storm: false, ab: {FW: 40}, wiki: 'Brand_in_Sporthalle'},
  'Brand im Sägewerk'              : {mld: 'F7'                          , storm: false, ab: {FW: 40}, wiki: 'Brand_im_S%C3%A4gewerk'}, 

//F8
  'Gewerbebrand'                   : {mld: 'F8'                          , storm: false, ab: {FW: 35}, wiki: 'Gewerbebrand'},

//F8 Sonderfahrzeug
  'Brand in Druckerei'             : {mld: 'F8+GWL'                      , storm: false, ab: {BF: 20}, wiki: 'Brand_in_Druckerei'},

//F9
  'Brand im Casino'                : {mld: 'F9'                          , storm: false, ab: {FW: 50}, wiki: 'Brand_in_Casino'},

//F10
  'Brand in Zugdepot'              : {mld: 'F10'                         , storm: false, ab: {FW: 10}, wiki: 'Brand_in_Zugdepot'},

//F11
  'Brand in Eishalle'              : {mld: 'F11'                          , storm: false, ab: {FW:  5}, wiki: 'Brand_in_Eishalle'},

//F1GSG
  'Schuppenbrand'                  : {mld: 'F1GSG'                       , storm: false, ab: {FW:  4}, wiki: 'Schuppenbrand'},

//F2GSG
  'Brand in Spedition'             : {mld: 'F2GSG'                       , storm: false, ab: {FW:  5}, wiki: 'Brand_in_Spedition'},

//F3GSG Sonderfahrzeug
  'Brand im Baumarkt'              : {mld: 'F3GSG+GWA,RW'                , storm: false, ab: {BF: 20}, wiki: 'Brand_im_Baumarkt'},
  'Brand in Autohaus'              : {mld: 'F3GSG+GWA,DLK'               , storm: false, ab: {FW: 10}, wiki: 'Brand_in_Autohaus'},
  'Brand in Gärtnerei'             : {mld: 'F3GSG+DLK'                   , storm: false, ab: {FW:  8}, wiki: 'Brand_in_G%C3%A4rtnerei'},
  'Brand in Kühlhaus'              : {mld: 'F3GSG+DLK,GWL'               , storm: false, ab: {FW: 20}, wiki: 'Brand_in_K%C3%BChlhaus'},
  'Brand in Lackfabrik'            : {mld: 'F3GSG+DLK,GWA'               , storm: false, ab: {FW: 25}, wiki: 'Brand_in_Lackfabrik'},
  'Brand in Reifenlager'           : {mld: 'F3GSG+GWL'                   , storm: false, ab: {FW: 20}, wiki: 'Brand_in_Reifenlager'},

//F4GSG
  'Feuer im Krankenhaus'           : {mld: 'F4GSG'                       , storm: false, ab: {BF: 40}, wiki: 'Feuer_im_Krankenhaus'},

//Feuer Flughafen
  'Brennendes Flugzeug'            : {mld: 'CrashAirport'                , storm: false, ab: {BF: 59}, wiki: 'Brennendes_Flugzeug'},

//Feuer Raffinerie
//F1Raff 
  'Tankbrand'                      : {mld: 'F1Raff'                      , storm: false, ab: {FW: 64}, wiki: 'Tankbrand'},

//F2Raff 
  'Brennt Tanklager'               : {mld: 'F2Raff'                      , storm: false, ab: {FW: 64}, wiki: 'Brennt_Tanklager'},

//F3Raff 
  'Brand in Betankungsanlage'       : {mld: 'F3Raff+GWA'                 , storm: false, ab: {FW: 64}, wiki: 'Brand_in_Betankungsanlage'},
  'Brand in Raffinerie'             : {mld: 'F3Raff'                     , storm: false, ab: {FW: 64}, wiki: 'Brand_in_Raffinerie'},

//Feuer Bahn
//BahnF1
  'Brand am Bahndamm'              : {mld: 'BahnF1'                          , storm: false, ab: {FW: 65}, wiki: 'Brand_am_Bahndamm'},

//BahnF2
  'Brennender Güterzug'            : {mld: 'BahnF2GSG'    , storm: false, ab: {FW: 65}, wiki: 'Brennender_G%C3%BCterzug'      },
  'Feuer im Personenzug'           : {mld: 'BahnF2'             , storm: false, ab: {FW: 65}, wiki: 'Feuer_im_Personenzug'},

//Feuer Hafen Wasser
//FB1
  'Feuer auf Boot (Klein)'         : {mld: 'FB1'                         , storm: false, ab: {BF: 30}, onWater: true, wiki: 'Feuer_auf_Boot_(klein)'},
  'Feuer auf Boot (Mittel)'        : {mld: 'FB1+FLB'                     , storm: false, ab: {BF: 45}, onWater: true, wiki: 'Feuer_auf_Boot_(mittel)'},

// Techniche Hilfeleistung
//TH1
  'Baum auf Straße'                : {mld: 'TH1'                         , storm: true,  ab: {FW:  1}, wiki: 'Baum_auf_Stra%C3%9Fe'},
  'Keller unter Wasser'            : {mld: 'TH1'                         , storm: true,  ab: {FW:  2}, wiki: 'Keller_unter_Wasser'},
  'Kleintier in Not'               : {mld: 'TH1'                         , storm: false, ab: {FW:  2}, wiki: 'Kleintier_in_Not'},
  'Person in Schacht'              : {mld: 'TH1'                         , storm: false, ab: {FW:  3}, wiki: 'Person_in_Schacht'},
  'Türöffnung'                     : {mld: 'TH1'                         , storm: false, ab: {FW:  2}, wiki: 'T%C3%BCr%C3%B6ffnung'},

//TH1 Sonderfahrzeug
  'Auslaufende Betriebsstoffe'     : {mld: 'TH1+GWÖl'                     , storm: false, ab: {FW:  4}, wiki: 'Auslaufende_Betriebsstoffe'},
  'Fahrstuhl - Türöffnung'         : {mld: 'TH1+RW'                       , storm: false, ab: {FW: 15}, wiki: 'Fahrstuhl-T%C3%BCr%C3%B6ffnung'},
  'Ölspur'                         : {mld: 'TH1+GWÖl'                     , storm: false, ab: {FW:  5}, wiki: '%C3%96lspur'},


//TH2
  'Auffahrunfall'                  : {mld: 'TH2'                          , storm: false, ab: {FW:  4}, wiki: 'Auffahrunfall'},

//TH3
  'Baum auf Auto'                  : {mld: 'TH3'                          , storm: true,  ab: {FW:  9}, wiki: 'Baum_auf_Auto'},
  'Verkehrsunfall'                 : {mld: 'TH3'                     , storm: false, ab: {FW:  4}, wiki: 'Verkehrsunfall'},

//TH4
  'Baum auf Dach'                  : {mld: 'TH4'                          , storm: true,  ab: {FW:  8}, wiki: 'Baum_auf_Dach'}, 

//TH5 
  'VU mit Straßenbahn'             : {mld: 'TH5'                          , storm: false, ab: {FW: 20}, wiki: 'VU_mit_Strassenbahn'},

// Techniche Hilfeleistung Wasser
//TH10
  'Person im Fluss'                : {mld: 'TH10'                         , storm: false, ab: {BF: 25}, wiki: 'Person_im_Fluss'},

//TH11
  'PKW in Fluss'                   : {mld: 'TH11'                         , storm: false, ab: {FW: 15}, wiki: 'PKW_in_Fluss'},
  'Gabelstapler im Hafenbecken'    : {mld: 'TH11'                         , storm: false, ab: {FW: 40}, wiki: 'Gabelstapler_im_Hafenbecken'},

// Techniche Hilfeleistung Bahn
//BahnTH1 
 'Baum auf Schiene'               : {mld: 'BahnTH1'                       , storm: true, ab: {FW: 65},  wiki: 'Baum_auf_Schiene'},  

//BahnTH2
  'Güterzug entgleist'             : {mld: 'BahnTH2'                      , storm: false, ab: {FW: 65}, wiki: 'G%C3%BCterzug_entgleist'},

//Gefahrengut
//GSG1
  'Chemieunfall (an Schule)'       : {mld: 'GSG1'                         , storm: false, ab: {BF:  2}, wiki: 'Chemieunfall_(an_Schule)'},

//GSG2
  'Chlorgas Alarm (Schwimmbad)'    : {mld: 'GSG2'                         , storm: false, ab: {BF:  3}, wiki: 'Chlorgas_Alarm_(Schwimmbad)'},

//GSG3
  'Gefahrstoff-Austritt in Firma'  : {mld: 'GSG3'                         , storm: false, ab: {FW: 40, BF: 2}, wiki: 'Gefahrstoff-Austritt_in_Firma' },

//GSG4 Straße
  'Unfall mit Gefahrgut-Transport' : {mld: 'GSG4'                         , storm: false, ab: {FW: 40, BF: 2}, wiki: 'Unfall_mit_Gefahrgut-Transport'},



//Bahnstecke Rettungszug
//RTZ
  'RTZ-Einsatz'                    : {mld: 'RTZ'                          , storm: false, ab: {FW: 65}, wiki: 'RTZ-Einsatz'},


//Großeinsatz in Verband
  'Brand in Industriepark'         : {mld: 'VGSL'                         , storm: false, ab: {MG:  3}, wiki: 'Brand_in_Industriepark'}, //Verbandsgroßschadenslage
  'Brand in Steinbruch'            : {mld: 'VGSL'                         , storm: false, ab: {MG:  3}, wiki: 'Brand_in_Steinbruch'}, //Verbandsgroßschadenslage


//Weihnachteinsätze
  'Brand-Weihnachtsbaum in Kirche' : {mld: 'F4'                           , storm: false, ab: {FW:  6}, wiki: 'Brand-Weihnachtsbaum_in_Kirche'},
  'Brand auf Weihnachtsmarkt'      : {mld: 'F1'                           , storm: false, ab: {FW:  3}, wiki: 'Brand_auf_Weihnachtsmarkt'},

//Rettungsdienst
  'Verletztentransport'            : {mld: 'RD'                          , storm: false, ab: {FW: 50}, wiki: 'Verletztentransport'},




};

var StichwortLst = {
/*
  Diese Liste definiert, welche Fahrzeuge in der Grundeinstellung zu den verschiedenen Alarmierungsstichworten geschickt werden.
  Zur Laufzeit werden die Vorgaben aus 'vhc' bei der Initialisierung in den Schlüssel 'vehicles' übertragen,
  wobei primär nach gespeicherten Werten der Greasemonkey-Umgebung gesucht wird, wenn implementiert.

  Einzelne Fahrzeuge werden durch Komma (,) getrennt, Alternativen durch (/).
  !!!ACHTUNG: HIER KEINE OPTIONALEN FAHRZEUGE (|) EINTRAGEN!!!
  Syntax: Text, Fahrzeuge
*/
  'F1'       :  {txt: 'Feuer, Klein',                    vhc: 'LF/TS'},
  'F2'       :  {txt: 'Feuer, Mittel',                   vhc: 'LF,LF/TS'},
  'F3'       :  {txt: 'Feuer, Mittel',                   vhc: 'LF,LF,LF/TS'},
  'F4'       :  {txt: 'Feuer, Groß',                     vhc: 'LF,LF,LF/TS,DLK,ELW'},
  'F5'       :  {txt: 'Feuer, Groß A',                   vhc: 'LF,LF,LF/TS,DLK,GWA,ELW'},
  'F6'       :  {txt: 'Feuer, Groß A',                   vhc: 'LF,LF,LF,LF/TS,DLK,GWA,ELW'},
  'F7'       :  {txt: 'Feuer, Groß AW',                  vhc: 'LF,LF,LF/TS,DLK,GWL,GWA,ELW'},
  'F8'       :  {txt: 'Feuer, Groß AR',                  vhc: 'LF,LF,LF/TS,DLK,GWA,ELW,RW'},
  'F9'       :  {txt: 'Feuer, Groß TWA',                 vhc: 'LF,LF,LF,LF,LF,LF,LF,LF/TS,DLK,GWA,GTLF,GWL,ELW'},
  'F10'      :  {txt: 'Feuer, Groß RLS',                 vhc: 'LF,LF,LF,LF/TS,DLK,GWS,GWL,ELW,RW'}, 
  'F11'      :  {txt: 'Feuer, Groß RLT',                 vhc: 'LF,LF,LF,LF/TS,DLK,GTLF,GWL,ELW'},

  'F1GSG'    :  {txt: 'Feuer, Mittel GSG',               vhc: 'LF,LF/TS,GWM,GWG'},
  'F2GSG'    :  {txt: 'Feuer, Groß GSG',                 vhc: 'LF,LF,LF/TS,GTLF,GWL,ELW,RW,DLK,GWM,GWG'},
  'F3GSG'    :  {txt: 'Feuer, Groß GSG',                 vhc: 'LF,LF,LF,LF/TS,ELW,GWM,GWG'}, 
  'F4GSG'    :  {txt: 'Feuer, Groß GSG',                 vhc: 'LF,LF,LF,LF,LF,LF,LF,LF/TS,GTLF,GWL,GWA,ELW,RW,DLK,GWM,GWG'},

  'CrashAirport'    :  {txt: 'brennt Flugzeug',          vhc: 'FLF,FLF,FLF,FLF,FLF,FLF,FLF,FLF,FLF,FLF,RTr,ELW,GWG,GWM,RW,GWÖl'},

  'F1Raff'    :  {txt: 'Feuer, Raffinerie',              vhc: 'LF,LF,LF,LF,LF,ULF,ULF,ULF,ULF,ULF,ULF,ELW,RW,GWÖl,TUIS'},
  'F2Raff'    :  {txt: 'Feuer, Raffinerie',              vhc: 'LF,LF,LF,LF,LF,ULF,ULF,ULF,ULF,ULF,ULF,ELW,RW,GWÖl,TUIS,GTLF,GWL,GWM'},
  'F3Raff'    :  {txt: 'Feuer, Raffinerie',              vhc: 'LF,LF,LF,LF,LF,ULF,ULF,ULF,ULF,ULF,ULF,ELW,RW,GWÖl,TUIS,GTLF,GWL,GWM,GWG,FwK,DLK'},
 
 'BahnF1'      :  {txt: 'Feuer, Bahn Klein',             vhc: 'LF/HLFS'},
 'BahnF2'      :  {txt: 'Feuer, Bahn  Einsatz RTZ',      vhc: 'ELW,GWL,GTLF'},
 'BahnF2GSG'   :  {txt: 'Feuer, Bahn  Einsatz RTZ',      vhc: 'ELW,GWG,GWM,GWL,TUIS'},

 'TH1'         :  {txt: 'TH Klein',                      vhc: 'LF/TS'},
 'TH2'         :  {txt: 'TH Klein',                      vhc: 'LF,LF/TS'},
 'TH3'         :  {txt: 'TH VU',                         vhc: 'LF/TS,RW,GWÖl'},
 'TH4'         :  {txt: 'TH Dach',                       vhc: 'LF/TS,RW,DLK'},
 'TH5'         :  {txt: 'TH Straßenbahn',                vhc: 'LF,LF,LF/TS,RW,GWS,FwK,ELW'},

 'TH10'        :  {txt: 'TH Wasserrettung',              vhc: 'LF/TS,GWT'},
 'TH11'        :  {txt: 'TH Wasserrettung',              vhc: 'LF/TS,GWT,RW,FwK'},

 'BahnTH1'     :  {txt: 'TH, Bahn Klein',                vhc: 'LF/HLFS'},
 'BahnTH2'     :  {txt: 'TH, Bahn  Einsatz RTZ',         vhc: 'ELW,GWG,GWM,RW,DLK,TUIS,GWS'},
 

 'RTZ'       :  {txt: 'RTZ',               vhc: 'LF,LF,LF,LF'},


 'GSG1'       :  {txt: 'Gefahrguteinsatz',               vhc: 'LF,LF/TS,ELW,GWM,GWG'},
 'GSG2'       :  {txt: 'Gefahrguteinsatz',               vhc: 'LF,LF/TS,ELW,GWM,GWG,RW'},
 'GSG3'       :  {txt: 'Gefahrguteinsatz',               vhc: 'LF,LF,LF/TS,ELW,GWM,GWG,GWA,GWL'},
 'GSG4'       :  {txt: 'Gefahrguteinsatz',               vhc: 'LF,LF,LF/TS,ELW,GWM,GWG,GWA,RW,FwK'},

  'VGSL'     :  {txt: 'Verbandsgroßschadenslage',        vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF'},

  'FB1'      :  {txt: 'Feuer auf Boot',                  vhc: 'FLB'},

  // Rettungsmittel wird über Script ermittelt
  'RD'       :  {txt: 'Verletztentransport',             vhc: ''},
};

var FahrzeugeLst = {
/*
  Hier werden die verfügbaren Fahrzeuge mit ihrer Beschreibung, Zusatzwerten wie Geschwindigkeit und der Zuordnung zu einer Fahrzeugklasse aufgelistet.
  in der gleichen Reihenfolge, wie hier die Fahrzeugklassen aufgeführt sind,
  werden sie auch in der Verfügbarkeits-Anzeige der Einsatzinfobox angezeigt.
  Zu einem späteren Zeitpunkt soll es auch möglich sein, neue Fahrzeuge anzulegen und somit das Script nicht ändern zu müssen.

  Syntax: Fahrzeugklasse, Geschwindigkeit, Löschgruppenfahrzeug (und KLF), benötigt Ausbildung, RegExp-Ausdruck für Nachforderungssuche, Wiki-Seite
  Löschgruppenfahrzeug: für die Steuerung, ob zuerst Truppfahrzeuge besetzt werden sollen
  benötigt Ausbildung : für die Steuerung, ob zuerst Sonderfahrzeuge mit ausgebildeter Besatzung ausrücken sollen
  RegExp-Ausdruck     : wird benötigt, wenn man später mal die Fahrzeugklasse anpassen kann, da dies Auswirkung auf das nachfolgende FhzGruppeLst hat
*/
  'Kleinlöschfahrzeug' : {grp: 'LF',   speed: 60, groupVeh: true, regex: /Kleinlöschfahrzeug/, wiki: 'Kleinl%C3%B6schfahrzeug'},
  'LF 8'               : {grp: 'LF',   speed: 48, groupVeh: true, regex: /LF 8/, wiki: 'LF_8'},
  'LF 10/6'            : {grp: 'LF',   speed: 58, groupVeh: true, regex: /LF 10\/6/, wiki: 'LF_10/6'},
  'LF 20/16'           : {grp: 'LF',   speed: 60, groupVeh: true, regex: /LF 20\/16/, wiki: 'LF_20/16'},
  'HLF 10/6'           : {grp: 'LF',   speed: 58, groupVeh: true, regex: /HLF 10\/6/, wiki: 'HLF_10/6'},
  'HLF 20/16'          : {grp: 'LF',   speed: 60, groupVeh: true, regex: /HLF 20\/16/, wiki: 'HLF_20/16'},
  'HLF 24/14-S'        : {grp: 'HLFS', speed: 60, trainable: true , groupVeh: true, regex: /HLF 24\/14-S/, wiki: 'HLF_24/14-S'},
  'LF 16-TS'           : {grp: 'TS',   speed: 52, groupVeh: true, regex: /LF 16-TS/, wiki: 'LF_16-TS'},
  'DLA (K) 23/12'      : {grp: 'DLK',  speed: 63, regex: /Drehleiter|DLA [(]K[)] 23\/12/, wiki: 'DLA_(K)_23/12'},
  'RW'                 : {grp: 'RW',   speed: 49, regex: /Rüstwagen|RW/, wiki: 'RW'},
  'GW-Öl'              : {grp: 'GWÖl', speed: 51, regex: /GW-Öl/, wiki: 'GW-%C3%96l'},
  'GW-L2 - Wasser'     : {grp: 'GWL',  speed: 53, regex: /GW\s?-\s?L2\s?[-]?\s?Wasser/, wiki: 'GW-L2_Wasser'},
  'ELW 1'              : {grp: 'ELW',  speed: 77, regex: /ELW 1/, wiki: 'ELW_1'},
  'GW-A'               : {grp: 'GWA',  speed: 56, regex: /GW-A/, wiki: 'GW-A'},
  'TLF 16/25'          : {grp: 'TLF',  speed: 55, regex: /TLF 16\/25/, wiki: 'TLF_16/25'},
  'TLF 20/40 - SL'     : {grp: 'GTLF', speed: 49, regex: /TLF 20\/40 - SL/, wiki: 'TLF_20/40_SL'},
  'GW-Schiene'         : {grp: 'GWS',  speed: 57, regex: /GW-Schiene/, wiki: 'GW-Schiene'},
  'Kran'               : {grp: 'FwK',  speed: 55, regex: /Kran/, wiki: 'Kran'},
  'GW-Messtechnik'     : {grp: 'GWM',  speed: 40, trainable: true , regex: /GW-Messtechnic?k/, wiki: 'GW-M'},
  'GW-Gefahrgut'       : {grp: 'GWG',  speed: 46, trainable: true , regex: /GW-Gefahrgut/, wiki: 'GW-G'},
  'RTW'                : {grp: 'RTW',  speed: 75, trainable: true , regex: /RTW/, wiki: 'RTW'},
  'GW-Taucher'         : {grp: 'GWT',  speed: 62, trainable: true , regex: /GW-Taucher/, wiki: 'GW-T'},
  'GW-TUIS'            : {grp: 'TUIS', speed: 73, trainable: true , regex: /GW-TUIS/, wiki: 'GW-TUIS'},
  'ULF mit Löscharm'   : {grp: 'ULF',  speed: 40, regex: /ULF mit Löscharm|ULF/, wiki: 'ULF_mit_L%C3%B6scharm'},
'Flugfeldlöschfahrzeug': {grp: 'FLF',  speed: 110, trainable: true , regex: /Flugfeldlöschfahrzeug/, wiki: 'Flugfeldl%C3%B6schfahrzeug'},
  'Rettungstreppe'     : {grp: 'RTr',  speed: 65, trainable: true , regex: /Rettungstreppe/, wiki: 'Rettungstreppe'},
  'Feuerlöschboot'     : {grp: 'FLB',  speed: 60, trainable: true ,  regex: /Feuerlöschboot/, wiki: 'Loeschboot'},
  'Rettungsboot'       : {grp: 'RTB',  speed: 60, trainable: true ,  regex: /Rettungsboot/, wiki: 'Rettungsboot'},
};

// RegExp zur Suche nach nachzufordernden Fahrzeugen, Reihenfolge in Anzeigen
// da die Schlüssel intern im Script z.T. benutzt werden, sollte man sie nicht umbenennen
var FhzGruppeLst = {
  'RTW' : {text: 'Rettungswagen',           seq:  1, ab: {BF: 10}, type: 'RTM'},
  'KLF' : {text: 'Kleinlöschfahrzeug',      seq:  2},
  'LF'  : {text: 'Löschgruppenfahrzeug',    seq:  3, type: 'LF'},
  'HLF' : {text: 'Hilfeleistungslöschgruppenfahrzeug', seq:  4},
  'TS'  : {text: 'LF mit Tragkraftspritze', seq:  5},
  'TLF' : {text: 'Tanklöschfahrzeug',       seq:  6, ab: {FW:  1}},
  'GTLF': {text: 'Großtanklöschfahrzeug',   seq:  7, ab: {FW:  7}},
  'ELW' : {text: 'Einsatzleitwagen',        seq:  8, ab: {FW:  5}},
  'DLK' : {text: 'Drehleiter (Korb)',       seq:  9, ab: {FW:  3}},
  'RW'  : {text: 'Rüstwagen',               seq: 10, ab: {FW:  4}},
  'GWL' : {text: 'Schlauchwagen',           seq: 11, ab: {FW:  5}},
  'GWÖl': {text: 'Gerätewagen Öl',          seq: 12, ab: {FW:  4}},
  'GWA' : {text: 'Gerätewagen Atemschutz',  seq: 13, ab: {FW:  6}},
  'HLFS': {text: 'Hilfeleistungslöschgruppenfahrzeug mit Schienenfahreinrichtung', seq:  14, ab: {FW: 65}},
  'GWS' : {text: 'Gerätewagen Schiene',     seq: 15, ab: {FW: 10}},
  'FwK' : {text: 'Feuerwehrkran',           seq: 16, ab: {FW: 25}},
  'GWG' : {text: 'Gerätewagen Gefahrgut',   seq: 17, ab: {BF:  2}},
  'GWM' : {text: 'Gerätewagen Messtechnik', seq: 18, ab: {BF:  2}},
  'GWT' : {text: 'Gerätewagen Taucher',     seq: 19, ab: {BF: 25}},
  'TUIS': {text: 'Gerätewagen Transport-Unfall-Information', seq: 20, ab: {FW: 64}},
  'ULF' : {text: 'Universallöschfahrzeug',  seq: 21, ab: {FW: 64}},
  'FLF' : {text: 'Flugfeldlöschfahrzeug',   seq: 22, ab: {BF: 59}},
  'RTr' : {text: 'Rettungstreppe',          seq: 23, ab: {BF: 59}},
  'FLB' : {text: 'Feuerlöschboot',          seq:  1, ab: {BF: 30}, onWater: true},
  'RTB' : {text: 'Rettungsboot',            seq:  2, ab: {FW: 50}, type: 'RTM', onWater: true},
};

/* Einstellungsoptionen
   folgende Typen werden unterstützt:
   siehe Konstante: OptType
*/
var OptionLst = {
'global':
  {text: 'globale Einstellungen',
   opt:
{ checkForUpdates           : {valDef: true,  text: 'auf Updates prüfen'},
  dispStichwortColour       : {valDef: 'red', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe des Alarmierungsstichworts'},
  tooltipOnStationLink      : {valDef: true,  text: 'Tooltip-Information an Link zu Feuerwachen'},
  condenseVehicles          : {valDef: true,  text: 'Fahrzeuge zusammenfassen (LF, LF => 2LF)'},
  limit2neededVehicleGroups : {valDef: true,  text: 'nur nach Wachenanzahl benötigte Fahrzeuge anzeigen (z.B. DLK ab 3 FW)'},
  sortVehiclesByClass       : {valDef: true,  text: 'Fahrzeugliste nach Klassenreihenfolge sortieren'},
  disableSelectionDueToStorm: {valDef: false, text: 'Unwettermodus'},
  reducedSelectionVehicles  : {valDef: 'LF/HLFS/TS/RW/GTLF/TLF', type: OptType.string,  length: 20, valChkFunc: chkFunc.redSelVhc, text: 'Fahrzeug(e) für Unwettermodus'},
  reducedSelOptVehicles     : {valDef: '', type: OptType.string,  length: 20, valChkFunc: chkFunc.redSelVhc, text: 'optionale Fahrzeug(e) für Unwettermodus'},
  highlightUser             : {valDef: true,  text: 'Eigenen Namen in Toplisten hervorheben'},
  colorRemainingTimeBar     : {valDef: true,  text: 'farbige Anzeige der Restlaufzeit (altes Design)'},
  adjustMenus               : {valDef: true,  text: 'Menüs anpassen'},
  highlightOrder            : {valDef: true,  text: 'Eigenen Einsatzauftrag hervorheben'},
  highlightOrderColor       : {valDef: 'green', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe des eigenen Einsatzauftrags'},
  highlightOrderBlink       : {valDef: true,  text: 'Blinkender Text beim eigenen Einsatzauftrag'},
  highlightVBOrder          : {valDef: true,  text: 'Verbandseinsatzaufträge hervorheben'},
  highlightVBOrderColor     : {valDef: 'blue', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der Verbandseinsatzaufträge'},
}},
'eList':
  {text: 'Einsatzliste',
   opt:
{ showInfoKlasseInListe  : {valDef: true,  text: 'Alarmierungsstichwort anzeigen'},
  showInfoLangtextListe  : {valDef: true,  text: 'Langtext zum Alarmierungsstichwort anzeigen'},
  showInfoVehiclesInListe: {valDef: true,  text: 'gemäß Alarmierungsstichwort zu alarmierende Fahrzeuge anzeigen'},
  alignInfoKlasseToRight : {valDef: true,  text: 'Einsatzart/Fahrzeuge rechtsbündig ausrichten'},
}},
'eInfo':
  {text: 'Einsatzanzeige',
   opt:
{ addWikiLink               : {valDef: true,  text: 'Einsatzmeldung mit Wiki-Link versehen'},
  moveSequenceInStation     : {valDef: 'normal',  type: OptType.list,  text: 'Abmarsch von gleicher Wache',
                               list: {'normal':'wie verfügbar', 'trupp':'Truppfahrzeuge zuerst', 'special':'Trupp-/Sonderfahrzeuge zuerst'}},
  markWhenAllianceCall      : {valDef: true,  text: 'Alarmierungsvorschlag bei Verbandsauftrag direkt markieren'},
  dispStw                   : {valDef: true,  text: 'Alarmierungsstichwort anzeigen'},
  dispStwText               : {valDef: true,  text: 'Langtext zum Alarmierungsstichwort anzeigen'},
  dispStwCallList           : {valDef: true,  text: 'Fahrzeuge gemäß Alarmierungsstichwort anzeigen'},
  dispCallList              : {valDef: true,  text: 'zu alarmierende Fahrzeuge anzeigen'},
  dispCallReqColour         : {valDef: 'red', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der benötigten Fahrzeuge'},
  dispCallSecColour         : {valDef: 'maroon', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der Fahrzeuge für zweiten Abmarsch'},
  dispCallOptColour         : {valDef: 'peru', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der optionalen Fahrzeuge'},
  dispStormInfoColour       : {valDef: 'darkred', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für Unwetterhinweis'},
  dispTime                  : {valDef: true,  text: 'Fahrzeiten anzeigen',},
  dispUnavailable           : {valDef: true,  text: 'nicht verfügbare Fahrzeuge anzeigen'},
  dispUnavailColour         : {valDef: 'darkorange', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der nicht verfügbaren Fahrzeuge'},
  dispStatus                : {valDef: true,  text: 'Statusliste der Fahrzeuge anzeigen'},
  dispStatus6               : {valDef: false, text: 'Fahrzeuge im Status 6 anzeigen'},
  dispStatusDemand          : {valDef: true,  text: 'Nachgeforderte Fahrzeuge anzeigen'},
  dispStatusDemandNotAtScene: {valDef: true,  text: 'Nachgeforderte Fahrzeuge nur anzeigen, wenn nicht an Einsatzstelle'},
  callSurplusRTW            : {valDef: false, text: 'einen RTW mehr alarmieren, als von Verletztenzahl notwendig (mögliche Nachalarmierung)'},
  limitRTWcall              : {valDef: false, text: 'RTW Alarmierung zeitlich begrenzen'},
  limitRTWcallMin           : {valDef: 15,    type: OptType.integer, length: 3, valChkFunc: chkFunc.limTime, text: 'RTW bis maximal x Min. vorschlagen'},
  addLocationDescription    : {valDef: true,  text: 'textliche Lageangabe hinter Positionsangabe anhängen'},
  highlightCityExtension    : {valDef: true,  text: 'Einsatzposition in Stadterweiterung als Positionsangabe farblich hervorheben'},
  highlightCityExtColour    : {valDef: 'green', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für Positionsangabe'},
  highlightVehicleRequest   : {valDef: true,  text: 'Fahrzeugnachforderung in Rückmeldungen farblich hervorheben'},
  highlightVehReqColour     : {valDef: 'darkorange', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für Nachforderungen'},
  calledLineColour          : {valDef: 'darkgreen', type: OptType.colList, list: ColorLst, text: 'Farbe für Alarmfahrzeugzeile'},
  optionalLineColour        : {valDef: 'blue', type: OptType.colList, list: ColorLst, text: 'Farbe für opt. Fahrzeugzeile'},
  useDottedLine4FasterVeh   : {valDef: true,  text: 'Umrande schnellere Fahrzeuge mit gestrichelter Linie'},
  fasterVehicleColour       : {valDef: 'maroon', type: OptType.colList, list: ColorLst, text: 'Markierfarbe für langsameres Fahrzeug auf Anfahrt'},
  replacementVehicleColour  : {valDef: 'green', type: OptType.colList, list: ColorLst, text: 'Markierfarbe für schnelleres, verfügbares Fahrzeug'},
  dispStatusAsFMSDisplayEL  : {valDef: true,  text: 'Status als FMS-Gerät anzeigen'},
  dispFMSDisplayLinesEL     : {valDef: '1',   type: OptType.list, list: FMSlineArr, text: 'Zeilenanzahl der Statusgeberknöpfe'},
  reduceInVehRespListsOfVGSL: {valDef: '&NONE&', type: OptType.list,  text: 'VGSL: Fahrzeuglisten ausgerückter Fahrzeuge einklappen',
                               list: {'&OFF&':'kein Einklappen', '&ALL&':'zu Anfang alle Fahrzeuge anzeigen', '&NONE&':'zu Anfang keine Fahrzeuge anzeigen'}},
}},
'pList':
  {text: 'Personalliste',
   opt:
{ defaultTabSort         : {valDef: 'none', type: OptType.list, text: 'Standard-Sortierung',
                            list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  useMotivationColourCode: {valDef: true,  text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCode   : {valDef: true,  text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCode  : {valDef: true,  text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCode     : {valDef: true,  text: 'Schicht farblich hervorheben'},
  useStatusColourCode    : {valDef: true,  text: 'Status farblich hervorheben'},
}},
'school':
  {text: 'Schule',
   opt:
{ defaultTabSortSchool       : {valDef: 'none', type: OptType.list, text: 'Standard-Sortierung',
                                list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  removesNonSelectablesSchool: {valDef: true,  text: 'Nicht wählbare Mannschaft ausblenden'},
  useMotivColourCodeSchool   : {valDef: true,  text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCodeSchool : {valDef: true,  text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCodeSchool: {valDef: true,  text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCodeSchool   : {valDef: true,  text: 'Schicht farblich hervorheben'},
}},
'training':
  {text: 'Übungsgelände',
   opt:
{ defaultTabSortTraining       : {valDef: 'none', type: OptType.list, text: 'Standard-Sortierung',
                                list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  removesNonSelectablesTraining: {valDef: true,  text: 'Nicht wählbare Mannschaft ausblenden'},
  useMotivColourCodeTraining   : {valDef: true,  text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCodeTraining : {valDef: true,  text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCodeTraining: {valDef: true,  text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCodeTraining   : {valDef: true,  text: 'Schicht farblich hervorheben'},
}},
'fList':
  {text: 'Fahrzeugliste',
   opt:
{ showSummaryVehicleList  : {valDef: true,  text: 'Fahrzeugliste am Kopf der Seite zeigen (zusätzlich)'},
  showStatus7OnlyIfExists : {valDef: true,  text: 'Status 7 nur anzeigen, wenn nötig'},
  showStatusLangtext      : {valDef: true,  text: 'Text zum Status anzeigen'},
  showTotalkm             : {valDef: true,  text: 'Anzeige der gesamten km-Leistung je Fahrzeugtyp'},
  showAvgkm               : {valDef: true,  text: 'Anzeige der durchschnittlichen km-Leistung je Fahrzeugtyp'},
  showAvgDamage           : {valDef: true,  text: 'Anzeige des durchschnittlichen Schadens je Fahrzeugtyp'},
  showDamageList          : {valDef: true,  text: 'Zusammenfassung der beschädigten Fahrzeuge anzeigen'},
  limitDamage             : {valDef: true,  text: 'Anzeige beschädigter Fahrzeuge einschränken'},
  limitDamageTo           : {valDef: 100,   type: OptType.integer,  length:  3, valChkFunc: chkFunc.limDmg, text: 'Nur beschädigte Fahrzeuge mit weniger als x% anzeigen:'},
  showDamagedAtFirstCall  : {valDef: false, text: 'zu reparierende Fahrzeuge direkt aufklappen'},
  listHighLowKm           : {valDef: true,  text: 'Anzeige der höchste/niedrigste km-Leistungen'},
  dispStatusAsFMSDisplayFL: {valDef: true,  text: 'Status als FMS-Gerät anzeigen'},
  dispFMSDisplayLinesFL   : {valDef: '3',   type: OptType.list, list: FMSlineArr, text: 'Zeilenanzahl der Statusgeberknöpfe'},
}},
'fInfo':
  {text: 'Fahrzeuganzeige',
   opt:
{ dispStatusAsFMSDisplayFI: {valDef: true,  text: 'Status als FMS-Gerät anzeigen'},
  dispFMSDisplayLinesFI   : {valDef: '3',   type: OptType.list, list: FMSlineArr, text: 'Zeilenanzahl der Statusgeberknöpfe'},
}},
'wList':
  {text: 'Wachenliste',
   opt:
{ useOriginalVhcColorScheme: {valDef: false, text: 'Farbgestaltung für Fahrzeugbedarf im Original benutzen'},
  imgStationList           : {valDef: 'normal', type: OptType.radio,  text: 'Graphiken in Liste',
                              list: {'normal':'normale Graphik', 'small':'kleine Graphik', 'none':'Graphik nicht anzeigen'}},
  highlightManning         : {valDef: true,  text: 'prozentuale Sollstärke hervorheben'},
}},
'gList':
  {text: 'Gebäudeliste',
   opt:
{ imgBuildingList: {valDef: 'normal', type: OptType.radio,  text: 'Graphiken in Liste',
                    list: {'normal':'normale Graphik', 'small':'kleine Graphik', 'none':'Graphik nicht anzeigen'}},
}},
'lList':
  {text: 'Log',
   opt:
{ summarizeLog  : {valDef: true,  text: 'Zusammenfassung des Logs erstellen'},
  logColCallTCol: {valDef: 'white', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für Notrufe'},
  logColCallBCol: {valDef: 'red',   type: OptType.colList, list: ColorLst, text: 'Hintergrundfarbe für Notrufe'},
  logColFehlTCol: {valDef: 'black', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für Fehleinsätze'},
  logColFehlBCol: {valDef: 'yellow',type: OptType.colList, list: ColorLst, text: 'Hintergrundfarbe für Fehleinsätze'},
  logColDoneTCol: {valDef: 'darkgreen',type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für abgearbeitete Einsätze'},
  logColDoneBCol: {valDef: 'white', type: OptType.colList, list: ColorLst, text: 'Hintergrundfarbe für abgearbeitete Einsätze'},
  logColJobTCol : {valDef: 'green', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für neu eingestellte Mannschaft'},
  logColJobBCol : {valDef: 'lightblue', type: OptType.colList, list: ColorLst, text: 'Hintergrundfarbe für neu eingestellte Mannschaft'},
  logColQuitTCol: {valDef: 'red',   type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für gekündigte Mannschaft'},
  logColQuitBCol: {valDef: 'lightblue', type: OptType.colList, list: ColorLst, text: 'Hintergrundfarbe für gekündigte Mannschaft'},
}}
}

// besondere Örtlichkeiten auf der Karte
var locationLst = {
  // Sonderbebauung zuerst
  'Hafenbecken':
    {text: 'Hafenbecken', from: {x:  99, y: 199}, to: {x: 100, y: 200}, onWater: true},
  'Hafen':
    {text: 'Hafen', from: {x:  98, y: 198}, to: {x: 100, y: 200}},
  'Flughafen':
    {text: 'Flughafen', from: {x:  83, y: 179}, to: {x:  84, y: 180}},
  'Raffinerie':
    {text: 'Raffinerie', from: {x:   6, y: 176}, to: {x:   7, y: 176}},
  'Bahnlinie':
    {text: 'Bahnlinie', from: {x:   1, y: 152}, to: {x: 100, y: 152}},
  'Tunnel4':
    {text: 'Tunnel', from: {x:  69, y: 152}, to: {x:  75, y: 152}},
  'Tunnel3':
    {text: 'Tunnel', from: {x:  30, y: 152}, to: {x:  36, y: 152}},
  'Tunnel2':
    {text: 'Tunnel', from: {x:  17, y: 152}, to: {x:  23, y: 152}},
  'Tunnel1':
    {text: 'Tunnel', from: {x:   2, y: 152}, to: {x:   7, y: 152}},
  'Güterbahnhof':
    {text: 'Güterbahnhof', from: {x:  50, y: 152}, to: {x:  51, y: 152}},
  // 'normale' Bereiche
  'Altstadt':
    {text: 'Altstadt', from: {x:   1, y:   1}, to: {x: 100, y: 100}},
  'Neustadt':
    {text: 'Neustadt', from: {x:   1, y: 101}, to: {x: 100, y: 200}},
}

// Syntax: Hintergrundfarbe Personalstatus
var personalStatusLst = {
  'Beim Einsatz'           : {tcol : '#FF0000', onDuty: true , ready: true , inSchool: false, text : 'im Einsatz'},
  'Einsatzbereit'          : {tcol : ((layoutNew)?'darkgreen':'green'), onDuty: true , ready: true , inSchool: false, text : 'bereit'},
  'Frei - nicht im Dienst' : {tcol : '#777777', onDuty: false, ready: false, inSchool: false, text : 'frei'},
  'In der Feuerwehrschule' : {tcol : '#5555FF', onDuty: false, ready: false, inSchool: true , text : 'Schule'},
}

// Ausbildungen: soll für die Lehrgangsseite benutzt werden
// Syntax: RegExp-Ausdruck, ID des checkbox-Elementes, Hintergrundfarbe in Mannschaftsübersicht
var trainingLst = {
  'ohne'              : {internal: true, regex: /^$/, cboxid: '', tcol: {light:'', black:''}, bcol: {light:'', black:''}, text: 'ohne Ausbildung'},
  'Gefahrgut'         : {regex: /Gefahrgut/,         cboxid: 'education_type_1', tcol: {light:'brown', black:'yellow'}, bcol: {light:'brown', black:'yellow'}, text: 'Gefahrgut'},
  'Rettungsassistent' : {regex: /Rettungsassistent/, cboxid: 'education_type_2', tcol: {light:'red', black:'white'},  bcol: {light:'red', black:'white'}, text: 'Rettungsassistent'},
  'Taucher'           : {regex: /Taucher/,           cboxid: 'education_type_3', tcol: {light:'blue', black:'blue'},   bcol: {light:'blue', black:'blue'}, text: 'Taucher'},
  'Flughafen'         : {regex: /Flughafen/,         cboxid: 'education_type_4', tcol: {light:'teal', black:'teal'},   bcol: {light:'teal', black:'teal'}, text: 'Flughafen'},
  'Löschboot'         : {regex: /Löschboot/,         cboxid: 'education_type_5', tcol: {light:'darkblue', black:'lightblue'}, bcol: {light:'darkblue', black:'lightblue'}, text: 'Löschboot'},
  'Rettungsboot'      : {regex: /Rettungsboot/,      cboxid: 'education_type_6', req: 'Rettungsassistent', tcol: {light:'orange', black:'orange'}, bcol: {light:'orange', black:'orange'}, text: 'Rettungsboot'},
  'TUIS'              : {regex: /TUIS/,              cboxid: 'education_type_7', req: 'Gefahrgut', tcol: {light:'orangered', black:'orangered'},  bcol: {light:'orangered', black:'orangered'}, text: 'Technisches Unfallinformationssystem'},
  '2-Wege-Führerschein': {regex: /2-Wege-Führerschein/, cboxid: 'education_type_8', tcol: {light:'darkgreen', black:'lightgreen'}, bcol: {light:'darkgreen', black:'lightgreen'}, text: '2-Wegeführerschein'},
  'Rettungszug'       : {regex: /Rettungszug/,       cboxid: 'education_type_9', req: 'Rettungsassistent', tcol: {light:'purple', black:'purple'}, bcol: {light:'purple', black:'purple'}, text: 'Rettungszug'},
}

// Syntax: Textfarbe in Mannschaftsübersicht
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner der Motivation des Kameraden ist.
var motivationLst = {
  90 : {tcol: '#228B22'},
  76 : {tcol: '#32CD32'},
  51 : {tcol: '#66FF66'},
  26 : {tcol: ((layoutNew)?'peru':'#FFD700')},
  11 : {tcol: '#FF6666'},
   0 : {tcol: '#B22222'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
}

// Syntax: Textfarbe in Mannschaftsübersicht
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner der Fähigkeit des Kameraden ist.
var abilityLst = {
  90 : {tcol: '#228B22'},
  76 : {tcol: '#32CD32'},
  51 : {tcol: '#66FF66'},
  26 : {tcol: ((layoutNew)?'peru':'#FFD700')},
  11 : {tcol: '#FF6666'},
   0 : {tcol: '#B22222'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
}

// Syntax: Textfarbe der prozentualen Mannschaftsstärke einer BF
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner als die Mannschaftsstärke der BF ist.
var staffingLst = {
 100 : {tcol: 'green'},
  90 : {tcol: 'lime'},
  75 : {tcol: ((layoutNew)?'peru':'yellow')},
  50 : {tcol: 'orange'},
  25 : {tcol: 'brown'},
   0 : {tcol: 'red'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
}

var shiftLst = {
  1 : {tcol: '#FFA500'},
  2 : {tcol: '#1E90FF'},
  3 : {tcol: '#FF1493'},
}

var menus = {
  config : {link: '/ereglamsAAOConfig', text: 'Optionen'},
  mld    : {link: '/ereglamsAAO/Einsaetze', text: 'Einsatzmeldungen'},
  stw    : {link: '/ereglamsAAO/Stichworte', text: 'Alarmstichworte'},
  fhz    : {link: '/ereglamsAAO/Fahrzeuge', text: 'Fahrzeuge'},
  fGrp   : {link: '/ereglamsAAO/Fahrzeuggruppen', text: 'Fhz-Gruppen'},
}

/* ******************************************************************************************
  H I N W E I S !!
  aber hier sollte nur Derjenige Änderungen vornehmen, der weis, was er tut!!!
*/
// unter welchem URL finde ich Infos über das Script?
const UPDATEURL="http://userscripts.org/scripts/show/"+USERSCRIPTID;
// unter welchem URL finde ich das Script als Installation?
const INSTALLURL="http://userscripts.org/scripts/source/"+USERSCRIPTID+".user.js";
// unter welchem URL finde ich die Metadaten zum Script?
const METAURL="http://userscripts.org/scripts/source/"+USERSCRIPTID+".meta.js";

/*********************************************************************************
hier gehts mit dem Programm los
*********************************************************************************/
try
{ errLog.refresh();
  conf.init(
    {opt: OptionLst,
     fhz: FahrzeugeLst,
     grp: FhzGruppeLst,
     stw: StichwortLst,
     mld: MeldungLst,
     trn: trainingLst});
  // Speicher wieder freigeben
  delete OptionLst;
  delete FahrzeugeLst;
  delete FhzGruppeLst;
  delete StichwortLst;
  delete MeldungLst;
  //delete trainingLst; //noch nicht

  main = new mainCls(conf);
  main.init();
  // console(conf.write());
}
catch(e)
{ errLog.addVarMsg('Initialising script', e);
  setMsg(errLog);
  errLog.refresh();
}

try
{ errLog.refresh();
  main.main();
}
catch(e)
{ errLog.addVarMsg('running main function', e);
  setMsg(errLog);
  errLog.refresh();
}

/*********************************************************************************
Funktionen
*********************************************************************************/
// Feuerwachenliste anzeigen
function displayStationList()
{ var evalTRs = xPath.getNodes("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Bezeichnung']/tbody/tr", 'content');
  // Anzahl Wachen und Stufen ermittlen
  var node2Station = {};

  conf.stationList.refresh();
  for (var i = 0; i < evalTRs.snapshotLength;i++)
  { var station = new stationCls(evalTRs.snapshotItem(i));
    xPath.getSingle("./td[2]", evalTRs.snapshotItem(i)).title = station.write().replace(/\n/g, ', ');
    conf.stationList.addStation(station);
    node2Station[i] = station;
  }
  conf.stationList.serialize();

  nodeDiv = new Element('div');
  nodeDiv.appendChild(createText(conf.stationList.toString()));
  $('content').insertBefore(nodeDiv, $('content').getElementsByTagName('table')[0]);

  // Spalte für Icons verkleinern oder ausblenden
  switch (conf.getOptVal('imgStationList'))
  { case 'normal' :
      // nichts machen
      break;
    case 'small'  :
      xPath.getSingle("./table[@class='defaultTable']/thead/tr/th", 'content').setAttribute('style','width:35px;');
      break;
    case 'none'   :
      xPath.getSingle("./table[@class='defaultTable']/thead/tr/th", 'content').setAttribute('style','width:0px;');
      break;
  }

  for (var i=0;i<evalTRs.snapshotLength;i++)
  { var TR=evalTRs.snapshotItem(i);
    var evalTDs = xPath.getNodes("./td", TR);
    var station = node2Station[i];

    // Icons verkleinern oder ausblenden
    switch (conf.getOptVal('imgStationList'))
    { case 'normal':
        break;
      case 'small':
        var nodeImg = xPath.getSingle("./img[1]", evalTDs.snapshotItem(0));
        nodeImg.setAttribute('src', nodeImg.getAttribute('src').replace(/\/map\//, '/map_25/'));
        break;
      case 'none':
        removeChildren(evalTDs.snapshotItem(0));
        break;
    }

    if (!conf.getOptVal('useOriginalVhcColorScheme'))
    { // Spalte Fahrzeuge
      var nodeTD = evalTDs.snapshotItem(3);
      var nodeA = xPath.getSingle("./a[1]", nodeTD);
      if (station.getFhz() != station.getMaxFhz())
      { nodeA.setAttribute('style', 'color: '+(conf.isNewLayout()?'peru':'yellow')+';');
      }
      removeChildren(nodeA);
      nodeA.appendChild(createText(station.getFhz() + ' / ' + station.getMaxFhz()));
      removeChildren(nodeTD);
      nodeTD.appendChild(nodeA);

      // Spalte Rettungswagen
      if (station.getRTW() != station.getMaxRTW())
      { evalTDs.snapshotItem(4).style.color = (conf.isNewLayout()?'peru':'yellow');
      }
    }

    // Spalte Stufe
    nodeTD = evalTDs.snapshotItem(6);
    nodeTD.setAttribute('style', 'text-align: left;');
    // Ausbau BF erst ab 10 Feuerwachen
    if ((conf.stationList.getCntFW() < 10)?(station.getLevel() < 3):(station.getLevel() < 5))
    { addEntityText(nodeTD, '&nbsp;');
      var nodeA = new Element('a',
                              {'href': xPath.getSingle("./a[1]", evalTDs.snapshotItem(1)).getAttribute('href') + '/ausbauen'});
      addEntityText(nodeA, '&nbsp;+&nbsp;');
      nodeTD.appendChild(nodeA);
    }

    if (conf.getOptVal('highlightManning') && station.isBF())
    { var proz = station.getCrew() / station.getMaxCrew() * 100;
      for (var man in staffingLst)
      { if (proz > man)
        { xPath.getSingle("./a[1]", evalTDs.snapshotItem(5)).style.color = staffingLst[man].tcol;
          break;
        }
      }
    }
  }
}

// Feuerwache anzeigen
function displayStation(iNum)
{ var station = conf.stationList.getStation(iNum);
  var nodeH1 = xPath.getSingle("./h1[1]", 'content');

  var name = xPath.getSingle("./text()[2]", nodeH1).nodeValue.trim();
  if (!station)
  { station = new stationCls(iNum, name);
  }
  else if (station.getName() != name)
  { station.setName(name);
  }
  evalTDs = xPath.getNodes("./table[@class='defaultTable' and position() = 1]/tbody/tr/td[2]", 'content');
  var exp = /^\s*(\d+)\s*von maximal\s*(\d+)\s*/;
  [, posX, posY] = /(\d+)\s*-\s*(\d+)/.exec(evalTDs.snapshotItem(0).innerHTML);
  [, fhzStr, fhzMaxStr] = exp.exec(evalTDs.snapshotItem(1).innerHTML);
  [, rtwStr, rtwMaxStr] = exp.exec(evalTDs.snapshotItem(2).innerHTML);
  [, levelStr] = /^\s*(\d+)/.exec(evalTDs.snapshotItem(3).innerHTML);
  try
  { station.setPosition(posX, posY);
    station.setFhz(parseInt(fhzStr));
    station.setRTW(parseInt(rtwStr));
    station.setLevel(parseInt(levelStr));
    station.save();
  }
  catch(e)
  { errLog.addMsg(e);
    station.load();
  }

  nodeH1.title = station.write().replace(/\n/g, ', ');
}

// Fahrzeuge in Wache anzeigen
function displayStationVehicles(iNum)
{
  var station = conf.stationList.getStation(iNum);
  var evalAs = xPath.getNodes("./h2/a", 'content');
  for (i = 0; i < evalAs.snapshotLength; i++)
  { var nodeA = evalAs.snapshotItem(i);
    if (nodeA)
    { // URL zur Feuerwache bekommen
      var nodeH2 = nodeA.parentNode;
      addEntityText(nodeH2, '&nbsp;');
      nodeA = new Element('a',
                          {'href' : nodeA.href + '/feuerwehrleute',
                           'class': 'fontSmall',
                           'title': 'Personal'});
      nodeH2.appendChild(nodeA);
      nodeA.appendChild(createText('(Personal)'));
    }
  }

  // Status als FMS Display anzeigen
  if (conf.getOptVal('dispStatusAsFMSDisplayFL'))
  { var evalTables = xPath.getNodes("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Funkrufname']", 'content');
    for (iTbl = 0; iTbl < evalTables.snapshotLength; iTbl++)
    { var nodeTable = evalTables.snapshotItem(iTbl);
      var column = -1, col = -1;
      var evalTHs = xPath.getNodes("./thead/tr/th", nodeTable);
      for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
      { var nodeTH = evalTHs.snapshotItem(iTH);
        col++;
        if (nodeTH.innerHTML.trim() == 'FMS')
        { column = col + 1;
          break;
        }
      }

      if (column != -1)
      { var evalTDs = xPath.getNodes("./tbody/tr/td["+column+"]", nodeTable);
        for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
        { var nodeTD = evalTDs.snapshotItem(iTD);
          nodeFMS = buildFMS(nodeTD, conf.getOptVal('dispFMSDisplayLinesFL'));
          removeChildren(nodeTD);
          nodeTD.appendChild(nodeFMS);
        }
      }
    }
  }
}

// Gebäudeliste anzeigen
function displayBuildingList()
{ var evalTable = xPath.getNodes("./table[@class='defaultTable']", 'content');
  if (evalTable.snapshotLength == 0) { return; }
  var nodeTable = evalTable.snapshotItem(0);
  // Spalte für Icons verkleinern oder ausblenden
  switch (conf.getOptVal('imgBuildingList'))
  { case 'normal' : // nichts machen
                    break;
    case 'small'  : xPath.getSingle("./thead/tr/th[1]", nodeTable).setAttribute('style','width:35px; !important;');
                    break;
    case 'none'   : xPath.getSingle("./thead/tr/th[1]", nodeTable).setAttribute('style','width:0; !important;');
                    break;
  }

  var evalTRs = xPath.getNodes("./tbody/tr", nodeTable);
  for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
  { var nodeTR = evalTRs.snapshotItem(iTR);
    // Icons verkleinern oder ausblenden
    switch (conf.getOptVal('imgBuildingList'))
    { case 'normal' : // nichts machen
                      break;
      case 'small'  : var nodeImg = xPath.getSingle("./td[1]/img[1]", nodeTR);
                      nodeImg.setAttribute('src', nodeImg.getAttribute('src').replace(/\/map\//, '/map_25/'));
                      break;
      case 'none'   : removeChildren(xPath.getSingle("./td[1]", nodeTR));
                      break;
    }
  }

  //Gebäude zählen
  var buildingsArr = {};
  evalTDs = xPath.getNodes("./tbody/tr/td[4]", nodeTable);
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
  var nodeDiv = new Element('div');
  nodeDiv.appendChild(createText('Du hast ' + text));
  $('content').insertBefore(nodeDiv, nodeTable);
}

// Gebäude anzeigen
function displayBuilding(iNr)
{ switch(xPath.getSingle("./table[@class='defaultTable']/tbody/tr[descendant::td/text()='Art:']/td[2]", 'content').innerHTML.trim())
  { case 'Feuerwehrschule':
      displaySchool(true);
      break;
    case 'Übungsgelände':
      displayTraining();
      break;
    case 'Krankenhaus':
      // displayHospital();
      break;
    case 'Werkstatt':
      displayGarage();
      break;
  }
}

// Feuerwehrschule anzeigen
function displaySchool(iFirst)
{ running = true;
  if (iFirst)
  { nodeRads = document.getElementsByName("education_type");
    for (i = 0; i < nodeRads.length; i++)
    { nodeRads[i].addEventListener("click", markTrainees, true);
    }
  }

  var nodeText = xPath.getSingle("./div[@class='form_info']/text()[contains(../text(), 'In diesem Gebäude')]", 'content');
  if(nodeText)
  { // Teilnehmer zählen
    var evalTRs = xPath.getNodes("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']/tbody/tr", 'content');
    // Textknoten zum Eintragen der Anzahl finden
    var evalText = xPath.getNodes("./text()", 'content');
    for (iTxt = 0; iTxt < evalText.snapshotLength; iTxt++)
    { nodeText = evalText.snapshotItem(iTxt);
      if(/Diese Personen/.test(nodeText.nodeValue))
      { nodeText.nodeValue = nodeText.nodeValue.replace(/Diese Personen/, 'Diese '+evalTRs.snapshotLength+' Personen')
        break;
      }
    }
  }

  var evalTables = xPath.getNodes(".//table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']", 'content');
  for (iTbl = 0; iTbl < evalTables.snapshotLength; iTbl++)
  { var nodeTable = evalTables.snapshotItem(iTbl);
    MachSortierbar(nodeTable);
    if (conf.getOptVal('defaultTabSortSchool') != "none")
    { SortiereNachSpalte(nodeTable, conf.getOptVal('defaultTabSortSchool'))
    }

    var columns = {};
    var evalTHs = xPath.getNodes("./thead/tr/th", nodeTable);
    for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
    { nodeTH = evalTHs.snapshotItem(iTH);
      if (nodeTH.innerHTML !== '')
      { columns[nodeTH.innerHTML.trim()] = iTH;
      }
    }

    var rowCnt = 0;
    var evalTRs = xPath.getNodes("./tbody/tr", nodeTable);
    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
    { var evalTDs = xPath.getNodes("./td", evalTRs.snapshotItem(iTR));
      try
      { var nodeTD = evalTDs.snapshotItem(columns['Name']);
        if (conf.getOptVal('removesNonSelectablesSchool') && /Nicht verfügbar/.test(nodeTD.innerHTML))
        { nodeTD.parentNode.style.display = 'none';
          continue;
        }

        nodeTD = evalTDs.snapshotItem(columns['Motivation']);
        if (conf.getOptVal('useMotivColourCodeSchool') && nodeTD)
        { var val = parseInt(nodeTD.innerHTML)
          for (var motivation in motivationLst)
          { if (val >= motivation)
            { nodeTD.style.color = motivationLst[motivation].tcol;
              break;
            }
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Fähigkeiten']);
        if (conf.getOptVal('useAbilityColourCodeSchool') && nodeTD)
        { var val = parseInt(nodeTD.innerHTML)
          for (var ability in abilityLst)
          { if (val >= ability)
            { nodeTD.style.color = abilityLst[ability].tcol;
              break;
            }
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Ausbildung']);
        if ((columns['Ausbildung'] !== undefined) && conf.getOptVal('useTrainingColourCodeSchool') && nodeTD)
        { var trainArr = nodeTD.innerHTML.split(',');
          var cnt = 0;
          var nodeTDCopy = nodeTD.cloneNode(false);
          for each (train in trainArr)
          { train = train.trim();
            var colour;
            var training = trainingLst[train];
            if (training)
            { colour = training.tcol[conf.getLayout()];
            }
            else
            { colour = trainingLst['ohne'].tcol[conf.getLayout()];
            }
            if (colour)
            { var nodeSpan = new Element('span', {'style': 'color: '+colour});
              nodeSpan.appendChild(createText(train));
              if (cnt > 0)
              { nodeTDCopy.appendChild(createText(', '));
              }
              nodeTDCopy.appendChild(nodeSpan);
              cnt++;
            }
          }
          if (cnt > 0)
          { nodeTD.parentNode.replaceChild(nodeTDCopy, nodeTD);
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Schicht']);
        if (conf.getOptVal('useShiftColourCodeSchool') && nodeTD !== undefined)
        { nodeTD.style.color = shiftLst[parseInt(nodeTD.innerHTML)].tcol;
        }
        nodeTD.parentNode.className = 'row'+(rowCnt++)%2;
      }
      catch(e)
      { console('displaySchool= ' + e);
      }
    }
  }

  if (!iFirst)
  { markTrainees(); }
  running = false;
}

// Übungsgelände anzeigen
function displayTraining()
{ running = true;
  var nodeText = xPath.getSingle("./div[@class='form_info']/text()[contains(../text(), 'Auf dem Gelände')]", 'content');
  if(nodeText)
  { // Teilnehmer zählen
    var evalTRs = xPath.getNodes("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']/tbody/tr", 'content');
    // Textknoten zum Eintragen der Anzahl finden
    var nodeH2 = xPath.getSingle("./h2[1]", 'content');
    if (nodeH2)
    { nodeH2.innerHTML = evalTRs.snapshotLength +' '+ nodeH2.innerHTML;
    }
  }

  var evalTables = xPath.getNodes(".//table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']", 'content');
  for (iTbl = 0; iTbl < evalTables.snapshotLength; iTbl++)
  { var nodeTable = evalTables.snapshotItem(iTbl);
    MachSortierbar(nodeTable);
    if (conf.getOptVal('defaultTabSortSchool') != "none")
    { SortiereNachSpalte(nodeTable, conf.getOptVal('defaultTabSortTraining'))
    }

    var columns = {};
    var evalTHs = xPath.getNodes("./thead/tr/th", nodeTable);
    for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
    { nodeTH = evalTHs.snapshotItem(iTH);
      if (nodeTH.innerHTML !== '')
      { columns[nodeTH.innerHTML.trim()] = iTH;
      }
    }

    var rowCnt = 0;
    var evalTRs = xPath.getNodes("./tbody/tr", nodeTable);
    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
    { var evalTDs = xPath.getNodes("./td", evalTRs.snapshotItem(iTR));
      try
      { var nodeTD = evalTDs.snapshotItem(columns['Name']);
        if (conf.getOptVal('removesNonSelectablesTraining') && /Nicht im Dienst|Nicht verfügbar/.test(nodeTD.innerHTML))
        { nodeTD.parentNode.style.display = 'none';
          continue;
        }

        nodeTD = evalTDs.snapshotItem(columns['Motivation']);
        if (conf.getOptVal('useMotivColourCodeTraining') && nodeTD)
        { var val = parseInt(nodeTD.innerHTML)
          for (var motivation in motivationLst)
          { if (val >= motivation)
            { nodeTD.style.color = motivationLst[motivation].tcol;
              break;
            }
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Fähigkeiten']);
        if (conf.getOptVal('useAbilityColourCodeTraining') && nodeTD)
        { var val = parseInt(nodeTD.innerHTML)
          for (var ability in abilityLst)
          { if (val >= ability)
            { nodeTD.style.color = abilityLst[ability].tcol;
              break;
            }
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Ausbildung']);
        if ((columns['Ausbildung']) && conf.getOptVal('useTrainingColourCodeTraining') && nodeTD)
        { var trainArr = nodeTD.innerHTML.split(',');
          var cnt = 0;
          var nodeTDCopy = nodeTD.cloneNode(false);
          for each (train in trainArr)
          { train = train.trim();
            var colour;
            var training = trainingLst[train];
            if (training)
            { colour = training.tcol[conf.getLayout()];
            }
            else
            { colour = trainingLst['ohne'].tcol[conf.getLayout()];
            }
            if (colour)
            { var nodeSpan = new Element('span', {'style': 'color: '+colour});
              nodeSpan.appendChild(createText(train));
              if (cnt > 0)
              { nodeTDCopy.appendChild(createText(', '));
              }
              nodeTDCopy.appendChild(nodeSpan);
              cnt++;
            }
          }
          if (cnt > 0)
          { nodeTD.parentNode.replaceChild(nodeTDCopy, nodeTD);
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Schicht']);
        if (conf.getOptVal('useShiftColourCodeTraining') && nodeTD !== undefined)
        { nodeTD.style.color = shiftLst[parseInt(nodeTD.innerHTML)].tcol;
        }
        nodeTD.parentNode.className = 'row'+(rowCnt++)%2;
      }
      catch(e)
      { console('displayTraining= ' + e);
      }
    }
  }
  running = false;
}

// Werkstatt anzeigen
function displayGarage()
{ if (conf.getOptVal('limitDamage'))
  { var nodeTable = xPath.getSingle("./table[@class='defaultTable' and descendant::thead/tr/th/text()='FMS']", 'content');
    if (nodeTable)
    { var hasDisplay = false;
      evalTRs = xPath.getNodes('./tbody/tr', nodeTable);
      for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
      { var nodeTR = evalTRs.snapshotItem(iTR);
        var Zustand = parseInt(xPath.getSingle("./td[6]", nodeTR).innerHTML.removeTags());
        // Prüfung abhängig davon, ob Ausgabe Schaden auf Wert aus Optionen beschränkt werden soll
        if (Zustand >= conf.getOptVal('limitDamageTo'))
        { nodeTR.style.display = 'none';
        }
        else
        { hasDisplay = true;
        }
      }
      if (!hasDisplay)
      { nodeTable.style.display = 'none';
        var nodeDiv = new Element('div', { 'class' : 'form_info'});
        nodeDiv.appendChild(createText('aktuell keine Fahrzeuge mit einem Zustand weniger als ' + conf.getOptVal('limitDamageTo') + '%.'));
        nodeTable.parentNode.appendChild(nodeDiv);
      }
    }
  }
}

// Feuerwehrleute für Lehrgänge markieren
function markTrainees()
{ var selTraining = '';
  for (training in trainingLst)
  { if (!trainingLst[training].internal && $(trainingLst[training].cboxid).checked)
    { selTraining = training;
    }
  }

  var rowCnt = 0;
  var evalTRs = xPath.getNodes(".//table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']/tbody/tr", 'content');
  for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
  { var nodeTR = evalTRs.snapshotItem(iTR);
    var evalTDs = xPath.getNodes("./td", nodeTR);
    var bgcol = '';
    nodeTR.style.display = '';

    var nodeTD = evalTRs.snapshotItem(iTR);
    if (/Nicht verfügbar/.test(nodeTD.innerHTML))
    { nodeTR.style.display = 'none';
      continue;
    }

    for (training in trainingLst)
    { if (selTraining == training && !trainingLst[training].regex.test(evalTDs.snapshotItem(5).innerHTML) && !trainingLst[training].internal)
      { bgcol = trainingLst[training].bcol[conf.getLayout()];
      }
    }

    if (bgcol || !selTraining)
    { if (bgcol) { evalTDs.snapshotItem(0).style.backgroundColor = bgcol; }
      nodeTR.style.display = '';
    }
    else
    { nodeTR.style.display = 'none';
    }
    if (nodeTR.style.display != 'none')
    { nodeTR.className = 'row'+(rowCnt++)%2; }
  }
}

// Fahrzeug anzeigen
function displayVehicle(iFhzNr)
{ if (conf.getOptVal('dispStatusAsFMSDisplayFI'))
  { var nodeTD = xPath.getSingle("./table[@class='defaultTable']/tbody/tr[descendant::td/text()='FMS:']/td[2]", 'content');
    if (nodeTD)
    { var nodeFMS = buildFMS(nodeTD, conf.getOptVal('dispFMSDisplayLinesFI'));
      removeChildren(nodeTD);
      nodeTD.appendChild(nodeFMS);
    }
  }

  var nodeTable = xPath.getSingle("./table[@class='defaultTable' and  descendant::thead/tr/th/text()='Ausbildung']", 'content');
  if (nodeTable)
  { MachSortierbar(nodeTable);
    if (conf.getOptVal('defaultTabSort') != "none")
    { SortiereNachSpalte(nodeTable, conf.getOptVal('defaultTabSort'))
    }

    var columns = {};
    var evalTHs = xPath.getNodes("./thead/tr/th", nodeTable);
    for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
    { nodeTH = evalTHs.snapshotItem(iTH);
      if (nodeTH.innerHTML !== '')
      { columns[nodeTH.innerHTML.trim()] = iTH;
      }
    }

    evalTRs = xPath.getNodes('./tbody/tr', nodeTable);
    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
    { var nodeTR = evalTRs.snapshotItem(iTR);
      try
      { var evalTDs = xPath.getNodes('./td', nodeTR);
        var nodeTD = evalTDs.snapshotItem(columns['Motivation']);
        if (conf.getOptVal('useMotivationColourCode') && nodeTD)
        { var val = parseInt(nodeTD.innerHTML)
          for (var motivation in motivationLst)
          { if (val >= motivation)
            { nodeTD.style.color = motivationLst[motivation].tcol;
              break;
            }
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Fähigkeiten']);
        if (conf.getOptVal('useAbilityColourCode') && nodeTD)
        { var val = parseInt(nodeTD.innerHTML)
          for (var ability in abilityLst)
          { if (val >= ability)
            { nodeTD.style.color = abilityLst[ability].tcol;
              break;
            }
          }
        }

        nodeTD = evalTDs.snapshotItem(columns['Ausbildung']);
        if (conf.getOptVal('useTrainingColourCode') && nodeTD)
        { var trainArr = nodeTD.innerHTML.split(',');
          var cnt = 0;
          var nodeTDCopy = nodeTD.cloneNode(false);
          for each (train in trainArr)
          { train = train.trim();
            var colour;
            var training = trainingLst[train];
            if (training)
            { colour = training.tcol[conf.getLayout()];
            }
            else
            { colour = trainingLst['ohne'].tcol[conf.getLayout()];
            }
            if (colour)
            { var nodeSpan = new Element('span', {'style': 'color: '+colour});
              nodeSpan.appendChild(createText(train));
              if (cnt > 0)
              { nodeTDCopy.appendChild(createText(', '));
              }
              nodeTDCopy.appendChild(nodeSpan);
              cnt++;
            }
          }
          if (cnt > 0)
          { nodeTD.parentNode.replaceChild(nodeTDCopy, nodeTD);
          }
        }
      }
      catch(e)
      { console('displayVehicle ' + e);
      }
    }
  }
}

// Fahrzeug reparieren
function doVehicleRepair(iFhzNr)
{ // Spalte für Icons verkleinern oder ausblenden
  switch (conf.getOptVal('imgBuildingList'))
  { case 'normal':
      // nichts machen
      break;
    case 'small':
      xPath.getSingle("./form[1]/table['defaultTable']/thead/tr/th[2]", 'content').setAttribute('style','width:35px; !important;');
      break;
    case 'none':
      xPath.getSingle("./form[1]/table['defaultTable']/thead/tr/th[2]", 'content').setAttribute('style','width:0; !important;');
      break;
  }

  evalTRs = xPath.getNodes("./form/table[@class='defaultTable']/tbody/tr", 'content');
  for (i = 0; i < evalTRs.snapshotLength; i++)
  { var nodeTR = evalTRs.snapshotItem(i);
    // Icons verkleinern oder ausblenden
    switch (conf.getOptVal('imgBuildingList'))
    { case 'normal':
        // nichts machen
        break;
      case 'small':
        ;var nodeImg = xPath.getSingle("./td[2]/label/img", nodeTR);
        nodeImg.setAttribute('src', nodeImg.getAttribute('src').replace(/\/map\//, '/map_25/'));
        break;
      case 'none':
        removeChildren(nodeTR.getElementsByTagName("td")[1]);
        break;
    }
  }
}

// Fahrzeug wurde zur Reparatur gesendet
function doVehicleRepairSent(iFhzNr)
{ var nodeTBody =xPath.getSingle("./table[@class='defaultTable']/tbody", 'content');
  if (conf.getOptVal('dispStatusAsFMSDisplayFI'))
  { var nodeTD = xPath.getSingle("./tr[descendant::td/text()='FMS:']/td[2]", nodeTBody);
    if (nodeTD)
    { var nodeFMS = buildFMS(nodeTD, conf.getOptVal('dispFMSDisplayLinesFI'));
      removeChildren(nodeTD);
      nodeTD.appendChild(nodeFMS);
    }
  }
}

// Toplisten
function displayToplist(iUser)
{ if (conf.getOptVal('highlightUser') && iUser)
  { var evalTDs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[2]", 'content');
    for (var i = 0; i < evalTDs.snapshotLength; i++)
    { var nodeTD = evalTDs.snapshotItem(i);
      if (nodeTD.innerHTML.match(iUser))
      { nodeTD.parentNode.style.backgroundColor = 'gray';
      }
    }
  }
}

// Log
function doLoglist()
{ if (conf.getOptVal('summarizeLog'))
  { var evalTDs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[1]", 'content');
    const datArr =
    { call: {text:'Notruf', tcol: conf.getOptVal('logColCallTCol'), bcol: conf.getOptVal('logColCallBCol'), regex: /Notruf:/},
      fehl: {text:'Fehleinsatz', tcol: conf.getOptVal('logColFehlTCol'), bcol: conf.getOptVal('logColFehlBCol'), regex: /Fehleinsatz:/},
      done: {text:'abgearbeitet', tcol: conf.getOptVal('logColDoneTCol'), bcol: conf.getOptVal('logColDoneBCol'), regex: /Einsatz abgearbeitet:/},
      job:  {text:'Beginnt Job', tcol: conf.getOptVal('logColJobTCol'), bcol: conf.getOptVal('logColJobBCol'), regex: /fängt bei der Wache/},
      quit: {text:'Beendet Job', tcol: conf.getOptVal('logColQuitTCol'), bcol: conf.getOptVal('logColQuitBCol'), regex: /ist bei der Wache/},
    }
    var anzArr = {};
    for (var i = 0; i < evalTDs.snapshotLength; i++)
    { var nodeTD = evalTDs.snapshotItem(i);
      for (dat in datArr)
      { if (datArr[dat].regex.test(nodeTD.innerHTML))
        { if (!anzArr[dat]) { anzArr[dat] = 0; }
          anzArr[dat]++;
          nodeTD.parentNode.style.color = datArr[dat].tcol;
          if (datArr[dat].bcol) { nodeTD.parentNode.style.backgroundColor = datArr[dat].bcol; }
        }
      }
    }

    var table = new tableCls({'class': 'ereglamTable'});
    var row = table.getNewHeadRow();
    for (dat in datArr)
    { var cell = row.getNewCell({}, true);
      cell.addText(datArr[dat].text);
    }
    row = table.getNewBodyRow({'class': 'row0'});
    for (dat in datArr)
    { var cell = row.getNewCell();
      cell.addText((anzArr[dat])?anzArr[dat]:'0');
      var style = cell.getStyle();
      style.color = datArr[dat].tcol;
      style.backgroundColor = datArr[dat].bcol;
    }
    $('content').insertBefore(table.getDOM(), $('content').firstChild.nextSibling.nextSibling);
  }
}

// Funkprotokoll
function doRadioTransscript()
{ var nodeTable = xPath.getSingle("./table[@class='defaultTable']", 'content');
  if (nodeTable)
  { markDemand(nodeTable); }
}

// markiere Nachforderungen im Funkprotokoll
function markDemand(nodeTable)
{ const irrelevRueckm = /Alarmiert|Auf dem Weg zum Einsatz|Ankunft am Einsatzort|Zurück alarmiert|Frei [(]Dienstfahrt[)]|Nicht einsatzbereit/;
  var markedVeh = new Array;

  var evalTRs = xPath.getNodes("./tbody/tr", nodeTable);
  for (var i = 1; i < evalTRs.snapshotLength; i++)
  { var nodeTR = evalTRs.snapshotItem(i);

    var evalTDs = xPath.getNodes("./td", nodeTR);
    if (evalTDs.snapshotLength > 1)
    { // Rückmeldungen von Leitstellen ignorieren
      if (/Leitstelle:/.test(evalTDs.snapshotItem(1).innerHTML))
      { evalTDs.snapshotItem(1).style.color = conf.getOptVal('highlightVehReqColour');
        continue;
      }
      var RM = evalTDs.snapshotItem(2).innerHTML.trim();
      if (RM != undefined)
      { // irrelevante Rückmeldungen ignorieren
        if (irrelevRueckm.test(RM))
        { continue;
        }

        var NfFhz = conf.fhzGrpList.findDemand(RM);

        if (NfFhz)
        { if (conf.getOptVal('highlightVehicleRequest'))
          { evalTDs.snapshotItem(2).innerHTML = evalTDs.snapshotItem(2).innerHTML.replace(NfFhz.getRegex(), '<span style="color: ' + conf.getOptVal('highlightVehReqColour') + ';">$&</span>');
          }
          markedVeh.push(NfFhz.getName());
        }
      }
    }
  }
  return markedVeh;
}

function doOverview()
{ var evalTR = xPath.getNodes("./table[@class='defaultTable']/tbody/tr", 'mission_content');
  for (iTR = 0; iTR < evalTR.snapshotLength; iTR++)
  { var nodeTR = evalTR.snapshotItem(iTR);
    var nodeTD = xPath.getSingle("./td[2]", nodeTR);
    if (xPath.getSingle("./span[@name= 'aaoInfo']", nodeTD))
    { continue;
    }
    var nodeA = xPath.getSingle("./a", nodeTD);
    var mld = conf.getMld(nodeA.innerHTML.trim());
    nodeA.title = mld.write();

    if (main.hasVB)
    { if (conf.getOptVal('highlightVBOrder') && mld.isVBOrder())
      { nodeA.style.color = conf.getOptVal('highlightVBOrderColor');
        nodeA.style.fontWeight = 'bold';
      }
    }
    if (conf.getOptVal('highlightOrder') && main.order == mld.getName())
    { nodeA.style.color = conf.getOptVal('highlightOrderColor');
      nodeA.style.fontWeight = 'bold';
      nodeA.style.fontStyle = 'italic';
      if (conf.getOptVal('highlightOrderBlink'))
      { nodeA.style.textDecoration = 'blink';
      }
    }

    if (mld && conf.getOptVal('showInfoKlasseInListe') || conf.getOptVal('showInfoVehiclesInListe'))
    { var aao = mld.getAao();
      var aaoFhzStr = '';

      if (conf.getOptVal('limit2neededVehicleGroups'))
      { aaoFhzStr = aao.getFhzeStrWithoutOfScopes(true);
      }
      else
      { aaoFhzStr = aao.getFhzeStr(true);
      }
      var nodeSpan = new Element('span',
                                 {'style': 'padding-right: 2px;'
                                           + ((conf.getOptVal('alignInfoKlasseToRight')) ? ' float: right;' : '')
                                           + " color: " + conf.getOptVal('dispStichwortColour') + ';'
                                           + " text-align: right;" + " line-height: 13px",
                                  'title': aaoFhzStr,
                                  'class': 'fontSmall',
                                  'name' : 'aaoInfo'});
      var text = '';
      if (conf.getOptVal('showInfoKlasseInListe'))
      { if (conf.getOptVal('showInfoLangtextListe'))
        { var stw = aao.getStw();
          text = stw.getName() + ': ' + stw.getText();
        }
        else
        { text = aao.toString();
        }
        nodeSpan.appendChild(createText(text));
      }

      if (conf.getOptVal('showInfoVehiclesInListe'))
      { if (conf.getOptVal('showInfoKlasseInListe'))
        { nodeSpan.appendChild(new Element('br'));
        }
        text = aaoFhzStr;
        if (!text)
        { text = '-';
        }
        var txtLen = mld.getName().length + text.length;
        if (txtLen > 50)
        { txtLen = 50 - mld.getName().length;
          text = text.substr(0,(txtLen - 3)) +'...';
        }
        nodeSpan.appendChild(createText(text));
      }
      nodeTD.appendChild(nodeSpan);
    }

    // Position in Stadtbereich hervorheben
    if (conf.getOptVal('highlightCityExtension'))
    { nodeA = xPath.getSingle("./td[3]/a", nodeTR);
      if (nodeA)
      { var [posX, posY] = nodeA.innerHTML.split(' - ');
        if (parseInt(posY.trim()) > 100 && conf.getOptVal('highlightCityExtension'))
        { nodeA.style.color = conf.getOptVal('highlightCityExtColour');
        }
        nodeA.title = getAreaDescription(parseInt(posX.trim()), parseInt(posY.trim()));
      }
    }
  }
}

// Fahrzeug bearbeiten
function doCall(iNr)
{ function cntListCls()
  { var list = {};
    var cnt = 0;

    this.getClass = function()
    { return 'cntListCls';
    }

    this.getCount = function()
    { return cnt;
    }

    this.getList = function()
    { return list;
    }

    this.get = function(iFGrp, iReadOnly)
    { var item = list[iFGrp];
      if(!item && !iReadOnly)
      { item =
        list[iFGrp] = new cntCls(iFGrp);
        cnt++;
      }
      return item;
    }
  }

  function cntCls(iFGrp)
  { var fGrp = {};
    var cnt = 0;
    var free = 0;
    var nodes = [];

    this.getClass = function()
    { return 'cntCls';
    }

    this.getFGrp = function()
    { return fGrp;
    }

    this.addNode = function(iNode)
    { nodes.push((objType(iNode) == 'nodeCls')?iNode:new nodeCls(iNode, 'free_vehicle'));
      cnt++;
      free++;
    }

    this.getNodes = function()
    { return nodes;
    }

    this.getCount = function()
    { return cnt;
    }

    this.reduceCount = function()
    { if (cnt > 0)
      { cnt--; }
    }

    this.getFree = function()
    { return free;
    }

    this.hasFree = function()
    { return (free > 0);
    }

    this.markAsFound = function()
    { free--;
    }

    this.getIdx = function()
    { return cnt - free;
    }

    this.getNextItem = function()
    { return this.getItem(this.getIdx());
    }

    this.getItem = function(idx)
    { return nodes[idx];
    }

    this.toString = function()
    { return fGrp.toString()+': cnt = '+cnt+'; free = '+free;
    }

    fGrp = iFGrp;
  }

  function nodeCls(iNode, iSect)
  { var node = undefined;
    var chkbox = undefined;
    var name = '';
    var owner = '';
    var underway = false;
    var inactive = false;
    var reqAttr = false;
    var fhz = {};
    var station = undefined;
    var time = undefined;
    var timeCell = undefined;
    var fastMark = false;
    var section = iSect;

    this.getClass = function()
    { return 'nodeCls';
    }

    parse = function(iNode)
    { var evalTDs = xPath.getNodes('./td', iNode);
      if (evalTDs.snapshotLength > 0)
      { if (section == 'free_vehicle')
        { chkbox = xPath.getSingle('./input', evalTDs.snapshotItem(0));

          var item = evalTDs.snapshotItem(1);
          name = xPath.getSingle('./a', item).innerHTML.trim();
          underway = /\s*[(]unterwegs[)]/.test(item.innerHTML);
          inactive = /^XXX\s/.test(name);
          if (inactive)
          { name = name.replace(/^XXX\s/, '');
            chkbox.disabled = true;
          }

          fhz = conf.getFhz(evalTDs.snapshotItem(2).innerHTML.trim());

          [, stationNr] = /^\/feuerwachen\/(\d+)$/.exec(xPath.getSingle('./a', evalTDs.snapshotItem(3)).getAttribute('href').trim());
          station = conf.stationList.getStation(stationNr);

          timeCell = evalTDs.snapshotItem(4);
          time = new timeCls(timeCell.innerHTML.trim());
        }
        else // alle andere Abschnitte
        { var item = evalTDs.snapshotItem(0);

          name = xPath.getSingle('./a', item).innerHTML.trim();
          if (isVBCall() || isVGSL())
          { item.innerHTML.match(/[(].*[)]\s*(.*)/);
            var tmp = RegExp.$1.trim();
            if (tmp !== '')
            { owner = name;
              name = tmp;
            }
          }

          fhz = conf.getFhz(evalTDs.snapshotItem(1).innerHTML.trim());

          try
          { timeCell = evalTDs.snapshotItem(4);
            time = new timeCls(timeCell.innerHTML.trim());
          }
          catch(e)
          { if (section == 'driving_vehicle')
            { section = 'mission_vehicle';
            }
            else
            { timeCell = undefined;
              time = undefined;
            }
          }
        }
      }
    }

    this.setNode = function(iNode)
    { if (iNode !== undefined && iNode.nodeName && iNode.nodeName == 'TR')
      { node = iNode;
        parse(iNode);
      }
    }

    this.getName = function()
    { return name;
    }

    this.getOwner = function()
    { return owner?owner:main.user;
    }

    this.hasOwner = function()
    { return owner !== '';
    }

    this.getNode = function()
    { return node;
    }

    this.setNoDisplay = function(iNoDisp)
    { if (iNoDisp)
      { node.style.display = 'none';
      }
      else
      { node.style.display = '';
      }
    }

    this.setBGColor = function(iOpt)
    { if (iOpt)
      { node.style.backgroundColor = conf.getOptVal('optionalLineColour');
      }
      else
      { node.style.backgroundColor = conf.getOptVal('calledLineColour');
      }
    }

    this.clearBGColor = function()
    { node.style.backgroundColor = '';
    }

    this.getFhz = function()
    { return fhz;
    }

    this.getFhzGrp = function()
    { return fhz.getGrp();
    }

    this.isClicked = function()
    { return chkbox.checked;
    }

    this.hasReqAttr = function()
    { return reqAttr;
    }

    this.click = function(iReq)
    { chkbox.click();
      if (iReq)
      { if (this.isClicked())
        { chkbox.setAttribute('alt', 'marked');
          reqAttr = true;
        }
        else
        { chkbox.removeAttribute('alt');
          reqAttr = false;
        }
      }
    }

    this.isInactive = function()
    { return inactive;
    }

    this.isUnderway = function()
    { return underway;
    }

    this.getStation = function()
    { return station;
    }

    this.getStationResponseTime = function()
    { if (this.isUnderway())
      { return 0;
      }
      else if (!station)
      { return 90;
      }
      else
      { return station.isBF()?30:90;
      }
    }

    this.getTime = function()
    { return time;
    }

    this.hasTime = function()
    { return time !== undefined;
    }

    this.hasFasterMark = function()
    { return fastMark;
    }

    this.markAsFaster = function()
    { fastMark = true;
      if (conf.getOptVal('useDottedLine4FasterVeh'))
      { node.style.border = '3px dotted ' + conf.getOptVal('replacementVehicleColour');
      }
      else
      { timeCell.style.backgroundColor = conf.getOptVal('replacementVehicleColour');
      }
    }

    this.removeMarkAsFaster = function()
    { fastMark = false;
      if (conf.getOptVal('useDottedLine4FasterVeh'))
      { node.style.border = '0px none';
      }
      else
      { timeCell.style.backgroundColor = '';
      }
    }

    this.toString = function()
    { if (node)
      { var nameStr = 'Der '+name+' ('+fhz.getName()+')';

        if (section == 'free_vehicle')
        { if (inactive)
          { nameStr += ' ist inaktiv';
          }
          else if (underway)
          { nameStr += ' benötigt noch '+time+'Std. bis zur Einsatzstelle';
          }
          else
          { nameStr += ' benötigt von Wache "'+station+'" '+time+'Std.';
          }
        }
        else
        { if (owner != '')
          { nameStr += ' von '+owner;
          }
          if (this.hasTime())
          { nameStr += ' benötigt noch '+time+'Std. bis zur Einsatzstelle';
          }
          else if (section == 'mission_vehicle')
          { nameStr += ' ist an der Einsatzstelle eingetroffen';
          }
          else if (section == 'waiting_vehicle')
          { nameStr += ' wartet auf seine Besatzung';
          }
        }
        return nameStr;
      }
      else
      { return 'undefiniert';
      }
    }

    this.setNode(iNode);
  }

  function onRouteListCls(iByUser, iConf)
  { var items = [];
    var fCol = new fhzColCls('', iConf);
    var users = {};
    var byUser = iByUser?true: false;

    this.getClass = function()
    { return 'onRouteListCls';
    }

    this.addItem = function(iItem)
    { items.push(iItem);
      fCol.addFhz(iItem.getFhzGrp());
      if (byUser)
      { var owner = iItem.getNode().getOwner();
        if (!users[owner]) { users[owner] = []; }
        users[owner].push(iItem.getNode());
      }
    }

    this.getItems = function()
    { return items;
    }

    this.getUsers = function()
    { return users;
    }

    this.getUserCnt = function()
    { var cnt = 0;
      for (user in users)
      { cnt++;
      }
      return cnt;
    }

    this.getFCol = function()
    { return fCol;
    }

    this.toString = function()
    { var str = fCol.toString();
      if (byUser)
      { var userStr = '';
        for (user in users)
        { userStr += user + ': ' + users[user].length + '; ';
        }
        if (userStr.length > 0)
        { str += '\n' + userStr;
        }
      }
      return str;
    }
  }

  function onRouteCls(iNode)
  { var node = {};

    this.getClass = function()
    { return 'onRouteCls';
    }

    this.setNode = function(iNode)
    { node = iNode;
    }

    this.getNode = function()
    { return node;
    }

    this.getFhz = function()
    { return node.getFhz();
    }

    this.getFhzGrp = function()
    { return node.getFhz().getGrp();
    }

    this.toString = function()
    { return node.toString();
    }

    this.setNode(iNode);
  }

  function applyUserLimit(iSect, iData)
  { var nodeSel = $('user.'+iSect);
    if (!nodeSel) { return; }
    var opt = nodeSel.options[nodeSel.selectedIndex];
    conf.redVhcListCnf[iSect] = opt.value;

    var rowCnt = 0;
    var items = iData.getItems();
    for (var i = 0; i < items.length; i++)
    { var node = items[i].getNode();
      var noDisp = opt.value != '&ALL&' && (node.getOwner() != opt.value || opt.value == '}}NONE{{');
      node.setNoDisplay(noDisp);
      if (!noDisp)
      { node.getNode().className = 'row'+(rowCnt++)%2;
      }
    }
  }

  function getInjured()
  { var evalText = xPath.getNodes("./table/tbody/tr[contains(./td[1]/text(), 'Verletzte')]/td[2]/text()", 'mission_content');

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

  function getVBCallOwner()
  { var node = xPath.getSingle("./table/tbody/tr[contains(./td[1]/text(), 'Einsatz von')]/td[2]/a", 'mission_content');
    return (node?node.innerHTML.trim():'');
  }

  function isVBCall()
  { return getVBCallOwner() != '';
  }

  function isOwnVBCall(iUser)
  { var owner = getVBCallOwner();
    return (!owner || (owner == iUser));
  }

  function isVGSL()
  { return hasStatistics() && !isVBCall();
  }

  function hasStatistics()
  { var node = xPath.getSingle("./h2[contains(./text(), 'Statistiken')]", 'mission_content');
    return node !== null;
  }

  function markReqClicked(e)
  { marking = true;
    markReq = $('markReq').checked;
    userSel = false;
    clearMarks(true);
    firstExec = false;
    main.main();
    marking = false;
  }

  function markVehicles(iList, iFhze, iTimes, iOpt)
  { // Fahrzeuge markieren, die benötigt werden
    // Einsatzeiten bei Fahrzeugen ermitteln
    for each (fAlt in iList)
    { var node = undefined;
      for each(fGrp in fAlt.getList())
      { var cnt = data.count.avail.get(fGrp.getName());
        if (cnt && cnt.getFree() > 0)
        { var checkNode = cnt.getNextItem();
          if (checkNode && (!node || checkNode.getTime().getSeconds() < node.getTime().getSeconds()))
          { node = checkNode;
          }
        }
      }

      if(node)
      { node.setBGColor(iOpt);
        if (!iOpt && markReq && !userSel && !node.isClicked())
        { node.click(true);
        }
        if (iTimes.low.getSeconds() > node.getTime().getSeconds())
        {
          iTimes.low = node.getTime();
        }
        if (iTimes.high.getSeconds() < node.getTime().getSeconds())
        {
          iTimes.high = node.getTime();
        }
        data.count.avail.get(node.getFhzGrp().getName()).markAsFound();
        iFhze.addFhz(node.getFhzGrp());
      }
      else if (!iOpt)
      { data.missing.addFhz(fAlt);
      }
    }
  }

  function clearMarks(iUncheck)
  { var evalTRs = xPath.getNodes("./div[@class='free_vehicle']/form/table[@class='defaultTable']/tbody/tr[not(./child::th)]", 'mission_content');
    for (iTR = 0; iTR < (evalTRs.snapshotLength-1); iTR++)// letzte Zeile ignorieren
    { var nodeItem = new nodeCls(evalTRs.snapshotItem(iTR), 'free_vehicle');
      nodeItem.clearBGColor();
      if (iUncheck && nodeItem.isClicked())
      { nodeItem.click(true);
      }
    }
  }

  function findFasterUnits()
  { // Fahrzeuge suchen, die schneller sind als Fahrzeuge auf dem Weg
    var evalTDs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[2]", 'driving_vehicle');
    // von hinten nach vorne suchen
    for (iTD = evalTDs.snapshotLength - 1; iTD >= 0; iTD--)
    { var nodeTD = evalTDs.snapshotItem(iTD);
      timeNode = xPath.getSingle('../td[5]', nodeTD);
      if (!/(Berechne|Fertig)\.\.\./.test(timeNode.innerHTML))
      { var fhz = conf.getFhz(nodeTD.innerHTML.trim());
        var time = new timeCls(timeNode.innerHTML.trim());
        var cntItem = data.count.avail.get(fhz.getGrp(), true);
        if(!cntItem) { break; }
        var nodeLst = cntItem.getNodes();
        for (i = 0; i < nodeLst.length; i++)
        { node = nodeLst[i];
          //wenn Fahrzeug unterwegs ist, gibts keine Verzögerung bei der Alarmierung
          if (!node.isClicked() && !node.hasFasterMark() && ((node.getTime().getSeconds() + node.getStationResponseTime()) < time.getSeconds()))
          { node.markAsFaster();
            if (conf.getOptVal('useDottedLine4FasterVeh'))
            { nodeTD.parentNode.style.border = '3px dotted ' + conf.getOptVal('fasterVehicleColour');
            }
            else
            { timeNode.style.backgroundColor = conf.getOptVal('fasterVehicleColour');
            }
            break;
          }
          else if (node.isClicked() || node.hasFasterMark())
          { continue;
          }
          else
          { break; }
        }
      }
    }
  }

  var data =
  { alarm     : new fhzColCls('', conf),
    firstAlarm: new fhzColCls('', conf),
    secndAlarm: new fhzColCls('', conf),
    optional  : new fhzColCls('', conf),
    missing   : new fhzColCls('', conf),
    demand    : new fhzColCls('', conf),
    waiting   : new onRouteListCls((isVGSL() || (isVBCall() && !isOwnVBCall(main.user))), conf),
    onRoute   : new onRouteListCls((isVGSL() || (isVBCall() && !isOwnVBCall(main.user))), conf),
    arrived   : new onRouteListCls((isVGSL() || (isVBCall() && !isOwnVBCall(main.user))), conf),
    count     :
    { avail  : new cntListCls(),
      unavail: new cntListCls(),
      called : new cntListCls(),
      demand : new cntListCls(),
      stat1  : new cntListCls(),
      stat2  : new cntListCls(),
      stat3  : new cntListCls(),
      stat4  : new cntListCls(),
      stat6  : new cntListCls()
    },
    times     :
    { avail:
      { low : new timeCls(96*3600),
        high: new timeCls(),
      },
      opt  :
      { low : new timeCls(96*3600),
         high: new timeCls(),
      },
    },
  }
  var log = new logCls('E');

  // Script ist aktiv
  running = true;

  // wenn ein Element mit Klasse 'form_success' gefunden wird, ist der Einsatz abgeschlossen
  if (xPath.getSingle(".//div[@class='form_success']/p[contains(text(), 'Dieser Einsatz ist erledigt.')]", 'content'))
  { return; }

  // Einsatzmeldung ermitteln
  var mld = null;
  { var mldStr = '';
    var evalText = xPath.getNodes("./h1[1]/text()", 'content');
    // muss als Schleife laufen, da sonst bestimmte Einsätze (mit Klammern??) nicht gefunden werden
    for (iTx = 0; iTx < evalText.snapshotLength; iTx++)
    { mldStr = evalText.snapshotItem(iTx).nodeValue.trim();
      if (mldStr.length <= 0) { continue; }
      mld = conf.getMld(mldStr);
      if (mld.getName() == mldStr) { break; }
    }
    if (!mld)
    { log.addMsg(mldStr);
      setMsg('Einsatzmeldung nicht erkannt: '+mldStr, 'form_error'); return;
    }
    else
    { document.title = 'Feuerwehreinsatz: ' + mld.getName();
      var nodeH1 = xPath.getSingle("./h1[1]", 'content');
      if (main.hasVB)
      { if (conf.getOptVal('highlightVBOrder') && mld.isVBOrder())
        { nodeH1.style.color = conf.getOptVal('highlightVBOrderColor');
          nodeH1.style.fontWeight = 'bold';
        }
      }
      if (conf.getOptVal('highlightOrder') && main.order == mld.getName())
      { nodeH1.style.color = conf.getOptVal('highlightOrderColor');
        nodeH1.style.fontWeight = 'bold';
        nodeH1.style.fontStyle = 'italic';
        if (conf.getOptVal('highlightOrderBlink'))
        { nodeH1.style.textDecoration = 'blink';
        }
      }
    }
  }

  // im Verbandseinsatz die Checkbox per default NICHT anhaken, sonst schon
  if (firstExec)
  { if (!mld.isVBOrder() || conf.getOptVal('markWhenAllianceCall'))
    { markReq = !isVBCall() || (main.order == mld.getName());
    }
    else if (main.hasVB && isOwnVBCall(main.user) && (mld.isVBOrder() || !conf.getOptVal('markWhenAllianceCall')))
    { markReq = false;
    }
  }

  // Wiki-Link setzen falls gewünscht und vorhanden
  if (conf.getOptVal('addWikiLink') && !xPath.getSingle("./sup[@class='WikiLink']", 'content') && mld.getWiki())
  { var nodeH1 = xPath.getSingle("./h1[1]", 'content');
    var nodeA = new Element('a', {'href'  : mld.getWiki(),
                                    'target': '_blank'});
    nodeA.appendChild(createText('Wiki'));
    var nodeSup = new Element('sup', {'class' : 'WikiLink',
                                      'title' : mld.getWiki()});
    nodeSup.appendChild(nodeA);
    nodeH1.parentNode.insertBefore(nodeSup, nodeH1.nextSibling);
    addEntityText(nodeH1, '&nbsp;');
    nodeH1.style.display = 'inline';
    nodeH1.title = mld.write();
  }

  // Fahrzeuge ermitteln, die unterwegs sind
  { for each (section in ['mission_vehicle','driving_vehicle','waiting_vehicle'])
    { var evalTDs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[2]", section);
      for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
      { var nodeItem = new nodeCls(evalTDs.snapshotItem(iTD).parentNode, section);
        var fGrp = nodeItem.getFhzGrp();
        var onRoute = new onRouteCls(nodeItem);

        switch(section)
        { case 'mission_vehicle':
            data.arrived.addItem(onRoute);
            data.count.stat4.get(fGrp.getName()).addNode(nodeItem);
            break;
          case 'driving_vehicle':
            data.onRoute.addItem(onRoute);
            data.count.stat3.get(fGrp.getName()).addNode(nodeItem);
            break;
          case 'waiting_vehicle':
            data.waiting.addItem(onRoute);
            data.count.called.get(fGrp.getName()).addNode(nodeItem);
            break;
        }
      }
    }
  }

  // Fahrzeuge ermitteln, die verfügbar sind
  { var evalTDs = xPath.getNodes("./div[@class='free_vehicle']/form/table[@class='defaultTable']/tbody/tr/td[3]", 'mission_content');
    for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
    { var nodeItem = new nodeCls(evalTDs.snapshotItem(iTD).parentNode, 'free_vehicle');
      //Farbmarkierung und Checkboxanwahl zurücknehmen, da jetzt andere Fahrzeuge gültig sein könnten
      nodeItem.clearBGColor();

      var fhzGrp = nodeItem.getFhz()?nodeItem.getFhz().getGrp():GRP_UNKNOWN;

      if (nodeItem.isInactive())
      { data.count.stat6.get(fhzGrp).addNode(nodeItem);
        continue;
      }
      else if (nodeItem.isUnderway())
      { data.count.stat1.get(fhzGrp).addNode(nodeItem);
      }
      else
      { data.count.stat2.get(fhzGrp).addNode(nodeItem);
      }
      data.count.avail.get(fhzGrp).addNode(nodeItem);
    }
  }

  // Fahrzeuglisten besorgen
  var aao = mld.getAao();
  var fhze;
  var fOpt;
  if (mld.isStorm() && conf.getOptVal('disableSelectionDueToStorm'))
  { fhze = new fhzColCls(conf.getOptVal('reducedSelectionVehicles'), conf);
    fOpt = new fhzColCls(conf.getOptVal('reducedSelOptVehicles'), conf);
  }
  else
  { fhze = aao.getFhze(false).clone();
    fOpt = aao.getOpt().clone();
  }

  // Fahrzeuge ermitteln, die nachgefordert wurden
  { var nodeTable = xPath.getSingle("./table[@class='defaultTable']", 'mission_reply');

    if (nodeTable)
    { var markedVeh = markDemand(nodeTable);
      for each (fhzGrp in markedVeh)
      { data.demand.addFhz(fhzGrp);

        var found = false;
        for each(fRouteList in [data.waiting, data.onRoute, data.arrived])
        { for each (fRoute in fRouteList.getItems())
          { if (fhzGrp == fRoute.getFhzGrp())
            { found = true;
              break;
            }
          }
          if (found)
          { break;
          }
        }

  // an Fahrzeugliste anfügen, wenn nicht vorhanden
        if (!found && !fhze.contains(fhzGrp))
        { fhze.addFhz(fhzGrp);
        }

        var cnt = data.count.stat4.get(fhzGrp, false);
        if (!(conf.getOptVal('dispStatusDemandNotAtScene') && cnt && (cnt.getCount() > 0)))
        { data.count.demand.get(fhzGrp).addNode();
        }
      }
    }
  }

  if (!isVGSL())
  {  // Verletzte noch berücksichtigen: dazu je nach Einsatz das richtige Rettungsmittel bestimmen
    var rtm = mld.isOnWater()? conf.specFhz.rtb : conf.specFhz.rtw;

    for (var inj = getInjured(); inj > 0; inj--)
    { fhze.addFhz(rtm);
    }
    if (getInjured() > 0 && !mld.isOnWater() && conf.getOptVal('callSurplusRTW'))
    { fhze.addFhz(rtm);
    }
  }

  // Fahrzeugs optional setzen, wenn nicht automatisch markiert werden soll
  if (!markReq)
  { fOpt = fhze.concat(fOpt);
    fhze.clear();
  }

  // benötigte Fahrzeuge aus der Alarmierung entfernen, wenn schon unterwegs
  for each(fRouteList in [data.waiting, data.onRoute, data.arrived])
  { for each (fRoute in fRouteList.getItems())
    { if (isVGSL() && fRoute.getNode().getOwner() != main.user)
      { continue; }
      if (!fhze.remove(fRoute.getFhzGrp()))
      { fOpt.remove(fRoute.getFhzGrp());
      }
    }
  }

  // Fahrzeuge markieren, die benötigt werden
  // Einsatzeiten bei zu alarmierenden Fahrzeugen ermitteln
  markVehicles(fhze.getList(), data.alarm, data.times.avail, false);

  // Einsatzzeiten bei optionalen Fahrzeugen ermitteln
  markVehicles(fOpt.getList(), data.optional, data.times.opt, true);

  // Abmarschreihenfolge bestimmen
  if (conf.getOptVal('moveSequenceInStation') != 'normal')
  { var stations = {};
    for each(cnt in data.count.avail.getList())
    { for each(nodeItem in cnt.getNodes())
      { if (!nodeItem.isClicked())
        { continue;
        }
        var station = nodeItem.getStation();
        var fhz = nodeItem.getFhz();
        if (!stations[station])
        { stations[station] = {};
        }

        switch(true)
        { case fhz.needsTraining():
            if (!stations[station]['Aus']) {stations[station]['Aus'] = 0}
            stations[station]['Aus']++;
            if (!stations[station]['Sum']) {stations[station]['Sum'] = 0}
            stations[station]['Sum']++;
            break;
          case !fhz.isLGrpFhz(): //kein LF
            if (!stations[station]['Tr']) {stations[station]['Tr'] = 0}
            stations[station]['Tr']++;
            if (!stations[station]['Sum']) {stations[station]['Sum'] = 0}
            stations[station]['Sum']++;
            break;
          case fhz.isLGrpFhz(): //ist LF
            if (!stations[station]['LF']) {stations[station]['LF'] = 0}
            stations[station]['LF']++;
            break;
        }
      }
    }
    for each(cnt in data.count.avail.getList())
    { for each(nodeItem in cnt.getNodes())
      { if (!nodeItem.isClicked())
        { continue;
        }
        var station = nodeItem.getStation();
        var fhz = nodeItem.getFhz();

        if (!stations[station]['Aus']) { stations[station]['Aus'] = 0 }
        if (!stations[station]['Tr']) { stations[station]['Tr'] = 0 }
        if (!stations[station]['LF']) { stations[station]['LF'] = 0 }

        switch(true)
        { case fhz.needsTraining():
            if (nodeItem.getFhzGrp() == 'RTW' && conf.getOptVal('limitRTWcall'))
            { if (nodeItem.getTime().getSeconds() > (parseInt(conf.getOptVal('limitRTWcallMin')) * 60))
              { nodeItem.click();// wieder abwählen
              }
            }
            data.firstAlarm.addFhz(fhz.getGrp());
            break;
          case !fhz.isLGrpFhz(): //kein LF
            switch(conf.getOptVal('moveSequenceInStation'))
            { case 'special' :
                if (stations[station]['Aus'] > 0)
                { data.secndAlarm.addFhz(fhz.getGrp());
                  if (firstExec && !userSel)
                  { nodeItem.click();// wieder abwählen
                  }
                }
                else
                { data.firstAlarm.addFhz(fhz.getGrp());
                }
                break;
              default:
                data.firstAlarm.addFhz(fhz.getGrp());
                break;
            }
            break;
          case fhz.isLGrpFhz(): //ist LF
            if (stations[station]['Sum'] > 0)
            { data.secndAlarm.addFhz(fhz.getGrp());
              nodeItem.click();// wieder abwählen
            }
            else
            { data.firstAlarm.addFhz(fhz.getGrp());
            }
            break;
        }
      }
    }
  }
  else
  { data.firstAlarm = data.firstAlarm.concat(data.alarm);
  }

  // Aufbau der Einsatzinformationen
  { // Tabelle mit Einsatzinformationen
    var nodeTBody = xPath.getSingle("./table[@class='defaultTable']/tbody[contains(./tr/td/text(), 'Gemeldet')]", 'mission_content');

    // Tabelle 'Rückmeldungen' um weitere Zeilen erweitern
    // die Inhalte werden später eingestellt
    if (!$('eAAO'))
    { var insNode = nodeTBody.firstChild.nextSibling; //Einfügeknoten bestimmen

      // Tabelle für Markierungscheckbox und Abmarschinfo
      { var freeNode = xPath.getSingle("./div[@class='free_vehicle']/h2[1]", 'mission_content');
        var table = new tableCls({'style': 'border: 0px none; width: 100%',
                                  'id'   : 'eAAO'});
        var row = table.getNewBodyRow();
        var cell = row.getNewCell({'style': 'width: 40%'});
        // Option: benötigte Fahrzeuge direkt auswählen
        var nodeInput = new Element('input', {'type': 'checkbox',
                                              'id'  : 'markReq'});
        cell.addChild(nodeInput);
        var nodeLabel = new Element('label', {'for': 'markReq'});
        cell.addChild(nodeLabel);
        nodeLabel.appendChild(createText(' Fahrzeuge sofort auswählen'));

        cell = row.getNewCell({'id'   : 'eAAOSeq',
                               'style': 'width: 60%;text-align: right;font-weight:bold;'});
        // und vor die Tabelle einfügen
        freeNode.parentNode.insertBefore(table.getDOM(), freeNode.nextSibling);
      }

      // Einsatznummer
      { var node = xPath.getSingle("./tr/td[2]", nodeTBody);
        node.innerHTML = node.innerHTML.replace(' - ', ' unter Nr. '+iNr+' - ');
      }

      // Alarmierungsstichwort
      { row = new tableRowCls();
        cell = row.getNewCell({'title': 'Alarmierungstichwort'}, false);
        cell.addText('Stichwort');
        cell = row.getNewCell({'id': 'eAAOStw'});
        nodeTBody.insertBefore(row.getDOM(), insNode);
      }
      // Alarmierungsvorschlag
      { row = new tableRowCls();
        cell = row.getNewCell({'title': 'zu alarmierende Fahrzeuge'}, false);
        cell.addText('Alarmierung');
        cell = row.getNewCell({'id': 'eAAOAlm'});
        nodeTBody.insertBefore(row.getDOM(), insNode);
      }
      // Fahzeugefehlliste
      { row = new tableRowCls();
        cell = row.getNewCell({'title': 'nicht verfügbare Fahrzeuge'}, false);
        cell.addText('nicht verfüg.');
        cell = row.getNewCell({'id': 'eAAOUnavail'});
        nodeTBody.insertBefore(row.getDOM(), insNode);
      }
      // ab hier weitere Zeilen anhängen
      row = new tableRowCls();
      cell = row.getNewCell({'id': 'eAAOStat','colspan': 2, 'padding':'0px'});
      nodeTBody.appendChild(row.getDOM());
    }
    else
    { removeChildren($('eAAOSeq'));
      removeChildren($('eAAOStw'));
      $('eAAOStw').parentNode.style.display = '';
      removeChildren($('eAAOAlm'));
      $('eAAOAlm').parentNode.style.display = '';
      removeChildren($('eAAOUnavail'));
      $('eAAOUnavail').parentNode.style.display = '';
      removeChildren($('eAAOStat'));
      $('eAAOStat').style.display = '';
    }

    // Werte setzen
    if (markReq)
    { $('markReq').setAttribute('checked', 'checked');

      var str = '';
      switch(conf.getOptVal('moveSequenceInStation'))
      { case 'trupp':
          str = 'Trupp- vor Löschgruppenfahrzeugen';
          break;
        case 'special' :
          str = 'Sonder- vor Trupp- und Löschfahrzeugen';
          break;
        default:
          str = 'alle zeitgleich';
          break;
      }
      if (str.length > 0)
      { $('eAAOSeq').appendChild(createText('Alarmierungsreihenfolge: ' + str));
      }
    }

    // Alarmierungsstichwort
    if (conf.getOptVal('dispStw'))
    { var node = $('eAAOStw');
      var nodeSpan = new Element('span', {'style': 'color: ' + conf.getOptVal('dispStichwortColour') + ';'});
      if (conf.getOptVal('disableSelectionDueToStorm') && mld.isStorm())
      { var nodeSpanT = new Element('span', {'style': 'color: ' + conf.getOptVal('dispStormInfoColour') + ';'});
        nodeSpanT.appendChild(createText('Unwetter'));
        node.appendChild(nodeSpanT);
        if (conf.getOptVal('dispStwCallList'))
        { node.appendChild(createText(' ('+conf.getOptVal('reducedSelectionVehicle')+')'));
        }
      }
      else
      { var text = mld.getStw().getName();
        if (conf.getOptVal('dispStwText'))
        { text += ': '+mld.getStw().getText();
        }
        nodeSpan.appendChild(createText(text));
        node.appendChild(nodeSpan);
        if (conf.getOptVal('dispStwCallList'))
        { var aaoStr = '';
          if (conf.getOptVal('limit2neededVehicleGroups'))
          { aaoStr = aao.getFhzeStrWithoutOfScopes(true);
          }
          else
          { aaoStr = aao.getFhzeStr();
          }
          node.appendChild(createText(' ('+(aaoStr?aaoStr:'-')+')'));
        }
      }
    }
    else
    { $('eAAOStw').parentNode.style.display = 'none';
    }

    // zu alarmierende Fahrzeuge
    if (conf.getOptVal('dispCallList') &&
        (data.firstAlarm.getCount() > 0 || data.secndAlarm.getCount() > 0 || data.optional.getCount() > 0))
    { var hasElem = false;
      var node = $('eAAOAlm');
      var nodeSpan = new Element('span');
      if (data.alarm.getCount() > 0)
      { if(data.secndAlarm.getCount() > 0)
        { node.appendChild(createText('1. '));
        }
        nodeSpan.style.color = conf.getOptVal('dispCallReqColour');
        nodeSpan.title = 'erste Alarmierung';
        nodeSpan.appendChild(createText(data.firstAlarm.toString()));
        node.appendChild(nodeSpan);
        nodeSpan = new Element('span');
        hasElem = true;
        if (data.secndAlarm.getCount() > 0)
        { node.appendChild(createText(', 2. '));
          nodeSpan.style.color = conf.getOptVal('dispCallSecColour');
          nodeSpan.title = 'zweite Alarmierung';
          nodeSpan.appendChild(createText(data.secndAlarm.toString()));
          node.appendChild(nodeSpan);
          nodeSpan = new Element('span');
          hasElem = true;
        }
        if (conf.getOptVal('dispTime'))
        { node.appendChild(createText(' '));
          nodeSpan.style.cssFloat = 'right';
          nodeSpan.title = 'Anfahrtzeit';
          nodeSpan.appendChild(createText('(' + data.times.avail.low));
          if (data.alarm.getCount() > 1 || data.secndAlarm.getCount() > 0)
          { nodeSpan.appendChild(createText(' - ' + data.times.avail.high));
          }
          nodeSpan.appendChild(createText(')'));
          node.appendChild(nodeSpan);
          nodeSpan = new Element('span');
        }
      }
      if (data.optional.getCount() > 0)
      { nodeSpan.style.color = conf.getOptVal('dispCallOptColour');
        nodeSpan.title = 'optionale Fahrzeuge';
        if (hasElem)
        { node.appendChild(new Element('br'));
        }
        nodeSpan.appendChild(createText(data.optional.toString()));
        node.appendChild(nodeSpan);
        nodeSpan = new Element('span');
        if (conf.getOptVal('dispTime'))
        { node.appendChild(createText(' '));
          nodeSpan.style.color = conf.getOptVal('dispCallOptColour');
          nodeSpan.style.cssFloat = 'right';
          nodeSpan.title = 'Anfahrtzeit';
          nodeSpan.appendChild(createText('(' + data.times.opt.low));
          if (data.optional.getCount() > 1)
          { nodeSpan.appendChild(createText(' - ' + data.times.opt.high));
          }
          nodeSpan.appendChild(createText(')'));
          node.appendChild(nodeSpan);
          nodeSpan = new Element('span');
        }
      }
    }
    else
    { $('eAAOAlm').parentNode.style.display = 'none';
    }

    // Fahrzeugfehlliste
    if (conf.getOptVal('dispUnavailable'))
    { var fCol;
      if (conf.getOptVal('limit2neededVehicleGroups'))
      { fCol = data.missing.getWithoutOfScopes();
      }
      else
      { fCol = data.missing;
      }
      if (fCol.getCount() > 0)
      { var node = $('eAAOUnavail');
        var nodeSpan = new Element('span', {'style': 'color: '+conf.getOptVal('dispUnavailColour')+';'});
        nodeSpan.appendChild(createText(fCol.toString()));
        node.appendChild(nodeSpan);
      }
      else
      { $('eAAOUnavail').parentNode.style.display = 'none';
      }
    }

    // Position in Stadtbereich hervorheben
    if ((!isVBCall() || isOwnVBCall(main.user)) && (conf.getOptVal('highlightCityExtension') || conf.getOptVal('addLocationDescription')))
    { // in erster Tabelle zu 'Rückmeldungen und Fakten' die Zeile mit der Position finden
      var nodeTD = xPath.getSingle("./tr[contains(./td[1]/text(), 'Position')]/td[2]", nodeTBody);
      var node = xPath.getSingle("./a", nodeTD);
      if (!node)
      { node = new Element('span');
        node.innerHTML = nodeTD.innerHTML.trim();
        removeChildren(nodeTD);
        nodeTD.appendChild(node);
      }
      if (node)
      { var [posX, posY] = node.innerHTML.replace(/Andere Stadt -[\s|  ]*/, '').split(' - ');
        if (parseInt(posY.trim()) > 100 && conf.getOptVal('highlightCityExtension'))
        { node.style.color = conf.getOptVal('highlightCityExtColour');
        }

        if (conf.getOptVal('addLocationDescription'))
        { node.appendChild(createText(': ' + getAreaDescription(parseInt(posX.trim()), parseInt(posY.trim()))));
        }
      }
    }

    // Anzeige Statusliste
    if (conf.getOptVal('dispStatus'))
    { var statCnt =
      { '2'     : {src: data.count.stat2,  fms: FMSStatusLst['2'], disp: true},
        '1'     : {src: data.count.stat1,  fms: FMSStatusLst['1'], disp: true},
        'alarm.': {src: data.count.called, fms: {tcol: 'red', bcol: 'white', text: 'alarmiert'}, disp: true},
        '3'     : {src: data.count.stat3,  fms: FMSStatusLst['3'], disp: true},
        '4'     : {src: data.count.stat4,  fms: FMSStatusLst['4'], disp: true},
        '6'     : {src: data.count.stat6,  fms: FMSStatusLst['6'], disp: conf.getOptVal('dispStatus6')},
        'n.gef.': {src: data.count.demand, fms: {tcol: 'white', bcol: 'black', text: 'Nachforderung'}, disp: conf.getOptVal('dispStatusDemand')},
      }
      var cntAll = 0;
      for (stat in statCnt)
      { var item = statCnt[stat];
        if (item.disp)
        { cntAll += item.src.getCount();
        }
      }
      if (cntAll > 0)
      {
      // nachfolgende Tabelle zeigt Status der Fahrzeuge
      var table = new tableCls({'class':'fhzTable'});
      row = table.getNewHeadRow();
      cell = row.getNewCell({'title':'Status', 'width': 60}, true);
      cell.addText('Status');
      for each(fGrp in conf.fhzGrpList.getList(mld.isOnWater()))
      { if (conf.getOptVal('limit2neededVehicleGroups') && !(fGrp.isInScope() || data.count.avail.get(fGrp.getName()).getCount() > 0))
        { continue;
        }
        cell = row.getNewCell({'title':fGrp.getText()+': '+fGrp.getFhzNameArr().join(', '), 'style': 'font-size: 10px'}, true);
        cell.addText(fGrp.getName());
      }
      cell = row.getNewCell({'title':'Summe', 'width': 25}, true);
      cell.addEntityText('&nbsp;&Sigma;&nbsp;');

      var rowCnt = 0;
      for (stat in statCnt)
      { var item = statCnt[stat];
        if(item.src.getCount() > 0 && item.disp)
        { var sum = 0;
          row = table.getNewBodyRow({'class' : 'row'+(rowCnt++)%2});
          cell = row.getNewCell({'title':item.fms.text}, true);
          cell.addText(stat);
          if(item.fms.tcol)
          { cell.getStyle().color = item.fms.tcol; };
          if(item.fms.bcol)
          { cell.getStyle().backgroundColor = item.fms.bcol; };
          for each(fGrp in conf.fhzGrpList.getList(mld.isOnWater()))
          { if (conf.getOptVal('limit2neededVehicleGroups') && !(fGrp.isInScope() || data.count.avail.get(fGrp.getName()).getCount() > 0))
            { continue;
            }
            var cnt = 0;
            if(item.src.get(fGrp.getName()))
            { cnt = item.src.get(fGrp.getName()).getCount(); }
            cell = row.getNewCell({'class':((cnt == 0)?'null':''),'title':cnt.toString()+' '+fGrp.getName()+' '+item.fms.text});
            sum += cnt;
            cell.addText(cnt.toString());
          }
          cell = row.getNewCell({'title':sum.toString()+' Fahrzeuge '+item.fms.text}, true);
          if(item.fms.bcol)
          { cell.getStyle().backgroundColor = item.fms.bcol; };
          if(item.fms.tcol)
          { cell.getStyle().color = item.fms.tcol; };
          cell.addText(sum.toString());
        }
      }
      // in die letzte Zeile einhängen
      $('eAAOStat').appendChild(table.getDOM());
      }
      else
      { $('eAAOStat').parentNode.style.display = 'none';
      }
    }
    else
    { $('eAAOStat').parentNode.style.display = 'none';
    }

    var evalTR = xPath.getNodes("./tbody/tr", nodeTBody.parentNode);
    var rowCnt = 0;
    for (iTR = 0; iTR < evalTR.snapshotLength; iTR++)
    { if (evalTR.snapshotItem(iTR).style.display == 'none') { continue; }
      evalTR.snapshotItem(iTR).className = 'row'+ (rowCnt++)%2;
    }
  }

  // Spielerauswahl bei VGSL
  if (isVGSL() && (conf.getOptVal('reduceInVehRespListsOfVGSL') != '&OFF&'))
  { for each (section in ['mission_vehicle','driving_vehicle','waiting_vehicle'])
    { if (!$('user.'+section))
      { var nodeH2 = xPath.getSingle("./h2", section);
        if (!nodeH2) { continue; }
        var secData = {};

        switch(section)
        { case 'mission_vehicle':
            secData = data.arrived;
            break;
          case 'driving_vehicle':
            secData = data.onRoute;
            break;
          case 'waiting_vehicle':
            secData = data.waiting;
            break;
        }
        if (secData.getUserCnt() <= 1) { continue; } // with next section

        var nodeSel = new Element('select',
                                  {'id'   : 'user.'+section,
                                   'style': 'width: 200px; float: right;'});
        switch(section)
        { case 'mission_vehicle':
            // section/secData contains last assigned content in event call
            nodeSel.addEventListener("change",
                function(){ applyUserLimit('mission_vehicle', data.arrived) }, true);
            break;
          case 'driving_vehicle':
            nodeSel.addEventListener("change",
                function(){ applyUserLimit('driving_vehicle', data.onRoute) }, true);
            break;
          case 'waiting_vehicle':
            nodeSel.addEventListener("change",
                function(){ applyUserLimit('waiting_vehicle', data.waiting) }, true);
            break;
        }

        var defSel = conf.redVhcListCnf[section];

        // prüfen ob gewählter Spieler aktuell Fahrzeuge in der Liste hat
        if (defSel != '&OFF&' && defSel != '&ALL&' && defSel != '&NONE&' &&
            !secData.getUsers()[defSel])
        { defSel = conf.getOptVal('reduceInVehRespListsOfVGSL')
        }

        var nodeOpt = new Option();
        nodeOpt.name  =
        nodeOpt.value = '&ALL&';
        nodeOpt.appendChild(createText('- alle -'));
        nodeSel.add(nodeOpt, null);
        if (defSel == nodeOpt.value) { nodeOpt.selected = true; }

        nodeOpt = new Option();
        nodeOpt.name  =
        nodeOpt.value = '&NONE&';
        nodeOpt.appendChild(createText('- keine -'));
        nodeSel.add(nodeOpt, null);
        if (defSel == nodeOpt.value) { nodeOpt.selected = true; }

        for (user in secData.getUsers())
        { nodeOpt = new Option();
          nodeOpt.name  =
          nodeOpt.value = user;
          nodeOpt.appendChild(createText(user));
          nodeSel.add(nodeOpt, null);
          if (defSel == nodeOpt.value) { nodeOpt.selected = true; }
        }

        var nodeSpan = new Element('span', {'style': 'float: right;'});
        nodeSpan.appendChild(nodeSel);
        nodeH2.parentNode.insertBefore(nodeSel, nodeH2.nextSibling);
        nodeH2.style.display = 'inline';

        applyUserLimit(section, secData);
      }

    }
  }

  // Anzeige Fahrzeugstatus als FMS
  if (conf.getOptVal('dispStatusAsFMSDisplayEL'))
  { var evalH2s = xPath.getNodes('./div/h2', 'mission_content');
    for (iH2 = 0; iH2 < evalH2s.snapshotLength; iH2++)
    { var nodeH2 = evalH2s.snapshotItem(iH2);
      var FMSstatus = '';
      switch(nodeH2.innerHTML.trim())
      { case 'Fahrzeuge am Einsatzort':
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

      var nodeTable = xPath.getSingle('../table[1]', nodeH2);
      if (!nodeTable) { continue; }
      var column = -1;
      evalTHs = xPath.getNodes('./tbody/tr/th', nodeTable);
      for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
      { // Textspalte FMS ausblenden
        if (iTH == 2 && FMSstatus == 3)
        { evalTHs.snapshotItem(iTH).style.display = 'none';
        }
        // Text der Spalte 'Optionen' ändern
        if (evalTHs.snapshotItem(iTH).innerHTML == 'Optionen')
        { column = iTH;
          evalTHs.snapshotItem(iTH).innerHTML = 'FMS';
          break;
        }
      }
      if (column != -1)
      { // Textspalte FMS ausblenden
        if (FMSstatus == 3)
        { var evalTDs = xPath.getNodes('./tbody/tr/td[3]', nodeTable);
          for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
          { evalTDs.snapshotItem(iTD).style.display = 'none';
          }
        }
        var evalTDs = xPath.getNodes('./tbody/tr/td['+(column+1)+']', nodeTable);
        for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
        { var linksArr = {};
          var nodeTD = evalTDs.snapshotItem(iTD);
          var evalA = xPath.getNodes('./a', nodeTD);
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
          var nodeFMS = FMSkeyPad(FMSstatus, linksArr, conf.getOptVal('dispFMSDisplayLinesEL'));
          removeChildren(nodeTD);
          nodeTD.appendChild(nodeFMS);
        }
      }
    }
  }

  $('markReq').addEventListener("click", markReqClicked , false);

  // Click-Event abfangen: nach hierher verschoben, um auch FMS-Links zu erwischen
  // Fahrzeuge auf Anfahrt
  var evalAs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[6]//a", $('driving_vehicle'));
  for (i = 0; i < evalAs.snapshotLength; i++)
  { evalAs.snapshotItem(i).addEventListener("click", function(e){ firstExec = true; userSel = false;}, false );
  }
  // Fahrzeuge, die auf Besatzung warten
  evalAs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[4]//a", $('waiting_vehicle'));
  for (i = 0; i < evalAs.snapshotLength; i++)
  { evalAs.snapshotItem(i).addEventListener("click", function(e){ firstExec = true; userSel = false;}, false );
  }

  // Checkboxen der Fahrzeugauswahl
  var chks = document.getElementsByName("vehicle_to_user_id[]");
  var evalInputs = xPath.getNodes("./form//input[@name='vehicle_to_user_id[]']", $('free_vehicle'));
  for (i = 0; i < chks.length; i++)
  { chks[i].addEventListener("click" ,
    function(e)
    { if (!marking && !running) {userSel = true; }
    } , false ) ;
  }

  // Buttons 'submit'
  btns = document.getElementsByName("commit");
  for (i = 0; i < btns.length; i++)
  { btns[i].addEventListener("click" , function(e){ firstExec = true; } , false ) ;
  }

  // erste Suche nach schnelleren Fahrzeugen verzögern, damit FW.Net-Script Zeiten berechnen kann
  if (firstExec)
  { setTimeout(findFasterUnits, 1000);
  }
  else
  { findFasterUnits();
  }

{ applLog.refresh();
  log.addMsg(
  'Feuerwachen     = '+conf.stationList+
  '\nVerbandseinsatz = '+(isVBCall()?getVBCallOwner():false)+
  '\nVGSL            = '+isVGSL()+
  '\nVerbandsauftrag = '+mld.isVBOrder()+
  '\nStatistiken     = '+hasStatistics()+
  '\nmarkReq         = '+markReq+
  '\nfirstExec       = '+firstExec+
  '\nuserSel         = '+userSel+
  '\n>>AAO      = '+mld.write()+
  '\nVerletzte  : '+getInjured()+
  '\nzu alarm.  : '+data.firstAlarm.toString()+
  '\n2. Alarm   : '+data.secndAlarm.toString()+
  '\noptional   : '+data.optional.toString()+
  '\nfehlen     : '+data.missing.toString()+
  '\nnachgeford.: '+data.demand.toString()+
  '\nvor Ort    : '+data.arrived.toString()+
  '\nauf Anfahrt: '+data.onRoute.toString()+
  '\nwartend    : '+data.waiting.toString());
  log.display();
}
  firstExec = false;
  running = false;
}

function displayControlCenter()
{
  var evalH2s = xPath.getNodes(".//h2", 'content');
  for (var iH2 = 0; iH2 < evalH2s.snapshotLength; iH2++)
  { var nodeH2 = evalH2s.snapshotItem(iH2);
    var nodeA = xPath.getSingle("./a[1]", nodeH2);
    if (nodeA)
    { nodeH2.appendChild(new Element('br'));
      nodeSpan = new Element('span', {'class': 'fontSmall'});
      nodeH2.appendChild(nodeSpan);

      nodeSpan.appendChild(createText('('));

      nodeA = new Element('a', {'href' : nodeA.href + "/feuerwehrleute",
                                'title': 'Personal'});
      nodeSpan.appendChild(nodeA);
      nodeA.appendChild(createText('Pers'));

      nodeSpan.appendChild(createText(' / '));

      nodeA = new Element('a', {'href' : nodeA.href + "/feuerwehrautos",
                                'title': 'Fahrzeuge'});
      nodeSpan.appendChild(nodeA);
      nodeA.appendChild(createText('Fhz'));

      nodeSpan.appendChild(createText(')'));
    }
  }
}

function doVehicle(iNr)
{ var nodeCaption = $("caption");
  var nodeTD = new Element("td");
  nodeCaption.parentNode.parentNode.insertBefore(nodeTD,nodeCaption.parentNode.nextSibling);
  var nodeScript = new Element('script', {'type': 'text/javascript'});
  // multline-Anweisung (schließendes '\')
  nodeScript.innerHTML = "function ToggleFhzName()\n\
{\n\
  var I=$('caption');\n\
  var FN=I.value;\n\
  if (FN.substr(0,4).toUpperCase()=='XXX ')\n\
  { I.value = FN.substr(4,FN.length-4); }\n\
  else { I.value = 'XXX ' + FN; }\n\
}";
  nodeTD.appendChild(nodeScript);
  var nodeA = new Element('a', {'href': 'javascript:ToggleFhzName();'});
  nodeTD.appendChild(nodeA);
  nodeA.appendChild(createText('Fahrzeug in/außer Dienst stellen'));
}

//
function doVehicleAssignment(iNr, iType)
{ const txt = /Diese Feuerwache kann keine Fahrzeuge mehr aufnehmen|Zuwenig bzw. keine Stellplätze für Rettungswagen/;
  var evalSpans = xPath.getNodes("./form/table[@class='defaultTable']/tbody/tr/td/p/span", 'content');

  var cnt = xPath.getNodes("./form/table[@class='defaultTable']/tbody/tr/td/p", 'content').snapshotLength;
  for (var i = 0; i < evalSpans.snapshotLength; i++)
  { var nodeSpan = evalSpans.snapshotItem(i);
    if (txt.test(nodeSpan.innerHTML.trim()))
    { nodeSpan.parentNode.style.display = "none";
      cnt--;
    }
  }
  if (cnt == 0)
  { evalSpans.snapshotItem(0).parentNode.parentNode.appendChild(createText('keine freien Wachen verfügbar!'));
  }

  var nodeH1 = xPath.getSingle("./h1[1]", 'content');
  var fhz = conf.getFhz(nodeH1.innerHTML.trim());
  if (fhz)
  { var nodeA = new Element('a', {'href': fhz.getWiki(),
                                  'target': '_blank'});
    nodeA.appendChild(createText('Wiki'));
    var nodeSup = new Element('sup', {'class' : 'WikiLink',
                                      'title' : fhz.getWiki()});
    nodeSup.appendChild(nodeA);
    addEntityText(nodeH1, '&nbsp;');
    nodeH1.insertBefore(nodeSup, nodeH1.firstChild);
  }
}

function doVehicleList()
{
  function setFMS(nodeTB)
  { // Status als FMS Display anzeigen
    var column = -1;
    var evalTHs  = xPath.getNodes("./thead/tr/th", nodeTB);
    for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
    {
      if (evalTHs.snapshotItem(iTH).innerHTML == 'FMS')
      { column = iTH;
        break;
      }
    }

    if (column != -1) //
    { var evalTDs  = xPath.getNodes("./tbody/tr/td["+ ++column +"]", nodeTB);
      for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
      { var nodeTD = evalTDs.snapshotItem(iTD);
        nodeFMS = buildFMS(nodeTD, conf.getOptVal('dispFMSDisplayLinesFL'));
        removeChildren(nodeTD);
        nodeTD.appendChild(nodeFMS);
      }
    }
  }

  var nodeContent = $("content");
  var ArrTR=new Array;

  var evalH2s = xPath.getNodes("./h2[contains(text(), 'Feuerwache:')]", nodeContent);
  var cntStations = evalH2s.snapshotLength;
  for (iH2 = 0; iH2 < evalH2s.snapshotLength; iH2++)
  { var nodeH2 = evalH2s.snapshotItem(iH2);
    addEntityText(nodeH2, '&nbsp;');
    var href = xPath.getSingle("./a", nodeH2).getAttribute('href');
    var nodeA = new Element('a',
                            {'href' : href + '/feuerwehrleute',
                             'class': 'fontSmall',
                             'title': 'Personal'});
    nodeH2.appendChild(nodeA);
    nodeA.appendChild(createText('(Personal)'));
  }

  var H1 = document.getElementsByTagName("h1")[0];
  if (conf.getOptVal('showSummaryVehicleList'))
  { var H2 = new Element("h2");
    H2.appendChild(createText("Übersicht"));
    nodeContent.insertBefore(H2, H1.nextSibling);
  }

  var gefArr = []; //zweistufiges Array je Fahrzeug und Status
  var FZNamen = [];
  var gefFZ = [];
  var kmSumme = [];
  var AnzArr = []; //Array mit Summen je Status
  var ZusSumArr = []; //Array mit Zustandswerten je Fahrzeugart
  var gesamtZustand = 0;
  var gesamtkm = 0;
  var ArrTopKM = [];
  var Anz = 0;
  var AnzDispStatus = 0;
  var dispStat7 = false;

  if (conf.getOptVal('showSummaryVehicleList'))
  { // Summenarray initialisieren
    for (var FMSstatus in FMSStatusLst)
    { if (!FMSStatusLst[FMSstatus].dispInList) { continue; }
      AnzArr[FMSstatus] = 0;
      // Anzeige Status 7 nur, wenn auch RTW vorhanden
      if (conf.getOptVal('showStatus7OnlyIfExists'))
      { if (FMSStatusLst[FMSstatus].dispAlways)
        { AnzDispStatus++;
        }
      }
      else
      { AnzDispStatus++;
      }
    }
  }

  var evalTBs  = xPath.getNodes("./table[@class='defaultTable' and descendant::th/text()='Zustand']", 'content');
  for (var iTB = 0; iTB < evalTBs.snapshotLength; iTB++)
  { var evalTRs = xPath.getNodes("./tbody/tr", evalTBs.snapshotItem(iTB));

    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
    { var nodeTR = evalTRs.snapshotItem(iTR);
      var evalTDs = xPath.getNodes("./td", nodeTR);
      var FZName = evalTDs.snapshotItem(2).innerHTML;

      if (conf.getOptVal('showSummaryVehicleList'))
      { if (!gefFZ[FZName] )
        { gefFZ[FZName] = 1;

          gefArr[FZName]= new Array;
          for (var FMSstatus in FMSStatusLst)
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
      if (Zustand < (conf.getOptVal('limitDamage')?conf.getOptVal('limitDamageTo'):100))
      { ArrTR.push(nodeTR.cloneNode(true));
      }
      ZusSumArr[FZName] += Zustand;
      gesamtZustand += Zustand;
    }
  }

  if (conf.getOptVal('showSummaryVehicleList'))
  { // RTW's vorhanden, dann auch Status 7 anzeigen
    if (gefFZ['RTW'] > 0 && conf.getOptVal('showStatus7OnlyIfExists'))
    { if (gefFZ['RTW'] > 0 && conf.getOptVal('showStatus7OnlyIfExists'))
      { AnzDispStatus++;
      }
      dispStat7 = true;
    }

   // Tabelle mit der Fahrzeugübersicht
    var table = new tableCls({'id': 'Übersichtstabelle',
                              'class': 'ereglamTable'});
    // erste Zeile Überschrift
    var row = table.getNewHeadRow();
    // Fahrzeugtyp
    var cell = row.getNewCell({'rowspan': 2,
                               'title': 'Fahrzeugtyp',
                               'class': 'txtLeft'}, true);
    cell.addText('Fahrzeugtyp');
    // Anzahl
    cell = row.getNewCell({'rowspan': 2,
                           'class': 'txtCenter',
                           'title': 'Anzahl'}, true);
    cell.addText('Anz.');
    // FMS-Status
    cell = row.getNewCell({'colspan': AnzDispStatus,
                           'class': 'txtCenter',
                           'title': 'Status Funkmeldesystem'}, true);
    cell.addText('Status FMS');
    // Km-Summe
    if (conf.getOptVal('showTotalkm'))
    { cell = row.getNewCell({'rowspan': 2,
                             'class': 'txtCenter',
                             'title': 'Gesamtkilometer'}, true);
      cell.addEntityText('&Sigma; km');
    }
    // Km-Durchschnitt
    if (conf.getOptVal('showAvgkm'))
    { cell = row.getNewCell({'rowspan': 2,
                             'class': 'txtCenter',
                             'title': 'durchschn. Kilometer'}, true);
      cell.addEntityText('&Oslash;-km');
    }
    // Km-Summe
    if (conf.getOptVal('showAvgDamage'))
    { cell = row.getNewCell({'rowspan': 2,
                             'class': 'txtCenter',
                             'title': 'durchschn. Schaden'}, true);
      cell.addEntityText('&Oslash;-Zust.');
    }

    // zweite Zeile Überschrift
    row = table.getNewHeadRow();
    for (FMSStatus in FMSStatusLst)
    { if (!FMSStatusLst[FMSStatus].dispInList) { continue; }
      // Status 7 nur anzeigen, wenn Fahrzeuge vorhanden
      if (!FMSStatusLst[FMSStatus].dispAlways && !dispStat7)
      {
        continue;
      }

      cell = row.getNewCell({'style': 'width: 60px;'+((conf.getOptVal('showStatusLangtext'))?' line-height: 14px;':''),
                             'class': 'txtCenter'+((conf.getOptVal('showStatusLangtext'))?' fontSmall':''),
                             'title': FMSStatusLst[FMSStatus].text}, true);
      cell.addText(FMSStatus);
      cell.getStyle().backgroundColor = FMSStatusLst[FMSStatus].bcol;
      if (FMSStatusLst[FMSStatus].tcol != '')
      { cell.getStyle().color = FMSStatusLst[FMSStatus].tcol;
      }

      if (conf.getOptVal('showStatusLangtext'))
      { cell.addChild(new Element('br'));
        cell.addChild(createText(FMSStatusLst[FMSStatus].text));
      }
    }

    // Tabellenkörper
    var rowCnt = 0;
    for each (fhz in conf.fhzList.getSortedList())
    { var FZName = fhz.getName();
      if (!gefFZ[FZName]) { continue; }
      row = table.getNewBodyRow({'class':'row'+(rowCnt++)%2});
      // Fahrzeug
      cell = row.getNewCell({'class': 'txtLeft',
                             'title': 'Fahrzeug: ' + FZName}, true);
      var nodeA = new Element('a', {'href'  : fhz.getWiki(),
                                    'target': '_blank'});
      nodeA.appendChild(createText('W'));
      var nodeSpan = new Element('span', {'class': 'WikiLinkDark',
                                          'titel': fhz.getWiki()});
      nodeSpan.appendChild(nodeA);
      cell.addChild(nodeSpan);
      cell.addText(FZName);
      // Anzahl
      cell = row.getNewCell({'class': 'txtCenter',
                             'title': gefFZ[FZName]+' ' + FZName});
      cell.addText(gefFZ[FZName]);
      if (gefFZ[FZName] == 0)
      { cell.addClass('null'); }
      // Spalte pro Status
      for (var FMSStatus in FMSStatusLst)
      { if (!FMSStatusLst[FMSStatus].dispInList)
        { continue; }
        // Status 7 nur anzeigen, wenn Fahrzeuge vorhanden
        if (!FMSStatusLst[FMSStatus].dispAlways && !dispStat7)
        { continue;
        }

        cell = row.getNewCell({'class': 'txtCenter',
                               'title': gefArr[FZName][FMSStatus]+' '+FZName + ' ' + FMSStatusLst[FMSStatus].text});
        cell.addText(gefArr[FZName][FMSStatus]);
        if (gefArr[FZName][FMSStatus] == 0)
        { cell.addClass('null'); }
      }
      // Km-Summe
      if (conf.getOptVal('showTotalkm'))
      { cell = row.getNewCell({'class': 'txtRight',
                               'title': 'gefahrene Kilometer ' + FZName});
        cell.addText(kmSumme[FZName].format(0,'.',','));
      }
      // Km-Durchschnitt
      if (conf.getOptVal('showAvgkm'))
      { cell = row.getNewCell({'class': 'txtRight',
                               'title': 'durchschn. Kilometer ' + FZName});
        cell.addText(parseInt(kmSumme[FZName] / gefFZ[FZName]).format(0,'.',','));
      }
      // Km-Summe
      if (conf.getOptVal('showAvgDamage'))
      { cell = row.getNewCell({'class': 'txtRight',
                               'title': 'durchschn. Schaden ' + FZName});
        cell.addText((parseInt(10 * ZusSumArr[FZName] / gefFZ[FZName]) / 10).format(1,'.',',') + ' %');
      }
    }

    // Tabellenfuß
    row = table.getNewFootRow({'class': 'rowWhite'});
    // Summe
    cell = row.getNewCell({'class': 'txtLeft',
                           'title': 'Summe'}, true);
    cell.addText('SUMME');
    // Anzahl
    cell = row.getNewCell({'class': 'txtCenter',
                           'title': 'Anzahl Fahrzeuge'}, true);
    cell.addText(Anz);
    // Spalte pro Status
    for (var FMSStatus in FMSStatusLst)
    { if (!FMSStatusLst[FMSStatus].dispInList) { continue; }
      // Status 7 nur anzeigen, wenn Fahrzeuge vorhanden
      if (!FMSStatusLst[FMSStatus].dispAlways && !dispStat7)
      {
        continue;
      }

      cell = row.getNewCell({'class': 'txtCenter',
                             'title': 'Summe \'' + FMSStatusLst[FMSStatus].text + '\''}, true);
      cell.addText(AnzArr[FMSStatus]);
    }
    // Km-Summe
    if (conf.getOptVal('showTotalkm'))
    { cell = row.getNewCell({'class': 'txtRight',
                             'title': 'Summe Kilometer'}, true);
      cell.addEntityText(gesamtkm.format(0,'.',','));
    }
    // Km-Durchschnitt
    if (conf.getOptVal('showAvgkm'))
    { cell = row.getNewCell({'class': 'txtRight',
                             'title': 'durchschn. Kilometer der Summe'}, true);
      cell.addEntityText((gesamtkm / Anz).format(0,'.',','));
    }
    // Km-Summe
    if (conf.getOptVal('showAvgDamage'))
    { cell = row.getNewCell({'class': 'txtRight',
                             'title': 'durchschn. Schaden der Summe'}, true);
      var txtZusSum = (parseInt(10 * gesamtZustand / Anz) / 10).toString().replace('.', ',');
      if (txtZusSum.indexOf(',') == -1)
      { txtZusSum += ',0';}
      cell.addEntityText(txtZusSum + ' %');
    }

    // Tabelle in Seite einfügen
    nodeContent.insertBefore(table.getDOM(),H2.nextSibling);
  }

  if (conf.getOptVal('listHighLowKm'))
  {
    // Auflistung Fahrzeuge mit höchster Laufleistung
    nodeTBody = xPath.getSingle("./table[contains(./tbody/tr/td, 'Anzahl Fahrzeuge:')]/tbody", 'content');

    var row = new tableRowCls();
    var cell = row.getNewCell();
    cell.addText('Fahrzeuge mit der höchsten Laufleistung:');
    // Liste
    cell = row.getNewCell();
    ArrTopKM.sort(function s(a,b){return b[0]-a[0];});
    for (var i=0;i<((ArrTopKM.length < 5)?ArrTopKM.length:5);i++) //Anzahl Elemente in Liste beachten
    { cell.addEntityText(ArrTopKM[i][1]);
      cell.addText(" (" + ArrTopKM[i][0].format(0,'.',',') + " km)");
      cell.addChild(new Element('br'));
    }
    nodeTBody.appendChild(row.getDOM());

    // Auflistung Fahrzeuge mit niedrigster Laufleistung
    var row = new tableRowCls();
    var cell = row.getNewCell();
    cell.addText('Fahrzeuge mit der niedrigsten Laufleistung:');
    // Liste
    cell = row.getNewCell();
    ArrTopKM.sort(function s(a,b){return a[0]-b[0];});
    for (var i=0;i<((ArrTopKM.length < 5)?ArrTopKM.length:5);i++) //Anzahl Elemente in Liste beachten
    { cell.addEntityText(ArrTopKM[i][1]);
      cell.addText(" (" + ArrTopKM[i][0].format(0,'.',',') + " km)");
      cell.addChild(new Element('br'));
    }
    nodeTBody.appendChild(row.getDOM());

    var evalTR = xPath.getNodes("./tbody/tr", nodeTBody.parentNode);
    for (iTR = 0; iTR < evalTR.snapshotLength; iTR++)
    { evalTR.snapshotItem(iTR).className = 'row'+ iTR%2;
    }
  }

  if (conf.getOptVal('showDamageList') && cntStations >= 10) //vorher gibt es keine Beschädigungen
  {
    // Zustandstabelle in Dokument schreiben, aber erstmal verstecken,
    // Anzeigen erst durch Klick auf Toggle-Link
    var NewDiv = new Element("div");
    var nodeScript = new Element('script', {'type': 'text/javascript'});
    nodeScript.innerHTML = "function toggledisplay()\n\
  { var e = document.getElementById('DivZustandstabelle');\n\
    e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n\
  }\n";
    NewDiv.appendChild(nodeScript);
    var nodeA = new Element('a', {'href': 'javascript:toggledisplay();'});
    nodeA.appendChild(createText('beschädigte Fahrzeuge auflisten'));
    NewDiv.appendChild(nodeA);
    NewDiv.appendChild(new Element('br'));

    var hiddenDiv = new Element("div");
    hiddenDiv.id = "DivZustandstabelle";
    if (conf.getOptVal('showDamagedAtFirstCall'))
    { hiddenDiv.style.display = "block";
    }
    else
    { hiddenDiv.style.display = "none";
    }

    var H2 = new Element("h2");
    H2.appendChild(createText("beschädigte Fahrzeuge"));
    hiddenDiv.appendChild(H2);
    if (ArrTR.length > 0)
    {
      var hiddTB = new Element("table", {'class': "ereglamTable"});
      hiddTB.id="Zustandstabelle";
      hiddenDiv.appendChild(hiddTB);
      nodeTBody = new Element("thead");
      hiddTB.appendChild(nodeTBody);
      // Überschrift aus Tabelle zur ersten Feuerwache holen
      nodeTBody.appendChild(xPath.getSingle("./thead/tr[1]", evalTBs.snapshotItem(0)).cloneNode(true));

      nodeTBody = new Element("tbody");
      hiddTB.appendChild(nodeTBody);

      for each (nodeTR in ArrTR)
      { nodeTBody.appendChild(nodeTR);
      }

      // Tabelle sortieren
      // function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link)
      SortTabelle(hiddTB, 6, true, true, true);
      if (conf.getOptVal('dispStatusAsFMSDisplayFL'))
      { setFMS(hiddTB);
      }
    }
    else
    {
      if (conf.getOptVal('limitDamage'))
      {
        var nodeInfo = createText('aktuell keine Fahrzeuge mit einem Zustand weniger als ' + conf.getOptVal('limitDamageTo') + '%.');
      }
      else
      {
        var nodeInfo = createText('aktuell keine Fahrzeuge beschädigt.');
      }
      var nodeDiv = new Element('div', { 'class' : 'form_info'});
      nodeDiv.appendChild(nodeInfo);
      hiddenDiv.appendChild(nodeDiv);
    }
    NewDiv.appendChild(hiddenDiv);

    if (conf.getOptVal('showSummaryVehicleList'))
    { nodeTable = $("Übersichtstabelle");
      nodeTable.parentNode.insertBefore(NewDiv, nodeTable.nextSibling);
    }
    else
    { nodeContent.insertBefore(NewDiv, H1.nextSibling);
    }
  }

  if (conf.getOptVal('dispStatusAsFMSDisplayFL'))
  { var evalTBs  = xPath.getNodes("./table[@class='defaultTable' and descendant::th/text()='Fahrzeit']", 'content');
    if (evalTBs.snapshotLength == 1)
    { setFMS(evalTBs.snapshotItem(0));
    }

    var evalTBs  = xPath.getNodes("./table[@class='defaultTable' and descendant::th/text()='Zustand']", 'content');
    for (iTB = 0; iTB < evalTBs.snapshotLength; iTB++)
    { setFMS(evalTBs.snapshotItem(iTB));
    }
  }
}

function doCrewLists()
{ function getTrainingTable(iArr)
  { // Ausbildungsübersicht
    var table = new tableCls({'class': 'ereglamTable',
                              'name' : 'summary',
                              'style': 'width: 100%'});
    // Tabellenkopf
    var row = table.getNewHeadRow();
    var cell = row.getNewCell({'style': 'width: 25%; text-align: left'},true);
    cell.addText('Ausbildung');
    cell = row.getNewCell({'style': 'width: 15%; text-align: center'},true);
    cell.addText('Summe');
    for (pers in personalStatusLst)
    { cell = row.getNewCell({'style': 'width: 15%; text-align: center'},true);
      cell.getStyle().color = (conf.getOptVal('useStatusColourCode'))?personalStatusLst[pers].tcol:'';
      cell.addText(personalStatusLst[pers].text);
    }

    // Tabellenfuß
    row = table.getNewFootRow({'class': 'rowWhite'});
    cell = row.getNewCell({'style': 'text-align: left;'});
    cell.addText('gesamt');
    cell = row.getNewCell({'style': 'text-align: right;'});
    cell.addText(iArr['total']['total']);
    for (pers in personalStatusLst)
    { cell = row.getNewCell({'style': 'text-align: right'});
      cell.getStyle().color = (conf.getOptVal('useStatusColourCode'))?personalStatusLst[pers].tcol:'';
      cell.addText(iArr['total'][pers]);
    }

    // Tabellenkörper
    var rowCnt = 0;
    for (train in trainingLst)
    { if (iArr[train]['total'] > 0)
      { row = table.getNewBodyRow({'class': 'row'+(rowCnt++)%2});
        table.addBodyRow(row);
        cell = row.getNewCell({'style': 'text-align: left;'});
        cell.getStyle().color = (conf.getOptVal('useTrainingColourCode'))?trainingLst[train].tcol[conf.getLayout()]:'';
        cell.addText(train);
        cell = row.getNewCell({'style': 'text-align: right;'});
        cell.addText(iArr[train]['total']);
        for (pers in personalStatusLst)
        { cell = row.getNewCell({'style': 'text-align: right;'});
          cell.getStyle().color = (conf.getOptVal('useStatusColourCode'))?personalStatusLst[pers].tcol:'';
          cell.addText(iArr[train][pers]);
        }
      }
    }
    return table.getDOM();
  }

  function initArray()
  { //zweidimensionale Sammlung
    var AnzArr = {};
    // Initialisierung
    AnzArr['total'] = {};
    AnzArr['total']['total'] = 0;
    for (pers in personalStatusLst)
    { AnzArr['total'][pers] = 0;
    }
    for (train in trainingLst)
    { AnzArr[train] = {};
      AnzArr[train]['total'] = 0;
      for (pers in personalStatusLst)
      { AnzArr[train][pers] = 0;
      }
    }

    return AnzArr;
  }

  function displayCrew(iTable)
  { var AnzArr = initArray();
    var evalTRs = xPath.getNodes("./tbody/tr", iTable);
    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++)
    { var evalTDs = xPath.getNodes("./td", evalTRs.snapshotItem(iTR));

      var nodeTD = evalTDs.snapshotItem(5);
      var Stat = nodeTD.innerHTML.trim();
      var nodeA = xPath.getSingle('./a[1]', nodeTD);
      if (nodeA)
      { Stat = nodeA.innerHTML.trim();
      }
 // Personalstatistik:
      var tcol = '';
      // Status kennzeichnen und zählen
      switch(Stat)
      { case  "Beim Einsatz" :
          tcol = personalStatusLst[Stat].tcol;
          break;
        case  "Frei - nicht im Dienst":
          tcol = personalStatusLst[Stat].tcol;
          break;
        case  "Einsatzbereit":
          tcol = personalStatusLst[Stat].tcol;
          break;
        case  "In der Feuerwehrschule":
          tcol = personalStatusLst[Stat].tcol;
          break;
      }
      if (conf.getOptVal('useStatusColourCode') && (tcol != ''))
      { nodeTD.style.color = tcol;
      }

      // Motivation kennzeichnen:
      if (conf.getOptVal('useMotivationColourCode'))
      { nodeTD = evalTDs.snapshotItem(1);
        var mot = parseInt(nodeTD.innerHTML.trim());
        for (var motivation in motivationLst)
        { if (mot >= motivation)
          { nodeTD.style.color = motivationLst[motivation].tcol;
            break;
          }
        }
      }

      // Fähigkeit kennzeichnen:
      if (conf.getOptVal('useAbilityColourCode'))
      { nodeTD = evalTDs.snapshotItem(2);
        var abl = parseInt(nodeTD.innerHTML);
        for (var ability in abilityLst)
        { if (abl >= ability)
          { nodeTD.style.color = abilityLst[ability].tcol;
            break;
          }
        }
      }

      // Ausbildungsstand
      AnzArr['total']['total']++;
      AnzArr['total'][Stat]++;
      nodeTD = evalTDs.snapshotItem(4);
      var trainArr = nodeTD.innerHTML.split(',');
      var nodeTDCopy = nodeTD.cloneNode(false); // ohne Kinder

      var cnt = 0;
      if (!nodeTD.innerHTML.trim())
      { AnzArr['ohne']['total']++;
        AnzArr['ohne'][Stat]++;
      }
      else
      { for each (train in trainArr)
        { train = train.trim();

          AnzArr[train]['total']++;
          AnzArr[train][Stat]++;
          var colour;
          var training = trainingLst[train];
          if (training)
          { colour = training.tcol[conf.getLayout()];
          }
          else
          { colour = trainingLst['ohne'].tcol[conf.getLayout()];
          }
          if (colour && conf.getOptVal('useTrainingColourCode'))
          { var nodeSpan = new Element('span', {'style': 'color: '+colour});
            nodeSpan.appendChild(createText(train));
            if (cnt > 0)
            { nodeTDCopy.appendChild(createText(', '));
            }
            nodeTDCopy.appendChild(nodeSpan);
            cnt++;
          }
        }
      }
      if (cnt > 0)
      { nodeTD.parentNode.replaceChild(nodeTDCopy, nodeTD);
      }


      // Schicht kennzeichnen:
      nodeTD = evalTDs.snapshotItem(6);
      if (conf.getOptVal('useShiftColourCode') && nodeTD)
      { nodeTD.style.color = shiftLst[parseInt(nodeTD.innerHTML)].tcol;
      }

    }
    return AnzArr;
  }

  var totalsArr = initArray();
  var evalTables = xPath.getNodes("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Ausbildung']", 'content');
  for (var iTable = 0; iTable < evalTables.snapshotLength; iTable++)
  { var nodeTable = evalTables.snapshotItem(iTable);
    var nodeH2 = xPath.getSingle("preceding-sibling::h2[1]", nodeTable);

    MachSortierbar(nodeTable);
    if (conf.getOptVal('defaultTabSort') != "none")
    { SortiereNachSpalte(nodeTable, conf.getOptVal('defaultTabSort'))
    }
    var nodeSpan = new Element('span', {'class': 'fontSmall'});
    nodeSpan.appendChild(createText('Zum Sortieren Spaltenüberschrift anklicken'));
    nodeTable.parentNode.insertBefore(nodeSpan, nodeTable);

    var trainArr = displayCrew(nodeTable);
    nodeTable.parentNode.insertBefore(getTrainingTable(trainArr), nodeSpan);
    for (train in trainArr)
    { for (pers in trainArr[train])
      { totalsArr[train][pers] += trainArr[train][pers];
      }
    }

    var nodeA = xPath.getSingle("a[1]", nodeH2);
    if (nodeA)
    { addEntityText(nodeH2, '&nbsp;');
      nodeA = new Element('a', {'href' : nodeA.href + "/feuerwehrautos",
                                'class': 'fontSmall'});
      nodeH2.appendChild(nodeA);
      nodeA.appendChild(createText('(Fahrzeuge)'));
    }
  }
  if (evalTables.snapshotLength > 1)
  { var nodeH1 = xPath.getSingle("h1[1]", 'content');
    nodeH1.parentNode.insertBefore(getTrainingTable(totalsArr), nodeH1.nextSibling);
  }
}

function doJaunt(iNum)
{ var nodeTBody = xPath.getSingle("./form/table[@class='defaultTable']/tbody[1]", 'content');;
  var evalTDs = xPath.getNodes("./tr/td[2]", nodeTBody);
  var motSum = 0;
  for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++)
  { nodeTD = evalTDs.snapshotItem(iTD);
    var mot = parseInt(nodeTD.innerHTML.trim());
    motSum += mot;
    if (conf.getOptVal('useMotivationColourCode'))
    { for (var motivation in motivationLst)
      { if (mot >= motivation)
        { nodeTD.style.color = motivationLst[motivation].tcol;
          break;
        }
      }
    }
  }
  var nodeTFoot = new Element('tfoot', {'class': 'rowWhite', 'style': 'border-top: 1px solid'});
  var row = new tableRowCls();
  var cell = row.getNewCell({}, true);
  cell.addText('Durchschnitt');
  cell = row.getNewCell({}, true);
  var avg = motSum / evalTDs.snapshotLength;
  cell.addText(avg.format(2, '.', ',') + '%');
  if (conf.getOptVal('useMotivationColourCode'))
  { for (var motivation in motivationLst)
    { if (avg >= motivation)
      { cell.getStyle().color = motivationLst[motivation].tcol;
        break;
      }
    }
  }
  nodeTFoot.appendChild(row.getDOM());
  nodeTBody.parentNode.insertBefore(nodeTFoot, nodeTBody);
}

function SortiereNachSpalte(Tab,SortBy)
{
  var Spalte = -1;
  var c=0;
  var evalTHs = xPath.getNodes('./thead/tr/th', Tab);
  for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
  { if (evalTHs.snapshotItem(iTH).innerHTML == SortBy)
    { Spalte=c;
    }
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
{ var evalTHs = xPath.getNodes('./thead/tr/th', myTB);
  for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++)
  { evalTHs.snapshotItem(iTH).addEventListener ( "click" , function(e)
                                    { SortiereNachSpalteClick(e)
                                    }
                                  , true ) ;
  }
}

function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link)
{
  var nodeTBody = myTB.getElementsByTagName("tbody")[0];
  if (!nodeTBody) return;
  var ArrTR = new Array();
  for each (var nodeTR in nodeTBody.getElementsByTagName("tr"))
  { ArrTR.push(nodeTR);
  }
  if (ArrTR.length==0) return;

  ArrTR.sort(function(x,y){return TableSort(x,y,Spalte,Richtung,Numerisch,Link);});

  for (var i=0;i<ArrTR.length;i++)
  { try
    { if (ArrTR[i].style.display == 'none')
      { continue; }
      ArrTR[i].className = 'row'+ i%2;
      nodeTBody.appendChild(ArrTR[i]);
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

// erstellt die Konfigurationsseite
function displayConfig()
{
  // Einstellungen speichern
  function saveConfig()
  { var isAllValid = true;
    var nodeInfo = $('ereglamsInfo');
    var msgTitle = '';
    var msgClass = '';

    errLog.refresh();
    removeChildren(nodeInfo);

    for each (opt in conf.optList.getList())
    { var nodeInput;
      var isValid = true;
      var nodeSpan = $('config.'+opt.getName());
      nodeSpan.style.backgroundColor = '';
      switch(opt.getType())
      { case OptType.bool:
          nodeInput = $('chk_' + opt.getName());
          opt.setValue(nodeInput.checked);
          break;
        case OptType.radio :
          for each (val in opt.getList())
          { nodeInput = $('rad_' + opt.getName() + '.' + val.getKey());
            if (nodeInput.checked)
            { opt.setValue(nodeInput.value);
            }
          }
          break;
        case OptType.colList:
        case OptType.list:
          var nodeSel = $('sel_' + opt.getName());
          opt.setValue(nodeSel.options[nodeSel.selectedIndex].value);
          break;
        case OptType.integer :
          nodeInput = $('val_' + opt.getName());
          if (opt.hasChkFunc())
          { try
            { isValid = opt.execChkFunc(nodeInput.value);
            }
            catch(e)
            { isValid = false;
              errLog.addMsg('opt.hasChkFunc() ' + e);
            }
          }
          else
          { isValid = true;
          }

          if (isValid)
          { opt.setValue(nodeInput.value);
          }
          else
          { nodeInput.parentNode.style.backgroundColor = 'red';
            isAllValid = false;
          }
          break;
        case OptType.string :
          nodeInput = $('str_' + opt.getName());
          if (opt.hasChkFunc())
          { try
            { isValid = opt.execChkFunc(nodeInput.value);
            }
            catch(e)
            { isValid = false;
              errLog.addMsg('opt.hasChkFunc() ' + e);
            }
          }
          else
          { isValid = true;
          }

          if (isValid)
          { opt.setValue(nodeInput.value);
          }
          else
          { nodeSpan.style.backgroundColor = 'red';
            isAllValid = false;
          }
          break;
        default:
      }
    }

    if (isAllValid)
    { if (conf.optList.save())
      { msgTitle = 'Einstellungen gespeichert.';
        msgClass = 'form_success';
      }
      else
      { msgTitle = 'Es ist ein Fehler beim Speichern aufgetreten.';
        msgClass = 'form_error';
      }
    }
    else
    { msgTitle = 'Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.';
      msgClass = 'form_error';
    }

    nodeInfo.setAttribute('class', msgClass);
    nodeInfo.appendChild(createText(msgTitle));
    for each (msg in errLog.getMsgs())
    { nodeInfo.appendChild(new Element('br'));
      nodeInfo.appendChild(createText(msg));
    }
    errLog.refresh();
  }

  // Zeile zu einer Einstellung anlegen
  function createConfigLine(iOpt)
  {
    var nodeSpan = new Element('span');
    nodeSpan.id = 'config.'+iOpt.getName();
    // Änderungsanzeiger
    addEntityText(nodeSpan, (iOpt.isModified()?'*':'&nbsp;')+'&nbsp;');

    switch (iOpt.getType())
    { case OptType.bool :
        // Checkbox
        var nodeInput = new Element('input',
                                    { 'name' : iOpt.getName(),
                                      'id'   : 'chk_' + iOpt.getName(),
                                      'type' : 'checkbox'});
        nodeInput.checked = iOpt.getValue();
        nodeSpan.appendChild(nodeInput);

        // Text
        var nodeLabel = new Element('label', {'for': 'chk_' + iOpt.getName()});
        nodeLabel.appendChild(createText(' ' + iOpt.getText()));
        nodeSpan.appendChild(nodeLabel);
        break;
      case OptType.radio :
        // Text
        nodeSpan.appendChild(createText(iOpt.getText() + ': '));
        for each(val in iOpt.getList())
        { var nodeInput = new Element('input',
                                      { 'name'  : iOpt.getName(),
                                        'id'    : 'rad_' + iOpt.getName() + '.' + val.getKey(),
                                        'type'  : 'radio',
                                        'value' : val.getKey()});
          if (iOpt.getValue() == val.getKey())
          { nodeInput.defaultChecked = true;
          }
          nodeSpan.appendChild(nodeInput);

          // Text
          var nodeLabel = new Element('label', {'for': 'rad_' + iOpt.getName() + '.' + val.getKey()});
          nodeLabel.appendChild(createText(' ' + val.getVal() + ' '));
          nodeSpan.appendChild(nodeLabel);
          addEntityText(nodeSpan, '&nbsp;&nbsp;');
        }
        break;
      case OptType.colList:
        // Text
        nodeSpan.appendChild(createText(iOpt.getText() + ': '));
        var nodeSel = new Element('select', { 'name'  : iOpt.getName(),
                                              'id'    : 'sel_' + iOpt.getName()});
        for each(val in iOpt.getList())
        { var nodeOpt = new Option();
          nodeOpt.name  =
          nodeOpt.value = val.getKey();
          nodeOpt.style.backgroundColor = val.getKey();
          nodeOpt.appendChild(createText(val.getVal()));
          if (iOpt.getValue() == val.getKey())
          { nodeOpt.selected = true;
            nodeSel.style.backgroundColor = val.getKey();
          }
          nodeSel.add(nodeOpt, null);
        }
        nodeSpan.appendChild(nodeSel);
        break;
      case OptType.list:
        // Text
        nodeSpan.appendChild(createText(iOpt.getText() + ': '));
        var nodeSel = new Element('select', { 'name'  : iOpt.getName(),
                                              'id'    : 'sel_' + iOpt.getName()});
        for each(val in iOpt.getList())
        {
          var nodeOpt = new Option();
          nodeOpt.name  =
          nodeOpt.value = val.getKey();
          nodeOpt.appendChild(createText(val.getVal()));
          if (iOpt.getValue() == val.getKey())
          { nodeOpt.selected = true;
          }
          nodeSel.add(nodeOpt, null);
        }
        nodeSpan.appendChild(nodeSel);
        break;
      case OptType.integer :
        // Text
        var nodeLabel = new Element('label', {'for': 'val_' + iOpt.getName()});
        nodeLabel.appendChild(createText(iOpt.getText()));
        nodeSpan.appendChild(nodeLabel);
        addEntityText(nodeSpan, '&nbsp;');

        // Integerwert
        var nodeInput = new Element('input',
                                    { 'name'     : iOpt.getName(),
                                      'id'       : 'val_' + iOpt.getName(),
                                      'type'     : 'text',
                                      'style'    : 'text-align: right;',
                                      'size'     : iOpt.getLen(),
                                      'length'   : iOpt.getLen(),
                                      'maxLength': iOpt.getLen()});
        nodeInput.defaultValue = iOpt.getValue();
        nodeSpan.appendChild(nodeInput);
        break;
      case OptType.string :
        // Text
        var nodeLabel = new Element('label', {'for': 'str_' + iOpt.getName()});
        nodeLabel.appendChild(createText(iOpt.getText()));
        nodeSpan.appendChild(nodeLabel);
        addEntityText(nodeSpan, '&nbsp;');

        // Zeichenkette
        var nodeInput = new Element('input',
                                    { 'name'     : iOpt.getName(),
                                      'id'       : 'str_' + iOpt.getName(),
                                      'type'     : 'text',
                                      'style'    : 'text-align: left;',
                                      'size'     : iOpt.getLen(),
                                      'length'   : iOpt.getLen(),
                                      'maxLength': iOpt.getLen()});
        nodeInput.defaultValue = iOpt.getValue();
        nodeSpan.appendChild(nodeInput);
        break;
      default:
        nodeSpan.appendChild(createText("Typ '" + iOpt.getType() + "' für Option '" + iOpt.getName() + "' nicht unterstützt"));
    }

    return nodeSpan;
  }

  var page = {};
  page.tables = [];

  // Überschrift
  page.heading =
  page.title   = 'Einstellungen';
  page.text = new Element('p');
  page.text.appendChild(createText("\
Hier besteht die Möglichkeit, Optionen zu verschiedenen Seiten zu pflegen. \n\
Es werden nur die Werte gespeichert, die von der Vorgabe im Script abweichen."));

  for each(optGrp in conf.optGrpList.getList())
  { var tableSet = {};
    tableSet.rows = [];
    tableSet.caption = optGrp.getText();

    var rowCnt = 0;
    for each(opt in optGrp.getOptList())
    { row = new tableRowCls({'class': 'row'+(rowCnt++)%2});
      tableSet.rows.push(row);
      cell = row.getNewCell();
      cell.addChild(createConfigLine(opt));
    }
    page.tables.push(tableSet);
  }

  // Speicherroutine
  page.saveFunc = saveConfig;

  running = true;
  displayConfPage(page, menus);
  running = false;
}

function displayAAOConfig()
{
  function saveEStichworte()
  {
    var isAllValid = true;
    var nodeInfo = $('ereglamsInfo');
    var msgTitle = '';
    var msgClass = '';

    errLog.refresh();
    removeChildren(nodeInfo);

    // zunächst die Eingaben prüfen
    for each (mld in conf.mldList.getList())
    { var isValid = true;
      var nodeChk = $('unw.' + mld.getName());
      mld.setStorm(nodeChk.checked);

      // Alarmierungsstichwort auswerten
      var nodeSel = $('sel.' + mld.getName());
      nodeSel.parentNode.style.backgroundColor = '';
      var eReq = nodeSel.options[nodeSel.selectedIndex].value.trim();
      if (eReq == STW_UNDEF)
      { isValid = false;
        nodeSel.parentNode.style.backgroundColor = 'red';
        errLog.addMsg(mld.getName()+': "+STW_UNDEF+" ist nicht als gültiges Stichwort vorgesehen.');
      }

      // zusätzliche Fahrzeuge
      var nodeInputAdd = $('add.' + mld.getName());
      nodeInputAdd.parentNode.style.backgroundColor = '';
      var eAdd = nodeInputAdd.value.trim();
      if (eAdd.indexOf('|') != -1)
      { isValid = false;
        nodeInputAdd.parentNode.style.backgroundColor = 'red';
        errLog.addMsg(mld.getName()+': "|" ist nicht hier nicht zulässig.');
      }

      // optionale Fahrzeuge
      var nodeInputOpt = $('opt.' + mld.getName());
      nodeInputOpt.parentNode.style.backgroundColor = '';
      var eOpt = nodeInputOpt.value.trim();
      if (eOpt.indexOf('|') != -1)
      { isValid = false;
        nodeInputOpt.parentNode.style.backgroundColor = 'red';
        errLog.addMsg(mld.getName()+': "|" ist nicht hier nicht zulässig.');
      }

      // Verbandsauftrag
      var nodeInputOpt = $('vbOrd.' + mld.getName());
      mld.setVBOrder(nodeInputOpt.checked);

      // Eingabe zusammensetzen
      var eCls = eReq + ((eAdd != '')?'+'+eAdd:'') + ((eOpt != '')?'|'+eOpt:'');
      var aao = {};
      try
      { aao = new aaoCls(eCls, conf);
      }
      catch(e)
      { isValid = false;
        nodeSel.parentNode.style.backgroundColor = 'red';
        nodeInputAdd.parentNode.style.backgroundColor = 'red';
        nodeInputOpt.parentNode.style.backgroundColor = 'red';
        errLog.addMsg(mld.getName()+': "'+eCls+'" ist kein gültiger Alarmvorschlag: '+e);
        isAllValid = false;
      }

      if (isValid)
      { mld.setAao(aao);
      }
      else
      { isAllValid = false;
      }
    }

    if (isAllValid)
    { if (conf.mldList.save())
      { msgTitle = 'Stichwortzuordnungen gespeichert.';
        msgClass = 'form_success';
      }
      else
      { msgTitle = 'Es ist ein Fehler beim Speichern aufgetreten.';
        msgClass = 'form_error';
      }
    }
    else
    { msgTitle = 'Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.';
      msgClass = 'form_error';
    }

    nodeInfo.setAttribute('class', msgClass);
    nodeInfo.appendChild(createText(msgTitle));
    for each (msg in errLog.getMsgs())
    { nodeInfo.appendChild(new Element('br'));
      nodeInfo.appendChild(createText(msg));
    }
    errLog.refresh();
  }

  function getNodeResetMld(mld)
  {
    var rstNode = new Element('input',
                              {'type' : 'reset',
                              'class': 'button',
                              'name' : mld.getName(),
                              'title': 'Scriptvorgabe wieder herstellen',
                              'value': '*',
                              'onclick': 'javascript:\
$("sel.'+mld.getName()+'").value="'+mld.getAaoDef().getStw().getName()+'";\
$("add.'+mld.getName()+'").value="'+mld.getAaoDef().getAddStr(false)+'";\
$("opt.'+mld.getName()+'").value="'+mld.getAaoDef().getOptStr(false)+'";'});
    return rstNode;
  }

  var page = {};
  page.tables = [];

 // Überschrift
  page.heading =
  page.title   = 'Einsatzzuordnung';
  page.text = new Element('p');
  page.text.appendChild(createText("\
Hier besteht die Möglichkeit, die Zuordnung von Einsatzmeldung zu Alarmierungsstichwort und zusätzlichen, sowie optionalen Fahrzeugen zu pflegen. \n\
Zur Eingabe der zusätzlichen/optionalen Fahrzeuge dürfen als Trennzeichen nur ',' und '/' (für Alternativen) verwendet werden: z.B. 'LF,LF/HLFS/TS'. \
Die gültigen Fahrzeuggruppen seht Ihr unter "));
  nodeA = new Element('a', {'href'  : '/ereglamsAAO/Fahrzeuge'});
  nodeA.appendChild(createText('Fahrzeuge'));
  page.text.appendChild(nodeA);
  page.text.appendChild(createText('.'));

  var tableSet = {};
  tableSet.rows = [];
  var row = new tableRowCls();
  tableSet.headRow = row;

  // Wiki-Link
  var cell = row.getNewCell({'class': 'fontSmall',
                             'style': 'width: 25px;',
                             'title': 'Wiki-Link'}, true);
  cell.addText('W');

  // Einsatzmeldung
  cell = row.getNewCell({'style': 'width: 240px;',
                         'title': 'Einsatzmeldung'}, true);
  cell.addText('Einsatzmeldung');

  // Wassereinsatz
  cell = row.getNewCell({'class': 'fontSmall',
                         'style': 'width: 30px;',
                         'title': 'Wassereinsatz'}, true);
  cell.addText('Was.');

  // Unwettereinsatz
  cell = row.getNewCell({'class': 'fontSmall',
                         'style': 'width: 30px;',
                         'title': 'Unwettereinsatz'}, true);
  cell.addText('Unw.');

  // Alarmierungsstichwort
  cell = row.getNewCell({'style': 'width: 200px;',
                         'title': 'Alarmierungsstichwort'}, true);
  cell.addText('Stichwort');

  // zusätzl. Fahrzeuge
  cell = row.getNewCell({'style': 'width: 130px;',
                         'title': 'zusätzliche Fahrzeuge'}, true);
  cell.addText('zus. Fahrz.');

  // optionale Fahrzuege
  cell = row.getNewCell({'style': 'width: 130px;',
                         'title': 'optionale Fahrzeuge'}, true);
  cell.addText('opt. Fahrz.');

  // modifiziertes Element
  cell = row.getNewCell({'class': 'fontSmall',
                         'title': 'modifiziert'}, true);
  cell.addText('mod.');

  // Verbandseinsatz
  cell = row.getNewCell({'class': 'fontSmall',
                           'title': 'Verbandseinsatz'}, true);
  cell.addText('VB.');

  var rowCnt = 0;
  for each (mld in conf.mldList.getSortedList(false))
  { row = new tableRowCls({'class': 'row'+(rowCnt++)%2});
    tableSet.rows.push(row);

    // Wiki-Link
    cell = row.getNewCell({}, true);
    var nodeA = new Element('a', {'href'  : mld.getWiki(),
                                  'target': '_blank'});
    nodeA.appendChild(createText('W'));
    var nodeSpan = new Element('span', {'class' : 'WikiLinkDark',
                                        'title' : mld.getWiki()});
    nodeSpan.appendChild(nodeA);
    cell.addChild(nodeSpan);

    // Einsatzmeldung
    cell = row.getNewCell({'style': 'text-align: left;'}, true);
    cell.addText(mld.getName());

    // Wasser
    cell = row.getNewCell({'class' : 'fontSmall'});
    var nodeChkbox = new Element('input', {'type' : 'checkbox'});
    nodeChkbox.checked = mld.isOnWater();
    nodeChkbox.disabled = true;
    nodeChkbox.id = 'was.' + mld.getName();
    cell.addChild(nodeChkbox);
    if (mld.isModOnWater())
    { cell.addText('*');
    }

    // Unwetter
    cell = row.getNewCell({'class' : 'fontSmall'});
    var nodeChkbox = new Element('input', {'type' : 'checkbox'});
    nodeChkbox.checked = mld.isStorm();
    nodeChkbox.disabled = true;
    nodeChkbox.id = 'unw.' + mld.getName();
    cell.addChild(nodeChkbox);
    if (mld.isModStorm())
    { cell.addText('*');
    }

    // Alarmierungstichwort
    cell = row.getNewCell();
    var nodeSel = new Element('select',
                              {'class': 'fontSmall',
                               'style': 'width: 200px;',
                               'id'   : 'sel.' + mld.getName(),
                               'title': 'Tooltipp in Liste zeigt Fahrzeuge'});
    for each (stw in conf.stwList.getSortedList(true))
    { nodeOption = new Option();
      nodeOption.value = stw.getName();
      nodeOption.text  = stw.getName() + ': ' + stw.getText();
      nodeOption.title = stw.getFhze().toString();
    // noch den aktuellen Wert für die Selektionsauswahl einstellen
      if (stw.getName() == mld.getAao().getStw().getName())
      { nodeOption.selected = true;
      }
      nodeSel.add(nodeOption, null); // hinten anhängen
    }
    cell.addChild(nodeSel);

    // Inputfelder
    var nodeInput = new Element('input',
                                {'style': 'width: 120px;',
                                 'class': 'fontSmall',
                                 'type' : 'text'});

    // zusätzl. Fahrzeuge
    cell = row.getNewCell({'class': 'fontSmall'});
    nodeInput.id = 'add.' + mld.getName();
    nodeInput.defaultValue =
    nodeInput.value        = mld.getAao().getAddStr(false);
    cell.addChild(nodeInput);

    // optionale Fahrzeuge
    cell = row.getNewCell({'class': 'fontSmall'});
    nodeInput = nodeInput.cloneNode(true);
    nodeInput.id = 'opt.' + mld.getName();
    nodeInput.defaultValue =
    nodeInput.value        = mld.getAao().getOptStr(false);
    cell.addChild(nodeInput);

    // Reset-Funktion
    cell = row.getNewCell({'class': 'fontSmall'});
    if (mld.isModAao())
    { cell.addChild(getNodeResetMld(mld));
    }

    // Verbandseinsatz
    cell = row.getNewCell({'class' : 'fontSmall'});
    var nodeChkbox = new Element('input', {'type' : 'checkbox'});
    nodeChkbox.checked = mld.isVBOrder();
    nodeChkbox.id = 'vbOrd.' + mld.getName();
    cell.addChild(nodeChkbox);
  }
  page.tables.push(tableSet);

  // Speicherroutine
  page.saveFunc = saveEStichworte;

  running = true;
  displayConfPage(page, menus);
  running = false;
}

function displayAAOKeyConfig()
{
  // Fahrzeugzuordnungen zu Alarmierungsstichworten speichern
  function saveAaoKeys()
  { var isAllValid = true;
    var nodeInfo = $('ereglamsInfo');
    var fCol = {};
    var msgTitle = '';
    var msgClass = '';

    errLog.refresh();
    removeChildren(nodeInfo);

    for each (stw in conf.stwList.getList(true))
    { var isValid = true;
      // Text zum Alarmierungsstichwort
      var nodeInput = $('etx.' + stw.getName());
      nodeInput.parentNode.style.backgroundColor = '';
      var eTxt = nodeInput.value;
      // nach verbotenen Zeichen suchen
      if (/[<>;=]/.test(eTxt))
      { isValid = false;
        nodeInput.parentNode.style.backgroundColor = 'red';
        isAllValid = false;
      }

      if (isValid)
      { // Alarmierungsstichwort auswerten
        nodeInput = $('ecl.' + stw.getName());
        nodeInput.parentNode.style.backgroundColor = '';
        try
        { fCol = new fhzColCls(nodeInput.value.trim(), conf);
        }
        catch(e)
        { isValid = false;
          nodeInput.parentNode.style.backgroundColor = 'red';
          errLog.addMsg(stw.getName()+': "'+nodeInput.value.trim()+'" ist kein gültiger Alarmvorschlag: '+e);
          isAllValid = false;
        }
      }

      if (isValid)
      { stw.setText(eTxt);
        stw.setFhze(nodeInput.value.trim());
      }
    }

    if (isAllValid)
    { if (conf.stwList.save())
      { msgTitle = 'Fahrzeugzuordnungen gespeichert.';
        msgClass = 'form_success';
      }
      else
      { msgTitle = 'Es ist ein Fehler beim Speichern aufgetreten.';
        msgClass = 'form_error';
      }
    }
    else
    { msgTitle = 'Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.';
      msgClass = 'form_error';
    }

    nodeInfo.setAttribute('class', msgClass);
    nodeInfo.appendChild(createText(msgTitle));
    for each (msg in errLog.getMsgs())
    { nodeInfo.appendChild(new Element('br'));
      nodeInfo.appendChild(createText(msg));
    }
    errLog.refresh();
  }

  function nodeResetAaoKey(stw, isText)
  { var rstNode = new Element('input',
                              {'type' : 'reset',
                               'class': 'button',
                               'name' : stw.getName(),
                               'title': 'Scriptvorgabe wieder herstellen',
                               'value': '*',
                               'onclick': 'javascript:'+(isText?
'$("etx.'+stw.getName()+'").value="'+stw.getTextDef()+'"':
'$("ecl.'+stw.getName()+'").value="'+stw.getFhzeDef()+'";')});
    return rstNode;
  }

  var page = {};
  page.tables = [];

 // Überschrift
  page.heading =
  page.title   = 'Alarmierungsstichworte';
  page.text = new Element('p');
  page.text.appendChild(createText("\
Hier kann man die Fahrzeuge, die einem Alarmierungsstichwort zugeordnet sind, ändern. \
Zur Eingabe der Fahrzeuge dürfen als Trennzeichen nur ',' und '/' (für Alternativen) verwendet werden: z.B. 'LF,LF/HLFS/TS'. \
Die gültigen Fahrzeuggruppen seht Ihr unter "));

  nodeA = new Element('a', {'href'  : '/ereglamsAAO/Fahrzeuge'});
  nodeA.appendChild(createText('Fahrzeuge'));
  page.text.appendChild(nodeA);
  page.text.appendChild(new Element('br'));
  page.text.appendChild(createText("\
Im Text sind folgende Zeichen nicht erlaubt: < > ; ="));
  page.text.appendChild(new Element('br'));
  page.text.appendChild(createText("\
Das eigene Anlegen von Alarmierungsstichworten ist (noch) nicht möglich."));

  var tableSet = {};
  tableSet.rows = [];
  var row = new tableRowCls();
  tableSet.headRow = row;

  // Alarmierungsstichwort
  var cell = row.getNewCell({'style': 'width: 120px;',
                             'title': 'Alarmierungsstichwort'}, true);
  cell.addText('Stichwort');

  // Text
  cell = row.getNewCell({'style': 'width: 250px;',
                         'colspan' : '2',
                         'title': 'Text zum Stichwort'}, true);
  cell.addText('Text');

  // Fahrzeuge
  cell = row.getNewCell({'style': 'width: 250px;',
                         'colspan' : '2',
                         'title': 'zu alarmierende Fahrzeuge zum Stichwort'}, true);
  cell.addText('Fahrzeuge');

  var rowCnt = 0;
  for each (stw in conf.stwList.getSortedList(true))
  { row = new tableRowCls({'class': 'row'+(rowCnt++)%2});
    tableSet.rows.push(row);

    // Alarmierungsstichwort
    cell = row.getNewCell({'style': 'text-align: left;'}, true);
    cell.addText(stw.getName());

    // Text-Reset
    cell = row.getNewCell({'id': 'rtx.' + stw.getName()});
    if (stw.isModTxt())
    { cell.addChild(nodeResetAaoKey(stw, true));
    }

    // Text
    cell = row.getNewCell();
    nodeInput = new Element('input',
                            {'class': 'fontSmall',
                             'style': 'width: 250px;',
                             'id'   : 'etx.' + stw.getName(),
                             'type' : 'text'});
    nodeInput.defaultValue =
    nodeInput.value        = stw.getText();
    cell.addChild(nodeInput);

    // Fahrzeuge-Reset
    cell = row.getNewCell({'id': 'rcl.' + stw.getName()});
    if (stw.isModFhze())
    { cell.addChild(nodeResetAaoKey(stw, false));
    }

    // Fahrzeuge
    cell = row.getNewCell();
    nodeInput = new Element('input',
                            {'class': 'fontSmall',
                             'style': 'width: 250px;',
                             'id'   : 'ecl.' + stw.getName(),
                             'type' : 'text'});
    nodeInput.defaultValue =
    nodeInput.value        = stw.getFhzList().toString();
    cell.addChild(nodeInput);

  }
  page.tables.push(tableSet);

  // Speicherroutine
  page.saveFunc = saveAaoKeys;

  running = true;
  displayConfPage(page, menus);
  running = false;
}

function displayAAOVehicleConfig()
{
  // Fahrzeuge speichern
  function saveFahrzeuge()
  {
    var isValid = true;
    var nodeInfo = $('ereglamsInfo');
    var msgTitle = '';
    var msgClass = '';

    errLog.refresh();
    removeChildren(nodeInfo);

    if (isValid)
    { msgTitle = 'Fahrzeuge gespeichert.';
      msgClass = 'form_success';
    }
    else
    { msgTitle = 'Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.';
      msgClass = 'form_error';
    }

    nodeInfo.setAttribute('class', msgClass);
    nodeInfo.appendChild(createText(msgTitle));
    for each (msg in errLog.getMsgs())
    { nodeInfo.appendChild(new Element('br'));
      nodeInfo.appendChild(createText(msg));
    }
    errLog.refresh();
  }

  var page = {};
  page.tables = [];

  // Überschrift
  page.heading =
  page.title   = 'Fahrzeuge';
  page.text = new Element('p');
  page.text.appendChild(createText("\
Jedem Fahrzeug ist eine Fahrzeuggruppe zugeordnet, so dass mehrere Fahrzeuge (z.B. LF's) gemeinsam behandelt werden können."));
  page.text.appendChild(new Element('br'));
  var nodeSpan = new Element('span', {'style':'color:red;'});
  nodeSpan.appendChild(createText("HINWEIS:"));
  page.text.appendChild(nodeSpan);
  page.text.appendChild(createText("\
 bis auf weiteres ist ein Speichern dieser Einstellungen nicht möglich!"));

  var tableSet = {};
  tableSet.rows = [];
  var row = new tableRowCls();
  tableSet.headRow = row;

  // Fahrzeug
  var cell = row.getNewCell({'style': 'width: 200px;',
                             'title': 'Fahrzeug'}, true);
  cell.addText('Fahrzeug');

  // Fahrzeuggeschwindigkeit
  cell = row.getNewCell({'title': 'Geschwindigkeit des Fahrzeugs'}, true);
  cell.addText('Geschw.');

  // Löschgruppenbesatzung
  cell = row.getNewCell({'title': 'Fahrzeug hat Löschgruppenbesatzung'}, true);
  cell.addText('GrpFhz');

  // mit Ausbildung
  cell = row.getNewCell({'title': 'Fahrzeug hat Löschgruppenbesatzung'}, true);
  cell.addText('Ausbild.');

  // Fahrzeuggruppe
  cell = row.getNewCell({'title': 'Fahrzeuggruppe'}, true);
  cell.addText('Gruppe');

  var rowCnt = 0;
  for each (fhz in conf.fhzList.getSortedList())
  { row = new tableRowCls({'class': 'row'+(rowCnt++)%2});
    tableSet.rows.push(row);

    // Fahrzeug
    cell = row.getNewCell({'style': 'text-align: left;'}, true);
    row.addCell(cell);
    nodeA = new Element('a', {'href'  : fhz.getWiki(),
                              'target': '_blank'});
    nodeA.appendChild(createText('W'));
    var nodeSpan = new Element('span', {'class' : 'WikiLinkDark',
                                        'title' : fhz.getWiki()});
    nodeSpan.appendChild(nodeA);
    cell.addChild(nodeSpan);
    cell.addEntityText('&nbsp;');
    cell.addText(fhz.getName());

    // Fahrzeuggeschwindigkeit
    cell = row.getNewCell();
    cell.addText(fhz.getSpeed() + ' km/h');

    // Löschgruppenbesatzung
    cell = row.getNewCell();
    var nodeChkbox = new Element('input', {'type' : 'checkbox'});
    nodeChkbox.checked = fhz.isLGrpFhz();
    nodeChkbox.disabled = true;
    cell.addChild(nodeChkbox);

    // mit Ausbildung
    cell = row.getNewCell();
    var nodeChkbox = new Element('input', {'type' : 'checkbox'});
    nodeChkbox.checked = fhz.needsTraining();
    nodeChkbox.disabled = true;
    cell.addChild(nodeChkbox);

    // Fahrzeuggruppe
    cell = row.getNewCell();
    var nodeSelGrp = new Element('select', {'class': 'fontSmall',
                                            'id'   : 'sel.' + fhz.getName(),
                                            'style': 'width: 200px;'});
    for each (fhzGrp in conf.fhzGrpList.getList())
    { nodeOptionGrp = new Option();
      nodeOptionGrp.value = fhzGrp.getName();
      nodeOptionGrp.text  = fhzGrp.getName() + ': ' + fhzGrp.getText();
    // noch den aktuellen Wert für die Selektionsauswahl einstellen
      if (fhzGrp.getName() == fhz.getGrp())
      { nodeOptionGrp.selected = true;
      }
      nodeSelGrp.add(nodeOptionGrp, null); // hinten anhängen
    }
    cell.addChild(nodeSelGrp);
  }
  page.tables.push(tableSet);

  // Speicherroutine
  //page.saveFunc = saveFahrzeuge;

  running = true;
  displayConfPage(page, menus);
  running = false;
}

function displayAAOVehicleGroupConfig()
{
  // Fahrzeuggruppen speichern
  function saveFhzGruppe()
  {
    var isValid = true;
    var nodeInfo = $('ereglamsInfo');
    var msgTitle = '';
    var msgClass = '';

    errLog.refresh();
    removeChildren(nodeInfo);

    if (isValid)
    { msgTitle = 'Fahrzeuggruppen gespeichert.';
      msgClass = 'form_success';
    }
    else
    { msgTitle = 'Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.';
      msgClass = 'form_error';
    }

    nodeInfo.setAttribute('class', msgClass);
    nodeInfo.appendChild(createText(msgTitle));
    for each (msg in errLog.getMsgs())
    { nodeInfo.appendChild(new Element('br'));
      nodeInfo.appendChild(createText(msg));
    }
    errLog.refresh();
  }

  var page = {};
  page.tables = [];

 // Überschrift
  page.heading =
  page.title   = 'Fahrzeuggruppen';
  page.text = new Element('p');
  page.text.appendChild(createText("\
Die Fahrzeuggruppen definieren, welche Fahrzeuge bei der Alarmierung gemeinsam behandelt werden. \
Weiterhin wird über die Fahrzeuggruppen die Reihenfolge bestimmt, in der sie dargestellt werden."));
  page.text.appendChild(new Element('br'));
  var nodeSpan = new Element('span', {'style':'color:red;'});
  nodeSpan.appendChild(createText("HINWEIS:"));
  page.text.appendChild(nodeSpan);
  page.text.appendChild(createText("\
 bis auf weiteres ist ein Speichern dieser Einstellungen nicht möglich!"));

  var tableSet = {};
  tableSet.rows = [];
  var row = new tableRowCls();
  tableSet.headRow = row;
  // Fahrzeuggruppe
  var cell = row.getNewCell({'style': 'width: 200px;',
                             'title': 'Fahrzeuggruppe'}, true);
  cell.addText('Fahrzeuggruppe');

  // interne Abkürzung
  cell = row.getNewCell({'title': 'im Script verwendete Abkürzung'}, true);
  cell.addText('Abk.');

  // Wachvoraussetzungen
  cell = row.getNewCell({'title': 'Wachvoraussetzungen'}, true);
  cell.addText('ab');

  // Wassereinssatz
  cell = row.getNewCell({'title': 'Wassereinsatz',
                         'class': 'fontSmall'}, true);
  cell.addText('Wasser');

  // Auflistungsreihenfolge
  cell = row.getNewCell({'style': 'width: 100px;',
                         'title': 'Reihenfolge bei Auflistungen'}, true);
  cell.addText('Reihenfolge');

  // zugeordnete Fahrzeuge
  cell = row.getNewCell({'title': 'zugeordnete Fahrzeuge'}, true);
  cell.addText('Fahrzeuge');

  var rowCnt = 0;
  for each (fhzGrp in conf.fhzGrpList.getList(/* kein Parameter für gesamte Liste*/))
  { row = new tableRowCls({'class': 'row'+(rowCnt++)%2});
    tableSet.rows.push(row);

    // Fahrzeuggruppe
    cell = row.getNewCell({'style': 'text-align: left;'}, true);
    cell.addText(fhzGrp.getText());

    // interne Abkürzung
    cell = row.getNewCell();
    cell.addText(fhzGrp.getName());

    // Wachvoraussetzungen
    cell = row.getNewCell();
    cell.addText(fhzGrp.getAb());

    // Wassereinsatz
    cell = row.getNewCell();
    var nodeChkbox = new Element('input', {'type' : 'checkbox'});
    nodeChkbox.checked = fhzGrp.isOnWater();
    nodeChkbox.disabled = true;
    cell.addChild(nodeChkbox);

    // Auflistungsreihenfolge
    cell = row.getNewCell();
    var nodeSelSeq = new Element('select', {'class': 'fontSmall',
                                            'id'   : 'sel.' + fhzGrp.getName(),
                                            'style': 'width: 100px;'});
    nodeSelSeq.disabled = false; // für's Erste deaktivieren
    for (var i = 1; i <= conf.fhzGrpList.getCount(); i++)
    { nodeOptionSeq = new Option();
      nodeOptionSeq.value = i;
      nodeOptionSeq.text  = 'an ' + i + '. Stelle';
      // noch den aktuellen Wert für die Selektionsauswahl einstellen
      if (i == fhzGrp.getSequence())
      { nodeOptionSeq.selected = true;
      }
      nodeSelSeq.add(nodeOptionSeq, null); // hinten anhängen
    }
    cell.addChild(nodeSelSeq);

    // Fahrzeugliste
    cell = row.getNewCell({'class': 'fontSmall'});
    cell.addText(fhzGrp.getFhzNameArr().join(', '));
  }
  page.tables.push(tableSet);

  // Speicherroutine
  //page.saveFunc = saveFhzGruppe;

  running = true;
  displayConfPage(page, menus);
  running = false;
}

// ermittelt die Bereiche in denen eine Koordinate liegt
//  z.B. 'Flughafen'     : {from: {x:  83, y: 179}, to: {x:  84, y: 180}},
function getAreaDescription(x, y)
{ var locArr = [];
  for (loc in locationLst)
  { if (locationLst[loc].from.x <= x &&
        locationLst[loc].from.y <= y &&
        locationLst[loc].to.x >= x &&
        locationLst[loc].to.y >= y)
    { locArr.push(locationLst[loc].text);
    }
  }
  return locArr.reverse().join(', ');
}

function setMsg(iNode, iType)
{ running = true; // Script ist aktiv (u.a. bei Ereignis nodeInserted benötigt)

  var type = '';
  var msgTitle = '';
  if(iType)
  { type = iType;
  }

  if (typeof(iNode) === 'string')
  { if(!type)
    { type = 'form_info';
    }
    var nodeDiv = new Element('div', {'class': type});
    nodeDiv.appendChild(createText(iNode));
    iNode = nodeDiv;
  }
  else if (objType(iNode) == 'logCls')
  { if (!type)
    { switch(iNode.getType())
      { case 'E':
          type = 'form_error';
          msgTitle = 'Fehler im Script:';
          break;
        case 'S':
          type = 'form_success';
          msgTitle = 'Erfolg:';
        default:
          type = 'form_info';
          msgTitle = 'Information:';
          break;
      }
    }
    else
    { type = 'form_error';
      msgTitle = 'Fehler im Script:';
    }
    var nodeDiv = new Element('div', {'class': type});
    if (msgTitle)
    { nodeDiv.appendChild(createText(msgTitle));
      nodeDiv.appendChild(new Element('br'));
    }
    for each (msg in iNode.getMsgs())
    { nodeDiv.appendChild(createText(msg));
      nodeDiv.appendChild(new Element('br'));
    }
    if (iNode.getType() == 'E')
    { iNode.display();// auf der Konsole ausgeben
    }
    iNode = nodeDiv;
  }

  if (!msgArea)
  { msgArea = new Element('div', {'style': 'color: white;',
                                  'id'   : 'msgArea'});
    $('container').insertBefore(msgArea, $('content'));
  }
  else
  { removeChildren(msgArea);
  }

  msgArea.appendChild(iNode);

  running = false; // Script ist soweit fertig
}

// wird aufgerufen bei Änderungen im DOM
function nodeInserted(e)
{ // wenn ich selbst für die Änderung verantwortlich bin, nichts unternehmen
  if (running || !e.target.innerHTML || /^\s*$/.test(e.target.innerHTML))
  { return; }
//console(getParents(e.target)+'\n'+e.target.innerHTML.trim().substr(0,200));
  var node = undefined;
  switch (e.target.nodeName)
  { case 'TABLE':
      node = xPath.getSingle("parent::div/parent::form/preceding-sibling::h2[1]", e.target);
      if (node && ('Feuerwehrschule' == node.innerHTML.trim()))
      { window.setTimeout(displaySchool(false),10);
      }
      node = xPath.getSingle("parent::div/parent::form/preceding-sibling::h2[1]", e.target);
      if (node && ('Übungsgelände' == node.innerHTML.trim()))
      { window.setTimeout(displayTraining(),10);
      }
      node = xPath.getSingle("parent::div[@id='mission_content']/h2[1]", e.target);
      if (node && ('Rückmeldungen und Fakten' == node.innerHTML.trim()))
      { window.setTimeout(main.main, 100);
      }
      node = xPath.getSingle("parent::div[@id='mission_content']/preceding-sibling::h1[1]", e.target);
      if (node && ('Aktuelle Einsätze' == node.innerHTML.trim()))
      { window.setTimeout(main.main, 10);
      }
      break;
    case 'DIV':
      break;
    case 'H1':
      if ('Leitstellenansicht' == e.target.innerHTML.trim())
      { displayControlCenter();
      }
      break;
    case 'H2':
      break;
    case 'UL':
      if (location.pathname == '/' && xPath.getSingle("parent::div[@id='startMissionList']", e.target))
      { var evalAs = xPath.getNodes("./li/a", e.target);
        for (iA = 0; iA < evalAs.snapshotLength; iA++)
        { var nodeA = evalAs.snapshotItem(iA);
          var mld = conf.getMld(nodeA.innerHTML.trim());
          nodeA.title = mld.write();
          if (main.hasVB)
          { if (conf.getOptVal('highlightVBOrder') && mld.isVBOrder())
            { nodeA.style.color = conf.getOptVal('highlightVBOrderColor');
              nodeA.style.fontWeight = 'bold';
            }
          }
          if (conf.getOptVal('highlightOrder') && main.order == mld.getName())
          { nodeA.style.color = conf.getOptVal('highlightOrderColor');
            nodeA.style.fontWeight = 'bold';
            nodeA.style.fontStyle = 'italic';
            if (conf.getOptVal('highlightOrderBlink'))
            { nodeA.style.textDecoration = 'blink';
            }
          }
        }
      }
      break;
  }
}

/***************************************************************
  Klassen
***************************************************************/
// Zeitkonvertierungen
function timeCls(iTime)
{ var day = 0;
  var hour = 0;
  var min = 0;
  var sec = 0;

  // Zeit in Sekunden umwandeln
  var convTime2Sec = function(iTime)
  { if (iTime == 'Keine Anfahrtszeit')
    { return 0;
    }
    else
    { // ca. dd Tag hh Std. mm Min. ss Sek.
      //  1: 'dd Tag(e)'; 2: 'dd'; 3: 'hh Std.'; 4: 'mm Min.'; 5: 'mm'; 6: 'ss Sek.'; 7: 'ss'
      var [, , dd, , hh, , mm, , ss] = /(ca. (\d{1,2})\sTag\s?)?((\d{1,2})\sStd.\s?)?((\d{1,2})\s?Min.\s?)?((\d{1,2})\s?Sek.\s*)?/.exec(iTime);

      // führende Nullen entsorgen, da parseInt sonst versucht, sie oktal zu interpretieren, was bei '08/09' nicht klappt
      if (dd) dd = dd.replace(/^\s*[0]?/,'');
      if (hh) hh = hh.replace(/^\s*[0]?/,'');
      if (mm) mm = mm.replace(/^\s*[0]?/,'');
      if (ss) ss = ss.replace(/^\s*[0]?/,'');

      day  = (!dd || isNaN(dd))?0:parseInt(dd);
      hour = (!hh || isNaN(hh))?0:parseInt(hh);
      min  = (!mm || isNaN(mm))?0:parseInt(mm);
      sec  = (!ss || isNaN(ss))?0:parseInt(ss);
    }
  }

  this.getTime = function()
  { return new Date(1970, 1, day+1, hour, min, sec);
  }

  this.getSeconds = function()
  { return ((day * 24) + hour) * 3600 + min * 60 + sec;
  }

  this.toString = function()
  { return ((day * 24) + hour) +':'+((min<=9)?'0':'')+min+':'+((sec<=9)?'0':'')+sec;
  }

  if (objType(iTime) == 'string')
  { convTime2Sec(iTime.trim());
  }
  else if (!isNaN(iTime))
  { sec = iTime % 60;
    iTime /= 60;
    min = iTime % 60;
    iTime /= 60;
    hour = iTime % 24;
    day = iTime / 24;
  }
}

// Laufzeitdaten
function mainCls(iConf)
{
  this.user = '';
  this.order = '';
  this.hasVB = false; //Spieler hat einen Verband
  this.hasUpdate = getValue(GMVAL_PREF_SYS + 'hasUpdate', false);
  this.updVersion = getValue(GMVAL_PREF_SYS + 'updVersion', '');
  this.meta = {};
  var cnf = iConf;
  var checkInterval = 6*60*60; // einmal alle 6 Stunde [s]

  this.getClass = function()
  { return 'mainCls';
  }

  this.init = function()
  { var userNode = xPath.getSingle("//li/ul/li/a[contains(text(), 'Benutzer:')]", 'root');
    if (userNode) { this.user = userNode.innerHTML.trim().replace('Benutzer: ', ''); }

    var orderNode = xPath.getSingle("//li[contains(./a/text(), 'Einsätze')]/ul/li[1]", 'root');
    if (orderNode) { [, this.order] = /Einsatzart: \"(.*)\"/.exec(orderNode.innerHTML.trim()); }

    var VBNode = xPath.getSingle("//li[contains(./a/text(), 'Verband')]/ul/li[1]", 'root');
    if (VBNode) { this.hasVB = !(/Gründen/.test(VBNode.innerHTML.trim())); }

    // Daten zu Feuerwachen des Users laden
    var uStr = getValue(GMVAL_PREF_UFW+escape(main.user), undefined);
    if (uStr)
    { var [key, value] = uStr.split('=');
      var fwArr = [];
      if (value) fwArr = value.split(',');
      var gmVals = GM_listValues();
      for (var i = 0; i < gmVals.length; i++)
      { switch(gmVals[i].substr(0,4))
        { case GMVAL_PREF_EST:
            var num = gmVals[i].substr(4);
            if ((fwArr.indexOf(num) != -1) && !cnf.stationList.getStation(parseInt(num)))
            { var station = new stationCls();
              station.deserialize(getValue(gmVals[i]));
              cnf.stationList.addStation(station);
            }
            break;
        }
      }
    }
    else if (main.user && location.pathname != '/feuerwachen')
    { setMsg('Keine gespeicherte Liste der Feuerwachen gefunden. Bitte Feuerwachenliste aufsuchen!');
    }

    if (cnf.getOptVal('adjustMenus') && main.user)
    { // entfernen Link zum Credit-Log
      xPath.getSingle("//li/ul/li[starts-with(./a/text(), 'Credits:')]", 'root').style.display = 'none';

      var node = xPath.getSingle("//li/ul/li[contains(./a/text(), 'Einstellungen')]", 'root');
      var nodeLi = new Element('li');
      var nodeImg = new Element('img', {'class': 'famfamfamicon', 'src': '/images/pencil.png', 'title': 'Einstellungen', 'alt': 'Einstellungen'});
      var nodeA = new Element('a', {'target': '_self', 'href': '/ereglamsAAOConfig'});
      nodeA.appendChild(createText("Scriptkonfiguration"));
      nodeLi.appendChild(nodeImg);
      nodeLi.appendChild(nodeA);
      node.parentNode.insertBefore(nodeLi, node.nextSibling);

      node = xPath.getSingle("//li/ul/li[contains(./a/text(), 'Werbeaktion')]", 'root');
      nodeLi = new Element('li');
      nodeImg = new Element('img', {'class': 'navigation_arrow', 'src': '/images/SmallArrow.png', 'alt': 'SmallArrow'});
      nodeA = new Element('a', {'id': 'personallink', 'target': '_self', 'href': '/personal/list'});
      nodeA.appendChild(createText('Personal (langsam)'));
      nodeLi.appendChild(nodeImg);
      nodeLi.appendChild(nodeA);
      node.parentNode.insertBefore(nodeLi, node);

      node = xPath.getSingle("//li[contains(./a/text(), 'Forum')]/ul", 'root');
      nodeLi = new Element('li');
      nodeImg = nodeImg.cloneNode(true);
      nodeA = new Element('a', {'target': '_self', 'href': '/forum/beobachtete'});
      nodeA.appendChild(createText('beobachtete Themen'));
      nodeLi.appendChild(nodeImg);
      nodeLi.appendChild(nodeA);
      node.appendChild(nodeLi);

      nodeLi = new Element('li');
      nodeImg = nodeImg.cloneNode(true);
      nodeA = new Element('a', {'target': '_self', 'href': '/forum/ungelesene'});
      nodeA.innerHTML = 'ungelesene Beiträge';
      nodeLi.appendChild(nodeImg);
      nodeLi.appendChild(nodeA);
      node.appendChild(nodeLi);

      nodeLi = new Element('li');
      nodeImg = nodeImg.cloneNode(true);
      nodeA = new Element('a', {'target': '_self', 'href': '/forum_board/markAsRead'});
      nodeA.setAttribute('onClick', 'return confirm(\"Alle Foren als gelesen markieren?\");');
      nodeA.innerHTML = 'alles als gelesen markieren';
      nodeLi.appendChild(nodeImg);
      nodeLi.appendChild(nodeA);
      node.appendChild(nodeLi);

      nodeLi = new Element('li');
      nodeImg = new Element('img',
                            { 'src'  : '/images/email.png',
                              'class': 'famfamfamicon',
                            });
      nodeImg.title =
      nodeImg.alt   = 'Nachrichten';
      nodeA = new Element('a', {'target': '_self', 'href': '/posteingang'});
      nodeA.innerHTML = 'Posteingang';
      nodeLi.appendChild(nodeImg);
      nodeLi.appendChild(nodeA);
      node.appendChild(nodeLi);
    }

    this.checkUpdate();

    // Listener registrieren, um auf Änderungen an den Seiten zu reagieren
    document.addEventListener("DOMNodeInserted", nodeInserted, false);
  }

  this.checkUpdate = function()
  {
    var date = new Date;

    if (conf.getOptVal('checkForUpdates') && checkLastUpd(date) && !this.hasUpdate)
    { GM_xmlhttpRequest
      ( { method: 'GET',
          url: METAURL,
          headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
          onload:
            function(resp)
            { console('Checking for updates: responce status= '+resp.status);if (resp.status == 200)
              { this.meta = parseHeaders(resp.responseText);
                this.updVersion = this.meta.version;
                this.hasUpdate = (this.updVersion != getValue(GMVAL_PREF_SYS + 'version',''));

                setValue(GMVAL_PREF_SYS + 'hasUpdate', this.hasUpdate);
                setValue(GMVAL_PREF_SYS + 'updVersion', this.updVersion);
                setValue(GMVAL_PREF_SYS + 'description', this.meta.description);
                setUpdMsg(this.hasUpdate, this.updVersion);
              }
              else
              { setMsg('Kein Update möglich: Suche nach Versionsdaten auf userscript.org liefert Status "'+resp.status+'"', 'form_error');
                return;
              }
            }
        }
      )
      setValue(GMVAL_PREF_SYS + 'lastUpdate', date.toString());
    }
  }

  function checkLastUpd(iDate)
  { var lastUpd = getValue(GMVAL_PREF_SYS + 'lastUpdate', undefined);
    var date = new Date;
    if (!lastUpd)
    { return true; }
    else if (lastUpd.length == 8) // alte Datumsangabe
    { [,yearStr,monthStr,dayStr] = lastUpd.match(/(\d{4})(\d{2})(\d{2})/);
      date = new Date(parseInt(yearStr.replace(/^0*/,'')), parseInt(monthStr.replace(/^0*/,''))-1, parseInt(dayStr.replace(/^0*/,'')));
    }
    else
    { [,dStr] = lastUpd.match(/^\w{3}\s(.*)\s\w{3}\+\d{4}/); //Timezone entfernen
      date = new Date(dStr);
    }
    return (checkInterval < (Math.round(iDate.getTime()/1000) - Math.round(date.getTime()/1000)));
  }

  function parseHeaders(iMeta)
  { var headers = {};
    var line, name, prefix, header, key, value;

    for each (line in iMeta.split(/\n/))
    { delete name, value;
      try
      { [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
      }
      catch (e)
      { continue;
      }

      switch (name)
      { case "licence":
          name = "license";
          break;
      }

      [key, prefix] = name.split(/:/).reverse();

      if (prefix)
      { if (!headers[prefix])
        { headers[prefix] = new Object;
        }
        header = headers[prefix];
      }
      else
      { header = headers;
      }

      if (header[key] && !(header[key] instanceof Array))
      { header[key] = new Array(header[key]);
      }

      if (header[key] instanceof Array)
      { header[key].push(value);
      }
      else
      { header[key] = value;
      }
    }

    headers["licence"] = headers["license"];

    return headers;
  }

  function setUpdMsg(hasUpd, updVers)
  { if (hasUpd && (!$('divUpdateInfo')))
    { var nodeDiv = new Element('div', {'id'   : 'divUpdateInfo',
                                        'class': 'form_info'});

      nodeDiv.appendChild(new Element('b').appendChild(createText('Script-Update verfügbar (' + updVers + '): ')));
      var nodeA = new Element('a', {'href'  : UPDATEURL,
                                    'target': '_blank'});
      nodeA.appendChild(createText('Informationen'));
      nodeDiv.appendChild(nodeA);

      nodeDiv.appendChild(createText(' dazu oder direkt '));
      nodeA = new Element('a',
                          {'href'  : INSTALLURL,
                           'id'    : 'installURL',
                           'target': '_blank'});
      nodeA.appendChild(createText('installieren'));
      nodeDiv.appendChild(nodeA);

      if (getValue(GMVAL_PREF_SYS + 'description', undefined))
      { nodeDiv.appendChild(new Element('br'));
        nodeDiv.appendChild(createText('Beschreibung: '+getValue(GMVAL_PREF_SYS + 'description')));
      }

      setMsg(nodeDiv);
      // EventListener für anklicken des Install-Links
      $("installURL").addEventListener (
        "click" ,
        function(){ setValue(GMVAL_PREF_SYS + 'version',updVers); updVers=''; setValue(GMVAL_PREF_SYS + 'hasUpdate', false); } ,
        true )
    }
  }

  this.main = function()
  {
    running = true; // Script ist aktiv (u.a. bei Ereignis nodeInserted benötigt)

    if (conf.getOptVal('checkForUpdates'))
    { setUpdMsg(this.hasUpdate, this.updVersion); }

    var path = location.pathname;
    if (path == menus.config.link)
    { displayConfig(); }
    else if (path == menus.mld.link)
    { displayAAOConfig(); }
    else if (path == menus.stw.link)
    { displayAAOKeyConfig(); }
    else if (path == menus.fhz.link)
    { displayAAOVehicleConfig(); }
    else if (path == menus.fGrp.link)
    { displayAAOVehicleGroupConfig(); }

    // weitere Verarbeitung abbrechen, wenn kein User gefunden wurde
    if (!main.user)
    { return;
    }

    // Wacheninfo zentral setzen
    if (conf.getOptVal('tooltipOnStationLink') && conf.stationList.getCntFW() > 0)
    { var evalAs = xPath.getNodes("//a[contains(@href, 'feuerwachen/')]", 'content');
      for (var iA = 0; iA < evalAs.snapshotLength; iA++)
      { var nodeA = evalAs.snapshotItem(iA);
        if (/feuerwachen\/(\d+)$/.test(nodeA.href))
        { var station = conf.stationList.getStation(RegExp.$1);
          if (station)
          { nodeA.parentNode.title = station.write().replace(/\n/g, ', ');
          }
        }
      }
    }

    if (path == '/feuerwehr-einsaetze')
    { doOverview(); }
    else if (/\/feuerwehr-einsaetze\/(\d+)$/.test(path))
    { doCall(RegExp.$1); }
    else if (/\/feuerwehr-einsaetze\/(\d+)\/funk(\/\d+)?$/.test(path))
    { doRadioTransscript(); }
    else if (path == '/feuerwehrleitstelle')
    { displayControlCenter(); }
    else if (path == '/feuerwehrfahrzeuge')
    { doVehicleList(); }
    else if (/\/feuerwehrfahrzeuge\/(\d+)\/verschieben$/.test(path))
    { doVehicleAssignment(RegExp.$1); }
    else if (/\/feuerwehrfahrzeuge\/(\d+)\/bearbeiten$/.test(path))
    { doVehicle(RegExp.$1); }
    else if (/\/feuerwehrfahrzeuge\/(\d+)$/.test(path))
    { displayVehicle(RegExp.$1); }
    else if (/\/feuerwehrfahrzeuge\/(\d+)\/reparieren$/.test(path))
    { doVehicleRepair(RegExp.$1); }
    else if (/\/vehicle_to_user\/show\/id\/(\d+)\/repair\/true$/.test(path))
    { doVehicleRepairSent(RegExp.$1); }
    else if (/\/vehicle\/show\/caption_url\/(.*)$/.test(path))
    { doVehicleAssignment(0, RegExp.$1); }
    else if (path == '/feuerwehrfahrzeuge_markt')
    { ; }
    else if (path == '/feuerwachen')
    { displayStationList(); }
    else if (/\/feuerwachen\/(\d+)$/.test(path))
    { displayStation(RegExp.$1); }
    else if (/\/startseite\/(\d+)\/(\d+)\/ausbau\/(\d+)$/.test(path))
    { /* bisher keine verläßliche Information auf neue Stufe (Reload würde nicht erkannt) */ }
    else if (/\/startseite\/(\d+)\/(\d+)\/bau\/(\d+)$/.test(path))
    { conf.stationList.buildStation(RegExp.$3, RegExp.$1, RegExp.$2); }
    else if (/\/feuerwache\/destroy\/id\/(\d+)$/.test(path))
    { conf.stationList.removeStation(RegExp.$1); }
    else if (/\/feuerwachen\/(\d+)\/feuerwehrleute$/.test(path))
    { doCrewLists(); }
    else if (/\/feuerwachen\/(\d+)\/feuerwehrautos$/.test(path))
    { displayStationVehicles(RegExp.$1); }
    else if (/\/personal\/jaunt\/feuerwache_id\/(\d+)$/.test(path))
    { doJaunt(RegExp.$1); }
    else if (path == '/feuerwachen/werbeaktion')
    {
    }
    else if (path == '/gebaeude')
    { displayBuildingList(); }
    else if (path == '/personal_ausflug_premium')
    {
    }
    else if (path == '/personal/list')
    { doCrewLists(); }
    else if (/\/building_to_user\/show\/id\/(\d+)$/.test(path))
    { displayBuilding(RegExp.$1); }
    else if (/\/toplist(\/\d+)?$/.test(path) ||
             /\/toplist\/monatlich$/.test(path))
    { displayToplist(this.user); }
    else if (/\/verband\/.*/.test(path))
    { displayToplist(this.user); }
    else if (/\/event_logfile\/.*/.test(path))
    { doLoglist(); }

    running = false; // Script ist soweit fertig
  }
}

