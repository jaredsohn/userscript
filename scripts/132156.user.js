// ==UserScript==
// @name           Script: Hummel09 AAO
// @namespace      http://userscripts.org/scripts/show/132156 
// @description    Fahrzeugvorschläge für Feuerwache.net
// @include        http://www.feuerwache.net/*
// @author         Hummel09
// @info1          Das Script hat Sawos entwickelt. MasterJM hat es weiterentwickelt.
// @info2          Ich habe das Script überarbeitet.
// @info3          Scripttester war Ludo!
// @info           Das Script wird jetzt auf Herz- und Nieren geprüft. 
// @version        2012-11-03 11:45
// ==/UserScript==

/*
Das originale Script stammt von MasterJM. Hier habe ich die Farben sowie Fahrzeuge neu eingepflegt. Solltet Ihr noch hier und da Verbesserungswünsche haben, schreibt mir einfach eine PN


*/
// Anzahl der Spalten in der Verfügbar-Anzeige.
var MAXSPALTENVERFUEGBAR = 99;
// soll täglich nach einem Update des AAO-Scriptes gesucht werden?
var CHECKFORUPDATES = true;
// unter welchem URL finde ich Infos über das Script?
var UPDATEURLlink  = "http://userscripts.org/scripts/show/132156";
var UPDATEURLmeta  = "http://userscripts.org/scripts/source/132156.meta.js";
// unter welchem URL finde ich das Script als Installation?
var INSTALLURL = "http://userscripts.org/scripts/source/132156.user.js";;

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

  'Baum auf Auto'               : 'Hilfeleistung-VU',
  'Baum auf Dach'               : 'Hilfeleistung 1.2',
  'Baum auf Straße'             : 'Hilfeleistung',
  'Brand in KFZ-Werkstatt'      : 'Feuer 3+FwK',
  'Brand in Schule'             : 'Feuer 4-GWA',
  'Brand in Spedition'          : 'Feuer-ABC4-DLK|GT',
  'Brand in Sporthalle'         : 'Feuer 3-GWA',
  'Auffahrunfall'               : 'Hilfeleistung 1',
  'Auffahrunfall_n'             : 'Hilfeleistung 1|GWA',
  'Feldbrand'                   : 'Feuer 1+GWL',
  'Feldbrand_n'                 : 'Airport',
  'Mülleimer Brand'             : 'Feuer 1',
  'Mülleimer Brand_n'           : 'Airport',
  'Brand im Sägewerk'           : 'Feuer 3-GWA',
  'Brand im Supermarkt'         : 'Feuer 3-FwK',
  'Brennende Bäume'             : 'Feuer 1',
  'Brennende Telefonzelle'      : 'Feuer 1',
  'Brennender LKW'              : 'Feuer 1|GWM,GWG,ELW,GT',
  'Brennender PKW'              : 'Feuer 1',
  'Brennendes Gras'             : 'Feuer 1',
  'Chemieunfall (an Schule)'    : 'Hilfeleistung 5',
  'Chlorgas Alarm (Schwimmbad)' : 'Gasalarm',
  'Container Brand'             : 'Feuer 1',
  'Dachstuhlbrand'              : 'Feuer 2+DLK',
  'Fahrstuhl - Türöffnung'      : 'Hilfeleistung 1-RW',
  'Fettbrand in Pommesbude'     : 'Feuer 2-TLF',
  'Feuer im Altenheim'          : 'Feuer 4-GWA',
  'Feuer im Laubhaufen'         : 'Feuer 1',
  'Gartenlaubenbrand'           : 'Feuer 1',
  'Gastronomiebrand'            : 'Feuer 3',
  'Kellerbrand'                 : 'Feuer 2',
  'Keller unter Wasser'         : 'Hilfeleistung',
  'Kinobrand'                   : 'Feuer 4-TLF',
  'Motorrad-Brand'              : 'Feuer 1',
  'Scheunenbrand'               : 'Feuer 3+GWL',
  'Schornsteinbrand'            : 'Feuer 2+DLK',
  'Silobrand'                   : 'Feuer 3',
  'Sperrmüllbrand'              : 'Feuer 1',
  'Strohballen Brand'           : 'Feuer 1|GWL',
  'Traktorbrand'                : 'Feuer 1',
  'Verkehrsunfall'              : 'Hilfeleistung-VU',
  'Wohnblockbrand'              : 'Feuer 5-GWA',
  'Wohnungsbrand'               : 'Feuer 2',
  'Gewerbebrand'                : 'Feuer 4-RW',
  'Brand im Baumarkt'           : 'Feuer-ABC4',
  'Brennender Sicherungskasten' : 'Feuer 1',
  'Schuppenbrand'               : 'Feuer 2|GWM,GWG',
  'Brennende S-Bahn'            : 'Feuer S-Bahn',
  'Wohnwagenbrand'              : 'Feuer 1',
  'Brand in Briefkasten'        : 'Feuer 1',
  'Kleiner Waldbrand'           : 'Feuer 1',
  'Brennender Müllwagen'        : 'Feuer 1',
  'Ölspur'                      : 'Hilfeleistung+GWÖ',
  'Person im Fluss'             : 'Menschenrettung',
  'Brand in Zugdepot'           : 'Feuer 4-GWS',
  'Brand in Autohaus'           : 'Feuer 4-GWM',
  'Brand in Druckerei'          : 'Feuer 4-GWL',
  'Brand in Lackfabrik'         : 'Feuer-ABC6',
  'Trocknerbrand'               : 'Feuer 1',
  'Brand in Reifenlager'        : 'Feuer-ABC3+GWL',
  'Brand im Casino'             : 'Großbrand',
  'Brennendes Gebüsch'          : 'Feuer 1',
  'Kioskbrand'                  : 'Feuer 1',
  'Garagenbrand'                : 'Feuer 2',
  'Mähdrescherbrand'            : 'Feuer 1+TLF',
  'Kaminbrand'                  : 'Feuer 1+DLK',
  'PKW in Fluss'                : 'Hilfeleistung-W1',
  'Brand in Schloss'            : 'Feuer 3-ELW',
  'Brand in Kühlhaus'           : 'Feuer-ABC5',
  'Feuer im Krankenhaus'        : 'Feuer-MANV',
  'Brand in Kletterhalle'       : 'Feuer 4',
  'Grasnarbenbrand'             : 'Airport',
  'Brand-Weihnachtsbaum in Kirche'  : 'Feuer 3+DLK',
  'Brand auf Weihnachtsmarkt'       : 'Feuer 1',
  'Brennendes Flugzeug'         :  'Flugzeugabsturz',
  'Brand in Metzgerei'          :  'Feuer 3-DLK',
  'Brand in Eishalle'           :  'Feuer 2-GWL',
  'Brand in Gärtnerei'          :  'Feuer-ABC3+DLK',
  'Brand in Industriepark'      :  'Explosion',
  'Feuer auf Boot (Klein)'      :  'W 1 Feuer auf Boot',
  'Feuer auf Boot (Mittel)'     :  'W 2 Feuer auf Boot',
  'Gabelstapler im Hafenbecken' :  'Hilfeleistung-W2',
  'Verletztentransport'         :  'RD',
  'Brand in Gemeindehaus'       :  'Feuer 2',
  'Maschinenbrand'              :  'Feuer 3-GWL',
  'Brand in Steinbruch'         :  'Waldbrand',
  'Tankbrand'                   :  'Feuer-Tankl1',
  'Brennt Tanklager'            :  'Feuer-Tankl2',
  'Brand in Raffinerie'         :  'Feuer-Tankl3',
  'Unfall mit Gefahrgut-Transport' :  'Hilfeleistung-ABC',
  'Gefahrstoff-Austritt in Firma'  :  'Hilfeleistung-ABC 2',
  'Brand in Betankungsanlage'   :  'Feuer-Tankl4',
  'Küchenbrand'                 :  'Feuer 1',
  'Türöffnung'                  :  'Feuer 1',
  'Waldbrand'                   :  'Feuer-Wald',
  'VU mit Straßenbahn'          :  'Hilfeleistung 1.8',
  'Kleintier in Not'            :  'Hilfeleistung',
  'Brennendes Bus-Häuschen'     :  'Feuer 1',
  'Person in Schacht'           :  'Hilfeleistung',
  'Auslaufende Betriebsstoffe'  :  'Hilfeleistung+GWÖ',
  'Güterzug entgleist'          :  'Hilfeleistung-Bahn',
  'Brand am Bahndamm'           :  'Feuer 1',
  'Feuer im Personenzug'        :  'Feuer-Bahn/MANV',
  'RTZ-Einsatz'                 :  'RTZ-besetzen',
  'Baum auf Schiene'            :  'Hilfeleistung 1',
  'Brennender Güterzug'         :  'Feuer-Bahn',
  'Rangierunfall'               :  'VU-Schienenfahrzeug',
  'Brennender Güterzug (Bahnhof)'  : 'Feuer-Bahn3',
  'Feuer im Personenzug (Bahnhof)' : 'Feuer-Bahn2',
  'Güterzug entgleist (Bahnhof)':  'Hilfeleistung-Bahn3',
  'Unfall an Bahnübergang'      :  'Hilfeleistung 3',
  'Brand in Fahrkartenautomat'  :  'Feuer 1',
  'Brennende Lokomotive'        :  'Feuer-Triebwagen',
  'Feuer in Bahnhofshalle'      :  'Feuer 5-ELW',
  'Feuer im Personenzug (Tunnel)' : 'Feuer-Tunnel',
  'LKW in Brückengeländer'      :  'Hilfeleistung 4',
  'Ausgedehnter Waldbrand'      :  'Feuer 6',
  'Ammoniakaustritt in Eishalle':  'Feuer 3-ABC',
  'Brand in Brauerei'           :  'Feuer 2-GWA',
  'Brand in Großwäscherei'      :  'Feuer 4-ABC',
  'Güterzug entgleist (Tunnel)' :  'Hilfeleistung-Tunnel',
  'Brennender Güterzug (Tunnel)'         :  'Feuer-Bahn1',
  'Brennende Windmühle'         :  'Feuer 1.1',
  'Baukran auf Auto'            :  'Hilfeleistung 1.3',
  'Brennt Anhänger'             :  'Feuer 1',
  'Tagebauarbeiter abgestürzt'    :  'Hilfeleistung 1.4',
  'Brennender Personenbus'        :  'Feuer 1-GWL|GWL',
  'Radlader umgekippt'            :  'Hilfeleistung 1.6',
  'Muldenkipper abgerutscht'      :  'Hilfeleistung 1.5',
  'Gerüsteinsturz'                :  'Hilfeleistung 1.7',
  'Brand nach Schweißarbeiten'    :  'Feuer 3-ELW',
  'Baggerbrand'                   :  'Feuer 2-ELW',
  'Wassereinbruch'                :  'Feuer 1',
  'Gas-Explosion'                 :  'Feuer 2',
  'Brennender Muldenkipper'       :  'Feuer 2',
  'Brennendes Förderband'         :  'Feuer 2',
  'Brennender Wohncontainer'      :  'Feuer 2',
  'Gasaustritt in Fabrik'         :  'Feuer-ABC1',

};

