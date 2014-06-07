// ==UserScript==
// @name           DieRSSIframe
// @namespace      whatsthis
// @include        http://www.ftwgl.com/forums/*
// ==/UserScript==


document.body.innerHTML= document.body.innerHTML.replace(/<iframe /g,"<!-- ");
document.body.innerHTML= document.body.innerHTML.replace(/<\/iframe>/g,"--> ");