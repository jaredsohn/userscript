// ==UserScript==
// @name       Abendblatt Login speichern
// @namespace  http://gutes.login.abendblatt.de.example.com
// @version    0.2
// @description  Speichert die Zugangsdaten für Abendblatt.de
// @include      http://www.abendblatt.de/*
// @include	   http://abendblatt.de/*
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_registerMenuCommand
// @copyright  2013+, ich, du, kannste frei verwenden
// ==/UserScript==
GM_registerMenuCommand("Kundendaten neu eingeben", kd_eingeben);

function kd_einfuegen() {
	var plzfeld;
	plzfeld = document.getElementById('zipCode');
	if (plzfeld) {
		plzfeld.setAttribute("value", GM_getValue("abnd_pw"));
	}

	var knfeld;
	knfeld = document.getElementById('customerId');
	if (knfeld) {
		knfeld.setAttribute("value", GM_getValue("abnd_id"));
	}
}

function kd_eingeben() {
	GM_setValue("abnd_id",prompt("Bitte gib deine Kundennummer ein:",""));
    GM_setValue("abnd_pw",prompt("Bitte gib deine Postleitzahl ein:",""));
	kd_einfuegen();
}

if(GM_getValue("abnd_id","") == "") {
	kd_eingeben();
}

kd_einfuegen();
