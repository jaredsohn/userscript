// ==UserScript==
// @author      Apurba
// @namespace	http://userscripts.org/
// @name		Travian Task Queue by Apurba
// @description	Schedule delayed constructions, upgrades and attacks.
// @include     http://s*.travian.*/*
// @include     http://s*.travian3.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @version     1.1.1
// ==/UserScript==

/*
 * Contact: e.hellraiser@gmail.com
 */

/*
Copyright 2007 Richard Laffers 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* * * * Settings * * * */


var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
var iCheckEvery = 10000;  // How often do we check for tasks to trigger in miliseconds. 
                          // Low value  = high accuracy in triggering tasks. To make your browser 
						  // unresponsive, set this to some ridiculously small number. Default is 10000
var sLang = "";  // Set this to override the automatic language detection. Available translations: en (default), sk, cz, dk, it, pl, pt.
var iPreloadTime = 20;  // How many seconds ahead is the code for building and upgrading prefetched. 
                        // If the code is not available by the time the construction should start, the 
						// construction will be cancelled. This value must be greater than iCheckEvery 
						// in seconds (i.e. iCheckEvery/1000). Default is 20.

/* * * * End of Settings * * * */

/* TODO:  
  * - refreshing page regularly to prevent session cookie timeouts
  * - getPlaceNames
  * - more info in the tasklist
 */


// global variables - do not tamper!
var sCurrentVersion = "1.1.0";  //Version number with which we need to run the update fu
var bLocked = false;  // for locking the TTQ_TASKS cookie
var bLockedCode = false;  // for locking the TTQ_CODE_0 and TTQ_CODE_0  cookies
var oIntervalReference = null;
var aLangBuildings = [];  //multilang support
var aLangTasks = [];  //multilang support
var aLangStrings = [];  //multilang support

// Images
var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
var sDeleteBtn = "data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7";


detectLanguage();

/* ----------------------- Translations -------------------------------
 * IMPORTANT!
 * If there is no translation available for your language, the script will not work!
 * - aLangBuildings must list all names EXACTLY as they are printed on your Travian web site. Names are case-sensitive.
 * - aLangStrings[7] (= "level" in English) must read exactly what it is on your website next to building names of higher level.
 * - aLangStrings[11] (= "Current production:" in English)  must read exactly what it is on your website on the resource site pages.
 * >>> Please submit all translations to rlaffers@gmail.com <<<
 * -------------------------------------------------------------------------
 */
