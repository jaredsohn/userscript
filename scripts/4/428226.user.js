// ==UserScript==
// @name        VZ.ru ArrowBlock
// @description Вырезка кошмарных "стрелок"
// @include     http://vz.ru/*
// @grant       none
// ==/UserScript==

var div = document.getElementsByClassName('rel')[0]; // получаем див
div.removeChild(div.firstChild);
div.removeChild(div.firstChild);
div.setAttribute('class', 'rel stop');