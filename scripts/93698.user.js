// ==UserScript==
// @name				BsmParty-Benachrichtigung_v2.1
// @author				Zinnecka
// @namespace			http://userscripts.org
// @description			Benachrichtigung, bei neuer Message/Meldung/Gästebucheintrag.
// @include			http://www.bsmparty.de*
// @exclude                     http://www.bsmparty.de/gruppe*
// ==/UserScript==
//Gruppen excluded, da Themen lesen --> unnötig zu aktualisieren

function str_replace(search, replace, subject) {
	return subject.split(search).join(replace);
} //String wenn vorhandener Suchstring durch Suchstring ersetzen und später vergleichen

function check() {
	window.setTimeout("location.reload()", 60000);
	if (document.referrer == location) { /*Letzte Seite = aktueller Seite? Sonst wird noch rumgesurft....*/
		if (document.getElementById("messi_gb")) {
			var divcont = document.getElementById("messi_gb").innerHTML; /*Div-Container Content..*/
			var msg = divcont; //Div-Container mit NACHRICHT
			var gbe = divcont; //Div-Container mit GB
			var mld = divcont; //Div-Container mit MELDUNG
			msg = str_replace("Nachricht", "", msg);
			gbe = str_replace("Gästebucheintr", "", gbe);
			mld = str_replace("Meldung", "", mld);
			if (msg != divcont && gbe != divcont && mld != divcont) {
				alert("Neue(r) Gästebucheintrag/einträge & Meldung(en) & Nachricht(en)!");
			}
			else if (msg != divcont && gbe != divcont) {
				alert("Neue(r) Nachricht(en) & Gästebucheintrag/einträge!");
			}
			else if (msg != divcont && mld != divcont) {
				alert("Neue Nachricht(en) & Meldung(en)!");
			}
			else if (gbe != divcont && mld != divcont) {
				alert("Neue(r) Gästebucheintrag/einträge & Meldung(en)!");
			}
			else if (msg != divcont) {
				alert("Neue Nachricht(en)!");
			}
			else if (gbe != divcont) {
				alert("Neue(r) Gästebucheintrag/einträge!");
			}
			else if (mld != divcont) {
				alert("Neue Meldung(en)!");
			}

		}
	}
}
document.onload = check();