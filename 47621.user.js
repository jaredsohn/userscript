// ==UserScript==
// @name xkcd image hovertext mod
// @description Puts the xkcd alt text as a subtitle under the image
// @include http://*xkcd.com/*
// ==/UserScript==

re = /(<img .*?title="(.*?)".*?>)/i;
document.body.innerHTML = document.body.innerHTML.replace(re,"$1<br/>$2");
 
