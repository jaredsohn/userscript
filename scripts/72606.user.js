// ==UserScript==

// @name           Diplomático

// @namespace      http://userscripts.org/users/77333/scripts
// @description    Manda un mensaje si el diplomático quiere hablar contigo.

// @include        http://Ikariam.*/*

// @include        http://*.Ikariam.*/*

// @exclude        http://board.ikariam.*/*

// ==/UserScript==

if (['advDiplomacy'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) alert('¡Tienes un mensaje!');