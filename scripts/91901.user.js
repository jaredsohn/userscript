// ==UserScript==
// @name VKMain
// @namespace VKMain
// @version 1.0
// @author WarLock www.vkontakte.ru/id100599
// @description Добавляет кнопку "Главная" в меню
// @include http://vkontakte.ru/*
// @include http://*.vkontakte.ru/*
// ==/UserScript==

var qtop = document.getElementById('top_links');
var newLink = document.createElement('a');
newText=document.createTextNode('главная')
newLink.appendChild(newText);
newLink.setAttribute('class', 'fl_r');
newLink.setAttribute('href','/');
qtop.appendChild(newLink);

