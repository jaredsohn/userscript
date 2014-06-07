// ==UserScript==	
// @name Kikuyutoo Loader (modified for Janeth)
// @namespace
// @description Janeth Kikuyutoo - vkontakte.ru audio scrobbler (загрузчик)
// @include http://vkontakte.ru/*
// @match http://vkontakte.ru/*
// @match http://*.vkontakte.ru/*
// @match http://vk.com/*
// @match http://*.vk.com/*
// ==/UserScript==
// Author: Сергей Третьяк
// Version: 1
// Site: http://code.google.com/p/kikuyutoo/


// Загрузка скрипта
var script = document.createElement('script');
var ver = '1.0';
script.src = 'http://nichtverstehen.de/vkontakte-scrobbler/vkontakte-scrobbler.user.js?' + ver;
script.type = 'text/javascript';
script.charset = 'utf-8';
window.document.getElementsByTagName('head')[0].appendChild(script);