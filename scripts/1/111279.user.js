// ==UserScript==
// @name (nom du script)
// @namespace (petit résumé du script)
// @description (description)
// @include http://www.jeuxvideo.com/forums/1-*
// @include http://www.jeuxvideo.com/forums/3-*
// @include http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @Auteur (nom de l'auteur)
// @Remerciements (nom des dédicacés)
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:miifaly:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/upload/10665742189113_faly.png' />");

var reg=new RegExp("(:sisi:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/upload/2501026982289_sisi.jpg/' />");

var reg=new RegExp("(:classicliving:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/upload/5266909926333_miiclassicliving.png/' />");

var reg=new RegExp("(:penta:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/upload/4552699384530_penta.jpg/' />");

var reg=new RegExp("(:ultra:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/upload/7449941651328_ultra.jpg/' />");

var reg=new RegExp("(:20002707portrait:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/upload/17239581739413_20002707portrait.jpg/' />");

var reg=new RegExp("(:20002707:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/upload/1883029808187_20002707.jpg/' />");

var reg=new RegExp("(:miiaymen:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/upload/17076651224094_miiaymen.jpg/' />");

var reg=new RegExp("(:debman:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/upload/16452428502609_debman.jpg/' />");

var reg=new RegExp("(:ange2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://s3.noelshack.com/old/up/12568512143088_leanne_serene-23791be423.png/' />");

document.body.innerHTML=chaine;