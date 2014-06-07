// ==UserScript==
// @name          LeproFraud
// @namespace     Vizzy
// @description   меняет надпись "Магазин" на "Фрод"
// @include       http://*.leprosorium.ru/*
// ==/UserScript==

var fraudText = "фрод";

document.getElementById('fraud-menu').childNodes[0].childNodes[0].childNodes[0].innerHTML = fraudText;
