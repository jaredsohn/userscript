// ==UserScript==
// @name wer-weiss-was - immer benachrichtigen
// @description Die Checkbox: "Du erhaeltst eventuelle Antworten auf diesen Artikel per E-Mail." ist standartmaessig aktiviert.
// @include *wer-weiss-was.de*
// ==/UserScript==

window.addEventListener("load", function(e) {
	var bencheckbox = document.getElementById("Benachrichtigung");
	if ( bencheckbox ) {
		bencheckbox.checked = true;
	}
}, false);
