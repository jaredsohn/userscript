// ==UserScript==
// @name           DS - Unterstützter Spieler
// @namespace      Die Stämme
// @description    Version 1.0.8 | Zeigt im Browsergame "Die Stämme" in der Truppenübersicht an, bei welchen Spielern die auswärtigen Truppen stehen.
// @author         Roman S. (Zombie74)
// @include        http://de*.die-staemme.de/*
// @include        http://ch*.staemme.ch/*
// @include        http://nl*.tribalwars.nl/*
// @exclude        http://forum.die-staemme.de/*
// @exclude        http://forum.die-staemme.ch/*
// @exclude        http://forum.die-tribalwars.nl/*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Unterstützter Spieler 1.0.8";


// Aktueller Dateipfad:
var url = document.location.href;


// Adressen:
var adresse = new Array();
adresse["de"] = ".die-staemme.";
adresse["ch"] = ".staemme.";
adresse["nl"] = ".tribalwars.";


// Testausgabe an|aus: (true|false)
// var test = true;
var test = false;
var testinfo = "TEST:\t\t" + vers_ist + "\n";



// Welt:
var teil = url.split(".");
var land = url.substr(7, 2);
var welt = teil[0].replace("http://" + land, "");




//**************************************//
//										//
// Hilfe: (Einheitenübersicht)		 	//
//										//
//**************************************//
if(url.match(/article=units/)) {
	// Testinfo erweitern:
	testinfo += "Einheitenübersicht:\n\n";
	
	var tabelle = document.getElementsByClassName("main")[1].getElementsByClassName("vis")[1];
	var spalten = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th").length;
	var zeilen  = tabelle.getElementsByTagName("tr").length;	
	
	// Testinfo erweitern:
	testinfo += "Zeilen:\t\t" + zeilen + "\n";
	testinfo += "\n";
	testinfo += "\n";
	var werte = ";";
	
	for(var i=1; i<zeilen; i++) {
		werte += ";" + tabelle.getElementsByTagName("tr")[i].getElementsByTagName("a")[0].innerHTML.split("> ")[1] + ",";	
		
		for(var x=1; x<spalten; x++) {
			werte += "," + tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[x].innerHTML;	
		}
	}
	werte = werte.replace(/;;/g, "").replace(/,,/g, "|");
	
	// Werte speichern:
	GM_setValue("Werte-W-" + welt, werte);
	
	// Testinfo ausgeben:
	if(test) {
		alert(testinfo + werte);
	}
}





