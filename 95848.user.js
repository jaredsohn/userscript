// ==UserScript==
// @name           Feuerwache.net CarstenR's AAO und Tools
// @namespace      http://userscripts.org/users/ereglam
// @copyright      2011, CarstenR 
// @license        GPL version 3 oder jede spätere Version; http://www.gnu.org/copyleft/gpl.html
// @description    Alarm- und Ausrückordnung, sowie weitere Tools für das Browserspiel Feuerwache.net
// @include        http://www.feuerwache.net/*
// @exclude        http://www.feuerwache.net/forum/*
// @author         CarstenR auf Basis von Ereglam
// @info           Zusammenführung diverser Scripte auf Basis von Sawos' Script (http://syslord.org/feuerwache.net/)
// @info2          Basiert auf Ereglam und u.a. auf Teilen aus MasterJM und DarkPrince Scripten, sowie aus Ideen im Bannermod-Script von Schlumpf
// @version        2011-06-02 17:00
// ==/UserScript==

/*
  dieses Script stellt den Versuch dar, aus diversen Scripten die interessantesten und besten Ideen in Diesem zu vereinen und die AAO an die des KatSchutz Verbandes anzupassen.
  Ideen aus folgenden Scripten wurden verwendet:
  Sawos                : grundlegende Struktur inklusiver letzter Neuerungen vom 10.März.2010
  MasterJM             : AAO, Fahrzeugübersicht mit zweizeiliger Überschrift, Farbgebung der Einsatzklasse
  DarkPrince           : Langtexte zu Einsatzklassen, erweiterte Farbgebung der Motivation der Mannschaft
  Schlumpf's Bannermod : Einstelldialog, Grafiken in Feuerwachenliste
  Ereglam              : Vereinigung von allem zu diesem Gesamtwerk

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

const USERSCRIPTID="20214"; // diese Konstante ist anzupassen
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

  'Auffahrunfall'                  : {stwDef: 'F1+GW-Öl'                    , storm: false, wiki: 'Auffahrunfall'                 , ab:  '4 FW'},
  'Baum auf Auto'                  : {stwDef: 'TH2'                         , storm: true,  wiki: 'Baum_auf_Auto'                 , ab:  '9 FW'},
  'Baum auf Dach'                  : {stwDef: 'TH1+DLK'                     , storm: true,  wiki: 'Baum_auf_Dach'                 , ab:  '8 FW'},
  'Baum auf Straße'                : {stwDef: 'TH1'                         , storm: true,  wiki: 'Baum_auf_Stra%C3%9Fe'          , ab:  '1 FW'},
  'Brand in KFZ-Werkstatt'         : {stwDef: 'F2+TLF,KW'                   , storm: false, wiki: 'Brand_in_KFZ-Werkstatt'        , ab: '15 FW'},
  'Brand in Schule'                : {stwDef: 'F4+GW-A|TLF'                 , storm: false, wiki: 'Brand_in_Schule'               , ab:  '5 FW'},
  'Brand in Spedition'             : {stwDef: 'F4+RW,TLF,GW-L2|GW-M,GW-G'                     , storm: false, wiki: 'Brand_in_Spedition'            , ab:  '5 FW'},
  'Brand in Sporthalle'            : {stwDef: 'F5'                          , storm: false, wiki: 'Brand_in_Sporthalle'           , ab: '40 FW'},
  'Brand im Sägewerk'              : {stwDef: 'F5'                          , storm: false, wiki: 'Brand_im_S%C3%A4gewerk'        , ab: '40 FW'},
  'Brand im Supermarkt'            : {stwDef: 'F3|KW'                       , storm: false, wiki: 'Brand_im_Supermarkt'           , ab:  '4 FW'},
  'Brennende Bäume'                : {stwDef: 'F1'                          , storm: false, wiki: 'Brennende_B%C3%A4ume'          , ab:  '2 FW'},
  'Brennende Telefonzelle'         : {stwDef: 'F0'                          , storm: false, wiki: 'Brennende_Telefonzelle'        , ab:  '1 FW'},
  'Brennender LKW'                 : {stwDef: 'F2'                          , storm: false, wiki: 'Brennender_LKW'                , ab:  '1 FW'},
  'Brennender PKW'                 : {stwDef: 'F1'                          , storm: false, wiki: 'Brennender_PKW'                , ab:  '1 FW'},
  'Brennendes Gras'                : {stwDef: 'F1'                          , storm: false, wiki: 'Brennendes_Gras'               , ab:  '1 FW'},
  'Chemieunfall (an Schule)'       : {stwDef: 'GSG1'                         , storm: false, wiki: 'Chemieunfall_(an_Schule)'      , ab:  '2 BF'},
  'Chlorgas Alarm (Schwimmbad)'    : {stwDef: 'GSG1'                         , storm: false, wiki: 'Chlorgas_Alarm_(Schwimmbad)'   , ab:  '3 BF'},
  'Container Brand'                : {stwDef: 'F1'                          , storm: false, wiki: 'Containerbrand'                , ab:  '1 FW'},
  'Dachstuhlbrand'                 : {stwDef: 'F3'                          , storm: false, wiki: 'Dachstuhlbrand'                , ab:  '3 FW'},
  'Fahrstuhl - Türöffnung'         : {stwDef: 'TH1'                         , storm: false, wiki: 'Fahrstuhl-T%C3%BCr%C3%B6ffnung', ab: '15 FW'},
  'Fettbrand in Pommesbude'        : {stwDef: 'F2+TLF'                      , storm: false, wiki: 'Fettbrand_in_Pommesbude'       , ab:  '3 FW'},
  'Feuer im Altenheim'             : {stwDef: 'F4+GW-A'                      , storm: false, wiki: 'Feuer_im_Altenheim'            , ab:  '6 FW'},
  'Feuer im Laubhaufen'            : {stwDef: 'F1'                          , storm: false, wiki: 'Feuer_im_Laubhaufen'           , ab:  '1 FW'},
  'Gartenlaubenbrand'              : {stwDef: 'F1'                          , storm: false, wiki: 'Gartenlaubenbrand'             , ab:  '1 FW'},
  'Gastronomiebrand'               : {stwDef: 'F3+LF'                       , storm: false, wiki: 'Gastronomiebrand'              , ab:  '8 FW'},
  'Kellerbrand'                    : {stwDef: 'F2'                          , storm: false, wiki: 'Kellerbrand'                   , ab:  '3 FW'},
  'Keller unter Wasser'            : {stwDef: 'LF/RW'                       , storm: true,  wiki: 'Keller_unter_Wasser'           , ab:  '2 FW'},
  'Kinobrand'                      : {stwDef: 'F4+GW-A|TLF'                  , storm: false, wiki: 'Kinobrand'                     , ab: '10 FW'},
  'Motorrad-Brand'                 : {stwDef: 'F1'                          , storm: false, wiki: 'Motorradbrand'                 , ab:  '1 FW'},
  'Mülleimer Brand'                : {stwDef: 'F0'                          , storm: false, wiki: 'M%C3%BClleimerbrand'           , ab:  '1 FW'},
  'Scheunenbrand'                  : {stwDef: 'F3+GW-L2,LF'                 , storm: false, wiki: 'Scheunenbrand'                 , ab: '30 FW'},
  'Schornsteinbrand'               : {stwDef: 'F3'                          , storm: false, wiki: 'Schornsteinbrand'              , ab:  '3 FW'},
  'Silobrand'                      : {stwDef: 'F3'                          , storm: false, wiki: 'Silobrand'                     , ab: '20 FW'},
  'Sperrmüllbrand'                 : {stwDef: 'F0'                          , storm: false, wiki: 'Sperrm%C3%BCllbrand'           , ab:  '1 FW'},
  'Strohballen Brand'              : {stwDef: 'F2+GW-L2'                    , storm: false, wiki: 'Strohballen_Brand'             , ab:  '1 FW'},
  'Traktorbrand'                   : {stwDef: 'F1'                          , storm: false, wiki: 'Traktorbrand'                  , ab:  '1 FW'},
  'Verkehrsunfall'                 : {stwDef: 'TH2'                         , storm: false, wiki: 'Verkehrsunfall'                , ab:  '4 FW'},
  'Wohnblockbrand'                 : {stwDef: 'F4+GW-A'                     , storm: false, wiki: 'Wohnblockbrand'                , ab: '45 FW'},
  'Wohnungsbrand'                  : {stwDef: 'F2'                          , storm: false, wiki: 'Wohnungsbrand'                 , ab:  '2 FW'},
// neue Einsatztypen (chronologisch, neuste unten (ab 28.12.2009)
  'Gewerbebrand'                   : {stwDef: 'F4L+GW-A,RW,TLF'             , storm: false, wiki: 'Gewerbebrand'                  , ab: '35 FW'},
  'Feldbrand'                      : {stwDef: 'F2+GW-L2'                    , storm: false, wiki: 'Feldbrand'                     , ab:  '1 FW'},
  'Brand im Baumarkt'              : {stwDef: 'F5+RW,TLF|GW-M,GW-G'         , storm: false, wiki: 'Brand_im_Baumarkt'             , ab: '20 BF'},
// Einsätze neu ab 22.01.2010
  'Brennender Sicherungskasten'    : {stwDef: 'F1'                          , storm: false, wiki: 'Brennender_Sicherungskasten'   , ab:  '1 FW'},
  'Schuppenbrand'                  : {stwDef: 'F2|GW-G,GW-M'                , storm: false, wiki: 'Schuppenbrand'                 , ab:  '4 FW'},
  'Brennende S-Bahn'               : {stwDef: 'F2+GW-S,RW,ELW'              , storm: false, wiki: 'Brennende_S-Bahn'              , ab: '20 FW'},
//neu ab 08.03.2010
  'Wohnwagenbrand'                 : {stwDef: 'F1'                          , storm: false, wiki: 'Wohnwagenbrand'                , ab:  '1 FW'},
  'Brand in Briefkasten'           : {stwDef: 'F0'                          , storm: false, wiki: 'Brand_in_Briefkasten'          , ab:  '1 FW'},
  'Kleiner Waldbrand'              : {stwDef: 'F2+LF|GW-L2'                 , storm: false, wiki: 'Kleiner_Waldbrand'             , ab:  '1 FW'},
  'Brennender Müllwagen'           : {stwDef: 'F2'                          , storm: false, wiki: 'Brennender_M%C3%BCllwagen'     , ab:  '1 FW'},
  'Ölspur'                         : {stwDef: 'F1+GW-Öl'                    , storm: false, wiki: '%C3%96lspur'                   , ab:  '5 FW'},
  'Brand in Zugdepot'              : {stwDef: 'F5+GW-S|RW'                  , storm: false, wiki: 'Brand_in_Zugdepot'             , ab: '10 FW'},
  'Brand in Autohaus'              : {stwDef: 'F4+GW-A'                     , storm: false, wiki: 'Brand_in_Autohaus'             , ab: '10 FW'},
  'Brand in Druckerei'             : {stwDef: 'F5+RW,TLF'                   , storm: false, wiki: 'Brand_in_Druckerei'            , ab: '20 BF'},
  'Brand in Lackfabrik'            : {stwDef: 'F5+RW,TLF|GW-M,GW-G'         , storm: false, wiki: 'Brand_in_Lackfabrik'           , ab: '25 FW'},
  'Person im Fluss'                : {stwDef: 'TH3'                         , storm: false, wiki: 'Person_im_Fluss'               , ab: '25 BF'},
// neu ab 29.03.2010
  'Brand im Casino'                : {stwDef: 'F5+LF,LF,TLF,RW'             , storm: false, wiki: 'Brand_in_Casino'               , ab: '50 FW'},
  'Brand in Reifenlager'           : {stwDef: 'F5+TLF|GW-M,GW-G'            , storm: false, wiki: 'Brand_in_Reifenlager'          , ab: '20 FW'},
  'Trocknerbrand'                  : {stwDef: 'F1'                          , storm: false, wiki: 'Trocknerbrand'                 , ab:  '1 FW'},
// neu ab 23.04.2010
  'Brennendes Gebüsch'             : {stwDef: 'F1'                          , storm: false, wiki: 'Brennendes_Geb%C3%BCsch'       , ab:  '1 FW'},
  'Kioskbrand'                     : {stwDef: 'F1'                          , storm: false, wiki: 'Kioskbrand'                    , ab:  '2 FW'},
  'Garagenbrand'                   : {stwDef: 'F2'                          , storm: false, wiki: 'Garagenbrand'                  , ab:  '4 FW'},
  'Mähdrescherbrand'               : {stwDef: 'F2+TLF'                      , storm: false, wiki: 'M%C3%A4hdrescherbrand'         , ab:  '5 FW'},
  'Kaminbrand'                     : {stwDef: 'F3'                          , storm: false, wiki: 'Kaminbrand'                    , ab:  '5 FW'},
  'PKW in Fluss'                   : {stwDef: 'TH4'                         , storm: false, wiki: 'PKW_in_Fluss'                  , ab: '15 FW'},
  'Brand in Schloss'               : {stwDef: 'F5'                          , storm: false, wiki: 'Brand_in_Schloss'              , ab: '20 FW'},
  'Brand in Kühlhaus'              : {stwDef: 'F5+TLF|GW-M,GW-G'            , storm: false, wiki: 'Brand_im_K%C3%BChlhaus'        , ab: '20 FW'},
  'Feuer im Krankenhaus'           : {stwDef: 'F5'                          , storm: false, wiki: 'Feuer_im_Krankenhaus'          , ab: '40 BF'},
  'Brand in Kletterhalle'          : {stwDef: 'F4'                          , storm: false, wiki: 'Brand_in_Kletterhalle'         , ab: '45 BF'},
// neu ab 23.08.2010
  'Grasnarbenbrand'                : {stwDef: 'F1|FLF'                      , storm: false, wiki: 'Grasnarbenbrand'               , ab: '59 FW'},
// neu ab 01.09.2010
  'Brennendes Flugzeug'            : {stwDef: 'Crash|FLF,FLF'               , storm: false, wiki: 'Brennendes_Flugzeug'           , ab: '59 FW'},
// neu ab 22.10.2010
  'Brand in Industriepark'         : {stwDef: 'VGSL'                        , storm: false, wiki: 'Brand_in_Industriepark'        , ab:  '3 MG'}, //Verbandsgroßschadenslage
// neu ab 27.10.2010
  'Brand in Eishalle'              : {stwDef: 'F5+TLF'                      , storm: false, wiki: 'Brand_in_Eishalle'             , ab:  '5 FW'},
  'Brand in Gärtnerei'             : {stwDef: 'F5|GW-G,GW-M'                , storm: false, wiki: 'Brand_in_G%C3%A4rtnerei'       , ab:  '8 FW'},
  'Brand in Metzgerei'             : {stwDef: 'F4|GW-L2'                    , storm: false, wiki: 'Brand_in_Metzgerei'            , ab:  '2 BF'},
// neu ab 19.11.2010
  'Feuer auf Boot (Klein)'         : {stwDef: 'FB1'                         , storm: false, wiki: 'Feuer_auf_Boot_(Klein)'        , ab: '30 BF', onWater: true},
// neu ab 28.11.2010
  'Feuer auf Boot (Mittel)'        : {stwDef: 'FB1+FLB'                     , storm: false, wiki: 'Feuer_auf_Boot_(Mittel)'       , ab: '30 BF', onWater: true},
// neu ab 13.12.2010
  'Gabelstapler im Hafenbecken'    : {stwDef: 'TH4'                         , storm: false, wiki: 'Gabelstapler_im_Hafenbecken'   , ab: '40 FW'},
// neu ab 24.12.2010
  'Verletztentransport'            : {stwDef: 'RD'                          , storm: false, wiki: 'Verletztentransport'           , ab: '50 FW'},
// neu ab 05.01.2011
  'Brand in Gemeindehaus'          : {stwDef: 'F3'                          , storm: false, wiki: 'Brand_in_Gemeindehaus'         , ab:  '3 FW'},
  'Maschinenbrand'                 : {stwDef: 'F2+ELW,GW-L2'                , storm: false, wiki: 'Maschinenbrand'                , ab:  '5 FW'},
  'Brand in Steinbruch'            : {stwDef: 'VGSL'                        , storm: false, wiki: 'Brand_in_Steinbruch'           , ab:  '3 MG'}, //Verbandsgroßschadenslage
// neu ab 15.04.2011
  'Tankbrand'                      : {stwDef: 'F1+RW,GWÖl,TUIS|LF,LF'       , storm: false, wiki: 'Tankbrand'                     , ab: {FW: 64}},
  'Brennt Tanklager'               : {stwDef: 'F1+DLK,GWÖl,FwK,TUIS|LF,LF' , storm: false, wiki: 'Brennt_Tanklager'              , ab: {FW: 64}},
  'Brand in Raffinerie'            : {stwDef: 'F1+RW,GWL,TLF,GWM,GWÖl,FwK,TUIS|LF,LF', storm: false, wiki: 'Brand_in_Raffinerie' , ab: {FW: 64}},
// neu ab 12.05.2011
  'Unfall mit Gefahrgut-Transport' : {stwDef: 'F1'                   , storm: false, wiki: 'Unfall_mit_Gefahrgut-Transport', ab: {FW: 40, BF: 2}},
  'Gefahrstoff-Austritt in Firma'  : {stwDef: 'F1'         , storm: false, wiki: 'Gefahrstoff-Austritt_in_Firma' , ab: {FW: 40, BF: 2}},


// besondere Einsätze, nur zu bestimmten Jahreszeiten
  'Brand-Weihnachtsbaum in Kirche' : {stwDef: 'F4'                          , storm: false, wiki: 'Brand-Weihnachtsbaum_in_Kirche', ab:  '6 FW'},
  'Brand auf Weihnachtsmarkt'      : {stwDef: 'F2+TLF'                          , storm: false, wiki: 'Brand_auf_Weihnachtsmarkt'     , ab:  '3 FW'},
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

  'undef'    :  {txtDef: 'unbekanntes Einsatzstichwort',    vhcDef: 'LF/TS'},
// zu undef = unbekannten Einsatzen wird per Default ein LF/TS geschickt
  'F0'       :  {txtDef: 'Feuer, mini',                    vhcDef: 'LF'},
  'F1'       :  {txtDef: 'Feuer, klein',                   vhcDef: 'LF'},
  'F2'       :  {txtDef: 'Feuer, mittel',                  vhcDef: 'LF,LF'},
  'F3'       :  {txtDef: 'Feuer, mittel, Leiter',          vhcDef: 'LF,LF,DLK'},
  'F4'       :  {txtDef: 'Feuer, groß',                    vhcDef: 'LF,LF,LF,LF,DLK,ELW'},
  'F5'       :  {txtDef: 'Feuer, groß, Gewerbe',           vhcDef: 'LF,LF,LF,LF,ELW,DLK,GW-A,GW-L2'},
  'F6'       :  {txtDef: 'Feuer, Reserve',                 vhcDef: ''},
  'F7'       :  {txtDef: 'Feuer, Reserve',                 vhcDef: ''},
  'F8'       :  {txtDef: 'Feuer, Reserve',                 vhcDef: ''},
  'TH1'      :  {txtDef: 'techn. Hilfeleistung',           vhcDef: 'LF,RW'},
  'TH2'      :  {txtDef: 'techn. Hilfeleistung, VU',       vhcDef: 'LF,RW,GW-Öl'},
  'TH3'      :  {txtDef: 'Person in Wasser',               vhcDef: 'LF,GW-T'},
  'TH4'      :  {txtDef: 'techn. Hilfel. - Gewässer',      vhcDef: 'LF,GW-T,RW,KW'},
  'GSG1'     :  {txtDef: 'Gefahrguteinsatz',               vhcDef: 'LF,LF,ELW,GW-M,GW-G,RW'},
  'GSG2'     :  {txtDef: 'erw. Gefahrguteinsatz',           vhcDef: 'LF,LF,LF,LF,ELW,GW-M,GW-G,DLK,GW-A,RW'},
  'VGSL'     :  {txtDef: 'Verbandsgroßschadenslage',        vhcDef: 'LF,LF,LF,LF,LF,LF,LF,LF,TLF,ELW,GW-L2,GW-A,DLK'},
  'Crash'    :  {txtDef: 'brennt Flugzeug',                 vhcDef: 'FLF,FLF,FLF,FLF/LF,RTr,ELW,GW-G,GW-M,RW,GW-Öl'},
  'FB1'      :  {txtDef: 'Feuer auf Boot',                  vhcDef: 'FLB'},
  // Rettungsmittel wird über Script ermittelt
  'RD'       :  {txtDef: 'Verletztentransport',             vhcDef: ''},
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
  'LF 8'               : {vehGrp: 'LF',   speed: 48, groupVeh: true,  trainable: false, regex: /LF 8/,                          wiki: 'LF_8'},
  'LF 10/6'            : {vehGrp: 'LF',   speed: 58, groupVeh: true,  trainable: false, regex: /LF 10\/6/,                      wiki: 'LF_10/6'},
  'LF 20/16'           : {vehGrp: 'LF',   speed: 60, groupVeh: true,  trainable: false, regex: /LF 20\/16/,                     wiki: 'LF_20/16'},
  'HLF 10/6'           : {vehGrp: 'LF',   speed: 58, groupVeh: true,  trainable: false, regex: /HLF 10\/6/,                     wiki: 'HLF_10/6'},
  'HLF 20/16'          : {vehGrp: 'LF',   speed: 60, groupVeh: true,  trainable: false, regex: /HLF 20\/16/,                    wiki: 'HLF_20/16'},
  'LF 16-TS'           : {vehGrp: 'TS',   speed: 52, groupVeh: true,  trainable: false, regex: /LF 16-TS/,                      wiki: 'LF_16-TS'},
  'TLF 20/40 - SL'     : {vehGrp: 'TLF',  speed: 49, groupVeh: false, trainable: false, regex: /TLF 20\/40 - SL/,               wiki: 'TLF_20/40_SL'},
  'ELW 1'              : {vehGrp: 'ELW',  speed: 77, groupVeh: false, trainable: false, regex: /ELW 1/,                         wiki: 'ELW_1'},
  'DLA (K) 23/12'      : {vehGrp: 'DLK',  speed: 63, groupVeh: false, trainable: false, regex: /Drehleiter|DLA [(]K[)] 23\/12/, wiki: 'DLA_(K)_23/12'},
  'RW'                 : {vehGrp: 'RW',   speed: 49, groupVeh: false, trainable: false, regex: /Rüstwagen|RW/,                  wiki: 'RW'},
  'GW-L2 - Wasser'     : {vehGrp: 'GWL',  speed: 53, groupVeh: false, trainable: false, regex: /GW\s?-\s?L2\s?[-]?\s?Wasser/,   wiki: 'GW-L2_Wasser'},
  'GW-Öl'              : {vehGrp: 'GWÖl', speed: 51, groupVeh: false, trainable: false, regex: /GW-Öl/,                         wiki: 'GW-%C3%96l'},
  'GW-A'               : {vehGrp: 'GWA',  speed: 56, groupVeh: false, trainable: false, regex: /GW-A/,                          wiki: 'GW-A'},
  'Kran'               : {vehGrp: 'FwK',  speed: 55, groupVeh: false, trainable: false, regex: /Kran/,                          wiki: 'Kran'},
  'GW-Schiene'         : {vehGrp: 'GWS',  speed: 57, groupVeh: false, trainable: false, regex: /GW-Schiene/,                    wiki: 'GW-Schiene'},
  'GW-Messtechnik'     : {vehGrp: 'GWM',  speed: 40, groupVeh: false, trainable: true , regex: /GW-Messtechnic?k/,              wiki: 'GW-M'},
  'GW-Gefahrgut'       : {vehGrp: 'GWG',  speed: 46, groupVeh: false, trainable: true , regex: /GW-Gefahrgut/,                  wiki: 'GW-G'},
  'GW-Taucher'         : {vehGrp: 'GWT',  speed: 62, groupVeh: false, trainable: true , regex: /GW-Taucher/,                    wiki: 'GW-T'},
  'GW-TUIS'            : {vehGrp: 'TUIS',  speed: 73, groupVeh: false, trainable: true , regex: /GW-TUIS/,                      wiki: 'GW-TUIS'},
  'Flugfeldlöschfahrzeug' : {vehGrp: 'FLF',  speed: 110, groupVeh: false, trainable: true , regex: /Flugfeldlöschfahrzeug/,     wiki: 'Flugfeldl%C3%B6schfahrzeug'},
  'Rettungstreppe'     : {vehGrp: 'RTr',  speed: 65, groupVeh: false, trainable: true , regex: /Rettungstreppe/,                wiki: 'Rettungstreppe'},
  'Feuerlöschboot'     : {vehGrp: 'FLB',  speed: 60, groupVeh: false, trainable: true , regex: /Feuerlöschboot/,                wiki: 'Feuerl%C3%B6schboot'},
  'Rettungsboot'       : {vehGrp: 'RTB',  speed: 60, groupVeh: false, trainable: true , regex: /Rettungsboot/,                  wiki: 'Rettungsboot'},
};

// RegExp zur Suche nach nachzufordernden Fahrzeugen, Anforderung ab x Feuerwachen/Berufsfeuerwehren
var NachforderungenArr = {
  'RTW' : {text: 'Rettungswagen',           regex: /RTW/                                        , ab: {BF: 10}},
  'ELW' : {text: 'Einsatzleitwagen',        regex: /ELW 1/                                      , ab: {FW:  5}},
  'TLF' : {text: 'Tanklöschfahrzeug',       regex: /TLF 20\/40 - SL/                            , ab: {FW:  7}},
  'GWA' : {text: 'Gerätewagen Atemschutz',  regex: /GW-A/                                       , ab: {FW:  6}},
  'RW'  : {text: 'Rüstwagen',               regex: /Rüstwagen|RW/                               , ab: {FW:  4}},
  'DLK' : {text: 'Drehleiter (Korb)',       regex: /Drehleiter|DLA [(]K[)] 23\/12/              , ab: {FW:  3}}, //maskieren der Klammern mit [], mit \ scheint es nicht zu gehen
  'GWG' : {text: 'Gerätewagen Gefahrgut',   regex: /GW-Gefahrgut/                               , ab: {BF:  2}},
  'GWM' : {text: 'Gerätewagen Messtechnik', regex: /GW-Messtechnic?k/                           , ab: {BF:  2}},
  'GWÖl': {text: 'Gerätewagen Öl',          regex: /GW-Öl/                                      , ab: {FW:  4}},
  'GWL' : {text: 'Schlauchwagen',           regex: /GW\s?-\s?L2\s?[-]?\s?Wasser/                , ab: {FW:  5}},
  'GWS' : {text: 'Gerätewagen Schiene',     regex: /GW-Schiene/                                 , ab: {FW: 10}},
  'FwK' : {text: 'Feuerwehrkran',           regex: /Kran/                                       , ab: {FW: 25}},
  'GWT' : {text: 'Gerätewagen Taucher',     regex: /GW-Taucher/                                 , ab: {BF: 25}},
  'TUIS': {text: 'Gerätewagen Transport-Unfall-Information', regex: /GW-TUIS/                   , ab: {FW: 64}},
  'FLF' : {text: 'Flugfeldlöschfahrzeug',   regex: /Flugfeldlöschfahrzeug/                      , ab: {ST:  2}}, //ab 2 Stadtteil
  'RTr' : {text: 'Rettungstreppe',          regex: /Rettungstreppe/                             , ab: {ST:  2}}, //ab 2 Stadtteil
  'FLB' : {text: 'Feuerlöschboot',          regex: /Feuerlöschboot/                             , ab: {BF: 30}, onWater: true}, //ab 30 BF und 2 Stadtteil
  'RTB' : {text: 'Rettungsboot',            regex: /Rettungsboot/                               , ab: {BF: 50}, onWater: true}, //ab 50 BF und 2 Stadtteil
  'LF'  : {text: 'Löschgruppenfahrzeug',    regex: /Kleinlöschfahrzeug|LF 8|LF 10\/6|LF 20\/16|HLF 10\/6|HLF 20\/16/ , ab: {FW:  1}},
  'TS'  : {text: 'LF mit Tragkraftspritze', regex: /LF 16-TS/                                   , ab: {FW:  1}},
};

// besondere Örtlichkeiten auf der Karte
var locationArr = {
  // Sonderbebauung zuerst
  'Flughafen'     : {from: {x:  83, y: 179}, to: {x:  84, y: 180}},
  'Hafen'         : {from: {x:  98, y: 198}, to: {x: 100, y: 200}},
  'Raffinerie'    : {from: {x:   6, y: 176}, to: {x:   7, y: 176}},
  'Güterbahnhof'  : {from: {x:  50, y: 152}, to: {x:  51, y: 152}},
  'Bahnlinie'     : {from: {x:   1, y: 152}, to: {x: 100, y: 152}},
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
var settingsArr = {
  checkForUpdates            : {valDef: true,  group: 'global', type: 'BOOL', length:  1, text: 'auf Updates prüfen'},
  dispStichwortColour        : {valDef: 'red', group: 'global', type: 'LIST', length:  1, list: colorArr, text: 'Schriftfarbe des Alarmierungsstichworts'},
  condenseVehicles           : {valDef: true,  group: 'global', type: 'BOOL', length:  1, text: 'Fahrzeuge zusammenfassen (LF, LF => 2LF)'},
  disableSelectionDueToStorm : {valDef: false, group: 'global', type: 'BOOL', length:  1, text: 'Unwettermodus'},
  reducedSelectionVehicle    : {valDef: 'LF/TS', group: 'global', type: 'STR', length: 10, valChkFunc: checkRedSelVhc, text: 'Fahrzeug(e) für Unwettermodus'},

  showInfoKlasseInListe      : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'Einsatzart anzeigen'},
  showInfoLangtextListe      : {valDef: false, group: 'eList',  type: 'BOOL', length:  1, text: 'Langtext zur Einsatzklasse anzeigen'},
  showInfoVehiclesInListe    : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'gemäß Einsatzklasse zu alarmierende Fahrzeuge anzeigen'},
  alignInfoKlasseToRight     : {valDef: true,  group: 'eList',  type: 'BOOL', length:  1, text: 'Einsatzart/Fahrzeuge rechtsbündig ausrichten'},
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
  highlightVehReqColour      : {valDef: 'cyan', group: 'eInfo', type: 'LIST', length:  1, list: colorArr, text: 'Schriftfarbe für Positionsangabe'},
  calledLineColour           : {valDef: 'darkgreen', group: 'eInfo', type: 'LIST', length:  1, list: colorArr, text: 'Farbe für Alarmfahrzeugzeile'},
  optionalLineColour         : {valDef: 'blue', group: 'eInfo', type: 'LIST', length:  1, list: colorArr, text: 'Farbe für opt. Fahrzeugzeile'},
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
}

// Syntax: Textfarbe in Mannschaftsübersicht
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner der Motivation des Kameraden ist.
var motivationArr = {
  90 : {tcol: '#228B22'},
  76 : {tcol: '#32CD32'},
  51 : {tcol: '#66FF66'},
  26 : {tcol: ((layoutNew)?'peru':'#FFD700')},
  11 : {tcol: '#FF6666'},
   0 : {tcol: '#B22222'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
}

// Syntax: Textfarbe in Mannschaftsübersicht
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner der Fähigkeit des Kameraden ist.
var abilityArr = {
  90 : {tcol: '#228B22'},
  76 : {tcol: '#32CD32'},
  51 : {tcol: '#66FF66'},
  26 : {tcol: ((layoutNew)?'peru':'#FFD700')},
  11 : {tcol: '#FF6666'},
   0 : {tcol: '#B22222'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
}

// Syntax: Textfarbe für Wachenstärke von Berufsfeuerwehren
// die Liste wird von oben durchsucht, bis ein Wert gefunden wird, der kleiner der Fähigkeit des Kameraden ist.
var manningArr = {
 111 : {tcol: 'green'},
  96 : {tcol: 'lime'},
  81 : {tcol: ((layoutNew)?'peru':'yellow')},
  66 : {tcol: 'orange'},
  31 : {tcol: 'brown'},
   0 : {tcol: 'red'}, // WICHTIG: wenigstens der Eintrag mit 0 muss vorhanden sein
}

var shiftArr = {
  1 : {tcol: '#FFA500'},
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
const MAXSPALTENVERFUEGBAR=20;

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
var msgArea = getByID('msgArea');

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
  { var nodeTD = getXPath("./table[@class='defaultTable']/tbody/tr[descendant::td/text()='FMS:']/td[2]", getByID('content'), XPType.FIRST_ORDERED).singleNodeValue;
    if (nodeTD)
    { var nodeFMS = buildFMS(nodeTD, settingsArr.dispFMSDisplayLinesFI.value);
      removeChildren(nodeTD);
      nodeTD.appendChild(nodeFMS);
    }
  }

  var nodeTable = getXPath("./table[@class='defaultTable' and descendant::thead/tr/th/text()='Ausbildung']", getByID('content'), XPType.FIRST_ORDERED).singleNodeValue;
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
  { var evalTDs = getXPath("./table[@class='defaultTable']/tbody/tr/td[1]", getByID('content'), XPType.SNAPSHOT_ORDERED);
    var datArr =
    { call: {text:'Notruf', tcol: 'white', bcol: 'red', regex: /Notruf:/},
      fehl: {text:'Fehleinsatz', tcol: 'black', bcol: 'yellow', regex: /Fehleinsatz:/},
      done: {text:'abgearbeitet', tcol: 'darkgreen', bcol: 'white', regex: /Einsatz abgearbeitet:/},
      job:  {text:'Beginnt Job', tcol: 'green', bcol: '', regex: /fängt bei der Wache/},
      quit: {text:'Beendet Job', tcol: 'red', bcol: '', regex: /ist bei der Wache/},
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

    var nodeTable = createElement('table', {'class': 'ereglamTable'});
    var nodeTBody = createElement('thead');
    nodeTable.appendChild(nodeTBody);
    var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    for (dat in datArr)
    { var nodeTD = createElement('th');
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText(datArr[dat].text));
    }
    var nodeTBody = createElement('tbody');
    nodeTable.appendChild(nodeTBody);
    var nodeTR = createElement('tr');
    nodeTBody.appendChild(nodeTR);
    for (dat in datArr)
    { var nodeTD = createElement('td');
      nodeTR.appendChild(nodeTD);
      nodeTD.appendChild(createText((anzArr[dat])?anzArr[dat]:'0'));
      nodeTD.style.color = datArr[dat].tcol;
      if (datArr[dat].bcol) { nodeTD.style.backgroundColor = datArr[dat].bcol; }
    }
    getByID('content').insertBefore(nodeTable, getByID('content').firstChild.nextSibling.nextSibling);
  }
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
    { // Rückmeldungen von Leitstellen ignorieren
      if (evalTDs.snapshotItem(1).innerHTML.indexOf('Leitstelle: ') != -1)
      { continue;
      }
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
  var TD = TR.getElementsByTagName("td")[1];
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
      { nodeA.setAttribute('style', 'color: '+((layoutNew)?'peru':'yellow')+';');
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
                                     {'style': 'color: '+((layoutNew)?'peru':'yellow')+';'});
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
                           {'class': 'txtCenter',
                            'rowspan': '2'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('Anz.'));

    nodeTD = createElement('th',
  // Spaltenspanne setzen, ob Status 7 angezeigt werden
                           {'class': 'txtCenter',
                            'colspan': AnzDispStatus});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('FMS-Status'));

    if (settingsArr.showTotalkm.value)
    {
      nodeTD = createElement('th',
                             {'class': 'txtCenter',
                              'rowspan': '2'});
      addEntityText(nodeTD, '&Sigma; km');
      nodeTR.appendChild(nodeTD);
    }

    if (settingsArr.showAvgkm.value)
    {
      nodeTD = createElement('th',
                             {'class': 'txtCenter',
                              'rowspan': '2'});
      addEntityText(nodeTD, '&Oslash;-km');
      nodeTR.appendChild(nodeTD);
    }

    if (settingsArr.showAvgDamage.value)
    {
      nodeTD = createElement('th',
                             {'class': 'txtCenter',
                              'rowspan': '2'});
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
                             {'class': 'txtCenter',
                              'style': TDstyle + '; width:60px;'});
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

    var row = 0;
		for each (FZName in FZNamen)
    { nodeTR = createElement('tr', {'class':'row'+(row++)%2});
      nodeTBody.appendChild(nodeTR);

      nodeTD = createElement('th',
                             {'class': 'txtLeft'});
      nodeTR.appendChild(nodeTD);
      var nodeA = createElement('a',
                                {'href'  : getWikiLinkFhz(FZName),
                                 'target': '_blank'});
      nodeA.appendChild(createText('W'));
			var nodeSpan = createElement('span',
																	 {'class' : 'WikiLinkDark',
																		'title' : getWikiLinkStw(stichwort)});
			nodeSpan.appendChild(nodeA);
			nodeTD.appendChild(nodeSpan);
			addEntityText(nodeTD, '&nbsp;');
      nodeTD.appendChild(createText(FZName));

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
    nodeTR = createElement('tr', {'class': 'rowWhite'});
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
    nodeTR = createElement("tr");
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
    nodeTR = createElement("tr");
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
		
		var evalTR = getXPath("./tbody/tr", nodeTable, XPType.SNAPSHOT_ORDERED);
		for (iTR = 0; iTR < evalTR.snapshotLength; iTR++)
		{ evalTR.snapshotItem(iTR).className = 'row'+ iTR%2;
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
  FillUnterwegsListe();

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
	var row = 0;
  nodeTable = createElement('table',
                            {'class': 'ereglamTable'});
  InfoBereich.appendChild(nodeTable);
  nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);

  // Einsatzklasse
  if (settingsArr.showInfoKlasse.value)
  { var nodeTR = createElement('tr', {'class':'row'+(row++)%2});
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
  { var nodeTR = createElement('tr', {'class':'row'+(row++)%2});
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
  { var nodeTR = createElement('tr', {'class':'row'+(row++)%2});
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
    var nodeTR = createElement('tr', {'class':'row'+(row++)%2});
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
  { var nodeTR = createElement('tr', {'class':'row'+(row++)%2});
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
                                     {'style': 'color: '+((layoutNew)?'peru':'#CCCC66')+';'});
        nodeTD.appendChild(nodeSpan);
        nodeSpan.appendChild(createText(condenseFahrzeugliste(Optional)));
        nodeTD.appendChild(createText(')'));
      }
    }
    else
    {
      var nodeSpan = createElement('span',
                                   {'style': 'color: '+((layoutNew)?'green':'lightgreen')+';'});
      nodeTD.appendChild(nodeSpan);
      nodeSpan.appendChild(createText('keine weiteren Kräfte benötigt'));
    }
  }

  // nicht verfügbare Fahrzeuge
  if (settingsArr.showInfoNichtVerfuegbar.value && InfotextNichtVerfuegbar != '')
  { var nodeTR = createElement('tr', {'class':'row'+(row++)%2});
    nodeTBody.appendChild(nodeTR);
    var nodeTD = createElement('th',
                               {'style': 'width: 120px;'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText('nicht verfügbar'));
    nodeTD = createElement('td',
                           {'style': 'color: '+((layoutNew)?'SaddleBrown':'yellow')+';'});
    nodeTR.appendChild(nodeTD);
    nodeTD.appendChild(createText(InfotextNichtVerfuegbar));
  }

  // Fahrzeiten
  if (((settingsArr.showInfoFahrzeit.value)    && toAlarmDauerArr.max) ||
      ((settingsArr.showInfoFahrzeitOpt.value) && optAlarmDauerArr.max))
  { var nodeTR = createElement('tr', {'class':'row'+(row++)%2});
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
                                   {'style': 'color: '+((layoutNew)?'peru':'#CCCC66')+';'});
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
  { var nodeTR = createElement('tr', {'class':'row'+(row++)%2});
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
          // prüfen, ob schon ein Info-Block vorhanden ist
          if (TD.getElementsByTagName('span').length == 0)
          {
            var nodeSpan = createElement('span',
                                         {'style': 'padding-right: 2px;'
                                                   + ((settingsArr.alignInfoKlasseToRight.value) ? ' float: right;' : '')
                                                   + " color: " + settingsArr.dispStichwortColour.value + ';'
                                                   + " text-align: right;"
																									 + " line-height: 15px",
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
  nodeTBody = createElement('tfoot');
  nodeTable.appendChild(nodeTBody);
  nodeTR = createElement('tr', {'class': 'rowWhite'});
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
  // Tabellenkörper
  var row = 0;
	nodeTBody = createElement('tbody');
  nodeTable.appendChild(nodeTBody);
  for (train in trainingArr)
  { if (AnzArr[train]['total'] > 0)
    { nodeTR = createElement('tr', {'class':'row'+(row++)%2});
      nodeTBody.appendChild(nodeTR);
      nodeTD = createElement('th')
      nodeTD.style.color = (settingsArr.useTrainingColourCode.value)?trainingArr[train].tcol[layout]:'';
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
    { ArrTR[i].className = 'row'+ i%2;
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
                               'target': '_blank'});
    nodeA.appendChild(createText('Informationen'));
    nodeDiv.appendChild(nodeA);

    nodeDiv.appendChild(createText(' dazu oder direkt '));
    nodeA = createElement('a',
                          {'href'  : INSTALLURL,
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
          ThisZeile.style.backgroundColor = settingsArr.optionalLineColour.value;

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
          ThisZeile.style.backgroundColor = settingsArr.calledLineColour.value;

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
                                 'style': 'color: green;'});
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
                                 {'style': 'color: '+((AnzFZK[FZ])?((layoutNew)?'green':'#66FF66')+';':'red;')});
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
  if (LastUpdate == heute) return;

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

  ToAlarm="";
  NichtVerf="";

  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  GetVariables();
  if (settingsArr.checkForUpdates.value)
  { updateTest();
  }

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
'+ ((layoutNew)?'  color: #0D2A44;':'')
+ ((!layoutNew)?'  border:1px solid #56616C;':'')+'\
  border-collapse:collapse;\
  margin:5px 0;\
  width:100%;\
}\n\
table.ereglamTable tr\n\
{\n\
  background-color: '+ ((layoutNew)?'#D0D0D0':'')+';\
'+ ((layoutNew)?'  line-height: 23px;':'')+'\
'+ ((!layoutNew)?'  border:1px solid #56616C;':'')+'\
}\n\
table.ereglamTable tr.row1\n\
{\n\
  background-color:'+ ((layoutNew)?' #EEEEEE':'')+';\
'+ ((!layoutNew)?'  border:1px solid #56616C;':'')+'\
}\n\
table.ereglamTable tr.rowWhite\n\
{\n\
  background-color:'+ ((layoutNew)?' #EEEEEE':'#424D58')+';\
'+ ((layoutNew)?'  border-top: 1px solid #0D2A44;':'')+'\
}\n\
table.ereglamTable th\n\
{\n\
  background-color:'+ ((layoutNew)?'#FFFFFF':'#424D58')+';\
'+ ((layoutNew)?'  line-height: 18px;':'')+'\
'+ ((!layoutNew)?'  border:1px solid #56616C;':'border-bottom: 1px solid #0D2A44;')+'\
  text-align: left;\
	font-weight: bold;\
}\n\
table.ereglamTable tr.row0 th\n\
{\n\
  background-color:'+ ((layoutNew)?'#D0D0D0':'#424D58')+';\
'+ ((!layoutNew)?'  border:1px solid #56616C;':'  border-bottom: none;')+'\
}\n\
table.ereglamTable tr.row1 th\n\
{\n\
  background-color:'+ ((layoutNew)?'#EEEEEE':'#424D58')+';\
'+ ((!layoutNew)?'  border:1px solid #56616C;':'  border-bottom: none;')+'\
}\n\
table.ereglamTable td\n\
{\n\
'+ ((!layoutNew)?'  border:1px solid #56616C;':'')+'\
  padding:1px 5px;\
  text-align:left;\
}\n\
table.ereglamTable tr.row0 td\n\
{\n\
'+ ((layoutNew)?'  background-color: #D0D0D0;':'')+'\
}\n\
table.ereglamTable tr.row1 td\n\
{\n\
'+ ((layoutNew)?'  background-color: #EEEEEE;':'')+'\
}\n\
div#content table.ereglamTable a:link,\
div#content table.ereglamTable a:hover,\
div#content table.ereglamTable a:active,\
div#content table.ereglamTable a:visited\n\
{\n\
  color: '+ ((layoutNew)?'#0D2A44':'#D6D6D6')+';\
}\n\\n\
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
  -moz-border-radius: 7px;\
  line-height: 13px;\
}\n\
table td.raised\n\
{\n\
  border:1px solid;\
  border-color: lightgray black black lightgray;\
  -moz-border-radius: 7px;\
  line-height: 13px;\
}\n'+
((!layoutNew)?
'div.statusbar\n\
{\n\
  background-color: green;\
}\n\
div.statusbar_inner\n\
{\n\
  background-color: darkred;\
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
}\n\
div#content span.WikiLinkDark a:link,\
div#content span.WikiLinkDark a:hover,\
div#content span.WikiLinkDark a:active,\
div#content span.WikiLinkDark a:visited\n\
{\n\
  color: #FEFEFE;\
}\n\
');
    // Link zu den Optionen setzen
    var nodeP = createElement('p',
                              {'id'  : 'ereglamsAAOConfig'});
    var nodeA = createElement('a',
                              {'href': '/ereglamsAAOConfig'});
    nodeP.appendChild(nodeA);
    nodeA.appendChild(createText(' Ereglam\'s AAO Einstellungen'));
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
Zur Eingabe der zusätzlichen/optionalen Fahrzeuge dürfen als Trennzeichen nur ',' und '/' (für Alternativen) verwendet werden: z.B. 'LF,LF/TS'. \
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
    nodeChkbox.disabled = true;
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
Zur Eingabe der Fahrzeuge dürfen als Trennzeichen nur ',' und '/' (für Alternativen) verwendet werden: z.B. 'LF,LF/TS'. \
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
      if (EinsatzstichwortArr[stichwort].stwCls != EinsatzstichwortArr[stichwort].stwDef)
      {
        var gmValue = 'class=' + EinsatzstichwortArr[stichwort].stwCls;
        GM_setValue(gmStichwort, EinsatzstichwortArr[stichwort].stwCls);
        nodeTD.appendChild(getNodeResetStw(stichwort));
      }
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