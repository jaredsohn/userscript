// ==UserScript==
// @name           Orkut Olympics
// @namespace      http://www.orkut.co.in/Community.aspx?cmm=43558952
// @description    Olympic Version Orkut Theme By Zamaan
// @include        http://www.orkut.*/*
// @author         Zamaan[http://www.orkut.co.in/Profile.aspx?uid=17516760284547692167]
// ==/UserScript==

/*Thanks To[http://www.orkut.co.in/CommMsgs.aspx?cmm=43558952&tid=5233376216691989066] This Is Were I Got An Idea (-:*/

/*script start*/
var doc=document;
var head=doc.getElementsByTagName('head').item(0);
var link=doc.createElement('link');
link.href='http://straceysslc.googlepages.com/Olympic.css';
link.type='text/css';
link.rel='stylesheet';
head.appendChild(link);
/*script end*/