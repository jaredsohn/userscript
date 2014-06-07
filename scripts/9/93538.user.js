// ==UserScript==
// @name           fanfou remove beta
// @namespace      fanfou
// @include        http://fanfou.com/*
// ==/UserScript==

var h1 = document.getElementsByTagName('h1')[0];
var img = h1.getElementsByTagName('img')[0];
img.src = 'http://static.fanfou.com/img/fanfou.png?1.png';
