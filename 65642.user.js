// ==UserScript==
// @name           DS - Bewerbungsvoraussetzungen
// @namespace      Die Stämme
// @description	   Version 0.9.1 | Emöglicht im Browsergame "Die Stämme" das aktualisiern der Bewerbungsvoraussetzungen (Mindestpunkte / Memberlimit / Freie Plätze) im Stammesprofil.
// @author         Roman S. (Zombie74)
// @include        http://de*.die-staemme.de/*
// @include        http://ch*.staemme.ch/*
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==





// Aktuelle Version:
var vers_ist = "DS - Bewerbungsvoraussetzungen 0.9.1";


// Aktuelle URL:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var land = url.substr(7, 2);
var welt = teil[0].replace("http://" + land, "");


// Dorf-ID:
var nummer = url.split("village=");
var numm = nummer[1].split("&");
var dorf_id = numm[0];
	
	
// Adressen:
var adresse = new Array();
adresse["de"] = ".die-staemme.";
adresse["ch"] = ".staemme.";
adresse["nl"] = ".tribalwars.";

	
// Datum;
var datum    = new Date();
var dat_tag  = datum.getDate();
var dat_mon  = datum.getMonth()+1;
var dat_jahr = datum.getFullYear();
var stand    = (dat_tag<10?"0"+dat_tag:dat_tag) + "." + (dat_mon<10?"0"+dat_mon:dat_mon) + "." + dat_jahr;


// Testinfo an|aus (true|false):
// var test = true;
var test = false;
var testinfo = vers_ist + " | Testinfo:\n\n";





//******************************//
// Einstellungen:				//
// 								//
//******************************//
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
	if(url.match(/einstellung=bewerbungsbedingungen/)) {
		// Min.-Pkt. /aus als GM-Value speichern:
		if(confirm("Minimale Punkte des Bewerbers:\n\nWie hoch sollen die Punkte des Bewerbers midestens sein?\n\nOK\t\t\t= Durchschnitt der besten 40\nAbbrechen\t= Durchschnitt aller Mitglieder")) {
			GM_setValue("Stamm-Min-Pkt-" + welt, "best");		
		}
		else {
			GM_setValue("Stamm-Min-Pkt-" + welt, "alle");		
		}
		
		// Memberlimit einstellen:
		var limit = GM_getValue("Stamm-Limit-" + welt);	
		if(limit == undefined) {
			limit = 1;
		}
		limit = prompt("Memberlimit:\n\nWie hoch ist das Memberlimit des Stammes?", limit);		
		GM_setValue("Stamm-Limit-" + welt, limit);		
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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=125489' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Stamm-Limit-" + welt) == undefined) || 
		(GM_getValue("Stamm-Min-Pkt-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=bewerbungsbedingungen''>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine bzw. nicht alle Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=bewerbungsbedingungen''>Einstellungen ändern</a>";
		var memblimit = GM_getValue("Stamm-Limit-" + welt);
		var bedingung = GM_getValue("Stamm-Min-Pkt-" + welt);
		
		td[1].innerHTML += "<b style='padding-right:14px;'>Memberlimit:</b>" + memblimit + "<br>";
		td[1].innerHTML += "<b style='padding-right:31px;'>Mind.-Pkt.:</b>" + bedingung.replace("best", "Die Pukte des Bewerbers müssen dem Durchschnitt der <b style='color:#C00'>besten 40</b> entsprechen").replace("alle", "Die Pukte des Bewerbers müssen dem Durchschnitt des <b style='color:#090'>gesamten </b> Stammes entsprechen") + "<br>";
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && (
		(GM_getValue("Stamm-Limit-" + welt) == undefined) || 
		(GM_getValue("Stamm-Min-Pkt-" + welt) == undefined))) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Bewerbungsbedingungen Deines Stammes vorzunehmen")) {
			document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=bewerbungsbedingungen";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Stamm-Limit-" + welt, "1");
			GM_setValue("Stamm-Min-Pkt-" + welt, "alle");
		}
	}
}



