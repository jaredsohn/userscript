// ==UserScript==
// @name          Ajout du smiley base pour • New Tournoi des Personnages • !
// @namespace     Ajout du smiley base pour • New Tournoi des Personnages • !
// @description   Ajout du smiley base pour • New Tournoi des Personnages • !
// @include       http://www.jeuxvideo.com/forums/1-10716-118010-*
// @include       http://www.jeuxvideo.com/forums/3-10716-118010-*

// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:base:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/hssanspann.gif' />");

document.body.innerHTML=chaine;