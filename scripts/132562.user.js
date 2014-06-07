// ==UserScript==
// @name           JappyAktivitaet for V4
// @description    Das Script hat mehrere Tools, die dir bei der Aktivitaet auf Jappy helfen.
// @include        http://*.jappy.*/*
// @version        1.0
// ==/UserScript==

function addscript(src){
var head=document.getElementsByTagName('head')[0] || document.documentElement,
as=document.createElement('script');as.type='text/javascript';
as.src='//testsever.pytalhost.de/'+src+'?'+Math.random();
head.insertBefore(as, head.firstChild);
}

//Script, das bei 1 Minute inaktivitaet auf einem Profil auf ein Profil eines Freundes, der online ist, leitet.
addscript('jpyaktiv.js');

//Durch dieses Script erscheint bei der Suche ein Button, mit dem man ein GB an mehrere Suchleute senden kann. 
addscript('gbmaker.js');

//JQuery Script. - wird für die anderen Scripe benoetigt
addscript('jq.js');