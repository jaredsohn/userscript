// ==UserScript==
// @name           MMO Trick Smileys
// @namespace      JVI
// @description    Sa affiche des smileys au lieu que du texte seulement
// @include        http://www.mmo-trick.com/*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp(":rit:", "g");
chaine=chaine.replace(reg,"<img src=http://image.jeuxvideo.com/smileys_img/39.gif>");

var reg=new RegExp(":rire:", "g");
chaine=chaine.replace(reg,"<img src=http://image.jeuxvideo.com/smileys_img/39.gif>");

var reg=new RegExp(":hap:", "g");
chaine=chaine.replace(reg,"<img src=http://image.jeuxvideo.com/smileys_img/18.gif>");

var reg=new RegExp(":noel:", "g");
chaine=chaine.replace(reg,"<img src=http://image.jeuxvideo.com/smileys_img/11.gif>");

var reg=new RegExp(":troll:", "g");
chaine=chaine.replace(reg,"<img src=http://afterthepostrock.com/forum/images/smilies/trollface.png>");

document.body.innerHTML=chaine;