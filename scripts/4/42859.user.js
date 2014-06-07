// ==UserScript==
// @name           DS - Diplomatische Karte
// @namespace      Die Stämme
// @description	   Version 1.0.3 | Fügt im Browsergame "Die Stämme" unter dem Punkt Diplomatie Links zu dsMapia, DsReal und TWmaps  hinzu, wodurch eine Karte mit allen BND, NAP und Feinden erstellt wird.
// @author         Roman S. (Zombie74)
// @include        http://de*.die-staemme.de/*
// @include        http://ch*.staemme.ch/*
// @include		   http://map.dsreal.de/*
// @include		   http://*.twmaps.org/*
// @exclude        http://forum.die-staemme.de/*
// @exclude        http://forum.staemme.ch/*
// @exclude        http://wiki.die-staemme.de/*
// @exclude        http://wiki.staemme.ch/*
// ==/UserScript==



/*******************************************************************************/
/*                                                                             */
/*  Dieses Script basiert auf dem UserScript "DS Mapia Weltkartenlink(Stamm)"  */
/*  und wurde ursprünglich von C1B1SE geschrieben "http://www.c1b1.de"         */
/*                                                                             */
/*******************************************************************************/

// Aktuell installierte Version:
var vers_ist = "DS - Diplomatische Karte 1.0.3";


// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var land = url.substr(7, 2);
var welt = teil[0].replace("http://" + land, "");

// Dorf-ID:
var dorf = url.split("village=");
var dorf_id = dorf[0].split("&")[0];

// Datum:
var datum    = new Date();
var akt_tag  = datum.getDate();
var akt_mon  = datum.getMonth()+1;
var akt_jahr = datum.getFullYear();
if(akt_tag < 10) {
	akt_tag = "0" + akt_tag;
}
if(akt_mon < 10) {
	akt_mon = "0" + akt_mon;
}

var heute = akt_tag + "." + akt_mon + "." + akt_jahr



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
	
	if(url.match(/einstellung=diplo/)) {
		// Stammestag & ID als GM-Value speichern:
		GM_setValue("Stamm-" + welt, prompt("Dein Stammes-Tag:", GM_getValue("Stamm-" + welt)));
		GM_setValue("Stamm-ID-" + welt, prompt("Deine Stammes-ID:", GM_getValue("Stamm-ID-" + welt)));

		// Nickname & ID als GM-Value speichern:
		GM_setValue("Spieler-" + welt, prompt("Dein Nickname:", GM_getValue("Spieler-" + welt)));
		GM_setValue("Spieler-ID-" + welt, prompt("Deine Spieler-ID:", GM_getValue("Spieler-ID-" + welt)));

		// Karteneinstellungen als GM-Value speichern:
		// Farbabstufungen:
		if(confirm("Farbabstufungen:\n\nSollen die Farben für die einzelnen Stämme abgestuft werden?\n\nBei Abbrechen werden nur 3 Farben verwendet:\nBND = Blau\nNAP = Violet\nFeind = Rot")) {
			GM_setValue("Farb-" + welt, "an");		
		}
		else {
			GM_setValue("Farb-" + welt, "aus");		
		}
		// Mittelpunkt:
		if(confirm("Kartenmittelpunkt:\n\nSoll der Mittelpunkt der Karte festgelegt werden?\n\nBei Klick auf Abbrechen werden die Koordinaten des aktuellen Dorfs als Mittelpunkt der Karten ausgewählt.")) {
			GM_setValue("Zent-" + welt, prompt("XXX|YYY:\n\nBitte die Koordinaten für den Kartenmittelpunkt angeben.", GM_getValue("Zent-" + welt)));
		}
		else {
			GM_setValue("Zent-" + welt, "aus");
		}
		// Zoom:
		GM_setValue("Zoom-" + welt, prompt("Zoom:\n\nIn welcher Zoomstufe (0-8) soll die Karte angezeigt werden?\n(DS Mapia | TW maps)", GM_getValue("Zoom-" + welt)));
		// Raster:
		if(confirm("Raster:\n\nSoll in der Karte das Raster angezeigt werden?\n(DS Mapia)")) {
			GM_setValue("Grid-" + welt, "an");		
		}
		else {
			GM_setValue("Grid-" + welt, "aus");		
		}
		// Verlassene Dörfer:
		if(confirm("Verlassene Dörfer:\n\nSollen in der Karte die verlassenen Dörfer angezeigt werden?\n(DS Mapia | TW maps)")) {
			GM_setValue("Verl-" + welt, "an");		
		}
		else {
			GM_setValue("Verl-" + welt, "aus");		
		}
		// Tags:
		if(confirm("Tags:\n\nSollen in der Karte die Tags angezeigt werden?\n(DS Mapia | TW maps)")) {
			GM_setValue("Tags-" + welt, "an");		
		}
		else {
			GM_setValue("Tags-" + welt, "aus");		
		}
		// Berge, Seen und Wälder anzeigen:
		if(confirm("Berge, Seen und Wälder anzeigen:\n\nSollen in der Karte Berge, Seen und Wälder angezeigt werden?\n(DS Real)")) {
			GM_setValue("Berg-" + welt, "an");		
		}
		// Stämme speziell hervorheben: (nur DS Mapia)
		if(confirm("Stämme speziell hervorheben:\n\nSollen die Stämme speziell hervorgehoben werden?\n(DS Mapia)")) {
			GM_setValue("Xtra-" + welt, "an");		
		}
		else {
			GM_setValue("Xtra-" + welt, "aus");		
		}
		// Nur Markkierte: (nur DS Mapia)
		if(confirm("Nur Markkierte:\n\nSollen nur die Dörfer der markierten Stämme angezeigt werden?\n(DS Mapia)")) {
			GM_setValue("Mark-" + welt, "an");		
		}
		else {
			GM_setValue("Mark-" + welt, "aus");		
		}
		
		// Aktuelle Karte in Forum anzeigen: (nur DS Mapia)
		if(GM_getValue("Forum-" + welt) != undefined) {
			GM_deleteValue("Forum-" + welt);		
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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=101784' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Spieler-" + welt) == undefined) || 
		(GM_getValue("Spieler-ID-" + welt) == undefined) || 
		(GM_getValue("Stamm-" + welt) == undefined) || 
		(GM_getValue("Stamm-ID-" + welt) == undefined) || 
		(GM_getValue("Farb-" + welt) == undefined) || 
		(GM_getValue("Zent-" + welt) == undefined) || 
		(GM_getValue("Zoom-" + welt) == undefined) || 
		(GM_getValue("Grid-" + welt) == undefined) || 
		(GM_getValue("Verl-" + welt) == undefined) || 
		(GM_getValue("Tags-" + welt) == undefined) || 
		(GM_getValue("Berg-" + welt) == undefined) || 
		(GM_getValue("Xtra-" + welt) == undefined) || 
		(GM_getValue("Mark-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=diplo'>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine bzw. nicht alle Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=diplo''>Einstellungen ändern</a>";
		var spieler = GM_getValue("Spieler-" + welt);
		var spieler_id = GM_getValue("Spieler-ID-" + welt);
		var stamm_tag = GM_getValue("Stamm-" + welt);
		var stamm_id = GM_getValue("Stamm-ID-" + welt);
		var ist_farb = GM_getValue("Farb-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span> <span class='grey'>(Farben der einzelnen Stämme werden abgestuft)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Farben der einzelnen Stämme werden nach Typen zusammengefasst: <b style='color:#00A0F4;'>BND</b> <b style='color:#800080;'>NAP</b> <b style='color:#F40000;'>Feind</b>)</span>");
		var ist_zent = GM_getValue("Zent-" + welt).replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Koordinaten des aktuellen Dorfes)</span>");
		var ist_zoom = GM_getValue("Zoom-" + welt);
		var ist_grid = GM_getValue("Grid-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00;'>aus</span>");
		var ist_verl = GM_getValue("Verl-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00;'>aus</span>");
		var ist_tags = GM_getValue("Tags-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00;'>aus</span>");
		var ist_berg = GM_getValue("Berg-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00;'>aus</span>");
		var ist_xtra = GM_getValue("Xtra-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>");
		var ist_mark = GM_getValue("Mark-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00;'>aus</span>");
		td[1].innerHTML += "<b style='padding-right:7px;'>Stammes-Tag:</b>" + stamm_tag + "<br />";
		td[1].innerHTML += "<b style='padding-right:15px;'>Stammes-ID:</b>" + stamm_id + "<br />";
		td[1].innerHTML += "<b style='padding-right:16px;'>Spieler-Nick:</b>" + spieler + "<br />";
		td[1].innerHTML += "<b style='padding-right:29px;'>Spieler-ID:</b>" + spieler_id + "<br />";
		
		td[1].innerHTML += "<b style='padding-right:52px;'>Farben:</b>" + ist_farb + "<br />";
		td[1].innerHTML += "<b style='padding-right:65px;'>Mitte:</b>" + ist_zent + "<br />";
		td[1].innerHTML += "<b style='padding-right:62px;'>Zoom:</b>" + ist_zoom + " <span class='grey' style='padding-left:15px;'>DS Mapia | TW maps<br />";
		td[1].innerHTML += "<b style='padding-right:55px;'>Raster:</b>" + ist_grid + " <span class='grey'>DS Mapia<br />";
		td[1].innerHTML += "<b style='padding-right:33px;'>Verlassen:</b>" + ist_verl + " <span class='grey'>DS Mapia | TW maps<br />";
		td[1].innerHTML += "<b style='padding-right:67px;'>Tags:</b>" + ist_tags + " <span class='grey'>DS Mapia | TW maps<br />";
		td[1].innerHTML += "<b style='padding-right:26px;'>Landschaft:</b>" + ist_berg + " <span class='grey'>DS Real</span><br />";
		td[1].innerHTML += "<b style='padding-right:12px;'>Stamm Spezi:</b>" + ist_xtra + " <span class='grey'>DS Mapia</span><br />";
		td[1].innerHTML += "<b style='padding-right:12px;'>Nur Makierte:</b>" + ist_mark + " <span class='grey'>DS Mapia</span><br />";
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
		(GM_getValue("Farb-" + welt) == undefined) || 
		(GM_getValue("Zent-" + welt) == undefined) || 
		(GM_getValue("Zoom-" + welt) == undefined) || 
		(GM_getValue("Grid-" + welt) == undefined) || 
		(GM_getValue("Verl-" + welt) == undefined) || 
		(GM_getValue("Tags-" + welt) == undefined) || 
		(GM_getValue("Berg-" + welt) == undefined) || 
		(GM_getValue("Xtra-" + welt) == undefined) || 
		(GM_getValue("Mark-" + welt) == undefined)) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Diplomatischen Karten vorzunehmen oder Abbrechen um die Standardeinstellungen zu speichern.")) {
			document.location.href = "http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=diplo";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Spieler-" + welt, "???");
			GM_setValue("Spieler-ID-" + welt, "0");
			GM_setValue("Stamm-" + welt, "???");
			GM_setValue("Stamm-ID-" + welt, "0");
			
			GM_setValue("Farb-" + welt, "an");
			GM_setValue("Zent-" + welt, "aus");
			GM_setValue("Zoom-" + welt, "0");
			GM_setValue("Grid-" + welt, "an");
			GM_setValue("Verl-" + welt, "an");
			GM_setValue("Tags-" + welt, "aus");
			GM_setValue("Berg-" + welt, "an");
			GM_setValue("Xtra-" + welt, "an");
			GM_setValue("Mark-" + welt, "an");
		}
	}
}





