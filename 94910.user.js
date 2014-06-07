// ==UserScript==
// @name           vkontakte rate remover
// @namespace      nezrya=)
// @description    removes all rating elements
// @include        http://vkontakte.ru/id*
// @include        http://vkontakte.ru/profile*
// ==/UserScript==

document.getElementById('rate').style.display = "none"; 
document.getElementById('rateGold').style.display = "none";