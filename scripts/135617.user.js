// ==UserScript==
// @name           		wline.hu 
// @namespace 		ironman
// @description   	wline
// @version       0.9.9
// @include        http://*wline.hu/*
// ==/UserScript==



var objs = document.getElementsByTagName("img");

        for(var i=0;i<objs.length;i++) {
        objs[i].src = objs[i].src.replace("http://i.wline.hu/pic/main_smile_1.gif", "http://i.wline.hu/pic/kukk.gif");
}

var objs = document.getElementsByTagName("div");

        for(var d=0;d<objs.length;d++) {
        objs[d].src = objs[d].src.replace("<div class="ikonok2">", "<div class="ikonok1">");
}