// ==UserScript==
// @name           DS - Zustimmung (PA)
// @namespace      Die Stämme
// @description    Version 0.9.7 | Zeigt im Browsergame "Die Stämme" in der Gebäudeübersicht die Zustimmungen der einzelnen Dörfer an
// @author         Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Zustimmung (PA) 0.9.7";



// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var land = url.substr(7, 2);
var welt = teil[0].replace("http://" + land, "");


// Dorf-ID:
var dorf_id = url.split("village=")[1].split("&")[0];


// Bild-Url:
var img_url = "http://www.die-staemme.de/graphic/ally_rights/lead.png";



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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=104322' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	tr[0].appendChild(th[0]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
}





// Zustimmung in der Dorfübersicht auslesen:
if((url.match(/screen=overview$/)) || (url.match(/screen=overview&$/))) {
	
	// Aktuelle Zeit ermitteln:
	var datum = new Date();
	var zeit = "" + datum.getTime()/1000;
	
	// Anzehl der Tabellen (vis) ermitteln:
	var vis = document.getElementsByClassName("vis").length-1;
	
	// Zustimmung standard:
	var zustimmung = 100;
	
	// Alle Tabellen (vis) durchlaufen:
	for(v=0; v<=vis; v++) {
		// Kopfzeile der aktuellen Tabelle auslesen:
		var test = document.getElementsByClassName("vis")[v].getElementsByTagName("th")[0].innerHTML;
		
		// Wird Zustimmung unter 100 angezeigt?
		if(test.match(/Zustimmung/)) {
			// Zustimmung auslesen:
			zustimmung = document.getElementsByClassName("vis")[v].getElementsByTagName("th")[1].innerHTML;
		}		
	}
	
	// Werte als GM-Value speichern:
	GM_setValue("Zustimmung-" + dorf_id, zustimmung);
	GM_setValue("Zeit-" + dorf_id, zeit);
}





// Stunden berechnen:
function func_std(id) {
	// Wurde Zeit gespeichert?
	// JA | Differenz berechnen:
	if(GM_getValue("Zeit-" + id) != undefined) {
		// Aktuelle Zeit ermitteln:
		var datum = new Date();
		// Sekunden:
		var neu = datum.getTime()/1000;
		// Speicherdatum auslesen:
		var alt = GM_getValue("Zeit-" + id);
		// Differenz in Std. berechnen:
		var diff = Math.round((neu*1-alt*1)/3600);
	}
	// Nein | Differenz = 0:
	else {
		var diff = 0;
	}
	
	// Differenz ausgeben:
	return diff;
}





// Maximalwert:
function func_max(id) {
	// Zustimmung wurde bereits gespeichert:
	if(GM_getValue("Zustimmung-" + id) != undefined) {
		// Zustimmung auslesen und um Differenz erhöhen:
		var zustimmung = parseInt(GM_getValue("Zustimmung-" + id)) + parseInt(diff);
		
		// Maximalwert auf 100 begrenzen:
		if(zustimmung >= 100) {
			zustimmung = 100;	
		}
		// Werte unter 100 rot anzeigen:
		if(zustimmung < 100) {
			zustimmung = "<b style='color:#C00;'>" + zustimmung + "</b>";	
		}
	}
	// Zustimmung wurde noch nicht gespeichert:
	else {
		zustimmung = "<span class='grey' style='cursor:help;' title='Noch keine Zustimmung gespeichert.'>???<span>";	
	}
	
	// Differenz ausgeben:
	return zustimmung;
}





// In Hauptgebäude einfügen:
if(url.match(/screen=main/)) {

	// Dorf-ID auslesen:
	var akt_id = document.getElementById("menu_row2").getElementsByTagName("a")[2].href.split("village=")[1].split("&")[0];
	
	// Stunden berechnen:
	var diff = func_std(akt_id);
	
	// Zustimmung berechnen:
	var zustimmung = func_max(akt_id);

	// Zustimmung für das aktuelle Dorf an das Ende der Überschrift anhängen:
	document.getElementsByTagName("h2")[0].innerHTML += "<br /><img src='" + img_url + "' title='Zustimmung'> <small>Zustimmung: " + zustimmung + "</small>";
}





// In Gebäudeübersicht einfügen (PA):
if(url.match(/mode=buildings/)) {
	// Tabelle der Gebäudeübersicht festlegen:
	var tabelle = document.getElementsByClassName("vis")[2];
	
	// Anzahl der Dörfer ermitteln:
	var zeilen = tabelle.getElementsByTagName("tr").length;
	
	// Zelle in Kopfzeile einfügen:
	tabelle.getElementsByTagName("tr")[0].innerHTML += "<th style='text-align:center;'><img src='" + img_url + "' title='Zustimmung'></th>";
	
	// Alle Dörfer durchlaufen:
	for(i=1; i<zeilen; i++) {
		// Dorf-ID auslesen:
		var akt_id = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0];
		
		// Stunden berechnen:
		var diff = func_std(akt_id);
		
		// Zustimmung berechnen:
		var zustimmung = func_max(akt_id);

		// Zustimmung für das aktuelle Dorf an das Ende der Zeile anhängen:
		tabelle.getElementsByTagName("tr")[i].innerHTML += "<td style='text-align:right;'>" + zustimmung + "</td>";
	}
}