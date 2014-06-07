// ==UserScript==
// @name           MohNet Fast Domain
// @namespace      Переадресация с mohnet.ru на mohnet.co.tv
//                 Script will redirect you from vk.com to vkontakte.ru with same path.
// @include        http://mohnet.ru/*
// ==/UserScript==
/* location.href = 'http://facebook.com/'; */


location.href = location.href.split("mohnet.ru").join("mohnet.co.tv");