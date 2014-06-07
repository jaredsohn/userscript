// ==UserScript==
// @name           Isbandau greasemonkey
// @description    Bandymas nebepirmas, bet is pirmuju
// @include        http:*//www.tadas.websoftas.lt/*
// @version        1.0
// @copyright      Tadas Ceponis
// @license        http://userscripts.org/scripts/source/29910.user.js
// ==/UserScript== 

function irasas(){
var x = document.forms.namedItem("f");
x.elements.namedItem("s").value="audi";
document.getElementById('text').value=5
document.getElementById('title').value=5
var url = location.href;
alert(url);
}

//==================================== Prisiminti =====================================

/*
// Laikmatis 1000 = 1s. laikas yra finkcija i kuria nukreipia po 1 sekundes
window.setTimeout(laikas, 1000);

*/

function laikas(){
//nuredirektina kur nori
window.location.href = "http://www.google.com/";
}

//=====================================================================================

function init (){
irasas();
}

if (window.addEventListener) {
    window.addEventListener('load', init, false);
} else {
    document.attachEvent('onload', init);
}

//====================================== NKatalogas.lt ================================
/*
function irasas(){
var x = document.forms.namedItem("suggest_link");
x.elements.namedItem("id_category").value="10";
}
*/