switch(sLang) {
	case "sk":
		aLangBuildings = ["", "DrevorubaÄ", "HlinenÃ¡ baÅˆa", "Å½eleznÃ¡ baÅˆa", "ObilnÃ© pole", "PÃ­la", "TehelÅˆa", "ZlievareÅˆ", "Mlyn", "PekÃ¡reÅˆ", "Sklad surovÃ­n", "SÃ½pka", "KovÃ¡Äska dielÅˆa", "Zbrojnica", "ArÃ©na", "HlavnÃ¡ budova", "Bod stretnutia", "Trh", "AmbasÃ¡da", "KasÃ¡rne", "Stajne", "DielÅˆa", "AkadÃ©mia", "Ãškryt", "Radnica", "Rezidencia", "PalÃ¡c", "PokladÅˆa", "ObchodnÃ½ kancelÃ¡r", "VeÄ¾kÃ© kasÃ¡rne", "VeÄ¾kÃ© stajne", "MestskÃ© hradby", "ZemnÃ¡ hrÃ¡dza", "PalisÃ¡da", "KamenÃ¡r", "Pivovar", "Pasce", "Dvor hrdinov", "VeÄ¾kÃ½ sklad", "VeÄ¾kÃ¡ sÃ½pka", "Div sveta"];
		aLangTasks = ["PostaviÅ¥", "RozÅ¡Ã­riÅ¥", "ZaÃºtoÄiÅ¥ na", "VynÃ¡jsÅ¥", "TrÃ©novaÅ¥"];
		aLangStrings = ["PostaviÅ¥ neskÃ´r", "RozÅ¡Ã­riÅ¥ neskÃ´r", "ZaÃºtoÄiÅ¥ neskÃ´r", "VynÃ¡jsÅ¥ neskÃ´r", "NaplÃ¡nujte tÃºto akciu na neskÃ´r.", "ZaÄali sme stavaÅ¥ ", " - Ãºspech neznÃ¡my.", "stupeÅˆ", " sa nedÃ¡ postaviÅ¥.", " sa nedÃ¡ rozÅ¡Ã­riÅ¥.", "Ãšloha je naplÃ¡novanÃ¡.", "AktuÃ¡lna produkcia:", "TÃºto Ãºlohu momentÃ¡lne nie je moÅ¾nÃ© naplÃ¡novaÅ¥.", "MomentÃ¡lne nie je moÅ¾nÃ© plÃ¡novaÅ¥ Ãºlohy!", "NaplÃ¡novanÃ© Ãºlohy", "ZmazaÅ¥", "VyslaÅ¥ neskÃ´r", "Ãštok nemoÅ¾no naplÃ¡novaÅ¥, pretoÅ¾e neboli vybratÃ© Å¾iadne jednotky.", "Jednotky maÅ¡Ã­rujÃº do", "Nepodarilo sa vyslaÅ¥ jednotky do", "PodporiÅ¥", "ZaÃºtoÄiÅ¥ na", "OlÃºpiÅ¥", "Katapulty zacieliÅ¥ na", "nÃ¡hodne", "o", "alebo za", "sekÃºnd", "minÃºt", "hodÃ­n", "dnÃ­", "PreskÃºmaÅ¥ jednotky a suroviny", "PreskÃºmaÅ¥ jednotky a obrannÃ© objekty", "preÄ" ];
		break;		
		
	case "cz":
		aLangBuildings = ["", "DÅ™evorubec", "HlinÄ›nÃ½ dÅ¯l", "Å½eleznÃ½ dÅ¯l", "ObilnÃ© pole", "Pila", "Cihelna", "SlÃ©vÃ¡rna",	"MlÃ½n", "PekÃ¡rna", "Sklad surovin", "SÃ½pka", "KovÃ¡rna", "Zbrojnice", "TurnajovÃ© hÅ™iÅ¡tÄ›", "HlavnÃ­ budova", "ShromaÅ¾diÅ¡tÄ›", "TrÅ¾iÅ¡tÄ›", "AmbasÃ¡da", "KasÃ¡rny", "StÃ¡je", "DÃ­lna", "Akademie", "Ãškryt", "Radnice", "Rezidence", "PalÃ¡c", "Pokladnice", "ObchodnÃ­ kancelÃ¡Å™", "VelkÃ© kasÃ¡rny", "VelkÃ¡ stÃ¡j", "MÄ›stskÃ¡ zeÄ", "ZemnÃ­ hrÃ¡z", "PalisÃ¡da", "KamenÃ­k", "Pivovar", "Pasti", "HrdinskÃ½ dvÅ¯r", "VelkÃ½ sklad", "VelkÃ¡ sÃ½pka", "Div svÄ›ta"];
		aLangTasks = ["Postavit", "RozÅ¡Ã­Å™it", "ZaÃºtoÄit na", "VynajÃ­t", "TrÃ©novat"];
		aLangStrings = ["Postavit pozdÄ›ji", "RozÅ¡Ã­Å™it pozdÄ›ji", "ZaÃºtoÄit pozdÄ›ji", "VynajÃ­t pozdÄ›ji", "NaplÃ¡nujte tuhle akci na pozdÄ›ji.", "ZaÄali jsme stavÄ›t ", " - ÃºspÄ›ch neznÃ¡mÃ½.", "ÃºroveÅˆ", " se nedÃ¡ postavit.", " se nedÃ¡ rozÅ¡Ã­Å™it.", "Ãšloha je naplÃ¡novÃ¡na.", "AktuÃ¡lnÃ­ produkce:", "Tuhle akci momentÃ¡lnÄ› nenÃ­ moÅ¾nÃ© naplÃ¡novat.", "MomentÃ¡lnÄ› nenÃ­ moÅ¾nÃ© plÃ¡novat Å¾Ã¡dnÃ© akce!", "NaplÃ¡novanÃ½ akce", "Zmazat", "Vyslat pozdÄ›ji", "Ãštok nemoÅ¾no naplÃ¡novat, protoÅ¾e nebyli vybranÃ© Å¾Ã¡dnÃ© jednotky.", "Jednotky jsou na cestÄ› do", "NepodaÅ™ilo se vyslat jednotky do", "PodpoÅ™it", "ZaÃºtoÄit na", "Oloupit", "Katapulty zamÃ­Å™it na", "nÃ¡hodnÄ›", "o", "anebo za", "sekund", "minut", "hodin", "dnÃ­", "Prozkoumat jednotky a suroviny", "Prozkoumat jednotky a obrannÃ© objekty", "pryÄ"  ];
		break;
		
	case "dk":  //by Ronster Madsen
		aLangBuildings = ["", "Skovhugger", "Lergrav", "Jernmine", "Kornavler", "Savvark", "Lerbranderi", "Jernstoberi", "Kornmolle", "Bageri", "Rastoflager", "Kornlager", "Rustningssmedje", "Vabensmedje", "Turneringsplads", "Hovedbygning", "Forsamlingsplads", "Markedsplads", "Ambassade", "Kaserne", "Stald", "Varksted", "Akademi", "Gemmested", "Radhus", "Residens", "Palads", "Skatkammer", "Handelskontor", "Stor Kaserne", "Stor Stald", "Bymur", "Jordvold", "Palisade", "Stenhugger", "Bryggeri", "Faldebygger", "Heltebygning", "Stort Rastoflager", "Stort Kornkammer", "Verdensunder"];
		aLangTasks = ["Byg", "Viderebyg", "Angrib", "Udforsk", "Uddan"];
		aLangStrings = ["Byg senere", "Viderebyg senere", "Angrib senere", "Udforsk senere", "Planlag denne opgave til  senere.", "Vi har startet byggeriet", " Blev forsogt med ukendt resultat.", "Trin", " kan ikke bygges.", " kan ikke viderebygges.", "Opgaven blev planlagt til senere.", "Nuvarende produktion:", "Vi kan ikke planlagge denne opgave lige nu.", "Opgaveplanlagning er ikke tilgangelig!", "Planlagte opgaver", "Slet", "Send senere", "Angrebet kan ikke planlagges, da der ikke er tropper tilgangelig.",	"Dine tropper blev sendt til", "Dine tropper kunne ikke sendes til", "Opbakning", "Angrib", "Plyndringstogt", "Katapulterne skyder mod", "tilfaldigt", "mod", "eller mod", "sekunder", "minutter", "timer", "dage", "Efterforsk rastoffer og tropper", "Efterforsk forsvarsanlag og tropper", "away"];
		break;
		
	case "hu": //by [TAJM]Kobra,
		aLangBuildings = ["", "FavÃ¡gÃ³", "AgyagbÃ¡nya", "VasÃ©rcbÃ¡nya", "BÃºzafarm", "FafeldolgozÃ³", "AgyagÃ©getÅ‘", "VasÃ¶ntÃ¶de", "Malom", "PÃ©ksÃ©g", "RaktÃ¡r", "MagtÃ¡r", "FegyverkovÃ¡cs", "PÃ¡ncÃ©lkovÃ¡cs", "GyakorlÃ³tÃ©r", "FÅ‘Ã©pÃ¼let", "GyÃ¼lekezÅ‘tÃ©r", "Piac", "KÃ¶vetsÃ©g", "KaszÃ¡rnya", "IstÃ¡llÃ³", "MÅ±hely", "AkadÃ©mia", "Rejtekhely", "TanÃ¡cshÃ¡za", "Rezidencia", "Palota", "KincstÃ¡r", "Kereskedelmi kÃ¶zpont", "Nagy KaszÃ¡rnya", "Nagy IstÃ¡llÃ³", "KÅ‘fal", "FÃ¶ldfal", "CÃ¶lÃ¶pfal", "KÅ‘faragÃ³", " SÃ¶rfÅ‘zde", "CsapdakÃ©szÃ­tÅ‘", "HÅ‘sÃ¶k hÃ¡za", "Nagy RaktÃ¡r", "Nagy MagtÃ¡r", "VilÃ¡gcsoda"];
		aLangTasks = ["Ã‰pÃ­tÃ©s", "SzintemelÃ©s", "TÃ¡madÃ¡s", "FejlesztÃ©s", "KikÃ©pzÃ©s"];
		aLangStrings = ["Ã‰pÃ­tÃ©s kÃ©sÅ‘bb", "SzintemelÃ©s kÃ©sÅ‘bb", "TÃ¡madÃ¡s kÃ©sÅ‘bb", " FejlesztÃ©s kÃ©sÅ‘bb", "A mÅ±velet idÅ‘zÃ­tve kÃ©sÅ‘bbre.", "Az Ã©pÃ­tÃ©s elkezdÅ‘dÃ¶tt ", " MegprÃ³bÃ¡ltam ismeretlen eredmÃ©nnyel.", "szint", "nem Ã©pÃ¼lhet meg.", " nem lehet szintetemelni.", "IdÅ‘zÃ­tÃ©sre kerÃ¼lt feladat:", " Jelenlegi termelÃ©s:", "Jelenleg nem idÅ‘zÃ­thetÅ‘", "A feladat idÅ‘zÃ­tÃ©s nem elÃ©rhetÅ‘!", "IdÅ‘zÃ­tett feladatok:", "TÃ¶rlÃ©s", "KÃ¼ldÃ©s kÃ©sÅ‘bb", "A tÃ¡madÃ¡s nem idÅ‘zÃ­thetÅ‘! Nem lettek egysÃ©gek kivÃ¡lasztva.", "Az egysÃ©geid elkÃ¼ldve", "Az egysÃ©gek elkÃ¼ldÃ©se nem sikerÃ¼lt, ide:", "TÃ¡mogatÃ¡s", "NormÃ¡l tÃ¡madÃ¡s", "RablÃ³tÃ¡madÃ¡s", "A katapult(ok) cÃ©lpontja", "vÃ©letlenszerÅ±", "Ekkor:", "vagy kÃ©sleltetve", "mÃ¡sodperccel", "perccel", "Ã³rÃ¡val", "nappal", "Nyersanyagok Ã©s egysÃ©gek kikÃ©mlelÃ©se", "EgysÃ©gek Ã©s Ã©pÃ¼letek kikÃ©mlelÃ©se", ""];
		break;
  
	case "it":  //by Tazzicus
		aLangBuildings = ["", "Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano", "Falegnameria", "Fabbrica di mattoni", "Fonderia", "Mulino", "Forno", "Magazzino", "Granaio", "Fabbro", "Armeria", "Arena", "Centro del villaggio", "Caserma", "Mercato", "Ambasciata", "Campo d'addestramento", "Scuderia", "Officina", "Accademia", "Deposito Segreto", "Municipio", "Residence", "Castello", "Stanza del tesoro", "Ufficio commerciale", "Grande caserma", "Grande scuderia", "Mura cittadine", "Murata in terra", "Palizzata", "Genio civile", "Birreria", "Esperto di trappole", "Circolo degli eroi", "Grande Magazzino", "Grande Granaio", "Meraviglia"];
		aLangTasks = ["Costruisci", "Amplia", "Attacca", "Ricerca", "Addestra"];
		aLangStrings = ["Costruisci piu' tardi", "Amplia piu' tardi", "Attacca piu' tardi", "Ricerca piu' tardi", "Programma questa attivita'.", "E' iniziata la costruzione di ", " e' stata tentata con risultato sconosciuto.", "livello", " non puo' essere costruito.", " non puo' essere ampliato.", "L'attivita' e' stata programmata.", "Produzione:", "Non e' possibile programmare questa attivita' adesso.", "Programmazione attivita' non disponibile!", "Attivita' Programmate", "Cancella", "Invia piu' tardi", "L'attacco non puo' essere programmato in quanto non sono state selezionate truppe.", "Truppe sono state inviate a", "Non e' stato possibile inviare le truppe a", "Rinforzo", "Attacco", "Raid", "Obiettivo catapulte:", "a caso", "all'orario", "oppure dopo", "secondi", "minuti", "ore", "giorni", "Spiare truppe e risorse", "Spiare difese e truppe", "assente"];
		break;
		
	case "nl":  //by Kris Fripont
		aLangBuildings = ["", "Houthakker", "Klei-afgraving", "IJzermijn", "Graanveld", "Zaagmolen", "Steenbakkerij", "IJzersmederij", "Korenmolen", "Bakkerij", "Pakhuis", "Graansilo", "Wapensmid", "Uitrustingssmederij", "Toernooiveld", "Hoofdgebouw", "Verzamelplaats", "Marktplaats", "Ambassade", "Barakken", "Stal", "Werkplaats", "Academie", "Schuilplaats", "Raadhuis", "Residentie", "Paleis", "Schatkamer", "Handelskantoor", "Grote Barakken", "Grote Stal", "Stadsmuur", "Aardmuur", "Palissade", "Steenbakkerij", "Brouwerij", "Vallenzetter", "Heldenhof", "Groot Pakhuis", "Grote Graansilo", "Wonder"];
		aLangTasks = ["Gebouw Bouwen", "Verbeter", "Val Aan", "Ontwikkel", "Train"]; 
		aLangStrings = ["Bouw later", "Verbeter later", "Val later aan", "Ontwikkel later", "Plan deze taak voor later.", "Bouw is begonnen ", " geprobeerd maar resultaat onbekend.", "niveau", " kan niet worden gebouwd.", " kan niet worden verbeterd.", "deze taak was gepland.", "Actuele productie:", "We kunnen deze taak nu niet plannen.", "Deze taak plannen is niet beschikbaar!", "Geplande taken", "Verwijder", "Stuur later", "De aanval kan niet worden gepland omdat er geen troepen zijn geselecteerd.", "Jou troepen zijn gestuurd naar", "Jou troepen konden niet worden gestuurd naar", "Versterk", "Val aan", "Roof", "De katapulten zullen mikken op", "willekeurig", "op", "of na", "seconden", "minuten", "uren", "dagen", "spioneer naar voorraden en troepen", "spioneer naar troepen en verdediging", "weg"];
		break;
		
	case "no":  //by Lordlarm @ S3 [*LORDS* 4 EVER]
        aLangBuildings = ["", "Tommer", "Leire", "Jern", "Korn", "Sagbruk", "Murer", "Jern-smelteverk", "Molle", "Bakeri", "Varehus", "Silo", "Rustningssmed", "Vabensmed", "Turneringsplass", "Hovedbygning", "Moteplass", "Markedsplass", "Ambassade", "Kaserne", "Stall", "Varksted", "Akademi", "Hemmelig jordkjeller", "Radhus", "Residens", "Palass", "Skattekammer", "Handelskontor", "Stor Kaserne", "Stor Stall", "Bymur", "Jordmur", "Palisade", "Stenhugger", "Bryggeri", "Fallemaker", "Heltenes villa", "Stort varehus", "Stor silo", "Verdensunderverk"];
        aLangTasks = ["Bygg", "Viderebygg", "Angrip", "Utforsk", "Tren"];
        aLangStrings = ["Bygg senere", "Viderebygg senere", "Angrip senere", "Utforsk senere", "Planlegg denne oppgaven til senere.", "Vi har startet byggingen",            " Ble forsokt med ukjent resultat.", "Niva", " Kan ikke bygges.", " Kan ikke viderebygges.", "Opgaven ble planlagt til senere.", "Navarende produksjon:", "Vi kan ikke planlegge denne oppgave akkurat na.", "Oppgaveplanlegging er ikke tilgjengelig!", "Planlagte oppgaver", "Slett", "Send senere", "Angrepet kan ikke planlegges, da det ikke er tropper tilgjengelig.", "Dine tropper ble sendt til", "Dine tropper kunne ikke sendes til", "Support", "Angrip", "Plyndringstokt", "Katapultene skyter mot", "tilfeldig", "mot", "eller mot", "sekunder", "minutter", "timer", "dager", "Spioner pa rastoffer og tropper", "Spioner pa forsvarsverk og tropper", "away"];
		break;
		
	case "pt":  //by Guinness
		aLangBuildings = ["", "Bosque", "PoÃ§o de Barro", "Mina de Ferro", "Campo de Cereais", "SerraÃ§Äƒo", "Alvenaria", "FundiÃ§Äƒo", "Moinho", "Padaria", "ArmazÃ©m", "Celeiro", "Ferreiro", "FÃ¡brica de Armaduras", "PraÃ§a de Torneios", "EdifÃ­cio principal", "Ponto de ReuniÄƒo Militar", "Mercado", "Embaixada", "Quartel", "CavalariÃ§a", "Oficina", "Academia", "Esconderijo", "Casa do Povo", "ResidÃªncia", "PalÃ¡cio", "CÃ¢mara do Tesouro", "Companhia do ComÃ©rcio", "Grande Quartel", "Grande CavalariÃ§a", "Muralhal", "Muro de Terra", "PaliÃ§ada", "Pedreiro", "Cervejaria", "FÃ¡brica de Armadilhas", "MansÄƒo do HerÃ³i", "Grande ArmazÃ©m", "Grande Celeiro", "Maravilha do Mundo"];
		aLangTasks = ["Construir", "Melhorar", "Atacar", "Desenvolver", "Treinar"];
		aLangStrings = ["Construir Mais Tarde", "Melhorar Mais Tarde", "Atacar Mais Tarde", "Desenvolver Mais Tarde", "Programa esta tarefa para mais tarde.", "ComeÃ§amos a construir ", " foi tentada a tarefa mas com resultado desconhecido.", "nÃ­vel", " nÄƒo pode ser construÃ­do.", " nÄƒo pode ser melhorado.", "A tarefa foi programada.", "Em construÃ§Äƒo:", "NÄƒo conseguimos programar esta tarefa agora.", "ProgramaÃ§Äƒo de tarefas nÄƒo estÃ¡ disponivel!", "Tarefas Programadas", "Apagar", "Enviar Mais Tarde", "O ataque nÄƒo pode ser programado pois nÄƒo foram seleccionadas nenhumas tropas.", "As tuas tropas foram enviadas para", "NÄƒo foi possivel enviar as tuas tropas para", "ReforÃ§os", "Ataque:normal", "Ataque:assalto", "O alvo das Catapultas serÃ¡", "AleatÃ³rio", "Å•s", "ou depois", "segundos", "minutos", "horas", "dias", "Espiar recursos e tropas", "Espiar defesas e tropas", "Ausente"];
		break;
		
	case "pl":
        aLangBuildings = ["", "Las", "Kopalnia gliny", "Kopalnia Å¼elaza", "Pole zboÅ¼a", "Tartak", "Cegielnia", "Huta stali", "MÅ‚yn", "Piekarnia", "Magazyn surowcÃ³w", "Spichlerz","Zbrojownia", "KuÅºnia", "Plac turniejowy", "GÅ‚Ã³wny budynek", "Miejsce zbiÃ³rki", "Rynek", "Ambasada", "Koszary", "Stajnia", "Warsztat", "Akademia", "KryjÃ³wka", "Ratusz", "Rezydencja", "PaÅ‚ac","Skarbiec", "Targ", "DuÅ¼e koszary", "DuÅ¼a stajnia", "Mury obronne", "WaÅ‚y", "Palisada", "Kamieniarz", "Browar", "Traper", "DwÃ³r bohaterÃ³w", "DuÅ¼y magazyn", "DuÅ¼y spichlerz", "Cud"];
        aLangTasks = ["Buduj", "Rozbuduj", "Atak", "ZbadaÄ‡", "SzkoliÄ‡"];
        aLangStrings = ["Buduj pÃ³Åºniej", "Rozbuduj pÃ³Åºniej", "Atakuj pÃ³Åºniej", "Zbadaj pÃ³Åºniej", "Zaplanuj zadanie na pÃ³Åºniej.", "RozpoczÄ™to budowÄ™ ", " zostaÅ‚a podjÄ™ta z nieznanym skutkiem.", "poziom", " nie moÅ¼e byc zbudowany.", " nie moze byc rozbudowany.", "Zadanie zostaÅ‚o zaplanowane.", "Aktualna produkcja:", "Nie mozna teraz zaplanowac tego zadania.", "Planowanie nie dostepne!", "Zaplanowane zadania", "UsuÅ„", "WyÅ›lij pÃ³Åºniej", "Atak nie moÅ¼e byc zaplanowany gdyÅ¼ nie wybrano Å¼adnych jednostek.", "Twoje jednoski zostaÅ‚y wysÅ‚ane", "Twoje jednostki nie mogÄ… zostaÄ‡ wysÅ‚ane", "Pomoc", "Atak", "GrabieÅ¼", "Katapulty dotrÄ… o", "losowy", "o", "lub za", "sekundy", "minuty", "godziny", "dni", "Obserwuj surowce i jednostki", "Obserwuj fortyfikacje i jednostki", "away"];
        break;
	
	case "ro":  //Dark EingeL
	    aLangBuildings = ["", "Cherestea", "Put de lut", "Mina de fier", "Lan de grau", "Fabrica de cherestea", "Fabrica de caramida", "Topitorie", "Moara", "Brutarie", "Hambar", "Granar", "Fierarie", "Armurier", "Arena", "Primarie", "Adunare", "Targ", "Ambasada", "Cazarma", "Grajd", "Atelier", "Academie", "Beci", "Casa de cultura", "Vila", "Palat", "Trezorerie", "Oficiu comert", "Cazarma extinsa", "Grajd extins", "Zid", "Metereze", "Palisada", "Arhitect", "Berarie", "Temnita", "Resedinta eroului", "Hambar extins", "Granar extins", "Minunea Lumii"];
	    aLangTasks = ["Cladire", "Imbunatateste", "Ataca", "Cerceteaza", "Instruieste"];
	    aLangStrings = ["Construieste mai tarziu", "Imbunatateste mai tarziu", "Ataca mai tarziu","Cerceteaza ulterior", "Programeaza acesta actiune pentru mai tarziu", "Am inceput sa construim", "A fost incercata cu rezultate necunoscute", "Nivel", "Nu poate fi construita","Nu poate fi upgradata", "Actiunea a fost programata", "Productia curenta:","Nu putem programa acesta actiune acum", "Programarea actiuni nu este disponibila!", "Actiuni Programate", "Sterge", "Trimite mai tarziu", "Atacul nu a putut fi programat pentru nu a fost selectata nicio trupa ","Trupele tale au fost trimise la", "Trupele tale nu au putut fi trimise la", "Suport","Atac", "Raid", "Catapulteaza pe la","Aleator", "la", "sau dupa","secunde", "minute", "ore","zile", "SpioneazÄƒ resurse ÅŸi unitÄƒÅ£i", "SpioneazÄƒ fortificaÅ£ii ÅŸi trupe", "plecate"];
	    break;
	
	case "ru": //by ÐÐ»ÐµÐºÑÐµÐ¹ Ð“Ð¾Ð»Ð¾Ð²Ð»ÐµÐ²
		aLangBuildings = ["", "Ð›ÐµÑÐ¾Ð¿Ð¸Ð»ÑŒÐ½Ñ‹Ð¹ Ð·Ð°Ð²Ð¾Ð´", "Ð“Ð»Ð¸Ð½ÑÐ½Ñ‹Ð¹ ÐºÐ°Ñ€ÑŒÐµÑ€", "Ð–ÐµÐ»ÐµÐ·Ð½Ñ‹Ð¹ Ñ€ÑƒÐ´Ð½Ð¸Ðº", "Ð¤ÐµÑ€Ð¼Ð°", "Ð”ÐµÑ€ÐµÐ²Ð¾Ð¾Ð±Ñ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°ÑŽÑ‰Ð¸Ð¹ Ð·Ð°Ð²Ð¾Ð´", "ÐšÐ¸Ñ€Ð¿Ð¸Ñ‡Ð½Ñ‹Ð¹ Ð·Ð°Ð²Ð¾Ð´", "Ð§ÑƒÐ³ÑƒÐ½Ð¾Ð»Ð¸Ñ‚ÐµÐ¹Ð½Ñ‹Ð¹ Ð·Ð°Ð²Ð¾Ð´", "ÐœÑƒÐºÐ¾Ð¼Ð¾Ð»ÑŒÐ½Ð°Ñ Ð¼ÐµÐ»ÑŒÐ½Ð¸Ñ†Ð°", "ÐŸÐµÐºÐ°Ñ€Ð½Ñ", "Ð¡ÐºÐ»Ð°Ð´", "ÐÐ¼Ð±Ð°Ñ€", "ÐšÑƒÐ·Ð½Ð¸Ñ†Ð° Ð¾Ñ€ÑƒÐ¶Ð¸Ñ", "ÐšÑƒÐ·Ð½Ð¸Ñ†Ð° Ð´Ð¾ÑÐ¿ÐµÑ…Ð¾Ð²", "ÐÑ€ÐµÐ½Ð°", "Ð“Ð»Ð°Ð²Ð½Ð¾Ðµ Ð·Ð´Ð°Ð½Ð¸Ðµ", "ÐŸÑƒÐ½ÐºÑ‚ ÑÐ±Ð¾Ñ€Ð°", "Ð Ñ‹Ð½Ð¾Ðº", "ÐŸÐ¾ÑÐ¾Ð»ÑŒÑÑ‚Ð²Ð¾", "ÐšÐ°Ð·Ð°Ñ€Ð¼Ð°", "ÐšÐ¾Ð½ÑŽÑˆÐ½Ñ", "ÐœÐ°ÑÑ‚ÐµÑ€ÑÐºÐ°Ñ", "ÐÐºÐ°Ð´ÐµÐ¼Ð¸Ñ", "Ð¢Ð°Ð¹Ð½Ð¸Ðº", "Ð Ð°Ñ‚ÑƒÑˆÐ°", "Ð ÐµÐ·Ð¸Ð´ÐµÐ½Ñ†Ð¸Ñ", "Ð”Ð²Ð¾Ñ€ÐµÑ†", "Ð¡Ð¾ÐºÑ€Ð¾Ð²Ð¸Ñ‰Ð½Ð¸Ñ†Ð°", "Ð¢Ð¾Ñ€Ð³Ð¾Ð²Ð°Ñ Ð¿Ð°Ð»Ð°Ñ‚Ð°",   "Ð‘Ð¾Ð»ÑŒÑˆÐ°Ñ ÐºÐ°Ð·Ð°Ñ€Ð¼Ð°", "Ð‘Ð¾Ð»ÑŒÑˆÐ°Ñ ÐºÐ¾Ð½ÑŽÑˆÐ½Ñ", "Ð“Ð¾Ñ€Ð¾Ð´ÑÐºÐ°Ñ ÑÑ‚ÐµÐ½Ð°", "Ð—ÐµÐ¼Ð»ÑÐ½Ð¾Ð¹ Ð²Ð°Ð»", "Ð˜Ð·Ð³Ð¾Ñ€Ð¾Ð´ÑŒ", "ÐšÐ°Ð¼ÐµÐ½Ð¾Ñ‚ÐµÑ", "ÐŸÐ¸Ð²Ð¾Ð²Ð°Ñ€Ð½Ñ", "ÐšÐ°Ð¿ÐºÐ°Ð½Ñ‰Ð¸Ðº ", "Ð¢Ð°Ð²ÐµÑ€Ð½Ð°", "Ð‘Ð¾Ð»ÑŒÑˆÐ¾Ð¹ ÑÐºÐ»Ð°Ð´", "Ð‘Ð¾Ð»ÑŒÑˆÐ¾Ð¹ Ð°Ð¼Ð±Ð°Ñ€", "Ð§ÑƒÐ´Ð¾"];
		aLangTasks = ["ÐŸÐ¾ÑÑ‚Ñ€Ð¾Ð¸Ñ‚ÑŒ", "Ð Ð°Ð·Ð²Ð¸Ñ‚ÑŒ", "ÐÑ‚Ð°ÐºÐ¾Ð²Ð°Ñ‚ÑŒ", "Ð˜Ð·ÑƒÑ‡Ð¸Ñ‚ÑŒ", "ÐžÐ±ÑƒÑ‡Ð¸Ñ‚ÑŒ"];
		aLangStrings = ["ÐŸÐ¾ÑÑ‚Ñ€Ð¾Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð·Ð¶Ðµ", "Ð Ð°Ð·Ð²Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð·Ð¶Ðµ", "ÐÑ‚Ð°ÐºÐ¾Ð²Ð°Ñ‚ÑŒ Ð¿Ð¾Ð·Ð¶Ðµ", "ÐžÐ±ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð·Ð¶Ðµ", "Ð—Ð°Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð·Ð°Ð´Ð°Ñ‡Ñƒ.", "ÐœÑ‹ Ð½Ð°Ñ‡Ð°Ð»Ð¸ ÑÑ‚Ñ€Ð¾Ð¸Ñ‚ÐµÐ»ÑŒÑÑ‚Ð²Ð¾ ", " Ð¼Ñ‹ Ð¿Ð¾Ð¿Ñ€Ð¾Ð±Ð¾Ð²Ð°Ð»Ð¸, Ð½Ð¾ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚ Ð½Ðµ Ð¸Ð·Ð²ÐµÑÑ‚ÐµÐ½.", "ÑƒÑ€Ð¾Ð²ÐµÐ½ÑŒ", " Ð½Ðµ Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ Ð¿Ð¾ÑÑ‚Ñ€Ð¾ÐµÐ½Ð¾.", " Ð½Ðµ Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ Ñ€Ð°Ð·Ð²Ð¸Ñ‚Ð¾.", "Ð—Ð°Ð´Ð°Ñ‡Ð° Ð·Ð°Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð°.", "Ð¢ÐµÐºÑƒÑ‰ÐµÐµ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´ÑÑ‚Ð²Ð¾:", "ÐœÑ‹ Ð½Ðµ Ð¼Ð¾Ð¶ÐµÐ¼ Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ ÑÑ‚Ð¾Ð³Ð¾ ÑÐµÐ¹Ñ‡Ð°Ñ.", "Ð—Ð°Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð¾Ð¹ Ð·Ð°Ð´Ð°Ñ‡Ð¸ Ð½Ðµ ÑÑƒÑ‰ÐµÑÑ‚Ð²ÑƒÐµÑ‚!", "Ð—Ð°Ð¿Ð»Ð¿Ð½Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ðµ Ð·Ð°Ð´Ð°Ñ‡Ð¸", "Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ", "ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð·Ð¶Ðµ", "ÐÑ‚Ð°ÐºÐ° Ð½Ðµ Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ Ð·Ð°Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð°, Ð¿Ð¾ÑÐºÐ¾Ð»ÑŒÐºÑƒ Ð²Ð¾Ð¹ÑÐºÐ° Ð½Ðµ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ñ‹.", "Ð’Ð°ÑˆÐ¸ Ð²Ð¾Ð¹ÑÐºÐ° Ð±Ñ‹Ð»Ð¸ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð½Ñ‹", "Ð’Ð°ÑˆÐ¸ Ð²Ð¾Ð¹ÑÐºÐ° Ð½Ðµ Ð¼Ð¾Ð³ÑƒÑ‚ Ð±Ñ‹Ñ‚ÑŒ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ñ‹", "ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ°", "ÐÑ‚Ð°ÐºÐ°", "ÐÐ°Ð±ÐµÐ³", "ÐšÐ°ÐºÐ°Ð¿ÑƒÐ»ÑŒÑ‚Ñ‹ Ð½Ð°Ñ†ÐµÐ»ÐµÐ½Ñ‹ Ð½Ð°", "Ð¡Ð»ÑƒÑ‡Ð°Ð¹Ð½Ð¾", "Ð²", "Ð¸Ð»Ð¸ Ð¿Ð¾ Ð¸ÑÑ‚ÐµÑ‡ÐµÐ½Ð¸Ð¸", "ÑÐµÐºÑƒÐ½Ð´", "Ð¼Ð¸Ð½ÑƒÑ‚", "Ñ‡Ð°ÑÐ¾Ð²", "Ð´Ð½ÐµÐ¹", "Ð Ð°Ð·Ð²ÐµÐ´ÐºÐ° Ñ€ÐµÑÑƒÑ€ÑÐ¾Ð² Ð¸ Ð²Ð¾Ð¹ÑÐº", "Ð Ð°Ð·Ð²ÐµÐ´ÐºÐ° Ð²Ð¾Ð¹ÑÐº Ð¸ Ð¾Ð±Ð¾Ñ€Ð¾Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ñ… ÑÐ¾Ð¾Ñ€ÑƒÐ¶ÐµÐ½Ð¸Ð¹", "ÐžÑ‚ÑÑƒÑ‚ÑÑ‚Ð²ÑƒÐµÑ‚"];
		break;
	
	case "us":  //by m4rtini
		aLangBuildings = ["", "Sekalec lesa", "Glinokop", "Rudnik Å¾eleza", "Å½itno polje", "Å½aga", "Opekarna", "Talilnica Å¾eleza", "Mlin", "Pekarna", "SkladiÅ¡Äe", "Å½itnica", "Izdelovalec oroÅ¾ja", "Izdelovalec oklepov", "VadbiÅ¡Äe", "Gradbeni ceh", "ZbiraliÅ¡Äe", "TrÅ¾nica", "Ambasada", "Barake", "KonjuÅ¡Änica", "Izdelovalec oblegovalnih naprav", "Akademija", "Å pranja", "Mestna hiÅ¡a", "Rezidenca", "PalaÄa", "Treasury", "Trade Office", "Velike barake", "Velika konjuÅ¡nica", "City Wall", "Zemljen zid", "Palisade", "Kamnosek", "Brewery", "Postavljalec pasti", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"]; 
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "The attack cannot be scheduled because no troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away"];
		break;
	
	case "en":
	case "com":
	case "uk":
	default: // default is english
		aLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally Point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Townhall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"];
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later",
			"Research later", "Schedule this task for later.", "We started builing ", 
			" was attempted with unknown result.", "level", " cannot be built.", 
			" cannot be upgraded.", "The task was scheduled.", "Current production:", 
			"We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", 
			"Delete", "Send later", "The attack cannot be scheduled because no troops were selected.",
			"Your troops were sent to", "Your troops could not be sent to", "Support", 
			"Attack", "Raid", "Catapults will aim at",
			"random", "at", "or after",
			"seconds", "minutes", "hours", 
			"days", "Spy for resources and troops", "Spy for troops and defenses",
			"away"
		];
		break;
}



