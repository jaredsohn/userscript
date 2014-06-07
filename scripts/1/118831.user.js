// ==UserScript==
// @name           free-lance.ru prefer_sbr ("Работайте без риска") unchecked
// @namespace      http://userscripts.org/
// @description    Убирает галочку по умолчанию с чекбокса "Работайте без риска" на странице проекта на www.free-lance.ru
// @include        http://www.free-lance.ru/projects/*/*.html
// @include        https://www.free-lance.ru/projects/*/*.html
// @include        http://free-lance.ru/projects/*/*.html
// @include        https://free-lance.ru/projects/*/*.html
// @include        http://www.fl.ru/projects/*/*.html
// @include        https://www.fl.ru/projects/*/*.html
// @include        http://fl.ru/projects/*/*.html
// @include        https://fl.ru/projects/*/*.html
// @include        http://old.fl.ru/projects/*/*.html
// @include        https://old.fl.ru/projects/*/*.html
// ==/UserScript==

document.getElementById("prefer_sbr").checked = false;
document.getElementById("prefer_sbr").value = 1;