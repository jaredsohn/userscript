// ==UserScript==
// @author wipeer (autor původního scriptu Flake)
// @name Darkpirates Obchodnik
// @description - Zobrazí průměrnou cenu surovin
// @include       http://s*.darkpirates.ba/*
// @include       http://s*.darkpirates.cz/*
// @include       http://s*.ba.darkpirates.org/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//

// Adresa
var url = window.location.href;

// **************  trziste prepis prumernyma cenama  **************
var replacements, regex, key, textnodes, node, s;

replacements = {
       "Quadrinium": "Quadrinium (Ø9.5)",
       "Železo": "Železo (Ø4.5)",
       "Helenium": "Helenium (Ø247)",
       "Polenium": "Polenium (Ø29.7)",
       "Phosarit": "Phosarit (Ø87)",
       "Melanit": "Melanit (Ø132)",
       "Duran": "Duran (Ø20)",
	   "Megatan": "Megatan (4 995)",
	   "Querell": "Querell (6 300)",
	   "Florisar": "Florisar (8 167)",
	   "Warium": "Warium (3 132)",
	   "Crysolit": "Crysolit (19 863)",
	   "Niciltar": "Niciltar (55 782)",
	   "Hypolium": "Hypolium (233 500)",
	   "Einsteinium": "Einsteinium (650 000)",
};


if(url.match('mod=shop')) {

	regex = {};
	for (key in replacements) {
	    regex[key] = new RegExp(key, 'g');
	}

	textnodes = document.evaluate(
	    "//text()",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < textnodes.snapshotLength; i++) {
	    node = textnodes.snapshotItem(i);
	    s = node.data;
	    for (key in replacements) {
		s = s.replace(regex[key], replacements[key]);
	    }
	    node.data = s;
	}

}