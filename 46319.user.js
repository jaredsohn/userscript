// ==UserScript==
// @name           DS - Stammeskarte
// @namespace      Die Stämme
// @description	   Version 0.9.4 | Fügt im Browsergame "Die Stämme" unter dem Punkt Mitglieder Links zu dsMapia, DsReal und TWmaps  hinzu, wodurch eine Karte mit allen Stammesmitgliedern erstellt wird. Diese Script funktioniert nur in Verbindung mit "DS Duke & Forum Assistant" von "C1B1SE"!
// @author         Roman S. (Zombie74)
// @include        http://de*.die-staemme.de/*
// @include        http://ch*.staemme.ch/*
// @exclude        http://forum.die-staemme.de/*
// @exclude        http://forum.staemme.ch/*
// @exclude        http://wiki.die-staemme.de/*
// @exclude        http://wiki.staemme.ch/*
// ==/UserScript==



/************************************************************************************/
/*                                                                                  */
/*  Dieses Script basiert auf dem UserScript "DS Mapia Weltkartenlink(Stamm)"       */
/*  und wurde ursprünglich von C1B1SE geschrieben "http://www.c1b1.de"              */
/*  Diese Script funktioniert nur in Verbindung mit "DS Duke & Forum Assistant"     */
/*  ebenfalls von C1B1SE.                                                           */
/*                                                                                  */
/************************************************************************************/



// Aktuell installierte Version:
var vers_ist = "DS - Stammeskarte 0.9.4";


// Aktueller Dateipfad:
var url = document.location.href;


