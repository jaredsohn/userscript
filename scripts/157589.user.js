// ==UserScript==
// @name           KatSchutz (Bund) ~ AAO Script by Hummel09 
// @copyright      Liegt bei Ereglam! 
// @license        GPL version 3 oder jede spätere Version; http://www.gnu.org/copyleft/gpl.html
// @description    Alarmiert Fahrzeuge gemäß den Regeln des Verbandes "KatSchutz"
// @require        157792.user.js
// @require        157792.user.js
// @require        http://www.feuerwache.net/jscolor/jscolor.js
// @icon           http://www.feuerwache.net/favicon.ico
// @include        http://*.feuerwache.net/*
// @grant          GM_log
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @grant          GM_listValues
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @author         Hummel09
// @info           Komplete Neuentwicklung auf Basis von Ereglam's AAO
// @info           Script stammt von Ereglam, dies ist eine Kopie! 
// @version        1.0
// ==/UserScript==
var VERSION      = '1.0'
versions['KatSchutz (Bund) ~ AAO Script by Hummel09\'s AAO'] = VERSION;
/* ******************************************************************************************
ACHTUNG
Wenn das Script angepasst und erneut auf userscripts.org veröffentlicht wird,
MUSS die USERSCRIPTID angepasst werden.

WENN DU DIESEN ABSCHNITT NICHT 100% VERSTANDEN UND BEFOLGT HAST, STELLE DAS GEÄNDERTE SCRIPT NICHT ONLINE!
   ******************************************************************************************/
var USERSCRIPTID = '157792'; // diese Konstante ist anzupassen
// unter welchem URL finde ich Infos über das Script?
var UPDATEURL="http://userscripts.org/scripts/show/157792"+USERSCRIPTID;
// unter welchem URL finde ich das Script als Installation?
var INSTALLURL="http://userscripts.org/scripts/source/157792"+USERSCRIPTID+".user.js";
// unter welchem URL finde ich die Metadaten zum Script?
var METAURL="http://userscripts.org/scripts/source/157792"+USERSCRIPTID+".meta.js";

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
var marking = false; //Markieren aktiv (nach Klick auf markReq)
var userSel = false; //Änderung Fahrzeugauswahl durch Anwender
var ajaxReload = false;
var msgArea;

/* ******************************************************************************************
  H I N W E I S !!
  sollte die AAO im Script geändert werden, darf dies erst ab hier geschehen.
*/

var MeldungLst = {
/*
  Diese Liste stellt die Grundeinstellungen dieses Scriptes zur Verfügung

  Syntax in der Alarmierungsliste:
    Alarmierungsstichwort zuerst, dann ggf. ein Plus (+) und weiter Fahrzeugklassen, diese
    durch Komma (,) voneinander getrennt. Alternativen durch Schrägstrich (/) getrennt
    Optionale Fahrzeuge (werden nur in der Liste hervorgehoben) mit Pipe (|) anfügen
    zum Beispiel 'F1+RW/TS,ELW|GW-M,DLK' ->
        alarmiere alles nach F1, zusätzlich einen RW oder LF16-TS, sowie einen ELW.
        markiere zusätzlich den nächsten GWM sowie die nächste DLK
*/

  'Brand Kreuzfahrtschiff'         : {mld: 'FB2'                         , storm: false, ab: {FW: 45}, onWater: true, wiki: 'Brand_Kreuzfahrtschiff'},
  'Rauchentwicklung in Kantine'    : {mld: 'F3L+GTLF,GWA,GWL'            , storm: false, ab: {FW: 50}, wiki: 'Rauchentwicklung_in_Kantine'},
  'Feuer in Bootswerft'            : {mld: 'F3L+GTLF,GWA,GWL,GWM'        , storm: false, ab: {FW: 60}, wiki: 'Feuer_in_Bootswerft'},
  'Brand im Tower'                 : {mld: 'F3L+GWA'                     , storm: false, ab: {FW: 59}, wiki: 'Brand_im_Tower'},
  'Brand im Terminal'              : {mld: 'F4L+GWA,GWM'                 , storm: false, ab: {FW: 59}, wiki: 'Brand_im_Terminal'},
  'Beschädigtes Frachtstück'       : {mld: 'F1+ELW,GWG'                  , storm: false, ab: {FW: 59}, wiki: 'Besch%C3%A4digtes_Frachtstück'},
  'Brand bei Flugzeugbetankung'    : {mld: 'F2+ELW,FLF,GWÖl,GWG'         , storm: false, ab: {FW: 59}, wiki: 'Brand_bei_Flugzeugbetankung'},
  'Ölspur'                         : {mld: 'TH+GWÖl'                     , storm: false, ab: {FW:  5}, wiki: '%C3%96lspur'},
  'Ammoniakaustritt in Eishalle'   : {mld: 'GSG+LF/HLFS,LF/HLFS,RW,GWA'  , storm: false, ab: {BF:  5}, wiki: 'Ammoniakaustritt_in_Eishalle'},
  'Auffahrunfall'                  : {mld: 'TH'                          , storm: false, ab: {FW:  4}, wiki: 'Auffahrunfall'},
  'Ausgedehnter Waldbrand'         : {mld: 'F5+GWL'                      , storm: false, ab: {FW: 20}, wiki: 'Ausgedehnter_Waldbrand'},
  'Auslaufende Betriebsstoffe'     : {mld: 'TH+GWÖl'                     , storm: false, ab: {FW:  4}, wiki: 'Auslaufende_Betriebsstoffe'},
  'Baggerbrand'                    : {mld: 'F1Gr|ELW'                    , storm: false, ab: {FW: 30}, wiki: 'Baggerbrand'},
  'Baukran auf Auto'               : {mld: 'TH2+FwK'                     , storm: false, ab: {FW: 15}, wiki: 'Baukran_auf_Auto '},
  'Baum auf Auto'                  : {mld: 'TH1+GWÖl'                    , storm: true,  ab: {FW:  9}, wiki: 'Baum_auf_Auto'},
  'Baum auf Dach'                  : {mld: 'TH1+DLK'                     , storm: true,  ab: {FW:  8}, wiki: 'Baum_auf_Dach'},
  'Baum auf Schiene'               : {mld: 'THS'                         , storm: true,  ab: {FW: 65}, wiki: 'Baum_auf_Schiene'},
  'Baum auf Straße'                : {mld: 'TH'                          , storm: true,  ab: {FW:  1}, wiki: 'Baum_auf_Stra%C3%9Fe'},
  'Brand am Bahndamm'              : {mld: 'F2'                          , storm: false, ab: {FW: 65}, wiki: 'Brand_am_Bahndamm'},
  'Brand auf Weihnachtsmarkt'      : {mld: 'F1'                          , storm: false, ab: {FW:  3}, wiki: 'Brand_auf_Weihnachtsmarkt'},
  'Brand im Baumarkt'              : {mld: 'F3G+GWA'                     , storm: false, ab: {BF: 20}, wiki: 'Brand_im_Baumarkt'},
  'Brand im Casino'                : {mld: 'F5L+GTLF,GWA,GWL|LF/HLFS,LF/HLFS,LF/HLFS', storm: false, ab: {FW: 50}, wiki: 'Brand_in_Casino'},
  'Brand im Sägewerk'              : {mld: 'F4+GWA,GWL'                  , storm: false, ab: {FW: 40}, wiki: 'Brand_im_S%C3%A4gewerk'},
  'Brand im Supermarkt'            : {mld: 'F3L+FwK'                     , storm: false, ab: {FW:  4}, wiki: 'Brand_im_Supermarkt'},
  'Brand in Altpapier-Lager'       : {mld: 'F4LG+GTLF,GWL'               , storm: false, ab: {FW: 75}, wiki: 'Brand_in_Altpapier-Lager'},
  'Brand in Autohaus'              : {mld: 'F4L+GWA,GWM'                 , storm: false, ab: {FW: 10}, wiki: 'Brand_in_Autohaus'},
  'Brand in Betankungsanlage'      : {mld: 'F5RG+GWA,LF/HLFS/ULF,LF/HLFS/ULF|LF/HLFS/ULF,LF/HLFS/ULF', storm: false, ab: {FW: 64}, wiki: 'Brand_in_Betankungsanlage'},
  'Brand in Brauerei'              : {mld: 'F2L+ELW,GWA,GWL'             , storm: false, ab: {FW: 11}, wiki: 'Brand_in_Brauerei'},
  'Brand in Briefkasten'           : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brand_in_Briefkasten'},
  'Brand in Druckerei'             : {mld: 'F4L+GWA,GWL,RW'              , storm: false, ab: {BF: 20}, wiki: 'Brand_in_Druckerei'},
  'Brand in Eishalle'              : {mld: 'F3L+RW,GTLF,GWL'             , storm: false, ab: {FW:  5}, wiki: 'Brand_in_Eishalle'},
  'Brand in Fahrkartenautomat'     : {mld: 'F1Gr'                        , storm: false, ab: {FW: 65}, wiki: 'Brand_in_Fahrkartenautomat'},
  'Brand in Gärtnerei'             : {mld: 'F2LG+LF/HLFS,ELW'            , storm: false, ab: {FW:  8}, wiki: 'Brand_in_G%C3%A4rtnerei'},
  'Brand in Gemeindehaus'          : {mld: 'F2'                          , storm: false, ab: {FW:  3}, wiki: 'Brand_in_Gemeindehaus'},
  'Brand in Großwäscherei'         : {mld: 'F4L+GWA,GWM'                 , storm: false, ab: {FW: 13}, wiki: 'Brand_in_Großw%C3%A4scherei'},
  'Brand in Industriepark'         : {mld: 'VGSL'                        , storm: false, ab: {MG:  3}, wiki: 'Brand_in_Industriepark'}, //Verbandsgroßschadenslage
  'Brand in Kühlhaus'              : {mld: 'F3LG+RW,GWL|LF/HLFS,LF/HLFS' , storm: false, ab: {FW: 20}, wiki: 'Brand_in_K%C3%BChlhaus'},
  'Brand in KFZ-Werkstatt'         : {mld: 'F2+FwK'                      , storm: false, ab: {FW: 15}, wiki: 'Brand_in_KFZ-Werkstatt'},
  'Brand in Kletterhalle'          : {mld: 'F3L+GWL'                     , storm: false, ab: {BF: 45}, wiki: 'Brand_in_Kletterhalle'},
  'Brand in Lackfabrik'            : {mld: 'F4LG+GTLF,GWL,GWA'           , storm: false, ab: {FW: 25}, wiki: 'Brand_in_Lackfabrik'},
  'Brand in Müll-Bunker'           : {mld: 'F4LG'                        , storm: false, ab: {FW: 75}, wiki: 'Brand_in_M%C3%BCll-Bunker'},
  'Brand in Müll-Sortieranlage'    : {mld: 'F3G+GWA,GWL'                 , storm: false, ab: {FW: 75}, wiki: 'Brand_in_M%C3%BCll-Sortieranlage'},
  'Brand in Metzgerei'             : {mld: 'F3+DLK,GWL'                  , storm: false, ab: {BF:  2}, wiki: 'Brand_in_Metzgerei'},
  'Brand in Raffinerie'            : {mld: 'F5RG+DLK,FwK,TUIS,LF/HLFS/ULF,LF/HLFS/ULF|LF/HLFS/ULF,LF/HLFS/ULF', storm: false, ab: {FW: 64}, wiki: 'Brand_in_Raffinerie'},
  'Brand in Reifenlager'           : {mld: 'F3G+GWL|LF/HLFS,LF/HLFS'     , storm: false, ab: {FW: 20}, wiki: 'Brand_in_Reifenlager'},
  'Brand in Schloss'               : {mld: 'F3L|LF/HLFS,LF/HLFS,LF/HLFS' , storm: false, ab: {FW: 20}, wiki: 'Brand_in_Schloss'},
  'Brand in Schule'                : {mld: 'F4L+GWA'                     , storm: false, ab: {FW:  5}, wiki: 'Brand_in_Schule'},
  'Brand in Spedition'             : {mld: 'F4G+DLK|TUIS'                , storm: false, ab: {FW:  5}, wiki: 'Brand_in_Spedition'},
  'Brand in Sporthalle'            : {mld: 'F4+GWA,GWL'                  , storm: false, ab: {FW: 40}, wiki: 'Brand_in_Sporthalle'},
  'Brand in Steinbruch'            : {mld: 'VGSL'                        , storm: false, ab: {MG:  3}, wiki: 'Brand_in_Steinbruch'}, //Verbandsgroßschadenslage
  'Brand in Zugdepot'              : {mld: 'F3L+RW,GWL,GWS|LF/HLFS'      , storm: false, ab: {FW: 10}, wiki: 'Brand_in_Zugdepot'},
  'Brand nach Schweißarbeiten'     : {mld: 'F3L'                         , storm: false, ab: {FW: 30}, wiki: 'Brand_nach_Schweißarbeiten'},
  'Brand-Weihnachtsbaum in Kirche' : {mld: 'F3L'                         , storm: false, ab: {FW:  6}, wiki: 'Brand-Weihnachtsbaum_in_Kirche'},
  'Brennende Bäume'                : {mld: 'F2'                          , storm: false, ab: {FW:  2}, wiki: 'Brennende_B%C3%A4ume'},
  'Brennende Lokomotive'           : {mld: 'F3+GWL'                      , storm: false, ab: {FW: 65}, wiki: 'Brennende_Lokomotive'},
  'Brennende S-Bahn'               : {mld: 'F2+GWS'                      , storm: false, ab: {FW: 20}, wiki: 'Brennende_S-Bahn'},
  'Brennende Telefonzelle'         : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennende_Telefonzelle'},
  'Brennende Windmühle'            : {mld: 'F2+ELW,DLK'                  , storm: false, ab: {FW:  4}, wiki: 'Brennende_Windm%C3%BChle'},
  'Brennender Güterzug (Bahnhof)'  : {mld: 'F3G+GTLF,TUIS'               , storm: false, ab: {FW: 65}, wiki: 'Brennender_G%C3%BCterzug_(Bahnhof)'},
  'Brennender Güterzug (Tunnel)'   : {mld: 'F3TuG+GWL,TUIS'              , storm: false, ab: {FW: 65}, wiki: 'Brennender_Güterzug_(Tunnel)'},
  'Brennender Güterzug'            : {mld: 'F3G+GWL,TUIS'                , storm: false, ab: {FW: 65}, wiki: 'Brennender_G%C3%BCterzug'      },
  'Brennender LKW'                 : {mld: 'F1G+ELW|TUIS'                , storm: false, ab: {FW:  1}, wiki: 'Brennender_LKW'},
  'Brennender Müllwagen'           : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennender_M%C3%BCllwagen'},
  'Brennender Muldenkipper'        : {mld: 'F1+RW,GWL'                   , storm: false, ab: {FW: 70}, wiki: 'Brennender_Muldenkipper'},
  'Brennender PKW'                 : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennender_PKW'},
  'Brennender Personenbus'         : {mld: 'F1Gr+RW|GWL'                 , storm: false, ab: {FW: 70}, wiki: 'Brennender_Personenbus'},
  'Brennender Sicherungskasten'    : {mld: 'F1Gr'                        , storm: false, ab: {FW:  1}, wiki: 'Brennender_Sicherungskasten'},
  'Brennender Wohncontainer'       : {mld: 'F1Gr|ELW'                    , storm: false, ab: {FW: 70}, wiki: 'Brennender_Wohncontainer'},
  'Brennendes Bus-Häuschen'        : {mld: 'F1Gr'                        , storm: false, ab: {FW:  3}, wiki: 'Brennendes Bus-H%C3%A4uschen'},
  'Brennendes Förderband'          : {mld: 'F1Gr'                        , storm: false, ab: {FW:  5}, wiki: 'Brennendes_F%C3%B6rderband'},
  'Brennendes Flugzeug'            : {mld: 'Crash|FLF,FLF'               , storm: false, ab: {BF: 59}, wiki: 'Brennendes_Flugzeug'},
  'Brennendes Gebüsch'             : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennendes_Geb%C3%BCsch'},
  'Brennendes Gras'                : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Brennendes_Gras'},
  'Brennt Anhänger'                : {mld: 'F1Gr'                        , storm: false, ab: {FW:  1}, wiki: 'Brennt_Anh%C3%A4nger'},
  'Brennt Tanklager'               : {mld: 'F5RG+DLK,GWÖl,FwK,TUIS|LF/HLFS/ULF,LF/HLFS/ULF,LF/HLFS/ULF', storm: false, ab: {FW: 64}, wiki: 'Brennt_Tanklager'},
  'Chemieunfall (an Schule)'       : {mld: 'GSG+LF/HLFS,LF/HLFS'         , storm: false, ab: {BF:  2}, wiki: 'Chemieunfall_(an_Schule)'},
  'Chlorgas Alarm (Schwimmbad)'    : {mld: 'GSG+LF/HLFS,LF/HLFS,RW'      , storm: false, ab: {BF:  3}, wiki: 'Chlorgas_Alarm_(Schwimmbad)'},
  'Container Brand'                : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Containerbrand'},
  'Dachstuhlbrand'                 : {mld: 'F2L+LF/HLFS|ELW'             , storm: false, ab: {FW:  3}, wiki: 'Dachstuhlbrand'},
  'Fahrstuhl - Türöffnung'         : {mld: 'TH1'                         , storm: false, ab: {FW: 15}, wiki: 'Fahrstuhl-T%C3%BCr%C3%B6ffnung'},
  'Feldbrand'                      : {mld: 'F1+GWL'                      , storm: false, ab: {FW:  1}, wiki: 'Feldbrand'},
  'Fettbrand in Pommesbude'        : {mld: 'F2+GTLF'                     , storm: false, ab: {FW:  3}, wiki: 'Fettbrand_in_Pommesbude'},
  'Feuer auf Boot (Klein)'         : {mld: 'FB1'                         , storm: false, ab: {BF: 30}, onWater: true, wiki: 'Feuer_auf_Boot_(klein)'},
  'Feuer auf Boot (Mittel)'        : {mld: 'FB2'                         , storm: false, ab: {BF: 45}, onWater: true, wiki: 'Feuer_auf_Boot_(mittel)'},
  'Feuer im Altenheim'             : {mld: 'F4L+GWA'                     , storm: false, ab: {FW:  6}, wiki: 'Feuer_im_Altenheim'},
  'Feuer im Krankenhaus'           : {mld: 'F4G+GWA|LF/HLFS,LF/HLFS,LF/HLFS', storm: false, ab: {BF: 40}, wiki: 'Feuer_im_Krankenhaus'},
  'Feuer im Laubhaufen'            : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Feuer_im_Laubhaufen'},
  'Feuer im Personenzug (Bahnhof)' : {mld: 'F3+GWL'                      , storm: false, ab: {FW: 65}, wiki: 'Feuer_im_Personenzug_(Bahnhof)'},
  'Feuer im Personenzug (Tunnel)'  : {mld: 'F3Tu+GWL'                    , storm: false, ab: {FW: 65}, wiki: 'Feuer_im_Personenzug_(Tunnel)'},
  'Feuer im Personenzug'           : {mld: 'F3S+GWL,GTLF'                , storm: false, ab: {FW: 65}, wiki: 'Feuer_im_Personenzug'},
  'Feuer in Bahnhofshalle'         : {mld: 'F3L+GWA,GWL'                 , storm: false, ab: {FW: 65}, wiki: 'Feuer_in_Bahnhofshalle'},
  'Güterzug entgleist (Bahnhof)'   : {mld: 'TH3SG+LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,FwK,TUIS', storm: false, ab: {FW: 65}, wiki: 'G%C3%BCterzug_entgleist_(Bahnhof)'},
  'Güterzug entgleist (Tunnel)'    : {mld: 'TH3TuG+GWA,TUIS'             , storm: false, ab: {FW: 65}, wiki: 'G%C3%BCterzug_entgleist_(Tunnel)'},
  'Güterzug entgleist'             : {mld: 'TH3S+DLK,GWS,GWG,GWM,FwK,TUIS', storm: false, ab: {FW: 65}, wiki: 'G%C3%BCterzug_entgleist'},
  'Gabelstapler im Hafenbecken'    : {mld: 'THW+LF/HLFS,RW,FwK'          , storm: false, ab: {FW: 40}, wiki: 'Gabelstapler_im_Hafenbecken'},
  'Garagenbrand'                   : {mld: 'F2+GTLF'                     , storm: false, ab: {FW:  4}, wiki: 'Garagenbrand'},
  'Gartenlaubenbrand'              : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Gartenlaubenbrand'},
  'Gas-Explosion'                  : {mld: 'F2L+ELW,GWL'                 , storm: false, ab: {FW: 30}, wiki: 'Gas-Explosion'},
  'Gasaustritt in Fabrik'          : {mld: 'TH3G+DLK,GWL'                , storm: false, ab: {BF: 20}, wiki: 'Gasaustritt_in_Fabrik'},
  'Gastronomiebrand'               : {mld: 'F2+LF/HLFS'                  , storm: false, ab: {FW:  8}, wiki: 'Gastronomiebrand'},
  'Gefahrstoff-Austritt in Firma'  : {mld: 'GSG+LF/HLFS,LF/HLFS,GWA,GWL|LF/HLFS,TUIS', storm: false, ab: {FW: 40, BF: 2}, wiki: 'Gefahrstoff-Austritt_in_Firma' },
  'Gerüsteinsturz'                 : {mld: 'TH1+DLK'                     , storm: false, ab: {FW: 30}, wiki: 'Ger%C3%BCsteinsturz'},
  'Gewerbebrand'                   : {mld: 'F4L+GWA,RW'                  , storm: false, ab: {FW: 35}, wiki: 'Gewerbebrand'},
  'Grasnarbenbrand'                : {mld: 'F1'                          , storm: false, ab: {FW: 59}, wiki: 'Grasnarbenbrand'},
  'Großbrand im Hafen'             : {mld: 'VGSL'                        , storm: false, ab: {MG:  3}, wiki: 'Großbrand_im_Hafen'}, //Verbandsgroßschadenslage
  'Küchenbrand'                    : {mld: 'F1Gr'                        , storm: false, ab: {FW:  2}, wiki: 'K%C3%BCchenbrand'},
  'Kaminbrand'                     : {mld: 'F2L'                         , storm: false, ab: {FW:  5}, wiki: 'Kaminbrand'},
  'Kehrmaschine in Müllbunker'     : {mld: 'THH+DLK,RW'                  , storm: false, ab: {FW: 75}, wiki: 'Kehrmaschine_in_M%C3%BCllbunker'},
  'Keller unter Wasser'            : {mld: 'TH'                          , storm: true,  ab: {FW:  2}, wiki: 'Keller_unter_Wasser'},
  'Kellerbrand'                    : {mld: 'F2'                          , storm: false, ab: {FW:  3}, wiki: 'Kellerbrand'},
  'Kinobrand'                      : {mld: 'F4L+GTLF,GWA|LF/HLFS'        , storm: false, ab: {FW: 10}, wiki: 'Kinobrand'},
  'Kioskbrand'                     : {mld: 'F1Gr'                        , storm: false, ab: {FW:  2}, wiki: 'Kioskbrand'},
  'Kleiner Waldbrand'              : {mld: 'F2|GWL'                      , storm: false, ab: {FW:  1}, wiki: 'Kleiner_Waldbrand'},
  'Kleintier in Not'               : {mld: 'TH'                          , storm: false, ab: {FW:  2}, wiki: 'Kleintier_in_Not'},
  'LKW in Brückengeländer'         : {mld: 'TH2+ELW,DLK,FwK'             , storm: false, ab: {FW:  6}, wiki: 'LKW_in_Brückengel%C3%A4nder'},
  'Mähdrescherbrand'               : {mld: 'F2+GTLF'                     , storm: false, ab: {FW:  5}, wiki: 'M%C3%A4hdrescherbrand'},
  'Mülleimer Brand'                : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'M%C3%BClleimerbrand'},
  'Maschinenbrand'                 : {mld: 'F3+GWL'                      , storm: false, ab: {FW:  5}, wiki: 'Maschinenbrand'},
  'Motorrad-Brand'                 : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Motorradbrand'},
  'Muldenkipper abgerutscht'       : {mld: 'TH3H+FwK'                    , storm: false, ab: {FW: 70}, wiki: 'Muldenkipper_abgerutscht'},
  'PKW in Fluss'                   : {mld: 'THW+RW,FwK'                  , storm: false, ab: {FW: 15}, wiki: 'PKW_in_Fluss'},
  'Person im Fluss'                : {mld: 'THW'                         , storm: false, ab: {BF: 25}, wiki: 'Person_im_Fluss'},
  'Person in Schacht'              : {mld: 'TH'                          , storm: false, ab: {FW:  3}, wiki: 'Person_in_Schacht'},
  'RTZ-Einsatz'                    : {mld: 'RTZ'                         , storm: false, ab: {FW: 65}, wiki: 'RTZ-Einsatz'},
  'Radlader umgekippt'             : {mld: 'TH2+ELW,GWÖl,FwK'            , storm: false, ab: {FW: 70}, wiki: 'Radlader_umgekippt'},
  'Rangierunfall'                  : {mld: 'TH3S+GWÖl'                   , storm: false, ab: {FW: 65}, wiki: 'Rangierunfall'},
  'Scheunenbrand'                  : {mld: 'F3+GWL'                      , storm: false, ab: {FW: 30}, wiki: 'Scheunenbrand'},
  'Schornsteinbrand'               : {mld: 'F2L'                         , storm: false, ab: {FW:  3}, wiki: 'Schornsteinbrand'},
  'Schuppenbrand'                  : {mld: 'F2+GWG,GWM'                  , storm: false, ab: {FW:  4}, wiki: 'Schuppenbrand'},
  'Silobrand'                      : {mld: 'F2+LF/HLFS'                  , storm: false, ab: {FW: 20}, wiki: 'Silobrand'},
  'Sperrmüllbrand'                 : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Sperrm%C3%BCllbrand'},
  'Strohballen Brand'              : {mld: 'F2+GWL'                      , storm: false, ab: {FW:  1}, wiki: 'Strohballen_Brand'},
  'Türöffnung'                     : {mld: 'TÖff'                        , storm: false, ab: {FW:  2}, wiki: 'T%C3%BCr%C3%B6ffnung'},
  'Tagebauarbeiter abgestürzt'     : {mld: 'THH+ELW,RW,DLK'              , storm: false, ab: {FW: 70}, wiki: 'Tagebauarbeiter_abgest%C3%BCrzt'},
  'Tankbrand'                      : {mld: 'F5R+RW,GWÖl,TUIS|LF/HLFS/ULF,LF/HLFS/ULF', storm: false, ab: {FW: 64}, wiki: 'Tankbrand'},
  'Traktorbrand'                   : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Traktorbrand'},
  'Trocknerbrand'                  : {mld: 'F1Gr|LF/HLFS'                , storm: false, ab: {FW:  1}, wiki: 'Trocknerbrand'},
  'Unfall an Bahnübergang'         : {mld: 'TH3S+GWÖl'                   , storm: false, ab: {FW: 65}, wiki: 'Unfall_an_Bahn%C3%BCbergang'},
  'Unfall mit Gefahrgut-Transport' : {mld: 'TH2G+GWA,FwK|TUIS'           , storm: false, ab: {FW: 40, BF: 2}, wiki: 'Unfall_mit_Gefahrgut-Transport'},
  'VU mit Straßenbahn'             : {mld: 'TH3+GWS,FwK|LF/HLFS'         , storm: false, ab: {FW: 20}, wiki: 'VU_mit_Strassenbahn'},
  'Verkehrsunfall'                 : {mld: 'TH1+GWÖl'                    , storm: false, ab: {FW:  4}, wiki: 'Verkehrsunfall'},
  'Verletztentransport'            : {mld: 'RD'                          , storm: false, ab: {FW: 50}, wiki: 'Verletztentransport'},
  'Waldbrand'                      : {mld: 'F3L+GWL'                     , storm: false, ab: {FW: 20}, wiki: 'Waldbrand'},
  'Wassereinbruch'                 : {mld: 'TH'                          , storm: false, ab: {FW: 30}, wiki: 'Wassereinbruch'},
  'Wohnblockbrand'                 : {mld: 'F5+GWA|LF/HLFS,LF/HLFS'      , storm: false, ab: {FW: 45}, wiki: 'Wohnblockbrand'},
  'Wohnungsbrand'                  : {mld: 'F2+LF/HLFS|ELW'              , storm: false, ab: {FW:  2}, wiki: 'Wohnungsbrand'},
  'Wohnwagenbrand'                 : {mld: 'F1'                          , storm: false, ab: {FW:  1}, wiki: 'Wohnwagenbrand'},
};

