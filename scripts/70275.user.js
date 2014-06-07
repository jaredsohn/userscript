// ==UserScript==
// @name           remove target blank
// @namespace      *
// @description    removes the target="_blank" crap that really annoys me
// ==/UserScript==
var a = document.getElementsByTagName('a'); 
for (i = 0; i < a.length; i++) a[i].setAttribute('target','_self');
