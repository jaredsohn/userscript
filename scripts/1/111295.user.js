// ==UserScript==
// @name Pack de Smileys Professeur Layton
// @namespace Pour mettre de nouveaux smileys sur jeuxvidéo.com
// @description Ce script est un pack de smileys Professeur Layton pour jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://www.jeuxvideo.com/commentaires/*.htm#commentaires
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
// @include        http://www.jeuxvideo.com/profil/*.html
// @include        http://layton3ds.over-blog.com/*
// @exclude        http://www.jeuxvideo.com/messages-prives/boite-reception.php
// @exclude        http://*.forumjv.com/*-*-*-*-*-*-*-*.htm#form_post
// @include        http://www.jeuxvideo.com/profil/*.html
// @exclude        http://*.forumjv.com/cgi-bin/jvforums/forums.cgi
// @exclude        http://www.jeuxvideo.com/messages-prives/message.php#w
// @exclude        http://www.jeuxvideo.com/messages-prives/mp_previsu.php
// @exclude        http://ann.over-blog.com/blog-newsletter.php?ref=3235458
// @include        http://liveforums.craym.eu/*
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
chaine=chaine.replace(reg,"<img border='0' src='http://img62.imageshack.us/img62/8831/lukepixgif.gif' />");

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
chaine=chaine.replace(reg,"<img border='0' src='http://img855.imageshack.us/img855/4973/florahapgif.gif' />");

var reg=new RegExp("(batistriple)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img651.imageshack.us/img651/5843/rdsl5br9modifi1.gif' />");

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
chaine=chaine.replace(reg,"<img border='0' src='http://img11.imageshack.us/img11/7846/sitesofficielsgif.gif' />");

var reg=new RegExp("(9756.wp)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img69.imageshack.us/img69/5070/wikipdiagif.gif' />");

var reg=new RegExp("(8462,ùa)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img52.imageshack.us/img52/162/oachetergif.gif' />");

var reg=new RegExp("(:bartonpix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img705.imageshack.us/img705/13/bartonpixgif.gif' />");

var reg=new RegExp("(:descolepix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img832.imageshack.us/img832/4272/descolepixgif.gif' />");

var reg=new RegExp("(:mamiemysterepix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img337.imageshack.us/img337/5015/mamiemysterepixpix.gif' />");

var reg=new RegExp("(:chelmeypix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img708.imageshack.us/img708/6302/chelmeypixgif.gif' />");

var reg=new RegExp("(:florapix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img805.imageshack.us/img805/2894/florapixgif.gif' />");

var reg=new RegExp("(:stachenpix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img215.imageshack.us/img215/4552/stachenpixgif.gif' />");

var reg=new RegExp("(:mimimysterepix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img696.imageshack.us/img696/6739/mimimysterepixgif.gif' />");

var reg=new RegExp("(:claudiapix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img407.imageshack.us/img407/9633/claudiapixgif.gif' />");

var reg=new RegExp("(:vladimirpix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img407.imageshack.us/img407/911/vladimirpixgif.gif' />");

var reg=new RegExp("(:pavelpix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img88.imageshack.us/img88/6319/pavelpixgif.gif' />");

var reg=new RegExp("(:janicepix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img511.imageshack.us/img511/6130/janicepixgif.gif' />");

var reg=new RegExp("(:melinapix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img685.imageshack.us/img685/7659/melinapixgif.gif' />");

var reg=new RegExp("(:oswaldpix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img13.imageshack.us/img13/285/oswaldpixgif.gif' />");


var reg=new RegExp("(:schraderpix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img84.imageshack.us/img84/3963/schradergif.gif' />");

var reg=new RegExp("(:bave:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.jeuxvideo.com/smileys_img/71.gif' />");

var reg=new RegExp("(:ariannapix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img97.imageshack.us/img97/8904/ariannapixgif.gif' />");

document.body.innerHTML=chaine;