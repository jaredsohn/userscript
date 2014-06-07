
// OED Unicode
// version 1.4
// Copyright (c) 2005-9, Justin Kerk (dopefishjustin at gmail dot com)
// http://interbutt.com/programs/firefox/
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// based on:
// Frownies
// version 0.6 BETA!
// 2005-05-06
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OED Unicode
// @namespace     http://interbutt.com/programs/firefox/
// @description   Converts GIFs for special characters in OED Online to Unicode text
// @include       http://*.oed.com/*
// @include       http://oed.com/*
// @include       http://*.askoxford.com/*
// ==/UserScript==

//Notes:

//RECOMMENDED FONTS
//Because of the wide range of characters used in the OED, you'll need some special fonts.
//I recommend installing both of the following (and the CSS used by this script reflects that):
//Charis SIL: http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&item_id=CharisSILfont
//Aisa Unicode: http://www.oeaw.ac.at/kal/multikey/ (the EXE is a ZIP archive, extract it)

//TODO
//some entries, such as "fetus" have character codes in the HTML page title

//LIMITATIONS
//IPA small capital Y (U+028F) is shown using a small-caps Y, not an image, so it's not converted
//some entries, like 'integral' and 'integer', have custom (unconvertible) math images
//Arabic and Hebrew are in visual order in the OED so I'm using LRO as a kludge,
//  and the results won't be usable for searching Google etc.

//AMBIGUOUS/ERRONEOUS CHARACTERS
//{ayin} is used in 'Ozymandias' for Egyptian and in 'O' for Semitic transcription
//  the image looks more like U+A725 LATIN SMALL LETTER EGYPTOLOGICAL AIN so I've used that
//  but U+02BF MODIFIER LETTER HALF RING would also work (and has wider font support)
//{Cbreve} is used in 'robot' erroneously for {Chacek}
//{ghacek} is used in 'pasha' erroneously for {gbreve}
//{glots} in 'Tohono O'odham' looks like U+02C0 MODIFIER LETTER GLOTTAL STOP
//  but the language may actually use U+02BC MODIFIER LETTER APOSTROPHE
//{hatpath} and {hatqam} in 'sheva' are plainly meant to represent
//  U+05B2 HEBREW POINT HATAF PATAH and U+05B3 HEBREW POINT HATAF QAMATS
//  so I've converted them as such, but the images differ slightly
//  {hatseg} in the same entry appears correct
//{mu} represents both U+03BC GREEK SMALL LETTER MU and U+00B5 MICRO SIGN
//{phi} represents both U+03C6 GREEK SMALL LETTER PHI and U+03D5 GREEK PHI SYMBOL
//  the latter's glyph form is used in the image but the former is what I'm using for now
//  new entries are using {phi2} (with the phi-symbol glyph) for Greek words....
//{shtsyll} is used in 'hyphen' for an ancient Greek hyphen, not in Unicode?
//{swing} may represent both U+2053 SWUNG DASH and U+223C TILDE OPERATOR
//{taur} is used in 'W' for something like U+0223 LATIN SMALL LETTER OU
//{tri} is used in 'H' erroneously for {Delta}

//NOT IN UNICODE
//{blb} - early glyph variant of U+266E MUSIC NATURAL SIGN
//   in 'B'
//{blJ} - blackletter glyph variant of U+004A LATIN CAPITAL LETTER J
//   in 'J'
//   looks different from U+1D50D MATHEMATICAL FRAKTUR CAPITAL J
//{blU} - blackletter glyph variant of U+0055 LATIN CAPITAL LETTER U
//   in 'U'
//{bly} - blackletter glyph variant of U+0079 LATIN SMALL LETTER Y
//   in 'Y'
//{cdot} - Roman numeral capital c with dot, derived from Etruscan theta
//   in 'M'
//   looks the same as U+03FE GREEK CAPITAL DOTTED LUNATE SIGMA SYMBOL but semantically different
//{dlessj1}, {dlessj2}, {dlessj3} - glyph variants of U+0237 LATIN SMALL LETTER DOTLESS J
//   in 'J'
//{egchi} - early glyph variant of U+03A7 GREEK CAPITAL LETTER CHI
//   in 'X'
//{eggamma1}, {eggamma2} - early glyph variants of U+0393 GREEK CAPITAL LETTER GAMMA
//   in 'C'
//{egiota} - early glyph variant of U+0399 GREEK CAPITAL LETTER IOTA
//   in 'I'
//{egkappa} - early glyph variant of U+039A GREEK CAPITAL LETTER KAPPA
//   in 'K'
//{eglambda} - early glyph variant of U+039B GREEK CAPITAL LETTER LAMDA
//   in 'L'
//{egmu1}, {egmu2} - early glyph variants of U+039C GREEK CAPITAL LETTER MU
//   in 'M'
//{egnu1}, {egnu2} - early glyph variants of U+039D GREEK CAPITAL LETTER NU
//   in 'N'
//{egpi1}, {egpi2}, {egpi3} - early glyph variants of U+03A0 GREEK CAPITAL LETTER PI
//   in 'P'
//{egrho1}, {egrho2} - early glyph variants of U+03A1 GREEK CAPITAL LETTER RHO
//   in 'R'
//{egsigma1}, {egsigma2} - early glyph variants of U+03A3 GREEK CAPITAL LETTER SIGMA
//   in 'S'
//{egxi1}, {egxi2}, {egxi3} - early glyph variants of U+039E GREEK CAPITAL LETTER XI
//   in 'X'
//{elatc1}, {elatc2} - early glyph variants of U+0043 LATIN CAPITAL LETTER C
//   in 'C'
//{elatg1}, {elatg2} - early glyph variants of U+0047 LATIN CAPITAL LETTER G
//   in 'G'
//{elatS} - early glyph variant of U+0053 LATIN CAPITAL LETTER S
//   in 'S'
//{horizP}, {horizS}  - (obsolete?) plumbing symbols
//   in 'P'
//{italU} - italic glyph variant of U+0055 LATIN CAPITAL LETTER U
//   in 'U'
//{om} - early glyph variant of the Roman numeral M (U+004D LATIN CAPITAL LETTER M)
//   in 'M'
//{ormg} - phonetic 'g' used by Ormin
//   in 'G'
//   seems to be an inverted U+0266 LATIN SMALL LETTER H WITH HOOK but the GIF is too small to tell
//   Wikipedia makes it sound like it's just U+0067 LATIN SMALL LETTER G
//{plantinJ} - fancy italic glyph variant of U+004A LATIN CAPITAL LETTER J
//   in 'J'
//   looks different from U+1D43D MATHEMATICAL ITALIC CAPITAL J
//{semlamed1}, {semlamed2} - early glyph variants of Phoenician letter lamed
//   in 'L'
//{semqoph1}, {semqoph2}, {semqoph3} - early glyph variants of Phoenician letter qoph
//   in 'Q'
//{semtav1}, {semtav2}, {semtav3}, {semtav4} - early glyph variants of Phoenician letter tau
//   in 'T'
//{semzayin1}, {semzayin2}, {semzayin3} - early glyph variants of Phoenician letter zayin
//   in 'Z'
//{thbar} - U+00FE LATIN SMALL LETTER THORN with a diagonal stroke
//   in 'th"
//   proposed for Unicode as LATIN SMALL LETTER THORN WITH STROKE?
//   but cf. http://babelstone.blogspot.com/2006/07/whats-that.html
//{uncU}, {huncU} - uncial and half-uncial glyph variants of U+0055 LATIN CAPITAL LETTER U
//   in 'U'

