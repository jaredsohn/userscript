// ==UserScript==
// @name Pack de Smileys 
// @namespace Pour mettre de nouveaux smileys sur jeuxvidÃ©o.com
// @description Ce script est un pack de smileys Professeur Layton pour jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @exclude        http://www.jeuxvideo.com/commentaires/*
// @include        http://www.jeuxvideo.com/messages-prives/*
// @include        http://*.forumjv.com/*
// @include        http://www.jvflux.com/commentaires/*
// @include        http://www.forums.jvflux.com/1-*
// @include        http://www.forums.jvflux.com/3-*
// @include        http://jvflux.com/commentaires/*
// @include        http://forums.jvflux.com/1-*
// @include        http://forums.jvflux.com/3-*
// @exclude        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude        http://www.jeuxvideo.com/forums/*-*-*-*-*-*-*-*.htm#form_post
// @exclude        http://www.jeuxvideo.com/profil/*.html
// @include        http://layton3ds.over-blog.com/*
// @exclude        http://www.jeuxvideo.com/messages-prives/boite-reception.php
// @exclude        http://*.forumjv.com/*-*-*-*-*-*-*-*.htm#form_post
// @Auteur Layton3DS
// @Remerciements Faly et NORMAN1999
// ==/UserScript==

var chaine=document.body.innerHTML;


var reg=new RegExp("(5122-so)", ":naruto:");
chaine=chaine.replace(reg,"<img border='0' src='http://img690.imageshack.us/img690/7250/masquegif.gif' />");

var reg=new RegExp("(9756.wp)",);
chaine=chaine.replace(reg,"<img border='0' src='http://img838.imageshack.us/img838/52/donpaolopixgif.gif' />");

var reg=new RegExp("(8462,Ã¹a)", "g");
chaine=chaine.replace(reg,"<img border='0' src='' />");

document.body.innerHTML=chaine;