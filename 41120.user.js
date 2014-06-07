// ==UserScript==
// @name           DS - Mitglieder sortieren
// @namespace      Die Stämme
// @description    Version 1.1.3 | Ermöglicht im Browsergame "Die Stämme" das Sortieren der Mitgliederlisten
// @author         Roman S. (Zombie74) - [Basherliste von terenceds.de]
// @include        http://*.die-staemme.de/*
// @include        http://*.staemme.ch/*
// @include        http://*.tribalwars.nl/*
// @include        http://bashrank.terenceds.de/*
// ==/UserScript==





// Aktuell installierte Version:
var vers_ist = "DS - Mitglieder sortieren 1.1.3";


// Aktueller Dateipfad:
var url = document.location.href;


// Aktuelles Datum:
var jetzt = new Date();
var tag = jetzt.getDate();
var monat = jetzt.getMonth()+1;
var jahr = jetzt.getFullYear();
var heute = tag + "." + monat + "." + jahr;


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

// Welten mit Heereslager:
var heer = new Array("55", "57");

Array.prototype.in_array = function(needle){
	for(var i=0; i<this.length; i++){
		if(needle == this[i])
			return true
	}
	return false;
}


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
	
	// Einstellungen (Titel):
	if(url.match(/einstellung=mitglieder/)) {
		// Anzeige an/aus als GM-Value speichern:
		if(confirm("Titel:\n\nSollen die Titel der Mitglieder ausgeblendet und durch einen Stern ersetzt werden?\nBei Klick auf Abbrechen werden die Titel ganz normal neben dem Nickname angezeigt.")) {
			GM_setValue("Titel-" + welt, "aus");		
		}
		else {
			GM_setValue("Titel-" + welt, "an");		
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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=101782' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Titel-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=mitglieder''>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=mitglieder''>Einstellungen ändern</a>";
		var stammestitel = GM_getValue("Titel-" + welt);
		
		td[1].innerHTML += "<b style='padding-right:69px;'>Titel:</b>" + stammestitel.replace("an", "<span style='color:#090'>an</span> <span class='grey'>(Die Titel der Mitglieder werden normal angezeigt)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Die Titel der Mitglieder werden durch einen &#x2605; ersetzt und bei mouseover angezeigt.)</span>") + "<br>";
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && 
		(GM_getValue("Titel-" + welt) == undefined)) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Anzeige der Mitgliederliste vorzunehmen")) {
			document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=mitglieder";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Titel-" + welt, "an");
		}
	}
}



// Basherliste von terenceds.de auslesen:
if(url.match(/bashrank/)) {
	// Aktueller Dateipfad:
	var url = document.location.href;
	
	
	// Welt:
	var teil = url.split("&");
	var welt = teil[0].replace("http://bashrank.terenceds.de/show.php?server=de", "");
	var stamm_id = teil[1].split("=")[1];
	
	//var inhalt = document.getElementsByClassName("main")[0].getElementsByTagName("tbody")[0];
	var inhalt = document.getElementsByClassName("container")[0].getElementsByTagName("table")[0];
	var zeilen = inhalt.getElementsByTagName("tr").length;
	var plus = new Array();
	
	for(i=1; i<zeilen; i++) {
		var name = inhalt.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML.toLowerCase();
		var allg = inhalt.getElementsByTagName("tr")[i].getElementsByTagName("th")[0].innerHTML;
		var off = inhalt.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML;
		var deff = inhalt.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML;
		var kpro = inhalt.getElementsByTagName("tr")[i].getElementsByTagName("td")[4].innerHTML;
		var kpkt = inhalt.getElementsByTagName("tr")[i].getElementsByTagName("td")[5].innerHTML;
		plus[i] = "";
		if(allg.indexOf("Mio") > -1) {
			if(allg.replace(" Mio.", "").length > 1) {
				plus[i] += allg.replace(" Mio.", " <span class='grey'>Mio.</span>");
			}
			else {
				plus[i] += allg.replace(" Mio.", ".0 <span class='grey'>Mio.</span>");
			}
		}
		else {
			plus[i] += allg;
		}
		
		if(off.indexOf("Mio") > -1) {
			if(off.replace(" Mio.", "").length > 1) {
				plus[i] += ", " + off.replace(" Mio.", " <span class='grey'>Mio.</span>");;
			}
			else {
				plus[i] += ", " + off.replace(" Mio.", ".0 <span class='grey'>Mio.</span>");
			}
		}
		else {
			plus[i] += ", " + off;
		}
		
		if(deff.indexOf("Mio") > -1) {
			if(deff.replace(" Mio.", "").length > 1) {
				plus[i] += ", " + deff.replace(" Mio.", " <span class='grey'>Mio.</span>");;
			}
			else {
				plus[i] += ", " + deff.replace(" Mio.", ".0 <span class='grey'>Mio.</span>");
			}
		}
		else {
			plus[i] += ", " + deff;
		}
		plus[i] += ", " + ((kpro.replace(" %", "")*10)/10).toFixed(1) + " <span class='grey'>%</span>";
		plus[i] += ", " + ((kpkt.replace(" %", "")*10)/10).toFixed(1) + " <span class='grey'>%</span>";

		// Werte als GM-Value speichern:
		GM_setValue(name + "-" +  welt, plus[i]);
	}
	var datum = new Date();
	var tag = datum.getDate();
	var monat = datum.getMonth()+1;
	var jahr = datum.getFullYear();
	
	if(tag < 10) {
		tag = "0" + tag;
	}
	if(monat < 10) {
		monat = "0" + monat;
	}
	var heute = tag + "." + monat + "." + jahr;
	
	// Datum als GM-Value speichern:
	GM_setValue("Datum-" + welt + "-" + stamm_id, heute);
	
	document.getElementsByTagName("body")[0].innerHTML += "<div style='display:block; padding-bottom:10px; text-align:center;'><a href='http://userscripts.org/scripts/show/41120' target='_blank'>" + vers_ist.replace("DS - Mitglieder sortieren", "DS - Mitglieder sortieren <sup>") + "</sup></a> | <small style='color:#C00;'>hat die aktuellen Werte gespeichert!</small></div>";
	
}










