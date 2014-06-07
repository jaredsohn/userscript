// ==UserScript==
// @name           DS - Deff-Anfrage
// @namespace      Die Stämme
// @description    Version 1.0.8 | Deff-Anfragen im Browsergame "Die Stämme" für Mails und das interne Forum mit BB-Codes formatieren.
// @autor          Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Deff-Anfrage 1.0.8";


// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var welt = teil[0].replace("http://de", "");


// Dorf-ID:
var nummer = url.split("village=");
var numm = nummer[1].split("&");
var DorfID = numm[0];
	

// test_info (true|false):
// var test_info = true;
var test_info = false;
var test_text = vers_ist + " | Testinfo:\n\n";







// Einstellungen:
if(url.match(/screen=settings&mode=settings/)) {
	var vers = vers_ist.split(" ");
	var version = "";
	for(v=0; v<vers.length; v++) {
		if(v < vers.length-1) {
			version += vers[v] + " ";
		}
		else {
			version += "<span class='grey'>" + vers[v] + "</span>";
		}
	}
	// Einstellungen (Speicherstände):
	if(url.match(/einstellung=deffanfrage/)) {
		// Angriffsziel an/aus als GM-Value speichern:
		if(confirm("Angriffsziel:\n\nSoll das Angriffsziel angezeigt werden?")) {
			GM_setValue("Angriffsziel-" + welt, "an");		
		}
		else {
			GM_setValue("Angriffsziel-" + welt, "aus");		
		}
		// Vorhandene Einheiten an/aus als GM-Value speichern:
		if(confirm("Vorhandene Einheiten:\n\nSollen die vorhandenen Einheiten angezeigt werden?")) {
			GM_setValue("Vorhandene-" + welt, "an");		
		}
		else {
			GM_setValue("Vorhandene-" + welt, "aus");		
		}
		// Wallstufe an/aus als GM-Value speichern:
		if(confirm("Wallstufe:\n\nSoll die Stufe des Walls angezeigt werden?")) {
			GM_setValue("Wallstufe-" + welt, "an");		
		}
		else {
			GM_setValue("Wallstufe-" + welt, "aus");		
		}
		// Zustimmung an/aus als GM-Value speichern:
		if(confirm("Zustimmung:\n\nSoll die aktuelle Zustimmung des angegriffenen Dorfes angezeigt werden?")) {
			GM_setValue("Deff-Zustimm-" + welt, "an");		
		}
		else {
			GM_setValue("Deff-Zustimm-" + welt, "aus");		
		}
		// Verteidigungsstärke an/aus als GM-Value speichern:
		if(confirm("Verteidigungsstärke:\n\nSoll die Verteidigungsstärke angezeigt werden?")) {
			GM_setValue("Deff-Staerke-" + welt, "an");		
		}
		else {
			GM_setValue("Deff-Staerke-" + welt, "aus");		
		}
		// Verteidigungsfaktor an/aus als GM-Value speichern:
		if(confirm("Verteidigungsfaktor:\n\nSollen der Verteidigungsfaktor angezeigt werden?")) {
			GM_setValue("Deff-Faktor-" + welt, "an");		
		}
		else {
			GM_setValue("Deff-Faktor-" + welt, "aus");		
		}
		// Herkunft an/aus als GM-Value speichern:
		if(confirm("Herkunft:\n\nSoll die Herkunft des Angreifers angezeigt werden?")) {
			GM_setValue("Herkunft-" + welt, "an");		
		}
		else {
			GM_setValue("Herkunft-" + welt, "aus");		
		}
		// Mögliche Truppen an/aus als GM-Value speichern:
		if(confirm("Truppen:\n\nSollen die möglichen Truppen des Angreifers angezeigt werden?")) {
			GM_setValue("Truppen-" + welt, "an");		
		}
		else {
			GM_setValue("Truppen-" + welt, "aus");		
		}
	}
	var tr = new Array();
	tr[0] = document.createElement("tr");
	tr[1] = document.createElement("tr");
	var th = new Array();
	th[0] = document.createElement("th");
	th[1] = document.createElement("th");
	var td = new Array();
	td[0] = document.createElement("td");
	td[1] = document.createElement("td");
	
	th[0].setAttribute("colspan", "2");
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=97081' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Angriffsziel-" + welt) == undefined) || 
		(GM_getValue("Vorhandene-" + welt) == undefined) || 
		(GM_getValue("Wallstufe-" + welt) == undefined) || 
		(GM_getValue("Deff-Zustimm-" + welt) == undefined) || 
		(GM_getValue("Deff-Staerke-" + welt) == undefined) || 
		(GM_getValue("Deff-Faktor-" + welt) == undefined) || 
		(GM_getValue("Herkunft-" + welt) == undefined) || 
		(GM_getValue("Truppen-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + DorfID + "&screen=settings&mode=settings&einstellung=deffanfrage''>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine bzw. nicht alle Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + DorfID + "&screen=settings&mode=settings&einstellung=deffanfrage''>Einstellungen ändern</a>";
		var angriffsziel = GM_getValue("Angriffsziel-" + welt);
		var vorhandene = GM_getValue("Vorhandene-" + welt);
		var wallstufe = GM_getValue("Wallstufe-" + welt);
		var deff_zustimm = GM_getValue("Deff-Zustimm-" + welt);
		var deff_staerke = GM_getValue("Deff-Staerke-" + welt);
		var deff_faktor = GM_getValue("Deff-Faktor-" + welt);
		var herkunft = GM_getValue("Herkunft-" + welt);
		var truppen = GM_getValue("Truppen-" + welt);
		
		td[1].innerHTML += "<b style='padding-right:22px;'>Angriffsziel:</b>" + angriffsziel.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:18px;'>Vorhandene:</b>" + vorhandene.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:34px;'>Wallstufe:</b>" + wallstufe.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:17px;'>Zustimmung:</b>" + deff_zustimm.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:19px;'>Deff-Stärke:</b>" + deff_staerke.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:20px;'>Deff-Faktor:</b>" + deff_faktor.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:39px;'>Herkunft:</b>" + herkunft.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:43px;'>Truppen:</b>" + truppen.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>");
	}
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && 
		((GM_getValue("Angriffsziel-" + welt) == undefined) || 
		(GM_getValue("Vorhandene-" + welt) == undefined) || 
		(GM_getValue("Wallstufe-" + welt) == undefined) || 
		(GM_getValue("Deff-Zustimm-" + welt) == undefined) || 
		(GM_getValue("Deff-Staerke-" + welt) == undefined) || 
		(GM_getValue("Deff-Faktor-" + welt) == undefined) || 
		(GM_getValue("Herkunft-" + welt) == undefined) || 
		(GM_getValue("Truppen-" + welt) == undefined))) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für Deff-Anfragen vorzunehmen")) {
			document.location.href = "http://de" + welt + ".die-staemme.de/game.php?village=" + DorfID + "&screen=settings&mode=settings&einstellung=deffanfrage";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Angriffsziel-" + welt, "an");
			GM_setValue("Vorhandene-" + welt, "an");
			GM_setValue("Wallstufe-" + welt, "an");
			GM_setValue("Deff-Zustimm-" + welt, "an");
			GM_setValue("Deff-Staerke-" + welt, "an");
			GM_setValue("Deff-Faktor-" + welt, "an");
			GM_setValue("Herkunft-" + welt, "an");
			GM_setValue("Truppen-" + welt, "an");
		}
	}
}