var StichwortLst = {
/*
  Diese Liste definiert, welche Fahrzeuge in der Grundeinstellung zu den verschiedenen Alarmierungsstichworten geschickt werden.

  Einzelne Fahrzeuge werden durch Komma (,) getrennt, Alternativen durch (/).
  !!!ACHTUNG: HIER KEINE OPTIONALEN FAHRZEUGE (|) EINTRAGEN!!!
  Syntax: Text, Fahrzeuge
*/
  'F1Gr'     :  {txt: 'Feuer, klein',                    vhc: 'LF/HLFS/TS/TLF'},
  'F1'       :  {txt: 'Feuer, klein',                    vhc: 'LF/HLFS/TS/GTLF/TLF/FLF'},
  'F2'       :  {txt: 'Feuer, mittelklein',              vhc: 'LF/HLFS,LF/HLFS/TS/TLF'},
  'F3'       :  {txt: 'Feuer, mittelgroß',               vhc: 'LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW'},
  'F4'       :  {txt: 'Feuer, groß',                     vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW'},
  'F5'       :  {txt: 'Großbrand',                       vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW'},
  'F2L'      :  {txt: 'Feuer, mittelklein, Leiter',      vhc: 'LF/HLFS,LF/HLFS/TS/TLF,DLK'},
  'F3L'      :  {txt: 'Feuer, mittelgroß, Leiter',       vhc: 'LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,DLK'},
  'F4L'      :  {txt: 'Feuer, groß, Leiter',             vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,DLK'},
  'F5L'      :  {txt: 'Großbrand, Leiter',               vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,DLK'},
  'F2LG'     :  {txt: 'Feuer, m.klein, Leiter, GG',      vhc: 'LF/HLFS,LF/HLFS/TS/TLF,DLK,GWM,GWG'},
  'F3LG'     :  {txt: 'Feuer, m.groß, Leiter, GG',       vhc: 'LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,DLK,GWM,GWG'},
  'F4LG'     :  {txt: 'Feuer, groß, Leiter, GG',         vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,DLK,GWM,GWG'},
  'F5LG'     :  {txt: 'Großbrand, Leiter, GG',           vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,DLK,GWM,GWG'},
  'F1G'      :  {txt: 'Feuer, klein, Gefahrgut',         vhc: 'LF/HLFS/TS/TLF,GWM,GWG'},
  'F2G'      :  {txt: 'Feuer, mittelklein, GG',          vhc: 'LF/HLFS,LF/HLFS/TS/TLF,GWM,GWG'},
  'F3G'      :  {txt: 'Feuer, mittelgroß, GG',           vhc: 'LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,RW,GWM,GWG'},
  'F4G'      :  {txt: 'Feuer, groß, Gefahrgut',          vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,RW,GTLF,GWL,GWM,GWG'},
  'F5G'      :  {txt: 'Großbrand, Gefahrgut',            vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,RW,GTLF,GWL,GWM,GWG'},
  'F5R'      :  {txt: 'Großbrand, Raffinerie',           vhc: 'ULF,LF/HLFS/ULF,LF/HLFS/ULF,LF/HLFS/ULF,LF/HLFS/ULF/TS/TLF,ELW'},
  'F5RG'     :  {txt: 'Großbrand, Raffinerie, GG',       vhc: 'ULF,LF/HLFS/ULF,LF/HLFS/ULF,LF/HLFS/ULF,LF/HLFS/ULF/TS/TLF,ELW,RW,GTLF,GWL,GWM,GWG'},
  'F1S'      :  {txt: 'Feuer, klein, Bahn',              vhc: 'LF/HLFS/TS/TLF'},
  'F2S'      :  {txt: 'Feuer, mittelklein, Bahn',        vhc: 'LF/HLFS,LF/HLFS'},
  'F3S'      :  {txt: 'Feuer, mittelgroß, Bahn',         vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,ELW'},
  'F4S'      :  {txt: 'Feuer, groß, Bahn',               vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,ELW'},
  'F3SG'     :  {txt: 'Feuer, mittelgroß, Bahn, GG',     vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,ELW,GWG,GWM'},
  'F4SG'     :  {txt: 'Feuer, groß, Bahn, GG',           vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,ELW,GWG,GWM'},
  'F1Tu'     :  {txt: 'Feuer, klein, Tunnel',            vhc: 'HLFS'},
  'F2Tu'     :  {txt: 'Feuer, mittelklein, Tunnel',      vhc: 'HLFS,HLFS'},
  'F3Tu'     :  {txt: 'Feuer, mittelgroß, Tunnel',       vhc: 'HLFS,HLFS,HLFS,ELW'},
  'F4Tu'     :  {txt: 'Feuer, groß, Tunnel',             vhc: 'HLFS,HLFS,HLFS,HLFS,ELW'},
  'F3TuG'    :  {txt: 'Feuer, mittelgroß, Tunnel, GG',   vhc: 'HLFS,HLFS,HLFS,ELW,GWG,GWM'},
  'F4TuG'    :  {txt: 'Feuer, groß, Tunnel, GG',         vhc: 'HLFS,HLFS,HLFS,HLFS,ELW,GWG,GWM'},
  'TÖff'     :  {txt: 'Türöffnung',                      vhc: 'LF/HLFS/TS/TLF'},
  'TH'       :  {txt: 'einf. techn. Hilfeleistung',      vhc: 'LF/HLFS/TS/TLF'},
  'TH1'      :  {txt: 'techn. Hilfeleistung',            vhc: 'RW,LF/HLFS/TS/TLF'},
  'TH2'      :  {txt: 'erw. techn. Hilfeleistung',       vhc: 'RW,LF/HLFS,LF/HLFS/TS/TLF'},
  'TH3'      :  {txt: 'große techn. Hilfeleistung',      vhc: 'ELW,RW,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF'},
  'THW'      :  {txt: 'techn. Hilfel. - Wasserrettung',  vhc: 'LF/HLFS/TS/TLF,GWT'},
  'TH2G'     :  {txt: 'erw. techn. Hilfel., GG',         vhc: 'LF/HLFS,LF/HLFS/TS/TLF,ELW,RW,GWG,GWM'},
  'TH3G'     :  {txt: 'gr. techn. Hilfel., GG',          vhc: 'LF/HLFS,LF/HLFS/TS/TLF,LF/HLFS/TS/TLF,ELW,RW,GWG,GWM'},
  'THS'      :  {txt: 'einf. techn. Hilfel., Bahn',      vhc: 'LF/HLFS/TS/TLF'},
  'TH2S'     :  {txt: 'erw. techn. Hilfel., Bahn',       vhc: 'LF/HLFS,LF/HLFS/TS/TLF'},
  'TH3S'     :  {txt: 'große techn. Hilfel., Bahn',      vhc: 'LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,RW,GWS'},
  'THSG'     :  {txt: 'einf. techn. Hilfel., Bahn, GG',  vhc: 'LF/HLFS/TS/TLF,GWG,GWM'},
  'TH2SG'    :  {txt: 'erw. techn. Hilfel., Bahn, GG',   vhc: 'LF/HLFS,LF/HLFS/TS/TLF,GWG,GWM'},
  'TH3SG'    :  {txt: 'große techn. Hilfel., Bahn, GG',  vhc: 'LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF,ELW,RW,GWS,GWG,GWM'},
  'THTu'     :  {txt: 'einf. techn. Hilfel., Tunnel',    vhc: 'HLFS'},
  'TH2Tu'    :  {txt: 'erw. techn. Hilfel., Tunnel',     vhc: 'HLFS,HLFS'},
  'TH3Tu'    :  {txt: 'große techn. Hilfel., Tunnel',    vhc: 'HLFS,HLFS,HLFS,ELW,RW,GWS'},
  'THTuG'    :  {txt: 'einf. techn. Hilfel., Tunnel, GG',vhc: 'HLFS,GWG,GWM'},
  'TH2TuG'   :  {txt: 'erw. techn. Hilfel., Tunnel, GG', vhc: 'HLFS,HLFS,GWG,GWM'},
  'TH3TuG'   :  {txt: 'große techn. Hilfel., Tunnel, GG',vhc: 'HLFS,HLFS,HLFS,ELW,RW,GWS,GWG,GWM'},
  'THH'      :  {txt: 'techn. Hilfel. - Höhenrettung',   vhc: 'LF/HLFS/TS/TLF,GWH'},
  'TH2H'     :  {txt: 'erw. techn. Hilfel., Höhenr.',    vhc: 'LF/HLFS,LF/HLFS/TS/TLF,GWH'},
  'TH3H'     :  {txt: 'gr. techn. Hilfel., Höhenr.',     vhc: 'LF/HLFS,LF/HLFS/TS/TLF,LF/HLFS/TS/TLF,GWH,ELW'},
  'RTZ'      :  {txt: 'Rettungszug',                     vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS'},
  'GSG'      :  {txt: 'Gefahrguteinsatz',                vhc: 'LF/HLFS/TS/TLF,ELW,GWM,GWG'},
  'GfAus'    :  {txt: 'Gefahrstoffaustritt',             vhc: 'TUIS'},
  'Crash'    :  {txt: 'brennt Flugzeug',                 vhc: 'FLF,FLF,FLF,FLF,FLF,FLF/LF/HLFS/TS/TLF,RTr,ELW,GWG,GWM,RW,GWÖl'},
  'VGSL'     :  {txt: 'Verbandsgroßschadenslage',        vhc: 'LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS,LF/HLFS/TS/TLF'},
  'FB1'      :  {txt: 'Feuer auf Boot',                  vhc: 'FLB'},
  'FB2'      :  {txt: 'Feuer auf Schiff',                vhc: 'FLB,FLB'},
  // Rettungsmittel wird über Script ermittelt
  'RD'       :  {txt: 'Verletztentransport',             vhc: ''},
};

var FahrzeugeLst = {
/*
  Hier werden die verfügbaren Fahrzeuge mit ihrer Beschreibung, Zusatzwerten wie Geschwindigkeit und der Zuordnung zu einer Fahrzeugklasse aufgelistet.

  Syntax: Fahrzeugklasse, Geschwindigkeit, Löschgruppenfahrzeug (und KLF), benötigt Ausbildung, RegExp-Ausdruck für Nachforderungssuche, Wiki-Seite
  Löschgruppenfahrzeug: für die Steuerung, ob zuerst Truppfahrzeuge besetzt werden sollen
  benötigt Ausbildung : für die Steuerung, ob zuerst Sonderfahrzeuge mit ausgebildeter Besatzung ausrücken sollen
  RegExp-Ausdruck     : wird benötigt, wenn man später mal die Fahrzeugklasse anpassen kann, da dies Auswirkung auf das nachfolgende FhzGruppeLst hat
*/
  'Kleinlöschfahrzeug' : {id: 14, grp: 'LF',   speed: 60, groupVeh: true, regex: /Kleinlöschfahrzeug/, wiki: 'Kleinl%C3%B6schfahrzeug'},
  'LF 8'               : {id:  9, grp: 'LF',   speed: 48, groupVeh: true, regex: /LF 8/, wiki: 'LF_8'},
  'LF 10'              : {id: 31, grp: 'LF',   speed: 58, groupVeh: true, regex: /LF 10[^/]/, wiki: 'LF_10'},
  'LF 10/6'            : {id:  1, grp: 'LF',   speed: 58, groupVeh: true, regex: /LF 10\/6/, wiki: 'LF_10/6'},
  'LF 20'              : {id: 30, grp: 'LF',   speed: 60, groupVeh: true, regex: /LF 20[^/]/, wiki: 'LF_20'},
  'LF 20/16'           : {id:  6, grp: 'LF',   speed: 60, groupVeh: true, regex: /LF 20\/16/, wiki: 'LF_20/16'},
  'HLF 10/6'           : {id: 24, grp: 'LF',   speed: 58, groupVeh: true, regex: /HLF 10\/6/, wiki: 'HLF_10/6'},
  'HLF 20/16'          : {id: 23, grp: 'LF',   speed: 60, groupVeh: true, regex: /HLF 20\/16/, wiki: 'HLF_20/16'},
  'HLF 24/14-S'        : {id: 28, grp: 'HLFS', speed: 60, trainable: true , groupVeh: true, regex: /HLF 24\/14-S/, wiki: 'HLF_24/14-S'},
  'LF 16-TS'           : {id:  2, grp: 'TS',   speed: 52, groupVeh: true, regex: /LF 16-TS/, wiki: 'LF_16-TS'},
  'DLA (K) 23/12'      : {id:  4, grp: 'DLK',  speed: 63, regex: /Drehleiter|DLA [(]K[)] 23\/12/, wiki: 'DLA_(K)_23/12'},
  'RW'                 : {id: 11, grp: 'RW',   speed: 49, regex: /Rüstwagen|RW/, wiki: 'RW'},
  'GW-Öl'              : {id:  5, grp: 'GWÖl', speed: 51, regex: /GW-Öl/, wiki: 'GW-%C3%96l'},
  'GW-L2 - Wasser'     : {id:  8, grp: 'GWL',  speed: 53, regex: /GW\s?-\s?L2\s?[-]?\s?Wasser/, wiki: 'GW-L2_Wasser'},
  'ELW 1'              : {id:  3, grp: 'ELW',  speed: 77, regex: /ELW 1/, wiki: 'ELW_1'},
  'GW-A'               : {id: 10, grp: 'GWA',  speed: 56, regex: /GW-A/, wiki: 'GW-A'},
  'TLF 16/25'          : {id: 27, grp: 'TLF',  speed: 55, regex: /TLF 16\/25/, wiki: 'TLF_16/25'},
  'TLF 20/40 - SL'     : {id:  7, grp: 'GTLF', speed: 49, regex: /TLF 20\/40 - SL/, wiki: 'TLF_20/40_SL'},
  'GW-Schiene'         : {id: 16, grp: 'GWS',  speed: 57, regex: /GW-Schiene/, wiki: 'GW-Schiene'},
  'Kran'               : {id: 18, grp: 'FwK',  speed: 55, regex: /Kran/, wiki: 'Kran'},
  'GW-Messtechnik'     : {id: 12, grp: 'GWM',  speed: 40, trainable: true , regex: /GW-Messtechnic?k/, wiki: 'GW-M'},
  'GW-Gefahrgut'       : {id: 13, grp: 'GWG',  speed: 46, trainable: true , regex: /GW-Gefahrgut/, wiki: 'GW-G'},
  'RTW'                : {id: 15, grp: 'RTW',  speed: 75, trainable: true , regex: /RTW/, wiki: 'RTW'},
'Notarzteinsatzfahrzeug': {id: 29, grp: 'NEF',  speed: 80, trainable: true , regex: /NEF/, wiki: 'NEF'},
  'GW-Taucher'         : {id: 17, grp: 'GWT',  speed: 62, trainable: true , regex: /GW-Taucher/, wiki: 'GW-T'},
  'GW-TUIS'            : {id: 25, grp: 'TUIS', speed: 73, trainable: true , regex: /GW-TUIS/, wiki: 'GW-TUIS'},
  'ULF mit Löscharm'   : {id: 26, grp: 'ULF',  speed: 40, regex: /ULF mit Löscharm|ULF/, wiki: 'ULF_mit_L%C3%B6scharm'},
'Flugfeldlöschfahrzeug': {id: 19, grp: 'FLF',  speed: 110, trainable: true , regex: /Flugfeldlöschfahrzeug/, wiki: 'Flugfeldl%C3%B6schfahrzeug'},
  'Rettungstreppe'     : {id: 20, grp: 'RTr',  speed: 65, trainable: true , regex: /Rettungstreppe/, wiki: 'Rettungstreppe'},
  'GW-Höhenrettung'    : {id: 32, grp: 'GWH',  speed: 55, trainable: true , regex: /GW-Höhenrettung/, wiki: 'GW-Höhenrettung'},
  'Wechsellader'       : {id: 33, grp: 'WLF',  speed: 54, trainable: false, regex: /Wechsellader/, wiki: 'WLF'},
  'Feuerlöschboot'     : {id: 21, grp: 'FLB',  speed: 60, trainable: true ,  regex: /Feuerlöschboot/, wiki: 'Loeschboot'},
  'Rettungsboot'       : {id: 22, grp: 'RTB',  speed: 60, trainable: true ,  regex: /Rettungsboot/, wiki: 'Rettungsboot'},
};

// RegExp zur Suche nach nachzufordernden Fahrzeugen, Reihenfolge in Anzeigen
// da die Schlüssel intern im Script z.T. benutzt werden, sollte man sie nicht umbenennen
var FhzGruppeLst = {
  'RTW' : {text: 'Rettungswagen',           seq:  1, ab: {BF: 10}, type: 'RTM'},
  'NEF' : {text: 'Notarzteinsatzfahrzeug',  seq: 24, ab: {BF: 20}, type: 'NEF'},
  'KLF' : {text: 'Kleinlöschfahrzeug',      seq:  2},
  'LF'  : {text: 'Löschgruppenfahrzeug',    seq:  3, type: 'LF'},
  'HLF' : {text: 'Hilfeleistungslöschgruppenfahrzeug', seq:  4},
  'TS'  : {text: 'LF mit Tragkraftspritze', seq:  5},
  'TLF' : {text: 'Tanklöschfahrzeug',       seq:  6, type: 'TLF', ab: {FW:  1}},
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
  'GWH' : {text: 'Gerätewagen Höhenrettung', seq: 25, ab: {BF: 70}},
  'TUIS': {text: 'Gerätewagen Transport-Unfall-Informationssystem', seq: 20, ab: {FW: 64}},
  'ULF' : {text: 'Universallöschfahrzeug',  seq: 21, ab: {FW: 64}},
  'FLF' : {text: 'Flugfeldlöschfahrzeug',   seq: 22, ab: {BF: 59}},
  'WLF' : {text: 'Wechselladerfahrzeug',    seq: 26, type: 'WLF'},
  'RTr' : {text: 'Rettungstreppe',          seq: 23, ab: {BF: 59}},
  'FLB' : {text: 'Feuerlöschboot',          seq:  1, ab: {BF: 30}, onWater: true},
  'RTB' : {text: 'Rettungsboot',            seq:  2, ab: {FW: 50}, type: 'RTM', onWater: true},
};

var FhzTypeLst = {
  'LF' : {isLF: true},
  'RTM': {},
  'NEF': {},
  'TLF': {isLF: true},
  'WLF': {hasContainer: true},
};

var ContainerLst = {
  'ohne'   : {id: -1, text: 'unbeladen'},
  'AB-Öl'  : {id:  1, text: 'Ölschaden', actAs: '5', wiki: 'AB-Oel'},
  'AB-Rüst': {id:  2, text: 'Rüstmaterial', actAs: '11', wiki: 'AB-Ruest'},
  'AB-Atemschutz': {id:  3, text: 'Atemschutz', actAs: '10', wiki: 'AB-Atemschutz'},
  'AB-Einsatzleitung': {id:  4, text: 'Einsatzleitung', wiki: 'AB-Einsatzleitung'},
  'AB-Wasserförderung': {id:  5, text: 'Wasserförderung', actAs: '8', wiki: 'AB-Wasserf%C3%B6rderung'},
};

/* Einstellungsoptionen
   folgende Typen werden unterstützt:
   siehe Konstante: OptType
*/
var OptionLst = {
'global': {
   text: 'globale Einstellungen',
   opt: {
  showMainInformation       : {valDef: true,  text: 'InfoBox mit allgemeine Informationen anzeigen'},
  setInfoBoxRight           : {valDef: false, text: 'InfoBox rechts anzeigen'},
  checkForUpdates           : {valDef: true,  text: 'auf Updates prüfen'},
  dispStichwortColour       : {valDef: 'red', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe des Alarmierungsstichworts'},
  tooltipOnStationLink      : {valDef: true,  text: 'Tooltip-Information an Link zu Feuerwachen'},
  condenseVehicles          : {valDef: true,  text: 'Fahrzeuge zusammenfassen (LF, LF => 2LF)'},
  limit2neededVehicleGroups : {valDef: true,  text: 'nur nach Wachenanzahl benötigte Fahrzeuge anzeigen (z.B. DLK ab 3 FW)'},
  sortVehiclesByClass       : {valDef: true,  text: 'Fahrzeugliste nach Klassenreihenfolge sortieren'},
  manualOutOfService        : {valDef: 'XXX', type: OptType.string,  length: 3, valChkFunc: chkFunc.limAlphaNum, text: 'Text für Fahrzeug manuell außer Dienst stellen'},
  assignLF16TSToGrpLF       : {valDef: false, text: 'LF 16-TS in Gruppe LF führen'},
  assignTLF16ToGrpLF        : {valDef: false, text: 'TLF16/25 in Gruppe LF führen'},
  disableSelectionDueToStorm: {valDef: false, text: 'Unwettermodus'},
  reducedSelectionVehicles  : {valDef: 'LF/HLFS/TS/RW/GTLF/TLF', type: OptType.string,  length: 50, valChkFunc: chkFunc.redSelVhc, text: 'Fahrzeug(e) für Unwettermodus'},
  reducedSelOptVehicles     : {valDef: '', type: OptType.string,  length: 50, valChkFunc: chkFunc.redSelVhc, text: 'optionale Fahrzeug(e) für Unwettermodus'},
  highlightUser             : {valDef: true,  text: 'Eigenen Namen in Toplisten hervorheben'},
  colorRemainingTimeBar     : {valDef: true,  text: 'farbige Anzeige der Restlaufzeit (nur altes Design)'},
  adjustMenus               : {valDef: true,  text: 'Menüs anpassen'},
  highlightOrder            : {valDef: true,  text: 'Eigenen Einsatzauftrag hervorheben'},
  highlightOrderColor       : {valDef: 'green', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe des eigenen Einsatzauftrags'},
  highlightOrderBlink       : {valDef: true,  text: 'Blinkender Text beim eigenen Einsatzauftrag'},
  highlightVBOrder          : {valDef: true,  text: 'Verbandseinsatzaufträge hervorheben'},
  highlightVBOrderColor     : {valDef: 'blue', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der Verbandseinsatzaufträge'},
  highlightWorlds           : {valDef: true,  text: 'Welten durch Farbhervorhebung unterscheiden'},
  highlightWorldColor_1     : {valDef: 'green', type: OptType.colList, list: ColorLst, text: 'Farbe der Welt 1'},
  highlightWorldColor_2     : {valDef: 'blue', type: OptType.colList, list: ColorLst, text: 'Farbe der Welt 2'},
}},
'eList': {
   text: 'Einsatzliste',
   opt: {
  showInfoKlasseInListe  : {valDef: true,  text: 'Alarmierungsstichwort anzeigen'},
  showInfoLangtextListe  : {valDef: true,  text: 'Langtext zum Alarmierungsstichwort anzeigen'},
  showInfoVehiclesInListe: {valDef: true,  text: 'gemäß Alarmierungsstichwort zu alarmierende Fahrzeuge anzeigen'},
  alignInfoKlasseToRight : {valDef: true,  text: 'Einsatzart/Fahrzeuge rechtsbündig ausrichten'},
}},
'eInfo': {
   text: 'Einsatzanzeige',
   opt: {
  addWikiLink               : {valDef: true,  text: 'Einsatzmeldung mit Wiki-Link versehen'},
  showStandardAAO           : {valDef: false, text: 'zeige FW.net AAO-Liste '},
  showMoveSeqSelInFacts     : {valDef: false, text: "Auswahl Abmarschreihenfolge im Abschnitt 'Rückmeldungen und Fakten' zeigen"},
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
  callNEFWithInjured        : {valDef: 3,     type: OptType.integer, length: 3, valChkFunc: chkFunc.limTime, text: 'NEF ab x Verletzte automatisch mit alarmieren (0 = nie)'},
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
'pList': {
   text: 'Personalliste',
   opt:{
  defaultTabSort         : {valDef: 'none', type: OptType.list, text: 'Standard-Sortierung',
                            list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  useMotivationColourCode: {valDef: true,  text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCode   : {valDef: true,  text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCode  : {valDef: true,  text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCode     : {valDef: true,  text: 'Schicht farblich hervorheben'},
  useStatusColourCode    : {valDef: true,  text: 'Status farblich hervorheben'},
}},
'school': {
   text: 'Schule',
   opt: {
  defaultTabSortSchool       : {valDef: 'none', type: OptType.list, text: 'Standard-Sortierung',
                                list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  removesNonSelectablesSchool: {valDef: true,  text: 'Nicht wählbare Mannschaft ausblenden'},
  useMotivColourCodeSchool   : {valDef: true,  text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCodeSchool : {valDef: true,  text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCodeSchool: {valDef: true,  text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCodeSchool   : {valDef: true,  text: 'Schicht farblich hervorheben'},
}},
'training': {
   text: 'Übungsgelände',
   opt: {
  defaultTabSortTraining       : {valDef: 'none', type: OptType.list, text: 'Standard-Sortierung',
                                list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  removesNonSelectablesTraining: {valDef: true,  text: 'Nicht wählbare Mannschaft ausblenden'},
  'removes100%Training'        : {valDef: true,  text: 'Mannschaft mit 100% ausblenden'},
  useMotivColourCodeTraining   : {valDef: true,  text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCodeTraining : {valDef: true,  text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCodeTraining: {valDef: true,  text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCodeTraining   : {valDef: true,  text: 'Schicht farblich hervorheben'},
}},
'fList': {
   text: 'Fahrzeugliste',
   opt: {
  showSummaryVehicleList  : {valDef: true,  text: 'Fahrzeugliste am Kopf der Seite zeigen (zusätzlich)'},
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
'fInfo': {
   text: 'Fahrzeuganzeige',
   opt: {
  dispStatusAsFMSDisplayFI: {valDef: true,  text: 'Status als FMS-Gerät anzeigen'},
  dispFMSDisplayLinesFI   : {valDef: '3',   type: OptType.list, list: FMSlineArr, text: 'Zeilenanzahl der Statusgeberknöpfe'},
}},
'wList': {
   text: 'Wachenliste',
   opt: {
  useOriginalVhcColorScheme: {valDef: false, text: 'Farbgestaltung für Fahrzeugbedarf im Original benutzen'},
  imgStationList           : {valDef: 'normal', type: OptType.radio,  text: 'Graphiken in Liste',
                              list: {'normal':'normale Graphik', 'small':'kleine Graphik', 'none':'Graphik nicht anzeigen'}},
  highlightManning         : {valDef: true,  text: 'prozentuale Sollstärke hervorheben'},
}},
'gList': {
   text: 'Gebäudeliste',
   opt: {
  imgBuildingList: {valDef: 'normal', type: OptType.radio,  text: 'Graphiken in Liste',
                    list: {'normal':'normale Graphik', 'small':'kleine Graphik', 'none':'Graphik nicht anzeigen'}},
}},
'lList': {
   text: 'Log',
   opt: {
  summarizeLog  : {valDef: true,  text: 'Zusammenfassung des Logs erstellen'},
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
};

// besondere Örtlichkeiten auf der Karte
var locationLst = {
  // Sonderbebauung zuerst
  'Hafenbecken': {text: 'Hafenbecken', from: {x:  99, y: 199}, to: {x: 100, y: 200}, onWater: true},
  'Hafen': {text: 'Hafen', from: {x:  98, y: 198}, to: {x: 100, y: 200}},
  'Flughafen': {text: 'Flughafen', from: {x:  83, y: 179}, to: {x:  84, y: 180}},
  'Raffinerie': {text: 'Raffinerie', from: {x:   6, y: 176}, to: {x:   7, y: 176}},
  'BahnlinieW': {text: 'Bahnlinie, westlich', from: {x:   1, y: 152}, to: {x:  50, y: 152}},
  'BahnlinieO': {text: 'Bahnlinie, östlich', from: {x:  51, y: 152}, to: {x: 100, y: 152}},
  'Tunnel4': {text: 'Tunnel', from: {x:  69, y: 152}, to: {x:  75, y: 152}},
  'Tunnel3': {text: 'Tunnel', from: {x:  30, y: 152}, to: {x:  36, y: 152}},
  'Tunnel2': {text: 'Tunnel', from: {x:  17, y: 152}, to: {x:  23, y: 152}},
  'Tunnel1': {text: 'Tunnel', from: {x:   2, y: 152}, to: {x:   7, y: 152}},
  'Bahnhof': {text: 'Bahnhof', from: {x:  50, y: 152}, to: {x:  51, y: 152}},
  'Tagebau': {text: 'Tagebau', from: {x:  17, y: 129}, to: {x:  20, y: 132}},
  'Kraftwerk': {text: 'Kohlekraftwerk', from: {x:  25, y: 130}, to: {x:  25, y: 131}},
  'Förderband': {text: 'Förderband', from: {x:  19, y: 131}, to: {x:  24, y: 131}},
  'MVA'    : {text: 'Müllverbrennungsanlage', from: {x:  88, y: 124}, to: {x:  88, y: 125}},
  'Großbaustelle': {text: 'Großbaustelle', tcol : 'white', bcol : 'blue', from: {x:  76, y:  18}, to: {x:  76, y:  18}},
  // 'normale' Bereiche
  'Sperrgebiet': {text: 'Sperrgebiet', from: {x:   1, y: 101}, to: {x: 100, y: 121}},
  'Altstadt': {text: 'Altstadt', from: {x:   1, y:   1}, to: {x: 100, y: 100}},
  'Neustadt': {text: 'Neustadt', tcol : 'green', from: {x:   1, y: 101}, to: {x: 100, y: 200}},
};

// Syntax: Hintergrundfarbe Personalstatus
var personalStatusLst = {
  'Beim Einsatz'           : {tcol : '#FF0000', onDuty: true , ready: true , inSchool: false, text : 'im Einsatz'},
  'Einsatzbereit'          : {tcol : ((conf.isNewLayout())?'darkgreen':'green'), onDuty: true , ready: true , inSchool: false, text : 'bereit'},
  'Frei - nicht im Dienst' : {tcol : '#777777', onDuty: false, ready: false, inSchool: false, text : 'frei'},
  'In der Feuerwehrschule' : {tcol : '#5555FF', onDuty: false, ready: false, inSchool: true , text : 'Schule'},
};

// Ausbildungen: soll für die Lehrgangsseite benutzt werden
// Syntax: RegExp-Ausdruck, ID des checkbox-Elementes, Hintergrundfarbe in Mannschaftsübersicht
var trainingLst = {
  'ohne'              : {internal: true, cboxid: '', tcol: {light:'', black:''}, bcol: {light:'', black:''}, text: 'ohne Ausbildung', ktext: 'oA'},
  '{unbekannt}'       : {internal: true, cboxid: '', tcol: {light:'', black:''}, bcol: {light:'', black:''}, text: 'unbekannte Ausbildung', ktext: 'uA'},
  'Gefahrgut'         : {cboxid: 'education_type_1', tcol: {light:'brown', black:'yellow'}, bcol: {light:'brown', black:'yellow'}, text: 'Gefahrgut', ktext: 'GG'},
  'Rettungsassistent' : {cboxid: 'education_type_2', tcol: {light:'red', black:'white'},  bcol: {light:'red', black:'white'}, text: 'Rettungsassistent', ktext: 'RA'},
  'Taucher'           : {cboxid: 'education_type_3', tcol: {light:'blue', black:'blue'},   bcol: {light:'blue', black:'blue'}, text: 'Taucher', ktext: 'Ta'},
  'Flughafen'         : {cboxid: 'education_type_4', tcol: {light:'teal', black:'teal'},   bcol: {light:'teal', black:'teal'}, text: 'Flughafen', ktext: 'Fg'},
  'Löschboot'         : {cboxid: 'education_type_5', tcol: {light:'darkblue', black:'lightblue'}, bcol: {light:'darkblue', black:'lightblue'}, text: 'Löschboot', ktext: 'LB'},
  'Rettungsboot'      : {cboxid: 'education_type_6', req: 'Rettungsassistent', tcol: {light:'orange', black:'orange'}, bcol: {light:'orange', black:'orange'}, text: 'Rettungsboot', ktext: 'RB'},
  'TUIS'              : {cboxid: 'education_type_7', req: 'Gefahrgut', tcol: {light:'orangered', black:'orangered'},  bcol: {light:'orangered', black:'orangered'}, text: 'Technisches Unfallinformationssystem', ktext: 'TU'},
  '2-Wege-Führerschein': {cboxid: 'education_type_8', tcol: {light:'darkgreen', black:'lightgreen'}, bcol: {light:'darkgreen', black:'lightgreen'}, text: '2-Wegeführerschein', ktext: '2W'},
  'Rettungszug'       : {cboxid: 'education_type_9', req: 'Rettungsassistent', tcol: {light:'purple', black:'purple'}, bcol: {light:'purple', black:'purple'}, text: 'Rettungszug', ktext: 'RZ'},
  'Höhenrettung'      : {cboxid: 'education_type_10', tcol: {light:'darkred', black:'darkred'}, bcol: {light:'darkred', black:'darkred'}, text: 'Höhenrettung', ktext: 'HR'},
};

var conditionLst = {
  'FW' : {textSgl: 'Feuerwache', textPl: 'Feuerwachen'},
  'BF' : {textSgl: 'Berufsfeuerwehr', textPl: 'Berufsfeuerwehren'},
  'MG' : {textSgl: 'Verbandsspieler', textPl: 'Verbandsspielern'},
  'Std': {textSgl: 'Stadterweiterung'},
  'Bhf': {textSgl: 'Bahnhof'},
  'Tag': {textSgl: 'Tagebau'},
  'MVA': {textSgl: 'Müllverbrennung'},
};

// Syntax: Textfarbe in Mannschaftsübersicht
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner der Motivation des Kameraden ist.
var motivationLst = {
  90 : {tcol: '#228B22'},
  76 : {tcol: '#32CD32'},
  51 : {tcol: '#66FF66'},
  26 : {tcol: ((conf.isNewLayout())?'peru':'#FFD700')},
  11 : {tcol: '#FF6666'},
   0 : {tcol: '#B22222'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
};

// Syntax: Textfarbe in Mannschaftsübersicht
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner der Fähigkeit des Kameraden ist.
var abilityLst = {
  90 : {tcol: '#228B22'},
  76 : {tcol: '#32CD32'},
  51 : {tcol: '#66FF66'},
  26 : {tcol: ((conf.isNewLayout())?'peru':'#FFD700')},
  11 : {tcol: '#FF6666'},
   0 : {tcol: '#B22222'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
};

// Syntax: Textfarbe der prozentualen Mannschaftsstärke einer BF
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner als die Mannschaftsstärke der BF ist.
var staffingLst = {
 100 : {tcol: 'green'},
  90 : {tcol: 'lime'},
  75 : {tcol: ((conf.isNewLayout())?'peru':'yellow')},
  50 : {tcol: 'orange'},
  25 : {tcol: 'brown'},
   0 : {tcol: 'red'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
};

var shiftLst = {
  1 : {tcol: '#FFA500'},
  2 : {tcol: '#1E90FF'},
  3 : {tcol: '#FF1493'},
};

var sections = {
  'free_vehicle'     : {free: true},
  'mission_vehicle'  : {onTheMove: true},
  'driving_vehicle'  : {onTheMove: true},
  'waiting_vehicle'  : {atScene: true},
  'mission_container': {atScene: true}
};

var menus = {
  config : {link: '/ereglamsAAOConfig', text: 'Optionen'},
  mld    : {link: '/ereglamsAAO/Einsaetze', text: 'Meldungen'},
  stw    : {link: '/ereglamsAAO/Stichworte', text: 'Stichworte'},
  fhz    : {link: '/ereglamsAAO/Fahrzeuge', text: 'Fahrzeuge'},
  fGrp   : {link: '/ereglamsAAO/Fahrzeuggruppen', text: 'Fhz-Gruppen'},
};

/* ******************************************************************************************
  H I N W E I S !!
  aber hier sollte nur Derjenige Änderungen vornehmen, der weis, was er tut!!!
*/
/*********************************************************************************
hier gehts mit dem Programm los
*********************************************************************************/
// aber nur, wenn es auch das Container-Element gibt
if ($('container')) {
  try {
    if (!conf) {
      throw 'Configuration object not created';
    };

    conf.init({
       url: { update: UPDATEURL,
              install: INSTALLURL,
              meta: METAURL,
       },
       opt: OptionLst,
       fhz: FahrzeugeLst,
       grp: FhzGruppeLst,
       cnt: ContainerLst,
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

    (function(iConf) {
      var fhz = iConf.getFhz('TLF 16/25');
      if (iConf.getOptVal('assignTLF16ToGrpLF') && fhz && fhz.getGrp().getName() !== iConf.specFGrp.lf.getName()) {
        fhz.setGrp(iConf.specFGrp.lf);
      }
      fhz = iConf.getFhz('LF 16-TS');
      if (iConf.getOptVal('assignLF16TSToGrpLF') && fhz && fhz.getGrp().getName() !== iConf.specFGrp.lf.getName()) {
        fhz.setGrp(iConf.specFGrp.lf);
      }
    }(conf));

    main = new mainCls(conf);
    main.init();
    // writeStr(conf.write());
  } catch(e) {
    errLog.addVarMsg('Initialising script', e);
    setMsg(errLog);
    errLog.refresh();
  };

  try {
    errLog.refresh();

    main.main();
    unsafeWindow.ereglamData = {};
    unsafeWindow.ereglamData.conf = conf;
  } catch(e) {
    errLog.addVarMsg('running main function', e);
    setMsg(errLog);
    errLog.refresh();
  };
}

/*********************************************************************************
Funktionen
*********************************************************************************/
// Feuerwachenliste anzeigen
function displayStationList() {
  var nodeTable = xPath.getSingle("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Bezeichnung']", 'content');
  var columns = getColumns(nodeTable);

  // Anzahl Wachen und Stufen ermitteln
  var evalTRs = xPath.getNodes("./tbody/tr", nodeTable);
  var node2Station = {};

  conf.stationList.refresh();
  for (var i = 0; i < evalTRs.snapshotLength;i++) {
    var station = new stationCls(evalTRs.snapshotItem(i), columns);
    xPath.getSingle("./td[2]", evalTRs.snapshotItem(i)).title = station.write().replace(/\n/g, ', ');
    conf.stationList.addStation(station);
    node2Station[i] = station;
  }
  conf.stationList.serialize();

  // Statistiken erweitern/ergänzen
  var nodeTBody = xPath.getSingle("./table[@class='defaultTable' and descendant::tbody/tr/td[1]/text()='Anzahl Gebäude:']/tbody[1]", 'content');
  if (nodeTBody) {
    var rowCnt = 1;
    // Fahrzeuge
    var row = new tableRowCls({'class': 'row'+(rowCnt++)%2});
    var cell = row.getNewCell();
    cell.addText('Fahrzeuge');
    cell = row.getNewCell();
    cell.addText(conf.stationList.getCntFhz(true));
    cell.addText(' von maximal ' + conf.stationList.getCntMaxFhz(true));
    // RTW
    if (conf.stationList.getCntRTW() > 0) {
      nodeTBody.appendChild(row.getDOM());
      row = new tableRowCls({'class': 'row'+(rowCnt++)%2});
      cell = row.getNewCell();
      cell.addText('>> davon Rettungswagen');
      cell = row.getNewCell();
      cell.addText(conf.stationList.getCntRTW());
      nodeTBody.appendChild(row.getDOM());
      cell.addText(' von maximal ' + conf.stationList.getCntMaxRTW());
    }
    // NEF
    if (conf.stationList.getCntNEF() > 0) {
      nodeTBody.appendChild(row.getDOM());
      row = new tableRowCls({'class': 'row'+(rowCnt++)%2});
      cell = row.getNewCell();
      cell.addText('>> davon Notarztfahrzeuge');
      cell = row.getNewCell();
      cell.addText(conf.stationList.getCntNEF());
      nodeTBody.appendChild(row.getDOM());
      cell.addText(' von maximal ' + conf.stationList.getCntMaxNEF());
    }
    // Abrollbehälter
    if (conf.stationList.getCntAB() > 0) {
      nodeTBody.appendChild(row.getDOM());
      row = new tableRowCls({'class': 'row'+(rowCnt++)%2});
      cell = row.getNewCell();
      cell.addText('Abrollbehälter');
      cell = row.getNewCell();
      cell.addText(conf.stationList.getCntAB());
      nodeTBody.appendChild(row.getDOM());
      cell.addText(' von maximal ' + conf.stationList.getCntMaxAB());
    }
    // Feuerwehrleute
    nodeTBody.appendChild(row.getDOM());
    row = new tableRowCls({'class': 'row'+(rowCnt++)%2});
    cell = row.getNewCell();
    cell.addText('Feuerwehrleute');
    cell = row.getNewCell();
    cell.addText(conf.stationList.getCntCrew());
    nodeTBody.appendChild(row.getDOM());
  }

  // Spalte für Icons verkleinern oder ausblenden
  switch (conf.getOptVal('imgStationList')) {
    case 'normal' :
      // nichts machen
      break;
    case 'small'  :
      var nodeTH = xPath.getSingle("./table[@class='defaultTable']/thead/tr/th", 'content');
      if (nodeTH) {
        nodeTH.setAttribute('style','width:35px;');
      }
      break;
    case 'none'   :
      var nodeTH = xPath.getSingle("./table[@class='defaultTable']/thead/tr/th", 'content');
      if (nodeTH) {
        nodeTH.setAttribute('style','width:35px;');
      }
      break;
  }

  for (var i=0;i<evalTRs.snapshotLength;i++) {
    var evalTDs = xPath.getNodes("./td", evalTRs.snapshotItem(i));
    var station = node2Station[i];

    // Icons verkleinern oder ausblenden
    switch (conf.getOptVal('imgStationList')) {
      case 'normal':
        break;
      case 'small':
        var nodeImg = xPath.getSingle("./img[1]", evalTDs.snapshotItem(0));
        nodeImg.setAttribute('src', nodeImg.getAttribute('src').replace(/\/map\//, '/map_25/'));
        break;
      case 'none':
        removeChildren(evalTDs.snapshotItem(0));
        break;
    }

    if (!conf.getOptVal('useOriginalVhcColorScheme')) {
      // Spalte Fahrzeuge
      var nodeTD = evalTDs.snapshotItem(columns['Fahrzeuge']-1);
      var nodeA = xPath.getSingle("./a[1]", nodeTD);
      if (station.getFhz() != station.getMaxFhz()) {
        nodeA.setAttribute('style', 'color: '+(conf.isNewLayout()?'peru':'yellow')+';');
      }
      removeChildren(nodeA);
      nodeA.appendChild(createText(station.getFhz() + ' / ' + station.getMaxFhz()));
      removeChildren(nodeTD);
      nodeTD.appendChild(nodeA);

      // Spalte Rettungswagen
      if (station.getRTW() != station.getMaxRTW()) {
        evalTDs.snapshotItem(columns['RTW']-1).style.color = (conf.isNewLayout()?'peru':'yellow');
      }

      // Spalte Notarztwagen
      if (station.getNEF() != station.getMaxNEF()) {
        evalTDs.snapshotItem(columns['NEF']-1).style.color = (conf.isNewLayout()?'peru':'yellow');
      }
    }

    // Spalte Stufe
    nodeTD = evalTDs.snapshotItem(columns['Stufe']-1);
    nodeTD.setAttribute('style', 'text-align: left;');
    // Ausbau BF erst ab 10 Feuerwachen
    if ((conf.stationList.getCntFW() < 10)?(station.getLevel() < 3):(station.getLevel() < 5)) {
      addEntityText(nodeTD, '&nbsp;');
      var nodeA = new Element('a', {'href': xPath.getSingle("./a[1]", evalTDs.snapshotItem(columns['Bezeichnung']-1)).getAttribute('href') + '/ausbauen'});
      addEntityText(nodeA, '&nbsp;+&nbsp;');
      nodeTD.appendChild(nodeA);
    }

    if (conf.getOptVal('highlightManning') && station.isBF()) {
      var proz = station.getCrew() / station.getMaxCrew() * 100;
      for (var man in staffingLst) {
        if (proz > man) {
          xPath.getSingle("./a[1]", evalTDs.snapshotItem(columns['Personen']-1)).style.color = staffingLst[man].tcol;
          break;
        }
      }
      if (proz <= 100)
      { var nodeA = new Element('a', {'href': xPath.getSingle("./a[1]", evalTDs.snapshotItem(columns['Bezeichnung']-1)).getAttribute('href') + '/werbeaktion'});
        nodeA.appendChild(createText(' ^ '));
        var node = xPath.getSingle("./a[1]", evalTDs.snapshotItem(columns['Personen']-1));
        node.parentNode.insertBefore(nodeA, node.nextSibling);
      }
    }
  }
}

// Feuerwache anzeigen
function displayStation(iNum) {
  var station = conf.stationList.getStation(iNum),
    evalText,
    evalTRs,
    evalTDs,
    nodeText,
    iTR = 0,
    iTD = 0,
    nodeH1 = xPath.getSingle("./h1[1]", 'content'),
    re = /^\s*(\d+)\s*von maximal\s*(\d+)\s*/,
    posX = '',
    posY = '',
    valStr = '',
    maxStr = '',
    name = '';

  evalText = xPath.getNodes("./text()", nodeH1);
  for (iTxt = 0; iTxt < evalText.snapshotLength; iTxt++) {
    nodeText = evalText.snapshotItem(iTxt).nodeValue.trim();
    if (nodeText.length > 0) {
      name = nodeText;
      break;
    }
  }
  if (!station) {
    station = new stationCls(iNum, name?name:'???');
  } else if (station.getName() != name) {
    station.setName(name);
  }
  evalTRs = xPath.getNodes("./table[@class='defaultTable' and position() = 1]/tbody/tr", 'content');
  try {
    for (  ; iTR < evalTRs.snapshotLength; iTR++) {
      evalTDs = xPath.getNodes("./td", evalTRs.snapshotItem(iTR));
      switch (evalTDs.snapshotItem(0).innerHTML.trim()) {
        case 'Position:':
          var [, posX, posY] = /(\d+)\s*-\s*(\d+)/.exec(evalTDs.snapshotItem(1).innerHTML.trim());
          station.setPosition(posX, posY);
          break;
        case 'Großfahrzeuge:':
          var [, valStr, maxStr] = re.exec(evalTDs.snapshotItem(1).innerHTML.trim());
          station.setFhz(parseInt(valStr, 10));
          break;
        case 'Rettungsfahrzeuge:':
          var [, valStr, maxStr] = re.exec(evalTDs.snapshotItem(1).innerHTML.trim());
          station.setRTW(parseInt(valStr, 10));
          break;
        case 'Notarztfahrzeug : ':
          var [, valStr, maxStr] = re.exec(evalTDs.snapshotItem(1).innerHTML.trim());
          station.setNEF(parseInt(valStr, 10));
          station.setMaxNEF(parseInt(maxStr, 10));
          break;
        case 'Abrollbehälter:':
          var [, valStr, maxStr] = re.exec(evalTDs.snapshotItem(1).innerHTML.trim());
          station.setAB(parseInt(valStr, 10));
          station.setMaxAB(parseInt(maxStr, 10));
          break;
        case 'Ausbaustufe:':
          var [, valStr] = /^\s*(\d+)/.exec(evalTDs.snapshotItem(1).innerHTML.trim());
          station.setLevel(parseInt(valStr, 10));
          break;
        default:
          break;
      }
    }

    station.save();
  } catch(e) {
    errLog.addMsg(e);
    station.load();
  }

  nodeH1.title = station.write().replace(/\n/g, ', ');
}

// Fahrzeuge in Wache anzeigen
function displayStationVehicles(iNum) {
  var station = conf.stationList.getStation(iNum);
  var evalAs = xPath.getNodes("./h2/a", 'content');
  for (i = 0; i < evalAs.snapshotLength; i++) {
    var nodeA = evalAs.snapshotItem(i);
    if (nodeA) {
      // URL zur Feuerwache bekommen
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
  if (conf.getOptVal('dispStatusAsFMSDisplayFL')) {
    var evalTables = xPath.getNodes("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Funkrufname']", 'content');
    for (iTbl = 0; iTbl < evalTables.snapshotLength; iTbl++) {
      var nodeTable = evalTables.snapshotItem(iTbl);
      var column = -1, col = -1;
      var evalTHs = xPath.getNodes("./thead/tr/th", nodeTable);
      for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++) {
        var nodeTH = evalTHs.snapshotItem(iTH);
        col++;
        if (nodeTH.innerHTML.trim() == 'FMS') {
          column = col + 1;
          break;
        }
      }

      if (column != -1) {
        var evalTDs = xPath.getNodes("./tbody/tr/td["+column+"]", nodeTable);
        for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
          var nodeTD = evalTDs.snapshotItem(iTD);
          nodeFMS = buildFMS(nodeTD, conf.getOptVal('dispFMSDisplayLinesFL'));
          removeChildren(nodeTD);
          nodeTD.appendChild(nodeFMS);
        }
      }
    }
  }
}

// Gebäudeliste anzeigen
function displayBuildingList() {
  var evalTable = xPath.getNodes("./table[@class='defaultTable']", 'content');

  if (evalTable.snapshotLength == 0) {
    return;
  }

  var nodeTable = evalTable.snapshotItem(0);
  // Spalte für Icons verkleinern oder ausblenden
  switch (conf.getOptVal('imgBuildingList')) {
    case 'normal':
      // nichts machen
      break;
    case 'small':
      xPath.getSingle("./thead/tr/th[1]", nodeTable).setAttribute('style','width:35px; !important;');
      break;
    case 'none':
      xPath.getSingle("./thead/tr/th[1]", nodeTable).setAttribute('style','width:0; !important;');
      break;
    default:
      break;
  }

  var evalTRs = xPath.getNodes("./tbody/tr", nodeTable);
  for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++) {
    var nodeTR = evalTRs.snapshotItem(iTR);
    // Icons verkleinern oder ausblenden
    switch (conf.getOptVal('imgBuildingList')) {
      case 'normal':
        // nichts machen
        break;
      case 'small':
        var nodeImg = xPath.getSingle("./td[1]/img[1]", nodeTR);
        nodeImg.setAttribute('src', nodeImg.getAttribute('src').replace(/\/map\//, '/map_25/'));
        break;
      case 'none':
        removeChildren(xPath.getSingle("./td[1]", nodeTR));
        break;
      default:
        break;
    }
  }

  //Gebäude zählen
  var buildingsArr = {};
  evalTDs = xPath.getNodes("./tbody/tr/td[4]", nodeTable);
  for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
    var innerHTML = evalTDs.snapshotItem(iTD).innerHTML.trim();
    if (!buildingsArr[innerHTML]) {
      buildingsArr[innerHTML] = 0;
    }
    buildingsArr[innerHTML]++;
  }

  var textArr = [];
  var text = '';
  for (building in buildingsArr) {
    textArr.push(buildingsArr[building] + ' mal ' + building);
  }
  if (textArr.length > 1) {
    text = textArr.pop();
    text = textArr.join(', ') + ' und ' + text;
  } else {
    text = textArr.toString()
  }
  var nodeDiv = new Element('div');
  nodeDiv.appendChild(createText('Du hast ' + text));
  $('content').insertBefore(nodeDiv, nodeTable);
}

// Gebäude anzeigen
function displayBuilding(iNr) {
  switch(xPath.getSingle("./table[@class='defaultTable']/tbody/tr[descendant::td/text()='Art:']/td[2]", 'content').innerHTML.trim()) {
    case 'Feuerwehrschule':
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
    default:
      break;
  }
}

// Feuerwehrschule anzeigen
function displaySchool(iFirst) {
   function getCount() {
    var evalTDs = xPath.getNodes(".//input[@name = 'personal_id[]']", 'content'),
      cnt = 0;
    for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
      nodeTD = evalTDs.snapshotItem(iTD);
      if (nodeTD.checked) {
        cnt++;
      }
    }
    if (cnt > 10) {
      alert('Pro Schule kann man nur 10 Personen gleichzeitig ausbilden!');
    }
    if ($('ereglamInfoTable') && $('ereglamInfoCount')) {
      $('ereglamInfoCount').innerHTML = cnt;
    }
  }

  var evalTables,
    evalTRs,
    evalTHs,
    evalTDs,
    evalText,
    nodeRads,
    nodeTable,
    nodeTH,
    nodeTD,
    nodeTDCopy,
    nodeSpan,
    nodeText,
    columns = {},
    trainArr = [],
    colour = '',
    trainElem = '',
    training = '',
    selTraining = '',
    cnt = 0,
    rowCnt = 0,
    iTbl = 0,
    iTH = 0,
    iTD = 0,
    iTxt = 0,
    iRad = 0,
    row,
    cell,
    flgs = {};
  flgs.motiv = conf.getOptVal('useMotivColourCodeSchool');
  flgs.abil  = conf.getOptVal('useAbilityColourCodeSchool');
  flgs.train = conf.getOptVal('useTrainingColourCodeSchool');
  flgs.shift = conf.getOptVal('useShiftColourCodeSchool');

  running = true;
  if (iFirst) {
    nodeRads = document.getElementsByName("education_type");
    for (i = 0; i < nodeRads.length; i++) {
      nodeRads[i].addEventListener("click", function () { markTrainees(); }, true);
    }
  }

  // ergänze ein Feld zum Anzeigen des Lehrgangs
  if ($('ereglamInfoTable') && !$('ereglamInfoTraining')) {
    nodeTable = $('ereglamInfoTable');
    row = new tableRowCls();
    cell = row.getNewCell({}, true);
    cell.addText('Ausbildung');
    cell = row.getNewCell({'id': 'ereglamInfoTraining'});
    cell.addText('');
    nodeTable.firstChild.appendChild(row.getDOM());
  }

  nodeText = xPath.getSingle("./div[@class='form_info']/text()[contains(../text(), 'In diesem Gebäude')]", 'content');
  if (nodeText) {
    if ($('ereglamInfoTraining')) {
      if (!$('ereglamTrainingEnd')) {
        row = new tableRowCls();
        cell = row.getNewCell({}, true);
        cell.addText('Anzahl');
        cell = row.getNewCell({'id': 'ereglamTrainingCnt', 'style': 'text-align: right;'});
        cell.addText('');
        nodeTable.firstChild.appendChild(row.getDOM());
        row = new tableRowCls();
        cell = row.getNewCell({}, true);
        cell.addText('Ende');
        cell = row.getNewCell({'id': 'ereglamTrainingEnd'});
        cell.addText('');
        nodeTable.firstChild.appendChild(row.getDOM());
      }

      // prüfen auf nicht 'whitespace', um Umlaute zu erfassen
      if (/bis zum (.+) der Lehrgang "(.+)" unterrichtet/.test(nodeText.nodeValue.trim())) {
        $('ereglamInfoTraining').innerHTML = RegExp.$2;
        $('ereglamTrainingEnd').innerHTML = RegExp.$1;
      }
    }
    // Teilnehmer zählen
    evalTRs = xPath.getNodes("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']/tbody/tr", 'content');
    // Textknoten zum Eintragen der Anzahl finden
    evalText = xPath.getNodes("./text()", 'content');
    for (iTxt = 0; iTxt < evalText.snapshotLength; iTxt++) {
      nodeText = evalText.snapshotItem(iTxt);
      if (/Diese Personen/.test(nodeText.nodeValue)) {
        nodeText.nodeValue = nodeText.nodeValue.replace(/Diese Personen/, 'Diese '+evalTRs.snapshotLength+' Personen')
        if ($('ereglamInfoTable')) {
          $('ereglamTrainingCnt').innerHTML = evalTRs.snapshotLength;
        }
        break;
      }
    }
  } else {
    // ergänze ein Feld zum Zählen der markierten FM
    if ($('ereglamInfoTable') && !$('ereglamInfoCount')) {
      row = new tableRowCls();
      cell = row.getNewCell({}, true);
      cell.addText('Zähler');
      cell = row.getNewCell({'id': 'ereglamInfoCount', 'style': 'text-align: right;'});
      cell.addText('0');
      nodeTable.firstChild.appendChild(row.getDOM());
    }

    evalTDs = xPath.getNodes(".//input[@name = 'personal_id[]']", 'content');
    for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
      evalTDs.snapshotItem(iTD).removeEventListener('click', getCount , false);
      evalTDs.snapshotItem(iTD).addEventListener('click', getCount , false);
    }

    selTraining = getSelTraining();
  }

  evalTables = xPath.getNodes(".//table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']", 'content');
  for (iTbl = 0; iTbl < evalTables.snapshotLength; iTbl++) {
    nodeTable = evalTables.snapshotItem(iTbl);
    MachSortierbar(nodeTable);
    if (conf.getOptVal('defaultTabSortSchool') != "none") {
      SortiereNachSpalte(nodeTable, conf.getOptVal('defaultTabSortSchool'))
    }

    // ermittle die Spaltennummern zu den Überschriften
    columns = getColumns(nodeTable);

    rowCnt = 0;
    evalTRs = xPath.getNodes("./tbody/tr", nodeTable);
    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++) {
      nodeTR = evalTRs.snapshotItem(iTR);
      evalTDs = xPath.getNodes("./td", nodeTR);

      var nodeTD = evalTDs.snapshotItem(columns['Name'] - 1);
      if (conf.getOptVal('removesNonSelectablesSchool') && /Nicht verfügbar/.test(nodeTD.innerHTML)) {
        nodeTR.style.display = 'none';
        continue;
      }

      nodeTD = evalTDs.snapshotItem(columns['Ausbildung'] - 1);
      if (nodeTD.title.length === 0 && nodeTD.innerHTML.trim().length > 0) {
        nodeTD.title = nodeTD.innerHTML.trim();
      }
      if ((columns['Ausbildung'] !== undefined) && nodeTD) {
        trainArr = nodeTD.title.trim().split(',');

        // markiere, wenn FM ausgebildet werden kann
        if (selTraining.length > 0) {
          markTrainee(selTraining, nodeTR, columns, trainArr);
        }
      }

      if (nodeTR.style.display !== 'none') {
        highlightCrew(nodeTR, columns, flgs);

        nodeTR.className = 'row'+(rowCnt++)%2;
      }
    }
  }

  // erst wahr, wenn eine Ausbildung ausgewählt wurde
  if (selTraining.length > 0) {
    markTrainees();
  }
  running = false;
}

// Übungsgelände anzeigen
function displayTraining() {
   function getCount(e) {
    if (e.target.nodeName !== 'INPUT') {
      return;
    }
    var evalTDs = xPath.getNodes(".//input[@name = 'personal_id[]']", 'content'),
      cnt = 0;
    for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
      nodeTD = evalTDs.snapshotItem(iTD);
      if (nodeTD.checked) {
        cnt++;
      }
    }
    if (cnt > 10) {
      alert('Pro Übungsgelände kann man nur 10 Personen gleichzeitig ausbilden!');
    }
    if ($('ereglamInfoTable') && $('ereglamInfoCount')) {
      $('ereglamInfoCount').innerHTML = cnt;
    }
    e.stopPropagation();
  }

  running = true;
  var flgs = {};
  flgs.motiv = conf.getOptVal('useMotivColourCodeTraining');
  flgs.abil  = conf.getOptVal('useAbilityColourCodeTraining');
  flgs.train = conf.getOptVal('useTrainingColourCodeTraining');
  flgs.shift = conf.getOptVal('useShiftColourCodeTraining');

  nodeText = xPath.getSingle("./div[@class='form_info']/following-sibling::h2/text()[contains(../text(), 'Personen auf dem Gelände')]", 'content');
  if (!nodeText) {
    var evalTBodys = xPath.getNodes("./form/div/table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']/tbody", 'content');
    for (var iTBody = 0; iTBody < evalTBodys.snapshotLength; iTBody++) {
      var node = evalTBodys.snapshotItem(iTBody);
      node.removeEventListener('click', getCount , false);
      node.addEventListener('click', getCount , false);
    }
  }

  // ergänze ein Feld zum Zählen der markierten FM
  if ($('ereglamInfoTable') && !$('ereglamInfoCount')) {
    var nodeTable = $('ereglamInfoTable');
    var row = new tableRowCls();
    var cell = row.getNewCell({}, true);
    cell.addText('Zähler');
    cell = row.getNewCell({'id': 'ereglamInfoCount', 'style': 'text-align: right;'});
    cell.addText('0');
    nodeTable.firstChild.appendChild(row.getDOM());
  }

  var nodeText = xPath.getSingle("./div[@class='form_info']/text()[contains(../text(), 'Auf dem Gelände')]", 'content');
  if(nodeText) {
    // Teilnehmer zählen
    var evalTRs = xPath.getNodes("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']/tbody/tr", 'content');
    // Textknoten zum Eintragen der Anzahl finden
    var nodeH2 = xPath.getSingle("./h2[1]", 'content');
    if (nodeH2) {
      nodeH2.innerHTML = evalTRs.snapshotLength +' '+ nodeH2.innerHTML;
      if ($('ereglamInfoTable') && $('ereglamInfoCount')) {
        $('ereglamInfoCount').innerHTML = evalTRs.snapshotLength;
      }
    }
  }

  var evalTables = xPath.getNodes(".//table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']", 'content');
  for (iTbl = 0; iTbl < evalTables.snapshotLength; iTbl++) {
    var nodeTable = evalTables.snapshotItem(iTbl);
    MachSortierbar(nodeTable);
    if (conf.getOptVal('defaultTabSortTraining') != "none") {
      SortiereNachSpalte(nodeTable, conf.getOptVal('defaultTabSortTraining'))
    }

    var columns = getColumns(nodeTable);

    var rowCnt = 0;
    var evalTRs = xPath.getNodes("./tbody/tr", nodeTable);
    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++) {
      var nodeTR = evalTRs.snapshotItem(iTR);
      var evalTDs = xPath.getNodes("./td", nodeTR);

      var nodeTD = evalTDs.snapshotItem(columns['Name'] - 1);
      if (conf.getOptVal('removesNonSelectablesTraining') && /Nicht im Dienst|Nicht verfügbar/.test(nodeTD.innerHTML)) {
        nodeTR.style.display = 'none';
        continue;
      }

      var nodeTD = evalTDs.snapshotItem(columns['Fähigkeiten'] - 1);
      if (conf.getOptVal('removes100%Training') && /100%/.test(nodeTD.innerHTML)) {
        nodeTR.style.display = 'none';
        continue;
      }

      highlightCrew(nodeTR, columns, flgs);

      nodeTD.parentNode.className = 'row'+(rowCnt++)%2;
    }
  }
  running = false;
}

// Werkstatt anzeigen
function displayGarage() {
  if (conf.getOptVal('limitDamage')) {
    var nodeTable = xPath.getSingle("./table[@class='defaultTable' and descendant::thead/tr/th/text()='FMS']", 'content');
    if (nodeTable) {
      var hasDisplay = false;
      evalTRs = xPath.getNodes('./tbody/tr', nodeTable);
      for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++) {
        var nodeTR = evalTRs.snapshotItem(iTR);
        var Zustand = parseInt(xPath.getSingle("./td[6]", nodeTR).innerHTML.removeTags(), 10);
        // Prüfung abhängig davon, ob Ausgabe Schaden auf Wert aus Optionen beschränkt werden soll
        if (Zustand >= conf.getOptVal('limitDamageTo')) {
          nodeTR.style.display = 'none';
        } else {
          hasDisplay = true;
        }
      }
      if (!hasDisplay) {
        nodeTable.style.display = 'none';
        var nodeDiv = new Element('div', { 'class' : 'form_info'});
        nodeDiv.appendChild(createText('aktuell keine Fahrzeuge mit einem Zustand weniger als ' + conf.getOptVal('limitDamageTo') + '%.'));
        nodeTable.parentNode.appendChild(nodeDiv);
      }
    }
  }
}

// Feuerwehrleute für Lehrgänge markieren
function markTrainees() {
  var evalTables,
    evalTRs,
    evalTHs,
    evalTDs,
    nodeTable,
    nodeTR,
    nodeTH,
    nodeTD,
    nodeRads,
    columns = {},
    trainArr = [],
    rowCnt = 0,
    iTbl = 0,
    iTR = 0,
    iTH = 0,
    iRad = 0,
    rowCnt = 0,
    bgcol = '',
    selTraining = '',
    hasReq = false;

  selTraining = getSelTraining();

  evalTables = xPath.getNodes(".//table[@class='defaultTable' and descendant::thead/tr/th/text()='Name']", 'content');
  for (iTbl = 0; iTbl < evalTables.snapshotLength; iTbl++) {
    nodeTable = evalTables.snapshotItem(iTbl);

    // ermittle die Spaltennummern zu den Überschriften
    columns = getColumns(nodeTable);

    evalTRs = xPath.getNodes("./tbody/tr", nodeTable);
    rowCnt = 0;
    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++) {
      nodeTR = evalTRs.snapshotItem(iTR);
      evalTDs = xPath.getNodes("./td", nodeTR);

      nodeTD = evalTDs.snapshotItem(columns['Name'] - 1);
      if (nodeTD && /Nicht verfügbar/.test(nodeTD.innerHTML)) {
        nodeTR.style.display = 'none';
        continue;
      }

      nodeTD = evalTDs.snapshotItem(columns['Ausbildung'] - 1);
      if (nodeTD) {
        trainArr = nodeTD.title.trim().split(',');
        if (!trainArr) {
          trainArr = nodeTD.innerHTML.trim().split(',');
          nodeTD.title = nodeTD.innerHTML.trim();
        }
        if (selTraining.length > 0) {
          hasReq = markTrainee(selTraining, nodeTR, columns, trainArr);
        }
      }

      if (nodeTR.style.display !== 'none') {
        nodeTR.className = 'row'+(rowCnt++)%2;
      }
    }
  }
}

function markTrainee(selTraining, nodeTR, columns, trainArr) {
  var evalTDs,
    nodeTD,
    rowCnt = 0,
    iTR = 0,
    iTH = 0,
    bgcol = '',
    hasReq = false;

  evalTDs = xPath.getNodes("./td", nodeTR);
  bgcol = '';
  nodeTR.style.display = '';

  if (selTraining === '{unbekannt}') {
    evalTDs.snapshotItem(0).style.backgroundColor = trainingLst[selTraining].bcol[conf.getLayout()];
    return;
  }

  // initialisiere Zustand, ob Ausbildung noch nötig ist
  hasReq = (trainingLst[selTraining].req && trainArr.length > 0)?true:false;
  for each (trainElem in trainArr) {
    // entsorge störende Leerzeichen
    trainElem = trainElem.trim();
    // wenn der FM die Ausbildung schon hat, braucht er sie nicht mehr
    if (selTraining == trainElem) {
      hasReq = true;
      break;
    }

    if (trainingLst[selTraining].req && trainingLst[selTraining].req == trainElem) {
      hasReq = false;
    }
  }

  if (hasReq) {
    nodeTR.style.display = 'none';
  }

  if (nodeTR.style.display != 'none') {
    evalTDs.snapshotItem(0).style.backgroundColor = trainingLst[selTraining].bcol[conf.getLayout()];
  }

  return hasReq;
}

function getSelTraining() {
 var nodeRads,
  nodeRad,
  iRad = 0,
  training = '',
  selTraining = '',
  hasChecked = false;

  nodeRads = document.getElementsByName("education_type");
  for (; iRad < nodeRads.length; iRad++) {
    nodeRad = nodeRads[iRad];
    if (nodeRad.checked) {
      hasChecked = true;
      for (training in trainingLst) {
        if (!trainingLst[training].internal && trainingLst[training].cboxid === nodeRad.id) {
          selTraining = training;
          break;
        }
      }
      if (!selTraining) {
        selTraining = '{unbekannt}';
      }
      break;
    }
  }
  if ($('ereglamInfoTraining')) {
    $('ereglamInfoTraining').innerHTML = selTraining;
  }
  return selTraining;
}

function getColumns(iNodeTable) {
  var columns = {},
    evalTHs,
    nodeTH,
    iTH = 0;

  evalTHs = xPath.getNodes("./thead/tr/th", iNodeTable);
  for (; iTH < evalTHs.snapshotLength; iTH++) {
    nodeTH = evalTHs.snapshotItem(iTH);
    if (nodeTH.innerHTML !== '') {
      // unbekannte Spalten sind sonst nicht zu erkennen
      columns[nodeTH.innerHTML.trim()] = iTH + 1;
    }
  }

  return columns;
}

function highlightCrew(iNodeTR, iCols, iFlgs) {
  var evalTDs,
    nodeTD,
    nodeTDCopy,
    nodeA,
    trainArr = [],
    train,
    motivation,
    ability,
    training,
    colour = '',
    status = '',
    iTR = 0,
    val = 0;

  evalTDs = xPath.getNodes("./td", iNodeTR);

  if (iCols['Motivation'] > 0) {
    nodeTD = evalTDs.snapshotItem(iCols['Motivation'] - 1);
    if (iFlgs.motiv && nodeTD) {
      val = parseInt(nodeTD.innerHTML, 10)
      for (motivation in motivationLst) {
        if (val >= motivation) {
          nodeTD.style.color = motivationLst[motivation].tcol;
          break;
        }
      }
    }
  }

  if (iCols['Fähigkeiten'] > 0) {
    nodeTD = evalTDs.snapshotItem(iCols['Fähigkeiten'] - 1);
    if (iFlgs.abil && nodeTD) {
      val = parseInt(nodeTD.innerHTML, 10)
      for (ability in abilityLst) {
        if (val >= ability) {
          nodeTD.style.color = abilityLst[ability].tcol;
          break;
        }
      }
    }
  }

  if (iCols['Ausbildung'] > 0) {
    nodeTD = evalTDs.snapshotItem(iCols['Ausbildung'] - 1);
    if (iFlgs.train && nodeTD) {
      // sichere Liste für späteren Gebrauch
      if (nodeTD.title.length === 0) {
        nodeTD.title = nodeTD.innerHTML.trim();
      }
      nodeTDCopy = nodeTD.cloneNode(false);
      trainArr = nodeTD.title.split(',');
      val = 0;
      for each (train in trainArr) {
        try {
        train = train.trim();
        } catch(e) {
          continue;
        }
        colour = '';
        training = trainingLst[train];
        if (training) {
          colour = training.tcol[conf.getLayout()];
        } else {
          colour = trainingLst['ohne'].tcol[conf.getLayout()];
        }
        if (val > 0) {
          nodeTDCopy.appendChild(createText(', '));
        }
        if (colour) {
          nodeSpan = new Element('span', {'style': 'color: '+colour});
          nodeSpan.appendChild(createText(train));
          nodeTDCopy.appendChild(nodeSpan);
        } else {
          nodeTDCopy.appendChild(createText(train));
        }
        val++;
      }
      if (val > 0) {
        iNodeTR.replaceChild(nodeTDCopy, nodeTD);
      }
    }
  }

  if (iCols['Schicht'] > 0) {
    nodeTD = evalTDs.snapshotItem(iCols['Schicht'] - 1);
    if (iFlgs.shift && nodeTD) {
      val = parseInt(nodeTD.innerHTML, 10);
      if (val) {
        nodeTD.style.color = shiftLst[val].tcol;
      }
    }
  }

  if (iCols['Status'] > 0) {
    nodeTD = evalTDs.snapshotItem(iCols['Status'] - 1);
    if (iFlgs.status && nodeTD) {
      status = nodeTD.innerHTML.trim();
      nodeA = xPath.getSingle('./a[1]', nodeTD);
      if (nodeA) {
        status = nodeA.innerHTML.trim();
      }
 // Personalstatistik:
      // Status kennzeichnen und zählen
      switch(status) {
        case  "Beim Einsatz" :
          colour = personalStatusLst[status].tcol;
          break;
        case  "Frei - nicht im Dienst":
          colour = personalStatusLst[status].tcol;
          break;
        case  "Einsatzbereit":
          colour = personalStatusLst[status].tcol;
          break;
        case  "In der Feuerwehrschule":
          colour = personalStatusLst[status].tcol;
          break;
      }
      nodeTD.style.color = colour;
    }
  }
}

// Fahrzeug anzeigen
function displayVehicle(iFhzNr) {
  var flgs = {};
  flgs.motiv = conf.getOptVal('useMotivationColourCode');
  flgs.abil  = conf.getOptVal('useAbilityColourCode');
  flgs.train = conf.getOptVal('useTrainingColourCode');

  if (conf.getOptVal('dispStatusAsFMSDisplayFI')) {
    var nodeTD = xPath.getSingle("./table[@class='defaultTable']/tbody/tr[descendant::td/text()='FMS:']/td[2]", 'content');
    if (nodeTD) {
      var nodeFMS = buildFMS(nodeTD, conf.getOptVal('dispFMSDisplayLinesFI'));
      removeChildren(nodeTD);
      nodeTD.appendChild(nodeFMS);
    }
  }

  var nodeTable = xPath.getSingle("./table[@class='defaultTable' and  descendant::thead/tr/th/text()='Ausbildung']", 'content');
  if (nodeTable) {
    MachSortierbar(nodeTable);
    if (conf.getOptVal('defaultTabSort') != "none") {
      SortiereNachSpalte(nodeTable, conf.getOptVal('defaultTabSort'))
    }

    var columns = getColumns(nodeTable);

    evalTRs = xPath.getNodes('./tbody/tr', nodeTable);
    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++) {
      highlightCrew(evalTRs.snapshotItem(iTR), columns, flgs)
    }
  }
}

// Fahrzeug reparieren
function doVehicleRepair(iFhzNr) {
  // Spalte für Icons verkleinern oder ausblenden
  switch (conf.getOptVal('imgBuildingList')) {
    case 'normal':
      // nichts machen
      break;
    case 'small':
      xPath.getSingle("./form[1]/table['defaultTable']/thead/tr/th[2]", 'content').setAttribute('style','width:35px; !important;');
      break;
    case 'none':
      xPath.getSingle("./form[1]/table['defaultTable']/thead/tr/th[2]", 'content').setAttribute('style','width:0; !important;');
      break;
    default:
      break;
  }

  evalTRs = xPath.getNodes("./form/table[@class='defaultTable']/tbody/tr", 'content');
  for (i = 0; i < evalTRs.snapshotLength; i++) {
    var nodeTR = evalTRs.snapshotItem(i);
    // Icons verkleinern oder ausblenden
    switch (conf.getOptVal('imgBuildingList')) {
      case 'normal':
        // nichts machen
        break;
      case 'small':
        ;var nodeImg = xPath.getSingle("./td[2]/label/img", nodeTR);
        nodeImg.setAttribute('src', nodeImg.getAttribute('src').replace(/\/map\//, '/map_25/'));
        break;
      case 'none':
        removeChildren(nodeTR.getElementsByTagName("td")[1]);
        break;
      default:
        break;
    }
  }
}

// Fahrzeug wurde zur Reparatur gesendet
function doVehicleRepairSent(iFhzNr) {
  var nodeTBody =xPath.getSingle("./table[@class='defaultTable']/tbody", 'content');
  if (conf.getOptVal('dispStatusAsFMSDisplayFI')) {
    var nodeTD = xPath.getSingle("./tr[descendant::td/text()='FMS:']/td[2]", nodeTBody);
    if (nodeTD) {
      var nodeFMS = buildFMS(nodeTD, conf.getOptVal('dispFMSDisplayLinesFI'));
      removeChildren(nodeTD);
      nodeTD.appendChild(nodeFMS);
    }
  }
}

// Toplisten
function displayToplist(iUser) {
  if (conf.getOptVal('highlightUser') && iUser) {
    var evalTDs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[2]", 'content');
    for (var i = 0; i < evalTDs.snapshotLength; i++) {
      var nodeTD = evalTDs.snapshotItem(i);
      if (nodeTD.innerHTML.match(iUser)) {
        nodeTD.parentNode.style.backgroundColor = 'gray';
      }
    }
  }
}

// Log
function doLoglist() {
  if (conf.getOptVal('summarizeLog')) {
    var evalTDs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[1]", 'content');
    var datArr = {
      call: {text:'Notruf', tcol: conf.getOptVal('logColCallTCol'), bcol: conf.getOptVal('logColCallBCol'), regex: /Notruf:/},
      fehl: {text:'Fehleinsatz', tcol: conf.getOptVal('logColFehlTCol'), bcol: conf.getOptVal('logColFehlBCol'), regex: /Fehleinsatz:/},
      done: {text:'abgearbeitet', tcol: conf.getOptVal('logColDoneTCol'), bcol: conf.getOptVal('logColDoneBCol'), regex: /Einsatz abgearbeitet:/},
      job:  {text:'Beginnt Job', tcol: conf.getOptVal('logColJobTCol'), bcol: conf.getOptVal('logColJobBCol'), regex: /fängt bei der Wache/},
      quit: {text:'Beendet Job', tcol: conf.getOptVal('logColQuitTCol'), bcol: conf.getOptVal('logColQuitBCol'), regex: /ist bei der Wache/},
    };
    var anzArr = {};
    for (var i = 0; i < evalTDs.snapshotLength; i++) {
      var nodeTD = evalTDs.snapshotItem(i);
      for (dat in datArr) {
        if (datArr[dat].regex.test(nodeTD.innerHTML)) {
          if (!anzArr[dat]) {
            anzArr[dat] = 0;
          }
          anzArr[dat]++;
          nodeTD.parentNode.style.color = datArr[dat].tcol;
          if (datArr[dat].bcol) { nodeTD.parentNode.style.backgroundColor = datArr[dat].bcol; }
        }
      }
    }

    var table = new tableCls({'class': 'ereglamTable'});
    var row = table.getNewHeadRow();
    for (dat in datArr) {
      var cell = row.getNewCell({}, true);
      cell.addText(datArr[dat].text);
    }
    row = table.getNewBodyRow({'class': 'row0'});
    for (dat in datArr) {
      var cell = row.getNewCell();
      cell.addText((anzArr[dat])?anzArr[dat]:'0');
      var style = cell.getStyle();
      style.color = datArr[dat].tcol;
      style.backgroundColor = datArr[dat].bcol;
    }
    $('content').insertBefore(table.getDOM(), $('content').firstChild.nextSibling.nextSibling);
  }
}

// Funkprotokoll
function doRadioTransscript() {
  var nodeTable = xPath.getSingle("./table[@class='defaultTable']", 'content');
  if (nodeTable) {
    markDemand(nodeTable); }
}

// markiere Nachforderungen im Funkprotokoll
function markDemand(nodeTable) {
  var irrelevRueckm = /Alarmiert|Auf dem Weg zum Einsatz|Ankunft am Einsatzort|Zurück alarmiert|Frei [(]Dienstfahrt[)]|Nicht einsatzbereit/;
  var markedVeh = new Array;

  var evalTRs = xPath.getNodes("./tbody/tr", nodeTable);
  for (var i = 1; i < evalTRs.snapshotLength; i++) {
    var nodeTR = evalTRs.snapshotItem(i);

    var evalTDs = xPath.getNodes("./td", nodeTR);
    if (evalTDs.snapshotLength > 1) {
      // Rückmeldungen von Leitstellen ignorieren
      if (/Leitstelle:/.test(evalTDs.snapshotItem(1).innerHTML)) {
        evalTDs.snapshotItem(1).style.color = conf.getOptVal('highlightVehReqColour');
        continue;
      }
      var RM = evalTDs.snapshotItem(2).innerHTML.trim();
      if (RM != undefined) {
        // irrelevante Rückmeldungen ignorieren
        if (irrelevRueckm.test(RM)) {
          continue;
        }

        var NfFhz = conf.fhzGrpList.findDemand(RM);

        if (NfFhz) {
          if (conf.getOptVal('highlightVehicleRequest')) {
            evalTDs.snapshotItem(2).innerHTML = evalTDs.snapshotItem(2).innerHTML.replace(NfFhz.getRegex(), '<span style="color: ' + conf.getOptVal('highlightVehReqColour') + ';">$&</span>');
          }
          markedVeh.push(NfFhz.getName());
        }
      }
    }
  }
  return markedVeh;
}

function doOverview() {
  var evalTR = xPath.getNodes("./table[@class='defaultTable']/tbody/tr", 'mission_content');
  for (iTR = 0; iTR < evalTR.snapshotLength; iTR++) {
    var nodeTR = evalTR.snapshotItem(iTR);
    var nodeTD = xPath.getSingle("./td[2]", nodeTR);
    if (xPath.getSingle("./span[@name= 'aaoInfo']", nodeTD)) {
      continue;
    }
    var nodeA = xPath.getSingle("./a", nodeTD);
    var mld = conf.getMld(nodeA.innerHTML.trim());
    nodeA.title = mld.write();

    if (main.hasVB) {
      if (conf.getOptVal('highlightVBOrder') && mld.isVBOrder()) {
        nodeA.style.color = conf.getOptVal('highlightVBOrderColor');
        nodeA.style.fontWeight = 'bold';
      }
    }
    if (conf.getOptVal('highlightOrder') && main.order == mld.getName()) {
      nodeA.style.color = conf.getOptVal('highlightOrderColor');
      nodeA.style.fontWeight = 'bold';
      nodeA.style.fontStyle = 'italic';
      if (conf.getOptVal('highlightOrderBlink')) {
        nodeA.style.textDecoration = 'blink';
      }
    }

    if (mld && conf.getOptVal('showInfoKlasseInListe') || conf.getOptVal('showInfoVehiclesInListe')) {
      var aao = mld.getAao();
      var aaoFhzStr = '';

      if (conf.getOptVal('limit2neededVehicleGroups')) {
        aaoFhzStr = aao.getFhzeStrWithoutOfScopes(true);
      } else {
        aaoFhzStr = aao.getFhzeStr(true);
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
      if (conf.getOptVal('showInfoKlasseInListe')) {
        if (conf.getOptVal('showInfoLangtextListe')) {
          var stw = aao.getStw();
          text = stw.getName() + ': ' + stw.getText();
        } else {
          text = aao.toString();
        }
        nodeSpan.appendChild(createText(text));
      }

      if (conf.getOptVal('showInfoVehiclesInListe')) {
        if (conf.getOptVal('showInfoKlasseInListe')) {
          nodeSpan.appendChild(new Element('br'));
        }
        text = aaoFhzStr;
        if (!text) {
          text = '-';
        }
        var txtLen = mld.getName().length + text.length;
        if (txtLen > 50) {
          txtLen = 50 - mld.getName().length;
          text = text.substr(0,(txtLen - 3)) +'...';
        }
        nodeSpan.appendChild(createText(text));
      }
      nodeTD.appendChild(nodeSpan);
    }

    // Position in Stadtbereich hervorheben
    if (conf.getOptVal('highlightCityExtension')) {
      nodeA = xPath.getSingle("./td[3]/a", nodeTR);
      if (nodeA) {
        var [posX, posY] = nodeA.innerHTML.split(' - ');
        if (parseInt(posY.trim(), 10) > 100 && conf.getOptVal('highlightCityExtension')) {
          nodeA.style.color =
          nodeA.parentNode.style.color = conf.getOptVal('highlightCityExtColour');
        }
        nodeA.parentNode.title = getAreaDescription(parseInt(posX.trim(), 10), parseInt(posY.trim(), 10));
      }
    }
  }
}

// Einsatz bearbeiten
function doCall(iNr) {
  function CntListCls() {
    var list = {},
      cnt = 0;

    this.getClass = function() {
      return 'CntListCls';
    }

    this.getCount = function() {
      return cnt;
    }

    this.getList = function() {
      return list;
    }

    this.get = function(iFGrp, iReadOnly) {
      var item = list[iFGrp];
      if(!item && !iReadOnly) {
        item =
        list[iFGrp] = new CntCls(iFGrp);
        cnt++;
      }
      return item;
    }

    this.toString = function() {
      var fGrpStr = '';
      for (fGrp in list) {
        if (fGrpStr.length > 0) {
          fGrpStr += '\n';
        }
        fGrpStr += fGrp.toString()+': cnt = '+cnt+'; free = '+free;
      }
      return fGrpStr;
    }
  }

  function CntCls(iFGrp) {
    var fGrp = iFGrp,
      cnt = 0,
      free = 0,
      nodes = [];

    this.getClass = function() {
      return 'CntCls';
    }

    this.getFGrp = function() {
      return fGrp;
    }

    this.addNode = function(iNode) {
      var node = (objType(iNode) == 'NodeCls')?iNode:new NodeCls(iNode, 'free_vehicle');
      nodes.push(node);
      cnt++;
      free++;
    }

    this.getNodes = function() {
      return nodes;
    }

    this.getCount = function() {
      return cnt;
    }

    this.reduceCount = function() {
      if (cnt > 0) {
        cnt--; }
    }

    this.getFree = function() {
      return free;
    }

    this.hasFree = function() {
      return (free > 0);
    }

    this.markAsFound = function() {
      free--;
    }

    this.getIdx = function() {
      return cnt - free;
    }

    this.getNextItem = function() {
      return this.getItem(this.getIdx());
    }

    this.getItem = function(idx) {
      return nodes[idx];
    }

    this.toString = function() {
      return fGrp.toString()+': cnt = '+cnt+'; free = '+free;
    }
  }

  function NodeCls(iNode, iSect) {
    var node,
      chkbox,
      name = '',
      owner = '',
      underway = false,
      inactive = false,
      reqAttr = false,
      fhz,
      container,
      station,
      time,
      timeCell,
      fastMark = false,
      section = iSect;

    this.getClass = function() {
      return 'NodeCls';
    }

    var parse = function(iNode) {
      var evalTDs = xPath.getNodes('./td', iNode),
        item = evalTDs.snapshotItem(1),
        tmp,
        fhzID = 0,
        contID = 0;
      if (evalTDs.snapshotLength > 0) {
        if (section == 'free_vehicle') {
          chkbox = xPath.getSingle('./input', evalTDs.snapshotItem(0));
          fhzID = chkbox.getAttribute('real_vehicle_id') || 0;

          item = evalTDs.snapshotItem(1);
          name = xPath.getSingle('./a', item).innerHTML.trim();
          underway = /\s*[(]unterwegs[)]/.test(item.innerHTML);
          inActRegExp = RegExp(conf.getOptVal('manualOutOfService')+' ');
          inactive = inActRegExp.test(name);
          if (inactive) {
            name = name.replace(inActRegExp, '');
          }

          [, tmp] = /^\/feuerwachen\/(\d+)$/.exec(xPath.getSingle('./a', evalTDs.snapshotItem(3)).getAttribute('href').trim());
          station = conf.stationList.getStation(tmp);

        } else if (section === 'mission_container') {
          item = evalTDs.snapshotItem(0);
          name = xPath.getSingle('./a', item).innerHTML.trim();
          contID = item.parentNode.getAttribute('container_id') || 0;
        } else { // alle andere Abschnitte
          item = evalTDs.snapshotItem(0);
          fhzID = item.parentNode.getAttribute('vehicle_id') || 0;

          name = xPath.getSingle('./a', item).innerHTML.trim();
          if (isVBCall() || isVGSL()) {
            item.innerHTML.match(/[(].*[)]\s*(.*)/);
            var tmp = RegExp.$1.trim();
            if (tmp !== '') {
              owner = name;
              name = tmp;
            }
          }

        };
        fhz = conf.getFhzByID(fhzID);

        if (fhz && fhz.getGrp().getType() === conf.specFGrp.wlf.getType()) {
          if (section === 'free_vehicle') {
          } else if (section === 'mission_vehicle') {
          } else if (section === 'mission_container') {
          } else {
            contID = item.parentNode.getAttribute('container_id') || 0;
          };
        };
        if (contID > 0) {
          container = conf.getContainerByID(contID);
        }

        try {
          timeCell = evalTDs.snapshotItem(4);
          time = new timeCls(timeCell.innerHTML.trim());
        } catch(e) {
          if (section == 'driving_vehicle') {
            section = 'mission_vehicle';
          } else {
            timeCell = undefined;
            time = undefined;
          };
        };
      };
    };

    this.setNode = function(iNode) {
      if (iNode !== undefined && iNode.nodeName && iNode.nodeName == 'TR') {
        node = iNode;
        parse(iNode);
      };
    };

    this.getName = function() {
      return name;
    };

    this.getOwner = function() {
      return owner?owner:main.user;
    };

    this.hasOwner = function() {
      return owner !== '';
    };

    this.getNode = function() {
      return node;
    };

    this.setNoDisplay = function(iNoDisp) {
      if (iNoDisp) {
        node.style.display = 'none';
      } else {
        node.style.display = '';
      }
    };

    this.setBGColor = function(iOpt) {
      if (iOpt) {
        node.style.backgroundColor = conf.getOptVal('optionalLineColour');
      } else {
        node.style.backgroundColor = conf.getOptVal('calledLineColour');
      }
    };

    this.clearBGColor = function() {
      node.style.backgroundColor = '';
    };

    this.getFhz = function() {
      if (container) {
        return (container.getActAs() > 0) ? container.getActAsFhz() : fhz;
      } else {
        return fhz;
      }
    };

    this.getRealFhz = function() {
      return fhz;
    };

    this.getFhzGrp = function() {
      return (this.getFhz())?this.getFhz().getGrp():GRP_UNKNOWN;
    };

    this.getRealFhzGrp = function() {
      return (this.getRealFhz())?this.getRealFhz().getGrp():GRP_UNKNOWN;
    };

    this.getContainer = function() {
      return container;
    };

    this.isClicked = function() {
      return chkbox.checked;
    };

    this.isSelectable = function() {
      return !chkbox.getAttribute('disabled') || true;
    };

    this.hasReqAttr = function() {
      return reqAttr;
    };

    this.click = function(iReq) {
      chkbox.click();
      if (iReq) {
        if (this.isClicked() && this.isSelectable()) {
          chkbox.setAttribute('alt', 'marked');
          reqAttr = true;
        } else {
          chkbox.removeAttribute('alt');
          reqAttr = false;
        }
      }
    };

    this.isInactive = function() {
      return inactive;
    };

    this.isUnderway = function() {
      return underway;
    };

    this.getStation = function() {
      return station;
    };

    this.getStationResponseTime = function() {
      if (this.isUnderway()) {
        return 0;
      } else if (!station) {
        return 90;
      } else {
        return station.isBF()?30:90;
      };
    };

    this.getTime = function() {
      return time;
    };

    this.getTimeCell = function() {
      return timeCell;
    };

    this.getCurrentTimeCell = function() {
      timeCell = $(timeCell.id);
      time = new timeCls(timeCell.innerHTML.trim());
      return timeCell;
    };

    this.hasTime = function() {
      return time !== undefined;
    };

    this.hasFasterMark = function() {
      return fastMark;
    };

    this.markAsFaster = function() {
      fastMark = true;
      if (conf.getOptVal('useDottedLine4FasterVeh')) {
        node.style.border = '3px dotted ' + conf.getOptVal('replacementVehicleColour');
      } else {
        timeCell.style.backgroundColor = conf.getOptVal('replacementVehicleColour');
      };
    };

    this.removeMarkAsFaster = function() {
      fastMark = false;
      if (conf.getOptVal('useDottedLine4FasterVeh')) {
        node.style.border = '0px none';
      } else {
        timeCell.style.backgroundColor = '';
      };
    };

    this.toString = function() {
      if (node) {
        var nameStr = 'Der '+name+' ('+fhz.getName()+')';

        if (section == 'free_vehicle') {
          if (inactive) {
            nameStr += ' ist inaktiv';
          } else if (underway) {
            nameStr += ' benötigt noch '+time+'Std. bis zur Einsatzstelle';
          } else {
            nameStr += ' benötigt von Wache "'+station+'" '+time+'Std.';
          }
        } else {
          if (owner != '') {
            nameStr += ' von '+owner;
          }
          if (this.hasTime()) {
            nameStr += ' benötigt noch '+time+'Std. bis zur Einsatzstelle';
          } else if (section == 'mission_vehicle') {
            nameStr += ' ist an der Einsatzstelle eingetroffen';
          } else if (section == 'waiting_vehicle') {
            nameStr += ' wartet auf seine Besatzung';
          }
        };
        return nameStr;
      } else {
        return 'undefiniert';
      };
    };

    this.setNode(iNode);
  }

  function OnRouteListCls(iByUser, iConf) {
    var items = [];
    var fCol = new fhzColCls('', iConf);
    var users = {};
    var byUser = iByUser?true: false;

    this.getClass = function() {
      return 'OnRouteListCls';
    }

    this.addItem = function(iItem) {
      items.push(iItem);
      fCol.addFhz(iItem.getFhzGrp());
      if (byUser) {
        var owner = iItem.getNode().getOwner();
        if (!users[owner]) {
          users[owner] = [];
        }
        users[owner].push(iItem.getNode());
      }
    }

    this.getItems = function() {
      return items;
    }

    this.getUsers = function() {
      return users;
    }

    this.getUserCnt = function() {
      var cnt = 0;
      for (user in users) {
        cnt++;
      }
      return cnt;
    }

    this.getFCol = function() {
      return fCol;
    }

    this.toString = function() {
      var str = fCol.toString();
      if (byUser) {
        var userStr = '';
        for (user in users) {
          userStr += user + ': ' + users[user].length + '; ';
        }
        if (userStr.length > 0) {
          str += '\n' + userStr;
        }
      }
      return str;
    }
  }

  function OnRouteCls(iNode) {
    var node = {};

    this.getClass = function() {
      return 'OnRouteCls';
    }

    this.setNode = function(iNode) {
      node = iNode;
    }

    this.getNode = function() {
      return node;
    }

    this.getFhz = function() {
      return node.getFhz();
    }

    this.getFhzGrp = function() {
		  var fhz = node.getFhz();
      return fhz?fhz.getGrp():GRP_UNKNOWN;
    }

    this.toString = function() {
      return node.toString();
    }

    this.setNode(iNode);
  }

  function applyUserLimit(iSect, iData) {
    var nodeSel = $('user.'+iSect),
      rowCnt = 0,
      items,
      node,
      noDisp = false;
    if (!nodeSel) {
      return;
    }
    var opt = nodeSel.options[nodeSel.selectedIndex];
    conf.redVhcListCnf[iSect] = opt.value;

    rowCnt = 0;
    items = iData.getItems();
    for (var i = 0; i < items.length; i++) {
      node = items[i].getNode();
      noDisp = opt.value != '&ALL&' && (node.getOwner() != opt.value || opt.value == '}}NONE{{');
      node.setNoDisplay(noDisp);
      if (!noDisp) {
        node.getNode().className = 'row'+(rowCnt++)%2;
      }
    }
  }

  function getInjured() {
    var evalText = xPath.getNodes("./table/tbody/tr[contains(./td[1]/text(), 'Verletzte')]/td[2]/text()", 'mission_content');

    if (!evalText.snapshotLength) {
      return 0;
    }
    for (iTx = 0; iTx < evalText.snapshotLength; iTx++) {
      if (/(\d*)\s*Personen/.test(evalText.snapshotItem(iTx).nodeValue.trim())) {
        [,injured] = evalText.snapshotItem(iTx).nodeValue.trim().match(/(\d*)\s*Personen/);
        if (injured) {
          break;
        }
      }
    }
    if (injured) {
      return parseInt(injured, 10);
    }
    return 0;
  }

  function getVBCallOwner() {
    var node = xPath.getSingle("./table/tbody/tr[contains(./td[1]/text(), 'Einsatz von')]/td[2]/a", 'mission_content');
    return (node?node.innerHTML.trim():'');
  }

  function isVBCall() {
    return (getVBCallOwner() !== '');
  }

  function isOwnVBCall(iUser) {
    var owner = getVBCallOwner();
    return (!owner || (owner === iUser));
  }

  function isVGSL() {
    return hasStatistics() && !isVBCall();
  }

  function hasStatistics() {
    var node = xPath.getSingle("./h2[contains(./text(), 'Statistiken')]", 'mission_content');
    return (node != null);
  }

  function markReqClicked(e) {
    marking = true;
    markReq = $('markReq').checked;
    ajaxReload = false;
    userSel = false;
    clearMarks(true);
    firstExec = false;
    main.main();
    marking = false;
  }

  function markVehicles(iList, iFhze, iTimes, iOpt) {
    var fAlt,
      fGrp,
      node,
      checkNode,
      cnt = 0,
      maxRTWTime = parseInt(conf.getOptVal('limitRTWcallMin'), 10) * 60;

    // Fahrzeuge markieren, die benötigt werden
    // Einsatzeiten bei Fahrzeugen ermitteln
    for each (fAlt in iList) {
      node = undefined;
      for each (fGrp in fAlt.getList()) {
        cnt = data.count.avail.get(fGrp.getName());
        if (cnt && cnt.getFree() > 0) {
          checkNode = cnt.getNextItem();
          if (checkNode && (!node || checkNode.getTime().getSeconds() < node.getTime().getSeconds())) {
            node = checkNode;
          }
        }
      }

      // RTW abwählen, wenn längere Anfahrt als gewünscht, aber nur wenn kein Verbandseinsatz
      if (node && !isVBCall() && conf.getOptVal('limitRTWcall') && node.getFhzGrp() == conf.specFGrp.rtw.getName()) {
        if ((node.getTime().getSeconds() > maxRTWTime) && !userSel) {
          if (node.isClicked() && node.isSelectable()) {
            node.click();// wieder abwählen
          }
          if (!iOpt) {
            data.missing.addFhz(node.getFhzGrp());
          }
          continue;
        }
      }

      if (node) {
        node.setBGColor(iOpt);
        if (!iOpt && markReq && !userSel && !node.isClicked() && node.isSelectable()) {
          node.click(true);
        }
        if (iTimes.low.getSeconds() > node.getTime().getSeconds()) {
          iTimes.low = node.getTime();
        }
        if (iTimes.high.getSeconds() < node.getTime().getSeconds()) {
          iTimes.high = node.getTime();
        }
        data.count.avail.get(node.getFhzGrp().getName()).markAsFound();
        iFhze.addFhz(node.getFhzGrp());
      } else if (!iOpt) {
        data.missing.addFhz(fAlt);
      }
    }
  }

  function clearMarks(iUncheck) {
    var evalTRs = xPath.getNodes("./div[@class='free_vehicle']/form/table[@class='defaultTable']/tbody/tr[not(./child::th)]", 'mission_content');
    for (iTR = 0; iTR < (evalTRs.snapshotLength-1); iTR++) {// letzte Zeile ignorieren
      var nodeItem = new NodeCls(evalTRs.snapshotItem(iTR), 'free_vehicle');
      nodeItem.clearBGColor();
      if (iUncheck && nodeItem.isClicked() && nodeItem.isSelectable()) {
        nodeItem.click(true);
      }
    }
  }

  function findFasterUnits() {
    // Fahrzeuge suchen, die schneller sind als Fahrzeuge auf dem Weg
    var evalTDs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[2]", 'driving_vehicle');
    // von hinten nach vorne suchen
    for (iTD = evalTDs.snapshotLength - 1; iTD >= 0; iTD--) {
      var nodeTD = evalTDs.snapshotItem(iTD);
      timeNode = xPath.getSingle('../td[5]', nodeTD);
      if (!/(Berechne|Fertig)\.\.\./.test(timeNode.innerHTML)) {
        var fhz = conf.getFhz(nodeTD.innerHTML.trim());
        var time = new timeCls(timeNode.innerHTML.trim());
        var cntItem = data.count.avail.get(fhz.getGrp(), true);
        if(!cntItem) { break; }
        var nodeLst = cntItem.getNodes();
        for (i = 0; i < nodeLst.length; i++) {
          node = nodeLst[i];
          //wenn Fahrzeug unterwegs ist, gibts keine Verzögerung bei der Alarmierung
          if (!node.isClicked() && node.isSelectable() && !node.hasFasterMark() && ((node.getTime().getSeconds() + node.getStationResponseTime()) < time.getSeconds())) {
            node.markAsFaster();
            if (conf.getOptVal('useDottedLine4FasterVeh')) {
              nodeTD.parentNode.style.border = '3px dotted ' + conf.getOptVal('fasterVehicleColour');
            } else {
              timeNode.style.backgroundColor = conf.getOptVal('fasterVehicleColour');
            }
            break;
          } else if (node.isClicked() || node.hasFasterMark()) {
            continue;
          } else {
            break;
          }
        }
      }
    }
  }

  var data = (function(iCnf) {
    var byUser = isVGSL() || (isVBCall() && !isOwnVBCall(main.user)),
      maxTime = 96*3600;
      
    var lData = {
      alarm     : new fhzColCls('', iCnf),
      firstAlarm: new fhzColCls('', iCnf),
      secndAlarm: new fhzColCls('', iCnf),
      optional  : new fhzColCls('', iCnf),
      missing   : new fhzColCls('', iCnf),
      demand    : new fhzColCls('', iCnf),
      waiting   : new OnRouteListCls(byUser, iCnf),
      onRoute   : new OnRouteListCls(byUser, iCnf),
      arrived   : new OnRouteListCls(byUser, iCnf),
      count     : {
        avail  : new CntListCls(),
        unavail: new CntListCls(),
        called : new CntListCls(),
        demand : new CntListCls(),
        stat1  : new CntListCls(),
        stat2  : new CntListCls(),
        stat3  : new CntListCls(),
        stat4  : new CntListCls(),
        stat6  : new CntListCls()
      },
      times     : {
        avail: {
          low : new timeCls(maxTime),
          high: new timeCls(),
        },
        opt  : {
          low : new timeCls(maxTime),
          high: new timeCls(),
        },
      }
    };
    
    return lData;
  })(conf); //closure
  var log = new logCls('E');

  // Script ist aktiv
  running = true;

  // wenn ein Element mit Klasse 'form_success' gefunden wird, ist der Einsatz abgeschlossen
  if (xPath.getSingle(".//div[@class='form_success']/p[contains(text(), 'Dieser Einsatz ist erledigt.')]", 'content')) {
    return;
  }

  // Einsatzmeldung ermitteln
  var mld = null;
  var mldStr = '';
  var evalText = xPath.getNodes("./h1[1]/text()", 'content');
  // muss als Schleife laufen, da sonst bestimmte Einsätze (mit Klammern??) nicht gefunden werden
  for (iTx = 0; iTx < evalText.snapshotLength; iTx++) {
    mldStr = evalText.snapshotItem(iTx).nodeValue.trim();
    if (mldStr.length <= 0) {
      continue;
    }
    mld = conf.getMld(mldStr);
    if (mld.getName() == mldStr) {
      break;
    }
  }

  if (!mld || mld.getName() == MLD_UNKNOWN) {
    log.addMsg(mldStr);
    setMsg('Einsatzmeldung nicht erkannt: '+mldStr, 'form_info');
  } else {
    document.title = 'Feuerwehreinsatz: ' + mld.getName();
    var nodeH1 = xPath.getSingle("./h1[1]", 'content');
    if (main.hasVB) {
      if (conf.getOptVal('highlightVBOrder') && mld.isVBOrder()) {
        nodeH1.style.color = conf.getOptVal('highlightVBOrderColor');
        nodeH1.style.fontWeight = 'bold';
      }
    }
    if (conf.getOptVal('highlightOrder') && main.order == mld.getName()) {
      nodeH1.style.color = conf.getOptVal('highlightOrderColor');
      nodeH1.style.fontWeight = 'bold';
      nodeH1.style.fontStyle = 'italic';
      if (conf.getOptVal('highlightOrderBlink')) {
        nodeH1.style.textDecoration = 'blink';
      }
    }
  }

  if (!$('ereglamInfoCall') && $('ereglamInfoTable')) {
    nodeTable = $('ereglamInfoTable');
    if (isVBCall()) {
      row = new tableRowCls();
      cell = row.getNewCell({'colspan': '2'}, true);
      cell.addEntityText('&nbsp;');
      nodeTable.firstChild.appendChild(row.getDOM());
      row = new tableRowCls();
      cell = row.getNewCell({'colspan': '2'}, true);
      cell.addText('Verbandseinsatz');
      nodeTable.firstChild.appendChild(row.getDOM());
    }
    row = new tableRowCls();
    cell = row.getNewCell({}, true);
    cell.addText('Position');
    cell = row.getNewCell({'id': 'ereglamInfoLocation'});
    nodeTable.firstChild.appendChild(row.getDOM());
    row = new tableRowCls();
    cell = row.getNewCell({}, true);
    cell.addText('Meldung');
    cell = row.getNewCell({'id': 'ereglamInfoCall'});
    cell.addText(mldStr);
    nodeTable.firstChild.appendChild(row.getDOM());
    if (mld) {
      row = new tableRowCls();
      cell = row.getNewCell({}, true);
      cell.addText('Stichwort');
      cell = row.getNewCell();
      cell.addText(mld.getStw().getName());
      if (conf.getOptVal('dispStwText')) {
        cell.addText(':');
        cell.addChild(new Element('br'));
        cell.addText(mld.getStw().getText());
      }
      nodeTable.firstChild.appendChild(row.getDOM());
    }
  }

  // im Verbandseinsatz die Checkbox per default NICHT anhaken, sonst schon
  if (firstExec) {
    if (!mld.isVBOrder() || conf.getOptVal('markWhenAllianceCall')) {
      markReq = !isVBCall() || (main.order == mld.getName());
    } else if (main.hasVB && isOwnVBCall(main.user) && (mld.isVBOrder() || !conf.getOptVal('markWhenAllianceCall'))) {
      markReq = false;
    }
  }

  // Wiki-Link setzen falls gewünscht und vorhanden
  if (conf.getOptVal('addWikiLink') && !xPath.getSingle("./sup[@class='WikiLink']", 'content') && mld.getWiki()) {
    var nodeH1 = xPath.getSingle("./h1[1]", 'content');
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

  if (!conf.getOptVal('showStandardAAO')) {
    var nodeTR = xPath.getSingle("./table/tbody/tr[contains(./td[1]/text(), 'Ausrückeordnung')]", 'mission_content');
    if (nodeTR) {
      nodeTR.style.display = 'none';}
  }

  // Fahrzeuge ermitteln, die unterwegs sind
  for each (section in ['mission_vehicle','driving_vehicle','waiting_vehicle','mission_container']) {
    var evalTDs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[2]", section);
    for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
      var nodeItem = new NodeCls(evalTDs.snapshotItem(iTD).parentNode, section);
      var fGrp = nodeItem.getFhzGrp();
      var onRoute = new OnRouteCls(nodeItem);

      switch(section) {
        case 'mission_vehicle':
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
        case 'mission_container':
          data.arrived.addItem(onRoute);
          data.count.stat4.get(fGrp.getName()).addNode(nodeItem);
          break;
        default:
          break;
      }
    }
  }

  // Fahrzeuge ermitteln, die verfügbar sind
  var evalTDs = xPath.getNodes("./div[@class='free_vehicle']/form/table[@class='defaultTable']/tbody/tr/td[3]", 'mission_content');
  for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
    var nodeItem = new NodeCls(evalTDs.snapshotItem(iTD).parentNode, 'free_vehicle');
    //Farbmarkierung zurücknehmen, da jetzt andere Fahrzeuge gültig sein könnten
    nodeItem.clearBGColor();

    var fhzGrp = nodeItem.getFhz()?nodeItem.getFhz().getGrp():GRP_UNKNOWN;

    if (nodeItem.isInactive()) {
      data.count.stat6.get(fhzGrp).addNode(nodeItem);
      continue;
    } else if (nodeItem.isUnderway()) {
      data.count.stat1.get(fhzGrp).addNode(nodeItem);
    } else {
      data.count.stat2.get(fhzGrp).addNode(nodeItem);
    }
    data.count.avail.get(fhzGrp).addNode(nodeItem);
  }

  // Fahrzeuglisten besorgen
  var aao = mld.getAao();
  var fhze;
  var fOpt;
  if (mld.isStorm() && conf.getOptVal('disableSelectionDueToStorm')) {
    fhze = new fhzColCls(conf.getOptVal('reducedSelectionVehicles'), conf);
    fOpt = new fhzColCls(conf.getOptVal('reducedSelOptVehicles'), conf);
  } else {
    fhze = aao.getFhze(false).clone();
    fOpt = aao.getOpt().clone();
  }

  // Fahrzeuge ermitteln, die nachgefordert wurden
  var nodeTable = xPath.getSingle("./table[@class='defaultTable']", 'mission_reply');
  if (nodeTable) {
    // nachgeforderte Fahrzeuge hervorheben
    markDemand(nodeTable);

    // nachgeforderte Fahrzeuge aus Scripter-Daten auslesen
    var missFhz = [];
    var missOut = [];
    var evalMiss = xPath.getNodes("./div[@class='mission_reply_vehicle_required']", 'mission_reply');
    for (var i = 0; i < evalMiss.snapshotLength; i++) {
      var ID = /\d+/.exec(evalMiss.snapshotItem(i).innerHTML.trim());
      var fhz = conf.fhzList.getFhzByID(ID);
      if (fhz) {
        missFhz.push(fhz.getGrp());
      }
    }
    var evalNEF = xPath.getNodes("./table/tbody/tr[contains(./td[1]/text(), 'Notarzt')]", 'mission_content');
    if (evalNEF.snapshotLength > 0 && !mld.isOnWater()) {
      missFhz.push(conf.specFGrp.nef)
    }

    for each (fhzGrp in missFhz) {
      if (!data.demand.contains(fhzGrp)) {
        data.demand.addFhz(fhzGrp)
      }

      var found = false;
      for each(fRouteList in [data.waiting, data.onRoute, data.arrived]) {
        for each (fRoute in fRouteList.getItems()) {
          if (fhzGrp == fRoute.getFhzGrp()) {
            found = true;
            break;
          }
        }
        if (found) {
          break;
        }
      }

// an Fahrzeugliste anfügen, wenn nicht vorhanden
      if (!found && !fhze.contains(fhzGrp)) {
        fhze.addFhz(fhzGrp);
        missOut.push(fhzGrp.getName());
      }

      var cnt = data.count.stat4.get(fhzGrp, false);
      if (!(conf.getOptVal('dispStatusDemandNotAtScene') && cnt && (cnt.getCount() > 0))) {
        data.count.demand.get(fhzGrp).addNode();
      }
    }
    if ($('ereglamInfoTable') && missOut.length > 0) {
      if (!$('ereglamInfoMissed')) {
        nodeTable = $('ereglamInfoTable');
        row = new tableRowCls();
        cell = row.getNewCell({'title': 'Nachzufordernde Fahrzeuge'}, true);
        cell.addText('nachzuf.');
        cell = row.getNewCell({'id': 'ereglamInfoMissed'});
        cell.addText(missOut);
        nodeTable.firstChild.appendChild(row.getDOM());
      } else if ($('ereglamInfoMissed')) {
        $('ereglamInfoMissed').innerHTML = missOut;
      }
    }
  }

  if (!isVGSL()) {
     // Verletzte noch berücksichtigen: dazu je nach Einsatz das richtige Rettungsmittel bestimmen
    var rtm = mld.isOnWater()? conf.specFGrp.rtb : conf.specFGrp.rtw;

    for (var inj = getInjured(); inj > 0; inj--) {
      fhze.addFhz(rtm);
    }
    if (getInjured() > 0 && !mld.isOnWater() && conf.getOptVal('callSurplusRTW')) {
      fhze.addFhz(rtm);
    }
    if (getInjured() >= conf.getOptVal('callNEFWithInjured') && conf.getOptVal('callNEFWithInjured') > 0 && !mld.isOnWater()) {
      fhze.addFhz(conf.specFGrp.nef);
    }
  }
  if ($('ereglamInfoTable') && (getInjured() > 0 || $('ereglamInfoInjured'))) {
    if (!$('ereglamInfoInjured')) {
      nodeTable = $('ereglamInfoTable');
      row = new tableRowCls();
      cell = row.getNewCell({}, true);
      cell.addText('Verletzte');
      cell = row.getNewCell({'id': 'ereglamInfoInjured', 'style': 'text-align: right'});
      cell.addText(getInjured());
      nodeTable.firstChild.appendChild(row.getDOM());
    } else if ($('ereglamInfoInjured')) {
      $('ereglamInfoInjured').innerHTML = getInjured();
    }
  }

  // Fahrzeugs optional setzen, wenn nicht automatisch markiert werden soll
  if (!markReq) {
    fOpt = fhze.concat(fOpt);
    fhze.clear();
  }

  // benötigte Fahrzeuge aus der Alarmierung entfernen, wenn schon unterwegs
  for each(fRouteList in [data.waiting, data.onRoute, data.arrived]) {
    for each (fRoute in fRouteList.getItems()) {
      if (isVGSL() && fRoute.getNode().getOwner() != main.user) {
        continue;
      }
      if (!fhze.remove(fRoute.getFhzGrp())) {
        fOpt.remove(fRoute.getFhzGrp());
      }
    }
  }

  // Fahrzeuge markieren, die benötigt werden
  // Einsatzeiten bei zu alarmierenden Fahrzeugen ermitteln
  markVehicles(fhze.getList(), data.alarm, data.times.avail, false);

  // Einsatzzeiten bei optionalen Fahrzeugen ermitteln
  markVehicles(fOpt.getList(), data.optional, data.times.opt, true);

  // Abmarschreihenfolge bestimmen
  if (conf.getOptVal('moveSequenceInStation') != 'normal') {
    var stations = {};
    for each (cnt in data.count.avail.getList()) {
      for each (nodeItem in cnt.getNodes()) {
        if (!nodeItem.isClicked()) {
          continue;
        }

        var station = nodeItem.getStation();
        var fhz = nodeItem.getFhz();
        if (!stations[station]) {
          stations[station] = {};
        }

        if (!stations[station]['Sum']) {
          stations[station]['Sum'] = 0;
        }

        switch (true) {
          case fhz.needsTraining():
            if (!stations[station]['Aus']) {
              stations[station]['Aus'] = 0;
            }
            stations[station]['Aus']++;
            stations[station]['Sum']++;
            break;
          case !fhz.isLGrpFhz(): //kein LF
            if (!stations[station]['Tr']) {
              stations[station]['Tr'] = 0;
            }
            stations[station]['Tr']++;
            stations[station]['Sum']++;
            break;
          case fhz.isLGrpFhz(): //ist LF
            if (!stations[station]['LF']) {
              stations[station]['LF'] = 0;
            }
            stations[station]['LF']++;
            break;
          default:
            break;
        }
      }
    }

    for each (cnt in data.count.avail.getList()) {
      for each (nodeItem in cnt.getNodes()) {
        if (!nodeItem.isClicked()) {
          continue;
        }
        var station = nodeItem.getStation();
        var fhz = nodeItem.getFhz();

        if (!stations[station]['Aus']) {
          stations[station]['Aus'] = 0
        }
        if (!stations[station]['Tr']) {
          stations[station]['Tr'] = 0
        }
        if (!stations[station]['LF']) {
          stations[station]['LF'] = 0
        }

        if (nodeItem.isUnderway()) {
          data.firstAlarm.addFhz(fhz.getGrp());
        } else {
          switch (true) {
            case fhz.needsTraining():
              data.firstAlarm.addFhz(fhz.getGrp());
              break;
            case !fhz.isLGrpFhz(): //kein LF
              switch(conf.getOptVal('moveSequenceInStation')) {
                case 'special' :
                  if (stations[station]['Aus'] > 0) {
                    data.secndAlarm.addFhz(fhz.getGrp());
                    if (!userSel && nodeItem.isSelectable()) {
                      nodeItem.click();// wieder abwählen
                    }
                  } else {
                    data.firstAlarm.addFhz(fhz.getGrp());
                  }
                  break;
                default:
                  data.firstAlarm.addFhz(fhz.getGrp());
                  break;
              }
              break;
            case fhz.isLGrpFhz(): //ist LF
              if (stations[station]['Sum'] > 0) {
                data.secndAlarm.addFhz(fhz.getGrp());
                if (!userSel) {
                  nodeItem.click();// wieder abwählen
                }
              } else {
                data.firstAlarm.addFhz(fhz.getGrp());
              }
              break;
          }
        }
      }
    }
  } else {
    data.firstAlarm = data.firstAlarm.concat(data.alarm);
  }

  // Aufbau der Einsatzinformationen
  // Tabelle mit Einsatzinformationen
  var nodeTBody = xPath.getSingle("./table[@class='defaultTable']/tbody[contains(./tr/td/text(), 'Gemeldet')]", 'mission_content');

  // Tabelle 'Rückmeldungen' um weitere Zeilen erweitern
  // die Inhalte werden später eingestellt
  if (!$('eAAO')) {
    var insNode = nodeTBody.firstChild.nextSibling; //Einfügeknoten bestimmen

    // Tabelle für Markierungscheckbox und Abmarschinfo
    var freeNode;
    if (conf.getOptVal('showMoveSeqSelInFacts')) {
      freeNode = xPath.getSingle("./h2[contains(text(), 'Rückmeldungen und Fakten')]", 'mission_content');
    } else {
      freeNode = xPath.getSingle("./div[@class='free_vehicle']/h2[1]", 'mission_content');
    }

    var table = new tableCls({'style': 'border: 0px none; width: 100%', 'id'   : 'eAAO'});
    var row = table.getNewBodyRow();
    var cell = row.getNewCell({'style': 'width: 40%'});
    // Option: benötigte Fahrzeuge direkt auswählen
    var nodeInput = new Element('input', {'type': 'checkbox', 'id'  : 'markReq'});
    cell.addChild(nodeInput);
    var nodeLabel = new Element('label', {'for': 'markReq'});
    cell.addChild(nodeLabel);
    nodeLabel.appendChild(createText(' Fahrzeuge sofort auswählen'));

    cell = row.getNewCell({'id'   : 'eAAOSeq', 'style': 'width: 60%;text-align: right;font-weight:bold;'});
    // und vor die Tabelle einfügen
    freeNode.parentNode.insertBefore(table.getDOM(), freeNode.nextSibling);

    // Einsatznummer
    var node = xPath.getSingle("./tr/td[2]", nodeTBody);
    node.innerHTML = node.innerHTML.replace(' - ', ' unter Nr. '+iNr+' - ');

    // Alarmierungsstichwort
    row = new tableRowCls();
    cell = row.getNewCell({'title': 'Alarmierungstichwort'}, false);
    cell.addText('Stichwort');
    cell = row.getNewCell({'id': 'eAAOStw'});
    nodeTBody.insertBefore(row.getDOM(), insNode);

    // Alarmierungsvorschlag
    row = new tableRowCls();
    cell = row.getNewCell({'title': 'zu alarmierende Fahrzeuge'}, false);
    cell.addText('Alarmierung');
    cell = row.getNewCell({'id': 'eAAOAlm'});
    nodeTBody.insertBefore(row.getDOM(), insNode);

    // Fahzeugefehlliste
    row = new tableRowCls();
    cell = row.getNewCell({'title': 'nicht verfügbare Fahrzeuge'}, false);
    cell.addText('nicht verfüg.');
    cell = row.getNewCell({'id': 'eAAOUnavail'});
    nodeTBody.insertBefore(row.getDOM(), insNode);

    // ab hier weitere Zeilen anhängen
    row = new tableRowCls();
    cell = row.getNewCell({'id': 'eAAOStat','colspan': 2, 'padding':'0px'});
    nodeTBody.appendChild(row.getDOM());
  } else {
    removeChildren($('eAAOSeq'));
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
  if (markReq) {
    $('markReq').setAttribute('checked', 'checked');

    var str = '';
    switch(conf.getOptVal('moveSequenceInStation')) {
      case 'trupp':
        str = 'Trupp- vor Löschgruppenfahrzeugen';
        break;
      case 'special' :
        str = 'Sonder- vor Trupp- und Löschfahrzeugen';
        break;
      default:
        str = 'alle zeitgleich';
        break;
    }

    if (str.length > 0) {
      $('eAAOSeq').appendChild(createText('Alarmierungsreihenfolge: ' + str));
    }
  }

  // Alarmierungsstichwort
  if (conf.getOptVal('dispStw')) {
    var node = $('eAAOStw');
    var nodeSpan = new Element('span', {'style': 'color: ' + conf.getOptVal('dispStichwortColour') + ';'});
    if (conf.getOptVal('disableSelectionDueToStorm') && mld.isStorm()) {
      var nodeSpanT = new Element('span', {'style': 'color: ' + conf.getOptVal('dispStormInfoColour') + ';'});
      nodeSpanT.appendChild(createText('Unwetter'));
      node.appendChild(nodeSpanT);
      if (conf.getOptVal('dispStwCallList')) {
        node.appendChild(createText(' ('+conf.getOptVal('reducedSelectionVehicles')+')'));
      }
    } else {
      var text = mld.getStw().getName();
      if (conf.getOptVal('dispStwText')) {
        text += ': '+mld.getStw().getText();
      }
      nodeSpan.appendChild(createText(text));
      node.appendChild(nodeSpan);
      if (conf.getOptVal('dispStwCallList')) {
        var aaoStr = '';
        if (conf.getOptVal('limit2neededVehicleGroups')) {
          aaoStr = aao.getFhzeStrWithoutOfScopes(true);
        } else {
          aaoStr = aao.getFhzeStr();
        }
        node.appendChild(createText(' ('+(aaoStr?aaoStr:'-')+')'));
      }
    }
  } else {
    $('eAAOStw').parentNode.style.display = 'none';
  }

  // zu alarmierende Fahrzeuge
  if (conf.getOptVal('dispCallList') && (data.firstAlarm.getCount() > 0 || data.secndAlarm.getCount() > 0 || data.optional.getCount() > 0)) {
    var hasElem = false;
    var node = $('eAAOAlm');
    var nodeSpan = new Element('span');
    if (data.alarm.getCount() > 0) {
      if(data.secndAlarm.getCount() > 0) {
        node.appendChild(createText('1. '));
      }
      nodeSpan.style.color = conf.getOptVal('dispCallReqColour');
      nodeSpan.title = 'erste Alarmierung';
      nodeSpan.appendChild(createText(data.firstAlarm.toString()));
      node.appendChild(nodeSpan);
      nodeSpan = new Element('span');
      hasElem = true;

      if (data.secndAlarm.getCount() > 0) {
        node.appendChild(createText(', 2. '));
        nodeSpan.style.color = conf.getOptVal('dispCallSecColour');
        nodeSpan.title = 'zweite Alarmierung';
        nodeSpan.appendChild(createText(data.secndAlarm.toString()));
        node.appendChild(nodeSpan);
        nodeSpan = new Element('span');
        hasElem = true;
      }

      if (conf.getOptVal('dispTime')) {
        node.appendChild(createText(' '));
        nodeSpan.style.cssFloat = 'right';
        nodeSpan.title = 'Anfahrtzeit';
        nodeSpan.appendChild(createText('(' + data.times.avail.low));
        if (data.alarm.getCount() > 1 || data.secndAlarm.getCount() > 0) {
          nodeSpan.appendChild(createText(' - ' + data.times.avail.high));
        }
        nodeSpan.appendChild(createText(')'));
        node.appendChild(nodeSpan);
        nodeSpan = new Element('span');
      }
    }

    if (data.optional.getCount() > 0) {
      nodeSpan.style.color = conf.getOptVal('dispCallOptColour');
      nodeSpan.title = 'optionale Fahrzeuge';
      if (hasElem) {
        node.appendChild(new Element('br'));
      }
      nodeSpan.appendChild(createText(data.optional.toString()));
      node.appendChild(nodeSpan);
      nodeSpan = new Element('span');
      if (conf.getOptVal('dispTime')) {
        node.appendChild(createText(' '));
        nodeSpan.style.color = conf.getOptVal('dispCallOptColour');
        nodeSpan.style.cssFloat = 'right';
        nodeSpan.title = 'Anfahrtzeit';
        nodeSpan.appendChild(createText('(' + data.times.opt.low));
        if (data.optional.getCount() > 1) {
          nodeSpan.appendChild(createText(' - ' + data.times.opt.high));
        }
        nodeSpan.appendChild(createText(')'));
        node.appendChild(nodeSpan);
        nodeSpan = new Element('span');
      }
    }
  } else {
    $('eAAOAlm').parentNode.style.display = 'none';
  }

  // Fahrzeugfehlliste
  if (conf.getOptVal('dispUnavailable')) {
    var fCol;
    if (conf.getOptVal('limit2neededVehicleGroups')) {
      fCol = data.missing.getWithoutOfScopes();
    } else {
      fCol = data.missing;
    }
    if (fCol.getCount() > 0) {
      var node = $('eAAOUnavail');
      var nodeSpan = new Element('span', {'style': 'color: '+conf.getOptVal('dispUnavailColour')+';'});
      nodeSpan.appendChild(createText(fCol.toString()));
      node.appendChild(nodeSpan);
    } else {
      $('eAAOUnavail').parentNode.style.display = 'none';
    }
  }

  // Position in Stadtbereich hervorheben
  var nodeTD = xPath.getSingle("./tr[contains(./td[1]/text(), 'Position')]/td[2]", nodeTBody);
  var node = xPath.getSingle("./a", nodeTD);
  if ((!isVBCall() || isOwnVBCall(main.user)) && (conf.getOptVal('highlightCityExtension') || conf.getOptVal('addLocationDescription'))) {
    // in erster Tabelle zu 'Rückmeldungen und Fakten' die Zeile mit der Position finden
    if (!node) {
      node = new Element('span');
      node.innerHTML = nodeTD.innerHTML.trim();
      removeChildren(nodeTD);
      nodeTD.appendChild(node);
    }
    if (node && !node.alt) {
      var [posX, posY] = node.innerHTML.replace(/Andere Stadt -[\s|  ]*/, '').split(' - ');
      node.parentNode.title = getAreaDescription(parseInt(posX.trim(), 10), parseInt(posY.trim(), 10));
      if (parseInt(posY.trim(), 10) > 100 && conf.getOptVal('highlightCityExtension')) {
        node.style.color =
        node.parentNode.style.color = conf.getOptVal('highlightCityExtColour');
      }

      if (conf.getOptVal('addLocationDescription')) {
        node.parentNode.appendChild(createText(': ' + node.parentNode.title));
      }
    }
  }
  if (node && $('ereglamInfoLocation')) {
    $('ereglamInfoLocation').innerHTML = node.innerHTML.trim();
  };

  // Anzeige Statusliste
  if (conf.getOptVal('dispStatus')) {
    var statCnt = {
      '2'     : {src: data.count.stat2,  fms: FMSStatusLst['2'], disp: true},
      '1'     : {src: data.count.stat1,  fms: FMSStatusLst['1'], disp: true},
      'alarm.': {src: data.count.called, fms: {tcol: 'red', bcol: 'white', text: 'alarmiert'}, disp: true},
      '3'     : {src: data.count.stat3,  fms: FMSStatusLst['3'], disp: true},
      '4'     : {src: data.count.stat4,  fms: FMSStatusLst['4'], disp: true},
      '6'     : {src: data.count.stat6,  fms: FMSStatusLst['6'], disp: conf.getOptVal('dispStatus6')},
      'n.gef.': {src: data.count.demand, fms: {tcol: 'white', bcol: 'black', text: 'Nachforderung'}, disp: conf.getOptVal('dispStatusDemand')},
    };

    var cntAll = 0;
    for (stat in statCnt) {
      var item = statCnt[stat];
      if (item.disp) {
        cntAll += item.src.getCount();
      }
    }

    if (cntAll > 0) {
      // nachfolgende Tabelle zeigt Status der Fahrzeuge
      var table = new tableCls({'class':'fhzTable'});
      row = table.getNewHeadRow();
      cell = row.getNewCell({'title':'Status', 'width': 60}, true);
      cell.addText('Status');
      for each(fGrp in conf.fhzGrpList.getList(mld.isOnWater())) {
        if (conf.getOptVal('limit2neededVehicleGroups') && !(fGrp.isInScope() || data.count.avail.get(fGrp.getName()).getCount() > 0)) {
          continue;
        }
        cell = row.getNewCell({'title':fGrp.getText()+': '+fGrp.getFhzNameArr().join(', '), 'style': 'font-size: 10px'}, true);
        cell.addText(fGrp.getName());
      }
      cell = row.getNewCell({'title':'Summe', 'width': 25}, true);
      cell.addEntityText('&nbsp;&Sigma;&nbsp;');

      var rowCnt = 0;
      for (stat in statCnt) {
        var item = statCnt[stat];
        if (item.src.getCount() > 0 && item.disp) {
          var sum = 0;
          row = table.getNewBodyRow({'class' : 'row'+(rowCnt++)%2});
          cell = row.getNewCell({'title':item.fms.text}, true);
          cell.addText(stat);
          if (item.fms.tcol) {
            cell.getStyle().color = item.fms.tcol;
          }
          if (item.fms.bcol) {
            cell.getStyle().backgroundColor = item.fms.bcol;
          }
          for each(fGrp in conf.fhzGrpList.getList(mld.isOnWater())) {
            if (conf.getOptVal('limit2neededVehicleGroups') && !(fGrp.isInScope() || data.count.avail.get(fGrp.getName()).getCount() > 0)) {
              continue;
            }
            var cnt = 0;
            if(item.src.get(fGrp.getName())) {
              cnt = item.src.get(fGrp.getName()).getCount();
            }
            cell = row.getNewCell({'class' : ((cnt == 0) ? 'null' : ''), 'title' : cnt.toString() + ' ' + fGrp.getName() + ' ' + item.fms.text });
            sum += cnt;
            cell.addText(cnt.toString());
          }
          cell = row.getNewCell({'title':sum.toString() + ' Fahrzeug' + (sum != 1 ? 'e ' : ' ') + item.fms.text }, true);
          if (item.fms.bcol) {
            cell.getStyle().backgroundColor = item.fms.bcol;
          }
          if (item.fms.tcol) {
            cell.getStyle().color = item.fms.tcol;
          }
          cell.addText(sum.toString());
        }
      }
      // in die letzte Zeile einhängen
      $('eAAOStat').appendChild(table.getDOM());
    } else {
      $('eAAOStat').parentNode.style.display = 'none';
    }
  } else {
    $('eAAOStat').parentNode.style.display = 'none';
  }

  // Zebramuster wieder setzen
  var evalTR = xPath.getNodes("./tbody/tr", nodeTBody.parentNode);
  var rowCnt = 0;
  for (iTR = 0; iTR < evalTR.snapshotLength; iTR++) {
    if (evalTR.snapshotItem(iTR).style.display == 'none') {
      continue;
    }
    evalTR.snapshotItem(iTR).className = 'row'+ (rowCnt++)%2;
  }

  // Spielerauswahl bei VGSL
  if (isVGSL() && (conf.getOptVal('reduceInVehRespListsOfVGSL') != '&OFF&')) {
    for each (section in ['mission_vehicle','driving_vehicle','waiting_vehicle']) {
      if (!$('user.'+section)) {
        var nodeH2 = xPath.getSingle("./h2", section);
        if (!nodeH2) {
          continue;
        }
        var secData = {};

        switch(section) {
          case 'mission_vehicle':
            secData = data.arrived;
            break;
          case 'driving_vehicle':
            secData = data.onRoute;
            break;
          case 'waiting_vehicle':
            secData = data.waiting;
            break;
          default:
            break;
        }
        if (secData.getUserCnt() <= 1) {
          continue; // with next section
        }

        var nodeSel = new Element('select',
                                  {'id'   : 'user.'+section,
                                   'style': 'width: 200px; float: right;'});
        switch(section) {
          case 'mission_vehicle':
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
          default:
                break;
               }

        var defSel = conf.redVhcListCnf[section];

        // prüfen ob gewählter Spieler aktuell Fahrzeuge in der Liste hat
        if (defSel != '&OFF&' && defSel != '&ALL&' && defSel != '&NONE&' && !secData.getUsers()[defSel]) {
          defSel = conf.getOptVal('reduceInVehRespListsOfVGSL')
        }

        var nodeOpt = new Option();
        nodeOpt.name  =
        nodeOpt.value = '&ALL&';
        nodeOpt.appendChild(createText('- alle -'));
        nodeSel.add(nodeOpt, null);
        if (defSel == nodeOpt.value) {
          nodeOpt.selected = true;
        }

        nodeOpt = new Option();
        nodeOpt.name  =
        nodeOpt.value = '&NONE&';
        nodeOpt.appendChild(createText('- keine -'));
        nodeSel.add(nodeOpt, null);
        if (defSel == nodeOpt.value) {
          nodeOpt.selected = true;
        }

        for (user in secData.getUsers()) {
          nodeOpt = new Option();
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
  if (conf.getOptVal('dispStatusAsFMSDisplayEL')) {
    var evalH2s = xPath.getNodes('./div/h2', 'mission_content');
    for (iH2 = 0; iH2 < evalH2s.snapshotLength; iH2++) {
      var nodeH2 = evalH2s.snapshotItem(iH2);
      var FMSstatus = '';
      switch(nodeH2.innerHTML.trim()) {
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

      var nodeTable = xPath.getSingle('../table[1]', nodeH2);
      if (!nodeTable) {
        continue;
      }
      var column = -1;
      evalTHs = xPath.getNodes('./tbody/tr/th', nodeTable);
      for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++) {
        // Textspalte FMS ausblenden
        if (iTH == 2 && FMSstatus == 3) {
          evalTHs.snapshotItem(iTH).style.display = 'none';
        }
        // Text der Spalte 'Optionen' ändern
        if (evalTHs.snapshotItem(iTH).innerHTML == 'Optionen') {
          column = iTH;
          evalTHs.snapshotItem(iTH).innerHTML = 'FMS';
          break;
        }
      }
      if (column != -1) {
        // Textspalte FMS ausblenden
        if (FMSstatus == 3) {
          var evalTDs = xPath.getNodes('./tbody/tr/td[3]', nodeTable);
          for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
            evalTDs.snapshotItem(iTD).style.display = 'none';
          }
        }
        var evalTDs = xPath.getNodes('./tbody/tr/td[' + (column + 1) + ']', nodeTable);
        for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
          var linksArr = {};
          var nodeTD = evalTDs.snapshotItem(iTD);
          var evalA = xPath.getNodes('./a', nodeTD);
          for (iA = 0; iA < evalA.snapshotLength; iA++) {
            var nodeA = evalA.snapshotItem(iA);
            switch(nodeA.innerHTML.trim()) {
              case 'Zurück alarmieren':
                switch(nodeH2.innerHTML.trim()) {
                  case 'Wartende Fahrzeuge':
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
              default:
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
  for (i = 0; i < evalAs.snapshotLength; i++) {
    evalAs.snapshotItem(i).addEventListener("click", function(e){ firstExec = true; userSel = false;}, false );
  }
  // Fahrzeuge, die auf Besatzung warten
  evalAs = xPath.getNodes("./table[@class='defaultTable']/tbody/tr/td[4]//a", $('waiting_vehicle'));
  for (i = 0; i < evalAs.snapshotLength; i++) {
    evalAs.snapshotItem(i).addEventListener("click", function(e){ firstExec = true; userSel = false;}, false );
  }

  // Checkboxen der Fahrzeugauswahl
  var chks = document.getElementsByName("vehicle_to_user_id[]");
  for (i = 0; i < chks.length; i++) {
    chks[i].addEventListener("click" ,
    function(e) {
      if (!marking && !running) {
        userSel = true;
      }
    } , false ) ;
  }

  // Buttons 'submit'
  btns = document.getElementsByName("commit");
  for (i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click" , function(e){ firstExec = true; } , false ) ;
  }

  // erste Suche nach schnelleren Fahrzeugen verzögern, damit FW.Net-Script Zeiten berechnen kann
  if (firstExec) {
    setTimeout(findFasterUnits, 750);
  } else {
    setTimeout(findFasterUnits, 250);
  }

  applLog.refresh();
  log.addMsg(
  'Feuerwachen     = '+conf.stationList+
  '\nVerbandseinsatz = '+(isVBCall()?getVBCallOwner():false)+
  '\nVGSL            = '+isVGSL()+
  '\nVerbandsauftrag = '+mld.isVBOrder()+
  '\nStatistiken     = '+hasStatistics()+
  '\nmarkReq         = '+markReq+
  '\nfirstExec       = '+firstExec+
  '\najaxReload      = '+ajaxReload+
  '\nuserSel         = '+userSel+
  '\n>Meldung  = '+mldStr+
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

  firstExec = false;
  running = false;
}

function displayControlCenter() {
  var evalH2s = xPath.getNodes(".//h2", 'content');
  for (var iH2 = 0; iH2 < evalH2s.snapshotLength; iH2++) {
    var nodeH2 = evalH2s.snapshotItem(iH2);
    var nodeA = xPath.getSingle("./a[1]", nodeH2);
    var href = nodeA.href;
    if (nodeA) {
      nodeH2.appendChild(new Element('br'));
      nodeSpan = new Element('span', {'class': 'fontSmall'});
      nodeH2.appendChild(nodeSpan);

      nodeSpan.appendChild(createText('('));

      nodeA = new Element('a', {'href' : href + "/feuerwehrleute",
                                'title': 'Personal'});
      nodeSpan.appendChild(nodeA);
      nodeA.appendChild(createText('Pers'));

      nodeSpan.appendChild(createText(' / '));

      nodeA = new Element('a', {'href' : href + "/feuerwehrautos",
                                'title': 'Fahrzeuge'});
      nodeSpan.appendChild(nodeA);
      nodeA.appendChild(createText('Fhz'));

      nodeSpan.appendChild(createText(')'));
    }
  }
}

function doVehicle(iNr) {
  var nodeCaption = $("caption");
  var nodeTD = new Element("td");
  nodeCaption.parentNode.parentNode.insertBefore(nodeTD,nodeCaption.parentNode.nextSibling);
  var nodeScript = new Element('script', {'type': 'text/javascript'});
  // multline-Anweisung (schließendes '\')
  nodeScript.innerHTML = "function ToggleFhzName()\n\
{\n\
  var I=$('caption');\n\
  var FN=I.value;\n\
  if (FN.substr(0,4).toUpperCase()=='"+conf.getOptVal('manualOutOfService')+" ')\n\
  { I.value = FN.substr(4,FN.length-4); }\n\
  else { I.value = '"+conf.getOptVal('manualOutOfService')+" ' + FN; }\n\
}";
  nodeTD.appendChild(nodeScript);
  var nodeA = new Element('a', {'href': 'javascript:ToggleFhzName();'});
  nodeTD.appendChild(nodeA);
  nodeA.appendChild(createText('Fahrzeug in/außer Dienst stellen'));
}

// Fahrzeugkauf
function doVehicleAssignment(iNr, iType) {
  var evalInputs = xPath.getNodes("./form/table[@class='defaultTable']/tbody/tr/td/p/input[@disabled]", 'content');

  var cnt = xPath.getNodes("./form/table[@class='defaultTable']/tbody/tr/td/p", 'content').snapshotLength;
  for (var i = 0; i < evalInputs.snapshotLength; i++) {
    evalInputs.snapshotItem(i).parentNode.style.display = "none";
    cnt--;
  }
  if (cnt == 0) {
    evalInputs.snapshotItem(0).parentNode.parentNode.appendChild(createText('keine freien Wachen verfügbar!'));
  }

  var nodeH1 = xPath.getSingle("./h1[1]", 'content');
  var fhz = conf.getFhz(nodeH1.innerHTML.trim());
  if (fhz) {
    var nodeA = new Element('a', {'href': fhz.getWiki(),
                                  'target': '_blank'});
    nodeA.appendChild(createText('Wiki'));
    var nodeSup = new Element('sup', {'class' : 'WikiLink',
                                      'title' : fhz.getWiki()});
    nodeSup.appendChild(nodeA);
    addEntityText(nodeH1, '&nbsp;');
    nodeH1.insertBefore(nodeSup, nodeH1.firstChild);
  }
}

// Abrollbehälterkauf
function doContainerAssignment(iNr, iType) {
  var evalInputs = xPath.getNodes("./form/table[@class='defaultTable']/tbody/tr/td/p/input[@disabled]", 'content');

  var cnt = xPath.getNodes("./form/table[@class='defaultTable']/tbody/tr/td/p", 'content').snapshotLength;
  for (var i = 0; i < evalInputs.snapshotLength; i++) {
    evalInputs.snapshotItem(i).parentNode.style.display = "none";
    cnt--;
  }
  if (cnt == 0) {
    evalInputs.snapshotItem(0).parentNode.parentNode.appendChild(createText('keine freien Wachen verfügbar!'));
  }

  var nodeH1 = xPath.getSingle("./h1[1]", 'content');
  /*var fhz = conf.getFhz(nodeH1.innerHTML.trim());
  if (fhz) {
    var nodeA = new Element('a', {'href': fhz.getWiki(),
                                  'target': '_blank'});
    nodeA.appendChild(createText('Wiki'));
    var nodeSup = new Element('sup', {'class' : 'WikiLink',
                                      'title' : fhz.getWiki()});
    nodeSup.appendChild(nodeA);
    addEntityText(nodeH1, '&nbsp;');
    nodeH1.insertBefore(nodeSup, nodeH1.firstChild);
  }*/
}

function doVehicleList() {
  function setFMS(nodeTB) {
    // Status als FMS Display anzeigen
    var column = -1;
    var evalTHs  = xPath.getNodes("./thead/tr/th", nodeTB);
    for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++) {
      if (evalTHs.snapshotItem(iTH).innerHTML == 'FMS') {
        column = iTH;
        break;
      }
    }

    if (column != -1) {
      var evalTDs  = xPath.getNodes("./tbody/tr/td["+ ++column +"]", nodeTB);
      for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
        var nodeTD = evalTDs.snapshotItem(iTD);
        nodeFMS = buildFMS(nodeTD, conf.getOptVal('dispFMSDisplayLinesFL'));
        removeChildren(nodeTD);
        nodeTD.appendChild(nodeFMS);
      }
    }
  }

  var nodeContent = $("content");
  var nodeTBody = xPath.getSingle("./table[contains(./tbody/tr/td, 'Anzahl Fahrzeuge:')]/tbody", 'content');
  var ArrTR=new Array;

  var evalH2s = xPath.getNodes("./h2[contains(text(), 'Feuerwache:')]", nodeContent);
  var cntStations = evalH2s.snapshotLength;
  for (iH2 = 0; iH2 < evalH2s.snapshotLength; iH2++) {
    var nodeH2 = evalH2s.snapshotItem(iH2);
    addEntityText(nodeH2, '&nbsp;');
    var href = xPath.getSingle("./a", nodeH2).getAttribute('href');
    var nodeA = new Element('a',
                            {'href' : href + '/feuerwehrleute',
                             'class': 'fontSmall',
                             'title': 'Personal'});
    nodeH2.appendChild(nodeA);
    nodeA.appendChild(createText('(Personal)'));
  }

  var nodeH1 = xPath.getSingle("./h1[1]", 'content');

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

  if (conf.getOptVal('showSummaryVehicleList')) {
    // Summenarray initialisieren
    for (var FMSstatus in FMSStatusLst) {
      if (!FMSStatusLst[FMSstatus].dispInList) {
        continue;
      }
      AnzArr[FMSstatus] = 0;
      // Anzeige Status 7 nur, wenn auch RTW vorhanden
      if (conf.getOptVal('showStatus7OnlyIfExists')) {
        if (FMSStatusLst[FMSstatus].dispAlways) {
          AnzDispStatus++;
        }
      } else {
        AnzDispStatus++;
      }
    }
  }

  var evalTBs  = xPath.getNodes("./table[@class='defaultTable' and descendant::th/text()='Zustand']", 'content');
  for (var iTB = 0; iTB < evalTBs.snapshotLength; iTB++) {
    var evalTRs = xPath.getNodes("./tbody/tr", evalTBs.snapshotItem(iTB));

    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++) {
      var nodeTR = evalTRs.snapshotItem(iTR);
      var evalTDs = xPath.getNodes("./td", nodeTR);
      var FZName = evalTDs.snapshotItem(2).innerHTML;

      if (conf.getOptVal('showSummaryVehicleList')) {
        if (!gefFZ[FZName] ) {
          gefFZ[FZName] = 1;

          gefArr[FZName] = new Array;
          for (var FMSstatus in FMSStatusLst) {
            gefArr[FZName][FMSstatus] = 0;
          }
          kmSumme[FZName] = 0;
          ZusSumArr[FZName] = 0;
        } else {
          gefFZ[FZName]++;
        }

        var Funkname = evalTDs.snapshotItem(1).getElementsByTagName("a")[0].innerHTML;

        var FZStat = evalTDs.snapshotItem(3).innerHTML.trim();
        if (FZStat=="Einsatzbereit auf Wache" && ((conf.getOptVal('manualOutOfService').length > 0)?RegExp(conf.getOptVal('manualOutOfService')+' ').test(Funkname):false)) {
          FZStat = "Außer Dienst";
        }
        var FMSstatus = '';
        switch (FZStat) {
          case "Frei (Dienstfahrt)":
            FMSstatus = '1';
             break;
          case "Einsatzbereit auf Wache":
            FMSstatus = '2';
            break;
          case "Auf dem Weg zum Einsatz":
            FMSstatus = '3';
            break;
          case "Ankunft am Einsatzort":
            FMSstatus = '4';
            break;
          case "Nicht einsatzbereit":
          case "Außer Dienst":
            FMSstatus = '6';  // zählt Beides als nicht einsatzbereit
            break;
          case "Patient aufgenommen":
            FMSstatus = '7';
            break;
          default:
            break;
        }
        gefArr[FZName][FMSstatus]++;
        AnzArr[FMSstatus]++;
        Anz++;
      }

      var FZLink = evalTDs.snapshotItem(1).innerHTML;
      var kmStand = evalTDs.snapshotItem(5).innerHTML;
      var IntkmStand = parseInt(kmStand.substr(0,kmStand.length-2).replace(".",""), 10)
      ArrTopKM.push(new Array(IntkmStand,FZLink));
      kmSumme[FZName] += IntkmStand;
      gesamtkm += IntkmStand;


      //Zustand prüfen und ggf. Link zur Werkstatt einbauen
      var TD = evalTDs.snapshotItem(6);
      var FZID = evalTDs.snapshotItem(1).getElementsByTagName("a")[0].href;
      FZID = FZID.replace("http://www.feuerwache.net/feuerwehrfahrzeuge/","");
      var Zustand = parseInt(TD.innerHTML.removeTags(), 10);
      // Prüfung abhängig davon, ob Ausgabe Schaden auf Wert aus Optionen beschränkt werden soll
      if (Zustand < (conf.getOptVal('limitDamage')?conf.getOptVal('limitDamageTo'):100)) {
        ArrTR.push(nodeTR.cloneNode(true));
      }
      ZusSumArr[FZName] += Zustand;
      gesamtZustand += Zustand;
    }
  }

  if (Anz > 0 && conf.getOptVal('showSummaryVehicleList')) {
    // RTW's vorhanden, dann auch Status 7 anzeigen
    if (gefFZ['RTW'] > 0 && conf.getOptVal('showStatus7OnlyIfExists')) {
      if (gefFZ['RTW'] > 0 && conf.getOptVal('showStatus7OnlyIfExists')) {
        AnzDispStatus++;
      }
      dispStat7 = true;
    }

   // Tabelle mit der Fahrzeugübersicht
    var table = new tableCls({'id': 'Übersichtstabelle', 'class': 'ereglamTable'});
    table.setCaption('Fahrzeugübersicht');
    // erste Zeile Überschrift
    var row = table.getNewHeadRow();
    // Fahrzeugtyp
    var cell = row.getNewCell({'rowspan': 2, 'title': 'Fahrzeugtyp', 'class': 'txtLeft'}, true);
    cell.addText('Fahrzeugtyp');
    // Anzahl
    cell = row.getNewCell({'rowspan': 2, 'class': 'txtCenter', 'title': 'Anzahl'}, true);
    cell.addText('Anz.');
    // FMS-Status
    cell = row.getNewCell({'colspan': AnzDispStatus,'class': 'txtCenter', 'title': 'Status Funkmeldesystem'}, true);
    cell.addText('Status FMS');
    // Km-Summe
    if (conf.getOptVal('showTotalkm')) {
      cell = row.getNewCell({'rowspan': 2, 'class': 'txtCenter', 'title': 'Gesamtkilometer'}, true);
      cell.addEntityText('&Sigma; km');
    }
    // Km-Durchschnitt
    if (conf.getOptVal('showAvgkm')) {
      cell = row.getNewCell({'rowspan': 2, 'class': 'txtCenter', 'title': 'durchschn. Kilometer'}, true);
      cell.addEntityText('&Oslash;-km');
    }
    // Km-Summe
    if (conf.getOptVal('showAvgDamage')) {
      cell = row.getNewCell({'rowspan': 2, 'class': 'txtCenter', 'title': 'durchschn. Schaden'}, true);
      cell.addEntityText('&Oslash;-Zust.');
    }

    // zweite Zeile Überschrift
    row = table.getNewHeadRow();
    for (FMSStatus in FMSStatusLst) {
      if (!FMSStatusLst[FMSStatus].dispInList) {
        continue;
      }
      // Status 7 nur anzeigen, wenn Fahrzeuge vorhanden
      if (!FMSStatusLst[FMSStatus].dispAlways && !dispStat7) {
        continue;
      }

      cell = row.getNewCell({'style': 'width: 60px;'+((conf.getOptVal('showStatusLangtext'))?' line-height: 14px;':''),
                             'class': 'txtCenter'+((conf.getOptVal('showStatusLangtext'))?' fontSmall':''),
                             'title': FMSStatusLst[FMSStatus].text}, true);
      cell.addText(FMSStatus);
      cell.getStyle().backgroundColor = FMSStatusLst[FMSStatus].bcol;
      if (FMSStatusLst[FMSStatus].tcol != '') {
        cell.getStyle().color = FMSStatusLst[FMSStatus].tcol;
      }

      if (conf.getOptVal('showStatusLangtext')) {
        cell.addChild(new Element('br'));
        cell.addChild(createText(FMSStatusLst[FMSStatus].text));
      }
    }

    // Tabellenkörper
    var rowCnt = 0;
    for each (fhz in conf.fhzList.getSortedList()) {
      var FZName = fhz.getName();
      if (!gefFZ[FZName]) {
        continue;
      }
      row = table.getNewBodyRow({'class':'row'+(rowCnt++)%2});
      // Fahrzeug
      cell = row.getNewCell({'class': 'txtLeft', 'title': 'Fahrzeug: ' + FZName}, true);
      var nodeA = new Element('a', {'href'  : fhz.getWiki(), 'target': '_blank'});
      nodeA.appendChild(createText('W'));
      var nodeSpan = new Element('span', {'class': 'WikiLinkDark', 'titel': fhz.getWiki()});
      nodeSpan.appendChild(nodeA);
      cell.addChild(nodeSpan);
      cell.addText(FZName);
      // Anzahl
      cell = row.getNewCell({'class': 'txtCenter', 'title': gefFZ[FZName]+' ' + FZName});
      cell.addText(gefFZ[FZName]);
      if (gefFZ[FZName] == 0) {
        cell.addClass('null');
      }
      // Spalte pro Status
      for (var FMSStatus in FMSStatusLst) {
        if (!FMSStatusLst[FMSStatus].dispInList) {
          continue;
        }
        // Status 7 nur anzeigen, wenn Fahrzeuge vorhanden
        if (!FMSStatusLst[FMSStatus].dispAlways && !dispStat7) {
          continue;
        }

        cell = row.getNewCell({'class': 'txtCenter', 'title': gefArr[FZName][FMSStatus]+' '+FZName + ' ' + FMSStatusLst[FMSStatus].text});
        cell.addText(gefArr[FZName][FMSStatus]);
        if (gefArr[FZName][FMSStatus] == 0) {
          cell.addClass('null');
        }
      }
      // Km-Summe
      if (conf.getOptVal('showTotalkm')) {
        cell = row.getNewCell({'class': 'txtRight', 'title': 'gefahrene Kilometer ' + FZName});
        cell.addText(kmSumme[FZName].format(0,'.',','));
      }
      // Km-Durchschnitt
      if (conf.getOptVal('showAvgkm')) {
        cell = row.getNewCell({'class': 'txtRight', 'title': 'durchschn. Kilometer ' + FZName});
        cell.addText(parseInt(kmSumme[FZName] / gefFZ[FZName], 10).format(0,'.',','));
      }
      // Km-Summe
      if (conf.getOptVal('showAvgDamage')) {
        cell = row.getNewCell({'class': 'txtRight', 'title': 'durchschn. Schaden ' + FZName});
        cell.addText((parseInt(10 * ZusSumArr[FZName] / gefFZ[FZName], 10) / 10).format(1,'.',',') + ' %');
      }
    }

    // Tabellenfuß
    row = table.getNewFootRow({'class': 'rowWhite'});
    // Summe
    cell = row.getNewCell({'class': 'txtLeft', 'title': 'Summe'}, true);
    cell.addText('SUMME');
    // Anzahl
    cell = row.getNewCell({'class': 'txtCenter', 'title': 'Anzahl Fahrzeuge'}, true);
    cell.addText(Anz);
    // Spalte pro Status
    for (var FMSStatus in FMSStatusLst) {
      if (!FMSStatusLst[FMSStatus].dispInList) {
        continue;
      }
      // Status 7 nur anzeigen, wenn Fahrzeuge vorhanden
      if (!FMSStatusLst[FMSStatus].dispAlways && !dispStat7) {
        continue;
      }

      cell = row.getNewCell({'class': 'txtCenter', 'title': 'Summe \'' + FMSStatusLst[FMSStatus].text + '\''}, true);
      cell.addText(AnzArr[FMSStatus]);
    }
    // Km-Summe
    if (conf.getOptVal('showTotalkm')) {
      cell = row.getNewCell({'class': 'txtRight', 'title': 'Summe Kilometer'}, true);
      cell.addEntityText(gesamtkm.format(0,'.',','));
    }
    // Km-Durchschnitt
    if (conf.getOptVal('showAvgkm')) {
      cell = row.getNewCell({'class': 'txtRight', 'title': 'durchschn. Kilometer der Summe'}, true);
      cell.addEntityText((gesamtkm / Anz).format(0,'.',','));
    }
    // Km-Summe
    if (conf.getOptVal('showAvgDamage')) {
      cell = row.getNewCell({'class': 'txtRight', 'title': 'durchschn. Schaden der Summe'}, true);
      cell.addEntityText((parseInt(10 * gesamtZustand / Anz, 10) / 10).format(1,'.',',') + ' %');
    }

    // Tabelle in Seite einfügen
    nodeContent.insertBefore(table.getDOM(),nodeH1.nextSibling);
  }

  if (nodeTBody && conf.getOptVal('listHighLowKm')) {
    // Auflistung Fahrzeuge mit höchster Laufleistung
    var row = new tableRowCls();
    var cell = row.getNewCell();
    cell.addText('Fahrzeuge mit der höchsten Laufleistung:');
    // Liste
    cell = row.getNewCell();
    ArrTopKM.sort(function s(a,b){return b[0]-a[0];});
    for (var i=0;i<((ArrTopKM.length < 5)?ArrTopKM.length:5);i++) {//Anzahl Elemente in Liste beachten
      cell.addEntityText(ArrTopKM[i][1]);
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
    for (var i=0;i<((ArrTopKM.length < 5)?ArrTopKM.length:5);i++) {//Anzahl Elemente in Liste beachten
      cell.addEntityText(ArrTopKM[i][1]);
      cell.addText(" (" + ArrTopKM[i][0].format(0,'.',',') + " km)");
      cell.addChild(new Element('br'));
    }
    nodeTBody.appendChild(row.getDOM());

    var evalTR = xPath.getNodes("./tbody/tr", nodeTBody.parentNode);
    for (iTR = 0; iTR < evalTR.snapshotLength; iTR++) {
      evalTR.snapshotItem(iTR).className = 'row'+ iTR%2;
    }
  }

  if (conf.getOptVal('showDamageList') && cntStations >= 10) {//vorher gibt es keine Beschädigungen
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
    if (conf.getOptVal('showDamagedAtFirstCall')) {
      hiddenDiv.style.display = "block";
    } else {
      hiddenDiv.style.display = "none";
    }

    var H2 = new Element("h2");
    H2.appendChild(createText("beschädigte Fahrzeuge"));
    hiddenDiv.appendChild(H2);
    if (ArrTR.length > 0) {
      var hiddTB = new Element("table", {'class': "ereglamTable"});
      hiddTB.id="Zustandstabelle";
      hiddenDiv.appendChild(hiddTB);
      nodeTBody = new Element("thead");
      hiddTB.appendChild(nodeTBody);
      // Überschrift aus Tabelle zur ersten Feuerwache holen
      nodeTBody.appendChild(xPath.getSingle("./thead/tr[1]", evalTBs.snapshotItem(0)).cloneNode(true));

      nodeTBody = new Element("tbody");
      hiddTB.appendChild(nodeTBody);

      for each (nodeTR in ArrTR) {
        nodeTBody.appendChild(nodeTR);
      }

      // Tabelle sortieren
      // function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link)
      SortTabelle(hiddTB, 6, true, true, true);
      if (conf.getOptVal('dispStatusAsFMSDisplayFL')) {
        setFMS(hiddTB);
      }
    } else {
      if (conf.getOptVal('limitDamage')) {
        var nodeInfo = createText('aktuell keine Fahrzeuge mit einem Zustand weniger als ' + conf.getOptVal('limitDamageTo') + '%.');
      } else {
        var nodeInfo = createText('aktuell keine Fahrzeuge beschädigt.');
      }
      var nodeDiv = new Element('div', { 'class' : 'form_info'});
      nodeDiv.appendChild(nodeInfo);
      hiddenDiv.appendChild(nodeDiv);
    }
    NewDiv.appendChild(hiddenDiv);

    if (conf.getOptVal('showSummaryVehicleList')) {
      nodeTable = $("Übersichtstabelle");
      nodeTable.parentNode.insertBefore(NewDiv, nodeTable.nextSibling);
    } else {
      nodeContent.insertBefore(NewDiv, nodeH1.nextSibling);
    }
  }

  if (conf.getOptVal('dispStatusAsFMSDisplayFL')) {
    var evalTBs  = xPath.getNodes("./table[@class='defaultTable' and descendant::th/text()='Fahrzeit']", 'content');
    if (evalTBs.snapshotLength == 1) {
      setFMS(evalTBs.snapshotItem(0));
    }

    var evalTBs  = xPath.getNodes("./table[@class='defaultTable' and descendant::th/text()='Zustand']", 'content');
    for (iTB = 0; iTB < evalTBs.snapshotLength; iTB++) {
      setFMS(evalTBs.snapshotItem(iTB));
    }
  }
}

function doCrewLists() {
  function getTrainingTable(iArr) {
    // Ausbildungsübersicht
    var table = new tableCls({'class': 'ereglamTable',
                              'name' : 'summary',
                              'style': 'width: 100%'});
    // Tabellenkopf
    var row = table.getNewHeadRow();
    var cell = row.getNewCell({'style': 'width: 25%; text-align: left'},true);
    cell.addText('Ausbildung');
    cell = row.getNewCell({'style': 'width: 15%; text-align: center'},true);
    cell.addText('Summe');
    for (pers in personalStatusLst) {
      cell = row.getNewCell({'style': 'width: 15%; text-align: center'},true);
      cell.getStyle().color = (conf.getOptVal('useStatusColourCode'))?personalStatusLst[pers].tcol:'';
      cell.addText(personalStatusLst[pers].text);
    }

    // Tabellenfuß
    row = table.getNewFootRow({'class': 'rowWhite'});
    cell = row.getNewCell({'style': 'text-align: left;'});
    cell.addText('gesamt');
    cell = row.getNewCell({'style': 'text-align: right;'});
    cell.addText(iArr['total']['total']);
    for (pers in personalStatusLst) {
      cell = row.getNewCell({'style': 'text-align: right'});
      cell.getStyle().color = (conf.getOptVal('useStatusColourCode'))?personalStatusLst[pers].tcol:'';
      cell.addText(iArr['total'][pers]);
    }

    // Tabellenkörper
    var rowCnt = 0;
    for (train in trainingLst) {
      if (iArr[train]['total'] > 0) {
        row = table.getNewBodyRow({'class': 'row'+(rowCnt++)%2});
        table.addBodyRow(row);
        cell = row.getNewCell({'style': 'text-align: left;'});
        cell.getStyle().color = (conf.getOptVal('useTrainingColourCode'))?trainingLst[train].tcol[conf.getLayout()]:'';
        cell.addText(train);
        cell = row.getNewCell({'style': 'text-align: right;'});
        cell.addText(iArr[train]['total']);
        for (pers in personalStatusLst) {
          cell = row.getNewCell({'style': 'text-align: right;'});
          cell.getStyle().color = (conf.getOptVal('useStatusColourCode'))?personalStatusLst[pers].tcol:'';
          cell.addText(iArr[train][pers]);
        }
      }
    }
    return table.getDOM();
  }

  function initArray() {
    //zweidimensionale Sammlung
    var AnzArr = {};
    // Initialisierung
    AnzArr['total'] = {};
    AnzArr['total']['total'] = 0;
    for (pers in personalStatusLst) {
      AnzArr['total'][pers] = 0;
    }
    for (train in trainingLst) {
      AnzArr[train] = {};
      AnzArr[train]['total'] = 0;
      for (pers in personalStatusLst) {
        AnzArr[train][pers] = 0;
      }
    }

    return AnzArr;
  }

  function displayCrew(iTable) {
    var flgs = {};
    flgs.motiv  = conf.getOptVal('useMotivationColourCode');
    flgs.abil   = conf.getOptVal('useAbilityColourCode');
    flgs.train  = conf.getOptVal('useTrainingColourCode');
    flgs.shift  = conf.getOptVal('useShiftColourCode');
    flgs.status = conf.getOptVal('useStatusColourCode');

    var columns = getColumns(iTable);

    var AnzArr = initArray();
    var evalTRs = xPath.getNodes("./tbody/tr", iTable);
    for (iTR = 0; iTR < evalTRs.snapshotLength; iTR++) {
      var nodeTR = evalTRs.snapshotItem(iTR);
      var evalTDs = xPath.getNodes("./td", nodeTR);

      highlightCrew(nodeTR, columns, flgs);

      var nodeTD = evalTDs.snapshotItem(columns['Status'] - 1);
      var stat = nodeTD.innerHTML.trim();
      var nodeA = xPath.getSingle('./a[1]', nodeTD);
      if (nodeA) {
        stat = nodeA.innerHTML.trim();
      }

      // Ausbildungsstand
      AnzArr['total']['total']++;
      AnzArr['total'][stat]++;
      nodeTD = evalTDs.snapshotItem(columns['Ausbildung'] - 1);

      var cnt = 0;
      if (!nodeTD.title.trim()) {
        AnzArr['ohne']['total']++;
        AnzArr['ohne'][stat]++;
      } else {
        var trainArr = nodeTD.title.split(',');
        for each (train in trainArr) {
          train = train.trim();

          if (!AnzArr[train]) {
            AnzArr[train] = {};
            AnzArr[train]['total'] = 0;
            for (pers in personalStatusLst) {
              AnzArr[train][pers] = 0;
            }
          }
          AnzArr[train]['total']++;
          AnzArr[train][stat]++;
        }
      }

    }
    return AnzArr;
  }

  running = true;
  var totalsArr = initArray();
  var stationArr = {};
  var stationName = '';
  var station;
  var hasBF = false;
  stationArr['total'] = {};
  for (train in trainingLst) {
    stationArr['total'][train] = 0;
  }
  stationArr['total']['total'] = 0;

  var evalTables = xPath.getNodes("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Ausbildung']", 'content');
  for (var iTable = 0; iTable < evalTables.snapshotLength; iTable++) {
    var nodeTable = evalTables.snapshotItem(iTable);
    var nodeH2 = xPath.getSingle("preceding-sibling::h2[1]", nodeTable);
    var nodeA = xPath.getSingle("a[1]", nodeH2);
    if (nodeA) {
      stationName = nodeA.innerHTML.trim();
      if (/feuerwachen\/(\d+)$/.test(nodeA.href)) {
        station = conf.stationList.getStation(RegExp.$1);
        if (station) {
          if (station.isBF()) {
            hasBF = true;
          }
        }
      }
      addEntityText(nodeH2, '&nbsp;');
      nodeA = new Element('a', {'href' : nodeA.href + "/feuerwehrautos",
                                'class': 'fontSmall'});
      nodeH2.appendChild(nodeA);
      nodeA.appendChild(createText('(Fahrzeuge)'));
    }

    MachSortierbar(nodeTable);
    if (conf.getOptVal('defaultTabSort') != "none") {
      SortiereNachSpalte(nodeTable, conf.getOptVal('defaultTabSort'))
    }
    var nodeSpan = new Element('span', {'class': 'fontSmall'});
    nodeSpan.appendChild(createText('Zum Sortieren Spaltenüberschrift anklicken'));
    nodeTable.parentNode.insertBefore(nodeSpan, nodeTable);

    var trainArr = displayCrew(nodeTable);
    nodeTable.parentNode.insertBefore(getTrainingTable(trainArr), nodeSpan);

    if (evalTables.snapshotLength > 1) {
      stationArr[stationName] = {};
      for (train in trainingLst) {
        stationArr[stationName][train] = 0;
      }

      stationArr[stationName]['total'] = trainArr['total']['total'];
      stationArr['total']['total'] += trainArr['total']['total'];
    }

    for (train in trainArr) {
      if (evalTables.snapshotLength > 1 && train !== 'total') {
        stationArr[stationName][train] += trainArr[train]['total'];
        stationArr['total'][train] += trainArr[train]['total'];
      }
      if (!totalsArr[train]) {
        totalsArr[train] = {};
        totalsArr[train]['total'] = 0;
        for (pers in personalStatusLst) {
          totalsArr[train][pers] = 0;
        }
      }
      for (pers in trainArr[train]) {
        totalsArr[train][pers] += trainArr[train][pers];
      }
    }
  }
  if (evalTables.snapshotLength > 1) {
    var nodeH1 = xPath.getSingle("h1[1]", 'content');
    nodeH1.parentNode.insertBefore(getTrainingTable(totalsArr), nodeH1.nextSibling);

    if (hasBF) {
      var table = new tableCls({'class': 'ereglamTable',
                                'name' : 'training',
                                'style': 'width: 100%'});
      table.setCaption('Ausbildung je Wache');
      // Tabellenkopf
      var row = table.getNewHeadRow();
      var cell = row.getNewCell({},true);
      cell.addText('Wache');
      cell = row.getNewCell({'style': 'text-align: center;'},true);
      cell.addText('Personal');
      for (train in trainingLst) {
        if (trainingLst[train].ktext !== 'uA') {
          cell = row.getNewCell({'title': trainingLst[train].text, 'style': 'text-align: center;'},true);
          cell.getStyle().color = (conf.getOptVal('useTrainingColourCode'))?trainingLst[train].tcol[conf.getLayout()]:'';
          cell.addText(trainingLst[train].ktext);
        }
      }
      // Tabellenfuß
      row = table.getNewFootRow({'class': 'rowWhite'});
      cell = row.getNewCell();
      cell.addText('Summe');
      cell = row.getNewCell({'title': stationArr['total']['total'] + ' Feuerwehrangehörige', 'style': 'text-align: right;'});
      cell.addText(stationArr['total']['total']);
      for (train in trainingLst) {
        if (trainingLst[train].ktext !== 'uA') {
          cell = row.getNewCell({'title': stationArr['total'][train] + ((trainingLst[train].ktext !== 'oA')?' mit Lehrgang ':' ') + trainingLst[train].text, 'style': 'text-align: right;'});
          cell.getStyle().color = (conf.getOptVal('useTrainingColourCode'))?trainingLst[train].tcol[conf.getLayout()]:'';
          cell.addText(stationArr['total'][train]);
        }
      }

      // Tabellenkörper
      var rowCnt = 0;
      var title = '';
      for (stationName in stationArr) {
        if (stationName === 'total') {
          continue;
        }
        row = table.getNewBodyRow({'class': 'row'+(rowCnt++)%2});
        cell = row.getNewCell({},true);
        cell.addText(stationName);
        cell = row.getNewCell({'title': stationName + ': ' + stationArr[stationName]['total'] + ' Feuerwehrangehörige', 'style': 'text-align: right;'});
        cell.addText(stationArr[stationName]['total']);
        for (train in trainingLst) {
          if (trainingLst[train].ktext !== 'uA') {
            if (stationArr[stationName][train]) {
              title = stationName + ': ' + stationArr[stationName][train] + ((trainingLst[train].ktext !== 'oA')?' mit Lehrgang ':' ') + trainingLst[train].text;
            } else {
              title = '';
            }
            cell = row.getNewCell((title)?{'title': title, 'style': 'text-align: right;'}:{});
            if (stationArr[stationName][train] > 0) {
              cell.getStyle().color = (conf.getOptVal('useTrainingColourCode'))?trainingLst[train].tcol[conf.getLayout()]:'';
              cell.addText(stationArr[stationName][train]);
            }
          }
        }
      }
      $('content').appendChild(table.getDOM());
    }
  }
  running = false;
}

function doJaunt(iNum) {
  var nodeTBody = xPath.getSingle("./form/table[@class='defaultTable']/tbody[1]", 'content');;
  var evalTDs = xPath.getNodes("./tr/td[2]", nodeTBody);
  var motSum = 0;
  for (iTD = 0; iTD < evalTDs.snapshotLength; iTD++) {
    nodeTD = evalTDs.snapshotItem(iTD);
    var mot = parseInt(nodeTD.innerHTML.trim(), 10);
    motSum += mot;
    if (conf.getOptVal('useMotivationColourCode')) {
      for (var motivation in motivationLst) {
        if (mot >= motivation) {
          nodeTD.style.color = motivationLst[motivation].tcol;
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
  if (conf.getOptVal('useMotivationColourCode')) {
    for (var motivation in motivationLst) {
      if (avg >= motivation) {
        cell.getStyle().color = motivationLst[motivation].tcol;
        break;
      }
    }
  }
  nodeTFoot.appendChild(row.getDOM());
  nodeTBody.parentNode.insertBefore(nodeTFoot, nodeTBody);
}

function doAllRecruiting() {
  var evalTHs,
    nodeTH,
    node,
    station,
    re = /(-\s+)(\d+)(\s+Feuerwehrleute)/,
    valStr = '',
    proz = 0,
    man = 0,
    iTH = 0;

  if ($('campaign')) {
    evalTHs = xPath.getNodes("./table/tbody/tr/th[./a]", 'campaign');
    if (evalTHs.snapshotLength > 0 && conf.getOptVal('highlightManning')) {
      for (;iTH < evalTHs.snapshotLength; iTH++) {
        nodeTH = evalTHs.snapshotItem(iTH);
        node = xPath.getSingle("./a[1]", nodeTH);
        if (/feuerwachen\/(\d+)$/.test(node.href)) {
          station = conf.stationList.getStation(RegExp.$1);
          if (re.test(nodeTH.innerHTML) && station && station.isBF()) {
            valStr = RegExp.$2;
            proz = parseInt(valStr, 10) / station.getMaxCrew() * 100;
            for (man in staffingLst) {
              if (proz > man) {
                node = new Element('span', {'style': 'color: '+ staffingLst[man].tcol + ';'});
                node.appendChild(createText(valStr));
                valStr = '- ' + outerHTML(node) + ' Feuerwehrleute';
                nodeTH.innerHTML = nodeTH.innerHTML.replace(re, valStr);
                break;
              }
            }
          }
        }
      }
    }
  }
}

function doRecruiting(iNum) {
  var evalTDs,
    nodeTD,
    node,
    station,
    re = /(\d+)(\s+Feuerwehrleute)/,
    valStr = '',
    restStr = '',
    proz = 0,
    man = 0,
    iTD = 0;

  evalTDs = xPath.getNodes("./form/table/tbody/tr[contains(./td[1]/text(), 'Feuerwehrleute')]/td[2]", 'content');
  if (evalTDs.snapshotLength > 0 && conf.getOptVal('highlightManning')) {
    for (;iTD < evalTDs.snapshotLength; iTD++) {
      nodeTD = evalTDs.snapshotItem(iTD);
      station = conf.stationList.getStation(iNum);
      if (re.test(nodeTD.innerHTML) && station.isBF()) {
        valStr = RegExp.$1;
        restStr = RegExp.$2;
        proz = parseInt(valStr, 10) / station.getMaxCrew() * 100;
        for (man in staffingLst) {
          if (proz > man) {
            node = new Element('span', {'style': 'color: '+ staffingLst[man].tcol + ';'});
            node.appendChild(createText(valStr));
            valStr = outerHTML(node) + restStr;
            nodeTD.innerHTML = nodeTD.innerHTML.replace(re, valStr);
            break;
          }
        }
      }
    }
  }
}

function SortiereNachSpalte(Tab,SortBy) {
  var Spalte = -1;
  var c=0;
  var evalTHs = xPath.getNodes('./thead/tr/th', Tab);
  for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++) {
    if (evalTHs.snapshotItem(iTH).innerHTML == SortBy) {
      Spalte=c;
    }
    c++;
  }
  if (Spalte == -1) {
    return;
  }

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

function SortiereNachSpalteClick(event) {
  var t = event.target;
  var SortBy = t.innerHTML;
  var Tab = t.parentNode.parentNode.parentNode;
  if (!Tab) return;

  SortiereNachSpalte(Tab,SortBy);
}

function MachSortierbar(myTB) {
  var evalTHs = xPath.getNodes('./thead/tr/th', myTB);
  for (iTH = 0; iTH < evalTHs.snapshotLength; iTH++) {
    evalTHs.snapshotItem(iTH).addEventListener ( "click" ,
      function(e) {
        SortiereNachSpalteClick(e)
      }
    , true ) ;
  }
}

function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link) {
  var nodeTBody = myTB.getElementsByTagName("tbody")[0];
  if (!nodeTBody) {
    return;
  }
  var ArrTR = new Array();
  for each (var nodeTR in nodeTBody.getElementsByTagName("tr")) {
    ArrTR.push(nodeTR);
  }

  if (ArrTR.length==0) {
    return;
  }

  ArrTR.sort(function(x,y){return TableSort(x,y,Spalte,Richtung,Numerisch,Link);});

  for (var i=0;i<ArrTR.length;i++) {
    try {
      if (ArrTR[i].style.display == 'none') {
        continue;
      }
      ArrTR[i].className = 'row'+ i%2;
      nodeTBody.appendChild(ArrTR[i]);
    } catch(Exception) {
      continue;
    }
  }
}

// sortiert Tabellenspalten nach Spalte S
function TableSort(Z1,Z2,S,richtung,num,link) {
  // übergeben werden zwei <tr> Objekte und die Spaltennummer,
  // nach der sortiert werden soll
  // die weiteren Parameter bedeuten:
  // richtung (t/f)    = Richtung (true = A->Z, false = Z->A)
  // num (true/false)  = numerisch sortieren? sonst alphanumerisch
  // link (true/false) = Zelleninhalt ist ein Link
  var S1,S2;

  if (!Z1.getElementsByTagName) {
    return 0;
  }
  var TDs = Z1.getElementsByTagName("td");
  if (TDs.length <= S) return 0;
  S1 = TDs[S].innerHTML.removeTags();

  if (!Z2.getElementsByTagName) {
    return 0;
  }
  TDs = Z2.getElementsByTagName("td");
  if (TDs.length <= S) {
    return 0;
  }
  S2 = TDs[S].innerHTML.removeTags();

  if (num) {
    S1 = parseInt(S1.replace(".",""), 10);
    S2 = parseInt(S2.replace(".",""), 10);
  }

  if (richtung) {
    if (S1 < S2) {
      return -1;
    }
    if (S1 > S2) {
      return 1;
    }
  } else {
    if (S1 < S2) {
      return 1;
    }
    if (S1 > S2) {
      return -1;
    }
  }
  return 0;
}

// erstellt die Konfigurationsseite
function displayConfig() {
  // Einstellungen speichern
  function saveConfig() {
    var isAllValid = true;
    var nodeInfo = $('ereglamsInfo');
    var msgTitle = '';
    var msgClass = '';

    errLog.refresh();
    removeChildren(nodeInfo);

    for each (opt in conf.optList.getList()) {
      var nodeInput;
      var isValid = true;
      var nodeSpan = $('config.'+opt.getName());
      nodeSpan.style.backgroundColor = '';
      switch(opt.getType()) {
        case OptType.bool:
          nodeInput = $('chk_' + opt.getName());
          opt.setValue(nodeInput.checked);
          break;
        case OptType.radio :
          for each (val in opt.getList()) {
            nodeInput = $('rad_' + opt.getName() + '.' + val.getKey());
            if (nodeInput.checked) {
              opt.setValue(nodeInput.value);
            }
          }
          break;
        case OptType.color:
          nodeInput = $('inp_' + opt.getName());
          if (opt.hasChkFunc()) {
            try {
              isValid = opt.execChkFunc(nodeInput.value);
            } catch(e) {
              isValid = false;
              errLog.addMsg('opt.hasChkFunc() ' + e);
            }
          } else {
            isValid = true;
          }

          if (isValid) {
            opt.setValue(nodeInput.value);
          } else {
            nodeSpan.style.backgroundColor = 'red';
            isAllValid = false;
          }
          break;
        case OptType.colList:
        case OptType.list:
          var nodeSel = $('sel_' + opt.getName());
          opt.setValue(nodeSel.options[nodeSel.selectedIndex].value);
          break;
        case OptType.integer :
          nodeInput = $('val_' + opt.getName());
          if (opt.hasChkFunc()) {
            try {
              isValid = opt.execChkFunc(nodeInput.value);
            } catch(e) {
              isValid = false;
              errLog.addMsg('opt.hasChkFunc() ' + e);
            }
          } else {
            isValid = true;
          }

          if (isValid) {
            opt.setValue(nodeInput.value);
          } else {
            nodeInput.parentNode.style.backgroundColor = 'red';
            isAllValid = false;
          }
          break;
        case OptType.string :
          nodeInput = $('str_' + opt.getName());
          if (opt.hasChkFunc()) {
            try {
              isValid = opt.execChkFunc(nodeInput.value);
            } catch(e) {
              isValid = false;
              errLog.addMsg('opt.hasChkFunc() ' + e);
            }
          } else {
            isValid = true;
          }

          if (isValid) {
            opt.setValue(nodeInput.value);
          } else {
            nodeSpan.style.backgroundColor = 'red';
            isAllValid = false;
          }
          break;
        default:
          break;
      }
    }

    if (isAllValid) {
      if (conf.optList.save()) {
        msgTitle = 'Einstellungen gespeichert.';
        msgClass = 'form_success';
      } else {
        msgTitle = 'Es ist ein Fehler beim Speichern aufgetreten.';
        msgClass = 'form_error';
      }
    } else {
      msgTitle = 'Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.';
      msgClass = 'form_error';
    }

    nodeInfo.setAttribute('class', msgClass);
    nodeInfo.appendChild(createText(msgTitle));
    for each (msg in errLog.getMsgs()) {
      nodeInfo.appendChild(new Element('br'));
      nodeInfo.appendChild(createText(msg));
    }
    errLog.refresh();
  }

  // Zeile zu einer Einstellung anlegen
  function createConfigLine(iOpt) {
    var nodeSpan = new Element('span');
    nodeSpan.id = 'config.'+iOpt.getName();
    // Änderungsanzeiger
    addEntityText(nodeSpan, (iOpt.isModified()?'*':'&nbsp;')+'&nbsp;');

    switch (iOpt.getType()) {
      case OptType.bool :
        // Checkbox
        var nodeInput = new Element('input', { 'name' : iOpt.getName(), 'id'   : 'chk_' + iOpt.getName(), 'type' : 'checkbox'});
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
        for each(val in iOpt.getList()) {
          var nodeInput = new Element('input', { 'name'  : iOpt.getName(), 'id'    : 'rad_' + iOpt.getName() + '.' + val.getKey(), 'type'  : 'radio', 'value' : val.getKey()});
          if (iOpt.getValue() == val.getKey()) {
            nodeInput.defaultChecked = true;
          }
          nodeSpan.appendChild(nodeInput);

          // Text
          var nodeLabel = new Element('label', {'for': 'rad_' + iOpt.getName() + '.' + val.getKey()});
          nodeLabel.appendChild(createText(' ' + val.getVal() + ' '));
          nodeSpan.appendChild(nodeLabel);
          addEntityText(nodeSpan, '&nbsp;&nbsp;');
        }
        break;
      case OptType.color:
        // Text
        nodeSpan.appendChild(createText(iOpt.getText() + ': '));
        var nodeInput = new Element('input', {'style': 'width: 5em;', 'name': iOpt.getName(), 'id': 'inp_' + iOpt.getName(), 'type': 'text', 'class': 'color', 'maxLength': '6', 'autocomplete': 'off'});
        var tmpNode = new Element('div');
        tmpNode.style.backgroundColor = iOpt.getValue();
        var jsCol = new jscolor.color(nodeInput);
        jsCol.fromString(convertRGBDecimalToHex(getComputedStyle(tmpNode).backgroundColor));
        nodeSpan.appendChild(nodeInput);
        break;
      case OptType.colList:
        // Text
        nodeSpan.appendChild(createText(iOpt.getText() + ': '));
        var nodeSel = new Element('select', { 'name': iOpt.getName(), 'id': 'sel_' + iOpt.getName()});
        for each(val in iOpt.getList()) {
          var nodeOpt = new Option();
          nodeOpt.name  =
          nodeOpt.value = val.getKey();
          nodeOpt.style.backgroundColor = val.getKey();
          nodeOpt.appendChild(createText(val.getVal()));
          if (iOpt.getValue() == val.getKey()) {
            nodeOpt.selected = true;
            nodeSel.style.backgroundColor = val.getKey();
          }
          nodeSel.add(nodeOpt, null);
        }
        nodeSpan.appendChild(nodeSel);
        break;
      case OptType.list:
        // Text
        nodeSpan.appendChild(createText(iOpt.getText() + ': '));
        var nodeSel = new Element('select', { 'name' : iOpt.getName(), 'id': 'sel_' + iOpt.getName()});
        for each(val in iOpt.getList()){
          var nodeOpt = new Option();
          nodeOpt.name  =
          nodeOpt.value = val.getKey();
          nodeOpt.appendChild(createText(val.getVal()));
          if (iOpt.getValue() == val.getKey()) {
            nodeOpt.selected = true;
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
        var nodeInput = new Element('input', { 'name': iOpt.getName(), 'id': 'val_' + iOpt.getName(), 'type': 'text', 'style': 'text-align: right;', 'size': iOpt.getLen(), 'length': iOpt.getLen(), 'maxLength': iOpt.getLen()});
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
        var nodeInput = new Element('input', { 'name': iOpt.getName(), 'id': 'str_' + iOpt.getName(), 'type': 'text', 'style': 'text-align: left;', 'size': iOpt.getLen(), 'length': iOpt.getLen(), 'maxLength': iOpt.getLen()});
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

  page.text = new Element('p', {'onClick': 'javascript:$("ereglamsInfo").innerHTML=ereglamConf.write();'});
  page.text.appendChild(createText("\
Hier besteht die Möglichkeit, Optionen zu verschiedenen Seiten zu pflegen. \n\
Es werden nur die Werte gespeichert, die von der Vorgabe im Script abweichen."));

  for each(optGrp in conf.optGrpList.getList()) {
    var tableSet = {};
    tableSet.rows = [];
    tableSet.caption = optGrp.getText();

    for each(opt in optGrp.getOptList()) {
      row = new tableRowCls();
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

function displayAAOConfig() {
  function saveEStichworte() {
    var isAllValid = true;
    var nodeInfo = $('ereglamsInfo');
    var msgTitle = '';
    var msgClass = '';

    errLog.refresh();
    removeChildren(nodeInfo);

    // zunächst die Eingaben prüfen
    for each (mld in conf.mldList.getList()) {
      var isValid = true;
      var nodeChk = $('unw.' + mld.getName());
      mld.setStorm(nodeChk.checked);

      // Alarmierungsstichwort auswerten
      var nodeSel = $('sel.' + mld.getName());
      nodeSel.parentNode.style.backgroundColor = '';
      var eReq = nodeSel.options[nodeSel.selectedIndex].value.trim();
      if (eReq === STW_UNDEF) {
        isValid = false;
        nodeSel.parentNode.style.backgroundColor = 'red';
        errLog.addMsg(mld.getName()+': "+STW_UNDEF+" ist nicht als gültiges Stichwort vorgesehen.');
      }

      // zusätzliche Fahrzeuge
      var nodeInputAdd = $('add.' + mld.getName());
      nodeInputAdd.parentNode.style.backgroundColor = '';
      var eAdd = nodeInputAdd.value.trim();
      if (eAdd.indexOf('|') !== -1) {
        isValid = false;
        nodeInputAdd.parentNode.style.backgroundColor = 'red';
        errLog.addMsg(mld.getName()+': "|" ist nicht hier nicht zulässig.');
      }

      // optionale Fahrzeuge
      var nodeInputOpt = $('opt.' + mld.getName());
      nodeInputOpt.parentNode.style.backgroundColor = '';
      var eOpt = nodeInputOpt.value.trim();
      if (eOpt.indexOf('|') != -1) {
        isValid = false;
        nodeInputOpt.parentNode.style.backgroundColor = 'red';
        errLog.addMsg(mld.getName()+': "|" ist nicht hier nicht zulässig.');
      }

      // Verbandsauftrag
      var nodeInputOpt = $('vbOrd.' + mld.getName());
      mld.setVBOrder(nodeInputOpt.checked);

      // Eingabe zusammensetzen
      var eCls = eReq + ((eAdd != '')?'+'+eAdd:'') + ((eOpt != '')?'|'+eOpt:'');
      var aao = {};
      try {
        aao = new aaoCls(eCls, conf);
      } catch(e) {
        isValid = false;
        nodeSel.parentNode.style.backgroundColor = 'red';
        nodeInputAdd.parentNode.style.backgroundColor = 'red';
        nodeInputOpt.parentNode.style.backgroundColor = 'red';
        errLog.addMsg(mld.getName()+': "'+eCls+'" ist kein gültiger Alarmvorschlag: '+e);
        isAllValid = false;
      }

      if (isValid) {
        mld.setAao(aao);
      } else {
        isAllValid = false;
      }
    }

    if (isAllValid) {
      if (conf.mldList.save()) {
        msgTitle = 'Stichwortzuordnungen gespeichert.';
        msgClass = 'form_success';
      } else {
        msgTitle = 'Es ist ein Fehler beim Speichern aufgetreten.';
        msgClass = 'form_error';
      }
    } else {
      msgTitle = 'Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.';
      msgClass = 'form_error';
    }

    nodeInfo.setAttribute('class', msgClass);
    nodeInfo.appendChild(createText(msgTitle));
    for each (msg in errLog.getMsgs()) {
      nodeInfo.appendChild(new Element('br'));
      nodeInfo.appendChild(createText(msg));
    }
    errLog.refresh();
  }

  function getNodeResetMld(mld) {
    var rstNode = new Element('input', {'type' : 'reset', 'class': 'button', 'name' : mld.getName(), 'title': 'Scriptvorgabe wieder herstellen', 'value': '*', 'onclick': 'javascript:\
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
Hier besteht die Möglichkeit, die Zuordnung von Einsatzmeldung zu Alarmierungsstichwort und zusätzlichen, sowie optionalen Fahrzeuggruppen zu pflegen. \n\
Zur Eingabe der zusätzlichen/optionalen Fahrzeuggruppen dürfen als Trennzeichen nur ',' und '/' (für Alternativen) verwendet werden: z.B. 'LF,LF/HLFS/TS'. \
Die gültigen Fahrzeuggruppen seht Ihr unter "));
  nodeA = new Element('a', {'href'  : menus.fGrp.link});
  nodeA.appendChild(createText(menus.fGrp.text));
  page.text.appendChild(nodeA);
  page.text.appendChild(createText('.'));

  var tableSet = {};
  tableSet.rows = [];
  var row = new tableRowCls();
  tableSet.headRow = row;

  // Wiki-Link
  var cell = row.getNewCell({'class': 'fontSmall', 'style': 'width: 25px;', 'title': 'Wiki-Link'}, true);
  cell.addText('W');

  // Einsatzmeldung
  cell = row.getNewCell({'style': 'width: 240px;', 'title': 'Einsatzmeldung'}, true);
  cell.addText('Einsatzmeldung');

  // Wassereinsatz
  cell = row.getNewCell({'class': 'fontSmall', 'style': 'width: 30px;', 'title': 'Wassereinsatz'}, true);
  cell.addText('Was.');

  // Unwettereinsatz
  cell = row.getNewCell({'class': 'fontSmall', 'style': 'width: 30px;', 'title': 'Unwettereinsatz'}, true);
  cell.addText('Unw.');

  // Alarmierungsstichwort
  cell = row.getNewCell({'style': 'width: 200px;', 'title': 'Alarmierungsstichwort'}, true);
  cell.addText('Stichwort');

  // zusätzl. Fahrzeuge
  cell = row.getNewCell({'style': 'width: 130px;', 'title': 'zusätzliche Fahrzeuggruppen'}, true);
  cell.addText('zus. Fahrz.');

  // optionale Fahrzuege
  cell = row.getNewCell({'style': 'width: 130px;', 'title': 'optionale Fahrzeuggruppen'}, true);
  cell.addText('opt. Fahrz.');

  // modifiziertes Element
  cell = row.getNewCell({'class': 'fontSmall', 'title': 'modifiziert'}, true);
  cell.addText('mod.');

  // Verbandseinsatz
  cell = row.getNewCell({'class': 'fontSmall', 'title': 'Verbandseinsatz'}, true);
  cell.addText('VB.');

  for each (mld in conf.mldList.getSortedList(false)) {
    row = new tableRowCls();
    tableSet.rows.push(row);

    // Wiki-Link
    cell = row.getNewCell({}, true);
    var nodeA = new Element('a', {'href'  : mld.getWiki(), 'target': '_blank'});
    nodeA.appendChild(createText('W'));
    var nodeSpan = new Element('span', {'class' : 'WikiLinkDark', 'title' : mld.getWiki()});
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
    if (mld.isModOnWater()) {
      cell.addText('*');
    }

    // Unwetter
    cell = row.getNewCell({'class' : 'fontSmall'});
    var nodeChkbox = new Element('input', {'type' : 'checkbox'});
    nodeChkbox.checked = mld.isStorm();
    nodeChkbox.disabled = true;
    nodeChkbox.id = 'unw.' + mld.getName();
    cell.addChild(nodeChkbox);
    if (mld.isModStorm()) {
      cell.addText('*');
    }

    // Alarmierungstichwort
    cell = row.getNewCell();
    var nodeSel = new Element('select', {'class': 'fontSmall', 'style': 'width: 200px;', 'id'   : 'sel.' + mld.getName(), 'title': 'Tooltipp in Liste zeigt Fahrzeuggruppen'});
    for each (stw in conf.stwList.getSortedList(true)) {
      nodeOption = new Option();
      nodeOption.value = stw.getName();
      nodeOption.text  = stw.getName() + ': ' + stw.getText();
      nodeOption.title = stw.getFhze().toString();
    // noch den aktuellen Wert für die Selektionsauswahl einstellen
      if (stw.getName() == mld.getAao().getStw().getName())
      { nodeOption.selected = true;
      }
      nodeSel.add(nodeOption, null); // hinten anhängen
    }
    if (mld.getAao().getStw().getName() != mld.getAaoDef().getStw().getName()) {
      nodeSel.title += ': ' + mld.getAaoDef().getStw().getName();
    }
    cell.addChild(nodeSel);

    // Inputfelder
    // zusätzl. Fahrzeuge
    var nodeInput = new Element('input', {'style': 'width: 120px;', 'class': 'fontSmall', 'type' : 'text'});
    cell = row.getNewCell({'class': 'fontSmall'});
    nodeInput.id = 'add.' + mld.getName();
    nodeInput.defaultValue =
    nodeInput.value        = mld.getAao().getAddStr(false);
    if (nodeInput.value != mld.getAaoDef().getAddStr(false)) {
      nodeInput.title = mld.getAaoDef().getAddStr(false);
      if (!nodeInput.title) {
        nodeInput.title = '-'
      }
    }
    cell.addChild(nodeInput);

    // optionale Fahrzeuge
    cell = row.getNewCell({'class': 'fontSmall'});
    nodeInput = new Element('input', {'style': 'width: 120px;', 'class': 'fontSmall', 'type' : 'text'});
    nodeInput = nodeInput.cloneNode(true);
    nodeInput.id = 'opt.' + mld.getName();
    nodeInput.defaultValue =
    nodeInput.value        = mld.getAao().getOptStr(false);
    if (nodeInput.value != mld.getAaoDef().getOptStr(false)) {
      nodeInput.title = mld.getAaoDef().getOptStr(false);
      if (!nodeInput.title) {
        nodeInput.title = '-'
      }
    }
    cell.addChild(nodeInput);

    cell.addChild(nodeInput);

    // Reset-Funktion
    cell = row.getNewCell({'class': 'fontSmall'});
    if (mld.isModAao()) {
      cell.addChild(getNodeResetMld(mld));
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

function displayAAOKeyConfig() {
  // Fahrzeugzuordnungen zu Alarmierungsstichworten speichern
  function saveAaoKeys() {
    var isAllValid = true;
    var nodeInfo = $('ereglamsInfo');
    var fCol = {};
    var msgTitle = '';
    var msgClass = '';

    errLog.refresh();
    removeChildren(nodeInfo);

    for each (stw in conf.stwList.getList(true)) {
      var isValid = true;
      // Text zum Alarmierungsstichwort
      var nodeInput = $('etx.' + stw.getName());
      nodeInput.parentNode.style.backgroundColor = '';
      var eTxt = nodeInput.value;
      // nach verbotenen Zeichen suchen
      if (/[<>;=]/.test(eTxt)) {
        isValid = false;
        nodeInput.parentNode.style.backgroundColor = 'red';
        isAllValid = false;
      }

      if (isValid) {
        // Alarmierungsstichwort auswerten
        nodeInput = $('ecl.' + stw.getName());
        nodeInput.parentNode.style.backgroundColor = '';
        try {
          fCol = new fhzColCls(nodeInput.value.trim(), conf);
        } catch(e) {
          isValid = false;
          nodeInput.parentNode.style.backgroundColor = 'red';
          errLog.addMsg(stw.getName()+': "'+nodeInput.value.trim()+'" ist kein gültiger Alarmvorschlag: '+e);
          isAllValid = false;
        }
      }

      if (isValid) {
        stw.setText(eTxt);
        stw.setFhze(nodeInput.value.trim());
      }
    }

    if (isAllValid) {
      if (conf.stwList.save()) {
        msgTitle = 'Fahrzeugzuordnungen gespeichert.';
        msgClass = 'form_success';
      } else {
        msgTitle = 'Es ist ein Fehler beim Speichern aufgetreten.';
        msgClass = 'form_error';
      }
    } else {
      msgTitle = 'Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.';
      msgClass = 'form_error';
    }

    nodeInfo.setAttribute('class', msgClass);
    nodeInfo.appendChild(createText(msgTitle));
    for each (msg in errLog.getMsgs()) {
      nodeInfo.appendChild(new Element('br'));
      nodeInfo.appendChild(createText(msg));
    }
    errLog.refresh();
  }

  function nodeResetAaoKey(stw, isText) {
    var rstNode = new Element('input', {'type' : 'reset', 'class': 'button', 'name' : stw.getName(), 'title': 'Scriptvorgabe wieder herstellen', 'value': '*', 'onclick': 'javascript:'+(isText?
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
Hier kann man die Fahrzeuggruppen, die einem Alarmierungsstichwort zugeordnet sind, ändern. \
Zur Eingabe der Fahrzeuggruppen dürfen als Trennzeichen nur ',' und '/' (für Alternativen) verwendet werden: z.B. 'LF,LF/HLFS/TS'. \
Die gültigen Fahrzeuggruppen seht Ihr unter "));

  nodeA = new Element('a', {'href'  : menus.fGrp.link});
  nodeA.appendChild(createText(menus.fGrp.text));
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
  var cell = row.getNewCell({'style': 'width: 120px;', 'title': 'Alarmierungsstichwort'}, true);
  cell.addText('Stichwort');

  // Text
  cell = row.getNewCell({'style': 'width: 250px;', 'colspan' : '2', 'title': 'Text zum Stichwort'}, true);
  cell.addText('Text');

  // Fahrzeuge
  cell = row.getNewCell({'style': 'width: 250px;', 'colspan' : '2', 'title': 'zu alarmierende Fahrzeuggruppen zum Stichwort'}, true);
  cell.addText('Fahrzeuge');

  for each (stw in conf.stwList.getSortedList(true)) {
    row = new tableRowCls();
    tableSet.rows.push(row);

    // Alarmierungsstichwort
    cell = row.getNewCell({'style': 'text-align: left;'}, true);
    cell.addText(stw.getName());

    // Text-Reset
    cell = row.getNewCell({'id': 'rtx.' + stw.getName()});
    if (stw.isModTxt()) {
      cell.addChild(nodeResetAaoKey(stw, true));
    }

    // Text
    cell = row.getNewCell();
    nodeInput = new Element('input', {'class': 'fontSmall', 'style': 'width: 250px;', 'id'   : 'etx.' + stw.getName(), 'type' : 'text'});
    nodeInput.defaultValue =
    nodeInput.value        = stw.getText();
    if (stw.getText() != stw.getTextDef()) {
      nodeInput.title = stw.getTextDef();
    }
    cell.addChild(nodeInput);

    // Fahrzeuge-Reset
    cell = row.getNewCell({'id': 'rcl.' + stw.getName()});
    if (stw.isModFhze()) {
      cell.addChild(nodeResetAaoKey(stw, false));
    }

    // Fahrzeuge
    cell = row.getNewCell();
    nodeInput = new Element('input', {'class': 'fontSmall', 'style': 'width: 250px;', 'id'   : 'ecl.' + stw.getName(), 'type' : 'text'});
    nodeInput.defaultValue =
    nodeInput.value        = stw.getFhzList().toString();
    if (stw.getFhze().compare(stw.getFhzeDef())) {
      nodeInput.title = stw.getFhzDefList().toString();
      if (!nodeInput.title) {
        nodeInput.title = '-'
      }
    }
    cell.addChild(nodeInput);

  }
  page.tables.push(tableSet);

  // Speicherroutine
  page.saveFunc = saveAaoKeys;

  running = true;
  displayConfPage(page, menus);
  running = false;
}

function displayAAOVehicleConfig() {
  // Fahrzeuge speichern
  function saveFahrzeuge() {
    var isValid = true;
    var nodeInfo = $('ereglamsInfo');
    var msgTitle = '';
    var msgClass = '';

    errLog.refresh();
    removeChildren(nodeInfo);

    if (isValid) {
      msgTitle = 'Fahrzeuge gespeichert.';
      msgClass = 'form_success';
    } else {
      msgTitle = 'Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.';
      msgClass = 'form_error';
    }

    nodeInfo.setAttribute('class', msgClass);
    nodeInfo.appendChild(createText(msgTitle));
    for each (msg in errLog.getMsgs()) {
      nodeInfo.appendChild(new Element('br'));
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

  // FahrzeugID
  var cell = row.getNewCell({'title': 'FahrzeugID'}, true);
  cell.addText('ID');

  // Fahrzeug
  cell = row.getNewCell({'style': 'width: 200px;',
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

  for each (fhz in conf.fhzList.getSortedList()) {
    row = new tableRowCls();
    tableSet.rows.push(row);

    // FahrzeugID
    cell = row.getNewCell({'style': 'text-align: right;'}, true);
    cell.addText(fhz.getID());

    // Fahrzeug
    cell = row.getNewCell({'style': 'text-align: left;'}, true);
    row.addCell(cell);
    nodeA = new Element('a', {'href'  : fhz.getWiki(),
                              'target': '_blank'});
    nodeA.appendChild(createText('W'));
    var nodeSpan = new Element('span', {'class' : 'WikiLinkDark', 'title' : fhz.getWiki()});
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
    var nodeSelGrp = new Element('select', {'class': 'fontSmall', 'id'   : 'sel.' + fhz.getName(), 'style': 'width: 200px;'});
    for each (fhzGrp in conf.fhzGrpList.getList()) {
      nodeOptionGrp = new Option();
      nodeOptionGrp.value = fhzGrp.getName();
      nodeOptionGrp.text  = fhzGrp.getName() + ': ' + fhzGrp.getText();
    // noch den aktuellen Wert für die Selektionsauswahl einstellen
      if (fhzGrp.getName() == fhz.getGrp()) {
        nodeOptionGrp.selected = true;
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

function displayAAOVehicleGroupConfig() {
  // Fahrzeuggruppen speichern
  function saveFhzGruppe(){
    var isValid = true;
    var nodeInfo = $('ereglamsInfo');
    var msgTitle = '';
    var msgClass = '';

    errLog.refresh();
    removeChildren(nodeInfo);

    if (isValid) {
      msgTitle = 'Fahrzeuggruppen gespeichert.';
      msgClass = 'form_success';
    } else {
      msgTitle = 'Es sind Fehler aufgetreten. Bitte kontrolliere deine Eingaben.';
      msgClass = 'form_error';
    }

    nodeInfo.setAttribute('class', msgClass);
    nodeInfo.appendChild(createText(msgTitle));
    for each (msg in errLog.getMsgs()) {
      nodeInfo.appendChild(new Element('br'));
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
  var cell = row.getNewCell({'style': 'width: 200px;', 'title': 'Fahrzeuggruppe'}, true);
  cell.addText('Fahrzeuggruppe');

  // interne Abkürzung
  cell = row.getNewCell({'title': 'im Script verwendete Abkürzung'}, true);
  cell.addText('Abk.');

  // Wachvoraussetzungen
  cell = row.getNewCell({'title': 'Wachvoraussetzungen'}, true);
  cell.addText('ab');

  // Wassereinssatz
  cell = row.getNewCell({'title': 'Wassereinsatz', 'class': 'fontSmall'}, true);
  cell.addText('Wasser');

  // Auflistungsreihenfolge
  cell = row.getNewCell({'style': 'width: 100px;', 'title': 'Reihenfolge bei Auflistungen'}, true);
  cell.addText('Reihenfolge');

  // zugeordnete Fahrzeuge
  cell = row.getNewCell({'title': 'zugeordnete Fahrzeuge'}, true);
  cell.addText('Fahrzeuge');

  for each (fhzGrp in conf.fhzGrpList.getList(/* gesamte Liste*/)) {
    row = new tableRowCls();
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
    var nodeSelSeq = new Element('select', {'class': 'fontSmall', 'id'   : 'sel.' + fhzGrp.getName(), 'style': 'width: 100px;'});
    nodeSelSeq.disabled = false; // für's Erste deaktivieren
    for (var i = 1; i <= conf.fhzGrpList.getCount(); i++) {
      nodeOptionSeq = new Option();
      nodeOptionSeq.value = i;
      nodeOptionSeq.text  = 'an ' + i + '. Stelle';
      // noch den aktuellen Wert für die Selektionsauswahl einstellen
      if (i == fhzGrp.getSequence()) {
        nodeOptionSeq.selected = true;
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
function getAreaDescription(x, y) {
  var locArr = [];
  for (loc in locationLst) {
    if (locationLst[loc].from.x <= x && locationLst[loc].from.y <= y &&
        locationLst[loc].to.x >= x && locationLst[loc].to.y >= y) {
      locArr.push(locationLst[loc].text);
    }
  }
  return locArr.reverse().join(', ');
}

function setMsg(iNode, iType) {
  running = true; // Script ist aktiv (u.a. bei Ereignis nodeInserted benötigt)

  var type = '';
  var msgTitle = '';
  if (iType) {
    type = iType;
  }

  if (typeof(iNode) === 'string') {
    if (!type) {
      type = 'form_info';
    }
    var nodeDiv = new Element('div', {'class': type});
    nodeDiv.appendChild(createText(iNode));
    iNode = nodeDiv;
  } else if (objType(iNode) == 'logCls') {
    if (!type) {
      switch(iNode.getType()) {
        case 'E':
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
    } else {
      type = 'form_error';
      msgTitle = 'Fehler im Script:';
    }

    var nodeDiv = new Element('div', {'class': type});
    if (msgTitle) {
      nodeDiv.appendChild(createText(msgTitle));
      nodeDiv.appendChild(new Element('br'));
    }
    for each (msg in iNode.getMsgs()) {
      nodeDiv.appendChild(createText(msg));
      nodeDiv.appendChild(new Element('br'));
    }
    if (iNode.getType() == 'E') {
      iNode.display();// auf der Konsole ausgeben
    }
    iNode = nodeDiv;
  }

  if (!msgArea){
    msgArea = new Element('div', {'style': 'color: white;', 'id'   : 'msgArea'});
    $('container').insertBefore(msgArea, $('content'));
  } else {
    removeChildren(msgArea);
  }

  msgArea.appendChild(iNode);

  running = false; // Script ist soweit fertig
}

// wird aufgerufen bei Änderungen im DOM
function nodeInserted(e) {
//writeStr('runnning = ' + running+'\n'+getParents(e.target)+'\n'+e.target.innerHTML.trim().substr(0,200));
  // wenn ich selbst für die Änderung verantwortlich bin, nichts unternehmen
  if (running || !e.target.innerHTML || /^\s*$/.test(e.target.innerHTML)) {
    return;
  }
//writeStr(getParents(e.target)+'\n'+e.target.innerHTML.trim().substr(0,200));
  ajaxReload = true;

  var node = undefined;
  switch (e.target.nodeName) {
    case 'TABLE':
      node = xPath.getSingle("parent::div/parent::form/preceding-sibling::h2[1]", e.target);
      if (node && ('Feuerwehrschule' == node.innerHTML.trim())) {
        window.setTimeout((function () { displaySchool(false) }()), 10);
      }
      node = xPath.getSingle("parent::div/parent::form/preceding-sibling::h2[1]", e.target);
      if (node && ('Übungsgelände' == node.innerHTML.trim())) {
        window.setTimeout((function () { displayTraining() }()), 10);
      }
      node = xPath.getSingle("parent::div[@id='mission_content']/h2[1]", e.target);
      if (node && ('Rückmeldungen und Fakten' == node.innerHTML.trim())) {
        window.setTimeout((function () { main.main() }()), 100);
      }
      node = xPath.getSingle("parent::div[@id='mission_content']/preceding-sibling::h1[1]", e.target);
      if (node && ('Aktuelle Einsätze' == node.innerHTML.trim())) {
        window.setTimeout((function () { main.main() }()), 10);
      }
      break;
    case 'DIV':
      break;
    case 'H1':
      if ('Leitstellenansicht' == e.target.innerHTML.trim()) {
        displayControlCenter();
      }
      break;
    case 'H2':
      break;
    case 'UL':
      if (xPath.getSingle("parent::div[@id='startMissionList']", e.target)) {
        var evalAs = xPath.getNodes("./li/a", e.target);
        for (iA = 0; iA < evalAs.snapshotLength; iA++) {
          var nodeA = evalAs.snapshotItem(iA);
          var mld = conf.getMld(nodeA.innerHTML.trim());
          nodeA.title = mld.write();
          if (main.hasVB) {
            if (conf.getOptVal('highlightVBOrder') && mld.isVBOrder()) {
              nodeA.style.color = conf.getOptVal('highlightVBOrderColor');
              nodeA.style.fontWeight = 'bold';
            }
          }
          if (conf.getOptVal('highlightOrder') && main.order == mld.getName()) {
            nodeA.style.color = conf.getOptVal('highlightOrderColor');
            nodeA.style.fontWeight = 'bold';
            nodeA.style.fontStyle = 'italic';
            if (conf.getOptVal('highlightOrderBlink')) {
              nodeA.style.textDecoration = 'blink';
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
function timeCls(iTime) {
  var day = 0,
    hour = 0,
    min = 0,
    sec = 0;

  // Zeit in Sekunden umwandeln
  var convTime2Sec = function(iTime) {
    if (iTime == 'Keine Anfahrtszeit') {
      return 0;
    } else {
      // ca. dd Tag hh Std. mm Min. ss Sek.
      //  1: 'dd Tag(e)'; 2: 'dd'; 3: 'hh Std.'; 4: 'mm Min.'; 5: 'mm'; 6: 'ss Sek.'; 7: 'ss'
      var [, , dd, , hh, , mm, , ss] = /(ca. (\d{1,2})\sTag\s?)?((\d{1,2})\sStd.\s?)?((\d{1,2})\s?Min.\s?)?((\d{1,2})\s?Sek.\s*)?/.exec(iTime);

      day  = (!dd || isNaN(dd))? 0 : parseInt(dd, 10);
      hour = (!hh || isNaN(hh))? 0 : parseInt(hh, 10);
      min  = (!mm || isNaN(mm))? 0 : parseInt(mm, 10);
      sec  = (!ss || isNaN(ss))? 0 : parseInt(ss, 10);
    }
  };

  this.getTime = function() {
    return new Date(1970, 1, day + 1, hour, min, sec);
  };

  this.getSeconds = function() {
    return ((day * 24) + hour) * 3600 + min * 60 + sec;
  };

  var get2Digit = function (iVal) {
    return (iVal <= 9? '0' : '') + iVal;
  };

  this.toString = function() {
    return ((day * 24) + hour) + ':' + get2Digit(min) + ':' + get2Digit(sec);
  };

  if (objType(iTime) == 'string') {
    convTime2Sec(iTime.trim());
  } else if (!isNaN(iTime)) {
    sec = iTime % 60;
    iTime /= 60;
    min = iTime % 60;
    iTime /= 60;
    hour = iTime % 24;
    day = iTime / 24;
  }
}

// Laufzeitdaten
function mainCls(iConf) {
  this.user = '';
  this.order = '';
  this.townExtent = true;
  this.trainService = true;
  this.miningService = true;
  this.garbageService = true;
  this.alliance = '';
  this.hasVB = false; //Spieler hat einen Verband
  this.hasUpdate = getValue(GMVAL_PREF_SYS + 'hasUpdate', false);
  this.updVersion = getValue(GMVAL_PREF_SYS + 'updVersion', '');
  this.meta = {};
  var cnf = iConf,
    checkInterval = 6*60*60; // einmal alle 6 Stunde [s]

  this.getClass = function() {
    return 'mainCls';
  }

  this.init = function() {
    var eval, node;

    // hole Benutzername
    node = xPath.getSingle("//li/ul/li/a[contains(text(), 'Benutzer:')]", 'root');
    if (node) {
      this.user = node.innerHTML.trim().replace('Benutzer: ', '');
      cnf.stationList.setUser(this.user);
    }

    // hole Auftragseinsatz
    node = $('navigation_mission_quest_full');
    if (node) {
      this.order = node.getAttribute('value');
      eval = xPath.getNodes("//li/ul/li[contains(./text(), 'Anzahl:')]", 'root');
      if (eval.snapshotLength > 0) {
        //writeStr(eval.snapshotLength);
      }
    }

    // hole Großbaustelle
    node = xPath.getSingle("//li/ul/li/div[contains(text(), 'Großbaustelle:')]", 'root');
    if (node) {
      /Großbaustelle: (\d+) - (\d+)/.test(node.innerHTML.trim());
      locationLst['Großbaustelle'].from =
      locationLst['Großbaustelle'].to   = {x: parseInt(RegExp.$1, 10), y: parseInt(RegExp.$2, 10)};
    }

    // hole Hinweis auf Stadterweiterung
    node = xPath.getSingle("//li[contains(./a/text(), 'Feuerwachen')]/ul/li/a[contains(./@href, '/stadt/')]", 'root');
    if (node) {
      var hrefArr = node.href.split('/');
      switch (hrefArr[hrefArr.length - 1].trim()) {
        case "ausbauen":
          this.townExtent = false;
          this.trainService = false;
          this.miningService = false;
          this.garbageService = false;
          break;
        case "bahnhof":
          this.trainService = false;
          this.miningService = false;
          this.garbageService = false;
          break;
        case "tagebau":
          this.miningService = false;
          this.garbageService = false;
          break;
        case "mva":
          this.garbageService = false;
          break;
        default:
          break;
      }
    }

    // hole Hinweis auf Verbandszugehörigkeit
    node = xPath.getSingle("//li[contains(./a/text(), 'Verband')]/ul/li[1]", 'root');
    if (node) {
      this.hasVB = !(/Gründen/.test(node.innerHTML.trim()));
    }

    // Daten zu Feuerwachen des Users laden
    var uStr = getValue(GMVAL_PREF_UFW+cnf.world+'_'+escape(this.user), undefined);
    if (!uStr) {
      uStr = getValue(GMVAL_PREF_UFW+escape(this.user), undefined);

      if (uStr) {
        setValue(GMVAL_PREF_UFW+cnf.world+'_'+escape(this.user), uStr);
        delValue(GMVAL_PREF_UFW+escape(this.user));
      }
    }
    if (uStr) {
      var [key, value] = uStr.split('=');
      var fwArr = [];
      if (value) fwArr = value.split(',');
      var gmVals = listValues();
      for (var i = 0; i < gmVals.length; i++) {
        switch(gmVals[i].substr(0, 4)) {
          case GMVAL_PREF_EST:
            var num = gmVals[i].substr(4);
            if ((fwArr.indexOf(num) != -1) && !cnf.stationList.getStation(parseInt(num, 10))) {
              var station = new stationCls();
              station.deserialize(getValue(gmVals[i]));
              cnf.stationList.addStation(station);
            }
            break;
        }
      }
    } else if (this.user && location.pathname != '/feuerwachen') {
      var nodeDiv = new Element('div', {'class': 'form_info'});
      nodeDiv.appendChild(createText('Keine gespeicherte Liste der Feuerwachen gefunden. Bitte '));
      var nodeA = new Element('a', {'href': '/feuerwachen'});
      nodeA.appendChild(createText('Feuerwachenliste'));
      nodeDiv.appendChild(nodeA);
      nodeDiv.appendChild(createText(' aufsuchen!'));
      setMsg(nodeDiv);
    }

    var cntFW = 0;
    var cntBF = 0;
    if ($('scripter_feuerwache_all')) {
      cntFW = /\d+/.exec($('scripter_feuerwache_all').innerHTML);
    }
    if ($('scripter_feuerwache_bf')) {
      cntBF = /\d+/.exec($('scripter_feuerwache_bf').innerHTML);
    }
    if ((cntFW > 0) && (cntFW != cnf.stationList.getCntFW() || cntBF != cnf.stationList.getCntBF())) {
      var nodeDiv = new Element('div', {'class': 'form_info'});
      nodeDiv.appendChild(createText('Anzahl Feuerwachen stimmt nicht mit den gespeicherten Werten überein. Bitte '));
      var nodeA = new Element('a', {'href': '/feuerwachen'});
      nodeA.appendChild(createText('Feuerwachenliste'));
      nodeDiv.appendChild(nodeA);
      nodeDiv.appendChild(createText(' aufsuchen!'));
      setMsg(nodeDiv);
      cnf.stationList.setCntFW(cntFW);
      cnf.stationList.setCntBF(cntBF);
    }

    if (cnf.getOptVal('adjustMenus') && this.user) {
      // entfernen Link zum Credit-Log
      xPath.getSingle("//li/ul/li[starts-with(./a/text(), 'Credits:')]", 'root').style.display = 'none';

      node = xPath.getSingle("//li/ul/li[contains(./a/text(), 'Einstellungen')]", 'root');
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
      nodeImg = new Element('img', { 'src'  : '/images/email.png', 'class': 'famfamfamicon', });
      nodeImg.title =
      nodeImg.alt   = 'Nachrichten';
      nodeA = new Element('a', {'target': '_self', 'href': '/posteingang'});
      nodeA.innerHTML = 'Posteingang';
      nodeLi.appendChild(nodeImg);
      nodeLi.appendChild(nodeA);
      node.appendChild(nodeLi);
    }

    if (cnf.getOptVal('showMainInformation') && this.user) {
      var bgCol = '',
          offset = 10;
      if (cnf.getOptVal('setInfoBoxRight')) {
        var nodeContent = $('content');
        offset += nodeContent.offsetLeft + nodeContent.offsetWidth;
      }
      var nodeDiv = new Element('div', {'id': 'ereglamInfoBox', 'style': 'position:fixed;top:50px;left:'+offset+'px;padding:4px;font-size:120%;background-color:#959595;border:2px solid;border-color:white black black white;'});
      if (cnf.world > 0) {
        for (var iW = 1; iW <= WORLDS; iW++) {
          bgCol = '';
          if (cnf.getOptVal('highlightWorlds')) {
            var bgCol = cnf.getOptVal('highlightWorldColor_'+iW)+';';
            if (bgCol) {
              bgCol = 'background-color:' + bgCol;
            }
          }
          var nodeSpan = new Element('span', {'id':'ereglamWorld'+iW, 'style': 'margin-left:2px;margin-right:2px;border:2px solid;'+bgCol+'border-color:'+((cnf.world == iW)?'black white white black;':'white black black white;')});
          nodeSpan.style.color = ((iW == cnf.world)?'white':'lightgray');
          addEntityText(nodeSpan, '&nbsp;&nbsp;');
          if (iW == cnf.world) {
            nodeSpan.appendChild(createText('Welt '+iW));
          } else {
            var nodeA = new Element('a', {'title': 'wechseln zu Welt '+iW, 'href': 'http://www.feuerwache.net/welten/'+iW});
            nodeA.appendChild(createText('Welt '+iW));
            nodeSpan.appendChild(nodeA);
          }
          addEntityText(nodeSpan, '&nbsp;&nbsp;');
          nodeDiv.appendChild(nodeSpan);
        }
      }
      $('container').appendChild(nodeDiv);
      if ($('ereglamInfoBox')) {
        var table = new tableCls({'id': 'ereglamInfoTable', 'style': 'width:150px;font-size: 75%'});
        var row;
        var cell;
        if (this.user) {
          row = table.getNewBodyRow();
          cell = row.getNewCell({}, true);
          cell.addText('Benutzer');
          cell = row.getNewCell();
          cell.addText(this.user);
        }
        if (this.order) {
          row = table.getNewBodyRow();
          cell = row.getNewCell({}, true);
          cell.addText('Auftrag');
          cell = row.getNewCell();
          cell.addText(this.order);
        }
        if (this.townExtent) {
          row = table.getNewBodyRow();
          cell = row.getNewCell({'colspan': '2', 'text-align': 'center'}, true);
          cell.addText('Stadterweiterung');
        }
        if (this.trainService) {
          row = table.getNewBodyRow();
          cell = row.getNewCell({'colspan': '2', 'text-align': 'center'}, true);
          cell.addText('Bahnauschreibung');
        }
        if (this.miningService) {
          row = table.getNewBodyRow();
          cell = row.getNewCell({'colspan': '2', 'text-align': 'center'}, true);
          cell.addText('Tagebau');
        }
        if (this.garbageService) {
          row = table.getNewBodyRow();
          cell = row.getNewCell({'colspan': '2', 'text-align': 'center'}, true);
          cell.addText('Müllverbrennung');
        }
        if (this.alliance) {
          row = table.getNewBodyRow();
          cell = row.getNewCell({}, true);
          cell.addText('Verband');
          cell = row.getNewCell();
          cell.addText(this.alliance);
        }
        if (cnf.stationList.getCntFW() > 0) {
          row = table.getNewBodyRow();
          cell = row.getNewCell({}, true);
          cell.addText('Wachen');
          cell = row.getNewCell({'style': 'text-align: right'});
          cell.addText(cnf.stationList.getCntFW()+((cntFW > 0 && cnf.stationList.getCntFW() != cntFW)?'/'+cntFW:''));
          if (cnf.stationList.getCntBF() > 0) {
            row = table.getNewBodyRow();
            cell = row.getNewCell({}, true);
            cell.addText('davon BF');
            cell = row.getNewCell({'style': 'text-align: right'});
            cell.addText(cnf.stationList.getCntBF()+((cntBF > 0 && cnf.stationList.getCntBF() != cntBF)?'/'+cntBF:''));
          }
        }

        nodeDiv.appendChild(table.getDOM());
      }
    }

    this.checkUpdate();

    // Listener registrieren, um auf Änderungen an den Seiten zu reagieren
    document.addEventListener("DOMNodeInserted", nodeInserted, false);
  }

  this.checkUpdate = function() {
    var date = new Date;

    if (conf.getOptVal('checkForUpdates') && checkLastUpd(date) && !this.hasUpdate) {
      xmlhttpRequest( {
          method: 'GET',
          url: METAURL,
          headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
          onload:
            function(resp) {
              writeStr('Checking for updates: response status= '+resp.status);
              if (resp.status == 200) {
                this.meta = parseHeaders(resp.responseText);
                this.updVersion = this.meta.version;
                this.hasUpdate = (this.updVersion != getValue(GMVAL_PREF_SYS + 'version',''));

                setValue(GMVAL_PREF_SYS + 'hasUpdate', this.hasUpdate);
                setValue(GMVAL_PREF_SYS + 'updVersion', this.updVersion);
                setValue(GMVAL_PREF_SYS + 'description', this.meta.description);
                setUpdMsg(this.hasUpdate, this.updVersion);
              } else {
                setMsg('Kein Update möglich: Suche nach Versionsdaten auf userscript.org liefert Status "'+resp.status+'"', 'form_error');
                return;
              }
            }
        }
      );
      setValue(GMVAL_PREF_SYS + 'lastUpdate', date.toString());
    }
  }

  function checkLastUpd(iDate) {
    var lastUpd = getValue(GMVAL_PREF_SYS + 'lastUpdate', undefined);
    var date = new Date;
    if (!lastUpd) {
      return true;
    } else if (lastUpd.length == 8) {// alte Datumsangabe
      [,yearStr,monthStr,dayStr] = lastUpd.match(/(\d{4})(\d{2})(\d{2})/);
      date = new Date(parseInt(yearStr.replace(/^0*/,''), 10), parseInt(monthStr.replace(/^0*/,''), 10)-1, parseInt(dayStr.replace(/^0*/,''), 10));
    } else {
      [,dStr] = lastUpd.match(/^\w{3}\s(.*)\s\w{3}\+\d{4}/); //Timezone entfernen
      date = new Date(dStr);
    }
    return (checkInterval < (Math.round(iDate.getTime()/1000) - Math.round(date.getTime()/1000)));
  }

  function parseHeaders(iMeta) {
    var headers = {};
    var line, name, prefix, header, key, value;

    for each (line in iMeta.split(/\n/)) {
      delete name, value;
      try {
        [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
      } catch (e) {
        continue;
      }

      if (name === "licence") {
        name = "license";
      }

      [key, prefix] = name.split(/:/).reverse();

      if (prefix) {
        if (!headers[prefix]) {
          headers[prefix] = new Object;
        }
        header = headers[prefix];
      } else {
        header = headers;
      }

      if (header[key] && !(header[key] instanceof Array)) {
        header[key] = new Array(header[key]);
      }

      if (header[key] instanceof Array) {
        header[key].push(value);
      } else {
        header[key] = value;
      }
    }

    headers["licence"] = headers["license"];

    return headers;
  }

  function setUpdMsg(hasUpd, updVers) {
    if (hasUpd && (!$('divUpdateInfo'))) {
      var nodeDiv = new Element('div', {'id'   : 'divUpdateInfo',
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

      if (getValue(GMVAL_PREF_SYS + 'description', undefined)) {
        nodeDiv.appendChild(new Element('br'));
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

  this.main = function() {
    if (conf.getOptVal('checkForUpdates')) {
      setUpdMsg(this.hasUpdate, this.updVersion);
    }

    var path = location.pathname;
    if (path == menus.config.link) {
      displayConfig();
    } else if (path == menus.mld.link) {
      displayAAOConfig();
    } else if (path == menus.stw.link) {
      displayAAOKeyConfig();
    } else if (path == menus.fhz.link) {
      displayAAOVehicleConfig();
    } else if (path == menus.fGrp.link) {
      displayAAOVehicleGroupConfig();
    }

    // weitere Verarbeitung abbrechen, wenn kein User gefunden wurde
    if (!this.user) {
      return;
    }

    // Wacheninfo zentral setzen
    if (conf.getOptVal('tooltipOnStationLink') && conf.stationList.getCntFW() > 0) {
      var evalAs = xPath.getNodes("//a[contains(@href, 'feuerwachen/')]", 'content');
      for (var iA = 0; iA < evalAs.snapshotLength; iA++) {
        var nodeA = evalAs.snapshotItem(iA);
        if (/feuerwachen\/(\d+)$/.test(nodeA.href)) {
          var station = conf.stationList.getStation(RegExp.$1);
          if (station) {
            nodeA.parentNode.title = station.write().replace(/\n/g, ', ');
          }
        }
      }
    }

    if (path == '/feuerwehr-einsaetze') {
      doOverview();
    } else if (/\/feuerwehr-einsaetze\/(\d+)$/.test(path)) {
      doCall(RegExp.$1);
    } else if (/\/feuerwehr-einsaetze\/(\d+)\/funk(\/\d+)?$/.test(path)) {
      doRadioTransscript();
    } else if (path == '/feuerwehrleitstelle') {
      displayControlCenter();
    } else if (path == '/feuerwehrfahrzeuge') {
      doVehicleList();
    } else if (/\/feuerwehrfahrzeuge\/(\d+)\/verschieben$/.test(path)) {
      doVehicleAssignment(RegExp.$1);
    } else if (/\/feuerwehrfahrzeuge\/(\d+)\/bearbeiten$/.test(path)) {
      doVehicle(RegExp.$1);
    } else if (/\/feuerwehrfahrzeuge\/(\d+)$/.test(path)) {
      displayVehicle(RegExp.$1);
    } else if (/\/feuerwehrfahrzeuge\/(\d+)\/reparieren$/.test(path)) {
      doVehicleRepair(RegExp.$1);
    } else if (/\/vehicle_to_user\/show\/id\/(\d+)\/repair\/true$/.test(path)) {
      doVehicleRepairSent(RegExp.$1);
    } else if (/\/vehicle\/show\/caption_url\/(.*)$/.test(path)) {
      doVehicleAssignment(0, RegExp.$1);
    } else if (/\/container\/show\/caption_url\/(.*)$/.test(path)) {
      doContainerAssignment(0, RegExp.$1);;
    } else if (path == '/feuerwehrfahrzeuge_markt') {
      ;
    } else if (path == '/feuerwachen') {
      displayStationList();
    } else if (/\/feuerwachen\/(\d+)$/.test(path)) {
      displayStation(RegExp.$1);
    } else if (/\/startseite\/(\d+)\/(\d+)\/ausbau\/(\d+)$/.test(path)) {
      /* bisher keine verläßliche Information auf neue Stufe (Reload würde nicht erkannt) */
    } else if (/\/startseite\/(\d+)\/(\d+)\/bau\/(\d+)$/.test(path)) {
      conf.stationList.buildStation(RegExp.$3, RegExp.$1, RegExp.$2);
    } else if (/\/feuerwache\/destroy\/id\/(\d+)$/.test(path)) {
      conf.stationList.removeStation(RegExp.$1);
    } else if (/\/feuerwachen\/(\d+)\/feuerwehrleute$/.test(path)) {
      doCrewLists();
    } else if (/\/feuerwachen\/(\d+)\/feuerwehrautos$/.test(path)) {
      displayStationVehicles(RegExp.$1);
    } else if (/\/feuerwachen\/(\d+)\/werbeaktion$/.test(path)) {
      doRecruiting(RegExp.$1);
    } else if (/\/personal\/jaunt\/feuerwache_id\/(\d+)$/.test(path)) {
      doJaunt(RegExp.$1);
    } else if (path == '/feuerwachen/werbeaktion') {
      doAllRecruiting();
    } else if (path == '/gebaeude') {
      displayBuildingList();
    } else if (path == '/personal_ausflug_premium') {
      ;
    } else if (path == '/personal/list') {
      doCrewLists();
    } else if (/\/building_to_user\/show\/id\/(\d+)$/.test(path)) {
      displayBuilding(RegExp.$1);
    } else if (/\/toplist(\/\d+)?$/.test(path) || /\/toplist\/monatlich$/.test(path)) {
      displayToplist(this.user);
    } else if (/\/verband\/.*/.test(path)) {
      displayToplist(this.user);
    } else if (/\/event_logfile\/.*/.test(path)) {
      doLoglist();
    }
  }
}