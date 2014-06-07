// ==UserScript==
// @name           DS - Verlassene Dörfer
// @namespace      Die Stämme
// @description	   Version 0.9.0 | Fügt im Browsergame "Die Stämme" in der Karte ein Formular zum Suchen von verlassenen Dörfern (Barbarendörfer) hinzu und erleichtert das auffinden von neuen Farmen bzw. Adelszielen.
// @author         Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Verlassene Dörfer 0.9.0";


// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var welt = teil[0].replace("http://de", "");

// Dorf-ID:
var dorf = url.split("village=");
var dorf_id = dorf[0].split("&")[0];




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
	
	if(url.match(/einstellung=verlassen/)) {
		// Stammestag & ID als GM-Value speichern:
		GM_setValue("Stamm-" + welt, prompt("Dein Stammes-Tag:", GM_getValue("Stamm-" + welt)));
		GM_setValue("Stamm-ID-" + welt, prompt("Deine Stammes-ID:", GM_getValue("Stamm-ID-" + welt)));

		// Nickname & ID als GM-Value speichern:
		GM_setValue("Spieler-" + welt, prompt("Dein Nickname:", GM_getValue("Spieler-" + welt)));
		GM_setValue("Spieler-ID-" + welt, prompt("Deine Spieler-ID:", GM_getValue("Spieler-ID-" + welt)));

		// Min- / Max-Werte & Anzahl:
		GM_setValue("Min-" + welt, prompt("Min. Pkt.:", GM_getValue("Min-" + welt)));
		GM_setValue("Max-" + welt, prompt("Max. Pkt.: (nur TWplus)", GM_getValue("Max-" + welt)));
		GM_setValue("Anzahl-" + welt, prompt("Anzahl: (nur Shiva)", GM_getValue("Anzahl-" + welt)));
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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=101961' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Spieler-" + welt) == undefined) || 
		(GM_getValue("Spieler-ID-" + welt) == undefined) || 
		(GM_getValue("Stamm-" + welt) == undefined) || 
		(GM_getValue("Stamm-ID-" + welt) == undefined) || 
		(GM_getValue("Min-" + welt) == undefined) || 
		(GM_getValue("Max-" + welt) == undefined) || 
		(GM_getValue("Anzahl-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=verlassen'>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine bzw. nicht alle Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=verlassen''>Einstellungen ändern</a>";
		var spieler = GM_getValue("Spieler-" + welt);
		var spieler_id = GM_getValue("Spieler-ID-" + welt);
		var stamm_tag = GM_getValue("Stamm-" + welt);
		var stamm_id = GM_getValue("Stamm-ID-" + welt);
		var min_pkt = GM_getValue("Min-" + welt);
		var max_pkt = GM_getValue("Max-" + welt);
		var anzahl = GM_getValue("Anzahl-" + welt);
		td[1].innerHTML += "<b style='padding-right:7px;'>Stammes-Tag:</b>" + stamm_tag + "<br>";
		td[1].innerHTML += "<b style='padding-right:15px;'>Stammes-ID:</b>" + stamm_id + "<br>";
		td[1].innerHTML += "<b style='padding-right:16px;'>Spieler-Nick:</b>" + spieler + "<br>";
		td[1].innerHTML += "<b style='padding-right:29px;'>Spieler-ID:</b>" + spieler_id + "<br>";
		td[1].innerHTML += "<b style='padding-right:21px;'>Min. Punkte:</b>" + min_pkt + "<br>";
		td[1].innerHTML += "<b style='padding-right:17px;'>Max. Punkte:</b>" + max_pkt + "<br>";
		td[1].innerHTML += "<b style='padding-right:55px;'>Anzahl:</b>" + anzahl + " <span class='grey'>Dörfer</span><br>";
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && 
		(GM_getValue("Spieler-" + welt) == undefined) || 
		(GM_getValue("Spieler-ID-" + welt) == undefined) || 
		(GM_getValue("Stamm-" + welt) == undefined) || 
		(GM_getValue("Stamm-ID-" + welt) == undefined) || 
		(GM_getValue("Min-" + welt) == undefined) || 
		(GM_getValue("Max-" + welt) == undefined) || 
		(GM_getValue("Anzahl-" + welt) == undefined)) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Dörfersuche vorzunehmen oder Abbrechen um die Standardeinstellungen zu speichern.")) {
			document.location.href = "http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=verlassen";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Spieler-" + welt, "???");
			GM_setValue("Spieler-ID-" + welt, "0");
			GM_setValue("Stamm-" + welt, "???");
			GM_setValue("Stamm-ID-" + welt, "0");
			GM_setValue("Min-" + welt, 3000);
			GM_setValue("Max-" + welt, 12154);
			GM_setValue("Anzahl-" + welt, 20);
		}
	}
}










// Eigener Stamm (Profil):
if(url.match(/screen=ally&mode=profile/)) {
	// Eigenes Stammestag & ID ermitteln:
	var vis = document.getElementsByClassName("main")[0].getElementsByClassName("vis")[1];
	var stamm_tag = vis.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML;
	var stamm_id = vis.getElementsByTagName("tr")[9].getElementsByTagName("a")[0].href.split("&id=")[1];
	
	// Stammestag & ID als GM-Value speichern:
	GM_setValue("Stamm-" + welt, stamm_tag);
	GM_setValue("Stamm-ID-" + welt, stamm_id);
}



