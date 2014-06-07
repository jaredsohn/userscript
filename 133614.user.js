// ==UserScript==
// @name           维基百科重定向器
// @description    把繁体版自动转为简体版
// @version        1.0
// @include        http://zh.wikipedia.org/zh/*
// @run-at         document-start
// ==/UserScript==

url = document.location.href;
url = url.replace('zh/', 'wiki/');
document.location.href = url;