// Dorfübersicht:
if(url.match(/screen=overview/)) {
	if(document.getElementsByClassName("main")[0].innerHTML.match(/zur graphischen Dorfübersicht/)) {
		var ansicht = "klassisch";
	}
	else {
		var ansicht = "graphisch";
	}
	
	var vis = document.getElementsByClassName("vis").length-2;
	
	var tabelle = document.getElementsByClassName("vis")[vis];
	
	var deff_truppen = tabelle.getElementsByTagName("tr").length-1;
	
	if(tabelle.getElementsByTagName("tr")[deff_truppen].innerHTML.match(/rekrutieren/)) {
		deff_truppen--;
	}
	// Testinfo erweitern:
	test_text += "Dorfübersicht (" + ansicht + "):\n\n";
	
	// GM-Value speichern:
	GM_setValue("Deff-Speerträger-" + DorfID, "0");
	GM_setValue("Deff-Schwertkämpfer-" + DorfID, "0");
	GM_setValue("Deff-Axtkämpfer-" + DorfID, "0");
	GM_setValue("Deff-Bogenschützen-" + DorfID, "0");
	GM_setValue("Deff-Späher-" + DorfID, "0");
	GM_setValue("Deff-Leichte Kavallerie-" + DorfID, "0");
	GM_setValue("Deff-Berittene Bogenschützen-" + DorfID, "0");
	GM_setValue("Deff-Schwere Kavallerie-" + DorfID, "0");
	GM_setValue("Deff-Paladin-" + DorfID, "0");
	GM_setValue("Deff-Adelsgeschlecht-" + DorfID, "0");

	// Deff-Einheiten:
	if(deff_truppen >= 1) {
		var einheit = new Array();
		var menge = new Array();

		for(i=1; i<=deff_truppen; i++) {
			var einh = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.split("</strong> ");
			einheit[i] = einh[1];
			menge[i]   = einh[0].split("<strong>")[1];
			
			// GM-Value speichern:
			GM_setValue("Deff-" + einheit[i] + "-" + DorfID, menge[i]);
		
			// Testinfo erweitern:
			test_text += menge[i] + " " + einheit[i] + "\n";
		}
	}

	var wall = 0;

	// Anzahl der Gebäude:
	if(ansicht == "graphisch") {
		var gebaeude_tag = document.getElementsByClassName("label").length;	
		var gebaeude_nacht = document.getElementsByClassName("label_night").length;	
		var gebaeude = (gebaeude_tag + gebaeude_nacht);
		
		// Stufe des Walls ermitteln:
		for(i=0; i<gebaeude; i++) {
			if(gebaeude_tag > gebaeude_nacht) {
				var test = document.getElementsByClassName("label")[i].innerHTML;
				if(test.match(/Wall/)) {
					wall = document.getElementsByClassName("label")[i].getElementsByTagName("a")[0].innerHTML.split("> ")[1];
				}
			}
			else {
				var test = document.getElementsByClassName("label_night")[i].innerHTML;
				if(test.match(/Wall/)) {
					wall = document.getElementsByClassName("label_night")[i].getElementsByTagName("a")[0].innerHTML.split("> ")[1];
				}
			}
		}
	}
	else {
		var geb_tab = document.getElementsByClassName("vis")[0];
		var gebaeude = geb_tab.getElementsByTagName("tr").length;
		
		// Stufe des Walls ermitteln:
		for(i=1; i<gebaeude; i++) {
			var geb_zelle = geb_tab.getElementsByTagName("tr")[i].getElementsByTagName("td")[0];
			var geb_link  = geb_zelle.getElementsByTagName("a")[0].innerHTML;
			if(geb_link.match(/Wall/)) {
				wall = geb_zelle.innerHTML.split("(Stufe ")[1].split(")")[0];
			}
		}
	}
	
	
	// Stufe des Walls als GM-Value speichern:
	GM_setValue("Deff-Wall-" + DorfID, wall);
	
	
	
	// Zustimmung:
	var vis = document.getElementsByClassName("vis").length;
	var zustimmung = 100;
	for(v=0; v<vis; v++) {
		var test = document.getElementsByClassName("vis")[v].getElementsByTagName("th")[0].innerHTML;
		if(test.match(/Zustimmung/)) {
			zustimmung = document.getElementsByClassName("vis")[v].getElementsByTagName("th")[1].innerHTML;
		}		
	}
	
	// Zustimmung als GM-Value speichern:
	GM_setValue("Zustimmung-" + welt, zustimmung);
	
	
	// Testinfo erweitern:
	test_text += "\n";
	test_text += "Wall: " + wall;
	test_text += "\n";
	test_text += "Zustimmung: " + zustimmung;
	
	// Testinfo ausgeben:
	if(test_info == true) {
		alert(test_text);
	}
}