//OTHER CHARACTERS
//alt text of * (no braces) should be U+25B8 BLACK RIGHT-POINTING SMALL TRIANGLE
//alt text of ** (no braces) is an inverted caret, not sure what Unicode number to use

var chartable, oednames, unicodes, images, img, alt, replacement;
//the first field is the name the OED uses for the characters (without the surrounding {})
//the second field is the corresponding Unicode character or character sequence
chartable = [
	["Aasper",		"\u1f09"],		//Greek capital alpha with rough
	["Aasperacu",	"\u1f0d"],		//Greek capital alpha with rough and oxia
	["Abarab",		"\u0041\u20e9"],//capital a with wide bar above
	["Adotab",		"\u0226"],		//capital a with dot above
	["Alenis",		"\u1f08"],		//Greek capital alpha with smooth
	["Alenisacu",	"\u1f0c"],		//Greek capital alpha with smooth and oxia
	["Alpha",		"\u0391"],		//Greek capital alpha
	["Amac",		"\u0100"],		//capital a with macron
	["Asg",			"\ua77d"],		//OE uppercase insular g
	["aasper",		"\u1f01"],		//Greek lowercase alpha with rough
	["aasperacu",	"\u1f05"],		//Greek lowercase alpha with rough and oxia
	["aasperfrown",	"\u1f07"],		//Greek lowercase alpha with rough and perispomeni
	["aasperisubacu","\u1f85"],		//Greek lowercase alpha with rough and oxia and iota subscript
	["abreve",		"\u0103"],		//lowercase a with breve
	["adotab",		"\u0227"],		//lowercase a with dot above
	["aeacu",		"\u01fd"],		//lowercase ae with acute
	["aecirc",		"\u00e6\u0302"],//lowercase ae with circumflex
	["aemac",		"\u01e3"],		//lowercase ae with macron
	["aetilde",		"\u00e6\u0303"],//IPA ae with tilde
	["ahacek",		"\u01ce"],		//lowercase a with hacek
	["ahook",		"\u0105"],		//lowercase a with hook
	["aisub",		"\u1fb3"],		//Greek lowercase alpha with iota subscript
	["aisubfrown",	"\u1fb7"],		//Greek lowercase alpha with iota subscript and perispomeni
	["albrtime",	"\ud834\udd35"],//music allabreve time? - surrogates for U+1D135
	["alenis",		"\u1f00"],		//Greek lowercase alpha with smooth
	["alenisacu",	"\u1f04"],		//Greek lowercase alpha with smooth and oxia
	["alenisfrown",	"\u1f06"],		//Greek lowercase alpha with smooth and perispomeni
	["alpha",		"\u03b1"],		//Greek lowercase alpha
	["amac",		"\u0101"],		//lowercase a with macron
	["amacbreve",	"\u0101\u0306"],//lowercase a with macron and breve
	["ankh",		"\u2625"],		//ankh
	["appreq",		"\u2243"],		//asymptotically equal to
	["arain",		"\u202d\ufecb"],//arabic initial ain (with LRO)
	["arainfull",	"\u202d\ufec9"],//arabic isolated ain (with LRO)
	["arqoph",		"\u202d\ufed5"],//arabic isolated qoph (with LRO)
	["arshinfull",	"\u202d\ufeb5"],//arabic isolated shin (with LRO)
	["arTa",		"\u202d\ufec1"],//arabic isolated t.a (with LRO)
	["artafull",	"\u202d\ufe95"],//arabic isolated ta (with LRO)
	["asg",			"\u1d79"],		//OE lowercase insular g
	["assert",		"\u22a6"],		//assertion
	["ayin",		"\ua725"],		//ayin transcription
	["ayinold",		"\u202d\ufecb"],//arabic initial ain (with LRO)
	["Beta",		"\u0392"],		//Greek capital beta
	["bbar",		"\u0180"],		//lowercase b with bar
	["bdotbl",		"\u1e05"],		//lowercase b with dot below
	["beta",		"\u03b2"],		//Greek lowercase beta
	["bundl",		"\u1e07"],		//lowercase b with underline
	["Cbreve",		"\u0043\u0306"],//capital c with breve
	["Chacek",		"\u010c"],		//capital c with hacek
	["Chi",			"\u03a7"],		//Greek capital chi
	["Chirho",		"\u2627"],		//chi rho
	["Csigma",		"\u03f9"],		//Greek capital lunate sigma
	["cab",			"\u3009"],		//closing angle bracket
	["cacu",		"\u0107"],		//lowercase c with acute
	["canc",		"\u264b"],		//Cancer symbol
	["chacek",		"\u010d"],		//lowercase c with hacek
	["chi",			"\u03c7"],		//Greek lowercase chi, also used in phonetic transcription
	["circle",		"\u25cb"],		//white circle
	["circledot",	"\u2609"],		//sun symbol
	["club",		"\u2663"],		//club
	["cmac",		"\u0063\u0304"],//lowercase c with macron
	["comtime",		"\ud834\udd34"],//music common time - surrogates for U+1D134
	["conj",		"\u260c"],		//astrological conjunction
	["ctilde",		"\u0063\u0303"],//lowercase c with tilde
	["cursived",	"\ua77a"],		//lowercase insular d
	["cyrhard",		"\u044a"],		//Cyrillic lowercase hard sign
	["cyrsoft",		"\u044c"],		//Cyrillic lowercase soft sign
	["Delta",		"\u0394"],		//Greek capital delta, increment symbol
	["dag",			"\u2020"],		//dagger
	["dbar",		"\u0111"],		//lowercase d with bar
	["dbllt",		"\u226a"],		//much less than
	["ddotbl",		"\u1e0d"],		//lowercase d with dot below
	["delta",		"\u03b4"],		//Greek lowercase delta
	["devdh",		"\u0927"],		//Devanagari dha
	["devph",		"\u092b"],		//Devanagari pha
	["devrt",		"\u091f"],		//Devanagari t.a
	["devrth",		"\u0920"],		//Devanagari t.ha
	["devt",		"\u0924"],		//Devanagari ta
	["devth",		"\u0925"],		//Devanagari tha
	["diam",		"\u2662"],		//diamond
	["digamma",		"\u03dd"],		//Greek lowercase(?) digamma
	["dlessi",		"\u0131"],		//lowercase dotless i
	["dundl",		"\u1e0f"],		//lowercase d with underline
	["Easper",		"\u1f19"],		//Greek capital epsilon with rough
	["Easperacu",	"\u1f1d"],		//Greek capital epsilon with rough and oxia
	["Edh",			"\u00d0"],		//OE capital eth
	["Ehook",		"\u0118"],		//capital e with hook
	["Elenis",		"\u1f18"],		//Greek capital epsilon with smooth
	["Elenisacu",	"\u1f1c"],		//Greek capital epsilon with smooth and oxia
	["Emac",		"\u0112"],		//capital e with macron
	["Epsilon",		"\u0395"],		//Greek capital epsilon
	["Eta",			"\u0397"],		//Greek capital eta
	["easper",		"\u1f11"],		//Greek lowercase epsilon with rough
	["easperacu",	"\u1f15"],		//Greek lowercase epsilon with rough and oxia
	["ebreve",		"\u0115"],		//lowercase e with breve
	["echi",		"\ud800\udf19"],//Etruscan chi - surrogates for U+10319
	["edh", 		"\u00f0"],		//IPA eth, OE lowercase eth
	["edotab",		"\u0117"],		//lowercase e with dot above
	["egsampi",		"\u0372"],		//archaic Greek capital sampi
	["egsan",		"\u03fa"],		//Greek capital(?) san
	["egy3",		"\ua723"],		//Egyptological alef
	["ehacek",		"\u011b"],		//lowercase e with hacek
	["ehook",		"\u0119"],		//lowercase e with hook
	["ehookacu",	"\u0119\u0301"],//lowercase e with hook and acute
	["ehookmac",	"\u0119\u0304"],//lowercase e with hook and macron
	["elenis",		"\u1f10"],		//Greek lowercase epsilon with smooth
	["elenisacu",	"\u1f14"],		//Greek lowercase epsilon with smooth and oxia
	["elenisgrave",	"\u1f12"],		//Greek lowercase epsilon with smooth and varia
	["em",			"\u2014"],		//em dash
	["emac",		"\u0113"],		//lowercase e with macron
	["emacacu",		"\u1e17"],		//lowercase e with macron and acute
	["emacbreve",	"\u0113\u0306"],//lowercase e with macron and breve
	["emachacek",	"\u0113\u030c"],//lowercase e with macron and hacek
	["emem",		"\u2015"],		//long dash
	["epsilon",		"\u03b5"],		//Greek lowercase epsilon
	["eta",			"\u03b7"],		//Greek lowercase eta
	["fata",		"\u0251"],		//IPA alpha
	["fatatilde",	"\u0251\u0303"],//IPA alpha with tilde
	["flat",		"\u266d"],		//musical flat
	["frakA",		"\ud835\udd04"],//Fraktur capital A (mathematical) - surrogates for U+1D504
	["frakB",		"\ud835\udd05"],//Fraktur capital B (mathematical) - surrogates for U+1D505
	["frakE",		"\ud835\udd08"],//Fraktur capital E (mathematical) - surrogates for U+1D508
	["frakF",		"\ud835\udd09"],//Fraktur capital F (mathematical) - surrogates for U+1D509
	["frakG",		"\ud835\udd0a"],//Fraktur capital G (mathematical) - surrogates for U+1D50A
	["frakg",		"\ud835\udd24"],//Fraktur lowercase g (mathematical) - surrogates for U+1D524
	["frakH",		"\u210c"],		//Fraktur capital H (mathematical)
	["frakh",		"\ud835\udd25"],//Fraktur lowercase h (mathematical) - surrogates for U+1D525
	["frakI",		"\u2111"],		//Fraktur capital I (mathematical)
	["frakK",		"\ud835\udd0e"],//Fraktur capital K (mathematical) - surrogates for U+1D50E
	["frakL",		"\ud835\udd0f"],//Fraktur capital L (mathematical) - surrogates for U+1D50F
	["frakM",		"\ud835\udd10"],//Fraktur capital M (mathematical) - surrogates for U+1D510
	["frakP",		"\ud835\udd13"],//Fraktur capital P (mathematical) - surrogates for U+1D513
	["frakp",		"\ud835\udd2d"],//Fraktur lowercase p (mathematical) - surrogates for U+1D52D
	["frakR",		"\u211c"],		//Fraktur capital R (mathematical)
	["frakU",		"\ud835\udd18"],//Fraktur capital U (mathematical) - surrogates for U+1D518
	["frakX",		"\ud835\udd1b"],//Fraktur capital X (mathematical) - surrogates for U+1D51B
	["frakY",		"\ud835\udd1c"],//Fraktur capital Y (mathematical) - surrogates for U+1D51C
	["fsigma",		"\u03c2"],		//Greek lowercase final sigma
	["Gamma",		"\u0393"],		//Greek capital gamma
	["gaacu",		"\u1f71"],		//Greek lowercase alpha with oxia
	["gabreve",		"\u1fb0"],		//Greek lowercase alpha with vrachy
	["gafrown",		"\u1fb6"],		//Greek lowercase alpha with perispomeni
	["gagrave",		"\u1f70"],		//Greek lowercase alpha with varia
	["gamac",		"\u1fb1"],		//Greek lowercase alpha with macron
	["gamacacu",	"\u1fb1\u0301"],//Greek lowercase alpha with macron and oxia
	["gamma",		"\u03b3"],		//Greek lowercase gamma
	["gbreve",		"\u011f"],		//lowercase g with breve
	["gdotab",		"\u0121"],		//lowercase g with dot above
	["geacu",		"\u1f73"],		//Greek lowercase epsilon with oxia
	["gegrave",		"\u1f72"],		//Greek lowercase epsilon with varia
	["ghacek",		"\u01e7"],		//lowercase g with hacek
	["ghacu",		"\u1f75"],		//Greek lowercase eta with oxia
	["ghfrown",		"\u1fc6"],		//Greek lowercase eta with perispomeni
	["ghgrave",		"\u1f74"],		//Greek lowercase eta with varia
	["giacu",		"\u1f77"],		//Greek lowercase iota with oxia
	["gibreve",		"\u1fd0"],		//Greek lowercase iota with vrachy
	["gifrown",		"\u1fd6"],		//Greek lowercase iota with perispomeni
	["gigrave",		"\u1f76"],		//Greek lowercase iota with varia
	["gimac",		"\u1fd1"],		//Greek lowercase iota with macron
	["gimacacu",	"\u1fd1\u0301"],//Greek lowercase iota with macron and oxia
	["glots",		"\u02c0"],		//glottal stop
	["goacu",		"\u1f79"],		//Greek lowercase omicron with oxia
	["goesto",		"\u003e"],		//"goes to" (greater-than sign)
	["gograve",		"\u1f78"],		//Greek lowercase omicron with varia
	["guacu",		"\u1f7b"],		//Greek lowercase upsilon with oxia
	["gubreve",		"\u1fe0"],		//Greek lowercase upsilon with vrachy
	["gufrown",		"\u1fe6"],		//Greek lowercase upsilon with perispomeni
	["gugrave",		"\u1f7a"],		//Greek lowercase upsilon with varia
	["gumac",		"\u1fe1"],		//Greek lowercase upsilon with macron
	["gumacacu",	"\u1fe1\u0301"],//Greek lowercase upsilon with macron and oxia
	["gundl",		"\u0067\u0331"],//lowercase g with underline
	["gwacu",		"\u1f7d"],		//Greek lowercase omega with oxia
	["gwfrown",		"\u1ff6"],		//Greek lowercase omega with perispomeni
	["gwgrave",		"\u1f7c"],		//Greek lowercase omega with varia
	["Hasper",		"\u1f29"],		//Greek capital eta with rough
	["Hasperacu",	"\u1f2d"],		//Greek capital eta with rough and oxia
	["Hdotbl",		"\u1e24"],		//capital h with dot below
	["Hlenis",		"\u1f28"],		//Greek capital eta with smooth
	["half",		"\u00bd"],		//fraction 1/2
	["halft",		"\u250c"],		//down-and-right corner
	["hasper",		"\u1f21"],		//Greek lowercase eta with rough
	["hasperacu",	"\u1f25"],		//Greek lowercase eta with rough and oxia
	["hasperfrown",	"\u1f27"],		//Greek lowercase eta with rough and perispomeni
	["hatpath",		"\u05b2"],		//Hebrew hataf patah
	["hatqam",		"\u05b3"],		//Hebrew hataf qamats
	["hatseg",		"\u05b1"],		//Hebrew hataf segol
	["hbar",		"\u0127"],		//lowercase h with bar
	["hbrbl",		"\u1e2b"],		//lowercase h with breve below
	["heart",		"\u2661"],		//heart
	["hebaleph",	"\u202d\u05d0"],//Hebrew aleph (with LRO)
	["hebayin",		"\u202d\u05e2"],//Hebrew ayin (with LRO)
	["hebebth",		"\u202d\u05d1"],//Hebrew beth (with LRO) [ha, OED made a typo!]
	["hebnun",		"\u202d\u05e0"],//Hebrew nun (with LRO)
	["hebpe",		"\u202d\u05e4"],//Hebrew pe (with LRO)
	["hebpedag",	"\u202d\u05e4\u05bc"],//Hebrew pe with dagesh (with LRO)
	["hebqoph",		"\u202d\u05e7"],//Hebrew qoph (with LRO)
	["hebshin",		"\u202d\u05e9\u05c1"],//Hebrew shin with shin dot (with LRO)
	["hebtav",		"\u202d\u05ea"],//Hebrew tau (with LRO)
	["hebteth",		"\u202d\u05d8"],//Hebrew teth (with LRO)
	["hebwaw",		"\u202d\u05d5"],//Hebrew waw (with LRO)
	["hebyod",		"\u202d\u05d9"],//Hebrew yod (with LRO)
	["hebzayin",	"\u202d\u05d6"],//Hebrew zayin (with LRO)
	["hdotbl",		"\u1e25"],		//lowercase h with dot below
	["hgz",			"\u0225"],		//High German z with hook
	["hisub",		"\u1fc3"],		//Greek lowercase eta with iota subscript
	["hisubfrown",	"\u1fc7"],		//Greek lowercase eta with iota subscript and perispomeni
	["hlenis",		"\u1f20"],		//Greek lowercase eta with smooth
	["hlenisacu",	"\u1f24"],		//Greek lowercase eta with smooth and oxia
	["hlenisfrown",	"\u1f26"],		//Greek lowercase eta with smooth and perispomeni
	["hundl",		"\u1e96"],		//lowercase h with underline
	["Iasper",		"\u1f39"],		//Greek capital iota with rough
	["Iasperacu",	"\u1f3d"],		//Greek capital iota with rough and oxia
	["Ilenis",		"\u1f38"],		//Greek capital iota with smooth
	["Ilenisacu",	"\u1f3c"],		//Greek capital iota with smooth and oxia
	["Iota",		"\u0399"],		//Greek capital iota
	["Integ",		"\u222b"],		//integral (error for "integ" - the image doesn't work!)
	["iasper",		"\u1f31"],		//Greek lowercase iota with rough
	["iasperacu",	"\u1f35"],		//Greek lowercase iota with rough and oxia
	["iasperfrown",	"\u1f37"],		//Greek lowercase iota with rough and perispomeni
	["ibreve",		"\u012d"],		//lowercase i with breve
	["ident",		"\u2261"],		//identical to
	["ifflig",		"\ufb00"],		//italic ff ligature
	["ifilig",		"\ufb01"],		//italic fi ligature
	["ifrbl",		"\u0069\u032f"],//lowercase i with inverted breve below
	["istlig",		"\ufb05"],		//italic long s-t ligature
	["ihacek",		"\u01d0"],		//lowercase i with hacek
	["ilenis",		"\u1f30"],		//Greek lowercase iota with smooth
	["ilenisacu",	"\u1f34"],		//Greek lowercase iota with smooth and oxia
	["ilenisfrown",	"\u1f36"],		//Greek lowercase iota with smooth and perispomeni
	["imac",		"\u012b"],		//lowercase i with macron
	["imacbreve",	"\u012b\u0306"],//lowercase i with macron and breve
	["imachacek",	"\u012b\u030c"],//lowercase i with macron and hacek
	["index",		"\u261b"],		//black hand pointing right
	["infin",		"\u221e"],		//infinity
	["integ",		"\u222b"],		//integral
	["iota",		"\u03b9"],		//Greek lowercase iota
	["jhacek",		"\u01f0"],		//lowercase j with hacek
	["jundl",		"\u006a\u0331"],//lowercase j with underline
	["Kappa",		"\u039a"],		//Greek capital kappa
	["Koppa",		"\u03d8"],		//Greek capital koppa
	["Kundl",		"\u1e34"],		//capital k with underline
	["kappa",		"\u03ba"],		//Greek lowercase kappa
	["kdotbl",		"\u1e33"],		//lowercase k with dot below
	["koppa",		"\u03d9"],		//Greek lowercase koppa
	["kundl",		"\u1e35"],		//lowercase k with underline
	["Lambda",		"\u039b"],		//Greek capital lambda
	["lambda",		"\u03bb"],		//Greek lowercase lambda
	["lbar",		"\u0142"],		//lowercase barred l
	["lbelt",		"\u026c"],		//IPA belted l
	["le",			"\u2264"],		//less than or equal to
	["leo",			"\u264c"],		//Leo symbol
	["lhalfbr",		"\u231c"],		//top left corner (mathematical quotation)
	["lhshoe",		"\u2283"],		//superset of
	["libra",		"\u264e"],		//Libra symbol
	["lm",			"\u02d0"],		//IPA long vowel
	["longs",		"\u017f"],		//long s
	["lsyllab",		"\u006c\u0329"],//IPA syllabic l
	["Mu",			"\u039c"],		//Greek capital mu
	["mdotab",		"\u1e41"],		//lowercase m with dot above
	["mdotbl",		"\u1e43"],		//lowercase m with dot below
	["merc",		"\u263f"],		//Mercury symbol
	["minpl",		"\u2213"],		//minus-or-plus
	["msyllab",		"\u006d\u0329"],//IPA syllabic m
	["mu",			"\u03bc"],		//Greek lowercase mu, micron symbol
	["Naira",		"\u20a6"],		//Naira sign
	["Nmac",		"\u004e\u0304"],//capital n with macron
	["Nu",			"\u039d"],		//Greek capital nu
	["natural",		"\u266e"],		//musical natural
	["ndotab",		"\u1e45"],		//lowercase n with dot above
	["ndotbl",		"\u1e47"],		//lowercase n with dot below
	["neq",			"\u2260"],		//not equal to
	["nfhacek",		"\u02c7"],		//spacing hacek
	["ng",			"\u014b"],		//IPA eng
	["nsyllab",		"\u006e\u0329"],//IPA syllabic n
	["nu",			"\u03bd"],		//Greek lowercase nu
	["nundl",		"\u1e49"],		//lowercase n with underline
	["Oasper",		"\u1f49"],		//Greek capital omicron with rough
	["Oasperacu",	"\u1f4d"],		//Greek capital omicron with rough and oxia
	["Oe",			"\u0152"],		//capital oe ligature
	["Olenis",		"\u1f48"],		//Greek capital omicron with lenis
	["Olenisacu",	"\u1f4c"],		//Greek capital omicron with smooth and oxia
	["Omac",		"\u014c"],		//capital o with macron
	["Omega",		"\u03a9"],		//Greek capital omega
	["Omicron",		"\u039f"],		//Greek capital omicron
	["oab",			"\u3008"],		//opening angle bracket
	["oasper",		"\u1f41"],		//Greek lowercase omicron with rough
	["oasperacu",	"\u1f45"],		//Greek lowercase omicron with rough and oxia
	["obreve",		"\u014f"],		//lowercase o with breve
	["odotab",		"\u022f"],		//lowercase o with dot above
	["oe",			"\u0153"],		//IPA oe, lowercase oe ligature
	["oeacu",		"\u0153\u0301"],//lowercase oe ligature with acute
	["oetilde",		"\u0153\u0303"],//IPA oe with tilde
	["ohacek",		"\u01d2"],		//lowercase o with hacek
	["ohook",		"\u01eb"],		//lowercase o with hook
	["ohookacu",	"\u01eb\u0301"],//lowercase o with hook and acute
	["ohookgrave",	"\u01eb\u0300"],//lowercase o with hook and grave
	["ohookmac",	"\u01ed"],		//lowercase o with hook and macron
	["ol",			"\u2186"],		//archaic Roman numeral 50 (L)
	["olenis",		"\u1f40"],		//Greek lowercase omicron with smooth
	["olenisacu",	"\u1f44"],		//Greek lowercase omicron with smooth and oxia
	["olenisfrown",	"\u1f40\u0342"],//Greek lowercase omicron with smooth and perispomeni
	["olenisgrave",	"\u1f42"],		//Greek lowercase omicron with smooth and varia
	["omac",		"\u014d"],		//lowercase o with macron
	["omacbreve",	"\u014d\u0306"],//lowercase o with macron and breve
	["omega",		"\u03c9"],		//Greek lowercase omega
	["omicron",		"\u03bf"],		//Greek lowercase omicron
	["ope",			"\u025b"],		//IPA open e
	["opetilde",	"\u025b\u0303"],//IPA open e with tilde
	["otheta",		"\ud800\udf08"],//Etruscan theta (surrogates for U+10308)
	["oumlmac",		"\u022b"],		//lowercase o with umlaut and macron
	["ounce",		"\u2125"],		//ounce sign
	["oundl",		"\u006f\u0331"],//lowercase o with underline
	["Phi",			"\u03a6"],		//Greek capital phi
	["Pi",			"\u03a0"],		//Greek capital pi
	["Psi",			"\u03a8"],		//Greek capital psi
	["pa",			"\u2202"],		//partial differential
	["page",		"\u204b"],		//reversed pilcrow
	["pall",		"\u028e"],		//IPA palatal l
	["paln",		"\u0272"],		//IPA palatal n
	["pharyng",		"\u0295"],		//IPA pharyngeal voiced fricative
	["phi",			"\u03c6"],		//Greek lowercase phi
	["phi2",		"\u03c6"],		//Greek lowercase phi (again)
	["pi",			"\u03c0"],		//Greek lowercase pi
	["pisces",		"\u2653"],		//Pisces symbol
	["planck",		"\u210f"],		//Planck constant over 2pi
	["pmac",		"\u0070\u0304"],//lowercase p with macron
	["psi",			"\u03c8"],		//Greek lowercase psi
	["ptilde",		"\u0070\u0303"],//lowercase p with tilde
	["pundl",		"\u0070\u0331"],//lowercase p with underline
	["Rasper",		"\u1fec"],		//Greek capital rho with rough
	["Rho",			"\u03a1"],		//Greek capital rho
	["rar",			"\u2192"],		//rightwards arrow
	["rasper",		"\u1fe5"],		//Greek lowercase rho with rough
	["rcircbl",		"\u0072\u0325"],//lowercase r with circle below
	["rdotab",		"\u1e59"],		//lowercase r with dot above
	["rdotbl",		"\u1e5b"],		//lowercase r with dot below
	["rdotblmac",	"\u1e5d"],		//lowercase r with dot below and macron
	["recipe",		"\u211e"],		//prescription/recipe sign
	["reva",		"\u0252"],		//reverse a (old NED phonetics)
	["revabreve",	"\u0252\u0306"],//reverse a with breve (old NED phonetics)
	["revC",		"\u2183"],		//Roman numeral reverse capital c
	["revc",		"\u0254"],		//IPA open o
	["revctilde",	"\u0254\u0303"],//IPA open o with tilde
	["revope",		"\u025c"],		//IPA reverse open e
	["revopehook",	"\u025c\u0328"],//IPA reverse open e with hook (looks like an ogonek but semantically U+025D)
	["revr",		"\u0279"],		//inverted lowercase r (old NED phonetics)
	["revv",		"\u028c"],		//IPA wedge
	["rfa",			"\u0252"],		//IPA turned alpha
	["rfatilde",	"\u0252\u0303"],//IPA turned alpha with tilde
	["rglots",		"\u0295"],		//IPA voiced pharyngeal fricative ("reversed glottal stop")
	["rhalfbr",		"\u231d"],		//top right corner (mathematical quotation)
	["rho",			"\u03c1"],		//Greek lowercase rho
	["rhshoe",		"\u2282"],		//subset of
	["rlenis",		"\u1fe4"],		//Greek lowercase rho with smooth
	["Sacu",		"\u015a"],		//capital s with acute
	["Sdotbl",		"\u1e62"],		//capital s with dot below
	["Shacek",		"\u0160"],		//capital s with hacek
	["Sigma",		"\u03a3"],		//Greek capital sigma
	["sacu",		"\u015b"],		//lowercase s with acute
	["sampi",		"\u03e1"],		//Greek lowercase(?) sampi
	["sced",		"\u015f"],		//lowercase s with cedilla
	["schwa",		"\u0259"],		//IPA schwa
	["schwaacu",	"\u0259\u0301"],//schwa with acute
	["scrI",		"\u2110"],		//cursive capital i
	["scrJ",		"\ud835\udca5"],//cursive capital j (surrogates for U+1D4A5)
	["sdotbl",		"\u1e63"],		//lowercase s with dot below
	["semain1",		"\u25c7"],		//white diamond (glyph variant of Phoenician ain)
	["semain2",		"\u25bd"],		//white upside-down triangle (glyph variant of Phoenician ain)
	["semhe",		"\ud802\udd04"],//Phoenician he (surrogates for U+10904)
	["semheth",		"\ud802\udd07"],//Phoenician heth (surrogates for U+10907)
	["semkaph",		"\ud802\udd0a"],//Phoenician kaph (surrogates for U+1090A)
	["semmem",		"\ud802\udd0c"],//Phoenician mem (surrogates for U+1090C)
	["semnun",		"\ud802\udd0d"],//Phoenician nun (surrogates for U+1090D)
	["sempe",		"\ud802\udd10"],//Phoenician pe (surrogates for U+10910)
	["semresh",		"\ud802\udd13"],//Phoenician resh (surrogates for U+10913)
	["semyod",		"\ud802\udd09"],//Phoenician yod (surrogates for U+10909)
	["sh",			"\u0283"],		//IPA esh
	["shacek",		"\u0161"],		//lowercase s with hacek
	["shti",		"\u026a"],		//IPA short i
	["shtibar",		"\u1d7b"],		//pseudo-IPA barred short i
	["shtsyll",		"\u02d8"],		//breve? ("short syllable")
	["shtu",		"\u028a"],		//IPA upsilon
	["shtubar",		"\u1d7f"],		//pseudo-IPA barred upsilon
	["sidetri",		"\u25c1"],		//white left-pointing triangle (old form of nabla)
	["sigma",		"\u03c3"],		//Greek lowercase sigma
	["slge",		"\u2a7e"],		//slanted greater than or equal to
	["sm",			"\u02c8"],		//IPA primary stress
	["smm",			"\u02cc"],		//IPA secondary stress
	["spade",		"\u2660"],		//spade
	["sqrt",		"\u221a"],		//square root
	["sundl",		"\u0073\u0331"],//lowercase s with underline
	["swing",		"\u223c"],		//swing dash?, tilde operator
	["syllab",		"\u02cc"],		//stress? (old NED phonetics)
	["Tau",			"\u03a4"],		//Greek capital tau
	["Tbarab",		"\u0054\u0304"],//T with bar above
	["Th",			"\u00de"],		//OE capital thorn
	["Theta",		"\u0398"],		//Greek capital theta
	["tau",			"\u03c4"],		//Greek lowercase tau
	["taur",		"\u2649"],		//Taurus symbol
	["tdotbl",		"\u1e6d"],		//lowercase t with dot below
	["th",			"\u00fe"],		//OE lowercase thorn
	["theta",		"\u03b8"],		//Greek lowercase theta
	["trli",		"\u2016"],		//double vertical line
	["tri",			"\u25b3"],		//white triangle
	["tundl",		"\u1e6f"],		//lowercase t with underline
	["Uasper",		"\u1f59"],		//Greek capital upsilon with rough
	["Uasperacu",	"\u1f5d"],		//Greek capital upsilon with rough and oxia
	["Umac",		"\u016a"],		//capital u with macron
	["Upsilon",		"\u03a5"],		//Greek capital upsilon
	["uang",		"\u016f"],		//lowercase u with ring above
	["uasper",		"\u1f51"],		//Greek lowercase upsilon with rough
	["uasperacu",	"\u1f55"],		//Greek lowercase upsilon with rough and oxia
	["uasperfrown",	"\u1f57"],		//Greek lowercase upsilon with rough and perispomeni
	["ubreve",		"\u016d"],		//lowercase u with breve
	["udh",			"\u0265"],		//IPA turned h
	["udT",			"\u27c2"],		//perpendicular
	["udtr",		"\u2207"],		//nabla ("upside-down triangle")
	["udw",			"\u028d"],		//IPA turned w
	["ufrbl",		"\u0075\u032f"],//lowercase u with inverted breve below
	["uhacek",		"\u01d4"],		//lowercase u with hacek
	["uhook",		"\u0173"],		//lowercase u with hook
	["ulenis",		"\u1f50"],		//Greek lowercase upsilon with smooth
	["ulenisacu",	"\u1f54"],		//Greek lowercase upsilon with smooth and oxia
	["ulenisfrown",	"\u1f56"],		//Greek lowercase upsilon with smooth and perispomeni
	["umac",		"\u016b"],		//lowercase u with macron
	["umacbreve",	"\u016b\u0306"],//lowercase u with macron and breve
	["upsilon",		"\u03c5"],		//Greek lowercase upsilon
	["uumlmac",		"\u01d6"],		//lowercase u with umlaut and macron
	["vdftheta",	"\u03b8"],		//IPA theta
	["vpal",		"\u025f"],		//IPA voiced palatal stop
	["vvf",			"\u0263"],		//IPA voiced velar fricative (gamma)
	["Wasper",		"\u1f69"],		//Greek capital omega with rough
	["Wasperfrown",	"\u1f6f"],		//Greek capital omega with rough and perispomeni
	["Wlenis",		"\u1f68"],		//Greek capital omega with smooth
	["Wlenisacu",	"\u1f6c"],		//Greek capital omega with smooth and oxia
	["wasper",		"\u1f61"],		//Greek lowercase omega with rough
	["wasperacu",	"\u1f65"],		//Greek lowercase omega with rough and oxia
	["wasperfrown",	"\u1f67"],		//Greek lowercase omega with rough and perispomeni
	["wavyeq",		"\u2248"],		//almost equal to
	["wdotbl",		"\u1e89"],		//lowercase w with dot below
	["wgrave",		"\u1e81"],		//lowercase w with grave
	["wisub",		"\u1ff3"],		//Greek lowercase omega with iota subscript
	["wisubfrown",	"\u1ff7"],		//Greek lowercase omega with iota subscript and perispomeni
	["wlenis",		"\u1f60"],		//Greek lowercase omega with smooth
	["wlenisacu",	"\u1f64"],		//Greek lowercase omega with smooth and oxia
	["wlenisfrown",	"\u1f66"],		//Greek lowercase omega with smooth and perispomeni
	["wyn",			"\u01bf"],		//wynn
	["Xi",			"\u039e"],		//Greek capital xi
	["xi",			"\u03be"],		//Greek lowercase xi
	["Ydotab",		"\u1e8e"],		//capital y with dot above
	["Ygh",			"\u021c"],		//ME capital yogh
	["Yundl",		"\u0059\u0331"],//capital y with underline
	["ycirc",		"\u0177"],		//lowercase y with circumflex
	["ydotab",		"\u1e8f"],		//lowercase y with dot above
	["ye",			"\u0079\u0364"],//y^e, abbreviation for "the"
	["ygh",			"\u021d"],		//ME lowercase yogh
	["ymac",		"\u0233"],		//lowercase y with macron
	["yt",			"\u0079\u036d"],//y^t, abbreviation for "that"
	["Zeta",		"\u0396"],		//Greek capital zeta
	["Zhacek",		"\u017d"],		//capital z with hacek
	["zdotab",		"\u017c"],		//lowercase z with dot above
	["zdotbl",		"\u1e93"],		//lowercase z with dot below
	["zeta",		"\u03b6"],		//Greek lowercase zeta
	["zh",			"\u0292"],		//IPA ezh
	["zhacek",		"\u017e"],		//lowercase z with hacek
	];
