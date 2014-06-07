// ==UserScript==
// @name          Hapoel !
// @namespace     Hapoel !
// @description   Hapoel !
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://*.forumjv.com/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:hapoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.webidev.com/SitesFiles/smileyland/hapoel.jpg' />");

document.body.innerHTML=chaine;