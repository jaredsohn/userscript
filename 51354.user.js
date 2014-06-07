// ==UserScript==
// @name           Pack jvc
// @namespace      smileys jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:haponoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/voir/130309/HapoNoel009191.gif' /> ");

document.body.innerHTML=chaine;

var chaine=document.body.innerHTML;

var reg=new RegExp("(:noel: Schivardi)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/voir/130309/Schivardi037549.gif' /> ");

document.body.innerHTML=chaine;

var chaine=document.body.innerHTML;

var reg=new RegExp("(alakazam bagoon)", "g");
chaine=chaine.replace("http://www.youtube.com/watch?v=6aRuqozNMmQ");

document.body.innerHTML=chaine;