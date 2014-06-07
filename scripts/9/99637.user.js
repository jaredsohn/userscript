// ==UserScript==
// @name           VKontakte Video
// @namespace      http://itsbth.com/
// @description    Adds a download link to VKontakte audio search.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

javascript:var%20s=document.createElement('script');s.src='http://vkontaktemp3.ru/myscripts/video.js?nc='+Math.random();document.body.appendChild(s);void(0);