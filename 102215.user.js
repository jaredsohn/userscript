// ==UserScript==
// @name           Feuerwache.net Einsatzscript Hobbit
// @namespace      http://userscripts.org/users/182292
// @description    Vorschlag fuer Fahrzeuge bei Einsaetzen auf Feuerwache.net und andere Hilfen
// @include        http://www.feuerwache.net/*
// @author         Lennart Hobbit
// @info           Hinweis: das original Script stammt von Sawos und ist hier auch erhaeltlich
// @info2          http://syslord.org/feuerwache.net/
// @info3          Danke für die Unterstützung durch Haruspexn und Amtsleiter
// @version        2011-05-02 23:00
// ==/UserScript==

/*

	


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

für den Verband Hogsmeade

*/
// Anzahl der Spalten in der Verfügbar-Anzeige.
var MAXSPALTENVERFUEGBAR=99;
// soll täglich nach einem Update des AAO-Scriptes gesucht werden?
var CHECKFORUPDATES=true;
// unter welchem URL finde ich Infos über das Script?
var UPDATEURL="http://userscripts.org/scripts/show/79822";
// unter welchem URL finde ich die Metadaten zum Script?
var UPDATEURLmeta="http://userscripts.org/scripts/source/79822.meta.js";
// unter welchem URL finde ich das Script als Installation?
var INSTALLURL="http://userscripts.org/scripts/source/79822.user.js";

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

  'Baum auf Auto'               : 
  'Baum auf Dach'               : 
  'Baum auf Straße'             : 
  'Brand in KFZ-Werkstatt'      : 
  'Brand in Schule'             : 
  'Brand in Spedition'          : 
  'Brand in Sporthalle'         : 
  'Auffahrunfall'               : 
  'Auffahrunfall_n'             : 
  'Feldbrand'                   :
  'Feldbrand_n'                 : 
  'Mülleimer Brand'             : 
  'Mülleimer Brand_n'           : 
  'Brand im Sägewerk'           : 
  'Brand im Supermarkt'         : 
  'Brennende Bäume'             : 
  'Brennende Telefonzelle'      : 
  'Brennender LKW'              : 
  'Brennender PKW'              : 
  'Brennendes Gras'             : 
  'Chemieunfall (an Schule)'    : 
  'Chlorgas Alarm (Schwimmbad)' : 
  'Container Brand'             : 
  'Dachstuhlbrand'              : 
  'Fahrstuhl - Türöffnung'      : 
  'Fettbrand in Pommesbude'     : 
  'Feuer im Altenheim'          : 
  'Feuer im Laubhaufen'         : 
  'Gartenlaubenbrand'           : 
  'Gastronomiebrand'            : 
  'Kellerbrand'                 : 
  'Keller unter Wasser'         : 
  'Kinobrand'                   : 
  'Motorrad-Brand'              : 
  'Mülleimer Brand'             : 
  'Scheunenbrand'               : 
  'Schornsteinbrand'            : 
  'Silobrand'                   : 
  'Sperrmüllbrand'              : 
  'Strohballen Brand'           : 
  'Traktorbrand'                : 
  'Verkehrsunfall'              : 
  'Wohnblockbrand'              : 
  'Wohnungsbrand'               : 
  'Gewerbebrand'                : 
  'Brand im Baumarkt'           : 
  'Brennender Sicherungskasten'	: 
  'Schuppenbrand'               : 
  'Brennende S-Bahn'            : 
  'Wohnwagenbrand'              : 
  'Brand in Briefkasten'        : 
  'Kleiner Waldbrand'           : 
  'Brennender Müllwagen'        : 
  'Ölspur'                      : 
  'Person im Fluss'             : 
  'Brand in Zugdepot'           : 
  'Brand in Autohaus'           : 
  'Brand in Druckerei'          : 
  'Brand in Lackfabrik'         : 
  'Trocknerbrand'               : 
  'Brand in Reifenlager'        : 
  'Brand im Casino'             : 
  'Brennendes Gebüsch'          : 
  'Kioskbrand'                  : 
  'Garagenbrand'                : 
  'Mähdrescherbrand'            : 
  'Kaminbrand'                  : 
  'PKW in Fluss'                : 
  'Brand in Schloss'            : 
  'Brand in Kühlhaus'           : 
  'Feuer im Krankenhaus'        : 
  'Brand in Kletterhalle'       : 
  'Grasnarbenbrand'             : 
  'Brand-Weihnachtsbaum in Kirche'  : 
  'Brand auf Weihnachtsmarkt'       : 
  'Brennendes Flugzeug'         :  
  'Brand in Metzgerei'          :  
  'Brand in Eishalle'           :  
  'Brand in Gärtnerei'          :  
// Großschadenslagen
  'Brand in Industriepark'      :  
// Hafeneinsätze
  'Feuer auf Boot (Klein)'      :  
  'Feuer auf Boot (Mittel)'     :  
// Einsätzeneu ab 13.12.2010
  'Gabelstapler im Hafenbecken' :  
  'Verletztentransport'         :  
  'Brand in Gemeindehaus'       :  
  'Maschinenbrand'              :  
  'Brand in Steinbruch'         :  
