// ==UserScript==
// @name           malinka
// @namespace      http://vkontakte.ru/id26745542
// @description    Создаёт Алинку
// @include        http://vkontakte.ru/*
// @include        http://www.vkontakte.ru/*
// ==/UserScript==

var myfriends = document.getElementById('myfriends');
var abr = document.createElement('li');
abr.innerHTML = "<a href='http://vkontakte.ru/id26745542'>Моя Алинка</a>";
myfriends.parentNode.insertBefore(abr, myfriends.nextSibling);