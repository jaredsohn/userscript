// ==UserScript==
// @name           Shutup.css
// @namespace      http://stevenf.com/wiki/shutup.css.html
// @description    Hide comments from different sites
// @include        *
// ==/UserScript==

var link=document.createElement("link");
link.setAttribute("rel","stylesheet");
link.setAttribute("type","text/css");
link.setAttribute("href","http://stevenf.com/pages/shutup/shutup-latest.css");
var head=document.getElementsByTagName("head")[0];
head.appendChild(link);