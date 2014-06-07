// ==UserScript==
// @name           FTO Поиск
// @namespace      free-torrents.org
// @description    Автоматически выбирает поиск на трекере, вместо в гугле
// @include        http://free-torrents.org/forum/*
// @author     Crypton
// ==/UserScript==

document.getElementById('search-action').selectedIndex = 1; 