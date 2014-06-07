// ==UserScript==
// @name           Stavki_ENVD
// @namespace      http://virtonomic*.*/*/main/geo/regionENVD/*
// @description    Создаёт список ставок ЕНВД
// @include        http://virtonomic*.*/*/main/geo/regionENVD/*
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$=win.$;
var texxt='';
$('table.list>tbody>tr[class]').each(function(){
$('td:contains("%")',this).each(function(){
aaa=$(this).prev();
texxt+='"'+aaa.prop('textContent')+'":'+$(this).prop('textContent').slice(0,-2)+',';})})
alert(texxt.slice(0,-1));