//******************************//
// Aktion ungültig:				//
// abgelaufene Formular-ID		//
// 								//
//******************************//
if(document.getElementsByTagName("h2")[0].innerHTML == "Aktion ungültig") {	
	// Redirect zu Stamm > Eigenschaften um aktuelle ID auszulesen und zu speichern:
	if(confirm("Abgelaufene ID:\n\nDie für das absenden des Formulars nötige ID ist abgelaufen.\nUm die aktuelle ID auszulesen auf OK klicken.")) {	
		document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=ally&mode=properties&extra=redir";
	}
}



//******************************//
// Stamm > Eigenschaften:		//
// 								//
//******************************//
if(url.match(/mode=properties/)) {	
	// Redirect zum Stammesprofil
	if(url.match(/extra=redir/)) {	
		if(confirm("ID gespeichert:\n\nDie für das absenden des Formulars nötige ID wurde gespeichert.\nUm zur Profilseite deines Stammes zurück zu kehren und den Vorgang erneut zu starten auf OK klicken")) {	
			document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=ally&mode=profile&extra=redir";
		}
	}

	// Profiltext-Formular ermitteln:
	var form_action = document.getElementsByName("edit_profile")[0].action;
	
	// Aktuellen Profiltext auslesen:
	var profiltext = document.getElementById("desc_text").innerHTML;
	
	// Werte als GM-Value speichern:
	GM_setValue("Stamm-Profil-Link-W" + welt, form_action);
	GM_setValue("Stamm-Profil-Text-W" + welt, profiltext);
	
	
	// Testinfo erweitern:
	testinfo += "Stamm | Eigenschaften:\n";	
	testinfo += "Action:\n";
	testinfo += form_action;
	testinfo += "\n";
	testinfo += "Profiltext:\n";
	testinfo += profiltext;
	testinfo += "\n";	
	
	
	// Testinfo ausgeben:
	if(test) {
		alert(testinfo);
	}
}



