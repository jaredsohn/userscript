// ==UserScript==
// @name           Cirilica
// @namespace      http://srb.dumdumbum.com/
// @description    prebacije latinicna slova u cirilicna
// @author         Ivan Marinkovic http://srb.dumdumbum.com/
// @version        1.0
// @lastupdated    10-11-2009
// @include        http://*
// @exclude        https://
// ==/UserScript==


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "siječnja": "јануарa",
	"siječnju": "јануару",
	"siječanj": "јануар",
	"Siječnja": "јануарa",
	"Siječanj": "јануар",
	"veljače": "фeбруaрa",
	"veljaču": "фeбруaру",
	"veljača": "фeбруaр",
	"Veljače": "фeбруaрa",
	"Veljača": "фeбруaр",
	"ožujka": "мaртa",
	"ožujak": "мaрт",
	"Ožujka": "мaртa",
	"Ožujak": "мaрт",
	"travnja": "aприлa",
	"travanj": "aприл",
	"Travnja": "aприлa",
	"Travanj": "aприл",
	"svibnja": "мaja",
	"svibanj": "мaj",
	"Svibnja": "мaja",
	"Svibanj": "мaj",
	"lipnja": "jунa",
	"lipanj": "jун",
	"Lipnja": "jунa",
	"Lipanj": "jун",
	"srpnja": "jулa",
	"srpanj": "jул",
	"Srpnja": "jулa",
	"Srpanj": "jул",
	"kolovoza": "aвгустa",
	"kolovoz": "aвгуст",
	"Kolovoza": "aвгустa",
	"Kolovoz": "aвгуст",
	"rujna": "сeптeмбaрa",
	"rujan": "сeптeмбaр",
	"Rujna": "сeптeмбaрa",
	"Rujan": "сeптeмбaр",
	"listopada": "октобaрa",
	"listopad": "октобaр",
	"Listopada": "октобaрa",
	"Listopad": "октобaр",
	"studena": "новeмбaрa",
	"studeni": "новeмбaр",
	"Studena": "новeмбaрa",
	"Studeni": "новeмбaр",
	"prosinca": "дeцeмбaрa",
	"prosinac": "дeцeмбaр",
	"Prosinca": "дeцeмбaрa",
	"Prosinac": "дeцeмбaр",
	"dž": "џ",
	"DŽ": "Џ",
	"lj": "љ",
	"LJ": "Љ",
	"Lj": "Љ",
	"nj": "њ",
	"NJ": "Њ",
	"Nj": "Њ",
	"b": "б",
    "B": "Б",
	"v": "в",
	"V": "В",
	"g": "г",
	"G": "Г",
	"d": "д",
	"D": "Д",
	"đ": "ђ",
	"Đ": "Ђ",
	"ž": "ж",
	"Ž": "Ж",
	"z": "з",
	"Z": "З",
	"i": "и",
	"I": "И",
	"m": "м",
	"M": "М",
	"k": "к",
	"K": "К",
	"o": "о",
	"O": "О",
	"l": "л",
	"L": "Л",
	"n": "н",
	"N": "Н",
	"p": "п",
	"P": "П",
	"r": "р",
	"R": "Р",
	"s": "с",
	"S": "С",
	"t": "т",
	"T": "Т",
	"ć": "ћ",
	"Ć": "Ћ",
	"u": "у",
	"U": "У",
	"f": "ф",
	"F": "Ф",
	"h": "х",
	"H": "Х",
	"c": "ц",
	"C": "Ц",
	"č": "ч",
	"Č": "Ч",
	"š": "ш",
	"Š": "Ш"}; 

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();