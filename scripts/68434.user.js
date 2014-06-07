// ==UserScript==
// @name           webturkalo
// @include        http://webturkalo.uw.hu/*
// ==/UserScript==

var tds=document.getElementsByTagName('td');
for(i=0;i<tds.length;i++){
  if(tds[i].getAttribute('class')=='rendezett'){
    if(tds[i].childNodes[0].tagName=='IMG'){
      if(tds[i].childNodes[0].src.indexOf('foglalt.gif')>-1){
        tds[i].parentNode.parentNode.style.display='none';
      }
    }
  }
}
