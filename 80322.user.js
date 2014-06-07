// ==UserScript==
// @name           Ajout de SOEL
// @namespace      SOEL
// @description    SOEL
// @include        http://www.jeuxvideo.com/forums/*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include        http://www.jeuxvideo.com/profil/*
// ==/UserScript==


var chaine=document.body.innerHTML;

var reg=new RegExp("(:soel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s2.noelshack.com/old/up/soel-5c54dfde70.gif' />");

var reg=new RegExp("(:bonnet:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s2.noelshack.com/uploads/images/3518057229093_bonnet.gif' />");

var reg=new RegExp("(:soelok:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s2.noelshack.com/old/up/noelok-741fbdd282.gif' />");

var reg=new RegExp("(:soeur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s2.noelshack.com/old/up/soeur052538-36b0104e21.png' />");

var reg=new RegExp("(:sobave:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s2.noelshack.com/uploads/images/9240564721113_sobave.gif' />");

var reg=new RegExp("(:rafy:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s2.noelshack.com/old/up/rafy-9f033dd348.gif' />");

document.body.innerHTML=chaine;