var Einsatzklasse_Fahrzeugzuordnung = {

  // hier wird definiert, welche Fahrzeuge standardmäßig zu den verschiedenen
  // Einsatzklassen geschickt werden. Einzelne Fahrzeuge werden durch Komma (,)
  // getrennt, Alternativen durch (/).
  // !!!ACHTUNG: HIER KEINE OPTIONALEN FAHRZEUGE (|) EINTRAGEN!!!
  'undef'          :  'LF',
  'WATCH'          :  'LF,LF,LF',

  'RD'             :  'RTW',

// zu undef = unbekannten Einsatzen wird per Default jetzt ein LF geschickt

// BrandeinsÃ¤tze
  'Feuer 1'             :  'LF-S/LF',
  'Feuer 1-GWL'         :  'LF',
  'Feuer 1.1'           :  'LF-S/LF,LF-S/LF,ELW,DLK',
  'Feuer 1-Feld'        :  'LF/FLF,GWL/FLF',
  'Feuer S-Bahn'       :  'LF,LF,GWS',
  'Feuer 2'             :  'LF,LF',
  'Feuer 2-ELW'         :  'LF,LF,ELW',
  'Feuer 2-GWA'         :  'LF,LF,LF,GWA,ELW,DLK,GWL',
  'Feuer 2-TLF'         :  'LF,LF,TLF',
  'Feuer 2-GWL'         :  'LF,LF,DLK,GWL,TLF,RW,ELW',
  'Feuer 3'             :  'LF,LF,LF',
  'Feuer 3-ABC'    :  'LF,LF,LF,GWM,GWG,RW,ELW,GWA',
  'Feuer 3-ELW'         :  'LF,LF,LF,ELW,DLK',
  'Feuer 3-FwK'         :  'LF,LF,LF,DLK,FwK',
  'Feuer 3-DLK'         :  'LF,LF,LF,ELW,DLK,GWL',
  'Feuer 3-GWA'        :  'LF,LF,LF,LF,ELW,GWA,GWL',
  'Feuer 3-GWL'         :  'LF,LF,LF,ELW,GWL',
  'Feuer 4'             :  'LF,LF,LF,LF,GWL,ELW,DLK',
  'Feuer 4-ABC'         :  'LF,LF,LF,LF,GWA,GWL,ELW,DLK,GWM',
  'Feuer 4-GWS'        :  'LF,LF,LF,LF,DLK,ELW,GWL,RW,GWS',
  'Feuer 4-GWM'        :  'LF,LF,LF,LF,DLK,ELW,GWA,GWM',
  'Feuer 4-GWA'        :  'LF,LF,LF,LF,DLK,ELW,GWA',
  'Feuer 4-TLF'         :  'LF,LF,LF,LF,DLK,ELW,GWA,TLF',
  'Feuer 4-GWL'        :  'LF,LF,LF,LF,DLK,ELW,GWA,GWL,RW',
  'Feuer 4-RW'          :  'LF,LF,LF,LF,DLK,ELW,GWA,RW',
  'Feuer 4-DLK'         :  'LF,LF,LF,LF,DLK,ELW,RW',
  'Feuer 4-ELW'         :  'LF,LF,LF,LF,GWL,ELW,DLK',
  'Feuer 5'             :  'LF,LF,LF,LF,LF,DLK,ELW,TLF,GWA,GWL',
  'Feuer 5-GWA'        :  'LF,LF,LF,LF,LF,ELW,GWA',
  'Feuer 5-ELW'         :  'LF-S/LF,LF-S/LF,LF-S/LF,LF,LF,GWA,DLK,GWL,ELW',
  'Feuer 6'             :  'LF,LF,LF,LF,LF,LF,LF,LF,GWL,ELW',
  'Großbrand'           :  'LF,LF,LF,LF,LF,LF,LF,LF,DLK,ELW,TLF,GWA,GWL',
  'Feuer-ABC1'           :  'LF,LF,LF,LF,DLK,GWG,GWL,GWM,ELW,RW',
  'Feuer-ABC4'           :  'LF,LF,LF,LF,ELW,RW,GWM,GWG,GWA',
  'Feuer-ABC4-DLK'       :  'LF,LF,LF,LF,ELW,DLK,RW,GWM,GWG,GWL,TLF',
  'Feuer-ABC5'           :  'LF,LF,LF,LF,LF,DLK,ELW,GWL,GWG,GWM',
  'Feuer-ABC6'           :  'LF,LF,LF,LF,LF,LF,ELW,DLK,GWA,GWM,GWG',
  'Feuer-MANV'          :  'LF,LF,LF,LF,LF,LF,LF,LF,ELW,GWL,RW,GWM,GWG,GWA',
  'Airport'             :  'FLF/LF',
  'Flugzeugabsturz'     :  'FLF,FLF,FLF,FLF,FLF,FLF,FLF,RTF,GWG,GWM,GWÖ,ELW,RW',
  'Explosion'           :  'LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,ELW,TLF,GWA,GWL,DLK,RW,FwK,GWÖ,GWM,GWG,GWS',
  'Waldbrand'           :  'LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,ELW,TLF,GWA,GWL,DLK',
  'Feuer-Tankl1'        :  'LF,LF,LF,LF,GT,LF,LF,LF,RW,GWÖ,ELW,ULF',
  'Feuer-Tankl2'        :  'LF,LF,LF,LF,GT,LF,LF,LF,LF,RW,GWM,GWÖ,ELW,GWL,ULF',
  'Feuer-Tankl3'        :  'LF,LF,LF,LF,GT,LF,LF,LF,LF,LF,ELW,RW,GWG,GWM,DLK,GWL,TLF,FwK,ULF',
  'Feuer-Tankl4'        :  'LF,LF,LF,LF,GT,LF,LF,LF,LF,GWG,GWM,GWA,RW,ULF',
  'Feuer-Wald'          :  'LF,LF,LF,LF,LF,ELW,GWL,DLK',
  'Feuer-ABC2'           :  'LF,LF,GWM,GWG',
  'Feuer-ABC3'           :  'LF,LF,LF,ELW,GWM,GWG',
  'Feuer-Bahn/MANV'     :  'LF-S,LF,LF,LF,LF,ELW,GWL,TLF',
  'Feuer-Bahn'          :  'LF-S,LF,LF,LF,LF,ELW,GWM,GWL,GWG,GT',
  'Feuer-Bahn1'         :  'LF-S,LF-S,LF,ELW,GWM,GWL,GWG,GT',
  'Feuer-Bahn2'         :  'LF,LF,LF-S,LF,LF,ELW,GWL',
  'Feuer-Bahn3'         :  'LF-S,LF,LF,LF,LF,ELW,GWM,GWG,TLF,GT',
  'Feuer-Tunnel'        :  'LF-S,ELW,GWL',
  'Feuer-Triebwagen'    :  'LF-S,LF,GWL,ELW',
  'Wasserrettung'       :  'LF,GWT',
  'Menschenrettung'     :  'LF,GWT',
  'Hilfeleistung+GWÖ'            :  'LF,GWÖ',
  'Hilfeleistung-W1'     :  'LF,RW,GWT,FwK',
  'Hilfeleistung-W2'     :  'LF,LF,RW,GWT,FwK',
  'Hilfeleistung-VU'          :  'LF,RW,GWÖ',
  'Hilfeleistung-VU 1'        :  'LF-S/LF',
  'Hilfeleistung-Tunnel'      :  'LF-S,LF-S,LF-S,ELW,RW,GWM,GWG,GT,GWA,GWS',
  'Hilfeleistung'             :  'LF-S/LF',
  'Hilfeleistung 1-RW'             :  'LF-S/LF,RW',
  'Hilfeleistung 1'           :  'LF-S/LF,LF-S/LF',
  'Hilfeleistung 1.2'         :  'LF-S/LF,DLK,RW',
  'Hilfeleistung 1.3'         :  'LF-S/LF,LF-S/LF,FwK,RW',
  'Hilfeleistung 1.4'         :  'LF-S/LF,DLK,RW,GWH',
  'Hilfeleistung 1.5'         :  'LF-S/LF,LF-S/LF,LF-S/LF,GWH,FwK,ELW',
  'Hilfeleistung 1.6'         :  'LF-S/LF,ELW,FwK,RW,GWÖ',
  'Hilfeleistung 2'           :  'RW,LF,LF',
  'Hilfeleistung 3'           :  'LF,LF,RW,GWS,GWÖ,ELW',
  'Hilfeleistung 4'           :  'LF,LF,LF,DLK,RW,ELW,FwK',
  'Hilfeleistung 5'           :  'LF,LF,LF,ELW,GWM,GWG',
  'Hilfeleistung 1.7'           :  'LF,LF,DLK,RW,ELW',
  'Hilfeleistung 1.8'           :  'LF,LF,DLK,RW,ELW,GWS,FwK',
  'Hilfeleistung+DLK 1'       :  'LF,LF,DLK',
  'Gasalarm'                  :  'LF,LF,LF,ELW,RW,GWM,GWG',
  'Hilfeleistung-Bahn'        :  'LF-S,LF,LF,LF,LF,GWM,GWG,ELW,GWS,RW,DLK,GT',
  'VU-Schienenfahrzeug'       :  'LF-S,LF,LF,LF,ELW,RW,GWÖ,GWS',
  'Hilfeleistung-Bahn3'       :  'LF-S,LF,LF,LF,LF,GWG,GWM,RW,FwK,GWS,ELW,GT',
  'Hilfeleistung-ABC'          :  'LF,LF,RW,FwK,GWA,GWG,GWM,ELW,GT',
  'Hilfeleistung-ABC 2'         :  'LF,LF,LF,LF,GWM,GWG,GWA,GWL,ELW,GT',
  'W 1 Feuer auf Boot'           :  'Feuerlöschboot',
  'W 2 Feuer auf Boot'           :  'Feuerlöschboot,Feuerlöschboot',
  'RTZ-besetzen'                 :  'LF-S/LF,LF-S/LF,LF-S/LF,LF-S/LF',
};

var Fahrzeugbedingungen = {
// Syntax: AlleFeuerwachen|Berufsfeuerwehren
  'RTW' : '0|10',
  'ELW' : '5|0',
  'TLF' : '7|0',
  'GWA' : '6|0',
  'RW'  : '4|0',
  'DLK' : '3|0',
  'GWG' : '0|2',
  'GWM' : '0|2',
  'GWÖ' : '4|0',
  'GWL' : '5|0',
  'GWS' : '10|0',
  'FwK' : '25|0',
  'GWT' : '0|25',
  'GT'  : '64|0',
  'FLF' : '56|0',
  'RTF' : '56|0',
  'Feuerlöschboot'  : '0|30',
  'Rettungsboot'  : '0|50',
  'LF'  : '1|0',
  'ULF' : '1|0',
  'LF-S' : '1|0',
  'RTZ' : '1|0',
  'NEF' : '0|20',
};
//Alle Fahrzeugtypen aufgelistet, nur mit Zahlenindex
var fahrzeugabkuerzungen = new Array('LF','RTW','GWH','NEF','ELW','TLF','DLK','RW','FwK','GWA','GWL','GWÖ','GWS','GWT','GWM','GWG','FLF','RTF','GT','Feuerlöschboot','Rettungsboot','ULF','LF-S','RTZ');

var Fahrzeuggeschwindigkeiten = {
  'Rettungstreppe'     :   65     ,
  'RTW'                :   75     ,
  'GW-Höhenrettung'    :   55     ,
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
  'GW-Taucher'         :   62     ,
  'Kran'               :   55     ,
  'Feuerlöschboot'     :   60     ,
  'GW-TUIS'            :   73     ,
  'ULF mit Löscharm'   :   40     ,
  'TLF 16/25'          :   55     ,
  'HLF 24/14-S'        :   60     ,
  'Notarzteinsatzfahrzeug'        :   80     ,
   'Feuerlöschboot'   :   60     ,

};

//
// usually no need to change anything below this line
//

var Fahrzeugklassen = {
  // hier die verfügbaren Fahrzeugen mit ihrer Beschreibung und der Zuordnung
  // zu einer Fahrzeugklasse auflisten. Fahrzeuge, die ihr eigener Typ sind
  // (z.B. "RTW") brauchen hier nicht aufgeführt werden. (sie schaden aber auch nicht)
  'LF 20/16'           :   'LF'        ,
  'LF 20'              :   'LF'        ,
  'LF 10'              :   'LF'        ,
  'HLF 20/16'          :   'LF'       ,
  'LF 16-TS'           :   'LF'        ,
  'LF 10/6'            :   'LF'        ,
  'HLF 10/6'           :   'LF'       ,
  'LF 8'               :   'LF'        ,
  'HLF 24/14-S'        :   'LF-S'     ,
  'RTW'                :   'RTW'       ,
  'ELW 1'              :   'ELW'       ,
  'TLF 20/40 - SL'     :   'TLF'       ,
  'DLA (K) 23/12'      :   'DLK'       ,
  'RW'                 :   'RW'        ,
  'Kran'               :   'FwK'       ,
  'Kleinlöschfahrzeug' :   'LF'        ,
  'GW-A'               :   'GWA'       ,
  'GW-L2 - Wasser'     :   'GWL'       ,
  'GW-Öl'              :   'GWÖ'       ,
  'GW-Schiene'         :   'GWS'       ,
  'GW-Taucher'         :   'GWT'       ,
  'GW-Höhenrettung'    :   'GWH'       ,
  'GW-Messtechnik'     :   'GWM'       ,
  'GW-Gefahrgut'       :   'GWG'       ,
  'Flugfeldlöschfahrzeug':   'FLF'       ,
  'Rettungstreppe'     :   'RTF'       ,
  'GW-TUIS'            :   'GT'        ,
  'ULF mit Löscharm'   :   'ULF'       ,
  'Feuerlöschboot'     :   'Feuerlöschboot'        ,
  'Rettungsboot'       :   'Rettungsboot'        ,
  'TLF 16/25'          :   'LF'       ,
  'Notarzteinsatzfahrzeug'            :   'NEF'       ,
};


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

