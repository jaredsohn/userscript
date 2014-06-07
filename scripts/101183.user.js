// ==UserScript==
// @name           Feuerwache.net AAO Script by Philip121296
// @namespace      
// @description    Vorschlag fuer Fahrzeuge bei Einsaetzen auf Feuerwache.net und andere Hilfen
// @include        http://www.feuerwache.net/*
// @author         Philip
// @info           Hinweis: das original Script stammt von Sawos und ist hier auch erhaeltlich
// @version        2011-04-27 10:00
// ==/UserScript==

 /*

	Wie bereits gesagt das originale Script stamm von sawos und hier erhältlich:
	http://userscripts.org/scripts/show/50002 sawos: http://userscripts.org/users/90337
	
	Hier habe ich einige Sachen geändert und nach meinen Bedürfnissen angepasst.
	Ich habe einige Einsatzklassen geändert bzw. neu eingeführt und schlage
	die Fahrzeuge etwas anders vor.
	
	Nicht immer gehe ich konform mit der Wiki auf der Seite, allerdings gibt es
	Nachforderungen, die sind sehr selten und machen daher keinen Sinn.
	Ich nutze auch keine Alternativen Vorschläge. Sprich mein Fahrzeugpark
	passt zu diesem Script. Ich habe auch einige Farben und Ausgaben geändert.
	Der wichtige Hauptteil passt allerdings zum aktuellen sawos Script.
	
	Screenshots zum Script gibt es hier unter: http://userscripts.org/scripts/show/65809
	
	Viel Spass mit meiner Version!

  FAQ:
  - kann ich meine eigene AAO sichern, damit ich nach dem Update nicht alles neu machen muss?
    kopiere unten alles zwischen "KOPIEREN AB HIER" und "KOPIEREN BIS HIER" in eine leere
    Textdatei und nach dem Update überschreibst Du damit meine Zuordnungen wieder.
    
  - kann man die Häkchen bei den Verbandeinsätzen auch standardmäßig setzen?
    -> Nein, weil im Verband seltener komplette Einsätze bearbeitet werden, sondern
       meist nur einzelne Sonder-FZ gefordert sind.

ACHTUNG 
Wenn das Script angepasst und erneut auf userscripts.org veröffentlicht wird, 
MÜSSEN die URL UPDATEURL und INSTALLURL angepasst werden. 
Wenn das angepasste Script nicht veröffentlicht wird, sondern nur privat genutzt wird, 
dann stelle die Variable CHECKFORUPDATES auf false.

WENN DU DIESEN ABSCHNITT NICHT 100% VERSTANDEN UND BEFOLGT HAST, STELLE DAS GEÄNDERTE SCRIPT NICHT ONLINE!

*/
// Anzahl der Spalten in der Verfügbar-Anzeige.
var MAXSPALTENVERFUEGBAR = 99;
// soll täglich nach einem Update des AAO-Scriptes gesucht werden?
var CHECKFORUPDATES = true;
// unter welchem URL finde ich Infos über das Script?
var UPDATEURLlink  = "http://userscripts.org/scripts/show/65809";
var UPDATEURLmeta  = "http://userscripts.org/scripts/show/65809.meta.js";
// unter welchem URL finde ich das Script als Installation?
var INSTALLURL = "http://userscripts.org/scripts/source/65809.user.js";

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

  'Auffahrunfall'               : 'F1',
  'Baum auf Auto'               : 'TH1+GWÖl',
  'Baum auf Dach'               : 'TH1+DL',
  'Baum auf Straße'             : 'F1',
  'Brand in KFZ-Werkstatt'      : 'F3+FwK',
  'Brand in Schule'             : 'F4+GWA',
  'Brand in Spedition'          : 'F4G|TUIS',
  'Brand in Sporthalle'         : 'F3+LF,GWA,GWL',
  'Brand im Sägewerk'           : 'F3+LF,GWA,GWL',
  'Brand im Supermarkt'         : 'F3+DL,FwK',
  'Brennende Bäume'             : 'F1',
  'Brennende Telefonzelle'      : 'F1',
  'Brennender LKW'              : 'F1',
  'Brennender PKW'              : 'F1',
  'Brennendes Gras'             : 'F1',
  'Chemieunfall (an Schule)'    : 'GSG|TUIS',
  'Chlorgas Alarm (Schwimmbad)' : 'GSG2|TUIS',
  'Container Brand'             : 'F1',
  'Dachstuhlbrand'              : 'F2+LF,DL',
  'Fahrstuhl - Türöffnung'      : 'TH1',
  'Fettbrand in Pommesbude'     : 'F2+TLF',
  'Feuer im Altenheim'          : 'F4+GWA',
  'Feuer im Laubhaufen'         : 'F1',
  'Gartenlaubenbrand'           : 'F1',
  'Gastronomiebrand'            : 'F3',
  'Kellerbrand'                 : 'F2',
  'Keller unter Wasser'         : 'F1',
  'Kinobrand'                   : 'F4+TLF,GWA',
  'Motorrad-Brand'              : 'F1',
  'Mülleimer Brand'             : 'F1',
  'Scheunenbrand'               : 'F3+GWL',
  'Schornsteinbrand'            : 'F2+DL',
  'Silobrand'                   : 'F3',
  'Sperrmüllbrand'              : 'F1',
  'Strohballen Brand'           : 'F2+GWL',
  'Traktorbrand'                : 'F1',
  'Verkehrsunfall'              : 'TH1+GWÖl',
  'Wohnblockbrand'              : 'F3+LF,LF,GWA',
  'Wohnungsbrand'               : 'F2',
// neue Einsatztypen (chronologisch, neuste unten (ab 28.12.2009)
  'Gewerbebrand'                : 'F4+GWA,RW',
  'Feldbrand'                   : 'LF/FLF,GWL/FLF',
  'Brand im Baumarkt'           : 'F3G',
// Einsätze neu ab 22.01.2010
  'Brennender Sicherungskasten'	: 'F1',
  'Schuppenbrand'               : 'F2+GWG,GWM',
// Nachforderung beim Schuppen, teilweise GSG (GW-G öfter als GW-M IMHO, beide optional in AAO)
  'Brennende S-Bahn'            : 'F2+GWS',
// Einsätze neu ab 08.03.2010 (zehn neue Einsätze)
  'Wohnwagenbrand'              : 'F1',
  'Brand in Briefkasten'        : 'F1',
  'Kleiner Waldbrand'           : 'F1',
  'Brennender Müllwagen'        : 'F1',
  'Ölspur'                      : 'F1+GWÖl',
  'Person im Fluss'             : 'F1+GWT',
  'Brand in Zugdepot'           : 'F4+GWL,RW,GWS',
  'Brand in Autohaus'           : 'F4+GWA,GWM',
  'Brand in Druckerei'          : 'F4+GWA,GWL,RW',
  'Brand in Lackfabrik'         : 'GSG3',
// Einsätze neu ab 29.03.2010 (drei neue Einsätze)
  'Trocknerbrand'               : 'F1',
  'Brand in Reifenlager'        : 'GSG+GWL,LF',
  'Brand im Casino'             : 'F5',
// Einsätze neu ab 23.04.2010 (zehn neue Einsätze)
  'Brennendes Gebüsch'          : 'F1',
  'Kioskbrand'                  : 'F1',
  'Garagenbrand'                : 'F2',
  'Mähdrescherbrand'            : 'F1+TLF',
  'Kaminbrand'                  : 'F1+DL',
  'PKW in Fluss'                : 'TH1+GWT,FwK',
  'Brand in Schloss'            : 'F3+DL',
  'Brand in Kühlhaus'           : 'F5G',
  'Feuer im Krankenhaus'        : 'MANV1',
  'Brand in Kletterhalle'       : 'F3+DL,GWL',
