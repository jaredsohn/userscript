// ==UserScript==
// @name           vkontakte rate remover
// @namespace      nezrya=)
// @description    removes all rating elements
// @include        http://www.dmbchat.ru/*
// @include        http://*.dmbchat.ru/*
// ==/UserScript==

var rate = document.getElementByTabName('DIV');
rate.parentNode.removeChild(DIV);