images = document.evaluate(
    //'//img[@alt]',
    '//img',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < images.snapshotLength; i++) {
	img = images.snapshotItem(i);
	alt = img.alt;
	if (alt.substr(0,1) == "{" && alt.substr(alt.length-1,1) == "}") {
		alt = alt.substring(1,alt.length-1);	//strip curly braces
	}
	filename = img.src.substring(img.src.lastIndexOf('/')+1, img.src.lastIndexOf('.'));
	if (alt == "") alt = filename;	//for askoxford.com which doesn't use the alt attribute
	for (var j = 0; j < chartable.length; j++) {
		if (alt == chartable[j][0]) {
			replacementString = chartable[j][1];
			span = document.createElement("span");
			if (filename != alt) {
				if (filename == "sc" + alt) {	//small-capitals images used in author names
					span.style.fontSize = "70%"; //"smaller" doesn't quite match for some reason
					replacementString = replacementString.toUpperCase();
					//special case yogh because Firefox's JS Unicode tables are stuck in 1998 (bleaugh)
					//https://bugzilla.mozilla.org/show_bug.cgi?id=394604#c5
					//test case is "their, poss. pron." sense B. 3 quot. 1563
					if (replacementString == "\u021d") replacementString = "\u021c";
				}
			}
			replacement = document.createTextNode(replacementString);
			//add some fonts because the defaults aren't populated enough
			//and Firefox's automatic replacements may not harmonize well
			if (window.location.host.match(/oed/)) {
				if (window.location.pathname.match(/entry_wordlist/)) {	//word list is in Verdana
					span.style.fontFamily = "Verdana, 'Arial Unicode MS', sans-serif";
				}
				else if (window.location.pathname.match(/entry_header/)) {	//header is in Times New Roman
					span.style.fontFamily = "'Times New Roman', 'Charis SIL', 'Doulos SIL', serif";
				}
				else {	//entries on oed.com use Georgia
					span.style.fontFamily = "Georgia, 'Charis SIL', 'Doulos SIL', serif";
				}
			}
			if (window.location.host.match(/askoxford/)) {	//askoxford.com uses Arial
				span.style.fontFamily = "Arial, 'Arial Unicode MS', sans-serif";
			}
			if (chartable[j][1].match(/[\u0370-\u03ff\u1f00-\u1fff]/) //Greek blocks
			     && alt != "vdftheta") {	//except for IPA theta
				//force Greek to be italic, because the GIFs are italic but aren't given HTML formatting
				span.style.fontStyle = "italic";
				//Georgia doesn't have polytonic characters
				//so it's better to have the Greek all in a single font that does
				//unfortunately, Georgia Greek doesn't have an italic form :(
				span.style.fontFamily = "'Aisa Unicode', 'Georgia Greek', Gentium, Tahoma, Georgia, serif";
			}
			else if (chartable[j][1].match(/[\u0300-\u036f]/)) { //combining diacritics
				//Georgia doesn't have combining diacritics
				span.style.fontFamily = "'Charis SIL', 'Doulos SIL', Georgia, serif";
			}
			img.parentNode.replaceChild(span, img);
			span.appendChild(replacement);
		}
	}
}

