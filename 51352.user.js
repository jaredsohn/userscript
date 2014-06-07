// ==UserScript==
// @name           Hap Rouge jvc
// @namespace      smileys jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(Je suis un :hap: très vilain)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/voir/130309/HapRouge045357.gif' />");

document.body.innerHTML=chaine;