// 
if(url.match(/screen=ally/)) {
	// Welt:
	var teil = url.split(".");
	var land = url.substr(7, 2);
	var welt = teil[0].replace("http://" + land, "");
	
	
	// Dorf-ID:
	var nummer = url.split("village=");
	var numm = nummer[1].split("&");
	var dorf_id = numm[0];

	// Tabelle:
	var table = document.getElementsByClassName("main")[0];
	var stamm = table.getElementsByTagName("h2")[0].innerHTML;
	
	// Stamm als GM-Value speichern:
	GM_setValue("Stamm-" + welt, stamm);


	if(url.match(/screen=ally&mode=profile/)) {
		var stamm = table.getElementsByTagName("h2")[0].innerHTML;
		var linkzahl = table.getElementsByClassName("vis")[1].getElementsByTagName("a").length-1;
		var stamm_id = table.getElementsByClassName("vis")[1].getElementsByTagName("a")[linkzahl].href.split("id=");
		if(stamm == GM_getValue("Stamm-" + welt)){
			// Stamm als GM-Value speichern:
			GM_setValue("Stamm-ID-" + welt, stamm_id[1]);
		}
	}


	if((url.match(/screen=ally&mode=members/))) {
		// Hinweis ausgeben daß Profil aufgerufen werden soll:
		if(GM_getValue("Stamm-ID-" + welt) == undefined) {
			table.getElementsByClassName("vis")[0].getElementsByTagName("a")[1].innerHTML = "<blink style='color:red;' title='damit das Script \"" + vers_ist + "\" funktionieren kann muß das Profil des eigenen Stammes mind. 1 x aufgerufen werden.'>" + table.getElementsByClassName("vis")[0].getElementsByTagName("a")[1].innerHTML + "</blink>";
		}
		
		// Eigener Spielername:
		var ich = "";	
		if (document.getElementsByClassName("lit").length >= 1) {
			var ich = document.getElementsByClassName("lit")[0].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
		}
	
		// Stamm:
		var stamm_lang = GM_getValue("Stamm-" + welt);
		var stamm_id = GM_getValue("Stamm-ID-" + welt);
		var stamm_link = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=info_ally&id=" + stamm_id;
	
		document.getElementsByTagName("h2")[0].innerHTML = "Mitglieder <a href='" + stamm_link + "'>" + stamm_lang + "</a>";
	}
}










// 
if((url.match(/screen=info_member/))) {
	// Welt:
	var teil = url.split(".");
	var land = url.substr(7, 2);
	var welt = teil[0].replace("http://" + land, "");
	
	
	// Dorf-ID:
	var nummer = url.split("village=");
	var numm = nummer[1].split("&");
	var dorf_id = numm[0];
	
	// Eigener Spielername:
	var ich = "";	
	if (document.getElementsByClassName("lit").length >= 1) {
		var ich = document.getElementsByClassName("lit")[0].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
	}

	// Stamm:
	var stamm_kurz = document.getElementsByTagName("h2")[0].innerHTML.replace("Mitglieder ", "");
	var stamm_lang = document.getElementsByClassName("main")[0].getElementsByTagName("a")[0].innerHTML.replace("» ", "");
	var stamm_gets = document.getElementsByClassName("main")[0].getElementsByTagName("a")[0].href.split("id=");
	var stamm_id = stamm_gets[1];
	var stamm_link = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=info_ally&id=" + stamm_id;

	document.getElementsByTagName("h2")[0].innerHTML = "Mitglieder <a href='" + stamm_link + "'>" + stamm_kurz + " <small>" + stamm_lang + "</small></a>";
}










