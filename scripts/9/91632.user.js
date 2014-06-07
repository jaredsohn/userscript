// ==UserScript==
// @name           Моя тема контакта
// @description    Тема для сайта Вконтакте.
// @author         VIRUS
// @include       http://*.vkontakte.ru/*
// @include       http://*.vk.com/*
// @include       http://vkontakte.ru/*
// @include       http://vk.com/*
// @include       http://*.vkontakte.ru
// @include       http://*.vk.com
// @include       http://vkontakte.ru
// @include       http://vk.com
// @version        1.0
// ==/UserScript==


var link1 = document.createElement('link');

link1.href = 'http://sh-cpb.narod.ru/vk/css.css';
link1.rel = 'stylesheet';
link1.type = 'text/css';

document.getElementsByTagName('head')[0].appendChild(link1);