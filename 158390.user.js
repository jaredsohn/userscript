// ==UserScript==
// @name           Remplacer les ":hap:" par des ":noel:"
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/messages-prives/message*
// @include        http://www.jeuxvideo.com/commentaires/*
// @exclude        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(http://image.jeuxvideo.com/smileys_img/18.gif)", "g");
chaine=chaine.replace(reg,"http://image.jeuxvideo.com/smileys_img/11.gif");

document.body.innerHTML=chaine;