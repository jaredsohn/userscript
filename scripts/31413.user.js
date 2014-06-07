/*<![CDATA[*//*
// ==UserScript==
// @name          zapIframes
// @include       *
// @description   zap all iframes
// ==/UserScript==*/
 function zapifr(){
	var doc=document,ifras=doc.getElementsByTagName('iframe'),ln=ifras.length;
  if(ln){for(var m=ln,fr,temp=[],tmpr=[]; m--;){fr=ifras[m];temp[m]=fr;tmpr[m]=fr.parentNode;};for(var i=ln; i--;){tmpr[i].removeChild(temp[i]);};fr=temp=tmpr=null;}
 }
   document.addEventListener('load',zapifr(),false);

/*]]>*/