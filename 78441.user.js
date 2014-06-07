// ==UserScript==
// @name           Smiley Poisson
// @namespace      http://www.fish.com/
// @description    Version 0.1 par ElfeDeJvc / Script ajoutant le smiley Poisson sur les forums et les cdv de jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://www.jeuxvideo.com/profil/*.html
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude        http://www.jeuxvideo.com/smileys/legende.htm
// ==/UserScript==

var smiley=document.body.innerHTML;

var reg=new RegExp(":fish:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://image.jeuxvideo.com/smileys_img/fish.png' alt=':fish:' />");

document.body.innerHTML=smiley;
