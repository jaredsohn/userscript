// ==UserScript==
// @name           MultiScript 0.1
// @namespace      Par Baby-Hint
// @description    Un max de nouveauté pour tout vos sites favoris !
// @include        http://jeuxvideo.com/*
// @include        http://textup.fr/*
// @include        http://*.forumjv.com/*
// @include        http://the-fun-forum.forumactif*
// @include        http://www.hordes.fr/*
// @include        http://*.canalblog.com/*
// @include        http://*.miniville.fr/
// @include        http://tweet.jvflux.com/*
// @include        http://www.forums.jvflux.com/*
// @include        http://www.transformice.com/*
// @include        http://www.facebook.com/*
// @include        http://twitter.com/*
// @include        http://www.pokebip.com/*
// @exclude        http://www.pokemontrash.com/*
// @exclude        http://www.pokemon-france.com/*

// ==/UserScript==


var chaine=document.body.innerHTML;

var reg=new RegExp("(:wesh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img697.imageshack.us/img697/1851/wesh.png' />");

var reg=new RegExp("(:hapoelia:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/73.gif/' >") ;

var reg=new RegExp("(:hapoel:)", "g");
chaine=chaine.replace(reg, "<img border='0' src='http://www.jvflux.com/design/img/smileys/72.gif' >") ;

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