// --------------------------------------------------------------------
//
// Smiley Saxoboy// Version 1
//  Copyright (c) 2010, MoggyAspiShow
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Smiley Hapoel
// @namespace     http://www.hapoelshack.com/
// @description   Version 0.3 par [Hapoel] / Script pour ajouter les smiley saxoboy sur les forums et les cdv de jeuxvideo.com
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://www.jeuxvideo.com/profil/*.html
// @include       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude       http://www.jeuxvideo.com/smileys/legende.htm
// @contributor   [Hapoel]

// ==/UserScript==

var smiley=document.body.innerHTML;

var reg=new RegExp(":saxoboy:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://s2.noelshack.com/uploads/images/7355301956244_sans_titre_2.jpg' alt=':hapoel:' />");

var reg=new RegExp(":hapoel-ok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://www.hapoelshack.com/img/pack/hapoel-ok.gif' alt=':hapoel-ok:' />");

var reg=new RegExp(":hapoel-question:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://www.hapoelshack.com/img/pack/hapoel-question.gif' alt=':hapoel-question:' />");

var reg=new RegExp(":hapoel-coeur:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://www.hapoelshack.com/img/pack/hapoel-coeur.gif' alt=':hapoel-coeur:' />");

var reg=new RegExp(":hapoel-ange:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://www.hapoelshack.com/img/pack/hapoel-ange.gif' alt=':hapoel-ange:' />");

var reg=new RegExp(":hapoel-diable:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://www.hapoelshack.com/img/pack/hapoel-diable.gif' alt=':hapoel-diable:' />");

document.body.innerHTML=smiley;
