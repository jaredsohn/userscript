// ==UserScript==
// @id             noimg
// @name           noimg
// @version        1.0
// @namespace      alsjkdf
// @author         kljfds
// @description    jfkds
// @include        http://www.f*n*g.*/*
// @run-at         document-end
// ==/UserScript==

var dnr = document.createElement("div");
dnr.innerHTML = "Don't<br>read<br>me<br>please<br>:)";
dnr.style.position = "fixed";
dnr.style.top = "400px";
dnr.style.left = "0px";
dnr.style.width = "400px";
dnr.style.textAlign = "center";
dnr.style.fontSize = "30px";
document.body.appendChild(dnr);

var img = document.getElementsByTagName("img");
var all = document.getElementsByTagName("*");
function replace()
{
    for(var i=0; img[i]; i++) img[i].setAttribute("src", '');
    for(i=0; all[i]; i++) all[i].style.background = "none";
}

replace();
document.body.addEventListener("DOMNodeInserted", function(){ replace(); });
document.title = "Hi, whoever's looking at this";