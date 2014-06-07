// ==UserScript==
// @name           bk1 - Add Amazon Link
// @namespace      http://iwamot.com/
// @include        http://www.bk1.jp/trcno/*
// @include        http://www.bk1.jp/product/*
// ==/UserScript==

var LABEL = 'Amazon';

var html = document.body.innerHTML;
var isbn = html.match(/978-4-[0-9X\-]{11}/);
if (!isbn) return;

var anchor = '<a href="http://www.amazon.co.jp/gp/search?field-keywords=' + isbn + '&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A">' + LABEL +'</a>';
document.body.innerHTML = document.body.innerHTML.replace(isbn, isbn + ' ' + anchor);