// Eigener Stamm (Mitglieder):
if(url.match(/screen=ally&mode=members/)) {
	// Eigenen Nickname & ID ermitteln:
	var spieler_name = document.getElementsByClassName("lit")[0].getElementsByTagName("a")[0].innerHTML;
	var spieler_id = document.getElementsByClassName("lit")[0].getElementsByTagName("a")[0].href.split("id=")[1];
	
	// Nickname & ID als GM-Value speichern:
	GM_setValue("Spieler-" + welt, spieler_name);
	GM_setValue("Spieler-ID-" + welt, spieler_id);
}



// Karte:
if(url.match(/screen=map/)) {
	// Voreistellungn:
	// Eigener Name:
	var name = GM_getValue("Spieler-" + welt);
	
	// Min. Punktzahl:
	var min_pkt = GM_getValue("Min-" + welt);
	
	// Max. Punktzahl:
	var max_pkt = GM_getValue("Max-" + welt);
	
	// Anzahl der angezeigten Dörfer (nur Shiva):
	var anzahl = GM_getValue("Anzahl-" + welt);
	
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
	
	// Koordinaten ermitteln:
	var pos_x = document.getElementById("inputx").value;
	var pos_y = document.getElementById("inputy").value;
	
	// Tabelle:
	var tabelle = "";
	tabelle += "<tr>";
	tabelle += "<td></td>";
	tabelle += "<th style='padding:2px;'>";
	tabelle += "<a href='http://forum.die-staemme.de/showthread.php?t=101961' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + vers_ist + "</a>";
	tabelle += "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=verlassen' title='Einstellungen | " + vers_ist + "'> ";
	tabelle += "<img src='http://www.die-staemme.de/graphic/buildings/garage.png' height='12px' />";
	tabelle += "</a>";
	tabelle += "</th>";
	tabelle += "</tr>";
	
	// Formular:
	var formular = new Array();
	var x = 0;
	
	// TWplus:
	x++;
	formular[x] = "";
	formular[x] += "<tr>";
	formular[x] += "<td rowspan='2'></td>";
	formular[x] += "<th style='padding:2px;'><a href='http://de" + welt + ".twplus.org' target='_blank' title='Zu TWplus wechseln'>TWplus</a>:</th>";
	formular[x] += "</tr>";
	formular[x] += "<tr>";
	formular[x] += "<td style='background:#f1ebdd;'>";
	formular[x] += "<form action='http://de" + welt + ".twplus.org/calculator/locator/' method='get' target='_blank'>";
	formular[x] += "<input type='submit' value='suchen' class='knopf' />&ensp;";
	formular[x] += "min. <input type='text' name='min' value='" + min_pkt + "' style='width:25px; text-align:right;' /> ";
	formular[x] += "max. <input type='text' name='max' value='" + max_pkt + "' style='width:25px; text-align:right;' /> ";
	formular[x] += "Pkt.&emsp;|&emsp;";
	formular[x] += "<b>X:</b> <input type='text' name='v_x' value='" + pos_x + "' style='width:20px; text-align:right;' /> ";
	formular[x] += "<b>Y:</b> <input type='text' name='v_y' value='" + pos_y + "' style='width:20px; text-align:right;' />";
	if(welt >= 20) {
		formular[x] += "<input type='checkbox' name='bonus' value='1' style='width:30px; text-align:right;' title='Nur Bonusdörfer' />";
	}
	formular[x] += "</form>";
	formular[x] += "</td>";
	formular[x] += "</tr>";
	
	
	// Shiva
	x++;
	formular[x] = "";
	formular[x] += "<tr>";
	formular[x] += "<td rowspan='2'></td>";
	formular[x] += "<th style='padding:2px;'><a href='http://looking.at/staemme/' target='_blank' title='Zu Shiva wechseln'>Shiva</a>:</th>";
	formular[x] += "</tr>";
	formular[x] += "<tr>";
	formular[x] += "<td style='background:#f1ebdd;'>";
	formular[x] += "<form action='http://looking.at/staemme/vacant.php' method='post' target='_blank'>";
	formular[x] += "<input type='submit' value='suchen' class='knopf' />&ensp;";
	formular[x] += "<input type='hidden' name='server' value='" + welt + "' />";
	formular[x] += "<input type='hidden' name='fromAlly' value='" + GM_getValue("Stamm-ID-" + welt) + "' />";
	formular[x] += "<input type='hidden' name='fromPlayerId' value='" + GM_getValue("Spieler-ID-" + welt) + "' />";
	formular[x] += "min. <input type='text' name='minpoints' value='" + min_pkt + "' style='width:25px; text-align:right;' /> ";
	formular[x] += "Pkt.&emsp;|&emsp;";
	formular[x] += "<input type='text' name='limit' value='" + anzahl + "' style='width:25px; text-align:right;' /> ";
	formular[x] += "Anzahl";
	formular[x] += "</form>";
	formular[x] += "</td>";
	formular[x] += "</tr>";
	
	// Formular in TAbelle einfügen:
	for(i=1; i<=x; i++) {
		tabelle += formular[i];
	}
	tabelle += "<tr><td>&nbsp;</td></tr>";
	
	// Tabelle unter der Karte einfügen:
	document.getElementsByClassName("map_container")[0].innerHTML += tabelle;
}