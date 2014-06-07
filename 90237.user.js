// ==UserScript==
// @name            IT2-Preisberechnung
// @namespace       de
// @description     Versandpreis per Klick berechnen
// @author          Antonio Estrela do Sul & eXidys
// @include         http://www.itycoon2.de/transport/charge/*
// @date            2010-11-12
// @version         1.11alpha
// ==/UserScript==

///////////////////////////////
// Konfiguration der Prozente
///////////////////////////////

var percent = new Array(0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95); // Array mit den Prozenten 
// Werte in var percent rauseditiert 0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45, 0.1-0.25 liegen teilweise unterm Produktionspreis

///////////////////////////////
// Element mit Maxpreis erhalten
///////////////////////////////

var PositionMP = document.getElementsByTagName("form")[0].getElementsByTagName("p")[3].getElementsByTagName("a")[0];
var Maximalpreis = PositionMP.innerHTML;
var MPKomma = Maximalpreis.slice(Maximalpreis.search(/\d+/),Maximalpreis.search(/\s/));
var MPPunkt = MPKomma.replace(/\,/, "."); // Komma in Punkt verwandeln
var MP = parseFloat(MPPunkt); // fertiger Maxpreis

///////////////////////////////
// Einfügen der Berechnung
///////////////////////////////

var calc_position = document.getElementsByTagName("form")[0];  // Positionsermittlung, Elternknoten
var calc_insert = document.getElementsByTagName("form")[0].getElementsByTagName("p")[3];  // Positionsermittlung, Element Maximalpreis

var p = document.createElement("p");			// p Element generieren
var span = document.createElement("span");		// span Element mit der Klasse label generieren
span.className = "label";
span.appendChild(document.createTextNode("Fit im Kopfrechnen? Nein, ok:"));
p.appendChild(span);

// Schleife zur Berechnung der prozentualen Werte
for (var i = 0; i < percent.length; i++) {
	var result = MP * percent[i];			// Prozentualeberechnung des Max-Preises
	var vis = percent[i]*100;
	if (percent[i] == 0.55) var vis = Math.round(percent[i]*100); // Bugfix Anzeigefehler 55% ansonsten wird 55.00000000000001% angezeigt
	// Runden der prozentualen Werte
	var round_mp = (Math.round(result * 100) / 100).toString();
	round_mp.substring(0, round_mp.indexOf('.') + 3);
	// Linkgenerieren
	var links = document.createElement("a");
	links.setAttribute("href", "javascript:set_value('data_price','" + round_mp + "');");
	links.appendChild(document.createTextNode("" + vis + "%"));
	p.appendChild(links);
	// Korrektur des Anzeigefehlers, Prozentzahlen werden nun auseinandergeschrieben
	var spacer = document.createTextNode(" ");
	p.appendChild(spacer);
};

// Einfügen ins Layout    
calc_position.insertBefore(p, calc_insert.nextSibling);