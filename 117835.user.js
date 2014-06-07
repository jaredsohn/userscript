// ==UserScript==
// @name            IT2-Percent|Dev
// @namespace       de
// @description     Lagervolumen und optimale Produktionsflächen anzeigen
// @author          orangenkonzentrat + Antonio Estrela do Sul
// @include			http://www.itycoon2.de/*
// @date            2011-11-11
// @version         0.2.2 dev
// ==/UserScript==
//
// @history         0.2.2|11-11-2011 Tagesmengenberechnung, Beschreibung für Produktionsfläche und Optimalfläche hinzugefügt
// @history         0.2.1|08-11-2011 Fehlerbeseitigung bei Produktionsdurchläufen unter 1 Minute
// @history         0.2.0|06-11-2011 Berechnung optimaler Produktionsflächen im Produktionsbereich aller Gebäude
// @history         0.1.0|05-11-2011 Lagerflächenberechnung auf der Gebäudeübersicht
//-------------------------------------------
//TODO: Daten die eingegeben werden muessen:
//-------------------------------------------

var runden = false; // ob auf 250 gerundet werden soll: true=ja, false=nein :)
var prozentLagergr = 10; // Die Prozent der Lageroptimierung
var anzahlGeb = 6; // Anzahl der Gebaeude ohne Unternehmenssitz

lagergrGebFoB = new Array(anzahlGeb);
lagergrGebFoB[0] = 1000; // Lagergroeße ohne bonus (hier 1000)
lagergrGebFoB[1] = 1000;
lagergrGebFoB[2] = 1000;
lagergrGebFoB[3] = 1000;
lagergrGebFoB[4] = 1000;
lagergrGebFoB[5] = 1000;

lagergrGeb = new Array(anzahlGeb);
lagergrGeb[0] = lagergrGebFoB[0] + ((lagergrGebFoB[0] * prozentLagergr) / 100); // Lagergroeße ohne bonus (hier 3000)
lagergrGeb[1] = lagergrGebFoB[1] + ((lagergrGebFoB[1] * prozentLagergr) / 100);
lagergrGeb[2] = lagergrGebFoB[2] + ((lagergrGebFoB[2] * prozentLagergr) / 100);
lagergrGeb[3] = lagergrGebFoB[3] + ((lagergrGebFoB[3] * prozentLagergr) / 100);
lagergrGeb[4] = lagergrGebFoB[4] + ((lagergrGebFoB[4] * prozentLagergr) / 100);
lagergrGeb[5] = lagergrGebFoB[5] + ((lagergrGebFoB[5] * prozentLagergr) / 100); // achtung der Index
															// hört bei anzahl
															// der gebaeude -1
															// auf
//-------------------------------------------
// -----------------Ende----------------------
// -------------------------------------------

function InZahl (Wert)
{   /* Wandelt das Dezimalkomma in einen Dezimalpunkt um */
	// Erstellt von Ralf Pfeifer, www.ArsTechnica.de
        var PosPunkt = Wert.indexOf(".",0);
        var PosKomma = Wert.indexOf(",",0);
        if (PosKomma < 0) PosKomma = Wert.length;

	// Dezimalpunkte zur Tausendergruppierung entfernen
	while ((0 <= PosPunkt) && (PosPunkt < PosKomma))
	{
        Wert = Wert.substring(0, PosPunkt) + Wert.substring(PosPunkt + 1, Wert.length);
        PosPunkt = Wert.indexOf(".",0);
        PosKomma--;
	}

    // Enthaelt die Variable 'Wert' ein Komma ?
    PosKomma = Wert.indexOf(",",0);
    if (PosKomma >= 0)
		{ Wert = Wert.substring(0, PosKomma) + "." + Wert.substring(PosKomma + 1, Wert.length); }

	return parseFloat(Wert);
}

var split_url = document.URL.split("/");
//alert(split_url[4]);