// Voreistellungn:
// Zoom 1 - 10:
var zoom = GM_getValue("Zoom-" + welt);
if(GM_getValue("Grid-" + welt) == "an") {
	var grid = true;
}
else {
	var grid = false;
}
// Varlassene Dörfer:
if(GM_getValue("Verl-" + welt) == "an") {		
	var verl = true;
}
else {
	var verl = false;
}
// Spieler- und Stammes-Tags:
if(GM_getValue("Tags-" + welt) == "an") {		
	var tags = true;
}
else {
	var tags = false;
}
// Berge, Seen und Wälder anzeigen:
if(GM_getValue("Berg-" + welt) == "an") {		
	var berg = true;
}
else {
	var berg = false;
}
// Stämme speziell hervorheben:
if(GM_getValue("Xtra-" + welt) == "an") {
	var xtra = true;
}
else {
	var xtra = false;
}
// Nur Markierte anzeigen:
if(GM_getValue("Mark-" + welt) == "an") {
	var mark = true;
}
else {
	var mark = false;
}
// Eigener Name
var name = GM_getValue("Spieler-" + welt);




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





if(url.match(/screen=info_ally/)) {
	// Stammestag & ID ermitteln:
	var vis = document.getElementsByClassName("main")[0].getElementsByClassName("vis")[0];
	var tag = vis.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML;
	// Name & ID als GM-Value speichern:
	GM_deleteValue(tag + "-" + welt);
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





if(url.match(/screen=ally&mode=contracts/)) {
	// Manuelle Eingabe:
	if(url.match(/einstellung=diplo/)) {
		// Stammestag & ID als GM-Value speichern:
		GM_setValue("Stamm-" + welt, prompt("Dein Stammes-Tag:", GM_getValue("Stamm-" + welt)));
		GM_setValue("Stamm-ID-" + welt, prompt("Deine Stammes-ID:", GM_getValue("Stamm-ID-" + welt)));

		// Nickname & ID als GM-Value speichern:
		GM_setValue("Spieler-" + welt, prompt("Dein Nickname:", GM_getValue("Spieler-" + welt)));
		GM_setValue("Spieler-ID-" + welt, prompt("Deine Spieler-ID:", GM_getValue("Spieler-ID-" + welt)));
	}
	
	
	// 
	var kartenblock = "";
	kartenblock += "<table class='vis extra' style='min-width:320px; margin-bottom:20px;'>";
	kartenblock += "<tr>";
	kartenblock += "<td colspan='4' style='background:none;'>&nbsp;</td>";
	kartenblock += "</tr>";
	kartenblock += "<tr>";
	kartenblock += "<th colspan='2'>";
	kartenblock += "Eigener Stamm / Nick ";
	kartenblock += "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=diplo' title='Einstellungen | " + vers_ist + "'>";
	kartenblock += "<img src='http://de" + welt + ".die-staemme.de/graphic/buildings/garage.png' style='height:12px;'>";
	kartenblock += "</a>";
	kartenblock += "</th>";
	kartenblock += "<th style='text-align:center; width:50px;'>ID</th>";
	kartenblock += "<th style='width:12px; text-align:center; -moz-border-radius-topright:10px;'>";
	kartenblock += "<a href='" + url.replace("&einstellung=diplo&", "&").replace("&", "&einstellung=diplo&") + "' title='Tag, IDs, Nick manuell eintragen.'>";
	kartenblock += "<img src='http://de" + welt + ".die-staemme.de/graphic/buildings/main.png'>";
	kartenblock += "</a>";
	kartenblock += "</th>";
	kartenblock += "</tr>";
	kartenblock += "</table>";
	
	var tabelle = document.getElementsByClassName("main")[0];
	
	tabelle.innerHTML += kartenblock;
	var table = document.getElementsByClassName("extra")[0];
	
	var vis = tabelle.getElementsByClassName("vis").length;
	
	var table_B = tabelle.getElementsByClassName("vis")[1];
	var table_N = tabelle.getElementsByClassName("vis")[2];
	var table_F = tabelle.getElementsByClassName("vis")[3];
	

	var anzahl_B = table_B.getElementsByTagName("tr").length-1;
	var anzahl_N = table_N.getElementsByTagName("tr").length-1;
	var anzahl_F = table_F.getElementsByTagName("tr").length-1;
	
	var tag_B = new Array();
	var tag_N = new Array();
	var tag_F = new Array();
	
	var id_B = new Array();
	var id_N = new Array();
	var id_F = new Array();
	
	var dec_B = new Array();
	var dec_N = new Array();
	var dec_F = new Array();
	
	var hex_B = new Array();
	var hex_N = new Array();
	var hex_F = new Array();
	
	var min_col_B = 0;
	var max_col_B = 255;
	var diff_col_B = (max_col_B - min_col_B)/anzahl_B;
	
	var min_col_N = 132;
	var max_col_N = 255;
	var diff_col_N = (max_col_N - min_col_N)/anzahl_N;
	
	var min_col_F = 0;
	var max_col_F = 255;
	var diff_col_F = (max_col_F - min_col_F)/anzahl_F;
	
	
	// Funktionen zum umwandeln in Hex-Werte:
	var HexChars="0123456789ABCDEF";
	function Hex(dec) {
		return HexChars.charAt((dec>>4)&0xf)+HexChars.charAt(dec&0xf)
	}
	
	
	// BND:
	if(anzahl_B >= 1) {
		table_B.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML += " (BND)";
		table_B.getElementsByTagName("tr")[0].innerHTML += "<th style='text-align:center; width:50px;'>ID</th>";
		table_B.getElementsByTagName("tr")[0].innerHTML += "<th style='text-align:center; -moz-border-radius-topright:10px;'><img src='http://de" + welt + ".die-staemme.de/graphic/unit/def.png'></th>";
		
		for(i=1; i<=anzahl_B; i++) {
			var zelle = table_B.getElementsByTagName("tr")[i].getElementsByTagName("td")[0];
			var x = i-1;
			if(GM_getValue("Farb-" + welt) == "an") {
				hex_B[x] = "00" + Hex(max_col_B - (diff_col_B*i)) + "FF";
				dec_B[x] = "00," + Math.round((max_col_B - (diff_col_B*i))) + ",255";
			}
			else {
				hex_B[x] = "00A0F4";
				dec_B[x] = "00,160,244";
			}
			
			tag_B[x] = zelle.getElementsByTagName("a")[0].innerHTML;
			id_B[x] = zelle.getElementsByTagName("a")[0].href.split("&id=")[1];
			table_B.getElementsByTagName("tr")[i].innerHTML += "<td style='text-align:right;'><small class='grey'>" + id_B[x] + "</small></td>";
			table_B.getElementsByTagName("tr")[i].innerHTML += "<td style='width:15px; background-color:#" + hex_B[x] + ";'>&nbsp;</td>";
			if(table_B.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a").length > 0) {
				table_B.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].setAttribute("style", "width:70px; text-align:center;");
			}
		}
	}
	else {
		// Kopfzeile ändern:
		table_B.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].setAttribute("style", "-moz-border-radius-topright:10px;");
	}
	
	
	// NAP:
	if(anzahl_N >= 1) {
		table_N.getElementsByTagName("tr")[0].innerHTML += "<th style='text-align:center; width:50px;'>ID</th>";
		table_N.getElementsByTagName("tr")[0].innerHTML += "<th style='text-align:center; -moz-border-radius-topright:10px;'><img src='http://de" + welt + ".die-staemme.de/graphic/ally_rights/diplomacy.png'></th>";
	
		for(i=1; i<=anzahl_N; i++) {
			var zelle = table_N.getElementsByTagName("tr")[i].getElementsByTagName("td")[0];
			var x = i-1;
			if(GM_getValue("Farb-" + welt) == "an") {
				hex_N[x] = Hex(min_col_N + (diff_col_N*x)) + "00" + Hex(min_col_N + (diff_col_N*x));
				dec_N[x] = Math.round((min_col_N + (diff_col_N*x))) + ",000," + Math.round((min_col_N + (diff_col_N*x)));
			}
			else {
				hex_N[x] = "800080";
				dec_N[x] = "128,00,128";
			}

			tag_N[x] = zelle.getElementsByTagName("a")[0].innerHTML;
			id_N[x] = zelle.getElementsByTagName("a")[0].href.split("&id=")[1];
			table_N.getElementsByTagName("tr")[i].innerHTML += "<td style='text-align:right;'><small class='grey'>" + id_N[x] + "</small></td>";
			table_N.getElementsByTagName("tr")[i].innerHTML += "<td style='width:15px; background-color:#" + hex_N[x] + ";'>&nbsp;</td>";
			if(table_N.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a").length > 0) {
				table_N.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].setAttribute("style", "width:70px; text-align:center;");
			}
		}
	}
	else {
		// Kopfzeile ändern:
		table_N.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].setAttribute("style", "-moz-border-radius-topright:10px;");
	}



	// Feinde:
	var feindesliste = ";";
	if(anzahl_F >= 1) {
		table_F.getElementsByTagName("tr")[0].innerHTML += "<th style='text-align:center; width:50px;'>ID</th>";
		table_F.getElementsByTagName("tr")[0].innerHTML += "<th style='text-align:center; -moz-border-radius-topright:10px;'><img src='http://de" + welt + ".die-staemme.de/graphic/unit/att.png'></th>";
	
		for(i=1; i<=anzahl_F; i++) {
			var zelle = table_F.getElementsByTagName("tr")[i].getElementsByTagName("td")[0];
			var x = i-1;
			if(GM_getValue("Farb-" + welt) == "an") {
				hex_F[x] = "FF" + Hex(min_col_F + (diff_col_F*x)) + "00";
				dec_F[x] = "255," + Math.round((min_col_F + (diff_col_F*x))) + ",00";
			}
			else {
				hex_F[x] = "F40000";
				dec_F[x] = "244,00,00";
			}
			
			tag_F[x] = zelle.getElementsByTagName("a")[0].innerHTML;
			id_F[x] = zelle.getElementsByTagName("a")[0].href.split("&id=")[1];
			table_F.getElementsByTagName("tr")[i].innerHTML += "<td style='text-align:right;'><small class='grey'>" + id_F[x] + "</small></td>";
			table_F.getElementsByTagName("tr")[i].innerHTML += "<td style='width:15px; background-color:#" + hex_F[x] + ";'>&nbsp;</td>";
			if(table_F.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a").length > 0) {
				table_F.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].setAttribute("style", "width:70px; text-align:center;");
			}
			
			feindesliste += ";" + tag_F[x];
		}
		feindesliste = feindesliste.replace(";;", "");
		GM_setValue("Feindesliste-W" + welt, feindesliste);
	}
	else {
		// Kopfzeile ändern:
		table_F.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].setAttribute("style", "-moz-border-radius-topright:10px;");
	}



	
	
	
	
	
	
	
	
	
	
	
	
	
	/************************************************************************/
	/* Stolen Code															*/
	/************************************************************************/
	
	var title = document.getElementById("menu_row2").getElementsByClassName("nowrap")[0].innerHTML.match(/(\d{1,3})\|(\d{1,3})/g)[0].split("|");
	
	if(GM_getValue("Zent-" + welt) != "aus") {
		var x = GM_getValue("Zent-" + welt).split("|")[0];
		var y = GM_getValue("Zent-" + welt).split("|")[1];
	}
	else {
		var x = title[0];
		var y = title[1];
	}
	
	var tr_stamm = document.createElement("tr");
	var td_stamm_link = document.createElement("td");
	var td_stamm_id = document.createElement("td");
	var td_stamm_color = document.createElement("td");
	td_stamm_link.setAttribute("colspan", "2");
	td_stamm_link.setAttribute("style", "text-align:left;");
	td_stamm_id.setAttribute("style", "text-align:right;");
	
	if((GM_getValue("Stamm-" + welt) != undefined) && (GM_getValue("Stamm-ID-" + welt) != undefined)) {
		// Eigener Stamm:
		var a_stamm = document.createElement("a");
		a_stamm.setAttribute("href", "http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=info_ally&id=" + GM_getValue("Stamm-ID-" + welt));
		a_stamm.innerHTML = GM_getValue("Stamm-" + welt);
		td_stamm_link.appendChild(a_stamm);
		td_stamm_link.innerHTML += " <small class='grey'>" + document.getElementsByTagName("h2")[0].innerHTML + "</small>";
		td_stamm_id.innerHTML += " <small class='grey'>" + GM_getValue("Stamm-ID-" + welt) + "</small>";
		if(GM_getValue("Farb-" + welt) == "an") {
			td_stamm_color.setAttribute("style", "width:15px; background-color:#000000; cursor:help;");
		}
		else {
			td_stamm_color.setAttribute("style", "width:15px; background-color:#0000F4; cursor:help;");
		}
		td_stamm_color.setAttribute("title", "Dein Stamm: " + document.getElementsByTagName("h2")[0].innerHTML + " - " + GM_getValue("Stamm-" + welt));
	}
	else {
		td_stamm_link.innerHTML += " <a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=ally&mode=profile'>Profil</a>";
		td_stamm_link.innerHTML += " <small class='grey'>Stammes-Tag & -ID unbekannt</small>";
		td_stamm_id.innerHTML += " <small class='grey'>????</small>";
		
		var blinker = document.createElement("blink");
		blinker.setAttribute("style", "font-weight:900; color:red; cursor:help;");
		blinker.setAttribute("title", "Damit das UserScipt richtig funktioniert muß das Profil des eigenen Stammes mind. 1 x aufgerufen werden ansonsten wird Dein eigener Stamm nicht angezeigt.");
		blinker.appendChild(document.createTextNode("!!!"));
		td_stamm_color.appendChild(blinker);
	}
	
	
	
	var tr_spieler = document.createElement("tr");
	var td_spieler_link = document.createElement("td");
	var td_spieler_id = document.createElement("td");
	var td_spieler_color = document.createElement("td");
	td_spieler_link.setAttribute("colspan", "2");
	td_spieler_link.setAttribute("style", "text-align:left;");
	td_spieler_id.setAttribute("style", "text-align:right;");
	
	if((GM_getValue("Spieler-" + welt) != undefined) && (GM_getValue("Spieler-ID-" + welt) != undefined)) {
		// Eigener Spielername:
		td_spieler_link.innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=info_player&id=" + GM_getValue("Spieler-ID-" + welt) + "'>" + name + "</a> <small class='grey'>dein Nickname</small>";
		td_spieler_id.innerHTML = "<small class='grey'>" + GM_getValue("Spieler-ID-" + welt) + "</small>";
		
		if(GM_getValue("Farb-" + welt) == "an") {
			td_spieler_color.setAttribute("style", "width:15px; background-color:#FFFFFF; cursor:help;");
		}
		else {
			td_spieler_color.setAttribute("style", "width:15px; background-color:#F0C800; cursor:help;");
		}
		td_spieler_color.setAttribute("title", "Dein Nickname: " + name);
	}
	else {
		var blinker = document.createElement("blink");
		blinker.setAttribute("style", "font-weight:900; color:red; cursor:help;");
		blinker.setAttribute("title", "Damit das UserScipt richtig funktioniert muß das Profil des eigenen Stammes mind. 1 x aufgerufen werden ansonsten wird Dein eigener Stamm nicht angezeigt.");
		blinker.appendChild(document.createTextNode("!!!"));
		td_spieler_color.appendChild(blinker);
		
		td_spieler_link.innerHTML += " <a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=ally&mode=members'>Mitglieder</a>";
		td_spieler_link.innerHTML += " <small class='grey'>Nickname unbekannt</small>";
		td_spieler_id.innerHTML += " <small class='grey'>????</small>";
	}
	
	
	


	tr_stamm.appendChild(td_stamm_link);
	tr_stamm.appendChild(td_stamm_id);
	tr_stamm.appendChild(td_stamm_color);
	table.appendChild(tr_stamm);
	
	tr_spieler.appendChild(td_spieler_link);
	tr_spieler.appendChild(td_spieler_id);
	tr_spieler.appendChild(td_spieler_color);
	table.appendChild(tr_spieler);
	
	var tr_trenn = document.createElement("tr");
	var td_trenn = document.createElement("td");
	td_trenn.setAttribute("colspan", "3");
	td_trenn.setAttribute("style", "background:none;");
	td_trenn.innerHTML = "&nbsp;";
	tr_trenn.appendChild(td_trenn);
	table.appendChild(tr_trenn);
	
	var tr_karten = document.createElement("tr");
	
	var a_einstell = document.createElement("a");
	a_einstell.setAttribute("href", "http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=diplo");
	a_einstell.setAttribute("title", "Einstellungen | " + vers_ist);
	a_einstell.innerHTML = "<img src='http://www.die-staemme.de/graphic/buildings/garage.png' style='height:12px; padding-left:5px;'>";	
	
	var th_karten = document.createElement("th");
	th_karten.setAttribute("colspan", "2");
	th_karten.setAttribute("style", "padding-left:10px; padding-right:10px;");
	th_karten.innerHTML = "Diplo-Karten erstellen";
	tr_karten.appendChild(th_karten);

	var th_welten = document.createElement("th");
	th_welten.setAttribute("style", "text-align:center; -moz-border-radius-topright:10px;");
	th_welten.innerHTML = "Welten";
	th_welten.setAttribute("title", "Für folgende Welten können Karten erstellt werden");
	th_karten.appendChild(a_einstell);
	tr_karten.appendChild(th_welten);

	table.appendChild(tr_karten);
	
	
	
	var tr = new Array();
	var td_link  = new Array();
	var td_welt  = new Array();
	var td_xtra  = new Array();
	var img      = new Array();
	var a        = new Array();
	var info     = new Array();
	var extra    = new Array();
	var funktion = new Array("", go_dsreal, go_dsmapia, go_twmaps);
	var bezeichn = new Array("", "DS Real", "DS Mapia", "TW maps");
	var titel    = new Array("", "DS Real (Graphische Weltkarte)", "DS Mapia", "TW maps");
	var welten   = new Array("", "6|10-53", "6-53", "1-53");
	var zusatz   = new Array("", "graphisch", "normal", "normal");
	
	for(i=1; i<=3; i++) {
		tr[i] = document.createElement("tr");
		td_link[i] = document.createElement("td");
		td_link[i].setAttribute("style", "width:140px; text-align:left;");
		
		img[i] = document.createElement("img");
		img[i].setAttribute("src", "http://de" + welt + ".die-staemme.de/graphic/map/map_e.png");
		img[i].setAttribute("style", "padding-right:5px;");
		
		a[i] = document.createElement("a");
		a[i].setAttribute("href", "#");
		a[i].setAttribute("title", titel[i]);
		a[i].addEventListener("click", funktion[i], false);
		a[i].appendChild(img[i]);
		a[i].appendChild(document.createTextNode(bezeichn[i]));
		
		td_link[i].appendChild(a[i]);
		tr[i].appendChild(td_link[i]);
		

		// 
		td_xtra[i] = document.createElement("td");
		td_xtra[i].setAttribute("style", "width:70px; text-align:left;");
	
		extra[i] = document.createElement("small");
		extra[i].setAttribute("class", "grey");
		extra[i].setAttribute("style", "padding:0px;");
		extra[i].appendChild(document.createTextNode(zusatz[i]));
		
		td_xtra[i].appendChild(extra[i]);
		tr[i].appendChild(td_xtra[i]);
		

		// 
		td_welt[i] = document.createElement("td");
		//td_welt[i].setAttribute("colspan", "2");
		td_welt[i].setAttribute("style", "text-align:right;");
	
		info[i] = document.createElement("small");
		info[i].setAttribute("class", "grey");
		info[i].setAttribute("style", "padding:0px;");
		info[i].appendChild(document.createTextNode(welten[i]));
		
		td_welt[i].appendChild(info[i]);
		tr[i].appendChild(td_welt[i]);
		
		
		// 
		table.appendChild(tr[i]);
	}
	
	var tr_trenn = document.createElement("tr");
	var td_trenn = document.createElement("td");
	td_trenn.setAttribute("colspan", "3");
	td_trenn.setAttribute("style", "background:none;");
	td_trenn.innerHTML = "&nbsp;";
	tr_trenn.appendChild(td_trenn);
	table.appendChild(tr_trenn);
	
	
	var tr_list = document.createElement("tr");
	var th_list = document.createElement("th");
	th_list.setAttribute("colspan", "2");
	th_list.innerHTML = "Gespeicherte <a href='http://map.dsreal.de/index.php' target='_blank'>DS Mapia</a>-Karten";
	
	var th_aktion = document.createElement("th");
	th_aktion.innerHTML = "Aktion";
	
	tr_list.appendChild(th_list);
	tr_list.appendChild(th_aktion);
	table.appendChild(tr_list);
	

	var tr_liste  = new Array();
	var td_liste  = new Array();
	var td_anzahl = new Array();
	var td_delete = new Array();
	for(var j=2010; j<=akt_jahr; j++) {
		for(var m=1; m<=12; m++) {
			if(m<10) {
				var mon = "0" + m;
			}
			else {
				var mon = m;
			}
			if(GM_getValue("Karten-" + mon + "-" + j + "-W" + welt) != undefined) {
				var karten = GM_getValue("Karten-" + mon + "-" + j + "-W" + welt).split(";");
				tr_liste[j] = document.createElement("tr");
				td_liste[j] = document.createElement("td");
				td_liste[j].innerHTML = "<b>" + mon + "-" + j + "</b>";
				
				td_anzahl[j] = document.createElement("td");
				td_anzahl[j].setAttribute("style", "text-align:right; cursor:help;");
				td_anzahl[j].setAttribute("title", "Diese Liste enthält " + karten.length + " Karten");
				td_anzahl[j].innerHTML += "<b>" + karten.length + "</b> <small class='grey'>Karten</small>";
				
				td_delete[j] = document.createElement("td");
				td_delete[j].setAttribute("style", "text-align:center;");
				
				// Aktuelle Liste:
				if((akt_jahr == j) && (akt_mon == mon)) {
					td_delete[j].setAttribute("title", "Diese Liste wird aktuell verwendet und kann daher noch nicht gelöscht werden");
					td_delete[j].innerHTML = "<small class='grey'>-</small>";
				}
				// Alte Liste:
				else {
					td_delete[j].setAttribute("title", "Die Liste für " + karten.length + " löschen");
					td_delete[j].innerHTML = "<small><a href='" + url + "&extra=delete&mon=" + mon + "&jahr=" + j + "' style='color:#C00;'>löschen</a></small>";
				}
				
				tr_liste[j].appendChild(td_liste[j]);
				tr_liste[j].appendChild(td_anzahl[j]);
				tr_liste[j].appendChild(td_delete[j]);
				table.appendChild(tr_liste[j]);
			}
		}
	}
	// Listen löschen:
	if(url.match(/extra=delete/)) {
		var gets = url.split("?");
		var vars = gets[1].split("&");
		var del_mon  = vars[vars.length-2].split("=")[1];
		var del_jahr = vars[vars.length-1].split("=")[1];		
		if(confirm("Löschen:\n\nSoll die Kartenliste \"" + del_mon + "-" + del_jahr + "\" wirlich gelöscht werden?\n\nNach dem löschen kann der entsprechende Foreneintrag nicht mehr aktualisiert werden.")) {
			GM_deleteValue("Karten-" + del_mon + "-" + del_jahr + "-W" + welt);
		}
	}
}





