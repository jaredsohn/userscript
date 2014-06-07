// ==UserScript==
// @name       AntiCookiDirective
// @namespace  http://adiq.eu
// @version    0.1
// @description  Script blocking information about Cookie across the web.
// @match      http://*/*
// @exclude      http://userscripts.org/*
// @exclude      http://www.wykop.pl/*
// @require  http://code.jquery.com/jquery-1.9.1.min.js
// @copyright  2012, Adrian AdiQ Zmenda
// ==/UserScript==

// Blocking standard by wykop.pl/link/1455315/apel-dla-administratorow-stron-www/
$('#cookie-alert').remove();
$('.cookie-alert').remove();


// Universal blocking
$('div[class*=cookie]').remove();
$('div[id*=cookie]').remove();

// Super strict blocking
$("div div:contains('używa cookie')").remove();
$("div div:contains('używamy cookie')").remove();
$("div div:contains('using cookie')").remove();
$("div div:contains('use cookie')").remove();

$("div div:contains('pliki cookie')").remove();
$("div div:contains('plików cookie')").remove();
$("div div:contains('cookie files')").remove();