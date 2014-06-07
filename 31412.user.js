/*<![CDATA[*//*
// ==UserScript==
// @name          zapEmbeds
// @description   zap embeds into page
// @include       *
// @namespace     userscripts.org/users/46776
// ==/UserScript==*/
function zapembs(){
var doc=document,astag=['iframe','object','embed'];
   for(var a=astag.length,embs,n=0,temp=[],tmpr=[];a--;){
	embs=doc.getElementsByTagName(astag[a]);
   for(var m=embs.length,ems;m--;n++){ems=embs[m];temp[n]=ems;tmpr[n]=ems.parentNode;}
   };for(var i=temp.length;i--;){tmpr[i].removeChild(temp[i]);};temp=tmpr=n=null;
}
  document.addEventListener('click',zapembs(),false);

/*]]>*/