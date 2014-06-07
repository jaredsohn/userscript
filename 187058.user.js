// ==UserScript==
// @name          :geek:	
// @namespace     :geek:
// @description   Un pack de 8 smiley pour vous!:hap:
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*

// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:geek:)", "g");
chaine=chaine.replace(reg,"<img border=0 

src='http://image.noelshack.com/fichiers/2014/02/1389390350-jolie.gif' />");


document.body.innerHTML=chaine;