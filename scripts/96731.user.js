// ==UserScript==
// @name           		Beload.hu customizer v0.9 (Greasemonkey)
// @namespace 		atti12
// @description   	Beload.hu customizer v0.9.9
// @version       0.9.9
// @include        http://*beload.hu/*
// ==/UserScript==



var objs = document.getElementsByTagName("img");

        for(var i=0;i<objs.length;i++) {
                objs[i].src = objs[i].src.replace("http://beload.hu/themes/gray/logo.jpg", "http://img703.imageshack.us/img703/7210/beloadfejlecwindows7sty.png");
                objs[i].src = objs[i].src.replace("http://beload.hu/themes/brown/logo.jpg", "http://img703.imageshack.us/img703/7210/beloadfejlecwindows7sty.png");
                objs[i].src = objs[i].src.replace("http://beload.hu/themes/blue/logo.jpg", "http://img703.imageshack.us/img703/7210/beloadfejlecwindows7sty.png");
}
