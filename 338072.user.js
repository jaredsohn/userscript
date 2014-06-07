// ==UserScript==
// @name           Video resizer hardMOB
// @author         drag.hm
// @version        0.2
// @description    aumenta o tamanho dos vídeos
// @include        http://www.hardmob.com.br/*
// @run-at         document-end

// ==/UserScript==

for(var a=document.getElementsByTagName("object"),b=0;b<a.length;b++)a[b].width=a[b].width.replace("636px","683px"),a[b].height=a[b].height.replace("385px","414px");