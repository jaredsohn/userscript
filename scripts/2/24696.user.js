// ==UserScript==
// @name           suche.p0t.de
// @namespace      http://userscripts.org/users/33073/scripts
// @description    Für Tippfehler...
// @include        http://*.p0t.de/*
// @exclude        http://suche.p0t.de/*
// ==/UserScript==




var term = window.location.href.split("http://")[1].split("p0t.de")[0].replace(/\.$/, ""), type = false;

var last = (term.substring(0,5) == "last."), first = (term.substring(0,2) == "1.");

if (last || first) type = true;

if (!type) window.location.href = "http://p0t.de/"+term;

else {

	if (last) {
		window.location.href = "http://p0t.de/"+term.substring(5)+"/last";
	}

	if (first) {
		window.location.href = "http://p0t.de/"+term.substring(2)+"/1";
	}

}
