// ==UserScript==
// @name           DS - Letzte Nachrichten
// @namespace      Die Stämme
// @description	   Version 0.9.1 | Ermöglicht es im Browsergame "Die Stämme" im Profil eines Spielers die letzten gesendeten/empfangenen Nachrichten anzuzeigen.
// @author         Roman S. (Zombie74)
// @include        http://de*.die-staemme.de/*
// @exclude        http://de*.die-staemme.de/guest.php*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==





// Aktuell installierte Version:
var vers_ist = "DS - Letzte Nachrichten 0.9.1";

// Aktueller Dateipfad:
var url = document.location.href;

// Welt:
var welt = url.split(".")[0].replace("http://de", "");

// Dorf-ID:
var dorf_id = url.split("village=")[0].split("&")[0];





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
	
	// Einstellungen (Entfernungen):
	if(url.match(/einstellung=nachrichten/)) {
		// Anzahl als GM-Value speichern:
		GM_setValue("Anzahl-" + welt, prompt("Anzahl:", GM_getValue("Anzahl-" + welt)));
	}
	
	// Neue Zeile und Zellen erstellen:
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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=109909' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Anzahl-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=nachrichten''>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=nachrichten''>Einstellungen ändern</a>";
		var anzahl = GM_getValue("Anzahl-" + welt);
		
		td[1].innerHTML += "<b style='padding-right:55px;'>Anzahl:</b>" + anzahl.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && 
		(GM_getValue("Anzahl-" + welt) == undefined)) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Anzeige der letzten Nachrichten vorzunehmen")) {
			document.location.href = "http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=nachrichten";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Anzahl-" + welt, "3");
		}
	}
}





// Nachrichten:
if(url.match(/mode=view/)) {
	var tabelle  = document.getElementsByClassName("vis")[1];
	var titel = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[1].innerHTML;
	var spieler = tabelle.getElementsByTagName("tr")[1].getElementsByTagName("a")[0];
	var spieler_name = spieler.innerHTML;
	var spieler_id = spieler.href.split("id=")[1];
	
	// Link zur aktuellen Mail erstellen:
	var mail_link = "<a href='" + url + "' target='_blank'>" + titel + "</a>";
	
	// Werte als GM-Value speichern:
	if(GM_getValue(spieler_id + "-" + welt) == undefined) {
		GM_setValue(spieler_id + "-" + welt, mail_link);
	}
	else {
		// Nur speichern wenn der Link zu dieser Mail noch nicht existiert:
		if(GM_getValue(spieler_id + "-" + welt).indexOf(mail_link) == -1) {
			// Gespeicherte Mails in Array aufsplitten:
			var mails = GM_getValue(spieler_id + "-" + welt).split(";");
			// Neue Mailliste zusammensetzen:
			for(i=0; i<GM_getValue("Anzahl-" + welt)-1; i++) {
				mail_link += ";" + mails[i];
			}
			GM_setValue(spieler_id + "-" + welt, mail_link);
		}
	}
}





// Spielerprofil:
if(url.match(/screen=info_player/)) {
	var spieler_id = url.split("id=")[1];
	var letzte = GM_getValue(spieler_id + "-" + welt).split(";");
	
	// Tabelle:	
	var tabelle = document.getElementsByClassName("vis")[2];
	var zeilen = tabelle.getElementsByTagName("tr").length;
	var colspan = 1;
	if(zeilen > 1) {
		colspan = 2;
	}
	
	// Letzte Nachrichten:
	var mails = "<tr><th colspan='" + colspan + "'>";
	mails += "Die letzten <span class='grey'>" + GM_getValue("Anzahl-" + welt) + "</span> Nachrichten: ";
	mails += "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=nachrichten' title='Einstellungen | " + vers_ist + "'><img src='http://www.die-staemme.de/graphic/buildings/garage.png' height='12px' /></a></th>";
	mails += "</th></tr>";
	
	// Anzahl der letzten Nachrichten ermitteln:
	var anzahl = letzte.length;
	// Mails durchlaufen
	for(i=0; i<anzahl; i++) {
		mails += "<tr><td colspan='" + colspan + "'>" + letzte[i] + "</td></tr>";
	}
	
	// Mails in Tabelle einfügen:
	tabelle.innerHTML += mails;
}