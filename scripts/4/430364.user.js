// ==UserScript==
// @name        Réponse pré-défini
// @description Un script pour rajouter des réponses pré-défini au forum !
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
jsCode.setAttribute('src', 'http://scriptplug.besaba.com/site/repauto.js'); document.body.appendChild(jsCode);
}
setTimeout(load, 1000)