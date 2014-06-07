// ==UserScript==
// @name          	Spenden-Check
// @description   	Schlieszt das aktuelle Tab bei Erfolg wieder (im Firefox about:config dom.allow_scripts_to_close_windows auf true setzen!)
// @description   	Bei 500er Fehlern wird die Seite nach 10s einfach noch einmal geladen
// @version		2.2
// @namespace     	http://alkmona.pennergame.de
// @author		alkmona
// @include			http://*pennergame.de/change_please/*
// @include			http://*pennergame.de/change_please_action/*
// @include			http://*dossergame.co.uk/change_please/*
// @exclude			http://*pennergame.de/change_please/statistics/*
// @license		http://www.gnu.org/licenses/lgpl.html	
// ==/UserScript==


function reloadPage() {
	document.body.innerHTML = "<div align='center' style='width:700px; background-color:darkred; border:1px solid red; color:white; font-family:Arial, Helvetica, sans-serif; font-size:10pt; padding:5px;'><b>Die Seite konnte nicht geladen werden!<br><br>Sollte die Seite nicht innerhalb der nächsten 10 Sekunden neu geladen werde, lade die Seite bitte erneut (F5).</b></div>";
	setTimeout("window.location.reload();",10000);
}

function check() {
	// Pruefen, welches Ergebnis Pennergame.de zurückgibt
	var Bitte_Warten      	= document.body.innerHTML.indexOf("Minuten wieder") + document.body.innerHTML.indexOf("have to wait");
	var Erfolgreich			= document.body.innerHTML.indexOf("Becher geworfen") + document.body.innerHTML.indexOf("You've put");
	var Selber_spenden		= document.body.innerHTML.indexOf("selbst spenden");
	var Genug_spenden       = document.body.innerHTML.indexOf("genug Spenden") + document.body.innerHTML.indexOf("enough donations");
	var Becher_ist_voll     = document.body.innerHTML.indexOf("bis zum Rand")+ document.body.innerHTML.indexOf("full to the brim");
	var Refid_nicht_bekannt = document.body.innerHTML.indexOf("Refid");
	var Unknown_user 		= document.body.innerHTML.indexOf("Unknown");
	var BerlinSpenden		= document.body.innerHTML.indexOf("in den Becher werfen...");

	// was jetzt?
	if (Bitte_Warten > 0) {
		// wir müssen noch warten
		self.close();
	} 
	else if (Erfolgreich > 0){
		// spenden war erfolgreich
		self.close();
	} 
	else if (Genug_spenden > 0) {
		// hat bereits genug bekommen --> schließen
		self.close();
	} 
	else if (Becher_ist_voll > 0) {
		// hat bereits genug bekommen --> schließen
		self.close();
	} 
	else if (Selber_spenden > 0) {
		// das bist ja du selber
		self.close();
	} 
	else if (Refid_nicht_bekannt > 0) {
		// Wenn die Refid nicht bekannt ist
//		document.body.innerHTML = "id ist nicht bekannt";
	} 
	else if (Unknown_user > 0) {
		// Wenn der user nicht bekannt ist
//		document.body.innerHTML = "User ist nicht bekannt";
	} 
	else if (BerlinSpenden > 0) {
		// knopf drücken und zahl eingeben
	}
	else {
		// wir haben ein problem...
		if (document.body.innerHTML.indexOf("Die angeforderte Seite wurde nicht gefunden.") > 0) {
			// Falls die Seite nicht gefunden werden kann (Fehler 404)
			document.body.innerHTML = "404 - Seite wurde nicht gefunden.";
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
//			reloadPage();
		}
	}
}

check();