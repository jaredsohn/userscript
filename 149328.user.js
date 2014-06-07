// ==UserScript==
// @name           Toast...
// @namespace      Shalenity
// @description    Compilation Smileys jeuxvideo.com
// @include        http://www.shalenity.com/forum-1.html*
// @include        http://www.shalenity.com/topic*
// @include        http://www.shalenity.com/news.htm*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:ahap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337610940-ahap.png' />");

var reg=new RegExp("(:tboll:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/tboll.gif' />");

var reg=new RegExp("(:death:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/death.gif' />");

var reg=new RegExp("(:dolan:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/Dolan.gif' />");

var reg=new RegExp("(:fp:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/facepalm.gif' />");

var reg=new RegExp("(:fdbb:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/302.gif' />");

var reg=new RegExp("(:wtf:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/wtf.gif' />");

var reg=new RegExp("(:tbollok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/tbollok.gif' />");

var reg=new RegExp("(:flip:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://i2.kym-cdn.com/profiles/icons/big/000/110/902/Flipping%20Tables.jpg' />");

var reg=new RegExp("(:nhap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/02bd1a70e47c16ebd3cd21c2eb40f91b.png' />");

var reg=new RegExp("(:nhop:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/ce95ab3aa3356d5a821ef79741784ab7.png' />");

var reg=new RegExp("(:nhip:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/6d190256b33472aba97e51fd1651cadd.png' />");

var reg=new RegExp("(:hjap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/48a6f5c9710b5853fdf8dce657e5e4d4.png' />");

var reg=new RegExp("(:npok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/832734c4146fbe42bd5f7f9ccfb2ee90.png' />");

var reg=new RegExp("(:nhapc:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/887e3d46949c8669f834f69260792b7c.png' />");

var reg=new RegExp("(:feel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/764a2cc2cdf5d7ce930a8152d659d462.png' />");

var reg=new RegExp("(:wi:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/65b2950ba15300cb65b3843d056c250d.png' />");

var reg=new RegExp("(:japfuck:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/cfc0840d41901718f9ad7e06e8e329ee.gif' />");

document.body.innerHTML=chaine;
