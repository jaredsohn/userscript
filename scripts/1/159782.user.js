// ==UserScript==
// @name         520xs 正文无链接
// @namespace    http://jixun.org/
// @version      1.0.1.0
// @description  搭配 ABPlus 食用效果更佳。
// @include      *://*.520xs.com/*
// @include      *://520xs.com/*
// @copyright    2012+, Jixun
// ==/UserScript==

(function (a) {
    var p=document.querySelectorAll (a);
    for (i=0; i<p.length; i++) { p[i].parentNode.removeChild (p[i])};
    unsafeWindow.showpop = function (url) { console.log ('网页请求已拦截 :: ' + url) }
})('div#TXT a');