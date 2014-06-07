// ==UserScript==
// @name           Feuerwache.net AAO DarkPrince
// @namespace      http://userscripts.org/users/119663
// @description    Script fuer Alarmierung und verwaltung fuer das Spiel Feuerwache.net
// @include        http://www.feuerwache.net/*
// @author         DarkPrince
// @version        07.09.2012 - 12:00 Uhr - neue Einsätze
// ==/UserScript==


var MAXSPALTENVERFUEGBAR=99;
var CHECKFORUPDATES=true;
var UPDATEURL="http://userscripts.org/scripts/show/63003";
var INSTALLURL="http://userscripts.org/scripts/source/63003.user.js";

// ====================================================================================================
// ========== E I N S A T Z K L A S S E N =============================================================
// ====================================================================================================

var Einsatzklassen = {

  'Ammoniakaustritt in Eishalle'     : 'Feuer 3 - Großalarm - Gefahrgut|GW-A,GW-TUIS',
  'Auffahrunfall'                    : 'TH 3 - Umwelt - Öl',
  'Ausgedehnter Waldbrand'           : 'Feuer 3 - Großalarm|GW-W',
  'Auslaufende Betriebsstoffe'       : 'TH 3 - Umwelt - Öl',
  'Baggerbrand'                      : 'Feuer 1 - Klein',
  'Baukran auf Auto'                 : 'TH 1 - Kran',
  'Baum auf Auto'                    : 'TH 3 - Umwelt - Rüst',
  'Baum auf Dach'                    : 'TH 1 - Leiter',
  'Baum auf Straße'                  : 'TH 1 - Klein',
  'Brand am Bahndamm'                : 'Feuer 2 - Mittel',
  'Brand auf Weihnachtsmarkt'        : 'Feuer 2 - Mittel',
  'Brand im Baumarkt'                : 'Feuer 3 - Großalarm - Gefahrgut|GW-A',
  'Brand in Brauerei'                : 'Feuer 3 - Großalarm - Leiter|GW-A,GW-W',
  'Brand im Casino'                  : 'Feuer 4 - Großalarm+DLK',
  'Brand in Gemeindehaus'            : 'Feuer 1 - Klein/LF',
  'Brand in Großwäscherei'           : 'Feuer 3 - Großalarm - Leiter',
  'Brand in Industriepark'           : 'Feuer 6 - GSL-VERBAND',
  'Brand in Kühlhaus'                : 'Feuer 3 - Großalarm - Leiter+GW-G,GW-M|GW-W',
  'Brand in Reifenlager'             : 'Feuer 2 - Mittel - Gefahrgut|GW-A,GW-W',
  'Brand im Sägewerk'                : 'Feuer 3 - Großalarm|GW-W',
  'Brand im Supermarkt'              : 'Feuer 3 - Großalarm - Leiter+KW',
  'Brand in Betankungsanlage'        : 'Feuer 3 - Großalarm - Gefahrgut|GW-A,ULF',
  'Brand in Autohaus'                : 'Feuer 2 - Mittel - Leiter+ELW,GW-M|GW-A',
  'Brand in Briefkasten'             : 'Feuer 1 - Klein',
  'Brand in Druckerei'               : 'Feuer 3 - Großalarm - Leiter+RW',
  'Brand in Eishalle'                : 'Feuer 2 - Mittel - Leiter+TLF,RW|GW-W',
  'Brand in Gärtnerei'               : 'Feuer 3 - Großalarm - Leiter+GW-G,GW-M',
  'Brand in KFZ-Werkstatt'           : 'Feuer 2 - Mittel+KW',
  'Brand in Kletterhalle'            : 'Feuer 3 - Großalarm - Leiter',
  'Brand in Lackfabrik'              : 'Feuer 3 - Großalarm - Leiter+GW-G,GW-M',
  'Brand in Metzgerei'               : 'Feuer 2 - Mittel - Leiter+ELW|GW-W',
  'Brand in Raffinerie'              : 'Feuer 3 - Großalarm - Gefahrgut+GW-TUIS|TLF,KW',
  'Brand in Schloss'                 : 'Feuer 3 - Großalarm - Leiter',
  'Brand in Schule'                  : 'Feuer 3 - Großalarm|GW-W',
  'Brand in Spedition'               : 'Feuer 3 - Großalarm - Leiter+TLF,GW-G,GW-M|GW-W',
  'Brand in Sporthalle'              : 'Feuer 3 - Großalarm|GW-W',
  'Brand in Steinbruch'              : 'Feuer 6 - GSL-VERBAND',
  'Brand in Zugdepot'                : 'Feuer 3 - Großalarm - Leiter+RW,GW-S',
  'Brand nach Schweißarbeiten'      : 'Feuer 1 - Klein',
  'Brand-Weihnachtsbaum in Kirche'   : 'Feuer 2 - Mittel',
  'Brennende Bäume'                  : 'Feuer 1 - Klein',
  'Brennende S-Bahn'                 : 'Feuer 2 - Mittel - Schiene',
  'Brennende Telefonzelle'           : 'Feuer 1 - Klein',
  'Brennende Windmühle'              : 'Feuer 2 - Mittel - Leiter+ELW',
  'Brennender Güterzug'              : 'Feuer 3 - Großalarm|GW-W.GW-G,GW-M,GW-TUIS',
  'Brennender LKW'                   : 'Feuer 1 - Klein|ELW,GW-M,GW-G,GW-TUIS',
  'Brennender Müllwagen'             : 'Feuer 1 - Klein',
  'Brennender PKW'                   : 'Feuer 1 - Klein',
  'Brennender Sicherungskasten'      : 'Feuer 1 - Klein',
  'Brennender Wohncontainer'         : 'Feuer 1 - Klein',
  'Brennendes Bus-Häuschen'          : 'Feuer 1 - Klein',
  'Brennendes Gebüsch'               : 'Feuer 1 - Klein',
  'Brennendes Gras'                  : 'Feuer 1 - Klein',
  'Brennendes Flugzeug'              : 'Feuer 5 - Flughafen',
  'Brennt Anhänger'                  : 'Feuer 1 - Klein',
  'Brennt Tanklager'                 : 'Feuer 3 - Großalarm - Gefahrgut+GW-TUIS|GW-W',
  'Brennt Tanklager '                : 'Feuer 3 - Großalarm - Gefahrgut+GW-TUIS|GW-W',
  'Chemieunfall (an Schule)'         : 'Feuer 3 - Großalarm - Gefahrgut',
  'Chlorgas Alarm (Schwimmbad)'      : 'Feuer 3 - Großalarm - Gefahrgut',
  'Container Brand'                  : 'Feuer 1 - Klein',
  'Dachstuhlbrand'                   : 'Feuer 2 - Mittel - Leiter',
  'Fahrstuhl - Türöffnung'           : 'TH 1 - Rüst',
  'Feldbrand'                        : 'Feuer 1 - Klein|FLF',
  'Fettbrand in Pommesbude'          : 'Feuer 2 - Mittel - Tank',
  'Feuer auf Boot (Klein)'           : 'H1 - Hafen klein|LF',
  'Feuer auf Boot (Mittel)'          : 'H2 - Hafen mittel|LF',
  'Feuer im Altenheim'               : 'Feuer 3 - Großalarm - Leiter',
  'Feuer im Krankenhaus'             : 'Feuer 4 - Großalarm - komplett|GW-W,GW-A',
  'Feuer im Laubhaufen'              : 'Feuer 1 - Klein',
  'Feuer im Personenzug'             : 'Feuer 3 - Großalarm|TLF,GW-W',
  'Gabelstapler im Hafenbecken'      : 'TH 2 - Wasser - Bergung',
  'Gas-Explosion'                    : 'Feuer 1 - Klein',
  'Garagenbrand'                     : 'Feuer 2 - Mittel',
  'Gartenlaubenbrand'                : 'Feuer 1 - Klein',
  'Gastronomiebrand'                 : 'Feuer 3 - Großalarm',
  'Gefahrstoff-Austritt in Firma'    : 'Feuer 2 - Mittel|GW-TUIS,GW-W,GW-A,ELW,LF,LF,LF',
  'Gerüsteinsturz'                   : 'Feuer 1 - Klein',
  'Gewerbebrand'                     : 'Feuer 3 - Großalarm - Leiter',
  'Grasnarbenbrand'                  : 'Feuer 5 - Flughafen - Feuer klein',
  'Güterzug entgleist'               : 'Feuer 3 - Großalarm - Gefahrgut|GW-TUIS,GW-S,DLK',
  'Kaminbrand'                       : 'Feuer 1 - Klein - Leiter',
  'Kellerbrand'                      : 'Feuer 2 - Mittel',
  'Keller unter Wasser'              : 'TH 2 - Wasser - Pumpe',
  'Kinobrand'                        : 'Feuer 3 - Großalarm - Leiter|TLF',
  'Kioskbrand'                       : 'Feuer 1 - Klein',
  'Kleiner Waldbrand'                : 'Feuer 1 - Klein',
  'Kleintier in Not'                 : 'TH 1 - Klein',
  'Küchenbrand'                      : 'Feuer 1 - Klein|LF',
  'LKW in Brückengeländer'           : 'Feuer 1 - Klein - Leiter|ELW,KW,RW',
  'Mähdrescherbrand'                 : 'Feuer 1 - Klein - Tank',
  'Maschinenbrand'                   : 'Feuer 3 - Großalarm',
  'Motorrad-Brand'                   : 'Feuer 1 - Klein',
  'Mülleimer Brand'                  : 'Feuer 1 - Klein|FLF',
  'Ölspur'                           : 'TH 3 - Umwelt - Öl',
  'Person im Fluss'                  : 'TH 2 - Wasser - Rettung',
  'Person in Schacht'                : 'TH 1 - Klein',
  'PKW-Brand'                        : 'Feuer 1 - Klein',
  'PKW in Fluss'                     : 'TH 2 - Wasser - Bergung',
  'Schuppenbrand'                    : 'Feuer 2 - Mittel - Gefahrgut',
  'Scheunenbrand'                    : 'Feuer 2 - Mittel - Wasser',
  'Schornsteinbrand'                 : 'Feuer 2 - Mittel - Leiter',
  'Silobrand'                        : 'Feuer 2 - Mittel',
  'Sperrmüllbrand'                   : 'Feuer 1 - Klein',
  'Strohballen Brand'                : 'Feuer 1 - Klein',
  'Tankbrand'                        : 'Feuer 3 - Großalarm - Tank|GW-TUIS,GW-Öl',
  'Traktorbrand'                     : 'Feuer 1 - Klein',
  'Trocknerbrand'                    : 'Feuer 1 - Klein',
  'Türöffnung'                       : 'TH 1 - Klein',
  'Unfall mit Gefahrgut-Transport'   : 'Feuer 2 - Mittel - Gefahrgut|KW,GW-A',
  'Verkehrsunfall'                   : 'TH 3 - Umwelt - Öl|RW',
  'Verletztentransport'              : 'RD 1 - Transport',
  'VU mit Straßenbahn'               : 'TH 5 - Schiene|RW,ELW',
  'Waldbrand'                        : 'Feuer 4 - Großalarm|GW-W,DLK',
  'Wassereinbruch'                   : 'Feuer 1 - Klein',
  'Wohnblockbrand'                   : 'Feuer 3 - Großalarm|GW-A',
  'Wohnungsbrand'                    : 'Feuer 2 - Mittel',
  'Wohnwagenbrand'                   : 'Feuer 1 - Klein',
};