// Einsätze neu ab 23.08.2010 Flughafen - einer neu, alte mit mehr Nachforderung ?
  'Grasnarbenbrand'             : 'FF1',
// Einsätze neu ab 01.09.2010 Flughafen
  'Brennendes Flugzeug'         : 'MANV2',
// Einsätze neu ab 27.10.2010 Gärtnerei, Metzger, Eilshalle
  'Brand in Eishalle'           : 'TH2+ELW,DL,TLF,GWL', 
  'Brand in Gärtnerei'          : 'GSG+DL,LF',
  'Brand in Metzgerei'          : 'F3+DL,GWL',
// Einsatz neu 19.11.2010 (neben einigen gleichen)
  'Feuer auf Boot (Klein)'      : 'W1',
// Einsatz neu 28.11.2010
  'Feuer auf Boot (Mittel)'     : 'W2',  
// Einsatz neu 12.12.2010
  'Gabelstapler im Hafenbecken' : 'THW+FwK',  
// Einsätze neu 05.01.2011
  'Maschinenbrand'              : 'F3+GWL',
  'Brand in Gemeindehaus'       : 'F1',  
// Einsätze neu 14.02.2011
  'Tankbrand'                   : 'GSGR1',
  'Brennt Tanklager '           : 'GSGR2',
  'Brennt Tanklager'            : 'GSGR2',
  'Brand in Raffinerie'         : 'GSGR3|LF,LF',
// besondere Einsätze, nur zu bestimmten Jahreszeiten
  'Brand-Weihnachtsbaum in Kirche'  : 'F3+DL',
  'Brand auf Weihnachtsmarkt'       : 'F1',
// Verbands GSL - neu im Oktober
  'Brand in Industriepark'          : 'GSL|LF,LF,LF,LF,LF',
  'Brand in Steinbruch'             : 'GSL|LF,LF,LF,LF,LF',
// RTB Abtransport  
  'Verletztentransport'             : 'RD',
};
  
var Einsatzklasse_Fahrzeugzuordnung = {

  // hier wird definiert, welche Fahrzeuge standardmäßig zu den verschiedenen
  // Einsatzklassen geschickt werden. Einzelne Fahrzeuge werden durch Komma (,)
  // getrennt, Alternativen durch (/).
  // !!!ACHTUNG: HIER KEINE OPTIONALEN FAHRZEUGE (|) EINTRAGEN!!!
  'undef'    :  'LF',
  'WATCH'    :  'LF,LF,LF',
  
  'RD'       :  'RTW',
// zu undef = unbekannten Einsatzen wird per Default jetzt ein LF geschickt
  'W1'       :  'LB',
  'W2'       :  'LB,LB',
  'THW'      :  'LF,RW,GWT',
  'F1'       :  'LF',
  'F2'       :  'LF,LF',
  'F3'       :  'LF,LF,LF,ELW',
  'F4'       :  'LF,LF,LF,LF,DL,ELW',
  'F3G'      :  'LF,LF,LF,LF,ELW,RW,GWM,GWG,GWA',
  'F4G'      :  'LF,LF,LF,LF,ELW,DL,RW,TLF,GWM,GWG,GWL',
  'F5'       :  'LF,LF,LF,LF,LF,DL,ELW,TLF,GWA,GWL',
  'F5G'      :  'LF,LF,LF,LF,LF,DL,ELW,GWL,GWG,GWM',
  'TH1'      :  'RW,LF',
  'TH2'      :  'RW,LF,LF',
  'GSG'      :  'LF,LF,ELW,GWM,GWG',
  'GSG2'     :  'LF,LF,ELW,GWM,GWG,RW',
  'GSG3'     :  'LF,LF,LF,LF,LF,ELW,DL,GWA,GWM,GWG', 

  'GSGR1'    :  'LF,LF,LF,LF,LF,RW,ELW,GWÖl,GWL,TUIS',
  'GSGR2'    :  'LF,LF,LF,LF,LF,RW,ELW,GWM,GWL,GWÖl,TUIS',
  'GSGR3'    :  'LF,LF,LF,LF,LF,RW,ELW,GWG,GWM,DL,GWL,TLF,FwK,TUIS',
  
  'MANV1'     :  'LF,LF,LF,LF,LF,ELW,GWL,RW,GWM,GWG,GWA',
  'MANV2'    :  'FLF,FLF,FLF,FLF,FLF,FLF,FLF,RTr,GWM,GWG,GWÖl,ELW,RW',
  'FF1'      :  'FLF,FLF/LF',
  'GSL'      :  'LF,LF,LF,LF,LF,LF,LF,LF,LF,LF',
};

//
// usually no need to change anything below this line
//

var Fahrzeugklassen = {
  // hier die verfügbaren Fahrzeugen mit ihrer Beschreibung und der Zuordnung 
  // zu einer Fahrzeugklasse auflisten. Fahrzeuge, die ihr eigener Typ sind 
  // (z.B. "RTW") brauchen hier nicht aufgeführt werden. (sie schaden aber auch nicht)
  'LF 20/16'                :   'LF'        ,
  'ELW 1'                   :   'ELW'       ,
  'DLA (K) 23/12'           :   'DL'        ,
  'TLF 20/40 - SL'          :   'TLF'       ,
  'GW-A'                    :   'GWA'       ,
  'GW-L2 - Wasser'          :   'GWL'       ,
  'GW-Öl'                   :   'GWÖl'      ,
  'RW'                      :   'RW'        ,
  'LF 16-TS'                :   'LF'        ,
  'LF 10/6'                 :   'LF'        ,
  'LF 8'                    :   'LF'        ,
  'HLF 20/16'               :   'LF'        ,
  'HLF 10/6'                :   'LF'        ,
  'Kleinlöschfahrzeug'      :   'LF'        ,
  'GW-Messtechnik'          :   'GWM'       ,
  'GW-Gefahrgut'            :   'GWG'       ,
  'GW-Schiene'              :   'GWS'       ,
  'GW-Taucher'              :   'GWT'       ,
  'Kran'                    :   'FwK'       ,
  'Flugfeldlöschfahrzeug'   :   'FLF'       ,
  'Rettungstreppe'          :   'RTr'       ,
  'GW-TUIS'                 :   'TUIS'      ,
  'Feuerlöschboot'          :   'LB'        ,
  'Rettungsboot'            :   'RTB'       ,
  'RTW'                     :   'RTW'       ,
};

var Fahrzeuggeschwindigkeiten = {
  'RTW'                   :   75     ,
  'LF 10/6'               :   58     ,
  'LF 20/16'              :   60     ,
  'LF 8'                  :   48     ,
  'Kleinlöschfahrzeug'    :   60     ,
  'TLF 20/40 - SL'        :   49     ,
  'DLA (K) 23/12'         :   63     ,
  'ELW 1'                 :   77     ,
  'LF 16-TS'              :   52     ,
  'RW'                    :   49     ,
  'GW-A'                  :   56     ,
  'GW-L2 - Wasser'        :   53     ,
  'GW-Öl'                 :   51     ,
  'GW-Schiene'            :   57     ,
  'GW-Gefahrgut'          :   46     ,
  'GW-Messtechnik'        :   40     ,
  'GW-Taucher'            :   62     ,
  'Kran'                  :   55     ,
  'Flugfeldlöschfahrzeug' :   110    ,  
  'Rettungstreppe'        :   65     ,
  'Feuerlöschboot'        :   60     ,
  'Rettungsboot'          :   60     ,
  'HLF 20/16'             :   60     ,
  'HLF 10/6'              :   58     ,
  'GW-TUIS'               :   73     ,
};