// DS-Real:
function go_dsreal() {
	var form = document.createElement("form");
	form.setAttribute("action", "http://www.dsreal.de/index.php");
	form.setAttribute("method", "get");
	form.setAttribute("target", "_blank");
	form.setAttribute("id", "dsreal");
	
	
	// Tool:
	var ds_tool = document.createElement("input");
	ds_tool.setAttribute("type", "hidden");
	ds_tool.setAttribute("name", "tool");
	ds_tool.setAttribute("value", "weltkarte");
	form.appendChild(ds_tool);
	
	
	// Welt:
	var ds_world = document.createElement("input");
	ds_world.setAttribute("type", "hidden");
	ds_world.setAttribute("name", "world");
	ds_world.setAttribute("value", land + welt);
	form.appendChild(ds_world);
	
	
	// Mode:
	var ds_mode = document.createElement("input");
	ds_mode.setAttribute("type", "hidden");
	ds_mode.setAttribute("name", "mode");
	ds_mode.setAttribute("value", "shows");
	form.appendChild(ds_mode);
	
	
	// Koordinaten:
	// Zentrum X:
	var dsreal_x = document.createElement("input");
	dsreal_x.setAttribute("type", "hidden");
	dsreal_x.setAttribute("name", "dsreal_x");
	dsreal_x.setAttribute("value", x);
	form.appendChild(dsreal_x);
	
	// Zentrum Y:
	var dsreal_y = document.createElement("input");
	dsreal_y.setAttribute("type", "hidden");
	dsreal_y.setAttribute("name", "dsreal_y");
	dsreal_y.setAttribute("value", y);
	form.appendChild(dsreal_y);
	
	
	// Verlassene Dörfer:
	var dsreal_verlassen = document.createElement("input");
	dsreal_verlassen.setAttribute("type", "hidden");
	dsreal_verlassen.setAttribute("name", "dsreal_frei");
	dsreal_verlassen.setAttribute("value", verl?"Ja":"Nein");
	form.appendChild(dsreal_verlassen);
	
	
	// Eigener Stamm:
	var a1text = document.createElement("input");
	a1text.setAttribute("type", "hidden");
	a1text.setAttribute("name", "a1text");
	a1text.setAttribute("value", GM_getValue("Stamm-" + welt));
	form.appendChild(a1text);
	
	var a1color = document.createElement("input");
	a1color.setAttribute("type", "hidden");
	a1color.setAttribute("id", "a1color");
	a1color.setAttribute("name", "a1color");
	if(GM_getValue("Farb-" + welt) == "an") {
		a1color.setAttribute("value", "000,000,000");
	}
	else {
		a1color.setAttribute("value", "000,000,024");
	}
	form.appendChild(a1color);


	// BND:
	var nr = 1;
	if(anzahl_B >= 1) {
		var b_text = new Array();
		var b_color = new Array();
		for(i=1; i<=anzahl_B; i++) {
			nr++;
			b_text[i] = document.createElement("input");
			b_text[i].setAttribute("type", "hidden");
			b_text[i].setAttribute("name", "a" + nr + "text");
			b_text[i].setAttribute("value", tag_B[i-1]);
			form.appendChild(b_text[i]);
			
			b_color[i] = document.createElement("input");
			b_color[i].setAttribute("type", "hidden");
			b_color[i].setAttribute("name", "a" + nr + "color");
			b_color[i].setAttribute("value", dec_B[i-1]);
			form.appendChild(b_color[i]);
		}
	}
			
			
	// NAP:
	if(anzahl_N >= 1) {
		var n_text = new Array();
		var n_color = new Array();
		for(i=1; i<=anzahl_N; i++) {
			nr++;
			n_text[i] = document.createElement("input");
			n_text[i].setAttribute("type", "hidden");
			n_text[i].setAttribute("name", "a" + nr + "text");
			n_text[i].setAttribute("value",tag_N[i-1]);
			form.appendChild(n_text[i]);
			
			n_color[i] = document.createElement("input");
			n_color[i].setAttribute("type", "hidden");
			n_color[i].setAttribute("id", "a" + nr + "color");
			n_color[i].setAttribute("name", "a" + nr + "color");
			n_color[i].setAttribute("value", dec_N[i-1]);
			form.appendChild(n_color[i]);
		}
	}
	
	
	// Feinde:
	if(anzahl_F >= 1) {
		var f_text = new Array();
		var f_color = new Array();
		for(i=1; i<=anzahl_F; i++) {
			nr++;
			f_text[i] = document.createElement("input");
			f_text[i].setAttribute("type", "hidden");
			f_text[i].setAttribute("name", "a" + nr + "text");
			f_text[i].setAttribute("value", tag_F[i-1]);
			form.appendChild(f_text[i]);
			
			f_color[i] = document.createElement("input");
			f_color[i].setAttribute("type", "hidden");
			f_color[i].setAttribute("id", "a" + nr + "color");
			f_color[i].setAttribute("name", "a" + nr + "color");
			f_color[i].setAttribute("value", dec_F[i-1]);
			form.appendChild(f_color[i]);
		}
	}
	
	
	// Spieler:
	var p1text = document.createElement("input");
	p1text.setAttribute("type", "hidden");
	p1text.setAttribute("name", "p1text");
	p1text.setAttribute("value", name);
	form.appendChild(p1text);
	
	var p1color = document.createElement("input");
	p1color.setAttribute("type", "hidden");
	p1color.setAttribute("name", "p1color");
	if(GM_getValue("Farb-" + welt) == "an") {
		p1color.setAttribute("value", "255,255,255");
	}
	else {
		p1color.setAttribute("value", "240,200,000");
	}
	form.appendChild(p1color);
	
	
	// Erstellen:
	var ds_map = document.createElement("input");
	ds_map.setAttribute("type", "hidden");
	ds_map.setAttribute("name", "ds_map");
	ds_map.setAttribute("value", "Anzeigen");
	form.appendChild(ds_map);
	
	
	document.getElementById("ds_body").appendChild(form);
	document.getElementById("dsreal").submit(); 
}