// ====================================================================================================
// ========== A U S R Ü C K E O R D N U N G ===========================================================
// ====================================================================================================

var Einsatzklasse_Fahrzeugzuordnung = {

  'undef'                              :  'LF',

  'Feuer 1 - Klein'                    :  'LF',
  'Feuer 1 - Klein - Tank'             :  'LF,TLF',
  'Feuer 1 - Klein - Leiter'           :  'LF,DLK',

  'Feuer 1 - Klein - FLF'              :  'FLF/LF',

  'Feuer 2 - Mittel'                   :  'LF,LF',
  'Feuer 2 - Mittel - Tank'            :  'LF,LF,TLF',
  'Feuer 2 - Mittel - Leiter'          :  'LF,LF,DLK',

  'Feuer 2 - Mittel - Gefahrgut'       :  'LF,LF,ELW,GW-M,GW-G',
  'Feuer 2 - Mittel - Wasser'          :  'LF,LF,GW-W',
  'Feuer 2 - Mittel - Schiene'         :  'LF,LF,GW-S',

  'Feuer 3 - Großalarm'                :  'LF,LF,LF,ELW',
  'Feuer 3 - Großalarm - Tank'         :  'LF,LF,LF,ELW,TLF',
  'Feuer 3 - Großalarm - Leiter'       :  'LF,LF,LF,ELW,DLK',
  'Feuer 3 - Großalarm - Gefahrgut'    :  'LF,LF,LF,ELW,RW,GW-M,GW-G',

  'Feuer 4 - Großalarm'                :  'LF,LF,LF,LF,LF,LF,ELW,TLF',
  'Feuer 4 - Großalarm - komplett'     :  'LF,LF,LF,LF,LF,LF,ELW,DLK,GW-G,GW-M,RW',

  'Feuer 5 - Flughafen'                :  'FLF,FLF,FLF,FLF,FLF,RTF,ELW,GW-M,GW-G,RW,GW-Öl',
  'Feuer 5 - Flughafen - Feuer klein'  :  'FLF',

  'Feuer 6 - GSL-VERBAND'              :  'ELW,DLK,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,GW-G,GW-M,GW-W,RW,GW-Öl,TLF,TLF,TLF,TLF,TLF',

  'TH 1 - Klein'                       :  'LF',
  'TH 1 - Rüst'                        :  'LF,RW',
  'TH 1 - Leiter'                      :  'LF,RW,DLK',
  'TH 1 - Kran'                        :  'LF,RW,KW',

  'TH 2 - Wasser - Rettung'            :  'LF,GW-T',
  'TH 2 - Wasser - Pumpe'              :  'LF,TLF',
  'TH 2 - Wasser - Bergung'            :  'LF,LF,GW-T,RW,KW',

  'TH 3 - Umwelt - Öl'                 :  'LF,GW-Öl',
  'TH 3 - Umwelt - Rüst'               :  'LF,RW,GW-Öl',

  'TH 4 - Kran'                        :  'LF,KW',

  'TH 5 - Schiene'                     :  'LF,LF,KW,GW-S',

  'H1 - Hafen klein'                   :  'LF',
  'H2 - Hafen mittel'                  :  'LF,LF',

  'RD 1 - Transport'                   :  'RTW schon in Alarmliste',
};

// ====================================================================================================
// ========== F A H R Z E U G K L A S S E N ===========================================================
// ====================================================================================================

var Fahrzeugklassen = {
// Tank- und Pulverlöschfahrzeuge
  'TLF 20/40 - SL'                  :   'TLF'       ,

// Tagebau
  'GW-Höhenrettung'                 :   'GW-HR'     ,

// Sonstiges
  'Kran'                            :   'KW'        ,

// Rettungsdienst
  'RTW'                             :   'RTW'       ,
  'Notarzteinsatzfahrzeug'          :   'NEF'       ,

// Rüst & Gerätewagen
  'GW-Öl'                           :   'GW-Öl'     ,
  'GW-L2 - Wasser'                  :   'GW-W'      ,
  'GW-A'                            :   'GW-A'      ,
  'RW'                              :   'RW'        ,
  'GW-Messtechnik'                  :   'GW-M'      ,
  'GW-Gefahrgut'                    :   'GW-G'      ,
  'GW-Schiene'                      :   'GW-S'      ,
  'GW-Taucher'                      :   'GW-T'      ,
  'GW-TUIS'                         :   'GW-TUIS'   ,

// Raffinerie
  'ULF mit Löscharm'                :   'ULF'       ,

// Löschfahrzeuge
  'LF 10/6'                         :   'LF'        ,
  'LF 16-TS'                        :   'LF'        ,
  'LF 20/16'                        :   'LF'        ,
  'LF 8'                            :   'LF'        ,
  'Kleinlöschfahrzeug'              :   'LF'        ,
  'HLF 20/16'                       :   'LF'        ,
  'HLF 10/6'                        :   'LF'        ,
  'TLF 16/25'                       :   'LF'        ,
  'HLF 24/14-S'                     :   'LF'        ,
  'LF 20'                           :   'LF'        ,
  'LF 10'                           :   'LF'        ,

// Hubrettungsfahrzeuge
  'DLA (K) 23/12'                   :   'DLK'       ,

// Hafen
  'Feuerlöschboot'                  :   'LF'        ,
  'Rettungsboot'                    :   'RTW'       ,

// Flughafen
  'Flugfeldlöschfahrzeug'           :   'FLF'       ,
  'Rettungstreppe'                  :   'RTF'       ,

// Einsatzleitwagen
  'ELW 1'                           :   'ELW'       ,
};

// ====================================================================================================
// ========== F A H R Z E U G E / G E S C H W I N D I G K E I T =======================================
// ====================================================================================================

var Fahrzeuggeschwindigkeiten = {
// Tank- und Pulverlöschfahrzeuge
  'TLF 20/40 - SL'                  :   '49'   ,

// Tagebau
  'GW-Höhenrettung'                 :   '55'   ,

// Sonstiges
  'Kran'                            :   '55'   ,

// Rettungsdienst
  'RTW'                             :   '75'   ,
  'Notarzteinsatzfahrzeug'          :   '80'   ,

// Rüst & Gerätewagen
  'GW-Öl'                           :   '51'   ,
  'GW-L2 - Wasser'                  :   '53'   ,
  'GW-A'                            :   '56'   ,
  'RW'                              :   '49'   ,
  'GW-Messtechnik'                  :   '40'   ,
  'GW-Gefahrgut'                    :   '46'   ,
  'GW-Schiene'                      :   '57'   ,
  'GW-Taucher'                      :   '62'   ,
  'GW-TUIS'                         :   '73'   ,

// Raffinerie
  'ULF mit Löscharm'                :   '40'   ,

// Löschfahrzeuge
  'LF 10/6'                         :   '58'   ,
  'LF 16-TS'                        :   '52'   ,
  'LF 20/16'                        :   '60'   ,
  'LF 8'                            :   '48'   ,
  'Kleinlöschfahrzeug'              :   '60'   ,
  'HLF 20/16'                       :   '60'   ,
  'HLF 10/6'                        :   '58'   ,
  'TLF 16/25'                       :   '55'   ,
  'HLF 24/14-S'                     :   '60'   ,
  'LF 20'                           :   '60'   ,
  'LF 10'                           :   '58'   ,

// Hubrettungsfahrzeuge
  'DLA (K) 23/12'                   :   '63'   ,

// Hafen
  'Feuerlöschboot'                  :   '60'   ,
  'Rettungsboot'                    :   '60'   ,

// Flughafen
  'Flugfeldlöschfahrzeug'           :   '110'  ,
  'Rettungstreppe'                  :   '65'   ,

// Einsatzleitwagen
  'ELW 1'                           :   '77'   ,
};


// ====================================================================================================
// ========== N A C H F O R D E R U N G E N ===========================================================
// ====================================================================================================

