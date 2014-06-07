// ==UserScript==
// @name           EuroGamer Sign Linker
// @namespace      http://eurogamer.it/*
// @description    Inserisce i link nelle firme
// @include        http://www.eurogamer.it/*
// @author	   demonbl@ck
// ==/UserScript==

//====== Inserisce i link nelle firme

var signe= document.getElementsByClassName('sig');

for(var i=0;i<signe.length;i++){
var element = signe[i];
var aid=element.innerHTML;
aid=aid.replace(/\[link_url]/gi,'<a style="color: #000080; text-decoration: underline ;" href="');
aid=aid.replace(/\[\/link_url]/gi,'" >');
aid=aid.replace(/\[link_desc]/gi,'');
aid=aid.replace(/\[\/link_desc]/gi,'</a>');
element.innerHTML=aid;}