// fasst mehrere Fahrzeuge mit Anzahl zusammen: LF, LF -> 2*LF
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

var Nachforderungen = {
  "Hier muss Wasser über weite Wegstrecken transportiert werden. Wir benötigen einen GW-L2 Wasser." : "GWL",
  "Das Feuer ist weiter ausserhalb und alle Wasserreserven sind aufgebraucht. Wir brauchen einen GW-L2 -Wasser um weitere Schläuche verlegen zu können." : "GWL",
  "Um Leitungen über weite Strecken legen zu können, benötigen wir einen GW - L2 - Wasser." : "GWL",
  "Wir müssen Wasser über eine weite Wegstrecke transporierten und benötigen einen GW-L2 Wasser" : "GWL",
};



var WikiLinks = {
  'Auffahrunfall'               : 'http://wiki.feuerwache.net/wiki/Auffahrunfall',
  'Baum auf Auto'               : 'http://wiki.feuerwache.net/wiki/Baum_auf_Auto',
  'Baum auf Dach'               : 'http://wiki.feuerwache.net/wiki/Baum_auf_Dach',
  'Baum auf Straße'             : 'http://wiki.feuerwache.net/wiki/Baum_auf_Straße',
  'Brand im Baumarkt'           : 'http://wiki.feuerwache.net/wiki/Brand_im_Baumarkt',
  'Brand in KFZ-Werkstatt'      : 'http://wiki.feuerwache.net/wiki/Brand_in_KFZ-Werkstatt',
  'Brand im Sägewerk'           : 'http://wiki.feuerwache.net/wiki/Brand_im_Sägewerk',
  'Brand im Supermarkt'         : 'http://wiki.feuerwache.net/wiki/Brand_im_Supermarkt',
  'Brand in Schule'             : 'http://wiki.feuerwache.net/wiki/Brand_in_Schule',
  'Brand in Spedition'          : 'http://wiki.feuerwache.net/wiki/Brand_in_Spedition',
  'Brand in Sporthalle'         : 'http://wiki.feuerwache.net/wiki/Brand_in_Sporthalle',
  'Brennende Bäume'             : 'http://wiki.feuerwache.net/wiki/Brennende_Bäume',
  'Brennende Telefonzelle'      : 'http://wiki.feuerwache.net/wiki/Brennende_Telefonzelle',
  'Brennender LKW'              : 'http://wiki.feuerwache.net/wiki/Brennender_LKW',
  'Brennender PKW'              : 'http://wiki.feuerwache.net/wiki/Brennender_PKW',
  'Brennendes Gras'             : 'http://wiki.feuerwache.net/wiki/Brennendes_Gras',
  'Chemieunfall (an Schule)'    : 'http://wiki.feuerwache.net/wiki/Chemieunfall_an_Schule',
  'Chlorgas Alarm (Schwimmbad)' : 'http://wiki.feuerwache.net/wiki/Chlorgas_Alarm_Schwimmbad',
  'Container Brand'             : 'http://wiki.feuerwache.net/wiki/Containerbrand',
  'Dachstuhlbrand'              : 'http://wiki.feuerwache.net/wiki/Dachstuhlbrand',
  'Fahrstuhl - Türöffnung'      : 'http://wiki.feuerwache.net/wiki/Fahrstuhl-Türöffnung',
  'Feldbrand'                   : 'http://wiki.feuerwache.net/wiki/Feldbrand',
  'Fettbrand in Pommesbude'     : 'http://wiki.feuerwache.net/wiki/Fettbrand_in_Pommesbude',
  'Feuer im Altenheim'          : 'http://wiki.feuerwache.net/wiki/Feuer_im_Altenheim',
  'Feuer im Laubhaufen'         : 'http://wiki.feuerwache.net/wiki/Feuer_im_Laubhaufen',
  'Gartenlaubenbrand'           : 'http://wiki.feuerwache.net/wiki/Gartenlaubenbrand',
  'Gastronomiebrand'            : 'http://wiki.feuerwache.net/wiki/Gastronomiebrand',
  'Gewerbebrand'                : 'http://wiki.feuerwache.net/wiki/Gewerbebrand',
  'Kellerbrand'                 : 'http://wiki.feuerwache.net/wiki/Kellerbrand',
  'Keller unter Wasser'         : 'http://wiki.feuerwache.net/wiki/Keller_unter_Wasser',
  'Kinobrand'                   : 'http://wiki.feuerwache.net/wiki/Kinobrand',
  'Motorrad-Brand'              : 'http://wiki.feuerwache.net/wiki/Motorradbrand',
  'Mülleimer Brand'             : 'http://wiki.feuerwache.net/wiki/Mülleimerbrand',
  'Scheunenbrand'               : 'http://wiki.feuerwache.net/wiki/Scheunenbrand',
  'Schornsteinbrand'            : 'http://wiki.feuerwache.net/wiki/Schornsteinbrand',
  'Silobrand'                   : 'http://wiki.feuerwache.net/wiki/Silobrand',
  'Sperrmüllbrand'              : 'http://wiki.feuerwache.net/wiki/Sperrmüllbrand',
  'Strohballen Brand'           : 'http://wiki.feuerwache.net/wiki/Strohballen_Brand',
  'Traktorbrand'                : 'http://wiki.feuerwache.net/wiki/Traktorbrand',
  'Verkehrsunfall'              : 'http://wiki.feuerwache.net/wiki/Verkehrsunfall',
  'Wohnblockbrand'              : 'http://wiki.feuerwache.net/wiki/Wohnblockbrand',
  'Wohnungsbrand'               : 'http://wiki.feuerwache.net/wiki/Wohnungsbrand',
  'Brand auf Weihnachtsmarkt'      : 'http://wiki.feuerwache.net/wiki/Brand_auf_Weihnachtsmarkt',
  'Brand-Weihnachtsbaum in Kirche' : 'http://wiki.feuerwache.net/wiki/Brand-Weihnachtsbaum_in_Kirche',
//neu 22.01.2010
  'Brennender Sicherungskasten' : 'http://wiki.feuerwache.net/wiki/Brennender_Sicherungskasten',
  'Schuppenbrand'               : 'http://wiki.feuerwache.net/wiki/Schuppenbrand',
  'Brennende S-Bahn'            : 'http://wiki.feuerwache.net/wiki/Brennende S-Bahn',
//neu 08.03.2010
  'Wohnwagenbrand'              : 'http://wiki.feuerwache.net/wiki/Wohnwagenbrand',
  'Brand in Briefkasten'        : 'http://wiki.feuerwache.net/wiki/Brand_in_Briefkasten',
  'Kleiner Waldbrand'           : 'http://wiki.feuerwache.net/wiki/Kleiner_Waldbrand',
  'Brennender Müllwagen'        : 'http://wiki.feuerwache.net/wiki/Brennender_Müllwagen',
  'Ölspur'                      : 'http://wiki.feuerwache.net/wiki/Ölspur',
        'Brand in Zugdepot'           : 'http://wiki.feuerwache.net/wiki/Brand_im_Zugdepot',
        'Brand in Autohaus'           : 'http://wiki.feuerwache.net/wiki/Brand_in_Autohaus',
        'Brand in Druckerei'          : 'http://wiki.feuerwache.net/wiki/Brand_in_Druckerei',
        'Brand in Lackfabrik'         : 'http://wiki.feuerwache.net/wiki/Brand_in_Lackfabrik',
        'Person im Fluss'             : 'http://wiki.feuerwache.net/wiki/Person_im_Fluss',
//neu 29.03.2010
        'Trocknerbrand'               : 'http://wiki.feuerwache.net/wiki/Trocknerbrand',
        'Brand in Reifenlager'        : 'http://wiki.feuerwache.net/wiki/Brand_in_Reifenlager',
        'Brand im Casino'             : 'http://wiki.feuerwache.net/wiki/Brand_im_Casino',
//neu 23.04.2010
  'Brennendes Gebüsch'          : 'http://wiki.feuerwache.net/wiki/Brennendes_Gebüsch',
  'Kioskbrand'                  : 'http://wiki.feuerwache.net/wiki/Kioskbrand',
  'Garagenbrand'                : 'http://wiki.feuerwache.net/wiki/Garagenbrand',
  'Mähdrescherbrand'            : 'http://wiki.feuerwache.net/wiki/Mähdrescherbrand',
  'Kaminbrand'                  : 'http://wiki.feuerwache.net/wiki/Kaminbrand',
  'PKW in Fluss'                : 'http://wiki.feuerwache.net/wiki/PKW_in_Fluss',
  'Brand in Schloss'            : 'http://wiki.feuerwache.net/wiki/Brand_in_Schloss',
  'Brand in Kühlhaus'           : 'http://wiki.feuerwache.net/wiki/Brand_in_Kühlhaus',
  'Feuer im Krankenhaus'        : 'http://wiki.feuerwache.net/wiki/Feuer_im_Krankenhaus',
  'Brand in Kletterhalle'       : 'http://wiki.feuerwache.net/wiki/Brand_in_Kletterhalle',
//neu 23.08.2010
  'Grasnarbenbrand'             : 'http://wiki.feuerwache.net/wiki/Grasnarbenbrand',
//neu 01.09.2010
  'Brennendes Flugzeug'         : 'http://wiki.feuerwache.net/wiki/Brennendes_Flugzeug',
// Einsätze neu ab 27.10.2010 Gärtnerei, Metzger, Eilshalle
  'Brand in Gärtnerei'          : 'http://wiki.feuerwache.net/wiki/Brand_in_Gärtnerei',
  'Brand in Eishalle'           : 'http://wiki.feuerwache.net/wiki/Brand_in_Eishalle',
  'Brand in Metzgerei'          : 'http://wiki.feuerwache.net/wiki/Brand_in_Metzgerei',
// Einsatz neu 19.11.2010 Boot Klein
  'Boot (Klein)'                : 'http://wiki.feuerwache.net/wiki/Boot_Klein',
// Einsatz neu 28.11.2010 Boot Mittel
  'Boot (Klein)'                : 'http://wiki.feuerwache.net/wiki/Boot_Mittel',
// Einsatz neu 12.21.2010
  'Gabelstapler im Hafenbecken' : 'http://wiki.feuerwache.net/wiki/Gabelstapler_im_Hafenbecken',
// Einsätze neu 05.01.2011
  'Brand in Gemeindehaus'       : 'http://wiki.feuerwache.net/wiki/Brand_in_Gemeindehaus',
  'Maschinenbrand'              : 'http://wiki.feuerwache.net/wiki/Maschinenbrand',
// Einsätze neu 14.02.2011
  'Tankbrand'                   : 'http://wiki.feuerwache.net/wiki/Tankbrand',
  'Brennt Tanklager '           : 'http://wiki.feuerwache.net/wiki/Brennt_Tanklager',
  'Brennt Tanklager'            : 'http://wiki.feuerwache.net/wiki/Brennt_Tanklager',
  'Brand in Raffinerie'         : 'http://wiki.feuerwache.net/wiki/Brand_in_Raffinerie',
// Einsätze neu 12.05.2011
  'Unfall mit Gefahrgut-Transport'  : 'http://wiki.feuerwache.net/wiki/Unfall_mit_Gefahrgut-Transport',
  'Gefahrstoff-Austritt in Firma'   : 'http://wiki.feuerwache.net/wiki/Gefahrstoff-Austritt_in_Firma',
// Einsätze neu 26.06.2011
  'Waldbrand'                       : 'http://wiki.feuerwache.net/wiki/Waldbrand',
  'Türöffnung'                      : 'http://wiki.feuerwache.net/wiki/Türöffnung',
  'Küchenbrand'                     : 'http://wiki.feuerwache.net/wiki/Küchenbrand',
  'Brand in Betankungsanlage'       : 'http://wiki.feuerwache.net/wiki/Brand_in_Betankungsanlage',
  'VU mit Strassenbahn'             : 'http://wiki.feuerwache.net/wiki/VU_mit_Strassenbahn',
  'VU mit Straßenbahn'              : 'http://wiki.feuerwache.net/wiki/VU_mit_Strassenbahn',
// Verbands GSL
  'Brand in Industriepark'          : 'http://wiki.feuerwache.net/wiki/Brand_in_Industriepark',
  'Brand in Steinbruch'             : 'http://wiki.feuerwache.net/wiki/Brand_in_Steinbruch',
// Einsätze neu 24.12.2011 Bahnstrecke
  'Brennender Güterzug'                        :        'http://wiki.feuerwache.net/wiki/Brennender_Güterzug',
  'Feuer im Personenzug'                :        'http://wiki.feuerwache.net/wiki/Feuer_im_Personenzug',
  'Güterzug entgleist'                        :        'http://wiki.feuerwache.net/wiki/Güterzug_entgleist',
  'Brand am Bahndamm'                        :        'http://wiki.feuerwache.net/wiki/Brand_am_Bahndamm',
  'Baum auf Schiene'                        :        'http://wiki.feuerwache.net/wiki/Baum_auf_Schiene',
// Einsätze neu 17.01.2012
  'Brennender Güterzug (Bahnhof)'        : 'http://wiki.feuerwache.net/wiki/Brennender_Güterzug_Bahnhof',
  'Feuer im Personenzug (Bahnhof)'        : 'http://wiki.feuerwache.net/wiki/Feuer_im_Personenzug_Bahnhof',
  'Güterzug entgleist (Bahnhof)'        : 'http://wiki.feuerwache.net/wiki/Güterzug_entgleist_Bahnhof',
  'Unfall an Bahnübergang'                : 'http://wiki.feuerwache.net/wiki/Unfall_an_Bahnübergang',
  'Brand in Fahrkartenautomat'                : 'http://wiki.feuerwache.net/wiki/Brand_in_Fahrkartenautomat',
  'Brennende Lokomotive'                : 'http://wiki.feuerwache.net/wiki/Brennende_Lokomotive',
  'Rangierunfall'                        : 'http://wiki.feuerwache.net/wiki/Rangierunfall',
  'Feuer in Bahnhofshalle'                : 'http://wiki.feuerwache.net/wiki/Feuer_in_Bahnhofshalle',
// Einsätze neu 03.02.2012
  'Feuer im Personenzug (Tunnel)'        : 'http://wiki.feuerwache.net/wiki/Feuer_im_Personenzug_Tunnel',
// Einsätze ab 14.03.2012
  'Ausgedehnter Waldbrand'               : 'http://wiki.feuerwache.net/wiki/Ausgedehnter_Waldbrand',
  'LKW in Brückengeländer'               : 'http://wiki.feuerwache.net/wiki/LKW_in_Br%C3%BCckengel%C3%A4nder',
// Einsätze ab 15.03.2012
  'Brand in Großwäscherei'               : 'http://wiki.feuerwache.net/wiki/Brand_in_Großwäscherei',
  'Ammoniakaustritt in Eishalle'         : 'http://wiki.feuerwache.net/wiki/Ammoniakaustritt_in_Eishalle',
  'Brand in Brauerei'                    : 'http://wiki.feuerwache.net/wiki/Brand_in_Brauerei',
// Einsätze ab 05.06.2012
  'Gasaustritt in Fabrik'                : 'http://wiki.feuerwache.net/wiki/Gasaustritt_in_Fabrik',
  'Ausgedehnter Waldbrand'                : 'http://wiki.feuerwache.net/wiki/Ausgedehnter_Waldbrand',
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

var ToAlarm      = new Array;
var Optional     = new Array;
var Unterwegs    = new Array;
var AmOrt        = new Array;
var AufAnfahrt   = new Array;
var Wartend      = new Array;
var NichtVerf    = new Array;
var ichBins;
var FirstRun     = true;
var CBClicked    = false;
var debugging;
var machVorschlag=true;
var zweiterAbmarsch=GM_getValue("zweiterAbmarsch",0);
var alarmtyp=GM_getValue("alarmtyp",0);
var AlleGleich;
var showInfoRTWplus;
var showInfoKlasseInListe;
var showInfoEinsatzNr,InfotextEinsatzNr;
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
var showInfoOptionalAnkreuzen;
var manv_sound;
var showInfoVerbandSound;
var showInfoProbeSound;
var alarm_sound;
var vgsl_sound;
var soundplayed=''; 

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
  { bearbeiteFeuerwachenliste();
          Bilderkleiner(); }
  else if (adr == "http://www.feuerwache.net/feuerwachen/werbeaktion")
        { bearbeiteWerbeaktion(); }
  else if (adr == "http://www.feuerwache.net/gebaeude")
         { Bilderkleiner(); }
  else if (adr == "http://www.feuerwache.net/vehicle_to_user/repair/vehicle_to_user_id/[0-9]+")
         { Bilderkleiner(); }
  else if (adr == "http://www.feuerwache.net/personal/list")
  { bearbeitePersonaltabellen(); }
  else if (adr.match("http://www.feuerwache.net/feuerwachen/.*/feuerwehrleute"))
  { bearbeitePersonaltabellen(); }
  else if (adr.match("http://www.feuerwache.net/feuerwachen/.*/feuerwehrautos"))
  { FahrzeugTabellenToggle(); }
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
  else if (adr.match("http://www.feuerwache.net/event_logfile/*"))
  { bearbeiteLogFile(); }
  else if (adr.match("http://www.feuerwache.net/feuerwehrfahrzeuge/[0-9]*/reparieren"))
  { Bilderkleiner(); }
  ichBins = false;
}

