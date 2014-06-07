// ==UserScript==
// @name           eMAG.ro - închide interstițialele automat
// @namespace      gp
// @description    Închide automat mesajele publicitare interstițiale
// @include        http://www.emag.ro/*
// @include        https://www.emag.ro/*
// ==/UserScript==

function main() {
    var interstitial = document.getElementById('interstitial_site');
    if (interstitial.id != 'interstitial_site') return;
    unsafeWindow.close_interstitial();
}
window.addEventListener('load', main, false);

