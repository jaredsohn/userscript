// ==UserScript==
// @name           Mutant jvc
// @namespace      smileys jvc
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==


var chaine=document.body.innerHTML;

var reg=new RegExp("(alakazam bagoon)", "g");
chaine=chaine.replace(reg,"http://www.youtube.com/watch?v=6aRuqozNMmQ");

document.body.innerHTML=chaine;
