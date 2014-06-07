// ==UserScript==
// @name           DS - Stammesübersicht
// @namespace      Die Stämme
// @description    Ermöglicht das gruppieren der Stammesübersicht nach Einladung, Beitritt, Ablehnung, Zurückgezogen, Entlassung, Verlassen, Änderung
// @autor          Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// ==/UserScript==


// Aktuell installierte Version:
var vers_ist = "DS - Stammesübersicht 0.9.4";


// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var welt = teil[0].replace("http://de", "");


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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=97572' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	tr[0].appendChild(th[0]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
}




//
var ereignis = new Array();
var aktion = new Array();
var datum = new Array();
var tag = new Array();
var zeit = new Array();
var spieler = new Array();
var mitglied = new Array();
var aktuell = new Array();
var tabelle = document.getElementsByClassName("main")[0];


if(GM_getValue("Einladung-" + welt) != undefined) {
	var einladung = GM_getValue("Einladung-" + welt).split(",");
	var einladung_anz = (einladung.length)-1;
}
else {
	var einladung = new Array("-");
	var einladung_anz = 0;
}

if(GM_getValue("Beitritt-" + welt) != undefined) {
	var beitritt = GM_getValue("Beitritt-" + welt).split(",");
	var beitritt_anz = (beitritt.length)-1;
}
else {
	var beitritt = new Array("-");
	var beitritt_anz = 0;
}

if(GM_getValue("Fremd-" + welt) != undefined) {
	var fremd = GM_getValue("Fremd-" + welt).split(",");
	var fremd_anz = (fremd.length)-1;
}
else {
	var fremd = new Array("-");
	var fremd_anz = 0;
}

if(GM_getValue("Ablehnung-" + welt) != undefined) {
	var ablehnung = GM_getValue("Ablehnung-" + welt).split(",");
	var ablehnung_anz = (ablehnung.length)-1;
}
else {
	var ablehnung = new Array("-");
	var ablehnung_anz = 0;
}

if(GM_getValue("Rueckzug-" + welt) != undefined) {
	var rueckzug = GM_getValue("Rueckzug-" + welt).split(",");
	var rueckzug_anz = (rueckzug.length)-1;
}
else {
	var rueckzug = new Array("-");
	var rueckzug_anz = 0;
}

if(GM_getValue("Entlassung-" + welt) != undefined) {
	var entlassung = GM_getValue("Entlassung-" + welt).split(",");
	var entlassung_anz = (entlassung.length)-1;
}
else {
	var entlassung = new Array("-");
	var entlassung_anz = 0;
}

if(GM_getValue("Verlassen-" + welt) != undefined) {
	var verlassen = GM_getValue("Verlassen-" + welt).split(",");
	var verlassen_anz = (verlassen.length)-1;
}
else {
	var verlassen = new Array("-");
	var verlassen_anz = 0;
}

if(GM_getValue("Aenderung-" + welt) != undefined) {
	var aenderung = GM_getValue("Aenderung-" + welt).split(",");
	var aenderung_anz = (aenderung.length)-1;
}
else {
	var aenderung = new Array("-");
	var aenderung_anz = 0;
}

var kopf = "";
var inhalt = "";
	

