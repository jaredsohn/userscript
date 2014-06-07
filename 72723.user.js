// ==UserScript==

// @name           Notificador Ikariam de ralo83 Modificado por Darkshadow

// @namespace      mensajes diferentes para los consejeros
// @description    Un script que crea un mensaje emergente cuando uno de los 4 consejeros tiene algo que decir, sino que también se mueve a la pestaña de ikariam (si está haciendo otra cosa).

// @include        http://Ikariam.*/*

// @include        http://*.Ikariam.*/*

// @exclude        http://board.ikariam.*/*

// ==/UserScript==

if (['advCities'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) alert('Señor Gobernador, algo está pasando en su ciudad');
if (['advMilitary'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) alert('Señor, mensajeros llegados desde la guerra nos quieren informar de algo');
if (['advResearch',].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) alert('Eureka, nuestros científicos han hecho grandes descubrimientros');
if (['advDiplomacy'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) alert('Señor, nos han enviado un sospechoso mensaje');