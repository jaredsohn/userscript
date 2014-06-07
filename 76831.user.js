// ==UserScript==
// @name           vkontakte another warn remover
// @namespace      svtslv
// @description    script removes all warn elements on vkontakte.ru and vk.com
// @include        http://vkontakte.ru/id*
// @include        http://vkontakte.ru/profile*
// @include        http://vk.com/id*
// @include        http://vk.com/profile*
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

document.getElementById('warnTable').parentNode.style.display = "none";