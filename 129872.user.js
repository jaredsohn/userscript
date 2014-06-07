// Par Penta_Pingouin
//
// C'est un script GreaseMonkey
// http://greasemonkey.mozdev.org/ and http://mozilla.org
//
// ==UserScript==
// @name        Description+
// @namespace   http://vga.fr.nf/dev/description+/
// @description Permet de faire une description plus longue que 300 caracteres sur jeuxvideo.com
// @include     http://www.jeuxvideo.com/profil/*
// @author      Penta_Pingouin
// @date        01/04/12
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg = /\[description\+ [0-9]\]/;
chaine=chaine.replace(reg,"<iframe frameborder=\"0\" src=\"http://vga.fr.nf/dev/description+/1.txt\"  style=\"margin:0px;border:none;overflow:hidden;\" scrolling=\"auto\" width=\"300\" height=\"auto\" name=\"Description+\" ></iframe>");

document.body.innerHTML=chaine;