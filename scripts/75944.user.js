// --------------------------------------------------------------------
//
// Smiley Flit
// Version 0.1
// 2010-05-04
// Copyright (c) 2010, [Flit]
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Smiley Flit
// @namespace     http://www.hapoelshack.com/
// @description   Version 0.1 par [iMod] / Script pour ajouter le smiley Flit sur les forums et les cdv de JVC !
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://www.jeuxvideo.com/profil/*.html
// @include       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude       http://www.jeuxvideo.com/smileys/legende.htm
// @contributor   [Flit]

// ==/UserScript==

var smiley=document.body.innerHTML;

var reg=new RegExp(":flit:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://hapoelshack.com/img/maxi/flitlhl.jpg' alt=':flit:' />");

document.body.innerHTML=smiley;
