// ==UserScript==
// @name           weblancer.net "inform" and "hidden" checked
// @namespace      http://userscripts.org/
// @description    Ставит галочку по умолчанию на чекбоксы "Оповещать об изменении статуса проекта" и "Скрыть мою заявку" на странице проекта на www.weblancer.net
// @include        http://www.weblancer.net/projects/*.html
// @include        https://www.weblancer.net/projects/*.html
// @include        http://weblancer.net/projects/*.html
// @include        https://weblancer.net/projects/*.html
// ==/UserScript==

// "Оповещать об изменении статуса проекта"
document.getElementById("inform").checked = true;
document.getElementById("inform").value = 0;

// "Скрыть мою заявку"
document.getElementById("hidden").checked = true;
document.getElementById("hidden").value = 0;