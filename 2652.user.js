// ==UserScript==

// @name           Heiseforen.sig

// @namespace      http://p-hu.de

// @description    Macht Signaturen in Postings rein

// @include        http://www.heise.de/*write*
// @include        http://heise.de/*write*
// @include        http://www.heise.de/*go*
// @include        http://heise.de/*go*
// @include        http://www.heise.de/*post*
// @include        http://heise.de/*post*

// ==/UserScript==

// Signatur-Text
var sig =
	"Signatur-Text\nBlablabla\n";

// AutoZitat: 1 falls bei Antworten automatisch das Zitat
//            vom Vorposter mit rein soll, ansonsten 0
var autoZitat = 1;

(function() {
	var ersterKlick = document.URL.match(/write/);
	var schreibeSig = 1;

	if (ersterKlick) {
		GM_setValue('nochKeineSigDrin', 1);
		if (autoZitat) {
			var quoteBtn = document.getElementsByName("quote")[0];
			if (quoteBtn) {
				// "Beantworten" ==> erst das Zitat einfuegen
				quoteBtn.click();
				schreibeSig = 0;
			}
		}
	}
	if (schreibeSig != 0 && GM_getValue('nochKeineSigDrin') != 0) {
	    document.getElementsByName("message")[0].value += "\n\n" + sig;
		GM_setValue('nochKeineSigDrin', 0);
	}
}) ();
