// ==UserScript==
// @name			Spenden-Center.de.vu Spenden-Check V3.2
// @namespace		http://www.dart-devils.de/penner/
// @description		Meldet Spendenlinks die keine Spenden mehr erhalten können an spenden-center.de.vu
// @description		Schliesst das aktuelle Tab bei Erfolg wieder
// @description   	in Firefox about:config dom.allow_scripts_to_close_windows auf true setzen!
// @description   	Kompatibel mit Pennergame.de V3.1, dossergame und Berlin (bis auf die Rückmeldung ans center)
// @description   	Bei 500er Fehlern wird die Seite nach 10 Sekunden einfach noch einmal geladen
// @author			Spenden-Center / thx to alkmona
// @version		    3.3
// @include			http://*pennergame.de/change_please/*
// @include			http://*pennergame.de/change_please_action/*
// @include			http://*dossergame.co.uk/change_please/*
// @exclude			http://*pennergame.de/change_please/statistics/*
// ==/UserScript==

function reloadPage() {
	document.body.innerHTML = "<div align='center' style='width:700px; background-color:darkred; border:1px solid red; color:white; font-family:Arial, Helvetica, sans-serif; font-size:10pt; padding:5px;'><b>Die Seite konnte nicht geladen werden!<br><br>Sollte die Seite nicht innerhalb der nächsten 10 Sekunden neu geladen werde, lade die Seite bitte erneut (F5).</b></div>";
	setTimeout("window.location.reload();", 10000);
}

function sendErgebnis(id, action, ergebnis) {
	if (id < 0) {
		self.close();
	}
	else if (ergebnis.indexOf("404") > 0) {
		document.body.innerHTML = "<iframe src='http://www.dart-devils.de/penner/Spendenergebnis_melden.php?ver=v31&id=" + id + "&action=" + action + "' width='0px' height='0px' style='visibility: hidden;'></iframe><br><div align='center' style='width:700px; background-color:darkred; border:1px solid red; color:white; font-family:Arial, Helvetica, sans-serif; font-size:10pt; padding:5px;'>Folgendes Ergebnis deiner Spende wurde an das Spenden-Center gemeldet:<br><b>" + ergebnis + "</b></div>";
	}
	else if (ergebnis == "Anderer Fehler") {
		document.body.innerHTML = "<iframe src='http://www.dart-devils.de/penner/Spendenergebnis_melden.php?ver=v31&id=" + id + "&action=" + action + "' width='0px' height='0px' style='visibility: hidden;'></iframe><br><div align='center' style='width:700px; background-color:darkred; border:1px solid red; color:white; font-family:Arial, Helvetica, sans-serif; font-size:10pt; padding:5px;'>Folgendes Ergebnis deiner Spende wurde an das Spenden-Center gemeldet:<br><b>" + ergebnis + "</b></div>";
	}
	else {
		document.getElementById("content").innerHTML = "<iframe src='http://www.dart-devils.de/penner/Spendenergebnis_melden.php?ver=v31&id=" + id + "&action=" + action + "' width='0px' height='0px' style='visibility: hidden;'></iframe><br><div align='center' style='width:700px; background-color:green; border:1px solid lime; color:white; font-family:Arial, Helvetica, sans-serif; font-size:10pt; padding:5px;'>Folgendes Ergebnis deiner Spende wurde an das Spenden-Center gemeldet:<br><b>" + ergebnis + "</b></div><br>" + document.getElementById("content").innerHTML;
	}
	setTimeout("self.close();",10000);
}

