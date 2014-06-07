/*<![CDATA[*//*
// ==UserScript==
// @name          defBackgroundUp
// @description   Replace #FFFFFF backgrounds #F7FCF5 - #F5FCF3 - #F9FFF6 ; rgb(249, 255, 246); #eef8ff ; # Firefox, Chrome, rgb(255, 255, 255); Opera , #ffffff; 
// @include       *
// @namespace     userscripts.org/users/46776
// ==/UserScript==*/
 function confBackg(){
 var win=window,doc=document,getref=['body','table','td','div','html','dl','ul','pre'],
abg=function(win,tg){return win.getComputedStyle(tg,null).backgroundColor=='rgb(255, 255, 255)';},def=function(tg){tg.style.backgroundColor='#cce8cf';};
   for(var a=8,n=0,tag,tg,temp=[];a--;){
	tag=doc.getElementsByTagName(getref[a]);
   for(var i=tag.length;i--;){tg=tag[i];if(abg(win,tg)){temp[n++]=tg;}}
   };for(var j=temp.length;j--;){def(temp[j]);};temp=n=null;
 }
   document.addEventListener('load',confBackg(),false);

/*]]>*/