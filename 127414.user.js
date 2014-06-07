// ==UserScript==
// @name           Ultime Liste de Smileys part 2 
// @namespace      Ultime Liste de Smileys part 2 
// @description    Nouveaux smileys pour jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/messages-prives/message*
// @include        http://www.jeuxvideo.com/commentaires/*
// @exclude        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:bail:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/fCGMY.gif' />");

var reg=new RegExp("(:bof:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/wBvkV.gif' />");

var reg=new RegExp("(:geek:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/aFikr.gif' />");

var reg=new RegExp("(:hehe:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/PCEf9.gif' />");

var reg=new RegExp("(:zik:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/VYtJ5.gif' />");

var reg=new RegExp("(:osef:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/7iXwy.gif' />");

var reg=new RegExp("(:tcho:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/IQ5E.gif' />");

var reg=new RegExp("(:wsh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/x6boQ.gif' />");

var reg=new RegExp("(:ha:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/eqkQ6.gif' />");

var reg=new RegExp("(:what:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/7jKxh.gif' />");

var reg=new RegExp("(:pense:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/1QCvc.gif' />");

var reg=new RegExp("(:euh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/5QRYD.gif' />");

var reg=new RegExp("(:win:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/XoIfn.gif' />");

var reg=new RegExp("(:loveyou:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.jeuxvideo.com/smileys_img/loveyou.gif' />");

var reg=new RegExp("(:globe:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.jeuxvideo.com/smileys_img/6.gif' />");

var reg=new RegExp("(:mac:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.jeuxvideo.com/smileys_img/16.gif' />");

var reg=new RegExp("(:fish:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.jeuxvideo.com/smileys_img/fish.png' />");

var reg=new RegExp("(:hapervers:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img705.imageshack.us/img705/9180/hapervers.png' />");

var reg=new RegExp("(:wesh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img697.imageshack.us/img697/1851/wesh.png' />");

var reg=new RegExp("(:hapgay:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img710.imageshack.us/img710/6956/hapgay.png' />");

var reg=new RegExp("(:chucknoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img21.imageshack.us/img21/9852/chucknoel.png' />");

var reg=new RegExp("(:sournouhap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img188.imageshack.us/img188/8476/sournouhap.png' />");

var reg=new RegExp("(:hapss:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img18.imageshack.us/img18/1917/hapss.png' />");

var reg=new RegExp("(:hop:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img690.imageshack.us/img690/7466/hop.gif' />");

var reg=new RegExp("(:cisla:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img688.imageshack.us/img688/5572/cisla.gif' />");

var reg=new RegExp("(:noelok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img4.imageshack.us/img4/2346/noelok.gif' />");

var reg=new RegExp("(:hapok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img96.imageshack.us/img96/6019/hapok.gif' />");

var reg=new RegExp("(:noelgg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img28.imageshack.us/img28/7136/noelgg.png' />");

var reg=new RegExp("(:hapgg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img194.imageshack.us/img194/4753/hapgg.gif' />");

var reg=new RegExp("(:hapitler:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img28.imageshack.us/img28/9923/hapitler.gif' />");

var reg=new RegExp("(:autiste:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img143.imageshack.us/img143/9893/autiste.gif' />");

var reg=new RegExp("(:taggle:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img829.imageshack.us/img829/6015/taggle.gif' />");

var reg=new RegExp("(:hapananas:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img197.imageshack.us/img197/5857/hapananas.gif' />");

var reg=new RegExp("(:hapeur:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img256.imageshack.us/img256/3383/hapeur.gif' />");

var reg=new RegExp("(:nigghap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img835.imageshack.us/img835/2304/hapbronz.gif' />");

var reg=new RegExp("(:nyan:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://wiki.teamfortress.com/w/images/c/cf/User_Nyan_Cat.gif' />");

var reg=new RegExp("(:troll:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://r11.imgfast.net/users/1114/10/10/39/smiles/192955.png' />");

var reg=new RegExp("(:dd:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img88.imageshack.us/img88/1967/doigtgauche.png' />");

var reg=new RegExp("(:dg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img543.imageshack.us/img543/4996/doigtdroite.png' />");

var reg=new RegExp("(:zik2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://eclep.free.fr/smiley/musique2.gif' />");

var reg=new RegExp("(:hapoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/old/up/hapoel-bcb64c2a14.jpg' />");

document.body.innerHTML=chaine;