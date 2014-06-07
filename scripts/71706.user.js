// ==UserScript==
// @name           club93996
// @namespace      http://vkontakte.ru/id332589
// @description    Создает Учебную Группу
// @include        http://vkontakte.ru/*
// @include        http://www.vkontakte.ru/*

var myfriends = document.getElementById('myfriends');
var abr = document.createElement('li');
abr.innerHTML = "<a href='http://vkontakte.ru/club93996'>Моя Учебная Группа</a>";
myfriends.parentNode.insertBefore(abr, myfriends.nextSibling);
// ==/UserScript==