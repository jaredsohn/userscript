// ==UserScript==
// @name           reddit next page on top
// @namespace      redditnextpage
// @description     jumble stuff around a bit
// @include        http://www.reddit.com/*
// ==/UserScript==

 $(".side + .content")[0].insertBefore($(".nextprev")[0].cloneNode(true), $(".side + .content")[0].firstChild);