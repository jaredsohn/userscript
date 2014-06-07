/*<![CDATA[*//*
// ==UserScript==
// @name          defBackgroundUp
// @description   Replace #FFFFFF in natural backgrounds #F6FFF4 rgb(246, 255, 244) ; #F7FCF5; #F5FCF3; #F9FFF6; rgb(249, 255, 246); #eef8ff ; # Firefox, Chrome, rgb(255, 255, 255); Opera , #ffffff; 
// @include       *
// @namespace     userscripts.org/users/46776
// ==/UserScript==*/
function confBackg(){
	var doc=document,getref=['body','table','td','div','html','dl','ul','pre'],
abg=function(tg){return getComputedStyle(tg,null).backgroundColor=='rgb(255, 255, 255)';};
   for(var a=8,n=0,tag,tg,tmp=[];a--;){
	tag=doc.getElementsByTagName(getref[a]);
   for(var i=tag.length;i--;){tg=tag[i];if(abg(tg)){tmp[n++]=tg.style;}}
   };tmp.forEach(function(s){s.backgroundColor='#f6fff4';});tmp=null;
 }
   document.addEventListener('load',confBackg(),false);

/*]]>*/