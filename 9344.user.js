// ==UserScript==
// @name          otrforum ad remover
// @description	  removes "Sponsored Links"
// @include       http://otrforum.com/*
// @include       http://www.otrforum.com/*
// ==/UserScript==

(function() {
	var match_re = /Sponsored Links/gi;
	var tabs = document.getElementsByTagName("table");
	for (var i=0; i<tabs.length; i++) {
		if (tabs[i].innerHTML.match(match_re)) {
			tabs[i].parentNode.removeChild(tabs[i]);
		}
	}
}
)();