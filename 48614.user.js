// ==UserScript==
// @name           myabr
// @namespace      http://vkontakte.ru/borisova
// @description    Создаёт Абрамова
// @include        http://vkontakte.ru/*
// @include        http://www.vkontakte.ru/*
// ==/UserScript==

var myfriends = document.getElementById('myfriends');
var abr = document.createElement('li');
abr.innerHTML = "<a href='http://vkontakte.ru/id16921756'>Мой Абрамов</a>";
myfriends.parentNode.insertBefore(abr, myfriends.nextSibling);