// ---- GEBÄUDE-ÜBERSICHT ----
var i = 1;
while (split_url[3] == 'building' && split_url[4] == null && document.getElementsByTagName("tr")[i] != undefined && i <= anzahlGeb)
{
	// split_url[3] == 'building' && split_url[4] == null sorgt dafuer, dass die schleife nur bei
	// offener gebaude-seite laeuft

	parserLagerauslastung(3, i);
	i++;
}

// ---- GEBÄUDE-PRODUKTION ----
if (split_url[3] == 'production' && split_url[4] == 'index')
{	// offener gebaude-seite laeuft
	BonusProd();
}

function BonusProd() 
{	
// PProduktdaten
//var PDBIndex = new Array("6", "12", "18", "24", "30", "36", "42", "48", "54", "60", "66", "72", "78", "84", "90", "96", "102", "108", "114", "120", "126", "132", "138", "144", "150", "156", "162", "168", "174", "180", "186", "192", "198", "204", "210", "216", "222", "228", "234", "240", "246", "252", "258", "264", "270", "276", "282", "288", "294", "300", "306", "312", "318", "324", "330", "336", "342", "348", "354", "360", "366", "372", "378", "384", "390", "396", "402", "408", "414", "420", "426", "432", "438", "444", "450", "456", "462", "468", "474", "480", "486", "492", "498", "504", "510", "516", "522", "528", "534", "540", "546", "552", "558", "564", "570", "576", "582", "588", "594", "600", "606", "612", "618", "624", "630", "636", "642", "648", "654", "660", "666", "672", "678", "684", "690", "696", "702", "708", "714", "720", "726", "732", "738", "744", "750", "756", "762", "768", "774", "780", "786", "792", "798", "804", "810", "816", "822", "828", "834", "840", "846", "852", "858", "864", "870", "876", "882", "888", "894", "900", "906", "912", "918", "924", "930", "936", "942", "948", "954", "960", "966", "972", "978", "984", "990", "996", "1002", "1008", "1014", "1020", "1026", "1032", "1038", "1044", "1050", "1056", "1062", "1068", "1074", "1080", "1086", "1092", "1098", "1104", "1110", "1116", "1122", "1128", "1134", "1140", "1146", "1152", "1158", "1164", "1170", "1176", "1182", "1188", "1194", "1200", "1206", "1212", "1218", "1224", "1230", "1236", "1242", "1248", "1254", "1260", "1266", "1272", "1278", "1284", "1290", "1296", "1302", "1308", "1314", "1320", "1326", "1332", "1338", "1344", "1350", "1356", "1362", "1368", "1374", "1380", "1386", "1392", "1398", "1404", "1410"); 
var PDBProduktname = new Array("Rind", "Schwein", "Huhn", "Biene", "Weizen", "Roggen", "Gerste", "Reis", "Sojabohnen", "Erdnüsse", "Kartoffeln", "Zuckerrüben", "Gurke", "Karotten", "Brokkoli", "Blumenkohl", "Tomate", "Paprika", "Apfel", "Birne", "Aprikose", "Kirschen", "Erdbeere", "Ananas", "Banane", "Orange", "Kaffeebohnen", "Tabak", "Salz", "Kakaobohnen", "Baum", "Erdöl", "Eisenerz", "Kupfererz", "Bauxit", "Quarz", "Stahl", "Benzin", "Kunststoff", "Weizenmehl", "Brötchen", "Milch", "Karton", "1l Milch", "Holz", "Kleine Kartonverpackung", "Brot", "Eier", "10 Eier", "Kleine Kunststoffverpackung", "1kg Weizenmehl", "1kg Reis", "Eiernudeln", "1kg Eiernudeln", "Butter", "250g Butter", "Schweinefleisch", "1kg Schweinefleisch", "Geflügelfleisch", "1kg Geflügel", "Rindfleisch", "1kg Rindfleisch", "Diesel", "Honig", "250ml Glasverpackung", "250g Honig", "Büroschere", "Papier", "Kopierpapier A4 500 Blatt", "Wasser", "1l Glasverpackung", "1l Mineralwasser", "Tofu", "1kg Tofu", "Radiergummi", "1kg Hackfleisch", "1l Apfelsaft", "1l Apfelschorle", "Zigarette", "20er Packung Zigaretten", "1kg Pommes-Frites", "1l Sojamilch", "250g Kartoffel-Chips", "5er Set Radiergummis", "Anspitzer", "5er Set Anspitzer", "Hopfen", "Bier", "0,5l Glasverpackung", "0,5l Flaschenbier", "Hund", "Katze", "Wellensittich", "Apfelsaft", "Büroset", "Orangensaft", "1l Orangensaft", "Kirschsaft", "Karottensaft", "1l Karottensaft", "1l Kirschsaft", "0,5l Dosenverpackung", "0,5l Dosenbier", "0,5l Mineralwasser", "Baumwolle", "Stoff", "Hosenknopf", "Reißverschluß", "T-Shirt", "Pullover", "Jeans", "500g Kaffee", "Schrauben", "Einfacher Holztisch", "Einfacher Holzstuhl", "Klebstoff", "Bücherregal", "Zucker", "Apfelkuchen", "1kg Zucker", "Silizium", "0,5l Multivitaminsaft", "Zigarre", "0,5l Apfelsaft", "Büroklammern", "Hammer", "Leder", "Nylon", "Teddybär", "500g Kakao", "Benzinfeuerzeug", "Stoffsofa", "Holzeisenbahn", "Kakaopulver", "Bürostuhl", "5er Packung Zigarren", "Aluminium", "Alu-Leiter", "250g gesalzene Erdnüsse", "Nägel", "gesalzene Erdnüsse", "100er Pack Nägel", "Schraubenzieher", "Croissants", "Roggenmehl", "Tortelini", "Sahne", "Weizengrieß", "Spaghetti", "Pizzateig", "200ml Plastikbecher", "Briefumschlag", "Visitenkarte", "Kartoffel Kroketten", "Kordel", "Roggenbrot", "Käsesahnetorte", "Quark", "200ml Sahne", "Käse", "500g Käse", "500g Tofuschnitzel", "Erdbeerbonbons", "Sahnebonbons", "Schokolade", "250g Erdbeerbonbons", "250g Sahnebonbons", "100g Schokolade", "1kg Tiefkühlgemüse", "Tomatensauce", "Pizza Margherita", "Pizza Schinken", "Kommode", "Stoffsessel", "Wandschrank", "Esstisch", "Schreibtisch", "Bauklötze", "Schaukelpferd", "Bermudashorts", "Lederjacke", "Kugelschreiber", "Jacke", "Kapuzenpullover", "50er Pack Kugelschreiber", "Stempel", "500er Pack Briefumschläge", "250er Pack Visitenkarten", "Lederschuh", "750g Kroketten", "1kg Tortelini", "1kg Spaghetti", "Schwarzwälder-Kirsch-Torte", "Turnschuhe", "500g Plastikbecher", "500g Quark", "Roggenbrötchen", "Locher", "100er Pack Büroklammern", "500g Salz", "Cordon Bleu", "500g Cordon Bleu", "Kupferdraht", "Kupferleitung", "Elektromotor", "Bohrer", "Bohrer Set", "Bohrfutterschlüssel", "Reifen", "Alu-Felgen", "Felgen", "Fahrzeugmotor", "Auto-Karosserie", "Auto", "Autoscheibensatz", "Außenspiegel", "Heckbeleuchtung", "Frontbeleuchtung", "Bohrmaschine", "Kautschuk", "Gummi", "Nylonstrümpfe", "10 Paar Nylonstrümpfe", "Erdbeerkonfitüre", "250g Erdbeerkonfitüre", "Autositz", "Getriebe", "Schaumstoff", "Unterhemden", "5er Packung Unterhemden", "Unterhosen", "10er Packung Unterhosen", "Armaturenbrett", "Analoger Tacho", "Lenkrad"); 
//var PDBProduktkategorie = new Array("Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Rohstoffe", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Rohstoffe", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Rohstoffe", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Verkaufbare Rohstoffe", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Rohstoffe", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Rohstoffe", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Verkaufsware", "Zwischenprodukte", "Zwischenprodukte", "Zwischenprodukte"); 
//var PDBProduktion_in = new Array("Tierzucht", "Tierzucht", "Tierzucht", "Tierzucht", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Plantage", "Bergwerk", "Plantage", "Plantage", "Förderturm", "Bergwerk", "Bergwerk", "Bergwerk", "Bergwerk", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Tierzucht", "Fabrik", "Fabrik", "Plantage", "Fabrik", "Fabrik", "Tierzucht", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Tierzucht", "Fabrik", "Tierzucht", "Fabrik", "Tierzucht", "Fabrik", "Fabrik", "Tierzucht", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Förderturm", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Plantage", "Fabrik", "Fabrik", "Fabrik", "Tierzucht", "Tierzucht", "Tierzucht", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Plantage", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Tierzucht", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Plantage", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik", "Fabrik"); 
//var PDBVolumen = new Array(200, 150, 5, 0.02, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.1, 1, 1, 1, 1, 0.1, 1, 0.06, 0.7, 0.1, 1, 1, 1, 1, 1, 0.35, 1, 1, 1, 1, 1, 1, 1, 1, 0.25, 0.25, 0.2, 1, 4, 1, 1, 1, 1, 1, 0.02, 1, 1, 1, 0.001, 0.2, 1, 1, 0.35, 0.3, 0.02, 0.3, 1, 1, 0.5, 0.5, 25, 10, 0.2, 1, 0.4, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 1, 1, 0.03, 0.1, 0.2, 0.5, 1, 0.5, 0.01, 10, 5, 1, 8, 1, 1, 1, 1, 0.5, 0.2, 0.5, 0.01, 0.5, 1, 1, 3, 0.5, 0.04, 25, 3, 1, 4.5, 1, 1, 1, 0.3, 0.001, 1, 1, 1, 0.2, 1, 1, 1, 1, 1, 1, 0.2, 0.005, 0.001, 1, 0.1, 0.9, 1, 1, 0.25, 1, 0.55, 1, 1, 1, 1, 0.3, 0.25, 0.15, 1, 1, 0.4, 0.4, 10, 8, 28, 8, 9, 2, 5, 0.8, 1, 0.005, 1, 0.7, 0.2, 0.04, 0.55, 0.25, 1, 0.8, 1, 1, 1, 0.7, 0.5, 0.55, 0.11, 0.3, 0.6, 0.55, 0.25, 0.55, 1, 1, 0.2, 0.05, 1, 0.12, 3, 1, 2, 12, 220, 400, 12, 0.6, 1, 1, 1, 1, 1, 0.15, 1, 1, 0.25, 10, 13, 3, 0.4, 1, 0.2, 1, 1, 1, 1); 
//var PDBHaltbarkeit = new Array("Ewig haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Haltbar", "Ewig haltbar", "Sehr lange haltbar", "Lange haltbar", "Sehr lange haltbar", "Haltbar", "Lange haltbar", "Haltbar", "Leicht verderblich", "Haltbar", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Lange haltbar", "Sehr lange haltbar", "Ewig haltbar", "Lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Leicht verderblich", "Leicht verderblich", "Ewig haltbar", "Haltbar", "Ewig haltbar", "Ewig haltbar", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Ewig haltbar", "Sehr lange haltbar", "Lange haltbar", "Haltbar", "Lange haltbar", "Haltbar", "Haltbar", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Leicht verderblich", "Ewig haltbar", "Leicht verderblich", "Ewig haltbar", "Lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Ewig haltbar", "Sehr lange haltbar", "Leicht verderblich", "Lange haltbar", "Ewig haltbar", "Leicht verderblich", "Lange haltbar", "Lange haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Haltbar", "Lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Lange haltbar", "Sehr lange haltbar", "Ewig haltbar", "Sehr lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Haltbar", "Ewig haltbar", "Haltbar", "Lange haltbar", "Haltbar", "Haltbar", "Lange haltbar", "Lange haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Leicht verderblich", "Sehr lange haltbar", "Ewig haltbar", "Sehr lange haltbar", "Ewig haltbar", "Sehr lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Ewig haltbar", "Sehr lange haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Ewig haltbar", "Ewig haltbar", "Leicht verderblich", "Sehr lange haltbar", "Lange haltbar", "Haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Lange haltbar", "Ewig haltbar", "Haltbar", "Leicht verderblich", "Haltbar", "Haltbar", "Leicht verderblich", "Haltbar", "Haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Lange haltbar", "Sehr lange haltbar", "Sehr lange haltbar", "Lange haltbar", "Sehr lange haltbar", "Lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Lange haltbar", "Lange haltbar", "Leicht verderblich", "Sehr lange haltbar", "Sehr lange haltbar", "Haltbar", "Leicht verderblich", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Leicht verderblich", "Leicht verderblich", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Sehr lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Haltbar", "Lange haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar", "Ewig haltbar"); 
var PDBErgibt = new Array(1, 1, 25, 500, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 20, 50, 1, 20, 20, 20, 20, 20, 5, 10, 5, 10, 10, 10, 5, 5, 200, 50, 5, 10, 1, 50, 5, 5, 5, 5, 5, 5, 150, 5, 5, 5, 200, 5, 10, 5, 20, 5, 1, 5, 1, 50, 20, 5, 5, 5, 50, 5, 5, 5, 25, 1, 5, 5, 5, 1, 50, 1, 50, 5, 20, 5, 1, 1, 1, 5, 1, 5, 5, 5, 5, 5, 5, 50, 5, 5, 50, 5, 25, 10, 1, 1, 1, 5, 100, 1, 1, 10, 1, 5, 5, 5, 5, 5, 5, 5, 150, 1, 10, 5, 1, 5, 10, 1, 1, 5, 1, 1, 5, 1, 5, 500, 10, 5, 5, 5, 10, 5, 5, 5, 5, 5, 50, 500, 200, 5, 50, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 400, 1, 1, 1, 5, 1, 1, 1, 5, 5, 5, 5, 1, 35, 5, 10, 5, 1, 5, 4, 1, 5, 1, 10, 10, 1, 5, 5, 5, 5, 2, 2, 1, 1, 4, 1, 1, 1, 30, 5, 20, 1, 2, 4, 4, 2, 5, 10, 2, 10, 2, 1, 2, 2); 
var PDBMasseinheit = new Array("Stck.", "Stck.", "Stck.", "Stck.", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "kg", "Stck.", "l", "kg", "kg", "kg", "kg", "kg", "l", "kg", "kg", "Stck.", "l", "kg", "Stck.", "kg", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "kg", "Stck.", "kg", "Stck.", "kg", "Stck.", "kg", "Stck.", "kg", "Stck.", "l", "kg", "Stck.", "Stck.", "Stck.", "kg", "Stck.", "l", "Stck.", "Stck.", "kg", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "kg", "l", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "l", "Stck.", "l", "Stck.", "l", "l", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "kg", "m", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "l", "Stck.", "kg", "Stck.", "Stck.", "kg", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "m", "m", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "kg", "Stck.", "Stck.", "kg", "Stck.", "Stck.", "Stck.", "kg", "Stck.", "Stck.", "Stck.", "kg", "kg", "l", "kg", "kg", "kg", "Stck.", "Stck.", "Stck.", "kg", "Stck.", "Stck.", "Stck.", "kg", "Stck.", "kg", "Stck.", "Stck.", "kg", "kg", "kg", "Stck.", "Stck.", "Stck.", "Stck.", "l", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "m", "m", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "l", "kg", "Stck.", "Stck.", "kg", "Stck.", "Stck.", "Stck.", "kg", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck.", "Stck."); 
var PDBProduktionsdauer = new Array(72, 72, 72, 72, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 48, 6, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 4, 1, 3, 3, 3, 1, 3, 3, 1, 6, 3, 3, 3, 1, 3, 1, 3, 3, 3, 1, 1, 3, 1, 1, 4, 1, 24, 4, 3, 3, 72, 72, 72, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 24, 3, 3, 3, 3, 3, 3, 1, 4, 4, 3, 3, 4, 3, 3, 1, 3, 3, 3, 3, 4, 3, 3, 3, 3, 1, 3, 5, 3, 3, 4, 1, 3, 3, 3, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 3, 4, 3, 3, 4, 4, 4, 3, 3, 3, 1, 4, 3, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 4, 3, 1, 1, 4, 3, 4, 3, 3, 3, 1, 1, 4, 1, 5, 2, 6, 3, 1, 4, 5, 4, 4, 6, 8, 48, 5, 3, 4, 4, 5, 24, 4, 4, 1, 4, 1, 5, 6, 5, 4, 1, 4, 2, 6, 6, 6);


// lese Produktionsbonus aus
	var tdInhalt = document.getElementById("data").getElementsByTagName("p")[1].getElementsByTagName("span")[1].innerHTML;
	var prodbon = tdInhalt.replace(/\+/, "");
	prodbon = prodbon.replace(/\%/, "");
	var ProduktionsBonus = InZahl(prodbon);
	var ProdBonFaktor = (100+ProduktionsBonus)/100;

	//alert(ProduktionsBonus);
	
	// lese Anzahl der Produktionen aus
	var anzpro = document.getElementById("data").getElementsByTagName("p")[2].firstChild.nextSibling.data;
	anzpro = anzpro.slice(0, anzpro.search(/\//));
	var ProduktionenAnzahl = InZahl(anzpro);

	// arbeite alle Produktionen in der Tabelle der Reihe nach ab
	for (var i = 0; i <= ProduktionenAnzahl-1; i++)
	{
		// platziere Wert in Produktionstabelle
		var Einfügeposition = document.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0]
			.getElementsByTagName("tr")[i].getElementsByTagName("td")[0];

		// lese eingestellte Produktionsfläche aus
		var IstFlaeche = Einfügeposition.getElementsByTagName("span")[0].innerHTML;
		IstFlaeche = IstFlaeche.slice(0, IstFlaeche.length -3);
		IstFlaeche = InZahl(IstFlaeche);
		var IstFlacBon = IstFlaeche * ProdBonFaktor;
		
		// Setze Beschreibungstitel für Produktionsfläche
		var Attribut = document.createAttribute("title");
		Attribut.nodeValue = "Produktionsfläche";
		Einfügeposition.getElementsByTagName("span")[0].setAttributeNode(Attribut);
            
		// lese Produktionsname aus
		var Produktname = document.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0]
			.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("span")[0]
			.getElementsByTagName("a")[0].innerHTML;

		// Suche Produktindex in PDB
		var Indexzaehler = 0;
		while (PDBProduktname[Indexzaehler] != Produktname && Indexzaehler <= 235) {Indexzaehler++; }
			//alert(Produktname + " index: " + Indexzaehler + " PPDWert: " + PDBProduktname[Indexzaehler]);
			//alert(Produktname + " index: " + Indexzaehler + " PPDWert: " + PDBProduktionsdauer[Indexzaehler]);
			var Produktionsdauer = PDBProduktionsdauer[Indexzaehler]; // Produktionsdauer für Produkt in Stunden auf 100 m²
		var IstMinuten = ((Produktionsdauer * 60) * 100) / IstFlacBon;
		if (IstMinuten >= 1) {
			// var OptMinuten = Math.round(IstMinuten * 1000) / 1000; // 10000 rundet auf 3.9999
			var OptMinuten = Math.ceil(IstMinuten); // aufrunden auf volle Minute
			// OptMinuten = Math.ceil(OptMinuten);
		} else {
			if (PDBMasseinheit[Indexzaehler] == "m") {
				var OptMinuten = IstMinuten; // bei Produkten mit Metern
			} else {
				if (IstMinuten <= 2/3) {
					// bei Verpackungen unter 1 Minute und + 50% Fläche
					// also 0.5 Minuten und +0.1m² Fläche wird Produktionsmenge verdoppelt
					var OptMinuten = 2/3;
				} else {
					var OptMinuten = 1;
				}
			}
		}
			// alert(IstMinuten + " " + OptMinuten);
		var optflac = ((Produktionsdauer * 60) * 100) / OptMinuten;
		optflac = optflac / ProdBonFaktor;
		optflac = Math.ceil(optflac * 10) / 10; // AddFlaeche dient zur Aufrundung
		//alert(IstFlaeche + " " + optflac);
	
		// erzeuge Element für Optimalfläche
		var neuB = document.createElement("span")
		neuB.className = 'small';

		// neuer Titel Optimalfläche
		var Attribut = document.createAttribute("title");
		Attribut.nodeValue = "Optimalfläche";
		neuB.setAttributeNode(Attribut);

		// fügt errechnete Optimalfläche in Tabelle ein
		var neuBR = document.createElement("br");
		var neuBText = document.createTextNode(optflac + " m²");
		neuB.appendChild(neuBText);
		//var td = document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
		//var td_a = td.getElementsByTagName("br")[anzahlBR];
		//td.insertBefore(neuB, td_a);
		Einfügeposition.appendChild(neuBR);
		Einfügeposition.appendChild(neuB);
		//alert(" Minuten: " + IstMinuten + " " + OptMinuten + "\n" + "Fläche: " + IstFlaeche + " " + optflac);


		// Berechne Tagesproduktion
		var Cirka = "";
		var Tagesmenge = Math.round((PDBErgibt[Indexzaehler] * (1440 / OptMinuten)) *10) / 10;
		if ((Tagesmenge % 1) > 0) {Cirka = "~";}
		var EinfuegepositionMenge = document.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0]
			.getElementsByTagName("tr")[i].getElementsByTagName("td")[2];
		var neuBTagesMenge = document.createElement("span");
		var neuBTagesMengeText = document.createTextNode("Tagesproduktion: " + Cirka + Tagesmenge + " " + PDBMasseinheit[Indexzaehler]);
		neuBTagesMenge.appendChild(neuBTagesMengeText);
		
		var neuBR2 = document.createElement("br");
		EinfuegepositionMenge.appendChild(neuBR2);
		EinfuegepositionMenge.appendChild(neuBTagesMenge);
		
	}
}




