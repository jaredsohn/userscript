// ==UserScript==
// @name           Extended Navigation || DEV-Version
// @namespace      de
// @description    Navigation mal ganz anders...
// @include        http://www.itycoon2.de/*
// @author         eXidys
// @version        r12112010 ALPHA 1732 (Snowfall) develop (nicht lauffähig)
// @date           15-12-2010
// ==/UserScript==


// ///////////////////////////////////////// //
// Array mit den Definitionen der Verlinkung //        // Array ist notwendig um auf eventuelle Layout Veränderungen zu reagieren
// ///////////////////////////////////////// //
// def_array[4]["href"] = 5; <-- HILFE-BUTTON
var def_array = new Array();
def_array[0] = new Object();	def_array[0]["name"] = "trade";				def_array[0]["href"] = "/";						def_array[0]["img_alt"] = "Coins";			def_array[0]["img_src"] = "coins.png";			def_array[0]["text"] = "Handel";				def_array[0]["Nav"] = "Handel";		def_array[0]["SubNav"] = "1";
def_array[1] = new Object();	def_array[1]["name"] = "building";			def_array[1]["href"] = "/building";				def_array[1]["img_alt"] = "Building";		def_array[1]["img_src"] = "building.png";		def_array[1]["text"] = "Gebäude";				def_array[1]["Nav"] = "Gebäude";	def_array[1]["SubNav"] = "1";
def_array[2] = new Object();	def_array[2]["name"] = "company";			def_array[2]["href"] = "/company";				def_array[2]["img_alt"] = "World";			def_array[2]["img_src"] = "world.png";			def_array[2]["text"] = "Unternehmen";			def_array[2]["Nav"] = "";			def_array[2]["SubNav"] = "1";
def_array[3] = new Object();	def_array[3]["name"] = "tycoon";			def_array[3]["href"] = "/avatar";				def_array[3]["img_alt"] = "User_suit";		def_array[3]["img_src"] = "user_suit.png";		def_array[3]["text"] = "Tycoon";				def_array[3]["Nav"] = "";			def_array[3]["SubNav"] = "1";
def_array[4] = new Object();	def_array[4]["name"] = "help";				def_array[4]["href"] = 5;						def_array[4]["img_alt"] = "Help";			def_array[4]["img_src"] = "help.png";			def_array[4]["text"] = "";						def_array[4]["Nav"] = "";			def_array[4]["SubNav"] = "1";
def_array[5] = new Object();	def_array[5]["name"] = "logout";			def_array[5]["href"] = "/login/logout";			def_array[5]["img_alt"] = "Lock";			def_array[5]["img_src"] = "lock.png";			def_array[5]["text"] = "";						def_array[5]["Nav"] = "";			def_array[5]["SubNav"] = "1";
def_array[6] = new Object();	def_array[6]["name"] = "index_tr";			def_array[6]["href"] = "/";						def_array[6]["img_alt"] = "Computer";		def_array[6]["img_src"] = "computer.png";		def_array[6]["text"] = "Zentrale";				def_array[6]["Nav"] = "Handel";		def_array[6]["SubNav"] = "2";
def_array[7] = new Object();	def_array[7]["name"] = "market";			def_array[7]["href"] = "/direct_sale";			def_array[7]["img_alt"] = "Coins";			def_array[7]["img_src"] = "coins.png";			def_array[7]["text"] = "Handelsplatz";			def_array[7]["Nav"] = "Handel";		def_array[7]["SubNav"] = "3";
def_array[8] = new Object();	def_array[8]["name"] = "mail";				def_array[8]["href"] = "/message";				def_array[8]["img_alt"] = "Email";			def_array[8]["img_src"] = "email.png";			def_array[8]["text"] = "Post";					def_array[8]["Nav"] = "Handel";		def_array[8]["SubNav"] = "4";
def_array[9] = new Object();	def_array[9]["name"] = "town";				def_array[9]["href"] = "/town";					def_array[9]["img_alt"] = "Map";			def_array[9]["img_src"] = "map.png";			def_array[9]["text"] = "Stadt";					def_array[9]["Nav"] = "Handel";		def_array[9]["SubNav"] = "5";
def_array[10] = new Object();	def_array[10]["name"] = "organizer";		def_array[10]["href"] = "/organizer";			def_array[10]["img_alt"] = "Book";			def_array[10]["img_src"] = "book.png";			def_array[10]["text"] = "Organizer";			def_array[10]["Nav"] = "";			def_array[10]["SubNav"] = "1";
def_array[11] = new Object();	def_array[11]["name"] = "index_c";			def_array[11]["href"] = "/company";				def_array[11]["img_alt"] = "World";			def_array[11]["img_src"] = "world.png";			def_array[11]["text"] = "Übersicht";			def_array[11]["Nav"] = "";			def_array[11]["SubNav"] = "1";
def_array[12] = new Object();	def_array[12]["name"] = "building_c";		def_array[12]["href"] = "/building";			def_array[12]["img_alt"] = "Building";		def_array[12]["img_src"] = "building.png";		def_array[12]["text"] = "Gebäude";				def_array[12]["Nav"] = "";			def_array[12]["SubNav"] = "1";
def_array[13] = new Object();	def_array[13]["name"] = "financial_c";		def_array[13]["href"] = "/financial";			def_array[13]["img_alt"] = "Money_euro";	def_array[13]["img_src"] = "money_euro.png";	def_array[13]["text"] = "Finanzen";				def_array[13]["Nav"] = "";			def_array[13]["SubNav"] = "1";
def_array[14] = new Object();	def_array[14]["name"] = "brands_licenses";	def_array[14]["href"] = "/label";				def_array[14]["img_alt"] = "Tag_blue";		def_array[14]["img_src"] = "tag_blue.png";		def_array[14]["text"] = "Marken und Lizenzen";	def_array[14]["Nav"] = "";			def_array[14]["SubNav"] = "1";
def_array[15] = new Object();	def_array[15]["name"] = "settings_c";		def_array[15]["href"] = "/company/settings";	def_array[15]["img_alt"] = "Cog";			def_array[15]["img_src"] = "cog.png";			def_array[15]["text"] = "Einstellungen";		def_array[15]["Nav"] = "";			def_array[15]["SubNav"] = "1";
def_array[16] = new Object();	def_array[16]["name"] = "index_ty";			def_array[16]["href"] = "/avatar";				def_array[16]["img_alt"] = "User_Suit";		def_array[16]["img_src"] = "user_suit.png";		def_array[16]["text"] = "Übersicht";			def_array[16]["Nav"] = "";			def_array[16]["SubNav"] = "1";
def_array[17] = new Object();	def_array[17]["name"] = "financial_t";		def_array[17]["href"] = "/avatar/financial";	def_array[17]["img_alt"] = "Money_euro";	def_array[17]["img_src"] = "money_euro.png";	def_array[17]["text"] = "Finanzen";				def_array[17]["Nav"] = "";			def_array[17]["SubNav"] = "1";
def_array[18] = new Object();	def_array[18]["name"] = "skills";			def_array[18]["href"] = "/skills";				def_array[18]["img_alt"] = "Page_lightning";def_array[18]["img_src"] = "page_lightning.png";def_array[18]["text"] = "Fähigkeiten";			def_array[18]["Nav"] = "";			def_array[18]["SubNav"] = "1";
def_array[19] = new Object();	def_array[19]["name"] = "award";			def_array[19]["href"] = "/award";				def_array[19]["img_alt"] = "Medal_gold_1";	def_array[19]["img_src"] = "medal_gold_1.png";	def_array[19]["text"] = "Auszeichnungen";		def_array[19]["Nav"] = "";			def_array[19]["SubNav"] = "1";
def_array[20] = new Object();	def_array[20]["name"] = "settings_t";		def_array[20]["href"] = "/avatar/settings";		def_array[20]["img_alt"] = "Cog";			def_array[20]["img_src"] = "cog.png";			def_array[20]["text"] = "Einstellungen";		def_array[20]["Nav"] = "";			def_array[20]["SubNav"] = "1";




