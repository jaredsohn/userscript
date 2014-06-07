// ==UserScript==
// @name           4Dent.net - Link Protection autoclick
// @namespace      http://userscripts.org/scripts/review/76757
// @description    Thanks to Lixy.in (http://userscripts.org/scripts/review/54399) for code
// @description    Use in conjunction with 
// @include        http://4dent.net/link/m1.php?id=*
// @include        http://4dent.net/link/*
// ==/UserScript==

var Button = document.getElementsByClassName("groovybutton");
Button[0].click();