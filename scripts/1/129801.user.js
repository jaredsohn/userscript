// ==UserScript==
// @name          Pack de 8 smileys JVC !
// @namespace     Pack de 8 smileys JVC !
// @description   Un pack de 8 smiley pour vous!:hap:
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(XD)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333021602-xd-811ee06c11.gif' />");

var reg=new RegExp("(:pfosef:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333021869-osef-1f1eabbb22.gif' />");

var reg=new RegExp("(onche)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333021927-onche-626d71036.gif' />");

var reg=new RegExp("(=()", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333021893--cd6ae84f68.gif' />");

var reg=new RegExp("(:noelbad:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333227560-Noelbad.gif' />");

var reg=new RegExp("(:luigi:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333227959-mario.gif' />");

var reg=new RegExp("(:ggold:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333228514-ggold.gif' />");

var reg=new RegExp("(:dgold:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333228474-dgold.gif' />");

document.body.innerHTML=chaine;