var Nachforderungen = {

// Nachforderungen ELW
  "Die Einsatzstelle wird unübersichtlich. Wir benötigen einen ELW 1." : "ELW",
  "Die Lage wird zu unübersichtlich! Wir brauchen einen ELW 1." : "ELW",
  "Die Lage ist zu unübersichtlich! Wir benötigen einen ELW 1." : "ELW",
  "Hier wird es zu unübersichtlich! Wir benötigen einen ELW 1" : "ELW",
  "Vorort herrscht Chaos! Wir benötigen einen ELW 1." : "ELW",
  "Zur besseren Koordination benötigen wir einen ELW 1." : "ELW",
  "Aufgrund der Ausbreitung wird ein ELW 1 benötigt." : "ELW",
  "Die Lage ist unübersichtlich! Wir brauchen einen ELW 1." : "ELW",
  "Wir benötigen einen ELW 1." : "ELW",
  "Es wird ein ELW 1 benötigt." : "ELW",

// Nachforderungen TLF
  "Die Wasserversorgung ist unzureichend! Ein TLF 20/40 - SL wird benötigt." : "TLF",
  "Wir benötigen mehr Schaummittel. Es wird ein TLF 20/40 - SL benötigt." : "TLF",
  "Ein TLF 20/40 - SL wird benötigt, da größere Mengen Schaummittel und der Wasserwerfer eingesetzt werden sollen." : "TLF",
  "Wir brauchen mehr Wasser und fordern somit ein TLF 20/40 - SL an." : "TLF",
  "Ein TLF 20/40 - SL wird benötigt, da der Wasserwerfer eingesetzt werden sollen." : "TLF",

// Nachforderungen RW
  "Wir benötigen Material vom Rüstwagen (RW)!" : "RW",
  "Für erweiterte Technische Hilfe wird ein RW (Rüstwagen) benötigt." : "RW",
  "Um das Auto zu befreien, benötigen wir einen RW!" : "RW",
  "Um das Haus vom Baum zu befreien, benötigen wir einen Rüstwagen (RW)" : "RW",
  "Wir benötigen Material vom RW." : "RW",
  "Wir brauchen Material aus dem RW." : "RW",
  "Wir benötigen einen RW." : "RW",
  "Wir benötigen Material vom Rüstwagen (RW)!" : "RW",
  "Es wird ein Rüstwagen (RW) benötigt." : "RW",

// Nachforderungen DLK
  "Wir benötigen für weitere Löscharbeiten dringend eine Drehleiter (DLA (K) 23/12)." : "DLK",
  "Um das Feuer besser erreichen zu können, brauchen wir eine Drehleiter (DLA (K) 23/12)." : "DLK",
  "Um die oberen Stockwerke zu erreichen, brauchen wir eine Drehleiter (DLA (K) 23/12)." : "DLK",
  "Um die Löscharbeiten weiter ausführen zu können, wird eine Drehleiter (DLA (K) 23 / 12) benötigt." : "DLK",
  "Für Dachlöscharbeiten wird eine DLA (K) 23/12 benötigt." : "DLK",
  "Wir erreichen den Baum nicht richtig! Wir benötigen eine DLA (K) 23/12." : "DLK",
  "Um am Kamin arbeiten zu können, benötigen wir eine Drehleiter (DLA (K) 23/12)." : "DLK",
  "Um die oberen Stockwerke zu erreichen, wird eine Drehleiter (DLA (K) 23/12) benötigt." : "DLK",
  "Zum erreichen des Daches wird eine DLA (K) 23/12 benötigt." : "DLK",
  "Um die Löscharbeiten weiter ausführen zu können, wird eine Drehleiter (DLA (K) 23 / 12) benötigt" : "DLK",
  "Wir benötigen eine DLA (K) 23/12." : "DLK",
  "Wir müssen Äste an der Bahnstrecke entfernen und brauchen eine DLA (K) 23/12" : "DLK",

// Nachforderungen GW-Atemschutz
  "Uns gehen die Atemschutzgeräte aus! Wir benötigen einen GW-A." : "GW-A",
  "Wir benötigen weitere Atemschutzgeräte vom GW-A." : "GW-A",
  "Wir benötigen einen GW-A." : "GW-A",
  "Wir benötigen den GW-A." : "GW-A",

// Nachforderungen GW-Gefahrgut
  "Unbekannte Stoffe sind ausgetreten. Wir benötigen einen GW-Gefahrgut." : "GW-G",
  "Unbekannte Fässer wurden gefunden! Wir benötigen einen GW-Gefahrgut." : "GW-G",
  "Zur Gefahrenabwehr benötigen wir einen GW-Gefahrgut." : "GW-G",
  "Wir benötigen die Ausrüstung vom GW-Gefahrgut." : "GW-G",
  "Gefahrstoffe könnten aufgetreten sein! Wir benötigen einen GW-Gefahrgut" : "GW-G",
  "Hier wurden Gefäße mit unbekannten Flüssigkeiten gefunden. Wir benötigen zur Abklärung einen GW-Gefahrgut." : "GW-G",
  "Es könnte Gefahrgut ausgetreten sein. Wir benötigen einen GW-Gefahrgut." : "GW-G",
  "Hier lagern Pestizide. Es wird ein GW-Gefahrgut benötigt." : "GW-G",
  "Wir benötigen den GW-Gefahrgut." : "GW-G",
  "Wir benötigen einen GW-Gefahrgut." : "GW-G",

// Nachforderungen GW-Meß
  "Unbekannte Stoffe sind ausgetreten. Wir benötigen zum Messen einen GW-Messtechnik" : "GW-M",
  "Es treten unbekannte Gase aus. Wir brauchen zur Abklärung einen GW-Messtechnik." : "GW-M",
  "Es treten unbekannte Gase aus. Wir brauchen zur Abklärung einen GW-Messtechnik" : "GW-M",
  "Es treten Gase aus! Zur Überprüfung benötigen wir einen GW-Messtechnik." : "GW-M",
  "Es ist unklar ob sich Gefahrgut im Flugzeug befindet! Wir brauchen einen GW-Messtechnik." : "GW-M",
  "Hier lagern Pestizide. Es wird ein GW-Messtechnik benötigt." : "GW-M",
  "Wir benötigen den GW-Messtechnik." : "GW-M",
  "Wir benötigen einen GW-Messtechnik." : "GW-M",
  "Es wird ein GW-Messtechnik benötigt." : "GW-M",

// Nachforderungen GW-Öl
  "Beim Verkehrsunfall sind große Mengen Öl ausgelaufen! Wir brauchen den GW-Öl!" : "GW-Öl",
  "Hier laufen größere Mengen Öl aus! Wir benötigen einen GW-Öl" : "GW-Öl",
  "Zum abstreuen benötigen wir den GW-Öl!" : "GW-Öl",
  "Um das auslaufende Öl binden zu können, brauchen wir einen GW-Öl." : "GW-Öl",
  "Zum aufnehmen von größeren Mengen Öl, benötigen wir den GW-Öl." : "GW-Öl",
  "Wir benötigen Material vom GW-Öl." : "GW-Öl",
  "Wir benötigen einen GW-Öl." : "GW-Öl",

// Nachforderungen GW-L2 Wasser
  "Hier muss Wasser über weite Wegstrecken transportiert werden. Wir benötigen einen GW-L2 Wasser." : "GW-W",
  "Wir müssen Wasser über eine weite Wegstrecke transporierten und benötigen einen GW-L2 Wasser" : "GW-W",
  "Um Leitungen über weite Strecken legen zu können, benötigen wir einen GW - L2 - Wasser." : "GW-W",
  "Das Feuer ist weiter ausserhalb und alle Wasserreserven sind aufgebraucht. Wir brauchen einen GW-L2 -Wasser um weitere Schläuche verlegen zu können." : "GW-W",
  "Wir benötigen einen GW-L2 - Wasser" : "GW-W",
  "Wir benötigen den GW-L2 - Wasser." : "GW-W",

// Nachforderungen GW-Schiene
  "Um weiter arbeiten zu können, benötigen wir einen GW-Schiene." : "GW-S",

// Nachforderungen GW-TUIS
  "Wir benötigen Beratung und Material durch den GW-TUIS." : "GW-TUIS",
  "Wir benötigen den GW-TUIS." : "GW-TUIS",
  "Wir benötigen einen GW-TUIS." : "GW-TUIS",

// Nachforderungen GW-Taucher
  "Wir benötigen Ausrüstung und Personal vom GW-Taucher" : "GW-T",

// Nachforderungen Kranwagen
  "Wir benötigen für weitere Arbeiten einen Kran." : "KW",
  "Um das Fahrzeug zu bergen, benötigen wir einen Kran." : "KW",
  "Wir benötigen einen Kran." : "KW",
  "Es wird ein Kran benötigt." : "KW",

// Nachforderungen Flughafenlöschfahrzeug
  "Wir benötigen Flugfeldlöschfahrzeuge!" : "FLF",

// Nachforderungen Universallöschfahrzeug
  "Wir benötigen ein ULF mit Löscharm." : "ULF",

// Nachforderungen Rettungstreppe

// Nachforderungen Notarzt
  "Wir benötigen ein NEF!" : "NEF",


// Fehlerhafte Nachforderungen
  "Um das Fahrzeug zur bergen, benötigen wir einen Kran." : "KW",
  "Aufgrund der Ausbreitung benötigen wird ein ELW 1 benötigt." : "ELW",

};



// ====================================================================================================
// ========== W I K I P E D I A - L I N K S ===========================================================
// ====================================================================================================

// entfernt, da ich es nicht benutze

var WikiLinks = {
};

// ====================================================================================================
// ========== S T A R T - S C R I P T =================================================================
// ====================================================================================================

var ToAlarm = new Array;
var Optional = new Array;
var Unterwegs = new Array;
var NichtVerf = new Array;
var ichBins;
var FirstRun=true;
var CBClicked=false;
var debugging;
var machVorschlag=true;
var zweiterAbmarsch=GM_getValue("zweiterAbmarsch",0);
var AlleGleich;
var showInfoKlasseInListe;
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
  else if (adr == "http://www.feuerwache.net/feuerwachen")
  { bearbeiteFeuerwachenliste(); }
  else if (adr == "http://www.feuerwache.net/personal/list")
  { bearbeitePersonaltabellen(); }
  else if (adr.match("http://www.feuerwache.net/feuerwachen/.*/feuerwehrleute"))
  { bearbeitePersonaltabellen(); }
  else if (adr.match("http://www.feuerwache.net/feuerwachen/.*/feuerwehrautos"))
  { bearbeiteWacheFahrzeugliste(); }
  else if (adr.match("http://www.feuerwache.net/vehicle/show/caption_url/*"))
  { bearbeiteFahrzeugkauf(); }
  else if (adr.match("http://www.feuerwache.net/feuerwehrfahrzeuge/[0-9]*/verschieben"))
  { bearbeiteFahrzeugkauf(); }
  else if (adr.match("http://www.feuerwache.net/building_to_user/show/id/*"))
  { bearbeiteLehrgangszuteilung(); }
  else if (adr.match("http://www.feuerwache.net/feuerwehr-einsaetze/[0-9]*"))
  { bearbeiteEinsatzseite(); }
  else if (adr.match("http://www.feuerwache.net/feuerwehrfahrzeuge/[0-9]*/bearbeiten"))
  { bearbeiteFahrzeugseite(); }
  
  ichBins = false;
}

function bearbeiteFahrzeugseite()
{ // Fahrzeug bearbeiten
  var H = "<script type='text/javascript'>\n";
  H += "function ToggleStatus6()\n";
  H += "{\n";
  H += "  var I=document.getElementById('caption');\n";
  H += "  var FN=I.value;\n";
  H += "  if (FN.substr(0,4).toUpperCase()=='XXX ')\n";
  H += "  { I.value = FN.substr(4,FN.length-4); }\n";
  H += "  else { I.value = 'XXX ' + FN; }\n";
  H += "}\n";
  H += "</script>\n\n";
  H += "<a href='javascript:ToggleStatus6();';>Fahrzeug in/außer Dienst stellen</a>\n";
  
  var INP = document.getElementById("caption");
  var td = document.createElement("td");
  td.innerHTML = H;
  INP.parentNode.parentNode.insertBefore(td,INP.parentNode.nextSibling);
}

function bearbeiteFahrzeugkauf()
{ var FRM = document.getElementsByTagName("form")[0];
  if (!FRM) return;
  var TB = FRM.getElementsByTagName("table")[0];
  if (!TB) return;
  var TR = TB.getElementsByTagName("tr")[2];
  if (!TR) return;
  var TD = TR.getElementsByTagName("td")[0];
  if (!TD) return;

  for each (Par in TD.getElementsByTagName("p"))
  { if (Par.innerHTML.match("Diese Feuerwache kann keine Fahrzeuge mehr aufnehmen"))
    { Par.style.display = "none"; }
    if (Par.innerHTML.match("Zuwenig bzw. keine Stellplätze für Rettungswagen"))
    { Par.style.display = "none"; }
  }
}

function bearbeiteWacheFahrzeugliste()
{ 
  var DC = document.getElementById("content");
  var TBs = DC.getElementsByClassName("defaultTable");
  var H2s = DC.getElementsByTagName("h2");

  for each (H2 in H2s)
  { var A = H2.getElementsByTagName("a")[0];
    if (A)
    {
      var FWLink = A.href;
      H2.innerHTML += "&nbsp;&nbsp;<a href='" + FWLink + "/feuerwehrleute'><font size='-1'>(Personal)</font></a>";
    }
  }
}