kopf = kopf + "<tr>";
kopf = kopf + "<td>";
kopf = kopf + "<a href='http://de" + welt + ".die-staemme.de/game.php?screen=ally&mode=overview&anzeige=Einladung'>Einladung:</a> <sup>" + einladung_anz + "</sup> | ";
kopf = kopf + "<a href='http://de" + welt + ".die-staemme.de/game.php?screen=ally&mode=overview&anzeige=Beitritt'>Beitritt:</a> <sup>" + beitritt_anz + "</sup> | ";
kopf = kopf + "<a href='http://de" + welt + ".die-staemme.de/game.php?screen=ally&mode=overview&anzeige=Ablehnung'>Ablehnung:</a><sup>" + ablehnung_anz + "</sup> | ";
kopf = kopf + "<a href='http://de" + welt + ".die-staemme.de/game.php?screen=ally&mode=overview&anzeige=Fremd'>Fremd:</a> <sup>" + fremd_anz + "</sup> | ";
kopf = kopf + "<a href='http://de" + welt + ".die-staemme.de/game.php?screen=ally&mode=overview&anzeige=Rueckzug'>Zurückgezogen:</a> <sup>" + rueckzug_anz + "</sup> | ";
kopf = kopf + "<a href='http://de" + welt + ".die-staemme.de/game.php?screen=ally&mode=overview&anzeige=Entlassung'>Entlassung:</a> <sup>" + entlassung_anz + "</sup> | ";
kopf = kopf + "<a href='http://de" + welt + ".die-staemme.de/game.php?screen=ally&mode=overview&anzeige=Verlassen'>Verlassen:</a> <sup>" + verlassen_anz + "</sup> | ";
kopf = kopf + "<a href='http://de" + welt + ".die-staemme.de/game.php?screen=ally&mode=overview&anzeige=Aenderung'>Änderung:</a> <sup>" + aenderung_anz + "</sup> | ";
kopf = kopf + "<a href='http://de" + welt + ".die-staemme.de/game.php?screen=ally&mode=overview&anzeige=Loeschen' style='color:#C00;'>Löschen</a>";
kopf = kopf + "</td>";
kopf = kopf + "</tr>";





// Die Stämme (Stamm - Übersicht):
if((url.match(/screen=ally&mode=overview/)) && (!url.match(/anzeige/))) {
	// Links einfügen
	tabelle.getElementsByClassName("vis")[1].innerHTML = tabelle.getElementsByClassName("vis")[1].innerHTML + kopf;

	for (i=1; i<=10; i++) {
		ereignis[i] = tabelle.getElementsByClassName("vis")[2].getElementsByTagName("tr")[i].innerHTML;
		
		if(!ereignis[i].match(/gelöscht/)) {
			// Datum auslesen:
			datum[i] = tabelle.getElementsByClassName("vis")[2].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.split("<br>");

			//Datum in Tag und Zeit zerlegen:
			tag[i] = datum[i][0].split(".");
			zeit[i] = datum[i][1].split(":");
			
			//Datum neu zusammensetzen:
			datum[i] = tag[i][1] + tag[i][0] + zeit[i][0] + zeit[i][1];
			
			// Spielername auslesen:
			spieler[i] = tabelle.getElementsByClassName("vis")[2].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;	

			// Komplette Zeile auslesen:
			aktuell[i] = "<td style='display:none;'>" + datum[i] + "</td>" + tabelle.getElementsByClassName("vis")[2].getElementsByTagName("tr")[i].innerHTML;
				

			// Einladung:
			if(ereignis[i].match(/eingeladen/)) {
				if(einladung.indexOf(aktuell[i]) == -1) {
					einladung.push(aktuell[i]);
				}
			}


			// Beitritt:
			if(ereignis[i].match(/dem Stamm beigetreten/)) {
				if(beitritt.indexOf(aktuell[i]) == -1) {
					beitritt.push(aktuell[i]);
				}
			}


			// Fremder Stamm:
			if(ereignis[i].match(/anderen/)) {
				if(fremd.indexOf(aktuell[i]) == -1) {
					fremd.push(aktuell[i]);
				}
			}


			// Ablehnung:
			if(ereignis[i].match(/abgelehnt/)) {
				if(ablehnung.indexOf(aktuell[i]) == -1) {
					ablehnung.push(aktuell[i]);
				}
			}


			// Rückzug:
			if(ereignis[i].match(/gezogen/)) {
				if(rueckzug.indexOf(aktuell[i]) == -1) {
					rueckzug.push(aktuell[i]);
				}
			}


			// Entlassung:
			if(ereignis[i].match(/entlassen/)) {
				if(entlassung.indexOf(aktuell[i]) == -1) {
					entlassung.push(aktuell[i]);
				}
			}


			// Verlassen:
			if(ereignis[i].match(/verlassen/)) {
				if(verlassen.indexOf(aktuell[i]) == -1) {
					verlassen.push(aktuell[i]);
				}
			}


			// Änderung (Rechte und Titel):
			if(ereignis[i].match(/Rechte und Titel/)) {
				if(aenderung.indexOf(aktuell[i]) == -1) {
					aenderung.push(aktuell[i]);
				}
			}
		}
	}

	// Arrays in Strings umwandeln:
	var akt_einladung = einladung.join(",");
	var akt_beitritt = beitritt.join(",");
	var akt_fremd = fremd.join(",");
	var akt_ablehnung = ablehnung.join(",");
	var akt_rueckzug = rueckzug.join(",");
	var akt_entlassung = entlassung.join(",");
	var akt_verlassen = verlassen.join(",");
	var akt_aenderung = aenderung.join(",");


	// Werte als GM-Value speichern:
	GM_setValue("Einladung-" + welt, akt_einladung);
	GM_setValue("Beitritt-" + welt, akt_beitritt);
	GM_setValue("Fremd-" + welt, akt_fremd);
	GM_setValue("Ablehnung-" + welt, akt_ablehnung);
	GM_setValue("Rueckzug-" + welt, akt_rueckzug);
	GM_setValue("Entlassung-" + welt, akt_entlassung);
	GM_setValue("Verlassen-" + welt, akt_verlassen);
	GM_setValue("Aenderung-" + welt, akt_aenderung);
}





