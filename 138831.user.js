// ------------------------------------------------------------------------------------------------------------------------
// Plemiona.pl 8.X Skrypt użytkowy
//
// Nazwa:      Punkty przy rozbudowie budynków
// Wersja:     2.1.1 PL
// Autor:      johans (Plemiona Forum)
// Dostosował: Lukasz032 (Plemiona Authorized Scripter)
//
// Tagi specjalne:
// Licencja:   Creative Commons Uznanie autorstwa - Brak komercyjnego zastosowania - Na tych samych warunkach 3.0 Polska
// Informacje: http://creativecommons.org/licenses/by-nc-sa/3.0/pl
// Support:    skryptoteka@kurierplemiona.pl
//
// ------------------------------------------------------------------------------------------------------------------------
// ==UserScript==
// @name           Punkty przy rozbudowie budynków
// @namespace      http://kurierplemion.pl/skryptoteka.html
// @description    Punkty przy rozbudowie budynków
// @version        2.1.1 PL
// @license        Creative Commons 3.0 BY-NC-SA (http://creativecommons.org/licenses/by-nc-sa/3.0/pl)
// @author         johans (Plemiona Forum)
// @contributor    Lukasz032 (Plemiona Authorized Scripter)
// @include        http://pl*.plemiona.pl/game.php*screen=main*
// ==/UserScript==
// ------------------------------------------------------------------------------------------------------------------------

function PunktyPrzyRozbudowie() {
punktybudynku = {
// == TABELA PUNKTÓW ==
// Budynek   | Poziomy: | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
   main      : new Array( 10,  2,  2,  3,  4,  4,  5,  6,  7,   9,  10,  12,  15,  18,  21,  26,  31,  37,  44,  53,  64,  77,  92, 110, 133, 159, 191, 229, 274, 330),
   barracks  : new Array( 16,  3,  4,  5,  5,  7,  8,  9, 12,  14,  16,  20,  24,  28,  34,  42,  49,  59,  71,  85, 102, 123, 147, 177, 212),
   stable    : new Array( 20,  4,  5,  6,  6,  9, 10, 12, 14,  17,  21,  25,  29,  36,  43,  51,  62,  74,  88, 107),
   garage    : new Array( 24,  5,  6,  6,  9, 10, 12, 14, 17,  21,  25,  29,  36,  43,  51),
   church_f  : new Array( 10,  0),
   church    : new Array( 10,  2,  2),
   snob      : new Array(512,102,123),
   smith     : new Array( 19,  4,  4,  6,  6,  8, 10, 11, 14,  16,  20,  23,  28,  34,  41,  49,  58,  71,  84, 101),
   place     : new Array(  0,  0),
   statue    : new Array( 24,  0),
   market    : new Array( 10,  2,  2,  3,  4,  4,  5,  6,  7,   9,  10,  12,  15,  18,  21,  26,  31,  37,  44,  53,  64,  77,  92, 110, 133),
   wood      : new Array(  6,  1,  2,  1,  2,  3,  3,  3,  5,   5,   6,   8,   8,  11,  13,  15,  19,  22,  27,  32,  38,  46,  55,  66,  80,  95, 115, 137, 165, 198),
   stone     : new Array(  6,  1,  2,  1,  2,  3,  3,  3,  5,   5,   6,   8,   8,  11,  13,  15,  19,  22,  27,  32,  38,  46,  55,  66,  80,  95, 115, 137, 165, 198),
   iron      : new Array(  6,  1,  2,  1,  2,  3,  3,  3,  5,   5,   6,   8,   8,  11,  13,  15,  19,  22,  27,  32,  38,  46,  55,  66,  80,  95, 115, 137, 165, 198),
   farm      : new Array(  5,  1,  1,  2,  1,  2,  3,  3,  3,   5,   5,   6,   8,   8,  11,  13,  15,  19,  22,  27,  32,  38,  46,  55,  66,  80,  95, 115, 137, 165),
   storage   : new Array(  6,  1,  2,  1,  2,  3,  3,  3,  5,   5,   6,   8,   8,  11,  13,  15,  19,  22,  27,  32,  38,  46,  55,  66,  80,  95, 115, 137, 165, 198),
   hide      : new Array(  5,  1,  1,  2,  1,  2,  3,  3,  3,   5),
   wall      : new Array(  8,  2,  2,  2,  3,  3,  4,  5,  5,   7,   9,   9,  12,  15,  17,  20,  25,  29,  36,  43)
}

var table = $('#buildings')[0];var kolumna = table.rows[0].insertBefore(document.createElement('th'));kolumna.innerHTML = "Punkty";for(a=1;a<table.rows.length;a++){var budynek=new Object;if (table.rows[a].cells.length > 6) {budynek.kolumna_pkt=table.rows[a].insertBefore(document.createElement('td'));budynek.kolumna_pkt.setAttribute("align","right");budynek.kolumna_typ=table.rows[a].cells[0];budynek.poziom=budynek.kolumna_typ.innerHTML.match(/Poziom ([0-9]+)/);if (budynek.poziom == undefined) {budynek.poziom=new Array(0, 0);}budynek.typ=budynek.kolumna_typ.innerHTML.match(/buildings[\/\\](.*?)\.png/);if (budynek.poziom && budynek.typ && punktybudynku[budynek.typ[1]]) {budynek.kolumna_pkt.innerHTML=budynek.kolumna_pkt.innerHTML + " <span style=\"color:#000000;\">+"+punktybudynku[budynek.typ[1]][budynek.poziom[1]]+"</span>";}}}
}

// Odpalenie - obejście ograniczeń XPCNativeWrapper....
if ((typeof GM_getResourceURL) != "undefined") {unsafeWindow.punktybudynku = {};var script = document.createElement("script");script.type = "text/javascript";script.innerHTML = "(" + PunktyPrzyRozbudowie + ")();";script.charset = "utf-8";document.body.appendChild(script);} else if ((typeof webkitStorageInfo) != "undefined") {punktybudynku = {};var script = document.createElement("script");script.type = "text/javascript";script.innerHTML = "(" + PunktyPrzyRozbudowie + ")();";script.charset = "utf-8";document.body.appendChild(script);} else {var punktybudynku;PunktyPrzyRozbudowie();}