// --- Custom log function ---
function _log(level, msg) {
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1)
		GM_log(msg);
}


function checkSetTasks() {
		_log(2, "Checking set tasks...");
		_log(3, "oIntervalReference " + oIntervalReference);
	
	if(bLocked) {
			_log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
		return false;
	}
	
	bLocked = true;	
	var data = readCookie("TTQ_TASKS");
	if(data == '') {  // no tasks are set
			_log(2, "No tasks are set. ");
		// stop checking, it would be pointless. Checking will be restarted when new tasks are set.
		if(oIntervalReference) {
			_log(3, "clearInterval()");
			window.clearInterval(oIntervalReference);
			oIntervalReference = null;
		}
		bLocked = false;
		return false;
	}
	var oDate = new Date();
	
	var aTasks = data.split("|");
	var bTaskDeleted = false;
	for(var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");
		
		// The stored time (Unix GMT time) should be compared against the GMT time, not local!
		if(aThisTask[1] <= oDate.getTime()/1000) {
				_log(2, "Triggering task: " + aTasks[i]);
			triggerTask(aThisTask);
			aTasks.splice(i, 1);  //delete this task
			bTaskDeleted = true;
		} else if( (aThisTask[0] < 2) && (aThisTask[1] <= ((oDate.getTime()/1000) + iPreloadTime)) ) {  //prefetch the code if the task is to be triggered in less than iPreloadTime
				_log(2, "Some building/upgrading task is set, but it is not the time yet. It is time to preload the code though.");
						
				getCode(aThisTask[2], aThisTask[4]);	

			
		} else {
				_log(2, "Some task is set, but it is not the time yet.");
		}
	}
	
	// rewrite stored tasks if any task was deleted
	if(bTaskDeleted) {
		refreshTaskList(aTasks);
			_log(3, "Rewriting cookie.");
		data = aTasks.join("|"); 
			_log(3, "New cookie: " + data);
		createCookie("TTQ_TASKS", data, 365);			
	}
	bLocked = false;
		
}

