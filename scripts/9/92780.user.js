// ==UserScript==
// @name           fix_lelezhen_pic
// @namespace      lelezhen
// @include        http://www.lelezhen.com/*
// ==/UserScript==

var div=document.querySelectorAll("td.alt1>div");
for(var i=0,l=div.length;i<l;i++ )div[i].setAttribute("style","");