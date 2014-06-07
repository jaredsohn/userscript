// ==UserScript==
// @name WWE GAME.
// @namespace Pack de smiley.
// @description Ajoute des smiley.
// @include http://www.jeuxvideo.com/forums/1-*
// @include http://www.jeuxvideo.com/forums/3-*
// @exclude http://www.jeuxvideo.com/commentaires/*
// @include http://www.jeuxvideo.com/messages-prives/*
// @include http://*.forumjv.com/*
// @include http://www.jvflux.com/commentaires/*
// @include http://www.forums.jvflux.com/1-*
// @include http://www.forums.jvflux.com/3-*
// @include http://jvflux.com/commentaires/*
// @include http://forums.jvflux.com/1-*
// @include http://forums.jvflux.com/3-*
// @exclude http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude http://www.jeuxvideo.com/forums/*-*-*-*-*-*-*-*.htm#form_post
// @exclude http://www.jeuxvideo.com/profil/*.html
// @include http://layton3ds.over-blog.com/*
// @exclude http://www.jeuxvideo.com/messages-prives/boite-reception.php
// @exclude http://*.forumjv.com/*-*-*-*-*-*-*-*.htm#form_post
// @NORMAN1999
// @Remerciements Layton 3DS
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:wwe:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img21.imageshack.us/img21/2793/wwep.gif' />");

var reg=new RegExp("(:raw:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img812.imageshack.us/img812/1426/raw.gif' />");

var reg=new RegExp("(:smackdown:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img534.imageshack.us/img534/2781/smackdownn.gif' />");

var reg=new RegExp("(:wwe12:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img841.imageshack.us/img841/2710/23797912.gif' />");

document.body.innerHTML=chaine;
