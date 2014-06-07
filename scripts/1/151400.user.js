// ==UserScript==
// @name          去除'内容'
// @namespace     
// @grant		  none
// @description   去除回复中的'内容'二字
// @include       http://www.hi-pda.com/forum/*
// @version	1.0
// ==/UserScript==

replys = document.getElementsByClassName("t_msgfont");
for (i in replys) {
        if (replys[i].innerHTML.substring(0, 2) == "内容") {                
                replys[i].innerHTML = replys[i].innerHTML.substring(2);
        }
}