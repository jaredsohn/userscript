// ==UserScript==
// @name          NoEscape
// @namespace     Vizzy
// @description   Выход не могут найти даже старожилы 
// @include       http://*.leprosorium.ru/*
// @include       http://leprosorium.ru/*
// ==/UserScript==

document.getElementById('logout').childNodes[0].innerHTML = ' ';