// ==UserScript==
// @name          Horizontal scrollbar for Asat
// @description	  Add a horizontal scrollbar to Asat forums for wide pages
// @include       http://forums.asat.org.il/*
// @include       http://www.hapetek.co.il/forums/*
// By Ohad Lutzky, lutzky@gmail.com 2006
// ==/UserScript==

var styles="body > table {direction: ltr } body > table > * { direction:rtl }";
var newSS = document.createElement("link");
newSS.rel = "stylesheet";
newSS.href = "data:text/css," + escape(styles);
document.documentElement.childNodes[0].appendChild(newSS);

