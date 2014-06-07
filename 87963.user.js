// ==UserScript==
// @name		   Die Staemme - Berichtsspeicher
// @namespace	  Die Staemme
// @author	   Marc H. (Salandora)
// @description	Dieses Script ist für das Browsergame "Die Stämme", es Speichert Berichte und zeigt diese als Popup in der Berichtsübersicht wenn man mit der maus über den Link zum bericht fährt.
// @include		http://*.die-staemme.de/*
// @exclude	   http://forum.die-staemme.de/*
// ==/UserScript==

// =============================================================
//
//   Weitergabe oder Änderungen nur mit zustimmung des Authors!
//
// =============================================================

var mouseX = 0;
var mouseY = 0;

//XPosition von Rechts ausgehend
//YPosition von Open ausgehend

//var XPosition = "{maus}"; //Wenn der Bericht dem Mauszeiger auf der X-Achse folgen soll das hier auskommentieren und die zeile dadrunter auskommentieren.
var XPosition = "10%";

//var YPosition = "{maus}"; //Wenn der Bericht dem Mauszeiger auf der Y-Achse folgen soll das hier auskommentieren und die zeile dadrunter auskommentieren.
var YPosition = "13%";

var welt = location.href.split('.')[0].replace("http://", "");

var erfassteberichte = GM_getValue("ErfassteBerichte", "");