// DS-Mapia
function go_dsmapia() {
	
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://map.dsreal.de/index.php?screen=map&world=" + land + welt,
		headers:{
			"User-Agent":"Mozilla/5.0",
			"Accept":"text/xml"
		},
		onload:function(response) {
			
			var form = document.createElement("form");
			form.setAttribute("action", response.finalUrl);
			
			form.setAttribute("method", "post");
			form.setAttribute("target", "_blank");
			form.setAttribute("id", "dsmapia");
			
			
			// Zoomstufe:
			var ds_zoom = document.createElement("input");
			ds_zoom.setAttribute("type", "hidden");
			ds_zoom.setAttribute("name", "map[zoom]");
			ds_zoom.setAttribute("value", zoom);
			form.appendChild(ds_zoom);
			
			
			// Koordinaten:
			// Zentrum X:
			var dsmapia_x = document.createElement("input");
			dsmapia_x.setAttribute("type", "hidden");
			dsmapia_x.setAttribute("name", "map[x]");
			dsmapia_x.setAttribute("value", x);
			form.appendChild(dsmapia_x);
			
			
			// Zentrum Y:
			var dsmapia_y = document.createElement("input");
			dsmapia_y.setAttribute("type", "hidden");
			dsmapia_y.setAttribute("name", "map[y]");
			dsmapia_y.setAttribute("value", y);
			form.appendChild(dsmapia_y);
			
			
			// Verlassene Dörfer anzeigen:
			var dsmapia_verlassen = document.createElement("input");
			dsmapia_verlassen.setAttribute("type", "hidden");
			dsmapia_verlassen.setAttribute("name", "map[noPlayer]");
			dsmapia_verlassen.setAttribute("value", verl?1:0);
			form.appendChild(dsmapia_verlassen);
			
			
			// Gitternetz anzeigen:
			var dsmapia_continent_lines = document.createElement("input");
			dsmapia_continent_lines.setAttribute("type", "hidden");
			dsmapia_continent_lines.setAttribute("name", "map[lines]");
			dsmapia_continent_lines.setAttribute("value", grid?1:0);
			form.appendChild(dsmapia_continent_lines);
			
			

			// Tag anzeigen:
			var dsmapia_stammestags = document.createElement("input");
			dsmapia_stammestags.setAttribute("type", "hidden");
			dsmapia_stammestags.setAttribute("name", "map[description]");
			dsmapia_stammestags.setAttribute("value", tags?1:0);
			form.appendChild(dsmapia_stammestags);
			
			
			// Stämme speziell markieren:
			var dsmapia_showOnly = document.createElement("input");
			dsmapia_showOnly.setAttribute("type", "hidden");
			dsmapia_showOnly.setAttribute("name", "map[showCircle]");
			dsmapia_showOnly.setAttribute("value", xtra?1:0);
			form.appendChild(dsmapia_showOnly);
			
			
			// Nur Markierungen anzeigen:
			var dsmapia_showOnly = document.createElement("input");
			dsmapia_showOnly.setAttribute("type", "hidden");
			dsmapia_showOnly.setAttribute("name", "map[showOnly]");
			dsmapia_showOnly.setAttribute("value", mark?1:0);
			form.appendChild(dsmapia_showOnly);
			
			
			// Eigener Stamm:
			var s_text = document.createElement("input");
			s_text.setAttribute("type", "hidden");
			s_text.setAttribute("id", "ally[]");
			s_text.setAttribute("name", "ally[]");
			s_text.setAttribute("value", GM_getValue("Stamm-" + welt));
			form.appendChild(s_text);
			
			var s_color = document.createElement("input");
			s_color.setAttribute("type", "hidden");
			s_color.setAttribute("id", "allyC[]");
			s_color.setAttribute("name", "allyC[]");
			if(GM_getValue("Farb-" + welt) == "an") {
				s_color.setAttribute("value", "000,000,000");
			}
			else {
				s_color.setAttribute("value", "000,000,244");
			}
			form.appendChild(s_color);
			
			
			
			// BND:
			if(anzahl_B >= 1) {
				var b_text = new Array();
				var b_color = new Array();
				for(i=1; i<=anzahl_B; i++) {
					b_text[i] = document.createElement("input");
					b_text[i].setAttribute("type", "hidden");
					b_text[i].setAttribute("id", "ally[]");
					b_text[i].setAttribute("name", "ally[]");
					b_text[i].setAttribute("value", tag_B[i-1]);
					form.appendChild(b_text[i]);
					
					b_color[i] = document.createElement("input");
					b_color[i].setAttribute("type", "hidden");
					b_color[i].setAttribute("id", "allyC[]");
					b_color[i].setAttribute("name", "allyC[]");
					b_color[i].setAttribute("value", dec_B[i-1]);
					form.appendChild(b_color[i]);
				}
			}
			
			
			// NAP:
			if(anzahl_N >= 1) {
				var n_text = new Array();
				var n_color = new Array();
				for(i=1; i<=anzahl_N; i++) {
					n_text[i] = document.createElement("input");
					n_text[i].setAttribute("type","hidden");
					n_text[i].setAttribute("id","ally[]");
					n_text[i].setAttribute("name","ally[]");
					n_text[i].setAttribute("value",tag_N[i-1]);
					form.appendChild(n_text[i]);
					
					n_color[i] = document.createElement("input");
					n_color[i].setAttribute("type", "hidden");
					n_color[i].setAttribute("id", "allyC[]");
					n_color[i].setAttribute("name", "allyC[]");
					n_color[i].setAttribute("value", dec_N[i-1]);
					form.appendChild(n_color[i]);
				}
			}
			
			
			// Feinde:
			if(anzahl_F >= 1) {
				var f_text = new Array();
				var f_color = new Array();
				for(i=1; i<=anzahl_F; i++) {
					f_text[i] = document.createElement("input");
					f_text[i].setAttribute("type", "hidden");
					f_text[i].setAttribute("id", "ally[]");
					f_text[i].setAttribute("name", "ally[]");
					f_text[i].setAttribute("value", tag_F[i-1]);
					form.appendChild(f_text[i]);
					
					f_color[i] = document.createElement("input");
					f_color[i].setAttribute("type", "hidden");
					f_color[i].setAttribute("id", "allyC[]");
					f_color[i].setAttribute("name", "allyC[]");
					f_color[i].setAttribute("value", dec_F[i-1]);
					form.appendChild(f_color[i]);
				}
			}
			
			// Spieler:
			var p1text = document.createElement("input");
			p1text.setAttribute("type", "hidden");
			p1text.setAttribute("name", "player[]");
			p1text.setAttribute("value", name);
			form.appendChild(p1text);
			
			var p1color = document.createElement("input");
			p1color.setAttribute("type", "hidden");
			p1color.setAttribute("name", "playerC[]");
			if(GM_getValue("Farb-" + welt) == "an") {
				p1color.setAttribute("value", "255,255,255");
			}
			else {
				p1color.setAttribute("value", "240,200,0");
			}
			form.appendChild(p1color);
			
			
			// Anzeigen:
			var ds_map = document.createElement("input");
			ds_map.setAttribute("type", "hidden");
			ds_map.setAttribute("name", "map[submit]");
			ds_map.setAttribute("value", "Anzeigen");
			form.appendChild(ds_map);
			
			// Formular in Seite einfügen und abschicken:
			document.getElementById("ds_body").appendChild(form);
			document.getElementById("dsmapia").submit();
		}
	});
}