var Nachforderungen = {
  "Hier muss Wasser über weite Wegstrecken transportiert werden. Wir benötigen einen GW-L2 Wasser." : "GWL",
  "Das Feuer ist weiter ausserhalb und alle Wasserreserven sind aufgebraucht. Wir brauchen einen GW-L2 -Wasser um weitere Schläuche verlegen zu können." : "GWL",
  "Um Leitungen über weite Strecken legen zu können, benötigen wir einen GW - L2 - Wasser." : "GWL",
  "Wir müssen Wasser über eine weite Wegstrecke transporierten und benötigen einen GW-L2 Wasser" : "GWL",
  
  "Es könnten gifftige Dämpfe austreten! Wir benötigen einen GW-Messtechnick" : "GWM"
  };


var Strassennamen = new Array(
  //
  // Hier die Strassennamen festlegen, 
  // WICHTIG:
  // MINDESTENS 99 Straßen eintragen
  // MAXMIMAL 999 Strassen eintragen !!!!!
  //
'Am Güterbahnhof','Am Flughafen', 'Hafenstraße', 'An der Raffinerie', 'Sperrgebiet','Drei-Besen-Straße', 'Gründer-Axel-Straße', 'Verbandsautobahn', 'Straße der Freundschaft', 'Straße zum Therapiezentrum', 'Winkelgasse', 'Hexenallee', 
'Zauberweg', 'Co-Amtsleiter Platz', 'Co-Vobu2002 Gasse', 'Co-Haifi Garten', 'Co-FeuerwehrKaimt Straße', 'Co-Kampi1711 Schlucht',
'Co-Tatelot Berg', 'Co-Owen Weg', 'Muggelweg', 'Snape-Gasse', 'Joanne-K.-Rowling-Ehrenallee', 'Dumbledore-Gedächtnis-Allee', 'Professor-Flitwick-Weg', 
'Hausmeister-Filch-Gasse', 'Straße zum Hagrid-Hügel', 'Professor-Lockhart-Straße', 'Lupin-Gasse', 'Werwolf-Weg', 'Professor-Moody-Weg', 
'Horace-Slughorn-Weg', 'Madame-Pomfrey-Feld', 'Professor-Sprout-Gasse', 'Sybill-Trelawney-Denkerweg', 'Dolores-Umbridge-Schmerzstraße', 
'Dobby’s Weg', 'Ligusterweg', 'Ministeriumweg', 'Little-Whinging-Straße', 'Harry-Potter-Allee', 'Meikes Eispalast', 
'Lord-Voldemort-Hass-Straße', 'Horcrux-Straße', 'Lucius-Malfoy-Gasse', 'Straße-Des-Brotes', 
'Landwirtschaftsweg', 'Hogsmeadeallee', 'Hermine-Granger-Weg', 'Am Hagrid-Hügel', 'Ronald-Weasley-Straße', 
'Professor-McGonnagall-Allee', 'Professor-Quirrel-Weg', 'Professor-Raue-Pritsche-Gasse', 'Professor-Binns-Weg', 'Professor-Hooch-Straße', 
'Professor-Dippet-Weg', 'Bibliothekarin-Pince-Gasse', 'Godric-Gryffindor-Allee', 'Helga-Hufflepuff-Allee', 'Rowena-Ravenclaw-Allee', 
'Salazar-Slytherin-Allee', 'Draco-Malfoy-Gasse', 'Vincent-Crabbe-Weg', 'Gregory-Goyle-Straße', 'Pansy-Parkinson-Weg', 'Katie-Bell-Gasse', 
'Lavender-Brown-Straße', 'Collin-Creevey-Weg', 'Dennis-Creevey-Gasse', 'Seamus-Finnigan-Straße', 'Angelina-Johnson-Weg', 
'Neville-Longbottom-Tanzgasse ', 'Cormac-McLaggen-Straße', 'Parvati-Patil-Weg', 'Dean-Thomas-Gasse', 'Ginny-Weasley-Straße', 'Fred-Weasley-Weg', 
'George-Weasley-Gasse', 'Lee-Jordan-Straße', 'Percy-Weasley-Weg', 'Oliver-Wood-Gasse', 'Cho-Chang-Straße', 'Luna-Lovegoods-Traumweg', 
'Padma-Patil-Platz', 'Hannah-Abbot-Weg', 'Cedric-Diggory-Gedenkstraße', 'Justin-Finch-Fletchley-Platz', 'Ernie-McMillan-Weg', 
'Viktor-Krum-Flugplatz', 'An Fleur-Delacours-Schönheitsfarm', 'Sirius-Black-Straße', 'Regulus-Black-Weg', 'Bellatrix-Lestrange-Gasse', 
'Narzissa-Malfoy-Platz', 'Nymphadora-Tonks-Straße', 'Aberforth-Dumbledore-Weg', 'Percival-Dumbledore-Platz', 'Kendra-Dumbledore-Gasse', 
'Ariana-Dumbledore-Straße', 'Gindelwald-Weg', 'Frank-Longbottom-Platz', 'Alice-Longbottom-Straße', 'Algie-Longbottom-Weg', 
'Enid-Longbottom-Gasse', 'James-Potter-Allee', 'Lily-Potter-Ehrenplatz', 'Arthur-Weasley-Straße', 'Molly-Weasley-Weg', 'Bill-Weasley-Gasse', 
'Charlie-Weasley-Straße', 'Muriel-Weasley-Weg', 'Straße am Fuchsbau', 'Nokturngasse', 'Straße zum Tropfenden Kessel', 
'Ollivander’s Zauberstaballee', 'Flohpulverallee', 'Grimmauldplatz', 'Straße am verbotenen Wald', 'Zum Honigtopf', 'An der Heulenden Hütte', 
'Beim Postamt', 'Weg am See', 'Straße der Weisen', 'Zum Eberkopf', 'Zonkos Scherzartikelstraße', 'Koboldallee', 'Gringotts Verliesstraße', 
'King’s Cross', 'Arabella-Figg-Weg', 'Mundungus-Fletcher-Gasse', 'Kingsley-Shacklebolt-Platz', 'Todesser-Allee', 'Cornelius-Fudge-Weg', 
'Rufus-Scrimgeaour-Straße', 'Bartemius-Crouch-Senior-Platz', 'Ludo-Bagman-Gasse', 'Vorlost-Gaunt-Allee', 'Morfin-Gaunt-Weg', 
'Merope-Gaunt-Straße', 'Madame-Rosmerta-Platz', 'Olympe-Maxime-Gasse', 'Rita-Kimmkorn-Quasselraum', 'Xenophilius-Lovegood-Wald', 
'Bthilda-Bagshot-Weg', 'Dudley-Dursley-Futterplatz', 'Vernon-Dursley-Schreigasse', 'Petunia-Dursley-Feld', 'Magnolienring', 'Spinners End', 
'Vauxhall Road', 'Magda-Dursley-Flugplatz', 'Geisterallee', 'Blutige-Baronstraße', 'Die Graue-Damen-Straße', 'Peeves’-Polterecke', 
'Myrtes-Maulweg', 'Dementorgasse', 'Goldregenweg', 'Sprechender-Hut-Allee', 'Zentaur-Straße', 'Koboldplatz', 'Melderweg', 
'Leitstellengasse', 'Feuerplatz', 'Gryffindor-Allee', 'Hufflepuff-Allee', 'Ravenclaw-Allee', 'Slytherin-Allee', 
'Weg zum Schulleiterbüro', 'Wasserspeierstraße', 'Brandstraße', 'Godric’s-Hollow-Straße', 'Schlacht-um-Hogwarts-Straße', 
'Gemeinschaftsraumstraße-Gryffindor', 'Gemeinschaftsraumstraße-Hufflepuff', 'Gemeinschaftsraumstraße-Ravenclaw', 
'Gemeinschaftsraumstraße-Slytherin', 'Große-Halle-Weg', 'U-Bahn-Station-Straße', 'Einsatzallee', 'Hilfeleistungsweg', 
'Rettungsgasse', 'Rätselstraße', 'An der heulenden Hütte', 'Küchenweg von Hogwarts', 'Anleitungsgasse', 
'Scriptweg', 'An der bösen Wunschfee', 'I’m-With-Stupid-Straße', 'Bierweg', 'Rauchergasse', 'Weg zur Kammer des Schreckens', 
'Straße zu Madame Puddifoot’s', 'Gasse zu Flourish und Blotts', 'Madam-Malkin-Platz', 'Platz der Zauberscherze', 'Eeylopweg', 
'Weg zur magischen Tierhandlung', 'Borgin-und-Burkesweg', 'Zur Ministeriumszentrale', 'Zur Magischen Strafverfolgung', 
'Zum Büro gegen Missbrauch von Magie', 'Zur Aurorenzentrale', 'Zum Zaubergamot-Verwaltungsdienst', 
'Zum Büro gegen den Missbrauch von Muggelartefakten', 'Weg der Magischen Unfälle und Katastrophen', 
'Zum Kommando für die Umkehr verunglückter Magie', 'Zur Vergissmich-Zentrale', 'Zum Komitee für Muggelgerechte Entschuldigungen', 
'Zur Führung und Aufsicht Magischer Geschöpfe', 'Zur Tierwesen-, Zauberwesen- und Geisterbehörde', 'Zum Koboldverbindungsbüro', 
'Zum Seuchenberatungsbüro', 'Platz der Internationalen Magischen Zusammenarbeit', 'Zum Internationalen Magischen Handelsstandardausschuss', 
'Zum Internationalen Büro für Magisches Recht', 'Zur Britischen Sektion der Internationalen Zauberervereinigung', 
'Zum Magischen Transportwesen', 'Zur Flohnetzwerkaufsicht', 'Zum Besenregulationskontrollamt', 'Zum Portschlüsselbüro', 
'Zum Appariertestzentrum', 'Zu den Magischen Spielen und Sportarten', 'Zur Zentrale der Britischen und Irischen Quidditch-Liga', 
'Zum Offiziellen Koboldstein-Klub', 'Zum Büro für Lächerliche Patente', 'Zur Empfangshalle', 'Zur Mysteriumsabteilung', 
'Zur Halle der Prophezeiungen', 'Zum Raum des Todes', 'Zum Raum der Zeit', 'Zum Raum der Gedanken', 'Zum Raum der Liebe', 
'Zu den Gerichtssälen', 'Zum Zaubergamot', 'Weg nach Askaban', 'Weg zum Fuchsbau', 'Little-Hangeton-Straße', 'Nurmengard-Straße', 
'Zum Raum der Wünsche', 'Igor-Karkaroff-Straße', 'Albus-Dumbledore-Weg', 'Harry-Potter-Und-Der-Stein-Der-Weisen-Straße', 
'Harry-Potter-Und-Die-Kammer-Des-Schreckens-Weg', 'Harry-Potter-Und-Der-Gefangene-Von-Askaban-Gasse', 'Harry-Potter-Und-Der-Feuerkelch-Platz', 
'Harry-Potter-Und-Der-Orden-Des-Phönix-Straße', 'Harry-Potter-Und-Der-Halbblutprinz-Weg', 'Harry-Potter-Und-Die-Heiligtümer-Des-Todes-Gasse', 
'Ölspur-Straße', 'Hedwig-Allee', 'Fluffy-Weg', 'Geraldine-Agnew-Sommerville-Straße', 'Chase-Armitage-Weg', 'Robert-Ayres-Gasse', 'Allee zum heiligen Axel',
'Afshad-Ayres-Allee', 'Daisy-Bates-Weg', 'MasterJM Platz', 'Co-Feuerwehrfrau1987 Tal', 'Rettungsweg', 'TeamSpeak Arena', 'Zum Bahnhof des Hogwarts-Express',
'Du-weißt-schon-wer-Hass-Weg', 'Milchstraße', 'Milchstraße', 'Du-weißt-schon-wer-Hass-Weg', 'Zum Bahnhof des Hogwarts-Express', 'TeamSpeak Arena', 'Rettungsweg', 'Co-Backie See', 'MasterJM Platz', 
'Daisy-Bates-Weg', 'Afshad-Ayres-Allee', 'Allee zum heiligen Axel', 'Robert-Ayres-Gasse', 'Chase-Armitage-Weg', 'Geraldine-Agnew-Sommerville-Straße', 
'Fluffy-Weg', 'Hedwig-Allee', 'Ölspur-Straße', 'Harry-Potter-Und-Die-Heiligtümer-Des-Todes-Gasse', 'Harry-Potter-Und-Der-Halbblutprinz-Weg', 
'Harry-Potter-Und-Der-Orden-Des-Phönix-Straße', 'Harry-Potter-Und-Der-Feuerkelch-Platz', 'Harry-Potter-Und-Der-Gefangene-Von-Askaban-Gasse', 
'Harry-Potter-Und-Die-Kammer-Des-Schreckens-Weg', 'Harry-Potter-Und-Der-Stein-Der-Weisen-Straße', 'Albus-Dumbledore-Weg', 'Igor-Karkaroff-Straße', 
'Zum Raum der Wünsche', 'Nurmengard-Straße', 'Little-Hangeton-Straße', 'Weg zum Fuchsbau', 'Weg nach Askaban', 'Zum Zaubergamot', 'Zu den Gerichtssälen', 
'Zum Raum der Liebe', 'Zum Raum der Gedanken', 'Zum Raum der Zeit', 'Zum Raum des Todes', 'Zur Halle der Prophezeiungen', 'Zur Mysteriumsabteilung', 
'Zur Empfangshalle', 'Zum Büro für Lächerliche Patente', 'Zum Offiziellen Koboldstein-Klub', 'Zur Zentrale der Britischen und Irischen Quidditch-Liga', 
'Zu den Magischen Spielen und Sportarten', 'Zum Appariertestzentrum', 'Zum Portschlüsselbüro', 'Zum Besenregulationskontrollamt', 'Zur Flohnetzwerkaufsicht', 
'Zum Magischen Transportwesen', 'Zur Britischen Sektion der Internationalen Zauberervereinigung', 'Zum Internationalen Büro für Magisches Recht', 
'Zum Internationalen Magischen Handelsstandardausschuss', 'Platz der Internationalen Magischen Zusammenarbeit', 'Zum Seuchenberatungsbüro', 
'Zum Koboldverbindungsbüro', 'Zur Tierwesen-, Zauberwesen- und Geisterbehörde', 'Zur Führung und Aufsicht Magischer Geschöpfe', 
'Zum Komitee für Muggelgerechte Entschuldigungen', 'Zur Vergissmich-Zentrale', 'Zum Kommando für die Umkehr verunglückter Magie', 
'Weg der Magischen Unfälle und Katastrophen', 'Zum Büro gegen den Missbrauch von Muggelartefakten', 'Zum Zaubergamot-Verwaltungsdienst', 'Zur Aurorenzentrale', 
'Zum Büro gegen Missbrauch von Magie', 'Zur Magischen Strafverfolgung', 'Zur Ministeriumszentrale', 'Borgin-und-Burkesweg', 'Weg zur magischen Tierhandlung', 
'Eeylopweg', 'Platz der Zauberscherze', 'Madam-Malkin-Platz', 'Gasse zu Flourish und Blotts', 'Straße zu Madame Puddifoot’s', 'Weg zur Kammer des Schreckens', 
'Rauchergasse', 'Bierweg', 'I’m-With-Stupid-Straße', 'An der bösen Wunschfee', 'Scriptweg', 'Anleitungsgasse', 'Küchenweg von Hogwarts', 'An der heulenden Hütte', 
'Rätselstraße', 'Rettungsgasse', 'Hilfeleistungsweg', 'Hilfeleistungsweg', 'Einsatzallee', 'U-Bahn-Station-Straße', 'Große-Halle-Weg', 'Gemeinschaftsraumstraße-Slytherin', 'Gemeinschaftsraumstraße-Ravenclaw', 'Gemeinschaftsraumstraße-Hufflepuff', 'Gemeinschaftsraumstraße-Gryffindor', 
'Schlacht-um-Hogwarts-Straße', 'Godric’s-Hollow-Straße', 'Brandstraße', 'Wasserspeierstraße', 'Weg zum Schulleiterbüro', 'Slytherin-Allee', 'Ravenclaw-Allee', 
'Hufflepuff-Allee', 'Gryffindor-Allee', 'Feuerplatz', 'Leitstellengasse', 'Melderweg', 'Koboldplatz', 'Zentaur-Straße', 'Sprechender-Hut-Allee', 'Goldregenweg', 
'Dementorgasse', 'Myrtes-Maulweg', 'Peeves’-Polterecke', 'Die Graue-Damen-Straße', 'Blutige-Baronstraße', 'Geisterallee', 'Magda-Dursley-Flugplatz', 'Vauxhall Road', 
'Spinners End', 'Magnolienring', 'Petunia-Dursley-Feld', 'Vernon-Dursley-Schreigasse', 'Dudley-Dursley-Futterplatz', 'Bthilda-Bagshot-Weg', 
'Xenophilius-Lovegood-Wald', 'Rita-Kimmkorn-Quasselraum', 'Olympe-Maxime-Gasse', 'Madame-Rosmerta-Platz', 'Merope-Gaunt-Straße', 'Morfin-Gaunt-Weg', 
'Vorlost-Gaunt-Allee', 'Ludo-Bagman-Gasse', 'Bartemius-Crouch-Senior-Platz', 'Rufus-Scrimgeaour-Straße', 'Cornelius-Fudge-Weg', 'Todesser-Allee', 
'Kingsley-Shacklebolt-Platz', 'Mundungus-Fletcher-Gasse', 'Arabella-Figg-Weg', 'King’s Cross', 'Gringotts Verliesstraße', 'Koboldallee', 'Zonkos Scherzartikelstraße', 
'Zum Eberkopf', 'Straße der Weisen', 'Weg am See', 'Beim Postamt', 'An der Heulenden Hütte', 'Zum Honigtopf', 'Straße am verbotenen Wald', 'Grimmauldplatz', 
'Flohpulverallee', 'Ollivander’s Zauberstaballee', 'Straße zum Tropfenden Kessel', 'Nokturngasse', 'Straße am Fuchsbau', 'Muriel-Weasley-Weg', 
'Charlie-Weasley-Straße', 'Bill-Weasley-Gasse', 'Molly-Weasley-Weg', 'Arthur-Weasley-Straße', 'Lily-Potter-Ehrenplatz', 'James-Potter-Allee', 'Enid-Longbottom-Gasse', 
'Algie-Longbottom-Weg', 'Alice-Longbottom-Straße', 'Frank-Longbottom-Platz', 'Gindelwald-Weg', 'Ariana-Dumbledore-Straße', 'Kendra-Dumbledore-Gasse', 
'Percival-Dumbledore-Platz', 'Aberforth-Dumbledore-Weg', 'Nymphadora-Tonks-Straße', 'Narzissa-Malfoy-Platz', 'Bellatrix-Lestrange-Gasse', 'Regulus-Black-Weg', 
'Sirius-Black-Straße', 'An Fleur-Delacours-Schönheitsfarm', 'Viktor-Krum-Flugplatz', 'Ernie-McMillan-Weg', 'Justin-Finch-Fletchley-Platz', 
'Cedric-Diggory-Gedenkstraße', 'Hannah-Abbot-Weg', 'Padma-Patil-Platz', 'Luna-Lovegoods-Traumweg', 'Cho-Chang-Straße', 'Oliver-Wood-Gasse', 'Percy-Weasley-Weg', 
'Lee-Jordan-Straße', 'George-Weasley-Gasse', 'Fred-Weasley-Weg', 'Ginny-Weasley-Straße', 'Dean-Thomas-Gasse', 'Parvati-Patil-Weg', 'Cormac-McLaggen-Straße', 
'Neville-Longbottom-Tanzgasse ', 'Angelina-Johnson-Weg', 'Seamus-Finnigan-Straße', 'Dennis-Creevey-Gasse', 'Collin-Creevey-Weg', 'Lavender-Brown-Straße', 
'Katie-Bell-Gasse', 'Pansy-Parkinson-Weg', 'Gregory-Goyle-Straße', 'Vincent-Crabbe-Weg', 'Draco-Malfoy-Gasse', 'Salazar-Slytherin-Allee', 'Rowena-Ravenclaw-Allee', 
'Helga-Hufflepuff-Allee', 'Godric-Gryffindor-Allee', 'Bibliothekarin-Pince-Gasse', 'Professor-Dippet-Weg', 'Professor-Hooch-Straße', 'Professor-Binns-Weg', 
'Professor-Raue-Pritsche-Gasse', 'Professor-Quirrel-Weg', 'Professor-McGonnagall-Allee', 'Ronald-Weasley-Straße', 'Am Hagrid-Hügel', 'Hermine-Granger-Weg', 
'Hogsmeadeallee', 'Landwirtschaftsweg', 'Straße-Des-Brotes', 'Lucius-Malfoy-Gasse', 'Horcrux-Straße', 'Lord-Voldemort-Hass-Straße', 'Harry-Potter-Allee', 
'Little-Whinging-Straße', 'Ministeriumweg', 'Ligusterweg', 'Dobby’s Weg', 'Dolores-Umbridge-Schmerzstraße', 'Sybill-Trelawney-Denkerweg', 'Professor-Sprout-Gasse', 
'Madame-Pomfrey-Feld', 'Horace-Slughorn-Weg', 'Professor-Moody-Weg', 'Werwolf-Weg', 'Lupin-Gasse', 'Professor-Lockhart-Straße', 'Straße zum Hagrid-Hügel', 
'Hausmeister-Filch-Gasse', 'Professor-Flitwick-Weg', 'Dumbledore-Gedächtnis-Allee', 'Joanne-K.-Rowling-Ehrenallee', 'Snape-Gasse', 'Muggelweg', 'Co-Owen Weg', 
'Co-Tatelot Berg', 'Co-Kampi1711 Schlucht', 'Co-FeuerwehrKaimt Straße', 'Co-Haifi Garten', 'Co-Vobu2002 Gasse', 'Co-Amtsleiter Platz', 'Zauberweg', 'Hexenallee', 
'Winkelgasse', 'Straße zum Therapiezentrum', 'Straße der Freundschaft', 'Verbandsautobahn', 'Gründer-Axel-Straße', 'Drei-Besen-Straße','Meikes Eispalast'


};