function bearbeiteFeuerwachenliste()
{ 
  var TRs = document.getElementById("content").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  for (i=0;i<TRs.length;i++)
  { var TR=TRs[i];
    var TD = TR.getElementsByTagName("td")[1];
    var L = TD.getElementsByTagName("a")[0];
    
    // Spalte Fahrzeuge
    var TD = TR.getElementsByTagName("td")[3];
    var H1 = TD.getElementsByTagName("a")[0].innerHTML;
    var H2 = TD.innerHTML.split(" / ")[1];
    var H = "&nbsp;" + H1 + " / " + H2 + "&nbsp;" ;
    if (parseInt(H1) != parseInt(H2)) H = "<font color='#088A08'>"+H+"</font>";
    H = "<a href='" + L + "/feuerwehrautos'>" + H + "</a>";
    TD.innerHTML = H;

    // Spalte Rettungswagen
    TD = TR.getElementsByTagName("td")[4];
    H = TD.innerHTML;
    H2 = H.split("/");
    if (parseInt(H2[0]) != parseInt(H2[1])) H = "<font color='#088A08'>"+H+"</font>";
    TD.innerHTML = H;

    // Spalte Feuerwehrleute
    TD = TR.getElementsByTagName("td")[5];
    var A = TD.getElementsByTagName("a")[0];
    A.innerHTML = "&nbsp;" + A.innerHTML + "&nbsp;";

    // Spalte Stufe
    TD = TR.getElementsByTagName("td")[6];
    TD.style.textAlign = "left";
    H = TD.innerHTML;
    if (parseInt(H) < 5) H += "&nbsp;<a href='" + L + "/ausbauen'>&nbsp;+&nbsp;</a>";
    TD.innerHTML = H;
  }
}

function bearbeiteLeitstelle()
{
  var DC = document.getElementById("content");
  var TBs = DC.getElementsByClassName("defaultTable");
  var H2s = DC.getElementsByTagName("h2");

  for each (H2 in H2s)
  { var A = H2.getElementsByTagName("a")[0];
    if (A)
    {
      var FWLink = A.href;
      H2.innerHTML += "<br><a href='" + FWLink + "/feuerwehrleute'><font size='-1'>Personal</font></a>";
      H2.innerHTML += "&nbsp/&nbsp<a href='" + FWLink + "/feuerwehrautos'><font size='-1'>Fahrzeuge</font></a>";
    }
  }
}

function bearbeitePersonaltabellen()
{
  var DC = document.getElementById("content");
  var TBs = DC.getElementsByClassName("defaultTable");
  var H2s = DC.getElementsByTagName("h2");

  for (var i=0; i<TBs.length; i++)
  { var TB=TBs[i];
  
    var T = BearbeitePersonaltabelle(TB);

    if (T != "")
    { var FWStat = document.createElement("div")
      TB.parentNode.insertBefore(FWStat,TB);
      FWStat.innerHTML = T;
    }
    
    var H2 = H2s[i];
    var A = H2.getElementsByTagName("a")[0];
    var FWLink = A.href;
    H2.innerHTML += "&nbsp&nbsp<a href='" + FWLink + "/feuerwehrautos'><font size='-1'>(Fahrzeuge)</font></a>";
  }
  
  // vor der ersten Überschrift Default-Sortierung anbieten:
  if (!document.getElementById("DefaultSort"))
  {
    var div = document.createElement("div");
    div.style.paddingBottom = "10px";
    div.innerHTML = "Standard-Sortierung: ";
    var H1 = document.getElementsByTagName("h1")[0];
    if (!H1) H1 = document.getElementsByTagName("h2")[0];
    H1.parentNode.insertBefore(div,H1);
    
    var SEL = document.createElement("select");
    SEL.id = "DefaultSort";
    SEL.options[SEL.length] = new Option("(unsortiert)","-1");
    SEL.options[SEL.length] = new Option("Name");
    SEL.options[SEL.length] = new Option("Motivation");
    SEL.options[SEL.length] = new Option("Fähigkeiten");
    SEL.options[SEL.length] = new Option("Alter");
    SEL.options[SEL.length] = new Option("Ausbildung");
    SEL.options[SEL.length] = new Option("Status");
    SEL.options[SEL.length] = new Option("Schicht");
    div.appendChild(SEL);
    
    document.getElementById("DefaultSort").addEventListener( "change" , DefaultSortChanged , true );
  }
  var SEL = document.getElementById("DefaultSort");
  SEL.value = GM_getValue("DefaultTabSort","-1");
}

function DefaultSortChanged()
{ var S = document.getElementById('DefaultSort').value
  GM_setValue("DefaultTabSort",S);
}

function bearbeiteLehrgangszuteilung()
{
  for each (R in document.getElementsByName("education_type"))
  { R.addEventListener ( "click" , Markiere_Schueler , true ) ; }
}


// ====================================================================================================
// ========== A U S B I L D U N G E N =================================================================
// ====================================================================================================

 function Markiere_Schueler()
 { var GG = document.getElementById("education_type_1").checked;
   var RA = document.getElementById("education_type_2").checked;
   var TA = document.getElementById("education_type_3").checked;
   var FH = document.getElementById("education_type_4").checked;
   var FLB = document.getElementById("education_type_5").checked;
   var RTB = document.getElementById("education_type_6").checked;
   var TUI = document.getElementById("education_type_7").checked;
// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X U P D A T E _ A U S B I L D U N G X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
   var ZWF = document.getElementById("education_type_8").checked;
   var RTZ = document.getElementById("education_type_9").checked;
   var HRD = document.getElementById("education_type_10").checked;
// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
   var DT=document.getElementsByClassName("defaultTable");
   if (DT.length<2) return;

  for (var i=1; i<DT.length; i++)
  { var TB = DT[i];
    for each (TR in TB.getElementsByTagName("tr"))
    { var TDs = TR.getElementsByTagName("td");
      if (TDs.length==7) 
      { TDs[0].style.backgroundColor="transparent";
        var Ausb = TDs[5].innerHTML;
        var verf = (TDs[1].innerHTML.match("Nicht verfügbar") == null);

// ************************************************************************************
// Auszubildende kennzeichnen:
// ************************************************************************************

        if (verf)
        { var bgc="";
          if (GG && Ausb.match("Gefahrgut")            == null) bgc = "#BE81F7";
          if (RA && Ausb.match("Rettungsassistent")    == null) bgc = "#FF8C00";
          if (TA && Ausb.match("Taucher")              == null) bgc = "#5858FA";
          if (FH && Ausb.match("Flughafen")            == null) bgc = "#CEE3F6";
          if (FLB && Ausb.match("Löschboot")           == null) bgc = "#F78181";
          if (RTB && Ausb.match("Rettungsboot")        == null) bgc = "#F7BE81";
          if (TUI && Ausb.match("TUIS")                == null) bgc = "#FE2EF7";
// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X U P D A T E _ A U S B I L D U N G X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
          if (ZWF && Ausb.match("2-Wege-Führerschein") == null) bgc = "#009966";
          if (RTZ && Ausb.match("Rettungszug")         == null) bgc = "#99FF33";
          if (HRD && Ausb.match("Höhenrettung")        == null) bgc = "#00FFFF";
// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
          if (bgc) 
          { TDs[0].style.backgroundColor = bgc; 
            TR.style.display = "";
          }
          else 
          { TR.style.display = "none";
          }
        }
        else
        { TR.style.display = "none";
        }

// ************************************************************************************
// Motivation kennzeichnen:
// ************************************************************************************

      var Mot = parseInt(TDs[2].innerHTML);
      if (Mot >= 90) TDs[2].style.color = "#228B22";
      if (Mot <= 89) TDs[2].style.color = "#088A08";
      if (Mot <= 75) TDs[2].style.color = "#32CD32";
      if (Mot <= 50) TDs[2].style.color = "#DF7401";
      if (Mot <= 25) TDs[2].style.color = "#FF6666";
      if (Mot <= 10) TDs[2].style.color = "#B22222";

// ************************************************************************************
// Fähigkeiten kennzeichnen:
// ************************************************************************************

      var Fae = parseInt(TDs[3].innerHTML);
      if (Fae >= 90) TDs[3].style.color = "#228B22";
      if (Fae <= 89) TDs[3].style.color = "#088A08";
      if (Fae <= 75) TDs[3].style.color = "#32CD32";
      if (Fae <= 50) TDs[3].style.color = "#DF7401";
      if (Fae <= 25) TDs[3].style.color = "#FF6666";
      if (Fae <= 10) TDs[3].style.color = "#B22222";

// ************************************************************************************
// Schicht kennzeichnen:
// ************************************************************************************

      var Sch = parseInt(TDs[6].innerHTML);
      if (Sch >= 3) TDs[6].style.color = "#FF1493";
      if (Sch <= 2) TDs[6].style.color = "#1E90FF";
      if (Sch <= 1) TDs[6].style.color = "#DF7401";

        if (verf)
        { if (GG && Ausb.match("Gefahrgut")==null) TDs[0].style.backgroundColor="#BE81F7";
          if (RA && Ausb.match("Rettungsassistent")==null) TDs[0].style.backgroundColor="#FF8C00";
          if (TA && Ausb.match("Taucher")==null) TDs[0].style.backgroundColor="#5858FA";
          if (FH && Ausb.match("Flughafen")==null) TDs[0].style.backgroundColor="#CEE3F6";
          if (FLB && Ausb.match("Löschboot")==null) TDs[0].style.backgroundColor="#F78181";
          if (RTB && Ausb.match("Rettungsboot")==null) TDs[0].style.backgroundColor="#F7BE81";
          if (TUI && Ausb.match("TUIS")==null) TDs[0].style.backgroundColor="#FE2EF7";
// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X U P D A T E _ A U S B I L D U N G X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
          if (ZWF && Ausb.match("2-Wege-Führerschein")==null) TDs[0].style.backgroundColor="#009966";
          if (RTZ && Ausb.match("Rettungszug")==null) TDs[0].style.backgroundColor="#99FF33";
          if (HRD && Ausb.match("Höhenrettung")==null) TDs[0].style.backgroundColor="#00FFFF";
// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
        }
      }
    }
  }
}
// ####################################################################################################
// Schluss - Ausbildungsmenue
// ####################################################################################################


