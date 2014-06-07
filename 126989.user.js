// ==UserScript==
// @name           Fix ap3.ee
// @namespace      http://userscripts.org/users/436650
// @description    Removes ads and fixes header of www.ap3.ee
// @version        1.0
// @include        http://ap3.ee/*
// ==/UserScript==

var s = document.createElement('style');
s.type = "text/css";
s.innerHTML = '#siteHeaderTopBanner,.adOceanBanner,.box boxBanner{display:none ! important}#siteContent{padding-top:40px}'
document.head.appendChild(s);