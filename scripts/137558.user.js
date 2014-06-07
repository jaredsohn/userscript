// ==UserScript==
// @name           自动跳转城通国际版
// @version        1.1
// @namespace      http://jixun.org/
// @author         jixun66
// @description    自动跳转城通网盘地址到国际版的地址，因为国内的那啥屏蔽了ctdisk到国外的访问。
// @include        *://*.ctdisk.com/*
// @include        *://ctdisk.com/*
// @run-at         document-start
// ==/UserScript==

location.href = location.href.replace(/ctdisk\.com\//i, "400gb.com/");