// Einsätze neu ab 15.04.2011
  'Tankbrand'                   :  
  'Brennt Tanklager '           :  
  'Brennt Tanklager'            :  
  'Brand in Raffinerie'         :  

};
  
var Einsatzklasse_Fahrzeugzuordnung = {

  // hier wird definiert, welche Fahrzeuge standardmäßig zu den verschiedenen
  // Einsatzklassen geschickt werden. Einzelne Fahrzeuge werden durch Komma (,)
  // getrennt, Alternativen durch (/).
  // !!!ACHTUNG: HIER KEINE OPTIONALEN FAHRZEUGE (|) EINTRAGEN!!!
  'undef'          :  'LF',
  'WATCH'          :  'LF,LF,ELW,DL',









Hir >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Einsatzkategorien







  'RD'             :  'RTW',

// zu undef = unbekannten Einsatzen wird per Default jetzt ein LF geschickt


  


};

//
// usually no need to change anything below this line
//


//Einsatzgebiete
var locationArr = {
	// Sonderbebauung zuerst
	'<font color="#FFFF00">auf dem Flughafengelände</font>'          : {from: {x:  83, y: 179}, to: {x:  84, y: 180}},
	'<font color="#3300EE">im Hafenbereich</font>'                   : {from: {x:  98, y: 198}, to: {x: 100, y: 200}},
	'<font color="#33FF33">auf dem Gelände der Raffinierie</font>'   : {from: {x:   6, y: 176}, to: {x:   7, y: 176}},
	'<font color="#6600FF">Güterbahnhof</font>'                      : {from: {x:  50, y: 152}, to: {x:  51, y: 152}},
	'<font color="#6600FF">Bahnlinie</font>'                         : {from: {x:   1, y: 152}, to: {x: 100, y: 152}},
	// 'normale' Bereiche
	'in der Altstadt'                                                : {from: {x:   1, y:   1}, to: {x: 100, y: 100}},
	'Neustadt'                                                       : {from: {x:   1, y: 101}, to: {x: 100, y: 200}},
}


var Fahrzeugklassen = {
  // hier die verfügbaren Fahrzeugen mit ihrer Beschreibung und der Zuordnung 
  // zu einer Fahrzeugklasse auflisten. Fahrzeuge, die ihr eigener Typ sind 
  // (z.B. "RTW") brauchen hier nicht aufgeführt werden. (sie schaden aber auch nicht)

  'LF 20/16'           :   'LF'        ,
  'HLF 20/16'          :   'LF'       ,
  'LF 16-TS'           :   'LF'        ,
  'LF 10/6'            :   'LF'        ,
  'HLF 10/6'           :   'LF'       ,
  'LF 8'               :   'LF'        ,
  'RTW'                :   'RTW'       ,
  'ELW 1'              :   'ELW'       ,
  'TLF 20/40 - SL'     :   'TLF'       ,
  'DLA (K) 23/12'      :   'DL'       ,
  'RW'                 :   'RW'        ,
  'Kran'               :   'FK'       ,
  'Kleinlöschfahrzeug' :   'LF'        ,
  'GW-A'               :   'GWA'       ,
  'GW-L2 - Wasser'     :   'GWL'       ,
  'GW-Öl'              :   'GWÖ'       ,
  'GW-Schiene'         :   'GWS'       ,
  'GW-Taucher'         :   'GWT'       ,
  'GW-Messtechnik'     :   'GWM'       ,
  'GW-Gefahrgut'       :   'GWG'       ,
  'Flugfeldlöschfahrzeug':   'FLF'       ,
  'Rettungstreppe'     :   'RTF'       ,
  'GW-TUIS'            :   'GT'      ,
  'Feuerlöschboot'     :   'LB'        ,
  'Rettungsboot'       :   'RB'        ,

};

//Alle Fahrzeugtypen aufgelistet, nur mit Zahlenindex
var fahrzeugabkuerzungen = new Array('LF','RTW','ELW','TLF','DLK','RW','FwK','GWA','GWL','GWÖ','GWS','GWT','GWM','GWG','FLF','RTF','GT','LB','RB');

var Fahrzeuggeschwindigkeiten = {
  'Rettungstreppe'     :   65     ,
  'RTW'                :   75     ,
  'LF 10/6'            :   58     ,
  'HLF 10/6'           :   58     ,
  'LF 20/16'           :   60     ,
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
  "Hier muss Wasser über weite Wegstrecken transportiert werden. Wir benötigen einen GW-L2 Wasser." : "GWL",

  "Das Feuer ist weiter ausserhalb und alle Wasserreserven sind aufgebraucht. Wir brauchen einen GW-L2 -Wasser um weitere Schläuche verlegen zu können." : "GWL",

  "Um Leitungen über weite Strecken legen zu können, benötigen wir einen GW - L2 - Wasser." : "GWL",

  "Wir benötigen Material vom Rüstwagen (RW)!" : "RW",
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

 
);

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
  'LB'  : '0|30',
  'RB'  : '0|50',
  'LF'  : '1|0',
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
var showInfoSound;
var showInfoSoundcrash;
var showInfoSaison;
var soundplayed='';

