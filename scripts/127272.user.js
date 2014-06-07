// ==UserScript==
// @name           Nouvehaux smileys jeuxvideo.com part 1
// @namespace      nvsmileysjvcom0044
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

var reg=new RegExp("(:hapoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/old/up/hapoel-bcb64c2a14.jpg' />");

var reg=new RegExp("(:ninja:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://sebsauvage.net/images/smiley_ninja.gif' />");

var reg=new RegExp("(:hapoelparty:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.jeuxvideo.com/smileys_img/hapoelparty.gif' />");

var reg=new RegExp("(:fish)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.jeuxvideo.com/smileys_img/fish.gif' />");


document.body.innerHTML=chaine;