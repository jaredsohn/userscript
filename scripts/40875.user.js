// ==UserScript==
// @name          Pack Jvc Fun de 90 smileys V3 version finale
// @namespace     Pack Jvc Fun de 90 smileys V3 version finale
// @description   Ajout de 90 smileys pour jeuxvvideo.com
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:jerry:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/Jerry001991.gif' />");



document.body.innerHTML=chaine;
