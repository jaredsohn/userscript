// ==UserScript==
// @id             www.erepublik.com-31477f6e-a75b-4f4e-87c8-0c896e6916c1@dejan.erep
// @name           Одстрани нотификации Нова Вредност
// @version        1.0
// @namespace      dejan.erep
// @author         Dejan
// @description    Само за Ред Стефан :)
// @include        http://www.erepublik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant 	   GM_addStyle
// @run-at         document-end
// ==/UserScript==

$(document).ready(function () {
	$('.newleaderboard em').remove();
});