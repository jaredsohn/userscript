// ==UserScript==
// @name           VK.com  → vkontakte.ru
// @namespace      Переадресация браузера со страницы vk.com на vkontakte.ru с сохранеием текущей открытой страницы 
//                 Script will redirect you from vk.com to vkontakte.ru with same path.
// @include        http://vk.com/*
// ==/UserScript==
/* location.href = 'http://facebook.com/'; */


location.href = location.href.split("vk.com").join("vkontakte.ru");