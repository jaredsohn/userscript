// ==UserScript==
// @name Beload.cc customizer v0.9 (Greasemonkey)
// @namespace gabriel1
// @description Beload.cc customizer v0.9.9
// @version 0.9.9
// @include http://*beload.cc/*
// ==/UserScript==



var objs = document.getElementsByTagName("img";);

for(var i=0;i<objs.length;i++) {
objs.src = objs[i].src.replace("http://beload.cc/themes/gray/logo.jpg", "http://img703.imageshack.us/img703/7210/beloadfejlecwindows7sty.png";
objs[i].src = objs[i].src.replace("http://beload.cc/themes/brown/logo.jpg", "http://img703.imageshack.us/img703/7210/beloadfejlecwindows7sty.png";
objs[i].src = objs[i].src.replace("http://beload.cc/themes/blue/logo.jpg", "http://img703.imageshack.us/img703/7210/beloadfejlecwindows7sty.png";