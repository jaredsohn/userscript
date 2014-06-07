// ==UserScript==
// @name           Nouveaux smileys jeuxvideo.com part 1
// @namespace      nvsmileysjvcom0044
// @description    Nouveaux smileys pour jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/commentaires/*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:bail:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13081103508825_bail.gif' />");

var reg=new RegExp("(:bof:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/19613299883859_boah.gif' />");

var reg=new RegExp("(:geek:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16417262809530_geek.gif' />");

var reg=new RegExp("(:cute:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10408299505956_cute.gif' />");

var reg=new RegExp("(:hehe:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9855386382798_hehe.gif' />");

var reg=new RegExp("(:zik:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/2985389181225_music.gif' />");

var reg=new RegExp("(:osef:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/751265835903_osef.gif' />");

var reg=new RegExp("(:play:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/19429090546635_play.gif' />");

var reg=new RegExp("(:poker:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/17950122808200_pokerface.gif' />");

var reg=new RegExp("(:tcho:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/1804253376618_tcho.gif' />");

var reg=new RegExp("(:wsh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10818302481558_wsh.gif' />");

var reg=new RegExp("(:ha:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8919070253775_yao.gif' />");

var reg=new RegExp("(:what:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6473707364520_what.gif' />");

var reg=new RegExp("(:pense:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/14755117060728_pense.gif' />");

var reg=new RegExp("(:euh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/160046743725_euh059283.gif' />");

var reg=new RegExp("(:win:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13298574589542_win.gif' />");

var reg=new RegExp("(:tidusman:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/21059967872592_pedobeardrool.jpg' />");

document.body.innerHTML=chaine;