//
// ChangeLog
// 2009-08-25 - 1.4 - JSD - added support for askoxford.com Word of the Day entries
//                          updated mappings and added new characters for Unicode 5.1
//                          fixed capitalization in small-caps author names in quotations
//                          fixed font matching in word lists and entry headings
//                          misc. character additions
// 2007-12-02 - 1.3 - JSD - still more miscellaneous character additions
// 2007-06-07 - 1.2 - JSD - more miscellaneous character additions
// 2006-09-20 - 1.1 - JSD - expanded coverage to oed.com for the BBC Wordhunt pages
//                          added Phoenician letters now that Unicode 5.0 is out
//                          fix IPA theta to not be italicized like Greek theta
//                          other misc. additions
// 2006-04-28 - 1.0 - JSD - added piles more characters, now italicizes Greek & specifies appropriate fonts
// 2006-03-16 - 0.8 - JSD - added more accented Latin letters used in etymologies
// 2006-02-26 - 0.7 - JSD - added Fraktur letters for mathematics
// 2006-01-31 - 0.6 - JSD - expanded coverage to other oed.com subdomains
// 2006-01-05 - 0.5 - JSD - added new alternate code for Greek phi
// 2005-12-30 - 0.4 - JSD - added more polytonic Greek characters
// 2005-12-05 - 0.3 - JSD - first public release
// 2005-11-20 - 0.2 - JSD - first revision since HD crash
// 2005-07-06 - 0.1 - JSD - initial version
//
