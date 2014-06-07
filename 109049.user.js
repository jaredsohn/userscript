// ==UserScript==
// @name           2ch-adlock
// @namespace      http://2ch.so/*
// @include        http://2ch.so/*
// ==/UserScript==

var allPre = document.getElementsByTagName('center');
for (var i=0,n=allPre.length;i<n;i++) {
   allPre[i].innerHTML=allPre[i].innerHTML.replace(/<br \/>/gi,"\n");
}
