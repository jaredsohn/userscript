// ==UserScript==
// @name        Radikal.ru: fix
// @namespace   http://userscripts.org/scripts/show/181126
// @description показ картинок с отключенным js для сайта
// @include     http://radikal-foto.ru/fp/*
// @include     http://radical-foto.ru/fp/*
// @include     http://f-page.ru/fp/*
// @include     http://f-page.ru/lfp/*
// @include     http://f-lite.ru/lfp/*
// @version     1
// @downloadURL http://userscripts.org/scripts/source/181126.user.js
// @updateURL   http://userscripts.org/scripts/source/181126.meta.js
// @grant       none
// ==/UserScript==

var re = /\"Url\":\"(.*?)\"/i;
document.body.innerHTML = "<img src=\""+document.body.innerHTML.match(re)[1]+"\" />";
