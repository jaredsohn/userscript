// ==UserScript==
// @name           DS - Fehlende Rohstoffe
// @namespace      Die Stämme
// @description	   Version 0.9.5 | Fügt im Browsergame "Die Stämme" im Hauptgebäude für jedes Gebäude die fehlenden Rohstoffe an.
// @author         Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// @include        http://*.staemme.ch/*
// @include        http://*.tribalwars.nl/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Fehlende Rohstoffe 0.9.5";



// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var land = url.substr(7, 2);
var welt = teil[0].replace("http://" + land, "");


// Dorf-ID:
var dorf = url.split("village=");
var dorf_id = dorf[0].split("&")[0];
	
	
// Adressen:
var adresse = new Array();
adresse["de"] = ".die-staemme.";
adresse["ch"] = ".staemme.";
adresse["nl"] = ".tribalwars.";



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
	
	// Einstellungen (Entfernungen):
	if(url.match(/einstellung=fehlende/)) {
		// Anzeige an/aus als GM-Value speichern:
		if(confirm("Fehlende Rohstoffe:\n\nSollen die fehlenden Rohstoffe angezeigt werden?\nBei Klick auf Abbrechen wird eine Schaltfläche für die fehlenden Rohstoffe hinzugefügt.")) {
			GM_setValue("Fehlende-" + welt, "an");		
		}
		else {
			GM_setValue("Fehlende-" + welt, "aus");		
		}
	}
	
	var tr = new Array();
	tr[0] = document.createElement("tr");
	tr[1] = document.createElement("tr");
	var th = new Array();
	th[0] = document.createElement("th");
	var td = new Array();
	td[0] = document.createElement("td");
	td[1] = document.createElement("td");
	
	th[0].setAttribute("colspan", "2");
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=103840' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	
	td[0].setAttribute("style", "vertical-align:top;");	
	if((GM_getValue("Fehlende-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=fehlende''>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=fehlende''>Einstellungen ändern</a>";
		var fehlende = GM_getValue("Fehlende-" + welt);
		
		td[1].innerHTML += "<b style='padding-right:35px;'>Rohstoffe:</b>" + fehlende.replace("an", "<span style='color:#090'>an</span> <span class='grey'>(Die fehlenden Rohstoffe werden angezeigt)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Die fehlenden Rohstoffe werden erst nack klicken eines Knopfes angezeigt)</span>") + "<br>";
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && 
		(GM_getValue("Fehlende-" + welt) == undefined)) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Anzeige der fehlenden Rohstoffe vorzunehmen")) {
			document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=fehlende";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Fehlende-" + welt, "an");
		}
	}
}


// Hauptgebäude:
if(url.match(/screen=main/)) {
	var vis = document.getElementsByClassName("vis").length-1;
	var zeilen = document.getElementsByClassName("vis")[vis].getElementsByTagName("tr").length-2;
	
	// Vorhandene Rohstoffe:
	var ist_holz = parseFloat(document.getElementById("wood").innerHTML.split(" ")[0]);
	var ist_lehm = parseFloat(document.getElementById("stone").innerHTML.split(" ")[0]);
	var ist_eisen = parseFloat(document.getElementById("iron").innerHTML.split(" ")[0]);
	
	
	// Alle Gebäude durchlaufen:
	var x = 0;
	for(i=1; i<=zeilen; i++) {
		var zeile = document.getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i];
		var spalten = zeile.getElementsByTagName("td").length-1;
		var gebaeude = zeile.getElementsByTagName("td")[0].innerHTML;
		
		// Nur wenn das Gebäude noch nicht voll ausgebaut ist:
		if(spalten > 2) {
			if(zeile.getElementsByTagName("td")[6].innerHTML.match(/ um /)) {
				x++;
				var ausgabe = "Benötigte Rohstoffe: \\n \\n";
				// Rohstoffberechnung:
				// Holz:
				var soll_holz = zeile.getElementsByTagName("td")[1].innerHTML.split(">")[2];
				var rest_holz = soll_holz - ist_holz;
				if(rest_holz < 0) {
					rest_holz = "<span class='grey'>0</span>";
					ausgabe += "Holz: 0 \\n";
				}
				else {
					ausgabe += "Holz: " + rest_holz + " \\n";
				}
				// Lehm:
				var soll_lehm = zeile.getElementsByTagName("td")[2].innerHTML.split(">")[2];
				var rest_lehm = soll_lehm - ist_lehm;
				if(rest_lehm < 0) {
					rest_lehm = "<span class='grey'>0</span>";
					ausgabe += "Lehm: 0 \\n";
				}
				else {
					ausgabe += "Lehm: " + rest_lehm + " \\n";
				}
				// Eisen:
				var soll_eisen = zeile.getElementsByTagName("td")[3].innerHTML.split(">")[2];
				var rest_eisen = soll_eisen - ist_eisen;
				if(rest_eisen < 0) {
					rest_eisen = "<span class='grey'>0</span>";
					ausgabe += "Eisen: 0";
				}
				else {
					ausgabe += "Eisen: " + rest_eisen;
				}
				
				// fehlende Rohstoffe anfügen:
				if(GM_getValue("Fehlende-" + welt) == "aus") {
					zeile.innerHTML += "<td style='text-align:center; padding:0px;'><input type='image' style='padding:0px;' src='http://img56.imageshack.us/img56/8589/fehlend.png' value='???' style='cursor:help;' title='Benötigte Rohstoffe anzeigen' onclick='javascript:alert(\"" + ausgabe + "\");'</td>";
				}
				else {
					zeile.innerHTML += "<td style='text-align:right;'>" + rest_holz + "</td>";
					zeile.innerHTML += "<td style='text-align:right;'>" + rest_lehm + "</td>";
					zeile.innerHTML += "<td style='text-align:right;'>" + rest_eisen + "</td>";
				}
			}
		}
	}
	
	// Nur anzeigen wenn für mind. 1 Gebäude Rohstoffe fehlen:
	if(x >= 1) {
		// Zelle in Kopfzeile einfügen:
		if(GM_getValue("Fehlende-" + welt) == "aus") {
			document.getElementsByClassName("vis")[vis].getElementsByTagName("tr")[0].innerHTML += "<th style='width:30px;'>&nbsp;</th>";
		}
		else {
			document.getElementsByClassName("vis")[vis].getElementsByTagName("tr")[0].innerHTML += "<th><img src='http://" + land + welt + adresse[land] + land + "/graphic/holz.png'></th>";
			document.getElementsByClassName("vis")[vis].getElementsByTagName("tr")[0].innerHTML += "<th><img src='http://" + land + welt + adresse[land] + land + "/graphic/lehm.png'></th>";
			document.getElementsByClassName("vis")[vis].getElementsByTagName("tr")[0].innerHTML += "<th><img src='http://" + land + welt + adresse[land] + land + "/graphic/eisen.png'></th>";
		}
	}
}