//******************************//
// Stamm > Profil:				//
// 								//
//******************************//
if(url.match(/mode=profile/)) {
	// Bedingung (alle | best):
	var memb_limit  = GM_getValue("Stamm-Limit-" + welt);
	var bedingung   = GM_getValue("Stamm-Min-Pkt-" + welt);
	
	// Link:
	var link_men = document.getElementsByClassName("vis")[0].getElementsByTagName("a")[6].href;
	
	// Eigenschaften:
	var table_eig = document.getElementsByClassName("vis")[1];
	
	// Mitgliederzahl:
	var zeile_mitg = table_eig.getElementsByTagName("tr")[3];
	var zelle_mitg = zeile_mitg.getElementsByTagName("td")[1];
	var mitglieder = parseInt(zelle_mitg.innerHTML);
	
	// Punkte der Besten 40:
	var zeile_best = table_eig.getElementsByTagName("tr")[4];
	var zelle_best = zeile_best.getElementsByTagName("td")[1];
	var pkt_best40 = zelle_best.innerHTML.replace(/<span class="grey">.<\/span>/g, '');
	if(mitglieder < 40) {
		var pkt_durch_best = (Math.round(parseInt(pkt_best40)/mitglieder)/1000).toFixed(3);
	}
	else {
		var pkt_durch_best = (Math.round(pkt_best40/40)/1000).toFixed(3);
	}
	
	// Punktedurchschnitt alle:
	var zeile_alle = table_eig.getElementsByTagName("tr")[6];
	var zelle_alle = zeile_alle.getElementsByTagName("td")[1];
	
	// GM_Values auslesen:
	var pkt_durch_alle = zelle_alle.innerHTML.replace(/<span class="grey">.<\/span>/g, '.');
	var form_action    = GM_getValue("Stamm-Profil-Link-W" + welt);
	var txt_alt        = GM_getValue("Stamm-Profil-Text-W" + welt);
	var txt_neu        = txt_alt;
	
	// Bedingung:
	if(bedingung = "best") {
		txt_neu = txt_neu.replace(/Min. \[b\][0-9]{1,}[.]{0,1}[0-9]{0,}\[\/b\]/, "Min. [b]" + pkt_durch_best + "[/b]");
	}
	else {
		txt_neu = txt_neu.replace(/Min. \[b\][0-9]{1,}[.]{0,1}[0-9]{0,}\[\/b\]/, "Min. [b]" + pkt_durch_alle + "[/b]");
	}

	// Mitgliederlimit:
	txt_neu = txt_neu.replace(/Max. \[b\][0-9]{1,}\[\/b\]/, "Max. [b]" + memb_limit + "[/b]");

	// Freie Plätze:
	if(memb_limit > mitglieder) {
		var frei = memb_limit-mitglieder;
		txt_neu = txt_neu.replace(/Frei \[b\][0-9]{1,}\[\/b\]/, "Frei [b]" + frei + "[/b]");
	}
	else {
		txt_neu = txt_neu.replace(/Frei \[b\][0-9]{1,}\[\/b\]/, "Frei [b]0[/b]");
	}

	// Stand:
	txt_neu = txt_neu.replace(/\[b\]Stand:\[\/b\] \[i\][0-9]{1,2}[.]{1}[0-9]{1,2}[.]{1}[0-9]{2,4}\[\/i\]/, "[b]Stand:[/b] [i]" + stand + "[/i]");
	

	// Formular:
	var formular = "";
	
	// Profiltext gespeichert:
	if(txt_alt != undefined) {		
		formular += '<form id="profilform" action="' + form_action + '" method="post" style="float:right; height:16px; margin:0px; margin-top:-2px; margin-left:5px;">';
		formular += '<input type="hidden" id="desc_text" name="desc_text" value="' + txt_neu + '" />';
		formular += '<input type="submit" name="edit" value="aktualisieren" title="Bewerbungsvoraussetzungen für Bewerber im Profiltext des Stammes aktualisieren" style="cursor:pointer;" />';
		formular += '</form>';
	}
	// Noch kein Profiltext gespeichert:	
	else {
		formular += '<form action="' + link_men +'" method="post">';
		formular += '<input type="submit" value="???" title="Der Profiltext Deines Stammes wurde noch nicht gespeichert" />';
		formular += '</form>';
	}

	// Formular in Zelle einfügen:
	if(GM_getValue("Stamm-Min-Pkt-" + welt) == "best") {
		zelle_best.innerHTML = zelle_best.innerHTML + formular;
	}
	else {
		zelle_alle.innerHTML = zelle_alle.innerHTML + formular;	
	}
	
	
	// Bei aktualisierter ID Formular automatisch absenden:
	if(url.match(/extra=redir/)) {	
		if(confirm("Bewerbungsvoraussetzungen:\n\nDie ID wurde aktualisiert.\n\nSoll die Aktualisierung der Bewerbungsbedingungen im Stammesprofil jetzt erneut durchgeführt werden?")) {	
			document.getElementById("profilform").submit();
		}
	}

	// Testinfo erweitern:
	testinfo += "Stamm | Profil:\n";	
	testinfo += "\n";
	testinfo += "Mitglieder:\t\t" + mitglieder + "\n";
	testinfo += "Limit:\t\t\t" + memb_limit + "\n" ;
	testinfo += "Bedingung:\t\t" + bedingung + "\n" ;
	testinfo += "Pkt.-Best-40:\t\t" + pkt_best40 + "\n";
	testinfo += "Pkt.-Durch-Best:\t" + pkt_durch_best + "\n";
	testinfo += "Pkt.-Durch-Alle:\t" + pkt_durch_alle + "\n";
	testinfo += "\n";
	testinfo += "Stand:\t\t\t" + stand + "\n";
	
	
	// Testinfo ausgeben:
	if(test) {
		alert(testinfo);
	}
}