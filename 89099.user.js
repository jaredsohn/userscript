// ==UserScript==
// @name          Script "anti-charabia Babychinise" !
// @namespace     Script "anti-charabia Babychinise" !
// @description   Script "anti-charabia Babychinise" !
// @include       http://www.jeuxvideo.com/forums/0-10716-0-1-0-*-0-mario-luigi-partners-in-time.htm
// @include       http://www.jeuxvideo.com/profil/Babychinise.html
// @include       http://www.jeuxvideo.com/forums/3-10716-*-*-0-1-0-*.htm
// @include       http://www.jeuxvideo.com/forums/3-10716-*-*-0-1-0-*.htm#form_post
// @include       http://www.jeuxvideo.com/forums/1-10716-*-*-0-1-0-*.htm
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(xD)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://betaforum.kinssha.org/generateurSmileys/smileys/57.gif' />");

var reg=new RegExp("(XD)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://betaforum.kinssha.org/generateurSmileys/smileys/57.gif' />");

var reg=new RegExp("(xd)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://betaforum.kinssha.org/generateurSmileys/smileys/57.gif' />");

var reg=new RegExp("(=D)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://betaforum.kinssha.org/generateurSmileys/smileys/32.gif' />");

var reg=new RegExp("(:D)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://betaforum.kinssha.org/generateurSmileys/smileys/32.gif' />");

var reg=new RegExp("(u_u)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://betaforum.kinssha.org/generateurSmileys/smileys/49.gif' />");

var reg=new RegExp("(è_é)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://betaforum.kinssha.org/generateurSmileys/smileys/29.gif' />");

var reg=new RegExp("(é_è)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://betaforum.kinssha.org/generateurSmileys/smileys/25.gif' />");

document.body.innerHTML=chaine;