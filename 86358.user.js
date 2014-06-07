// ==UserScript==
// @name           Pokebip script 01
// @namespace      Par Baby-Hint
// @description    Par Baby-Hint
// @include        http://www.pokebip.com/*/affichage*
// @include        http://www.pokebip.com/*/gestion*
// ==/UserScript==//

var chaine=document.body.innerHTML;

var reg=new RegExp("(:wesh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img697.imageshack.us/img697/1851/wesh.png' />");

var reg=new RegExp("(:hapoelia:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/73.gif/' >") ;

var reg=new RegExp("(:hapoel:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/72.gif' >") ;

var reg=new RegExp("(:noel:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://image.jeuxvideo.com/smileys_img/11.gif' >") ;

var reg=new RegExp("(:hap:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://image.jeuxvideo.com/smileys_img/18.gif' >") ;

var reg=new RegExp("(:clown:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://image.jeuxvideo.com/smileys_img/12.gif' >") ;

var reg=new RegExp("(:paf:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.pokebip.com/pokemon/fora/images/smilies/paf.gif' >") ;

var reg=new RegExp("(:mdr:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.pokebip.com/pokemon/fora/images/smilies/huhu.gif' >") ;

var reg=new RegExp("(:coeur:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/54.gif' >") ;

var reg=new RegExp("(:bave:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/71.gif' >") ;

var reg=new RegExp("(:sourire:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/1.gif' >") ;

var reg=new RegExp("(:triste:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/14.gif' >") ;

var reg=new RegExp("(hint)", "g");
chaine=chaine.replace(reg, "(le créateur tout puissant)") ;

document.body.innerHTML=chaine;

var sign = 'Par Baby-Hint'