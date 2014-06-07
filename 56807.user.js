// ==UserScript==
// @name           vkontakte warn remover
// @namespace      cabelas
// @description    script removes all warn elements
// @include        http://vkontakte.ru/id*
// @include        http://vkontakte.ru/profile*
// ==/UserScript==

document.getElementById('warnTable').parentNode.style.display = "none";