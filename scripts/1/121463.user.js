// ==UserScript==
// @name Smileys JVC :troll:
// @description Script pour mettre le smiley coolface
// @include http://www.jeuxvideo.com/commentaires/*
// @exclude http://www.jeuxvideo.com/forums/0-*
// @include http://www.jeuxvideo.com/forums/1-*
// @include http://www.jeuxvideo.com/forums/3-*
// @exclude http://*.forumjv.com/0-*
// @include http://*.forumjv.com/1-*
// @include http://*.forumjv.com/3-*
// @include http://www.forums.jvflux.com/2-
// @include http://www.forums.jvflux.com/3-
// @include http://www.jeuxvideo.com/profil/*.html
// @exclude http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include http://www.jvflux.com/commentaires/*
// @Auteur Alexcouter
// ==/UserScript==

var smiley=document.body.innerHTML;

var reg=new RegExp(":troll:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://img7.xooimage.com/files/3/0/9/troll-2d07b58.gif' alt=':troll:' />");




document.body.innerHTML=smiley;