var WikiLinks = {
  'Auffahrunfall'               : 'http://wiki.feuerwache.net/wiki/Auffahrunfall',
  'Baum auf Auto'               : 'http://wiki.feuerwache.net/wiki/Baum_auf_Auto',
  'Baum auf Dach'               : 'http://wiki.feuerwache.net/wiki/Baum_auf_Dach',
  'Baum auf Straße'             : 'http://wiki.feuerwache.net/wiki/Baum_auf_Stra%C3%9Fe',
  'Brand im Baumarkt'           : 'http://wiki.feuerwache.net/wiki/Brand_im_Baumarkt',
  'Brand in KFZ-Werkstatt'      : 'http://wiki.feuerwache.net/wiki/Brand_in_KFZ-Werkstatt',
  'Brand im Sägewerk'           : 'http://wiki.feuerwache.net/wiki/Brand_im_S%C3%A4gewerk',
  'Brand im Supermarkt'         : 'http://wiki.feuerwache.net/wiki/Brand_im_Supermarkt',
  'Brand in Schule'             : 'http://wiki.feuerwache.net/wiki/Brand_in_Schule',
  'Brand in Spedition'          : 'http://wiki.feuerwache.net/wiki/Brand_in_Spedition',
  'Brand in Sporthalle'         : 'http://wiki.feuerwache.net/wiki/Brand_in_Sporthalle',
  'Brennende Bäume'             : 'http://wiki.feuerwache.net/wiki/Brennende_B%C3%A4ume',
  'Brennende Telefonzelle'      : 'http://wiki.feuerwache.net/wiki/Brennende_Telefonzelle',
  'Brennender LKW'              : 'http://wiki.feuerwache.net/wiki/Brennender_LKW',
  'Brennender PKW'              : 'http://wiki.feuerwache.net/wiki/Brennender_PKW',
  'Brennendes Gras'             : 'http://wiki.feuerwache.net/wiki/Brennendes_Gras',
  'Chemieunfall (an Schule)'    : 'http://wiki.feuerwache.net/wiki/Chemieunfall_%28an_Schule%29',
  'Chlorgas Alarm (Schwimmbad)' : 'http://wiki.feuerwache.net/wiki/Chlorgas_Alarm_%28Schwimmbad%29',
  'Container Brand'             : 'http://wiki.feuerwache.net/wiki/Containerbrand',
  'Dachstuhlbrand'              : 'http://wiki.feuerwache.net/wiki/Dachstuhlbrand',
  'Fahrstuhl - Türöffnung'      : 'http://wiki.feuerwache.net/wiki/Fahrstuhl-T%C3%BCr%C3%B6ffnung',
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
  'Mülleimer Brand'             : 'http://wiki.feuerwache.net/wiki/M%C3%BClleimerbrand',
  'Scheunenbrand'               : 'http://wiki.feuerwache.net/wiki/Scheunenbrand',
  'Schornsteinbrand'            : 'http://wiki.feuerwache.net/wiki/Schornsteinbrand',
  'Silobrand'                   : 'http://wiki.feuerwache.net/wiki/Silobrand',
  'Sperrmüllbrand'              : 'http://wiki.feuerwache.net/wiki/Sperrm%C3%BCllbrand',
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
  'Brennender Müllwagen'        : 'http://wiki.feuerwache.net/wiki/Brennender_M%C3%BCllwagen',
  'Ölspur'                      : 'http://wiki.feuerwache.net/wiki/%C3%96lspur',
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
  'Brennendes Gebüsch'          : 'http://wiki.feuerwache.net/wiki/Brennendes_Geb%C3%BCsch',
  'Kioskbrand'                  : 'http://wiki.feuerwache.net/wiki/Kioskbrand',
  'Garagenbrand'                : 'http://wiki.feuerwache.net/wiki/Garagenbrand',
  'Mähdrescherbrand'            : 'http://wiki.feuerwache.net/wiki/M%C3%A4hdrescherbrand',
  'Kaminbrand'                  : 'http://wiki.feuerwache.net/wiki/Kaminbrand',
  'PKW in Fluss'                : 'http://wiki.feuerwache.net/wiki/PKW_in_Fluss',
  'Brand in Schloss'            : 'http://wiki.feuerwache.net/wiki/Brand_in_Schloss',
  'Brand in Kühlhaus'           : 'http://wiki.feuerwache.net/wiki/Brand_in_K%C3%BChlhaus',
  'Feuer im Krankenhaus'        : 'http://wiki.feuerwache.net/wiki/Feuer_im_Krankenhaus',
  'Brand in Kletterhalle'       : 'http://wiki.feuerwache.net/wiki/Brand_in_Kletterhalle',
//neu 23.08.2010  
  'Grasnarbenbrand'             : 'http://wiki.feuerwache.net/wiki/Grasnarbenbrand',
//neu 01.09.2010  
  'Brennendes Flugzeug'         : 'http://wiki.feuerwache.net/wiki/Brennendes_Flugzeug',
// Einsätze neu ab 27.10.2010 Gärtnerei, Metzger, Eilshalle
  'Brand in Gärtnerei'          : 'http://wiki.feuerwache.net/wiki/Brand_in_G%C3%A4rtnerei',
  'Brand in Eishalle'           : 'http://wiki.feuerwache.net/wiki/Brand_in_Eishalle',
  'Brand in Metzgerei'          : 'http://wiki.feuerwache.net/wiki/Brand_in_Metzgerei',
// Einsatz neu 19.11.2010 Boot Klein
  'Boot (Klein)'                : 'http://wiki.feuerwache.net/wiki/Boot_%28Klein%29',
// Einsatz neu 28.11.2010 Boot Mittel
  'Boot (Klein)'                : 'http://wiki.feuerwache.net/wiki/Boot_%28Mittel%29',
// Einsatz neu 12.21.2010 
  'Gabelstapler im Hafenbecken' : 'http://wiki.feuerwache.net/wiki/Gabelstapler_im_Hafenbecken',
// Einsätze neu 05.01.2011
  'Brand in Gemeindehaus'       : 'http://wiki.feuerwache.net/wiki/Brand_in_Gemeindehaus',
  'Maschinenbrand'              : 'http://wiki.feuerwache.net/wiki/Maschinenbrand', 
// Verbands GSL
  'Brand in Industriepark'      : 'http://wiki.feuerwache.net/wiki/Brand_in_Industriepark',  
  'Brand in Steinbruch'         : 'http://wiki.feuerwache.net/wiki/Brand_in_Steinbruch',
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
var AlleGleich;
var showInfoRTWplus;
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
  else if (adr.match("http://www.feuerwache.net/event_logfile/*"))
  { bearbeiteLogFile(); }

  ichBins = false;
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
	  ret += "<tr><th>Fehleinsätze</th><td><font color='yellow'><b>" + AnzFehl + "</b></font></td></tr>\n";
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
    if (parseInt(H1) != parseInt(H2)) H = "<font color='yellow'>"+H+"</font>";
    H = "<a href='" + L + "/feuerwehrautos'>" + H + "</a>";
    TD.innerHTML = H;

    // Spalte Rettungswagen
    TD = TR.getElementsByTagName("td")[4];
    H = TD.innerHTML;
    H2 = H.split("/");
    if (parseInt(H2[0]) != parseInt(H2[1])) H = "<font color='yellow'>"+H+"</font>";
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
// WORK JM    
    var H2 = H2s[i];
    var A  = H2.getElementsByTagName("a")[1];
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
    
    if (gefS1[FZNamei]==0)  gefS1[FZNamei] = "<font color='#666666'>0</font>";
    if (gefS2[FZNamei]==0)  gefS2[FZNamei] = "<font color='#666666'>0</font>";
    if (gefS3[FZNamei]==0)  gefS3[FZNamei] = "<font color='#666666'>0</font>";
    if (gefS4[FZNamei]==0)  gefS4[FZNamei] = "<font color='#666666'>0</font>";
    if (gefS6[FZNamei]==0)  gefS6[FZNamei] = "<font color='#666666'>0</font>";
    if (gefS6a[FZNamei]==0) gefS6a[FZNamei] = "";
    if (gefS7[FZNamei]==0)  gefS7[FZNamei] = "<font color='#666666'>0</font>";

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
  nodeA.appendChild(document.createTextNode('Toggle: Defekte Fahrzeuge nach Zustand auflisten'));
  NewDiv.appendChild(nodeA);
  NewDiv.appendChild(createElement('br'));
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
  InfotextFahrzeitopt="";
  InfotextNichtVerfuegbar="";
  InfotextVerfuegbar="";

  // verfügbare FZ zählen
  if (showInfoVerfuegbar) InfotextVerfuegbar = zaehleVerfuegbar();
  
  // im Verbandseinsatz die Checkbox per default NICHT anhaken, sonst schon
  if (document.getElementById("machVorschlag") == undefined) machVorschlag = !Verbandseinsatz();
  
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
    // Option mehr RTWs als Verletzte bei der Alarmierung
    if (Einsatzklasse == 'RD') { 
    	V = 0;
    }
    if (showInfoRTWplus) { 
    	V++; 
    	if (Einsatzklasse == 'RD') { V = 1; }
    }
    // -> (einen RTW mehr schicken)
    // Wassereinsatz ?
    var Buchstabe = Einsatzklasse.charAt(0);
    //dt();mylog(Buchstabe);df();
    if (Buchstabe == 'W') { 
    	if (showInfoRTWplus) { V--; }
    }
    //dt();mylog(V);df();
   	while (V>0) { 
   		if (Buchstabe == 'W') { ToAlarm.push("RTB"); }
   		if (Buchstabe != 'W') { ToAlarm.push("RTW"); }
   		V--; 
   	}
  }
  
  // bereits eingebundene Fahrzeuge ermitteln
  FillUnterwegsListe();

  // Diese Unterwegs-Fahrzeuge auflisten...
  if (Unterwegs.length>0)
  { if (showInfoUnterwegs) 
    { if (AmOrt.length) InfotextUnterwegs += "am Ort: <font color='green'>" + AmOrt.toString() + "</font><br>";
      if (AufAnfahrt.length) InfotextUnterwegs += "auf Anfahrt: <font color='orange'>" + AufAnfahrt.toString() + "</font><br>";
      if (Wartend.length) InfotextUnterwegs += "wartend: <font color='brown'>" + Wartend.toString() + "</font><br>";
      InfotextUnterwegs = InfotextUnterwegs.substr(0,InfotextUnterwegs.length-2);
    }
  }

  // ToAlarm um die FZ kürzen, die bereits unterwegs sind
  // sowie die Reihenfolge anpassen, dass Alternativen am Ende stehen
  bereinigeToAlarm();
  
  // Nachforderungen auslesen
  var NF = AddNachforderungen();
  if (NF != "" && showInfoNachforderungen) InfotextNachforderungen = NF;

  if (!machVorschlag)
  { // es sollen keine Vorschläge angehakt werden, also alles aus ToAlarm
    // nach Optional verschieben, so dass alles nur gelb markiert wird.
    while (ToAlarm.length>0) Optional.push(ToAlarm.pop());
  }

  if (ToAlarm.length>0) 
  { if (showInfoToAlarm) InfotextToAlarm = "<font color='red'>" + ToAlarm + "</font>"; }
  else
  { if (showInfoToAlarm)
    {
      InfotextToAlarm = "<font color='green'>Nichts zu alarmieren.</font> "; 
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
  Info += "<table width='100%'><tr><td><input type='checkbox' id='machVorschlag' ";
  if (machVorschlag) Info +="checked";
  Info += "> Fahrzeuge sofort abhaken</td>";
  
  Info += "<td align='right'>Abmarsch in gleicher Wache:</td><td align='center'> Trupp VOR Gruppe <input type='checkbox' id='zweiterAbmarschTr' ";
  if (zweiterAbmarsch==1) Info +="checked";
  Info +="></td>";
  Info += "<th>&nbsp;oder&nbsp;</th><td align='center'> Ausbildung zuerst <input type='checkbox' id='zweiterAbmarschAusb' ";
  if (zweiterAbmarsch==2) Info +="checked";
  Info +="></td></tr></table>\n";
  
  // Infos in Tabelle strukturieren
  Info += "<table class='defaultTable'>\n";
  var InfoVorspann  = "<tr><th style='width: 150px;'>";
  var InfoVorspann2 = "<tr><th colspan='2'>";

  if (InfotextStichwort) Info += InfoVorspann + "Wiki-Link</th><td>" + InfotextStichwort + "</td></tr>\n";
  if (InfotextKlasse) 
  { Info += InfoVorspann + "Einsatzklasse</th><td><font color='red'>" + InfotextKlasse + "</font>";
    if (InfotextEinsatzort) Info += InfoVorspann + "Einsatzort:</th><td>" + InfotextEinsatzort + ", 64832 Babenhausen </td></tr>\n";
    if (InfotextKlassenalarmOpt) InfotextKlassenalarm += ", Optional: " + InfotextKlassenalarmOpt + "&nbsp;";
    if (InfotextKlassenalarm) Info += "&nbsp;&nbsp;(&nbsp;" + InfotextKlassenalarm + "&nbsp;)";
    Info += "</td></tr>\n";
  }
  if (InfotextRTW) Info += InfoVorspann + "RTW benötigt</th><td>" + InfotextRTW + "</td></tr>\n";
  if (InfotextNachforderungen) Info += InfoVorspann + "Nachforderung</th><td>" + InfotextNachforderungen + "</td></tr>\n";
  if (InfotextUnterwegs) Info += InfoVorspann + "im Einsatz</th><td>" + InfotextUnterwegs + "</td></tr>\n";
  if (InfotextToAlarm) Info += InfoVorspann + "zu alarmieren</th><td id='TA'>" + InfotextToAlarm + "</td></tr>\n";
  if (InfotextNichtVerfuegbar) Info += InfoVorspann + "<font color='yellow'>nicht verfügbar</font></th><td><font color='yellow'>" + InfotextNichtVerfuegbar + "</font></td></tr>\n";
  if (InfotextFahrzeit || InfotextFahrzeitOpt) 
  { Info += InfoVorspann + "Anfahrzeiten</th><td>"
    if (InfotextFahrzeit) Info += "notwendige Fahrzeuge " + InfotextFahrzeit;
    if (InfotextFahrzeit && InfotextFahrzeitOpt) Info += "<br>";
    if (InfotextFahrzeitOpt) Info += "optionale Fahrzeuge " + InfotextFahrzeitOpt;
    Info += "</td></tr>\n";
  }
  if (InfotextVerfuegbar) Info += InfoVorspann2 + "aktuell verfügbare Fahrzeuge: (<a target='_new' href='http://www.feuerwache.net/feuerwehrfahrzeuge'>Übersicht</a>)</th></tr><tr><td colspan='2'><font color='green'><font size='1'>" + InfotextVerfuegbar + "</font></font></td></tr>\n";
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

  document.getElementById("machVorschlag").addEventListener       ( "click" , machVorschlag_clicked ,   false ) ;
  document.getElementById("zweiterAbmarschAusb").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;
  document.getElementById("zweiterAbmarschTr").addEventListener   ( "click" , zweiterAbmarsch_clicked , false ) ;
  
  var D = KonfigHTML();
  if (D != "") 
  { InfoBereich.parentNode.insertBefore(D,InfoBereich.nextSibling);
    AddKonfigEventlisteners();
  }
  
  var BTN = document.getElementsByName("commit")[0];
  if (BTN) BTN.addEventListener ( "click" , function(){ FirstRun=true; } , false ) ;
  
  for each (A in document.getElementsByTagName("a"))
  { if (A.innerHTML == "zurück alarmieren") A.addEventListener ( "click" , function(){ FirstRun=true;CBClicked=false; } , false ) ; }
  
  var D=document.getElementsByName("vehicle_to_user_id[]");
  for ( var i=0;i < D.length;i++) {
   D[i].addEventListener ( "click" , function(){ CBClicked=true; } , false ) ;
  }   
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
      { Row1.getElementsByTagName("td")[5].style.backgroundColor="#662222";
        Row2.getElementsByTagName("td")[4].style.backgroundColor="#226622";
        sucheWeiter = false;
      }
      if (FahrtSek2 > RestSek1) sucheWeiter = false;
      j++;
      if (j >= Rows2.length) sucheWeiter = false;
    }
  }
}