function Bilderkleiner()
{ var IMGs = document.getElementsByTagName("img");
  for each (IMG in IMGs) IMG.src = IMG.src.replace("/images/map/","/images/map_25/");
}


function FahrzeugTabellenToggle()
{ if (!adr.match("http://www.feuerwache.net/feuerwachen/[0-9]+/feuerwehrautos")) return;

  var DC = document.getElementById("content");
  if (!DC) return;
  var H2s = DC.getElementsByTagName("h2");
  var TBs = DC.getElementsByTagName("table");
  for (i=0;i<H2s.length;i++)
  { var H2=H2s[i];
    if (H2.innerHTML.match("Fahrzeuge die unterwegs sind"))
    { TBs[i].style.display = "none";
      TBs[i].id="hiddentable";
      H2.innerHTML += " (toggle Anzeige)</font>";
      H2.addEventListener("click", showTableUnterwegs, false);
    }
  }


  function showTableUnterwegs()
  { var T=document.getElementById("hiddentable");
    if (!T) return;
    T.style.display = (T.style.display=="none" ? "" : "none")
  }
}

function createText(text) {
 return document.createTextNode(text);
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
                                                H = "<font color='blue'>"+H+"</font>";
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
          ret += "<tr><th>Fehleinsätze</th><td><font color='blue'><b>" + AnzFehl + "</b></font></td></tr>\n";
          ret += "<tr><th>Quote Fehleinsätze</th><td><b>" + Fehlquote.toFixed(2) + "%</b></td></tr>\n";
          ret += "</table><br>\n";
          var main, newElement;
          main = document.getElementsByTagName("h1")[0];
          newElement = document.createElement('p');
          main.parentNode.insertBefore(newElement, main.nextSibling);
          newElement.innerHTML = ret;
}

