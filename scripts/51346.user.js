// ==UserScript==
// @name           Cisla jvc
// @namespace      smileys jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(Cisla)", "g");
chaine=chaine.replace(reg,"Celui-dont-on-ne-pronnonce-pas-le-nom");

document.body.innerHTML=chaine;

var chaine=document.body.innerHTML;

var reg=new RegExp("(cisla)", "g");
chaine=chaine.replace(reg,"Celui-dont-on-ne-pronnonce-pas-le-nom");

document.body.innerHTML=chaine;