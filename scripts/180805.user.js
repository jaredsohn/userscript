// ==UserScript==
// @name          Smiley Monsieurjij
// @namespace     Smiley Monsieurjij
// @description   Smiley Monsieurjij
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:monsieurjij:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img11.hostingpics.net/pics/457752monsieurjij.png' />");


document.body.innerHTML=chaine;



