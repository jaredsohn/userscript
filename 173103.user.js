// ==UserScript==
// @name        Margenes y Centrar Laneros
// @namespace   http://userscripts.org/users/524302
// @author      x-throne
// @description Color de fondo, Reduce el tamaño y centra laneros
// @description BASADO EN: http://userscripts.org/scripts/show/54661 Y http://userscripts.org/scripts/show/83499
// @include     *.laneros.com/*
// @version     1.5
// ==/UserScript==

 function confBackg(){
	var doc=document,getref=['pre','ul','dl','html','div','td','table','body'],
abgd=function(doc,astag){if(doc.defaultView.getComputedStyle(astag,null).backgroundColor=='rgb(234, 247, 253)'){astag.style.backgroundImage='url(http://i.imgur.com/sOUD43p.png)';}};
  for(var i=getref.length,tag;i--;){tag=doc.getElementsByTagName(getref[i]);for(var j=tag.length;j--;){abgd(doc,tag[j]);}}
 }

   document.addEventListener('load',confBackg(),false);


document.body.setAttribute('style', 'width: 1000px; margin: auto;');