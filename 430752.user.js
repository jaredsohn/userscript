// ==UserScript==
// @name        RÃ©ponse pré-défini
// @description Un script pour rajouter des rÃ©ponses prÃ©-dÃ©fini au forum !
// @include     http://realitygaming.fr/members/*
// @include     https://realitygaming.fr/members/*
// @include     http://www.realitygaming.fr/members/*
// @include     https://www.realitygaming.fr/members/*
// @version     1.0
// @grant       none
// ==/UserScript==


function load() {
var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'repauto');
jsCode.setAttribute('src', 'http://rgta.craym.eu/realitygaming/script/repautoprofil/repauto.js'); document.body.appendChild(jsCode);
}
setTimeout(load, 1000)