// TW-plus
function go_twmaps() {
	
	GM_xmlhttpRequest({
		method:"POST",
		url:"http://de" + welt + ".twmaps.org/",
		headers:{
			"User-Agent":"Mozilla/5.0",
			"Accept":"text/xml"
		},
		onload:function(response) {
			
			var form = document.createElement("form");
			form.setAttribute("action", response.finalUrl + "createmap.php");
			
			form.setAttribute("method", "post");
			form.setAttribute("target", "_blank");
			form.setAttribute("id", "twmaps");
			
			
			// Zoomstufe:
			var ds_zoom = document.createElement("input");
			ds_zoom.setAttribute("type", "hidden");
			ds_zoom.setAttribute("id", "zoom");
			ds_zoom.setAttribute("name", "zoom");
			ds_zoom.setAttribute("value", zoom);
			form.appendChild(ds_zoom);
			
			
			// Zentrum X:
			var twmaps_x = document.createElement("input");
			twmaps_x.setAttribute("type", "hidden");
			twmaps_x.setAttribute("id", "settingsCenterX");
			twmaps_x.setAttribute("name", "x");
			twmaps_x.setAttribute("value", x);
			form.appendChild(twmaps_x);
			
			
			// Zentrum Y:
			var twmaps_y = document.createElement("input");
			twmaps_y.setAttribute("type", "hidden");
			twmaps_x.setAttribute("id", "settingsCenterY");
			twmaps_y.setAttribute("name", "y");
			twmaps_y.setAttribute("value", y);
			form.appendChild(twmaps_y);
			
			
			// Verlassene Dörfer anzeigen:
			var twmaps_verlassen = document.createElement("input");
			twmaps_verlassen.setAttribute("type", "hidden");
			twmaps_verlassen.setAttribute("id", "abandon");
			twmaps_verlassen.setAttribute("name", "abandon");
			twmaps_verlassen.setAttribute("value", verl?"on":0);
			form.appendChild(twmaps_verlassen);
			
			
			// Tag anzeigen:
			var twmaps_stammestags = document.createElement("input");
			twmaps_stammestags.setAttribute("type", "hidden");
			twmaps_stammestags.setAttribute("id", "showallytitle");
			twmaps_stammestags.setAttribute("name", "showallytitle");
			twmaps_stammestags.setAttribute("value", tags?"on":0);
			form.appendChild(twmaps_stammestags);
			
			
			// Eigener Stamm:
			var a1 = document.createElement("input");
			a1.setAttribute("type", "hidden");
			a1.setAttribute("id", "a1");
			a1.setAttribute("name", "a1");
			a1.setAttribute("value", GM_getValue("Stamm-ID-" + welt));
			form.appendChild(a1);
			
			var a1rgb = document.createElement("input");
			a1rgb.setAttribute("type", "hidden");
			a1rgb.setAttribute("id", "a1rgb");
			a1rgb.setAttribute("name", "a1rgb");
			if(GM_getValue("Farb-" + welt) == "an") {
				a1rgb.setAttribute("value", "000000");
			}
			else {
				a1rgb.setAttribute("value", "0000F4");
			}
			form.appendChild(a1rgb);
			
			
			
			// BND:
			var nr = 1;
			if(anzahl_B >= 1) {
				var b_text = new Array();
				var b_color = new Array();
				for(i=1; i<=anzahl_B; i++) {
					nr++;
					b_text[i] = document.createElement("input");
					b_text[i].setAttribute("type", "hidden");
					b_text[i].setAttribute("id", "a" + nr);
					b_text[i].setAttribute("name", "a" + nr);
					b_text[i].setAttribute("value", id_B[i-1]);
					form.appendChild(b_text[i]);
					
					b_color[i] = document.createElement("input");
					b_color[i].setAttribute("type", "hidden");
					b_color[i].setAttribute("id", "a" + nr + "rgb");
					b_color[i].setAttribute("name", "a" + nr + "rgb");
					b_color[i].setAttribute("value", hex_B[i-1]);
					form.appendChild(b_color[i]);
				}
			}
			
			// NAP:
			if(anzahl_N >= 1) {
				var n_text = new Array();
				var n_color = new Array();
				for(i=1; i<=anzahl_N; i++) {
					nr++;
					n_text[i] = document.createElement("input");
					n_text[i].setAttribute("type","hidden");
					n_text[i].setAttribute("id", "a" + nr);
					n_text[i].setAttribute("name", "a" + nr);
					n_text[i].setAttribute("value", id_N[i-1]);
					form.appendChild(n_text[i]);
					
					n_color[i] = document.createElement("input");
					n_color[i].setAttribute("type", "hidden");
					n_color[i].setAttribute("id", "a" + nr + "rgb");
					n_color[i].setAttribute("name", "a" + nr + "rgb");
					n_color[i].setAttribute("value", hex_N[i-1]);
					form.appendChild(n_color[i]);
				}
			}
			
			
			// Feinde:
			if(anzahl_F >= 1) {
				var f_text = new Array();
				var f_color = new Array();
				for(i=1; i<=anzahl_F; i++) {
					nr++;
					f_text[i] = document.createElement("input");
					f_text[i].setAttribute("type", "hidden");
					f_text[i].setAttribute("id", "a" + nr);
					f_text[i].setAttribute("name", "a" + nr);
					f_text[i].setAttribute("value", id_F[i-1]);
					form.appendChild(f_text[i]);
					
					f_color[i] = document.createElement("input");
					f_color[i].setAttribute("type", "hidden");
					f_color[i].setAttribute("id", "a" + nr + "rgb");
					f_color[i].setAttribute("name", "a" + nr + "rgb");
					f_color[i].setAttribute("value", hex_F[i-1]);
					form.appendChild(f_color[i]);
				}
			}
			
			// Spieler:
			var p1 = document.createElement("input");
			p1.setAttribute("type", "hidden");
			p1.setAttribute("id", "p1");
			p1.setAttribute("name", "p1");
			p1.setAttribute("value", name);
			form.appendChild(p1);
			
			var p1rgb = document.createElement("input");
			p1rgb.setAttribute("type", "hidden");
			p1rgb.setAttribute("id", "p1rgb");
			p1rgb.setAttribute("name", "p1rgb");
			if(GM_getValue("Farb-" + welt) == "an") {
				p1rgb.setAttribute("value", "FFFFFF");
			}
			else {
				p1rgb.setAttribute("value", "F0C800");
			}
			form.appendChild(p1rgb);
			
			
			// Anzeigen:
			var tw_maps = document.createElement("input");
			tw_maps.setAttribute("type", "hidden");
			tw_maps.setAttribute("id", "submitSettings");
			tw_maps.setAttribute("value", "Anzeigen");
			form.appendChild(tw_maps);
			
			// Formular in Seite einfügen und abschicken:
			document.getElementById("ds_body").appendChild(form);
			document.getElementById("twmaps").submit();
		}
	});
}





