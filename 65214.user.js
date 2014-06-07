// ==UserScript==
// @name           Wer kennt wen? AktuellesHider
// @namespace      wkwakthide
// @description    Blendet die Aktuelles-Nachrichten auf der Startseite aus
// @include        *wer-kennt-wen.de/start*
// ==/UserScript==

// Content
var contentArray = document.getElementById("content").innerHTML.split("<h2><span>");

for (i = 1; i < contentArray.length; i++) {
	if (contentArray[i].substr(0,9) == "Aktuelles") {
		contentArray[i] = "";
		} else {
			contentArray[i] = "<h2><span>" + contentArray[i];
		}
}

document.getElementById("content").innerHTML = contentArray.join("");

document.getElementById("content").innerHTML = document.getElementById("content").innerHTML.substring(0,document.getElementById("content").innerHTML.indexOf('<h2 id="invHeader">'));

// Sidebar
var sidebarArray = document.getElementById("sidebar").innerHTML.split("<h2><span>");

for (i = 1; i < sidebarArray.length; i++) {
	if (sidebarArray[i].substr(0,9) == "wkw-Mobil"
		|| sidebarArray[i].substr(0,14) == "Leute einladen"
		|| sidebarArray[i].substr(0,8) == "Top Orte") {
		sidebarArray[i] = "";
		} else {
			sidebarArray[i] = "<h2><span>" + sidebarArray[i];
		}
}

document.getElementById("sidebar").innerHTML = sidebarArray.join(" ");