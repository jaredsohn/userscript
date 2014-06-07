// ==UserScript==
// @id             TiebaRedirect@jiayiming
// @name           百度贴吧重定向
// @version        1.2
// @namespace      jiayiming
// @author         jiayiming
// @description    重定向各类同素异形体到更科学的主域名tieba.baidu.com
// @include        http://tieba.baidu.com.cn/*
// @include        http://tieba.baidu.cn/*
// @include        http://post.baidu.*
// @updateURL      https://userscripts.org/scripts/source/155728.meta.js
// @downloadURL    https://userscripts.org/scripts/source/155728.user.js
// @run-at         document-start
// ==/UserScript==

//目前发现以下同素异形体
//http://tieba.baidu.com.cn
//http://tieba.baidu.cn
//http://post.baidu.cn
//http://post.baidu.com

document.location.host = "tieba.baidu.com";