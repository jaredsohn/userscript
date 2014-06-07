// ==UserScript==
// @name Text-decoration
// @description  去除链接下划线
// @create 2011-3-24
// @namespace  http://userscripts.org/users/longfloat
// @include http*
// ==/UserScript==

var style = document.createElement('style');
style.appendChild(document.createTextNode('* { text-decoration: none !important;}'));
(document.head || document.documentElement).appendChild(style);