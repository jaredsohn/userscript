// ==UserScript==

// @name         IT2-Merkblatt-dev-version
// @description  holt aus Organizer Produkt, Menge und Preis
// @author       Antonio Estrela do Sul & eXidys
// @include      http://www.itycoon2.de/transport/charge/*
// @date         2010-11-27
/ /@version	 0.01_development

// ==/UserScript==

// Hinweis: Der Organizer wird nach Produkten durchsucht, und liest Menge, Preis und Zielgebäude aus. Die gefundenen Ergebnisse
// werden in einer kleinen Liste zusammengestellt. Durch klick auf einen Eintrag werden Menge, Verkaufspreis und Zielgebäude direkt
// in das Versandforumular eingetragen. Diese Schnellliste wird immer nur für das im Lager zum Versenden gewählte Produkt erzeugt.
// (durch klick auf den LKW)
// So müssen die Einträge im Organizer aussehen (der Eintrag mus im entsprechenden Zielgebäude vorhanden sein):
// [Produkt]Menge;Preis[/Produkt]
// [Holz]200;4.00[Holz], [1kg Reis]100;73.57[/1kg Reis] 

///////////////////////////////////
// Selektiertes Produkt erkennen //
///////////////////////////////////

var PName = document.getElementById("stock_id").selectedIndex
	PName = document.getElementById("stock_id").getElementsByTagName("option")[PName].innerHTML
	PName = PName.replace(/\".*\"\s/,"")  // holt Namen des selektiertes Produkt aus der Liste

alert("Selektiertes Produkt >" + PName + "<");

// ab hier klappt es nicht
// var Position = document.getElementsByTagName("form")[0].getElementsByTagName("p")[0].lastChild;
// var link = document.createElement("a");
// link.innerHTML = " " + PName + " ";
// Position.insertBefore("\" " + PName + " \"", Position.nextSibling);

/////////////////////////////////////
// Organizer nach Produkt absuchen //
/////////////////////////////////////

var Adressbuch = document.getElementById("address_book").getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
// U1: tbody>tr"odd">td"half">a[0]
////var Unternehmen1 = Adressbuch.getElementsByClassName("odd")[0].getElementsByClassName("half")[0].getElementsByTagName("a")[0];
// U2: tbody>tr"odd">td"half">a[0]
////var Unternehmen2 = Adressbuch.getElementsByClassName("odd")[0].getElementsByClassName("half")[1].getElementsByTagName("a")[0];
// U3: tbody>tr"even">td"half">a[0]
////var Unternehmen3 = Adressbuch.getElementsByClassName("odd")[0].getElementsByClassName("half")[2].getElementsByTagName("a")[0];
// U4: tbody>tr"even">td"half">a[0]
// U5: tbody>tr"even">td"half">a[0]
// U6: tbody>tr"odd">td"half">a[0]
// U7: tbody>tr"even">td"half">a[0]
// U8: tbody>tr"odd">td"half">a[0]
// U9: tbody>tr"even">td"half">a[0]
// U10: tbody>tr"odd">td"half">a[0]
// U11: tbody>tr"even">td"half">a[0]

// Inhalt der Unternehmen: "small odd " und "small even "
//Gebäudenummer : td[0]
//Inhalt: td[1]
/*
table > body > tr odd > td[0] > a[0] // unternehmen überschrift
table > body > tr even > td[0] > a[0] // unternehmen überschrift
table > body > tr small odd > td[0] > strong[0] // unternehmen Gebäude
table > body > tr small even > td[0] > strong[0] // unternehmen Gebäude
table > body > tr small odd > td[1] // unternehmen Gebäude inhalt
table > body > tr small even > td[1] // unternehmen Gebäude inhalt
*/
var a = 0;
var table_tr = Adressbuch.getElementsByTagName("tr")
var inhalt = "";
var gebaeude;
var merkliste = "Merkliste <br>";
for (var i = 1; i <= table_tr.length; i++){
	inhalt = Adressbuch.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].data;
	var suche1 = inhalt.indexOf("[" + PName + "]");  // FEHLERHAFT !!!
	var suche2 = inhalt.indexOf("[/" + PName + "]");  // FEHLERHAFT !!!
	// wenn suchwort vorkommt
	if (suche1 >= 0) {
		gebaeude = Adressbuch.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("strong")[0].data; // Gebäudenummer auslesen
		
		var laengePName = PName.length
		merkliste = merkliste + "Gebäude: " + gebaeude + " <br>"; 
		} 
}
alert(suche + "<br>" + merkliste);

/*
///////////////////////////
// Ausgabe als neuer Div //
///////////////////////////

var NeuerDiv = document.createElement("div"); //erzeugen des Elementes
var Inhalt = document.createTextNode("Selektiertes Produkt >" + PName + "<") //Das steht im Div
NeuerDiv.setAttribute("id", "Merkzettel"); //Attribut geben
NeuerDiv.appendChild(Inhalt); //Inhalt anhängen

//Ins dokument hängen
var AlterDiv = document.getElementsByTagName("form");
AlterDiv.appendChild(NeuerDiv);

//Fertig !
*/
