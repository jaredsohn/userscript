/*<![CDATA[*//*
// ==UserScript==
// @name          defBackgroundUps
// @description   Replace #FFFFFF backgrounds #F7FCF5 - #F5FCF3 - #F9FFF6 ; rgb(249, 255, 246) backgrounds 
// @include       *
// @namespace     userscripts.org/users/46776
// ==/UserScript==
*/
 function confBackg(){
	var doc=document,getref=['pre','ul','dl','html','div','td','table','body'],
abgd=function(doc,astag){if(doc.defaultView.getComputedStyle(astag,null).backgroundColor=='rgb(255, 255, 255)'){astag.style.backgroundColor='#f6fff4';}};
  for(var i=getref.length,tag;i--;){tag=doc.getElementsByTagName(getref[i]);for(var j=tag.length;j--;){abgd(doc,tag[j]);}}
 }

   document.addEventListener('load',confBackg(),false);
/*]]>*/