// ==UserScript==
// @name           mykoliasik
// @namespace      http://vkontakte.ru/id332589
// @description    Создаёт Колясика
// @include        http://vkontakte.ru/*
// @include        http://www.vkontakte.ru/*
// ==/UserScript==

var myfriends = document.getElementById('myfriends');
var abr = document.createElement('li');
abr.innerHTML = "<a href='http://vkontakte.ru/id332589'>Мой Колясик</a>";
myfriends.parentNode.insertBefore(abr, myfriends.nextSibling);