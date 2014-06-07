// ==UserScript==
// @id                     TBRedirect@Angel_samele
// @name                福利链接重定向
// @version             1.2
// @namespace       Angel_samele
// @author               Angel_samele
// @description       重定向tb到taobao
// @include              http://*.tb.com/*
// @include              http://*.tm.com/*
// @updateURL        https://userscripts.org/scripts/source/471780.meta.js
// @downloadURL    https://userscripts.org/scripts/source/471780.user.js
// @run-at         document-start
// ==/UserScript==

window.location.href = window.location.href
.replace('tb.com', 'taobao.com')
.replace('tm.com', 'tmall.com');