// DS-Mapia:
if(url.match(/dsreal/)) {
	var seite = "DS-Mapia";
	
	// 
	var karten_url = document.getElementsByTagName("a")[1].href;
	var karten_id   = karten_url.split("&")[1].split("=")[1];
	var karten_key  = karten_url.split("&")[2].split("=")[1];
	
	// Welt:
	welt = document.getElementsByTagName("b")[0].innerHTML.split(" ")[1];
	
	// Liste bereits vorhanden?
	if(GM_getValue("Karten-" + akt_mon + "-" + akt_jahr + "-W" + welt) != undefined) {
		var karten = GM_getValue("Karten-" + akt_mon + "-" + akt_jahr + "-W" + welt);
	}
	else {
		var karten = ";";
	}
	
	// Pfad zur Grafik:
	var karten_src = "http://map.dsreal.de/showMap.php?id=" + karten_id + "&key=" + karten_key;
		
	// Besteht für Heute bereits ein Eintrag?
	// Nein:
	if(karten.indexOf(heute) == -1) {
		// KArte hinzufügen:
		karten += ";" + karten_src + "|" + karten_url + "|" + heute + "|" + seite;
		// Doppelte Semikolon entfernen:
		karten = karten.replace(";;", "");
	}
	// JA:
	else {
		// Kartenliste in Array aufsplitten:
		karten = karten.split(";");
		// Alle Karten durchlaufen:
		for(var i=0; i<karten.length; i++) {
			// Eintrag Heute:
			if(karten[i].indexOf(heute) > -1) {
				// Eintrag überschreiben:
				karten[i] = karten_src + "|" + karten_url + "|" + heute + "|" + seite;
			}			
		}
		// Array zu String zusammenfügen:
		karten = karten.join(";");
	}
	
	// Liste als GM-Value speichern: 
	GM_setValue("Karten-" + akt_mon + "-" + akt_jahr + "-W" + welt, karten);
}





