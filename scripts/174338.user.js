// ==UserScript==
// @name        Mes Titres Sont Longs
// @namespace   Mes Titres Sont Longs
// @description Propose de résoudre le manque de place dans un titre.
// @include     http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==


var remplacez_moi = {
	"viii": "ⅷ",
	"mil": "㏕",
	"mol": "㏖",
	"log": "㏒",
	"xii": "ⅻ",
	"vii": "ⅶ",
	"iii": "ⅲ",
	"ffi": "ﬃ",
	"ffl": "ﬄ",
	"...": "…",
	"=/=": "≠",
	"da": "㍲",
	"KB": "㎅",
	"kA": "㎄",
	"nA": "㎁",
	"GB": "㎇",
	"nF": "㎋",
	"Hz": "㎐",
	"fm": "㎙",
	"nm": "㎚",
	"Pa": "㎩",
	"ns": "㎱",
	"nV": "㎵",
	"kV": "㎸",
	"cd": "㏅",
	"Ca": "㏇",
	"dB": "㏈",
	"Gy": "㏉",
	"ha": "㏊",
	"in": "㏌",
	"kt": "㏏",
	"lm": "㏐",
	"ln": "㏑",
	"lx": "㏓",
	"mb": "㏔",
	"PR": "㏚",
	"sr": "㏛",
	"Sv": "㏜",
	"Wb": "㏝",
	"ij": "ĳ",
	"IJ": "Ĳ",
	"oV": "㍵",
	"ff": "ﬀ",
	"fi": "ﬁ",
	"fl": "ﬂ",
	"ft": "ﬅ",
	"ij": "ĳ",
	"IJ": "Ĳ",
	"ue": "ᵫ",
	"ts": "ʦ",
	"tf": "ʧ",
	"fn": "ʩ",
	"lj": "ǉ",
	"ls": "ʪ",
	"lz": "ʫ",
	"st": "ﬆ",
	"JX": "Ԕ",
	"Rs": "₨",
	"oo": "ꝏ",
	"OO": "Ꝏ",
	"IV": "Ⅳ",
	"VI": "Ⅵ",
	"IX": "Ⅸ",
	"XI": "Ⅺ",
	"iv": "ⅳ",
	"vi": "ⅵ",
	"ix": "ⅸ",
	"xi": "ⅺ",
	"IX": "Ⅸ",
	"XI": "Ⅺ",
	"ao": "ꜵ",
	"AO": "Ꜵ",
	"ll": "ỻ",
	"IL": "Ỻ",
	"dz": "ʣ",
	"Dz": "ǲ",
	"DZ": "Ǳ",
	"aa": "ꜳ",
	"AA": "Ꜳ",
	"ae": "æ",
	"AE": "Æ",
	"AU": "Ꜷ",
	"oy": "ѹ",
	"Oy": "Ѹ",
	"oe": "œ",
	"OE": "Œ",
	"nj": "ǌ",
	"Nj": "ǋ",
	"NJ": "Ǌ",
	"tc": "ʨ"
};

function raccourcir(event) {
	var titre = document.getElementById('newsujet').value;
	var titre_longueur = titre.length;
	if (titre_longueur == 40) {
		clavier = event.which;
		if (jQuery.inArray(clavier, [6, 8, 9, 37, 38, 39, 40, 44, 46, 91]) == -1) {
			for (a in remplacez_moi) {
				var titre = titre.replace(a, remplacez_moi[a], 'g');
			}
			document.getElementById('newsujet').value = titre;
			document.getElementById('newsujet').focus();
		}
	}
}

document.getElementById('newsujet').addEventListener("keypress", raccourcir, false);