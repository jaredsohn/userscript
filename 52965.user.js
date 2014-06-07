// ==UserScript==
// @name      Berichtübersicht anpassen 0.9.0
// @namespace      Die Stämme
// @description    Ermöglicht im Browsergame "Die Stämme" das Anpassen der Berichtübersicht.
// @author         Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// ==/UserScript==





// Aktueller Dateipfad:
var url = document.location.href;

// Welt:
var teil = url.split(".");
var welt = teil[0].replace("http://de", "");


// Berichtübersichten:
if((url.match(/screen=report$/)) || (url.match(/screen=report&mode=all/))) {
	// Einstellungen:
	document.getElementsByClassName("vis")[0].innerHTML += "<tr><th>Einstellungen:</td></tr>";
	document.getElementsByClassName("vis")[0].innerHTML += "<tr><td class='selected'><a href='" + url + "&edit=name' title='Deinen Nickname speichern um ihn in der Übersich auszublenden'>&raquo; Nickname</a></td></tr>";
	
	
	// Nickname speichern
	if(url.match(/edit=name/)) {
		if(GM_getValue("Name-" + welt) != undefined) {
			GM_setValue("Name-" + welt, prompt("Nicknamen:\nBitte gebe Deinen Nicknamen ein um ihn in der Übersich auszublenden.\nWenn Du das Feld leer lässt wird Dein Nick weiterhin angezeigt.", GM_getValue("Name-" + welt)));	
		}
		else {
			GM_setValue("Name-" + welt, prompt("Nicknamen:\nBitte gebe Deinen Nicknamen ein um ihn in der Übersich auszublenden.\nWenn Du das Feld leer lässt wird Dein Nick weiterhin angezeigt."));	
		}
	}
	
	var nickname = GM_getValue("Name-" + welt);
	var icons = GM_getValue("Icons-" + welt);

	// Grafiken anzeigen:
	if(url.match(/icons=1/)) {
		GM_setValue("Icons-" + welt, 1);	
		icons = 1;
	}
	if(url.match(/icons=0/)) {
		GM_setValue("Icons-" + welt, 0);	
		icons = 0;
	}
	if(icons == 1) {
		document.getElementsByClassName("vis")[0].innerHTML += "<tr><td class='selected'><a href='" + url + "&icons=0' title='Hier klicken um Icons wieder auszublenden'>&raquo; Icons</a>&ensp;<span class='grey'>[an]</span></td></tr>";
	}
	else {
		document.getElementsByClassName("vis")[0].innerHTML += "<tr><td class='selected'><a href='" + url + "&icons=1' title='Hier klicken um Icons anzuzeigen'>&raquo; Icons</a>&ensp;<span class='grey'>[aus]</span></td></tr>";
	}
	
	
	var fader = GM_getValue("Fader-" + welt);

	// Alte Berichte ausgrauen:
	if(url.match(/fader=1/)) {
		GM_setValue("Fader-" + welt, 1);	
		fader = 1;
	}
	if(url.match(/fader=0/)) {
		GM_setValue("Fader-" + welt, 0);	
		fader = 0;
	}
	if(fader == 1) {
		document.getElementsByClassName("vis")[0].innerHTML += "<tr><td class='selected'><a href='" + url + "&fader=0' title='Hier klicken um das Ausgrauen alter Berichte zu deaktivieren'>&raquo; Fader</a> <span class='grey'>[an]</span></td></tr>";
	}
	else {
		document.getElementsByClassName("vis")[0].innerHTML += "<tr><td class='selected'><a href='" + url + "&fader=1' title='Hier klicken um alte Berichte auszugrauen'>&raquo; Fader</a> <span class='grey'>[aus]</span></td></tr>";
	}
	
	
	
	
	
	var vis = document.getElementsByClassName("vis").length-2;
	if(vis >= 2) {
		var tabelle = document.getElementsByClassName("vis")[vis];
		var zeilen = tabelle.getElementsByTagName("tr").length-2;
		for(i=1; i<=zeilen; i++) {
			// Inhalt der Zelle auslesen:
			var inhalt = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
			
			// Du:
			if(inhalt.indexOf(nickname) > 0) {
				tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("Zombie74 (", "").replace(") greift", " greift");
			}
	
			if (icons == 1) {
				// Angriffe:
				if(inhalt.indexOf("greift") > 0) {
					// Du greifst an:
					if(inhalt.indexOf(nickname) > 0) {
						// Barbarendorf:
						if(inhalt.indexOf("Barbarendorf") > 0) {
							tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://de" + welt + ".die-staemme.de/graphic/command/attack.png' style='margin-right:5px;'> <a");
						}
						// Gegner:
						else {
							tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://de" + welt + ".die-staemme.de/graphic/unit/att.png' style='margin-right:1px;'><a");
						}
					}
					// Du wirst angegriffen:
					else {
						tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://de" + welt + ".die-staemme.de/graphic/unit/def.png' style='margin-right:4px;'><a");
					}
				}
		
				// Unterstützung:
				if(inhalt.indexOf("unterstützt") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://de" + welt + ".die-staemme.de/graphic/command/support.png' style='margin-right:18px;'><a");
				}
				if(inhalt.indexOf("Unterstützung") > 0) {
					// Unterstützung wurde angegriffen:
					if(inhalt.indexOf("wurde angegriffen") > 0) {
						tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://de" + welt + ".die-staemme.de/graphic/unit/def.png' style='margin-right:2px;'><a");
					}
					// Unterstützung wurde zurückgeschickt
					else {
						tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://de" + welt + ".die-staemme.de/graphic/command/back.png' style='margin-right:18px;'><a");
					}
				}
		
				// Handel:
				if(inhalt.indexOf("beliefert") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://de" + welt + ".die-staemme.de/graphic/buildings/market.png' style='margin-right:18px;'><a");
				}
		
				// Einladungen:
				if((inhalt.indexOf("eingeladen") > 0) || (inhalt.indexOf("Einladung") > 0)) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://de" + welt + ".die-staemme.de/graphic/ally_rights/invite.png' style='margin-bottom:-3px; margin-right:16px;'><a");
				}
		
				// Freundesliste:
				if(inhalt.indexOf("Freundesliste") > 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.replace("<a", " <img src='http://de" + welt + ".die-staemme.de/graphic/ally_rights/diplomacy.png' style='margin-right:16px;'><a");
				}
			}
	
			// Neu:
			if(fader == 1) {
				if(inhalt.indexOf(" (neu)") < 0) {
					tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].setAttribute("style", "-moz-opacity:0.5;'");
				}
			}
			tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].setAttribute("title", "Diesen Bericht anzeigen");
		}
	}
}