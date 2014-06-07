// ==UserScript==
// @name           HA Name Fix beta
// @namespace      HA Name Fix by miraclew
// @description    Fixes special characters in hockeyarena
// @include        http://www.hockeyarena.net/*
// @include        http://hockeyarena.net/*
// ==/UserScript==


replacements = {

//LATVIA

	"\u00F2\u00F0": "ns",
	"\u00CCi": "Gi",
	"\u00CDi": "Ki",
	"\u00EDi": "gi",
	"\u00ECi": "gi",
	"\u00EDi": "ki",
	"\u00EF\u00ED": "lk",
	"\u00ED\u00EF": "kl",
	"\u00E7v": "ev",
	"\u00EE\u00F2": "in",
	"\u00E7t": "et",
	"\u00E7j": "ej",
	"\u00C7r": "Er",
	"\u00E7n": "en",
	"\u00E7d": "ed",
	"r\u00ECe": "rge",
	"e\u00EFo": "elo",
	"a\u00F2e": "ane",
	"u\u00EFs": "uls",
	"e\u00EFk": "elk",
	"e\u00F2i": "eni",
	"b\u00E7r": "ber",
	"m\u00E7n": "men",
	"m\u00E8e": "mce",
	"\u00EFav": "lav",
	"\u00EFev": "lev",
	"l\u00E7t": "let",
	"\u00E8ij": "cij",
	"e\u00EFe": "ele",
	"a\u00F2i": "ani",
	"s\u00E7n": "sen",
	"v\u00E7r": "ver",
	"g\u00F2e": "gne",
	"i\u00F2a": "ina",
	"n\u00E8a": "nca",
	"\u00E7rz": "erz",
	"o\u00F2i": "oni",
	"i\u00EFo": "ilo",
	"V\u00E7r": "Ver",
	"J\u00E7k": "Jek",
	"\u00CD\u00E7m": "Kem",
	"vi\u00E8s": "vics",
	"\u00D2i": "Ni",
	"\u00C8ak": "Cak",
	"\u00C7riks": "Eriks",
	"\u00C7lerts": "Elerts",

//CZECH

	"\u00C8e": "Ce",
	"\u00C8\u00E1": "C\u00E1",
	"\u00C8\u00ED": "C\u00ED",
	"\u017D\u00EF": "\u017Dd",
	"\u00E1\u00E8": "\u00E1c",
	"\u00E8e": "ce",
	"e\u00E8": "ec",
	"\u00E8o": "co",
	"o\u00E8\u00ED": "oc\u00ED",
	"i\u00E8k": "ick",
	"j\u00E8\u00ED": "jci",
	"u\u00E8k": "uck",
	"o\u00E8i": "oci",
	"o\u00E8k": "ock",
	"v\u00E8\u00ED": "vc\u00ED",
	"\u00E8\u00EDk": "cik",
	"\u00F2\u00E1k": "n\u00E1k",
	"Van\u00E8ura": "Vancura",

//SLOVENIA

	"\u00E8ek": "cek",
	"\u0161i\u00E8": "\u0161ic",
	"\u017Ei\u00E8": "\u017Eic",
	"\u00E8i\u00E8": "cic",

//SLOVAKIA

	"\u00C8o": "Co",
	"\u00C8a": "Ca",
	"\u00E8\u00E1": "c\u00E1",
	"a\u00E8": "ac",
	"i\u00EF": "id",
	"i\u00E8n": "icn",
	"\u00E8\u00E1k": "c\u00E1k",
	"\u00E8\u00EDk": "cik",
	"a\u00EFu": "adu",
	"\u00EFo\u0161": "do\u0161",
	"\u0161\u00F2o": "\u0161no",
	"\u00C8i\u00E8o": "Cico",
	"u\u00E8ko": "ucko",

//BOSNIA

	"\u00C8i": "Ci",
	"\u00C8u": "Cu",
	"\u0161\u00E8a": "\u0161ca",
	"i\u00E8i": "ici",

//ROMANIA

	"\u00aa": "S",
	"\u00ba": "s",
	"\u00de": "Z",
	"\u00fe": "z",

//WEIRD CHARACTERS

	"\u00e6": "c",
	"\u00c6": "C",
	"\u00d0": "S",
	"\u00F0": "s",
	"\u00f8": "r",
	"\u00d8": "R",
	"\u00b3": "l",
	"\u00bf": "z",
	"\u00bc": "L",
	"\u00be": "l"
	
};



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

var paragraphs = document.getElementsByTagName( 'p' );