function refreshTaskList(aTasks) {
		_log(3, "-> refreshTaskList()");
		
	// Remove old task list
	var oOldTaskList = document.getElementById("ttq_tasklist");
	if(oOldTaskList) {document.body.removeChild(oOldTaskList)};
	
	//if there are no tasks set, return
	if(!aTasks || aTasks.length < 1) {
		return;
	}

	var sTime = "";
	
	//Create new tasklist
	var oTaskList = document.createElement('div');
	oTaskList.id = "ttq_tasklist";
	oTaskList.innerHTML = "<div id='ttq_draghandle' class='handle' style='cursor: move;	;font-size: 120%; font-weight:bold;' >"+aLangStrings[14]+"</div>";
	oTaskList.style.border = "1px solid #000000";
	oTaskList.style.position = "absolute";
	oTaskList.style.backgroundColor = "#90DD43";
	oTaskList.style.color = "#000000";	
	oTaskList.style.padding = "5px 10px";
	oTaskList.style.zIndex = "100";
	
	//position the list
	var listCoordinates = readCookie("TTQ_LIST_POSITION");
	if(listCoordinates) {
		var listCoordinates = listCoordinates.split(",");
		oTaskList.style.top = listCoordinates[0];
		oTaskList.style.left = listCoordinates[1];
	} else {
		oTaskList.style.left = "687px";
	}
	
	document.body.appendChild(oTaskList);

	makeDraggable(document.getElementById('ttq_draghandle'));		
	
	for(var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");
		var oDate = new Date(aThisTask[1] * 1000);		
		sTime = oDate.toLocaleString();
		oDate = null;
		
		var oDeleteLink = document.createElement('a');
		oDeleteLink.innerHTML = "<img src='" +sDeleteBtn+ "' alt='X'/>";
		oDeleteLink.href = "#";
		oDeleteLink.title = aLangStrings[15];
		oDeleteLink.setAttribute("itaskindex", i);
		oDeleteLink.addEventListener('click',	deleteTask, false);
		
		var oTaskRow = document.createElement("div");
		oTaskRow.id = "ttq_task_row_" +i;
		
		var sTaskSubject = "";
		var sTask = "";
		switch(aThisTask[0]) {
			case "0":  //build
			case "1":  //upgrade
				sTaskSubject = aLangBuildings[aThisTask[3]];
				sTask = aLangTasks[aThisTask[0]];
				break;
			case "2":  //attack
				//sTaskSubject = aThisTask[2];
				sTaskSubject = getPlaceName(aThisTask[2]);
				if(sTaskSubject == '') {sTaskSubject = aThisTask[2]};
				var aTroops = aThisTask[3].split("_");
				var iIndex = parseInt(aTroops[0]) + 18; 
				sTask = aLangStrings[iIndex];
				break;
			case "3":  //research
				break;
			default:
				break;
		}	
		
		var sVillageName = '';
		if(aThisTask[4] != 'null') {
			sVillageName = " — " +getVillageName(aThisTask[4]);
		}
		
		oTaskRow.innerHTML = "<span style='font-style: italic; font-size: 80%;'>" +sTime + sVillageName+ ":</span> " +sTask+ " " +sTaskSubject+ " </span>";
		
		oTaskRow.appendChild(oDeleteLink);
		oTaskList.appendChild(oTaskRow);
		
		oDeleteLink = null;
		oTaskRow = null;
	}	
	
		_log(3, "<- refreshTaskList()");
}

