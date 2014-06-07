// ==UserScript==
// @name           ff启动unity插件
// @namespace      piscat.com
// @description    启动unity插件
// @match          http://*.acfun.*/a/*
// @author         piscat
// @version        1.0
// @grant          none
// ==/UserScript==

Array.prototype.forEach.call(document.getElementsByTagName("embed"),function(a){a.outerHTML=a.outerHTML.replace(/^.embed /,unescape("%3ciframe "));})