// ==UserScript==
// @name           upload.com.ua_bypass
// @namespace      ftf.at.ua
// @include        http://upload.com.ua/dget/*
// ==/UserScript==
for(i in unsafeWindow)if(i.match(/^link[0-9a-f]{6}/i))
		document.location.href=unsafeWindow[i].join('');