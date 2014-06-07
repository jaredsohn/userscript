// ==UserScript==
// @name           Hiragana/Katakana Romanizer
// @include        *
// ==/UserScript==

var moonspeak = new Array(
	["a", "[\u3041|\u3042|\u30a1|\u30a2]"],
	["i", "[\u3043|\u3034|\u30a3|\u30a4]"],
	["u", "[\u3045|\u3046|\u30a5|\u30a6]"],
	["e", "[\u3047|\u3048|\u30a7|\u30a8]"],
	["o", "[\u3049|\u304a|\u30a9|\u30aa]"],
	["ka", "[\u304b|\u30ab]"],
	["ga", "[\u304c|\u30ac]"],
	["ki", "[\u304d|\u30ad]"],
	["gi", "[\u304e|\u30ae]"],
	["ku", "[\u304f|\u30af]"],
	["gu", "[\u3050|\u30b0]"],
	["ke", "[\u3051|\u30b1]"],
	["ge", "[\u3052|\u30b2]"],
	["ko", "[\u3053|\u30b3]"],
	["go", "[\u3054|\u30b4]"],
	["sa", "[\u3055|\u30b5]"],
	["za", "[\u3056|\u30b6]"],
	["si", "[\u3057|\u30b7]"],
	["zi", "[\u3058|\u30b8]"],
	["su", "[\u3059|\u30b9]"],
	["zu", "[\u305a|\u30ba]"],
	["se", "[\u305b|\u30bb]"],
	["ze", "[\u305c|\u30bc]"],
	["so", "[\u305d|\u30bd]"],
	["zo", "[\u305e|\u30be]"],
	["ta", "[\u305f|\u30bf]"],
	["da", "[\u3060|\u30c0]"],
	["ti", "[\u3061|\u30c1]"],
	["di", "[\u3062|\u30c2]"],
	["tu", "[\u3063|\u3064|\u30c3|\u30c4]"],
	["du", "[\u3065|\u30c5]"],
	["te", "[\u3066|\u30c6]"],
	["de", "[\u3067|\u30c7]"],
	["to", "[\u3068|\u30c8]"],
	["do", "[\u3069|\u30c9]"],
	["na", "[\u306a|\u30ca]"],
	["ni", "[\u306b|\u30cb]"],
	["nu", "[\u306c|\u30cc]"],
	["ne", "[\u306d|\u30cd]"],
	["no", "[\u306e|\u30ce]"],
	["ha", "[\u306f|\u30cf]"],
	["ba", "[\u3070|\u30d0]"],
	["pa", "[\u3071|\u30d1]"],
	["hi", "[\u3072|\u30d2]"],
	["bi", "[\u3073|\u30d3]"],
	["pi", "[\u3074|\u30d4]"],
	["hu", "[\u3075|\u30d5]"],
	["bu", "[\u3076|\u30d6]"],
	["pu", "[\u3077|\u30d7]"],
	["he", "[\u3078|\u30d8]"],
	["be", "[\u3079|\u30d9]"],
	["pe", "[\u307a|\u30da]"],
	["ho", "[\u307b|\u30db]"],
	["bo", "[\u307c|\u30dc]"],
	["po", "[\u307d|\u30dd]"],
	["ma", "[\u307e|\u30de]"],
	["mi", "[\u307f|\u30df]"],
	["mu", "[\u3080|\u30e0]"],
	["me", "[\u3081|\u30e1]"],
	["mo", "[\u3082|\u30e2]"],
	["ya", "[\u3083|\u3084|\u30e3|\u30e4]"],
	["yu", "[\u3085|\u3086|\u30e5|\u30e6]"],
	["yo", "[\u3087|\u3088|\u30e7|\u30e8]"],
	["ra", "[\u3089|\u30e9]"],
	["ri", "[\u308a|\u30ea]"],
	["ru", "[\u308b|\u30eb]"],
	["re", "[\u308c|\u30ec]"],
	["ro", "[\u308d|\u30ed]"],
	["wa", "[\u308e|\u308f|\u30ee|\u30ef]"],
	["wi", "[\u3090|\u30f0]"],
	["we", "[\u3091|\u30f1]"],
	["wo", "[\u3092|\u30f2]"],
	["n", "[\u3093|\u30f3]"],
	["vu", "[\u30f4]"],
	["ka", "[\u30f5]"],
	["ke", "[\u30f6]"]
);

document.addEventListener('keydown', function(event) {
	if(event.altKey && event.keyCode == 82) {
		var s;
		if(s = window.getSelection().toString()) {
			for(x in moonspeak)
				s = s.replace(new RegExp(moonspeak[x][1], "gm"), moonspeak[x][0]);
			alert(s);
		}
	}
}, true);