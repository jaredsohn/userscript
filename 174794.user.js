// ==UserScript==
// @name        Zeit
// @namespace   Quack
// @description Zeigt Uhrzeit an
// @include     http://www.google.de/*
// @version     1
// ==/UserScript==


//Einstellungen
var signalzeitVon		= 6;			// Zeitpunkt für Signalfarbe - von
var signalzeitBis 		= 20;			// Zeitpunkt für Signalfarbe - bis
var textgroesse  		= "20px"; 		// Größe des Textes
var textfarbe 			= "white";		// Schriftfarbe
var signalfarbe			= "red";		// Schriftfarbe, wenn Zeitpunkt eingetreten ist
var hintergrundfarbe 		= "gray";		// Farbe des Hintergrundes


// Das Skript
if (!document.getElementById("quhrzeit")) {
	var content = document.createElement("div");
	content.id = "quhrzeit";
	content.style.top = "0px";
	content.style.left = "0px";
	content.style.padding = "0 5px";
	content.style.display = "block";
	content.style.position = "absolute";
	content.style.zIndex = 1000;
	content.style.background = hintergrundfarbe;
	content.style.color = textfarbe;
	content.style.fontSize = textgroesse;
	document.body.appendChild(content);
}

function ZeitAnzeigen() {
	var Jetzt = new Date();
	var Stunden = Jetzt.getHours();
	var Minuten = Jetzt.getMinutes();
	var Sekunden = Jetzt.getSeconds();
	var Vorstd = ((Stunden < 10) ? "0" : "");
	var Vormin = ((Minuten < 10) ? ":0" : ":");
	var Vorsek = ((Sekunden < 10) ? ":0" : ":");
	var Uhrzeit = Vorstd + Stunden + Vormin + Minuten + Vorsek + Sekunden;
	if (Stunden <= signalzeitVon || Stunden >= signalzeitBis) {
		content.style.color = signalfarbe;
	}
	document.getElementById('quhrzeit').innerHTML = Uhrzeit;
	setTimeout(function(){ZeitAnzeigen()},1000);
}

ZeitAnzeigen();