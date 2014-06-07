// ==UserScript==
// @name           Mutant jvc
// @namespace      smiley jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:mutant:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/voir/130309/Mutant083810.gif' />");

document.body.innerHTML=chaine;