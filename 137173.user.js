// ==UserScript==
// @name          Pack de 8 smileys JVC !
// @namespace     Pack de 8 smileys JVC !
// @description   Un pack de 8 smiley pour vous!:hap:
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(XD)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333021602-xd-811ee06c11.gif' />");

var reg=new RegExp("(:pfosef:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333021869-osef-1f1eabbb22.gif' />");

var reg=new RegExp("(onche)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333021927-onche-626d71036.gif' />");

var reg=new RegExp("(=()", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333021893--cd6ae84f68.gif' />");

var reg=new RegExp("(:noelbad:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333227560-Noelbad.gif' />");

var reg=new RegExp("(:luigi:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333227959-mario.gif' />");

var reg=new RegExp("(:ggold:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333228514-ggold.gif' />");

var reg=new RegExp("(:dgold:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2012/13/1333228474-dgold.gif' />");

var reg=new RegExp("(:noel-owned:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img10.xooimage.com/files//b/2/9/owned-1a98f9e.gif' />");

var reg=new RegExp("(:Megabide:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img6.xooimage.com/files//d/e/c/gif-noel-aef74c.gif' />");

var reg=new RegExp("(:noel-jerry:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img5.xooimage.com/files//1/1/2/jerry-9a62cd.gif' />");

var reg=new RegExp("(:noelcape:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img8.xooimage.com/files//5/f/1/noelcapebienfini036056-baee2c.gif' />");

var reg=new RegExp("(:noel-clin:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img10.xooimage.com/files//1/4/d/noelclindoeil-18efd85.gif' />");


var reg=new RegExp("(:noel-avance:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img7.xooimage.com/files//a/f/5/noelhaplk9-2e6b70.gif' />");

var reg=new RegExp("(:noel-cochon:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img6.xooimage.com/files//7/4/d/pignoel-c8192b.gif' />");

var reg=new RegExp("(:hap-coeurs:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img8.xooimage.com/files//1/c/9/hapcoeur-19fcf32.gif' />");

var reg=new RegExp("(:noelnoir-arme:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img8.xooimage.com/files//6/2/1/nowelrage-1a271b7.gif' />");

var reg=new RegExp("(:noelnoir:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img8.xooimage.com/files//2/6/7/nowel-1a271d4.gif' />");

var reg=new RegExp("(:noel-oiseau:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img4.xooimage.com/files//f/6/f/nm-19fceb7.gif' />");

var reg=new RegExp("(:noel-arme:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img10.xooimage.com/files//d/a/4/noelrage-19fcea9.gif' />");

var reg=new RegExp("(:noel-blue:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img6.xooimage.com/files//e/f/9/noelb-1a27283.gif' />");

var reg=new RegExp("(:noel-coeur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img6.xooimage.com/files//1/9/5/noelcoeur-1a27376.gif' />");

var reg=new RegExp("(:noelelite-bave:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img8.xooimage.com/files//e/c/6/bave1-1ba142.gif' />");

var reg=new RegExp("(:noel-regarde:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img10.xooimage.com/files//3/5/0/bike-1a98daf.gif' />");

var reg=new RegExp("(:noel-cake:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img10.xooimage.com/files//e/a/6/cake-19fcf4e.gif' />");

var reg=new RegExp("(:censored:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img10.xooimage.com/files//a/5/8/e020-931b8.gif' />");

var reg=new RegExp("(:hap-snifcoeur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img6.xooimage.com/files//8/9/5/coeurhum-1a98dd0.gif' />");

var reg=new RegExp("(:hap-coeur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img4.xooimage.com/files//2/b/f/hapcoeur-1a98e87.gif' />");

var reg=new RegExp("(:hap-euh:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img6.xooimage.com/files//1/a/4/haphum-1a98ebe.gif' />");

var reg=new RegExp("(:hap-link:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img10.xooimage.com/files//b/7/9/haplink-1a98ed0.gif' />");

var reg=new RegExp("(:hap-wsh:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img6.xooimage.com/files//0/e/7/jap2-19fcf10.gif' />");

var reg=new RegExp("(:noel-ange:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img2.xooimage.com/files//b/4/b/noelange-1a98f8e.gif' />");

