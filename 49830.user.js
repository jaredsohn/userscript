// ==UserScript==
// @name           myGod
// @namespace      http://vkontakte.ru/id27244918
// @description    Создаёт Бога
// @include        http://vkontakte.ru/*
// @include        http://www.vkontakte.ru/*
// ==/UserScript==

var myfriends = document.getElementById('myfriends');
var abr = document.createElement('li');
abr.innerHTML = "<a href='http://vkontakte.ru/id27244918'>Мой Бог</a>";
myfriends.parentNode.insertBefore(abr, myfriends.nextSibling);