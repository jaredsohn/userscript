// ==UserScript== 
// @name Pack Layton:Barton+Chelmey 
// @namespace smiley laytons 
// @description Pix Barton et Chelmey
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

var reg=new RegExp("(:chelmey:)", "g"); 
chaine=chaine.replace(reg,"<img border='0' src='http://www.professeur-layton.info/destin-perdu/wp-content/personnages/mini-chelmey.png' />");

var reg=new RegExp("(:barton:)", "g"); 
chaine=chaine.replace(reg,"<img border='0' src='http://www.professeur-layton.info/destin-perdu/wp-content/personnages/mini-barton.png' />");

document.body.innerHTML=chaine;