// ==UserScript==
// @name           La Guia TV programs first
// @namespace      http://www.latinsud.com
// @include        http://www.laguiatv.com/*
// @include        http://laguiatv.com/*
// @match          http://www.laguiatv.com/*
// @match          http://laguiatv.com/*
// @version        1.0
// ==/UserScript==

var prgs=document.body.getElementsByClassName('programacion');

if (prgs.length>0) {
   prg=prgs[0];
   document.body.insertBefore(prg, document.body.firstChild);
}
 