function checkErgebnis(id) {
	// Pruefen, welches Ergebnis Pennergame.de zurueckgibt
	var Bitte_Warten      	= document.body.innerHTML.indexOf("Minuten wieder") + document.body.innerHTML.indexOf("have to wait");
	var Erfolgreich			= document.body.innerHTML.indexOf("Becher geworfen!") + document.body.innerHTML.indexOf("You've put");
	var Selber_spenden		= document.body.innerHTML.indexOf("selbst spenden");
	var Genug_spenden       = document.body.innerHTML.indexOf("hat heute schon genug Spenden") + document.body.innerHTML.indexOf("enough donations");
	var Becher_ist_voll     = document.body.innerHTML.indexOf("ist bereits bis zum Rand")+ document.body.innerHTML.indexOf("full to the brim");
	var Refid_nicht_bekannt = document.body.innerHTML.indexOf("Refid nicht bekannt");
	var Unknown_user 		= document.body.innerHTML.indexOf("Error Unknown User");
	var BerlinSpenden		= document.body.innerHTML.indexOf("in den Becher werfen...");

	// was jetzt?
	if (Bitte_Warten > 0) {
		// wir muessen noch warten
		self.close();
	}
	else if (Selber_spenden > 0) {
		// das bist ja du selber
		self.close();
	}
	else if (Erfolgreich > 0){
		// spenden war erfolgreich
		self.close();
	}
	else if (Genug_spenden > 0) {
		// hat bereits genug bekommen
		sendErgebnis(id, "GenugSpenden", "Der Penner hat genug Spenden bekommen");
	}
	else if (Becher_ist_voll > 0) {
		// hat bereits genug bekommen
		sendErgebnis(id, "BecherVoll", "Der Becher ist bis zum Rand gefüllt");
	}
	else if (Refid_nicht_bekannt > 0) {
		// Wenn die Refid nicht bekannt ist
		sendErgebnis(id, "RefidNichtBekannt", "Refid ist nicht bekannt");
	}
	else if (Unknown_user > 0) {
		// Wenn der User nicht bekannt ist
		sendErgebnis(id, "UserUnknown", "User Unknown");
	} 
	else if (BerlinSpenden > 0) {
		// knopf drücken und zahl eingeben
	}
	else {
		// wir haben ein Problem...
		if (document.title == "404 - Not Found") {
			// Falls die Seite nicht gefunden werden kann (Fehler 404)
			sendErgebnis(id, "NotFound", "Fehler 404 - Die Seite konnte nicht gefunden werden");
		}
		else if (document.body.innerHTML.indexOf("500") > 0) {
			// Falls die Seite nicht geladen werden kann (Fehler 500)
			reloadPage();
		}
		else if (document.body.innerHTML.indexOf("501") > 0) {
			// Falls die Seite nicht geladen werden kann (Fehler 501)
			reloadPage();
		}
		else if (document.body.innerHTML.indexOf("502") > 0) {
			// Falls die Seite nicht geladen werden kann (Fehler 502)
			reloadPage();
		}
		else if (document.body.innerHTML.indexOf("503") > 0) {
			// Falls die Seite nicht geladen werden kann (Fehler 503)
			reloadPage();
		}
		else if (document.body.innerHTML.indexOf("504") > 0) {
			// Falls die Seite nicht geladen werden kann (Fehler 504)
			reloadPage();
		}
		else if (document.body.innerHTML.indexOf("Proxy-Server") > 0) {
			// Firefox wurde konfiguriert, einen Proxy-Server zu nutzen, der die Verbindung zurückweist.
			reloadPage();
		}
		else {
			// whatever
//			alert(document.body.innerHTML);
//			sendErgebnis(id, "AndererFehler", "Anderer Fehler");
		}
	}
}

function check() {
	// Seite, von der der Spendenlink kommt
	var RefLink = document.referrer;
	// Wenn der Spendenlink von von http://www.dart-devils.de/penner/spenden.php kommt
	var Richtiger_Refferer = RefLink.indexOf("www.dart-devils.de/penner/spenden.php");
	// Wenn alle Bedingungen erfuellt sind, dann Script ausf�hren
	if (Richtiger_Refferer > 0) {
		//ID bei spenden-center.de.vu aus referrer lesen
		var PosId   = RefLink.indexOf("?id=");
		var PosJava = RefLink.indexOf("&java=");
		var id 		= RefLink.slice(PosId + 4, PosJava);
		checkErgebnis(id);
	}
	else {
		checkErgebnis(-1);
	}
	
}

check();