// ==UserScript==
// @name           XKCD Alt Text Displayer
// @include        http://xkcd.com/*
// ==/UserScript==

is=document.getElementsByTagName('img');
for(i=0;i<is.length;i++) {
 if(is[i].src.match(/http:\/\/imgs\.xkcd\.com\/comics/)) {
  e=document.createElement('div');
  e.innerHTML='<br/>'+is[i].title;
  is[i].parentNode.insertBefore(e,is[i].nextSibling);
 }
}