function deleteTask(e) {
		_log(3, "-> deleteTask()");
	var iTaskIndex = e.target.parentNode.getAttribute("itaskindex");
		_log(2, "Deleting task "+iTaskIndex);	

	if(bLocked) {
			_log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
		return false;
	}
		
	bLocked = true;
	var data = readCookie("TTQ_TASKS");
	if(data == '') {	
			_log(2, "No tasks are set. ");
		bLocked = false;
		return false;  // no tasks are set
	}
	var aTasks = data.split("|");
	aTasks.splice(iTaskIndex, 1);  //delete this task
	data = aTasks.join("|"); 
	createCookie("TTQ_TASKS", data, 365);	
	bLocked = false;
	refreshTaskList(aTasks);
	return false;  // we return false to override default action on the link
		_log(3, "<- deleteTask()");
}

/**
  * Schedules the specified task
  * @ iTask: name of the task (0-build, 1-upgrade, 2-attack, 3-research)
  * @ iWhen: date when the task is to be triggered
  * @ target: iBuildingId, or iVillageId 
  * @ options: what to build, what units to send attacking (first member specifies the type of attack: 0-support, 1-normal attack, 2-raid)
  *
  * The task is stored in a cookie. 
  */
function setTask(iTask, iWhen, target, options) {
		_log(3, "-> setTask()");
			
	var iVillageId = getActiveVillage();

	if(bLocked) {
			_log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
		return false;
	}
	
	bLocked = true;
	var data = readCookie("TTQ_TASKS");
	var oldValue = (data == null || data.length <= 1 || data == '') ? '' : data + '|';
	var newValue = oldValue + iTask + ',' + iWhen + ',' + target + ',' + options;
	if(iVillageId) {
		newValue += ',' + iVillageId;
	} else {
		newValue += ',' + 'null';
	}
		_log(2, "Writing cookie: "+newValue);
	if(!createCookie("TTQ_TASKS", newValue, 365)) {
		printMsg("<span style='font-style: italic; font-size: 80%; display:block;'>" +getVillageName(iVillageId)+ "</span>" +aLangStrings[12], true);
		bLocked = false;
		return false;
	}
	bLocked = false;
	
	var aTasks = newValue.split("|");
	refreshTaskList(aTasks);	

	// Generate message
	var sTaskSubject = "";
	switch(iTask) {
		case "0":  //build
		case "1":  //upgrade
			sTaskSubject = aLangBuildings[options];
			break;
		case "2":  //attack
			sTaskSubject = getPlaceName(target);
			if(sTaskSubject == '') {sTaskSubject = target};
			break;
		case "3":  //research
			break;
		default:
			break;
	}
	
	printMsg("<span style='font-style: italic; font-size: 80%; display:block;'>" +getVillageName(iVillageId)+ "</span>" + aLangStrings[10] + "<br/><span style='font: italic 80%;'>" +aLangTasks[iTask]+ " " +sTaskSubject+ "</span>");
	if(!oIntervalReference) {
		oIntervalReference = window.setInterval(checkSetTasks, iCheckEvery);  //start checking if there is any task to trigger
		_log(2, "Started checking for the set tasks...");
	}
		_log(3, "<- setTask()");
}


/*
 * Performs the supplied task. Prints the report.
 * @ aTask: {task, when, target, options}
 */
function triggerTask(aTask) {
		_log(3, "-> triggerTask()");
	switch(aTask[0]) {
		case "0":
			//build new building
			build(aTask);
			break;
		case "1":
			// upgrade building
			upgrade(aTask);
			break;
		case "2":
			// upgrade building
			attack(aTask);
			break;
		default:
			//do nothing
				_log(3, "Can't trigger an unknown task.");
				break;
	}
		_log(3, "<- triggerTask()");
}

function build(aTask) {
		_log(3, "-> build()");

	// we will assume that there is a correct up-to-date code in the cookie
	var sCode = '';
	
	var sCookie = readCookie("TTQ_CODE_0");	
	if(sCookie != '') {
			_log(3, "Cookie found.");
		var aCookie = sCookie.split(",");
		var iIndexOfVillageId = aCookie.indexOf(aTask[4]);
		if(iIndexOfVillageId > -1) {  //the village id found
			sCode = aCookie[iIndexOfVillageId + 1];
		}
	} else {
			_log(3, "No cookie available.");	
	}
	
	//TODO: if the code is not there, or is there but incorrect, try to get a new one, register event listener, and start building when the code is updated (implement timeouts to this)
	
	if(sCode == '') {  // no code - no building possible
		_log(1, "No code found. Building this building is not possible.");
		printMsg("<span style='font-style: italic; font-size: 80%; display:block;'>" +getVillageName(aTask[4])+ "</span>" + aLangBuildings[aTask[3]] + aLangStrings[8], true); // Your building can't be built.
		return false;
	}
	
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}
	
	var sUrl = "dorf2.php?";
	sUrl += "a=" +aTask[3]+ "&id=" +aTask[2]+ "&c=" +sCode + sNewDid; 
	loadURL(sUrl, aTask);
		_log(3, "<- build()");
}

function upgrade(aTask) {
		_log(3, "-> upgrade()");
		
	// try to load the code
	var sCode = '';
	
	var sCookie = readCookie("TTQ_CODE_1");	
	if(sCookie != '') {
			_log(3, "Cookie found.");
		var aCookie = sCookie.split(",");
		var iIndexOfVillageId = aCookie.indexOf(aTask[4]);
		if(iIndexOfVillageId > -1) {  //the village id found
			sCode = aCookie[iIndexOfVillageId + 1];
		}
	} else {
			_log(3, "No cookie found.");	
	}	
	
	if(sCode == '') {  // no code - no building possible
		_log(1, "No code found. Upgrading this building is not possible.");
		printMsg("<span style='font-style: italic; font-size: 80%; display:block;'>" +getVillageName(aTask[4])+ "</span>" + aLangBuildings[aTask[3]] + aLangStrings[9], true); // Your building can't be built.
		return false;
	}
	
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}
	
	if(aTask[3] < 19) {  //it's resource site
		var sUrl = "dorf1.php?";
	} else {
		var sUrl = "dorf2.php?";
	}
	
	sUrl += "a=" +aTask[2]+ "&c=" +sCode + sNewDid; 
		_log(3, sUrl);
	loadURL(sUrl, aTask);
		_log(3, "<- upgrade()");
}

