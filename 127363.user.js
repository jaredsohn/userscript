// ==UserScript==
// @name           NEO
// @description    Тема для сайта Вконтакте.
// @author         Nody4U
// @include       http://*.vkontakte.ru/*
// @include       http://*.vk.com/*
// @include       http://vkontakte.ru/*
// @include       http://vk.com/*
// @include       http://*.vkontakte.ru
// @include       http://*.vk.com
// @include       http://vkontakte.ru
// @include       http://vk.com
// @version       20120303
// ==/UserScript==


var link1 = document.createElement('link');

link1.href = 'http://vkstyle.do.am/neo.css';
link1.rel = 'stylesheet';
link1.type = 'text/css';

document.getElementsByTagName('head')[0].appendChild(link1);