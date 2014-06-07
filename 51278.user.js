// ==UserScript==
// @name           Robert jvc
// @namespace      smileys jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:robert:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://reflecteregame.files.wordpress.com/2009/03/pedobear.png' />");

document.body.innerHTML=chaine;