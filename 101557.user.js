// ==UserScript==
// @name Smileys de AT et NT sur Jeuxvideo.com
// @namespace http://userscripts.org/scripts/show/86568
// @homepage http://userscripts.org/scripts/show/86568
// @description Script pour mettre les smileys de AT et NT sur JVC, ForumJV et JVFlux [Version 0.2]
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
// @Auteur Energize 
// @Remerciements  Merci a JellyTime pour la correction des bugs :coeur:
// ==/UserScript==

var smiley=document.body.innerHTML;

var reg=new RegExp(":kew:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://www.noelshack.com/1/1/45-907b9cca71.gif' alt=':kew:' />");




document.body.innerHTML=smiley;