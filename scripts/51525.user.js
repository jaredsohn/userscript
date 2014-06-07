// ==UserScript==
// @name           DS - Profiltextarea
// @namespace      Die Stämme
// @description	   Version 0.9.1 | Ermöglicht es im Browsergame "Die Stämme" die Größe der Textarea für den Profiltext anzupassen.
// @author         Roman S. (Zombie74)
// @include        http://de*.die-staemme.de/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Profiltextarea 0.9.1";


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
	
	if(url.match(/einstellung=profil/)) {
		// Breite & Höhe als GM-Value speichern:
		GM_setValue("Width-" + welt, prompt("Textfeld-Breite:", GM_getValue("Width-" + welt)));
		GM_setValue("Height-" + welt, prompt("Textfeld-Höhe:", GM_getValue("Height-" + welt)));
		GM_setValue("Padding-" + welt, prompt("Padding: (Innenabstand)", GM_getValue("Padding-" + welt)));
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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=109421' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Width-" + welt) == undefined) || 
		(GM_getValue("Height-" + welt) == undefined) || 
		(GM_getValue("Padding-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=profil'>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine bzw. nicht alle Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=profil''>Einstellungen ändern</a>";
		var width = GM_getValue("Width-" + welt);
		var height = GM_getValue("Height-" + welt);
		var padding = GM_getValue("Padding-" + welt);
		td[1].innerHTML += "<b style='padding-right:57px;'>Breite:</b>" + width + " <span class='grey'>px</span><br />";
		td[1].innerHTML += "<b style='padding-right:63px;'>Höhe:</b>" + height + " <span class='grey'>px</span><br />";
		td[1].innerHTML += "<b style='padding-right:45px;'>Padding:</b>" + padding + " <span class='grey'>px</span><br />";
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && 
		(GM_getValue("Width-" + welt) == undefined) || 
		(GM_getValue("Height-" + welt) == undefined) || 
		(GM_getValue("Padding-" + welt) == undefined)) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Größe der Textarea vorzunehmen oder Abbrechen um die Standardeinstellungen zu speichern.")) {
			document.location.href = "http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=profil";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Width-" + welt, "800");
			GM_setValue("Height-" + welt, "400");
			GM_setValue("Padding-" + welt, "5");
		}
	}
}




// DS-Einstellungen:
if((url.match(/screen=settings$/)) || 
   (url.match(/mode=profile/)) || 
   (url.match(/action=change/))) {
	
	// Breite und Höhe auslesen:
	var width = GM_getValue("Width-" + welt);
	var height = GM_getValue("Height-" + welt);
	var padding = GM_getValue("Padding-" + welt);
	
	
	// Styleangaben:
	var style = "";
	
	// Aktuelle Styleangaben anfügen:
	style += document.getElementById("message").getAttribute("style");
	
	// Neuen Abmessungen anfügen:
	style += "; width:" + width + "px; height:" + height + "px; padding:" + padding + "px;";
	
	
	
	// Aktualisierte Styleangaben einfügen:
	document.getElementById("message").setAttribute("style", style);
}