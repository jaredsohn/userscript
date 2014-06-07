// ==UserScript==
// @name       rawmaster
// @namespace  dasdasdasdasdad
// @version    0.1
// @description  dasdasdadadasdad
// @include        http://www.erepublik.com/*/economy/market/*/12/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  Pyramidicus
// ==/UserScript==
$('sup').each(function(i, value){var c = $(this).text();var b = c.substring(3);var a = c.replace(b, '');if(a == '.02'){var kol = parseInt($('td.m_stock').eq(i).text());$('input[type="text"]').eq(i).val(kol);$('a[class="f_light_blue_big buyOffer"]').eq(i).click();}else{if(i == 0){location.href=location.href;}}});