if (location.href.match(/screen=settings&mode=settings/))
{
	var main = document.getElementsByClassName("main");
	var table = main[0].getElementsByClassName("vis")[1];

	var zeilen = new Array();
	var spalten = new Array();

	var izeile = 0;
	var ispalte = 0;

	var zeigeGewonnen = GM_getValue("ZeigeGewonnen_" + welt);
	var zeigeGlueck = GM_getValue("ZeigeGlück_" + welt);
	var zeigeMoral = GM_getValue("ZeigeMoral_" + welt);
	var zeigeNachtbonus = GM_getValue("ZeigeNachtbonus_" + welt);
	
	var zeigeAngreiferEinheiten = GM_getValue("ZeigeAngreiferEinheiten_" + welt);
	var zeigeAngreiferEinheitenVerluste = GM_getValue("ZeigeAngreiferEinheitenVerluste_" + welt);
	var zeigeVerteidigerEinheiten = GM_getValue("ZeigeVerteidigerEinheiten_" + welt);
	var zeigeVerteidigerEinheitenVerluste = GM_getValue("ZeigeVerteidigerEinheitenVerluste_" + welt);

	var zeigeEinheitenAusserhalb = GM_getValue("ZeigeEinheitenAusserhalb_" + welt);
	var zeigeErspaehteRohstoffe = GM_getValue("ZeigeErspähteRohstoffe_" + welt);
	var zeigeErspaehteGebaeude = GM_getValue("ZeigeErspähteGebäude_" + welt);

	var zeigeBeute = GM_getValue("ZeigeBeute_" + welt);
	var zeigeZustimmung = GM_getValue("ZeigeZustimmunggesunken_" + welt);
	var zeigeSchadenRammboecke = GM_getValue("ZeigeSchadenRammböcke_" + welt);
	var zeigeSchadenKatapulte = GM_getValue("ZeigeSchadenKatapulte_" + welt);

	zeilen[izeile] = document.createElement("tr");
	table.appendChild(zeilen[izeile]);

	spalten[ispalte] = document.createElement("th");
	spalten[ispalte].setAttribute("colspan", "2");
	spalten[ispalte].innerHTML = "Die Staemme - Berichtsspeicher";
	zeilen[izeile].appendChild(spalten[ispalte++]);

	zeilen[++izeile] = document.createElement("tr");
	table.appendChild(zeilen[izeile]);

	spalten[ispalte] = document.createElement("td");
	spalten[ispalte].setAttribute("colspan", "2");
	zeilen[izeile].appendChild(spalten[ispalte]);

	var berichtelink = document.createElement("a");
	berichtelink.href = "#";
	berichtelink.innerHTML = "Alle Berichte Zurücksetzen<br>";
	berichtelink.addEventListener("click", ResetteBerichte, false);
	spalten[ispalte].appendChild(berichtelink);
	
	var form = document.createElement("from");
	spalten[ispalte].appendChild(form);
	var tabelle = document.createElement("table");
	tabelle.setAttribute("class", "vis");
	tabelle.setAttribute("width", "99%");
	form.appendChild(tabelle);

	zeilen[izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("th");
	spalten[ispalte].setAttribute("colspan", "2");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML = "<center>Angriffs/Verteidigungs Berichte</center>";

	//Block 1
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML = "Zeige Gewonnen:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	var label = spalten[ispalte].appendChild(document.createElement("label"));
	var radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeGewonnen";
	radio.value = "Ja";
	if (zeigeGewonnen == "Ja")
		radio.setAttribute("checked", "checked");
		
	radio.addEventListener("click", function(){ GM_setValue("ZeigeGewonnen_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));
	
	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeGewonnen";
	radio.value = "Nein";
	if (zeigeGewonnen == "Nein")
		radio.setAttribute("checked", "checked");
		
	radio.addEventListener("click", function(){ GM_setValue("ZeigeGewonnen_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 1a
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML = "Zeige Glück:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	var label = spalten[ispalte].appendChild(document.createElement("label"));
	var radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeGlück";
	radio.value = "Ja";
	if (zeigeGlueck == "Ja")
		radio.setAttribute("checked", "checked");
		
	radio.addEventListener("click", function(){ GM_setValue("ZeigeGlück_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));
	
	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeGlück";
	radio.value = "Nein";
	if (zeigeGlueck == "Nein")
		radio.setAttribute("checked", "checked");
		
	radio.addEventListener("click", function(){ GM_setValue("ZeigeGlück_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 1b
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML = "Zeige Moral:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	var label = spalten[ispalte].appendChild(document.createElement("label"));
	var radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeMoral";
	radio.value = "Ja";
	if (zeigeMoral == "Ja")
		radio.setAttribute("checked", "checked");
		
	radio.addEventListener("click", function(){ GM_setValue("ZeigeMoral_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));
	
	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeMoral";
	radio.value = "Nein";
	if (zeigeMoral == "Nein")
		radio.setAttribute("checked", "checked");
		
	radio.addEventListener("click", function(){ GM_setValue("ZeigeMoral_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 1c
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML = "Zeige Nachtbonus:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	var label = spalten[ispalte].appendChild(document.createElement("label"));
	var radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeNachtbonus";
	radio.value = "Ja";
	if (zeigeNachtbonus == "Ja")
		radio.setAttribute("checked", "checked");
		
	radio.addEventListener("click", function(){ GM_setValue("ZeigeNachtbonus_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));
	
	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeNachtbonus";
	radio.value = "Nein";
	if (zeigeNachtbonus == "Nein")
		radio.setAttribute("checked", "checked");
		
	radio.addEventListener("click", function(){ GM_setValue("ZeigeNachtbonus_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 2
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Angreifer Einheiten:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeAngreiferEinheiten";
	radio.value = "Ja";
	if (zeigeAngreiferEinheiten == "Ja")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function(){ GM_setValue("ZeigeAngreiferEinheiten_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeAngreiferEinheiten";
	radio.value = "Nein";
	if (zeigeAngreiferEinheiten == "Nein")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function(){ GM_setValue("ZeigeAngreiferEinheiten_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 3
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Verluste der Einheiten des Angreifers:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeAngreiferEinheitenVerluste";
	radio.value = "Ja";
	if (zeigeAngreiferEinheitenVerluste == "Ja")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function(){ GM_setValue("ZeigeAngreiferEinheitenVerluste_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeAngreiferEinheitenVerluste";
	radio.value = "Nein";
	if (zeigeAngreiferEinheitenVerluste == "Nein")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function(){ GM_setValue("ZeigeAngreiferEinheitenVerluste_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 4
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Verteidiger Einheiten:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeVerteidigerEinheiten";
	radio.value = "Ja";
	if (zeigeVerteidigerEinheiten == "Ja")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeVerteidigerEinheiten_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeVerteidigerEinheiten";
	radio.value = "Nein";
	if (zeigeVerteidigerEinheiten == "Nein")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeVerteidigerEinheiten_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 5
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Verluste der Einheiten des Verteidigers:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeVerteidigerEinheitenVerluste";
	radio.value = "Ja";
	if (zeigeVerteidigerEinheitenVerluste == "Ja")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeVerteidigerEinheitenVerluste_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeVerteidigerEinheitenVerluste";
	radio.value = "Nein";
	if (zeigeVerteidigerEinheitenVerluste == "Nein")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeVerteidigerEinheitenVerluste_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 6
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);
	
	spalten[ispalte].innerHTML += "Zeige Truppen des Verteidigers Ausserhalb:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeEinheitenAusserhalb";
	radio.value = "Ja";
	if (zeigeEinheitenAusserhalb == "Ja")
		radio.setAttribute("checked", "checked");

   	radio.addEventListener("click", function() { GM_setValue("ZeigeEinheitenAusserhalb_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeEinheitenAusserhalb";
	radio.value = "Nein";
	if (zeigeEinheitenAusserhalb == "Nein")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeEinheitenAusserhalb_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 7
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Erspähte Rohstoffe:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeErspähteRohstoffe";
	radio.value = "Ja";
	if (zeigeErspaehteRohstoffe == "Ja")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeErspähteRohstoffe_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeErspähteRohstoffe";
	radio.value = "Nein";
	if (zeigeErspaehteRohstoffe == "Nein")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeErspähteRohstoffe_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 8
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Erspähte Gebäude:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeErspähteGebäude";
	radio.value = "Ja";
	if (zeigeErspaehteGebaeude == "Ja")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeErspähteGebäude_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeErspähteGebäude";
	radio.value = "Nein";
	if (zeigeErspaehteGebaeude == "Nein")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeErspähteGebäude_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 9
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Beute:";
	
	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeBeute";
	radio.value = "Ja";
	if (zeigeBeute == "Ja")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeBeute_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeBeute";
	radio.value = "Nein";
	if (zeigeBeute == "Nein")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeBeute_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 10
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige gesunkene Zustimmung:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeZustimmunggesunken";
	radio.value = "Ja";
	if (zeigeZustimmung == "Ja")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeZustimmunggesunken_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeZustimmunggesunken";
	radio.value = "Nein";
	if (zeigeZustimmung == "Nein")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeZustimmunggesunken_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 11
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige schaden durch Rammböcke:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeSchadenRammböcke";
	radio.value = "Ja";
	if (zeigeSchadenRammboecke == "Ja")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeSchadenRammböcke_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeSchadenRammböcke";
	radio.value = "Nein";
	if (zeigeSchadenRammboecke == "Nein")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeSchadenRammböcke_" + welt, "Nein"); }, false);
		label.appendChild(document.createTextNode("Nein"));
	
	//Block 12
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Schaden durch Katapulte:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeSchadenKatapulte";
	radio.value = "Ja";
	if (zeigeSchadenKatapulte == "Ja")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeSchadenKatapulte_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeSchadenKatapulte";
	radio.value = "Nein";
	if (zeigeSchadenKatapulte == "Nein")
		radio.setAttribute("checked", "checked");

		radio.addEventListener("click", function() { GM_setValue("ZeigeSchadenKatapulte_" + welt, "Nein"); }, false);
		label.appendChild(document.createTextNode("Nein"));

	zeilen[izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("th");
	spalten[ispalte].setAttribute("colspan", "2");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML = "<center>Unterstützungs Berichte</center>";

	var zeigeUnterstuetzterSpieler = GM_getValue("ZeigeUnterstützterSpieler_" + welt);
	var zeigeUnterstuetztesDorf = GM_getValue("ZeigeUnterstütztesDorf_" + welt);
	var zeigeTruppenherkunft = GM_getValue("ZeigeTruppenherkunft_" + welt);
	var zeigeUnterstuetzungsEinheiten = GM_getValue("ZeigeUnterstützungsEinheiten_" + welt);
	var zeigeUnterstuetzungsEinheitenVerluste = GM_getValue("ZeigeUnterstützungsEinheitenVerluste_" + welt);

	//Block 13
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Unterstützten Spieler:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeUnterstützterSpieler";
	radio.value = "Ja";
	if (zeigeUnterstuetzterSpieler == "Ja")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeUnterstützterSpieler_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeUnterstützterSpieler";
	radio.value = "Nein";
	if (zeigeUnterstuetzterSpieler == "Nein")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeUnterstützterSpieler_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 14
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Unterstütztes Dorf:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeUnterstütztesDorf";
	radio.value = "Ja";
	if (zeigeUnterstuetztesDorf == "Ja")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeUnterstütztesDorf_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeUnterstütztesDorf";
	radio.value = "Nein";
	if (zeigeUnterstuetztesDorf == "Nein")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeUnterstütztesDorf_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 15
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Truppen herkunft:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeTruppenherkunft";
	radio.value = "Ja";
	if (zeigeTruppenherkunft == "Ja")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeTruppenherkunft_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeTruppenherkunft";
	radio.value = "Nein";
	if (zeigeTruppenherkunft == "Nein")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeTruppenherkunft_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 16
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Einheiten:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeUnterstützungsEinheiten";
	radio.value = "Ja";
	if (zeigeUnterstuetzungsEinheiten == "Ja")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeUnterstützungsEinheiten_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeUnterstützungsEinheiten";
	radio.value = "Nein";
	if (zeigeUnterstuetzungsEinheiten == "Nein")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeUnterstützungsEinheiten_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));

	//Block 17
	zeilen[++izeile] = document.createElement("tr");
	tabelle.appendChild(zeilen[izeile]);

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	spalten[ispalte].innerHTML += "Zeige Einheiten Verluste:";

	spalten[++ispalte] = document.createElement("td");
	zeilen[izeile].appendChild(spalten[ispalte]);

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeUnterstuetzungsEinheitenVerluste";
	radio.value = "Ja";
	if (zeigeUnterstuetzungsEinheitenVerluste == "Ja")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeUnterstützungsEinheitenVerluste_" + welt, "Ja"); }, false);
	label.appendChild(document.createTextNode("Ja"));

	label = spalten[ispalte].appendChild(document.createElement("label"));
	radio = label.appendChild(document.createElement("input"));
	radio.type = "radio";
	radio.name = "ZeigeUnterstützungsEinheitenVerluste";
	radio.value = "Nein";
	if (zeigeUnterstuetzungsEinheitenVerluste == "Nein")
		radio.setAttribute("checked", "checked");

	radio.addEventListener("click", function() { GM_setValue("ZeigeUnterstützungsEinheitenVerluste_" + welt, "Nein"); }, false);
	label.appendChild(document.createTextNode("Nein"));
}
if (location.href.match(/game.php/) && GM_getValue("ZeigeGlück_" + welt) == undefined)
{
	if (confirm("Die Staemme - Berichtsübersicht muss jetzt Konfiguriert werden. Dazu bitte auf OK klicken."))
	{
		Konfigurieren();
		if (confirm("Die Staemme - Berichtsübersicht wurde installiert und Konfiguriert. Viel Spass"))
		{
		}
	}
}
if (location.href.match(/screen=report/))
{
	if (location.href.match(/view=/)) 
	{
		var vis = document.getElementsByClassName("vis")[2].innerHTML;
		var berichtsid = location.href.split("view=")[1].split('&')[0];
		ErfasseBericht(berichtsid);
	}
	else if(location.href.match(/action=del_one/))
	{
		var berichtsid = location.href.split("id=")[1].split('&')[0];
		ResetteBericht(berichtsid);
	}
	else
	{
		document.addEventListener("mousemove", handleMove, true);
		Verlinken();
	}
}

var xpos = XPosition;
var ypos = YPosition;

function handleMove (ev)
{
	if (!ev)
		ev = window.event;

	if (ev)
	{
		mouseX = ev.pageX ? ev.pageX : ev.clientX;
		mouseY = ev.pageY ? ev.pageY : ev.clientY;

		xpos = XPosition.replace("{maus}", mouseX + "px");
		ypos = YPosition.replace("{maus}", mouseY + "px");
	}
}

function Konfigurieren()
{
	GM_setValue("ZeigeGewonnen_" + welt, "Ja");
	GM_setValue("ZeigeGlück_" + welt, "Ja");
	GM_setValue("ZeigeMoral_" + welt, "Ja");
	GM_setValue("ZeigeNachtbonus_" + welt, "Ja");
	GM_setValue("ZeigeAngreiferEinheiten_" + welt, "Ja");	
	GM_setValue("ZeigeAngreiferEinheitenVerluste_" + welt, "Ja");
	GM_setValue("ZeigeVerteidigerEinheiten_" + welt, "Ja");
	GM_setValue("ZeigeVerteidigerEinheitenVerluste_" + welt, "Ja");
	GM_setValue("ZeigeEinheitenAusserhalb_" + welt, "Ja");
	GM_setValue("ZeigeErspähteRohstoffe_" + welt, "Ja");
	GM_setValue("ZeigeErspähteGebäude_" + welt, "Ja");
	GM_setValue("ZeigeBeute_" + welt, "Ja")<
	GM_setValue("ZeigeZustimmunggesunken_" + welt, "Ja");
	GM_setValue("ZeigeSchadenRammböcke_" + welt, "Ja");
	GM_setValue("ZeigeSchadenKatapulte_" + welt, "Ja");

	GM_setValue("ZeigeUnterstützterSpieler_" + welt, "Ja");
	GM_setValue("ZeigeUnterstütztesDorf_" + welt, "Ja");
	GM_setValue("ZeigeTruppenherkunft_" + welt, "Ja");
	GM_setValue("ZeigeUnterstützungsEinheiten_" + welt, "Ja");
	GM_setValue("ZeigeUnterstützungsEinheitenVerluste_" + welt, "Ja");
}
function ResetteBerichte()
{
	var berichte = erfassteberichte.split(';');
	for (var i = 0; i < berichte.length; i++)
	{
		var berichtsid = berichte[i];
		ResetteBericht(berichtsid);
	}
	erfassteberichte = "";
	erfassteunterstuetzungsberichte = "";
	GM_setValue("ErfassteBerichte", erfassteberichte);
	GM_setValue("ErfassteUnterstützungsBerichte", erfassteunterstuetzungsberichte);

	if (confirm("Alle Berichte wurden zurückgesetzt."))
	{
	}
}

function ResetteBericht(berichtsid)
{
	deleteValue("Bericht_" + berichtsid + "_" + welt);
}
function deleteValue(key)
{
	if (GM_getValue(key, "") != "")
	{
		if (!GM_deleteValue)
		{
			GM_setValue(key, "");
		}
		else
		{
			GM_deleteValue(key);
		}
	}
}

function Verlinken()
{
	window.addEventListener('submit', MultiLoeschenGedrueckt, true);

	var main = document.getElementsByClassName("main");
	var vis = main[main.length-1].getElementsByClassName("vis");
	
	var viscount = vis.length - 2;

	var table = vis[viscount];

	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++)
	{
		var link = links[i];
		var berichtsid = link.href.split("view=")[1];

		if(GM_getValue("Bericht_" + berichtsid + "_" + welt, "") != "")
		{
			AendereLink(link);

			var div = document.createElement("div");
			div.innerHTML = GM_getValue("Bericht_" + berichtsid + "_" + welt);

			//if (div.innerHTML.indexOf("Unterstützter Spieler:") != -1 || div.innerHTML.indexOf("unterstützt") != -1 || div.innerHTML.indexOf("Unterstützung") != -1)
			//	ErstelleUnterstuetzungsBerichtsTabelle(div, berichtsid);
			//else
			//	ErstelleBerichtsTabelle(div, berichtsid);

			try
			{
				ErstelleBerichtsTabelle(div, berichtsid);
			}
			catch(e)
			{
				try
				{
					ErstelleUnterstuetzungsBerichtsTabelle(div, berichtsid);
				}
				catch(e)
				{
				}
			}
		}
	}
}

function MultiLoeschenGedrueckt(event)
{
	var target = event ? event.target : this;

	for (var i=0; i< target.length; i++)
	{
		var element = target.elements[i];
		if (element.input == "checkbox" && element.checked)
		{
			var berichtsid = element.name.split('_')[1];
			ResetteBericht(berichtsid);
		}
	}
}

function AendereLink(link)
{
	link.addEventListener("mouseover", function() { ZeigeBericht(link.href.split("view=")[1]); }, false);
	link.addEventListener("mouseout", function() { VersteckeBericht(link.href.split("view=")[1]); }, false);	
}

function ErfasseBericht(berichtsid)
{
	var main = document.getElementsByClassName("main");
	var vis = main[main.length-1].getElementsByClassName("vis");
	
	GM_setValue("Bericht_" + berichtsid + "_" + welt, vis[2].innerHTML);
}

function ParseUnterstuetzungsBericht(bericht)
{
	var retrn = new Object();
	
	retrn["Name"] = bericht.getElementsByTagName("span")[1].innerHTML;

	var infotabelle = bericht.getElementsByTagName("table")[0];
   	retrn["Von"] = infotabelle.getElementsByTagName("th")[1].innerHTML.replace(/<.+?>/g, '');
	retrn["Von_Dorf"] = infotabelle.getElementsByTagName("td")[1].innerHTML.replace(/<.+?>/g, '');
	retrn["An"] = infotabelle.getElementsByTagName("th")[3].innerHTML.replace(/<.+?>/g, '');
	retrn["An_Dorf"] = infotabelle.getElementsByTagName("td")[3].innerHTML.replace(/<.+?>/g, '');
 
	var einheitentabelle = bericht.getElementsByTagName("table")[1];
	retrn["Unterstützungs_Truppen"] = einheitentabelle.getElementsByTagName("tr")[0].innerHTML;
	retrn["Unterstützungs_Truppenanzahl"] = einheitentabelle.getElementsByTagName("tr")[1].innerHTML;
	retrn["Unterstützungs_Truppenverluste"] = "";

	return retrn;
}

function ParseUnterstuetzterSpielerBericht(bericht)
{
	var retrn = new Object();

	retrn["Name"] = bericht.getElementsByTagName("span")[1].innerHTML;

	var unterstuetzungstabelle = bericht.getElementsByTagName("table")[0];

	retrn["Unterstützter_Spieler"] = unterstuetzungstabelle.getElementsByTagName("th")[1].innerHTML.replace(/<.+?>/g, '');
	retrn["Unterstützes_Dorf"] = unterstuetzungstabelle.getElementsByTagName("td")[1].innerHTML.replace(/<.+?>/g, '');
	retrn["Truppenherkunft"] = unterstuetzungstabelle.getElementsByTagName("td")[3].innerHTML.replace(/<.+?>/g, '');

	var einheitentabelle = bericht.getElementsByTagName("table")[1];
	retrn["Unterstützungs_Truppen"] = einheitentabelle.getElementsByTagName("tr")[0].innerHTML;
	retrn["Unterstützungs_Truppenanzahl"] = einheitentabelle.getElementsByTagName("tr")[1].innerHTML;
	retrn["Unterstützungs_Truppenverluste"] = einheitentabelle.getElementsByTagName("tr")[2].innerHTML;

	return retrn;
}
function ParseAngriffsVerteidigungsBericht(bericht)
{
	var retrn = new Object();

	retrn["Name"] = bericht.getElementsByTagName("span")[1].innerHTML;
	retrn["Gewonnen"] = bericht.getElementsByTagName("h3")[0].innerHTML;
	retrn["Glück"] = bericht.getElementsByTagName("b")[0].innerHTML;
	retrn["Moral"] = bericht.getElementsByTagName("h4")[1].innerHTML;

	if (bericht.innerHTML.match(/Nachtbonus/))
		retrn["Nachtbonus"] = table.getElementsByTagName("h4")[2].innerHTML;	

	var angreifertabelle = bericht.getElementsByTagName("table")[3];

	retrn["Angreifer_Name"] = angreifertabelle.getElementsByTagName("th")[1].innerHTML.replace(/<.+?>/g, '');
	retrn["Angreifer_Dorf"] = angreifertabelle.getElementsByTagName("td")[1].innerHTML.replace(/<.+?>/g, '');
	
	var angreifertruppentabelle = angreifertabelle.getElementsByTagName("table")[0];
	retrn["Angreifer_Truppen"] = angreifertruppentabelle.getElementsByTagName("tr")[0].innerHTML;
	retrn["Angreifer_Truppenanzahl"] = angreifertruppentabelle.getElementsByTagName("tr")[1].innerHTML;
	retrn["Angreifer_Truppenverluste"] = angreifertruppentabelle.getElementsByTagName("tr")[2].innerHTML;

	var verteidigertabelle = bericht.getElementsByTagName("table")[5];
	retrn["Verteidiger_Name"] = verteidigertabelle.getElementsByTagName("th")[1].innerHTML.replace(/<.+?>/g, '');
	retrn["Verteidiger_Dorf"] = verteidigertabelle.getElementsByTagName("td")[1].innerHTML.replace(/<.+?>/g, '');

	if (bericht.innerHTML.indexOf("red.png?1") == -1)
	{
		var verteidigertruppentabelle = verteidigertabelle.getElementsByTagName("table")[0];
		retrn["Verteidiger_Truppen"] = verteidigertruppentabelle.getElementsByTagName("tr")[0].innerHTML;
		retrn["Verteidiger_Truppenanzahl"] = verteidigertruppentabelle.getElementsByTagName("tr")[1].innerHTML;
		retrn["Verteidiger_Truppenverluste"] = verteidigertruppentabelle.getElementsByTagName("tr")[2].innerHTML;
	}
	else
	{
		retrn["Verteidiger_Truppen"] = "<td>" + verteidigertabelle.getElementsByTagName("td")[2].innerHTML + "</td>";
		retrn["Verteidiger_Trupenanzahl"] = "";
		retrn["Verteidiger_Truppenverluste"] = "";
	
	}

	var index = 7;
	if (bericht.innerHTML.match(/Truppen des Verteidigers/))
	{
		var truppentabelle = bericht.getElementsByTagName("table")[index++];
		retrn["Unterwegs_Truppen"] = truppentabelle.getElementsByTagName("tr")[0].innerHTML;
		retrn["Unterwegs_Truppenanzahl"] = truppentabelle.getElementsByTagName("tr")[1].innerHTML;

	}
	if (bericht.innerHTML.match(/Erspähte Rohstoffe:/) || bericht.innerHTML.match(/Gebäude:/))
	{
		var erspaehttabelle = bericht.getElementsByTagName("table")[index++];
		if (erspaehttabelle.innerHTML.match(/Erspähte Rohstoffe:/))
		{
			retrn["Erspäht_Rohstoffe"] = erspaehttabelle.getElementsByTagName("tr")[0].innerHTML;
		}

		if (erspaehttabelle.innerHTML.match(/Gebäude:/))
		{
			retrn["Erspäht_Gebäude"] = erspaehttabelle.getElementsByTagName("tr")[1].innerHTML;
		}
	}
	if (bericht.innerHTML.match(/Beute:/) || bericht.innerHTML.match(/Zustimmung gesunken von/) || bericht.innerHTML.match(/Schaden durch/))
	{
		var tabelle = bericht.getElementsByTagName("table")[index++];
		var i = 0;
		if (tabelle.innerHTML.match(/Beute:/))
		{
			retrn["Beute"] = tabelle.getElementsByTagName("tr")[i++].innerHTML;
		}
		if (tabelle.innerHTML.match(/Zustimmung gesunken von/))
		{
			retrn["Zustimmung"] = tabelle.getElementsByTagName("tr")[i++].innerHTML;
		}
		if (tabelle.innerHTML.match(/Rammb.+?cke:/))
		{
			retrn["Rammböcke"] = tabelle.getElementsByTagName("tr")[i++].innerHTML;
		}
		if (tabelle.innerHTML.match(/Katapultbeschuss:/))
		{
			retrn["Katapulte"] = tabelle.getElementsByTagName("tr")[i++].innerHTML;
		}
	}

	return retrn;
}



function ErstelleUnterstuetzungsBerichtsTabelle(bericht, berichtsid)
{
	var parse;
	//Parse Bericht
	if (bericht.innerHTML.indexOf("Unterstützter Spieler:") != -1)
		parse = ParseUnterstuetzterSpielerBericht(bericht);
	else
		parse = ParseUnterstuetzungsBericht(bericht);			

	var div = document.createElement("div");
	div.setAttribute("id", berichtsid);
	div.setAttribute("style", "position:absolute; top: " + ypos + "; right: " + xpos + "; visibility:hidden");
	document.body.appendChild(div);

	var tabelleborder = document.createElement("table");
	tabelleborder.setAttribute("class", "navi-border");
 	tabelleborder.setAttribute("style", "border-collapse: collapse;");
  	div.appendChild(tabelleborder);

  	var zeileborder = document.createElement("tr");
  	tabelleborder.appendChild(zeileborder);
	
	var spalteborder = document.createElement("td");
	zeileborder.appendChild(spalteborder);

	var tabelle = document.createElement("table");
	tabelle.setAttribute("class", "nowrap");
	tabelle.setAttribute("style", "border: 1px solid; border-color: #997733 #FFDD99 #FFEECC #BB9955; background-repeat: repeat-x; background-color:#F7EED3");
	spalteborder.appendChild(tabelle);

	var zeile = document.createElement("tr");
	tabelle.appendChild(zeile);
	
	var spalte1 = document.createElement("th");
	zeile.appendChild(spalte1);
	var spalte2 = document.createElement("th");
	zeile.appendChild(spalte2);

	if ((GM_getValue("ZeigeUnterstützterSpieler_" + welt, "") == "Ja" && parse["Unterstützter_Spieler"] != undefined) || parse["Von"] != undefined)
	{
		spalte1.innerHTML = "<b>" + (parse["Von"] != undefined ? "Von:" : "Unterstützter Spieler:") + "</b>";
		spalte2.innerHTML = "<b>" + (parse["Von"] != undefined ? parse["Von"] : parse["Unterstützter_Spieler"]) + "</b>";
	}

	if ((GM_getValue("ZeigeUnterstütztesDorf_" + welt, "") == "Ja" && parse["Unterstütztes_Dorf"] != undefined) || parse["Von_Dorf"] != undefined)
	{
		zeile = document.createElement("tr");
		tabelle.appendChild(zeile);

		spalte1 = document.createElement("td");
		zeile.appendChild(spalte1);
		spalte2 = document.createElement("td");
		zeile.appendChild(spalte2);
		
		spalte1.innerHTML = "<b>" + (parse["Von_Dorf"] != undefined ? "Dorf:" : "Unterstütztes Dorf:") + "</b>";
		spalte2.innerHTML = "<b>" + (parse["Von_Dorf"] != undefined ? parse["Von_Dorf"] : parse["Unterstütztes_Dorf"]) + "</b>";
	}

	if (parse["An"] != undefined)
	{
		zeile = document.createElement("tr");
		tabelle.appendChild(zeile);

		spalte1 = document.createElement("th");
		zeile.appendChild(spalte1);
		spalte2 = document.createElement("th");
		zeile.appendChild(spalte2);
		spalte1.innerHTML = "<b>An:</b>";
		spalte2.innerHTML = "<b>" + parse["An"] + "</b>";
	}
	if (parse["An_Dorf"] != undefined)
	{
		zeile = document.createElement("tr");
		tabelle.appendChild(zeile);

		spalte1 = document.createElement("td");
		zeile.appendChild(spalte1);
		spalte2 = document.createElement("td");
		zeile.appendChild(spalte2);
		spalte1.innerHTML = "<b>Dorf:</b>";
		spalte2.innerHTML = "<b>" + parse["An_Dorf"] + "</b>";
	}

	if (GM_getValue("ZeigeTruppenherkunft_" + welt, "") == "Ja" && parse["Truppenherkunft"] != undefined)
	{
		zeile = document.createElement("tr");
		tabelle.appendChild(zeile);

		spalte1 = document.createElement("td");
		zeile.appendChild(spalte1);
		spalte2 = document.createElement("td");
		zeile.appendChild(spalte2);
		
		spalte1.innerHTML = "<b>Truppen herkunft:</b>";
		spalte2.innerHTML = "<b>" + parse["Truppenherkunft"] + "</b>";
	}
	
	zeile = document.createElement("tr");
	tabelle.appendChild(zeile);

	spalte1 = document.createElement("th");
	spalte1.setAttribute("colspan", "2");
	zeile.appendChild(spalte1);

	spalte1.innerHTML = "Einheiten:";

	zeile = document.createElement("tr");
	tabelle.appendChild(zeile);

	spalte1 = document.createElement("td");
	spalte1.setAttribute("colspan", "2");
	zeile.appendChild(spalte1);
	if (GM_getValue("ZeigeUnterstützungsEinheiten_" + welt) == "Ja" && parse["Unterstützungs_Truppen"] != undefined)
	{
		var truppentabelle = document.createElement("table");
		spalte1.appendChild(truppentabelle);

		var truppentabellezeile = document.createElement("tr");
		truppentabellezeile.setAttribute("class", "center");
		truppentabelle.appendChild(truppentabellezeile);
		truppentabellezeile.innerHTML = parse["Unterstützungs_Truppen"];


		var truppenanzahlzeile = document.createElement("tr");
		truppenanzahlzeile.setAttribute("class", "center");
		truppentabelle.appendChild(truppenanzahlzeile);
		truppenanzahlzeile.innerHTML = parse["Unterstützungs_Truppenanzahl"];

		if (GM_getValue("ZeigeUnterstützungsEinheitenVerluste_" + welt) == "Ja")
		{
			var truppenverlustzeile = document.createElement("tr");
			truppenverlustzeile.setAttribute("class", "center");
			truppentabelle.appendChild(truppenverlustzeile);
			truppenverlustzeile.innerHTML = parse["Unterstützungs_Truppenverluste"];
		}
	}
}

function ErstelleBerichtsTabelle(bericht, berichtsid)
{
	var parse = ParseAngriffsVerteidigungsBericht(bericht);

	var div = document.createElement("div");
	div.setAttribute("id", berichtsid);
	div.setAttribute("style", "position:absolute; top: " + ypos + "; right: " + xpos + "; visibility:hidden");
	document.body.appendChild(div);
	
	var tabelleborder = document.createElement("table");
	tabelleborder.setAttribute("class", "navi-border");
	tabelleborder.setAttribute("style", "border-collapse: collapse;");

	var zeileborder = document.createElement("tr");
	var spalteborder = document.createElement("td");

	var tabelle = document.createElement("table");
	tabelle.setAttribute("class", "nowrap");
	tabelle.setAttribute("style", "border: 1px solid; border-color: #997733 #FFDD99 #FFEECC #BB9955; background-repeat: repeat-x; background-color:#F7EED3");
	
	var zeile = document.createElement("tr");
	var spalte = document.createElement("td");

	div.appendChild(tabelleborder);
	tabelleborder.appendChild(zeileborder);
	zeileborder.appendChild(spalteborder);
	spalteborder.appendChild(tabelle);
	tabelle.appendChild(zeile);
	zeile.appendChild(spalte);

	if (GM_getValue("ZeigeGewonnen_" + welt) == "Ja" && parse["Gewonnen"] != undefined)
		spalte.innerHTML = "<h4>" + parse["Gewonnen"] + "</h4>\n";
		
	if (GM_getValue("ZeigeGlück_" + welt) == "Ja" && parse["Glück"] != undefined)
	{
		var glueck = parse["Glück"];
		if (glueck.indexOf('-') != -1)
			spalte.innerHTML += "Glück: <span style=\"color: #FF0000\">" + glueck + "</span>";
		else
			spalte.innerHTML += "Glück: <span style=\"color: #00AA00\">" + glueck + "</span>";
	}


	if (GM_getValue("ZeigeMoral_" + welt) == "Ja" && parse["Moral"] != undefined)
		spalte.innerHTML += "<h4>" + parse["Moral"] + "</h4>\n";

	if (GM_getValue("ZeigeNachtbonus_" + welt) == "Ja" && parse["Nachtbonus"] != undefined)
		spalte.innerHTML += "<h4>" + parse["Nachtbonus"] + "</h4>\n";

	zeile = document.createElement("tr");
	spalte = document.createElement("td");

	tabelle.appendChild(zeile);
	zeile.appendChild(spalte);

	spalte.appendChild(ErstelleAngreiferTabelle(parse, berichtsid));
	spalte.appendChild(ErstelleVerteidigerTabelle(parse, berichtsid));

	var spionage = ErstelleSpionageTabelle(parse, berichtsid);
	if (spionage != undefined)
		spalte.appendChild(spionage);
}

function ErstelleAngreiferTabelle(parse, berichtsid)
{
	var tabelle = document.createElement("table");
	tabelle.setAttribute("width", "100%");
	tabelle.setAttribute("style", "border: 1px solid #DED3B9");

	var zeile = document.createElement("tr");
	var spalte1 = document.createElement("th");
	spalte1.setAttribute("width", "100");
	var spalte2 = document.createElement("th");

	tabelle.appendChild(zeile);
	zeile.appendChild(spalte1);
	zeile.appendChild(spalte2);

	spalte1.innerHTML = "<b>Angreifer:</b>";
	spalte2.innerHTML = "<b>" + parse["Angreifer_Name"] + "</b>";

	var dorfzeile = document.createElement("tr");
	var dorfspalte1 = document.createElement("td");
	var dorfspalte2 = document.createElement("td");
	
	tabelle.appendChild(dorfzeile);
	dorfzeile.appendChild(dorfspalte1);
	dorfzeile.appendChild(dorfspalte2);

	dorfspalte1.innerHTML = "Dorf:"
	dorfspalte2.innerHTML = parse["Angreifer_Dorf"];

	var truppenzeile = document.createElement("tr");
	var truppenspalte = document.createElement("td");
	truppenspalte.setAttribute("colspan", "2");
	
	tabelle.appendChild(truppenzeile);
	truppenzeile.appendChild(truppenspalte);
	
	if (GM_getValue("ZeigeAngreiferEinheiten_" + welt) == "Ja" && parse["Angreifer_Truppen"] != undefined)
	{
		var truppentabelle = document.createElement("table");
		truppenspalte.appendChild(truppentabelle);

		var truppentabellezeile = document.createElement("tr");
		truppentabellezeile.setAttribute("class", "center");
		truppentabelle.appendChild(truppentabellezeile);
		truppentabellezeile.innerHTML = parse["Angreifer_Truppen"];

		var truppenanzahlzeile = document.createElement("tr");
		truppenanzahlzeile.setAttribute("class", "center");
		truppentabelle.appendChild(truppenanzahlzeile);
		truppenanzahlzeile.innerHTML = parse["Angreifer_Truppenanzahl"];

		if (GM_getValue("ZeigeAngreiferEinheitenVerluste_" + welt) == "Ja")
		{
			var truppenverlustzeile = document.createElement("tr");
			truppenverlustzeile.setAttribute("class", "center");
			truppentabelle.appendChild(truppenverlustzeile);
			truppenverlustzeile.innerHTML = parse["Angreifer_Truppenverluste"];
		}
	}
	return tabelle;
}
function ErstelleVerteidigerTabelle(parse, berichtsid)
{
	var tabelle = document.createElement("table");
	tabelle.setAttribute("width", "100%");
	tabelle.setAttribute("style", "border: 1px solid #DED3B9");

	var zeile = document.createElement("tr");
	var spalte1 = document.createElement("th");
	spalte1.setAttribute("width", "100");
	var spalte2 = document.createElement("th");

	tabelle.appendChild(zeile);
	zeile.appendChild(spalte1);
	zeile.appendChild(spalte2);

	spalte1.innerHTML = "<b>Verteidiger:</b>";
	spalte2.innerHTML = "<b>" + parse["Verteidiger_Name"] + "</b>";

	if (parse["Verteidiger_Dorf"] != undefined)
	{
		var dorfzeile = document.createElement("tr");
		var dorfspalte1 = document.createElement("td");
		var dorfspalte2 = document.createElement("td");
	
		tabelle.appendChild(dorfzeile);
		dorfzeile.appendChild(dorfspalte1);
		dorfzeile.appendChild(dorfspalte2);

		dorfspalte1.innerHTML = "Dorf:"
		dorfspalte2.innerHTML = parse["Verteidiger_Dorf"];
	}

	var truppenzeile = document.createElement("tr");
	var truppenspalte = document.createElement("td");
	truppenspalte.setAttribute("colspan", "2");
	
	tabelle.appendChild(truppenzeile);
	truppenzeile.appendChild(truppenspalte);
	
	if(GM_getValue("ZeigeVerteidigerEinheiten_" + welt) == "Ja" && parse["Verteidiger_Truppen"] != undefined)
	{
		var truppentabelle = document.createElement("table");
		truppenspalte.appendChild(truppentabelle);
	
		var truppentabellezeile = document.createElement("tr");
		truppentabellezeile.setAttribute("class", "center");
		truppentabelle.appendChild(truppentabellezeile);
		truppentabellezeile.innerHTML = parse["Verteidiger_Truppen"];

		var truppenanzahlzeile = document.createElement("tr");
		truppenanzahlzeile.setAttribute("class", "center");
		truppentabelle.appendChild(truppenanzahlzeile);
		truppenanzahlzeile.innerHTML = parse["Verteidiger_Truppenanzahl"];

		if(GM_getValue("ZeigeVerteidigerEinheitenVerluste_" + welt) == "Ja")
		{
			var truppenverlustzeile = document.createElement("tr");
			truppenverlustzeile.setAttribute("class", "center");
			truppentabelle.appendChild(truppenverlustzeile);
			truppenverlustzeile.innerHTML = parse["Verteidiger_Truppenverluste"];
		}
	}
	return tabelle;
}
function ErstelleSpionageTabelle(parse, berichtsid)
{
	var tabelle = document.createElement("table");
	tabelle.setAttribute("width", "100%");
	tabelle.setAttribute("style", "border: 1px solid #DED3B9");

	var zeile = document.createElement("tr");
	var spalte1 = document.createElement("th");
	spalte1.setAttribute("width", "100");

	tabelle.appendChild(zeile);
	zeile.appendChild(spalte1);

	spalte1.innerHTML = "<b>Spionage:</b>";

	var spionagezeile = document.createElement("tr");
	var spionagespalte = document.createElement("td");
	spionagespalte.setAttribute("colspan", "2");
	
	tabelle.appendChild(spionagezeile);
	spionagezeile.appendChild(spionagespalte);
	
	var spionagetabelle = document.createElement("table");
	spionagespalte.appendChild(spionagetabelle);

	if (GM_getValue("ZeigeEinheitenAusserhalb_" + welt) == "Ja" && parse["Unterwegs_Truppen"] != undefined)
	{
		var truppenzeile = document.createElement("tr");
		truppenzeile.setAttribute("class", "center");
		spionagetabelle.appendChild(truppenzeile);
		var truppenspalte = document.createElement("td");
		truppenzeile.appendChild(truppenspalte);

		var truppentabelle = document.createElement("table");
		truppenzeile.appendChild(truppentabelle);

		var truppentabellezeile = document.createElement("tr");
		truppentabelle.appendChild(truppentabellezeile);
		truppentabellezeile.innerHTML = parse["Unterwegs_Truppen"];

		var truppentabelleanzahlzeile = document.createElement("tr");
		truppentabelle.appendChild(truppentabelleanzahlzeile);
		truppentabelleanzahlzeile.innerHTML = parse["Unterwegs_Truppenanzahl"];
	}
	
	if (GM_getValue("ZeigeErspähteRohstoffe_" + welt) == "Ja" && parse["Erspäht_Rohstoffe"] != undefined)
	{
		var rohstoffzeile = document.createElement("tr");
		rohstoffzeile.setAttribute("class", "center");
		spionagetabelle.appendChild(rohstoffzeile);
		rohstoffzeile.innerHTML = parse["Erspäht_Rohstoffe"];
	}

	if (GM_getValue("ZeigeErspähteGebäude_" + welt) == "Ja"  && parse["Erspäht_Gebäude"] != undefined)
	{
		var gebaeudezeile = document.createElement("tr");
		gebaeudezeile.setAttribute("class", "center");
		spionagetabelle.appendChild(gebaeudezeile);
		gebaeudezeile.innerHTML = parse["Erspäht_Gebäude"];
	}
	
	
	if (GM_getValue("ZeigeBeute_" + welt) == "Ja"  && parse["Beute"] != undefined)
	{
		var beutezeile = document.createElement("tr");
		beutezeile.setAttribute("class", "center");
		spionagetabelle.appendChild(beutezeile);
		beutezeile.innerHTML = parse["Beute"];
	}

	if (GM_getValue("ZeigeSchadenRammböcke_" + welt) == "Ja" && parse["Rammböcke"] != undefined)
	{
		var rammboeckezeile = document.createElement("tr");
		rammboeckezeile.setAttribute("class", "center");
		spionagetabelle.appendChild(rammboeckezeile);
		rammboeckezeile.innerHTML = parse["Rammböcke"];
	}

	if (GM_getValue("ZeigeSchadenKatapulte_" + welt) == "Ja" && parse["Katapulte"] != undefined)
	{
		var katapultezeile = document.createElement("tr");
		katapultezeile.setAttribute("class", "center");
		spionagetabelle.appendChild(katapultezeile);
		katapultezeile.innerHTML = parse["Katapulte"];
	}

	if (GM_getValue("ZeigeZustimmunggesunken_" + welt) == "Ja"  && parse["ZustimmungGesunken"] != undefined)
	{
		var zustimmungszeile = document.createElement("tr");
		zustimmungszeile.setAttribute("class", "center");
		spionagetabelle.appendChild(zustimmungszeile);
		zustimmungszeile.innerHTML = parse["ZustimmungGesunken"];
	}
	return tabelle;
}

function ZeigeBericht(berichtsid)
{
	var div = document.getElementById(berichtsid);
	if (div == undefined)
		return;

	div.setAttribute("style", "position:absolute; top: " + ypos + "; right: " + xpos + "; visibility:visible");
}
function VersteckeBericht(berichtsid)
{
	var div = document.getElementById(berichtsid);
	if (div == undefined)
		return;

	div.setAttribute("style", "position:absolute; top: 0%; right: 0%; visibility:hidden");
}