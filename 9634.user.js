// ==UserScript==
// @name           Onlinekosten.de Anzeige-Block Remover
// @description    Entfernt den Anzeigen-Block in den Forumsthreads
// @include        http://www.onlinekosten.de/forum/showthread.php*
// ==/UserScript==

(function() {
	var ad = document.getElementsByTagName("div");
	for (var i=0; i<ad.length; i++) {
		if (ad[i].getAttribute("id") == "lastpost") {
		ad[i-1].parentNode.removeChild(ad[i-1]);
		}
	}
}
)();