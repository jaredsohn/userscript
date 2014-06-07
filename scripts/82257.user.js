// ==UserScript==
// @name           Hapoels By Dragonche 2
// @namespace      Hapoels By Dragonche 2
// @description    Smileys Hapoel by Dragonche
// @include        http://www.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/commentaires/*
// @exclude        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:hapoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img143.imageshack.us/img143/9521/smileyhapoel.gif' />");

var reg=new RegExp("(:hapoelia:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img412.imageshack.us/img412/791/hapoelia.gif' />");

var reg=new RegExp("(:hapoel-ok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img706.imageshack.us/img706/812/hapoelok.gif' />");

var reg=new RegExp("(:hapoelia-ok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img710.imageshack.us/img710/5983/hapoeliaok.gif' />");

var reg=new RegExp("(:hapoel-question:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img13.imageshack.us/img13/2434/hapoelquestion.gif' />");

var reg=new RegExp("(:hapoelia-question:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img706.imageshack.us/img706/3269/hapoeliaquestion.gif' />");

var reg=new RegExp("(:hapoel-coeur:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img294.imageshack.us/img294/7660/hapoelcoeur.gif' />");

var reg=new RegExp("(:hapoelia-coeur:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img715.imageshack.us/img715/199/hapoeliacoeur.gif' />");

var reg=new RegExp("(:hapoel-ange:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img219.imageshack.us/img219/7904/hapoelange.gif' />");

var reg=new RegExp("(:hapoelia-ange:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img526.imageshack.us/img526/4406/hapoeliaange.gif' />");

var reg=new RegExp("(:hapoel-diable:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img534.imageshack.us/img534/6113/hapoeldiable.gif' />");

var reg=new RegExp("(:hapoelia-diable:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img441.imageshack.us/img441/670/hapoeliadiable.gif' />");

var reg=new RegExp("(:hapoel-bave:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img341.imageshack.us/img341/3365/hapoelbave.gif' />");

var reg=new RegExp("(:hapoelia-bave:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img257.imageshack.us/img257/3869/hapoeliabave.gif' />");

var reg=new RegExp("(:hapoel-up:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img594.imageshack.us/img594/186/hapoelup.gif' />");

var reg=new RegExp("(:hapoelia-up:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img15.imageshack.us/img15/4725/hapoeliaup.gif' />");

var reg=new RegExp("(:hapolink:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img10.imageshack.us/img10/7937/hapolink.gif' />");

var reg=new RegExp("(:hapolink-up:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img192.imageshack.us/img192/665/hapolinkup.gif' />");

var reg=new RegExp("(:hapolink-ok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img801.imageshack.us/img801/4021/hapolinkok.gif' />");

var reg=new RegExp("(:hapolink-diable:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img51.imageshack.us/img51/2107/hapolinkdiable.gif' />");

var reg=new RegExp("(:hapolink-ange:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img824.imageshack.us/img824/5499/hapolinkange.gif' />");

var reg=new RegExp("(:hapolink-coeur:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img191.imageshack.us/img191/2105/hapolinkcoeur.gif' />");

document.body.innerHTML=chaine;


