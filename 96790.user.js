// ==UserScript==
// @name           		dirty windows
// @namespace 		atti12
// @description   	dirty windows
// @version       0.9.9
// @include        http://*dirtywindows.ucoz.ru/*
// ==/UserScript==


var objs = document.getElementsByTagName("img");

        for(var i=0;i<objs.length;i++) {
                objs[i].src = objs[i].src.replace("http://dirtywindows.ucoz.ru/.s/t/831/23.gif", "http://img12.imageshack.us/img12/8563/dirtyhirek.png");
}

