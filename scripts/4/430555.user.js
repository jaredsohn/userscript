// ==UserScript==
// @name        RÃ©ponse prÃ©-dÃ©fini
// @description Un script pour rajouter des rÃ©ponses prÃ©-dÃ©fini au forum !
// @include     http://realitygaming.fr/threads/*
// @include     https://realitygaming.fr/threads/*
// @include     http://www.realitygaming.fr/threads/*
// @include     https://www.realitygaming.fr/threads/*
// @version     2.0
// @grant       none
// ==/UserScript==


function load() {
var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'repauto');
jsCode.setAttribute('src', 'http://rgta.craym.eu/realitygaming/script/repautoforum/repauto.js'); document.body.appendChild(jsCode);
}
setTimeout(load, 1000)