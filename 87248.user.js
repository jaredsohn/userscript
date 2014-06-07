// ==UserScript==
// @name           loop play on songtaste
// @namespace      scottxp@126.com
// @description    loop play on songtaste
// @include        http://www.songtaste.com/song/*
// ==/UserScript==
void((function(){ var c=document.getElementById("player"); var d=document.createElement("div"); d.innerHTML="<a href='javascript: void((function(){ var a=document.getElementById(\"player\").getElementsByTagName(\"embed\")[0]; a.setAttribute(\"playcount\",\"0\"); a.parentNode.replaceChild(a.cloneNode(false),a); })())'>循环播放</a>"; c.parentNode.insertBefore(d,c); })())