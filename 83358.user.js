// ==UserScript==
// @name		SchhuelerVZ: Was meinst du dazu?-Entferner
// @author		Homer Bond 005
// @include	*.schuelervz.net*
// ==/UserScript==

var feld = document.getElementById("uservoice_link");
var feld_parent = feld.parentNode;
feld_parent.removeChild(feld);