// Forum
if(url.match(/screen=view_thread/)) {
	// Aktuelle Karte:
	var titel = "Diplomatische Karten | " + akt_mon + "-" + akt_jahr;
	
	// Bearbeiten:
	if(url.match(/extra=update/)) {
		var message_box = document.getElementById("message");
		var message_alt = message_box.innerHTML;
		// Karten-Post:
		if(message_alt.indexOf(titel) > -1) {
			// Neuer Text:
			var message_neu = "";
			message_neu += "[size=15]" + titel + "[/size]\n";
			message_neu += "\n";
			
			// Kartenliste vorhanden:
			if(GM_getValue("Karten-" + akt_mon + "-" + akt_jahr + "-W" + welt) != undefined) {
				// karten in Array aufsplitten und umkehren:
				var karten = GM_getValue("Karten-" + akt_mon + "-" + akt_jahr + "-W" + welt).split(";");				
				
				// Alle gespeicherten Karten durchlaufen:
				for(var b=0; b<karten.length; b++) {
					var karte_src = karten[b].split("|")[0];
					var karte_url = karten[b].split("|")[1];
					var karte_dat = karten[b].split("|")[2];
					var karte_von = karten[b].split("|")[3];
					
					// Alle Karten des Monats:
					message_neu += "[url=" + karte_url + "]" + karte_dat + "[/url] ";
					message_neu += "[size=2][color=gray]" + karte_von + "[/color][/size]";
					message_neu += "\n";
						
				} // for-ENDE
				
			} // if-ENDE
		} // else if-ENDE
			
		// Inhalt aktualisieren:
		message_box.innerHTML = message_neu;
		
		// Automatisch aktualisieren:
		// Formular absenden:
		document.getElementsByName("send")[0].click();
	}
	// Posts:
	else {
		// Anzahl der Posts ermitteln:
		var posts = document.getElementsByClassName("text").length;
		
		// Alle Posts durchlaufen:
		for(var i=0; i<posts; i++) {
			// Post-Autor:
			var user  = document.getElementsByClassName("igmline")[i].getElementsByTagName("a")[0].innerHTML;
			// Linkleiste:
			var right  = document.getElementsByClassName("right")[i];
			// Aktualisierungslink:
			var link = right.getElementsByTagName("a")[1].href + "&extra=update";
			// Aktueller Text:
			var text  = document.getElementsByClassName("text")[i].innerHTML;
			
			// Eigener Karten-Post
			if((text.indexOf(titel) > -1) && (user == " "+name+" ")) {
				// karten in Array aufsplitten und umkehren:
				var karten = GM_getValue("Karten-" + akt_mon + "-" + akt_jahr + "-W" + welt).split(";").reverse();
				var letzte = karten[0].split("|")[2];
				if(text.indexOf(letzte) == -1) {
					// Aktualisierungslink einfügen:
					right.innerHTML = "<a href='" + link + "' style='color:#C00; text-decoration:blink;'>Aktualisieren</a> | " + right.innerHTML;
				}
				else {
					// Aktualisierungslink einfügen:
					right.innerHTML = "<a href='" + link + "'>Aktualisieren</a> | " + right.innerHTML;
				}
			}
		}
	}
}


if(url.match(/screen=admin/)) {
	// Feindesliste auslesen:
	var feindesliste = GM_getValue("Feindesliste-W" + welt).split(";");

	var vis = document.getElementsByClassName("vis").length;
	
	for(var i=0; i<feindesliste.length; i++) {
		document.getElementsByClassName("vis")[0].innerHTML = document.getElementsByClassName("vis")[0].innerHTML.replace(feindesliste[i], "<b style='color:#C00; text-decoration:blink; cursor:help;' title='ACHTUNG! - Dieser Stamm ist unter Diplomatie als Feind markiert!'>" + feindesliste[i] + "</b>");
		
		// Geteilte Foren durch andere Stämme:
		if(vis == 3) {
			// Anzahl der Zeilen:
			var zeilen = document.getElementsByClassName("vis")[2].getElementsByTagName("tr").length;
			
			// Alle fremden Foren durchlaufen:
			for(var x=1; x<zeilen; x++) {
				document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[x].innerHTML = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[x].innerHTML.replace(feindesliste[i], "<b style='color:#C00; text-decoration:blink; cursor:help;' title='ACHTUNG! - Dieser Stamm ist unter Diplomatie als Feind markiert!'>" + feindesliste[i] + "</b>");			
			}
		}
	}
}