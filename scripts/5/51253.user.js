// ==UserScript==
// @name           Shauni jvc
// @namespace      smileys jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:shauni:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/10062009/gif099387.gif' />");

document.body.innerHTML=chaine;