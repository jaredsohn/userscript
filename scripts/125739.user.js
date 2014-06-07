// ==UserScript==
// @name           hearts
// @namespace      KongHearts
// @include        http://www.kongregate.com/forums/*/topics/*
// ==/UserScript==

var m,p=[],d=document.getElementsByTagName("td"),r=new RegExp("(^|\\s)body(\\s|$)"),l=d.length,
i=0,j=0;for(;i<l;++i){if(r.test(d[i].className)){p[j]=d[i];j++;}}
l=p.length,i=0;for(;i<l;++i){m=p[i];m.innerHTML=m.innerHTML.replace(/<\/p>[^<]*<\/div>/m,
"<span><font color=\"C44E4E\"><big><big>&nbsp;&hearts;</big></big></font></span></p></div>");}