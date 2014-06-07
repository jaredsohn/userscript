// ==UserScript==
// @name           DarkNoel jvc
// @namespace      smileys jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:darknoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/voir/130309/DarkNoel098610.gif' />");

document.body.innerHTML=chaine;