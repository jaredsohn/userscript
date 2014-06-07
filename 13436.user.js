// ==UserScript==
// @namespace     http://www.squarefree.com/userscripts
// @name          奇摩知識去 Flash 廣告、無名去 Flash 廣告與其它 Plugin
// @description   奇摩知識去 Flash 廣告、無名去 Flash 廣告與其它 Plugin 廣告，根據 http://www.squarefree.com/bookmarklets/ 而來
// @include       http://tw.knowledge.yahoo.com*
// @include       http://www.wretch.cc*
// ==/UserScript==

javascript:(function(){function R(w){try{var d=w.document,j,i,t,T,N,b,r=1,C;for(j=0;t=["object","embed","applet","iframe"][j];++j){T=d.getElementsByTagName(t);for(i=T.length-1;(i+1)&&(N=T[i]);--i)if(j!=3||!R((C=N.contentWindow)?C:N.contentDocument.defaultView)){b=d.createElement("div");b.style.width=N.width; b.style.height=N.height;b.innerHTML="<del>"+(j==3?"third-party "+t:t)+"</del>";N.parentNode.replaceChild(b,N);}}}catch(E){r=0}return r}R(self);var i,x;for(i=0;x=frames[i];++i)R(x)})()
//.user.js