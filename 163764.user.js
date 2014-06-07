// ==UserScript==
// @name           Grohap et Gronoel
// @namespace      Grohap et Gronoel
// @description    Nouveaux smileys pour jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/messages-prives/message*
// @include        http://www.jeuxvideo.com/commentaires/*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:grohap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/14/1364832484-grohap.png' />");

var reg=new RegExp("(:gronoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/14/1364832484-gronoel.png' />");



document.body.innerHTML=chaine;