function bearbeiteFahrzeugliste()
{ var DC=document.getElementById("content");
  var ArrTR=new Array;
  
  var H2s = DC.getElementsByTagName("h2");
  for each (H2 in H2s)
  { var A = H2.getElementsByTagName("a")[0];
    if (A)
    { var FWLink = A.href;
      H2.innerHTML += "&nbsp&nbsp<a href='" + FWLink + "/feuerwehrleute'><font size='-1'>(Personal)</font></a>";
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
  T += "<th>FZ-Typ</th>" +
       "<th>Anzahl</th>" +
       "<th style='background-color:#0000F8;'>Dienstfahrt<br>(S1)</th>" +
       "<th style='background-color:#00FF2d;color:#000000;'>auf Wache<br>(S2)</th>" +
       "<th style='background-color:#FFCC27;color:#000000;'>zum Einsatz<br>(S3)</th>" +
       "<th style='background-color:#FF5A19;color:#000000;'>im Einsatz<br>(S4)</th>" +
       "<th style='background-color:#BABABA;color:#000000;'>nicht Bereit<br>(S6)</th>" +
       "<th style='background-color:#DAD815;color:#000000;'>Patient an Bord<br>(S7)</th>" +
       "<th>&Sigma; km</th><th>&Oslash;-km</th>";
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
  var AnzS1=0;
  var AnzS2=0;
  var AnzS3=0;
  var AnzS4=0;
  var AnzS6=0;
  var AnzS6a=0;
  var AnzS7=0;
  var gesamtkm=0;
  var ArrTopKM = new Array;
  
  var TBs = document.getElementsByClassName("defaultTable");
  for (var i=0;i<TBs.length;i++)
  { 
    var TR=TBs[i].getElementsByTagName("tr")[0];
    var LastTH = TR.getElementsByTagName("th")[TR.getElementsByTagName("th").length-1].innerHTML;
    if (LastTH=="Zustand")
    { var TRs = TBs[i].getElementsByTagName("tr");
      var AnzTR = TRs.length;
      for (var j=1;j<AnzTR;j++)
      { var FZName = TRs[j].getElementsByTagName("td")[2].innerHTML;
        if (gefFZ[FZName] == undefined) 
        { FZNamen.push(FZName);
          gefFZ[FZName]=1;
          gefS1[FZName]=0;
          gefS2[FZName]=0;
          gefS3[FZName]=0;
          gefS4[FZName]=0;
          gefS6[FZName]=0;
          gefS6a[FZName]=0;
          gefS7[FZName]=0;
          kmSumme[FZName]=0;
        }
        else 
        { gefFZ[FZName]++;
        }
        var Funkname = TRs[j].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
        
        var FZStat = trim(TRs[j].getElementsByTagName("td")[3].innerHTML);
        if (FZStat=="Einsatzbereit auf Wache" && Funkname.substr(0,3).toUpperCase()=="XXX") FZStat = "Außer Dienst";
        switch (FZStat)
        { case "Frei (Dienstfahrt)":      gefS1[FZName]++; break;
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
        var Zustand = removeTags(TD.innerHTML);
        if (Zustand != "100 %")
        { ArrTR.push(TRs[j].cloneNode(true));
        }
      }
    }
  }

  for each (FZName in FZNamen.sort())
  { 
    AnzS1 += gefS1[FZName];
    AnzS2 += gefS2[FZName];
    AnzS3 += gefS3[FZName];
    AnzS4 += gefS4[FZName];
    AnzS6 += gefS6[FZName];
    AnzS6a += gefS6a[FZName];
    AnzS7 += gefS7[FZName];
    gesamtkm += kmSumme[FZName];
    
    if (gefS1[FZName]==0) gefS1[FZName] = "<font color='#666666'>0</font>";
    if (gefS2[FZName]==0) gefS2[FZName] = "<font color='#666666'>0</font>";
    if (gefS3[FZName]==0) gefS3[FZName] = "<font color='#666666'>0</font>";
    if (gefS4[FZName]==0) gefS4[FZName] = "<font color='#666666'>0</font>";
    if (gefS6[FZName]==0) gefS6[FZName] = "<font color='#666666'>0</font>";
    if (gefS6a[FZName]==0) gefS6a[FZName] = "";
    if (gefS7[FZName]==0) gefS7[FZName] = "<font color='#666666'>0</font>";

    T += "<tr><td><b>" + FZName + "</b></td>";
    T += "<td style='text-align:center'>" + gefFZ[FZName] + "</td>";
    T += "<td style='text-align:center'>" + gefS1[FZName] + "</td>";
    T += "<td style='text-align:center'>" + gefS2[FZName] + "</td>";
    T += "<td style='text-align:center'>" + gefS3[FZName] + "</td>";
    T += "<td style='text-align:center'>" + gefS4[FZName] + "</td>";
    T += "<td style='text-align:center'>" + gefS6[FZName];
    if (gefS6a[FZName]) T += " + " + gefS6a[FZName];
    T += "</td>";
    T += "<td style='text-align:center'>" + gefS7[FZName] + "</td>";
    T += "<td style='text-align:right'>" + makeDots(kmSumme[FZName]) + "</td>";
    var Schnitt = parseInt(kmSumme[FZName] / gefFZ[FZName]);
    T += "<td style='text-align:right'>" + makeDots(Schnitt) + "</td>";
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
  T += "<th>" + makeDots(gesamtkm) + "</th>";
  var Schnitt = parseInt(gesamtkm / Anz);
  T += "<th>" + makeDots(Schnitt) + "</th>";
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
  for (var i=0;i<5;i++)
  { TD.innerHTML += ArrTopKM[i][1] + " (" + makeDots(ArrTopKM[i][0]) + " km)<br>\n";
  }
  
  // Zustandstabelle in Dokument schreiben, aber erstmal verstecken,
  // Anzeigen erst durch Klick auf Toggle-Link

  var NewDiv = document.createElement("div");
  //NewDiv.id = "DivZustandstabelle";
  var H = "<script type='text/javascript'>\n";
  H += "function toggledisplay()\n";
  H += "{ var e = document.getElementById('DivZustandstabelle');\n";
  H += "  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n";
  H += "}\n";
  H += "</script>";

  H += "<a href='javascript:toggledisplay();';>defekte Fahrzeuge auflisten</a>";
  H += "<br>\n";
  NewDiv.innerHTML = H;
  
  var hiddenDiv=document.createElement("div");
  hiddenDiv.id = "DivZustandstabelle";
  hiddenDiv.style.display = "none";
  var H2 = document.createElement("h2");
  H2.appendChild(document.createTextNode("defekte Fahrzeuge"));
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
  
  NewDiv.appendChild(hiddenDiv);
  TB=document.getElementById("Übersichtstabelle");
  TB.parentNode.insertBefore(NewDiv,TB.nextSibling);
  TB=document.getElementById("Zustandstabelle").getElementsByTagName("tbody")[0];
  for each (TR in ArrTR) TB.appendChild(TR);
  
  // Tabelle sortieren
  // function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link)
  SortTabelle(hiddTB,6,true,true,true);
}

function bearbeiteEinsatzseite()
{ 
  // Alle Infobox-Variablen leer machen
  InfotextStichwort="";
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

  // verfügbare FZ zählen
  if (showInfoVerfuegbar) InfotextVerfuegbar = zaehleVerfuegbar();
  
  // im Verbandseinsatz die Checkbox per default NICHT anhaken, sonst schon
  if (document.getElementById("machVorschlag") == undefined) machVorschlag = !Verbandseinsatz();
  
  // =========================================================================================================
  // Einsatzstichwort ermitteln (Einsatzseite)
  // =========================================================================================================
  var EinsatzDiv = document.getElementById("mission_content");
  var Einsatz = document.getElementsByTagName("h1")[0];
  var Einsatzstichwort = getStichwort(Einsatz.innerHTML);
  if (showInfoStichwort) 
  { InfotextStichwort = Einsatzstichwort;
    var L = getWikiLink(Einsatzstichwort);
    if (L != "") InfotextStichwort = "<a target='_new' href='" + L + "'>" + Einsatzstichwort + "</a>";
  }
  
  // Einsatzklasse
  var Einsatzklasse = getEinsatzKlasse(Einsatzstichwort);
  if (showInfoKlasse) InfotextKlasse = Einsatzklasse;
  // Fahrzeuge zusammenstellen
  FillAlarmListe(Einsatzklasse);

  if (showInfoKlassenalarm) InfotextKlassenalarm = ToAlarm.toString();
  if (showInfoKlassenalarmOpt && Optional.length>0) InfotextKlassenalarmOpt = Optional.toString();

  // Anzahl der nötigen RTW ermitteln
  var V = Verletzte();
  if (V>0)
  { if (showInfoRTW) 
    { InfotextRTW = "";
      for (var i=0;i<V;i++) InfotextRTW += "<img class='famfamfamicon' src='/images/pill.png' alt='Pill'>";
      InfotextRTW += " " + V + " verletzte Person";
      if (V>1) InfotextRTW +="en";
    }
    while (V>0) { ToAlarm.push("RTW"); V--; }
  }
  
  // bereits eingebundene Fahrzeuge ermitteln
  FillUnterwegsListe();

  // Diese Unterwegs-Fahrzeuge auflisten...
  if (Unterwegs.length>0)
  { if (showInfoUnterwegs) InfotextUnterwegs = Unterwegs.toString();
  }
  // ToAlarm um die FZ kürzen, die bereits unterwegs sind
  // sowie die Reihenfolge anpassen, dass Alternativen am Ende stehen
  bereinigeToAlarm();
  
  // Nachforderungen auslesen
  var NF = AddNachforderungen();
  if (NF != "" && showInfoNachforderungen) InfotxetNachforderungen = NF;

  if (!machVorschlag)
  { // es sollen keine Vorschläge angehakt werden, also alles aus ToAlarm
    // nach Optional verschieben, so dass alles nur gelb markiert wird.
    while (ToAlarm.length>0) Optional.push(ToAlarm.pop());
  }

  // =========================================================================================================
  // Anzeige zu alarmierende Kfz (Einsatzseite)
  // =========================================================================================================
  if (ToAlarm.length>0) 
  { if (showInfoToAlarm) InfotextToAlarm = "<font size='1'><font color='#088A08'>" + ToAlarm + "</font></font>"; }
  else
  { if (showInfoToAlarm)
    {
      InfotextToAlarm = "<font color=#0174DF>Fahrzeuge ausreichend.</font> "; 
      if (Optional.length>0) InfotextToAlarm += "(Optional: " + Optional + ")";
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
  if (ToAlarm.length > 0 && showInfoNichtVerfuegbar) InfotextNichtVerfuegbar = ToAlarm.toString();
  
  // Text für die Infobox zusammenstellen
  var Info = "<h2>Einsatzinfos</h2>\n";

  // Vorschläge ein- und ausschalten
  Info += "<input type='checkbox' id='machVorschlag' ";
  if (machVorschlag) Info +="checked";
  Info += "> vorgeschlagene Fahrzeuge sofort abhaken<br>\n";
  
  Info += "Abmarschreihenfolge beachten: <input type='checkbox' id='zweiterAbmarschTr' ";
  if (zweiterAbmarsch==1) Info +="checked";
  Info +=">  (Tr-FZ vor Gr-FZ)";
  Info += "&nbsp;&nbsp;<input type='checkbox' id='zweiterAbmarschAusb' ";
  if (zweiterAbmarsch==2) Info +="checked";
  Info +=">  (GG/RTW vor Rest)\n";
  
  // Infos in Tabelle strukturieren
  Info += "<table class='defaultTable'>\n";
  var InfoVorspann = "<tr><th style='width: 150px;'>";

  if (InfotextStichwort) Info += InfoVorspann + "Stichwort</th><td>" + InfotextStichwort + "</td></tr>\n";
  if (InfotextKlasse) 
  { Info += InfoVorspann + "Einsatzklasse</th><td><font color='brown'>" + InfotextKlasse + "</font>";
    if (InfotextKlassenalarmOpt) InfotextKlassenalarm += "<font size='1'>, Optional: " + InfotextKlassenalarmOpt + "&nbsp;</font>";
    if (InfotextKlassenalarm) Info += "<font size='1'>&nbsp;&nbsp;(&nbsp;" + InfotextKlassenalarm + "&nbsp;)</font>";
    Info += "</td></tr>\n";
  }
  // =========================================================================================================
  // Schriftgröße, Fahrzeugübersicht
  // =========================================================================================================
  if (InfotextRTW) Info += InfoVorspann + "RTW benötigt</th><td>" + InfotextRTW + "</td></tr>\n";
  if (InfotextNachforderungen) Info += InfoVorspann + "Nachforderung</th><td>" + InfotextNachforderungen + "</td></tr>\n";
  if (InfotextUnterwegs) Info += InfoVorspann + "bereits im Einsatz</th><td>" + InfotextUnterwegs + "</td></tr>\n";
  if (InfotextToAlarm) Info += InfoVorspann + "<font size='2'>zu alarmieren</font></th><td>" + InfotextToAlarm + "</td></tr>\n";
  if (InfotextVerfuegbar) Info += InfoVorspann + "<a target='_new' href='http://www.feuerwache.net/feuerwehrfahrzeuge'>verfügbare Fahrzeuge</a></th><td><font color='#DF7401'><font size='1'>" + InfotextVerfuegbar + "</font></font></td></tr>\n";
  if (InfotextFahrzeit || InfotextFahrzeitOpt) 
  { Info += InfoVorspann + "Anfahrzeiten</th><td>"
    if (InfotextFahrzeit) Info += "notwendige Fahrzeuge " + InfotextFahrzeit;
    if (InfotextFahrzeit && InfotextFahrzeitOpt) Info += "<br>";
    if (InfotextFahrzeitOpt) Info += "optionale Fahrzeuge " + InfotextFahrzeitOpt;
    Info += "</td></tr>\n";
  }
  if (InfotextNichtVerfuegbar) Info += InfoVorspann + "<font color='red'>Fahrzeug nicht verfügbar</font></th><td><font color='red'>" + InfotextNichtVerfuegbar + "</font></td></tr>\n";
  
  Info += "</table>\n";

  mylog("Info=\n" + Info);
  
  // Infobereich in die Seite einbauen
  var InfoBereich = document.getElementById("InfoBereich");
  if (!InfoBereich)
  { InfoBereich = document.createElement("div");
    InfoBereich.id = "InfoBereich";
    EinsatzDiv.parentNode.insertBefore(InfoBereich,Einsatz.nextSibling);
  }
  InfoBereich.innerHTML = Info;

  document.getElementById("machVorschlag").addEventListener ( "click" , machVorschlag_clicked , false ) ;
  document.getElementById("zweiterAbmarschAusb").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;
  document.getElementById("zweiterAbmarschTr").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;
  
  var D = KonfigHTML();
  if (D != "") 
  { InfoBereich.parentNode.insertBefore(D,InfoBereich.nextSibling);
    AddKonfigEventlisteners();
  }
  
  var BTN = document.getElementsByName("commit")[0];
  if (BTN) BTN.addEventListener ( "click" , function(){ FirstRun=true; } , false ) ;
  
  for each (A in document.getElementsByTagName("a"))
  { if (A.innerHTML == "zurück alarmieren") A.addEventListener ( "click" , function(){ FirstRun=true;CBClicked=false; } , false ) ; }
  
  for each (I in document.getElementsByName("vehicle_to_user_id[]"))
  { I.addEventListener ( "click" , function(){ CBClicked=true; } , false ) ; }
  
  findeFahrzeugeZumZurückalarmieren();
  
  FirstRun=false;
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
      { Row1.getElementsByTagName("td")[5].style.backgroundColor="#B22222";
        Row2.getElementsByTagName("td")[4].style.backgroundColor="#088A08";
        sucheWeiter = false;
      }
      if (FahrtSek2 > RestSek1) sucheWeiter = false;
      j++;
      if (j >= Rows2.length) sucheWeiter = false;
    }
  }
}
// PRÜFEN OB FUNKTION ÜBERHAUPT NOCH FUNZT ================================================================================

function bearbeiteÜbersichtsseite()
{ if (showInfoKlasseInListe)
  { for each (TD in document.getElementsByTagName("td"))
    { for each (A in TD.getElementsByTagName("a"))
      { if ( A.href.indexOf("http://www.feuerwache.net/feuerwehr-einsaetze/") == 0)
        { TD.innerHTML += "&nbsp;<font color='red'>(" + getEinsatzKlasse(A.innerHTML) + ")</font>";
        }
      }
    }
  }
  
  var H1=document.getElementsByTagName("h1")[0];
  var D = KonfigHTML();
  if (D != "") 
  { H1.parentNode.insertBefore(D,H1);
    AddKonfigEventlisteners();
  }
}

function AddKonfigEventlisteners()
{ var Boxes = document.getElementsByName("KonfigBox");
  for each (Box in Boxes)
  { Box.addEventListener("click",KonfigBox_clicked,false);
  }

  if (ScriptUpdateAvailable != "") 
  { document.getElementById("installURL").addEventListener ( 
      "click" , 
      function(){ GM_setValue("Version",ScriptUpdateAvailable); ScriptUpdateAvailable=""; GM_setValue("pleaseUpdate",""); } , 
      true )
  }
}

function SortiereNachSpalte(Tab,SortBy)
{
  var Spalte = -1;
  var c=0;
  for each (TH in Tab.getElementsByTagName("th"))
  { if (TH.innerHTML == SortBy) Spalte=c;
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
{ var THead = myTB.getElementsByTagName("thead")[0];
  if (!THead) return;
  var THs = THead.getElementsByTagName("th");
  for each (TH in THs)
  { var H = TH.innerHTML;
    TH.addEventListener ( "click" , function(e){SortiereNachSpalteClick(e)} , true ) ;
  }
}

// ************************************************************************************
// Personalseite 
// ************************************************************************************

function BearbeitePersonaltabelle(myTB)
{ MachSortierbar(myTB);
  var DefSort = GM_getValue("DefaultTabSort","-1")
  if (DefSort != "-1") SortiereNachSpalte(myTB,DefSort)
  
  var AnzFM=0, AnzEinsatz=0, AnzSchule=0, AnzBereit=0, AnzDienst=0;
  var AnzGG=0, AnzGGDienst=0, AnzGGBereit=0;
  var AnzRA=0, AnzRADienst=0, AnzRABereit=0;
  var AnzTA=0, AnzTADienst=0, AnzTABereit=0;
  var AnzFH=0, AnzFHDienst=0, AnzFHBereit=0;
  var AnzFLB=0, AnzFLBDienst=0, AnzFLBBereit=0;
  var AnzRTB=0, AnzRTBDienst=0, AnzRTBBereit=0;
// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X U P D A T E _ A U S B I L D U N G X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
  var AnzTUI=0, AnzTUIDienst=0, AnzTUIBereit=0;
  var AnzZWF=0, AnzZWFDienst=0, AnzZWFBereit=0;
  var AnzRTZ=0, AnzRTZDienst=0, AnzRTZBereit=0;
// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
  for each (TR in myTB.getElementsByTagName("tr"))
  { if (TR.getElementsByTagName("td").length>5)
    { var TDs = TR.getElementsByTagName("td");
      var Stat = trim(TDs[5].innerHTML);
      var Ausb = trim(TDs[4].innerHTML);

// ************************************************************************************
// Motivation kennzeichnen:
// ************************************************************************************

      var Mot = parseInt(TDs[1].innerHTML);
      if (Mot >= 90) TDs[1].style.color = "#228B22";
      if (Mot <= 89) TDs[1].style.color = "#088A08";
      if (Mot <= 75) TDs[1].style.color = "#32CD32";
      if (Mot <= 50) TDs[1].style.color = "#DF7401";
      if (Mot <= 25) TDs[1].style.color = "#FF6666";
      if (Mot <= 10) TDs[1].style.color = "#B22222";

// ************************************************************************************
// Fähigkeiten kennzeichnen:
// ************************************************************************************

      var Fae = parseInt(TDs[2].innerHTML);
      if (Fae >= 90) TDs[2].style.color = "#228B22";
      if (Fae <= 89) TDs[2].style.color = "#088A08";
      if (Fae <= 75) TDs[2].style.color = "#32CD32";
      if (Fae <= 50) TDs[2].style.color = "#DF7401";
      if (Fae <= 25) TDs[2].style.color = "#FF6666";
      if (Fae <= 10) TDs[2].style.color = "#B22222";
      
// ************************************************************************************
// Schicht kennzeichnen:
// ************************************************************************************

      var Sch = parseInt(TDs[6].innerHTML);
      if (Sch >= 3) TDs[6].style.color = "#FF1493";
      if (Sch <= 2) TDs[6].style.color = "#1E90FF";
      if (Sch <= 1) TDs[6].style.color = "#DF7401";

// ************************************************************************************
// Personalstatistik:
// ************************************************************************************

      AnzFM++;
      
      // Status kennzeichnen und zählen
      if (Stat == "Beim Einsatz") { AnzDienst++; AnzEinsatz++; TDs[5].style.color="#F45"; }
      if (Stat == "Frei - nicht im Dienst") TDs[5].style.color="#766";
      if (Stat == "Einsatzbereit") { AnzDienst++; AnzBereit++; TDs[5].style.color="#6C0"; }
      if (Stat == "In der Feuerwehrschule") { AnzSchule++; TDs[5].style.color="#CA0"; }

      
// ************************************************************************************
// Ausbildungsstand
// ************************************************************************************


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
       { AnzFH++;
         if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzFHDienst++;
         if (Stat == "Einsatzbereit") AnzFHBereit++;
      }
      if (Ausb.match("Löschboot"))
       { AnzFLB++;
         if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzFLBDienst++;
         if (Stat == "Einsatzbereit") AnzFLBBereit++;
      }
      if (Ausb.match("Rettungsboot"))
       { AnzRTB++;
         if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzRTBDienst++;
         if (Stat == "Einsatzbereit") AnzRTBBereit++;

// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X U P D A T E _ A U S B I L D U N G X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
      }
      if (Ausb.match("TUIS"))
       { AnzTUI++;
         if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzTUIDienst++;
         if (Stat == "Einsatzbereit") AnzTUIBereit++;
      }
      if (Ausb.match("2 Wege Führerschein"))
       { AnzZWF++;
         if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzZWFDienst++;
         if (Stat == "Einsatzbereit") AnzZWFBereit++;
      }
      if (Ausb.match("Rettungszug"))
       { AnzRTZ++;
         if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzRTZDienst++;
         if (Stat == "Einsatzbereit") AnzRTZBereit++;
// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
      }
    }
  }

  var ret;
  ret = "<b>Feuerwehrleute:<font color='#FFD700'> " + AnzFM + "</font></b> insgesamt";
  if (AnzSchule)
  { ret += ", davon <font color='#DAA520'>" + AnzSchule + "</font> in der Schule"; }

  if (AnzDienst != AnzFM)
  { ret += "<br><br><b><font color='lightblue'>" + AnzDienst + " im Dienst </font></b> "; }

  ret += "<br><b><font color='lightgreen'>" + AnzBereit + " einsatzbereit</font></b> (=" + parseInt(1000*AnzBereit/AnzDienst)/10 + "%), ";
  if (AnzEinsatz) ret += "<br><b><font color='#FF6666'>" + AnzEinsatz + " im Einsatz</font></b> (=" + parseInt(1000*AnzEinsatz/AnzDienst)/10 + "%), ";
  ret = ret.substr(0,ret.length-2) + "<br><br>";
  if (AnzGG)
  { ret += "<font color='#BE81F7'>Gefahrgut: </font><font color='#FFD700'><b>" + AnzGG + " </b></font>insgesamt, <font color='lightblue'>" + AnzGGDienst + " im Dienst</font>";
    if (AnzGGDienst != AnzGGBereit)
    { ret += ", davon <font color='lightgreen'>" + AnzGGBereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += " <font color='lightgreen'>(alle einsatzbereit).</font><br>\n"; }
  }
  if (AnzRA)
  { ret += "<font color='#FF8C00'>Rettung: </font><font color='#FFD700'><b>" + AnzRA + " </b></font>insgesamt, <font color='lightblue'>" + AnzRADienst + " im Dienst</font>";
    if (AnzRADienst != AnzRABereit)
    { ret += ", davon <font color='lightgreen'>" + AnzRABereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += " <font color='lightgreen'>(alle einsatzbereit).</font><br>\n"; }
  }
  if (AnzTA)
  { ret += "<font color='#5858FA'>Taucher: </font><font color='#FFD700'><b>" + AnzTA + " </b></font>insgesamt, <font color='lightblue'>" + AnzTADienst + " im Dienst</font>";
    if (AnzTADienst != AnzTABereit)
    { ret += ", davon <font color='lightgreen'>" + AnzTABereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += " <font color='lightgreen'>(alle einsatzbereit).</font><br>\n"; }
  }
  if (AnzFH)
  { ret += "<font color='#CEE3F6'>Flughafen: </font><font color='#FFD700'><b>" + AnzFH + " </b></font>insgesamt, <font color='lightblue'>" + AnzFHDienst + " im Dienst</font>";
    if (AnzFHDienst != AnzFHBereit)
    { ret += ", davon <font color='lightgreen'>" + AnzFHBereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += " <font color='lightgreen'>(alle einsatzbereit).</font><br>\n"; }
 }
  if (AnzFLB)
  { ret += "<font color='#F78181'>Löschboot: </font><font color='#FFD700'><b>" + AnzFLB + " </b></font>insgesamt, <font color='lightblue'>" + AnzFLBDienst + " im Dienst</font>";
    if (AnzFLBDienst != AnzFLBBereit)
    { ret += ", davon <font color='lightgreen'>" + AnzFLBBereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += " <font color='lightgreen'>(alle einsatzbereit).</font><br>\n"; }
 }
  if (AnzRTB)
  { ret += "<font color='#F7BE81'>Rettungsboot: </font><font color='#FFD700'><b>" + AnzRTB + " </b></font>insgesamt, <font color='lightblue'>" + AnzRTBDienst + " im Dienst</font>";
    if (AnzRTBDienst != AnzRTBBereit)
    { ret += ", davon <font color='lightgreen'>" + AnzRTBBereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += " <font color='lightgreen'>(alle einsatzbereit).</font><br>\n"; }
 }

// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X U P D A T E _ A U S B I L D U N G X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
  if (AnzTUI)
  { ret += "<font color='#FE2EF7'>TUIS: </font><font color='#FFD700'><b>" + AnzTUI + " </b></font>insgesamt, <font color='lightblue'>" + AnzTUIDienst + " im Dienst</font>";
    if (AnzTUIDienst != AnzTUIBereit)
    { ret += ", davon <font color='lightgreen'>" + AnzTUIBereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += " <font color='lightgreen'>(alle einsatzbereit).</font><br>\n"; }
 }
  if (AnzZWF)
  { ret += "<font color='#009966'>2-Wege-Führerschein: </font><font color='#FFD700'><b>" + AnzZWF + " </b></font>insgesamt, <font color='lightblue'>" + AnzZWFDienst + " im Dienst</font>";
    if (AnzZWFDienst != AnzZWFBereit)
    { ret += ", davon <font color='lightgreen'>" + AnzZWFBereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += " <font color='lightgreen'>(alle einsatzbereit).</font><br>\n"; }
 }
  if (AnzRTZ)
  { ret += "<font color='#99FF33'>Rettungszug: </font><font color='#FFD700'><b>" + AnzRTZ + " </b></font>insgesamt, <font color='lightblue'>" + AnzRTZDienst + " im Dienst</font>";
    if (AnzRTZDienst != AnzRTZBereit)
    { ret += ", davon <font color='lightgreen'>" + AnzRTZBereit + " einsatzbereit.</font><br>\n"; }
    else
    { ret += " <font color='lightgreen'>(alle einsatzbereit).</font><br>\n"; }
 }
// X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X E N D X-X-X-X-X-X-X-X-X-X-X-X-X-X-X 
  return ret;
}


// ******************************************************************************************
// Personalseite Ende 
// ******************************************************************************************

function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link)
{ var TBody = myTB.getElementsByTagName("tbody")[0];
  if (!TBody) return;
  var ArrTR = new Array();
  for each (TR in TBody.getElementsByTagName("tr"))
  { ArrTR.push(TR);
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
  for each (TR in TB.getElementsByTagName("tr"))
  { // Farbe entfernen
    for each (TD in TR.getElementsByTagName("td")) { TD.bgColor = undefined; }
    
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
  var H = "<script type='text/javascript'>\n";
  H += "function toggledisplay()\n";
  H += "{ var e = document.getElementById('KonfigBoxes');\n";
  H += "  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n";
  H += "}\n";

  H += "</script>";
  //H += "<h2>AAO-Script-Optionen einstellen</h2>";
  H += "<a href='javascript:toggledisplay();';>AAO-Script Konfiguration anzeigen</a>";
  if (ScriptUpdateAvailable != "") 
  { H += "<br><br><font color='violet'>Es gibt ein AAO-Script-Update (auf Version " + ScriptUpdateAvailable + ")</font>";
    H += "&nbsp;<a href='" + UPDATEURL + "' target='_new'>Infos</a>";
    H += "&nbsp;<a id='installURL' href='" + INSTALLURL + "' target='_new'>Installieren</a>";
  }
  H += "<br><br>\n";
  NewDiv.innerHTML = H;
  
  var hiddenDiv=document.createElement("div");
  hiddenDiv.id = "KonfigBoxes";
  hiddenDiv.style.display = "none";
  
  H = "\n";

  H += "<h2>in Einsatzübersichtstabelle</h3><br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKlasseInListe'";
  if (showInfoKlasseInListe) H += " checked";
  H += "> Einsatzart anzeigen<br>\n";

  H += "<br><h2>in Infobox auf Einsatzseite</h3><br>\n";
  H += "<input type='checkbox' name='KonfigBox' id='KonfStichwort'";
  if (showInfoStichwort) H += " checked";
  H += "> Einsatzstichwort anzeigen<br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfKlasse'";
  if (showInfoKlasse) H += " checked";
  H += "> Einsatzklasse anzeigen<br>\n";
  
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

  H += "<br><a href='" + adr + "'>Seite aktualisieren</a>\n";
  H += "<br><br>\n";
  hiddenDiv.innerHTML = H;
  NewDiv.appendChild(hiddenDiv);

  return NewDiv;
}

function KonfigBox_clicked()
{ mylog("KonfigBox_clicked");
  var Boxes = document.getElementsByName("KonfigBox");
  mylog("#Boxes = " + Boxes.length);

  for (var i=0;i<Boxes.length;i++)
  { var Box=Boxes[i];
    var VarNam = Box.id.replace ("Konf","showInfo");
    var OldVal = eval(VarNam);
    var NewVal = Box.checked;
    
    mylog(VarNam + " von " + OldVal + " nach " + NewVal);
    eval(VarNam + " = " + NewVal);
    mylog("Test, " + VarNam + " ist jetzt " + eval(VarNam));
  }
  
  SetVariables();
}

function zweiterAbmarsch_clicked(e)
{ var zATr = document.getElementById("zweiterAbmarschTr").checked;
  var zAGG = document.getElementById("zweiterAbmarschAusb").checked;
  
  if (e.target.id == "zweiterAbmarschTr" && zATr) zAGG=false;
  if (e.target.id == "zweiterAbmarschAusb" && zAGG) zATr=false;
  
  zweiterAbmarsch = 0;
  if (zATr) zweiterAbmarsch = 1;
  if (zAGG) zweiterAbmarsch = 2;

  GM_setValue("zweiterAbmarsch",zweiterAbmarsch);
  ClearFreeVehiclesTable(true);
  FirstRun=true;
  main();
}

function machVorschlag_clicked(e)
{ machVorschlag = document.getElementById("machVorschlag").checked;
  ClearFreeVehiclesTable(true);
  FirstRun=true;
  main();
}

function FillAlarmListe(Einsatzklasse)
{ mylog("FillAlarmListe(" + Einsatzklasse + ")");
  var FZ = getFahrzeugListe(Einsatzklasse);
  ToAlarm = new Array;
  Optional = new Array;
  
  var Teile = FZ.split("|");
  ToAlarm = Teile[0].split(",");
  if (Teile.length > 1) Optional = Teile[1].split(",");
  return;
}

function AddNachforderungen()
{ var D = document.getElementById("mission_reply");
  if (D==undefined) return "";
  var TB = D.getElementsByTagName("table");
  if (TB.length == 0) return "";
  var TRs = TB[0].getElementsByTagName("tr");
  var NFFZ="";
  var alleNF="";
  for (var z=1;z<TRs.length;z++)
  { var TR=TRs[z];
    if (TR.getElementsByTagName("td").length>=2)
    {
      var RM = TR.getElementsByTagName("td")[2].innerHTML;
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

  for each (FZA in ToAlarm)
  { var A = FZA.split("/");
    for each (F in A)
    { if (F == FZ) FZistDrin = true; 
    }
  }
  for each (U in Unterwegs)
  { if (U == FZ) FZistDrin = true;
  }
  mylog("returns:"+FZistDrin);
  return FZistDrin;
}

function FillUnterwegsListe()
{ Unterwegs = new Array;
  var divnames = new Array;
  divnames.push ("mission_vehicle","driving_vehicle","waiting_vehicle");
  
  for each (dn in divnames)
  { var d = document.getElementById(dn);
    if (d.getElementsByTagName("table").length == 1)
    { var TB=d.getElementsByTagName("table")[0];
      for each (TR in TB.getElementsByTagName("tr"))
      { var FZ;
        try
        { var FZ=TR.getElementsByTagName("td")[1].innerHTML; 
          FZ = getFahrzeugKlasse(FZ);
          Unterwegs.push(FZ);
        } catch(e) {};
      }
    }
  }
  
}

function bereinigeToAlarm()
{ // Alternativ-FZ in ToAalrm ans Ende stellen:

  mylog("vorher:"+ToAlarm);
  for (var ta=0; ta<ToAlarm.length; ta++)
  { if (ToAlarm[ta].indexOf("/") != -1) ToAlarm[ta] = "ZZZ/" + ToAlarm[ta]; }
  ToAlarm = ToAlarm.sort();
  for (var ta=0; ta<ToAlarm.length; ta++)
  { if (ToAlarm[ta].indexOf("ZZZ/") != -1) ToAlarm[ta] = ToAlarm[ta].substring(4,100); }
  mylog("nachher:"+ToAlarm);

  // ebenso in Optional:
  mylog("vorher:"+Optional);
  for (var ta=0; ta<Optional.length; ta++)
  { if (Optional[ta].indexOf("/") != -1) Optional[ta] = "ZZZ/" + Optional[ta]; }
  Optional = Optional.sort();
  for (var ta=0; ta<Optional.length; ta++)
  { if (Optional[ta].indexOf("ZZZ/") != -1) Optional[ta] = Optional[ta].substring(4,100); }
  mylog("nachher:"+Optional);
  
  var gefunden=false;
  
  for each (FZ in Unterwegs)
  { gefunden=false;
    for (var i=0; i<ToAlarm.length; i++)
    { var ALT = ToAlarm[i].split("/");
      mylog("prüfe FZ (" + FZ + ") in ALT (" + ALT + ")");
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
        mylog("prüfe FZ (" + FZ + ") in ALT (" + ALT + ")");
        for (a=0; a<ALT.length; a++)
        { if (FZ == ALT[a]) 
          { Optional.splice(i,1); i=Optional.length;
            gefunden=true;
          }
        }
      }
    }
  }
  mylog("\nNACHHER: ToAlarm=" + ToAlarm + "\nUnterwegs=" + Unterwegs);
}

function Verletzte()
{ var TB = document.getElementById("mission_content").getElementsByTagName("table")[0];
  for (var i=0; i<TB.getElementsByTagName("tr").length; i++)
  { var TR = TB.getElementsByTagName("tr")[i];
    if (TR.getElementsByTagName("td")[0].innerHTML == "Verletzte")
    { var T = TR.getElementsByTagName("td")[1].innerHTML;
      var pos = T.indexOf("Personen - für jede Person") - 5;
      T = T.substr(pos,5);
      var Anz = parseInt(T);
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

function getEinsatzKlasse(Stichwort)
{ if (AlleGleich) return "-gleich-";
  mylog("getEinsatzKlasse(" + Stichwort + ")");
  var EK = Einsatzklassen[Stichwort];
  if (EK == undefined) EK = "undef";
  mylog("returns " + EK);
  return EK;
}

function getNachforderungFahrzeug(Rueckmeldung)
{ mylog("getNachforderungFahrzeug(" + Rueckmeldung + ")");

  var FZ = Nachforderungen[Rueckmeldung];
  if (FZ == undefined) FZ = "";
  mylog("returns " + FZ);
  return FZ;
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

function getStichwort(Text)
{ mylog("getStichwort(" + Text + ")");
  var Stichwort=Text;
  var Teile = Text.split(">");
  if (Teile.length > 1) 
  { Stichwort = Teile[1]; }
  Stichwort = trim(Stichwort);
  return Stichwort;
}

function getWikiLink(Stichwort)
{ mylog("getWikiLink(" + Stichwort + ")");
  var WL = WikiLinks[Stichwort];
  if (WL == undefined) WL = "";
  mylog("returns " + WL);
  return WL;
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
    
    for (var i=1; i<Zeilen.length; i++)
    { var ThisZeile = Zeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      var ThisFZ = getFahrzeugKlasse(ThisSpalten[2].innerHTML);
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var C = ThisSpalten[0].getElementsByTagName("input")[0];
        var RN = ThisSpalten[1].getElementsByTagName("a")[0];
        if (RN) RN = RN.innerHTML;
        if (C.alt != "x" && RN.substr(0,3).toUpperCase() != "XXX")
        { mylog("(opt) gefunden:" + ThisFZ);
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#DF7401";
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
    Anfahrt = "<font color=#DF7401>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=#DF7401>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
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
  
  for (var ta=0; ta<ToAlarm.length; ta++)
  { var FZ = ToAlarm[ta];
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;
    mylog("suche nach " + AlternativFZ);
    
    for (var i=1; i<Zeilen.length; i++)
    { var ThisZeile = Zeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      var ThisFZ = getFahrzeugKlasse(ThisSpalten[2].innerHTML);
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var C = ThisSpalten[0].getElementsByTagName("input")[0];
        var RN = ThisSpalten[1].getElementsByTagName("a")[0];
        if (RN) RN = RN.innerHTML;
        if (C.alt != "x" && RN.substr(0,3).toUpperCase() != "XXX")
        { mylog("gefunden:" + ThisFZ);
          if (FirstRun || !CBClicked) 
          { C.click();
            AlarmZeilen.push (ThisZeile);
          }
          C.alt="x";
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#088A08";
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
    Anfahrt = "<font color=#088A08>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=#088A08>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
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
    for each (W in AlarmWachen)
    { if (WachAlarm[W][0] && WachAlarm[W][1])
      { var StornoZeilen = WachAlarm[W][0].split(",");
        for each (SZ in StornoZeilen)
        { if (SZ) AlarmZeilen[SZ].getElementsByTagName("input")[0].click();
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
  if (FZBez == "Kleinlöschfahrzeug") ret="Gr";
  mylog("FZBez = " + FZBez + ", Typ=" + ret);
  return ret;
}  

function AusbFahrzeug(FZBez)
{ var ret="";
  if (FZBez == "GW-Gefahrgut") ret="Ausb";
  if (FZBez == "GW-Messtechnik") ret="Ausb";
  if (FZBez == "RTW") ret="Ausb";
  mylog("FZBez = " + FZBez + ", Typ=" + ret);
  return ret;
}  



// ====================================================================================================
// ========== VE R F Ü G B A R E   F A H R Z E U G E ==================================================
// ====================================================================================================

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
  for each (FZK in ArrFZK) 
  { AnzFZK[FZK]=0;
    AnzFZKXXX[FZK]=0;
  }
  
  // Freie-Fahrzeuge-Tabelle durchscannen
  var FV=document.getElementsByClassName("free_vehicle");
  if (!FV) return "";
  var TB=FV[0].getElementsByTagName("table");
  if (TB.length==0) return "";
  for each (TR in TB[0].getElementsByTagName("tr"))
  { var FZ;
    var TDs=TR.getElementsByTagName("td");
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
// c=10 war =0
  var ret = "<table border='0'><tr>";
  var c=10;
  for each (FZ in ArrFZK)
  { if (c==MAXSPALTENVERFUEGBAR) c=10, ret+="</tr><tr>";
    ret += "<td style='border:0;'><font color='#088A08'>"+AnzFZK[FZ]+"</font>";
    if (AnzFZKXXX[FZ]) ret +="<font color='#088A08'>+"+AnzFZKXXX[FZ]+"</font>";
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
  showInfoStichwort = GM_getValue("showInfoStichwort",true);
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
  
  ScriptUpdateAvailable = GM_getValue("pleaseUpdate","");
}

function SetVariables()
{ mylog("SetVariables");
  
  GM_setValue("showInfoKlasseInListe",showInfoKlasseInListe);
  GM_setValue("showInfoStichwort",showInfoStichwort);
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
}

function ZeitToSek(txtZeit)
{ // errechnet aus der Klartext-Zeit die Anzahl der Sekunden
  var Teile = txtZeit.split(".");
  var sek=0;
  for each (Teil in Teile)
  { Teil = trim(Teil);
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

function NowDateString()
{ var Now = new Date();
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

function updateTest()
{ // prüfen, ob heute bereits ein Update-Check stattgefunden hat:
  var LastUpdate = GM_getValue("LastUpdate","0");
  var heute = NowDateString();
  mylog("heute = " + heute + "\nLastUpdate = " + LastUpdate);
  
  // wenn ja, nicht noch einmal prüfen
  if (LastUpdate == heute) return;

  // heute nicht nochmal prüfen
  GM_setValue("LastUpdate",heute);
  
  // userscript-Seite öffnen, um Version auszulesen
  GM_xmlhttpRequest
  ( { method: 'GET', 
      url: UPDATEURL, 
      onload: function(r) 
      { if (r.status==200)
        { XML = r.responseText;
          DoUpdateCheck(XML);
        }
      }
    } 
  )
}

function DoUpdateCheck(XML)
{ var ThisVersion = GM_getValue("Version","version");
  var OnlineVersion = ParseXMLforVersion(XML);
  mylog("This  ="+ThisVersion);
  mylog("Online="+OnlineVersion);

  if (ThisVersion != OnlineVersion)
  { GM_setValue("pleaseUpdate",OnlineVersion);
    ScriptUpdateAvailable = OnlineVersion;
  }
  else
  { GM_setValue("pleaseUpdate","");
    ScriptUpdateAvailable = "";
  }
}

function ParseXMLforVersion(XML)
{ // aus XML den Versionsstand herausziehen:
  var H = XML;
  var Pos = H.indexOf("<div id='summary'>");
  if (Pos<0) return "OnlineVersion";
  H = H.substr(Pos,H.length);
  
  Pos = H.indexOf("<b>Version:</b>");
  H = H.substr(Pos+16,H.length);
  
  Pos = H.indexOf("<br />");
  H = H.substr(0,Pos-1);

  return H;
}

function init()
{ ToAlarm="";
  NichtVerf="";

  mylog ("init startet");
  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  GetVariables();
  if (CHECKFORUPDATES) updateTest();
}

function nodeInserted(e)
{ 
  // wenn ich selbst für die Änderung verantwortlich bin, nichts unternehmen
  if (ichBins) return;

  mylog ("nodeInserted, e=" + e.target.innerHTML.substr(0,100));

  // reload auf Übersichtseite hat stattgefunden:
  if (e.target.innerHTML == "Einsätze deines Verbandes")
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
  { window.setTimeout(Markiere_Schueler(e),10);
    return;
  }
  // reload auf Leitstellenansicht hat stattgefunden:
  if (e.target.innerHTML == "Leitstellenansicht")
  { window.setTimeout(main, 10);
    return;
  }

  mylog("HREF=" + document.location.href + "\nInserted: " + e.target.innerHTML.substr(0,500));
}

function dt() { debugging=true; }
function df() { debugging=false; }
