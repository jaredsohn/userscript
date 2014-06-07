// ==UserScript==
// @name           symulator aktywnosci(0.77mod)
// @namespace      aymulator_aktywnosci
// @description    Skrypt symuluje aktywnosc gracza(0.77mod)
// @include        http://*ogame.onet.pl/game/index.php?page=overview*
// ==/UserScript==

function losowanie(){
var MIN = 600; // sekundy
var MAX = 1200; // sekundy
czas = Math.random() * ((MAX*1000)-(MIN*1000));
czas = Math.floor(czas);
return parseInt(MIN*1000) + czas;
}

function symulacja()
{
var kolejne=losowanie();
setTimeout('window.location.replace(document.location.href)', kolejne);
}
symulacja();