function attack(aTask) {
		_log(3, "-> attack()");
		
	var aTroops = new Array();  //extract troops numbers and attack type
	aTroops = aTask[3].split("_");
	var iAttackType = aTroops[0];
	
	var sParams = "id=39&c=" +iAttackType+ "&kid=" +aTask[2]+ "&a=12345";  //TODO: "a" parameter may need to be specified
	for(var i = 1; i <= 11; i++) {
		sParams += "&t" +i+ "=" +aTroops[i];
	}	
	
	//if we are sending catapults, we need to set target
	var iCataTarget = 99;  //random by default
	if(aTroops[8] > 0) {			
		if(aTroops[12]) { 
			sParams += "&kata=" +aTroops[12];
		}  
		
			_log(3, "We are sendings catapults to bombard " +iCataTarget);
	}
	
	//if sending scouts, additional variable is needed	
	var iScoutUnit = parseInt(readCookie("TTQ_SCOUT_UNIT"));
	if(iScoutUnit != 3 && iScoutUnit != 4) {  //3 or 4 are the only valid values
			_log(2, "Unknown iScoutUnit. Unable to proceed with sending this attack.");
			return false;
	}
	if(aTroops[iScoutUnit] > 0 && onlySpies(aTroops)) {  
			_log(3, "We are sendings scouts.");		
		if(aTroops[12]) {
			var iScoutMode = aTroops[12];
		} else {
			var iScoutMode = 1;  //"Spy troops  and resources" by default	
		}
		sParams += "&spy=" +iScoutMode;
	}
		_log(3, "sParams\n"+sParams);	
		
	if(aTask[4] != 'null') {  //multiple villages
		//we need to switch village
			_log(2, "Switching to village:" +aTask[4]);
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", "a2b.php?newdid=" + aTask[4], true);
		httpRequest.onreadystatechange = function() { 
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) { // ok
						_log(2, "Village switched to " +aTask[4]);
					loadURLpost("a2b.php", sParams, aTask[2]);
						_log(2, "The attack was requested.");
				}
			}
		};
		httpRequest.send(null);		
	} else {  //only 1 village. Perform attack immediately
		loadURLpost("a2b.php", sParams, aTask[2]);
			_log(2, "The attack was requested.");
	}	
	
		_log(3, "<- attack()");
}


/*
 * loadURL()
 * When @bOnlyLoad is true, no listener is registered
 */
function loadURL(sUrl, aTask, bOnlyLoad) {
		_log(3, "-> loadURL()");
		_log(2, "Loading sUrl = " + sUrl);
	var httpRequest = new XMLHttpRequest();
	//httpRequest.overrideMimeType("application/xml");
	if(!bOnlyLoad) {
		httpRequest.onreadystatechange = function() { 
			handleHttpRequest(httpRequest, aTask); 
		};
	}
	httpRequest.open("GET", sUrl, true);
	httpRequest.send(null);
		_log(3, "<- loadURL()");
}

function loadURLpost(sUrl, sParams, iVillageId) { 
		_log(3, "-> loadXMLDoc()");
   
	if (window.XMLHttpRequest) {
		var httpRequest = new XMLHttpRequest();		
		httpRequest.onreadystatechange = function() {handleHttpRequestAttack(httpRequest, iVillageId)};
		sParams = encodeURI(sParams);
		httpRequest.open("POST", sUrl, true);
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.setRequestHeader("Content-length", sParams.length);
		httpRequest.setRequestHeader("Connection", "close");	
		httpRequest.overrideMimeType('text/html');
		httpRequest.send(sParams);
	} else {
		_log(2, "XMLHTTP object not available.");
	} 
		_log(3, "<- loadXMLDoc()");
}

function handleHttpRequest(httpRequest, aTask) {
		_log(3, "-> handleHttpRequest()");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
				_log(3, sResponse);
			if(!sResponse) {
				// error retrieving the response
				printMsg( aLangTasks[aTask[0]] + " " + aLangBuildings[aTask[3]] + aLangStrings[3], true );
				return;
			}			
			// print message to user
			var re = new RegExp('<div id="lbau.">.*' + aLangBuildings[aTask[3]] + '.*</div>', 'i');
						_log(3, "Regular expression: \n" +re);
			if(sResponse.match(re)) {
				printMsg("<span style='font-style: italic; font-size: 80%; display:block;'>" +getVillageName(aTask[4])+ "</span>" + aLangStrings[5] + aLangBuildings[aTask[3]]);  //Your building is being built.
			} else {
				printMsg("<span style='font-style: italic; font-size: 80%; display:block;'>" +getVillageName(aTask[4])+ "</span>" + aLangBuildings[aTask[3]] + aLangStrings[8], true); // Your building can't be built.
			}
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
	}
		_log(3, "<- handleHttpRequest()");
}

function handleHttpRequest2(httpRequest, sNewdid) {  //this is used exclusively for finding the code
		_log(3, "-> handleHttpRequest2()");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
				_log(3, sResponse);
			if(!sResponse) {
				// error retrieving the response
					_log(2, "We didn't get any response. Impossible to determine the code.");
				return false;
			}
			
			findCode(sResponse, sNewdid);  
			return false;			
			
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
	}
		_log(3, "<- handleHttpRequest2()");
}

function handleHttpRequestAttack(httpRequest, iVillageId) {
		_log(3, "-> handleHttpRequestAttack()");
		
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
				_log(3, sResponse);
			if(!sResponse) {
				// error retrieving the response
					_log(2, "We didn't get any response. Impossible to determine whether the attack was sent.");
				return false;
			}
			
			var re = new RegExp('karte\\.php\\?d=' +iVillageId, 'i');
			var aMatch = sResponse.match(re);
			if(aMatch) {
					_log(1, "It seems your attack was successfully sent.");
				printMsg(aLangStrings[18] + " " +iVillageId);
			} else {
					_log(1, "Your attack could not be sent.");
				printMsg(aLangStrings[19] + " " +iVillageId, true);
			}
			
			return false;			
			
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
	}		
		
		_log(3, "<- handleHttpRequestAttack()");
}

function createLinks() {
		_log(3, "-> createLinks()");
	var re = /.*build\.php\?id=([0-9]{1,2})/i;
	var sLocation = window.location.href;
	var iSiteId = sLocation.match(re);
	if(iSiteId != null) {
		iSiteId = iSiteId[1];
			//_log(3, "Site ID: " +iSiteId);
	} else {
			_log(2, "Building site ID not found");
		return false;
	}
		
	var iTask = 0;  //the default action is build
	
	
	// Get the building name(s)
	var sXpathExpr = "//h1/b";
	var xpathRes = xpath(sXpathExpr);
	if(xpathRes.snapshotLength > 0) {  //standing building
			_log(3, "This is an existing building.");
		iTask = 1;
		var xpathBuildingNames = xpathRes;
		var re = new RegExp("(.*)\\s" + aLangStrings[7] + "\\s[0-9]{1,3}$", "i");  // Will be used later for matching buildings and resource sites
		var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");  // Will be used later. For matching "X. Cranny"	
			_log(3, "Regular expressions (existing site):\n" + re + "\n" + re2);
	} else {  //empty building site or error
			_log(3, "This is an empty building site.");
		var xpathBuildingNames = xpath("//h2");
		var re = new RegExp("^([^0-9].*)", "i");  // Will be used later. For matching all except "X. Cranny"
		var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");  // Will be used later. For matching "X. Cranny"	
			_log(3, "Regular expressions (new site):\n" + re + "\n" + re2);
	}
	

	for (var i = 0; i < xpathBuildingNames.snapshotLength; ++i) {
		//search for building id
			_log(3, "Searching for building ID...");
		
		var sBuildingName = xpathBuildingNames.snapshotItem(i).innerHTML;  // this can contain level X string		
		var aMatches = sBuildingName.match(re);
		if(aMatches) {  //Regular building
			sBuildingName = aMatches[1];
			sBuildingName = rtrim(sBuildingName);  //trim trailing spaces
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
				_log(3, "Building or resource site name found: \"" + sBuildingName +"\" \n"+ sBuildingId);
		} else if(aMatches = sBuildingName.match(re2)) {  // Cranny has different format (e.g. "3. Cranny")
			sBuildingName = aMatches[1];
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
				_log(3, "Cranny name found: " + sBuildingName +" \n"+ sBuildingId);
		}
		if(sBuildingId > 0) {
			// building found in the list			
			var oLink = document.createElement("a");
			oLink.id = "buildLater" + i;
			oLink.innerHTML = " " + aLangStrings[iTask];
			oLink.title = aLangStrings[4];
			oLink.href = "#";
			oLink.setAttribute("itask", iTask);
			oLink.setAttribute("starget", iSiteId);
			oLink.setAttribute("soptions", sBuildingId);
			oLink.addEventListener('click',	displayTimerForm, false);
									
			if(iTask == 0) {xpathBuildingNames.snapshotItem(i).nextSibling.nextSibling.appendChild(oLink);}
			else if(iTask == 1) {xpathBuildingNames.snapshotItem(i).parentNode.nextSibling.nextSibling.appendChild(oLink);}
		} else {
			_log(2, "Building name found, but it was not identified in the building list.\n");
		}
	}

		_log(3, "<- createLinks()");
}

