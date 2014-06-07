// ==UserScript==
// @name          Disable Google Search Result Redirect
// @namespace     http://admc.hu/
// @description   undoes the evil google redirect
// @include       http://www.google.*/search*
// @include       http://google.*/search*
// ==/UserScript==

var m=document.getElementsByTagName("body");
m[0].innerHTML=m[0].innerHTML.replace(/return rwt/g, "hógyne"); 