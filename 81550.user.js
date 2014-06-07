// ==UserScript==
// @name          Plus de smileys pour JVC !
// @namespace     Plus de smileys pour JVC !
// @description   Plus de smileys pour JVC !
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @include       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:supergni:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/supergni.gif' />");

var reg=new RegExp("(:awesome:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://jvclibre.com/smileys/awesome.gif' />");

var reg=new RegExp("(:hapc:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.neotopia.fr.cr/smileys/chap.gif' />");

var reg=new RegExp("(:noelc:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.neotopia.fr.cr/smileys/cnoel.gif' />");

var reg=new RegExp("(:noelok:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.neotopia.fr.cr/smileys/noelok2.gif' />");

var reg=new RegExp("(:hapbravo:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.neotopia.fr.cr/smileys/happlaudit.gif' />");

var reg=new RegExp("(:noelbravo:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://jvclibre.com/smileys/boel.gif' />");

var reg=new RegExp("(:noelenvers:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.neotopia.fr.cr/smileys/renoel.gif' />");

document.body.innerHTML=chaine;