function createAttackLinks() {
		_log(3, "-> createAttackLinks()");
		
	// create the submit button
	var oBtn = document.createElement("input");
	oBtn.type = "button";
	oBtn.value = aLangStrings[16];
	oBtn.style.margin = "3px 6px";
	oBtn.addEventListener("click", scheduleAttack, false);
	
	var oOkBtn = document.getElementsByName('s1');
	oOkBtn[0].parentNode.appendChild(oBtn);
	
	//create textbox for hero if it's not present
	var xpathResult = xpath("id('lmid2')/table[1]/tbody/tr/td/table/tbody/tr[3]/td[8]");
	if(xpathResult.snapshotLength < 1) {  //no hero textbox - make one
		xpathResult = xpath("id('lmid2')/table[1]/tbody/tr/td/table/tbody/tr[3]");
		if(xpathResult.snapshotLength > 0) {
			xpathResult.snapshotItem(0).lastChild.setAttribute("colspan", "3");
			//xpathResult.snapshotItem(0).innerHTML += '<td width="20"><img class="unit" src="img/un/u/hero.gif" title="" border="0" onclick="document.snd.t11.value=\'\'; return false;" ></td><td width="35"><input class="fm" type="Text" name="t11" value="" size="2" maxlength="6"></td><td class="f8 c b"><b>(' +aLangStrings[33]+ ')</b></td>';
			
			var oTd1 = document.createElement('td');
			var oTd2 = document.createElement('td');
			var oTd3 = document.createElement('td');
			oTd1.innerHTML = '<img class="unit" src="img/un/u/hero.gif" title="" border="0" >';
			oTd2.innerHTML = '<input class="fm" type="Text" name="t11" value="" size="2" maxlength="6">';
			oTd3.innerHTML = '<b>(' +aLangStrings[33]+ ')</b>';
			oTd3.className = 'f8 c b';
			xpathResult.snapshotItem(0).appendChild(oTd1);		
			xpathResult.snapshotItem(0).appendChild(oTd2);			
			xpathResult.snapshotItem(0).appendChild(oTd3);
			
		}
	}
		
		_log(3, "<- createAttackLinks()");
}

function scheduleAttack(e) {
		_log(3, "-> scheduleAttack()");
		
	var iVillageId = window.location.href.match(/.*a2b\.php\?(newdid=[0-9]*&)?z=([0-9]*)/);  // target village
	if(iVillageId != null) {
		iVillageId = iVillageId[2];
	} else {
			_log(2, "Target village ID not found.");
		return false;
	}
	
	var aTroops = new Array();
	var iAttackType = null;
	var sXpathExpr = "//div[@class='f10']/input[@type='radio']";
	var xpathRes = xpath(sXpathExpr);
	if(xpathRes.snapshotLength > 0) {
		for (var i = 0; i < xpathRes.snapshotLength; i++) {
			if(xpathRes.snapshotItem(i).checked) iAttackType = i+2;
		}
	} else {
			_log(2, "The type of attack was not determined. Unable to schedule the attack.");
		return false;
	}
	if(iAttackType != null) {aTroops[0] = iAttackType;}
	else {
			_log(2, "The type of attack was not determined. Unable to schedule the attack.");
		return false;
	}
	
	sXpathExpr = "//table[@class='p1']//table//td/input[@type='text']";
	xpathRes = xpath(sXpathExpr);
	
	var bNoTroops = true;
	if(xpathRes.snapshotLength > 0) {		
		for (var i = 0; i < xpathRes.snapshotLength; i++) {
			var aThisInput = xpathRes.snapshotItem(i);
				//_log(3, aThisInput.name + " = " +aThisInput.value + "\n");			
			var iTroopId = aThisInput.name.substring(1);			
			aTroops[iTroopId] = (aThisInput.value != '') ? aThisInput.value : 0;
			if(aThisInput.value) {bNoTroops = false;}  //at least 1 troop has to be sent
		}
	} else {
			_log(2, "No info about troops found. Unable to schedule the attack.");
		return false;
	}
	
		_log(3, "Troops:\n" + aTroops);
	
	if(bNoTroops) {
			_log(2, "No troops were selected. Unable to schedule the attack.");
		printMsg(aLangStrings[17] , true);
			return false;
	} 		
	
	// Good, we have at least 1 troop. Display the form
	displayTimerForm(2, iVillageId, aTroops);		
		_log(3, "<- scheduleAttack()");
}


/*
 * @iTask: 0 - build, 1 - upgrade, 2 - attack,raid,support
 * @target: sitedId for iTask = 0 or 1; iVillageId for siteId = 2
 * @options: buildingId for iTask = 0;
 */
function displayTimerForm(iTask, target, options) {
		_log(3, "-> displayTimerForm()");
	
	 // For build and upgrade, we need to extract arguments from the event object
	 if(iTask != 2) {
		var el = iTask.target;  // iTask really is the Event object!
		var iTask = parseInt(el.getAttribute("itask"));
		var target = el.getAttribute("starget");
		var options = el.getAttribute("soptions");
		if(iTask == undefined || target == undefined || options == undefined) {
				_log(2, "Missing arguments:\niTask="+iTask+"\ntarget="+target+"\noptions="+options);
			return false;
		}
	}
	
	
	var sTask = ''; 
	var sWhat = '';	
	
	switch(iTask) {
		case 0:  //build
			sWhat = aLangBuildings[options];
			sTask = aLangTasks[iTask]; 
			break;
		case 1:  //upgrade
			sWhat = aLangBuildings[options];
			sTask = aLangTasks[iTask]; 
			break;
		case 2:  //Attack, Raid, Support
			sWhat = getPlaceName(target);
			if(sWhat == '') {sWhat = target;}
			var iAttackType = parseInt(options[0]) + 18; 
			sTask = aLangStrings[iAttackType];
			var bCatapultPresent = (options[8] > 0) ? true : false;
			var bOnlySpies = onlySpies(options);  //this needs to be true for spying missions, and false for everything else!
			if(options[11] == undefined) options[11] = 0;  //if no heros are specified, set them to zero
			options = options.join("_");
			break;
	}
	
	var oTimerForm = document.createElement("form");
	
	var date = new Date();  //The suggested time is local time. 
	var dd = date.getDate();
	var mm = date.getMonth() + 1; 
	var yyyy = date.getFullYear();
	var hh = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	
	//Convert small numbers to conventional format
	if(dd < 10) {dd = "0" + dd;}
	if(mm < 10) {mm = "0" + mm;}
	if(min < 10) {min = "0" + min;}
	if(sec < 10) {sec = "0" + sec;}	
	date = yyyy+"/"+mm+"/"+dd+" "+hh+":"+min+":"+sec;
	
	// Allow target selection for catapults if this is not support and at least 1 cata is sent
	var sCataTargets = '';
	if(iTask == 2 && iAttackType > 2 && bCatapultPresent) {
		sCataTargets = '<select name="kata" size="" class="f8"><option value="99">' +aLangStrings[24]+ '</option>';
		
		for(var j=1; j < aLangBuildings.length; j++) {
			sCataTargets += '<option value="' +j+ '">' +aLangBuildings[j]+ '</option>';
		}		
		sCataTargets += "</select>";
	}
	
	//Allow specifying the spying mode (only if there is nothing but spies being sent)
	var sSpyMode = '';
	if(iTask == 2 && iAttackType > 2 && bOnlySpies) {
		sSpyMode = '<input type="radio" name="spy" value="1" checked>' +aLangStrings[31]+ ' <input type="radio" name="spy" value="2">' +aLangStrings[32];
	}
	
	oTimerForm.id = "timerForm";
	var sLinkClose = "<a href='#' onclick='document.body.removeChild(document.getElementById(\"timerForm\"));' style='float:right; padding:2px 4px; margin:-5px -15px 0 0; color:white;'><img src='" +sCloseBtn+ "' alt='X' /></a>";

	oTimerForm.innerHTML = sLinkClose + '<input type="hidden" name="timerTask" value="' +iTask+ '" /><input type="hidden" name="timerTarget" value="' +target+ '" /><input type="hidden" name="timerOptions" value="' +options+ '" /><p>' +sTask+ ' ' +sWhat+ '<br/>' +aLangStrings[25]+ ' <input name="at" type="text" id="at" value="' +date+ '" onfocus="document.getElementById(\'after\').value = \'\'; this.value=\'' +date+ '\'" /> ' +aLangStrings[26]+ ' <input name="after" type="text" id="after" onfocus="document.getElementById(\'at\').value = \'\';" /><select name="timeUnit"><option value="1" selected="selected">' +aLangStrings[27]+ '</option><option value="60">' +aLangStrings[28]+ '</option><option value="3600">' +aLangStrings[29]+ '</option><option value="86400">' +aLangStrings[30]+ '</option></select><br/></p>';
	
	if(sCataTargets != '') {
		oTimerForm.innerHTML += '<p>' +aLangStrings[23]+ ': ' +sCataTargets+ ' </p>';
	}
	
	if(sSpyMode != '') {
		oTimerForm.innerHTML += '<p>' +sSpyMode+ '</p>';
	}
	
	oTimerForm.style.position = "absolute";
	oTimerForm.style.backgroundColor = "#DEDEDE";
	oTimerForm.style.color = "black";
	oTimerForm.style.border = "2px #7C7A7B solid";
	oTimerForm.style.zIndex = "100";
	//oTimerForm.style.width = "450px";
	//oTimerForm.style.height = "200px";
	oTimerForm.style.margin = "auto 200px";
	oTimerForm.style.padding = "20px 30px";
	
	var oSubmitBtn = document.createElement("input");
	oSubmitBtn.name = "submitBtn";
	oSubmitBtn.value = "OK";
	oSubmitBtn.type = "button";
	oSubmitBtn.addEventListener('click', function() {handleTimerForm(this.form)}, true);
	oTimerForm.appendChild(oSubmitBtn);
	
	document.body.appendChild(oTimerForm);
		_log(3, "<- displayTimerForm()");
}

