// ==UserScript==
// @name Pseudos
// @namespace Pour des pseudos
// @description -vide-
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
// @Auteur Loch_
// @Remerciements Layton3DS Dban[JV]
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(Loch_)", "g");
chaine=chaine.replace(reg,"<img border='0' src='file:///Users/loic/Desktop/cooltext579538484.png' />");

var reg=new RegExp("(Layton3DS)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.jeuxvideo.com/avatars/view_avatar.htm?p=Layton3DS&url=http://image.jeuxvideo.com/avatars/l/Layton3DS-1315913018-b.jpg' />");

document.body.innerHTML=chaine; 