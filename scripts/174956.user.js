// ==UserScript==
// @name         贴吧妹纸认证帖子名前图标隐藏
// @namespace    http://jixun.org/
// @version      1.0
// @description  把帖子名前面的图标藏起来… 整页都是…
// @include      *://tieba.com/*
// @include      *://tieba.baidu.com/*
// @copyright    2012+, Jixun
// @run-at       document-start
// ==/UserScript==

addEventListener ('DOMContentLoaded', function () {
 var a = document.createElement ('style');
 a.innerHTML = 'img.icon_pre { display:none; }';
 document.body.appendChild (a);
}, false);