function handleTimerForm(oForm) {
		_log(3, "-> handleTimerForm()");
	var at = oForm.at.value;  
	if(at == '') {
		var after = oForm.after.value;
		var timeUnit = oForm.timeUnit.value;
		after = after*timeUnit;  // convert to seconds
		var oDate = new Date();
		var iWhen = parseInt(oDate.getTime()/1000 + after);
	} else {
		// convert formatted date to milliseconds
		var re = new RegExp("^(2[0-9]{3})/([0-9]{1,2})/([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})$", "i");
		var aMatch = at.match(re);  
		if(!aMatch) {
			_log(1, "You entered invalid format of date!");
			return;
		}
		for(var i = 2; i < aMatch.length; i++) {
			// convert strings to integers
			if(aMatch[i].match(/0[0-9]{1}/i)) {aMatch[i] = aMatch[i].substring(1);}
			aMatch[i] = parseInt(aMatch[i]); 
		}
			//_log(3, "Converted match:" +aMatch);
		
			//_log(3, "Creating Date object for " + aMatch[1] +"/"+ aMatch[2] +"/"+ aMatch[3] +" "+ aMatch[4] +":"+ aMatch[5] +":"+ aMatch[6]);
		var oDate = new Date(aMatch[1],aMatch[2]-1,aMatch[3],aMatch[4],aMatch[5],aMatch[6]);
		var iWhen = parseInt(oDate.getTime()/1000);
	}
	
	document.body.removeChild(document.getElementById('timerForm'));
		_log(2, "Task will be scheduled for " +iWhen);  // The stored time is the absolute Unix GMT time.
	
	
	if(oForm.kata) { //store catapults targets
		oForm.timerOptions.value += "_" +oForm.kata.value;
	} else if(oForm.spy) {  //spying mission
		for(var i = 0; i < oForm.spy.length; i++) {
			if(oForm.spy[i].checked) {oForm.timerOptions.value += "_" + oForm.spy[i].value;}
		}
	}
	
	setTask(oForm.timerTask.value, iWhen, oForm.timerTarget.value, oForm.timerOptions.value);
		_log(3, "<- handleTimerForm()");
}


/* Returns true if there are only spies, false if there is anything else or no spies. */
function onlySpies(aTroops) {
		_log(3, "-> onlySpies()");
		
	var iScoutUnit = parseInt(readCookie("TTQ_SCOUT_UNIT"));
	if(iScoutUnit != 3 && iScoutUnit != 4) {  //3 or 4 are the only valid values
			_log(2, "Unknown iScoutUnit. Unable to determine if this is a spying mission.");
			return false;
	}
	
	if(aTroops[iScoutUnit] < 1) { //no spies
			_log(3, "No spies.");
		return false;  
	}
	for(var i=1; i <= 11; i++) { 
		if(i != iScoutUnit && parseInt(aTroops[i]) > 0) { //at least one other troop				
			return false;
		}
	}	
		_log(3, "This is a spying mission.");
	return true;  
		_log(3, "<- onlySpies()");
}

function printMsg(sMsg,bError) {
		_log(3, "-> printMsg()");
	var oDate = new Date();
	var sWhen = oDate.toLocaleString() + "\n";
	_log(1, sWhen + sMsg);
	//alert(sMsg);
	
	// delete old message
	var oOldMessage = document.getElementById("ttq_message");
	if(oOldMessage) {
			_log(3, "Removing the old message." +oOldMessage);
		oOldMessage.parentNode.removeChild(oOldMessage);
	}	
	
	// here we generate a link which closes the message
	var sLinkClose = "<a href='#' onclick='document.getElementById(\"ttq_message\").parentNode.removeChild(document.getElementById(\"ttq_message\"));' style='float:right; padding:2px 4px; margin:-5px -15px 0 0; color:white;'><img src='" +sCloseBtn+ "' alt='X' /></a>";
	
	var sBgColor = (bError) ? "#FFB89F" : "#90FF8F"; 
	var oMsgBox = document.createElement("div");
	oMsgBox.innerHTML = sLinkClose + sMsg;
	oMsgBox.style.position = "absolute";
	oMsgBox.style.top = "215px";
	oMsgBox.style.left = "215px";
	oMsgBox.style.top = "10px";
	oMsgBox.style.left = "10px";
	oMsgBox.style.zIndex = "100";
	oMsgBox.style.backgroundColor = sBgColor;
	oMsgBox.style.border = "1px solid ";
	oMsgBox.style.padding = "10px 20px";
	oMsgBox.style.color = "black";	
	oMsgBox.style.width = "335px";
	oMsgBox.id = "ttq_message";
	var oParent = document.body;
	oParent.appendChild(oMsgBox);
		_log(3, "<- printMsg()");
}

/* Experimental: Send messages in the game 
 * TODO: The sC parameter needs to be loaded and saved once.
 */
function sendMsg(sTo, sSubject, sMsg, sC) {
		_log(3, "-> sendMsg()");
	if(sTo == '' || sMsg == '' || sC == '') {return false;}
	var sParams = 'c=' +sC+ '&an=' +sTo+ '&be=' +sSubject+ '&message=' +sMsg+ '&t=2&s1=';
	sParams = encodeURI(sParams);
	var httpRequest = new XMLHttpRequest();		
	httpRequest.open("POST", 'nachrichten.php', true);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", sParams.length);
	httpRequest.setRequestHeader("Connection", "close");
	httpRequest.send(sParams);	
		_log(3, "<- sendMsg()");
}

function hideMsg() {
		_log(3, "-> hideMsg()");
	var oMsgBox = document.getElementById("ttq_message");
	document.body.removeChild(oMsgBox);
		_log(3, "<- hideMsg()");
}

function readCookie(name) {
		_log(3, "-> readCookie()");
	if(!name) {var name = "TTQ_TASKS";}
	var reg = new RegExp(name + "=([^;\n\r]*);?", "i");
	var data = reg.exec(document.cookie);
	if (data == null || data.length <= 1) {
		return '';	
	}	
	return data[1];
		_log(3, "<- readCookie()");
}

function createCookie(name,value,days) {
		_log(3, "-> createCookie()");
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	
	document.cookie = name+"="+value+expires+"; path=/";
	
		_log(3, "<- createCookie()");
	return true;
}


function getCode(iSiteId, iNewdid) {
		_log(3, "-> getCode()");
	
	if(iNewdid != 'null' && iNewdid != '') {
		var sNewdid = "&newdid=" +iNewdid;
	} else {
		var sNewdid = "";
	}
	
	var httpRequest = new XMLHttpRequest();
	//httpRequest.overrideMimeType("application/xml");
	httpRequest.onreadystatechange = function() { 
		handleHttpRequest2(httpRequest, iNewdid); 
		};
	httpRequest.open("GET", "build.php?id=" + iSiteId + sNewdid, true);
	httpRequest.send(null);
	
		_log(3, "<- getCode()");

}

function findCode(sPage, iNewdid) {
		_log(3, "-> findCode()");
	var iMode = 0;  // mode is 0 for building new stuff, 1 for upgrading
	var sCode = '';
	if(!iNewdid) {
		var iNewdid = 'null';
	}

	var re0 = /dorf2\.php\?a=[0-9]{1,2}&id=[0-9]{1,2}&c=(.{3})/i;  // new building
	var re1 = /dorf[1-2]\.php\?a=.*&c=(.{3})/i;  //upgrade
	var aMatch0 = sPage.match(re0);
	var aMatch1 = sPage.match(re1);
	if(aMatch0) {
		_log(3, "Code for building new stuff found.");
		sCode = aMatch0[1];
		iMode = 0;
	} else if(aMatch1) {
		_log(3, "Code for upgrading found.");
		sCode = aMatch1[1];	
		iMode = 1;
	} else {
		_log(3, "Code not found");
		return;
	}
	
	
	//save the found code in the proper cookie
	if(bLockedCode) {
			_log(3, "The TTQ_CODE_" + iMode + " cookie is locked. We were not able to write it.");
		return false;
	}
	if(sCode != '') {
		bLockedCode = true;  // TODO check if the cookie is locked. Lock it separately from tasks
		var sCookie = readCookie("TTQ_CODE_" +iMode);
		var aCookie = new Array();
		if(sCookie != '') {  //there is a cookie
			aCookie = sCookie.split(",");
			var iIndexOfVillageId = aCookie.indexOf(iNewdid);
			if(iIndexOfVillageId > -1) {  // existing old code - remove
				aCookie.splice(iIndexOfVillageId, 2);
			}
		}		
		aCookie.push(iNewdid);
		aCookie.push(sCode);
		sCookie = aCookie.join(",");
			_log(3, "Writing cookie: " + sCookie);
		createCookie('TTQ_CODE_'+iMode, sCookie, 365);
		bLockedCode = false;
	} else {
			_log(2, "We didn't find any code. Either there is not enough resources for this task, or another building is being built/upgraded.");
		return false;
	}		
	
		_log(3, "<- findCode()");
}
	
function detectLanguage() {
	if(sLang != "") {return;}
	var lang = window.location.href.match(/travian\.([a-zA-Z]{2,3})+/ );
	if(!lang) {
		sLang = window.location.href.match(/travian3\.([a-zA-Z]{2,3})+/ ).pop(); } 
	else {
		sLang = lang.pop();
	}
}
	
function getPlaceName(iPlaceId) {
		_log(3, "-> getPlaceName()");
	var sPlaceName = "";
	
	//first try to load the name from the cache
	var sCookie = readCookie("TTQ_PLACE_NAMES");  // format: "123456=Village1||233564=Village Second||"
	if(sCookie != '') {
		var aPlaces = sCookie.split("||");
		if(aPlaces.length > 0) {
			for(var i = 0; i < aPlaces.length; i++) {
				if(aPlaces[i].indexOf(iPlaceId + "=", 0) > -1) {return aPlaces[i].substring(7);}
			}
		}
	}	
	
	return sPlaceName;
	
		_log(3, "<- getPlaceName()");
}




/************************ Drag n drop*******************************/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}

function makeClickable(object){
	object.onmousedown = function(){
		dragObject = this;
	}
}

function getMouseOffset(target, ev){
	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}

function mouseMove(ev){
	var target   = ev.target;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
		dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev){
	if(dragObject) {
		createCookie("TTQ_LIST_POSITION", dragObject.style.top +","+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){	
var mousePos = mouseCoords(ev);
	var target = ev.target;
	iMouseDown = true;	
	if(target.getAttribute('DragObj')){
		return false;
	}	
}

function makeDraggable(item){
	if(!item) return;
	item.addEventListener("mousedown",function(ev){
		dragObject  = this.parentNode;
		mouseOff