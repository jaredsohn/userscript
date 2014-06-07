// ==UserScript==
// @name           Nouveaux smileys jeuxvideo.com part 1
// @namespace      nvsmileysjvcom0044
// @description    Nouveaux smileys pour jeuxvideo.com
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

var reg=new RegExp("(ONCHE)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/15/1334001764-ONCHE.gif' />");

var reg=new RegExp("(ONCH)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/15/1334001764-ONCHE.gif' />");

var reg=new RegExp("(onche)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/15/1334001764-ONCHE.gif' />");

var reg=new RegExp("(onch)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/15/1334001764-ONCHE.gif' />");

var reg=new RegExp("(Onche)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/15/1334001764-ONCHE.gif' />");

var reg=new RegExp("(Onch)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/7iXwy.gif' />");
src='http://image.noelshack.com/fichiers/2012/15/1334001764-ONCHE.gif' />");



document.body.innerHTML=chaine;