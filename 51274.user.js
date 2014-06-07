// ==UserScript==
// @name           Shauni jvc
// @namespace      smileys jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:shauni:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img191.imageshack.us/img191/5318/shauni002722.gif' />");

document.body.innerHTML=chaine;

var chaine=document.body.innerHTML;

var reg=new RegExp("(:))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/1.gif' />");

document.body.innerHTML=chaine;

var chaine=document.body.innerHTML;

var reg=new RegExp("(:-))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/46.gif' />");