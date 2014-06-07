// ==UserScript==

// @name           Notificador Ikariam

// @namespace      http://userscripts.org/users/77333/scripts
// @description    Un script que crea un mensaje emergente cuando uno de los 4 consejeros tiene algo que decir, sino que también se mueve a la pestaña de ikariam (si está haciendo otra cosa).

// @include        http://Ikariam.*/*

// @include        http://*.Ikariam.*/*

// @exclude        http://board.ikariam.*/*

// ==/UserScript==

if (['advCities', 'advMilitary', 'advResearch', 'advDiplomacy'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) alert('¡Uno de sus consejeros tiene algo que informarle!');