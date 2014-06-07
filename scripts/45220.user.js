// ==UserScript==
// @name           DS - Berichtübersicht anpassen
// @namespace      Die Stämme
// @description    Version 1.0.1 | Ermöglicht im Browsergame "Die Stämme" das Anpassen der Berichtübersicht.
// @author         Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// @include        http://*.staemme.ch/*
// @include        http://*.tribalwars.nl/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Berichtübersicht anpassen 1.0.1";


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
	
	if(url.match(/einstellung=berichte/)) {
		// Nickname als GM-Value speichern:
		GM_setValue("Name-" + welt, prompt("Nicknamen:\nBitte gebe Deinen Nicknamen ein um ihn in der Übersicht auszublenden.\nWenn Du das Feld leer lässt wird Dein Nick weiterhin angezeigt.", GM_getValue("Name-" + welt)));
		// Icons anzeigen?:
		// Goldmünzen & AG an/aus GM-Value speichern:
		if(confirm("Icons:\n\nSollen vor den einzelnen Berichten Icons angezeigt werden?")) {
			GM_setValue("Icons-" + welt, "an");		
		}
		else {
			GM_setValue("Icons-" + welt, "aus");		
		}
		// Alte Berichte ausgrauen:
		if(confirm("Fader:\n\nSollen bereits gelesene Berichte ausgegraut werden?")) {
			GM_setValue("Fader-" + welt, "an");		
		}
		else {
			GM_setValue("Fader-" + welt, "aus");		
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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=102543' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Name-" + welt) == undefined) && 
		(GM_getValue("Icons-" + welt) == undefined) && 
		(GM_getValue("Fader-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=berichte''>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=berichte''>Einstellungen ändern</a>";
		var spieler = GM_getValue("Name-" + welt);
		var icons = GM_getValue("Icons-" + welt);
		var fader = GM_getValue("Fader-" + welt);
		td[1].innerHTML += "<b style='padding-right:16px;'>Spieler-Nick:</b>" + spieler + "<br>";
		td[1].innerHTML += "<b style='padding-right:62px;'>Icons:</b>" + icons.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:60px;'>Fader:</b>" + fader.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>");
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && 
		(GM_getValue("Name-" + welt) == undefined) && 
		(GM_getValue("Icons-" + welt) == undefined) && 
		(GM_getValue("Fader" + welt) == undefined)) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Berichtübersicht vorzunehmen")) {
			document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=berichte";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Name-" + welt, "");
			GM_setValue("Icons-" + welt, "an");
			GM_setValue("Fader-" + welt, "an");
		}
	}
}