function bearbeiteÜbersichtsseite()
{ if (showInfoKlasseInListe)
	{ var TD=document.getElementsByTagName("td");
    for (var i=0;TD.length > i; i++){
    var A=TD[i].getElementsByTagName("a");
    for (var j=0;A.length > j; j++){
    if ( A[j].href.indexOf("http://www.feuerwache.net/feuerwehr-einsaetze/") == 0)
        { TD[i].innerHTML += "<span style='padding-right:2px; float:right;'><font color='red'>(" + getEinsatzKlasse(A[j].innerHTML) + ")</font></span>"; }
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

  var TR=myTB.getElementsByTagName("tr");
  for (var i=0;i<TR.length;i++) {
  if (TR[i].getElementsByTagName("td").length>5)
  { var TDs = TR[i].getElementsByTagName("td");       var Stat = trim(TDs[5].innerHTML);
      var Ausb = trim(TDs[4].innerHTML);

      // Motivation kennzeichnen:
      var Mot = parseInt(TDs[1].innerHTML);
      if (Mot >= 75) TDs[1].style.color = "#66FF66";
      if (Mot <= 25) TDs[1].style.color = "#FF6666";
      
      // Personalstatistik:
      AnzFM++;
      
      // Status kennzeichnen und zählen
      if (Stat == "Beim Einsatz")           { AnzDienst++; AnzEinsatz++; TDs[5].style.color="#FF0000"; }
      if (Stat == "Frei - nicht im Dienst") TDs[5].style.color="#555555";
      if (Stat == "Einsatzbereit")          { AnzDienst++; AnzBereit++; TDs[5].style.color="#008000"; }
      if (Stat == "In der Feuerwehrschule") { AnzSchule++; TDs[5].style.color="#5555FF"; }
      
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
	if ((AnzGG) || (AnzRA) || (AnzTA) || (AnzAP) || (AnzLB) || (AnzRB)) { 
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
    H += "<b>Hinweis:</b> in den Optionen kann man einen RTW mehr alarmieren lassen, als ursprünglich Verletzte vor Ort.</div>";
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
  nodeA.appendChild(createText('AAO und Tool Script Konfiguration anzeigen'));
  NewDiv.appendChild(nodeA);
  //NewDiv.appendChild(createElement('br'));   
  
  var hiddenDiv=document.createElement("div");
  hiddenDiv.id = "KonfigBoxes";
  hiddenDiv.style.display = "none";
  
  H = "\n";

  H += "<h2>in Einsatzübersichtstabelle</h2><br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKlasseInListe'";
  if (showInfoKlasseInListe) H += " checked";
  H += "> Einsatzart anzeigen<br>\n";

  H += "<br><h2>in Infobox auf Einsatzseite</h3><br>\n";
  H += "<input type='checkbox' name='KonfigBox' id='KonfStichwort'";
  if (showInfoStichwort) H += " checked";
  H += "> Wiki-Link anzeigen<br>\n";

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

  H += "<input type='checkbox' name='KonfigBox' id='KonfRTWplus'";
  if (showInfoRTWplus) H += " checked";
  H += "> einen RTW mehr schicken als ursprünglich bei der Alarmierung nötig<br>\n";

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
  
  if (e.target.id == "zweiterAbmarschTr"   && zATr) zAGG=false;
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
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#444422";
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
    Anfahrt = "<font color=#CCCC66>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=#CCCC66>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
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
    
    for (var i=1; i<Zeilen.length-1; i++)
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
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#442222";
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
  if (FZBez.substr(0,3) == "LF ")    ret="Gr";
  if (FZBez.substr(0,4) == "HLF ")   ret="Gr";
  if (FZBez == "Kleinlöschfahrzeug") ret="Gr";
  mylog("FZBez = " + FZBez + ", Typ=" + ret);
  return ret;
}  

// Fahrzeuge Ausbildung WORK JM

function AusbFahrzeug(FZBez)
{ var ret="";
  if (FZBez == "GW-Gefahrgut")          ret="Ausb";
  if (FZBez == "GW-Messtechnik")        ret="Ausb";
  if (FZBez == "GW-Taucher")            ret="Ausb";
  if (FZBez == "RTW")                   ret="Ausb";
  if (FZBez == "Flugfeldlöschfahrzeug") ret="Ausb";
  if (FZBez == "Rettungstreppe")        ret="Ausb";
  if (FZBez == "Rettungsboot")          ret="Ausb";
  if (FZBez == "Feuerlöschboot")        ret="Ausb";   
  if (FZBez == "GW-TUIS")               ret="Ausb";   
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
  
// Tabelle Fzg wenn 0 dann Gelb, sonst grün
  var ret = "<table border='0'><tr>";
  var c=0;
  for each (FZ in ArrFZK)
  { if (c==MAXSPALTENVERFUEGBAR) c=0, ret+="</tr><tr>";
    if (AnzFZK[FZ] == 0) ret += "<td style='border:0;'><font color='yellow'>"+AnzFZK[FZ]+"</font>";
    if (AnzFZK[FZ] != 0) ret += "<td style='border:0;'><font color='#66FF66'>"+AnzFZK[FZ]+"</font>";
    if (AnzFZKXXX[FZ]) ret +="<font color='green'>+"+AnzFZKXXX[FZ]+"</font>";
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
  GM_setValue("showInfoRTWplus",showInfoRTWplus);
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

function dt() { debugging = true;  }
function df() { debugging = false; }