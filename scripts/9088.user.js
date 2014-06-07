// ==UserScript==
// @name           remove redirects
// @namespace      http://www.squarefree.com/pornzilla/
// @description    go to the gallery, not an other TGP
// @include        *
// ==/UserScript==


(function() {

   var k,x,t,i,j,p;
   for(k=0;x=document.links[k];k++){
   t=x.href.replace(/[%]3A/ig,':').replace(/[%]2f/ig,'/');
   i=t.lastIndexOf('http');
   if(i>0){
      t=t.substring(i);
      j=t.indexOf('&');
      if(j>0)t=t.substring(0,j);
      p=/https?\:\/\/[^\s]*[^.,;'">\s\)\]]/.exec(unescape(t));
      if(p) x.href=p[0];
   }  
}
})();