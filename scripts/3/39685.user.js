// ==UserScript==
// @name          Pack Jvc Fun smileys
// @namespace     Pack Jvc Fun smileys
// @description   Ajout de smileys
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/forums/3-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:bide:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/bide058524.gif' />");

var reg=new RegExp("(:taggle:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/taggle053712.gif' />");

var reg=new RegExp("(:osef:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/osef047228.gif' />");

var reg=new RegExp("(:rafy:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/rafy084995.gif' />");

var reg=new RegExp("(:fake2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/fake073516.gif' />");

var reg=new RegExp("(:fake:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/fake049788.gif' />");

var reg=new RegExp("(:charte:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/charte081451.gif' />");

var reg=new RegExp("(:btg:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/grotte091925.gif' />");

var reg=new RegExp("(:nowel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/noelempereur089638.gif' />");

var reg=new RegExp("(:oupas:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/oupas077595.gif' />");

var reg=new RegExp("(:taggle2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/TAGGLEtransp.005684.gif' />");

var reg=new RegExp("(:clownoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/clownnoel.gif' />");

var reg=new RegExp("(:coeurnoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/coeurnoel.png' />");

var reg=new RegExp("(:colerenoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/colerenoel.gif' />");

var reg=new RegExp("(:out:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/dehors.gif' />");

var reg=new RegExp("(:dsl:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/desole.gif' />");

var reg=new RegExp("(:founoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/founoel.gif' />");

var reg=new RegExp("(:hors-s:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/hs.gif' />");

var reg=new RegExp("(:humnoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/humnoel.gif' />");

var reg=new RegExp("(:maladenoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/maladenoel.gif' />");

var reg=new RegExp("(:monocle:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/monocle.gif' />");

var reg=new RegExp("(:monocle2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/monocle2099626.gif' />");

var reg=new RegExp("(:nonnonnoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/nonnonnoel.gif' />");

var reg=new RegExp("(:oknoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/oknoel.gif' />");

var reg=new RegExp("(:peurnoel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/peurnoel.gif' />");

var reg=new RegExp("(:rancunier:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/rancunier.gif' />");

var reg=new RegExp("(:sortie:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/sortie.gif' />");

var reg=new RegExp("(:xD:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://antre-jv.com/smileys/AJV/xD.gif' />");

var reg=new RegExp("(:jerry:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/jerry028628.gif' />");

var reg=new RegExp("(:gg:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/gg012478.gif' />");

var reg=new RegExp("(:chuck:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/ChuckNorris058941.gif' />");

document.body.innerHTML=chaine;
