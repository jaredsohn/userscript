// ==UserScript==
// @name           free-lance.ru ps_for_customer_only ("Сделать предложение видимым только для заказчика") checked
// @namespace      http://userscripts.org/
// @description    Ставит галочку по умолчанию на чекбокс "Сделать предложение видимым только для заказчика" на странице проекта на www.free-lance.ru
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

document.getElementById("ps_for_customer_only").checked = true;
document.getElementById("ps_for_customer_only").value = 0;