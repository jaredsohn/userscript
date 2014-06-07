// ==UserScript==
// @name           Coloration de pseudos
// @namespace      Coloration de pseudos
// @description	   Coloration de pseudos
// @include        http://www.jeuxvideo.com/forums/0-*
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("<strong>SmellGood</strong>", "g");
chaine=chaine.replace(reg,"<strong class='moderateur'>SmellGood</strong>");



document.body.innerHTML=chaine;