function bearbeiteFahrzeugkauf()
{ var FRM = document.getElementsByTagName("form")[0];
  if (!FRM) return;
  var TB = FRM.getElementsByTagName("table")[0];
  if (!TB) return;
  var TR = TB.getElementsByTagName("tr")[2];
  if (!TR) return;
  var TD = TR.getElementsByTagName("td")[1];
  if (!TD) return;

  var Par=TD.getElementsByTagName("p");
  for (var i=0;i < Par.length;i++)
   { if (Par[i].innerHTML.match("Diese Feuerwache kann keine Fahrzeuge mehr aufnehmen"))
   { Par[i].style.display = "none"; }
   if (Par[i].innerHTML.match("Zuwenig bzw. keine Stellplätze für Rettungswagen"))
   { Par[i].style.display = "none"; }
   if (Par[i].innerHTML.match("Zuwenig bzw. keine StellplÃ¤tze fÃ¼r ein Notarztfahrzeug")) 
   {Par[i].style.display = "none";}
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
    if (parseInt(H1) != parseInt(H2)) H = "<font color='blue'>"+H+"</font>";
    H = "<a href='" + L + "/feuerwehrautos'>" + H + "</a>";
    TD.innerHTML = H;

    // Spalte Rettungswagen
    TD = TR.getElementsByTagName("td")[4];
    H = TD.innerHTML;
    H2 = H.split("/");
    if (parseInt(H2[0]) != parseInt(H2[1])) H = "<font color='blue'>"+H+"</font>";
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

    if (T != "" && !document.getElementById("PersonalÜbersicht"))
    { var FWStat = document.createElement("div")
      TB.parentNode.insertBefore(FWStat,TB);
      FWStat.id = "PersonalÜbersicht"
	  FWStat.innerHTML = T;
    }
// WORK JM
    // var H2 = H2s[i];
    // var A  = H2.getElementsByTagName("a")[1];
    // var FWLink = A.href;
    // H2.innerHTML += "&nbsp&nbsp<a href='" + FWLink + "/feuerwehrautos'><font size='-1'>(Fahrzeuge)</font></a>";
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
 var R=document.getElementsByName("education_type");
 for (var i=0;i < R.length;i++) {
 R[i].addEventListener ( "click" , Markiere_Schueler , true ); }
}

function Markiere_Schueler()
{ var GG = document.getElementById("education_type_1").checked;
  var RA = document.getElementById("education_type_2").checked;
  var TA = document.getElementById("education_type_3").checked;
  var AP = document.getElementById("education_type_4").checked;
  var LB = document.getElementById("education_type_5").checked;
  var RB = document.getElementById("education_type_6").checked;
  var TU = document.getElementById("education_type_7").checked;
  var WE = document.getElementById("education_type_8").checked;
  var RE = document.getElementById("education_type_9").checked;
  var HO = document.getElementById("education_type_10").checked;
  var DT = document.getElementsByClassName("defaultTable");
  if (DT.length<2) return;

  for (var i=1; i<DT.length; i++)
  { var TB = DT[i];
        var TR=TB.getElementsByTagName("tr");
        for ( var j=0;j<TR.length;j++) {
        var TDs = TR[j].getElementsByTagName("td");
        if (TDs.length==7) {
        TDs[0].style.backgroundColor="transparent";
        var Ausb = TDs[5].innerHTML;
        var verf = (TDs[1].innerHTML.match("Nicht verfügbar") == null);
        var Mot  = parseInt(TDs[2].innerHTML);
        if (Mot >= 75) TDs[2].style.color="#66FF66";
        if (Mot <= 25) TDs[2].style.color="#FF6666";
        if (verf)
        { var bgc="";
          if (GG && Ausb.match("Gefahrgut")            == null) bgc = "#226622";
          if (RA && Ausb.match("Rettungsassistent")    == null) bgc = "#662222";
          if (TA && Ausb.match("Taucher")              == null) bgc = "#222266";
          if (AP && Ausb.match("Flughafen")            == null) bgc = "#CD9B1D";
          if (LB && Ausb.match("Löschboot")            == null) bgc = "#0000FF";
          if (RB && Ausb.match("Rettungsboot")         == null) bgc = "#C0C0C0";
          if (TU && Ausb.match("TUIS")                 == null) bgc = "#669900";
          if (WE && Ausb.match("2-Wege-Führerschein")               == null) bgc = "#33ddbb";
          if (RE && Ausb.match("Rettungszug")          == null) bgc = "#669900";
          if (HO && Ausb.match("Höhenrettungs-Lehrgang")              == null) bgc = "#222266";
          if (bgc)
          { TDs[0].style.backgroundColor = bgc;
            TR[j].style.display = "";
          }
          else
          { TR[j].style.display = "none";
          }
        }
        else
        { TR[j].style.display = "none";
        }
      }
    }
  }
}

function createElement(type, attributes) {
 var node = document.createElement(type);
 for (var attr in attributes)  { if (attributes.hasOwnProperty(attr)) {
         node.setAttribute(attr, attributes[attr]); }
  }
 return node;
}

function bearbeiteFahrzeugliste()
{ var DC=document.getElementById("content");
  var ArrTR=new Array;
  var H2 = DC.getElementsByTagName("h2");
  for (var i=0; i<H2.length; i++)
   { var A = H2[i].getElementsByTagName("a")[0];
    if (A)
    { var FWLink = A.href;
            H2[i].innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='" + FWLink + "/feuerwehrleute'><font size='-1'>(Personal)</font></a>";
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
  T +=               "<th style='background-color:#0000F8;' width='55'><b>1</b></th>" +
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
  for (var i=1;i<TBs.length-2;i++)  {
  var TB2=TBs[i];
  var TR=TB2.getElementsByTagName("tr")[0];
  var index=TR.getElementsByTagName("th").length-1;
  var LastTH = TR.getElementsByTagName("th")[index].firstChild.nodeValue;
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
          ZustandSumme[FZName]=0;
        }
        else
        { gefFZ[FZName]++;
        }
        var Funkname = TRs[j].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;

        var FZStat = trim(TRs[j].getElementsByTagName("td")[3].innerHTML);
        if (FZStat=="Einsatzbereit auf Wache" && Funkname.substr(0,3).toUpperCase()=="XXX") FZStat = "Außer Dienst";
        switch (FZStat)
        { case "Frei (Dienstfahrt)":      gefS1[FZName]++;  break;
          case "Einsatzbereit auf Wache": gefS2[FZName]++;  break;
          case "Auf dem Weg zum Einsatz": gefS3[FZName]++;  break;
          case "Ankunft am Einsatzort":   gefS4[FZName]++;  break;
          case "Nicht einsatzbereit":     gefS6[FZName]++;  break;
          case "Außer Dienst":            gefS6a[FZName]++; break;
          case "Patient aufgenommen":     gefS7[FZName]++;  break;
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
        if (Zustand != 100)
        { ArrTR.push(TRs[j].cloneNode(true));
        }
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

    if (gefS1[FZNamei]==0)  gefS1[FZNamei] = "<font color='#227755'>0</font>";
    if (gefS2[FZNamei]==0)  gefS2[FZNamei] = "<font color='#227755'>0</font>";
    if (gefS3[FZNamei]==0)  gefS3[FZNamei] = "<font color='#227755'>0</font>";
    if (gefS4[FZNamei]==0)  gefS4[FZNamei] = "<font color='#227755'>0</font>";
    if (gefS6[FZNamei]==0)  gefS6[FZNamei] = "<font color='#227755'>0</font>";
    if (gefS6a[FZNamei]==0) gefS6a[FZNamei] = "";
    if (gefS7[FZNamei]==0)  gefS7[FZNamei] = "<font color='#227755'>0</font>";

    T += "<tr><td><b>" + FZNamei + "</b></td>";
    T += "<td style='text-align:center'>" + gefFZ[FZNamei] + "</td>";
    T += "<td style='text-align:center'>" + gefS1[FZNamei] + "</td>";
    T += "<td style='text-align:center'>" + gefS2[FZNamei] + "</td>";
    T += "<td style='text-align:center'>" + gefS3[FZNamei] + "</td>";
    T += "<td style='text-align:center'>" + gefS4[FZNamei] + "</td>";
    T += "<td style='text-align:center'>" + gefS6[FZNamei];
    if (gefS6a[FZNamei]) T += " + " + gefS6a[FZNamei];
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
  TR.innerHTML = "<th>Fahrzeuge mit der höchsten Laufleistung:</th>\n<td colspan='8'></td>";
  var TD=TR.getElementsByTagName("td")[0];

  ArrTopKM.sort(function s(a,b){return b[0]-a[0];});
  for (var i=0;i<5;i++)
  { TD.innerHTML += " " + makeDots(ArrTopKM[i][0]) + " km - " + ArrTopKM[i][1] + "<br>\n";
  }

  TB = TBs[TBs.length-1];
  var lastTR = TB.getElementsByTagName("tr")[TB.getElementsByTagName("tr").length-1];
  var TR=document.createElement("tr");
  lastTR.parentNode.insertBefore(TR,lastTR.nextSibling);
  TR.innerHTML = "<th>Fahrzeuge mit der niedrigsten Laufleistung:</th>\n<td colspan='8'></td>";
  var TD=TR.getElementsByTagName("td")[0];

  ArrTopKM.sort(function s(b,a){return b[0]-a[0];});
  for (var i=0;i<5;i++)
  { TD.innerHTML += " " + makeDots(ArrTopKM[i][0]) + " km - " + ArrTopKM[i][1] + "<br>\n";
  }


   // Tabelle mit beschädigten Fahrzeugen in Dokument schreiben,
  // aber erstmal verstecken, Anzeigen erst durch Klick auf Toggle-Link

  var NewDiv = document.createElement("div");
  var nodeScript = createElement('script', {'type': 'text/javascript'});
  nodeScript.innerHTML = "function toggledisplay()\n\
  { var e = document.getElementById('DivZustandstabelle');\n\
  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n\
  }\n";
  

  NewDiv.appendChild(nodeScript);
  var nodeA = createElement('a', {'href': 'javascript:toggledisplay();'});
  nodeA.appendChild(document.createTextNode('Defekte Fahrzeuge aus/einblenden'));
  NewDiv.appendChild(nodeA);
  NewDiv.appendChild(createElement('br'));
  NewDiv.appendChild(createElement('br'));

  // Tabelle mit beschädigten Fahrzeugen in Dokument schreiben,
  // und direckt auflisten

  var hiddenDiv=document.createElement("div");
  hiddenDiv.id = "DivZustandstabelle";
  hiddenDiv.style.display = "Block";
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
}

function bearbeiteEinsatzseite()
{
  // Alle Infobox-Variablen leer machen
  InfotextStichwort="";
  InfotexteinsatzNr="";
  InfotextKlasse="";
  InfotextKlassenalarm="";
  InfotextKlassenalarmOpt="";
  InfotextRTW="";
  InfotextUnterwegs="";
  InfotextNachforderungen="";
  InfotextToAlarm="";
  InfotextFahrzeit="";
  InfotextFahrzeitopt="";
  InfotextNichtVerfuegbar="";
  InfotextVerfuegbar="";

  // verfügbare FZ zählen
  if (showInfoVerfuegbar) InfotextVerfuegbar = zaehleVerfuegbar();

  // im Verbandseinsatz die Checkbox per default NICHT anhaken, sonst schon
  if (document.getElementById("machVorschlag") == undefined) machVorschlaganhaken = !Verbandseinsatz();

  // Einsatz Nr. ermitteln
  var EinsatzNr = adr.replace(/[^0-9]/g, ""); 
  if (showInfoEinsatzNr) InfotextEinsatzNr = EinsatzNr;
  

  // Einsatzstichwort ermitteln
  var EinsatzDiv   = document.getElementById("mission_content");
  var Einsatz      = document.getElementsByTagName("h1")[0];
  var Einsatzstichwort = getStichwort(Einsatz.innerHTML);
  if (showInfoStichwort)
  { InfotextStichwort = Einsatzstichwort;
    var L = getWikiLink(Einsatzstichwort);
    if (L != "") InfotextStichwort = "<a target='_new' href='" + L + "'>" + Einsatzstichwort + "</a>";

  }


  // Einsatzklasse
  var Einsatzklasse = getEinsatzKlasse(Einsatzstichwort);
  //dt();mylog(Einsatzklasse);df();
  if (showInfoKlasse) InfotextKlasse = Einsatzklasse;
  // Fahrzeuge zusammenstellen
  FillAlarmListe(Einsatzklasse);

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
                        if (Einsatzklasse == 'RD') { V = 1; }
                }
                // -> (einen RTW mehr schicken)
                // Wassereinsatz ?
                var Buchstabe = Einsatzklasse.charAt(0);
                if (Buchstabe == 'W') {
                if (showInfoRTWplus) { V--; }
                }

                while (V>0) {
                        if (Buchstabe == 'W') { ToAlarm.push("Rettungsboot"); }
                        if (Buchstabe != 'W') { ToAlarm.push("RTW"); }
                        V--;
                }
        }

// Prüfung ob NEF benötigt wird
    var tblMissoncontent = document.getElementById("mission_content").getElementsByTagName("table")[0];
    
    if (tblMissoncontent.getElementsByTagName("tr").length > 5) if (tblMissoncontent.getElementsByTagName("tr")[5].innerHTML.match("Notarzt")) ToAlarm.push("NEF");



  // bereits eingebundene Fahrzeuge ermitteln
  FillUnterwegsListe();


  // Diese Unterwegs-Fahrzeuge auflisten...
  if (Unterwegs.length>0)
  { if (showInfoUnterwegs)
    {  if (AmOrt.length) InfotextUnterwegs += "am Ort: <font color='green'>" + condenseFahrzeugliste(AmOrt) + "</font>, ";
       if (AufAnfahrt.length) InfotextUnterwegs += "auf Anfahrt: <font color='cc0099'>" + condenseFahrzeugliste(AufAnfahrt) + "</font>, ";
       if (Wartend.length) InfotextUnterwegs += "wartend: <font color='red'>" + condenseFahrzeugliste(Wartend) + "</font>, ";
      InfotextUnterwegs = InfotextUnterwegs.substr(0,InfotextUnterwegs.length-2);
    }
  }


  // ToAlarm um die FZ kürzen, die bereits unterwegs sind
  // sowie die Reihenfolge anpassen, dass Alternativen am Ende stehen
  
  if(Einsatzklasse!="Waldbrand" && Einsatzklasse!="Explosion")bereinigeToAlarm();

  // Nachforderungen auslesen
  var NF = AddNachforderungen();
  if (NF != "" && showInfoNachforderungen) InfotextNachforderungen = NF;
  

  if (showInfoOptionalAnkreuzen) while (Optional.length>0) ToAlarm.push(Optional.pop());


  if (!machVorschlag)
  { // es sollen keine Vorschläge angehakt werden, also alles aus ToAlarm
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
        Info += "><font color='yellow'> Fahrzeuge auswählen</font></td>";   

        Info += "<tr><td><input type='checkbox' id='RTWZeit' ";
        if (alarmtyp==1) Info +="checked";
        Info += "><font color='yellow'> Nur RTW unter 30 Min. auswählen </font></td>";

        Info += "<td align='right'><input type='checkbox' id='zweiterAbmarschTr' ";
        if (zweiterAbmarsch==1) Info +="checked";
        Info += "><font color='yellow'> Trupp vor Gruppe </font></td>";

        Info += "<th>&nbsp;oder&nbsp;</th><td align='center'><input type='checkbox' id='zweiterAbmarschAusb' ";
        if (zweiterAbmarsch==2) Info +="checked";
        Info += "><font color='yellow'> Ausbildung zuerst </font></td>";

        // Infos in Tabelle strukturieren
        Info += "<table class='defaultTable'>\n";
        var InfoVorspann = "<tr><th style='width: 150px;'>";
        var InfoVorspann2 = "<tr><th colspan='2'>";

        if (InfotextStichwort) Info += InfoVorspann + "Wiki-Link</th><td>" + InfotextStichwort + "</td></tr>\n";
        if (InfotextEinsatzNr)  Info += InfoVorspann + "Einsatz Nr:</th><td>" + InfotextEinsatzNr + "</td></tr>\n";

  if (InfotextKlasse)
  { Info += InfoVorspann + "Einsatzklasse</th><td><font color='red'>" + InfotextKlasse + "</font>";
    if (InfotextKlassenalarmOpt) InfotextKlassenalarm += ", Optional: " + InfotextKlassenalarmOpt + "&nbsp;";
    if (InfotextKlassenalarm) Info += "&nbsp;&nbsp;(&nbsp;" + InfotextKlassenalarm + "&nbsp;)";
    Info += "</td></tr>\n";
  }
        if (InfotextRTW) Info += InfoVorspann + "Verletzte:</th><td>" + InfotextRTW + "</td></tr>\n";
        if (InfotextNachforderungen) Info += InfoVorspann + "Nachforderung</th><td>" + InfotextNachforderungen + "</td></tr>\n";
        if (InfotextUnterwegs) Info += InfoVorspann + "im Einsatz:</th><td>" + InfotextUnterwegs + "</td></tr>\n";
        if (InfotextToAlarm) Info += InfoVorspann + "zu alarmieren:</th><td id='TA'><font size='2'>" + InfotextToAlarm + "</font></td></tr>\n";
        if (InfotextNichtVerfuegbar) Info += InfoVorspann + "<font color='red'>nicht verfügbar:</font></th><td><font color='#EE0000'>" + InfotextNichtVerfuegbar + "</font></td></tr>\n";
        if (InfotextFahrzeit || InfotextFahrzeitOpt) {
                Info += InfoVorspann + "Anfahrzeit</th><td>"
                if (InfotextFahrzeit) Info += " beträgt: " + InfotextFahrzeit;
                if (InfotextFahrzeit && InfotextFahrzeitOpt) Info += "<br>";
                if (InfotextFahrzeitOpt) Info += "der optionalen Fahrzeuge: " + InfotextFahrzeitOpt;
                Info += "</td></tr>\n";
        }
        if (InfotextVerfuegbar) Info += InfoVorspann2 + "<font size=2>aktuell einsatzbereite Fahrzeuge: (<a target='_new' href='http://www.feuerwache.net/feuerwehrfahrzeuge'>Übersicht</a>)</font></th></tr><tr><td colspan='2'><font size='1'>" + InfotextVerfuegbar + "</font></td></tr>\n";
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
        document.getElementById("RTWZeit").addEventListener ( "click" , alarmTyp_clicked , false ) ;
        document.getElementById("zweiterAbmarschAusb").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;
        document.getElementById("zweiterAbmarschTr").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;

        var BTN = document.getElementsByName("commit")[0];
        if (BTN) BTN.addEventListener ( "click" , function(){ FirstRun=true; } , false ) ;

  for each (A in document.getElementsByTagName("a"))
  { if (A.innerHTML == "zurÃ¼ck alarmieren") A.addEventListener ( "click" , function(){ FirstRun=true;CBClicked=false; } , false ) ; }

  var D=document.getElementsByName("vehicle_to_user_id[]");
  for ( var i=0;i < D.length;i++) {
        D[i].addEventListener ( "click" , function(){ CBClicked=true; } , false ) ;
        }
 // for each (I in document.getElementsByName("vehicle_to_user_id[]"))
 // { I.addEventListener ( "click" , function(){ CBClicked=true; } , false ) ; }

findeFahrzeugeZumZurückalarmieren();

  FirstRun=false;

 if ( alarm_sound == 1 ) document.getElementsByClassName('no_padding')[0].getElementsByTagName('input')[0].addEventListener("click",function(){playsound('horn');},false);
 if ( alarm_sound == 2 ) document.getElementsByClassName('no_padding')[0].getElementsByTagName('input')[0].addEventListener("click",function(){playsound('alarm-5ton');},false)};


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
      { Row1.getElementsByTagName("td")[5].style.backgroundColor="#224488";
        Row2.getElementsByTagName("td")[4].style.backgroundColor="#226622";
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
		element.innerHTML='<span style="display:none;">'+nummer+'</span><img src="http://verband-hogsmeade.de/skript/skript_update/tick.png" title="erledigt" alt="erledigt" class="famfamfamicon">';
	}
	GM_setValue("done_einsatz",done);
}

function bearbeiteÜbersichtsseite()
{ if (showInfoKlasseInListe)
        { var TD=document.getElementsByTagName("td");
    for (var i=0;TD.length > i; i++){
    var A=TD[i].getElementsByTagName("a");
    for (var j=0;A.length > j; j++){
    if ( A[j].href.indexOf("http://www.feuerwache.net/feuerwehr-einsaetze/") == 0)
        { TD[i].innerHTML += "<span style='padding-right:2px; float:right;'><font color='blue'>(" + getEinsatzKlasse(A[j].innerHTML) + ")</font></span>"; }
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

var einsatznummer=A[j].href.replace('http://www.feuerwache.net/feuerwehr-einsaetze/','');

// Icon ob erledigt
				var x=i-1;
				if ( done_einsatz.match(einsatznummer) ) {
					TD[x].innerHTML='<img src="http://verband-hogsmeade.de/skript/skript_update/tick.png" title="erledigt" alt="erledigt" class="famfamfamicon">';
				}

TD[x].innerHTML+='<span style="display:none;">'+einsatznummer+'</span>';
TD[x].addEventListener("dblclick",function(){ einsatz_clicked(this,this.getElementsByTagName("span")[0].innerHTML);},false);


				//// Sound bei GSL abspielen, nur einmal pro Einsatz
				if ( Einsatzklasse=='Waldbrand' && ! soundplayed.match(einsatznummer) && vgsl_sound != 0 ) {
					if (vgsl_sound==1) playsound('waldbrand');
					else if (vgsl_sound==2) playsound('Waldbrand-5ton');
					soundplayed=soundplayed+'||'+einsatznummer;
					GM_setValue("soundplayed",soundplayed);
				}
				else if ( Einsatzklasse=='Explosion' && ! soundplayed.match(einsatznummer) && vgsl_sound != 0 ) {
					if (vgsl_sound==1) playsound('explosion');
					else if (vgsl_sound==2) playsound('Explosion-5ton');
					soundplayed=soundplayed+'||'+einsatznummer;
					GM_setValue("soundplayed",soundplayed);
				}
				else if ( Einsatzklasse=='Crash' && ! soundplayed.match(einsatznummer) && manv_sound != 0 ) {
					if (manv_sound==1) playsound('flugzeug');
					else if (manv_sound==2) playsound('Flugzeug-5ton');
					soundplayed=soundplayed+'||'+einsatznummer;
					GM_setValue("soundplayed",soundplayed);
				}
				else if ( Einsatzklasse=='F-MANV' && ! soundplayed.match(einsatznummer) && manv_sound != 0 ) {
					if (manv_sound==1) playsound('krankenhaus');
					else if (manv_sound==2) playsound('krankenhaus-5ton');
					soundplayed=soundplayed+'||'+einsatznummer;
					GM_setValue("soundplayed",soundplayed);
				}
				TD[i].innerHTML += "<span style='padding-right:2px; float:right;'><font color='#1865C9'>(" + Einsatzklasse + ")</font></span>";


function AddKonfigEventlisteners()
{ var Boxes = document.getElementsByName("KonfigBox");
  for ( var i=0;i < Boxes.length;i++) {
           Boxes[i].addEventListener("click",KonfigBox_clicked,false);
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
  { case "Name":        SortTabelle(Tab,Spalte,true,false,true);  break;
    case "Motivation":  SortTabelle(Tab,Spalte,false,true,false); break;
    case "Fähigkeiten": SortTabelle(Tab,Spalte,false,true,false); break;
    case "Alter":       SortTabelle(Tab,Spalte,true,true,false);  break;
    case "Ausbildung":  SortTabelle(Tab,Spalte,true,false,false); break;
    case "Status":      SortTabelle(Tab,Spalte,true,false,false); break;
    case "Schicht":     SortTabelle(Tab,Spalte,true,true,false);  break;
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
  TH[i].addEventListener ( "click" , function(e){SortiereNachSpalteClick(e)} , true ) ;   }
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
  var AnzWE=0, AnzWEDienst=0, AnzWEBereit=0, AnzWESchule=0, AnzWEEinsatz=0, AnzWEFrei=0;
  var AnzRE=0, AnzREDienst=0, AnzREBereit=0, AnzRESchule=0, AnzREEinsatz=0, AnzREFrei=0;
  var AnzHO=0, AnzHODienst=0, AnzHOBereit=0, AnzHOSchule=0, AnzHOEinsatz=0, AnzHOFrei=0;
  
  
  var TR=myTB.getElementsByTagName("tr");
  for (var i=0;i<TR.length;i++) {
  if (TR[i].getElementsByTagName("td").length>5)
  {   var TDs = TR[i].getElementsByTagName("td");
      var Stat = trim(TDs[5].innerHTML);
      var Ausb = trim(TDs[4].innerHTML);

      // Motivation kennzeichnen:
      var Mot = parseInt(TDs[1].innerHTML);
      if (Mot >= 75) TDs[1].style.color = "#00CB00";
      if (Mot <= 25) TDs[1].style.color = "#FF6666";

      // Personalstatistik:
      AnzFM++;

      // Status kennzeichnen und zählen
      if (Stat.match("Beim Einsatz"))           { AnzDienst++; AnzEinsatz++; TDs[5].style.color="#FF0000"; }
      if (Stat.match("Frei - nicht im Dienst")) TDs[5].style.color="#555555";
      if (Stat.match("Einsatzbereit"))          { AnzDienst++; AnzBereit++; TDs[5].style.color="#008000"; }
      if (Stat.match("In der Feuerwehrschule")) { AnzSchule++; TDs[5].getElementsByTagName("a")[0].style.color="#5555FF"; }

      // Ausbildungsstand
      if (Ausb.match("Gefahrgut"))
      { AnzGG++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzGGDienst++;
        if (Stat == "Einsatzbereit")                           AnzGGBereit++;
        if (Stat == "In der Feuerwehrschule")                  AnzGGSchule++;
        if (Stat == "Frei - nicht im Dienst")                  AnzGGFrei++;
        if (Stat == "Beim Einsatz")                            AnzGGEinsatz++;
      }
      if (Ausb.match("Rettungsassistent"))
      { AnzRA++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzRADienst++;
        if (Stat == "Einsatzbereit")                           AnzRABereit++;
        if (Stat == "In der Feuerwehrschule")                  AnzRASchule++;
        if (Stat == "Frei - nicht im Dienst")                  AnzRAFrei++;
        if (Stat == "Beim Einsatz")                            AnzRAEinsatz++;
      }
      if (Ausb.match("Taucher"))
      { AnzTA++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzTADienst++;
        if (Stat == "Einsatzbereit")                           AnzTABereit++;
        if (Stat == "In der Feuerwehrschule")                  AnzTASchule++;
        if (Stat == "Frei - nicht im Dienst")                  AnzTAFrei++;
        if (Stat == "Beim Einsatz")                            AnzTAEinsatz++;
      }
      if (Ausb.match("Flughafen"))
      { AnzAP++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzAPDienst++;
        if (Stat == "Einsatzbereit")                           AnzAPBereit++;
        if (Stat == "In der Feuerwehrschule")                  AnzAPSchule++;
        if (Stat == "Frei - nicht im Dienst")                  AnzAPFrei++;
        if (Stat == "Beim Einsatz")                            AnzAPEinsatz++;
      }
      if (Ausb.match("Löschboot"))
      { AnzLB++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzLBDienst++;
        if (Stat == "Einsatzbereit")                           AnzLBBereit++;
        if (Stat == "In der Feuerwehrschule")                  AnzLBSchule++;
        if (Stat == "Frei - nicht im Dienst")                  AnzLBFrei++;
        if (Stat == "Beim Einsatz")                            AnzLBEinsatz++;
      }
      if (Ausb.match("Rettungsboot"))
      { AnzRB++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzRBDienst++;
        if (Stat == "Einsatzbereit")                           AnzRBBereit++;
        if (Stat == "In der Feuerwehrschule")                  AnzRBSchule++;
        if (Stat == "Frei - nicht im Dienst")                  AnzRBFrei++;
        if (Stat == "Beim Einsatz")                            AnzRBEinsatz++;
      }
      if (Ausb.match("TUIS"))
      { AnzTU++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzTUDienst++;
        if (Stat == "Einsatzbereit")                           AnzTUBereit++;
        if (Stat == "In der Feuerwehrschule")                  AnzTUSchule++;
        if (Stat == "Frei - nicht im Dienst")                  AnzTUFrei++;
        if (Stat == "Beim Einsatz")                            AnzTUEinsatz++;

         }
      if (Ausb.match("Rettungszug"))
      { AnzRE++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzREDienst++;
        if (Stat == "Einsatzbereit")                           AnzREBereit++;
        if (Stat == "In der Feuerwehrschule")                  AnzRESchule++;
        if (Stat == "Frei - nicht im Dienst")                  AnzREFrei++;
        if (Stat == "Beim Einsatz")                            AnzREEinsatz++;

      }
      if (Ausb.match("Höhenrettungs-Lehrgang"))
      { Anzho++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzHODienst++;
        if (Stat == "Einsatzbereit")                           AnzHOBereit++;
        if (Stat == "In der Feuerwehrschule")                  AnzHOSchule++;
        if (Stat == "Frei - nicht im Dienst")                  AnzHOFrei++;
        if (Stat == "Beim Einsatz")                            AnzHOEinsatz++;

  }
      if (Ausb.match("2-Wege-Führerschein"))
      { AnzWE++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzWEDienst++;
        if (Stat == "Einsatzbereit")                           AnzWEBereit++;
        if (Stat == "In der Feuerwehrschule")                  AnzWESchule++;
        if (Stat == "Frei - nicht im Dienst")                  AnzWEFrei++;
        if (Stat == "Beim Einsatz")                            AnzWEEinsatz++;
      }
    }
  }
// WORK JM
  var ret;
        //ret =  "<table width='100%' border='1'><tr>";
        // BUG:
        ret =  "<table class='defaultTable'><tr>";
  // Wenn das hier steht, wird die Sortierfunktion nicht aufgerufen, dafür zweimal die Statistik
        ret += " <thead>" +
         "  <tr>" +
         "   <th style='width: 25%'>Personal</th>" +
         "   <th style='width: 15%'>Summe &Sigma;</th>" +
         "   <th style='width: 15%'><font color='#FF0000'>im Einsatz</font></th>" +
         "   <th style='width: 15%'><font color='#008000'>Einsatzbereit</font></th>" +
         "   <th style='width: 15%'><font color='#555555'>Frei</font></th>" +
         "   <th style='width: 15%'><font color='#5555FF'>Schule</font></th>" +
         "  </tr>" +
         " </thead>";
  ret += " <tbody>";
        ret += "  <tr>  " +
         "   <th>&rArr; gesamt &lArr;</th>" +
         "   <th>" + AnzFM + "</th>"  +
         "   <td><font color='#FF0000'>" + AnzEinsatz + "</td>" +
         "   <td><font color='#008000'><b>" + AnzBereit + "</b></font></td>" +
         "   <td><font color='#555555'>" + (AnzFM - AnzDienst) + "</font></td>" +
         "   <td><font color='#5555FF'>" + AnzSchule + "</font></td>" +
         "  </tr>";
        if ((AnzGG) || (AnzRA) || (AnzTA) || (AnzAP) || (AnzLB) || (AnzRB) || (AnzTU) || (AnzRE) || (Anzho) || (AnzWE)) {
                ret += "  <tr>" +
           "   <th colspan='6'>Übersicht der Ausbildung - gestaffelt nach der jeweiligen Ausbildung:</th>" +
           "  </tr>";
            }
        if (AnzGG) {
                                                                ret += "  <tr>  " +
                                                                       "   <th>Gefahrgut</th>" +
                                                                       "   <th>" + AnzGG + "</th>"  +
                                                                       "   <td><font color='#FF0000'>" + AnzGGEinsatz + "</td>" +
                                                                       "   <td><font color='#008000'><b>" + AnzGGBereit  + "</b></font></td>" +
                                                                       "   <td><font color='#555555'>" + AnzGGFrei    + "</font></td>" +
                                                                       "   <td><font color='#5555FF'>" + AnzGGSchule  + "</font></td>" +
                                                                       "  </tr>";
                }
        if (AnzRA) {
                                                                ret += "  <tr>  " +
                             "   <th>Rettungsassistent</th>" +
                                                                       "   <th>" + AnzRA + "</th>"  +
                                                                       "   <td><font color='#FF0000'>" + AnzRAEinsatz + "</td>" +
                                                                       "   <td><font color='#008000'><b>" + AnzRABereit  + "</b></font></td>" +
                                                                       "   <td><font color='#555555'>" + AnzRAFrei    + "</font></td>" +
                                                                       "   <td><font color='#5555FF'>" + AnzRASchule  + "</font></td>" +
                                                                       "  </tr>";
                }
        if (AnzTA) {
                                                                ret += "  <tr>  " +
                                                                       "   <th>Taucher</th>" +
                                                                       "   <th>" + AnzTA + "</th>"  +
                                                                       "   <td><font color='#FF0000'>" + AnzTAEinsatz + "</td>" +
                                                                       "   <td><font color='#008000'><b>" + AnzTABereit  + "</b></font></td>" +
                                                                       "   <td><font color='#555555'>" + AnzTAFrei    + "</font></td>" +
                                                                       "   <td><font color='#5555FF'>" + AnzTASchule  + "</font></td>" +
                                                                       "  </tr>";
                }
        if (AnzAP) {
                                                                ret += "  <tr>  " +
                                                                       "   <th>Flughafen</th>" +
                                                                       "   <th>" + AnzAP + "</th>"  +
                                                                       "   <td><font color='#FF0000'>" + AnzAPEinsatz + "</td>" +
                                                                       "   <td><font color='#008000'><b>" + AnzAPBereit  + "</b></font></td>" +
                                                                       "   <td><font color='#555555'>" + AnzAPFrei    + "</font></td>" +
                                                                       "   <td><font color='#5555FF'>" + AnzAPSchule  + "</font></td>" +
                                                                       "  </tr>";
                }
        if (AnzLB) {
                                                                ret += "  <tr>  " +
                                                                       "   <th>Löschboot</th>" +
                                                                       "   <th>" + AnzLB + "</th>"  +
                                                                       "   <td><font color='#FF0000'>" + AnzLBEinsatz + "</td>" +
                                                                       "   <td><font color='#008000'><b>" + AnzLBBereit  + "</b></font></td>" +
                                                                       "   <td><font color='#555555'>" + AnzLBFrei    + "</font></td>" +
                                                                       "   <td><font color='#5555FF'>" + AnzLBSchule  + "</font></td>" +
                                                                       "  </tr>";
                }
        if (AnzRB) {
                                                                ret += "  <tr>  " +
                                                                       "   <th>Rettungsboot</th>" +
                                                                       "   <th>" + AnzRB + "</th>"  +
                                                                       "   <td><font color='#FF0000'>" + AnzRBEinsatz + "</td>" +
                                                                       "   <td><font color='#008000'><b>" + AnzRBBereit  + "</b></font></td>" +
                                                                       "   <td><font color='#555555'>" + AnzRBFrei    + "</font></td>" +
                                                                       "   <td><font color='#5555FF'>" + AnzRBSchule  + "</font></td>" +
                                                                       "  </tr>";
                   }
        if (AnzTU) {
                                                                ret += "  <tr>  " +
                                                                       "   <th>TUIS</th>" +
                                                                       "   <th>" + AnzTU + "</th>"  +
                                                                       "   <td><font color='#FF0000'>" + AnzTUEinsatz + "</td>" +
                                                                       "   <td><font color='#008000'><b>" + AnzTUBereit  + "</b></font></td>" +
                                                                       "   <td><font color='#555555'>" + AnzTUFrei    + "</font></td>" +
                                                                       "   <td><font color='#5555FF'>" + AnzTUSchule  + "</font></td>" +
                                                                       "  </tr>";
                 }
      if (AnzRE) {
                                                                ret += "  <tr>  " +
                                                                       "   <th>Rettungszug</th>" +
                                                                       "   <th>" + AnzTU + "</th>"  +
                                                                       "   <td><font color='#FF0000'>" + AnzREinsatz + "</td>" +
                                                                       "   <td><font color='#008000'><b>" + AnzREBereit  + "</b></font></td>" +
                                                                       "   <td><font color='#555555'>" + AnzRErei    + "</font></td>" +
                                                                       "   <td><font color='#5555FF'>" + AnzRESchule  + "</font></td>" +
                                                                       "  </tr>";

                 }
      if (AnzWE) {
                                                                 ret += "  <tr>  " +
                                                                       "   <th>2-Wege-Führerschein</th>" +
                                                                       "   <th>" + AnzTU + "</th>"  +
                                                                       "   <td><font color='#FF0000'>" + AnzWEEinsatz + "</td>" +
                                                                       "   <td><font color='#008000'><b>" + AnzWEBereit  + "</b></font></td>" +
                                                                       "   <td><font color='#555555'>" + AnzWEFrei    + "</font></td>" +
                                                                       "   <td><font color='#5555FF'>" + AnzWESchule  + "</font></td>" +
                                                                       "  </tr>";
                 }
      if (AnzHO) {
                                                                 ret += "  <tr>  " +
                                                                       "   <th>Höhenrettungs-Lehrgang</th>" +
                                                                       "   <th>" + AnzTU + "</th>"  +
                                                                       "   <td><font color='#FF0000'>" + AnzhoEinsatz + "</td>" +
                                                                       "   <td><font color='#008000'><b>" + AnzhoBereit  + "</b></font></td>" +
                                                                       "   <td><font color='#555555'>" + AnzhoFrei    + "</font></td>" +
                                                                       "   <td><font color='#5555FF'>" + AnzhoSchule  + "</font></td>" +
                                                                       "  </tr>";
                }
        ret += " </tbody>";
        ret += "</table>";
        ret += "<br>";
  return ret;
}

function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link)
{ var TBody = myTB.getElementsByTagName("tbody")[0];
  if (!TBody) return;
  var ArrTR = new Array();
  var TR=TBody.getElementsByTagName("tr");
  for (var i=0;i<TR.length;i++) {
  ArrTR.push(TR[i]);   }
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
  for ( var i=0;i < TRs.length;i++) {
          var TR=TRs[i];
   // Farbe entfernen
   TR.style.backgroundColor = '';
   var CB=TR.getElementsByTagName("input")[0];
   if (CB) { CB.alt=undefined;
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
  H += "function toggledisplay() {\n";
  H += "var e = document.getElementById('KonfigBoxes');\n";
  H += "  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n";
  H += "}\n";
  H += "</script>";
  var H="<br>";
  if (ScriptUpdateAvailable != "")
  { H = "<br><br><div align='center'><font color='red'>Hinweis: es ist ein Script-Update verfügbar!</font><br>";
    H += "<a href='" + UPDATEURLlink + "' target='_new'>Informationen</a> dazu";
    H += " oder gleich <a id='installURL' href='" + INSTALLURL + "' target='_new'>installieren</a>.<br><br>";
    H += "<b>Hinweis:</b> solltet Ihr ein fehler finden, bitte um Nachricht.</div>";
  }
  H += "\n";
  NewDiv.innerHTML = H;

   var nodeScript = createElement('script',
  {'type': 'text/javascript'});
  nodeScript.innerHTML = "function toggledisplay()\n\
  { var e = document.getElementById('KonfigBoxes');\n\
  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n\  }\n";
  NewDiv.appendChild(nodeScript);
  var nodeA = createElement('a',
  {'href': 'javascript:toggledisplay();'});
  nodeA.appendChild(createText('Anzeige und Fahrzeug Einstellungen'));
  NewDiv.appendChild(nodeA);
  //NewDiv.appendChild(createElement('br'));

  var hiddenDiv=document.createElement("div");
  hiddenDiv.id = "KonfigBoxes";
  hiddenDiv.style.display = "none"

  H = "\n";

  H += "<h2><font color='yellow'>Einsatzübersicht<h2></font><br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfKlasseInListe'";
  if (showInfoKlasseInListe) H += " checked";
  H += "> Einsatzart anzeigen<br>\n";

  H += "<h2><font color='yellow'><b>Hier kannst du Einstellen ob ein Ton abgespielt werden soll</h2></font><br>\n";
  
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

  H += "<input type='checkbox' name='KonfigBox' id='KonfVerbandSound'";
  if (showInfoVerbandSound) H += " checked";
  H += "> Töne abspielen lassen (z.B. bei Verbandsalarm)<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfProbeSound'";
  if (showInfoProbeSound) H += " checked";
  H += "> Spielt jeden ersten Samstag im Monat den Probealarm ab\n";
  

  H += "<h2><font color='yellow'><b>Anzeige Einstellungen auf der Einsatzseite</h2></font><br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfStichwort'";
  if (showInfoStichwort) H += " checked";
  H += "> Wiki-Link anzeigen<br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfEinsatzNr'";
  if (showInfoEinsatzNr) H += " checked";
  H += "> Einsatz-Nr anzeigen<br>\n";

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

  H += "<h2><font color='yellow'><b>Einstellungen für die Fahrzeuge</h2></font><br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfRTWplus'";
  if (showInfoRTWplus) H += " checked";
  H += "> Einen RTW mehr schicken als ursprünglich nötig<br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfOptionalAnkreuzen'";
  if (showInfoOptionalAnkreuzen) H += " checked";
  H += "> Optionale Fahrzeuge direkt mitalarmieren<br>\n"
  

  H += "<br><a href='" + adr + "'>Speichern</a>\n";
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
function alarmTyp_clicked(e) {
  var rtw = document.getElementById("RTWZeit").checked;
  //var erkund = document.getElementById("Erkundungsmodus").checked;

  if (e.target.id == "RTWZeit" && rtw) erkund=false;
  //if (e.target.id == "Erkundungsmodus" && erkund) rtw=false;

  alarmtyp=0;
  if (rtw) alarmtyp = 1;
  //if (erkund) alarmtyp = 2;

  GM_setValue("alarmtyp",alarmtyp);

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
    { var Q = TR.getElementsByTagName("td")[1].innerHTML;
      if (Q.indexOf("Leitstelle:") == -1)
      { var RM = TR.getElementsByTagName("td")[2].innerHTML;
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
  AmOrt = new Array;
  AufAnfahrt = new Array;
  Wartend = new Array;

  var d = document.getElementById("mission_vehicle");
  if (d.getElementsByTagName("table").length == 1)
  { var TB=d.getElementsByTagName("table")[0];
    for each (TR in TB.getElementsByTagName("tr"))
    { var FZ;
      try
      { var FZ=TR.getElementsByTagName("td")[1].innerHTML;
        FZ = getFahrzeugKlasse(FZ);
        Unterwegs.push(FZ);
        AmOrt.push(FZ);
      } catch(e) {};
    }
  }
  var d = document.getElementById("driving_vehicle");
  if (d.getElementsByTagName("table").length == 1)
  { var TB=d.getElementsByTagName("table")[0];
    for each (TR in TB.getElementsByTagName("tr"))
    { var FZ;
      try
      { var FZ=TR.getElementsByTagName("td")[1].innerHTML;
        FZ = getFahrzeugKlasse(FZ);
        Unterwegs.push(FZ);
        AufAnfahrt.push(FZ);
      } catch(e) {};
    }
  }
  var d = document.getElementById("waiting_vehicle");
  if (d.getElementsByTagName("table").length == 1)
  { var TB=d.getElementsByTagName("table")[0];
    for each (TR in TB.getElementsByTagName("tr"))
    { var FZ;
      try
      { var FZ=TR.getElementsByTagName("td")[1].innerHTML;
        FZ = getFahrzeugKlasse(FZ);
        Unterwegs.push(FZ);
        Wartend.push(FZ);
      } catch(e) {};
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
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#008811";
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
    Anfahrt = "<font color=#009911>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=#009911>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
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
  var FahrzeitZuLang = false;
  var Anfahrt="";

  var imax=0;
  var imin=9999;

  for (var ta=0; ta<ToAlarm.length; ta++)
  { var FZ = ToAlarm[ta];
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;
    mylog("suche nach " + AlternativFZ);

    for (var i=1; i<Zeilen.length-1; i++)
    { var ThisZeile = Zeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      var ThisFZ = getFahrzeugKlasse(ThisSpalten[2].innerHTML);
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var fahrzeit=ThisSpalten[4].firstChild.nodeValue;
		if (ThisFZ == 'RTW' && alarmtyp == 1 && ( fahrzeit.split(" Min.")[0] > 30 || fahrzeit.match("Std.") )) FahrzeitZuLang = true
		if (!FahrzeitZuLang)
		{  
			var C = ThisSpalten[0].getElementsByTagName("input")[0];
			var RN = ThisSpalten[1].getElementsByTagName("a")[0];
			if (RN) RN = RN.innerHTML;
			if (C.alt != "x" && RN.substr(0,3).toUpperCase() != "XXX")
			{ mylog("gefunden:" + ThisFZ);
			  if (FirstRun || !CBClicked)
			  { C.click();
				AlarmZeilen.push (ThisZeile);
			  }
			  C.alt="x";
			  for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#ee1133";
			  FZ = "gefunden";
			  ToAlarm[ta] = "gefunden";
			  if (i>imax) imax=i;
			  if (i<imin) imin=i;
			  i=Zeilen.length;
			} // not checked
		} // Fahrzeit lang
      } // FZ passt
    } // for Zeilen
  } // alle ToAlarm

  if (imax>0)
  { var Zeile = Zeilen[imax];
    Anfahrt = "<font color=#CC6666>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=#CC6666>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
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

// Zuweisung der Fahrzeugart für Abmarsch-Reihenfolge

function GrTrFahrzeug(FZBez)
{ var ret="";
  ret = "Tr";
  if (FZBez.substr(0,3) == "LF ") ret="Gr";
  if (FZBez.substr(0,4) == "HLF ")   ret="Gr";
  if (FZBez == "Kleinlöschfahrzeug") ret="Gr";
  mylog("FZBez = " + FZBez + ", Typ=" + ret);
  return ret;
}

// Fahrzeuge Ausbildung WORK JM

function AusbFahrzeug(FZBez)
{ var ret="";
  if (FZBez == "GW-Gefahrgut") ret="Ausb";
  if (FZBez == "GW-Höhenrettung") ret="Ausb";
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
  for each (FZK in ArrFZK)
  { AnzFZK[FZK]=0;
    AnzFZKXXX[FZK]=0;
  }

  /*
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
  */

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

// Tabelle Fzg wenn 0 dann Rot, sonst Grün
  var ret = "<table border='0' style='min-width:100%;'><tr>";
  var c=0;
  for each (FZ in ArrFZK)
  {


if (Einsatzklasse=(0) == 'W' && FZ != 'Rettungsboot' && FZ !='Feuerlöschboot') continue;
  else if (Einsatzklasse=(0) != 'W' && ( FZ == 'Rettungsboot' || FZ =='Feuerlöschboot' ) ) continue;

  if (c==MAXSPALTENVERFUEGBAR) c=0, ret+="</tr><tr>";
    if (AnzFZK[FZ] == 0) ret += "<td style='border:0;text-align:center;'><font size=1><b><font color='red'>"+AnzFZK[FZ]+"</b></font></font>";

var colour;
if ( unsafeWindow.feuerwache_layout == 'light') colour='green';
else colour='lime';

    if (AnzFZK[FZ] != 0) ret += "<td style='border:0;text-align:center;'><font size=1><b><font color='"+colour+"'>"+AnzFZK[FZ]+"</b></font></font>";

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

  showInfoKlasseInListe       = GM_getValue("showInfoKlasseInListe",true);
  showInfoEinsatzNr           = GM_getValue("showInfoEinsatzNr",true);
  showInfoStichwort           = GM_getValue("showInfoStichwort",true);
  showInfoKlasse              = GM_getValue("showInfoKlasse",true);
  showInfoKlassenalarm        = GM_getValue("showInfoKlassenalarm",true);
  showInfoKlassenalarmOpt     = GM_getValue("showInfoKlassenalarmOpt",true);
  showInfoRTW                 = GM_getValue("showInfoRTW",true);
  showInfoUnterwegs           = GM_getValue("showInfoUnterwegs",true);
  showInfoNachforderungen     = GM_getValue("showInfoNachforderungen",true);
  showInfoToAlarm             = GM_getValue("showInfoToAlarm",true);
  showInfoFahrzeit            = GM_getValue("showInfoFahrzeit",true);
  showInfoFahrzeitOpt         = GM_getValue("showInfoFahrzeitOpt",true);
  showInfoNichtVerfuegbar     = GM_getValue("showInfoNichtVerfuegbar",true);
  showInfoVerfuegbar          = GM_getValue("showInfoVerfuegbar",true);
  showInfoRTWplus             = GM_getValue("showInfoRTWplus",true);
  ScriptUpdateAvailable       = GM_getValue("pleaseUpdate","");
  showInfoOptionalAnkreuzen   = GM_getValue("showInfoOptionalAnkreuzen",false);
  manv_sound    = GM_getValue("manv_sound",1);
  showInfoVerbandSound    = GM_getValue("showInfoVerbandSound",true);
  showInfoProbeSound    = GM_getValue("showInfoProbeSound",true);
  vgsl_sound    = GM_getValue("vgsl_sound",1);
  alarm_sound    = GM_getValue("alarm_sound",0);
  soundplayed                 = GM_getValue("soundplayed",''); 
}

function SetVariables()
{ mylog("SetVariables");

  GM_setValue("showInfoKlasseInListe",showInfoKlasseInListe);
  GM_setValue("showInfoEinsatzNr",showInfoEinsatzNr);
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
  GM_setValue("showInfoRTWplus",showInfoRTWplus);
  GM_setValue("showInfoOptionalAnkreuzen",showInfoOptionalAnkreuzen);
  GM_setValue("showInfoVerbandSound",showInfoVerbandSound);
  GM_setValue("showInfoProbeSound",showInfoProbeSound);
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
      url: UPDATEURLmeta,
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
  var versionArr = XML.match(/\/\/\s\@version\s*(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})/);
  if (RegExp.$1 != "")
  {
    return RegExp.$1;
  }
  return '';
}


function init()
{ ToAlarm="";
  NichtVerf="";

  mylog ("init startet");
  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  GetVariables();
  if (CHECKFORUPDATES) updateTest();
}

        


function emptySound () {
        // Die Variable, die speichert, für welchen Einsatz schon der Alarmsound gespielt werden soll muss ab und zu mal geleert werden.
        // Deswegen geschieht dies mit der Updateprüfung
        GM_setValue("soundplayed",'');
        GM_setValue("done_einsatz",'');
}

function playsound(src) {
        var footer=document.getElementById("footer");
        var sound=createElement("object",{'id':'myFlashSound','type':'application/x-shockwave-flash','data':'http://verband-hogsmeade.de/Script_Sounds/'+src+'.swf','width':'1','height':'1'});
        var param=createElement("param",{'name':'FlashVars','value':'listener=mySoundListener&amp;interval=5000'});
        var param2=createElement("param",{'name':'movie','value':'http://verband-hogsmeade.de/Script_Sounds/'+src+'.swf'});
        var param3=createElement("param",{'name':'AllowScriptAccess','value':'always'});
        var param4=createElement("param",{'name':'loop','value':'false'});
        sound.appendChild(param);
        sound.appendChild(param2);
        sound.appendChild(param3);
        sound.appendChild(param4);
        footer.appendChild(sound);

}
        var inputs=document.getElementsByTagName('table')[0].getElementsByTagName('input');
    for ( var i=0;i<inputs.length;i++) {
           inputs[i].addEventListener ( "click" , function(){GM_setValue(this.name+"_sound",this.value);} , false ) ;

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

////Bei neuer PN färben
        var div=document.getElementById('footerMessageLink');
        var span=document.getElementById('footerMessageCountUnread');
        if ( span ) div.style.backgroundColor='green';

  mylog("HREF=" + document.location.href + "\nInserted: " + e.target.innerHTML.substr(0,500));
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



function dt() { debugging = true;  }
function df() { debugging = false; }

// Zurzeit inaktiv! (Das wird erstmal auch so bleiben) 

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








