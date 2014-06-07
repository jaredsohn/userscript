// ==UserScript==
// @name           Gros smileys.
// @namespace      Limera1n
// @description    Ajoute les smileys GrosHap, GrosFier et GroSvp.
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/jvchat#3-27056-318123-1-0-1-0-0.htm
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/messages-prives/message*
// @include        http://www.jeuxvideo.com/commentaires/*
// @exclude        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

//Ajoute le smiley GrosHap.
var reg=new RegExp("(:groshap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/32/1375696871-groshap.gif' />");

//Ajoute le smiley GrosFier.
var reg=new RegExp("(:grosfier:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/32/1375696951-grosfier.gif' />");

//Ajoute le smiley GroSvp.
var reg=new RegExp("(:grosvp:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/32/1375700483-grosvp.gif' />");

document.body.innerHTML=chaine;