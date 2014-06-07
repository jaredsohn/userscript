// ==UserScript==
// @name			Rainbow Brindle
// @namespace		http://userscripts.org/users/347577
// @description		Sets active field value to a random word when ` is pressed.
// @include			*
// @exclude			http://*.google.com/*
// ==/UserScript==

var ctrlDown = false;
var dictionary = ["abjure",
"abrogate",
"abstemious",
"acumen",
"antebellum",
"auspicious",
"banana",
"belie",
"bellicose",
"bowdlerize",
"chicanery",
"churlish",
"circumlocution",
"circumnavigate",
"deciduous",
"deleterious",
"defenestrate",
"diffident",
"enervate",
"enfranchise",
"epiphany",
"equinox",
"euro",
"evanescent",
"expurgate",
"facetious",
"fatuous",
"feckless",
"fiduciary",
"filibuster",
"gauche",
"gerrymander",
"hegemony",
"hemoglobin",
"hobgoblin",
"homogeneous",
"hubris",
"hypotenuse",
"impeach",
"incognito",
"incontrovertible",
"inculcate",
"infrastructure",
"interpolate",
"irony",
"jejune",
"kinetic",
"kowtow",
"laissez faire",
"lexicon",
"loquacious",
"lugubrious",
"metamorphosis",
"moiety",
"nanotechnology",
"nihilism",
"nomenclature",
"nonsectarian",
"notarize",
"obsequious",
"oligarchy",
"omnipotent",
"orthography",
"oxidize",
"parabola",
"paradigm",
"parameter",
"pecuniary",
"photosynthesis",
"plagiarize",
"plasma",
"polymer",
"precipitous",
"quasar",
"quotidian",
"rainbow",
"recapitulate",
"reciprocal",
"reparation",
"respiration",
"sanguine",
"soliloquy",
"subjugate",
"suffragist",
"supercilious",
"tautology",
"taxonomy",
"tectonic",
"tempestuous",
"thermodynamics",
"totalitarian",
"unctuous",
"usurp",
"vacuous",
"vehement",
"vortex",
"winnow",
"wrought",
"xenophobe",
"yeoman",
"ziggurat"];

function goDown(e) {
	if (e.keyCode == 17) {
		ctrlDown = true;
	}
}

function goUp(e) {
	if (e.keyCode == 17) {
		ctrlDown = false;
	}
}

function goPress(e) {
	if (ctrlDown && e.charCode == 96) {
		var word = dictionary[parseInt(Math.random()*dictionary.length)];
		if (document.activeElement.value.length > 0) {
			document.activeElement.value += " ";
		} else {
			word = word.charAt(0).toUpperCase() + word.slice(1);
		}
		document.activeElement.value += word;
		return false;
	}
}

//if (window.top==window.self) { 
	window.addEventListener('keydown', goDown, true);
	window.addEventListener('keyup', goUp, true);
	window.addEventListener('keypress', goPress, true);
//}
	