// Nur in der Stammesrangliste anwenden:
if((url.match(/screen=info_member/)) || (url.match(/screen=ally&mode=members/))) {
	// Anzahl der Mitglieder:
    var vis = document.getElementsByClassName("main")[0].getElementsByClassName("vis").length-1;
	
	// Tabelle festlegen:
	if(vis > 1) {
		vis = 1;
	}

	// Tabelle:
	var tabelle = document.getElementsByClassName("main")[0].getElementsByClassName("vis")[vis];
	var spalten = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th").length;
    var zeilen = tabelle.getElementsByTagName("tr").length;
    	
	// Wenn Rechte bearbeitet werden dürfen eine Zeile abziehen:
	if((url.match(/screen=ally&mode=members/)) && spalten >= 5) {
		zeilen--;
		tabelle.getElementsByTagName("tr")[zeilen].getElementsByTagName("td")[0].setAttribute("colspan", "2");
		tabelle.getElementsByTagName("tr")[zeilen].getElementsByTagName("td")[1].setAttribute("style", "text-align:left;");
		var admin = tabelle.getElementsByTagName("tr")[zeilen].innerHTML;
	}
	else {
		var admin = "";
	}
    	
	var url_teil = url.split("&");
	var sort_link = "";
	var sort_typ = "R";

	var bez = new Array();
	var mitglied = new Array();
	var cells = new Array();
	var dots = tabelle.getElementsByTagName("img").length;

	var ausgabe = "";
	
	// Titelzeile:
	ausgabe += "<thead>";
	ausgabe += "<tr>";

	if(dots >= 1) {
		if(spalten == 14) {
			ausgabe += "<th colspan='18' style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px; cursor:default;'>Allgemeine Infos</th>";
		}
		else if(spalten == 13) {
			ausgabe += "<th colspan='17' style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px; cursor:default;'>Allgemeine Infos</th>";
		}
		else {
			ausgabe += "<th colspan='9' style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px; cursor:default;'>Allgemeine Infos</th>";
		}
	}
	else {
		ausgabe += "<th colspan='5' style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px; cursor:default;'>Allgemeine Infos</th>";
	}
	
	// Trennzelle:
	ausgabe += "<td rowspan='2' style='width:10px; background-image:url(\"http://" + land + welt + adresse[land] + land + "/graphic/background/content.jpg\"); cursor:default;'></td>";
	
	// Bashing:
	ausgabe += "<th colspan='5' style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'>Basher-Infos <span class='grey'>von</span> <a href='http://bashrank.terenceds.de/show.php?server=de" + welt + "&ally=" + stamm_id + "&order=all' target='_blank' title='Zum Anzeigen der Basherpunkte muß diese Seite mind. 1 x aufgerufen werden'>terenceds.de</a> abrufen</th>";
	ausgabe += "</tr>";
	ausgabe += "<tr>";
	ausgabe += "<th style='text-align:center;'>#</th>";
	
	// Kopfzeile auslesen:
	for(i=0; i<spalten; i++) {
		bez[i] = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[i].innerHTML;
		if(bez[i] != "Urlaubsvertretung") {
			if(bez[i].indexOf("gold.png") != -1) {
				ausgabe += "<th style='text-align:center;'><a href='" + sort_link + "G' title='" + bez[i] + "'>" + bez[i].replace("Dörfer", "<img src='http://" + land + welt + adresse[land] + land + "/graphic/buildings/main.png'>") + "</a></th>";
			}
			else {
				sort_link = url_teil[0] + "&" + url_teil[1] + "&" + url_teil[2] + "&sort=";
				if(i < 4) {
					ausgabe += "<th style='text-align:center;'><a href='" + sort_link + bez[i][0] + "' title='" + bez[i] + "'>" + bez[i].replace("Dörfer", "<img src='http://" + land + welt + adresse[land] + land + "/graphic/buildings/main.png'>") + "</a></th>";
				}
				else {
					ausgabe += "<th style='text-align:center;'><a href='" + sort_link +  "T' title='" + bez[i] + "'>" + bez[i] + "</a></th>";
				}
			}
			
		}
		// An das Ende der Zeile weitere Zellen anhängen:
		if(i == spalten-1) {
			if(dots >= 1) {
				ausgabe += "<th colspan='4' style='text-align:center;'><a href='" + sort_link + "S' title='Status des Spielers: aktiv | inaktiv | UV'><img src='http://" + land + welt + adresse[land] + land + "/graphic/dots/blue.png'> <img src='http://" + land + welt + adresse[land] + land + "/graphic/dots/green.png'> UV <img src='http://" + land + welt + adresse[land] + land + "/graphic/dots/yellow.png'> <img src='http://" + land + welt + adresse[land] + land + "/graphic/dots/red.png'></a></th>";
			}
			ausgabe += "<th style='text-align:center;' title='Basherpunkte Allgemein'><a href='" + sort_link + "A'><img src='http://" + land + welt + adresse[land] + land + "/graphic/buildings/statue.png' style='height:12px;'><br />Allgem.</a></th>";
			ausgabe += "<th style='text-align:center;' title='Basherpunkte Angriff'><a href='" + sort_link + "O'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/att.png' style='height:12px;'><br />Off</a></th>";
			ausgabe += "<th style='text-align:center;' title='Basherpunkte Verteidigung'><a href='" + sort_link + "V'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/def.png' style='height:12px;'><br />Deff</a></th>";
			ausgabe += "<th style='text-align:center;' title='Kills im Verhältnis zum Stamm'><a href='" + sort_link + "KS'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_priest.png' style='height:12px;'><br />Kill-S.</a></th>";
			ausgabe += "<th style='text-align:center;' title='Kills im Verhältnis zu den eigenen Punkten'><a href='" + sort_link + "KP'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_priest.png' style='height:12px;'><br />Kill-Pkt.</a></th>";
		}
	}
	ausgabe += "</tr>";
	ausgabe += "</thead>";
	ausgabe += "<tbody>";
	
	
	// Soll sortiert werden?
	if(url_teil.length >= 4) {
		sort_typ = url_teil[3].replace("sort=", "");
	}

	var pkte_ges    = 0;
	var dorf_ges    = 0;
	var dorf_ges    = 0;
	var recht_ges   = new Array(0, 0, 0, 0, 0, 0, 0, 0);
	var spende_ges  = 0;
	var gesamt_allg = 0;
	var gesamt_off  = 0;
	var gesamt_deff = 0;
	var gesamt_kpro = 0;
	var gesamt_kpkt = 0;
	var status_a    = 0;
	var status_u    = 0;
	var status_t    = 0;
	var status_w    = 0;

	
	// Einzelne Mitglieder zeilenweise auslesen:
	for(i=1; i<zeilen; i++) {
		// Zellen der Zeile ermitteln:
		var zellen = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td").length;
		
		// Infos auslesen:
		var info = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
		var titel = "Titel: " + info.split("</a>")[1].replace("(", "").replace(")", "");
		var memb = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
		var name = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML.toLowerCase();
		var rang = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML;
		var pkte = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML;
		var dorf = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML;
		
		//pkte_ges = parseInt(pkte_ges) + parseInt(pkte)*1000;
		pkte_ges = parseInt(pkte_ges) + (pkte.replace("<span class=\"grey\">.</span>", "").replace("<span class=\"grey\">.</span>", "")*1);
		dorf_ges = parseInt(dorf_ges) + parseInt(dorf);
		
	
		// UV-Anzeige aktiv:
		if(zellen >= 5) {
			if(heer.in_array(welt)) {
				var uv = zellen-2;			
			}
			else {
				var uv = zellen-1;				
			}
			var recht = new Array("0", "0", "0", "0", "0", "0", "0", "0");
			
			if(zellen >= 13) {
					for(r=4; r<=11; r++) {
						var punkt = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[r].getElementsByTagName("img")[0].src.split("/");
						if(punkt[5] == "green.png?1") {
							recht_ges[r-4] += 1;
						}
					}
					
					// Gespendete Goldmünzen:
					// Nur Welten mit Heereslager:
					if(heer.in_array(welt)) {
						var spende = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[13].innerHTML;
					}
				
				// Prüfen ob UV vergeben wurde:
				if(tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("img").length > 1) {
					var stat = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[uv].innerHTML;
					var vert = "0-" + tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[uv].getElementsByTagName("a")[0].innerHTML.toLowerCase() + name;
					var farbe = "#efeee3";
					status_u++;
				}
				else {
					var dot = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("img")[0].src.split("/");
					// Status anzeigen:
					switch(dot[5]) {
						case "red.png?1":
						var stat = "<span class='grey'>seit 1 Woche inaktiv</span>";
						var stat = "<span class='grey'>1 Woche</span>";
						var vert = "3-" + name;
						var farbe = "#FFDED3";
						status_w++;
						break;
						
						case "yellow.png?1":
						var stat = "<span class='grey'>seit 2 Tagen inaktiv</span>";
						var stat = "<span class='grey'>2 Tage</span>";
						var vert = "2-" + name;
						var farbe = "#FFF6D3";
						status_t++;
						break;
						
						default:
						var stat = "<span class='grey'>aktiv</span>";
						var vert = "1-" + name;
						var farbe = "#F7F6D3";
						status_a++;
					}
				}
				var rechte = "";
				// Rechte einlesen:
				for(x=4; x<uv; x++) {
					var r = x-4;
					recht[r] = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[x].innerHTML;
					if(recht[r].match(/green/)) {
						rechte += "0-";
					}
					else {
						rechte += "1-";
					}
				}
				rechte += "-" + name;
			}
			else {
				// UV anzeigen:
				var stat = "<span class='grey'>UV durch</span> " + tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[uv].innerHTML;
				var vert = "0-" + tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[uv].getElementsByTagName("a")[0].innerHTML.toLowerCase() + name;
				var farbe = "#efeee3";
				status_u++;
			}
			
		}
		// Keine UV-Anzeige:
		else{
			if(dots >= 1) {
				// Prüfen ob Benutzer über Rechte verfügt:
				var dot = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("img")[0].src.split("/");
				// Status anzeigen:
				switch(dot[5]) {
					case "red.png?1":
					var stat = "<span class='grey'>seit 1 Woche inaktiv</span>";
					var vert = "3-" + name;
					var farbe = "#FFDED3";
					status_w++;
					break;
					
					case "yellow.png?1":
					var stat = "<span class='grey'>seit 2 Tagen inaktiv</span>";
					var vert = "2-" + name;
					var farbe = "#FFF6D3";
					status_t++;
					break;
					
					default:
					var stat = "<span class='grey'>aktiv</span>";
					var vert = "1-" + name;
					var farbe = "#F7F6D3";
					status_a++;
				}
			}
			else {
					var stat = "<span class='grey'>???</span>";
					var vert = name;
					var farbe = "#F7EED3";
			}
		}
		
	
	
	
		// 1. Arrayelement für Sortierung festlegen:
		var bashing = GM_getValue(name + "-" + welt);
		if(bashing != undefined) {
			var bash = bashing.split(",");
		}
		else {
			var bash = new Array("0", "0", "0", "0", "0");
		}

		// Gesamtpunkte zusammenzählen:
		if(bash[0].indexOf("Mio") > 0) {
			gesamt_allg = (gesamt_allg*1) + (bash[0].replace(" <span class='grey'>Mio.</span>", "")*1000000);
		}
		else {
			gesamt_allg = (gesamt_allg*1) + ((bash[0].replace(".", ""))*1);
		}
		
		if(bash[1].indexOf("Mio") > 0) {
			gesamt_off = (gesamt_off*1) + (bash[1].replace(" <span class='grey'>Mio.</span>", "")*1000000);
		}
		else {
			gesamt_off = (gesamt_off*1) + ((bash[1].replace(".", ""))*1);
		}
		
		if(bash[2].indexOf("Mio") > 0) {
			gesamt_deff = (gesamt_deff*1) + (bash[2].replace(" <span class='grey'>Mio.</span>", "")*1000000);
		}
		else {
			gesamt_deff = (gesamt_deff*1) + ((bash[2].replace(".", ""))*1);
		}

		gesamt_kpro = (gesamt_kpro*1) + (bash[3]*1);
		gesamt_kpkt = (gesamt_kpkt*1) + (bash[4].replace(" <span class='grey'>%</span>", "")*1);
		
		mitglied[i] = new Array();
		if(sort_typ == "N") {
			mitglied[i][0] = name;
		}
		else if(sort_typ == "R") {
			mitglied[i][0] = rang;
		}
		else if(sort_typ == "P") {
			mitglied[i][0] = pkte;
		}
		else if(sort_typ == "D") {
			mitglied[i][0] = dorf;
		}
		else if(sort_typ == "T") {
			mitglied[i][0] = rechte;
		}
		else if(sort_typ == "G") {
			mitglied[i][0] = spende;
		}
		else if(sort_typ == "S") {
			mitglied[i][0] = vert;
		}
		else if(sort_typ == "A") {
			if(bash.length > 1) {
				if(bash[0].indexOf("Mio") > 0) {
					mitglied[i][0] = bash[0].replace(" <span class='grey'>Mio.</span>", "")*1000000;
				}
				else {
					mitglied[i][0] = bash[0].replace(".", "");
				}
			}
			else {
				mitglied[i][0] = "0";
			}
		}
		else if(sort_typ == "O") {
			if(bash.length > 1) {
				if(bash[1].indexOf("Mio") > 0) {
					mitglied[i][0] = bash[1].replace(" <span class='grey'>Mio.</span>", "")*1000000;
				}
				else {
					mitglied[i][0] = bash[1].replace(".", "");
				}
			}
			else {
				mitglied[i][0] = "0";
			}
		}
		else if(sort_typ == "V") {
			if(bash.length > 1) {
				if(bash[2].indexOf("Mio") > 0) {
					mitglied[i][0] = bash[2].replace(" <span class='grey'>Mio.</span>", "")*1000000;
				}
				else {
					mitglied[i][0] = bash[2].replace(".", "");
				}
			}
			else {
				mitglied[i][0] = "0";
			}
		}
		else if(sort_typ == "KS") {
			if(bash.length > 1) {
				mitglied[i][0] = bash[3].replace(".", "").replace(" <span class='grey'>%</span>", "");
			}
			else {
				mitglied[i][0] = "0";
			}
		}
		else if(sort_typ == "KP") {
			if(bash.length > 1) {
				mitglied[i][0] = bash[4].replace(".", "").replace(" <span class='grey'>%</span>", "");
			}
			else {
				mitglied[i][0] = "0";
			}
		}
		else {
			mitglied[i][0] = rang;
		}
		
		if(name == ich.toLowerCase()) {
			var farbe = "#F0D49A";
		}
		
		if(bashing != undefined) {
			cells[i] = (zellen+8);
		}
		else {
			cells[i] = (zellen+4);
		}
		// Zeilen zusammensetzen:
		mitglied[i][1] = "<tr onmouseover='javascript:window.status=\"" + memb + "\"; for(c=0; c<this.childNodes.length; c++) {if(c != " + cells[i] + ") {this.childNodes[c].style.backgroundColor =\"#FFF\"; this.childNodes[c].style.cursor =\"default\";}}' onmouseout='javascript:for(c=0; c<this.childNodes.length; c++) {if(c != " + cells[i] + ") {this.childNodes[c].style.backgroundColor =\"" + farbe + "\";}}'>";
		mitglied[i][1] += "<td style='text-align:right; background-color:" + farbe + ";'>X</td>";
		
		if(titel.length > 8) {
			if(GM_getValue("Titel-" + welt) == "aus") {
				mitglied[i][1] += "<td style='text-align:left; padding-right:5px; background-color:" + farbe + ";' title='" + titel + "'>" + info.split("(")[0] + " <span class='grey' style='margin:0px; padding:0px; padding-left:5px; line-height:10px;'>(&#x2605;)</span></td>";
			}
			else {
				mitglied[i][1] += "<td style='text-align:left; padding-right:5px; background-color:" + farbe + ";' title='" + titel + "'>" + info + "</td>";
			}
		}
		else {
			mitglied[i][1] += "<td style='text-align:left; padding-right:5px; background-color:" + farbe + ";' title='" + memb + " trägt keinen Titel'>" + info.split("(")[0] + "</td>";
		}
		
		mitglied[i][1] += "<td style='text-align:right; padding-left:5px; background-color:" + farbe + ";' title='Platzierung im Stamm'>" + rang + "</td>";
		mitglied[i][1] += "<td style='text-align:right; padding-left:5px; background-color:" + farbe + ";' title='Gesamtpunkte von " + memb + "'>" + pkte + "</td>";
		mitglied[i][1] += "<td style='text-align:right; padding-left:5px; background-color:" + farbe + ";' title='Anzahl der Dörfer von " + memb + "'>" + dorf + "</td>";
		if(zellen > 5) {
			mitglied[i][1] += "<td style='text-align:center; background-color:" + farbe + ";' title='Stammesgründer'>" + recht[0] + "</td>";
			mitglied[i][1] += "<td style='text-align:center; background-color:" + farbe + ";' title='Stammesführer'>" + recht[1] + "</td>";
			mitglied[i][1] += "<td style='text-align:center; background-color:" + farbe + ";' title='Einladen'>" + recht[2] + "</td>";
			mitglied[i][1] += "<td style='text-align:center; background-color:" + farbe + ";' title='Diplomatie'>" + recht[3] + "</td>";
			mitglied[i][1] += "<td style='text-align:center; background-color:" + farbe + ";' title='Rundschreiben'>" + recht[4] + "</td>";
			mitglied[i][1] += "<td style='text-align:center; background-color:" + farbe + ";' title='Moderator im internen Forum'>" + recht[5] + "</td>";
			mitglied[i][1] += "<td style='text-align:center; background-color:" + farbe + ";' title='Versteckte Foren'>" + recht[6] + "</td>";
			mitglied[i][1] += "<td style='text-align:center; background-color:" + farbe + ";' title='Foren für vertrauenswürdige Mitglieder'>" + recht[7] + "</td>";
			
			// Nur Welten mit Heereslager:
			if(heer.in_array(welt)) {
				mitglied[i][1] += "<td style='text-align:center; background-color:" + farbe + ";' title='Foren für vertrauenswürdige Mitglieder'>" + spende + "</td>";
			}
		}
		if(dots >= 1) {
			mitglied[i][1] += "<td colspan='4' style='text-align:left; padding-left:5px; background-color:" + farbe + ";' title='Aktueller Status von " + memb + "'>" + stat + "</td>";
		}
	
		if(name == ich.toLowerCase()) {
			mitglied[i][1] += "<td style='width:10px; background-color:" + farbe + "; cursor:default;'></td>";
		}
		else {
			mitglied[i][1] += "<td style='width:10px; background-color:" + farbe + "; background-image:url(\"http://" + land + welt + adresse[land] + land + "/graphic/background/content.jpg\"); background-position:0px " + i*(-14) + "px; cursor:default;'></td>";
		}
		// Bashing-Punkte anhängen:
		if(bashing != undefined) {
			var bash = bashing.split(", ");
			for(x=0; x<bash.length; x++) {
				mitglied[i][1] += "<td style='text-align:right; padding-left:5px; background-color:" + farbe + ";'>" + bash[x].replace(" <span", "&nbsp;<span") + "</td>";
			}
		}
		else {
			mitglied[i][1] += "<td colspan='5' style='text-align:center; background-color:" + farbe + ";'><span class='grey'>Bisher keine Infos vorhanden</span></td>";
		}
		
		
		// Zeile schliessen:
		mitglied[i][1] += "</tr>";		
	}


	// Mitglieder sortieren:
	function sort_auf(a, b) {
		return b[0] - a[0];
	}
	function sort_ab(a, b) {
		return a[0] - b[0];
	}

	// Nach Name:
	if(sort_typ == "N") {
		mitglied.sort();
	}
	// Nach Rang:
	else if(sort_typ == "R") {
		mitglied.sort(sort_ab);
	}
	// Nach Punkten:
	else if(sort_typ == "P") {
		mitglied.sort(sort_ab);
	}
	// Nach Dörfern:
	else if(sort_typ == "D") {
		mitglied.sort(sort_auf);
	}
	// Nach Rechten:
	else if(sort_typ == "T") {
		mitglied.sort();
	}
	// Nach gespendeten Goldmünzen:
	else if(sort_typ == "G") {
		mitglied.sort();
	}
	// Nach UV:
	else if(sort_typ == "S") {
		mitglied.sort();
	}
	// Nach Bashrank:
	else if(sort_typ == "A") {
		mitglied.sort(sort_auf);
	}
	else if(sort_typ == "O") {
		mitglied.sort(sort_auf);
	}
	else if(sort_typ == "V") {
		mitglied.sort(sort_auf);
	}
	else if(sort_typ == "KS") {
		mitglied.sort(sort_auf);
	}
	else if(sort_typ == "KP") {
		mitglied.sort(sort_auf);
	}

	
	// Tabelle neu zusammensetzen:
	for(i=0; i<zeilen-1; i++) {
		var x = i+1;
		ausgabe += mitglied[i][1].replace("X</td>", "<span class='grey'>" + x + "</span></td>");
	}
	// Zusammenfassung:
	if(pkte_ges >= 1000000) {
		var pkte_gesamt = (pkte_ges/1000000).toFixed(1) + " <span class='grey'>Mio.</span>";
		if((pkte_ges/(zeilen-1)) >= 1000000) {
			var pkte_mittel = ((pkte_ges/1000000)/(zeilen-1)).toFixed(1) + " <span class='grey'>Mio.</span>";
		}
		else {
			var pkte_mittel = ((pkte_ges/1000)/(zeilen-1)).toFixed(3);
		}
	}
	else if(pkte_ges >= 1000) {
		var pkte_gesamt = (pkte_ges/1000).toFixed(3);
		var pkte_mittel = ((pkte_ges/1000)/(zeilen-1)).toFixed(3);
	}
	else {
		var pkte_gesamt = pkte_ges;
		var pkte_mittel = pkte_ges/(zeilen-1);
	}

	if(dorf_ges >= 1000000) {
		var dorf_gesamt = (dorf_ges/1000).toFixed(1) + " <span class='grey'>Mio.</span>";
		var dorf_mittel = ((dorf_ges/1000)/(zeilen-1)).toFixed(1) + " <span class='grey'>Mio.</span>";
	}
	else {
		var dorf_gesamt = dorf_ges;
		var dorf_mittel = ((dorf_ges/(zeilen-1))).toFixed(0);
	}
	
	ausgabe += "</tbody>";
	ausgabe += "<tfoot>";
	ausgabe += "<tr>";

	// Trennzeile bei Status-Anzeige (UV) Zelle erweitern::
	if(dots >= 1) {
		if(spalten == 14) {
			ausgabe += "<th colspan='18'></th>";
		}
		else if(spalten == 13) {
			ausgabe += "<th colspan='17'></th>";
		}
		else {
			ausgabe += "<th colspan='9'></th>";
		}
	}
	else {
		ausgabe += "<th colspan='5'></th>";
	}
	ausgabe += "<td rowspan='4'  style='width:10px; background-image:url(\"http://" + land + welt + adresse[land] + land + "/graphic/background/content.jpg\"); cursor:default;'></td>";
	ausgabe += "<th colspan='5'></th>";
	ausgabe += "</tr>";

	ausgabe += "<tr>";
	ausgabe += "<td style='text-align:right; cursor:default;' colspan='2'><span class='grey'>Gesamt:</span></td>";
	ausgabe += "<td style='text-align:right; cursor:default;' title='Mitgliederzahl des Stammes'>" + (zeilen-1) + "</td>";
	ausgabe += "<td style='text-align:right; cursor:default;' title='Gesamtpunkte aller Mitglieder'>" + pkte_gesamt + "</td>";
	ausgabe += "<td style='text-align:right; cursor:default;' title='Gesamtzahl aller Dörfer'>" + dorf_gesamt + "</td>";

	// Bei Status-Anzeige Status-Gesamt:
	if(zellen > 5) {
		for(r=4; r<=11; r++) {
			ausgabe += "<td style='text-align:right; cursor:default;'>" + recht_ges[r-4] + "</td>";
		}
		
		// Nur Welten mit Heereslager:
		if(heer.in_array(welt)) {
			ausgabe += "<td style='text-align:right; cursor:default;'>" + spende_ges + "</td>";
		}
	}
	
	if(dots >= 1) {
		ausgabe += "<td style='text-align:right;'>" + status_u + "</td>";
		ausgabe += "<td style='text-align:right;'>" + status_a + "</td>";
		ausgabe += "<td style='text-align:right;'>" + status_t + "</td>";
		ausgabe += "<td style='text-align:right;'>" + status_w + "</td>";
	}
	
	// Gesamt (Bashing):
	var ges_bashing = GM_getValue("Gesamt-" + welt);
	if(ges_bashing != undefined) {
		var ges_bash = ges_bashing.split(", ");
	}
	else {
		var ges_bash = new Array("0", "0", "0", "0", "0");
	}
	
	
	if(gesamt_allg.toFixed(0) >= 1000000) {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + (gesamt_allg/1000000).toFixed(1) + "&nbsp;<span class='grey'>Mio.</span></td>";
	}
	else {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + (gesamt_allg/1000).toFixed(3) + "</td>";
	}
	
	if(gesamt_off.toFixed(0) >= 1000000) {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + (gesamt_off/1000000).toFixed(1) + "&nbsp;<span class='grey'>Mio.</span></td>";
	}
	else {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + (gesamt_off/1000).toFixed(3) + "</td>";
	}
	
	if(gesamt_deff.toFixed(0) >= 1000000) {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + (gesamt_deff/1000000).toFixed(1) + "&nbsp;<span class='grey'>Mio.</span></td>";
	}
	else {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + (gesamt_deff/1000).toFixed(3) + "</td>";
	}
	
	ausgabe += "<td style='text-align:right; cursor:default;'>100.0&nbsp;<span class='grey'>%</span></td>";
	ausgabe += "<td style='text-align:right; cursor:default;'>" + (gesamt_kpkt*1).toFixed(1) + "&nbsp;<span class='grey'>%</span></td>";

	// Fusszeile (Basherliste):
	ausgabe += "</tr>";
	
	// Durchschnitt:
	ausgabe += "<tr>";
	ausgabe += "<td style='text-align:right; cursor:default;' colspan='2'><span class='grey'>Ø Durchschnitt:</span></td>";
	ausgabe += "<td style='text-align:right; cursor:default;'></td>";
	ausgabe += "<td style='text-align:right; cursor:default;' title='Punktedurchschnitt aller Mitglieder'>" + pkte_mittel + "</td>";
	ausgabe += "<td style='text-align:right; cursor:default;' title='Durchschnittliche Anzahl der Dörfer'>" + dorf_mittel + "</td>";
	// Durchschnitt (Status):
	if(zellen > 5) {
		ausgabe += "<td title='Stammesgründer'><img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/found.png'></td>";
		ausgabe += "<td title='Stammesführung'><img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/lead.png'></td>";
		ausgabe += "<td title='Einladen'><img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/invite.png'></td>";
		ausgabe += "<td title='Diplomatie'><img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/diplomacy.png'></td>";
		ausgabe += "<td title='Rundschreiben'><img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/mass_mail.png'></td>";
		ausgabe += "<td title='Moderator im internen Forum'><img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/forum_mod.png'></td>";
		ausgabe += "<td title='Versteckte Foren'><img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/internal_forum.png'></td>";
		ausgabe += "<td title='Foren für vertrauenswürdige Mitglieder'><img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/trusted_member.png'></td>";

		// Nur Welten mit Heereslager:
		if(heer.in_array(welt)) {
			ausgabe += "<td title='Gespendete Goldmünzen'><img src='http://" + land + welt + adresse[land] + land + "/graphic/gold.png'></td>";
		}
	}
	
	



	if(dots >= 1) {
		ausgabe += "<td style='text-align:right; width:25px;' title='UV'><img src='http://" + land + welt + adresse[land] + land + "/graphic/dots/blue.png'></td>";
		ausgabe += "<td style='text-align:right; width:25px;' title='aktiv'><img src='http://" + land + welt + adresse[land] + land + "/graphic/dots/green.png'></td>";
		ausgabe += "<td style='text-align:right; width:25px;' title='seit 2 Tagen inaktiv'><img src='http://" + land + welt + adresse[land] + land + "/graphic/dots/yellow.png'></td>";
		ausgabe += "<td style='text-align:right; width:25px;' title='seit 1 Woche inaktiv'><img src='http://" + land + welt + adresse[land] + land + "/graphic/dots/red.png'></td>";
	}
	
	// Durchschnitt (Bashing):
	if(gesamt_allg.toFixed(0) >= (1000000*(zeilen-1))) {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + ((gesamt_allg/1000000)/(zeilen-1)).toFixed(1) + "&nbsp;<span class='grey'>Mio.</span></td>";
	}
	else {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + ((gesamt_allg/1000)/(zeilen-1)).toFixed(3) + "</td>";
	}
	
	if(gesamt_off.toFixed(0) >= (1000000*(zeilen-1))) {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + ((gesamt_off/1000000)/(zeilen-1)).toFixed(1) + "&nbsp;<span class='grey'>Mio.</span></td>";
	}
	else {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + ((gesamt_off/1000)/(zeilen-1)).toFixed(3) + "</td>";
	}
	
	if(gesamt_deff.toFixed(0) >= (1000000*(zeilen-1))) {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + ((gesamt_deff/1000000)/(zeilen-1)).toFixed(1) + "&nbsp;<span class='grey'>Mio.</span></td>";
	}
	else {
		ausgabe += "<td style='text-align:right; cursor:default;'>" + ((gesamt_deff/1000)/(zeilen-1)).toFixed(3) + "</td>";
	}
	ausgabe += "<td style='text-align:right; cursor:default;'>" + (100/(zeilen-1)).toFixed(1) + "&nbsp;<span class='grey'>%</span></td>";
	ausgabe += "<td style='text-align:right; cursor:default;'>" + (gesamt_kpkt/(zeilen-1)).toFixed(1) + "&nbsp;<span class='grey'>%</span></td>";
	ausgabe += "</tr>";
	
	// Ausgabe abschliessen:
	ausgabe += "<tr>";
	// Fusszeile (Allgemein):
	if(dots >= 1) {
		if(spalten == 14) {
			ausgabe += "<th colspan='18' style='text-align:center; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px; cursor:default;'>Allgemeine Infos</th>";
		}
		else if(spalten == 13) {
			ausgabe += "<th colspan='17' style='text-align:center; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px; cursor:default;'>Allgemeine Infos</th>";
		}
		else {
			ausgabe += "<th colspan='9' style='text-align:center; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px; cursor:default;'>Allgemeine Infos</th>";
		}
	}
	else {
		ausgabe += "<th colspan='5' style='text-align:center; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px; cursor:default;'>Allgemeine Infos</th>";
	}
	if(GM_getValue("Datum-" + welt + "-" + stamm_id) != undefined) {
		ausgabe += "<th colspan='5' style='text-align:center; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px; cursor:default;'>letzte Aktualisierung: <span class='grey'>" + GM_getValue("Datum-" + welt + "-" + stamm_id) + "</span></th>";
	}
	else {
		ausgabe += "<th colspan='5' style='text-align:center; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px; cursor:default;'>Basher-Infos <span class='grey'>von</span> <a href='http://bashrank.terenceds.de/show.php?server=de" + welt + "&ally=" + stamm_id + "&order=all' target='_blank' title='Zum Anzeigen der Basherpunkte muß diese Seite mind. 1 x aufgerufen werden'>terenceds.de</a> abrufen</th>";
	}
	
	ausgabe += "</tr>";
	
	// Wenn vorhanden Admin-Zeile anhängen:
	ausgabe += "<tr>" + admin + "</tr>";
	
	ausgabe += "</tfoot>";

	// Sortierte Tabelle ausgeben:
	tabelle.innerHTML = ausgabe;



	// Info für "DS Duke & Forum Assistant" von "C1B1SE"
	// Dieses Div wird benötigt um eine Kompabilität beider Scripts zu gewährleisten:
	var div = document.createElement('div');
	div.setAttribute('id','dsmitgliedersortierenaktiv');
	document.getElementsByTagName('body')[0].appendChild(div); 
}