// ==UserScript==
// @name           		Beload.hu customizer v0.9 (Greasemonkey)
// @namespace 		atti12
// @description   	Beload.hu customizer v0.9.9
// @version       0.9.9
// @include        http://*beload.hu/*
// ==/UserScript==



var objs = document.getElementsByTagName("img");

        for(var i=0;i<objs.length;i++) {
                objs[i].src = objs[i].src.replace("http://beload.hu/themes/gray/logo.jpg", "http://img836.imageshack.us/img836/4047/beload1fejlec.png");
                objs[i].src = objs[i].src.replace("http://beload.hu/themes/gray/nophoto.png", "http://img231.imageshack.us/img231/6470/blogoct.png");
                objs[i].src = objs[i].src.replace("http://beload.hu/themes/brown/logo.jpg", "http://img841.imageshack.us/img841/4717/beload3fejlec.png");
                objs[i].src = objs[i].src.replace("http://beload.hu/themes/brown/nophoto.png", "http://img231.imageshack.us/img231/6470/blogoct.png");
                objs[i].src = objs[i].src.replace("http://beload.hu/themes/blue/logo.jpg", "http://img375.imageshack.us/img375/2627/beload2fejlec.png");
                objs[i].src = objs[i].src.replace("http://beload.hu/themes/blue/nophoto.png", "http://img231.imageshack.us/img231/6470/blogoct.png");
}