// Berichtübersichten:
if((url.match(/screen=report/))) {
	// Gespeicherte Werte auslesen:
	if(GM_getValue("Name-" + welt) != undefined) {
		var nickname = GM_getValue("Name-" + welt);
	}
	else {
		var nickname = "";
	}
	if(GM_getValue("Icons-" + welt) != undefined) {
		var icons = GM_getValue("Icons-" + welt);
	}
	else {
		var icons = "aus";
	}
	if(GM_getValue("Fader-" + welt) != undefined) {
		var fader = GM_getValue("Fader-" + welt);
	}
	else {
		var fader = "aus";
	}
	
	
	var vis = document.getElementsByClassName("vis").length;
	
	for(i=0; i<vis; i++) {
		var test = document.getElementsByClassName("vis")[i].getElementsByTagName("th");
		if(test.length == 4) {
			vis = i;
		}
	}
	
	if(vis > 0) {
		var tabelle = document.getElementsByClassName("vis")[vis];
		
		tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML += " <a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=berichte'><img src='http://www.die-staemme.de/graphic/buildings/garage.png' height='12px' /></a>";
		
		var ber_off = new Array();
		var ber_def = new Array();
		var ber_sup = new Array();
		var ber_zur = new Array();
		var ber_han = new Array();
		var ber_inv = new Array();
		var ber_fre = new Array();
		var ber_ver = new Array();
		var ber_pal = new Array();
		var ber_pre = new Array();
		
		var zeilen = tabelle.getElementsByTagName("tr").length-2;
		for(i=1; i<=zeilen; i++) {
			// Inhalt der Zelle auslesen:
			var inhalt = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
			
			
			// Du:
			if((nickname != "") && (inhalt.indexOf(nickname) >= 0)) {
				tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace(nickname + " (", "").replace(") greift", " greift");
			}
	
			if (icons == "an") {
				var checkbox = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("input")[0];
				var cid      = checkbox.getAttribute("name");
						
				// Angriffe:
				if(inhalt.indexOf("greift") > 0) {
					// Du greifst an:
					if(inhalt.indexOf(nickname) > 0) {
						// Barbarendorf / Bonusdorf:
						if(inhalt.indexOf("Barbarendorf") > 0 || inhalt.indexOf("Bonusdorf") > 0) {
							tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/command/attack.png' style='margin-right:5px;'> <a");
						}
						// Gegner:
						else {
							tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/att.png' style='margin-right:2px;'><a");
						}
						ber_off.push(cid);
					}
					// Du wirst angegriffen:
					else {	
						tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/def.png' style='margin-right:4px;'><a");
						ber_def.push(cid);
					}
				}
		
				// Unterstützung:
				if(inhalt.indexOf("unterstützt ") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/command/support.png' style='margin-left:1px; margin-right:17px;'><a");
					ber_sup.push(cid);
				}
				if(inhalt.indexOf("Unterstützung ") > 0) {
					// Unterstützung wurde angegriffen:
					if(inhalt.indexOf("wurde angegriffen") > 0) {
						tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/def.png' style='margin-right:2px;'><a");
						ber_def.push(cid);
					}
					// Unterstützung wurde zurückgeschickt
					else {
						tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/command/back.png' style='margin-left:1px; margin-right:17px;'><a");
						ber_zur.push(cid);
					}
				}
		
				// Handel:
				if(inhalt.indexOf("beliefert") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/buildings/market.png' style='margin-right:16px;'><a");
					ber_han.push(cid);
				}
		
				// Einladungen:
				if((inhalt.indexOf("eingeladen") > 0) || (inhalt.indexOf("Einladung") > 0)) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/invite.png' style='margin-bottom:-3px; margin-right:16px;'><a");
					ber_inv.push(cid);
				}
		
				// Freundesliste:
				if(inhalt.indexOf("Freundesliste") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/face.png' style='margin-right:16px;'><a");
					ber_fre.push(cid);
				}
		
				// UV:
				if(inhalt.indexOf("Urlaubsvertretung") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <b style='color:#804000;'>UV</b><a");
					ber_ver.push(cid);
				}
		
				// Paladin hat Gegenstand gefunden:
				if(inhalt.indexOf("Paladin") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_knight.png' style='margin-right:16px;'><a");
					ber_pal.push(cid);
				}
		
				// Gratis Premium Account:
				if(inhalt.indexOf("Premium") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/gold.png' style='margin-right:18px; height:14px;'><a");
					ber_pre.push(cid);
				}
			}
	
			// Neu:
			if(fader == "an") {
				if(inhalt.indexOf(" (neu)") < 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].setAttribute("style", "-moz-opacity:0.5; opacity:0.5;'");
				}
			}
			tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].setAttribute("title", "Diesen Bericht anzeigen");
		}
		
		
		
		// 
		var onclick_off = "";		
		var onclick_def = "";	
		var onclick_sup = "";	
		var onclick_zur = "";	
		var onclick_han = "";	
		var onclick_inv = "";	
		var onclick_fre = "";	
		var onclick_ver = "";	
		var onclick_pal = "";	
		var onclick_pre = "";	
		
		// 
		for(var x=0; x<ber_off.length; x++) {
			onclick_off += "document.getElementsByName(\"" + ber_off[x] + "\")[0].setAttribute(\"checked\", \"checked\");";
		}
		for(var x=0; x<ber_def.length; x++) {
			onclick_def += "document.getElementsByName(\"" + ber_def[x] + "\")[0].setAttribute(\"checked\", \"checked\");";
		}
		for(var x=0; x<ber_sup.length; x++) {
			onclick_sup += "document.getElementsByName(\"" + ber_sup[x] + "\")[0].setAttribute(\"checked\", \"checked\");";
		}
		for(var x=0; x<ber_zur.length; x++) {
			onclick_zur += "document.getElementsByName(\"" + ber_zur[x] + "\")[0].setAttribute(\"checked\", \"checked\");";
		}
		for(var x=0; x<ber_han.length; x++) {
			onclick_han += "document.getElementsByName(\"" + ber_han[x] + "\")[0].setAttribute(\"checked\", \"checked\");";
		}
		for(var x=0; x<ber_inv.length; x++) {
			onclick_inv += "document.getElementsByName(\"" + ber_inv[x] + "\")[0].setAttribute(\"checked\", \"checked\");";
		}
		for(var x=0; x<ber_fre.length; x++) {
			onclick_fre += "document.getElementsByName(\"" + ber_fre[x] + "\")[0].setAttribute(\"checked\", \"checked\");";
		}
		for(var x=0; x<ber_ver.length; x++) {
			onclick_ver += "document.getElementsByName(\"" + ber_ver[x] + "\")[0].setAttribute(\"checked\", \"checked\");";
		}
		for(var x=0; x<ber_pal.length; x++) {
			onclick_pal += "document.getElementsByName(\"" + ber_pal[x] + "\")[0].setAttribute(\"checked\", \"checked\");";
		}
		for(var x=0; x<ber_pre.length; x++) {
			onclick_pre += "document.getElementsByName(\"" + ber_pre[x] + "\")[0].setAttribute(\"checked\", \"checked\");";
		}
		
		//
		var auswahl_off = "<img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/att.png' onclick='" + onclick_off + "' style='height:12px; margin-left:5px; cursor:pointer;' title='Alle Berichte der Kategorie [Angriff] auswählen' />";
		var auswahl_def = "<img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/def.png' onclick='" + onclick_def + "' style='height:12px; margin-left:5px; cursor:pointer;' title='Alle Berichte der Kategorie [Verteidigung] auswählen' />";
		var auswahl_sup = "<img src='http://" + land + welt + adresse[land] + land + "/graphic/command/support.png' onclick='" + onclick_sup + "' style='height:12px; margin-left:5px; cursor:pointer;' title='Alle Berichte der Kategorie [Unterstützung] auswählen' />";
		var auswahl_zur = "<img src='http://" + land + welt + adresse[land] + land + "/graphic/command/back.png' onclick='" + onclick_zur + "' style='height:12px; margin-left:5px; cursor:pointer;' title='Alle Berichte der Kategorie [Rückzug] auswählen' />";
		var auswahl_han = "<img src='http://" + land + welt + adresse[land] + land + "/graphic/buildings/market.png' onclick='" + onclick_han + "' style='height:12px; margin-left:5px; cursor:pointer;' title='Alle Berichte der Kategorie [Handel] auswählen' />";
		var auswahl_inv = "<img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/invite.png' onclick='" + onclick_inv + "' style='height:12px; margin-left:5px; cursor:pointer;' title='Alle Berichte der Kategorie [Einladungen] auswählen' />";
		var auswahl_fre = "<img src='http://" + land + welt + adresse[land] + land + "/graphic/face.png' onclick='" + onclick_fre + "' style='height:12px; margin-left:5px; cursor:pointer;' title='Alle Berichte der Kategorie [Freundesliste] auswählen' />";
		var auswahl_ver = "<b onclick='" + onclick_ver + "' style='height:12px; margin-left:5px; cursor:pointer; color:#804000;' title='Alle Berichte der Kategorie [Urlaubsvertretung] auswählen'>UV</b>";
		var auswahl_pal = "<img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_knight.png' onclick='" + onclick_pal + "' style='height:12px; margin-left:5px; cursor:pointer;' title='Alle Berichte der Kategorie [Paladin] auswählen' />";
		var auswahl_pre = "<img src='http://" + land + welt + adresse[land] + land + "/graphic/gold.png' onclick='" + onclick_pre + "' style='height:12px; margin-left:5px; cursor:pointer;' title='Alle Berichte der Kategorie [PA] auswählen' />";
		
		// Zusammensetzen:
		var auswahl_gesamt = "";
		auswahl_gesamt += auswahl_off + auswahl_def + auswahl_sup + auswahl_zur + auswahl_han + auswahl_inv + auswahl_fre + auswahl_ver + auswahl_pal + auswahl_pre;
		
		// Alles einfügen:
		tabelle.getElementsByTagName("tr")[zeilen+1].getElementsByTagName("th")[0].innerHTML += auswahl_gesamt;
	}
}