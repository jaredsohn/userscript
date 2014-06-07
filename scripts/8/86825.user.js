// ==UserScript==
// @name          Ajout de new smileys sur les sites JVC v0.1
// @namespace     Ajout de new smileys sur les sites JVC v0.1
// @description   Ajout de new smileys sur les sites JVC v0.1
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:wesh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img697.imageshack.us/img697/1851/wesh.png' />");

var reg=new RegExp("(:hapoelia:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.hapoeliashack.com/img/pack/smiley-hapoelia.gif' >") ;

var reg=new RegExp("(:hapoel:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.hapoeliashack.com/img/pack/smiley-hapoel.gif' >") ;

var reg=new RegExp("(:noel:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://tweet.jvflux.com/i/icons/11.gif' >") ;

var reg=new RegExp("(:hap:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://tweet.jvflux.com/i/icons/18.gif' >") ;

var reg=new RegExp("(:clown:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://tweet.jvflux.com/i/icons/12.gif' >") ;

var reg=new RegExp("(:paf:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.pokebip.com/pokemon/fora/images/smilies/paf.gif' >") ;

var reg=new RegExp("(:mdr:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.pokebip.com/pokemon/fora/images/smilies/huhu.gif' >") ;

var reg=new RegExp("(:coeur:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/54.gif' >") ;

var reg=new RegExp("(:bave:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/71.gif' >") ;

var reg=new RegExp("(=})", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/1.gif' >") ;

var reg=new RegExp("(={)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/14.gif' >") ;

document.body.innerHTML=chaine;