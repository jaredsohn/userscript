// ==UserScript==
// @name           drivec.ru bypass and AutoClick Crossbrowser
// @namespace      drivec.ru
// @description    Этот скрипт убирает таймер и сам нажимает на ссылку без ожидания, так же убирает событие по onclick. This script remove timer and automatically click link to file, also remove 'onclick' event. Работа скрипта гарантируется только на Firefox с расширением greasemonkey.
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/76355.meta.js?interval=1&show
// @script page    http://userscripts.org/scripts/show/76355
// @version	1.7
// @history	1.7 Пока кроссбраузерность подтвердилась и работает
// @history	1.6 Добавил другой автоапдейтер
// @history	1.5 Добавлена тестовая кроссбраузерность
// @history	1.4 Убрано ожидание при выводе ссылки, ненужно, т.к. есть автопереход
// @history	1.3 Обновлён код, добавлены кнопки автоапдейтера, убран весь лишний код.
// @history	1.2 Обновлено описание
// @history	1.1 Исправлен автоапдейтер
// @history	1.0 Релиз, добавлен тестовый автоапдейтер в дополнение к функциям в описании
// @include        http://drivec.ru/*
// ==/UserScript==

setTimeout('update()', 0);
var searcher=document.getElementsByTagName("HEAD")[0].innerHTML.match(/\http:[^\s\"]+[^\" >]*?/g)[0]
if(searcher)window.location = searcher

//  ---------------------------------------

var links = document.getElementsByTagName('body');
for (i = 0; i < links.length; i++) {
   links[i].removeAttribute('onclick');
}

//  ---------------------------------------

var links2 = document.getElementsByTagName('a');
for (i = 0; i < links2.length; i++) {
   links2[i].removeAttribute('onclick');
}