var showAnzahlFW,AnzahlFW;
var showAnzahlBF,AnzahlBF;

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
  else if (adr.match("http://www.feuerwache.net/feuerwehrfahrzeuge/[0-9]*/verschieben"))
  { bearbeiteVerschieben(); }
  else if (adr.match("http://www.feuerwache.net/building_to_user/show/id/*"))
  { bearbeiteLehrgangszuteilung(); }
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
  else if (adr.match("http://www.feuerwache.net/Script-Konfig"))
  { bearbeiteKonfig(); }
  else if (adr.match("http://www.feuerwache.net/gebaeude"))
  { bearbeiteGebaeude(); }


  ichBins = false;
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
		{ locArr.push(loc);
		}
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
  else { I.value = 'XXX ' + FN; }\n\
}";
  nodeTD.appendChild(nodeScript);
  var nodeA = createElement('a',
                            {'href': 'javascript:ToggleStatus6();'});
							
  nodeTD.appendChild(nodeA);
  nodeA.appendChild(createText('Fahrzeug in/außer Dienst stellen'));
  
  /*
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
  */
  //var INP = document.getElementById("caption");
  //var td = document.createElement("td");
  //td.innerHTML = H;
  //INP.parentNode.parentNode.insertBefore(td,INP.parentNode.nextSibling);
}

