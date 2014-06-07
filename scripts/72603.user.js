// ==UserScript==
// @name          SzekelyMagyarRovasArabSzamokMeghagyasaval_SzeklerHungarianRovasWithArabicNumbers
// @namespace     http://grozsa11.tvn.hu/rovas
// @description   Székely rovással megjelenített web (MMM :-)
// @description   Készítette sok más szkript alapján: Rózsa Gza (grozsa11)
// @description   a gépen installálva kell legyen a rovas_kiterjesztett_jb font
// @description   http://www.freeweb.hu/rovasirashonlap/betuk/betukeszletek/rovas_kiterjesztett_jb.zip
// @description   örömmel várok javító szándékú kiegészítéseket - a közreműködők nevét szívesen feltüntetném
// @include       *
// @version 0.2
// @contributor   Rózsa Gza (grozsa11 - ez vagyok én :-)
// @contributor   Zai Bálint (a JavaScript gondolkodásmód átadásában)
// @contributor   Dr. Hosszú Gábor (rovás szakértés - rovás TTF készítése)
// ==/UserScript==

var replacements, regex, key, textnodes, node, s;

replacements = {

  // kisbetűsítés////////////////////////////////////////
  // convert to lowercase////////////////////////////////
  'A' : 'a',
  'Á' : 'á',
  'B' : 'b',
  'C' : 'c',
  'D' : 'd',
  'E' : 'e',
  'É' : 'é',
  'F' : 'f',
  'G' : 'g',
  'H' : 'h',
  'I' : 'i',
  'Í' : 'í',
  'J' : 'j',
  'K' : 'k',
  'L' : 'l',
  'M' : 'm',
  'N' : 'n',
  'O' : 'o',
  'Ó' : 'ó',
  'Ö' : 'ö',
  'Ő' : 'ő',
  '\u212' : 'ő',
  '\u213' : 'ő',
  '\u336' : 'ő',
  'P' : 'p',
  'Q' : 'q',
  'R' : 'r',
  'S' : 's',
  'T' : 't',
  'U' : 'u',
  'Ú' : 'ú',
  'Ü' : 'ü',
  'Ű' : 'ű',
  '\u219' : 'ű',
  '\u360' : 'ű',
  '\u368' : 'ű',
  'V' : 'v',
  'W' : 'w',
  'X' : 'x',
  'Y' : 'y',
  'Z' : 'z',

  //idegen betuk átalakítása magyarrá (y-t nem)//////////
  //convert non-hungarian letters to hungarian spell (y no)//////////
  'w' : ']',
  'q' : '»',
  'x' : '°',
 

  //magyar dupla betűk egykarakteresítése////////////////
  //hungarin double letters to runic one-letter//////////
  'á' : 'A',
  'cs' : 'C',
  'dzs' : '¦',
  'dz' : '`',
  'é' : 'E',
  'gy' : 'G',
  'í' : 'I',
  'ly' : 'L',
  'ny' : 'N',
  'ó' : 'O',
  'ö' : 'q',
  'ő' : 'Q',
  '\u244' : 'Q',
  '\u245' : 'Q',
  '\u337' : 'Q',
  'sz' : 'S',
  'ty' : 'T',
  'ú' : 'U',
  'ü' : 'w',
  'ű' : 'W',
  '\u251' : 'W',
  '\u367' : 'W',
  '\u369' : 'W',
  'zs' : 'Z',

  //megmaradt idegen betűk átalakítása magyarrá//////////
  //convert leaved foreign letter to hungarian spell//////////
  'y' : '±',

 'ssz' : 'S S',
  'css' : 'C C',
  'tty' : 'T T',
  'ggy' : 'G T',
  'zzs' : 'Z T',
  'lly' : 'L L',
  'nny' : 'N L',
  

  //összerovások (előbb a mássalhangzók)/////////////////
  //ligatures (consonants first)/////////////////////////
  //'nap', String.fromCharCode(80),
  //'tpru', String.fromCharCode(82),
  //'tprus', String.fromCharCode(88),
  //'ti', String.fromCharCode(168),
  //'sa', String.fromCharCode(172),
  //'ro', String.fromCharCode(174),
  //'cak', String.fromCharCode(181),
  //'zt', String.fromCharCode(184),
  //'ba', String.fromCharCode(194),
  //'so', String.fromCharCode(196),
  //'Cin', String.fromCharCode(199),
  //'ge', String.fromCharCode(201),
  //'zr', String.fromCharCode(203),
  //'Irt', String.fromCharCode(205),
  //'lA', String.fromCharCode(206),
  //'bo', String.fromCharCode(211),
  //'vAr', String.fromCharCode(212),
  //'bi', String.fromCharCode(218),
  //'be', String.fromCharCode(220),
  //'se', String.fromCharCode(223),
  //'nk', String.fromCharCode(226),
  //'ra', String.fromCharCode(228),
  //'ru', String.fromCharCode(231),
  //'nb', String.fromCharCode(237),
  //'re', String.fromCharCode(238),
  //'ho', String.fromCharCode(243),
  //'Ta', String.fromCharCode(244),
  //'amb', String.fromCharCode(74),
  //'mb', String.fromCharCode(252),
  //'aT', String.fromCharCode(120),
  //'unk', String.fromCharCode(153),
  //'or', String.fromCharCode(169),
  //'ant', String.fromCharCode(193),
  //'ent', String.fromCharCode(233),
  //'Ar', String.fromCharCode(235),
  //'us', String.fromCharCode(250),
    '':''};

//tesztelési kiírás - hogy látni lehessen a lapot még a rovás-átalakítás előtt is
//test-alert to see the page before the conversion
//alert('Olvassatok székelyek!');

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

//jobbról balra (rtl) írás készítése
//make the right_to_left (rtl) writement
document.body.innerHTML= document.body.innerHTML.replace(/>/g,">&#8238");

//jobbra rendezett bekezdések és jobbról bajszozott felsorolások készítése
//make right alignmenting
GM_addStyle("html { direction: rtl; }");

//betűtípus váltás székely_magyar rovás true type fontra
//(ez a font felinstallált kell legyen: http://www.freeweb.hu/rovasirashonlap/betuk/betukeszletek/rovas_kiterjesztett_jb.zip)
//change the font to a szekler runic TTF
//(must installed this font to your system: http://www.freeweb.hu/rovasirashonlap/betuk/betukeszletek/rovas_kiterjesztett_jb.zip)
GM_setValue('headingFont', "'FontMonger:Rovas Kiterjesztett JB', 'FontMonger:Rovas Kiterjesztett JB', Times, serif");
GM_setValue('bodyFont', "'FontMonger:Rovas Kiterjesztett JB', 'FontMonger:Rovas Kiterjesztett JB', Times, serif");
GM_addStyle("a, b, input, pre, small, span, p, div, li, td, tr, button, h1, h2, h3, h4, h5, textarea, body{font-family: 'Rovas Kiterjesztett JB', 'FontMonger:Rovas Kiterjesztett JB' !important; font-size: 20px !important; line-height: 1.2 !important}");