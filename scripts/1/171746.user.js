// ==UserScript==
// @name          Anti-Blablas
// @include        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(~~ Nic-Nac et Chocopoppies ~~)", "g");
chaine=chaine.replace(reg," ");


document.body.innerHTML=chaine;