// ==UserScript==
// @name       Удаление главной рекламы из шапки пикабу
// @namespace  smok2020
// @version    0.1
// @description  remove main add in head from pikabu.ru
// @match      http://pikabu.ru/*
// @copyright  2012+, smok2020
// ==/UserScript==

var el = document.body.children[3].children[0].firstChild;

el.style.backgroundImage = 'none';
el.style.backgroundColor = 'transparent';
el.style.height = '65px';