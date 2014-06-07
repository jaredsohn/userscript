// ==UserScript==
// @name		Obrońca Wykopowego Paska
// @description		Zmusza stronę probującą uciec z ramki wykopu do uzyskania zgody użytkownika. W przypadku braku zgody, strona jest wyświetlana w ramce.
// @namespace		http://userscripts.org/scripts/show/162567
// @include		http://*wykop.pl/ramka/*
// @grant		none
// @updateURL		http://userscripts.org/scripts/source/162567.meta.js
// @version		1.0.4
// @run-at		document-end
// ==/UserScript==

function holdIframeContent() {
	var tryingToEscape = true;
	var eventsBound = false;
	window.onbeforeunload = function() { 
		if(tryingToEscape) {
			if(!eventsBound) {
				document.getElementById("frame-top").onmouseover = function(e) {
					if(tryingToEscape) {
						tryingToEscape = false;
					}                
				}
				document.getElementById("frame-top").onmouseout = function(e) {
					if(!tryingToEscape && e.pageY >= document.getElementById("frame-top").offsetHeight) {
						tryingToEscape = true;
					}
				}
				eventsBound = true;
			}
			return "Ta strona próbuje zamknąć ramkę Wykopu.";
		}
	}
	if(!document.getElementById("view-frame")) {
		tryingToEscape = false;
	} else {
		document.getElementById("view-frame").onload = function() { 
			tryingToEscape = false;
		};
	}
}

holdIframeContent();