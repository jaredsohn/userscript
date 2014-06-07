// ==UserScript==
// @name       Ungdomsboligaarhus.dk-fikser
// @namespace  http://my.name.spaaaaace.yeah/
// @version    0.1
// @description  Fiks den latterlig CSS-bug der gør boligoversigten ligegyldig
// @match http://*.ungdomsboligaarhus.dk/*
// @copyright  2013+, Mads
// ==/UserScript==

var all = document.getElementsByClassName("depMiniPic");

for (var i=0, max=all.length; i < max; i++) {
     all[i].style.display="inline-block";
    all[i].style.width="150px";
}