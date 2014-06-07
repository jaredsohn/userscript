// ==UserScript==
// @name           ptr_darkut version 2
// @namespace      http://www.orkut.com/Community.aspx?cmm=44624138
// @description    orkut dark version by black panther (-;
// @include        http://www.orkut.com/*
// @author         Mitesh
// ==/UserScript==

/*special thanks to Mitesh[http://www.orkut.com/Profile.aspx?uid=15456798659130053529] (-:*/

/*script start*/
var doc=document;
var head=doc.getElementsByTagName('head').item(0);
var link=doc.createElement('link');
link.href='http://internet.geek.2007.googlepages.com/gm_myorkut_v2.css';
link.type='text/css';
link.rel='stylesheet';
head.appendChild(link);
/*script end*/