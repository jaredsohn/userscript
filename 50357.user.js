// ==UserScript==
// @name          	Spenden-Check
// @description   	Schlieszt das aktuelle Tab bei Erfolg wieder (im Firefox about:config dom.allow_scripts_to_close_windows auf true setzen!)
// @description   	Bei 500er Fehlern wird die Seite nach 10s einfach noch einmal geladen
// @version		2.1
// @namespace     	http://alkmona.pennergame.de
// @author		alkmona
// @include       	http://*.pennergame.de/change_please/*
// @exclude	   	http://*.pennergame.de/change_please/statistics/*
// @license		http://www.gnu.org/licenses/lgpl.html	
// ==/UserScript==


function reloadPage() {
	document.body.innerHTML = "Die Seite konnte nicht geladen werden! Bitte lade die Seite erneut (F5).";
	setTimeout("window.location.reload();",10000);
}

function check() {
	// Pruefen, welches Ergebnis Pennergame.de zurï¿½ckgibt
	var Bitte_Warten      	= document.body.innerHTML.indexOf("Minuten wieder Spenden");
	var Erfolgreich			= document.body.innerHTML.indexOf("Becher geworfen!");
	var Genug_spenden       = document.body.innerHTML.indexOf("genug Spenden");
	var Becher_ist_voll     = document.body.innerHTML.indexOf("bis zum Rand");
	var Selber_spenden		= document.body.innerHTML.indexOf("selbst spenden");
	var Refid_nicht_bekannt = document.body.innerHTML.indexOf("Refid");
	var Unknown_user			= document.body.innerHTML.indexOf("Unknown");

	// was jetzt?
	if (Bitte_Warten > 0) {
		// wir mÃ¼ssen noch warten
		self.close();
	} 
	else if (Erfolgreich > 0){
		// spenden war erfolgreich
		self.close();
	} 
	else if (Genug_spenden > 0) {
		// hat bereits genug bekommen --> schlieÃŸen
		self.close();
	} 
	else if (Becher_ist_voll > 0) {
		// hat bereits genug bekommen --> schlieÃŸen
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
	else {
		// wir haben ein problem...
		if (document.body.innerHTML.indexOf("Die angeforderte Seite wurde nicht gefunden.") > 0) {
			// Falls die Seite nicht gefunden werden kann (Fehler 404)
			document.body.innerHTML = "404 - Seite wurde nicht gefunden.";
		} 
		else if (document.body.innerHTML.indexOf("Auf die angeforderte Seite kann aufgrund eines Fehlers nicht zugegriffen werden.") > 0) {
			// Falls die Seite nicht geladen werden kann (Fehler 500)
			reloadPage();
		} 
		else if (document.body.innerHTML.indexOf("503 Service Unavailable") > 0) {
			// Falls die Seite nicht geladen werden kann (Fehler 503)
			reloadPage();
		}
		else {
			// whatever
			reloadPage();
		}
	}
}

check();