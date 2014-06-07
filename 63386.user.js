// ==UserScript==
// @name           DS - Berichtübersicht anpassen
// @namespace      Die Stämme
// @description    Version 1.0.0 | Ermöglicht im Browsergame "Die Stämme" das Anpassen der Berichtübersicht.
// @author         Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// @include        http://*.staemme.ch/*
// @include        http://*.tribalwars.nl/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Berichtübersicht anpassen 1.0.0";


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
		GM_setValue("Name-" + welt, prompt("Nicknamen:\nBitte gebe Deinen Nicknamen ein um ihn in der Übersich auszublenden.\nWenn Du das Feld leer lässt wird Dein Nick weiterhin angezeigt.", GM_getValue("Name-" + welt)));
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
			GM_setValue("Name-" + welt, "???");
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
		
		var zeilen = tabelle.getElementsByTagName("tr").length-2;
		for(i=1; i<=zeilen; i++) {
			// Inhalt der Zelle auslesen:
			var inhalt = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
			
			
			// Du:
			if(inhalt.indexOf(nickname) >= 0) {
				tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace(nickname + " (", "").replace(") greift", " greift");
			}
	
			if (icons == "an") {
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
					}
					// Du wirst angegriffen:
					else {
						tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/def.png' style='margin-right:4px;'><a");
					}
				}
		
				// Unterstützung:
				if(inhalt.indexOf("unterstützt ") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/command/support.png' style='margin-left:1px; margin-right:17px;'><a");
				}
				if(inhalt.indexOf("Unterstützung ") > 0) {
					// Unterstützung wurde angegriffen:
					if(inhalt.indexOf("wurde angegriffen") > 0) {
						tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/def.png' style='margin-right:2px;'><a");
					}
					// Unterstützung wurde zurückgeschickt
					else {
						tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/command/back.png' style='margin-left:1px; margin-right:17px;'><a");
					}
				}
		
				// Handel:
				if(inhalt.indexOf("beliefert") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/buildings/market.png' style='margin-right:16px;'><a");
				}
		
				// Einladungen:
				if((inhalt.indexOf("eingeladen") > 0) || (inhalt.indexOf("Einladung") > 0)) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/invite.png' style='margin-bottom:-3px; margin-right:16px;'><a");
				}
		
				// Freundesliste:
				if(inhalt.indexOf("Freundesliste") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/ally_rights/diplomacy.png' style='margin-right:16px;'><a");
				}
		
				// Paladin hat Gegenstand gefunden:
				if(inhalt.indexOf("Paladin") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_knight.png' style='margin-right:16px;'><a");
				}
		
				// Gratis Premium Account:
				if(inhalt.indexOf("Premium") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://" + land + welt + adresse[land] + land + "/graphic/gold.png' style='margin-right:18px; height:14px;'><a");
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
	}
}