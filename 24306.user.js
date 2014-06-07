// ==UserScript==
// @name           untranslit kaledin
// @namespace      http://userscripts.org/users/48278
// @description    переводит утошгу каледина с молдавского на русский
// @include        http://lj.rossia.org/*
// ==/UserScript==

var links=document.getElementsByTagName('a');
for (var i = 0; i < links.length; ++i) {
	var change = "";
	if (links[i].innerHTML == "<b>kaledin</b>")
		change = "<b>утошга каледин</b>";
	else if (links[i].innerHTML == "<b>triglau</b>")
		change = "<b>утошга триглав</b>";
    if (change != "") {
	links[i].innerHTML = change;
	var node = links[i];
	while (node.id.substring(0, 5) != "ljcmt" && node.tagName != "BODY")
		node = node.parentNode;
	if (node) untranslitNode(node);
    }
}

function untranslitNode(node) {
	if (node.nodeName == "#text")
		node.nodeValue = untranslit(node.nodeValue)
	else
		for (var i = 0; i < node.childNodes.length; ++i)
			untranslitNode(node.childNodes[i]);
}

function untranslit(s) {
	var symbols = {
  'A': '\u0410',                       'a': '\u0430',
  'B': '\u0411',                       'b': '\u0431',
  'V': '\u0412',                       'v': '\u0432',
  'G': '\u0413',                       'g': '\u0433',
  'D': '\u0414',                       'd': '\u0434',
  'E': '\u0415',                       'e': '\u0435',
  'Yo': '\u0401',                      'yo': '\u0451',
  'Zz': '\u0416',                      'zh': '\u0436',
  'Z': '\u0417',                       'z': '\u0437',
  'I': '\u0418',                       'i': '\u0438',
  'J': '\u0419',                       'j': '\u0439',
  'K': '\u041A',                       'k': '\u043A',
  'L': '\u041B',                       'l': '\u043B',
  'M': '\u041C',                       'm': '\u043C',
  'N': '\u041D',                       'n': '\u043D',
  'O': '\u041E',                       'o': '\u043E',
  'P': '\u041F',                       'p': '\u043F',
  'R': '\u0420',                       'r': '\u0440',
  'S': '\u0421',                       's': '\u0441',
  'T': '\u0422',                       't': '\u0442',
  'U': '\u0423',                       'u': '\u0443',
  'F': '\u0424',                       'f': '\u0444',
  'X': '\u0425', 'H': '\u0425',        'x': '\u0445', 'h': '\u0445',
  'C': '\u0426', 'Ts': '\u0426',       'c': '\u0446', 'ts': '\u0446',
  'Ch': '\u0427',                      'ch': '\u0447',
  'Sh': '\u0428',                      'sh': '\u0448',
  'w': '\u0429',                       'w': '\u0449',
  '""': '\u042A',                      "''": '\u044A',
  'Y': '\u042B',                       'y': '\u044B',
//  '"': '\u042C',                       "'": '\u044C',
  'Je': '\u042D',                      'je': '\u044D',
  'Ju': '\u042E', 'Yu': '\u042E',      'ju': '\u044E', 'yu': '\u044E',
  'Ja': '\u042F', 'Ya': '\u042F',      'ja': '\u044F', 'ya': '\u044F',

  'Tz': '\u0426',       'tz': '\u0446',
  "'": '\u044C',
  'Eh': 'Э',                       'eh': 'э',
  'Kh': '\u0425',
  'kh': '\u0445',
  '?': ' кря?!',
	};
	var v = '';
	var i = 0;
	while (i < s.length) {
		var translated = false;
		var j = 2;
		while (j > 0 && !translated) {
			var letter = pick(s, i, j);
			var t = symbols[letter];
			if (t) {
				v += t;
				translated = true;
				i += j;
			}
			--j;
		}
		if (!translated) {
			v += s[i];
			++i;
		}
	}
	var s = "";
	while (s != v) {
		if (s == "") s = v;
		v = s;
		s = s.replace('бла ', 'кря ');
		s = s.replace(' бла', ' кря');
	}
	return s;
}

function pick(s, i, j) {
	var v = s[i];
	for (var k = 1; k < j; ++k)
		v += s[i + k];
	return v;
}