// Hauptgebäude:
if(url.match(/screen=main/)) {
	var tabelle = document.getElementsByClassName("vis").length-1;
	var zeile   = document.getElementsByClassName("vis")[tabelle].getElementsByTagName("tr").length-1;
	var check   = document.getElementById("toggle_reqs");
	if(check != undefined) {
		zeile--;
	}
	
	// Wall:
	var wall = document.getElementsByClassName("vis")[tabelle].getElementsByTagName("tr")[zeile].getElementsByTagName("td")[0].getElementsByTagName("span")[0].innerHTML.split("(Stufe ")[1].split(")")[0];
	
	// Stufe des Walls als GM-Value speichern:
	GM_setValue("Deff-Wall-" + DorfID, wall);
	
	
	// Testinfo erweitern:
	test_text += "Hauptgebäude:\n\n";
	test_text += "Wall: " + wall;
	
	// Testinfo ausgeben:
	if(test_info == true) {
		alert(test_text);
	}
}










// Versammlungsplatz:
if(url.match(/screen=place&mode=units/)) {
	var tabellen = document.getElementsByClassName("main")[0].getElementsByClassName("vis").length;
	var einheit_name = new Array();
	var einheit_ist = new Array();
	var einheit_max = new Array();
	
	// Testinfo erweitern:
	test_text += "Versammlungsplatz:\n\n";
	
	for(i=1; i<tabellen; i++) {
		var tabelle = document.getElementsByClassName("main")[0].getElementsByClassName("vis")[i];
		var zeilen  = tabelle.getElementsByTagName("tr").length;

		if(i == 1) {
			zeilen = tabelle.getElementsByTagName("tr").length-1;
			var zellen = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th").length;
			
			for(n=1; n<zellen; n++) {
				einheit_name[n] = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[n].innerHTML.split(" title=\"");
				einheit_ist[n]  = tabelle.getElementsByTagName("tr")[zeilen].getElementsByTagName("th")[n].innerHTML;
				
				// Daten als GM-Cookie speichern:
				GM_setValue("Deff-" + einheit_name[n][1].replace("\" alt=\"\">", "") + "-" + DorfID, einheit_ist[n]);
				
				// Testinfo erweitern:
				test_text += einheit_ist[n] + "\n";
			}
		}	
	}	
	
	
	// Testinfo ausgeben:
	if(test_info == true) {
		alert(test_text);
	}
}










