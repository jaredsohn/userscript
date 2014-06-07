// ==UserScript==
// @name       get Baidu pan link
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Baidu Pan Direct Link
// @match      http://yun.baidu.com/*
// @match      http://pan.baidu.com/*
// @copyright  2013, Gi Tetsu
// ==/UserScript==
var link2;
link2=document.documentElement.innerHTML.match(/\\"dlink\\":\\"(http:\\\\\/\\\\\/d\.pcs\.baidu\.com\\\\\/file\\\\\/.*?)"/i);
var result=link2[1].replace(/\\/g,'');
$(".navs").append('<a class="def-nav" hidefocus="hideFocus" href="'+result+'">直接下载</a>');