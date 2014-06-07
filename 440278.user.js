// ==UserScript==
// @name GamesVillage Hide Navbar
// @namespace GV Hide Navbar
// @description Questa estensione nasconde la navbar ingombrante del forum di GamesVillage e sostituisce lo sfondo nero con un grigio piu' guardabile.
// @include http://www.gamesvillage.it/forum/*
// @version 1
// @grant none
// ==/UserScript==

function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

addGlobalStyle('.bar-cont { display: none !important; }');
addGlobalStyle('a.username { color: #641E23 !important; }');
addGlobalStyle('body { margin-top: 40px !important; }');
addGlobalStyle('#takeover_gv { background-color: #E9E9E9 !important; }');
addGlobalStyle('div#barra-menu { position: static !important; }');