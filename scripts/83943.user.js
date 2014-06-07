// ==UserScript==
// @name           Smiley rhap pour JV.C
// @namespace      Smiley rhap pour JV.C
// @description    Smiley rhap pour JV.C
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/commentaires/*
// @exclude        http://www.jeuxvideo.com/forums/0-*
// @exclude        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:rhap:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/rhapkfk.gif' />");

document.body.innerHTML=chaine;