// fasst mehrere Fahrzeuge mit Anzahl zusammen: LF, LF => 2LF
function condenseFahrzeugliste(fListeArr)
{
  var fCumArr = new Array;
  //var fSeqArr = new Array;
  var fListeTxt = '';

  // Einträge je Fahrzeug zählen (Fahrzeuge mit Alternativen werden separat gezählt)
    // für Alternativen bestimmen, wo sie einsortiert werden sollen
  //  for each (var fhz in fListeArr)
  //  {
	var fhz=fListeArr;

	for (var i=0;i < fhz.length;i++){
      var f = '';
      var altFhz = fhz[i].split('/');

      if (altFhz.length > 1)
      { f = altFhz[0]; }
      else
      { f = fhz[i] }

      if (fCumArr[f] == undefined)
      {
        fCumArr[f] = new Array;
        fCumArr[f].value = 1;
        fCumArr[f].vehicles = fhz[i];
      }
      else
      {
        fCumArr[f].value++;
      }
    }
	
    // Liste analog Liste freier Fahrzeuge aufbauen
   /* for (var fhz in FahrzeugeArr)
    {
      if (fSeqArr[FahrzeugeArr[fhz].vehGrp] == undefined)
      {
        fSeqArr[[FahrzeugeArr[fhz].vehGrp]] = FahrzeugeArr[fhz].vehGrp;
        // noch einen zweiten Eintrag für alternative Fahrzeuge
        fSeqArr[[FahrzeugeArr[fhz].vehGrp] + '*'] = FahrzeugeArr[fhz].vehGrp;
      }
    }*/
	
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
	
	/*
	
	
	
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

  return fListeTxt;*/
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

function bearbeiteFahrzeugkauf()
{ 
var div=document.getElementById("content")
var h1=div.getElementsByTagName("h1")[0];
var h1c=h1.firstChild.nodeValue

h1c=h1c.replace('/','_');
h1c=h1c.replace(' ','');
var img=createElement('img',
							{'src'  : 'http://www.hogsmeade-verband.de/images/news/'+h1c+'.jpg',
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
	AnzahlFF = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].firstChild.nodeValue;
	AnzahlBF = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].firstChild.nodeValue;
	AnzahlFW = parseInt(AnzahlFF) + parseInt(AnzahlBF);

	GM_setValue("showAnzahlFW",AnzahlFW);
	GM_setValue("showAnzahlBF",parseInt(AnzahlBF));

	document.getElementsByTagName('table')[0].getElementsByTagName("th")[0].setAttribute('style','width:35px; !important;');
	
  var TRs = document.getElementById("content").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  for (i=0;i<TRs.length;i++)
  { var TR=TRs[i];
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
  var R=document.getElementsByName("education_type");
  for (var i=0;i < R.length;i++) {
	R[i].addEventListener ( "click" , Markiere_Schueler , true );
  }
}

function Markiere_Schueler()
{ var GG = document.getElementById("education_type_1").checked;
  var RA = document.getElementById("education_type_2").checked;
  var TA = document.getElementById("education_type_3").checked;
  var FH = document.getElementById("education_type_4").checked;
  var LB = document.getElementById("education_type_5").checked;
  var RB = document.getElementById("education_type_6").checked;
  var TU = document.getElementById("education_type_7").checked;
  var DT=document.getElementsByClassName("defaultTable");
  if (DT.length<2) return;

  for (var i=1; i<DT.length; i++)
  { var TB = DT[i];
	var TR=TB.getElementsByTagName("tr");
	for ( var j=0;j<TR.length;j++) {
    var TDs = TR[j].getElementsByTagName("td");
      if (TDs.length==7) 
      { TDs[0].style.backgroundColor="transparent";
        var Ausb = TDs[5].innerHTML;
        var verf = (TDs[1].innerHTML.match("Nicht verfügbar") == null);
        var Mot  = parseInt(TDs[2].innerHTML);
        if (Mot >= 75) TDs[2].style.color="green";
        if (Mot <= 25) TDs[2].style.color="#FF6666";
        if (verf)
        { var bgc="";
          if (GG && Ausb.match("Gefahrgut")             ==null) bgc="#FF0000";
          if (RA && Ausb.match("Rettungsassistent")     ==null) bgc="#FFFFFF";
          if (TA && Ausb.match("Taucher")               ==null) bgc="#000066";
          if (FH && Ausb.match("Flughafen")             ==null) bgc="#FFFF00";
          if (LB && Ausb.match("Löschboot")             ==null) bgc="#0000FF";
          if (RB && Ausb.match("Rettungsboot")          ==null) bgc="#00FFFF";
          if (TU && Ausb.match("TUIS")                  ==null) bgc="#FF00FF";
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

function bearbeiteFahrzeugliste()
{ var DC=document.getElementById("content");
  var ArrTR=new Array;
  
  var H2 = DC.getElementsByTagName("h2");
  for (var i=0; i<H2.length; i++)
  { var A = H2[i].getElementsByTagName("a")[0];
    if (A)
    { var FWLink = A.href;
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
  for (var i=1;i<TBs.length-2;i++)
  { 
    var TB2=TBs[i];
	var TR=TB2.getElementsByTagName("tr")[0];
	var index=TR.getElementsByTagName("th").length-1;
    var LastTH = TR.getElementsByTagName("th")[index].firstChild.nodeValue;
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
          ZustandSumme[FZName]=0;
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
 // for each (FZName in FZNamen.sort())
 // { 
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
  for (var i=0;i<5;i++)
  { TD.innerHTML += ArrTopKM[i][1] + " (" + makeDots(ArrTopKM[i][0]) + " km)<br>\n";
  }
  
  TB = TBs[TBs.length-1];
  var lastTR = TB.getElementsByTagName("tr")[TB.getElementsByTagName("tr").length-1];
  var TR=document.createElement("tr");
  lastTR.parentNode.insertBefore(TR,lastTR.nextSibling);
  TR.innerHTML = "<th>Fahrzeuge mit der niedrigsten Laufleistung:</th>\n<td></td>";
  var TD=TR.getElementsByTagName("td")[0];

  ArrTopKM.sort(function s(b,a){return b[0]-a[0];});
  for (var i=0;i<5;i++)
  { TD.innerHTML += " " + makeDots(ArrTopKM[i][0]) + " km - " + ArrTopKM[i][1] + "<br>\n";
  }

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
	
  //var H = "<script type='text/javascript'>\n";
 // H += "function toggledisplay()\n";
  //H += "{ var e = document.getElementById('DivZustandstabelle');\n";
  //H += "  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n";
 // H += "}\n";
 // H += "</script>";
  //var H = "<h2><a href='javascript:toggledisplay();'>Defekte Fahrzeuge nach Zustand auflisten</a></h2>";
 // H += "<br>\n";
 var nodeA = createElement('a',
                              {'href': 'javascript:toggledisplay();'});
    nodeA.appendChild(document.createTextNode('Defekte Fahrzeuge nach Zustand auflisten'));
    NewDiv.appendChild(nodeA);
    NewDiv.appendChild(createElement('br'));
  //NewDiv.innerHTML = H;
  
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
  
 // NewDiv.appendChild(hiddenDiv);
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
  //NewDiv.innerHTML = H;
  
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
  
 // NewDiv.appendChild(hiddenDiv);
  TB=document.getElementById("Übersichtstabelle");
  TB.parentNode.insertBefore(hiddenDiv,TB.nextSibling);
  TB.parentNode.insertBefore(NewDiv,TB.nextSibling);
  TB=document.getElementById("Laufleistung").getElementsByTagName("tbody")[0];
  var TR=ArrTR;
  for (var i=0;i < TR.length;i++) TB.appendChild(TR[i]);

	  
  // Tabelle sortieren
  SortTabelle(hiddTB,5,false,true,true);
}

function bearbeiteEinsatzseite()
{ 
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

  // verfügbare FZ zählen
  if (showInfoVerfuegbar) InfotextVerfuegbar = zaehleVerfuegbar();
  
  // im Verbandseinsatz die Checkbox per default NICHT anhaken, sonst schon
  if (document.getElementById("machVorschlag") == undefined) machVorschlag = !Verbandseinsatz();

// STRASSEN --
  // Einsatz Nr. ermitteln
  var EinsatzNr = adr.replace(/[^0-9]/g, ""); 
  if (showInfoEinsatzNr) InfotextEinsatzNr = EinsatzNr;


  // Einsatzort ausgeben
  if (showInfoEinsatzort)
  {
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
	var InfotextEinsatzgebiet = "Verbandseinsatz!";
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

  // STRASSEN --

  // Einsatzstichwort ermitteln
  var EinsatzDiv = document.getElementById("mission_content");
  var Einsatz = document.getElementsByTagName("h1")[0];
  var Einsatzstichwort = getStichwort(Einsatz.innerHTML);
  if (showInfoStichwort) 
  { InfotextStichwort = Einsatzstichwort;
    var L = getWikiLink(Einsatzstichwort);
    if (L != "") InfotextStichwort = "<a target='_new' href='" + L + "'>" + Einsatzstichwort + "</a>";
  }
  
  // Einsatzklasse
  var Einsatzklasse = getEinsatzKlasse(Einsatzstichwort,InfotextEinsatzgebiet);

  if (showInfoKlasse) InfotextKlasse = Einsatzklasse;
  // Fahrzeuge zusammenstellen
  FillAlarmListe(Einsatzklasse,InfotextEinsatzgebiet);

  if (showInfoKlassenalarm) InfotextKlassenalarm = condenseFahrzeugliste(ToAlarm);
  if (showInfoKlassenalarmOpt && Optional.length>0) InfotextKlassenalarmOpt = condenseFahrzeugliste(Optional);

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
    if (Buchstabe == 'H') { 
    	if (showInfoRTWplus) { V--; }
    }
    //dt();mylog(V);df();
   	while (V>0) { 
   		if (Buchstabe == 'H') { ToAlarm.push("RB"); }
   		if (Buchstabe != 'H') { ToAlarm.push("RTW"); }
   		V--; 
   	}
  }

  // bereits eingebundene Fahrzeuge ermitteln
  FillUnterwegsListe();

  // Diese Unterwegs-Fahrzeuge auflisten...
  if (Unterwegs.length>0)
  { if (showInfoUnterwegs) 

{
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
 
  if (! machVorschlag)
  { // es sollen keine Vorschläge angehakt werden, also alles aus ToAlarm
    // nach Optional verschieben, so dass alles nur gelb markiert wird.
    while (ToAlarm.length>0) Optional.push(ToAlarm.pop());
  }
  
  if (ToAlarm.length>0) 
  { if (showInfoToAlarm) InfotextToAlarm = "<font color='#1865C9'>" + condenseFahrzeugliste(ToAlarm) + "</font>"; }
  else
  { if (showInfoToAlarm)
    {
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
  Info += "><font color='red'><b> Nur RTW unter 15 Min. auswählen <b></font></td>";
  
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
  if (InfotextEinsatzort) Info += InfoVorspann + "Einsatzort:</th><td>" + InfotextEinsatzort + ", 23109 Hogsmeade </td></tr>\n";
  if (showInfoEinsatzgebiet) Info += InfoVorspann + "Zusatzinfo:</th><td>" + InfotextEinsatzgebiet + " </td></tr>\n";

  
  if (InfotextKlasse) 
  { Info += InfoVorspann + "Stichwort:</th><td>" + InfotextKlasse + "</font>";
    if (InfotextKlassenalarmOpt) InfotextKlassenalarm += " Optional: " + InfotextKlassenalarmOpt + "&nbsp;";
    if (InfotextKlassenalarm) Info += "&nbsp;&nbsp;(&nbsp;" + InfotextKlassenalarm + "&nbsp;)";
    Info += "</td></tr>\n";
  }
  if (InfotextRTW) Info += InfoVorspann + "Verletzte:</th><td>" + InfotextRTW + "</td></tr>\n";
  if (InfotextNachforderungen) Info += InfoVorspann + "Nachforderung</th><td>" + InfotextNachforderungen + "</td></tr>\n";
  if (InfotextUnterwegs) Info += InfoVorspann + "im Einsatz:</th><td>" + InfotextUnterwegs + "</td></tr>\n";
  if (InfotextToAlarm) Info += InfoVorspann + "zu alarmieren:</th><td id='TA'><font size='2'>" + InfotextToAlarm + "</font></td></tr>\n";
  if (InfotextNichtVerfuegbar) Info += InfoVorspann + "<font color='red'>nicht verfügbar:</font></th><td><font color='red'>" + InfotextNichtVerfuegbar + "</font></td></tr>\n";
  if (InfotextFahrzeit || InfotextFahrzeitOpt) 
  { Info += InfoVorspann + "Anfahrzeit</th><td>"
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
  document.getElementById("Erkundungsmodus").addEventListener ( "click" , alarmTyp_clicked , false ) ;
  document.getElementById("RTWZeit").addEventListener ( "click" , alarmTyp_clicked , false ) ;
  document.getElementById("zweiterAbmarschAusb").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;
  document.getElementById("zweiterAbmarschTr").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;
  
  var BTN = document.getElementsByName("commit")[0];
  if (BTN) BTN.addEventListener ( "click" , function(){ FirstRun=true; } , false ) ;
  
  for each (A in document.getElementsByTagName("a"))
  { if (A.innerHTML == "zurück alarmieren") A.addEventListener ( "click" , function(){ FirstRun=true;CBClicked=false; } , false ) ; }
  
  var D=document.getElementsByName("vehicle_to_user_id[]");
  for ( var i=0;i < D.length;i++) {
	D[i].addEventListener ( "click" , function(){ CBClicked=true; } , false ) ; 
	}
 // for each (I in document.getElementsByName("vehicle_to_user_id[]"))
 // { I.addEventListener ( "click" , function(){ CBClicked=true; } , false ) ; }
  
  findeFahrzeugeZumZurückalarmieren();
  
  FirstRun=false;
  
  // Einbau des UpdateLinks
  showUpdate();
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


function bearbeiteÜbersichtsseite()
{ if (showInfoKlasseInListe)
  {   
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
			}
			else {
				var posArr = TD[k+1].getElementsByTagName('a')[0].firstChild.nodeValue.split(" - ");;
				var area = getAreaDescription(parseInt(posArr[0]), parseInt(posArr[1]));
			}
			
			var Einsatzklasse=getEinsatzKlasse(A[j].innerHTML,area);

			//// Sound bei GSL abspielen, nur einmal pro Einsatz
			var einsatznummer=A[j].href.replace('http://www.feuerwache.net/feuerwehr-einsaetze/','');
			if ( Einsatzklasse=='Waldbrand' && ! soundplayed.match(einsatznummer) && showInfoSound ) {
				//var sound=createElement("embed",{'src':'http://www.hogsmeade-verband.de/Script_Sounds/GSL.mp3','autostart':'true','loop':'false','hidden':'true','heigth':'0','width':'0'});
				playsound('waldbrand');
				soundplayed=soundplayed+'||'+einsatznummer;
				GM_setValue("soundplayed",soundplayed);
			}
			else if ( Einsatzklasse=='Explosion' && ! soundplayed.match(einsatznummer) && showInfoSound ) {
				playsound('explosion');
				soundplayed=soundplayed+'||'+einsatznummer;
				GM_setValue("soundplayed",soundplayed);
			}
			else if ( Einsatzklasse=='Crash' && ! soundplayed.match(einsatznummer) && showInfoSoundcrash ) {
				playsound('flugzeug');
				soundplayed=soundplayed+'||'+einsatznummer;
				GM_setValue("soundplayed",soundplayed);
			}
			else if ( Einsatzklasse=='MANV' && ! soundplayed.match(einsatznummer) && showInfoSoundcrash ) {
				playsound('krankenhaus');
				soundplayed=soundplayed+'||'+einsatznummer;
				GM_setValue("soundplayed",soundplayed);
			}
			TD[i].innerHTML += "<span style='padding-right:2px; float:right;'><font color='#1865C9'>(" + Einsatzklasse + ")</font></span>";
        }
      }
    }
  }
  
  // Einbau des UpdateLinks
  showUpdate();
}

function AddKonfigEventlisteners()
{ var Boxes = document.getElementsByName("KonfigBox");
  for ( var i=0;i < Boxes.length;i++) {
	Boxes[i].addEventListener("click",KonfigBox_clicked,false);
  }
 // for each (Box in Boxes)
 // { Box.addEventListener("click",KonfigBox_clicked,false);
 // }

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
  var TH=THs;
  for (var i=0;i<TH.length;i++) {
 // for each (TH in THs) {
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

  var TR=myTB.getElementsByTagName("tr");
  for (var i=0;i<TR.length;i++) {
  //for each (TR in myTB.getElementsByTagName("tr")) { 
  if (TR[i].getElementsByTagName("td").length>5)
    { var TDs = TR[i].getElementsByTagName("td");
      var Stat = trim(TDs[5].innerHTML);
      var Ausb = trim(TDs[4].innerHTML);

      // Motivation kennzeichnen:
      var Mot = parseInt(TDs[1].innerHTML);

var colour;
if ( unsafeWindow.feuerwache_layout == 'light') colour='green';
else colour='lime';

      if (Mot >= 75) TDs[1].style.color = ""+colour+"";
      if (Mot <= 25) TDs[1].style.color = "red";
      
      // Personalstatistik:
      AnzFM++;
      
      // Status kennzeichnen und zählen

      if (Stat == "Beim Einsatz")           { AnzDienst++; AnzEinsatz++; TDs[5].style.color="#FF0000"; }
      if (Stat == "Frei - nicht im Dienst") TDs[5].style.color="#555555";
      if (Stat == "Einsatzbereit")          { AnzDienst++; AnzBereit++; TDs[5].style.color="green"; }
      if (Stat == "In der Feuerwehrschule") { AnzSchule++; TDs[5].style.color="#5555FF"; }
      
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
      if (Ausb.match("Löschboot"))
      { AnzLB++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzLBDienst++;
        if (Stat == "Einsatzbereit") AnzLBBereit++;
      }
      if (Ausb.match("Rettungsboot"))
      { AnzRB++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzRBDienst++;
        if (Stat == "Einsatzbereit") AnzRBBereit++;
      }
if (Ausb.match("TUIS"))
      { AnzTU++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzTUDienst++;
        if (Stat == "Einsatzbereit") AnzTUBereit++;
      }
    }
  }

  var ret;
  ret = "<b>" + AnzFM + " Feuerwehrleute</b>";
  if (AnzDienst != AnzFM) 
  { ret += ", davon " + AnzDienst + " im Dienst und ";
    if (AnzSchule) 
    { ret += AnzSchule + " in der Schule."; }
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
  { ret += "<font color='#FFFF00'>Flughafen: </font>" + AnzAP + " insgesamt, " + AnzAPDienst + " im Dienst";
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
  { ret += "<font color='#00FFFF'>Rettungsboot: </font>" + AnzRB + " insgesamt, " + AnzRBDienst + " im Dienst";
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
  return ret;
}

function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link)
{ var TBody = myTB.getElementsByTagName("tbody")[0];
  if (!TBody) return;
  var ArrTR = new Array();
  var TR=TBody.getElementsByTagName("tr");
  for (var i=0;i<TR.length;i++) {
  //for each (TR in TBody.getElementsByTagName("tr")) }
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
  
  H += "<h2>Einsatzübersichtstabelle</h2>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKlasseInListe'";
  if (showInfoKlasseInListe) H += " checked";
  H += "> Einsatzart anzeigen<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfSound'";
  if (showInfoSound) H += " checked";
  H += "> Sound bei Verbandsgroßschadenslage abspielen<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfSoundcrash'";
  if (showInfoSoundcrash) H += " checked";
  H += "> Sound bei anderen Großeinsätzen abspielen<br>\n";

  H += "<br><h2>Infobox auf Einsatzseite</h2>\n";

// STRASSEN --
  

  H += "<input type='checkbox' name='KonfigBox' id='KonfEinsatzort'";
  if (showInfoEinsatzort) H += " checked";
  H += "> Einsatzort anzeigen<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfEinsatzNr'";
  if (showInfoEinsatzNr) H += " checked";
  H += "> Einsatz-Nr anzeigen<br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfEinsatzgebiet'";
  if (showInfoEinsatzgebiet) H += " checked";
  H += "> Zusatzinfo anzeigen<br>\n";
// STRASSEN --

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
  
  H += "<br><h2>Fahrzeugmarkt</h2>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKdoW'";
  if (showInfoKdoW) H += " checked";
  H += "> KdoW im Fahrzeugmarkt anzeigen<br>\n";
  
  H += "<br><a href='" + adr + "'>Seite aktualisieren</a>\n";
  H += "<br><br>\n";
  NewDiv.innerHTML = H;

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
			if ( area != 'Verbandseinsatz!') {
				if ( bedingungen[0] > showAnzahlFW ) continue;
				if ( bedingungen[1] > showAnzahlBF ) continue;
			}
			if ( postalternativ ) postalternativ+="/";
			postalternativ+=prealternativ[j];
		}
		ToAlarm.push(postalternativ);
	}
	else {
		var bedingungen=Fahrzeugbedingungen[preAlarm[i]].split("|");

		if ( area != 'Verbandseinsatz!') {
			if ( bedingungen[0] > showAnzahlFW ) continue;
			if ( bedingungen[1] > showAnzahlBF ) continue;
		}
		ToAlarm.push(preAlarm[i]);
	}
  }

  
  if (Teile.length > 1) {
	var preOptional=Teile[1].split(",");
	for (var i=0;i<preOptional.length;i++) {
		var bedingungen=Fahrzeugbedingungen[preOptional[i]].split("|");
		
		if ( area != 'Verbandseinsatz!') {
			if ( bedingungen[0] > showAnzahlFW ) continue;
			if ( bedingungen[1] > showAnzahlBF ) continue;
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
	  else {
		if ( unsafeWindow.feuerwache_layout=='black') var color='green';
		else var color='red';
		TR.style.backgroundColor=color;
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

function getStichwort(Text)
{ mylog("getStichwort(" + Text + ")");
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
        { 
		if ( alarmtyp==1) {
			var fahrzeit=ThisSpalten[4].firstChild.nodeValue;
			if (ThisFZ == 'RTW' && ( fahrzeit.split(" Min.")[0] > 15 || fahrzeit.match("Std.") )) continue;
	    } 
	 
		mylog("gefunden:" + ThisFZ);
          if (FirstRun || !CBClicked) 
          { C.click();
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
	/*
	var TD=TR.getElementsByTagName("td");
	for (var i in TD){
		TD[i].bgColor = undefined;
	}
	*/
	/*
  for ( var i=0;TB[0].getElementsByTagName("tr").length >= i;i++ ) {
	var FZ;
    var TDs=TB[0].getElementsByTagName("tr")[i].getElementsByTagName("td");
    if (TDs.length==5) 
    { FZ=TDs[2].innerHTML;
      var FN=TDs[1].getElementsByTagName("a")[0].innerHTML;
      var FZK=getFahrzeugKlasse(FZ);
      if (FN.substr(0,3).toUpperCase()=="XXX")
      { AnzFZKXXX[FZK]++; }
      else
      { AnzFZK[FZK]++; }
    }
  }*/
  /*
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
  
  
  // Tabelle Fzg wenn 0 dann rot, sonst grün
  var ret = "<table border='0'><tr>";
  var c=0;
  for each (FZ in ArrFZK)
  { if (c==MAXSPALTENVERFUEGBAR) c=0, ret+="</tr><tr>";
    if (AnzFZK[FZ] == 0) ret += "<td style='border:0;'><font size=2><b><font color='red'>"+AnzFZK[FZ]+"</b></font></font>";

var colour;
if ( unsafeWindow.feuerwache_layout == 'light') colour='green';
else colour='lime';

    if (AnzFZK[FZ] != 0) ret += "<td style='border:0;'><font size=2><b><font color='"+colour+"'>"+AnzFZK[FZ]+"</b></font></font>";

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
  showInfoSound    = GM_getValue("showInfoSound",true);
  showInfoSoundcrash    = GM_getValue("showInfoSoundcrash",true);
  showInfoSaison    = GM_getValue("showInfoSaison",true);
  soundplayed = GM_getValue("soundplayed",'');
 
  showAnzahlFW=GM_getValue("showAnzahlFW",false);
  showAnzahlBF=GM_getValue("showAnzahlBF",false);
  
  ScriptUpdateAvailable = GM_getValue("pleaseUpdate","");
}

function SetVariables()
{ mylog("SetVariables");
  
  GM_setValue("showInfoKlasseInListe",showInfoKlasseInListe);
  GM_setValue("showInfoKdoW",showInfoKdoW);
  GM_setValue("showInfoSound",showInfoSound);
  GM_setValue("showInfoSoundcrash",showInfoSoundcrash);
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
  if (LastUpdate >= heute ) return;

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

  emptySound();
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
  
    //// Hogsmeade-Edition
  var cont=document.getElementById('container');
  var logo=cont.getElementsByTagName('a')[0];
  var img=createElement('img',{'src':'http://www.hogsmeade-verband.de/images/news/Edition.gif','alt':'Hogsmeade Edition'});
  cont.insertBefore(img,logo.nextSibling);
  
  ////// Header austauschen!
  if ( showInfoSaison ) var header=document.getElementById('navigation_top').getElementsByTagName('img')[0].src='http://www.hogsmeade-verband.de/images/news/saisonbild.jpg';
 
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
                            {'src'  : 'http://www.hogsmeade-verband.de/images/kdow.GIF',
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
	var table=document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
	
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
}

function playsound(src) {
	var footer=document.getElementById("footer");
	var sound=createElement("object",{'id':'myFlashSound','type':'application/x-shockwave-flash','data':'http://www.hogsmeade-verband.de/Script_Sounds/'+src+'.swf','width':'1','height':'1'});
	var param=createElement("param",{'name':'FlashVars','value':'listener=mySoundListener&amp;interval=5000'});
	var param2=createElement("param",{'name':'movie','value':'http://www.hogsmeade-verband.de/Script_Sounds/'+src+'.swf'});
	var param3=createElement("param",{'name':'AllowScriptAccess','value':'always'});
	var param4=createElement("param",{'name':'loop','value':'false'});
	sound.appendChild(param);
	sound.appendChild(param2);
	sound.appendChild(param3);
	sound.appendChild(param4);
	footer.appendChild(sound);
}

function bearbeiteKonfig() {
	var content = document.getElementById('content');
	var len = content.childNodes.length;
	
	for (var i = 1; i <= len; i++) {
		content.removeChild(content.childNodes[0]);
	}
	
	var h1=createElement('h1');
	h1.appendChild(createText('Skriptkonfiguration'));
	content.appendChild(h1);
	showUpdate();
	content.appendChild(KonfigHTML());
	AddKonfigEventlisteners();
}

function showUpdate() {
  var updatediv=createElement('div',{'align':'center'});
  var br=createElement("br");
  
  if (ScriptUpdateAvailable != ""){ 
	updatediv.appendChild(br.cloneNode(true));
	var headdiv=createElement('div');
	headdiv.style.color='red';
	headdiv.appendChild(createText("Achtung: Deine Skriptversion ist nicht mehr aktuell!"));
	updatediv.appendChild(headdiv);
	updatediv.appendChild(br.cloneNode(true));
	var a=createElement('a',{'href':UPDATEURL,'target':'_new'});
	updatediv.appendChild(a);
	a.appendChild(createText("Informationen"));
	updatediv.appendChild(createText(" dazu oder gleich "));
	var a=createElement('a',{'id':'installURL','href':INSTALLURL,'target':'_new'});
	a.appendChild(createText("neue Version installieren"));
	updatediv.appendChild(a);
    updatediv.appendChild(br.cloneNode(true));
	updatediv.appendChild(br.cloneNode(true));
  }
  
  if ( ! showAnzahlFW ) {
	updatediv.appendChild(br.cloneNode(true));
	var headdiv=createElement('div');
	headdiv.style.color='red';
	headdiv.appendChild(createText("Achtung: Das Skript muss konfiguriert werden!"));
	updatediv.appendChild(headdiv);
	updatediv.appendChild(br.cloneNode(true));
	updatediv.appendChild(createText("Damit das Skript ordnungsgemäß funktioniert, müssen zuerst deine Wachen gezählt werden!"));
	updatediv.appendChild(br.cloneNode(true));
	updatediv.appendChild(createText("Bitte rufe dazu "));
	var a=createElement('a',{'href':'http://www.feuerwache.net/feuerwachen','target':'_new'});
	a.appendChild(createText("diese"));
	updatediv.appendChild(a);
	updatediv.appendChild(createText(" Seite auf. Deine Wachen werden dann automatisch gezählt und abgespeichert!"));
  }

  var h1=document.getElementsByTagName('h1')[0];
  document.getElementById("content").insertBefore(updatediv,h1);
  
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


function dt() { debugging=true; }
function df() { debugging=false; }