// ==UserScript==
// @name           Siries Tweaker 1
// @namespace      Milan Miljkovic (willand_87@yahoo.com)
// @description    removes ads from watchseries.eu
// @include        http://watchseries.eu/*
// @version		   1.0.0
// @attribution    ""
// ==/UserScript==




//Uklanja element
function removeClass(name, id) {
    klasa = document.getElementsByClassName(name)[id];
    klasa && (klasa.style.display = "none");
}

//array elemenata za uklanjanje
var lista = new Array()
lista[1] = "sp-sidetower";
lista[2] = "sp-leader-bottom";
lista[3] = "s-mpu-list";
lista[4] = "bk-blue";
lista[5] = "bk-grey";
lista[6] = "s-mpu-list";
lista[7] = "clear";


for (var i = 0; i < lista.length; i++) {
            removeClass(lista[i], 0);
            removeClass(lista[i], 1);
            removeClass(lista[i], 2);
    }