function parserLagerauslastung(j, i)
{	var tdInhalt = document.getElementsByTagName("tr")[i]
			.getElementsByTagName("td")[j].innerHTML;
	var erg = tdInhalt.search(/\/production\/+/); // stelle hinterm %, geht,
													// da vorher produktion mit
													// k
	var anzahlBR = 1;

	if (tdInhalt.search(/Lorry+/) != -1)
	{	erg = erg - 147; // zeile transport dazwischen weg (achtung bei
							// transporten >10)
	}
	
	if (tdInhalt.search(/im Ausbau+/) != -1)
	{	anzahlBR++; // bei "im Ausbau" ein br mehr
	}
	var neuInhalt = tdInhalt.slice(erg - 50, erg); // eingrenzung, hier nur ein
													// %
	var proZ = neuInhalt.search(/%+/);
	var prozInhalt = neuInhalt.slice(proZ - 5, proZ); // -5 was ist bei 100,
														// <10, 10.0 10.1 ??
	prozInhalt = prozInhalt.replace(/\,/, "."); // Komma in Punkt verwandeln

	// -----größenberechnung---------
	var lagerFreiraum = lagergrGeb[i - 1] - (lagergrGeb[i - 1] * prozInhalt)
			/ 100;

	if ((lagerFreiraum <= 10000) && isNaN(lagerFreiraum) == false)
	{ // lagerFreiraum
	  // <=10000!!!
		if (runden == true)
			{lagerFreiraum = lagerFreiraum - (lagerFreiraum % 250);}
		else 
			{lagerFreiraum = Math.round(lagerFreiraum*100)/100;}	//auf 2 stellen nach dem komma runden

		var links2 = document.createElement("b");
		var buttonText = document.createTextNode(" = " + lagerFreiraum);
		links2.appendChild(buttonText);
		var td = document.getElementsByTagName("tr")[i]
				.getElementsByTagName("td")[j];
		var td_a = td.getElementsByTagName("br")[anzahlBR];

		td.insertBefore(links2, td_a);
	}
}