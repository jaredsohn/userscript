// ==UserScript==
// @name           ImageFap.com: disable pop-under.
// @namespace      rowaasr13@gmail.com
// @description    Disables pop-under window that opens after clicking anywhere on page.
// @include        http://*.imagefap.com/*
// @include        http://imagefap.com/*
// ==/UserScript==

document.cookie='popundr=1; path=/; expires='+new Date(Date.now()+24*60*60*1000*356).toGMTString();