// ==UserScript==

// @name           L337 GM

// @namespace      letz

// @description    L33t GM

// @include        *gambinomafia.com*

// ==/UserScript==

replacements = {
	"\\b----\\b": "-----------",
        "!": "!!1!",
	"A": "4",
	"B": "b",
	"C": "(",
	"D": "d",
	"E": "3",
	"F": "f",
	"G": "6",
	"H": "h",
	"I": "1",
	"J": "j",
	"K": "|<",
	"L": "|",
	"M": "m",
	"O": "0",
	"P": "p",
	"Q": "9",
	"R": "|2",
	"S": "5",
	"T": "7",
	"U": "u",
	"V": "v",
	"W": "w",
	"Y": "y",
	"Z": "2",
	"Æ": "æ",
	"Ø": "ö",
	"Å": "å",
	"a": "4",
	"b": "b",
	"c": "C",
	"d": "D",
	"e": "3",
	"f": "F",
	"g": "g",
	"h": "H",
	"i": "1",
	"j": "j",
	"k": "K",
	"l": "|",
	"m": "M",
	"n": "N",
	"o": "0",
	"p": "p",
	"q": "q",
	"r": "r",
	"s": "5",
	"t": "7",
	"u": "U",
	"v": "v",
	"w": "W",
	"y": "Y",
	"z": "2",
};



var openingNumber = 0;

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

for ( var i = 0; i < paragraphs.length; i++ )
{

	var paragraph = paragraphs[i];
	paragraph.innerHTML = openings[openingNumber] + paragraph.innerHTML;
	openingNumber++;
	if ( openingNumber == openings.length ) openingNumber = 0;

}

