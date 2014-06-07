// ==UserScript==
// @name           		nCore (Greasemonkey)
// @namespace 		atti12
// @description   	nCore
// @version       1
// @include        http://ncore.cc
// ==/UserScript==



var objs = document.getElementsByTagName("img");

        for(var i=0;i<objs.length;i++) {
                objs[i].src = objs[i].src.replace("http://ncore.cc/styles/bjutibluu/bg8.jpg", "http://noob.hu/2011/03/29/background.jpg");