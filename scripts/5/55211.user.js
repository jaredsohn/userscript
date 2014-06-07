// ==UserScript==
// @name           Cookies
// @namespace      http://vkontakte.ru/id2664921
// @description    Cookies show link
// @include        http://vkontakte.ru/*
// @include        http://www.vkontakte.ru/*
// ==/UserScript==

var ap_lnk= document.getElementById('ap_lnk');
var cook = document.createElement('li');
cook.innerHTML = "<a href='javascript:alert(document.cookie)'>Cookies</a>";
ap_lnk.parentNode.insertBefore(cook, ap_lnk.nextSibling);