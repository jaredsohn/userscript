// ==UserScript==
// @name           Le smiley de la mort + smiley hapoel !
// @namespace      Smileys JVC
// @description    Ajouter le smiley de la mort sur JVC !
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @Auteur         Faly95
// @Remerciements  Forumeurs JVC
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:sdlm:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/old/up/1000905100e001-d2af6b6d34.png' />");

var reg=new RegExp("(:hapoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://http://up.sur-la-toile.com/iRLd' />");

var reg=new RegExp("(:hapdlm:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s4.noelshack.com/upload/11358877968603_hap_de_la_mort.png' />");

document.body.innerHTML=chaine;