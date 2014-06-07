// ==UserScript==// @name           Tapuz Ad Removal// @namespace      http://tribla.4free.co.il
// @description    Remove all Tapuz gif/swf/text banners.// @include        http://*.tapuz.co.il/*
// ==/UserScript==
var s = document.body.innerHTML;
s = s.replace(/<iframe.+realmedia/ig,'<iii');
s = s.replace(/(\/mlinks\/clickOnLink[^>]+)>[^<]+/ig,'$1');
document.body.innerHTML = s;
