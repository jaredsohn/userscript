// ==UserScript==
// @name           ptr_darkut version 2 By Jerry :)
// @namespace      http://www.orkut.com/Community.aspx?cmm=51130650
// @description    orkut dark version by black panther (-;
// @include        http://www.orkut.com/*
// @author         Jerry[http://www.orkut.com/Profile.aspx?uid=18168935411862930817]
// ==/UserScript==

/*special thanks to Nobody for helping me out (-:*/

/*script start*/
var doc=document;
var head=doc.getElementsByTagName('head').item(0);
var link=doc.createElement('link');
link.href='http://internet.geek.2007.googlepages.com/gm_myorkut_v2.css';
link.type='text/css';
link.rel='stylesheet';
head.appendChild(link);
/*script end*/