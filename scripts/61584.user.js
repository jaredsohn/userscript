// ==UserScript==
// @name           Userscripts.org Logo Fix
// @namespace      #aVg
// @description    Fixes wide logos to fit.
// @include        http://userscripts.org/scripts/*
// @version        0.1
// ==/UserScript==
var img=document.getElementById("icon").firstChild;
img.src=img.src.replace("thumb", "large");
img.width=126;