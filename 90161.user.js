// ==UserScript==
// @name           ithappens.ru: только истории
// @namespace      rowaasr13@gmail.com
// @description    Очищает старницу ithappens.ru от всего, кроме блока историй, а в историях вырезает текстовую рекламу.
// @include        http://ithappens.ru
// @include        http://ithappens.ru/*
// ==/UserScript==
(function(){for(var b=document,d=b.body,e=b.getElementsByTagName("td"),f,a=0,g=e.length;a<g;a++){var c=e[a];if(c.className==="text"){f=1;break}}if(f){for(;a=d.firstChild;)d.removeChild(a);for(;a=c.firstChild;)d.appendChild(a);b=b.getElementsByTagName("div");for(a=b.length;a--;){c=b[a];c.className==="info"&&c.parentNode.removeChild(c)}}})()