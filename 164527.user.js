// ==UserScript==
// @name       rawmaster
// @namespace  dasdasdasdasdad
// @version    0.1
// @description  dasdasdadadasdad
// @include        http://www.erepublik.com/*/economy/market/*/12/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  Pujo Sotka
// ==/UserScript==

var c = $('sup').eq(0).text();
var b = c.substring(3);
var a = c.replace(b, '');
if(a == '.03'){
var kol = parseInt($('td.m_stock').eq(0).text());
$('input[type="text"]').eq(1).val(kol+'000');
$("span:contains('Buy')").eq(1).click();
}
else{
location.href=location.href;
}