// Land & Welt:
var land = url.substr(7, 2);
var welt = url.split(".")[0].replace("http://" + land, "");


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
	
	if(url.match(/einstellung=stammeskarte/)) {
		// Karteneinstellungen als GM-Value speichern:
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
		else {
			GM_setValue("Berg-" + welt, "aus");		
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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=103937' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Zent-" + welt) == undefined) || 
		(GM_getValue("Zoom-" + welt) == undefined) || 
		(GM_getValue("Grid-" + welt) == undefined) || 
		(GM_getValue("Verl-" + welt) == undefined) || 
		(GM_getValue("Tags-" + welt) == undefined) || 
		(GM_getValue("Berg-" + welt) == undefined) || 
		(GM_getValue("Xtra-" + welt) == undefined) || 
		(GM_getValue("Mark-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=stammeskarte'>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine bzw. nicht alle Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=stammeskarte'>Einstellungen ändern</a>";
		var ist_zent = GM_getValue("Zent-" + welt).replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Koordinaten des aktuellen Dorfes)</span>");
		var ist_zoom = GM_getValue("Zoom-" + welt);
		var ist_grid = GM_getValue("Grid-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00;'>aus</span>");
		var ist_verl = GM_getValue("Verl-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00;'>aus</span>");
		var ist_tags = GM_getValue("Tags-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00;'>aus</span>");
		var ist_berg = GM_getValue("Berg-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00;'>aus</span>");
		var ist_xtra = GM_getValue("Xtra-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>");
		var ist_mark = GM_getValue("Mark-" + welt).replace("an", "<span style='color:#090; padding-right:7px;'>an</span>").replace("aus", "<span style='color:#C00;'>aus</span>");
		
		td[1].innerHTML += "<b style='padding-right:65px;'>Mitte:</b>" + ist_zent + "<br>";
		td[1].innerHTML += "<b style='padding-right:62px;'>Zoom:</b>" + ist_zoom + " <span class='grey' style='padding-left:15px;'>DS Mapia | TW maps<br />";
		td[1].innerHTML += "<b style='padding-right:55px;'>Raster:</b>" + ist_grid + " <span class='grey'>DS Mapia<br />";
		td[1].innerHTML += "<b style='padding-right:33px;'>Verlassen:</b>" + ist_verl + " <span class='grey'>DS Mapia | TW maps<br />";
		td[1].innerHTML += "<b style='padding-right:67px;'>Tags:</b>" + ist_tags + " <span class='grey'>DS Mapia | TW maps<br />";
		td[1].innerHTML += "<b style='padding-right:26px;'>Landschaft:</b>" + ist_berg + " <span class='grey'>DS Real</span><br />";
		td[1].innerHTML += "<b style='padding-right:12px;'>Stamm Spezi:</b>" + ist_xtra + " <span class='grey'>DS Mapia</span><br>";
		td[1].innerHTML += "<b style='padding-right:12px;'>Nur Makierte:</b>" + ist_mark + " <span class='grey'>DS Mapia</span>";
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && 
		(GM_getValue("Zent-" + welt) == undefined) || 
		(GM_getValue("Zoom-" + welt) == undefined) || 
		(GM_getValue("Grid-" + welt) == undefined) || 
		(GM_getValue("Verl-" + welt) == undefined) || 
		(GM_getValue("Tags-" + welt) == undefined) || 
		(GM_getValue("Berg-" + welt) == undefined) || 
		(GM_getValue("Xtra-" + welt) == undefined) || 
		(GM_getValue("Mark-" + welt) == undefined)) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Stammeskarten vorzunehmen oder Abbrechen um die Standardeinstellungen zu speichern.")) {
			document.location.href = "http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=stammeskarte";
		}
		else {
			// Standardwerte als GM-Value speichern
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





// Eigener Stamm (Mitglieder):
if((url.match(/screen=ally&mode=members/)) && 
	(document.getElementsByClassName("ds_duke_and_forum_assistant_member_page_colour_td").length >= 1)) {

	var vis = document.getElementsByClassName("main")[0].getElementsByClassName("vis").length-1;
	var tab_member = document.getElementsByClassName("main")[0].getElementsByClassName("vis")[1];
	var inhalt = document.getElementsByClassName("main")[0];
	

	var anzahl_S = tab_member.getElementsByTagName("tr").length-2;
	if(document.getElementById("dsmitgliedersortierenaktiv")) {
		anzahl_S-=5;
	}
	
	var tag_S = new Array();
	var id_S = new Array();
	var dec_S = new Array();
	var hex_S = new Array();
	
	var min_col = 000;
	var max_col = 255;
	var diff_col_S = (max_col - min_col)/anzahl_S;
	
	
	// Funktionen zum umwandeln in Hex-Werte:
	var HexChars="0123456789ABCDEF";
	function Hex(dec) {
		return HexChars.charAt((dec>>4)&0xf)+HexChars.charAt(dec&0xf)
	}
	function Dec(hex) {
		return parseInt(hex.toUpperCase(),16)
	}
	
	var spalten = tab_member.getElementsByTagName("tr")[0].getElementsByTagName("th").length;
	if(document.getElementById("dsmitgliedersortierenaktiv")) {
		var start = 2;
		anzahl_S++;
	}
	else {
		var start = 1;
	}
	var x = 0;
	for(i=start; i<=anzahl_S; i++) {
		x++;
		var zeile = tab_member.getElementsByTagName("tr")[i];
		// Ist das UserScript "DS Duke & Forum Assistant" von C1B1SE installiert?
		if(tab_member.innerHTML.match(/warning.png/)) {
			var spalte = tab_member.getElementsByTagName("tr")[i].getElementsByClassName("ds_duke_and_forum_assistant_member_page_colour_td")[0].getAttribute("title").replace("#", "");
			hex_S[x] = spalte;
			dec_S[x] = Dec(spalte.slice(0, 2)) + "," + Dec(spalte.slice(2, 4)) + "," + Dec(spalte.slice(4, 6));
		}
		else {
			hex_S[x] = "0000" + Hex(min_col + (diff_col_S*i));
			dec_S[x] = "000," + "000," + (min_col + (diff_col_S*i));
		}
		tag_S[x] = zeile.getElementsByTagName("a")[0].innerHTML;
		id_S[x] = zeile.getElementsByTagName("a")[0].href.split("&id=")[1];
	}

	

	
	
	
	
	
	/************************************************************************/
	/* Stolen Code															*/
	/************************************************************************/
	
	var title = document.title.match(/(\d{1,3})\|(\d{1,3})/g)[0].split("|")
	
	if(GM_getValue("Zent-" + welt) != "aus") {
		var x = GM_getValue("Zent-" + welt).split("|")[0];
		var y = GM_getValue("Zent-" + welt).split("|")[1];
	}
	else {
		var x = title[0];
		var y = title[1];
	}
	
	
	var tab_karten = document.createElement("table");
	tab_karten.setAttribute("class", "vis");
	
	var tr_karten = document.createElement("tr");
	
	var a_einstell = document.createElement("a");
	a_einstell.setAttribute("href", "http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=stammeskarte");
	a_einstell.setAttribute("title", "Einstellungen | " + vers_ist);
	a_einstell.innerHTML = "<img src='http://www.die-staemme.de/graphic/buildings/garage.png' style='height:12px; padding-left:5px;'>";	
	
	var th_karten = document.createElement("th");
	th_karten.setAttribute("colspan", "2");
	th_karten.setAttribute("style", "padding-left:10px; padding-right:10px;");
	th_karten.innerHTML = "Stammes-Karten erstellen";
	th_karten.appendChild(a_einstell);
	tr_karten.appendChild(th_karten);

	var th_welten = document.createElement("th");
	th_welten.setAttribute("style", "text-align:center; -moz-border-radius-topright:10px;");
	th_welten.innerHTML = "Welten";
	th_welten.setAttribute("title", "Für folgende Welten können Karten erstellt werden");
	tr_karten.appendChild(th_welten);

	tab_karten.appendChild(tr_karten);
	inhalt.appendChild(tab_karten);
	
	
	
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
		td_link[i].setAttribute("style", "text-align:left;");
	
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
		td_xtra[i].setAttribute("style", "text-align:left;");
	
		extra[i] = document.createElement("small");
		extra[i].setAttribute("class", "grey");
		extra[i].setAttribute("style", "padding:0px;");
		extra[i].appendChild(document.createTextNode(zusatz[i]));
		
		td_xtra[i].appendChild(extra[i]);
		tr[i].appendChild(td_xtra[i]);
		
		
		// 
		td_welt[i] = document.createElement("td");
		td_welt[i].setAttribute("style", "text-align:right;");
	
		info[i] = document.createElement("small");
		info[i].setAttribute("class", "grey");
		info[i].setAttribute("style", "padding:0px;");
		info[i].appendChild(document.createTextNode(welten[i]));
		
		td_welt[i].appendChild(info[i]);
		tr[i].appendChild(td_welt[i]);
		
		
		// 
		tab_karten.appendChild(tr[i]);
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
	
	// Berge, Seen und Wälder anzeigen:
	var dsreal_verlassen = document.createElement("input");
	dsreal_verlassen.setAttribute("type", "hidden");
	dsreal_verlassen.setAttribute("name", "dsreal_frei");
	dsreal_verlassen.setAttribute("value", berg?"Ja":"Nein");
	form.appendChild(dsreal_verlassen);
	
	
	// Spieler:
	var s_text = new Array();
	var s_color = new Array();
	for(i=1; i<=anzahl_S; i++) {
		s_text[i] = document.createElement("input");
		s_text[i].setAttribute("type", "hidden");
		s_text[i].setAttribute("name", "p" + i + "text");
		s_text[i].setAttribute("value", tag_S[i]);
		form.appendChild(s_text[i]);
		
		s_color[i] = document.createElement("input");
		s_color[i].setAttribute("type", "hidden");
		s_color[i].setAttribute("name", "p" + i + "color");
		s_color[i].setAttribute("value", dec_S[i]);
		form.appendChild(s_color[i]);
	}
	
	
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
			
			
			// Spieler:
			if(anzahl_S >= 1) {
				var s_text = new Array();
				var s_color = new Array();
				for(i=1; i<=anzahl_S; i++) {
					s_text[i] = document.createElement("input");
					s_text[i].setAttribute("type", "hidden");
					s_text[i].setAttribute("name", "player[]");
					s_text[i].setAttribute("value", tag_S[i]);
					form.appendChild(s_text[i]);
					
					s_color[i] = document.createElement("input");
					s_color[i].setAttribute("type", "hidden");
					s_color[i].setAttribute("name", "playerC[]");
					s_color[i].setAttribute("value", dec_S[i]);
					form.appendChild(s_color[i]);
				}
			}
			
			
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
			
			
			// Koordinaten:
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
			
			
			// Spieler:
			if(anzahl_S >= 1) {
				var s_text = new Array();
				var s_color = new Array();
				for(i=1; i<=anzahl_S; i++) {
					s_text[i] = document.createElement("input");
					s_text[i].setAttribute("type", "hidden");
					s_text[i].setAttribute("name", "p" + i);
					s_text[i].setAttribute("value", tag_S[i]);
					form.appendChild(s_text[i]);
					
					s_color[i] = document.createElement("input");
					s_color[i].setAttribute("type", "hidden");
					s_color[i].setAttribute("name", "p" + i + "rgb");
					s_color[i].setAttribute("value", hex_S[i]);
					form.appendChild(s_color[i]);
				}
			}
			
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





// Inhalt neu ordnen:
var tabellen = document.getElementsByClassName("main")[0].getElementsByTagName("table").length;
var absaetze = document.getElementsByClassName("main")[0].getElementsByTagName("p").length;

for(i=0; i<tabellen; i++) {
	var p = 0;
	if((i==0) || (i==tabellen)) {
		p++;
		var absatz = document.getElementsByClassName("main")[0].getElementsByTagName("p")[p];
	}
	document.getElementsByClassName("main")[0].appendChild(absatz);
}