if((url.match(/screen=ally&mode=overview/)) && (url.match(/anzeige/))) {

	// Links einfügen
	tabelle.getElementsByClassName("vis")[1].innerHTML = tabelle.getElementsByClassName("vis")[1].innerHTML + kopf;

	if(url.match(/Einladung/)) {
		var ereignis = GM_getValue("Einladung-" + welt).split(",");
	}
	if(url.match(/Beitritt/)) {
		var ereignis = GM_getValue("Beitritt-" + welt).split(",");
	}
	if(url.match(/Ablehnung/)) {
		var ereignis = GM_getValue("Ablehnung-" + welt).split(",");
	}
	if(url.match(/Fremd/)) {
		var ereignis = GM_getValue("Fremd-" + welt).split(",");
	}
	if(url.match(/Rueckzug/)) {
		var ereignis = GM_getValue("Rueckzug-" + welt).split(",");
	}
	if(url.match(/Entlassung/)) {
		var ereignis = GM_getValue("Entlassung-" + welt).split(",");
	}
	if(url.match(/Verlassen/)) {
		var ereignis = GM_getValue("Verlassen-" + welt).split(",");
	}
	if(url.match(/Aenderung/)) {
		var ereignis = GM_getValue("Aenderung-" + welt).split(",");
	}
	if(url.match(/Loeschen/)) {
		// GM-Value löschen:
		GM_deleteValue("Einladung-" + welt);
		GM_deleteValue("Beitritt-" + welt);
		GM_deleteValue("Fremd-" + welt);
		GM_deleteValue("Ablehnung-" + welt);
		GM_deleteValue("Rueckzug-" + welt);
		GM_deleteValue("Entlassung-" + welt);
		GM_deleteValue("Verlassen-" + welt);
		GM_deleteValue("Aenderung-" + welt);
	}
	
	// Array sortieren:
	// ereignis.sort();
	
	inhalt = inhalt + "<tr><th>Datum:</th><th>Ereignis</th></tr>";
	for(i=1; i<ereignis.length; i++) {
		inhalt = inhalt + "<tr>";
		inhalt = inhalt + ereignis[i].replace("<br>", "&nbsp;<small class='grey'>um</small>&nbsp;").replace("</td><td>", "&nbsp;<small class='grey'>Uhr</small></td><td>") + "\n";
		inhalt = inhalt + "</tr>";
	}
	
	tabelle.getElementsByClassName("vis")[2].innerHTML = inhalt;
}