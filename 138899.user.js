// ==UserScript==
// @name Smiley Pensif
// @namespace Pour afficher le smiley :pensif:
// @description Ce script ne marche que sur le forum NoelShack de Jeuxvideo.com !
// @include http://www.jeuxvideo.com/forums/1-1000042-*
// @include http://www.jeuxvideo.com/forums/3-1000042-*
// @include http://www.jeuxvideo.com/jvchat*
// @include http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @Auteur Penta_Pingouin
// @Remerciements ]John_Krammer[, Merourou, Azano, []Donoyo[], Hi-Rez, Hemdal
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:pensif:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/12/1332151218-pense2.gif' />");

document.body.innerHTML=chaine;