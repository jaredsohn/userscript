// ==UserScript==
// @name          Ajout de new smileys sur JeuxVideo.Com v0.5
// @namespace     Ajout de new smileys sur JeuxVideo.Com v0.5
// @description   Ajout de new smileys sur JeuxVideo.Com v0.5
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:mario1:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img839.imageshack.us/i/marioqn.jpg/' />");

var reg=new RegExp("(:pedobear:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img828.imageshack.us/i/pedoear.gif/' />");

var reg=new RegExp("(:bob:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img837.imageshack.us/i/bobr.jpg/' />");


document.body.innerHTML=chaine;