//**************************************//
//										//
// Stämme: (Allgemein)				 	//
//										//
//**************************************//
else {
	// Aktuelles Datum:
	var jetzt = new Date();
	var tag = jetzt.getDate();
	var monat = jetzt.getMonth()+1;
	var jahr = jetzt.getYear()-100;
	var stunde = jetzt.getHours();
	var minute = jetzt.getMinutes();
	// var jahr = jetzt.getFullYear();
	
	var heute = (tag<10?"0"+tag:tag) + "." + (monat<10?"0"+monat:monat) + "." + (jahr<10?"0"+jahr:jahr);
	var uhrzeit = (stunde<10?"0"+stunde:stunde) + ":" +  (minute<10?"0"+minute:minute);
	
	
	// Dorf-ID:
	var akt_dorf_id   = url.split("village=")[1].split("&")[0];
	var akt_dorf_name = document.getElementById("menu_row2").getElementsByTagName("a")[2].innerHTML;
	var akt_dorf_posi = document.getElementById("menu_row2").getElementsByTagName("b")[0].innerHTML;
	var akt_dorf_posx = akt_dorf_posi.split("|")[0].split("(")[1];
	var akt_dorf_posy = akt_dorf_posi.split("|")[1].split(")")[0];
	var akt_dorf_kont = akt_dorf_posi.split(") K")[1];
	
	
	// Bilder:
	var pfad_haupt        = "http://" + land + welt + adresse[land] + land;
	var pfad_spieler      = pfad_haupt + "/game.php?village=" + akt_dorf_id + "&screen=info_player&id=";
	var pfad_dorf         = pfad_haupt + "/game.php?village=" + akt_dorf_id + "&screen=info_village&id=";
	var pfad_stamm        = pfad_haupt + "/game.php?village=" + akt_dorf_id + "&screen=info_ally&id=";
	var pfad_diplo        = pfad_haupt + "/game.php?village=" + akt_dorf_id + "&screen=ally&mode=contracts";
	var pfad_bericht      = pfad_haupt + "/game.php?village=" + akt_dorf_id + "&screen=report&mode=all&view=";
	var pfad_bilder       = pfad_haupt + "/graphic/";
	var LED_rot           = pfad_bilder + "dots/red.png";
	var LED_gelb          = pfad_bilder + "dots/yellow.png";
	var LED_gruen         = pfad_bilder + "dots/green.png";
	var LED_blau          = pfad_bilder + "dots/blue.png";
	var LED_grau          = pfad_bilder + "dots/grey.png";
	var icon_statue       = pfad_bilder + "buildings/statue.png";
	var icon_entfernung   = pfad_bilder + "unit/speed.png";
	var icon_support      = pfad_bilder + "command/support.png";
	var icon_bericht      = pfad_bilder + "new_report.png";
	var icon_angriff      = pfad_bilder + "unit/def.png";
	var icon_off          = pfad_bilder + "unit/att.png?1";
	var icon_deff_a       = pfad_bilder + "unit/def.png";
	var icon_deff_k       = pfad_bilder + "unit/def_cav.png?1";
	var icon_deff_b       = pfad_bilder + "unit/def_archer.png";
	var icon_verlust      = pfad_bilder + "unit/unit_priest.png";
	var icon_stamm_barbar = pfad_bilder + "face.png";
	var icon_stamm_eigen  = pfad_bilder + "unit/unit_snob.png";
	var icon_stamm_stamm  = pfad_bilder + "unit/unit_knight.png";
	var icon_stamm_bnd    = pfad_bilder + "unit/def.png";
	var icon_stamm_nap    = pfad_bilder + "ally_rights/diplomacy.png";
	var icon_stamm_fremd  = pfad_bilder + "buildings/main.png";
	var icon_stamm_feind  = pfad_bilder + "unit/att.png";
	
	var icon_N            = pfad_bilder + "map/map_n.png";
	var icon_S            = pfad_bilder + "map/map_s.png";
	var icon_W            = pfad_bilder + "map/map_w.png";
	var icon_O            = pfad_bilder + "map/map_e.png";
	var icon_NW           = pfad_bilder + "map/map_nw.png";
	var icon_NO           = pfad_bilder + "map/map_ne.png";
	var icon_SW           = pfad_bilder + "map/map_sw.png";
	var icon_SO           = pfad_bilder + "map/map_se.png";
	
	
	
	
		
	//**************************************//
	//										//
	// Einstellungen:						//
	//										//
	//**************************************//
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
		
		// Einstellungen (Unterstützter Spieler):
		if(url.match(/einstellung=unterstuetzungen/)) {
			// Neuer Dorfname an/aus als GM-Value speichern:
			if(confirm("Neuer Dorfname:\n\nSoll angezeigt werden wenn sich der Dorfname geändert hat.")) {
				GM_setValue("Neuname-" + welt, "an");		
			}
			else {
				GM_setValue("Neuname-" + welt, "aus");		
			}
			
			// Entfernung an/aus als GM-Value speichern:
			if(confirm("Entfernung:\n\nSollen die Entfernungen Dörfer angezeigt werden?")) {
				GM_setValue("Entfernungen-" + welt, "an");		
			}
			else {
				GM_setValue("Entfernungen-" + welt, "aus");		
			}
			
			// Letzte Unterstützung an/aus als GM-Value speichern:
			if(confirm("Letzte Unterstützung:\n\nSoll angezeigt werden wann Du das Dorf das letzte mal unterstützt hast?")) {
				GM_setValue("Letzte-Supp-" + welt, "an");		
			}
			else {
				GM_setValue("Letzte-Supp-" + welt, "aus");		
			}
			
			// Letzte Verteidigung an/aus als GM-Value speichern:
			if(confirm("Letzte Verteidigung:\n\nSoll angezeigt werden wann Deine Unterstützung das letzte mal angegriffen wurde?")) {
				GM_setValue("Letzte-Deff-" + welt, "an");		
			}
			else {
				GM_setValue("Letzte-Deff-" + welt, "aus");		
			}
			
			// Verlustanzeige an/aus als GM-Value speichern:
			if(confirm("Verluste:\n\nSollen die erlittenen Verluste angezeigt werden?")) {
				GM_setValue("Verlustanzeige-" + welt, "an");		
			}
			else {
				GM_setValue("Verlustanzeige-" + welt, "aus");		
			}
			
			// Kartenmarkierungen an/aus als GM-Value speichern:
			if(confirm("Kartenmarkierungen:\n\nSollen die unterstützten Dörfer in der Karte markiert werden?")) {
				GM_setValue("Kartenmarkierungen-" + welt, "an");		
			}
			else {
				GM_setValue("Kartenmarkierungen-" + welt, "aus");		
			}
			
			// Kampfwerte an/aus als GM-Value speichern:
			if(confirm("Kampfwerte:\n\nSollen die Kampfwerte aller bei Dir im Dorf stationierten Truppen angezeigt werden?")) {
				GM_setValue("Kampfwerte-" + welt, "an");		
			}
			else {
				GM_setValue("Kampfwerte-" + welt, "aus");		
			}
			
			// Y-Startwert als GM-Value speichern:
			if(GM_getValue("Y-Startwert-" + welt) != undefined) {
				var Startwert = GM_getValue("Y-Startwert-" + welt);	
			}
			else {
				var Startwert = "124";	
			}
			GM_setValue("Y-Startwert-" + welt, prompt("Y-Startwert:\n\nHier kannst Du den Y-Startwert für die Tooltips anpassen", Startwert));
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
		th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=119682' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
		td[0].setAttribute("style", "vertical-align:top;");
		
		if((GM_getValue("Neuname-" + welt) == undefined) || 
			(GM_getValue("Letzte-Supp-" + welt) == undefined) || 
			(GM_getValue("Letzte-Deff-" + welt) == undefined) || 
			(GM_getValue("Verlustanzeige-" + welt) == undefined) || 
			(GM_getValue("Kampfwerte-" + welt) == undefined) || 
			(GM_getValue("Y-Startwert-" + welt) == undefined)) {
			td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_dorf_id + "&screen=settings&mode=settings&einstellung=unterstuetzungen'>Einstellungen speichern</a>";
			td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine Einstellungen gespeichert</span>";
		}
		else {
			td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_dorf_id + "&screen=settings&mode=settings&einstellung=unterstuetzungen'>Einstellungen ändern</a>";
			var neuname = GM_getValue("Neuname-" + welt);
			var letzt_s = GM_getValue("Letzte-Supp-" + welt);
			var letzt_d = GM_getValue("Letzte-Deff-" + welt);
			var verlust = GM_getValue("Verlustanzeige-" + welt);
			var marker  = GM_getValue("Kartenmarkierungen-" + welt);
			var kampf   = GM_getValue("Kampfwerte-" + welt);
			var y_start = GM_getValue("Y-Startwert-" + welt);
			
			td[1].innerHTML += "<b style='padding-right:4px;'>Dorfname neu:</b>" + neuname.replace("an", "<span style='color:#090'>an</span> <span class='grey'>(Es wird angezeigt wenn sich der Dorfname geändert hat)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Es wird nicht angezeigt wenn sich der Dorfname geändert hat)</span>") + "<br>";
			td[1].innerHTML += "<b style='padding-right:25px;'>Entfernung:</b>" + marker.replace("an", "<span style='color:#090'>an</span> <span class='grey'>(Die Entfernungen werden angezeigt)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Die Entfernungen werden nicht angezeigt)</span>") + "<br>";
			td[1].innerHTML += "<b style='padding-right:19px;'>Letzte Supp:</b>" + letzt_s.replace("an", "<span style='color:#090'>an</span> <span class='grey'>(Es wird angezeigt wann Du das  Dorf das letzte mal unterstützt hast.)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Letzte Unterstützung wird nicht angezeigt.)</span>") + "<br>";
			td[1].innerHTML += "<b style='padding-right:24px;'>Letzte Deff:</b>" + letzt_d.replace("an", "<span style='color:#090'>an</span> <span class='grey'>(Es wird angezeigt wann die Unterstützung das letzte mal angegriffen wurde)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Keine Anzeige der letzten Verteidigung)</span>") + "<br>";
			td[1].innerHTML += "<b style='padding-right:42px;'>Verluste:</b>" + verlust.replace("an", "<span style='color:#090'>an</span> <span class='grey'>(Die erlittenen Verluste werden angezeigt)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Verluste werden nicht angezeigt)</span>") + "<br>";
			td[1].innerHTML += "<b style='padding-right:61px;'>Karte:</b>" + marker.replace("an", "<span style='color:#090'>an</span> <span class='grey'>(Die unterstützten Dörfer werden auf der Karte markiert)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Unterstützten Dörfer werden nicht markiert)</span>") + "<br>";
			td[1].innerHTML += "<b style='padding-right:16px;'>Kampfwerte:</b>" + kampf.replace("an", "<span style='color:#090'>an</span> <span class='grey'>(Die Kampfwerte aller Truppen im Dorf werden angezeigt)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey'>(Die Kampfwerte aller Truppen im Dorf werden nicht angezeigt)</span>") + "<br>";
			td[1].innerHTML += "<b style='padding-right:16px;'>Y-Startwert:</b>" + y_start + "<br>";
		}
		
		tr[0].appendChild(th[0]);
		tr[1].appendChild(td[0]);
		tr[1].appendChild(td[1]);
		
		document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
		document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
	}
	else {
		if((url.match(/screen=/)) && 
			((GM_getValue("Neuname-" + welt) == undefined) || 
			(GM_getValue("Entfernungen-" + welt) == undefined) || 
			(GM_getValue("Letzte-Supp-" + welt) == undefined) || 
			(GM_getValue("Letzte-Deff-" + welt) == undefined) || 
			(GM_getValue("Verlustanzeige-" + welt) == undefined) || 
			(GM_getValue("Kartenmarkierungen-" + welt) == undefined) || 
			(GM_getValue("Kampfwerte-" + welt) == undefined) || 
			(GM_getValue("Y-Startwert-" + welt) == undefined))) {
			if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Anzeige der Mitgliederliste vorzunehmen")) {
				document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_dorf_id + "&screen=settings&mode=settings&einstellung=unterstuetzungen";
			}
			else {
				// Standardwerte als GM-Value speichern
				GM_setValue("Neuname-" + welt, "an");
				GM_setValue("Entfernungen-" + welt, "an");
				GM_setValue("Letzte-Supp-" + welt, "an");
				GM_setValue("Letzte-Deff-" + welt, "an");
				GM_setValue("Verlustanzeige-" + welt, "an");
				GM_setValue("Kartenmarkierungen-" + welt, "an");
				GM_setValue("Kampfwerte-" + welt, "an");
				GM_setValue("Y-Startwert-" + welt, "124");
			}
		}
	}
	
	
	
	
	
	//**************************************//
	//										//
	// Spieler auslesen und speichern:		//
	//										//
	//**************************************//
	if (url.match(/screen=info_player/)) {
		var tabelle = document.getElementsByClassName("vis")[0];
		var zeile   = tabelle.getElementsByTagName("tr")[4];
		var zelle   = zeile.getElementsByTagName("td")[1];
		
		var spieler_id = url.split("id=")[1];
		
		var stamm_link = zelle.getElementsByTagName("a")[0];
		var stamm_tag  = stamm_link.innerHTML;
		var stamm_id   = stamm_link.href.split("id=")[1];
		
		// Werte als GM-Value speichern:
		GM_setValue("W" + welt + "-Spieler-Stamm-" + spieler_id, stamm_id);
		
		// Testinfo ausgeben:
		if(test) {
			// Testinfo erweitern:
			testinfo += "Spieler-ID:\t" + spieler_id + "\n";
			testinfo += "Stamm-Tag:\t" + stamm_tag + "\n";
			testinfo += "Stamm-ID:\t" + stamm_id + "\n";
			alert(testinfo);
		}
	}
	
	
	
	
	//**************************************//
	//										//
	// Mitglieder auslesen und speichern:	//
	//										//
	//**************************************//
	if (url.match(/mode=members/)) {
		// Mitgliedertabelle:
		var tabelle = document.getElementsByClassName("vis")[1];
		
		// Eigener Name:
		var nick = document.getElementsByClassName("lit")[0].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
		
		// Eigene Spieler-ID:
		var spieler_id = document.getElementsByClassName("lit")[0].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.split("id=")[1];
		
		// Anzahl der Mitglieder:
		var zeilen = tabelle.getElementsByTagName("tr").length-1;
		
		// Mitgliederliste:
		var mitglieder = "";
		
		for (var i=1; i<zeilen; i++) {
			mitglieder += " " + tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
		}
		
		// Werte als GM-Value speichern:
		GM_setValue("W" + welt + "-Nick", nick);
		GM_setValue("W" + welt + "-Mitglieder", mitglieder);
		
		if(test) {
			testinfo += "Nickname:\t" + nick + "\n";
			testinfo += "Mitglieder:\t" + mitglieder.replace(/,/g, "\n\t\t\t") + "\n";
			alert(testinfo);
		}
	}
	
	
	
	
	//**************************************//
	//										//
	// Berichte auslesen und speichern:		//
	//										//
	//**************************************//
	if (url.match(/view=/)) {
		// Tabelle festlegen:
		var tabelle = document.getElementsByClassName("vis")[2];
		
		// Betreff auslesen:
		var betreff = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[1].getElementsByTagName("span")[1].innerHTML;	
		
		// Nur bei Unterstützungsbericht:
		if (betreff.indexOf("unterstützt") > -1) {
			// Bericht-ID:
			var bericht_id = url.split("view=")[1];
			
			// Datum auslesen: (Gesendet)
			var datum = tabelle.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.split(" ")[0];	
		
			// Spielerinfos:
			// Von:
			var von_spieler_link = tabelle.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[1].getElementsByTagName("a")[0];
			var von_spieler_name = von_spieler_link.innerHTML;
			var von_spieler_id = von_spieler_link.href.split("id=")[1];
			// An:
			var an_spieler_links = tabelle.getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("th")[1].getElementsByTagName("a").length;
			// Spieler:
			if(an_spieler_links == 1) {
				var an_spieler_link = tabelle.getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("th")[1].getElementsByTagName("a")[0];
				var an_spieler_name = an_spieler_link.innerHTML;
				var an_spieler_id = an_spieler_link.href.split("id=")[1];
			}
			// Barbar: (unbekannt)
			else {
				var an_spieler_text = tabelle.getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("th")[1];
				var an_spieler_name = an_spieler_text.innerHTML;
				var an_spieler_id = "0";
			}
			
			
			
			// Dorfinfos:
			// Von:
			var von_dorf_link = tabelle.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("a")[0];
			var von_dorf_id   = von_dorf_link.href.split("id=")[1];
			var von_dorf_text = von_dorf_link.innerHTML;
			var von_dorf_cut1 = von_dorf_text.split("|").length-1;
			var von_dorf_cut2 = von_dorf_text.split("|")[von_dorf_cut1-1].split("(").length-1;
			var von_dorf_posx = von_dorf_text.split("|")[von_dorf_cut1-1].split("(")[von_dorf_cut2];
			var von_dorf_posy = von_dorf_text.split("|")[von_dorf_cut1].split(")")[0];
			// var von_dorf_kont = von_dorf_text.split(") K")[1];
			var von_dorf_kont = (von_dorf_posy.length<3?0:von_dorf_posy[0]) + (von_dorf_posx.length<3?0:von_dorf_posx[0]);
			var von_dorf_name = von_dorf_text.replace(" (" + von_dorf_posx + "|" + von_dorf_posy + ")", "").replace(" K" + von_dorf_kont, "");
				
			// An:
			var an_dorf_link = tabelle.getElementsByTagName("table")[0].getElementsByTagName("tr")[3].getElementsByTagName("td")[1].getElementsByTagName("a")[0];
			var an_dorf_id   = an_dorf_link.href.split("id=")[1];
			var an_dorf_text = an_dorf_link.innerHTML;
			var an_dorf_cut1 = an_dorf_text.split("|").length-1;
			var an_dorf_cut2 = an_dorf_text.split("|")[an_dorf_cut1-1].split("(").length-1;
			var an_dorf_posx = an_dorf_text.split("|")[an_dorf_cut1-1].split("(")[an_dorf_cut2];
			var an_dorf_posy = an_dorf_text.split("|")[an_dorf_cut1].split(")")[0];
			// var an_dorf_kont = an_dorf_text.split(") K")[1];
			var an_dorf_kont = (an_dorf_posy.length<3?0:an_dorf_posy[0]) + (an_dorf_posx.length<3?0:an_dorf_posx[0]);
			var an_dorf_name = an_dorf_text.replace(" (" + an_dorf_posx + "|" + an_dorf_posy + ")", "").replace(" K" + an_dorf_kont, "");
			
			// Als GM-Value speichern:
			// Spieler:
			GM_setValue("W" + welt + "-Spieler-Name-" + von_spieler_id, von_spieler_name);
			GM_setValue("W" + welt + "-Spieler-Datum-" + von_spieler_id, datum);
			GM_setValue("W" + welt + "-Spieler-Name-" + an_spieler_id, an_spieler_name);
			GM_setValue("W" + welt + "-Spieler-Datum-" + an_spieler_id, datum);
			// Dörfer:
			GM_setValue("W" + welt + "-Dorf-Name-" + von_dorf_id, von_dorf_name);
			GM_setValue("W" + welt + "-Dorf-Spieler-" + von_dorf_id, von_spieler_id);
			GM_setValue("W" + welt + "-Dorf-Datum-" + von_dorf_id, datum);
			GM_setValue("W" + welt + "-Dorf-Name-" + an_dorf_id, an_dorf_name);
			GM_setValue("W" + welt + "-Dorf-Spieler-" + an_dorf_id, an_spieler_id);
			GM_setValue("W" + welt + "-Dorf-Datum-" + an_dorf_id, datum);
			// Berichte:
			var datum_alt = GM_getValue("W" + welt + "-Bericht-Datum-" + von_dorf_id + "-" + an_dorf_id);
			if(datum_alt != undefined) {
				var dat_alt = (datum_alt.split(".")[2]*10000) + (datum_alt.split(".")[1]*100) + (datum_alt.split(".")[0]*1);
				var dat_neu = (datum.split(".")[2]*10000) + (datum.split(".")[1]*100) + (datum.split(".")[0]*1);
				var dat_diff = dat_neu-dat_alt;
				if(dat_diff > 0) {
					var bericht_datum = datum;
				}
				else {
					var bericht_datum = datum_alt;
				}
			}
			else {
				var bericht_datum = datum;
			}
			GM_setValue("W" + welt + "-Bericht-Link-" + von_dorf_id + "-" + an_dorf_id, bericht_id);
			GM_setValue("W" + welt + "-Bericht-Datum-" + von_dorf_id + "-" + an_dorf_id, bericht_datum);
					
			if(test) {
				testinfo += "Bericht-ID:\t" + bericht_id + "\n";
				testinfo += "\n";
				testinfo += "Datum:\t\t" + datum + "\n";
				testinfo += "\n";
				testinfo += "VON:\n";
				testinfo += "Spieler:\t\t" + von_spieler_name + "\n";
				testinfo += "Spieler-ID:\t" + von_spieler_id + "\n";
				testinfo += "Dorf:\t\t" + von_dorf_name + "\n";
				testinfo += "Dorf-ID:\t\t" + von_dorf_id + "\n";
				testinfo += "X|Y:\t\t\t" + von_dorf_posx + "|" + von_dorf_posy + "\n";
				testinfo += "Kontinent:\t" + von_dorf_kont + "\n";
				testinfo += "\n";
				testinfo += "AN:\n";
				testinfo += "Spieler:\t\t" + an_spieler_name + "\n";
				testinfo += "Spieler-ID:\t" + an_spieler_id + "\n";
				testinfo += "Dorf:\t\t" + an_dorf_name + "\n";
				testinfo += "Dorf-ID:\t\t" + an_dorf_id + "\n";
				testinfo += "X|Y:\t\t\t" + an_dorf_posx + "|" + an_dorf_posy + "\n";
				testinfo += "Kontinent:\t" + an_dorf_kont + "\n";
				alert(testinfo);
			}
			
		}
		
		
		
		// Unterstützung wurde angegriffen:
		else if (betreff.indexOf("wurde angegriffen") > -1) {
			// Bericht-ID:
			var angriff_id = url.split("view=")[1];
			
			// Datum auslesen: (Gesendet)
			var datum = tabelle.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.split(" ")[0];	
		
			// Spieler:
			// Von:
			var von_spieler_id   = GM_getValue("W" + welt + "-Dorf-Spieler-" + akt_dorf_id);
			var von_spieler_name = GM_getValue("W" + welt + "-Spieler-Name-" + von_spieler_id);
			
			// An:
			var an_spieler_links = tabelle.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[1].getElementsByTagName("a").length;
			if(an_spieler_links == 1) {
				var an_spieler_link = tabelle.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[1].getElementsByTagName("a")[0];
				var an_spieler_name = an_spieler_link.innerHTML;
				var an_spieler_id = an_spieler_link.href.split("id=")[1];
			}
			else {
				var an_spieler_name = "unbekannt";
				var an_spieler_id = "0";
			}
			
			// Dorf:
			// Von:
			var von_dorf_id   = akt_dorf_id;
			var von_dorf_link = tabelle.getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].getElementsByTagName("a")[0];
			var von_dorf_id   = von_dorf_link.href.split("id=")[1];
			var von_dorf_text = von_dorf_link.innerHTML;
			var von_dorf_pipe = von_dorf_text.split("|").length-1;
			var von_dorf_posx = von_dorf_text.split("|")[von_dorf_pipe-1].split("(")[1];
			var von_dorf_posy = von_dorf_text.split("|")[von_dorf_pipe].split(")")[0];
			// var von_dorf_kont = von_dorf_text.split(") K")[1];
			var von_dorf_kont = (von_dorf_posy.length<3?0:von_dorf_posy[0]) + (von_dorf_posx.length<3?0:von_dorf_posx[0]);
			var von_dorf_name = von_dorf_text.replace(" (" + von_dorf_posx + "|" + von_dorf_posy + ")", "").replace(" K" + von_dorf_kont, "");
				
			// An:
			var an_dorf_link = tabelle.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("a")[0];
			var an_dorf_id   = an_dorf_link.href.split("id=")[1];
			var an_dorf_text = an_dorf_link.innerHTML;
			var an_dorf_pipe = an_dorf_text.split("|").length-1;
			var an_dorf_posx = an_dorf_text.split("|")[an_dorf_pipe-1].split("(")[1];
			var an_dorf_posy = an_dorf_text.split("|")[an_dorf_pipe].split(")")[0];
			// var an_dorf_kont = an_dorf_text.split(") K")[1];
			var an_dorf_kont = (an_dorf_posy.length<3?0:an_dorf_posy[0]) + (an_dorf_posx.length<3?0:an_dorf_posx[0]);
			var an_dorf_name = an_dorf_text.replace(" (" + an_dorf_posx + "|" + an_dorf_posy + ")", "").replace(" K" + an_dorf_kont, "");
			
			// Verluste:
			var einheiten = tabelle.getElementsByTagName("table")[1].getElementsByTagName("tr")[0].getElementsByTagName("th").length-1;
			
			//
			var verlustanzeige = "";
			var verluste_alt = GM_getValue("W" + welt + "-Verlust-" + von_dorf_id + "-" + an_dorf_id);
	
			if(verluste_alt != undefined) {
				var verluste_gesamt = parseInt(verluste_alt.split("|")[0]);
			}
			else {
				var verluste_gesamt = 0;
				var verluste_alt = "0|0";
				for(var e=1; e<einheiten; e++) {
					verluste_alt += ",0";
				}
			}
			
			var verlust_akt = new Array();
			var verlust_alt = verluste_alt.split("|")[1].split(","); 
			var verlust_neu = new Array();
			for (v=1; v<=einheiten; v++) {
				var einheit = tabelle.getElementsByTagName("table")[1].getElementsByTagName("tr")[2].getElementsByTagName("td")[v].innerHTML;
				// Einzelne Verluste:
				verlust_akt[v-1] = parseInt(einheit);
				verlust_neu[v-1] = parseInt(verlust_alt[v-1]) + parseInt(einheit);
				
				// Gesamtverluste:
				verluste_gesamt = verluste_gesamt + verlust_akt[v-1];
			}
			
			//
			verlustanzeige = verluste_gesamt + "|" + verlust_neu;
			
			// Verlustberichte:
			var verlustberichte = GM_getValue("W" + welt + "-Verlustberichte-" + von_dorf_id + "-" + an_dorf_id);
			
			if(verlustberichte == undefined) { 
				GM_setValue("W" + welt + "-Verlust-" + von_dorf_id + "-" + an_dorf_id, verlustanzeige);
				GM_setValue("W" + welt + "-Verlustberichte-" + von_dorf_id + "-" + an_dorf_id, angriff_id);
			}
			else {
				if (verlustberichte.indexOf(angriff_id) == -1) {
					verlustberichte = verlustberichte + "," + angriff_id;
					GM_setValue("W" + welt + "-Verlust-" + von_dorf_id + "-" + an_dorf_id, verlustanzeige);
					GM_setValue("W" + welt + "-Verlustberichte-" + von_dorf_id + "-" + an_dorf_id, verlustberichte);
				}
			}
			
			// Als GM-Value speichern:
			// Spieler:
			GM_setValue("W" + welt + "-Spieler-Name-" + von_spieler_id, von_spieler_name);
			GM_setValue("W" + welt + "-Spieler-Datum-" + von_spieler_id, datum);
			GM_setValue("W" + welt + "-Spieler-Name-" + an_spieler_id, an_spieler_name);
			GM_setValue("W" + welt + "-Spieler-Datum-" + an_spieler_id, datum);
			
			// Dörfer:
			GM_setValue("W" + welt + "-Dorf-Name-" + von_dorf_id, von_dorf_name);
			GM_setValue("W" + welt + "-Dorf-Spieler-" + von_dorf_id, von_spieler_id);
			GM_setValue("W" + welt + "-Dorf-Datum-" + von_dorf_id, datum);
			GM_setValue("W" + welt + "-Dorf-Name-" + an_dorf_id, an_dorf_name);
			GM_setValue("W" + welt + "-Dorf-Spieler-" + an_dorf_id, an_spieler_id);
			GM_setValue("W" + welt + "-Dorf-Datum-" + an_dorf_id, datum);
			
			// Berichte:
			var datum_alt = GM_getValue("W" + welt + "-Angriff-Datum-" + von_dorf_id + "-" + an_dorf_id);
			if(datum_alt != undefined) {
				var dat_alt = (datum_alt.split(".")[2]*10000) + (datum_alt.split(".")[1]*100) + (datum_alt.split(".")[0]*1);
				var dat_neu = (datum.split(".")[2]*10000) + (datum.split(".")[1]*100) + (datum.split(".")[0]*1);
				var dat_diff = dat_neu-dat_alt;
				if(dat_diff > 0) {
					var angriff_datum = datum;
				}
				else {
					var angriff_datum = datum_alt;
				}
			}
			else {
				var angriff_datum = datum;
			}
			GM_setValue("W" + welt + "-Angriff-Link-" + von_dorf_id + "-" + an_dorf_id, angriff_id);
			GM_setValue("W" + welt + "-Angriff-Datum-" + von_dorf_id + "-" + an_dorf_id, angriff_datum);
			
			// Wenn der Unterstützungsbericht nicht mehr existiert
			// und noch kein Bericht-Datum gespeichert ist
			// Wird das Datum des letzten Angriffs übernommen:
			if(GM_getValue("W" + welt + "-Bericht-Datum-" + von_dorf_id + "-" + an_dorf_id) == undefined) {
				GM_setValue("W" + welt + "-Bericht-Datum-" + von_dorf_id + "-" + an_dorf_id, angriff_datum);
			}
			
	
			// Ausgabe:
			if(test) {
				testinfo += "Bericht-ID:\t" + angriff_id + "\n";
				testinfo += "\n";
				testinfo += "Datum:\t\t" + angriff_datum + "\n";
				testinfo += "\n";
				testinfo += "VON:\n";
				testinfo += "Spieler:\t\t" + von_spieler_name + "\n";
				testinfo += "Spieler-ID:\t" + von_spieler_id + "\n";
				testinfo += "Dorf:\t\t" + von_dorf_name + "\n";
				testinfo += "Dorf-ID:\t\t" + von_dorf_id + "\n";
				testinfo += "\n";
				testinfo += "AN:\n";
				testinfo += "Spieler:\t\t" + an_spieler_name + "\n";
				testinfo += "Spieler-ID:\t" + an_spieler_id + "\n";
				testinfo += "Dorf:\t\t" + an_dorf_name + "\n";
				testinfo += "Dorf-ID:\t\t" + an_dorf_id + "\n";
				testinfo += "X|Y:\t\t\t" + an_dorf_posx + "|" + an_dorf_posy + "\n";
				testinfo += "\n";
				testinfo += "VERLUSTE:\n";
				testinfo += "Bericht:\t\t" + verlustberichte + "\n";
				testinfo += "Verluste alt:\t" + verluste_alt + "\n";
				testinfo += "Verluste neu:\t" + verlustanzeige + "\n";
				alert(testinfo);
			}
		}
		
		// Eigenes Dorf wurde angegriffen:
		else if (betreff.indexOf("greift") > -1) {
			// Tabelle ermitteln:
			var tabelle = document.getElementsByClassName("vis")[2];
			
			// Dorfname + ID auslesen:
			var dorf_name = tabelle.getElementsByTagName("a")[3].innerHTML;
			var dorf_id = tabelle.getElementsByTagName("a")[3].href.split("id=")[1];
	
			// Dorfliste auslesen:
			var dorfliste = GM_getValue("W" + welt + "-Dorfliste");
			
			
			// Eigenes Dorf wurde angegriffen:
			if(dorfliste.indexOf(dorf_id) > -1) {
				
				// Letzte TH-Zelle ermitteln:
				var zellen_th = tabelle.getElementsByTagName("th").length-1;
				
				// Wurde die Zustimmung verändert?
				var zustimm = tabelle.getElementsByTagName("th")[zellen_th].innerHTML;
				
				// JA - Zustimmung wurde verändert:
				if(zustimm.indexOf("Zustimmung") > -1) {
					// Letzte TD-Zelle ermitteln:
					var zellen_td = tabelle.getElementsByTagName("td").length-1;
					// Aktuelle Zustimmung auslesen:
					var zust_akt = tabelle.getElementsByTagName("td")[zellen_td].getElementsByTagName("b")[1].innerHTML;
					
					// Das Dorf wurde verloren:
					if(zust_akt < 1) {
						// Dorf aus Liste entfernen:
						var neuliste = dorfliste.replace(dorf_id + "").replace(",,", ",");
						// Dorfliste neu speichern:
						GM_setValue("W" + welt + "-Dorfliste", neuliste);
						
						// Ausgabe:
						if(test) {
							testinfo += "Dorf-Name:\t" + dorf_name + "\n";
							testinfo += "Dorf-ID:\t\t" + dorf_id + "\n";
							testinfo += "Zustimmung:\t" + zust_akt + "\n";
							testinfo += "Dorfliste:\t\t" + neuliste.replace(/,/g, "\n\t\t\t") + "\n";
							alert(testinfo);
						}
					}				
				}			
			}
		}
	}
	
	
	
	
	
	//**************************************//
	//										//
	// Ausgabe (Befehle):					//
	//										//
	//**************************************//
	if (url.match(/screen=place&mode=command/)) {
		// Ist Liste gespeichert und nicht Leer?
		if((GM_getValue("Koordinatenliste-" + akt_dorf_id) != undefined) && 
		   (GM_getValue("Koordinatenliste-" + akt_dorf_id) != "")) {
			// Links zählen:
			links = document.getElementById("units_form").getElementsByTagName("a").length-1;
			// Letzten Link verändern:
			document.getElementById("units_form").getElementsByTagName("a")[links].innerHTML += " &<br />Unterstützte";
		}
		
		// Deffliste:
		var deffliste  = "";
		deffliste     += "<div style='margin-top:10px;'>";
		deffliste     += "<div>";
		deffliste     += "<table class='vis'>";
		deffliste     += "<tbody>";
		deffliste     += "<tr>";
		deffliste     += "<td class='selected'><b style='color:#804000;'>Unterstützte Dörfer</b></td>";
		deffliste     += "</tr>";	
		deffliste     += "</tbody>";	
		deffliste     += "</table>";
		
		deffliste     += "<table class='vis'>";
		deffliste     += "<tbody>";
		
		// Koordinatenliste:
		var koordinatenliste = GM_getValue("Koordinatenliste-" + akt_dorf_id).split(";");
		
		// Unterstützte Dörfer durchlaufen:
		for(var i=1; i<koordinatenliste.length; i++) {
			// Name und Position ermitteln:
			var dorf_name  = koordinatenliste[i].split(",")[0];
			var dorf_posi  = koordinatenliste[i].split(",")[1];
			var dorf_posx  = dorf_posi.split("|")[0];
			var dorf_posy  = dorf_posi.split("|")[1];
			
			// Deffliste erweitern:
			deffliste     += "<tr>";
			deffliste     += "<td style='padding-right:8px;'><a href='javascript:dspi_selectTarget(" + dorf_posx + ",%20" + dorf_posy + ")'>" + dorf_name + "</a></td>";
			deffliste     += "<td style='padding-right:4px;'><a href='javascript:dspi_selectTarget(" + dorf_posx + ",%20" + dorf_posy + ")'>" + dorf_posi + "</a></td>";
			deffliste     += "</tr>";	
		}
		deffliste     += "<tr>";
		deffliste     += "<td><small>Letzte Aktualisierung:</small></td>";
		deffliste     += "<td><small>" + koordinatenliste[0] + "</small></td>";
		deffliste     += "</tr>";
		deffliste     += "</tbody>";
		deffliste     += "</table>";
		deffliste     += "</div>";
		deffliste     += "</div>";
		
		// Deffliste in Seite einfügen:
		document.getElementById("inline_popup_main").innerHTML += deffliste;
	}
	
	
	
	
	
	//**************************************//
	//										//
	// Ausgabe (Truppen):					//
	//										//
	//**************************************//
	if (url.match(/screen=place&mode=units/)) {
		var wertzelle = "";
		wertzelle += "<tr><td><a href='http://" + land + welt + adresse[land] + land+ "/help2.php?article=units' target='_blank' title='Die Werte für Welt " + welt + " einlesen und speichern.'>Werte</a> ";
		
		if(GM_getValue("Werte-W-" + welt) == undefined) {
			var punkte_einlesen = "<a href='http://" + land + welt + adresse[land] + land + "/help2.php?article=units' target='_blank' style='margin-left:10px; color:#C00;' title='Punkte für Welt " + welt + " auslesen und speichern'>Pkt. einlesen</a> "; 
			wertzelle += "<b style='color:#C00; text-decoration:blink; cursor:help;' title='Die Werte für Welt " + welt + " wurden noch nicht gespeichert.'>!!!</b></td></tr>";
		}
		else {
			var punkte_einlesen = "<a href='http://" + land + welt + adresse[land] + land + "/help2.php?article=units' target='_blank' style='margin-left:10px; color:#090;' title='Punkte für Welt " + welt + " wurden bereits gespeichert'>Pkt. OK</a> "; 
			wertzelle += "<b style='color:#090; cursor:help;' title='Die Werte für Welt " + welt + " wurden bereits gespeichert.'>OK</b></td></tr>";
		} 
		
		document.getElementsByClassName("vis")[0].innerHTML += wertzelle;
		punkte_einlesen = "";
		
		// Anzahl der unterstützten Dörfer:
		var x = 0;
		
		// Infotabelle erstellen:
		var info = "<table>";
		info += "<th style='-moz-border-radius-topleft:10px;'><img src='http://www.die-staemme.de/graphic/command/support.png' style='padding:2px;' title='Anzahl der unterstützten Dörfer'></th>";
		info += "<th>Dorf</th>";
	
		
		// Anzahl der Tabellen ermitteln:
		var vis = document.getElementsByClassName("vis").length;
		
		// Verteidigung:
		if(vis >= 2) {
			// Tabelle festlegen:
			var tabelle = document.getElementsByClassName("vis")[1];
			
			// Kopfzeile:
			var kopfzeile = tabelle.getElementsByTagName("tr")[0];
			
			// Kopfzeile erweitern:
			var neu_th = "";
			neu_th += "</th>";
			kopfzeile.innerHTML = kopfzeile.innerHTML.replace(/<th\>Herkunft/, "<th style='text-align:center; -moz-border-radius-topleft:10px;'>Herkunft</th><th colspan='2' style='text-align:center; -moz-border-radius-topright:10px;'>Spieler" + neu_th);
			
			
			
			
				
				
				
				
			// Zeilen & Spalten:
			var zeilen = tabelle.getElementsByTagName("tr").length-1;
			var spalten = kopfzeile.getElementsByTagName("th").length;
			
			if(zeilen > 3) {
				zeilen = zeilen-1;
				tabelle.getElementsByTagName("tr")[zeilen].innerHTML = tabelle.getElementsByTagName("tr")[zeilen].innerHTML.replace(/\<th\>\</, "<th colspan='3'><");
				tabelle.getElementsByTagName("tr")[zeilen+1].innerHTML = tabelle.getElementsByTagName("tr")[zeilen+1].innerHTML.replace(/<th\>Insgesamt/, "<th colspan='3'>Insgesamt" + punkte_einlesen);
			}
			else {
				tabelle.getElementsByTagName("tr")[zeilen].innerHTML = tabelle.getElementsByTagName("tr")[zeilen].innerHTML.replace(/<th\>Insgesamt/, "<th colspan='3'>Insgesamt" + punkte_einlesen);
			}
			
			
			// Alle Zeilen durchlaufen:
			for(var i=1; i<zeilen; i++) {
				// aktuelle Zelle ermitteln:
				var zeile = tabelle.getElementsByTagName("tr")[i];
				
				// aktuelle Zelle ermitteln:
				var zelle = zeile.getElementsByTagName("td")[0];
					
				if(i == 1) {
					// Unterstütztes Dorf auslesen:
					var stamm = "<a href='" + pfad_diplo + "'><img src='" + icon_stamm_eigen + "' title='" + akt_dorf_name + " ist Dein aktuelles Dorf' style='height:12px;'></a>";
					
					tabelle.getElementsByTagName("tr")[i].innerHTML = tabelle.getElementsByTagName("tr")[i].innerHTML.replace(/Dorf/, "Dorf</td><td style='padding:0px; text-align:center; background-color:#F7EED3;'>" + stamm + "</td><td style='padding:0px; text-align:center; background-color:#F7EED3;'><b style='margin:0px; padding:0px;'>" + GM_getValue("W" + welt + "-Nick") + "</b></td>");
				}
				else {
					// Unterstütztes Dorf auslesen:
					var dorf = zelle.getElementsByTagName("a")[0].innerHTML;
					
					var supp_dorf_id  	  = zelle.getElementsByTagName("a")[0].href.split("id=")[1];
					var supp_dorf_text    = zelle.getElementsByTagName("a")[0].innerHTML;
					var supp_dorf_cut1    = supp_dorf_text.split("|").length-1;
					var supp_dorf_cut2    = supp_dorf_text.split("|")[supp_dorf_cut1-1].split("(").length-1;
					var supp_dorf_posx    = supp_dorf_text.split("|")[supp_dorf_cut1-1].split("(")[supp_dorf_cut2];
					var supp_dorf_posy    = supp_dorf_text.split("|")[supp_dorf_cut1].split(")")[0];
					var supp_dorf_kont    = (supp_dorf_posy.length<3?0:supp_dorf_posy[0]) + (supp_dorf_posx.length<3?0:supp_dorf_posx[0]);
					var supp_dorf_name    = supp_dorf_text.replace(" (" + supp_dorf_posx + "|" + supp_dorf_posy + ")", "").replace(" K" + supp_dorf_kont, "");
					koordinatenliste     += ";" + supp_dorf_name + "," + supp_dorf_posx + "|" + supp_dorf_posy;
					
					
					var supp_spieler_id   = GM_getValue("W" + welt + "-Dorf-Spieler-" + supp_dorf_id);
					var supp_spieler_name = GM_getValue("W" + welt + "-Spieler-Name-" + supp_spieler_id);
					var supp_stamm_id     = GM_getValue("W" + welt + "-Spieler-Stamm-" + supp_spieler_id);
					var supp_stamm_tag    = GM_getValue("W" + welt + "-Stamm-Tag-" + supp_stamm_id);
					var supp_stamm_name   = GM_getValue("W" + welt + "-Stamm-Name-" + supp_stamm_id);
					
					// Dorfname für Vergleich:
					var secure_name    	  = GM_getValue("W" + welt + "-Dorf-Name-" + supp_dorf_id);
					if(secure_name != undefined) {
						if(supp_dorf_name == secure_name) {
							var rename_check  = "Dorfnamen stimmen noch überein";
							var rename_status = LED_gruen;
						}
						else {
							var rename_check  = "Achtung! Dorfname wurde geändert.";
							var rename_status = LED_rot;
						}
					}
					else {
						var rename_check  = "Dorfname wurde noch nicht gespeichert";
						var rename_status = LED_grau;
					}
		
		
					// Koordinaten auslesen:
					var koord = dorf.split("(")[1].split(")")[0];
					
					// Spieler für dieses Dorf wurde gespeichert:
					if (supp_spieler_name != undefined) {
						// Barbaren?
						// Ja:
						if ((supp_spieler_name == 'unbekannt')) {
							var barbar = 1;
						}
						// Nein:
						else {
							var barbar = 0;
						}
						
						// Mitgliederliste gespeichert:
						if(GM_getValue("W" + welt + "-Mitglieder") != undefined) {
							// Eigener Stamm:
							if(GM_getValue("W" + welt + "-Mitglieder").indexOf(supp_spieler_name) > -1) {
								// Eigenes Dorf (Grün):
								if(GM_getValue("W" + welt + "-Nick") == supp_spieler_name) {
									var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_eigen + "' title='" + supp_dorf_name + " ist Dein eigenes Dorf' style='height:12px;'></a>";	
								}
								// Fremdes Dorf (Blau):
								else {
									var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_stamm + "' title='" + supp_spieler_name + " ist Mitglied Deines Stammes: &bdquo;" + supp_stamm_name + "&rdquo;' style='height:12px;'></a>";	
								}
							}
							// Fremder Stamm (Grau / Rot):
							else {
								// Barbarendorf:
								if(barbar == 1) {
									var stamm = "<a href='" + pfad_diplo + "'><img src='" + icon_stamm_barbar + "' title='Barbarendorf' style='height:12px;'></a>";	
								}
								// Sonstige Dörfer:
								else {
									if(GM_getValue("W" + welt + "-Stamm-Typ-" + supp_stamm_id) == "Verbündete") {
										var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_bnd + "' title='BND - verbündeter Stamm: &bdquo;" + supp_stamm_name + "&rdquo;' style='height:12px;'>";	
									}
									else if(GM_getValue("W" + welt + "-Stamm-Typ-" + supp_stamm_id) == "Nicht-Angriffs-Pakt (NAP)") {
										var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_nap + "' title='NAP - Nicht-Angriffs-Pakt: &bdquo;" + supp_stamm_name + "&rdquo;' style='height:12px;'></a>";	
									}
									else if(GM_getValue("W" + welt + "-Stamm-Typ-" + supp_stamm_id) == "Feinde") {
										var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_feind + "' title='Feind! - feindlicher Stamm: &bdquo;" + supp_stamm_name + "&rdquo;' style='height:12px;'></a>";	
									}
									else {
										var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_fremd + "' title='Achtung! - fremder Stamm: &bdquo;" + supp_stamm_name + "&rdquo;' style='height:12px;'></a>";	
									}
								}
							}
						}	// if-ENDE
						
						// Keine Mitgliederliste gespeichert (Grau):
						else {
							var stamm = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_dorf_id + "&screen=ally&mode=members' target='Mitglieder'><img src='" + LED_grau + "' title='Die Mitglieder Deines Stammes wurden noch nicht gespeichert' style='height:12px;'></a>";	
						}
						
						// Spielerlink einfügen
						// Name bekannt:
						if(supp_spieler_name != "unbekannt") {
							if(GM_getValue("W" + welt + "-Nick") == supp_spieler_name) {
								zeile.innerHTML = zeile.innerHTML.replace(/<\/a>/, "</a></td><td style='padding:0px; text-align:center; background-color:#F7EED3;'>" + stamm + "</td><td style='padding:0px; text-align:center; background-color:#F7EED3;'><a href='" + pfad_spieler + supp_spieler_id + "' style='margin:0px; padding:0px;' title='Zu Deinem Profil'>" + supp_spieler_name + "</a></td>");
							}
							else {
								zeile.innerHTML = zeile.innerHTML.replace(/<\/a>/, "</a></td><td style='padding:0px; text-align:center; background-color:#F7EED3;'>" + stamm + "</td><td style='padding:0px; text-align:center; background-color:#F7EED3;'><a href='" + pfad_spieler + supp_spieler_id + "' style='margin:0px; padding:0px;' title='Zum Profil von " + supp_spieler_name + "'>" + supp_spieler_name + "</a></td>");
							}
						}
						// Name unbekannt:
						else {
							zeile.innerHTML = zeile.innerHTML.replace(/<\/a>/, "</a></td><td>" + stamm + "</td><td style='background-color:#F7EED3;'>Barbar</td>");
						}
					} //	else-ENDE
				}	// else-ENDE		
				
				if(i == zeilen-1) {
					//tabelle.getElementsByTagName("tr")[zeilen-1].innerHTML = tabelle.getElementsByTagName("tr")[zeilen-1].innerHTML.replace(/alb\<\\th\>/, "alben</th>");
				}
				tabelle.getElementsByTagName("tr")[zeilen].innerHTML = tabelle.getElementsByTagName("tr")[zeilen].innerHTML.replace(/<th\>Insgesamt/, "<th colspan='3'>Insgesamt" + punkte_einlesen);
			}
			

			// Kampfwerte anzeigen:
			if(GM_getValue("Kampfwerte-" + welt) == "an") {
				// Wurden die Punkte für die aktuelle Welt bereits gespeichert?
				if(GM_getValue("Werte-W-" + welt) == undefined) {
					tabelle.innerHTML += "<tr><th colspan='" + (spalten+1) + "'><b style='color:#C00; text-decoration:blink;'>Punkte für Welt " + welt + " wurden noch nicht gespeichert!</b><a href='http://" + land + welt + adresse[land] + land + "/help2.php?article=units' target='_blank' style='margin-left:10px;' title='Punkte für Welt " + welt + " auslesen und speichern'>Jetzt speichern</a></th></tr>";
					
					
					
				} // if-ENDE
				else {
					// Off- / Deff-Werte auslesen:
					var einh = GM_getValue("Werte-W-" + welt).split(";");
				
					// Arrays erstellen: 
					var werte_holz = new Array();
					var werte_lehm = new Array();
					var werte_eise = new Array();
					var werte_volk = new Array();
					var werte_off  = new Array();
					var werte_def  = new Array();
					var werte_kav  = new Array();
					var werte_arc  = new Array();	
					
					// 
					for(var e=0; e<einh.length; e++) {
						var e_name = einh[e].split("|")[0];
						var werte  = einh[e].split("|")[1].split(",").length;
						
						werte_holz[e_name] = einh[e].split("|")[1].split(",")[0];
						werte_lehm[e_name] = einh[e].split("|")[1].split(",")[1];
						werte_eise[e_name] = einh[e].split("|")[1].split(",")[2];
						werte_volk[e_name] = einh[e].split("|")[1].split(",")[3];
						
						werte_off[e_name] = einh[e].split("|")[1].split(",")[werte-6];
						werte_def[e_name] = einh[e].split("|")[1].split(",")[werte-5];
						werte_kav[e_name] = einh[e].split("|")[1].split(",")[werte-4];
						werte_arc[e_name] = einh[e].split("|")[1].split(",")[werte-3];
					}
					
					
					
					var ein_wert = new Array();
					var off_a  = 0;
					var deff_a = 0;
					var deff_k = 0;
					var deff_b = 0;
					
					
					var zeil_zahl = document.getElementsByClassName("vis")[1].getElementsByTagName("tr").length;
					
					for(x=2; x<spalten; x++) {
						ein_wert[x] = tabelle.getElementsByTagName("tr")[zeil_zahl-1].getElementsByTagName("th")[x-1].innerHTML;
					}
					
					var zeile_werte = "<tr>";
					// Off:
					for(x=2; x<spalten; x++) {
						var ein_name = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[x].getElementsByTagName("img")[0].title;
						off_a += (werte_off[ein_name]*ein_wert[x]);
						if(x == 2) {
							zeile_werte += "<td></td><td style='padding:0px; text-align:center;'><img src='" + icon_off + "' style='height:14px;'></td><td>Off</td>";
						}
						if(werte_off[ein_name]*ein_wert[x] == 0) {
							zeile_werte += "<td style='font-size:10px; text-align:right; color:#DED3B9;'>0</td>";
						}
						else if(werte_off[ein_name]*ein_wert[x] > 999) {
							zeile_werte += "<td style='font-size:10px; text-align:right;'>" + (werte_off[ein_name]*ein_wert[x]/1000).toFixed(3) + "</td>";
						}
						else {
							zeile_werte += "<td style='font-size:10px; text-align:right;'>" + (werte_off[ein_name]*ein_wert[x]) + "</td>";
						}
					}
					if(off_a > 999999) {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + (off_a/1000000).toFixed(2) + " Mio.</th>";
					}
					else if(off_a > 999) {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + (off_a/1000).toFixed(3) + "</th>";
					}
					else {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + off_a + "</th>";
					}
					zeile_werte += "</tr><tr>";
					
					
					// Deff-Allg:
					for(x=2; x<spalten; x++) {
						var ein_name = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[x].getElementsByTagName("img")[0].title;
						deff_a += (werte_def[ein_name]*ein_wert[x]);
						if(x == 2) {
							zeile_werte += "<td></td><td style='padding:0px; text-align:center;'><img src='" + icon_deff_a + "' style='height:14px;'></td><td>Deff-Allgemein</td>";
						}
						if(werte_def[ein_name]*ein_wert[x] == 0) {
							zeile_werte += "<td style='font-size:10px; text-align:right; color:#DED3B9;'>0</td>";
						}
						else if(werte_def[ein_name]*ein_wert[x] > 999) {
							zeile_werte += "<td style='font-size:10px; text-align:right;'>" + (werte_def[ein_name]*ein_wert[x]/1000).toFixed(3) + "</td>";
						}
						else {
							zeile_werte += "<td style='font-size:10px; text-align:right;'>" + (werte_def[ein_name]*ein_wert[x]) + "</td>";
						}
					}
					if(deff_a > 999999) {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + (deff_a/1000000).toFixed(2) + " Mio.</th>";
					}
					else if(deff_a > 999) {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + (deff_a/1000).toFixed(3) + "</th>";
					}
					else {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + deff_a + "</th>";
					}
					zeile_werte += "</tr><tr>";
					
					
					// Deff-Beritten:
					for(x=2; x<spalten; x++) {
						var ein_name = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[x].getElementsByTagName("img")[0].title;
						deff_k += (werte_kav[ein_name]*ein_wert[x]);
						if(x == 2) {
							zeile_werte += "<td></td><td style='padding:0px; text-align:center;'><img src='" + icon_deff_k + "' style='height:14px;'></td><td>Deff-Beritten</td>";
						}
						if(werte_kav[ein_name]*ein_wert[x] == 0) {
							zeile_werte += "<td style='font-size:10px; text-align:right; color:#DED3B9;'>0</td>";
						}
						else if(werte_kav[ein_name]*ein_wert[x] > 999) {
							zeile_werte += "<td style='font-size:10px; text-align:right;'>" + (werte_kav[ein_name]*ein_wert[x]/1000).toFixed(3) + "</td>";
						}
						else {
							zeile_werte += "<td style='font-size:10px; text-align:right;'>" + (werte_kav[ein_name]*ein_wert[x]) + "</td>";
						}
					}
					if(deff_k > 999999) {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + (deff_k/1000000).toFixed(2) + " Mio.</th>";
					}
					else if(deff_k > 999) {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + (deff_k/1000).toFixed(3) + "</th>";
					}
					else {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + deff_k + "</th>";
					}
					zeile_werte += "</tr><tr>";
					
					
					// Deff-Bogen:
					for(x=2; x<spalten; x++) {
						var ein_name = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[x].getElementsByTagName("img")[0].title;
						deff_b += (werte_arc[ein_name]*ein_wert[x]);
						if(x == 2) {
							zeile_werte += "<td></td><td style='padding:0px; text-align:center;'><img src='" + icon_deff_b + "' style='height:14px;'></td><td>Deff-Bögen</td>";
						}
						if(werte_arc[ein_name]*ein_wert[x] == 0) {
							zeile_werte += "<td style='font-size:10px; text-align:right; color:#DED3B9;'>0</td>";
						}
						else if(werte_arc[ein_name]*ein_wert[x] > 999) {
							zeile_werte += "<td style='font-size:10px; text-align:right;'>" + (werte_arc[ein_name]*ein_wert[x]/1000).toFixed(3) + "</td>";
						}
						else {
							zeile_werte += "<td style='font-size:10px; text-align:right;'>" + (werte_arc[ein_name]*ein_wert[x]) + "</td>";
						}
					}
					if(deff_b > 999999) {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + (deff_b/1000000).toFixed(2) + " Mio.</th>";
					}
					else if(deff_b > 999) {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + (deff_b/1000).toFixed(3) + "</th>";
					}
					else {
						zeile_werte += "<th style='padding:0px; text-align:right;'>" + deff_b + "</th>";
					}
					zeile_werte += "</tr>";
					
					// 
					tabelle.innerHTML += zeile_werte;
				} // else-ENDE
			} // if-Ende:
		} // if-ENDE
		
		
		
		
		
		// Truppen in anderen Dörfern:
		var info_gesamt = "";
		
		if(vis == 3) {
			// Tabelle festlegen:
			var tabelle = document.getElementsByClassName("vis")[vis-1];
			
			// Kopfzeile:
			var kopfzeile = tabelle.getElementsByTagName("tr")[0];
			
			// Zeilen & Spalten:
			var zeilen = tabelle.getElementsByTagName("tr").length;
			var spalten = kopfzeile.getElementsByTagName("th").length;
			
			// Einheiten:
			var einheiten = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th").length-2;		
			for(var y=1; y<zeilen; y++) {
				for(var x=1; x<spalten; x++) {
					tabelle.getElementsByTagName("tr")[y].getElementsByTagName("td")[x].setAttribute("style", "text-align:right;");
				}
			}
			
			// 
			info += "<th colspan='2' style='-moz-border-radius-topright:10px;'>Spieler</th>";
			
			if(GM_getValue("Entfernungen-" + welt) == "an") {
				info += "<th style='-moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='" + icon_entfernung + "'></th>";
			}
			if(GM_getValue("Letzte-Supp-" + welt) == "an") {
				info += "<th style='-moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='" + icon_support + "'></th>";
			}
			if(GM_getValue("Letzte-Deff-" + welt) == "an") {
				info += "<th style='padding-left:5px; padding-right:5px; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='" + icon_angriff + "'></th>";
			}
			if(GM_getValue("Verlustanzeige-" + welt) == "an") {
				info += "<th style='padding-left:5px; padding-right:5px; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='" + icon_verlust + "' style='height:14px;'></th>";
			}
			for(var p=1; p<=einheiten; p++) {
				if(p==1) {
					info += "<th style='width:30px; -moz-border-radius-topleft:10px;'>" + tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[p].innerHTML + "</th>";
				}
				else if(p == einheiten) {
					info += "<th style='width:30px; -moz-border-radius-topright:10px;'>" + tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[p].innerHTML + "</th>";
				}
				else {
					info += "<th style='width:30px;'>" + tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[p].innerHTML + "</th>";
				}
			}
			
			// Kopfzeile erweitern:
			var neu_th = "";
			if(GM_getValue("Entfernungen-" + welt) == "an") {
				neu_th += "</th><th style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;' title='Entfernung'><img src='" + icon_entfernung + "'>";
			}
			if(GM_getValue("Letzte-Supp-" + welt) == "an") {
				neu_th += "</th><th style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;' title='Datum der letzten Unterstützung'><img src='" + icon_support + "'>";
			}
			if(GM_getValue("Letzte-Deff-" + welt) == "an") {
				neu_th += "</th><th style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'  title='Datum der letzten Verteidigung'><img src='" + icon_angriff + "'>";
			}
			if(GM_getValue("Verlustanzeige-" + welt) == "an") {
				neu_th += "</th><th style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;' title='Angriffe / Verluste'><img src='" + icon_verlust + "' style='height:14px;'>";
			}
			
			kopfzeile.innerHTML = kopfzeile.innerHTML.replace(/>Dorf/, "style='text-align:center; -moz-border-radius-topleft:10px;'>Dorf</th><th colspan='2' style='text-align:center; -moz-border-radius-topright:10px;'>Spieler" + neu_th);
			
			
			
			// Anzahl der zeilen ermitteln:
			var zeilen = tabelle.getElementsByTagName("tr").length;
			
			
			// Koordinatenliste:
			var koordinatenliste = heute;
			
			// Alle Zeilen durchlaufen:
			for(var i=1; i<zeilen; i++) {
				// aktuelle Zelle ermitteln:
				var zeile = tabelle.getElementsByTagName("tr")[i];
				
				// aktuelle Zelle ermitteln:
				var zelle = zeile.getElementsByTagName("td")[0];
					
				// Unterstütztes Dorf auslesen:
				var dorf = zelle.getElementsByTagName("a")[0].innerHTML;
				
				var supp_dorf_id  	  = zelle.getElementsByTagName("a")[0].href.split("id=")[1];
				var supp_dorf_text    = zelle.getElementsByTagName("a")[0].innerHTML;
				var supp_dorf_cut1    = supp_dorf_text.split("|").length-1;
				var supp_dorf_cut2    = supp_dorf_text.split("|")[supp_dorf_cut1-1].split("(").length-1;
				var supp_dorf_posx    = supp_dorf_text.split("|")[supp_dorf_cut1-1].split("(")[supp_dorf_cut2];
				var supp_dorf_posy    = supp_dorf_text.split("|")[supp_dorf_cut1].split(")")[0];
				var supp_dorf_kont    = (supp_dorf_posy.length<3?0:supp_dorf_posy[0]) + (supp_dorf_posx.length<3?0:supp_dorf_posx[0]);
				var supp_dorf_name    = supp_dorf_text.replace(" (" + supp_dorf_posx + "|" + supp_dorf_posy + ")", "").replace(" K" + supp_dorf_kont, "");
				koordinatenliste     += ";" + supp_dorf_name + "," + supp_dorf_posx + "|" + supp_dorf_posy;
				
				
				var supp_spieler_id   = GM_getValue("W" + welt + "-Dorf-Spieler-" + supp_dorf_id);
				var supp_spieler_name = GM_getValue("W" + welt + "-Spieler-Name-" + supp_spieler_id);
				var supp_stamm_id     = GM_getValue("W" + welt + "-Spieler-Stamm-" + supp_spieler_id);
				var supp_stamm_tag    = GM_getValue("W" + welt + "-Stamm-Tag-" + supp_stamm_id);
				var supp_stamm_name   = GM_getValue("W" + welt + "-Stamm-Name-" + supp_stamm_id);
				
				// Dorfname für Vergleich:
				var secure_name    	  = GM_getValue("W" + welt + "-Dorf-Name-" + supp_dorf_id);
				if(secure_name != undefined) {
					if(supp_dorf_name == secure_name) {
						var rename_check  = "Dorfnamen stimmen noch überein";
						var rename_status = LED_gruen;
					}
					else {
						var rename_check  = "Achtung! Dorfname wurde geändert.";
						var rename_status = LED_rot;
					}
				}
				else {
					var rename_check  = "Dorfname wurde noch nicht gespeichert";
					var rename_status = LED_grau;
				}
				
				var pos = 2;
				
				// Entfernungen anzeigen:
				if(GM_getValue("Entfernungen-" + welt) == "an") {
					pos++;
					// Letzter Unterstützungsbericht:
					var entf   = Math.sqrt(Math.pow(akt_dorf_posx - supp_dorf_posx, 2) + Math.pow(akt_dorf_posy - supp_dorf_posy, 2)).toFixed(1);
					
					
					var einheit_u = new Array();
	
					for(var e=0; e<einheiten; e++){
						var n = e+pos;
						einheit_u[e] = zeile.getElementsByTagName("td")[e+1].innerHTML;
					}
					var mouse_over = "";
					var mouse_out  = "";
	
					var skip = 1;
					if(GM_getValue("Letzte-Supp-" + welt) == "an") {
						skip++;
					}
					if(GM_getValue("Letzte-Deff-" + welt) == "an") {
						skip++;
					}
					if(GM_getValue("Verlustanzeige-" + welt) == "an") {
						skip++;
					}
					
					// Off- / Deff-Werte auslesen:
					var einh = GM_getValue("Werte-W-" + welt).split(";");
				
					// Array erstellen: 
					var speed  = new Array();	
					
					// 
					for(var e=0; e<einh.length; e++) {
						var e_name = einh[e].split("|")[0];
						var werte  = einh[e].split("|")[1].split(",").length;
						
						speed[e] = einh[e].split("|")[1].split(",")[werte-2];
					}
					
					for(var mo=0; mo<einheiten; mo++){
						//var dauer = "dauer";
						// Dauer ermitteln:
						var zeit = entf*speed[mo];
						var zeit_sek = zeit*60;
						var weg_std = Math.floor(zeit_sek/3600);
						var weg_min = Math.floor((zeit_sek/60) - (weg_std*60));
						
						// Bei Sekunden < 10 eine 0 voranstellen:
						if(weg_min < 10) {
							weg_min = "0" + weg_min;
						}
						var dauer = "<small>" + weg_std + "<span class=grey>:</span>" + weg_min + "</small>";
				
						mouse_over += "parentNode.parentNode.parentNode.getElementsByTagName(\"td\")[";
						mouse_over += (mo+pos+skip);
						if(einheit_u[mo] > 0) {
							mouse_over += "].innerHTML = \"<span>" + dauer + "</span>\";";
						}
						else {
							mouse_over += "].innerHTML = \"" + einheit_u[mo] + "\";";
						}
						
						mouse_out += "parentNode.parentNode.parentNode.getElementsByTagName(\"td\")[";
						mouse_out += (mo+pos+skip);
						mouse_out += "].innerHTML = \"" + einheit_u[mo] + "\";";
					}
					
					var entfernung = "<span style='cursor:help;' ";
					entfernung += "onmouseover='" + mouse_over + "' "; 
					entfernung += "onmouseout='" + mouse_out + "'>";
					entfernung += entf;
					entfernung += "</span>";
				}
				
				// Letzte Unterstützung:
				if(GM_getValue("Letzte-Supp-" + welt) == "an") {
					pos++;
					// Letzter Unterstützungsbericht:
					var letzter_bericht   = GM_getValue("W" + welt + "-Bericht-Datum-" + akt_dorf_id + "-" + supp_dorf_id);
					if(letzter_bericht != undefined) {
						var bericht_id          = GM_getValue("W" + welt + "-Bericht-Link-" + akt_dorf_id + "-" + supp_dorf_id);
						var bericht_datum   = "<a href='" + pfad_bericht + "" + bericht_id + "'>" + letzter_bericht + "</a>";
						var bericht_datum_titel = "Datum der letzten Unterstützung: " + letzter_bericht;
					}
					else {
						var bericht_datum       = "??.??.??";
						var bericht_datum_titel = "Das Datum der letzten Unterstützung wurde bisher noch nicht gespeichert.";
					}
				}
				
				// Letzter Angriff:
				if(GM_getValue("Letzte-Deff-" + welt) == "an") {
					pos++;
					// Letzter Angriffsbericht:
					var letzter_angriff = GM_getValue("W" + welt + "-Angriff-Datum-" + akt_dorf_id + "-" + supp_dorf_id);
					
					if(letzter_angriff != undefined) {
						var angriff_id          = GM_getValue("W" + welt + "-Angriff-Link-" + akt_dorf_id + "-" + supp_dorf_id);
						var angriff_datum       = "<a href='" + pfad_bericht + "" + angriff_id + "'>" + letzter_angriff + "</a>";
						var angriff_datum_titel = "Datum des letzten Angriffs: " + letzter_angriff;
					}
					else {
						var angriff_datum       = "&ndash; &ensp;";
						var angriff_datum_titel = "Deine Unterstützung in &bdquo;" + supp_dorf_name + "&rdquo; wurde bisher noch nicht angegriffen bzw. es wurde bisher noch keine Informationen gespeichert.";
					}
				}
				
				// Verluste:
				if(GM_getValue("Verlustanzeige-" + welt) == "an") {
					pos++;
					var verlustanzeige = "";
					if(GM_getValue("W" + welt + "-Verlust-" + akt_dorf_id + "-" + supp_dorf_id) != undefined) {
						var angriffe = GM_getValue("W" + welt + "-Verlustberichte-" + akt_dorf_id + "-" + supp_dorf_id).split(",").length;
						var verluste = GM_getValue("W" + welt + "-Verlust-" + akt_dorf_id + "-" + supp_dorf_id).split("|")[0];
						if(angriffe == 0) {
							var angriff = "<span style='color:#C00;'>" + angriffe + "</span>";
						}
						else {
							var angriff = angriffe;
						}
						if (verluste > 0) {
							var verlust = "<span style='color:#C00;'>" + verluste + "</span>";
						}
						else {
							var verlust = "<span style='color:#C00;'>" + verluste + "</span>";
						}
						
						var einheit_u = new Array();
						var einheit_v = GM_getValue("W" + welt + "-Verlust-" + akt_dorf_id + "-" + supp_dorf_id).split("|")[1].split(",");
		
		
						for(var e=0; e<einheit_v.length; e++){
							var n = e+pos;
							einheit_u[e] = zeile.getElementsByTagName("td")[e+1].innerHTML;
						}
						
						var mouse_over = "";
						var mouse_out  = "";
						for(var mo=0; mo<einheit_v.length; mo++){
							mouse_over += "parentNode.parentNode.parentNode.getElementsByTagName(\"td\")[";
							mouse_over += (mo+pos+1);
							if(einheit_v[mo] > 0) {
								mouse_over += "].innerHTML = \"<b class=warn>" + einheit_v[mo] + "</b>\";";
							}
							else {
								if(einheit_u[mo] > 0) {
									mouse_over += "].innerHTML = \"<b style=color:green;>" + einheit_v[mo] + "</b>\";";
								}
								else {
									mouse_over += "].innerHTML = \"<span class=hidden>" + einheit_v[mo] + "</span>\";";
								}
							}
							
							mouse_out += "parentNode.parentNode.parentNode.getElementsByTagName(\"td\")[";
							mouse_out += (mo+pos+1);
							mouse_out += "].innerHTML = \"" + einheit_u[mo] + "\";";
						}
						
						verlustanzeige += angriff;
						verlustanzeige += "<span style='cursor:help;' ";
						verlustanzeige += "onmouseover='" + mouse_over + "' "; 
						verlustanzeige += "onmouseout='" + mouse_out + "'>";
						verlustanzeige += "<span style='padding-left:2px; padding-right:2px;'>/</span>";
						verlustanzeige += verlust;
						verlustanzeige += "</span>";
					}			
					else {
						var angriffe = 0;
						var verluste = 0;
						verlustanzeige += "<small>&ndash; &ensp;</small>";
					}			
				}
				
				
				// Secure-LED einfügen
				if(GM_getValue("Neuname-" + welt) == "an") {
					zelle.innerHTML = "<img src='" + rename_status + "' title='" + rename_check + "' style='cursor:help;'> " + zelle.innerHTML;
				}
	
	
				// Koordinaten auslesen:
				var koord = dorf.split("(")[1].split(")")[0];
				
				// 
				var colspan = 3;
				
				// Spieler für dieses Dorf wurde gespeichert:
				if (supp_spieler_name != undefined) {
					// Barbaren?
					// Ja:
					if ((supp_spieler_name == 'unbekannt')) {
						var barbar = 1;
					}
					// Nein:
					else {
						var barbar = 0;
					}
					
					// Mitgliederliste gespeichert:
					if(GM_getValue("W" + welt + "-Mitglieder") != undefined) {
						// Eigener Stamm:
						if(GM_getValue("W" + welt + "-Mitglieder").indexOf(supp_spieler_name) > -1) {
							// Eigenes Dorf (Grün):
							if(GM_getValue("W" + welt + "-Nick") == supp_spieler_name) {
								var stamm = "<a href='" + pfad_diplo + "'><img src='" + icon_stamm_eigen + "' title='" + supp_dorf_name + " ist Dein eigenes Dorf' style='height:12px;'></a>";	
							}
							// Fremdes Dorf (Blau):
							else {
								var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_stamm + "' title='" + supp_spieler_name + " ist Mitglied Deines Stammes: &bdquo;" + supp_stamm_name + "&rdquo;' style='height:12px;'></a>";	
							}
						}
						// Fremder Stamm (Grau / Rot):
						else {
							// Barbarendorf:
							if(barbar == 1) {
								var stamm = "<img src='" + icon_stamm_barbar + "' title='Barbarendorf' style='height:12px;'>";	
							}
							// Sonstige Dörfer:
							else {
								if(GM_getValue("W" + welt + "-Stamm-Typ-" + supp_stamm_id) == "Verbündete") {
									var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_bnd + "' title='BND - verbündeter Stamm: &bdquo;" + supp_stamm_name + "&rdquo;' style='height:12px;'></a>";	
								}
								else if(GM_getValue("W" + welt + "-Stamm-Typ-" + supp_stamm_id) == "Nicht-Angriffs-Pakt (NAP)") {
									var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_nap + "' title='NAP - Nicht-Angriffs-Pakt: &bdquo;" + supp_stamm_name + "&rdquo;' style='height:12px;'></a>";	
								}
								else if(GM_getValue("W" + welt + "-Stamm-Typ-" + supp_stamm_id) == "Feinde") {
									var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_feind + "' title='Feind! - feindlicher Stamm: &bdquo;" + supp_stamm_name + "&rdquo;' style='height:12px;'></a>";	
								}
								else {
									var stamm = "<a href='" + pfad_stamm + "&id=" + supp_stamm_id + "'><img src='" + icon_stamm_fremd + "' title='Achtung! - fremder Stamm: &bdquo;" + supp_stamm_name + "&rdquo;' style='height:12px;'></a>";	
								}
							}
						}
					}
					// Keine Mitgliederliste gespeichert (Grau):
					else {
						var stamm = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_dorf_id + "&screen=ally&mode=members' target='Mitglieder'><img src='" + LED_grau + "' title='Die Mitglieder Deines Stammes wurden noch nicht gespeichert' style='height:12px;'></a>";	
					}
					
					// Infotabelle erweitern:
					info += "<tr>"
					info += "<td style='text-align:right;background-color:#F7EED3;'>" + i + ".</td>"
					info += "<td style='background-color:#F7EED3;'><a" + zeile.getElementsByTagName("td")[0].innerHTML.split("<a")[1] + "</td>"
					info += "<td style='background-color:#F7EED3;'>" + stamm + "</td>"
	
					// Spielerlink einfügen
					// Name bekannt:
					if(supp_spieler_name != "unbekannt") {
						var neu_td_b = "";
						if(GM_getValue("Entfernungen-" + welt) == "an") {
							neu_td_b += "</td><td title='Entfernung' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + entfernung + "</small>";
							colspan++;
						}
						if(GM_getValue("Letzte-Supp-" + welt) == "an") {
							neu_td_b += "</td><td title='" + bericht_datum_titel + "' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + bericht_datum + "</small>";
							colspan++;
						}
						if(GM_getValue("Letzte-Deff-" + welt) == "an") {
							neu_td_b += "</td><td title='" + angriff_datum_titel + "' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + angriff_datum + "</small>";
							colspan++;
						}
						if(GM_getValue("Verlustanzeige-" + welt) == "an") {
							neu_td_b += "</td><td title='Bisherige Angriffe: " + angriffe + " / Verluste: " + verluste + "' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + verlustanzeige + "</small>";
							colspan = colspan+1;
						}
						
						if(GM_getValue("W" + welt + "-Nick") == supp_spieler_name) {
							zeile.innerHTML = zeile.innerHTML.replace(/<\/a>/, "</a></td><td style='background-color:#F7EED3;'>" + stamm + "</td><td style='background-color:#F7EED3;'><a href='" + pfad_spieler + supp_spieler_id + "' title='Zu Deinem Profil'>" + supp_spieler_name + "</a>" + neu_td_b);
						}
						else {
							zeile.innerHTML = zeile.innerHTML.replace(/<\/a>/, "</a></td><td style='background-color:#F7EED3;'>" + stamm + "</td><td style='background-color:#F7EED3;'><a href='" + pfad_spieler + supp_spieler_id + "' title='Zum Profil von " + supp_spieler_name +"'>" + supp_spieler_name + "</a>" + neu_td_b);
						}
						
						// Infotabelle erweitern:
						info += "<td style='background-color:#F7EED3;'><a href='" + pfad_spieler + supp_spieler_id + "'>" + supp_spieler_name + "</a></td>";
					}
					// Name unbekannt:
					else {
						var neu_td_u = "";
						if(GM_getValue("Entfernungen-" + welt) == "an") {
							neu_td_u += "</td><td title='Entfernung' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + entfernung + "</small>";
							colspan++;
						}
						if(GM_getValue("Letzte-Supp-" + welt) == "an") {
							neu_td_u += "</td><td title='" + bericht_datum_titel + "' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + bericht_datum + "</small>";
							colspan++;
						}
						if(GM_getValue("Letzte-Deff-" + welt) == "an") {
							neu_td_u += "</td><td title='" + angriff_datum_titel + "' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + angriff_datum + "</small>";
							colspan++;
						}
						if(GM_getValue("Verlustanzeige-" + welt) == "an") {
							neu_td_u += "</td><td title='Bisherige Angriffe: " + angriffe + " / Verluste: " + verluste + "' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + verlustanzeige + "</small>";
							colspan++;
						}
						
						zeile.innerHTML = zeile.innerHTML.replace(/<\/a>/, "</a></td><td>" + stamm + "</td><td style='background-color:#F7EED3;'>Barbar" + neu_td_u);				
						
						// Infotabelle erweitern:
						info += "<td style='background-color:#F7EED3;'>Barbar</td>";
					}
					
					// Infotabelle erweitern:
					if(GM_getValue("Entfernungen-" + welt) == "an") {
						info += "<td style='text-align:right; background-color:#F7EED3;' title='Entfernung'><small>" + entfernung + "</small></td>";
					}
					if(GM_getValue("Letzte-Supp-" + welt) == "an") {
						info += "<td style='text-align:right; background-color:#F7EED3;' title='Datum der letzten Unterstützung'><small>" + bericht_datum + "</small></td>";
					}
					if(GM_getValue("Letzte-Deff-" + welt) == "an") {
						info += "<td style='text-align:right; background-color:#F7EED3;' title='Datum des letzten Angriffs'><small>" + angriff_datum + "</small></td>";
					}
					if(GM_getValue("Verlustanzeige-" + welt) == "an") {
						info += "<td style='text-align:right; background-color:#F7EED3;' title='Angriffe / Verluste'><small>" + verlustanzeige + "</small></td>";
					}
					
					// Einheiten:
					for(var e=0; e<einheiten; e++) {
						info += "<td style='text-align:right; background-color:#F7EED3;' class='" + zeile.getElementsByTagName("td")[e+colspan].getAttribute("class") + "'>";
						info += zeile.getElementsByTagName("td")[e+colspan].innerHTML;
						info += "</td>";
					}
				}
				
				
				// Spieler nicht gespeichert:
				else {
					// Spielerlink einfügen
					var neu_td_n = "";
					if(GM_getValue("Letzte-Supp-" + welt) == "an") {
						neu_td_n += "</td><td title='" + bericht_datum_titel + "' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + bericht_datum + "</small>";
							colspan++;
					}
					if(GM_getValue("Letzte-Deff-" + welt) == "an") {
						neu_td_n += "</td><td title='" + angriff_datum_titel + "' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + angriff_datum + "</small>";
							colspan++;
					}
					if(GM_getValue("Verlustanzeige-" + welt) == "an") {
						neu_td_n += "</td><td title='Bisherige Angriffe: " + angriffe + " / Verluste: " + verluste + "' style='text-align:right; background-color:#F7EED3; cursor:help;'><small>" + verlustanzeige + "</small>";
							colspan++;
					}				
					
					zeile.innerHTML = zeile.innerHTML.replace(/<\/a>/, "</a></td><td colspan='2' style='background-color:#F7EED3;'><a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_dorf_id + "&screen=report&mode=support' target='Berichte' title='Der unterstützte Spieler wurde noch nicht eingelesen.' style='color:#C00'>unbekannt</a>" + neu_td_n);
					
					// Infotabelle erweitern:
					info += "<tr>";
					info += "<td style='text-align:right; background-color:#F7EED3;'>" + i + ".</td>";
					info += "<td style='background-color:#F7EED3;'>" + zeile.getElementsByTagName("td")[0].innerHTML + "</td>";
					info += "<td colspan='4' style='background-color:#F7EED3;'><b style='color:#C00;'>unbekannt</b></td>";
				}
				
				// Testausgabe:
				if(i == 1) {
					testinfo += "Datum:\t\t" + heute + "\n";
					testinfo += "\n";
					testinfo += "Aktuelles Dorf:\n";
					testinfo += "Dorf:\t\t" + akt_dorf_name + "\n";
					testinfo += "Dorf-ID:\t\t" + akt_dorf_id + "\n";
					testinfo += "X|Y:\t\t\t" + akt_dorf_posx + "|" + akt_dorf_posy + "\n";
					testinfo += "Kontinent:\t" + akt_dorf_kont + "\n";
				}
				testinfo += "\n";
				testinfo += "--------------------------------------------------";
				testinfo += "\n";
				testinfo += "Unterstütztes Dorf:\n";
				testinfo += "Spieler:\t\t" + supp_spieler_name + "\n";
				testinfo += "Spieler-ID:\t" + supp_spieler_id + "\n";
				testinfo += "Stamm-Tag:\t" + supp_stamm_tag + "\n";
				testinfo += "Stamm-Name:\t" + supp_stamm_name + "\n";
				testinfo += "Stamm-ID:\t" + supp_stamm_id + "\n";
				testinfo += "Dorf:\t\t" + supp_dorf_name + "\n";
				testinfo += "Dorf-ID:\t\t" + supp_dorf_id + "\n";
				testinfo += "X|Y:\t\t\t" + supp_dorf_posx + "|" + supp_dorf_posy + "\n";
				testinfo += "Kontinent:\t" + supp_dorf_kont + "\n";
				testinfo += "\n";
				testinfo += "Sicherheitsinfo:\n";
				testinfo += "X|Y-Name:\t" + secure_name + "\n";
				testinfo += "Check:\t\t" + rename_check + "\n";
				testinfo += "\n";
				testinfo += "Verteidigung:\n";
				testinfo += "letzter Angriff:\t" + letzter_angriff + "\n";
				testinfo += "\n";
				testinfo += "Einstellungen:\n";
				testinfo += "Dorfname:\t" + GM_getValue("Neuname-" + welt) + "\n";
				testinfo += "letzter Supp:\t" + GM_getValue("Letzte-Supp-" + welt) + "\n";
				testinfo += "letzter Deff:\t" + GM_getValue("Letzte-Deff-" + welt) + "\n";
				testinfo += "Verluste:\t\t" + GM_getValue("Verlustanzeige-" + welt) + "\n";
			} // for-ENDE
			
			
			// Koordinatenliste:
			GM_setValue("Koordinatenliste-" + akt_dorf_id, koordinatenliste);
			
			
			var doerfer = tabelle.getElementsByTagName("tr").length-1;
			var einheiten = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th").length-colspan;
			
			var gesamtzeile = "";
			gesamtzeile += "<tr>";
			gesamtzeile += "<th colspan='" + colspan + "' style='text-align:center; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'>";
			gesamtzeile += "Gesamtzahl der unterstützenden Truppen:&ensp;";
			gesamtzeile += "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_dorf_id + "&screen=settings&mode=settings&einstellung=unterstuetzungen'>";
			gesamtzeile += "<img src='http://www.die-staemme.de/graphic/buildings/garage.png' height='12px' />";
			gesamtzeile += "</a>";
			gesamtzeile += "</th>";
			for(var g=0; g<einheiten; g++) {
				var gesamtzahl = 0;
				for(var d=1; d<=doerfer; d++) {
					gesamtzahl += parseInt(tabelle.getElementsByTagName("tr")[d].getElementsByTagName("td")[g+colspan].innerHTML);
				}
				
				if(gesamtzahl == 0) {
					var gesamtclass = "hidden";
				}
				else {
					var gesamtclass = "";
				}
				gesamtzeile += "<th class='" + gesamtclass + "' style='text-align:right;'>";
				gesamtzeile += gesamtzahl;
				gesamtzeile += "</th>";
				
				info_gesamt += "<th class='" + gesamtclass + "' style='text-align:right;'>";
				info_gesamt += gesamtzahl;
				info_gesamt += "</th>";
			}
			gesamtzeile += "<th>Zurückrufen</th>";
			gesamtzeile += "</tr>";
			tabelle.innerHTML = tabelle.innerHTML + gesamtzeile;
			
			// Anzahl der Unterstützungen um 1 erhöhen:
			x++;
					
					
			// Infotabelle schliessen:
			info += "<tr>";
			info += "<td colspan='" + (pos+2) + "'>";
			info += "<small style='color:#666;'>Letzte Aktualisierung der Daten:</small> ";
			info += "<small>" + heute + "</small> ";
			info += "<small style='color:#666;'> um </small>";
			info += "<small>" + uhrzeit + " Uhr</small>";
			info += "</td>";
			info += info_gesamt;
			info += "</tr>";
			info += "</table>";
			
			// Testausgabe:
			if(test) {
				alert(testinfo);
			}
		}
		// Keine auswärtigen Truppen
		else {
			var zeilen = 1;
			// Infotabelle erweitern:
			info += "<tr>";
			info += "<td style='max-width:10px; text-align:right; background-color:#F7EED3;'>0.</td>";
			info += "<td style='background-color:#F7EED3;'>Momentan sind keine auswärtigen Truppen gespeichert</td>";
			info += "</tr>";
			
			// Infotabelle schliessen:
			info += "<tr>";
			info += "<td colspan='2'>";
			info += "<small style='color:#666;'>Letzte Aktualisierung der Daten:</small> ";
			info += "<small>" + heute + "</small> ";
			info += "<small style='color:#666;'> um </small>";
			info += "<small>" + uhrzeit + " Uhr</small>";
			info += "</td>";
			info += "</table>";
		}
		
		
		// Werte als GM-Value speichern:
		// Info:
		GM_setValue("W" + welt + "-Info-" + akt_dorf_id, info);
		// Anzahl der Unterstützungen:
		if(zeilen == undefined) {
			zeilen = 1;
		}
		GM_setValue("W" + welt + "-Zahl-" + akt_dorf_id, zeilen-1);
	}
	
	
	
	
	
	//**************************************//
	//										//
	// Ausgabe (Dörferübersicht):			//
	//										//
	//**************************************//
	if(url.match(/screen=overview_villages*/)) {
		// Höhe der Kopfzeile anpassen:
		document.getElementById("menu_row2").setAttribute("style", "height:28px;");
	
	
		// PA:
		var pa_info = 0;
		var pa_test = document.getElementById("overview");
	
		// Ohne PA:   
		if(pa_test == null) {
			pa_info = 1;
		}
		// Mit PA:   
		else {
			// Angezeigte Übersicht ermitteln:
			var pa_view = document.getElementsByClassName("main")[0].getElementsByClassName("vis")[0].getElementsByClassName("selected")[0].getElementsByTagName("a")[0].innerHTML;
			// Wenn Anzeige = Produktion:
			if(pa_view == "Kombiniert ") {
				pa_info = 2;
			}
		}

		// Dörfertabelle:
		var vis = document.getElementsByClassName("vis").length;
		
		// Anzeige:
		if(pa_info > 0) {
			// Ohne PA:
			if(pa_info == 1) {
				start_y = 124;
				// Tabelle auswählen:
				if(vis == 3) {
					vis = 1;
				}
				else {
					vis = 0;
				}
			}
			// Mit PA:
			else if(pa_info == 2) {
				var quickbar = document.getElementsByClassName("quickbar").length;

				if(quickbar == 1) {
					start_y = 190;
				}
				else {
					start_y = 143;
				}
				// Tabelle auswählen:
				if(vis == 4) {
					//vis = vis -3;
					vis = vis -1; 			// DS 6.5
				}
				else {
					vis = vis -2;
				}
			}
			
			if(GM_getValue("Y-Startwert-" + welt) != undefined) {
				start_y = parseInt(GM_getValue("Y-Startwert-" + welt));
			}
			
			// Dörfertabelle:
			var tabelle = document.getElementsByClassName("vis")[vis];
			
			// "DS - Speicherstände" wird verwendet
			if(tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML == "Dörfer Welt-" + welt) {
				var zeilen = tabelle.getElementsByTagName("tr").length-2;
			}
			// Ohne "DS - Speicherstände"
			else {
				var zeilen = tabelle.getElementsByTagName("tr").length;
			}
			
			if(pa_info == 2) {
				zeilen--;
			}
		
			// Kopfzeile um Support-Symbol erweitern:
			tabelle.getElementsByTagName("tr")[0].innerHTML += "<th style='width:25px; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='http://www.die-staemme.de/graphic/command/support.png' title='Anzahl der unterstützten Dörfer'></th>";
			
			// Dörferliste:
			var dorfliste = GM_getValue("W" + welt + "-Dorfliste");
			var dorfnamen = "";
			if(dorfliste == undefined) {
				dorfliste = "";
			}
			
			if(zeilen < 1) {
				zeilen = 1;
			}
			// Gesamtzahl der Unterstützungen:
			var gesamt = 0;
			
			// Dörfer durchlaufen:
			for (var i=1; i<=zeilen; i++) {
				// Aktuelle Dorf-ID:
				var akt_id = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.split("village=")[1].split("&screen=")[0];
				// Aktueller Dorfname:
				var akt_dorfname = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML.split(" ");
				
				// Teile ermitteln:
				var teile = akt_dorfname.length-2;
				var dorfname = "";
				
				// Teile ohne Koordinaten und Kontinent zusammensetzen:
				for(var t=0; t<teile; t++) {
					if(t>0) {
						dorfname += " ";
					}
					dorfname += akt_dorfname[t];
				}
				var dorfxy = akt_dorfname[teile].split("(")[1].split(")")[0];
				var dorfkonti = akt_dorfname[teile+1].split("K")[1];
				
				// Dorfliste:
				if(dorfliste.indexOf(akt_id) == -1) {
					if(dorfliste != "") {
						dorfliste += ",";
					}
					dorfliste += akt_id;
				}
				
				// Werte als GM-Value speichern:
				GM_setValue("W" + welt + "-Dorf-Name-" + akt_id, dorfname);
				GM_setValue("W" + welt + "-Dorf-XY-" + akt_id, dorfxy);
				GM_setValue("W" + welt + "-Dorf-Konti-" + akt_id, dorfkonti);
			
				// Wert vorhanden:
				if(GM_getValue("W" + welt + "-Zahl-" + akt_id) != undefined) {
					if(GM_getValue("W" + welt + "-Zahl-" + akt_id) == 0) {
						var akt_deff = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_id + "&screen=place&mode=units' style='font-weight:100; color:#808080;'>" + GM_getValue("W" + welt + "-Zahl-" + akt_id) + "</a>";
					}
					else {
						var akt_deff = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_id + "&screen=place&mode=units'>" + GM_getValue("W" + welt + "-Zahl-" + akt_id) + "</a>";
					}
					gesamt += GM_getValue("W" + welt + "-Zahl-" + akt_id);
				}
				// Kein Wert gespeichert:
				else {
					var akt_deff = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_id + "&screen=place&mode=units'>???</a>";
				}
				
				// Infobox erstellen:
				var infobox = document.createElement("div");
				infobox.setAttribute("id", "infobox_" + akt_id);
				infobox.setAttribute("style", "width:0px; height:0px; visibility:hidden;");
				
				// Infos sind vorhanden:
				if(GM_getValue("W" + welt + "-Info-" + akt_id) != undefined) {
					infotabelle = GM_getValue("W" + welt + "-Info-" + akt_id);
					
					var letzte = infotabelle.split("Daten:</small>")[1].split("<small>")[1].split("</small>")[0];
					
					var status_txt = "";
					var status_led = "";
					if(letzte == heute) {
						status_led += "<img src='" + LED_gruen + "' title='Aktuell' />";
						status_txt += "<b style='padding-left:2px; color:#090;'>Aktuell</b>";
					}
					else {			
						status_led += "<img src='" + LED_rot + "' title='Nicht Aktuell' />";
						status_txt += "<b style='padding-left:2px; color:#C00;'>Nicht Aktuell</b>";
					}
					
					// Status in Infotabelle einfügen:
					infotabelle = infotabelle.replace("Letzte", status_led + status_txt + " - Letzte");
				}
				// Keine Infos gespeichert:
				else {
					akt_deff = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_id + "&screen=place&mode=units'>???</a>";
					
					infotabelle = "<table>";
					infotabelle += "<tr><th>" + vers_ist + "</th></tr>";
					infotabelle += "<tr><td>Bisher wurden noch keine Informationen</td></tr>";
					infotabelle += "<tr><td>über Deine auswärtigen Truppen gespeichert.</td></tr>";
					infotabelle += "<tr><td>Zum speichern der Daten einfach <i><b>klicken</b></i>.</td></tr>";
					infotabelle += "</table>";
				}
				// Infotabelle in Box einfügen:
				infobox.innerHTML = infotabelle;
				
				// Infobox in Document einfügen:
				document.getElementsByClassName("main")[0].appendChild(infobox);
					
					
				// Position:
				var pos_x = 0;
				var pos_y = start_y+(22*vis)+(22*i);
				
				// An Zeile anhängen:
				tabelle.getElementsByTagName("tr")[i].innerHTML += "<td style='text-align:right;'  onmouseover='javascript:document.getElementById(\"infobox_" + akt_id + "\").setAttribute(\"style\", \"position:absolute; top:" + pos_y + "px; right:" + pos_x + "px; padding:2px; background:url(http://www.die-staemme.de/graphic/background/content.jpg); border:1px outset #C0C0C0; z-index:100; visibility:visible; -moz-border-radius:10px;\");' onmouseout='javascript:document.getElementById(\"infobox_" + akt_id + "\").setAttribute(\"style\", \"width:0px; height:0px; visibility:hidden;\");'> " + akt_deff + " </td>";
			}
				
			// Gesamtzahl anhängen: (Nur in kombination mit "DS - Speicherstände")
			if(tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML.indexOf("Dörfer Welt-" + welt) > -1) {
				tabelle.getElementsByTagName("tr")[zeilen+1].innerHTML += "<th title='Gesamtzahl aller Unterstützungen' style='cursor:help; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'>" + gesamt + "</th>";
			}
			
			// Werte als GM-Value speichern:
			GM_setValue("W" + welt + "-Dorfliste", dorfliste);
			
			// Testinfo erweitern:
			testinfo += "VIS:\t\t\t" + vis;
			testinfo += "\n";
			testinfo += "Dörfer:\t\t" + zeilen;
			testinfo += "\n";
			testinfo += "PA:\t\t\t" + pa_info;
			testinfo += "\n";
			testinfo += "Dorf-IDs:\t\t" + dorfliste.replace(/,/g, "\n\t\t\t");
			
			// Testinfo anzeigen:
			if(test) {
				alert(testinfo);
			}
		}
	}
	
	
	
	
	
	//**************************************//
	//										//
	// Ausgabe (Dorfansicht):				//
	//										//
	//**************************************//
	if(url.match(/screen=info_village/)) {
		// Tabelle:
		var tabelle = document.getElementsByClassName("vis")[0];
		
		// Dorfname:
		var dorf_name = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML;
		
		// Dorf-ID:
		var dorf_id = url.split("id=")[1];
		
		// Koordinaten und Kontinent:
		var koordinaten  = tabelle.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
		var koord_xy     = koordinaten.split("|");
		var kontinent    = (koord_xy[1].length<3?"0":koord_xy[1][0]) + (koord_xy[0].length<3?"0":koord_xy[0][0]);
		
		var spieler_link = tabelle.getElementsByTagName("tr")[3].getElementsByTagName("td")[1].getElementsByTagName("a")[0];
		var spieler_name = spieler_link.innerHTML;
		// Spieler:
		if(spieler_name != "") {
			// Spieler:
			var spieler_id   = spieler_link.href.split("id=")[1];
			// Stamm:
			var stamm_link   = tabelle.getElementsByTagName("tr")[4].getElementsByTagName("td")[1].getElementsByTagName("a")[0];
			var stamm_name   = stamm_link.innerHTML;
			var stamm_id     = stamm_link.href.split("id=")[1];
		}
		// Barbar:	
		else {
			var spieler_name = "unbekannt";
			var spieler_id   = "0";
			// Stamm:
			var stamm_name   = "kein Stamm";
			var stamm_id     = "0";
		}
		
		// Werte als GM-Value speichern:
		// Spieler:
		GM_setValue("W" + welt + "-Spieler-Name-" + spieler_id, spieler_name);
		GM_setValue("W" + welt + "-Spieler-Stamm-" + spieler_id, stamm_id);
		GM_setValue("W" + welt + "-Stamm-Name-" + stamm_id, stamm_name);
		GM_setValue("W" + welt + "-Spieler-Datum-" + spieler_id, heute);
		// Dorf:
		GM_setValue("W" + welt + "-Dorf-Name-" + dorf_id, dorf_name);
		GM_setValue("W" + welt + "-Dorf-Spieler-" + dorf_id, spieler_id);
		GM_setValue("W" + welt + "-Dorf-Datum-" + dorf_id, heute);
		
		
		// 
		var dorfliste = GM_getValue("W" + welt + "-Dorfliste");
		var tab2 = "";
		tab2 += "<table style='margin-left:10px;' id='truppentabelle'>";
		
		// Dorfliste nicht gespeichert:
		if(dorfliste == undefined) {
			tab2 += "<tr>";
			tab2 += "<th>" + vers_ist + "</th>";
			tab2 += "</tr>";
			
			tab2 += "<tr>";
			tab2 += "<td>Die Liste Deiner Dörfer wurde noch nicht gespeichert.</td>";
			tab2 += "</tr>";
			
			tab2 += "<tr>";
			tab2 += "<td>Zum speichern der Liste einfach die <a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_dorf_id + "&screen=overview_villages&mode=combined'>Dörferübersicht</a> aufrufen.</td>";
			tab2 += "</tr>";
		}
		
		// Dorfliste gespeichert:
		else {
			var cols = 3;
			tab2 += "<tr>";
			tab2 += "<th style='text-align:center; -moz-border-radius-topleft:10px;'>Deff&nbsp;aus&nbsp;Dorf</th>";
			tab2 += "<th style='text-align:center;'>X|Y</th>";
			tab2 += "<th style='text-align:center; -moz-border-radius-topright:10px;'>K</th>";
			if(GM_getValue("Entfernungen-" + welt) == "an") {
				tab2 += "<th style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='" + icon_entfernung + "'></th>";
				cols++;
			}
			if(GM_getValue("Letzte-Supp-" + welt) == "an") {
				tab2 += "<th style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='" + icon_support + "'></th>";
				cols++;
			}
			if(GM_getValue("Letzte-Deff-" + welt) == "an") {
				tab2 += "<th style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='" + icon_angriff + "'></th>";
				cols++;
			}
			if(GM_getValue("Verlustanzeige-" + welt) == "an") {
				tab2 += "<th style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='" + icon_verlust + "' style='height:14px;'></th>";
				cols++;
			}
			tab2 += "<th style='width:30px; text-align:center; -moz-border-radius-topleft:10px;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_spear.png' style='height:14px;'></th>";
			tab2 += "<th style='width:30px; text-align:center;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_sword.png' style='height:14px;'></th>";
			tab2 += "<th style='width:30px; text-align:center;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_axe.png' style='height:14px;'></th>";
			tab2 += "<th style='width:30px; text-align:center;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_archer.png' style='height:14px;'></th>";
			tab2 += "<th style='width:30px; text-align:center;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_spy.png' style='height:14px;'></th>";
			tab2 += "<th style='width:30px; text-align:center;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_light.png' style='height:14px;'></th>";
			tab2 += "<th style='width:30px; text-align:center;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_marcher.png' style='height:14px;'></th>";
			tab2 += "<th style='width:30px; text-align:center;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_heavy.png' style='height:14px;'></th>";
			tab2 += "<th style='width:30px;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_ram.png' style='height:14px;'></th>";
			tab2 += "<th style='width:30px; text-align:center;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_catapult.png' style='height:14px;'></th>";
			if(welt > 19){
				tab2 += "<th style='width:30px; text-align:center;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_knight.png' style='height:14px;'></th>";
			}
			tab2 += "<th style='width:30px; text-align:center; -moz-border-radius-topright:10px;'><img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_snob.png' style='height:14px;'></th>";
			tab2 += "</tr>";
			
			var dorf = dorfliste.split(",");
			var count = 0;
			
			// Alle Dörfer durchlaufen:
			for(var d=0; d<dorf.length; d++) {
				// Dorfinfo auslesen
				var dorf_info = GM_getValue("W" + welt + "-Info-" + dorf[d]);
				
				// 
				if(dorf_info.indexOf(dorf_id) > -1) {
					// Dorfname auslesen
					var von_dorf_name = "<a href='" + pfad_dorf + dorf[d] + "'>" + GM_getValue("W" + welt + "-Dorf-Name-" + dorf[d]) + "</a>";
	
					// 
					var infozeile = dorf_info.split("<tr>");
					var supp_info = "";
					
					// 
					for(var z=1; z<infozeile.length; z++) {
						// 
						if((infozeile[z].indexOf(dorf_id) > -1)  && 
						   (infozeile[z].indexOf(dorf_name) > -1)) {
							count++;
							var infozelle = infozeile[z].split("</td>");
							supp_info += "<td>" + von_dorf_name + "</td>";
							supp_info += "<td style='text-align:center;'>";
							supp_info += "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_dorf_id + "&screen=map&x=" + GM_getValue("W" + welt + "-Dorf-XY-" + dorf[d]).split("|")[0] + "&y=" + GM_getValue("W" + welt + "-Dorf-XY-" + dorf[d]).split("|")[1] + "'>";
							supp_info += GM_getValue("W" + welt + "-Dorf-XY-" + dorf[d]);
							supp_info += "</a>";
							supp_info += "</td>";
							supp_info += "<td style='text-align:right;'>" + GM_getValue("W" + welt + "-Dorf-Konti-" + dorf[d]);
							for(var z=4; z<infozelle.length; z++) {
								supp_info += "</td>" + infozelle[z];
							} // for-ENDE
						} // if-ENDE
					} // for-ENDE
					
					tab2 += "<tr>";
					tab2 += supp_info;
					tab2 += "</tr>";
				} // if-ENDE
			} // for-ENDE
			
			var infozeile = dorf_info.split("<tr>");
			if((count == 0)) {
				tab2 += "<tr>";
				tab2 += "<td colspan='" + cols + "'>Momentan wird dieses Dorf nicht von Dir unterstützt.</td>";
				var infozelle = infozeile[0].split("</th>");
				
				for(var z=0; z<infozelle.length-7; z++) {
					tab2 += "<td style='text-align:right;' class='hidden'>0</td>";
				}
				tab2 += "</tr>";
			}
		} // else-ENDE
		
		tab2 += "</table>";
		tabelle.getElementsByTagName("tr")[0].innerHTML = tabelle.getElementsByTagName("tr")[0].innerHTML + "<td rowspan='30' style='padding:0px; padding-left:10px; vertical-align:top; background-image: url(" + pfad_bilder + "background/content.jpg); overflow:visible;'>" + tab2 + "</td>";
		
		
		// Gesamt:
		var truppen_tabelle = document.getElementById("truppentabelle");
		var truppen_zeilen = truppen_tabelle.getElementsByTagName("tr").length;
		var truppen_zahl = truppen_tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th").length;
		
		var truppen_gesamt = "<tr>";
		truppen_gesamt += "<th colspan='" + cols + "' style='text-align:left; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'>&ensp;Gesamtzahl der unterstützenden Truppen:&ensp;";
		truppen_gesamt += "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + akt_dorf_id + "&screen=settings&mode=settings&einstellung=unterstuetzungen'>";
		truppen_gesamt += "<img src='http://www.die-staemme.de/graphic/buildings/garage.png' height='12px' />";
		truppen_gesamt += "</a>";
		truppen_gesamt += "&ensp;</th>";
	
		
			
		for(var g=cols; g<truppen_zahl; g++) {
			var gesamtzahl = 0;
			for(var z=1; z<truppen_zeilen; z++) {
				gesamtzahl += parseInt(truppen_tabelle.getElementsByTagName("tr")[z].getElementsByTagName("td")[g].innerHTML);
			}
			
			if(g == 6) {
				var rund_l = 10;
			}
			else {
				var rund_l = 0;
			}
			if(g == truppen_zahl-1) {
				var rund_r = 10;			
			}
			else {
				var rund_r = 0;
			}
			
			if(gesamtzahl > 0) {
				truppen_gesamt += "<th style='text-align:right; -moz-border-radius-bottomleft:" + rund_l + "px; -moz-border-radius-bottomright:" + rund_r + "px;'>" + gesamtzahl + "</th>";
			}
			else {
				truppen_gesamt += "<th style='text-align:right; color:#ded3b9; -moz-border-radius-bottomleft:" + rund_l + "px; -moz-border-radius-bottomright:" + rund_r + "px;'>" + gesamtzahl + "</th>";
			}
		}
		truppen_tabelle.innerHTML = truppen_tabelle.innerHTML + truppen_gesamt + "</tr>";
			
		// Testausgabe:
		if(test) {
			testinfo += "Datum:\t\t" + heute + "\n";
			testinfo += "\n";
			testinfo += "Aktuelles Dorf:\n";
			testinfo += "Spieler:\t\t" + spieler_name + "\n";
			testinfo += "Spieler-ID:\t" + spieler_id + "\n";
			testinfo += "Stamm-Name:\t" + stamm_name + "\n";
			testinfo += "Stamm-ID:\t" + stamm_id + "\n";
			testinfo += "Dorf:\t\t" + dorf_name + "\n";
			testinfo += "Dorf-ID:\t\t" + dorf_id + "\n";
			testinfo += "X|Y:\t\t\t" + koord_xy[0] + "|" + koord_xy[1] + "\n";
			testinfo += "Kontinent:\t" + kontinent + "\n";
			alert(testinfo);
		}
	}
	
	
	
	
	
	//**************************************//
	//										//
	// Diplomatische Beziehungen			//
	// auslesen und speichern:				//
	//										//
	//**************************************//
	if(url.match(/mode=contracts/)) {
		var testinfo = "";
		for (i=1; i<=3; i++) {
			// Aktuelle Tabelle festlegen:
			var tabelle   = document.getElementsByClassName("vis")[i];
			// Stämme der aktuellen Kategorie zählen:
			var zeilen    = tabelle.getElementsByTagName("tr").length;
			
			// Kategorie ermitteln:
			var stamm_typ = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML;
			
			// Testinfo erweitern:
			testinfo += "\n\n" + stamm_typ + ":\n";
			
			// Alle Stämme der Kategorie durchlaufen:
			for(j=1; j<zeilen; j++) {
				// Zeile festlegen:
				var zeile = tabelle.getElementsByTagName("tr")[j];
				// Stammesdaten
				var stamm_id = zeile.getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.split("id=")[1];
				var stamm_tag = zeile.getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
				
				// Werte als GM-Value speichern:
				GM_setValue("W" + welt + "-Stamm-Typ-" + stamm_id, stamm_typ);
				GM_setValue("W" + welt + "-Stamm-Tag-" + stamm_id, stamm_tag);
		
				// Testinfo erweiitern
				testinfo += stamm_tag + "\t\t(" + stamm_id + ")\n";
			}
		}
		
		// Ausgabe Testinfo:
		if(test) {
			alert("Diplo: " + testinfo);
		}
	}
	
	
	
	
	
	//**************************************//
	//										//
	// Stamm Übersicht:						//
	//										//
	//**************************************//
	if(url.match(/screen=info_ally/)) {
		// Stammes-ID:
		var stamm_id = url.split("id=")[1];
		
		var tabelle    = document.getElementsByClassName("vis")[0];
		var stamm_name = tabelle.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
		var stamm_tag  = tabelle.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML;
	
	
		// Stammes-Typ:
		var stamm_typ = GM_getValue("W" + welt + "-Stamm-Typ-" + stamm_id);
	
		// Werte als GM-Value speichern:
		GM_setValue("W" + welt + "-Stamm-Name-" + stamm_id, stamm_name);
		GM_setValue("W" + welt + "-Stamm-Tag-" + stamm_id, stamm_tag);
	
		//
		switch(stamm_typ) {
				case "Verbündete":
				var bild = "<img src='" + icon_stamm_bnd + "' title='" + stamm_typ + "'>";
				break;
				
				case "Nicht-Angriffs-Pakt (NAP)":
				var bild = "<img src='" + icon_stamm_nap + "' title='" + stamm_typ + "'>";
				break;
				
				case "Feinde":
				var bild = "<img src='" + icon_stamm_feind + "' title='" + stamm_typ + "'>";
				break;
				
				default:
				var bild = "";
		}
		
		// Symbol in Überschrift einfügen:
		document.getElementsByTagName("h2")[0].innerHTML = bild + " " + document.getElementsByTagName("h2")[0].innerHTML;
		document.getElementsByTagName("h2")[0].setAttribute("style", "margin-left:10px;");
	
		// Testinfo ausgeben:
		if(test) {
			// Testinfo erweitern:
			testinfo += "Stamm-Name:\t" + stamm_name + "\n";
			testinfo += "Stamm-Tag:\t" + stamm_tag + "\n";
			testinfo += "Stamm-Typ:\t" + stamm_typ + "\n";
			
			alert(testinfo);
		}
	}
	
	
	
	
	
	//**************************************//
	//										//
	// Karte:								//
	//										//
	//**************************************//
	if(url.match(/screen=map/) && 
		GM_getValue("Kartenmarkierungen-" + welt) == "an") {
		// Stammes-ID:
		var stamm_id = url.split("id=")[1];
		
		// Dorfliste;
		var dorfliste = GM_getValue("W" + welt + "-Dorfliste").split(",");
		
		// Kartentabelle:
		var karte = document.getElementsByClassName("map")[0];
		var zeilen = karte.getElementsByTagName("tr").length;
		var spalten = karte.getElementsByTagName("tr")[0].getElementsByTagName("td").length;	
		
		// Testinfo erweitern:
		testinfo += "Karte:\n";
		testinfo += "\n";
		testinfo += "Zeilen:\t\t" + zeilen + "\n";
		testinfo += "Spalten:\t\t" + spalten + "\n";
	
		// Y-Achse:
		for(var y=0; y<zeilen; y++) {
			// Zeile:
			var zeile = karte.getElementsByTagName("tr")[y];
			// X-Achse:
			for(var x=0; x<spalten; x++) {
				// Zelle:
				var zelle     = zeile.getElementsByTagName("td")[x];
				var links     = zelle.getElementsByTagName("a").length;
				
				if(links > 0) {
					var dorf_icon = zelle.getElementsByTagName("img")[0];
					var dorf_bild = zelle.getElementsByTagName("img")[1];
					var dorf_link = zelle.getElementsByTagName("a")[0];
					var dorf_name = dorf_link.getAttribute("onmouseover").split("'")[1];
					var dorf_id   = dorf_link.href.split("id=")[1];
					
					var supp = 0;
					for(var i=0; i<dorfliste.length; i++) {
						var info = GM_getValue("W" + welt + "-Info-" + dorfliste[i]);
						if((supp == 0) && (info.indexOf(dorf_id) > -1) && (info.indexOf(dorf_name) > -1)) {
							var supp = 1;
						}
					}
					if(supp == 1) {
						var support = "Dorf wird unterstützt";
						zelle.innerHTML += "<img src='" + icon_statue + "' style='position:relative; top: 0px; margin:0px; margin-left:-38px; margin-bottom:12px; background-color:none;' title='" + dorf_id + "' / >";
					}
					else {
						var support = "Keine Unterstützung";
					}
					
					// Testinfo erweitern:
					testinfo += "Zelle " + y + "/" + x + ":\n";
					testinfo += dorf_name + "\n";
					testinfo += dorf_id + " | "+  support + "\n";
					testinfo += "---------------------------------";
					testinfo += "\n";
					
	
				}
				else {
					// Testinfo erweitern:
					testinfo += "Zelle " + y + "/" + x + ":\t-\n";
					testinfo += "---------------------------";
					testinfo += "\n";
				}
			}
		}
		
		
		// Testinfo:
		if(test) {
			alert(testinfo);
		}
	}
	
	
}