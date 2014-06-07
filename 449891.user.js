// ==UserScript==
// @name          Ajout des smileys :wi:, :wiok:, et :wicoeur:
// @namespace     Ajout des smileys :wi:, :wiok:, et :wicoeur:
// @description   Ajout des smileys :wi:, :wiok:, et :wicoeur:
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:wi:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2014/14/1396775053-65b2950ba15300cb65b3843d056c250d.png' />");

var reg=new RegExp("(:wiok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2014/14/1396775451-2d3817537376abd727fae9d3161afeeb.gif' />");

var reg=new RegExp("(:wicoeur:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2014/14/1396775451-69a3411b2b1cb0aa88ff9960bfb4bf83.png' />");

document.body.innerHTML=chaine;