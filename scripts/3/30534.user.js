// ==UserScript==
// @name                   HTML in ORKUT forum`s
// @namespace              HTML in ORKUT forum`s
// @description            Enable HTML even in forum's

ORKUT forums
// @include                http://www.orkut.com/*
// @author                 Shrenik
// ==/UserScript==


doc=document.body.innerHTML ;
doc=doc.replace(/\&lt\;/g,'<');
doc=doc.replace(/\&gt\;/g,'>');
document.body.innerHTML = doc ;