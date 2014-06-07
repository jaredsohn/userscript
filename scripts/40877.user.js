// ==UserScript==
// @name          Pack Jvc Fun de 90 smileys V3 version finale
// @namespace     Pack Jvc Fun de 90 smileys V3 version finale
// @description   Ajout de 90 smileys pour jeuxvvideo.com
// @include       http://www.hordes.fr/#saloon/*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:jerry:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/Jerry001991.gif' />");


var reg=new RegExp("(:fake:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/Fake075938.gif' />");


var reg=new RegExp("(:plus1:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/+1001501.gif' />");


var reg=new RegExp("(:pwned:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/Pwned049886.gif' />");


var reg=new RegExp("(:osef:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/Osef083841.gif' />");


var reg=new RegExp("(:0/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/0-20052211.gif' />");


var reg=new RegExp("(:1/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/1-20045523.gif' />");


var reg=new RegExp("(:2/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/2-20033834.gif' />");


var reg=new RegExp("(:3/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/3-20039261.gif' />");


var reg=new RegExp("(:4/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/4-20037662.gif' />");


var reg=new RegExp("(:5/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/5-20071901.gif' />");


var reg=new RegExp("(:6/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/6-20075824.gif' />");


var reg=new RegExp("(:7/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/7-20097509.gif' />");


var reg=new RegExp("(:8/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/8-20094304.gif' />");


var reg=new RegExp("(:9/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/9-20099541.gif' />");


var reg=new RegExp("(:10/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/10-20023179.gif' />");


var reg=new RegExp("(:bide:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/Bide075936.gif' />");


var reg=new RegExp("(:11/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/11-20008902.gif' />");


var reg=new RegExp("(:12/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/12-20001328.gif' />");


var reg=new RegExp("(:13/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/13-20026435.gif' />");


var reg=new RegExp("(:14/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/14-20035574.gif' />");


var reg=new RegExp("(:15/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/15-20083195.gif' />");


var reg=new RegExp("(:16/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/16-20090024.gif' />");


var reg=new RegExp("(:17/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/17-20015793.gif' />");


var reg=new RegExp("(:18/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/18-20034816.gif' />");


var reg=new RegExp("(:19/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/19-20097621.gif' />");


var reg=new RegExp("(:20/20:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/20-20034716.gif' />");


var reg=new RegExp("(:taggle:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/Taggle003697.gif' />");


var reg=new RegExp("(:btg:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/BTG078774.gif' />");



document.body.innerHTML=chaine;
