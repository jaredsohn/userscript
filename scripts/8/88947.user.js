// ==UserScript==
// @name          Ajout de zap
// @namespace     Ajout de zap
// @description   Ajout de zap
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:onche:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/onchepup.gif' />");
var reg=new RegExp("(:zap:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/zap.gif' />");
document.body.innerHTML=chaine;
