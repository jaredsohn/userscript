// ==UserScript==
// @name           Nerandu.lt
// @description    Bandymas nebepirmas, bet is pirmuju
// @include        http://www.nerandu.lt/nauja-nuoroda.html
// @version        1.0
// @copyright      Tadas Ceponis
// @license        Tadas Ceponis licenzijuoja
// ==/UserScript== 

function ir(){
x = document.forms.forma;
x.sry.value="sportas";

function irasas(){
var x = document.forms.namedItem("forma");
x.elements.namedItem("sry").value="sportas";
}

function init (){
irasas();
}

if (window.addEventListener) {
    window.addEventListener('load', init, false);
} else {
    document.attachEvent('onload', init);
}