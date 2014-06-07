// ==UserScript==
// @name          Smiley :super_gni:
// @namespace     Smiley :super_gni:
// @description   Smiley :super_gni:
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:super_gni:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s2.noelshack.com/old/up/super_gni-34a5225257.gif' />");