// ==UserScript==
// @name           MyGirl
// @namespace      http://vkontakte.ru
// @include        http://vkontakte.ru/*
// ==/UserScript==

var myfriends = document.getElementById('myfriends');
var abr = document.createElement('li');
abr.innerHTML = "<a href='http://vkontakte.ru/id10076608'>Моя Девушка</a>";
myfriends.parentNode.insertBefore(abr, myfriends.nextSibling);