// Waffenkammer:
if((url.match(/screen=statue$/)) || (url.match(/screen=statue&mode=main/))) {
	var waffe = document.getElementsByClassName("main")[0].getElementsByTagName("h3")[0].innerHTML;
	
	// Waffe als GM-Value speichern:
	GM_setValue("Deff-Waffe-" + DorfID, waffe);
	
	
	// Testinfo erweitern:
	test_text += "Waffenkammer:\n\n";
	
	// Testinfo ausgeben:
	if(test_info == true) {
		alert(test_text);
	}
}










// Anzeige:
// Angriff:
if(url.match(/type=other/)) {
	var vis = document.getElementsByClassName("vis").length;	

	var befehl = "<table class='vis' style='margin:15px;'>" + document.getElementsByClassName("vis")[0].innerHTML + "</table>";
	if(vis > 1) {
		var truppen = "<table class='vis' style='margin-left:15px;'>" + document.getElementsByClassName("vis")[1].innerHTML + "</table>";
	}
	else {
		var truppen = "";
	}

	// Verteidiger:
	var Name_A = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[3].getElementsByTagName("td")[2].getElementsByTagName("a")[0].innerHTML;
	var Dorf_A = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[4].getElementsByTagName("td")[1].innerHTML.split(" (");
	var trennA = Dorf_A.length-1;
	var Posi_A = Dorf_A[trennA].split(") K");
	var KoordA = Posi_A[0].split("|");
	var PosX_A = KoordA[0];
	var PosY_A = KoordA[1];
	

	// Angreifer:
	var Name_B = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[2].getElementsByTagName("a")[0].innerHTML;
	var Dorf_B = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML.split(" (");	
	var trennB = Dorf_B.length-1;
	var Posi_B = Dorf_B[trennB].split(") K");
	var KoordB = Posi_B[0].split("|");
	var PosX_B = KoordB[0];
	var PosY_B = KoordB[1];

	// Ankunft:
	if(document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[5].getElementsByTagName("td")[0].innerHTML.match(/Ankunft:/)) {
		var zeile = 5;
	}
	else {
		var zeile = 6;
	}
	
	var ank = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[zeile].getElementsByTagName("td")[1].innerHTML.split(" ");
	var datum = ank[0].split(".");
	var zeit = ank[1].split(":");

	// Ankunft (Datum und Uhrzeit):
	var Ankunft = "[b]" + datum[0] + "." + datum[1] + "." + ((datum[2]*1)+2000) + "[/b] [color=#666666]um[/color] [b]" + zeit[0] + ":" + zeit[1] + "[/b][color=#999999]:" + zeit[2].replace("<span", "") + "[/color] Uhr";

	// Ankunft in Minuten:
	var ank_in = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[zeile+1].getElementsByTagName("td")[1].innerHTML.split(":");
	var dauer = (ank_in[0].replace("<span class=\"timer\">", "")*60) + (ank_in[1]*1) + 1;

	// Off- / Deff-Werte:
	var off_pkt = new Array(10, 25, 40, 15, 0, 130, 120, 150, 2, 100, 150, 30);
	var deff_all = new Array(15, 50, 10, 50, 2, 30, 40, 200, 20, 100, 250, 100);
	var deff_kav = new Array(45, 15, 5, 40, 1, 40, 30, 80, 50, 50, 400, 50);
	var deff_bog = new Array(20, 40, 10, 5, 2, 30, 50, 180, 20, 100, 150, 100);
	var deff_wall = new Array(100, 104, 108, 112, 116, 120, 124, 129, 134, 139, 144, 149, 155, 160, 166, 172, 179, 185, 192, 199, 207);

	var tabelle = "";
	var tab_kopf = "<table class='vis' style='margin:15px;'>";
	var anfrage = "";
	var tab_fuss = "";

	// Tabellen-Kopf:
	tab_kopf += "<tr>";
	tab_kopf += "<th style='width:320px;'>Formatierte Deff-Anfrage ";
	tab_kopf += "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + DorfID + "&screen=settings&mode=settings&einstellung=deffanfrage''>";
	tab_kopf += "<img src='graphic/buildings/garage.png' />";
	tab_kopf += "</a>";
	tab_kopf += "</th>";
	tab_kopf += "<td style='width:160px;'><a href='http://de" + welt + ".die-staemme.de/game.php?village=" + DorfID + "&screen=mail&mode=new&typ=deff'>&raquo; Mail schreiben</a></td>";
	tab_kopf += "</tr>";
	tab_kopf += "<tr><td colspan='2'><code>";
	
	// Angriffsziel:
	anfrage += "[b][u]Angriffsziel:[/u][/b]<br>";
	anfrage += "Name: [player]" + Name_A + "[/player]<br>";
	anfrage += "Dorf: [village]" + PosX_A + "|" + PosY_A + "[/village]<br>";


	// Vorhandene Einheiten:
	if(GM_getValue("Wallstufe-" + welt) == "an") {
		anfrage += "<br>[quote]\n";
		anfrage += "[b][u]Vorhandene Einheiten:[/u][/b]<br>";
	
		var deff_wert_a = 0;
		var deff_wert_k = 0;
		var deff_wert_b = 0;
	
		var einheiten = new Array("Speerträger", "Schwertkämpfer", "Axtkämpfer", "Bogenschützen", "Späher", "Leichte Kavallerie", "Berittene Bogenschützen", "Schwere Kavallerie", "Rammbock", "Katapult", "Paladin", "Adelsgeschlecht");
		var bilder = new Array("spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob");
		var waffen_name = new Array("Eidgenössische Hellebarde", "Ullrichs Langschwert", "Thorgards Kriegsaxt", "Edwards Langbogen", "Kalids Fernrohr", "Mieszkos Lanze", "Kompositbogen des Khan", "Baptistes Banner", "Carols Morgenstern", "Aletheias Leuchtfeuer", "", "Vascos Zepter");
		var waffen_plus = new Array("20", "20", "20", "20", "0", "20", "20", "20", "0", "1000", "20");
		var waffen_wert = new Array("120", "120", "120", "120", "100", "120", "120", "120", "100", "1100", "120");
		for(i=0; i<einheiten.length; i++) {
			if(GM_getValue("Deff-" + einheiten[i] + "-" + DorfID) >= 1) {
				if(GM_getValue("Deff-Waffe-" + DorfID) == waffen_name[i]) {
					var bonus = waffen_wert[i];
				}
				else {
					var bonus = 100;
				}
				
				if(GM_getValue("Deff-" + einheiten[i] + "-" + DorfID) >= 1000) {
					anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_" + bilder[i] + ".png[/img] [b]" + (GM_getValue("Deff-" + einheiten[i] + "-" + DorfID)/1000).toFixed(3) + "[/b] [color=#666666]" + einheiten[i] + "[/color]";
				}
				else {
					anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_" + bilder[i] + ".png[/img] [b]" + GM_getValue("Deff-" + einheiten[i] + "-" + DorfID) + "[/b] [color=#666666]" + einheiten[i] + "[/color]";
				}
	
	
				deff_wert_a += (((GM_getValue("Deff-" + einheiten[i] + "-" + DorfID) / 100) * bonus) * deff_all[i]);
				deff_wert_k += (((GM_getValue("Deff-" + einheiten[i] + "-" + DorfID) / 100) * bonus) * deff_kav[i]);
				deff_wert_b += (((GM_getValue("Deff-" + einheiten[i] + "-" + DorfID) / 100) * bonus) * deff_bog[i]);
	
				if((einheiten[i] == "Paladin") && (GM_getValue("Deff-Waffe-" + DorfID) != undefined)) {
					anfrage += " [color=#999999](" + GM_getValue("Deff-Waffe-" + DorfID) + ")[/color]";
				}
				if((GM_getValue("Deff-Paladin") > 0) && (GM_getValue("Deff-Waffe-" + DorfID) == waffen_name[i])) {
					anfrage += " [color=#999999](+ " + waffen_plus[i] + "%)[/color]";
				}
				anfrage += "<br>";
			}
		}
	}

	// Wall:
	if(GM_getValue("Wallstufe-" + welt) == "an") {
		anfrage += "<br>[b][u]Wall-Stufe:[/u][/b]<br>";
		if(GM_getValue("Deff-Wall-" + DorfID) != undefined) {
			var wall = (GM_getValue("Deff-Wall-" + DorfID)*1);
			anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/buildings/wall.png[/img] [b]" + wall + "[/b][color=#666666] / [/color][color=#999999]20[/color]<br>";	
		}
		else {
			var wall = 0;
			anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/buildings/wall.png[/img] [color=#666666]unbekannt[/color]<br>";
		}
	}
	
	// Zustimmung:
	if(GM_getValue("Deff-Zustimm-" + welt) == "an") {
		anfrage += "<br>[b][u]Zustimmung:[/u][/b]<br>";
		if(GM_getValue("Zustimmung-" + welt) != undefined) {
			anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/ally_rights/lead.png[/img] [b]" + GM_getValue("Zustimmung-" + welt) + "[/b]<br>";
		}
		else {
			anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/ally_rights/lead.png[/img] [b]100[/b]<br>";
		}
	}
	
	if(GM_getValue("Deff-Faktor-" + welt) == "an") {
		// Verteidigungsfaktor:
		anfrage += "<br>[b][u]Verteidigungsfaktor:[/u][/b]<br>";
		anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/command/support.png[/img] [b]" + deff_wall[wall] + "[/b][color=#666666]% Verteidigungsfaktor[/color]<br>";
	}
	
	

	// Nachtbonus
	if(welt <= 15) {
		var nacht = 6;
	}
	else {
		var nacht = 7;
	}
	var bonus_std = nacht + 1;
	
	if((welt >= 6) && (zeit[0] <= nacht)) {
		deff_wert_a = Math.round(((deff_wert_a / 100) * deff_wall[wall]));
		deff_wert_k = Math.round(((deff_wert_k / 100) * deff_wall[wall]));
		deff_wert_b = Math.round(((deff_wert_b / 100) * deff_wall[wall]));
		anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/rabe.png[/img][b]100[/b][color=#666666]% Nachtbonus[/color] [color=#999999](0:00 - " + bonus_std + ":00 Uhr)[/color]<br>";
	}
	else {
		deff_wert_a = Math.round(((deff_wert_a / 100) * deff_wall[wall]) / 2);
		deff_wert_k = Math.round(((deff_wert_k / 100) * deff_wall[wall]) / 2);
		deff_wert_b = Math.round(((deff_wert_b / 100) * deff_wall[wall]) / 2);
	}

	
	if(GM_getValue("Deff-Staerke-" + welt) == "an") {
		// Verteidigungsstärke:
		// Allgemein:
		anfrage += "<br>[b][u]Verteidigungsstärke:[/u][/b]<br>";
		if(deff_wert_a >= 1000) {
			anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/unit/def.png[/img] [b]" + (deff_wert_a/1000).toFixed(3) + "[/b] [color=#666666]Verteidigung allgemein[/color]" + "<br>";
		}
		else {
			anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/unit/def.png[/img] [b]" + deff_wert_a + "[/b] [color=#666666]Verteidigung allgemein[/color]" + "<br>";
		}
	
		// Kavallerie:
		if(deff_wert_k >= 1000) {
			anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/unit/def_cav.png[/img] [b]" + (deff_wert_k/1000).toFixed(3) + "[/b] [color=#666666]Verteidigung Kavallerie[/color]" + "<br>";
		}
		else {
			anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/unit/def_cav.png[/img] [b]" + deff_wert_k + "[/b] [color=#666666]Verteidigung Kavallerie[/color]" + "<br>";
		}
	
		// Bogenschützen:
		if(deff_wert_b >= 1000) {
			anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/unit/def_archer.png[/img] [b]" + (deff_wert_b/1000).toFixed(3) + "[/b] [color=#666666]Verteidigung Bogenschützen[/color]" + "<br>";	
		}
		else {
			anfrage += "[img]http://de" + welt + ".die-staemme.de/graphic/unit/def_archer.png[/img] [b]" + deff_wert_b + "[/b] [color=#666666]Verteidigung Bogenschützen[/color]" + "<br>";
		}
		anfrage += "[/quote]";
		anfrage += "<br>";
	}
	
	

	if(GM_getValue("Herkunft-" + welt) == "an") {
		// Herkunft:
		anfrage += "<br>";
		anfrage += "[b][u]Herkunft:[/u][/b]<br>";
		anfrage += "Name: [player]" + Name_B + "[/player]<br>";
		anfrage += "Dorf: [village]" + PosX_B + "|" + PosY_B + "[/village]<br>";
		anfrage += "Ank.: " + Ankunft + "<br>";
	}
	
	if(GM_getValue("Truppen-" + welt) == "an") {
		// Laufzeiten:
		var laufzeit = new Array(18, 22, 18, 18, 9, 10, 10, 11, 30, 30, 10, 35);
		
		// Entfernung:
		var entfernung = Math.sqrt(Math.pow((PosX_A - PosX_B), 2) + Math.pow((PosY_A - PosY_B), 2));
		
		// Tabellen-Fuss:
		// Mögliche Truppen:
		anfrage += "<br>[quote]\n";
		anfrage += "[b][u]Mögliche Truppen:[/u][/b]<br>";
	
		var off_truppen = "";
		for(e=0; e<einheiten.length+1; e++) {
			if(Math.round(entfernung*laufzeit[e]) <= dauer) {
				off_truppen += "[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_" + bilder[e] + ".png[/img] " + einheiten[e] + "<br>";
			}
		}
		if(off_truppen == "") {
			off_truppen = "[color=#666666]Berechnung der Truppen nicht möglich[/color]<br>[color=#999999](evtl. läuft der Angriff schon zu lange)[/color]";
		}
		anfrage += off_truppen;
		anfrage += "[/quote]";
	}
	tab_fuss += "</code></td></tr>";
	tab_fuss += "</table>";
	tabelle = tab_kopf + anfrage + tab_fuss;

	// Seiten-Inhalt aktualisieren:
	document.getElementsByClassName("main")[0].innerHTML = befehl + truppen + tabelle;

	// Werte als GM-Value speichern:
	GM_setValue("Deff-Anfrage" + "-" + DorfID, anfrage);
	
	
	// Testinfo ausgeben:
	if(test_info == true) {
		alert(test_text);
	}
}










// Mail schreiben:
if(url.match(/screen=mail&mode=new&typ=deff/)) {
	// Betreff:
	document.getElementsByTagName("input")[1].value = "Hilfe ich werde angegriffen";
	
	// Nachricht:
	document.getElementById("message").innerHTML = GM_getValue("Deff-Anfrage" + "-" + DorfID).replace(/\n\[/g, "[").replace(/\<br\>/g, "\n").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_spear.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_sword.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_axe.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_archer.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_spy.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_light.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_marcher.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_heavy.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_ram.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_catapult.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_knight.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_snob.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_spear.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_sword.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_axe.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_archer.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_spy.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_light.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_marcher.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_heavy.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_ram.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_catapult.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_knight.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/unit_snob.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/buildings/wall.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/command/support.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/def.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/def_cav.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/unit/def_archer.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/ally_rights/lead.png[/img]", "").replace("[img]http://de" + welt + ".die-staemme.de/graphic/rabe.png[/img]", "").replace("[size=12]+[/size]", "");
}