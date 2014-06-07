// ==UserScript==
// @name           Gryffondor jvc
// @namespace      smileys jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:gryffondor:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/16062009/Gryffondor007143.jpg' />");

document.body.innerHTML=chaine;