// ///////////////////// //
// Neue Subnavi erzeugen //
// ///////////////////// //

/*
Ablaufalgorithmus Subnavi

Alte Navi:
Handel: ZENTRALE HANDELSPLATZ POST STADT
Unternehmen:  ÜBERSICHT GEBÄUDE  FINANZEN MARKEN & LIZENZEN EINSTELLUNGEN(U)
Tycoon:  ÜBERSICHT FINANZEN FÄHIGKEITEN AUSZEICHNUNGEN EINSTELLUNGEN(T)

	def_array[0]["name"] = "trade";	"Handel";
	def_array[1]["name"] = "building"; "Gebäude";
	def_array[2]["name"] = "company"; "Unternehmen";
	def_array[3]["name"] = "tycoon"; "Tycoon";
	def_array[4]["name"] = "help"; "";
	def_array[5]["name"] = "logout"; "";
	def_array[6]["name"] = "index_tr"; "Zentrale";
	def_array[7]["name"] = "market"; "Handelsplatz";
	def_array[8]["name"] = "mail"; "Post";
	def_array[9]["name"] = "town"; "Stadt";
	def_array[10]["name"] = "organizer"; "Organizer";
	def_array[11]["name"] = "index_c"; "Übersicht";
	def_array[12]["name"] = "building_c"; "Gebäude";
	def_array[13]["name"] = "financial_c"; "Finanzen";
	def_array[14]["name"] = "brands_licenses"; "Marken und Lizenzen";
	def_array[15]["name"] = "settings_c"; "Einstellungen";
	def_array[16]["name"] = "index_ty"; "Übersicht";
	def_array[17]["name"] = "financial_t"; "Finanzen";
	def_array[18]["name"] = "skills"; "Fähigkeiten";
	def_array[19]["name"] = "award"; "Auszeichnungen";
	def_array[20]["name"] = "settings_t"; "Einstellungen";

//Liste Neues Menü:

Handel: ZENTRALE-6 HANDELSPLATZ-0 POST-8 STADT-9
Gebäude:-12
Unternehmen:  ÜBERSICHT-11  FINANZEN-13 MARKEN & LIZENZEN-14 EINSTELLUNGEN(U)-15
Tycoon:  ÜBERSICHT-16 FINANZEN-17 FÄHIGKEITEN-18 AUSZEICHNUNGEN-19 EINSTELLUNGEN(T)-20
Logout:-5

// als array

var neues_Menu = new Array();
neues_Menu[0] = new Object();	neues_Menu[0]["Name"] = "Handel";	   neues_Menu[0]["Sub1"] = "ZENTRALE";	   neues_Menu[0]["Sub2"] = "HANDELSPLATZ";	neues_Menu[0]["Sub3"] = "HANDELSPLATZ";	neues_Menu[0]["Sub4"] = "HANDELSPLATZ";	neues_Menu[0]["Sub5"] = "HANDELSPLATZ";
neues_Menu[0] = new Object();	neues_Menu[0]["Name"] = "Gebäude";	   neues_Menu[0]["Sub1"] = "keins";	       neues_Menu[0]["Sub2"] = "keins";	neues_Menu[0]["Sub3"] = "keins";	neues_Menu[0]["Sub4"] = "keins";	neues_Menu[0]["Sub5"] = "keins";
neues_Menu[0] = new Object();	neues_Menu[0]["Name"] = "Unternehmen"; neues_Menu[0]["Sub1"] = "ÜBERSICHT(U)"; neues_Menu[0]["Sub2"] = "FINANZEN(U)";	neues_Menu[0]["Sub3"] = "MARKEN & LIZENZEN";	neues_Menu[0]["Sub4"] = "EINSTELLUNGEN(U)";	neues_Menu[0]["Sub5"] = "HANDELSPLATZ";
neues_Menu[0] = new Object();	neues_Menu[0]["Name"] = "Tycoon";	   neues_Menu[0]["Sub1"] = "ÜBERSICHT(T)"; neues_Menu[0]["Sub2"] = "FINANZEN(T)";	neues_Menu[0]["Sub3"] = "HANDELSPLATZ";	neues_Menu[0]["Sub4"] = "HANDELSPLATZ";	neues_Menu[0]["Sub5"] = "HANDELSPLATZ";
neues_Menu[0] = new Object();	neues_Menu[0]["Name"] = "Logout";	   neues_Menu[0]["Sub1"] = "keins";	   neues_Menu[0]["Sub2"] = "keins";	neues_Menu[0]["Sub3"] = "keins";	neues_Menu[0]["Sub4"] = "keins";	neues_Menu[0]["Sub5"] = "keins";



// Suche welcher Array von oben der aktuellen URL entspricht
var URL = aktuelle url-auslesen;
var x = 0;
while (URL.search(array_Liste_href[x]) != -1) {      // weiß nicht wie man arrays anspricht
x = x+1;
}          // Wird schleife verlassen dann entspricht x der Array-Position des Submenüs, dass gerade laut URL angezeigt wird und nun aktiv ist

// Zuordnung zu welchem Hauptmenü die aktuelle seite gehört Habe das in Arrayliste oben ergänzt

while (x != 


// unvollständig
*/
