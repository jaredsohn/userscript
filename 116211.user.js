// ==UserScript==
// @name pack de smi
// @namespace C'est un pack de smiley
// @description Pack de smiley
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
// @Auteur ton nom
// @Remerciements layton3ds et MOI
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:naruto:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s3.noelshack.com/uploads/images/14304806986239_naruto7.gif' />");

var reg=new RegExp("()", "g");
chaine=chaine.replace(reg,"<img border='0' src='adresse directe de l'image' />");

document.body.innerHTML=chaine; 