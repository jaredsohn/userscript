// ==UserScript==
// @name Beload.hu customizer v0.9 (Greasemonkey)
// @namespace ambrusarnold
// @description Beload.hu customizer v0.9.9
// @version 0.9.9
// @include http://*beload.hu/*
// ==/UserScript==

var objs = document.getElementsByTagName("img";

for(var i=0;i<objs.length;i++) {
objs.src = objs[i].src.replace("http://beload.hu/themes/gray/logo.jpg", "http://img703.imageshack.us/img703/7210/beloadfejlecwindows7sty.png";
objs[i].src = objs[i].src.replace("http://beload.hu/themes/brown/logo.jpg", "http://noob.hu/2010/10/21/beloadbannercsds_copy.png";
objs[i].src = objs[i].src.replace("http://beload.hu/themes/blue/logo.jpg", "http://img703.imageshack.us/img703/7210/beloadfejlecwindows7sty.png";