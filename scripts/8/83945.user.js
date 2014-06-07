// ==UserScript==
// @name           Smiley rhap pour JV.C v2.0
// @namespace      Smiley rhap pour JV.C v2.0
// @description    Smiley rhap pour JV.C v2.0
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/commentaires/*
// @exclude        http://www.jeuxvideo.com/forums/0-*
// @exclude        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:rhap:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/rhapkfk.gif' />");

var reg=new RegExp("(:rhapbleu:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/rhapbleu.gif' />");

var reg=new RegExp("(:rhapfume:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/rhapfume.gif' />");

var reg=new RegExp("(:rhapgay:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/rhapgay.gif' />");

var reg=new RegExp("(:rhapgris:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/rhapgris.gif' />");

var reg=new RegExp("(:rhapenergy:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/rhapmonste.gif' />");

var reg=new RegExp("(:rhapnoir:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://hapshack.com/images/rhapnoir.gif' />");

document.body.innerHTML=chaine;