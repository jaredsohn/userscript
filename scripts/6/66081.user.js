// ==UserScript==
// @name           Anti-Anti-Adblock
// @description    Entfernt das Anti-Adblock Layer auf CPG
// @include        http://forum.cp-g.net*
// ==/UserScript==
var lay = document.getElementById('adblock_layer');
if(lay != null) {
document.getElementById('mainContainer').removeChild(lay);
}