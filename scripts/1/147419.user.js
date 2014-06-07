// ==UserScript==
// @name        vndb hide non-japanese entries
// @namespace   vndbHideNonJapanese
// @include     http://vndb.org/*
// @version     1.0.1
// ==/UserScript==


(function() {
	
	var hide = true;
	
//	remove this next line (or add // before it) to completely hide oelvns
	hide = false;
	
	var init = function() {
		var mainContent = document.getElementById("maincontent"),
			listEntries = mainContent.querySelectorAll(".browse table tr"),
			languages, lang, jp, i, j, el;
		
		GM_addStyle(".browse tr.englishOnly td {opacity:0.2;font-size:0.8em;padding-top:0;padding-bottom:0;vertical-align:middle;}");
		
		for (i = 0; i < listEntries.length; i += 1) {
			el = listEntries[i];
			jp = false;
			languages = el.querySelectorAll('td.tc3 acronym');
			if (languages.length === 0) {
				jp = true;
			} else {
				for (j = 0; j < languages.length; j += 1) {
					lang = languages[j];
					if (lang.className && lang.className.indexOf("ja") !== -1) {
						jp = true;
					}
				}
			}
			if (jp !== true) {
				if (hide === true) {
					el.parentNode.removeChild(el);
				} else {
					el.className += " englishOnly";
				}
			}
		}
	};

	if(document.body) { init(); }
	else { window.addEventListener("DOMContentLoaded", init, false); }
	
}());