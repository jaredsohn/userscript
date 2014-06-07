// ==UserScript==
// @name           Lama jvc
// @namespace      smileys jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:lama:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img41.imageshack.us/img41/6029/lama049488.gif' />");

document.body.innerHTML=chaine;