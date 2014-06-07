/*<![CDATA[*//*
// ==UserScript==
// @name          zapIframesProp
// @include       *
// @description   zap all iframes Properties
// ==/UserScript==*/
function zapifrprp(){
	var doc=document,ifra=doc.getElementsByTagName('iframe'),ln=ifra.length;
  if(ln){
   for(var j=ln,fr,temp=[],tmpr=[],frattr=[];j--;){
	fr=ifra[j];temp[j]=fr;tmpr[j]=fr.parentNode;
   for(var at=fr.attributes,a=at.length,frr=frattr[j]=[];a--;){frr[a]=at[a].name;}
   }
   for(var d=ln;d--;){
   for(var as=frattr[d],m=as.length,tm=temp[d];m--;){tm.setAttribute(as[m],'');}
   };frattr=null;
   for(var q=ln;q--;){tmpr[q].removeChild(temp[q]);};temp=tmpr=null;
  }
}
   document.addEventListener('load',zapifrprp(),false);

/*]]>*/