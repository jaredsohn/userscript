// ==UserScript==
// @name          Ajout de new smileys sur JeuxVideo.Com v0.2
// @namespace     Ajout de new smileys sur JeuxVideo.Com v0.2
// @description   Ajout de new smileys sur JeuxVideo.Com v0.2
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:soel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/soel044034.png' />");

var reg=new RegExp("(:noel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/11.gif' />");

var reg=new RegExp("(:\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/1.gif' />");

var reg=new RegExp("(:-\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/46.gif' />");

var reg=new RegExp("(:hap:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/18.gif' />");

var reg=new RegExp("(;\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/23.gif' />");

var reg=new RegExp("(:content:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/24.gif' />");

var reg=new RegExp("(:oui:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/37.gif' />");

var reg=new RegExp("(:cool:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/26.gif' />");

var reg=new RegExp("(:rire:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/39.gif' />");

var reg=new RegExp("(:-D)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/40.gif' />");

var reg=new RegExp("(:rire2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/41.gif' />");

var reg=new RegExp("(:o\\)\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/12.gif' />");

var reg=new RegExp("(:ok:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/36.gif' />");

var reg=new RegExp("(:sournois:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/67.gif' />");

var reg=new RegExp("(:snif:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/20.gif' />");

var reg=new RegExp("(:snif2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/13.gif' />");

var reg=new RegExp("(:ouch:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/22.gif' />");

var reg=new RegExp("(:ouch2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/57.gif' />");

var reg=new RegExp("(:p\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/7.gif' />");

var reg=new RegExp("(:\\()", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/45.gif' />");

var reg=new RegExp("(:-\\()", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/14.gif' />");

var reg=new RegExp("(:-\\(\\()", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/15.gif' />");

var reg=new RegExp("(:nonnon:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/25.gif' />");

var reg=new RegExp("(:non2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/33.gif' />");

var reg=new RegExp("(:non:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/35.gif' />");

var reg=new RegExp("(:nah:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/19.gif' />");

var reg=new RegExp("(:hum:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/68.gif' />");

var reg=new RegExp("(:bravo:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/69.gif' />");

var reg=new RegExp("(:gba:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/17.gif' />");

var reg=new RegExp("(:mac:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/16.gif' />");

var reg=new RegExp("(:pacg:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/9.gif' />");

var reg=new RegExp("(:pacd:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/10.gif' />");

var reg=new RegExp("(:-p)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/31.gif' />");

var reg=new RegExp("(:peur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/47.gif' />");

var reg=new RegExp("(:coeur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/54.gif' />");

var reg=new RegExp("(:fou:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/50.gif' />");

var reg=new RegExp("(:fier:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/53.gif' />");

var reg=new RegExp("(:sarcastic:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/43.gif' />");

var reg=new RegExp("(:doute:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/28.gif' />");

var reg=new RegExp("(:malade:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/8.gif' />");

var reg=new RegExp("(:ange:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/60.gif' />");

var reg=new RegExp("(:bave:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/71.gif' />");

var reg=new RegExp("(:g\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/3.gif' />");

var reg=new RegExp("(:d\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/4.gif' />");

var reg=new RegExp("(:cd:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/5.gif' />");

var reg=new RegExp("(:globe:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/6.gif' />");

var reg=new RegExp("(:mort:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/21.gif' />");

var reg=new RegExp("(:sleep:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/27.gif' />");

var reg=new RegExp("(:honte:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/30.gif' />");

var reg=new RegExp("(:monoeil:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/34.gif' />");

var reg=new RegExp("(:rouge:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/55.gif' />");

var reg=new RegExp("(:fete:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/66.gif' />");

var reg=new RegExp("(:diable:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/61.gif' />");

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
chaine=chaine.replace(reg,"<img border='0' src='http://img268.imageshack.us/img268/2168/hopx.png' />");


document.body.innerHTML=chaine;


