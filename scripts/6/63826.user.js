// ==UserScript==
// @name                  Enable HTML even in Non HTML based Communities by Dheeraj shah
// @namespace              HTML in ORKUT forum`s
// @description            Enable HTML even in Non HTML based Communities
// @include                http://www.orkut.*/*
// @author                 Dheeraj shah
// ==/UserScript==


doc=document.body.innerHTML ;
doc=doc.replace(/\&lt\;/g,'<');
doc=doc.replace(/\&gt\;/g,'>');
document.body.innerHTML = doc ;