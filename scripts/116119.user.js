// ==UserScript==
// @name Pack de Smileys Professeur Layton
// @namespace Pour mettre de nouveaux smileys sur jeuxvidÃ©o.com
// @description Ce script est un pack de smileys Professeur Layton pour jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @exclude        http://www.jeuxvideo.com/commentaires/*
// @include        http://www.jeuxvideo.com/messages-prives/*
// @include        http://*.forumjv.com/*
// @include        http://www.jvflux.com/commentaires/*
// @include        http://www.forums.jvflux.com/1-*
// @include        http://www.forums.jvflux.com/3-*
// @include        http://jvflux.com/commentaires/*
// @include        http://forums.jvflux.com/1-*
// @include        http://forums.jvflux.com/3-*
// @exclude        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude        http://www.jeuxvideo.com/forums/*-*-*-*-*-*-*-*.htm#form_post
// @exclude        http://www.jeuxvideo.com/profil/*.html
// @include        http://layton3ds.over-blog.com/*
// @exclude        http://www.jeuxvideo.com/messages-prives/boite-reception.php
// @exclude        http://*.forumjv.com/*-*-*-*-*-*-*-*.htm#form_post
// @Auteur Layton3DS
// @Remerciements Faly et NORMAN1999
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(Dban[JV])", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img263.imageshack.us/img263/1667/layton3dsgif.gif' />");

var reg=new RegExp("(:laytonnoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img26.imageshack.us/img26/2608/laytonnoelgif.gif' />");

var reg=new RegExp("(:hapluke:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img856.imageshack.us/img856/2854/haplukegif.gif' />");

var reg=new RegExp("(:laytonpix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img171.imageshack.us/img171/853/laytonpixgif.gif' />");

var reg=new RegExp("(:lukepix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img822.imageshack.us/img822/8831/lukepixgif.gif' />");

var reg=new RegExp("(:L:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img35.imageshack.us/img35/4566/lgif.gif' />");

var reg=new RegExp("(:soluce:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img846.imageshack.us/img846/3682/solucegif.gif' />");

var reg=new RegExp("(:emmypix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img155.imageshack.us/img155/2815/emmypixgif.gif' />");

var reg=new RegExp("(:boite:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img835.imageshack.us/img835/7452/boite12345modifi1.gif' />");

var reg=new RegExp("(:montre:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img5.imageshack.us/img5/7429/montregif.gif' />");

var reg=new RegExp("(:pomme:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img716.imageshack.us/img716/5363/pommegif.gif' />");

var reg=new RegExp("(:spectre:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img263.imageshack.us/img263/5570/spectregif.gif' />");

var reg=new RegExp("(:musique:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img101.imageshack.us/img101/2222/musiquegif.gif' />");

var reg=new RegExp("(:masque:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img690.imageshack.us/img690/7250/masquegif.gif' />");

var reg=new RegExp("(:florahap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img5.imageshack.us/img5/4973/florahapgif.gif' />");

var reg=new RegExp("(NORMAN1999)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img831.imageshack.us/img831/6651/norman1999gif.gif' />");

var reg=new RegExp("(403 Forbidden This file removed due to violation of ImageShack Terms of Service or by user request.)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img7.imageshack.us/img7/283/batistriplegif.gif' />");

var reg=new RegExp("(ShodaiRaikage)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img810.imageshack.us/img810/7802/jeuf.png' />");

var reg=new RegExp("(:donpaolopix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img838.imageshack.us/img838/52/donpaolopixgif.gif' />");

var reg=new RegExp("(:clivepix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img845.imageshack.us/img845/2724/clivepixgif.gif' />");

var reg=new RegExp("(:clairepix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img844.imageshack.us/img844/5172/clairepixgif.gif' />");

var reg=new RegExp("(5545a/n)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img221.imageshack.us/img221/3359/accueilnewsgif.gif' />");

var reg=new RegExp("(9466.sl)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img696.imageshack.us/img696/7671/solutionsgif.gif' />");

var reg=new RegExp("(5556/sr)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img854.imageshack.us/img854/8328/sriegif.gif' />");

var reg=new RegExp("(5122-so)", "g");
chaine=chaine.replace(reg,"<img border='0' src='' />");

var reg=new RegExp("(9756.wp)", "g");
chaine=chaine.replace(reg,"<img border='0' src='' />");

var reg=new RegExp("(8462,Ã¹a)", "g");
chaine=chaine.replace(reg,"<img border='0' src='' />");

document.body.innerHTML=chaine;