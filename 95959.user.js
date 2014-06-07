// ==UserScript==
// @name           Spiegel.de Fotostrecke Anpassen
// @namespace      www.goodsoul.de
// @description    Verhindert, dass man am Ende einer Fotostrecke zur Fotostreckenübersicht kommt
// @include        http://www.spiegel.de/fotostrecke/*
// @grant		   none
// ==/UserScript==

// bei SPAM gibts keine Zusammenfassung: also raus wenns "spBigaLogoZitate" gibt
if (document.getElementById("spBigaLogoZitate") != null)
	return;

// neue vor-zurück controls sind jetzt in der class 'spBigaControl'
var divs = document.getElementsByTagName('div');
var vonBisControls = new Array();
for (i = 0, j = 0; i < divs.length; i++)
	if ( divs[i].className == 'spBigaControl')
		vonBisControls[j++] = divs[i];

// text "1 von 12" holen:
var vonBisText = vonBisControls[0].childNodes[2].textContent

// text splitten - ist komischer Weise nicht mit Spaces " ".. *shrug*
// wir nehmen einfach den charater VOR dem ersten "v" das wir finden :)
var splitChar = "";
for (i = 0; i < vonBisText.length; i++){
    if (vonBisText[i] === "v"){
        splitChar = vonBisText[i - 1];
        break;
    }
}
var vonBisParts = vonBisText.split(splitChar);
// seitenanzahlen finden - ist nicht mehr "minus eins"!
var numPages = vonBisParts[2];
var thisPage = vonBisParts[0];

// wenn am Anfang oder Ende: Links umbiegen
if (thisPage == 1 || thisPage == numPages) {
	var linkParts = vonBisControls[0].childNodes[4].getAttribute("HREF").split('-');

	// am Anfang: // zurück-Pfeil auf echte letzte Seite:
	if (thisPage == 1) {
		linkParts[linkParts.length - 1] = numPages + ".html";
		for (i = 0; i < 2; i++)
			vonBisControls[i].childNodes[1].setAttribute( "HREF", linkParts.join("-") );
		return;
	}

	// am Ende: // grossen bildlink und vor-Pfeil auf Anfang biegen:
	if (thisPage == numPages) {
		linkParts[linkParts.length - 1] = ".html";
		var linkToFirstPage = linkParts.join("-");
		document.getElementById('spBigaBild').childNodes[1].setAttribute("HREF", linkToFirstPage);
		for (i = 0; i < 2; i++)
			vonBisControls[i].childNodes[4].setAttribute("HREF", linkToFirstPage);
	}
}